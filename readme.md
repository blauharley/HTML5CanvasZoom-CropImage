<h2>ImageZoomer</h2>
<p>A JavaScript Class that is used to zoom into an image</p>

<h3>Examples</h3>
<p>Define an area and HTML5 Canvas elements you want an image to appear:</p>

```html

<div id="zoomingArea">
  <!-- canvas#image is used to show image -->
  <canvas id="image"></canvas>
  <!-- canvas#magnifier is used to show magnifier -->
  <canvas id="magnifier"></canvas>
</div>

```

<p>Or you can leave all HTML5 canvas elements out and just define an area into which an image should be put:</p>

```html

<div id="zoomingArea"></div>

```

<p>Initalize an instance of type ImageZoomer by passing some preferences into ImageZoomer constructor. And you are done!</p>

```javascript

new ImageZoomer({
	image: {
	    src:"./image.jpg",
	    width: 200
	},
	area: "#zoomingArea",
	source : "#image",
	dest: "#magnifier",
	crop: 60,
	zoom: 100
});

```

<p>Furthermore you can specify how the magnifier(HTML5 destination canvas) should look like. This can be done by passing a <i>destStyle</i> Object into ImageZoomer constructor.</p>

```javascript

new ImageZoomer({
	...
        destStyle: {
            border:"1px solid black",
            "border-radius":"100px"
        }
});

```

<p>But there are more possibilities of how you can use ImageZoomer within <i>cropImageUsingClass.html.</i></p>

<h3>Constructor</h3>

<blockquote>

  <p><b>constructor ImageZoomer( in opts:Object ) : instance</b></p>
  <p>
	@param <b><i>opts</i></b> must be an Object to be given to adjust some Preferences:
	<ul>
         <li><b><i>image</i></b> must be an object that holds image source <i>url</i> and optional image <i>width</i>. If no image width is passed original image width is used.</b></li>
	  <li><b><i>area</i></b> must be an ID or Class name that references to an HTML element into which an zoomable image should appear.</b></li>
	  <li><b><i>crop</i></b> must be a Number that defines a cropping quadratic sizes in pixel. Default value is 1 pixel.</b></li>
	  <li><b><i>zoom</i></b> must be a Number that defines quadratic sizes of the magnifier in pixel. This value is used to show a magnifier effect on destination HTML5 canvas. Default value is 10 pixels.</b></li>
	  <li><i>source</i> must be an ID or Class name that references to an HTML element into which an image should be shown.</b></li>
	  <li><i>dest</i> must be an ID or Class name that references to an HTML element that is used to show magnifier.</b></li>
	  <li><i>destStyle</i> must be an Object that defines additionally style properties like <i>border-radius</i> that can be applied onto magnifier.</b></li>
	</ul>
  </p>

  <p>@return this</p>
	
</blockquote>


<h3>Public Methods</h3>

<p>Setter and Getter for Cropping<p>
<blockquote>

  <p><b>ImageZoomer.prototype.setCrop( in crop:Number ) : instance</b></p>
  <p>
     @param <b><i>crop</i></b> must be Number that defines cropping quadratic sizes in pixels.
  </p>

  <p>@return this</p>
	
</blockquote>

<blockquote>

  <p><b>ImageZoomer.prototype.getCrop() : Number</b></p>
  <p>@return Number</p>
	
</blockquote>


<p>Setter and Getter for Zooming<p>
<blockquote>

  <p><b>ImageZoomer.prototype.setZoom( in zoom:Number ) : instance</b></p>
  <p>
     @param <b><i>zoom</i></b> must be Number that defines quadratic sizes of the magnifier in pixels.
  </p>

  <p>@return this</p>
	
</blockquote>

<blockquote>

  <p><b>ImageZoomer.prototype.getZoom() : Number</b></p>
  <p>@return Number</p>
	
</blockquote>



<h3>Supported Browsers:</h3>

<ul>
  <li>IE 9+</li>
  <li>Mozilla Firefox</li>
  <li>Google Chrome</li>
  <li>Apple Safari</li>
  <li>Opera</li>
</ul>

<h3>License:</h3>
GNU: Basically this software can be used and modified freely and without any restrictions. This does NOT include any pictures that are used for test purposes in this project.
