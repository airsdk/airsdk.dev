---
sidebar_position: 4
---

# Drag and drop in HTML

To drag data into and out of an HTML-based application (or into and out of the
HTML displayed in an HTMLLoader), you can use HTML drag and drop events. The
HTML drag-and-drop API allows you to drag to and from DOM elements in the HTML
content.

Note: You can also use the AIR NativeDragEvent and NativeDragManager APIs by
listening for events on the HTMLLoader object containing the HTML content.
However, the HTML API is better integrated with the HTML DOM and gives you
control of the default behavior.

## Default drag-and-drop behavior

The HTML environment provides default behavior for drag-and-drop gestures
involving text, images, and URLs. Using the default behavior, you can always
drag these types of data out of an element. However, you can only drag text into
an element and only to elements in an editable region of a page. When you drag
text between or within editable regions of a page, the default behavior performs
a move action. When you drag text to an editable region from a non-editable
region or from outside the application, then the default behavior performs a
copy action.

You can override the default behavior by handling the drag-and-drop events
yourself. To cancel the default behavior, you must call the `preventDefault()`
methods of the objects dispatched for the drag-and-drop events. You can then
insert data into the drop target and remove data from the drag source as
necessary to perform the chosen action.

By default, the user can select and drag any text, and drag images and links.
You can use the WebKit CSS property, `-webkit-user-select` to control how any
HTML element can be selected. For example, if you set `-webkit-user-select` to
`none`, then the element contents are not selectable and so cannot be dragged.
You can also use the `-webkit-user-drag` CSS property to control whether an
element as a whole can be dragged. However, the contents of the element are
treated separately. The user could still drag a selected portion of the text.
For more information, see
[CSS in AIR](../../html-content-in-air/about-the-html-environment/css-in-air.md).

## Drag-and-drop events in HTML

The events dispatched by the initiator element from which a drag originates,
are:

| Event     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dragstart | Dispatched when the user starts the drag gesture. The handler for this event can prevent the drag, if necessary, by calling the preventDefault() method of the event object. To control whether the dragged data can be copied, linked, or moved, set the effectAllowed property. Selected text, images, and links are put onto the clipboard by the default behavior, but you can set different data for the drag gesture using the dataTransfer property of the event object. |
| drag      | Dispatched continuously during the drag gesture.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| dragend   | Dispatched when the user releases the mouse button to end the drag gesture.                                                                                                                                                                                                                                                                                                                                                                                                     |

The events dispatched by a drag target are:

<table>
<thead>
    <tr>
        <th><p>Event</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>dragover</p></td>
        <td>
            <p>Dispatched continuously while the drag gesture remains within the element boundaries. The handler for this event should set the dataTransfer.dropEffect property to indicate whether the drop will result in a copy, move, or link action if the user releases the mouse.</p>
        </td>
    </tr>
    <tr>
        <td><p>dragenter</p></td>
        <td>
            <p>Dispatched when the drag gesture enters the boundaries of the element.</p>
            <p>If you change any properties of a dataTransfer object in a dragenter event handler, those changes are quickly overridden by the next dragover event. On the other hand, there is a short delay between a dragenter and the first dragover event that can cause the cursor to flash if different properties are set. In many cases, you can use the same event handler for both events.</p>
        </td>
    </tr>
    <tr>
        <td><p>dragleave</p></td>
        <td>
            <p>Dispatched when the drag gesture leaves the element boundaries.</p>
        </td>
    </tr>
    <tr>
        <td><p>drop</p></td>
        <td>
            <p>Dispatched when the user drops the data onto the element. The data being dragged can only be accessed within the handler for this event.</p>
        </td>
    </tr>
</tbody>
</table>

The event object dispatched in response to these events is similar to a mouse
event. You can use mouse event properties such as ( `clientX`, `clientY`) and (
`screenX`, `screenY`), to determine the mouse position.

The most important property of a drag event object is `dataTransfer`, which
contains the data being dragged. The `dataTransfer` object itself has the
following properties and methods:

