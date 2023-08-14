---
sidebar_position: 2
---

# Touch support discovery

Use the
[Multitouch class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Multitouch.html)
properties to set the scope of touch input your application handles. Then, test
the environment to ensure that support exists for the events your ActionScript
handles. Specifically, first establish the type of touch input for your
application. The options are: touch point, gesture, or none (interpret all touch
input as mouse clicks and use mouse event handlers, only). Then, use the
properties and methods of the Multitouch class to make sure that the runtime is
in an environment that supports the touch input your application requires. Test
the runtime environment for support of the types of touch input (such as whether
it can interpret gestures), and respond accordingly.

Note: The Multitouch class properties are static properties, and do not belong
to instances of any class. Use them with the syntax Multitouch.property, for
example:

    var touchSupport:Boolean = Multitouch.supportsTouchEvents;

## Set the input type

The Flash runtime must know the type of touch input to interpret, because a
touch event can have many elements or phases. If a finger simply touches a
touch-enabled screen, does the runtime dispatch a touch event? Or does it wait
for a gesture? Or does the runtime track the touch as a mouse-down event? An
application that supports touch input must establish the type of touch events it
handles for the Flash runtime. Use the `Multitouch.inputMode` property to
establish the type of touch input for the runtime. The input mode can be one of
three options:

None  
No special handling is provided for touch events. Set:
`Multitouch.inputMode=MultitouchInputMode.NONE` and use the MouseEvent class to
handle input.

Single touch points  
All touch input is interpreted, individually, and all touch points can be
tracked and handled. Set: `Multitouch.inputMode=MultitouchInputMode.TOUCH_POINT`
and use the TouchEvent class to handle input.

Gesture input  
The device or operating system interprets input as a complex form of finger
movement across the screen. The device or operating system collectively assigns
the movement to a single gesture input event. Set:
`Multitouch.inputMode=MultitouchInputMode.GESTURE` and use the
TransformGestureEvent, PressAndTapGestureEvent, or GestureEvent classes to
handle input.

See [Touch event handling](./touch-event-handling.md) for an example that uses
the `Multitouch.inputMode` property to set the input type before handling a
touch event.

## Test for touch input support

Other properties of the Multitouch class provide values for fine-tuning your
application to the current environment's touch support. The Flash runtime
populates values for the number of simultaneous touch points allowed or gestures
available. If the runtime is in an environment that does not support the touch
event handling your application needs, provide the user with an alternative. For
example, provide mouse event handling or information about what features are
available, or not, in the current environment.

You can also use the API for keyboard, touch, and mouse support, see
[Discovering input types](../basics-of-user-interaction.md#discovering-input-types).

For more information about compatibility testing, see
[Troubleshooting](./troubleshooting.md).
