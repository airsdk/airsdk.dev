---
sidebar_position: 4
---

# Listening for window events

To listen for the events dispatched by a window, register a listener with the
window instance. For example, to listen for the closing event, register a
listener with the window as follows:

```
myWindow.addEventListener(Event.CLOSING, onClosingEvent);
```

When an event is dispatched, the `target` property references the window sending
the event.

Most window events have two related messages. The first message signals that a
window change is imminent (and can be canceled), while the second message
signals that the change has occurred. For example, when a user clicks the close
button of a window, the closing event message is dispatched. If no listeners
cancel the event, the window closes and the close event is dispatched to any
listeners.

Typically, the warning events, such as `closing`, are only dispatched when
system chrome has been used to trigger an event. Calling the window `close()`
method, for example, does not automatically dispatch the `closing` event—only
the `close` event is dispatched. You can, however, construct a closing event
object and dispatch it using the window `dispatchEvent()` method.

The window events that dispatch an Event object are:

| Event      | Description                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| activate   | Dispatched when the window receives focus.                                                                                                                                     |
| deactivate | Dispatched when the window loses focus                                                                                                                                         |
| closing    | Dispatched when the window is about to close. This only occurs automatically when the system chrome close button is pressed or, on Mac OS X, when the Quit command is invoked. |
| close      | Dispatched when the window has closed.                                                                                                                                         |

The window events that dispatch an NativeWindowBoundsEvent object are:

| Event    | Description                                                                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| moving   | Dispatched immediately before the top-left corner of the window changes position, either as a result of moving, resizing or changing the window display state. |
| move     | Dispatched after the top-left corner has changed position.                                                                                                     |
| resizing | Dispatched immediately before the window width or height changes either as a result of resizing or a display state change.                                     |
| resize   | Dispatched after the window has changed size.                                                                                                                  |

For NativeWindowBoundsEvent events, you can use the `beforeBounds` and
`afterBounds` properties to determine the window bounds before and after the
impending or completed change.

The window events that dispatch an NativeWindowDisplayStateEvent object are:

| Event                | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| displayStateChanging | Dispatched immediately before the window display state changes. |
| displayStateChange   | Dispatched after the window display state has changed.          |

For NativeWindowDisplayStateEvent events, you can use the `beforeDisplayState`
and `afterDisplayState` properties to determine the window display state before
and after the impending or completed change.

On some Linux window managers, a display state change event is not dispatched
when a window with a maximum size setting is maximized. (The window is set to
the maximized display state, but is not resized.)
