---
sidebar_position: 4
---

# Event objects

Event objects serve two main purposes in the new event-handling system. First,
event objects represent actual events by storing information about specific
events in a set of properties. Second, event objects contain a set of methods
that allow you to manipulate event objects and affect the behavior of the
event-handling system.

To facilitate access to these properties and methods, the Flash Player API
defines an Event class that serves as the base class for all event objects. The
Event class defines a fundamental set of properties and methods that are common
to all event objects.

This section begins with a discussion of the Event class properties, continues
with a description of the Event class methods, and concludes with an explanation
of why subclasses of the Event class exist.

## Understanding Event class properties

The Event class defines a number of read-only properties and constants that
provide important information about an event object.The following are especially
important:

- Event object types are represented by constants and stored in the `Event.type`
  property.

- Whether an event's default behavior can be prevented is represented by a
  Boolean value and stored in the `Event.cancelable` property.

- Event flow information is contained in the remaining properties.

#### Event object types

Every event object has an associated event type. Event types are stored in the
`Event.type` property as string values. It is useful to know the type of an
event object so that your code can distinguish objects of different types from
one another. For example, the following code specifies that the `clickHandler()`
listener function should respond to any mouse click event objects that are
passed to `myDisplayObject`:

```actionscript
myDisplayObject.addEventListener(MouseEvent.CLICK, clickHandler);
```

Some two dozen event types are associated with the Event class itself and are
represented by Event class constants, some of which are shown in the following
excerpt from the Event class definition:

```actionscript
package flash.events 
{ 
    public class Event
    {
        // class constants 
        public static const ACTIVATE:String = "activate"; 
        public static const ADDED:String= "added"; 
        // remaining constants omitted for brevity 
    }
}
```

These constants provide an easy way to refer to specific event types. You should
use these constants instead of the strings they represent. If you misspell a
constant name in your code, the compiler will catch the mistake, but if you
instead use strings, a typographical error may not manifest at compile time and
could lead to unexpected behavior that could be difficult to debug. For example,
when adding an event listener, use the following code:

```actionscript
myDisplayObject.addEventListener(MouseEvent.CLICK, clickHandler);
```

rather than:

```actionscript
myDisplayObject.addEventListener("click", clickHandler);
```

#### Default behavior information

