# Formatting text

You have several options for programmatically formatting the display of text.
You can set properties directly on the TextField instance—for example, the
`TextFIeld.thickness`, `TextField.textColor`, and `TextField.textHeight`
properties.Or you can designate the content of the text field using the
`htmlText` property and use the supported HTML tags, such as `b`, `i`, and `u`.
But you can also apply TextFormat objects to text fields containing plain text,
or StyleSheet objects to text fields containing the `htmlText` property. Using
TextFormat and StyleSheet objects provides the most control and consistency over
the appearance of text throughout your application. You can define a TextFormat
or StyleSheet object and apply it to many or all text fields in your
application.

## Assigning text formats

You can use the TextFormat class to set a number of different text display
properties and to apply them to the entire contents of a TextField object, or to
a range of text.

The following example applies one TextFormat object to an entire TextField
object and applies a second TextFormat object to a range of text within that
TextField object:

```
var tf:TextField = new TextField();
tf.text = "Hello Hello";

var format1:TextFormat = new TextFormat();
format1.color = 0xFF0000;

var format2:TextFormat = new TextFormat();
format2.font = "Courier";

tf.setTextFormat(format1);
var startRange:uint = 6;
tf.setTextFormat(format2, startRange);

addChild(tf);
```

The `TextField.setTextFormat()` method only affects text that is already
displayed in the text field. If the content in the TextField changes, your
application might need to call the `TextField.setTextFormat()` method again to
reapply the formatting. You can also set the TextField `defaultTextFormat`
property to specify the format to be used for user-entered text.

## Applying cascading style sheets

Text fields can contain either plain text or HTML-formatted text. Plain text is
stored in the `text` property of the instance, and HTML text is stored in the
`htmlText` property.

You can use CSS style declarations to define text styles that you can apply to
many different text fields. CSS style declarations can be created in your
application code or loaded in at run time from an external CSS file.

The flash.text.StyleSheet class handles CSS styles. The StyleSheet class
recognizes a limited set of CSS properties. For a detailed list of the style
properties that the StyleSheet class supports, see the flash.textStylesheet
entry in the ActionScript 3.0 Reference.

As the following example shows, you can create CSS in your code and apply those
styles to HTML text by using a StyleSheet object:

```
var style:StyleSheet = new StyleSheet();

var styleObj:Object = new Object();
styleObj.fontSize = "bold";
styleObj.color = "#FF0000";
style.setStyle(".darkRed", styleObj);

var tf:TextField = new TextField();
tf.styleSheet = style;
tf.htmlText = "<span class = 'darkRed'>Red</span> apple";

addChild(tf);
```

After creating a StyleSheet object, the example code creates a simple object to
hold a set of style declaration properties. Then it calls the
`StyleSheet.setStyle()` method, which adds the new style to the style sheet with
the name ".darkred". Next, it applies the style sheet formatting by assigning
the StyleSheet object to the TextField `styleSheet` property.

For CSS styles to take effect, the style sheet should be applied to the
TextField object before the `htmlText` property is set.

By design, a text field with a style sheet is not editable. If you have an input
text field and assign a style sheet to it, the text field shows the properties
of the style sheet, but the text field does not allow users to enter new text
into it. Also, you cannot use the following ActionScript APIs on a text field
with an assigned style sheet:

- The `TextField.replaceText()` method

- The `TextField.replaceSelectedText()` method

- The `TextField.defaultTextFormat` property

- The `TextField.setTextFormat()` method

If a text field has a style sheet assigned to it, but later the
`TextField.styleSheet` property is set to `null`, the contents of both
`TextField.text` and `TextField.htmlText` properties add tags and attributes to
their content to incorporate the formatting from the previously assigned style
sheet. To preserve the original `htmlText` property, save it in a variable
before setting the style sheet to `null`.

## Loading an external CSS file

The CSS approach to formatting is more powerful when you can load CSS
information from an external file at run time. When the CSS data is external to
the application itself, you can change the visual style of text in your
application without having to change your ActionScript 3.0 source code. After
your application has been deployed, you can change an external CSS file to
change the look of the application, without having to redeploy the application
SWF file.

The `StyleSheet.parseCSS()` method converts a string that contains CSS data into
style declarations in the StyleSheet object. The following example shows how to
read an external CSS file and apply its style declarations to a TextField
object.

First, here is the content of the CSS file to be loaded, which is named
example.css:

```
p {
	font-family: Times New Roman, Times, _serif;
	font-size: 14;
}

h1 {
	font-family: Arial, Helvetica, _sans;
	font-size: 20;
	font-weight: bold;
}

.bluetext {
```

color: #0000CC; }

Next is the ActionScript code for a class that loads the example.css file and
applies the styles to TextField content:

```
package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.StyleSheet;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;

	public class CSSFormattingExample extends Sprite
	{
		var loader:URLLoader;
		var field:TextField;
		var exampleText:String = "<h1>This is a headline</h1>" +
			"<p>This is a line of text. <span class='bluetext'>" +
			"This line of text is colored blue.</span></p>";

		public function CSSFormattingExample():void
		{
			field = new TextField();
			field.width = 300;
			field.autoSize = TextFieldAutoSize.LEFT;
			field.wordWrap = true;
			addChild(field);

			var req:URLRequest = new URLRequest("example.css");

			loader = new URLLoader();
			loader.addEventListener(Event.COMPLETE, onCSSFileLoaded);
			loader.load(req);
		}

		public function onCSSFileLoaded(event:Event):void
		{
			var sheet:StyleSheet = new StyleSheet();
			sheet.parseCSS(loader.data);
			field.styleSheet = sheet;
			field.htmlText = exampleText;
		}
	}
}
```

When the CSS data is loaded, the `onCSSFileLoaded()` method executes and calls
the `StyleSheet.parseCSS()` method to transfer the style declarations to the
StyleSheet object.

## Formatting ranges of text within a text field

A useful method of the flash.text.TextField class is the `setTextFormat()`
method. Using `setTextFormat()`, you can assign specific properties to the
contents of a part of a text field to respond to user input, such as forms that
need to remind users that certain entries are required or to change the emphasis
of a subsection of a passage of text within a text field as a user selects parts
of the text.

The following example uses `TextField.setTextFormat()` on a range of characters
to change the appearance of part of the content of `myTextField` when the user
clicks the text field:

```
var myTextField:TextField = new TextField();
myTextField.text = "No matter where you click on this text field the TEXT IN ALL CAPS changes format.";
myTextField.autoSize = TextFieldAutoSize.LEFT;
addChild(myTextField);
addEventListener(MouseEvent.CLICK, changeText);

var myformat:TextFormat = new TextFormat();
myformat.color = 0xFF0000;
myformat.size = 18;
myformat.underline = true;

function changeText(event:MouseEvent):void
{
	myTextField.setTextFormat(myformat, 49, 65);
}
```
