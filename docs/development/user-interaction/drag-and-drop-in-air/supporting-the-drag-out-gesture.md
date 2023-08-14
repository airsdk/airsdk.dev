---
sidebar_position: 2
---

# Supporting the drag-out gesture

To support the drag-out gesture, you must create a Clipboard object in response
to a `mouseDown` event and send it to the `NativeDragManager.doDrag()` method.
Your application can then listen for the `nativeDragComplete` event on the
initiating object to determine what action to take when the user completes or
abandons the gesture.

## Preparing data for transfer

To prepare data or an object for dragging, create a Clipboard object and add the
information to be transferred in one or more formats. You can use the standard
data formats to pass data that can be translated automatically to native
clipboard formats, and application-defined formats to pass objects.

If it is computationally expensive to convert the information to be transferred
into a particular format, you can supply the name of a handler function to
perform the conversion. The function is called if and only if the receiving
component or application reads the associated format.

For more information on clipboard formats, see
[Clipboard data formats](../copy-and-paste/clipboard-data-formats.md).

The following example illustrates how to create a Clipboard object containing a
bitmap in several formats: a Bitmap object, a native bitmap format, and a file
list format containing the file from which the bitmap was originally loaded:

    import flash.desktop.Clipboard;
    import flash.display.Bitmap;
    import flash.filesystem.File;
    public function createClipboard(image:Bitmap, sourceFile:File):Clipboard{
    	var transfer:Clipboard = new Clipboard();
    	transfer.setData("CUSTOM_BITMAP", image, true); //Flash object by value and by reference
    	transfer.setData(ClipboardFormats.BITMAP_FORMAT, image.bitmapData, false);
    	transfer.setData(ClipboardFormats.FILE_LIST_FORMAT, new Array(sourceFile), false);
    	return transfer;
    }

## Starting a drag-out operation

To start a drag operation, call the `NativeDragManager.doDrag()` method in
response to a mouse down event. The `doDrag()` method is a static method that
takes the following parameters:

| Parameter      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initiator      | The object from which the drag originates, and which dispatches the `dragStart` and `dragComplete` events. The initiator must be an interactive object.                                                                                                                                                                                                                                                                                                                 |
| clipboard      | The Clipboard object containing the data to be transferred. The Clipboard object is referenced in the NativeDragEvent objects dispatched during the drag-and-drop sequence.                                                                                                                                                                                                                                                                                             |
| dragImage      | (Optional) A BitmapData object to display during the drag. The image can specify an `alpha` value. (Note: Microsoft Windows always applies a fixed alpha fade to drag images).                                                                                                                                                                                                                                                                                          |
| offset         | (Optional) A Point object specifying the offset of the drag image from the mouse hotspot. Use negative coordinates to move the drag image up and left relative to the mouse cursor. If no offset is provided, the top, left corner of the drag image is positioned at the mouse hotspot.                                                                                                                                                                                |
| actionsAllowed | (Optional) A NativeDragOptions object specifying which actions (copy, move, or link) are valid for the drag operation. If no argument is provided, all actions are permitted. The DragOptions object is referenced in NativeDragEvent objects to enable a potential drag target to check that the allowed actions are compatible with the purpose of the target component. For example, a "trash" component might only accept drag gestures that allow the move action. |

The following example illustrates how to start a drag operation for a bitmap
object loaded from a file. The example loads an image and, on a `mouseDown`
event, starts the drag operation.

    package
    {
    	import flash.desktop.NativeDragManager;
    	import mx.core.UIComponent;
    	import flash.display.Sprite;
    	import flash.display.Loader;
    	import flash.system.LoaderContext;
    	import flash.net.URLRequest;
    	import flash.geom.Point;
    	import flash.desktop.Clipboard;
    	import flash.display.Bitmap;
    	import flash.filesystem.File;
    	import flash.events.Event;
    	import flash.events.MouseEvent;

    	public class DragOutExample extends UIComponent Sprite {
    		protected var fileURL:String = "app:/image.jpg";
    		protected var display:Bitmap;

    		private function init():void {
    			loadImage();
    		}
    		private function onMouseDown(event:MouseEvent):void {
    			var bitmapFile:File = new File(fileURL);
    			var transferObject:Clipboard = createClipboard(display, bitmapFile);
    			NativeDragManager.doDrag(this,
    								transferObject,
    								display.bitmapData,
    								new Point(-mouseX,-mouseY));
    		}
    		public function createClipboard(image:Bitmap, sourceFile:File):Clipboard {
    			var transfer:Clipboard = new Clipboard();
    			transfer.setData("bitmap",
    								image,
    								true);
    								// ActionScript 3 Bitmap object by value and by reference
    			transfer.setData(ClipboardFormats.BITMAP_FORMAT,
    								image.bitmapData,
    								false);
    								// Standard BitmapData format
    			transfer.setData(ClipboardFormats.FILE_LIST_FORMAT,
    								new Array(sourceFile),
    								false);
    								// Standard file list format
    			return transfer;
    		}
    		private function loadImage():void {
    			var url:URLRequest = new URLRequest(fileURL);
    			var loader:Loader = new Loader();
    			loader.load(url,new LoaderContext());
    			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete);
    		}
    		private function onLoadComplete(event:Event):void {
    			display = event.target.loader.content;
    			var flexWrapper:UIComponent = new UIComponent();
    			flexWrapper.addChild(event.target.loader.content);
    			addChild(flexWrapper);
    			flexWrapper.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
    		}
    	}
    }

## Completing a drag-out transfer

When a user drops the dragged item by releasing the mouse, the initiator object
dispatches a `nativeDragComplete` event. You can check the `dropAction` property
of the event object and then take the appropriate action. For example, if the
action is `NativeDragAction.MOVE,` you could remove the source item from its
original location. The user can abandon a drag gesture by releasing the mouse
button while the cursor is outside an eligible drop target. The drag manager
sets the `dropAction` property for an abandoned gesture to
`NativeDragAction.NONE`.
