---
sidebar_position: 5
---

# Displaying HTML content in mobile apps

The
[StageWebView](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/StageWebView.html)
class displays HTML content using the system browser control on mobile devices
and using the standard Adobe® AIR® HTMLLoader control on desktop computers.
Check the `StageWebView.isSupported` property to determine whether the class is
supported on the current device. Support is not guaranteed for all devices in
the mobile profile.

In all profiles, the StageWebView class supports only limited interaction
between the HTML content and the rest of the application. You can control
navigation, but no cross-scripting or direct exchange of data is allowed. You
can load content from a local or remote URL or pass in a string of HTML.

## StageWebView objects

A StageWebView object is not a display object and cannot be added to the display
list. Instead, it operates as a viewport attached directly to the stage.
StageWebView content draws over the top of any display list content. There is no
way to control the drawing order of multiple StageWebView objects.

To display a StageWebView object, you assign the stage on which the object is to
appear to the `stage` property of the StageWebView. Set the size of the display
using the `viewPort` property.

Set the x and y coordinates of the `viewPort` property between -8192 and 8191.
The maximum value of stage width and height is 8191. If the size exceeds the
maximum values, an exception is thrown.

The following example creates a StageWebView object, sets the `stage` and
`viewPort` properties, and displays a string of HTML:

    var webView:StageWebView = new StageWebView();
    webView.viewPort = new Rectangle( 0, 0, this.stage.stageWidth, this .stage.stageHeight);
    webView.stage = this.stage;
    var htmlString:String = "<!DOCTYPE HTML>" +
                        "<html><body>" +
                        "<p>King Philip could order five good steaks.</p>" +
                        "</body></html>";
    webView.loadString( htmlString );

To hide a StageWebView object, set its `stage` property to `null`. To destroy
the object entirely, call the `dispose()` method. Calling `dispose()` is
optional, but does help the garbage collector reclaim the memory used by the
object sooner.

## Content

You can load content into a StageWebView object using two methods: `loadURL()`
and `loadString()`.

The `loadURL()` method loads a resource at the specified URL. You can use any
URI scheme supported by the system web browser control, including: data:, file:,
http:, https:, and javascript:. The app: and app-storage: schemes are not
supported. AIR does not validate the URL string.

The `loadString()` method loads a literal string containing HTML content. The
location of a page loaded with this method is expressed as:

- On Desktop: about:blank

- On iOS: _htmlString_

- On Android: the data URI format of the encoded _htmlString_

The URI scheme determines the rules for loading embedded content or data.

| URI scheme                   | Load local resource | Load remote resource | Local XMLHttpRequest | Remote XMLHttpRequest |
| ---------------------------- | ------------------- | -------------------- | -------------------- | --------------------- |
| data:                        | No                  | Yes                  | No                   | No                    |
| file:                        | Yes                 | Yes                  | Yes                  | Yes                   |
| http:, https:                | No                  | Yes                  | No                   | Same domain           |
| about: (loadString() method) | No                  | Yes                  | No                   | No                    |

Note: If the stage's `displayState` property is set to `FULL_SCREEN`, in
Desktop, you cannot type in a text field displayed in the StageWebView. However,
in iOS and Android, you can type in a text field on StageWebView even if the
stage's `displayState` is `FULL_SCREEN`.

The following example uses a StageWebView object to display Adobe's website:

    package
    {
    	import flash.display.MovieClip;
    	import flash.media.StageWebView;
    	import flash.geom.Rectangle;

    	public class StageWebViewExample extends MovieClip
    	{
    		public var webView:StageWebView = new StageWebView();

    		public function StageWebViewExample()
    		{
    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
    			webView.loadURL( "http://www.adobe.com" );
    		}
    	}
    }

On Android devices, you must specify the Android INTERNET permission in order
for the app to successfully load remote resources.

