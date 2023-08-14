---
sidebar_position: 6
---

# Troubleshooting

Hardware and software support for touch input is changing, rapidly. This
reference does not maintain a list of every device an operating system and
software combination that supports multitouch. However, it provides guidance on
using the discovery API to determine if your application is deployed on a device
that supports multitouch, and provides tips for troubleshooting your
ActionScript code.

Flash runtimes respond to touch events based on information the device,
operating system, or containing software (such as a browser) passes to the
runtime. This dependency on the software environment complicates documenting
multitouch compatibility. Some devices interpret a gesture or touch motion
differently than another device. Is rotation defined by two fingers rotating at
the same time? Is rotation one finger drawing a circle on a screen? Depending on
the hardware and software environment, the rotation gesture could be either, or
something entirely different. So, the device tells the operating system the user
input, then the operating system passes that information to the runtime. If the
runtime is inside a browser, the browser software sometimes interprets the
gesture or touch event and does not pass the input to the runtime. This behavior
is similar to the behavior of "hotkeys": you try to use a specific key
combination to get Flash Player to do something inside the browser and the
browser keeps opening a menu instead.

Individual API and classes mention if they're not compatible with specific
operating systems. You can explore individual API entries here, starting with
the Multitouch class:
<https://airsdk.dev/reference/actionscript/3.0/flash/ui/Multitouch.html>.

Here are some common gesture and touch descriptions:

Pan  
Move a finger left-to-right or right-to-left. Some devices require two fingers
to pan.

Rotate  
Touch two fingers down, then move them around in a circle (as if they're both
simultaneously tracing an imaginary circle on a surface). The pivot point is set
at the midpoint between the two finger touch points.

Swipe  
Move three fingers left-to-right or right-to-left, top-to-bottom, or
bottom-to-top, quickly.

Zoom  
Touch two fingers down, then move them away from each other to zoom in and
toward each other to zoom out.

Press-and-tap  
Move or press one finger, then tap the surface with another.

Each device has its own documentation about the gestures the device supports and
how to perform each gesture on that device. In general, the user must remove all
fingers from contact with the device between gestures, depending upon the
operating system.

If you find your application is not responding to touch events or gestures, test
the following:

1.  Do you have event listeners for touch or gesture events attached to an
    object class that inherits from the InteractiveObject class? Only
    InteractiveObject instances can listen for touch and gesture events

2.  Are you testing your application within Flash Professional CS5? If so, try
    publishing and testing the application, because Flash Professional can
    intercept the interaction.

3.  Start simple and see what does work, first (the following code example is
    from the API entry for `Multitouch.inputMode`:

        Multitouch.inputMode=MultitouchInputMode.TOUCH_POINT;
        var mySprite:Sprite = new Sprite();
        var myTextField:TextField = new TextField()

        mySprite.graphics.beginFill(0x336699);
        mySprite.graphics.drawRect(0,0,40,40);
        addChild(mySprite);

        mySprite.addEventListener(TouchEvent.TOUCH_TAP, taplistener);

        function taplistener(e:TouchEvent): void {
        	myTextField.text = "I've been tapped";
        	myTextField.y = 50;
        	addChild(myTextField);
        }

    Tap the rectangle. If this example works, then you know your environment
    supports a simple tap. Then you can try more complicated handling.

    Testing for gesture support is more complicated. An individual device or
    operating system supports any combination of gesture input, or none.

    Here is a simple test for the zoom gesture:

        Multitouch.inputMode = MultitouchInputMode.GESTURE;

        stage.addEventListener(TransformGestureEvent.GESTURE_ZOOM , onZoom);
        var myTextField = new TextField();
        myTextField.y = 200;
        myTextField.text = "Perform a zoom gesture";
        addChild(myTextField);

        function onZoom(evt:TransformGestureEvent):void {
        	myTextField.text = "Zoom is supported";
        }

    Perform a zoom gesture on the device and see if the text field populates
    with the message `Zoom is supported`. The event listener is added to the
    stage so you can perform the gesture on any part of the test application.

    Here is a simple test for the pan gesture:

        Multitouch.inputMode = MultitouchInputMode.GESTURE;

        stage.addEventListener(TransformGestureEvent.GESTURE_PAN , onPan);
        var myTextField = new TextField();
        myTextField.y = 200;
        myTextField.text = "Perform a pan gesture";
        addChild(myTextField);

        function onPan(evt:TransformGestureEvent):void {
        	myTextField.text = "Pan is supported";
        }

    Perform a pan gesture on the device and see if the text field populates with
    the message `Pan is supported`. The event listener is added to the stage so
    you can perform the gesture on any part of the test application.

    Some operating system and device combinations support both gestures, some
    support only one, some none. Test your application's deployment environment
    to be sure.

## Known Issues

The following are known issues related to touch input:

1.  Mobile Internet Explorer on Windows Mobile operating system automatically
    zooms SWF file content:

    This Internet Explorer zoom behavior is overridden by adding the following
    to the HTML page hosting the SWF file:

        <head>
        	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
        </head>

2.  Windows 7 (and possibly other operating systems), the user must lift the
    pointing device (or fingers) off the screen between gestures. For example:,
    to rotate and zoom an image:

    - Perform the rotate gesture.

    - Lift your fingers off the screen.

    - Put your fingers back onto the screen and perform the zoom gesture.

3.  Windows 7 (and possibly other operating systems), the rotate and zoom
    gestures don't always generate an "update" phase if the user performs the
    gesture very quickly.

4.  Windows 7 Starter Edition does not support multitouch. See the AIR Labs
    Forum for details: <http://forums.adobe.com/thread/579180?tstart=0>

5.  For Mac OS 10.5.3 and later, the `Multitouch.supportsGestureEvents` value is
    always `true`, even if the hardware does not support gesture events.
