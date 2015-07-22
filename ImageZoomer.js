function ImageZoomer(opts){

    // test mode for cropping rect
    this._testMode = false;

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
    this._sourceStyle = this._source.getAttribute("style");
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

    this._crop = this._isNumber(opts.crop) ? opts.crop : 1;

    this._zoomFactor = this._isNumber(opts.zoom) ? opts.zoom : 10;

    this._isPressing = false;

    this._currentPosX = 0;
    this._currentPosY = 0;

    this._isTouchable = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    this._imgsource = new Image();
    this._imgsource.onload = function(){

        this._dest.setAttribute('width',this._crop);
        this._dest.setAttribute('height',this._crop);

        this._orignalWidth = this._imgsource.width;
        this._orignalHeight = this._imgsource.height;

        this._ration = this._orignalHeight/this._orignalWidth;

        this._adjWidth = opts.image.width;

        this._imgWidth = this._adjWidth ? this._adjWidth : this._orignalWidth;
        this._imgHeight = this._adjWidth ? this._imgWidth*this._ration : this._orignalHeight;

        this._widthRation = this._orignalWidth/this._imgWidth;
        this._heightRation = this._orignalHeight/this._imgHeight;

        this._source.setAttribute('style','cursor:none;width:'+this._imgWidth+'px;height:'+(this._imgWidth*this._ration)+'px;'+this._sourceStyle);
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

        /* touch devices support */
        if(this._isTouchable){

            var instance = this;

            this._source.addEventListener('touchstart',function(e){

                instance._isPressing = true;
                var mousePos = instance._getMousePos(instance._source, {
                    clientX : e.targetTouches && e.targetTouches[0] ? e.targetTouches[0].clientX : 0,
                    clientY : e.targetTouches && e.targetTouches[0] ? e.targetTouches[0].clientY : 0
                });
                instance._currentPosX = mousePos.x;
                instance._currentPosY = mousePos.y;

                instance._handleDrawingMag();

            },false);

            this._source.addEventListener('touchmove',function(e){

                var mousePos = instance._getMousePos(instance._source, {
                    clientX : e.targetTouches && e.targetTouches[0] ? e.targetTouches[0].clientX : 0,
                    clientY : e.targetTouches && e.targetTouches[0] ? e.targetTouches[0].clientY : 0
                });
                instance._currentPosX = mousePos.x;
                instance._currentPosY = mousePos.y;

                instance._handleDrawingMag();

            },false);

        }

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
    this._imgsource.src = opts.image.src;

}


/* public */

ImageZoomer.prototype.setCrop = function(crop){
    try {
        if(this._isNumber(crop)) {
            this._crop = Number(crop) > 0 ? Number(crop) : 1;
            this._dest.setAttribute('width', this._crop);
            this._dest.setAttribute('height', this._crop);
            return this;
        }
        else{
            throw new Error("crop is not a number");
        }
    }
    catch(e){
        console.log("ImageZoomer.prototype.setCrop: ",e);
    }
};

ImageZoomer.prototype.getCrop = function(){ return this._crop; };

ImageZoomer.prototype.setZoom = function(zoom){
    try {
        if(this._isNumber(zoom)) {
            this._zoomFactor = Number(zoom);
            return this;
        }
        else{
            throw new Error("zoom is not a number");
        }
    }
    catch(e){
        console.log("ImageZoomer.prototype.setZoom: ",e);
    }
};

ImageZoomer.prototype.getZoom = function(){ return this._zoomFactor; };

ImageZoomer.prototype.testMode = function(on){
    this._testMode = on;
    return this;
};

/* private */
ImageZoomer.prototype._hideCropImageCanvas = function(){
    this._isPressing = false;
    this._source.setAttribute('style','cursor:default;width:'+this._imgWidth+'px;height:'+(this._imgWidth*this._ration)+'px;'+this._sourceStyle);
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

        this._source.setAttribute('style','cursor:none;width:'+this._imgWidth+'px;height:'+(this._imgWidth*this._ration)+'px;'+this._sourceStyle);

        this._source.width = this._source.width;
        this._sourceCtx.drawImage(this._imgsource,0,0,this._imgWidth,this._imgHeight);

        var orgrectX = this._currentPosX-(this._crop/2);
        // take x-borders into consideration
        var rectX = orgrectX+this._crop>this._imgWidth?this._imgWidth-this._crop:(orgrectX<0?0:orgrectX);

        var orgrectY = this._currentPosY-(this._crop/2);
        // take y-borders into consideration
        var rectY = orgrectY+this._crop>this._imgHeight?this._imgHeight-this._crop:(orgrectY<0?0:orgrectY);

        /* testMode: show crop rect*/
        if(this._testMode) {
            this._sourceCtx.beginPath();
            this._sourceCtx.rect(rectX, rectY, this._crop, this._crop);
            this._sourceCtx.fillStyle = 'rgba(0,0,125,0.2)';
            this._sourceCtx.fill();
            this._sourceCtx.lineWidth = 1;
            this._sourceCtx.strokeStyle = 'black';
            this._sourceCtx.stroke();
        }
        else {
            var cutX = (this._currentPosX * this._widthRation) - (this._crop / 2);
            var cutY = (this._currentPosY * this._heightRation) - (this._crop / 2);
            this._destCtx.drawImage(
                this._imgsource,
                (cutX + this._crop) > this._orignalWidth ? (this._orignalWidth - this._crop) : (cutX < 0 ? 0 : cutX),
                (cutY + this._crop) > this._orignalHeight ? (this._orignalHeight - this._crop) : (cutY < 0 ? 0 : cutY),
                this._crop,
                this._crop,
                0,
                0,
                this._crop,
                this._crop
            );

            this._dest.setAttribute('style', 'position: absolute;pointer-events:none;cursor:none;display: block;' +
                'top:' + (orgrectY - (this._zoomFactor / 2)) + 'px;' + 'left:' + (orgrectX - (this._zoomFactor / 2)) + 'px;' +
                'width:' + ((this._crop + this._zoomFactor)) + 'px;' +
                'height:' + (this._crop + this._zoomFactor) + 'px;' + this._destStyle
            );
        }

    }
    else{
        this._hideCropImageCanvas();
    }

};

ImageZoomer.prototype._isNumber = function(num){
    return !isNaN(num) && num !== null;
};