# Embedding SWF content in HTML

You can embed SWF content in HTML content within an AIR application just as you
would in a browser. Embed the SWF content using an `object` tag, an `embed` tag,
or both.

Note: A common web development practice is to use both an `object` tag and an
`embed` tag to display SWF content in an HTML page. This practice has no benefit
in AIR. You can use the W3C-standard `object` tag by itself in content to be
displayed in AIR. At the same time, you can continue to use the `object` and
`embed` tags together, if necessary, for HTML content that is also displayed in
a browser.

If you have enabled transparency in the NativeWindow object displaying the HTML
and SWF content, then AIR does not display the SWF content when window mode (
`wmode`) used to embed the content is set to the value: `window`. To display SWF
content in an HTML page of a transparent window, set the `wmode` parameter to
`opaque` or `transparent`. The `window` is the default value for `wmode`, so if
you do not specify a value, your content may not be displayed.

The following example illustrates the use of the HTML `object` tag to display a
SWF file within HTML content. The `wmode` parameter is set to `opaque` so that
the content is displayed, even if the underlying NativeWindow object is
transparent. The SWF file is loaded from the application directory, but you can
use any of the URL schemes supported by AIR. (The location from which the SWF
file is loaded determines the security sandbox in which AIR places the content.)

```
<object type="application/x-shockwave-flash" width="100%" height="100%">
	<param name="movie" value="app:/SWFFile.swf"></param>
	<param name="wmode" value="opaque"></param>
</object>
```

You can also use a script to load content dynamically. The following example
creates an `object` node to display the SWF file specified in the `urlString`
parameter. The example adds the node as a child of the page element with the ID
specified by the `elementID` parameter:

```
<script>
function showSWF(urlString, elementID){
	var displayContainer = document.getElementById(elementID);
	var flash = createSWFObject(urlString, 'opaque', 650, 650);
	displayContainer.appendChild(flash);
}
function createSWFObject(urlString, wmodeString, width, height){
	var SWFObject = document.createElement("object");
	SWFObject.setAttribute("type","application/x-shockwave-flash");
	SWFObject.setAttribute("width","100%");
	SWFObject.setAttribute("height","100%");
	var movieParam = document.createElement("param");
	movieParam.setAttribute("name","movie");
	movieParam.setAttribute("value",urlString);
	SWFObject.appendChild(movieParam);
	var wmodeParam = document.createElement("param");
	wmodeParam.setAttribute("name","wmode");
	wmodeParam.setAttribute("value",wmodeString);
	SWFObject.appendChild(wmodeParam);
	return SWFObject;
}
</script>
```

SWF content is not displayed if the HTMLLoader object is scaled or rotated, or
if the `alpha` property is set to a value other than 1.0. Prior to AIR 1.5.2,
SWF content was not displayed in a transparent window no matter which `wmode`
value was set.

Note: When an embedded SWF object attempts to load an external asset like a
video file, the SWF content may not be rendered properly if an absolute path to
the video file is not provided in the HTML file. However, an embedded SWF object
can load an external image file using a relative path.

The following example depicts how external assets can be loaded through a SWF
object embedded in an HTML content:

```
var imageLoader;

function showSWF(urlString, elementID){
```

        var displayContainer = document.getElementById(elementID);
        imageLoader = createSWFObject(urlString,650,650);
        displayContainer.appendChild(imageLoader);
```
}

function createSWFObject(urlString, width, height){
```

        var SWFObject = document.createElement("object");
            SWFObject.setAttribute("type","application/x-shockwave-flash");
            SWFObject.setAttribute("width","100%");
            SWFObject.setAttribute("height","100%");

        var movieParam = document.createElement("param");
            movieParam.setAttribute("name","movie");
            movieParam.setAttribute("value",urlString);
            SWFObject.appendChild(movieParam);

        var flashVars = document.createElement("param");
            flashVars.setAttribute("name","FlashVars");

        //Load the asset inside the SWF content.
            flashVars.setAttribute("value","imgPath=air.jpg");
            SWFObject.appendChild(flashVars);

        return SWFObject;
```
}
function loadImage()
{
	showSWF("ImageLoader.swf", "imageSpot");
}
```

In the following ActionScript example, the image path passed by the HTML file is
read and the image is loaded on stage:

```
package
{
	import flash.display.Sprite;
	import flash.display.LoaderInfo;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.display.Loader;
	import flash.net.URLRequest;

	public class ImageLoader extends Sprite
	{
		public function ImageLoader()
		{
			var flashvars = LoaderInfo(this.loaderInfo).parameters;

			if(flashvars.imgPath){
				var imageLoader = new Loader();
				var image = new URLRequest(flashvars.imgPath);
				imageLoader.load(image);
				addChild(imageLoader);
				imageLoader.x = 0;
				imageLoader.y = 0;
				stage.scaleMode=StageScaleMode.NO_SCALE;
				stage.align=StageAlign.TOP_LEFT;
			}
		}
	}
}
```
