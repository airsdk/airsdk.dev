# Creating and displaying text

The classes that make up the Flash Text Engine enable you to create, format, and
control text. The following classes are the basic building blocks for creating
and displaying text with the Flash Text Engine:

- TextElement/GraphicElement/GroupElement - contain the content of a TextBlock
  instance

- ElementFormat - specifies formatting attributes for the content of a TextBlock
  instance

- TextBlock - the factory for building a paragraph of text

- TextLine - a line of text created from the TextBlock

To display text, create a TextElement object from a String, using an
ElementFormat object to specify the formatting characteristics. Assign the
TextElement to the `content` property of a TextBlock object. Create the lines of
text for display by calling the `TextBlock.createTextLine()` method. The
`createTextLine()` method returns a TextLine object containing as much of the
string as will fit in the specified width. Call the method repeatedly until the
entire string has been formatted into lines. When there are no more lines to be
created, the textLineCreationResult property of the TextBlock object is assigned
the value: `TextLineCreationResult.COMPLETE`. To show the lines, add them to the
display list (with appropriate `x` and `y` position values).

The following code, for example, uses these FTE classes to display, "Hello
World! This is Flash Text Engine!", using default format and font values. In
this simple example, only a single line of text is created.

```
package
{
	import flash.text.engine.*;
	import flash.display.Sprite;

	public class HelloWorldExample extends Sprite
	{
		public function HelloWorldExample()
		{
			var str = "Hello World! This is Flash Text Engine!";
			var format:ElementFormat = new ElementFormat();
			var textElement:TextElement = new TextElement(str, format);
			var textBlock:TextBlock = new TextBlock();
			textBlock.content = textElement;

			var textLine1:TextLine = textBlock.createTextLine(null, 300);
			addChild(textLine1);
			textLine1.x = 30;
			textLine1.y = 30;
		}
	}
}
```

The parameters for `createTextLine()` specify the line from which to begin the
new line and the width of the line in pixels. The line from which to begin the
new line is usually the previous line but, in the case of the first line, it is
`null`.

## Adding GraphicElement and GroupElement objects

You can assign a GraphicElement object to a TextBlock object to display an image
or a graphic element. Simply create an instance of the GraphicElement class from
a graphic or an image and assign the instance to the `TextBlock.content`
property. Create the text line by calling `TextBlock.createTextline()` as you
normally would. The following example creates two text lines, one with a
GraphicElement object and one with a TextElement object.

```
package
{
	import flash.text.engine.*;
	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;

	public class GraphicElementExample extends Sprite
	{
		public function GraphicElementExample()
		{
			var str:String = "Beware of Dog!";

			var triangle:Shape = new Shape();
			triangle.graphics.beginFill(0xFF0000, 1);
			triangle.graphics.lineStyle(3);
			triangle.graphics.moveTo(30, 0);
			triangle.graphics.lineTo(60, 50);
			triangle.graphics.lineTo(0, 50);
			triangle.graphics.lineTo(30, 0);
			triangle.graphics.endFill();

			var format:ElementFormat = new ElementFormat();
			format.fontSize = 20;

			var graphicElement:GraphicElement = new GraphicElement(triangle, triangle.width, triangle.height, format);
			var textBlock:TextBlock = new TextBlock();
			textBlock.content = graphicElement;
			var textLine1:TextLine = textBlock.createTextLine(null, triangle.width);
			textLine1.x = 50;
			textLine1.y = 110;
			addChild(textLine1);

			var textElement:TextElement = new TextElement(str, format);
			textBlock.content = textElement;
			var textLine2 = textBlock.createTextLine(null, 300);
			addChild(textLine2);
			textLine2.x = textLine1.x - 30;
			textLine2.y = textLine1.y + 15;
		}
	}
}
```

You can create a GroupElement object to create a group of TextElement,
GraphicElement, and other GroupElement objects. A GroupElement can be assigned
to the `content` property of a TextBlock object. The parameter to the
`GroupElement()` constructor is a Vector, which points to the text, graphic, and
group elements that make up the group. The following example groups two graphic
elements and a text element and assigns them as a unit to a text block.

```
package
{
	import flash.text.engine.*;
	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;

	public class GroupElementExample extends Sprite
	{
		public function GroupElementExample()
		{
			var str:String = "Beware of Alligators!";

			var triangle1:Shape = new Shape();
			triangle1.graphics.beginFill(0xFF0000, 1);
			triangle1.graphics.lineStyle(3);
			triangle1.graphics.moveTo(30, 0);
			triangle1.graphics.lineTo(60, 50);
			triangle1.graphics.lineTo(0, 50);
			triangle1.graphics.lineTo(30, 0);
			triangle1.graphics.endFill();

			var triangle2:Shape = new Shape();
			triangle2.graphics.beginFill(0xFF0000, 1);
			triangle2.graphics.lineStyle(3);
			triangle2.graphics.moveTo(30, 0);
			triangle2.graphics.lineTo(60, 50);
			triangle2.graphics.lineTo(0, 50);
			triangle2.graphics.lineTo(30, 0);
			triangle2.graphics.endFill();

			var format:ElementFormat = new ElementFormat();
			format.fontSize = 20;
			var graphicElement1:GraphicElement = new GraphicElement(triangle1, triangle1.width, triangle1.height, format);
			var textElement:TextElement = new TextElement(str, format);
			var graphicElement2:GraphicElement = new GraphicElement(triangle2, triangle2.width, triangle2.height, format);
			var groupVector:Vector.<ContentElement> = new Vector.<ContentElement>();
			groupVector.push(graphicElement1, textElement, graphicElement2);
			var groupElement = new GroupElement(groupVector);
			var textBlock:TextBlock = new TextBlock();
			textBlock.content = groupElement;
			var textLine:TextLine = textBlock.createTextLine(null, 800);
			addChild(textLine);
			textLine.x = 100;
			textLine.y = 200;
		}
	}
}
```

## Replacing text

You can replace text in a TextBlock instance by calling
`TextElement.replaceText()` to replace text in the TextElement that you assigned
to the `TextBlock.content` property.

The following example uses `replaceText()` to first, insert text at the
beginning of the line, then, to append text to the end of the line, and,
finally, to replace text in the middle of the line.

```
package
{
	import flash.text.engine.*;
	import flash.display.Sprite;

	public class ReplaceTextExample extends Sprite
	{
		public function ReplaceTextExample()
		{

			var str:String = "Lorem ipsum dolor sit amet";
			var fontDescription:FontDescription = new FontDescription("Arial");
			var format:ElementFormat = new ElementFormat(fontDescription);
			format.fontSize = 14;
			var textElement:TextElement = new TextElement(str, format);
			var textBlock:TextBlock = new TextBlock();
			textBlock.content = textElement;
			createLine(textBlock, 10);
			textElement.replaceText(0, 0, "A text fragment: ");
			createLine(textBlock, 30);
			textElement.replaceText(43, 43, "...");
			createLine(textBlock, 50);
			textElement.replaceText(23, 28, "(ipsum)");
			createLine(textBlock, 70);
		}

		function createLine(textBlock:TextBlock, y:Number):void {
			var textLine:TextLine = textBlock.createTextLine(null, 300);
			textLine.x = 10;
			textLine.y = y;
			addChild(textLine);
		}
	}
}
```

The `replaceText()` method replaces the text specified by the `beginIndex` and
`endIndex` parameters with the text specified by the `newText` parameter. If the
values of the `beginIndex` and `endIndex` parameters are the same,
`replaceText()` inserts the specified text at that location. Otherwise it
replaces the characters specified by `beginIndex` and `endIndex` with the new
text.
