# Using the StageVideo APIs

Stage video is a mechanism within the runtime that enhances video playback and
device performance. The runtime creates and maintains this mechanism; as a
developer, your role is to configure your application to take advantage of it.

To use stage video, you implement a framework of event handlers that detect when
stage video is and isn't available. When you receive notification that stage
video is available, you retrieve a StageVideo object from the
`Stage.stageVideos` property. The runtime populates this Vector object with one
or more StageVideo objects. You can then use one of the provided StageVideo
objects, rather than a Video object, to display streaming video.

On Flash Player, when you receive notification that stage video is no longer
available, switch your video stream back to a Video object.

Note: You cannot create StageVideo objects.

## Stage.stageVideos property

The `Stage.stageVideos` property is a Vector object that gives you access to
StageVideo instances. This vector can contain up to four StageVideo objects,
depending on hardware and system resources. Mobile devices can be limited to
one, or none.

When stage video is not available, this vector contains no objects. To avoid run
time errors, be sure that you access members of this vector only when the most
recent `StageVideoAvailability` event indicates that stage video is available.

## StageVideo events

The StageVideo API framework provides the following events:

StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY  
Sent when the `Stage.stageVideos` property changes. The
`StageVideoAvailabilityEvent.availability` property indicates either `AVAILABLE`
or `UNAVAILABLE`. Use this event to determine whether the `stageVideos` property
contains any StageVideo objects, rather than directly checking the length of the
`Stage.stageVideos` vector.

StageVideoEvent.RENDER_STATE  
Sent when a NetStream or Camera object has been attached to a StageVideo object
and is playing. Indicates the type of decoding currently in use: hardware,
software, or unavailable (nothing is displayed). The event target contains
`videoWidth` and `videoHeight` properties that are safe to use for resizing the
video viewport.

Important: Coordinates obtained from the StageVideo target object use Stage
coordinates, since they are not part of the standard display list.

VideoEvent.RENDER_STATE  
Sent when a Video object is being used. Indicates whether software or hardware
accelerated decoding is in use. If this event indicates hardware accelerated
decoding, switch to a StageVideo object if possible. The Video event target
contains `videoWidth` and `videoHeight` properties that are safe to use for
resizing the video viewport.

## Workflow for implementing the StageVideo feature

Follow these top-level steps to implement the StageVideo feature:

