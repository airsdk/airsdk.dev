---
sidebar_position: 3
---

# Working with cameras

A camera attached to a user's computer can serve as a source of video data that
you can display and manipulate using ActionScript. The
[Camera](https://airsdk.dev/reference/actionscript/3.0/flash/media/Camera.html)
class is the mechanism built into ActionScript for working with a computer or
device camera.

On mobile devices, you can also use the
[CameraUI](https://airsdk.dev/reference/actionscript/3.0/flash/media/CameraUI.html)
class. The CameraUI class launches a separate camera application to allow the
user to capture a still image or video. When the user is finished, your
application can access the image or video through a
[MediaPromise](https://airsdk.dev/reference/actionscript/3.0/flash/media/MediaPromise.html)
object.

## Understanding the Camera class

The Camera object allows you to connect to the user's local camera and broadcast
the video either locally (back to the user) or remotely to a server (such as
Flash Media Server).

Using the Camera class, you can access the following kinds of information about
the user's camera:

- Which cameras installed on the user's computer or device are available

- Whether a camera is installed

- Whether Flash Player is allowed or denied access to the user's camera

- Which camera is currently active

- The width and height of the video being captured

The Camera class includes several useful methods and properties for working with
camera objects. For example, the static `Camera.names` property contains an
array of camera names currently installed on the user's computer. You can also
use the `name` property to display the name of the currently active camera.

Note: When streaming camera video across the network, you should always handle
network interruptions. Network interruptions can occur for many reasons,
particularly on mobile devices.

## Displaying camera content on screen

Connecting to a camera can require less code than using the NetConnection and
NetStream classes to load a video. The camera class can also quickly become
tricky because with Flash Player, you need a user's permission to connect to
their camera before you can access it.

The following code demonstrates how you can use the Camera class to connect to a
user's local camera:

    var cam:Camera = Camera.getCamera();
    var vid:Video = new Video();
    vid.attachCamera(cam);
    addChild(vid);

Note: The Camera class does not have a constructor method. In order to create a
new Camera instance you use the static `Camera.getCamera()` method.

## Designing your camera application

When writing an application that connects to a user's camera, you need to
account for the following in your code:

- Check if the user has a camera currently installed. Handle the case where no
  camera is available.

- For Flash Player only, check if the user has explicitly allowed access to the
  camera. For security reasons the player displays the Flash Player Settings
  dialog which lets the user allow or deny access to their camera. This prevents
  Flash Player from connecting to a user's camera and broadcasting a video
  stream without their permission. If a user clicks allow, your application can
  connect to the user's camera. If the user clicks deny, your application will
  be unable to access the user's camera. Your applications should always handle
  both cases gracefully.

- For AIR only, check whether the Camera class is supported for the device
  profiles supported by your application.

- The Camera class is not supported in mobile browsers.

- The Camera class is not supported in mobile AIR apps that use the GPU
  rendering mode.

- On mobile devices, only one camera can be active at a time.

## Connecting to a user's camera

The first step when connecting to a user's camera is to create a new camera
instance by creating a variable of type Camera and initializing it to the return
value of the static `Camera.getCamera()` method.

The next step is to create a new video object and attach the Camera object to
it.

The third step is to add the video object to the display list. You need to
perform steps 2 and 3 because the Camera class does not extend the DisplayObject
class so it cannot be added directly to the display list. To display the
camera's captured video, you create a new video object and call the
`attachCamera()` method.

The following code shows these three steps:

    var cam:Camera = Camera.getCamera();
    var vid:Video = new Video();
    vid.attachCamera(cam);
    addChild(vid);

Note that if a user does not have a camera installed, the application does not
display anything.

In real life, you need to perform additional steps for your application. See
[Verifying that cameras are installed](#verifying-that-cameras-are-installed)
and
[Detecting permissions for camera access](#detecting-permissions-for-camera-access)
for further information.

## Verifying that cameras are installed

Before you attempt to use any methods or properties on a camera instance, you'll
want to verify that the user has a camera installed. There are two ways to check
whether the user has a camera installed:

- Check the static `Camera.names` property which contains an array of camera
  names which are available. Typically this array will have one or fewer
  strings, as most users will not likely have more than one camera installed at
  a time. The following code demonstrates how you could check the `Camera.names`
  property to see if the user has any available cameras:

      if (Camera.names.length > 0)
      {
      	trace("User has at least one camera installed.");
      	var cam:Camera = Camera.getCamera(); // Get default camera.
      }
      else
      {
      	trace("User has no cameras installed.");
      }

- Check the return value of the static `Camera.getCamera()` method. If no
  cameras are available or installed, this method returns `null`, otherwise it
  returns a reference to a Camera object. The following code demonstrates how
  you could check the `Camera.getCamera()` method to see if the user has any
  available cameras:

      var cam:Camera = Camera.getCamera();
      if (cam == null)
      {
      	trace("User has no cameras installed.");
      }
      else
      {
      	trace("User has at least 1 camera installed.");
      }

Since the Camera class doesn't extend the DisplayObject class, it cannot be
directly added to the display list using the `addChild()` method. In order to
display the camera's captured video, you need to create a new Video object and
call the `attachCamera()` method on the Video instance.

This snippet shows how you can attach the camera if one exists; if not, the
application simply displays nothing:

    var cam:Camera = Camera.getCamera();
    if (cam != null)
    {
    	var vid:Video = new Video();
    	vid.attachCamera(cam);
    	addChild(vid);
    }

#### Mobile device cameras

The Camera class is not supported in the Flash Player runtime in mobile
browsers.

In AIR applications on mobile devices you can access the camera or cameras on
the device. On mobile devices, you can use both the front- and the back-facing
camera, but only one camera output can be displayed at any given time.
(Attaching a second camera will detach the first.) The front-facing camera is
horizontally mirrored on iOS, on Android, it is not.

## Detecting permissions for camera access

In the AIR application sandbox, the application can access any camera without
the user's permission. On Android, however, the application must specify the
Android CAMERA permission in the application descriptor.

Before Flash Player can display a camera's output, the user must explicitly
allow Flash Player to access the camera. When the `attachCamera()` method gets
called Flash Player displays the Flash Player Settings dialog box which prompts
the user to either allow or deny Flash Player access to the camera and
microphone. If the user clicks the Allow button, Flash Player displays the
camera's output in the Video instance on the Stage. If the user clicks the Deny
button, Flash Player is unable to connect to the camera and the Video object
does not display anything.

If you want to detect whether the user allowed Flash Player access to the
camera, you can listen for the camera's `status` event ( `StatusEvent.STATUS`),
as seen in the following code:

    var cam:Camera = Camera.getCamera();
    if (cam != null)
    {
    	cam.addEventListener(StatusEvent.STATUS, statusHandler);
    	var vid:Video = new Video();
    	vid.attachCamera(cam);
    	addChild(vid);
    }
    function statusHandler(event:StatusEvent):void
    {
    	// This event gets dispatched when the user clicks the "Allow" or "Deny"
    	// button in the Flash Player Settings dialog box.
    	trace(event.code); // "Camera.Muted" or "Camera.Unmuted"
    }

The `statusHandler()` function gets called as soon as the user clicks either
Allow or Deny. You can detect which button the user clicked, using one of two
methods:

- The `event` parameter of the `statusHandler()` function contains a code
  property which contains the string "Camera.Muted" or "Camera.Unmuted". If the
  value is "Camera.Muted" the user clicked the Deny button and Flash Player is
  unable to access the camera. You can see an example of this in the following
  snippet:

      function statusHandler(event:StatusEvent):void
      {
      	switch (event.code)
      	{
        	  case "Camera.Muted":
            	  trace("User clicked Deny.");
              	break;
          	case "Camera.Unmuted":
              	trace("User clicked Accept.");
              	break;
      	}
      }

- The Camera class contains a read-only property named `muted` which specifies
  whether the user has denied access to the camera ( `true`) or allowed access (
  `false`) in the Flash Player Privacy panel. You can see an example of this in
  the following snippet:

      function statusHandler(event:StatusEvent):void
      {
      	if (cam.muted)
      	{
      		trace("User clicked Deny.");
      	}
      	else
      	{
      		trace("User clicked Accept.");
      	}
      }

By checking for the status event to be dispatched, you can write code that
handles the user accepting or denying access to the camera and clean up
appropriately. For example, if the user clicks the Deny button, you could
display a message to the user stating that they need to click Allow if they want
to participate in a video chat, or you could instead make sure the Video object
on the display list is deleted to free up system resources.

In AIR, a Camera object does not dispatch status events since permission to use
the camera is not dynamic.

## Maximizing camera video quality

By default, new instances of the Video class are 320 pixels wide by 240 pixels
high. In order to maximize video quality you should always ensure that your
video object matches the same dimensions as the video being returned by the
camera object. You can get the camera object's width and height by using the
Camera class's `width` and `height` properties, you can then set the video
object's `width` and `height` properties to match the camera objects dimensions,
or you can pass the camera's width and height to the Video class's constructor
method, as seen in the following snippet:

    var cam:Camera = Camera.getCamera();
    if (cam != null)
    {
    	var vid:Video = new Video(cam.width, cam.height);
    	vid.attachCamera(cam);
    	addChild(vid);
    }

Since the `getCamera()` method returns a reference to a camera object (or `null`
if no cameras are available) you can access the camera's methods and properties
even if the user denies access to their camera. This allows you to set the size
of the video instance using the camera's native height and width.

    var vid:Video;
    var cam:Camera = Camera.getCamera();

    if (cam == null)
    {
    	trace("Unable to locate available cameras.");
    }
    else
    {
    	trace("Found camera: " + cam.name);
    	cam.addEventListener(StatusEvent.STATUS, statusHandler);
    	vid = new Video();
    	vid.attachCamera(cam);
    }
    function statusHandler(event:StatusEvent):void
    {
    	if (cam.muted)
    	{
    		trace("Unable to connect to active camera.");
    	}
    	else
    	{
    		// Resize Video object to match camera settings and
    		// add the video to the display list.
    		vid.width = cam.width;
    		vid.height = cam.height;
    		addChild(vid);
    	}
    	// Remove the status event listener.
    	cam.removeEventListener(StatusEvent.STATUS, statusHandler);
    }

For information about full-screen mode, see the full-screen mode section under
[Setting Stage properties](../display/display-programming/working-with-display-objects/setting-stage-properties.md).

## Monitoring camera status

The camera class contains several properties which allow you to monitor the
Camera object's current status. For example, the following code displays several
of the camera's properties using a Timer object and a text field instance on the
display list:

    var vid:Video;
    var cam:Camera = Camera.getCamera();
    var tf:TextField = new TextField();
    tf.x = 300;
    tf.autoSize = TextFieldAutoSize.LEFT;
    addChild(tf);

    if (cam != null)
    {
    	cam.addEventListener(StatusEvent.STATUS, statusHandler);
    	vid = new Video();
    	vid.attachCamera(cam);
    }
    function statusHandler(event:StatusEvent):void
    {
    	if (!cam.muted)
    	{
    		vid.width = cam.width;
    		vid.height = cam.height;
    		addChild(vid);
    		t.start();
    	}
    	cam.removeEventListener(StatusEvent.STATUS, statusHandler);
    }

    var t:Timer = new Timer(100);
    t.addEventListener(TimerEvent.TIMER, timerHandler);
    function timerHandler(event:TimerEvent):void
    {
    	tf.text = "";
    	tf.appendText("activityLevel: " + cam.activityLevel + "\n");
    	tf.appendText("bandwidth: " + cam.bandwidth + "\n");
    	tf.appendText("currentFPS: " + cam.currentFPS + "\n");
    	tf.appendText("fps: " + cam.fps + "\n");
    	tf.appendText("keyFrameInterval: " + cam.keyFrameInterval + "\n");
    	tf.appendText("loopback: " + cam.loopback + "\n");
    	tf.appendText("motionLevel: " + cam.motionLevel + "\n");
    	tf.appendText("motionTimeout: " + cam.motionTimeout + "\n");
    	tf.appendText("quality: " + cam.quality + "\n");
    }

Every 1/10 of a second (100 milliseconds) the Timer object's `timer` event is
dispatched and the `timerHandler()` function updates the text field on the
display list.

More Help topics

[Christian Cantrell: How to use CameraUI in a Cross-platform Way](https://web.archive.org/web/20160424032356/http://blogs.adobe.com/cantrell/archives/2011/02/how-to-use-cameraui-in-a-cross-platform-way.html)

[Michaël CHAIZE: Android, AIR and the Camera](https://web.archive.org/web/20160316185243/http://www.riagora.com/2010/07/android-air-and-the-camera/)

[Christophe Coenraets: Multi-User Video Tic-Tac-Toe](https://web.archive.org/web/20160315102228/http://coenraets.org/blog/2010/08/multi-user-video-tic-tac-toe-for-android/)

[Mark Doherty: Android Radar app (source)](https://web.archive.org/web/20120710014226/http://www.flashmobileblog.com/2010/10/14/facebook-connect-with-air-on-android/)

[Lee Brimelow: How to access the camera on Android devices](https://web.archive.org/web/20120119025225/http://www.gotoandlearn.com/play.php?id=124)
