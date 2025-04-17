---
sidebar_position: 1
---

# Basics of handling events

You can think of events as occurrences of any kind in your SWF file that are of
interest to you as a programmer. For example, most SWF files support user
interaction of some sort—whether it's something as simple as responding to a
mouse click or something more complex, such as accepting and processing data
entered into a form. Any such user interaction with your SWF file is considered
an event. Events can also occur without any direct user interaction, such as
when data has finished loading from a server or when an attached camera has
become active.

In ActionScript 3.0, each event is represented by an event object, which is an
instance of the Event class or one of its subclasses. An event object not only
stores information about a specific event, but also contains methods that
facilitate manipulation of the event object. For example, when Flash Player or
AIR detects a mouse click, it creates an event object (an instance of the
MouseEvent class) to represent that particular mouse click event.

After creating an event object, Flash Player or AIR _dispatches_ it, which means
that the event object is passed to the object that is the target of the event.
An object that serves as the destination for a dispatched event object is called
an _event target_. For example, when an attached camera becomes active, Flash
Player dispatches an event object directly to the event target, which in this
case is the object that represents the camera. If the event target is on the
display list, however, the event object is passed down through the display list
hierarchy until it reaches the event target. In some cases, the event object
then "bubbles" back up the display list hierarchy along the same route. This
traversal of the display list hierarchy is called the _event flow_.

You can "listen" for event objects in your code using event listeners. _Event
listeners_ are the functions or methods that you write to respond to specific
events. To ensure that your program responds to events, you must add event
listeners either to the event target or to any display list object that is part
of an event object's event flow.

Any time you write event listener code, it follows this basic structure
(elements in bold are placeholders you'd fill in for your specific case):

```actionscript
function eventResponse(eventObject:EventType):void 
{ 
```
// Actions performed in response to the event go here.
```

} 
 
eventTarget.addEventListener(EventType.EVENT_NAME, eventResponse);
```

This code does two things. First, it defines a function, which is the way to
specify the actions that will be performed in response to the event. Next, it
calls the `addEventListener()` method of the source object, in essence
"subscribing" the function to the specified event so that when the event
happens, the function's actions are carried out. When the event actually
happens, the event target checks its list of all the functions and methods that
are registered as event listeners. It then calls each one in turn, passing the
event object as a parameter.

You need to alter four things in this code to create your own event listener.
First, you must change the name of the function to the name you want to use
(this must be changed in two places, where the code says **eventResponse**).
Second, you must specify the appropriate class name of the event object that is
dispatched by the event you want to listen for (**EventType** in the code), and
you must specify the appropriate constant for the specific event (**EVENT_NAME**
in the listing). Third, you must call the `addEventListener()` method on the
object that will dispatch the event (**eventTarget** in this code). Optionally,
you can change the name of the variable used as the function's parameter
(**eventObject** in this code).

## Important concepts and terms

The following reference list contains important terms that you will encounter
when writing event-handling routines:

### Bubbling  

Bubbling occurs for some events so that a parent display object can respond to
events dispatched by its children.

### Bubbling phase  

The part of the event flow in which an event propagates up to parent display
objects. The bubbling phase occurs after the capture and target phases.

### Capture phase  

The part of the event flow in which an event propagates down from the most
general target to the most specific target object. The capture phase occurs
before the target and bubbling phases.

### Default behavior  

Some events include a behavior that normally happens along with the event, known
as the default behavior. For example, when a user types text in a text field, a
text input event is raised. The default behavior for that event is to actually
display the character that was typed into the text field—but you can override
that default behavior (if for some reason you don't want the typed character to
be displayed).

### Dispatch  

To notify event listeners that an event has occurred.

### Event  

Something that happens to an object that the object can tell other objects
about.

### Event flow  

When events happen to an object on the display list (an object displayed on the
screen), all the objects that contain the object are notified of the event and
notify their event listeners in turn. This process starts with the Stage and
proceeds through the display list to the actual object where the event occurred,
and then proceeds back to the Stage again. This process is known as the event
flow.

### Event object  

An object that contains information about a particular event's occurrence, which
is sent to all listeners when an event is dispatched.

### Event target  

The object that actually dispatches an event. For example, if the user clicks a
button that is inside a Sprite that is in turn inside the Stage, all those
objects dispatch events, but the event target is the one where the event
actually happened—in this case, the clicked button.

### Listener  

An object or function that has registered itself with an object, to indicate
that it should be notified when a specific event takes place.

### Target phase  

The point of the event flow at which an event has reached the most specific
possible target. The target phase occurs between the capture and the bubbling
phases.
