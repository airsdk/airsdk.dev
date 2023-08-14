---
sidebar_position: 1
---

# Basics of touch input

When the Flash Platform is running in an environment that supports touch input,
InteractiveObject instances can listen for touch events and call handlers.
Generally, you handle touch, multitouch, and gesture events as you would other
events in ActionScript (see
[Handling events](../../core-actionscript-classes/handling-events/index.md) for
basic information about event handling with ActionScript).

However, for the Flash runtime to interpret a touch or gesture, the runtime must
be running in a hardware and software environment that supports touch or
multitouch input. See
[Discovering input types](../basics-of-user-interaction.md#discovering-input-types)
for a chart comparing different touch screen types. Additionally, if the runtime
is running within a container application (such as a browser), then that
container passes the input to the runtime. In some cases, the current hardware
and operating system environment support multitouch, but the browser containing
the Flash runtime interprets the input and does not pass it on to the runtime.
Or, it can simply ignore the input altogether.

The following diagram shows the flow of input from user to runtime:

![](../../img/ig_touch_flow_popup.png)

Flow of input from user to the Flash Platform runtime

Fortunately, the ActionScript API for developing touch applications includes
classes, methods, and properties to determine the support for touch or
multitouch input in the runtime environment. The API you use to determine
support for touch input are the "discovery API" for touch event handling.

#### Important concepts and terms

The following reference list contains important terms for writing touch
event-handling applications:

Discovery API  
The methods and properties used to test the runtime environment for support of
touch events and different modes of input.

Touch event  
An input action performed on a touch-enabled device using a single point of
contact.

Touch point  
The point of contact for a single touch event. Even if a device does not support
gesture input, it might support multiple simultaneous touch points.

Touch sequence  
The series of events representing the lifespan of a single touch. These events
include one beginning, zero or more moves, and one end.

Multitouch event  
An input action performed on a touch-enabled device using several points of
contact (such as more than one finger).

Gesture event  
An input action performed on a touch-enabled device tracing some complex
movement. For example, one gesture is touching a screen with two fingers and
moving them simultaneously around the perimeter of an abstract circle to
indicate rotation.

Phases  
Distinct points of time in the event flow (such as begin and end).

Stylus  
An instrument for interacting with a touch-enabled screen. A stylus can provide
more precision than the human finger. Some devices recognize only input from a
specific type of stylus. Devices that do recognize stylus input might not
recognize multiple, simultaneous points of contact or finger contact.

Press-and-tap  
A specific type of multitouch input gesture where the user pushes a finger
against a touch-enabled device and then taps with another finger or pointing
device. This gesture is often used to simulate a mouse right-click in multitouch
applications.

## The touch input API structure

The ActionScript touch input API is designed to address the fact that touch
input handling depends on the hardware and software environment of the Flash
runtime. The touch input API primarily addresses three needs of touch
application development: discovery, events, and phases. Coordinate these API to
produce a predictable and responsive experience for the user; even if the target
device is unknown as you develop an application.

### Discovery

The discovery API provides the ability to test the hardware and software
environment at runtime. The values populated by the runtime determine the touch
input available to the Flash runtime in its current context. Also, use the
collection of discovery properties and methods to set your application to react
to mouse events (instead of touch events in case some touch input is not
supported by the environment). For more information, see
[Touch support discovery](./touch-support-discovery.md).

### Events

ActionScript manages touch input events with event listeners and event handlers
as it does other events. However, touch input event handling also must take into
account:

- A touch can be interpreted in several ways by the device or operating system,
  either as a sequence of touches or, collectively, as a gesture.

- A single touch to a touch-enabled device (by a finger, stylus or pointing
  device) always dispatches a mouse event, too. You can handle the mouse event
  with the event types in the MouseEvent class. Or, you can design your
  application only to respond to touch events. Or, you can design an application
  that responds to both.

- An application can respond to multiple, simultaneous touch events, and handle
  each one separately.

Typically, use the discovery API to conditionally handle the events your
application handles, and how they are handled. Once the application knows the
runtime environment, it can call the appropriate handler or establish the
correct event object when the user interacts with the application. Or, the
application can indicate that specific input cannot be handled in the current
environment and provide the user with an alternative or information. For more
information, see [Touch event handling](./touch-event-handling.md) and
[Gesture event handling](./gesture-event-handling.md).

### Phases

For touch and multitouch applications, touch event objects contain properties to
track the phases of user interaction. Write ActionScript to handle phases like
the begin, update, or end phase of user input to provide the user with feedback.
Respond to event phases so visual objects change as the user touch and moves the
point of touch on a screen. Or, use the phases to track specific properties of a
gesture, as the gesture evolves.

For touch point events, track how long the user rests on a specific interactive
object. An application can track multiple, simultaneous touch points' phases
individually, and handle each accordingly.

For a gesture, interpret specific information about the transformation of the
gesture as it occurs. Track the coordinates of the point of contact (or several)
as they move across the screen.
