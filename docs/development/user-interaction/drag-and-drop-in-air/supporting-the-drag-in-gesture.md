---
sidebar_position: 3
---

# Supporting the drag-in gesture

To support the drag-in gesture, your application (or, more typically, a visual
component of your application) must respond to `nativeDragEnter` or
`nativeDragOver` events.

## Steps in a typical drop operation

The following sequence of events is typical for a drop operation:

1.  The user drags a clipboard object over a component.

2.  The component dispatches a `nativeDragEnter` event.

3.  The `nativeDragEnter` event handler examines the event object to check the
```
available data formats and allowed actions. If the component can handle the
drop, it calls `NativeDragManager.acceptDragDrop()`.
```

4.  The NativeDragManager changes the mouse cursor to indicate that the object
```
can be dropped.
```

5.  The user drops the object over the component.

6.  The receiving component dispatches a `nativeDragDrop` event.

7.  The receiving component reads the data in the desired format from the
```
Clipboard object within the event object.
```

8.  If the drag gesture originated within an AIR application, then the
```
initiating interactive object dispatches a `nativeDragComplete` event. If
the gesture originated outside AIR, no feedback is sent.
```

## Acknowledging a drag-in gesture

When a user drags a clipboard item into the bounds of a visual component, the
component dispatches `nativeDragEnter` and `nativeDragOver` events. To determine
whether the component can accept the clipboard item, the handlers for these
events can check the `clipboard` and `allowedActions` properties of the event
object. To signal that the component can accept the drop, the event handler must
call the `NativeDragManager.acceptDragDrop()` method, passing a reference to the
receiving component. If more than one registered event listener calls the
`acceptDragDrop()` method, the last handler in the list takes precedence. The
`acceptDragDrop()` call remains valid until the mouse leaves the bounds of the
accepting object, triggering the `nativeDragExit` event.

If more than one action is permitted in the `allowedActions` parameter passed to
`doDrag()`, the user can indicate which of the allowed actions they intend to
perform by holding down a modifier key. The drag manager changes the cursor
image to tell the user which action would occur if they completed the drop. The
intended action is reported by the `dropAction` property of the NativeDragEvent
object. The action set for a drag gesture is advisory only. The components
involved in the transfer must implement the appropriate behavior. To complete a
move action, for example, the drag initiator might remove the dragged item and
the drop target might add it.

Your drag target can limit the drop action to one of the three possible actions
by setting the `dropAction` property of NativeDragManager class. If a user tries
to choose a different action using the keyboard, then the NativeDragManager
displays the _unavailable_ cursor. Set the `dropAction` property in the handlers
for both the `nativeDragEnter` and the `nativeDragOver` events.

The following example illustrates an event handler for a `nativeDragEnter` or
`nativeDragOver` event. This handler only accepts a drag-in gesture if the
clipboard being dragged contains text-format data.

```
import flash.desktop.NativeDragManager;
import flash.events.NativeDragEvent;

public function onDragIn(event:NativeDragEvent):void{
	NativeDragManager.dropAction = NativeDragActions.MOVE;
	if(event.clipboard.hasFormat(ClipboardFormats.TEXT_FORMAT)){
		NativeDragManager.acceptDragDrop(this); //'this' is the receiving component
	}
}
```

## Completing the drop

When the user drops a dragged item on an interactive object that has accepted
the gesture, the interactive object dispatches a `nativeDragDrop` event. The
handler for this event can extract the data from the `clipboard` property of the
event object.

When the clipboard contains an application-defined format, the `transferMode`
parameter passed to the `getData()` method of the Clipboard object determines
whether the drag manager returns a reference or a serialized version of the
object.

The following example illustrates an event handler for the `nativeDragDrop`
event:

```
import flash.desktop.Clipboard;
import flash.events.NativeDragEvent;

public function onDrop(event:NativeDragEvent):void {
	if (event.clipboard.hasFormat(ClipboardFormats.TEXT_FORMAT)) {
	var text:String =
		String(event.clipboard.getData(ClipboardFormats.TEXT_FORMAT,
									ClipboardTransferMode.ORIGINAL_PREFERRED));
}
```

Once the event handler exits, the Clipboard object is no longer valid. Any
attempt to access the object or its data generates an error.

## Updating the visual appearance of a component

A component can update its visual appearance based on the NativeDragEvent
events. The following table describes the types of changes that a typical
component would make in response to the different events:

| Event              | Description                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nativeDragStart    | The initiating interactive object can use the `nativeDragStart` event to provide visual feedback that the drag gesture originated from that interactive object.                                                                      |
| nativeDragUpdate   | The initiating interactive object can use the nativeDragUpdate event to update its state during the gesture. (This event does not exist in AIR for Linux.)                                                                           |
| nativeDragEnter    | A potential receiving interactive object can use this event to take the focus, or indicate visually that it can or cannot accept the drop.                                                                                           |
| nativeDragOver     | A potential receiving interactive object can use this event to respond to the movement of the mouse within the interactive object, such as when the mouse enters a "hot" region of a complex component such as a street map display. |
| nativeDragExit     | A potential receiving interactive object can use this event to restore its state when a drag gesture moves outside its bounds.                                                                                                       |
| nativeDragComplete | The initiating interactive object can use this event to update its associated data model, such as by removing an item from a list, and to restore its visual state.                                                                  |

## Tracking mouse position during a drag-in gesture

While a drag gesture remains over a component, that component dispatches
`nativeDragOver` events. These events are dispatched every few milliseconds and
also whenever the mouse moves. The `nativeDragOver` event object can be used to
determine the position of the mouse over the component. Having access to the
mouse position can be helpful in situations where the receiving component is
complex, but is not made up of sub-components. For example, if your application
displayed a bitmap containing a street map and you wanted to highlight zones on
the map when the user dragged information into them, you could use the mouse
coordinates reported in the `nativeDragOver` event to track the mouse position
within the map.
