---
sidebar_position: 1
---

# Controlling virtual keyboard behavior

The runtime automatically opens the virtual keyboard when the user taps inside a
text field or a specially configured interactive object. When the keyboard
opens, the runtime follows the native platform conventions in panning and
resizing the application content so that the user can see the text as they type.

When the keyboard opens, the focused object dispatches the following events in
sequence:

`softKeyboardActivating` event — dispatched immediately before the keyboard
begins to rise over the stage. If you call the `preventDefault()` method of the
dispatched event object, the virtual keyboard does not open.

`softKeyboardActivate` event — dispatched after `softKeyboardActivating` event
handling has completed. When the focused object dispatches this event, the
`softKeyboardRect` property of the Stage object has been updated to reflect the
area of the stage obscured by the virtual keyboard. This event cannot be
canceled.

Note: If the keyboard changes size, for example, when the user changes the
keyboard type, the focused object dispatches a second softKeyboardActivate
event.

`softKeyboardDeactivate` event — dispatched when the virtual keyboard closes for
any reason. This event cannot be canceled.

The following example adds two TextField objects on the stage. The upper
TextField prevents the keyboard from raising when you tap the field and closes
it if it is already raised. The lower TextField demonstrates the default
behavior. The example reports the soft keyboard events dispatched by both text
fields.

```
package
{
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.events.SoftKeyboardEvent;
	public class SoftKeyboardEventExample extends Sprite
	{
		private var tf1:TextField = new TextField();
		private var tf2:TextField = new TextField();

		public function SoftKeyboardEventExample()
		{
			tf1.width = this.stage.stageWidth;
			tf1.type = TextFieldType.INPUT;
			tf1.border = true;
			this.addChild( tf1 );

			tf1.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATING, preventSoftKe    yboard );
			tf1.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, preventSoftKe    yboard );
			tf1.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, preventSoftKeyboard );

			tf2.border = true;
			tf2.type = TextFieldType.INPUT;
			tf2.width = this.stage.stageWidth;
			tf2.y = tf1.y + tf1.height + 30;
			this.addChild( tf2 );

			tf2.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATING, allowSoftKeyboard );
			tf2.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, allowSoftKeyboard );
			tf2.addEventListener( SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, allowSoftKeyboard);
		}

		private function preventSoftKeyboard( event:SoftKeyboardEvent ):void
		{
				event.preventDefault();
				this.stage.focus = null; //close the keyboard, if raised
				trace( "tf1 dispatched: " + event.type + " -- " + event.triggerType );
		}
		private function allowSoftKeyboard( event:SoftKeyboardEvent )    :void
		{
				trace( "tf2 dispatched: " + event.type + " -- " + event.triggerType );
		}
	}
}
```
