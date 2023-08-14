---
sidebar_position: 2
---

# How ActionScript 3.0 event handling differs from earlier versions

The most noticeable difference between event handling in ActionScript 3.0 and
event handling in previous versions of ActionScript is that in ActionScript 3.0
there is only one system for event handling, whereas in previous versions of
ActionScript there are several different event-handling systems. This section
begins with an overview of how event handling worked in previous versions of
ActionScript, and then discusses how event handling has changed for ActionScript
3.0.

## Event handling in previous versions of ActionScript

Versions of ActionScript before ActionScript 3.0 provided a number of different
ways to handle events:

- `on()` event handlers that can be placed directly on Button and MovieClip
  instances

- `onClipEvent()` handlers that can be placed directly on MovieClip instances

- Callback function properties, such as `XML.onload` and `Camera.onActivity`

- Event listeners that you register using the `addListener()` method

- The UIEventDispatcher class that partially implemented the DOM event model.

Each of these mechanisms presents its own set of advantages and limitations. The
`on()` and `onClipEvent()` handlers are easy to use, but make subsequent
maintenance of projects more difficult because code placed directly on buttons
and movie clips can be difficult to find. Callback functions are also simple to
implement, but limit you to only one callback function for any given event.
Event listeners are more difficult to implement—they require not only the
creation of a listener object and function, but also the registration of the
listener with the object that generates the event. This increased overhead,
however, enables you to create several listener objects and register them all
for the same event.

The development of components for ActionScript 2.0 engendered yet another event
model. This new model, embodied in the UIEventDispatcher class, was based on a
subset of the DOM Events Specification. Developers who are familiar with
component event handling will find the transition to the new ActionScript 3.0
event model relatively painless.

Unfortunately, the syntax used by the various event models overlap in various
ways, and differ in others. For example, in ActionScript 2.0, some properties,
such as `TextField.onChanged`, can be used as either a callback function or an
event listener. However, the syntax for registering listener objects differs
depending on whether you are using one of the six classes that support listeners
or the UIEventDispatcher class. For the Key, Mouse, MovieClipLoader, Selection,
Stage, and TextField classes, you use the `addListener()` method, but for
components event handling, you use a method called `addEventListener()`.

Another complexity introduced by the different event-handling models was that
the scope of the event handler function varied widely depending on the mechanism
used. In other words, the meaning of the `this` keyword was not consistent among
the event-handling systems.

## Event handling in ActionScript 3.0

ActionScript 3.0 introduces a single event-handling model that replaces the many
different event-handling mechanisms that existed in previous versions of the
language. The new event model is based on the Document Object Model (DOM) Level
3 Events Specification. Although the SWF file format does not adhere
specifically to the Document Object Model standard, there are sufficient
similarities between the display list and the structure of the DOM to make
implementation of the DOM event model possible. An object on the display list is
analogous to a node in the DOM hierarchical structure, and the terms _display
list object_ and _node_ are used interchangeably throughout this discussion.

The Flash Player and AIR implementation of the DOM event model includes a
concept named default behaviors. A _default behavior_ is an action that Flash
Player or AIR executes as the normal consequence of certain events.

#### Default behaviors

Developers are usually responsible for writing code that responds to events. In
some cases, however, a behavior is so commonly associated with an event that
Flash Player or AIR automatically executes the behavior unless the developer
adds code to cancel it. Because Flash Player or AIR automatically exhibits the
behavior, such behaviors are called default behaviors.

For example, when a user enters text into a TextField object, the expectation
that the text will be displayed in that TextField object is so common that the
behavior is built into Flash Player and AIR. If you do not want this default
behavior to occur, you can cancel it using the new event-handling system. When a
user inputs text into a TextField object, Flash Player or AIR creates an
instance of the TextEvent class to represent that user input. To prevent Flash
Player or AIR from displaying the text in the TextField object, you must access
that specific TextEvent instance and call that instance's `preventDefault()`
method.

Not all default behaviors can be prevented. For example, Flash Player and AIR
generate a MouseEvent object when a user double-clicks a word in a TextField
object. The default behavior, which cannot be prevented, is that the word under
the cursor is highlighted.

Many types of event objects do not have associated default behaviors. For
example, Flash Player dispatches a connect event object when a network
connection is established, but there is no default behavior associated with it.
The API documentation for the Event class and its subclasses lists each type of
event and describes any associated default behavior, and whether that behavior
can be prevented.

It is important to understand that default behaviors are associated only with
event objects dispatched by Flash Player or AIR, and do not exist for event
objects dispatched programmatically through ActionScript. For example, you can
use the methods of the EventDispatcher class to dispatch an event object of type
`textInput`, but that event object will not have a default behavior associated
with it. In other words, Flash Player and AIR will not display a character in a
TextField object as a result of a `textInput` event that you dispatched
programmatically.

#### What's new for event listeners in ActionScript 3.0

For developers with experience using the ActionScript 2.0 `addListener()`
method, it may be helpful to point out the differences between the ActionScript
2.0 event listener model and the ActionScript 3.0 event model. The following
list describes a few major differences between the two event models:

- To add event listeners in ActionScript 2.0, you use `addListener()` in some
  cases and `addEventListener()` in others, whereas in ActionScript 3.0, you use
  `addEventListener()` in all situations.

- There is no event flow in ActionScript 2.0, which means that the
  `addListener()` method can be called only on the object that broadcasts the
  event, whereas in ActionScript 3.0, the `addEventListener()` method can be
  called on any object that is part of the event flow.

- In ActionScript 2.0, event listeners can be either functions, methods, or
  objects, whereas in ActionScript 3.0, only functions or methods can be event
  listeners.