In Android 3.0+, an application must enable hardware acceleration in the Android
manifestAdditions element of the AIR application descriptor to display plug-in
content in a StageWebView object. See
[Enabling Flash Player and other plug-ins in a StageWebView object](https://web.archive.org/web/20170703170631/http://help.adobe.com/en_US/air/build/WSfffb011ac560372f-5d0f4f25128cc9cd0cb-7ffc.html#WS365a66ad37c9f5102ec8a8ba12f2d91095a-8000).

### JavaScript URI

You can use a JavaScript URI to call a function defined in the HTML page that is
loaded by a StageWebView object. The function you call using the JavaScript URI
runs in the context of the loaded web page. The following example uses a
StageWebView object to call a JavaScript function:

    package
    {
    	import flash.display.*;
    	import flash.geom.Rectangle;
    	import flash.media.StageWebView;
    	public class WebView extends Sprite
    	{
    		public var webView:StageWebView = new StageWebView();
    		public function WebView()
    		{
    			var htmlString:String = "<!DOCTYPE HTML>" +
    			"<html><script type=text/javascript>" +
    			"function callURI(){" +
    			"alert(\"You clicked me!!\");"+
    			"}</script><body>" +
    			"<p><a href=javascript:callURI()>Click Me</a></p>" +
    			"</body></html>";
    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
    			webView.loadString( htmlString );
    		}
    	}
    }

## Navigation events

When a user clicks a link in the HTML, the StageWebView object dispatches a
`locationChanging` event. You can call the `preventDefault()` method of the
event object to stop the navigation. Otherwise, the StageWebView object
navigates to the new page and dispatches a `locationChange` event. When the page
load has finished, the StageWebView dispatches a `complete` event.

A `locationChanging` event is dispatched on every HTML redirect. The
`locationChange` and `complete` events are dispatched at the appropriate time.

On iOS, a `locationChanging` event is dispatched before a `locationChange`
event, except for the first `loadURL(`) or l `oadString()` methods. A
`locationChange` event is also dispatched for navigational changes through
iFrames and Frames.

The following example illustrates how you can prevent a location change and open
the new page in the system browser instead.

    package
    {
    	import flash.display.MovieClip;
    	import flash.media.StageWebView;
    	import flash.events.LocationChangeEvent;
    	import flash.geom.Rectangle;
    	import flash.net.navigateToURL;
    	import flash.net.URLRequest;

    	public class StageWebViewNavEvents extends MovieClip
    	{
    		var webView:StageWebView = new StageWebView();

    		public function StageWebViewNavEvents()
    		{
    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
    			webView.addEventListener( LocationChangeEvent.LOCATION_CHANGING, onLocationChanging );
    			webView.loadURL( "http://www.adobe.com" );
    		}
    		private function onLocationChanging( event:LocationChangeEvent ):void
    		{
    			event.preventDefault();
    			navigateToURL( new URLRequest( event.location ) );
    		}
    	}
    }

## History

As a user clicks links in the content displayed in a StageWebView object, the
control saves the backwards and forwards history stacks. The following example
illustrates how to navigate through the two history stacks. The example uses the
Back and Search soft keys.

    package
    {
    	import flash.display.MovieClip;
    	import flash.media.StageWebView;
    	import flash.geom.Rectangle;
    	import flash.events.KeyboardEvent;
    	import flash.ui.Keyboard;

    	public class StageWebViewExample extends MovieClip
    	{

    		var webView:StageWebView = new StageWebView();

    		public function StageWebViewExample()
    		{
    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
    			webView.loadURL( "http://www.adobe.com" );

    			stage.addEventListener( KeyboardEvent.KEY_DOWN, onKey );
    		}

    		private function onKey( event:KeyboardEvent ):void
    		{
    			if( event.keyCode == Keyboard.BACK && webView.isHistoryBackEnabled )
    			{
    				trace("back");
    				webView.historyBack();
    				event.preventDefault();
    			}
    			if( event.keyCode == Keyboard.SEARCH && webView.isHistoryForwardEnabled )
    			{
    				trace("forward");
    				webView.historyForward();
    			}
    		}
    	}
    }

## Focus

Even though it is not a display object, the StageWebView class contains members
that allow you to manage the focus transitions into and out of the control.

When the StageWebView object gains focus, it dispatches a `focusIn` event. You
use this event to manage the focus elements in your application, if necessary.

