---
sidebar_position: 3
---

# Touch event handling

Basic touch events are handled the same way you handle other events, like mouse
events, in ActionScript. You can listen for a series of touch events defined by
the event type constants in the
[TouchEvent class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Multitouch.html).

Note: For multiple touch point input (such as touching a device with more than
one finger), the first point of contact dispatches a mouse event and a touch
event.

To handle a basic touch event:

1.  Set your application to handle touch events by setting the
    `flash.ui.Multitouch.inputMode` property to
    `MultitouchInputMode.TOUCH_POINT`.

2.  Attach an event listener to an instance of a class that inherits properties
    from the InteractiveObject class, such as Sprite or TextField.

3.  Specify the type of touch event to handle.

4.  Call an event handler function to do something in response to the event.

For example, the following code displays a message when the square drawn on
mySprite is tapped on a touch-enabled screen:

    Multitouch.inputMode=MultitouchInputMode.TOUCH_POINT;

    var mySprite:Sprite = new Sprite();
    var myTextField:TextField = new TextField();

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);

    mySprite.addEventListener(TouchEvent.TOUCH_TAP, taphandler);

    function taphandler(evt:TouchEvent): void {
    	myTextField.text = "I've been tapped";
    	myTextField.y = 50;
    	addChild(myTextField);
    }

## Touch Event properties

When an event occurs, an event object is created. The TouchEvent object contains
information about the location and conditions of the touch event. You can use
the properties of the event object to retrieve that information.

For example, the following code creates a TouchEvent object `evt`, and then
displays the `stageX` property of the event object (the x-coordinate of the
point in the Stage space that the touch occurred) in the text field:

    Multitouch.inputMode=MultitouchInputMode.TOUCH_POINT;

    var mySprite:Sprite = new Sprite();
    var myTextField:TextField = new TextField();

    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);

    mySprite.addEventListener(TouchEvent.TOUCH_TAP, taphandler);

    function taphandler(evt:TouchEvent): void {
    	myTextField.text = evt.stageX.toString;
    	myTextField.y = 50;
    	addChild(myTextField);
    }

See the
[TouchEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/TouchEvent.html)
class for the properties available through the event object.

Note: Not all TouchEvent properties are supported in all runtime environments.
For example, not all touch-enabled devices are capable or detecting the amount
of pressure the user is applying to the touch screen. So, the
`TouchEvent.pressure` property is not supported on those devices. Try testing
for specific property support to ensure your application works, and see
[Troubleshooting](./troubleshooting.md) for more information.

## Touch event phases

Track touch events through various stages over and outside an InteractiveObject
just as you do for mouse events. And, track touch events through the beginning,
middle, and end of a touch interaction. The TouchEvent class provides values for
handling `touchBegin`, `touchMove`, and `touchEnd` events.

For example, you could use `touchBegin`, `touchMove`, and `touchEnd` events to
give the user visual feedback as they touch and move a display object:

    Multitouch.inputMode = MultitouchInputMode.TOUCH_POINT;
    var mySprite:Sprite = new Sprite();
    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);
    var myTextField:TextField = new TextField();
    myTextField.width = 200;
    myTextField.height = 20;
    addChild(myTextField);

    mySprite.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
    stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
    stage.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
    function onTouchBegin(event:TouchEvent) {
    	myTextField.text = "touch begin" + event.touchPointID;
    }
    function onTouchMove(event:TouchEvent) {
    	myTextField.text = "touch move" + event.touchPointID;
    }
    function onTouchEnd(event:TouchEvent) {
    	myTextField.text = "touch end" + event.touchPointID;
    }

Note: The initial touch listener is attached to mySprite, but the listeners for
moving and ending the touch event are not. If the users's finger or pointing
devices moves ahead of the display object, the Stage continues to listen for the
touch event.

### Touch Point ID

The `TouchEvent.touchPointID` property is an essential part of writing
applications that respond to touch input. The Flash runtime assigns each point
of touch a unique `touchPointID` value. Whenever an application responds to the
phases or movement of touch input, check the `touchPointID` before handling the
event. The touch input dragging methods of the Sprite class use the
`touchPointID` property as a parameter so the correct input instance is handled.
The `touchPointID` property ensures that an event handler is responding to the
correct touch point. Otherwise, the event handler responds to any instances of
the touch event type (such as all `touchMove` events) on the device, producing
unpredictable behavior. The property is especially important when the user is
dragging objects.

Use the `touchPointID` property to manage an entire touch sequence. A touch
sequence has one `touchBegin` event, zero or more `touchMove` events, and one
`touchEnd` event that all have the same `touchPointID` value.

The following example establishes a variable `touchMoveID` to test for the
correct `touchPointID` value before responding to a touch move event. Otherwise,
other touch input triggers the event handler, too. Notice the listeners for the
move and end phases are on the stage, not the display object. The stage listens
for the move or end phases in case the user's touch moves beyond the display
object boundaries.

    Multitouch.inputMode = MultitouchInputMode.TOUCH_POINT;
    var mySprite:Sprite = new Sprite();
    mySprite.graphics.beginFill(0x336699);
    mySprite.graphics.drawRect(0,0,40,40);
    addChild(mySprite);
    var myTextField:TextField = new TextField();
    addChild(myTextField);
    myTextField.width = 200;
    myTextField.height = 20;
    var touchMoveID:int = 0;

    mySprite.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
    function onTouchBegin(event:TouchEvent) {
    	if(touchMoveID != 0) {
    		myTextField.text = "already moving. ignoring new touch";
    		return;
    	}
    	touchMoveID = event.touchPointID;

    	myTextField.text = "touch begin" + event.touchPointID;
    	stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
    	stage.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
    }
    function onTouchMove(event:TouchEvent) {
    	if(event.touchPointID != touchMoveID) {
    		myTextField.text = "ignoring unrelated touch";
    		return;
    	}
    	mySprite.x = event.stageX;
    	mySprite.y = event.stageY;
    	myTextField.text = "touch move" + event.touchPointID;
    }
    function onTouchEnd(event:TouchEvent) {
    	if(event.touchPointID != touchMoveID) {
    		myTextField.text = "ignoring unrelated touch end";
    		return;
    	}
    	touchMoveID = 0;
    	stage.removeEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
    	stage.removeEventListener(TouchEvent.TOUCH_END, onTouchEnd);
    	myTextField.text = "touch end" + event.touchPointID;
    }
