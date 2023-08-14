---
sidebar_position: 1
---

# Basics of drag and drop in AIR

For a quick explanation and code examples of using drag and drop in an AIR
application, see the following quick start articles on the Adobe Developer
Connection:

- [Supporting drag-and-drop and copy-and-paste](https://web.archive.org/web/20150221112531/http://www.adobe.com/devnet/air/flex/quickstart/articles/scrappy_copy_paste.html)
  (Flex)

- [Supporting drag-and-drop and copy-and-paste](https://web.archive.org/web/20150221035757/http://www.adobe.com/devnet/air/flash/quickstart/articles/scrappy_copy_paste.html)
  (Flash)

The drag-and-drop API contains the following classes.

<table>
<thead>
    <tr>
        <th><p>Package</p></th>
        <th><p>Classes</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>flash.desktop</p></td>
        <td>
            <div>
                <ul class="incremental">
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeDragManager.html">NativeDragManager</a></p></li>
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeDragOptions.html">NativeDragOptions</a></p></li>
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/Clipboard.html">Clipboard</a></p></li>
                    <li><p><a href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/air/desktop/URLFilePromise.html">URLFilePromise</a></p></li>
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/IFilePromise.html">IFilePromise</a></p></li>
                </ul>
            </div>
            <p>Constants used with the drag-and-drop API are defined in the
            following classes:</p>
            <div>
                <ul class="incremental">
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeDragActions.html">NativeDragActions</a></p></li>
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/ClipboardFormats.html">ClipboardFormat</a></p></li>
                    <li><p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/desktop/ClipboardTransferMode.html">ClipboardTransferModes</a></p></li>
                </ul>
            </div>
        </td>
    </tr>
    <tr>
        <td><p>flash.events</p></td>
        <td>
            <p><a href="https://airsdk.dev/reference/actionscript/3.0/flash/events/NativeDragEvent.html">NativeDragEvent</a></p>
        </td>
    </tr>
</tbody>
</table>

#### Drag-and-drop gesture stages

The drag-and-drop gesture has three stages:

Initiation  
_A user initiates a drag-and-drop operation by dragging from a component, or an
item in a component, while holding down the mouse button._ The component that is
the source of the dragged item is typically designated as the drag initiator and
dispatches `nativeDragStart` and `nativeDragComplete` events. An Adobe AIR
application starts a drag operation by calling the `NativeDragManager.doDrag()`
method in response to a `mouseDown` or `mouseMove` event.

If the drag operation is initiated from outside an AIR application, there is no
initiator object to dispatch `nativeDragStart` or `nativeDragComplete` events.

Dragging  
_While holding down the mouse button, the user moves the mouse cursor to another
component, application, or to the desktop._ As long as the drag is underway, the
initiator object dispatches `nativeDragUpdate` events. (However, this event is
not dispatched in AIR for Linux.) When the user moves the mouse over a possible
drop target in an AIR application, the drop target dispatches a
`nativeDragEnter` event. The event handler can inspect the event object to
determine whether the dragged data is available in a format that the target
accepts and, if so, let the user drop the data onto it by calling the
`NativeDragManager.acceptDragDrop()` method.

As long as the drag gesture remains over an interactive object, that object
dispatches `nativeDragOver` events. When the drag gesture leaves the interactive
object, it dispatches a `nativeDragExit` event.

Drop  
_The user releases the mouse over an eligible drop target._ If the target is an
AIR application or component, then the target object dispatches a
`nativeDragDrop` event. The event handler can access the transferred data from
the event object. If the target is outside AIR, the operating system or another
application handles the drop. In both cases, the initiating object dispatches a
`nativeDragComplete` event (if the drag started from within AIR).

The NativeDragManager class controls both drag-in and drag-out gestures. All the
members of the NativeDragManager class are static, do not create an instance of
this class.

#### The Clipboard object

Data that is dragged into or out of an application or component is contained in
a Clipboard object. A single Clipboard object can make available different
representations of the same information to increase the likelihood that another
application can understand and use the data. For example, an image could be
included as image data, a serialized Bitmap object, and as a file. Rendering of
the data in a format can be deferred to a rendering function that is not called
until the data is read.

Once a drag gesture has started, the Clipboard object can only be accessed from
within an event handler for the `nativeDragEnter`, `nativeDragOver`, and
`nativeDragDrop` events. After the drag gesture has ended, the Clipboard object
cannot be read or reused.

An application object can be transferred as a reference and as a serialized
object. References are only valid within the originating application. Serialized
object transfers are valid between AIR applications, but can only be used with
objects that remain valid when serialized and deserialized. Objects that are
serialized are converted into the Action Message Format for ActionScript 3
(AMF3), a string-based data-transfer format.

#### Working with the Flex framework

In most cases, it is better to use the Adobe® Flex™ drag-and-drop API when
building Flex applications. The Flex framework provides an equivalent feature
set when a Flex application is run in AIR (it uses the AIR NativeDragManager
internally). Flex also maintains a more limited feature set when an application
or component is running within the more restrictive browser environment. AIR
classes cannot be used in components or applications that run outside the AIR
run-time environment.