When the StageWebView relinquishes the focus, it dispatches a `focusOut` event.
A StageWebView instance can relinquish focus when a user "tabs" past the first
or last control on the web page using a device trackball or directional arrows.
The `direction` property of the event object lets you know whether the focus
flow is rising up past the top of the page or down through the bottom of the
page. Use this information to assign focus to the appropriate display object
above or below the StageWebView.

On iOS, focus cannot be set programmatically. StageWebView dispatches `focusIn`
and `focusOut` events with the direction property of `FocusEvent` set to `none`.
If the user touches inside the StageWebView, the `focusIn` event is dispatched.
If the user touches outside the StageWebView, the `focusOut` event is
dispatched.

The following example illustrates how focus passes from the StageWebView object
to Flash display objects:

    package
    {
    	import flash.display.MovieClip;
    	import flash.media.StageWebView;
    	import flash.geom.Rectangle;
    	import flash.events.KeyboardEvent;
    	import flash.ui.Keyboard;
    	import flash.text.TextField;
    	import flash.text.TextFieldType;
    	import flash.events.FocusEvent;
    	import flash.display.FocusDirection;
    	import flash.events.LocationChangeEvent;

    	public class StageWebViewFocusEvents extends MovieClip
    	{
    		var webView:StageWebView = new StageWebView();
    		var topControl:TextField = new TextField();
    		var bottomControl:TextField = new TextField();

    		public function StageWebViewFocusEvents()
    		{
    			trace("Starting");
    			topControl.type = TextFieldType.INPUT;
    			addChild( topControl );
    			topControl.height = 60;
    			topControl.width = stage.stageWidth;
    			topControl.background = true;
    			topControl.text = "One control on top.";
    			topControl.addEventListener( FocusEvent.FOCUS_IN, flashFocusIn );
    			topControl.addEventListener( FocusEvent.FOCUS_OUT, flashFocusOut );

    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle( 0, 60, stage.stageWidth, stage.stageHeight
    	- 120 );
    			webView.addEventListener( FocusEvent.FOCUS_IN, webFocusIn );
    			webView.addEventListener(FocusEvent.FOCUS_OUT, webFocusOut );
    			webView.addEventListener(LocationChangeEvent.LOCATION_CHANGING,
    									function( event:LocationChangeEvent ):void
    									{
    										event.preventDefault();
    									} );
    			webView.loadString("<form action='#'><input/><input/><input/></form>");
    			webView.assignFocus();

    			bottomControl.type = TextFieldType.INPUT;
    			addChild( bottomControl );
    			bottomControl.y = stage.stageHeight - 60;
    			bottomControl.height = 60;
    			bottomControl.width = stage.stageWidth;
    			bottomControl.background = true;
    			bottomControl.text = "One control on the bottom.";
    			bottomControl.addEventListener( FocusEvent.FOCUS_IN, flashFocusIn );
    			bottomControl.addEventListener( FocusEvent.FOCUS_OUT, flashFocusOut );
    		}

    		private function webFocusIn( event:FocusEvent ):void
    		{
    			trace("Web focus in");
    		}

    		private function webFocusOut( event:FocusEvent ):void
    		{
    			trace("Web focus out: " + event.direction);
    			if( event.direction == FocusDirection.TOP )
    			{
    				stage.focus = topControl;
    			}
    			else
    			{
    				stage.focus = bottomControl;
    			}
    		}

    		private function flashFocusIn( event:FocusEvent ):void
    		{
    			trace("Flash focus in");
    			var textfield:TextField = event.target as TextField;
    			textfield.backgroundColor = 0xff5566;
    		}

    		private function flashFocusOut( event:FocusEvent ):void
    		{
    			trace("Flash focus out");
    			var textfield:TextField = event.target as TextField;
    			textfield.backgroundColor = 0xffffff;
    		}

    	}
    }

## Bitmap capture

A StageWebView object is rendered above all display list content. You cannot add
a content above a StageWebView object. For example, you cannot expand a
drop-down over the StageWebView content. To solve this issue, capture a snapshot
of the StageWebView. Then, hide the StageWebView and add the bitmap snapshot
instead.

