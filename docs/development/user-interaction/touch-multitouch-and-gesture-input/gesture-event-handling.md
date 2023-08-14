---
sidebar_position: 5
---

# Gesture event handling

Handle gesture events in the same way as basic touch events. You can listen for
a series of gesture events defined by the event type constants in the
[TransformGestureEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/TransformGestureEvent.html)
class, the
[GestureEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/GestureEvent.html)
class and the
[PressAndTapGestureEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/PressAndTapGestureEvent.html)
class.

To handle a gesture touch event:

1.  Set your application to handle gesture input by setting the
    `flash.ui.Multitouch.inputMode` property to `MultitouchInputMode.GESTURE`.

2.  Attach an event listener to an instance of a class that inherits properties
    from the InteractiveObject class, such as Sprite or TextField.

3.  Specify the type of gesture event to handle.

4.  Call an event handler function to do something in response to the event.

For example, the following code displays a message when the square drawn on
`mySprite` is swiped on a touch-enabled screen:

    Multitouch.inputMode=MultitouchInputMode.GESTURE;

    var mySprite:Sprite = new Sprite();
    var myTextField:TextField = new TextField();

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);

    mySprite.addEventListener(TransformGestureEvent.GESTURE_SWIPE, swipehandler);

    function swipehandler(evt:TransformGestureEvent): void {
    	myTextField.text = "I've been swiped";
    	myTextField.y = 50;
    	addChild(myTextField);
    }

Two-finger tap events are handled the same way, but use the GestureEvent class:

    Multitouch.inputMode=MultitouchInputMode.GESTURE;

    var mySprite:Sprite = new Sprite();
    var myTextField:TextField = new TextField();

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);

    mySprite.addEventListener(GestureEvent.GESTURE_TWO_FINGER_TAP, taphandler);

    function taphandler(evt:GestureEvent): void {
    	myTextField.text = "I've been two-finger tapped";
    	myTextField.y = 50;
    	addChild(myTextField);
    }

Press-and-tap events are also handled the same way, but use the
PressAndTapGestureEvent class:

    Multitouch.inputMode=MultitouchInputMode.GESTURE;

    var mySprite:Sprite = new Sprite();
    var myTextField:TextField = new TextField();

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);

    mySprite.addEventListener(PressAndTapGestureEvent.ESTURE_PRESS_AND_TAP, taphandler);

    function taphandler(evt:PressAndTapGestureEvent): void {
    	myTextField.text = "I've been press-and-tapped";
    	myTextField.y = 50;
    	addChild(myTextField);
    }

Note: Not all GestureEvent, TransformGestureEvent, and PressAndTapGestureEvent
event types are supported in all runtime environments. For example, not all
touch-enabled devices are capable or detecting a multi-finger swipe. So, the
InteractiveObject `gestureSwipe` events are not supported on those devices. Try
testing for specific event support to ensure your application works, and see
[Troubleshooting](./troubleshooting.md) for more information.

## Gesture Event properties

Gesture events have a smaller scope of event properties than basic touch events.
You access them the same way, through the event object in the event handler
function.

For example, the following code rotates `mySprite` as the user performs a
rotation gesture on it. The text field shows the amount of rotation since the
last gesture (when testing this code, rotate it several times to see the values
change):

    Multitouch.inputMode=MultitouchInputMode.GESTURE;

    var mySprite:Sprite = new Sprite();
    var mySpriteCon:Sprite = new Sprite();
    var myTextField:TextField = new TextField();
    myTextField.y = 50;
    addChild(myTextField);

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(-20,-20,40,40);
    mySpriteCon.addChild(mySprite);
    mySprite.x = 20;
    mySprite.y = 20;
    addChild(mySpriteCon);

    mySprite.addEventListener(TransformGestureEvent.GESTURE_ROTATE, rothandler);

    function rothandler(evt:TransformGestureEvent): void {
    	evt.target.parent.rotationZ += evt.target.rotation;
    	myTextField.text = evt.target.parent.rotation.toString();
    }

Note: Not all TransformGestureEvent properties are supported in all runtime
environments. For example, not all touch-enabled devices are capable or
detecting the rotation of a gesture on the screen. So, the
`TransformGestureEvent.rotation` property is not supported on those devices. Try
testing for specific property support to ensure your application works, and see
[Troubleshooting](./troubleshooting.md) for more information.

## Gesture phases

Additionally, the gesture events can be tracked through phases, so you can track
properties as the gesture is taking place. For example, you can track
x-coordinates as an object is moved with a swipe gesture. Use those values to
draw a line through all the points in its path after the swipe is complete. Or,
visually change a display object as it is dragged across a screen using a pan
gesture. Change the object again once the pan gesture is complete.

    Multitouch.inputMode = MultitouchInputMode.GESTURE;
    var mySprite = new Sprite();
    mySprite.addEventListener(TransformGestureEvent.GESTURE_PAN , onPan);
    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0, 0, 40, 40);
    var myTextField = new TextField();
    myTextField.y = 200;
    addChild(mySprite);
    addChild(myTextField);

    function onPan(evt:TransformGestureEvent):void {
    	evt.target.localX++;

    	if (evt.phase==GesturePhase.BEGIN) {
    		myTextField.text = "Begin";
    		evt.target.scaleX *= 1.5;
    		evt.target.scaleY *= 1.5;
    	}
    	if (evt.phase==GesturePhase.UPDATE) {
    		myTextField.text = "Update";
    		evt.target.alpha = 0.5;
    	}
    	if (evt.phase==GesturePhase.END) {
    		myTextField.text = "End";
    		evt.target.width = 40;
    		evt.target.height = 40;
    		evt.target.alpha = 1;
    	}
    }

Note: The frequency of the update phase depends on the runtime's environment.
Some operating system and hardware combinations do not relay updates at all.

### Gesture phase is "all" for simple gesture events

Some gesture event objects do not track individual phases of the gesture event,
and instead populate the event object's phase property with the value all. The
simple gestures swipe and two-finger tap do not track the event by multiple
phases. The `phase` property of the event object for an InteractiveObject
listening for the `gestureSwipe` or `gestureTwoFingerTap` events is always `all`
once the event is dispatched:

    Multitouch.inputMode = MultitouchInputMode.GESTURE;
    var mySprite = new Sprite();
    mySprite.addEventListener(TransformGestureEvent.GESTURE_SWIPE, onSwipe);
    mySprite.addEventListener(GestureEvent.GESTURE_TWO_FINGER_TAP, onTwoTap);
    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0, 0, 40, 40);
    var myTextField = new TextField();
    myTextField.y = 200;
    addChild(mySprite);
    addChild(myTextField);

    function onSwipe(swipeEvt:TransformGestureEvent):void {
    	myTextField.text = swipeEvt.phase // Output is "all"
    }
    function onTwoTap(tapEvt:GestureEvent):void {
    	myTextField.text = tapEvt.phase // Output is "all"
    }
