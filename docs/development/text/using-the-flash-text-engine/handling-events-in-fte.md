# Handling Events in FTE

You can add event listeners to a TextLine instance just as you can to other
display objects. For example, you can detect when a user rolls the mouse over a
text line or a user clicks the line. The following example detects both of these
events. When you roll the mouse over the line, the cursor changes to a button
cursor and when you click the line, it changes color.

    package
    {
    	import flash.text.engine.*;
    	import flash.ui.Mouse;
    	import flash.display.Sprite
    	import flash.events.MouseEvent;
    	import flash.events.EventDispatcher;

    	public class EventHandlerExample extends Sprite
    	{
    		var textBlock:TextBlock = new TextBlock();

    		public function EventHandlerExample():void
    		{
    			var str:String = "I'll change color if you click me.";
    			var fontDescription:FontDescription = new FontDescription("Arial");
    			var format:ElementFormat = new ElementFormat(fontDescription, 18);
    			var textElement = new TextElement(str, format);
    			textBlock.content = textElement;
    			createLine(textBlock);
    		}

    		private function createLine(textBlock:TextBlock):void
    		{
    			var textLine:TextLine = textBlock.createTextLine(null, 500);
    			textLine.x = 30;
    			textLine.y = 30;
    			addChild(textLine);
    			textLine.addEventListener("mouseOut", mouseOutHandler);
    			textLine.addEventListener("mouseOver", mouseOverHandler);
    			textLine.addEventListener("click", clickHandler);
    		}

    		private function mouseOverHandler(event:MouseEvent):void
    		{
    			Mouse.cursor = "button";
    		}

    		private function mouseOutHandler(event:MouseEvent):void
    		{
    			Mouse.cursor = "arrow";
    		}

    		function clickHandler(event:MouseEvent):void {
    			if(textBlock.firstLine)
    				removeChild(textBlock.firstLine);
    			var newFormat:ElementFormat = textBlock.content.elementFormat.clone();
    			switch(newFormat.color)
    			{
    				case 0x000000:
    					newFormat.color = 0xFF0000;
    					break;
    				case 0xFF0000:
    					newFormat.color = 0x00FF00;
    					break;
    				case 0x00FF00:
    					newFormat.color = 0x0000FF;
    					break;
    				case 0x0000FF:
    					newFormat.color = 0x000000;
    					break;
    			}
    			textBlock.content.elementFormat = newFormat;
    			createLine(textBlock);
    		}
    	}
    }

## Mirroring events

You can also mirror events on a text block, or on a portion of a text block, to
an event dispatcher. First, create an EventDispatcher instance and then assign
it to the `eventMirror` property of a TextElement instance. If the text block
consists of a single text element, the text engine mirrors events for the entire
text block. If the text block consists of multiple text elements, the text
engine mirrors events only for the TextElement instances that have the
`eventMirror` property set. The text in the following example consists of three
elements: the word "Click", the word "here", and the string "to see me in
italic". The example assigns an event dispatcher to the second text element, the
word "here", and adds an event listener, the `clickHandler()` method. The
`clickHandler()` method changes the text to italic. It also replaces the content
of the third text element to read, "Click here to see me in normal font!".

    package
    {
    	import flash.text.engine.*;
    	import flash.ui.Mouse;
    	import flash.display.Sprite;
    	import flash.events.MouseEvent;
    	import flash.events.EventDispatcher;

    	public class EventMirrorExample extends Sprite
    	{
    		var fontDescription:FontDescription = new FontDescription("Helvetica", "bold");
    		var format:ElementFormat = new ElementFormat(fontDescription, 18);
    		var textElement1 = new TextElement("Click ", format);
    		var textElement2 = new TextElement("here ", format);
    		var textElement3 = new TextElement("to see me in italic! ", format);
    		var textBlock:TextBlock = new TextBlock();

    		public function EventMirrorExample()
    		{
    			var myEvent:EventDispatcher = new EventDispatcher();

    			myEvent.addEventListener("click", clickHandler);
    			myEvent.addEventListener("mouseOut", mouseOutHandler);
    			myEvent.addEventListener("mouseOver", mouseOverHandler);

    			textElement2.eventMirror=myEvent;

    			var groupVector:Vector.<ContentElement> = new Vector.<ContentElement>;
    			groupVector.push(textElement1, textElement2, textElement3);
    			var groupElement:GroupElement = new GroupElement(groupVector);

    			textBlock.content = groupElement;
    			createLines(textBlock);
    		}

    		private function clickHandler(event:MouseEvent):void
    		{
    			var newFont:FontDescription = new FontDescription();
    			newFont.fontWeight = "bold";

    			var newFormat:ElementFormat = new ElementFormat();
    			newFormat.fontSize = 18;
    			if(textElement3.text == "to see me in italic! ") {
    				newFont.fontPosture = FontPosture.ITALIC;
    				textElement3.replaceText(0,21, "to see me in normal font! ");
    			}
    			else {
    				newFont.fontPosture = FontPosture.NORMAL;
    				textElement3.replaceText(0, 26, "to see me in italic! ");
    			}
    			newFormat.fontDescription = newFont;
    			textElement1.elementFormat = newFormat;
    			textElement2.elementFormat = newFormat;
    			textElement3.elementFormat = newFormat;
    			createLines(textBlock);
    		}

    		private function mouseOverHandler(event:MouseEvent):void
    		{
    			Mouse.cursor = "button";
    		}

    		private function mouseOutHandler(event:MouseEvent):void
    		{
    				Mouse.cursor = "arrow";
    		}

    		private function createLines(textBlock:TextBlock):void
    		{
    			if(textBlock.firstLine)
    				removeChild (textBlock.firstLine);
    			var textLine:TextLine = textBlock.createTextLine (null, 300);
    			textLine.x = 15;
    			textLine.y = 20;
    			addChild (textLine);
    		}
    	}
    }

The `mouseOverHandler()` and `mouseOutHandler()` functions set the cursor to a
button cursor when it's over the word "here" and back to an arrow when it's not.