The following example illustrates how to capture the snapshot of a StageWebView
object using the `drawViewPortToBitmapData` method. It hides the StageWebView
object by setting the stage to null. After the web page is fully loaded, it
calls a function that captures the bitmap and displays it. When you run, the
code displays two labels, Google and Facebook. Clicking the label captures the
corresponding web page and displays it as a snapshot on the stage.

    package
    {
    	import flash.display.Bitmap;
    	import flash.display.BitmapData;
    	import flash.display.Sprite;
    	import flash.events.*;
    	import flash.geom.Rectangle;
    	import flash.media.StageWebView;
    	import flash.net.*;
    	import flash.text.TextField;
    	public class stagewebview extends Sprite
    	{
    		public var webView:StageWebView=new StageWebView();
    		public var textGoogle:TextField=new TextField();
    		public var textFacebook:TextField=new TextField();
    		public function stagewebview()
    		{
    			textGoogle.htmlText="<b>Google</b>";
    			textGoogle.x=300;
    			textGoogle.y=-80;
    			addChild(textGoogle);
    			textFacebook.htmlText="<b>Facebook</b>";
    			textFacebook.x=0;
    			textFacebook.y=-80;
    			addChild(textFacebook);
    			textGoogle.addEventListener(MouseEvent.CLICK,goGoogle);
    			textFacebook.addEventListener(MouseEvent.CLICK,goFaceBook);
    			webView.stage = this.stage;
    			webView.viewPort = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
    		}
    		public function goGoogle(e:Event):void
    		{
    			webView.loadURL("http://www.google.com");
    			webView.stage = null;
    			webView.addEventListener(Event.COMPLETE,handleLoad);
    		}

    		public function goFaceBook(e:Event):void
    		{
    			webView.loadURL("http://www.facebook.com");
    			webView.stage = null;
    			webView.addEventListener(Event.COMPLETE,handleLoad);
    		}
    		public function handleLoad(e:Event):void
    		{
    			var bitmapData:BitmapData = new BitmapData(webView.viewPort.width, webView.viewPort.height);
    			webView.drawViewPortToBitmapData(bitmapData);
    			var webViewBitmap:Bitmap=new Bitmap(bitmapData);
    			addChild(webViewBitmap);
    		}
    	}
    }

## Adobe recommends

> ### [![](../img/mark_doherty.png) AIR2.5 StageWebView demo – OAuth Support](https://web.archive.org/web/20110128070615/http://www.flashmobileblog.com/2010/07/17/air2-5-stagewebview-demo-oauth-support/)
>
> Evangelist
> [Mark Doherty](https://web.archive.org/web/20110220041349/http://www.flashmobileblog.com/about)
> demonstrates how to log in to an OAuth protected site like Twitter using the
> StageWebView class.

> ### ![](../img/sean_voisen.png) [Making the most of StageWebView](https://web.archive.org/web/20110512234900/http://voisen.org/blog/2010/10/making-the-most-of-stagewebview/)
>
> Sean Voisen

> ### ![](../img/jon_campos.png) [HTML Web View in Air for Android](https://web.archive.org/web/20120308132822/http://www.unitedmindset.com/jonbcampos/2010/09/16/html-web-view-in-air-for-android/)
>
> Jonathan Campos

> ### ![](../img/rich_tretola.png) [Create a basic web browser with StageWebView](https://web.archive.org/web/20120427213213/http://cookbooks.adobe.com/post_Create_a_basic_web_browser_with_StageWebView-18850.html)
>
> Rich Tretola

> ### ![](../img/sonke_rohde.png) [AIR Mobile StageWebView UIComponent](https://web.archive.org/web/20120114195133/http://soenkerohde.com/2010/11/air-mobile-stagewebview-uicomponent/)
>
> Sönke Rohde

> ### ![](../img/judah_frangipane.png) [Using StageWebView within a UIComponent in Mobile](https://web.archive.org/web/20120801215717/http://www.judahfrangipane.com/blog/2011/01/16/stagewebview-uicomponent/)
>
> Judah Frangipane