<table>
    <thead>
        <tr>
            <th>
                <p>Property or Method</p>
            </th>
            <th>
                <p>Description</p>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>effectAllowed</p>
            </td>
            <td>
                <p>The effect allowed by the source of the drag. Typically, the handler for the
                    dragstart event sets this value. See <a href="#drag-effects-in-html">Drag
                    effects in HTML</a>.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>dropEffect</p>
            </td>
            <td>
                <p>The effect chosen by the target or the user. If you set the <samp>dropEffect</samp>
                    in a <samp>dragover</samp> or <samp>dragenter</samp> event handler, then AIR
                    updates the mouse cursor to indicate the effect that occurs if the user releases
                    the mouse. If the <samp>dropEffect</samp> set does not match one of the allowed
                    effects, no drop is allowed and the <em>unavailable</em> cursor is displayed. If
                    you have not set a <samp>dropEffect</samp> in response to the latest <samp>
                    dragover</samp> or <samp>dragenter</samp> event, then the user can choose from
                    the allowed effects with the standard operating system modifier keys.</p>
                <p>The final effect is reported by the <samp>dropEffect</samp> property of the
                    object dispatched for <samp>dragend</samp>. If the user abandons the drop by
                    releasing the mouse outside an eligible target, then <samp>dropEffect</samp> is
                    set to <samp>none</samp>.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>types</p>
            </td>
            <td>
                <p>An array containing the MIME type strings for each data format present in the <samp>
                    dataTransfer</samp> object.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>getData(mimeType)</p>
            </td>
            <td>
                <p>Gets the data in the format specified by the <samp>mimeType</samp> parameter.</p>
                <p>The <samp>getData()</samp> method can only be called in response to the <samp>
                    drop</samp> event.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>setData(mimeType)</p>
            </td>
            <td>
                <p>Adds data to the <samp>dataTransfer</samp> in the format specified by the
                    mimeType parameter. You can add data in multiple formats by calling <samp>
                    setData()</samp> for each MIME type. Any data placed in the <samp>dataTransfer</samp>
                    object by the default drag behavior is cleared.</p>
                <p>The <samp>setData()</samp> method can only be called in response to the <samp>
                    dragstart</samp> event.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>clearData(mimeType)</p>
            </td>
            <td>
                <p>Clears any data in the format specified by the <samp>mimeType</samp> parameter.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>setDragImage(image, offsetX, offsetY)</p>
            </td>
            <td>
                <p>Sets a custom drag image. The <samp>setDragImage()</samp> method can only be
                    called in response to the dragstart event and only when an entire HTML element
                    is dragged by setting its <samp>-webkit-user-drag</samp> CSS style to <samp>
                    element</samp>. The <samp>image</samp> parameter can be a JavaScript Element or
                    Image object.</p>
            </td>
        </tr>
    </tbody>
</table>

## MIME types for the HTML drag-and-drop

The MIME types to use with the `dataTransfer` object of an HTML drag-and-drop
event include:

| Data format | MIME type                               |
| ----------- | --------------------------------------- |
| Text        | "text/plain"                            |
| HTML        | "text/html"                             |
| URL         | "text/uri-list"                         |
| Bitmap      | "image/x-vnd.adobe.air.bitmap"          |
| File list   | "application/x-vnd.adobe.air.file-list" |

You can also use other MIME strings, including application-defined strings.
However, other applications may not be able to recognize or use the transferred
data. It is your responsibility to add data to the `dataTransfer` object in the
expected format.

Important: Only code running in the application sandbox can access dropped
files. Attempting to read or set any property of a File object within a
non-application sandbox generates a security error. See
[Handling file drops in non-application HTML sandboxes](./handling-file-drops-in-non-application-html-sandboxes.md)
for more information.

## Drag effects in HTML

The initiator of the drag gesture can limit the allowed drag effects by setting
the `dataTransfer.effectAllowed` property in the handler for the `dragstart`
event. The following string values can be used:

| String value | Description                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| "none"       | No drag operations are allowed.                                                                              |
| "copy"       | The data will be copied to the destination, leaving the original in place.                                   |
| "link"       | The data will be shared with the drop destination using a link back to the original.                         |
| "move"       | The data will be copied to the destination and removed from the original location.                           |
| "copyLink"   | The data can be copied or linked.                                                                            |
| "copyMove"   | The data can be copied or moved.                                                                             |
| "linkMove"   | The data can be linked or moved.                                                                             |
| "all"        | The data can be copied, moved, or linked. _All_ is the default effect when you prevent the default behavior. |

The target of the drag gesture can set the `dataTransfer.dropEffect` property to
indicate the action that is taken if the user completes the drop. If the drop
effect is one of the allowed actions, then the system displays the appropriate
copy, move, or link cursor. If not, then the system displays the _unavailable_
cursor. If no drop effect is set by the target, the user can choose from the
allowed actions with the modifier keys.

Set the `dropEffect` value in the handlers for both the `dragover` and
`dragenter` events:

```
function doDragStart(event) {
	event.dataTransfer.setData("text/plain","Text to drag");
	event.dataTransfer.effectAllowed = "copyMove";
}

function doDragOver(event) {
	event.dataTransfer.dropEffect = "copy";
}

function doDragEnter(event) {
	event.dataTransfer.dropEffect = "copy";
}
```

Note: Although you should always set the `dropEffect` property in the handler
for `dragenter`, be aware that the next `dragover` event resets the property to
its default value. Set `dropEffect` in response to both events.
