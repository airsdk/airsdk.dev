# Displaying text

Although authoring tools like Adobe Flash Builder and Flash Professional provide
several options for displaying text, including text-related components or text
tools, the simplest way to display text programmatically is through a text
field.

## Types of text

The type of text within a text field is characterized by its source:

- Dynamic text

  Dynamic text includes content that is loaded from an external source, such as
  a text file, an XML file, or even a remote web service.

- Input text

  Input text is any text entered by a user or dynamic text that a user can edit.
  You can set up a style sheet to format input text, or use the
  flash.text.TextFormat class to assign properties to the text field for the
  input content. For more information, see
  [Capturing text input](./capturing-text-input.md).

- Static text

  Static text is created through Flash Professional only. You cannot create a
  static text instance using ActionScript 3.0. However, you can use ActionScript
  classes like StaticText and TextSnapshot to manipulate an existing static text
  instance. For more information, see
  [Working with static text](./working-with-static-text.md).

## Modifying the text field contents

You can define dynamic text by assigning a string to the
`flash.text.TextField.text` property. You assign a string directly to the
property, as follows:

```
myTextField.text = "Hello World";
```

You can also assign the `text` property a value from a variable defined in your
script, as in the following example:

```
package
{
	import flash.display.Sprite;
	import flash.text.*;

	public class TextWithImage extends Sprite
	{
		private var myTextBox:TextField = new TextField();
		private var myText:String = "Hello World";

		public function TextWithImage()
		{
			addChild(myTextBox);
			myTextBox.text = myText;
		}
	}
}
```

Alternatively, you can assign the `text` property a value from a remote
variable. You have three options for loading text values from remote sources:

- The flash.net.URLLoader and flash.net.URLRequest classes load variables for
  the text from a local or remote location.

- The `FlashVars` attribute is embedded in the HTML page hosting the SWF file
  and can contain values for text variables.

- The flash.net.SharedObject class manages persistent storage of values. For
  more information, see
  [Storing local data](../../files-and-data/storing-local-data/index.md).

## Displaying HTML text

The flash.text.TextField class has an `htmlText` property that you can use to
identify your text string as one containing HTML tags for formatting the
content. As in the following example, you must assign your string value to the
`htmlText` property (not the `text` property) for Flash Player or AIR to render
the text as HTML:

```
var myText:String = "<p>This is <b>some</b> content to <i>render</i> as <u>HTML</u> text.</p>";
myTextBox.htmlText = myText;
```

Flash Player and AIR support a subset of HTML tags and entities for the
`htmlText` property. The `flash.text.TextField.htmlText` property description in
the ActionScript 3.0 Reference provides detailed information about the supported
HTML tags and entities.

Once you designate your content using the `htmlText` property, you can use style
sheets or the `textformat` tag to manage the formatting of your content. For
more information, see [Formatting text](./formatting-text.md).

## Using images in text fields

Another advantage to displaying your content as HTML text is that you can
include images in the text field. You can reference an image, local or remote,
using the `img` tag and have it appear within the associated text field.

The following example creates a text field named `myTextBox` and includes a JPG
image of an eye, stored in the same directory as the SWF file, within the
displayed text:

```
package
{
	import flash.display.Sprite;
	import flash.text.*;

	public class TextWithImage extends Sprite
	{
		private var myTextBox:TextField;
		private var myText:String = "<p>This is <b>some</b> content to <i>test</i> and <i>see</i></p><p><img src='eye.jpg' width='20' height='20'></p><p>what can be rendered.</p><p>You should see an eye image and some <u>HTML</u> text.</p>";

		public function TextWithImage()
		{
			myTextBox.width = 200;
			myTextBox.height = 200;
			myTextBox.multiline = true;
			myTextBox.wordWrap = true;
			myTextBox.border = true;

			addChild(myTextBox);
			myTextBox.htmlText = myText;
		}
	}
}
```

The `img` tag supports JPEG, GIF, PNG, and SWF files.

## Scrolling text in a text field

In many cases, your text can be longer than the text field displaying the text.
Or you may have an input field that allows a user to input more text than can be
displayed at one time. You can use the scroll-related properties of the
flash.text.TextField class to manage lengthy content, either vertically or
horizontally.

The scroll-related properties include `TextField.scrollV`, `TextField.scrollH`
and `maxScrollV` and `maxScrollH`. Use these properties to respond to events,
like a mouse click or a keypress.

The following example creates a text field that is a set size and contains more
text than the field can display at one time. As the user clicks the text field,
the text scrolls vertically.

```
package
{
	import flash.display.Sprite;
	import flash.text.*;
	import flash.events.MouseEvent;

	public class TextScrollExample extends Sprite
	{
		private var myTextBox:TextField = new TextField();
		private var myText:String = "Hello world and welcome to the show. It's really nice to meet you. Take your coat off and stay a while. OK, show is over. Hope you had fun. You can go home now. Don't forget to tip your waiter. There are mints in the bowl by the door. Thank you. Please come again.";

		public function TextScrollExample()
		{
			myTextBox.text = myText;
			myTextBox.width = 200;
			myTextBox.height = 50;
			myTextBox.multiline = true;
			myTextBox.wordWrap = true;
			myTextBox.background = true;
			myTextBox.border = true;

			var format:TextFormat = new TextFormat();
			format.font = "Verdana";
			format.color = 0xFF0000;
			format.size = 10;

			myTextBox.defaultTextFormat = format;
			addChild(myTextBox);
			myTextBox.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownScroll);
		}

		public function mouseDownScroll(event:MouseEvent):void
		{
			myTextBox.scrollV++;
		}
	}
}
```
