<h2>ImageZoomer</h2>
<p>A JavaScript Class that is used to zoom into an image</p>

<h3>Example 1:</h3>
<p>Define an area and HTML5 Canvas elements you want an image to appear:</p>

<div id="zoomingArea">
  <!-- canvas#image is used to show image -->
  <canvas id="image"></canvas>
  <!-- canvas#magnifier is used to show magnifier -->
  <canvas id="magnifier"></canvas>
</div>

<p>Or you can leave all HTML5 canvas elements out and just define an area into which an image should be put:</p>

<div id="zoomingArea"></div>

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

<h3>Constructor</h3>

<blockquote>

  <p><b>constructor ImageZoomer( in opts:Object ) : instance</b></p>
  <p>
	@param <b><i>opts</i></b> must be an Object to be given to adjust some Preferences:
	<ul>
         <li><b><i>image</i></b> must be an object that holds image source url and optional image width. If no image width is passed original image width is used.</b></li>
	  <li><b><i>area</i></b> must be an ID or Class name that references to an HTML element into which an scalable image should appear.</b></li>
          <li><b><i>crop</i></b> must be a Number that defines a cropping width/height in pixel</b></li>
	  <li><b><i>zoom</i></b> must be a Number that defines width/height of the magnifier in pixel</b></li>
	  <li><i>destStyle</i> must be an Object that defines additionally style properties like <i>border-radius</i> that can be applied onto magnifier.</b></li>
	</ul>
  </p>

  <p>@return this</p>
	
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
GNU: Basically this software can be used and modified freely and without any restrictions.