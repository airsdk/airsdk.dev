---
sidebar_position: 6
---

# Dragging data into an HTML element

The default behavior only allows text to be dragged into editable regions of the
page. You can specify that an element and its children can be made editable by
including the `contenteditable` attribute in the opening tag of the element. You
can also make an entire document editable by setting the document object
`designMode` property to `"on"`.

You can support alternate drag-in behavior on a page by handling the
`dragenter`, `dragover`, and `drop` events for any elements that can accept
dragged data.

## Enabling drag-in

To handle the drag-in gesture, you must first cancel the default behavior.
Listen for the `dragenter` and `dragover` events on any HTML elements you want
to use as drop targets. In the handlers for these events, call the
`preventDefault()` method of the dispatched event object. Canceling the default
behavior allows non-editable regions to receive a drop.

## Getting the dropped data

You can access the dropped data in the handler for the `ondrop` event:

```
function doDrop(event){
	droppedText = event.dataTransfer.getData("text/plain");
}
```

Use the `dataTransfer.getData()` method to read the data onto the clipboard,
passing in the MIME type of the data format to read. You can find out which data
formats are available using the `types` property of the `dataTransfer` object.
The `types` array contains the MIME type string of each available format.

When you cancel the default behavior in the dragenter or dragover events, you
are responsible for inserting any dropped data into its proper place in the
document. No API exists to convert a mouse position into an insertion point
within an element. This limitation can make it difficult to implement
insertion-type drag gestures.
