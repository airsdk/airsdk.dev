---
sidebar_position: 2
---

# Creating windows

AIR automatically creates the first window for an application, but you can
create any additional windows you need. To create a native window, use the
NativeWindow constructor method.

To create an HTML window, either use the HTMLLoader `createRootWindow()` method
or, from an HTML document, call the JavaScript `window.open()` method. The
window created is a NativeWindow object whose display list contains an
HTMLLoader object. The HTMLLoader object interprets and displays the HTML and
JavaScript content for the window. You can access the properties of the
underlying NativeWindow object from JavaScript using the `window.nativeWindow`
property. (This property is only accessible to code running in the AIR
application sandbox.)

When you initialize a window—including the initial application window—you should
consider creating the window in the invisible state, loading content or
executing any graphical updates, and then making the window visible. This
sequence prevents any jarring visual changes from being visible to your users.
You can specify that the initial window of your application should be created in
the invisible state by specifying the `<visible>false</visible>` tag in the
application descriptor (or by leaving the tag out altogether since `false` is
the default value). New NativeWindows are invisible by default. When you create
an HTML window with the HTMLLoader `createRootWindow()` method, you can set the
`visible` argument to `false`. Call the NativeWindow `activate()` method or set
the `visible` property to `true` to make a window visible.

## Specifying window initialization properties

The initialization properties of a native window cannot be changed after the
desktop window is created. These immutable properties and their default values
include:

| Property     | Default value |
| ------------ | ------------- |
| systemChrome | standard      |
| type         | normal        |
| transparent  | false         |
| owner        | null          |
| maximizable  | true          |
| minimizable  | true          |
| resizable    | true          |

Set the properties for the initial window created by AIR in the application
descriptor file. The main window of an AIR application is always type, _normal_
. (Additional window properties can be specified in the descriptor file, such as
`visible`, `width`, and `height`, but these properties can be changed at any
time.)

Set the properties for other native and HTML windows created by your application
using the NativeWindowInitOptions class. When you create a window, you must pass
a NativeWindowInitOptions object specifying the window properties to either the
NativeWindow constructor function or the HTMLLoader `createRootWindow()` method.

The following code creates a NativeWindowInitOptions object for a utility
window:

    var options:NativeWindowInitOptions = new NativeWindowInitOptions();
    options.systemChrome = NativeWindowSystemChrome.STANDARD;
    options.type = NativeWindowType.UTILITY
    options.transparent = false;
    options.resizable = false;
    options.maximizable = false;

Setting _systemChrome_ to _standard_ when _transparent_ is `true` or `type` is
`lightweight` _is not supported._