Your code can check whether the default behavior for any given event object can
be prevented by accessing the `cancelable` property. The `cancelable` property
holds a Boolean value that indicates whether or not a default behavior can be
prevented. You can prevent, or cancel, the default behavior associated with a
small number of events using the `preventDefault()` method. For more
information, see Canceling default event behavior under
[Understanding Event class methods](#understanding-event-class-methods).

#### Event flow information

The remaining Event class properties contain important information about an
event object and its relationship to the event flow, as described in the
following list:

- The `bubbles` property contains information about the parts of the event flow
  in which the event object participates.

- The `eventPhase` property indicates the current phase in the event flow.

- The `target` property stores a reference to the event target.

- The `currentTarget` property stores a reference to the display list object
  that is currently processing the event object.

#### The `bubbles` property

An event is said to bubble if its event object participates in the bubbling
phase of the event flow, which means that the event object is passed from the
target node back through its ancestors until it reaches the Stage. The
`Event.bubbles` property stores a Boolean value that indicates whether the event
object participates in the bubbling phase. Because all events that bubble also
participate in the capture and target phases, any event that bubbles
participates in all three of the event flow phases. If the value is `true`, the
event object participates in all three phases. If the value is `false`, the
event object does not participate in the bubbling phase.

#### The `eventPhase` property

You can determine the event phase for any event object by investigating its
`eventPhase` property. The `eventPhase` property contains an unsigned integer
value that represents one of the three phases of the event flow. The Flash
Player API defines a separate EventPhase class that contains three constants
that correspond to the three unsigned integer values, as shown in the following
code excerpt:

```actionscript
package flash.events 
{ 
    public final class EventPhase
    {
        public static const CAPTURING_PHASE:uint = 1; 
        public static const AT_TARGET:uint = 2; 
        public static const BUBBLING_PHASE:uint= 3; 
    } 
}
```

These constants correspond to the three valid values of the `eventPhase`
property. You can use these constants to make your code more readable. For
example, if you want to ensure that a function named `myFunc()` is called only
if the event target is in the target stage, you can use the following code to
test for this condition:

```actionscript
if (event.eventPhase == EventPhase.AT_TARGET) 
{ 
    myFunc();
}
```

#### The `target` property

The `target` property holds a reference to the object that is the target of the
event. In some cases, this is straightforward, such as when a microphone becomes
active, the target of the event object is the Microphone object. If the target
is on the display list, however, the display list hierarchy must be taken into
account. For example, if a user inputs a mouse click on a point that includes
overlapping display list objects, Flash Player and AIR always choose the object
that is farthest away from the Stage as the event target.

For complex SWF files, especially those in which buttons are routinely decorated
with smaller child objects, the `target` property may not be used frequently
because it will often point to a button's child object instead of the button. In
these situations, the common practice is to add event listeners to the button
and use the `currentTarget` property because it points to the button, whereas
the `target` property may point to a child of the button.

#### The `currentTarget` property

The `currentTarget` property contains a reference to the object that is
currently processing the event object. Although it may seem odd not to know
which node is currently processing the event object that you are examining, keep
in mind that you can add a listener function to any display object in that event
object's event flow, and the listener function can be placed in any location.
Moreover, the same listener function can be added to different display objects.
As a project increases in size and complexity, the `currentTarget` property
becomes more and more useful.

## Understanding Event class methods

There are three categories of Event class methods:

- Utility methods, which can create copies of an event object or convert it to a
  string

- Event flow methods, which remove event objects from the event flow

- Default behavior methods, which prevent default behavior or check whether it
  has been prevented

#### Event class utility methods

There are two utility methods in the Event class. The `clone()` method allows
you to create copies of an event object. The `toString()` method allows you to
generate a string representation of the properties of an event object along with
their values. Both of these methods are used internally by the event model
system, but are exposed to developers for general use.

For advanced developers creating subclasses of the Event class, you must
override and implement versions of both utility methods to ensure that the event
subclass will work properly.

#### Stopping event flow

You can call either the `Event.stopPropagation()` method or the
`Event.stopImmediatePropagation()` method to prevent an event object from
continuing on its way through the event flow. The two methods are nearly
identical and differ only in whether the current node's other event listeners
are allowed to execute:

- The `Event.stopPropagation()` method prevents the event object from moving on
  to the next node, but only after any other event listeners on the current node
  are allowed to execute.

- The `Event.stopImmediatePropagation()` method also prevents the event object
  from moving on to the next node, but does not allow any other event listeners
  on the current node to execute.

Calling either of these methods has no effect on whether the default behavior
associated with an event occurs. Use the default behavior methods of the Event
class to prevent default behavior.

#### Canceling default event behavior

The two methods that pertain to canceling default behavior are the
`preventDefault()` method and the `isDefaultPrevented()` method. Call the
`preventDefault()` method to cancel the default behavior associated with an
event. To check whether `preventDefault()` has already been called on an event
object, call the `isDefaultPrevented()` method, which returns a value of `true`
if the method has already been called and `false` otherwise.

The `preventDefault()` method will work only if the event's default behavior can
be cancelled. You can check whether this is the case by referring to the API
documentation for that event type, or by using ActionScript to examine the
`cancelable` property of the event object.

Canceling the default behavior has no effect on the progress of an event object
through the event flow. Use the event flow methods of the Event class to remove
an event object from the event flow.

## Subclasses of the Event class

For many events, the common set of properties defined in the Event class is
sufficient. Other events, however, have unique characteristics that cannot be
captured by the properties available in the Event class. For these events,
ActionScript 3.0 defines several subclasses of the Event class.

Each subclass provides additional properties and event types that are unique to
that category of events. For example, events related to mouse input have several
unique characteristics that cannot be captured by the properties defined in the
Event class. The MouseEvent class extends the Event class by adding ten
properties that contain information such as the location of the mouse event and
whether specific keys were pressed during the mouse event.

An Event subclass also contains constants that represent the event types that
are associated with the subclass. For example, the MouseEvent class defines
constants for several mouse event types, include the `click`, `doubleClick`,
`mouseDown`, and `mouseUp` event types.

As described in the section on Event class utility methods under
[Event objects](#event-class-utility-methods), when creating an Event subclass
you must override the `clone()` and `toString()` methods to provide
functionality specific to the subclass.
