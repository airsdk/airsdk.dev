---
sidebar_position: 3
---

# The event flow

Flash Player or AIR dispatches event objects whenever an event occurs. If the
event target is not on the display list, Flash Player or AIR dispatches the
event object directly to the event target. For example, Flash Player dispatches
the progress event object directly to a URLStream object. If the event target is
on the display list, however, Flash Player dispatches the event object into the
display list, and the event object travels through the display list to the event
target.

The _event flow_ describes how an event object moves through the display list.
The display list is organized in a hierarchy that can be described as a tree. At
the top of the display list hierarchy is the Stage, which is a special display
object container that serves as the root of the display list. The Stage is
represented by the flash.display.Stage class and can only be accessed through a
display object. Every display object has a property named `stage` that refers to
the Stage for that application.

When Flash Player or AIR dispatches an event object for a display list-related
event, that event object makes a round-trip journey from the Stage to the
_target node_. The DOM Events Specification defines the target node as the node
representing the event target. In other words, the target node is the display
list object where the event occurred. For example, if a user clicks on a display
list object named `child1`, Flash Player or AIR will dispatch an event object
using `child1` as the target node.

The event flow is conceptually divided into three parts. The first part is
called the capture phase; this phase comprises all of the nodes from the Stage
to the parent of the target node. The second part is called the target phase,
which consists solely of the target node. The third part is called the bubbling
phase. The bubbling phase comprises the nodes encountered on the return trip
from the parent of the target node back to the Stage.

The names of the phases make more sense if you conceive of the display list as a
vertical hierarchy with the Stage at the top, as shown in the following diagram:

![](../../img/eh_displaylistVhierarchy.png)

If a user clicks on `Child1 Node`, Flash Player or AIR dispatches an event
object into the event flow. As the following image shows, the object's journey
starts at `Stage`, moves down to `Parent Node`, then moves to `Child1 Node`, and
then "bubbles" back up to `Stage`, moving through `Parent Node` again on its
journey back to `Stage`.

![](../../img/eh_stage_parent_Node.png)

In this example, the capture phase comprises `Stage` and `Parent Node` during
the initial downward journey. The target phase comprises the time spent at
`Child1 Node`. The bubbling phase comprises `Parent Node` and `Stage` as they
are encountered during the upward journey back to the root node.

The event flow contributes to a more powerful event-handling system than that
previously available to ActionScript programmers. In previous versions of
ActionScript, the event flow does not exist, which means that event listeners
can be added only to the object that generates the event. In ActionScript 3.0,
you can add event listeners not only to a target node, but also to any node
along the event flow.

The ability to add event listeners along the event flow is useful when a user
interface component comprises more than one object. For example, a button object
often contains a text object that serves as the button's label. Without the
ability to add a listener to the event flow, you would have to add a listener to
both the button object and the text object to ensure that you receive
notification about click events that occur anywhere on the button. The existence
of the event flow, however, allows you to place a single event listener on the
button object that handles click events that occur either on the text object or
on the areas of the button object that are not obscured by the text object.

Not every event object, however, participates in all three phases of the event
flow. Some types of events, such as the `enterFrame` and `init` event types, are
dispatched directly to the target node and participate in neither the capture
phase nor the bubbling phase. Other events may target objects that are not on
the display list, such as events dispatched to an instance of the Socket class.
These event objects will also flow directly to the target object, without
participating in the capture and bubbling phases.

To find out how a particular event type behaves, you can either check the API
documentation or examine the event object's properties. Examining the event
object's properties is described in the following section.