Note: You cannot set the initialization properties for a window created with the
JavaScript `window.open()` function. You can, however, override how these
windows are created by implementing your own HTMLHost class. See
[Handling JavaScript calls to window.open()](../../html-content-in-air/scripting-the-air-html-container/defining-browser-like-user-interfaces-for-html-content.md#handling-javascript-calls-to-windowopen)
for more information.

When you create a window with the Flex mx:Window class, specify the
initialization properties on the window object itself, either in the MXML
declaration for the window, or in the code that creates the window. The
underlying NativeWindow object is not created until you call the `open()`
method. Once a window is opened, these initialization properties cannot be
changed.

## Creating the initial application window

AIR creates the initial application window based on the properties specified in
the application descriptor and loads the file referenced in the content element.
The content element must reference a SWF file or an HTML file.

The initial window can be the main window of your application or it can merely
serve to launch one or more other windows. You do not have to make it visible at
all.

### Creating the initial window with ActionScript

When you create an AIR application using ActionScript, the main class of your
application must extend the Sprite class (or a subclass of Sprite). This class
serves as the main entry point for the application.

When your application launches, AIR creates a window, creates an instance of the
main class, and adds the instance to the window stage. To access the window, you
can listen for the `addedToStage` event and then use the `nativeWindow` property
of the Stage object to get a reference to the NativeWindow object.

The following example illustrates the basic skeleton for the main class of an
AIR application built with ActionScript:

    package
    {
    	import flash.display.NativeWindow;
    	import flash.display.Sprite;
    	import flash.events.Event;

    	public class MainClass extends Sprite
    	{
    		private var mainWindow:NativeWindow;
    		public function MainClass(){
    			this.addEventListener(Event.ADDED_TO_STAGE, initialize);
    		}

    		private function initialize(event:Event):void{
    			mainWindow = this.stage.nativeWindow;
    			//perform initialization...
    			mainWindow.activate(); //show the window
    		}
    	}
    }

Note: Technically, you CAN access the `nativeWindow` property in the constructor
function of the main class. However, this is a special case applying only to the
initial application window.

When creating an application in Flash Professional, the main document class is
created automatically if you do not create your own in a separate ActionScript
file. You can access the NativeWindow object for the initial window using the
stage `nativeWindow` property. For example, the following code activates the
main window in the maximized state (from the timeline):

    import flash.display.NativeWindow;

    var mainWindow:NativeWindow = this.stage.nativeWindow;
    mainWindow.maximize();
    mainWindow.activate();

### Creating the initial window with Flex

When creating an AIR application with the Flex framework, use the
mx:WindowedApplication as the root element of your main MXML file. (You can use
the mx:Application component, but it does not support all the features available
in AIR.) The WindowedApplication component serves as the initial entry point for
the application.

When you launch the application, AIR creates a native window, initializes the
Flex framework, and adds the WindowedApplication object to the window stage.
When the launch sequence finishes, the WindowedApplication dispatches an
`applicationComplete` event. Access the desktop window object with the
`nativeWindow` property of the WindowedApplication instance.

The following example creates a simple WindowedApplication component that sets
its x and y coordinates:

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml"
    	applicationComplete="placeWindow()">
    	<mx:Script>
    	<![CDATA[
    		private function placeWindow():void{
    			this.nativeWindow.x = 300;
    			this.nativeWindow.y = 300;
    		}
    	]]>
    	</mx:Script>
    	<mx:Label text="Hello World" horizontalCenter="0" verticalCenter="0"/>
    </mx:WindowedApplication>

## Creating a NativeWindow

To create a NativeWindow, pass a NativeWindowInitOptions object to the
NativeWindow constructor:

    var options:NativeWindowInitOptions = new NativeWindowInitOptions();
    options.systemChrome = NativeWindowSystemChrome.STANDARD;
    options.transparent = false;
    var newWindow:NativeWindow = new NativeWindow(options);

The window is not shown until you set the `visible` property to `true` or call
the `activate()` method.

Once the window is created, you can initialize its properties and load content
into the window using the stage property and Flash display list techniques.

In almost all cases, you should set the stage `scaleMode` property of a new
native window to `noScale` (use the `StageScaleMode.NO_SCALE` constant). The
Flash scale modes are designed for situations in which the application author
does not know the aspect ratio of the application display space in advance. The
scale modes let the author choose the least-bad compromise: clip the content,
stretch or squash it, or pad it with empty space. Since you control the display
space in AIR (the window frame), you can size the window to the content or the
content to the window without compromise.

The scale mode for Flex and HTML windows is set to `noScale` automatically.

Note: To determine the maximum and minimum window sizes allowed on the current
operating system, use the following static NativeWindow properties:

    var maxOSSize:Point = NativeWindow.systemMaxSize;
    var minOSSize:Point = NativeWindow.systemMinSize;

## Creating an HTML window

To create an HTML window, you can either call the JavaScript `Window.open()`
method, or you can call the AIR HTMLLoader class `createRootWindow()` method.

HTML content in any security sandbox can use the standard JavaScript
`Window.open()` method. If the content is running outside the application
sandbox, the `open()` method can only be called in response to user interaction,
such as a mouse click or keypress. When `open()` is called, a window with system
chrome is created to display the content at the specified URL. For example:

    newWindow = window.open("xmpl.html", "logWindow", "height=600, width=400, top=10, left=10");

Note: You can extend the HTMLHost class in ActionScript to customize the window
created with the JavaScript `window.open()` function. See
[About extending the HTMLHost class](../../html-content-in-air/scripting-the-air-html-container/defining-browser-like-user-interfaces-for-html-content.md#about-extending-the-htmlhost-class).

Content in the application security sandbox has access to the more powerful
method of creating windows, `HTMLLoader.createRootWindow()`. With this method,
you can specify all the creation options for a new window. For example, the
following JavaScript code creates a lightweight type window without system
chrome that is 300x400 pixels in size:

    var options = new air.NativeWindowInitOptions();
    options.systemChrome = "none";
    options.type = "lightweight";

    var windowBounds = new air.Rectangle(200,250,300,400);
    newHTMLLoader = air.HTMLLoader.createRootWindow(true, options, true, windowBounds);
    newHTMLLoader.load(new air.URLRequest("xmpl.html"));

Note: If the content loaded by a new window is outside the application security
sandbox, the window object does not have the AIR properties: `runtime`,
`nativeWindow`, or `htmlLoader`.

If you create a transparent window, then SWF content embedded in the HTML loaded
into that window is not always displayed. You must set the `wmode` parameter of
the object or embed tag used to reference the SWF file to either `opaque` or
`transparent`. The default value of `wmode` is `window`, so, by default, SWF
content is not displayed in transparent windows. PDF content cannot be displayed
in transparent windows, no matter which `wmode` value is set. (Prior to AIR
1.5.2, SWF content could not be displayed in transparent windows, either.)

Windows created with the `createRootWindow()` method remain independent from the
opening window. The `parent` and `opener` properties of the JavaScript Window
object are `null`. The opening window can access the Window object of the new
window using the HTMLLoader reference returned by the `createRootWindow()`
function. In the context of the previous example, the statement
`newHTMLLoader.window` would reference the JavaScript Window object of the
created window.

Note: The `createRootWindow()` function can be called from both JavaScript and
ActionScript.

## Creating a mx:Window

To create a mx:Window, you can create an MXML file using mx:Window as the root
tag, or you can call the Window class constructor directly.

The following example creates and shows a mx:Window by calling the Window
constructor:

    var newWindow:Window = new Window();
    newWindow.systemChrome = NativeWindowSystemChrome.NONE;
    newWindow.transparent = true;
    newWindow.title = "New Window";
    newWindow.width = 200;
    newWindow.height = 200;
    newWindow.open(true);

## Adding content to a window

How you add content to an AIR window depends on the type of window. For example,
MXML and HTML let you declaratively define the basic content of the window. You
can embed resources in the application SWF files or you can load them from
separate application files. Flex, Flash, and HTML content can all be created on
the fly and added to a window dynamically.

When you load SWF content, or HTML content containing JavaScript, you must take
the AIR security model into consideration. Any content in the application
security sandbox, that is, content installed with your application and loadable
with the app: URL scheme, has full privileges to access all the AIR APIs. Any
content loaded from outside this sandbox cannot access the AIR APIs. JavaScript
content outside the application sandbox is not able to use the `runtime`,
`nativeWindow`, or `htmlLoader` properties of the JavaScript Window object.

To allow safe cross-scripting, you can use a sandbox bridge to provide a limited
interface between application content and non-application content. In HTML
content, you can also map pages of your application into a non-application
sandbox to allow the code on that page to cross-script external content. See
[AIR security](../../security/air-security/index.md).

#### Loading a SWF file or image

You can load Flash SWF files or images into the display list of a native window
using the `flash.display.Loader` class:

    package
    {
    	import flash.display.Sprite;
    	import flash.events.Event;
    	import flash.net.URLRequest;
    	import flash.display.Loader;

    	public class LoadedSWF extends Sprite
    	{
    		public function LoadedSWF(){
    			var loader:Loader = new Loader();
    			loader.load(new URLRequest("visual.swf"));
    			loader.contentLoaderInfo.addEventListener(Event.COMPLETE,loadFlash);
    		}

    		private function loadFlash(event:Event):void{
    			addChild(event.target.loader);
    		}
    	}
    }

Note: Older SWF files created using ActionScript 1 or 2 share global states such
as class definitions, singletons, and global variables if they are loaded into
the same window. If such a SWF file relies on untouched global states to work
correctly, it cannot be loaded more than once into the same window, or loaded
into the same window as another SWF file using overlapping class definitions and
variables. This content can be loaded into separate windows.

#### Loading HTML content into a NativeWindow

To load HTML content into a NativeWindow, you can either add an HTMLLoader
object to the window stage and load the HTML content into the HTMLLoader, or
create a window that already contains an HTMLLoader object by using the
`HTMLLoader.createRootWindow()` method. The following example displays HTML
content within a 300 by 500 pixel display area on the stage of a native window:

    //newWindow is a NativeWindow instance
    var htmlView:HTMLLoader = new HTMLLoader();
    htmlView.width = 300;
    htmlView.height = 500;

    //set the stage so display objects are added to the top-left and not scaled
    newWindow.stage.align = "TL";
    newWindow.stage.scaleMode = "noScale";
    newWindow.stage.addChild( htmlView );

    //urlString is the URL of the HTML page to load
    htmlView.load( new URLRequest(urlString) );

To load an HTML page into a Flex application, you can use the Flex HTML
component.

SWF content in an HTML file is not displayed if the window uses transparency
(that is the `transparent` property of the window is `true`) unless the `wmode`
parameter of the object or embed tag used to reference the SWF file is set to
either `opaque` or `transparent`. Since the default `wmode` value is `window`,
by default, SWF content is not displayed in a transparent window. PDF content is
not displayed in a transparent window no matter what `wmode` value is used.

Also, neither SWF nor PDF content is displayed if the HTMLLoader control is
scaled, rotated, or if the HTMLLoader `alpha` property is set to a value other
than 1.0.

#### Adding SWF content as an overlay on an HTML window

Because HTML windows are contained within a NativeWindow instance, you can add
Flash display objects both above and below the HTML layer in the display list.

To add a display object above the HTML layer, use the `addChild()` method of the
`window.nativeWindow.stage` property. The `addChild()` method adds content
layered above any existing content in the window.

To add a display object below the HTML layer, use the `addChildAt()` method of
the `window.nativeWindow.stage` property, passing in a value of zero for the
`index` parameter. Placing an object at the zero index moves existing content,
including the HTML display, up one layer and insert the new content at the
bottom. For content layered underneath the HTML page to be visible, you must set
the `paintsDefaultBackground` property of the `HTMLlLoader` object to `false`.
In addition, any elements of the page that set a background color, will not be
transparent. If, for example, you set a background color for the body element of
the page, none of the page will be transparent.

The following example illustrates how to add a Flash display objects as overlays
and underlays to an HTML page. The example creates two simple shape objects,
adds one below the HTML content and one above. The example also updates the
shape position based on the `enterFrame` event.

    <html>
    <head>
    	<title>Bouncers</title>
    	<script src="AIRAliases.js" type="text/javascript"></script>
    	<script language="JavaScript" type="text/javascript">
    		air.Shape = window.runtime.flash.display.Shape;

    		function Bouncer(radius, color){
    			this.radius = radius;
    			this.color = color;

    			//velocity
    			this.vX = -1.3;
    			this.vY = -1;

    			//Create a Shape object and draw a circle with its graphics property
    			this.shape = new air.Shape();
    			this.shape.graphics.lineStyle(1,0);
    			this.shape.graphics.beginFill(this.color,.9);
    			this.shape.graphics.drawCircle(0,0,this.radius);
    			this.shape.graphics.endFill();

    			//Set the starting position
    			this.shape.x = 100;
    			this.shape.y = 100;


    			//Moves the sprite by adding (vX,vY) to the current position
    			this.update = function(){
    				this.shape.x += this.vX;
    				this.shape.y += this.vY;

    				//Keep the sprite within the window
    				if( this.shape.x - this.radius < 0){
    					this.vX = -this.vX;
    				}
    				if( this.shape.y - this.radius < 0){
    					this.vY = -this.vY;
    				}
    				if( this.shape.x  + this.radius > window.nativeWindow.stage.stageWidth){
    					this.vX = -this.vX;
    				}
    				if( this.shape.y  + this.radius > window.nativeWindow.stage.stageHeight){
    					this.vY = -this.vY;
    				}

    			};
    		}

    		function init(){
    			//turn off the default HTML background
    			window.htmlLoader.paintsDefaultBackground = false;
    			var bottom = new Bouncer(60,0xff2233);
    			var top = new Bouncer(30,0x2441ff);

    			//listen for the enterFrame event
    			window.htmlLoader.addEventListener("enterFrame",function(evt){
    				bottom.update();
    				top.update();
    			});

    			//add the bouncing shapes to the window stage
    			window.nativeWindow.stage.addChildAt(bottom.shape,0);
    			window.nativeWindow.stage.addChild(top.shape);
    		}
    	</script>
    </head>
    <body onload="init();">
    	<h1>de Finibus Bonorum et Malorum</h1>
    	<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    	doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
    	et quasi architecto beatae vitae dicta sunt explicabo.</p>
    	<p style="background-color:#FFFF00; color:#660000;">This paragraph has a background color.</p>
    	<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
    	praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
    	excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
    	officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
    </body>
    </html>

This example provides a rudimentary introduction to some advanced techniques
that cross over the boundaries between JavaScript and ActionScript in AIR. If
your are unfamiliar with using ActionScript display objects, refer to
[Display programming](../../display/display-programming/index.md).

## Example: Creating a native window

The following example illustrates how to create a native window:

    public function createNativeWindow():void {
    	//create the init options
    	var options:NativeWindowInitOptions = new NativeWindowInitOptions();
    	options.transparent = false;
    	options.systemChrome = NativeWindowSystemChrome.STANDARD;
    	options.type = NativeWindowType.NORMAL;

    	//create the window
    	var newWindow:NativeWindow = new NativeWindow(options);
    	newWindow.title = "A title";
    	newWindow.width = 600;
    	newWindow.height = 400;

    	newWindow.stage.align = StageAlign.TOP_LEFT;
    	newWindow.stage.scaleMode = StageScaleMode.NO_SCALE;

    	//activate and show the new window
    	newWindow.activate();
    }

More Help topics

![](../../img/flexLinkIndicator.png)
[Using the Flex AIR components](https://web.archive.org/web/20150519004618/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WSacd9bdd0c5c09f4a-690d4877120e8b878b0-8000.html)
