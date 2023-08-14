---
sidebar_position: 3
---

# Handling application display changes

In AIR, you can turn off the default panning and resizing behavior associated
with raising a soft keyboard by setting the `softKeyboardBehavior` element in
the application descriptor to `none`:

    <softKeyboardBehavior>none</softKeyboardBehavior>

When you turn off the automatic behavior, it is your application's
responsibility to make any necessary adjustments to the application display. A
softKeyboardActivate event is dispatched when the keyboard opens. When the
`softKeyboardActivate` event is dispatched, the `softKeyboardRect` property of
the stage contains the dimensions of the area obscured by the open keyboard. Use
these dimensions to move or resize your content so that it is displayed properly
while the keyboard is open and the user is typing. (When the keyboard is closed,
the dimensions of the softKeyboardRect rectangle are all zero.)

When the keyboard closes, a `softKeyboardDeactivate` event is dispatched, and
you can return the application display to normal.

    package  {
    	import flash.display.MovieClip;
    	import flash.events.SoftKeyboardEvent;
    	import flash.events.Event;
    	import flash.display.StageScaleMode;
    	import flash.display.StageAlign;
    	import flash.display.InteractiveObject;
    	import flash.text.TextFieldType;
    	import flash.text.TextField;

    	public class PanningExample extends MovieClip {

    		private var textField:TextField = new TextField();

    		public function PanningExample() {
    			this.stage.scaleMode = StageScaleMode.NO_SCALE;
    			this.stage.align = StageAlign.TOP_LEFT;

    			textField.y = this.stage.stageHeight - 201;
    			textField.width = this.stage.stageWidth;
    			textField.height = 200;
    			textField.type = TextFieldType.INPUT;
    			textField.border = true;
    			textField.wordWrap = true;
    			textField.multiline = true;

    			this.addChild( textField );

    			//track soft keyboard and stage resize events
    			textField.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, onKeyboardChange );
    			textField.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, onKeyboardChange );
    			this.stage.addEventListener( Event.RESIZE, onDisplayAreaChange );
    		}

    		private function onDisplayAreaChange( event:Event ):void
    		{
    			textField.y = this.stage.stageHeight - 201;
    			textField.width = this.stage.stageWidth;
    		}

    		private function onKeyboardChange( event:SoftKeyboardEvent ):void
    		{
    			var field:InteractiveObject = textField;
    			var offset:int = 0;

    			//if the softkeyboard is open and the field is at least partially covered
    			if( (this.stage.softKeyboardRect.y != 0) && (field.y + field.height > this.stage.softKeyboardRect.y) )
    				offset = field.y + field.height - this.stage.softKeyboardRect.y;

    			//but don't push the top of the field above the top of the screen
    			if( field.y - offset < 0 ) offset += field.y - offset;

    			this.y = -offset;
    		}
    	}
    }

Note: On Android, there are circumstances, including fullscreen mode, in which
the exact dimensions of the keyboard are not available from the operating
system. In these cases, the size is estimated. Also, in landscape orientations,
the native fullscreen IME keyboard is used for all text entry. This IME keyboard
has a built-in text entry field and obscures the entire stage. There is no way
to display a landscape keyboard that does not fill the screen.