1.  Listen for the `StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY` event
    to find out when the `Stage.stageVideos` vector has changed. See
    [Using the StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY event](#using-the-stagevideoavailabilityeventstage_video_availability-event).

2.  If the `StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY` event reports
    that stage video is available, use the `Stage.stageVideos` Vector object
    within the event handler to access a StageVideo object.

3.  Attach a NetStream object using `StageVideo.attachNetStream()` or attach a
    Camera object using `StageVideo.attachCamera()`.

4.  Play the video using `NetStream.play()`.

5.  Listen for the `StageVideoEvent.RENDER_STATE` event on the StageVideo object
    to determine the status of playing the video. Receipt of this event also
    indicates that the width and height properties of the video have been
    initialized or changed. See
    [Using the StageVideoEvent.RENDER_STATE and VideoEvent.RENDER_STATE events](#using-the-stagevideoeventrender_state-and-videoeventrender_state-events).

6.  Listen for the `VideoEvent.RENDER_STATE` event on the Video object. This
    event provides the same statuses as `StageVideoEvent.RENDER_STATE,` so you
    can also use it to determine whether GPU acceleration is available. Receipt
    of this event also indicates that the width and height properties of the
    video have been initialized or changed. See
    [Using the StageVideoEvent.RENDER_STATE and VideoEvent.RENDER_STATE events](#using-the-stagevideoeventrender_state-and-videoeventrender_state-events).

## Initializing StageVideo event listeners

Set up your StageVideoAvailabilityEvent and VideoEvent listeners during
application initialization. For example, you can initialize these listeners in
the `flash.events.Event.ADDED_TO_STAGE` event handler. This event guarantees
that your application is visible on the stage:

    public class SimpleStageVideo extends Sprite
    private var nc:NetConnection;
    private var ns:NetStream;

    public function SimpleStageVideo()
    {
        // Constructor for SimpleStageVideo class
        // Make sure the app is visible and stage available
        addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
    }

    private function onAddedToStage(event:Event):void
    {
        //...
        // Connections
        nc = new NetConnection();
        nc.connect(null);
        ns = new NetStream(nc);
        ns.addEventListener(NetStatusEvent.NET_STATUS, onNetStatus);
        ns.client = this;

        // Screen
        video = new Video();
        video.smoothing = true;

        // Video Events
        // the StageVideoEvent.STAGE_VIDEO_STATE informs you whether
        // StageVideo is available
        stage.addEventListener(StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY,
            onStageVideoState);
        // in case of fallback to Video, listen to the VideoEvent.RENDER_STATE
        // event to handle resize properly and know about the acceleration mode running
        video.addEventListener(VideoEvent.RENDER_STATE, videoStateChange);
        //...
    }

## Using the StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY event

In the `StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY` handler, decide
whether to use a Video or StageVideo object based on the availability of
StageVideo. If the `StageVideoAvailabilityEvent.availability` property is set to
`StageVideoAvailability.AVAILABLE`, use StageVideo. In this case, you can rely
on the Stage.stageVideos vector to contain one or more StageVideo objects.
Obtain a StageVideo object from the `Stage.stageVideos` property and attach the
NetStream object to it. Because StageVideo objects always appear in the
background, remove any existing Video object (always in the foreground). You
also use this event handler to add a listener for the
`StageVideoEvent.RENDER_STATE` event.

If the `StageVideoAvailabilityEvent.availability` property is set to
`StageVideoAvailability.UNAVAILABLE`, do not use StageVideo or access the
`Stage.stageVideos` vector. In this case, attach the NetStream object to a Video
object. Finally, add the StageVideo or Video object to the stage and call
`NetStream.play()`.

The following code shows how to handle the
`StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY` event:

    private var sv:StageVideo;
    private var video:Video;

    private function onStageVideoState(event:StageVideoAvailabilityEvent):void
    {
    	// Detect if StageVideo is available and decide what to do in toggleStageVideo
    	toggleStageVideo(event.availability == StageVideoAvailability.AVAILABLE);
    }

    private function toggleStageVideo(on:Boolean):void
    {
    	// To choose StageVideo attach the NetStream to StageVideo
    	if (on)
    	{
    		stageVideoInUse = true;
    		if ( sv == null )
    		{
    			sv = stage.stageVideos[0];
    			sv.addEventListener(StageVideoEvent.RENDER_STATE, stageVideoStateChange);
    				sv.attachNetStream(ns);
    		}

    		if (classicVideoInUse)
    		{
    			// If you use StageVideo, remove from the display list the
    			// Video object to avoid covering the StageVideo object
    			// (which is always in the background)
    			stage.removeChild ( video );
    			classicVideoInUse = false;
    		}
    	}
    	else
    	{
    		// Otherwise attach it to a Video object
    		if (stageVideoInUse)
    			stageVideoInUse = false;
    		classicVideoInUse = true;
    		video.attachNetStream(ns);
    		stage.addChildAt(video, 0);
    	}

    	if ( !played )
    	{
    		played = true;
    		ns.play(FILE_NAME);
    	}
    }

Important: The first time an application accesses the vector element at
Stage.stageVideos\[0\], the default rect is set to 0,0,0,0, and pan and zoom
properties use default values. Always reset these values to your preferred
settings. You can use the `videoWidth` and `videoHeight` properties of the
`StageVideoEvent.RENDER_STATE` or `VideoEvent.RENDER_STATE` event target for
calculating the video viewport dimensions.

Download the full source code for this sample application at
[Getting Started with Stage Video](https://web.archive.org/web/20150228093631/http://www.adobe.com/devnet/flashplayer/articles/stage_video.html).

## Using the StageVideoEvent.RENDER_STATE and VideoEvent.RENDER_STATE events

StageVideo and Video objects send events that inform applications when the
display environment changes. These events are `StageVideoEvent.RENDER_STATE` and
`VideoEvent.RENDER_STATE`.

A StageVideo or Video object dispatches a render state event when a NetStream
object is attached and begins playing. It also sends this event when the display
environment changes; for example, when the video viewport is resized. Use these
notifications to reset your viewport to the current `videoHeight` and
`videoWidth` values of the event target object.

Reported render states include:

- `RENDER_STATUS_UNAVAILABLE`

- `RENDER_STATUS_SOFTWARE`

- `RENDER_STATUS_ACCELERATED`

Render states indicate when hardware accelerated decoding is in use, regardless
of which class is currently playing video. Check the `StageVideoEvent.status`
property to learn whether the necessary decoding is available. If this property
is set to "unavailable", the StageVideo object cannot play the video. This
status requires that you immediately reattach the NetStream object to a Video
object. Other statuses inform your application of the current rendering
conditions.

The following table describes the implications of all render status values for
StageVideoEvent and VideoEvent objects in Flash Player:

|                 | VideoStatus.ACCELERATED                                                                                                                     | VideoStatus.SOFTWARE                                                                                             | VideoStatus.UNAVAILABLE                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| StageVideoEvent | Decoding and presentation both occur in hardware. (Best performance.)                                                                       | Presentation in hardware, decoding in software. (Acceptable performance.)                                        | No GPU resources are available to handle video, and nothing is displayed. **Fall back to a Video object.** |
| VideoEvent      | Presentation in software, decoding in hardware. (Acceptable performance on a modern desktop system only. Degraded full-screen performance.) | Presentation in software, decoding in software. (Worst case performance-wise. Degraded full-screen performance.) | (N/A)                                                                                                      |

## Color spaces

Stage video uses underlying hardware capabilities to support color spaces. SWF
content can provide metadata indicating its preferred color space. However, the
device graphics hardware determines whether that color space can be used. One
device can support several color spaces, while another supports none. If the
hardware does not support the requested color space, Flash Player attempts to
find the closest match among the supported color spaces.

To query which color spaces the hardware supports, use the
`StageVideo.colorSpaces` property. This property returns the list of supported
color spaces in a String vector:

    var colorSpace:Vector.<String> = stageVideo.colorSpaces();

To learn which color space the currently playing video is using, check the
`StageVideoEvent.colorSpace` property. Check this property in your event handler
for the `StageVideoEvent.RENDER_STATE` event:

    var currColorSpace:String;

    //StageVideoEvent.RENDER_STATE event handler
    private function stageVideoRenderState(event:Object):void
    {
    	//...
    	currColorSpace = (event as StageVideoEvent).colorSpace;
    	//...
    }

If Flash Player cannot find a substitute for an unsupported color space, stage
video uses the default color space BT.601. For example, video streams with H.264
encoding typically use the BT.709 color space. If the device hardware does not
support BT.709, the `colorSpace` property returns `"BT601"`. A
`StageVideoEvent.colorSpace` value of `"unknown"` indicates that the hardware
does not provide a means of querying the color space.

If your application deems the current color space unacceptable, you can choose
to switch from a StageVideo object to a Video object. The Video class supports
all color spaces through software compositing.
