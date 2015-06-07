function ImageZoomer(opts){

    this._area = opts.area;
    document.querySelector(this._area).setAttribute('style','position: relative');

    var canvasId = 'imagezoomer-'+(new Date()).getTime();

    this._source = opts.source;
    if(!document.querySelector(this._source)){
        this._source = document.createElement("canvas");
        this._source.setAttribute('id',canvasId);
        document.querySelector(this._area).appendChild(this._source);
        this._source = '#'+canvasId;
    }
    this._source = document.querySelector(this._source);
    this._sourceCtx = this._source.getContext('2d');

    this._dest = opts.dest;
    if(!document.querySelector(this._dest)){
        this._dest = document.createElement("canvas");
        canvasId += '2';
        this._dest.setAttribute('id',canvasId);
        document.querySelector(this._area).appendChild(this._dest);
        this._dest = '#'+canvasId;
    }
    this._dest = document.querySelector(this._dest);
    var destStyle = "";
    if(opts.destStyle) {
        for (var css in opts.destStyle) {
            destStyle += css+':'+opts.destStyle[css]+';';
        }
    }
    this._destStyle = destStyle;
    this._dest.setAttribute('style','position: absolute;display: none;pointer-events:none;'+this._destStyle);
    this._destCtx = this._dest.getContext('2d');

    this._cropWidth = opts.cropWidth;
    this._cropHeight = opts.cropHeight;

    this._cursorWidth = !isNaN(opts.cursorWidth) || 0;
    this._cursorHeight = !isNaN(opts.cursorHeight) || 0;

    this._zoomFactor = isNaN(opts.zoom) ? 10 : opts.zoom;

    this._isPressing = false;

    this._currentPosX = 0;
    this._currentPosY = 0;

    this._imgsource = new Image();
    this._imgsource.onload = function(){

        this._dest.setAttribute('width',this._cropWidth);
        this._dest.setAttribute('height',this._cropHeight);

        this._imgWidth = this._imgsource.width;
        this._imgHeight = this._imgsource.height;

        this._source.setAttribute('width',this._imgWidth);
        this._source.setAttribute('height',this._imgHeight);

        this._sourceCtx.drawImage(this._imgsource,0,0,this._imgWidth,this._imgHeight);

        this._source.addEventListener('mousedown',function(){
            this._isPressing = true;
            this._handleDrawingMag();
        }.bind(this));

        this._source.addEventListener('mouseup',function(){
            this._hideCropImageCanvas();
        }.bind(this));

        /* ie 9&10 quirks */
        if(navigator.appVersion.indexOf("MSIE 9.")!=-1||navigator.appVersion.indexOf("MSIE 10.")!=-1){
            this._dest.addEventListener('mouseup',function(){
                this._hideCropImageCanvas();
            }.bind(this));
            this._dest.addEventListener('mouseout',function(){
                this._hideCropImageCanvas();
            }.bind(this));
        }
        else{
            this._source.addEventListener('mouseout',function(){
                this._hideCropImageCanvas();
            }.bind(this));
        }

        this._source.addEventListener('mousemove',function(e){

            var mousePos = this._getMousePos(this._source, e);

            this._currentPosX = mousePos.x;
            this._currentPosY = mousePos.y;

            this._handleDrawingMag();

        }.bind(this));




    }.bind(this);
    this._imgsource.src = opts.image;

}

ImageZoomer.prototype._hideCropImageCanvas = function(){
    this._isPressing = false;
    this._source.setAttribute('style','cursor:default');
    this._dest.setAttribute('style','display: none;');
};

ImageZoomer.prototype._getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

ImageZoomer.prototype._handleDrawingMag = function(){

    if(this._isPressing){

        this._source.width = this._source.width;
        this._source.setAttribute('style','cursor:none');

        this._sourceCtx.drawImage(this._imgsource,0,0,this._imgWidth,this._imgHeight);

        var rectX = this._currentPosX-(this._cropWidth/2)-this._cursorWidth;
        // take x-borders into consideration
        rectX = rectX<0?0:rectX;
        rectX = rectX+this._cropWidth>this._imgWidth?this._imgWidth-this._cropWidth:rectX;

        var rectY = this._currentPosY-(this._cropHeight/2)-this._cursorHeight;
        // take y-borders into consideration
        rectY = rectY<0?0:rectY;
        rectY = rectY+this._cropHeight>this._imgHeight?this._imgHeight-this._cropHeight:rectY;

        this._destCtx.drawImage(this._imgsource,rectX,rectY,this._cropWidth,this._cropHeight,0,0,this._cropWidth,this._cropHeight);
        var ratio = this._cropWidth/this._cropHeight;
        this._dest.setAttribute('style','position: absolute;pointer-events:none;cursor:none;display: block;'+
            'top:'+(rectY-(this._zoomFactor/2))+'px;'+'left:'+(rectX-((this._zoomFactor*ratio)/2))+'px;'+
            'width:'+((this._cropWidth+(this._zoomFactor*ratio)))+'px;'+
            'height:'+(this._cropHeight+this._zoomFactor)+'px;'+this._destStyle
        );

    }
    else{
        this._hideCropImageCanvas();
    }

};