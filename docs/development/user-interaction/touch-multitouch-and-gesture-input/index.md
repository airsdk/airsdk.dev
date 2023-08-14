# Touch, multitouch and gesture input

The touch event handling features of the Flash Platform include input from a
single point of contact or multiple points of contact on touch-enabled devices.
And, the Flash runtimes handle events that combine multiple touch points with
movement to create a gesture. In other words, Flash runtimes interpret two types
of input:

Touch  
input with a single point device such as a finger, stylus, or other tool on a
touch-enabled device. Some devices support multiple simultaneous points of
contact with a finger or stylus.

Multitouch  
input with more than one simultaneous point of contact.

Gesture  
Input interpreted by a device or operating system in response to one or more
touch events. For example, a user rotates two fingers simultaneously, and the
device or operating system interprets that touch input as a rotation gesture.
Some gestures are performed with one finger or touch point, and some gestures
require multiple touch points. The device or operating system establishes the
type of gesture to assign to the input.

Both touch and gesture input can be multitouch input depending on the user's
device. ActionScript provides API for handling touch events, gesture events, and
individually tracked touch events for multitouch input.

Note: Listening for touch and gesture events can consume a significant amount of
processing resources (equivalent to rendering several frames per second),
depending on the computing device and operating system. It is often better to
use mouse events when you do not actually need the extra functionality provided
by touch or gestures. When you do use touch or gesture events, consider reducing
the amount of graphical changes that can occur, especially when such events can
be dispatched rapidly, as during a pan, rotate, or zoom operation. For example,
you could stop animation within a component while the user resizes it using a
zoom gesture.

- [Basics of touch input](./basics-of-touch-input.md)
- [Touch support discovery](./touch-support-discovery.md)
- [Touch event handling](./touch-event-handling.md)
- [Touch and drag](./touch-and-drag.md)
- [Gesture event handling](./gesture-event-handling.md)
- [Troubleshooting](./troubleshooting.md)

More Help topics

![](../../img/flashplatformLinkIndicator.png)
[flash.ui.Multitouch](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Multitouch.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.events.TouchEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/TouchEvent.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.events.GestureEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/GestureEvent.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.events.TransformGestureEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/TransformGestureEvent.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.events.GesturePhase](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/GesturePhase.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.events.PressAndTapGestureEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/PressAndTapGestureEvent.html)

[Paul Trani: Touch Events and Gestures on Mobile](http://www.paultrani.com/blog/index.php/2011/02/touch-events-and-gestures-on-mobile/)

[Mike Jones: Virtual Game Controllers](http://blog.flashgen.com/2011/03/21/virtual-game-controllers/)
