---
sidebar_position: 2
---

# Adding virtual keyboard support for interactive objects

Normally, the virtual keyboard only opens when a TextField object is tapped. You
can configure an instance of the InteractiveObject class to open the virtual
keyboard when it receives focus.

To configure an InteractiveObject instance to open the soft keyboard, set its
`needsSoftKeyboard` property to `true`. Whenever the object is assigned to the
stage focus property, the soft keyboard automatically opens. In addition, you
can raise the keyboard by calling the `requestSoftKeyboard()` method of the
InteractiveObject.

The following example illustrates how you can program an InteractiveObject to
act as a text entry field. The TextInput class shown in the example sets the
`needsSoftKeyboard` property so that the keyboard is raised when needed. The
object then listens for `keyDown` events and inserts the typed character into
the field.

The example uses the Flash text engine to append and display any typed text and
handles some important events. For simplicity, the example does not implement a
full-featured text field.

    package  {
    	import flash.geom.Rectangle;
    	import flash.display.Sprite;
    	import flash.text.engine.TextElement;
    	import flash.text.engine.TextBlock;
    	import flash.events.MouseEvent;
    	import flash.events.FocusEvent;
    	import flash.events.KeyboardEvent;
    	import flash.text.engine.TextLine;
    	import flash.text.engine.ElementFormat;
    	import flash.events.Event;

    	public class TextInput extends Sprite
    	{

    		public var text:String = " ";
    		public  var textSize:Number = 24;
    		public var textColor:uint = 0x000000;
    		private var _bounds:Rectangle = new Rectangle( 0, 0, 100, textSize );
    		private var textElement: TextElement;
    		private var textBlock:TextBlock = new  TextBlock();

    		public function TextInput( text:String = "" )
    		{
    			this.text = text;
    			this.scrollRect = _bounds;
    			this.focusRect= false;

    			//Enable keyboard support
    			this.needsSoftKeyboard = true;
    			this.addEventListener(MouseEvent.MOUSE_DOWN, onSelect);
    			this.addEventListener(FocusEvent.FOCUS_IN, onFocusIn);
    			this.addEventListener(FocusEvent.FOCUS_OUT, onFocusOut);

    			//Setup text engine
    			textElement = new TextElement( text, new ElementFormat( null, textSize, textColor ) );
    			textBlock.content = textElement;
    			var firstLine:TextLine = textBlock.createTextLine( null, _bounds.width - 8 );
    			firstLine.x = 4;
    			firstLine.y = 4 + firstLine.totalHeight;
    			this.addChild( firstLine );

    		}

    		private function onSelect( event:MouseEvent ):void
    		{
    			stage.focus = this;
    		}
    		private function onFocusIn( event:FocusEvent ):void
    		{
    			this.addEventListener( KeyboardEvent.KEY_DOWN, onKey );
    		}

    		private function onFocusOut( event:FocusEvent ):void
    		{
    			this.removeEventListener( KeyboardEvent.KEY_UP, onKey );
    		}

    		private function onKey( event:KeyboardEvent ):void
    		{
    			textElement.replaceText( textElement.text.length, textElement.text.length, String.fromCharCode( event.charCode ) );
    			updateText();
    		}
    		public function set bounds( newBounds:Rectangle ):void
    		{
    			_bounds = newBounds.clone();
    			drawBackground();
    			updateText();
    			this.scrollRect = _bounds;

    			//force update to focus rect, if needed
    			if( this.stage!= null && this.focusRect && this.stage.focus == this )
    				this.stage.focus = this;
    		}

    		private function updateText():void
    		{
    			//clear text lines
    			while( this.numChildren > 0 ) this.removeChildAt( 0 );

    			//and recreate them
    			var textLine:TextLine = textBlock.createTextLine( null, _bounds.width - 8);
    			while ( textLine)
    			{
    				textLine.x = 4;
    				if( textLine.previousLine != null )
    				{
    					textLine.y = textLine.previousLine.y +
    								textLine.previousLine.totalHeight + 2;
    				}
    								else
    				{
    					textLine.y = 4 + textLine.totalHeight;
    				}
    				this.addChild(textLine);
    				textLine = textBlock.createTextLine(textLine, _bounds.width - 8 );
    				}
    		}

    		private function drawBackground():void
    		{
    			//draw background and border for the field
    			this.graphics.clear();
    			this.graphics.beginFill( 0xededed );
    			this.graphics.lineStyle( 1, 0x000000 );
    			this.graphics.drawRect( _bounds.x + 2, _bounds.y + 2, _bounds.width - 4, _bounds.height - 4);
    			this.graphics.endFill();
    		}
    	}
    }

The following main application class illustrates how to use the TextInput class
and manage the application layout when the keyboard is raised or the device
orientation changes. The main class creates a TextInput object and sets its
bounds to fill the stage. The class adjusts the size of the TextInput object
when either the soft keyboard is raised or the stage changes size. The class
listens for soft keyboard events from the TextInput object and resize events
from the stage. Irrespective of the cause of the event, the application
determines the visible area of the stage and resizes the input control to fill
it. Naturally, in a real application, you would need a more sophisticated layout
algorithm.

    package  {

    	import flash.display.MovieClip;
    	import flash.events.SoftKeyboardEvent;
    	import flash.geom.Rectangle;
    	import flash.events.Event;
    	import flash.display.StageScaleMode;
    	import flash.display.StageAlign;

    	public class CustomTextField extends MovieClip {

    		private var customField:TextInput = new TextInput("Input text: ");

    		public function CustomTextField() {
    			this.stage.scaleMode = StageScaleMode.NO_SCALE;
    			this.stage.align = StageAlign.TOP_LEFT;
    			this.addChild( customField );
    			customField.bounds = new Rectangle( 0, 0, this.stage.stageWidth, this.stage.stageHeight );

    			//track soft keyboard and stage resize events
    			customField.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, onDisplayAreaChange );
    			customField.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, onDisplayAreaChange );
    			this.stage.addEventListener( Event.RESIZE, onDisplayAreaChange );
    		}

    		private function onDisplayAreaChange( event:Event ):void
    		{
    			//Fill the stage if possible, but avoid the area covered by a keyboard
    			var desiredBounds = new Rectangle( 0, 0, this.stage.stageWidth, this.stage.stageHeight );
    			if( this.stage.stageHeight - this.stage.softKeyboardRect.height < desiredBounds.height )
    				desiredBounds.height = this.stage.stageHeight - this.stage.softKeyboardRect.height;

    			customField.bounds = desiredBounds;
    		}
    	}
    }

Note: The stage only dispatches resize events in response to an orientation
change when the `scaleMode` property is set to `noScale`. In other modes, the
dimensions of the stage do not change; instead, the content is scaled to
compensate.
