---
sidebar_position: 6
---

# Playing video in full-screen mode

Flash Player and AIR allow you to create a full-screen application for your
video playback, and support scaling video to full screen.

For AIR content running in full-screen mode on the desktop, the system screen
saver and power-saving options are disabled during play until either the video
input stops or the user exits full-screen mode.

For full details on using full-screen mode, see
[Working with full-screen mode](../../display/display-programming/working-with-display-objects/setting-stage-properties.md#working-with-full-screen-mode).

#### Enabling full-screen mode for Flash Player in a browser

Before you can implement full-screen mode for Flash Player in a browser, enable
it through the Publish template for your application. Templates that allow full
screen include `<object>` and `<embed>` tags that contain an `allowFullScreen`
parameter. The following example shows the `allowFullScreen` parameter in an
`<embed>` tag.

    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    	id="fullScreen" width="100%" height="100%"
    	codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
    	...
    	<param name="allowFullScreen" value="true" />
    	<embed src="fullScreen.swf" allowFullScreen="true" quality="high" bgcolor="#869ca7"
    		width="100%" height="100%" name="fullScreen" align="middle"
    		play="true"
    		loop="false"
    		quality="high"
    		allowScriptAccess="sameDomain"
    		type="application/x-shockwave-flash"
    		pluginspage="https://www.adobe.com/go/getflashplayer">
    	</embed>
    	...
    </object>

In Flash, select File -\> Publish Settings and in the Publish Settings dialog
box, on the HTML tab, select the Flash Only - Allow Full Screen template.

In Flex, ensure that the HTML template includes `<object>` and `<embed>` tags
that support full screen.

#### Initiating full-screen mode

For Flash Player content running in a browser, you initiate full-screen mode for
video in response to either a mouse click or a keypress. For example, you can
initiate full-screen mode when the user clicks a button labeled Full Screen or
selects a Full Screen command from a context menu. To respond to the user, add
an event listener to the object on which the action occurs. The following code
adds an event listener to a button that the user clicks to enter full-screen
mode:

    var fullScreenButton:Button = new Button();
    fullScreenButton.label = "Full Screen";
    addChild(fullScreenButton);
    fullScreenButton.addEventListener(MouseEvent.CLICK, fullScreenButtonHandler);

    function fullScreenButtonHandler(event:MouseEvent)
    {
    	stage.displayState = StageDisplayState.FULL_SCREEN;
    }

The code initiates full-screen mode by setting the `Stage.displayState` property
to `StageDisplayState.FULL_SCREEN`. This code scales the entire stage to full
screen with the video scaling in proportion to the space it occupies on the
stage.

The `fullScreenSourceRect` property allows you to specify a particular area of
the stage to scale to full screen. First, define the rectangle that you want to
scale to full screen. Then assign it to the `Stage.fullScreenSourceRect`
property. This version of the `fullScreenButtonHandler()` function adds two
additional lines of code that scale just the video to full screen.

    private function fullScreenButtonHandler(event:MouseEvent)
    {
    	var screenRectangle:Rectangle = new Rectangle(video.x, video.y, video.width, video.height);
    	stage.fullScreenSourceRect = screenRectangle;
    	stage.displayState = StageDisplayState.FULL_SCREEN;
    }

Though this example invokes an event handler in response to a mouse click, the
technique of going to full-screen mode is the same for both Flash Player and
AIR. Define the rectangle that you want to scale and then set the
`Stage.displayState` property. For more information, see the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).

The complete example, which follows, adds code that creates the connection and
the NetStream object for the video and begins to play it.

    package
    {
    	import flash.net.NetConnection;
    	import flash.net.NetStream;
    	import flash.media.Video;
    	import flash.display.StageDisplayState;
    	import fl.controls.Button;
    	import flash.display.Sprite;
    	import flash.events.MouseEvent;
    	import flash.events.FullScreenEvent;
    	import flash.geom.Rectangle;

    	public class FullScreenVideoExample extends Sprite
    	{
    		var fullScreenButton:Button = new Button();
    		var video:Video = new Video();

    		public function FullScreenVideoExample()
    		{
    			var videoConnection:NetConnection = new NetConnection();
    			videoConnection.connect(null);

    			var videoStream:NetStream = new NetStream(videoConnection);
    			videoStream.client = this;

    			addChild(video);

    			video.attachNetStream(videoStream);

    			videoStream.play("http://www.helpexamples.com/flash/video/water.flv");

    			fullScreenButton.x = 100;
    			fullScreenButton.y = 270;
    			fullScreenButton.label = "Full Screen";
    			addChild(fullScreenButton);
    			fullScreenButton.addEventListener(MouseEvent.CLICK, fullScreenButtonHandler);
    		}

    		private function fullScreenButtonHandler(event:MouseEvent)
    		{
    			var screenRectangle:Rectangle = new Rectangle(video.x, video.y, video.width, video.height);
    			stage.fullScreenSourceRect = screenRectangle;
    			stage.displayState = StageDisplayState.FULL_SCREEN;
    		}

    		public function onMetaData(infoObject:Object):void
    		{
    			// stub for callback function
    		}
    	}
    }

The `onMetaData()` function is a callback function for handling video metadata,
if any exists. A callback function is a function that the runtime calls in
response to some type of occurrence or event. In this example, the
`onMetaData()` function is a stub that satisfies the requirement to provide the
function. For more information, see
[Writing callback methods for metadata and cue points](./writing-callback-methods-for-metadata-and-cue-points.md)

#### Leaving full-screen mode

A user can leave full-screen mode by entering one of the keyboard shortcuts,
such as the Escape key. You can end full-screen mode in ActionScript by setting
the `Stage.displayState` property to `StageDisplayState.NORMAL`. The code in the
following example ends full-screen mode when the NetStream.Play.Stop `netStatus`
event occurs.

    videoStream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);

    private function netStatusHandler(event:NetStatusEvent)
    {
    	if(event.info.code == "NetStream.Play.Stop")
    		stage.displayState = StageDisplayState.NORMAL;
    }

#### Full-screen hardware acceleration

When you rescale a rectangular area of the stage to full-screen mode, Flash
Player or AIR uses hardware acceleration, if it's available and enabled. The
runtime uses the video adapter on the computer to speed up scaling of the video,
or a portion of the stage, to full-screen size. Under these circumstances, Flash
Player applications can often profit by switching to the StageVideo class from
the Video class (or Camera class; Flash Player 11.4/AIR 3.4 and higher).

For more information on hardware acceleration in full-screen mode, see
[Working with full-screen mode](../../display/display-programming/working-with-display-objects/setting-stage-properties.md#working-with-full-screen-mode).
For more information on StageVideo, see
[Using the StageVideo class for hardware accelerated presentation](./using-the-stagevideo-class.md).
