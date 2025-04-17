---
sidebar_position: 2
---

# Using the IME class

The IME class lets you manipulate the operating system's IME within Flash Player
or Adobe AIR.

Using ActionScript, you can determine the following:

- If an IME is installed on the user's computer ( `Capabilities.hasIME`)

- If the IME is enabled or disabled on the user's computer ( `IME.enabled`)

- The conversion mode the current IME is using ( `IME.conversionMode`)

You can associate an input text field with a particular IME context. When you
switch between input fields, you can also switch the IME between Hiragana
(Japanese), full-width numbers, half-width numbers, direct input, and so on.

An IME lets users type non-ASCII text characters in multibyte languages, such as
Chinese, Japanese, and Korean.

For more information on working with IMEs, see the documentation for the
operating system for which you are developing the application. For additional
resources, see the following web sites:

- [http://www.msdn.microsoft.com/goglobal/](http://www.msdn.microsoft.com/goglobal/)

- [http://developer.apple.com/library/mac/navigation/](http://developer.apple.com/library/mac/navigation/)

- [http://www.java.sun.com/](http://www.java.sun.com/)

Note: If an IME is not active on the user's computer, calls to IME methods or
properties, other than `Capabilities.hasIME`, will fail. Once you manually
activate an IME, subsequent ActionScript calls to IME methods and properties
will work as expected. For example, if you are using a Japanese IME, you must
activate it before you can call any IME method or property.

## Checking if an IME is installed and enabled

Before you call any of the IME methods or properties, you should always check to
see if the user's computer currently has an IME installed and enabled. The
following code illustrates how to check that the user has an IME both installed
and active before you call any methods:

```
if (Capabilities.hasIME)
{
	if (IME.enabled)
	{
		trace("IME is installed and enabled.");
	}
	else
	{
		trace("IME is installed but not enabled. Please enable your IME and try again.");
	}
}
else
{
	trace("IME is not installed. Please install an IME and try again.");
}
```

The previous code first checks to see if the user has an IME installed using the
`Capabilities.hasIME` property. If this property is set to `true,` the code then
checks whether the user's IME is currently enabled, using the `IME.enabled`
property.

## Determining which IME conversion mode is currently enabled

When building multilingual applications, you may need to determine which
conversion mode the user currently has active. The following code demonstrates
how to check whether the user has an IME installed, and if so, which IME
conversion mode is currently active:

```
if (Capabilities.hasIME)
{
	switch (IME.conversionMode)
	{
		case IMEConversionMode.ALPHANUMERIC_FULL:
			tf.text = "Current conversion mode is alphanumeric (full-width).";
			break;
		case IMEConversionMode.ALPHANUMERIC_HALF:
			tf.text = "Current conversion mode is alphanumeric (half-width).";
			break;
		case IMEConversionMode.CHINESE:
			tf.text = "Current conversion mode is Chinese.";
			break;
		case IMEConversionMode.JAPANESE_HIRAGANA:
			tf.text = "Current conversion mode is Japananese Hiragana.";
			break;
		case IMEConversionMode.JAPANESE_KATAKANA_FULL:
			tf.text = "Current conversion mode is Japanese Katakana (full-width).";
			break;
		case IMEConversionMode.JAPANESE_KATAKANA_HALF:
			tf.text = "Current conversion mode is Japanese Katakana (half-width).";
			break;
		case IMEConversionMode.KOREAN:
			tf.text = "Current conversion mode is Korean.";
			break;
		default:
			tf.text = "Current conversion mode is " + IME.conversionMode + ".";
			break;
	}
}
else
{
	tf.text = "Please install an IME and try again.";
}
```

The previous code first checks to see whether the user has an IME installed.
Next it checks which conversion mode the current IME is using by comparing the
`IME.conversionMode` property against each of the constants in the
IMEConversionMode class.

## Setting the IME conversion mode

When you change the conversion mode of the user's IME, you need to make sure
that the code is wrapped in a `try..catch` block, because setting a conversion
mode using the `conversionMode` property can throw an error if the IME is unable
to set the conversion mode. The following code demonstrates how to use a
`try..catch` block when setting the `IME.conversionMode` property:

```
var statusText:TextField = new TextField;
statusText.autoSize = TextFieldAutoSize.LEFT;
addChild(statusText);
if (Capabilities.hasIME)
{
	try
	{
		IME.enabled = true;
		IME.conversionMode = IMEConversionMode.KOREAN;
		statusText.text = "Conversion mode is " + IME.conversionMode + ".";
	}
	catch (error:Error)
	{
		statusText.text = "Unable to set conversion mode.\n" + error.message;
	}
}
```

The previous code first creates a text field, which is used to display a status
message to the user. Next, if the IME is installed, the code enables the IME and
sets the conversion mode to Korean. If the user's computer does not have a
Korean IME installed, an error is thrown by Flash Player or AIR and is caught by
the `try..catch` block. The `try..catch` block displays the error message in the
previously created text field.

## Disabling the IME for certain text fields

In some cases, you may want to disable the user's IME while they type
characters. For example, if you had a text field that only accepts numeric
input, you may not want the IME to come up and slow down data entry.

The following example demonstrates how you can listen for the
`FocusEvent.FOCUS_IN` and `FocusEvent.FOCUS_OUT` events and disable the user's
IME accordingly:

```
var phoneTxt:TextField = new TextField();
var nameTxt:TextField = new TextField();

phoneTxt.type = TextFieldType.INPUT;
phoneTxt.addEventListener(FocusEvent.FOCUS_IN, focusInHandler);
phoneTxt.addEventListener(FocusEvent.FOCUS_OUT, focusOutHandler);
phoneTxt.restrict = "0-9";
phoneTxt.width = 100;
phoneTxt.height = 18;
phoneTxt.background = true;
phoneTxt.border = true;
addChild(phoneTxt);

nameField.type = TextFieldType.INPUT;
nameField.x = 120;
nameField.width = 100;
nameField.height = 18;
nameField.background = true;
nameField.border = true;
addChild(nameField);

function focusInHandler(event:FocusEvent):void
{
	if (Capabilities.hasIME)
	{
		IME.enabled = false;
	}
}
function focusOutHandler(event:FocusEvent):void
{
	if (Capabilities.hasIME)
	{
		IME.enabled = true;
	}
}
```

This example creates two input text fields, `phoneTxt` and `nameTxt`, and then
adds two event listeners to the `phoneTxt` text field. When the user sets focus
to the `phoneTxt` text field, a `FocusEvent.FOCUS_IN` event is dispatched and
the IME is disabled. When the `phoneTxt` text field loses focus, the
`FocusEvent.FOCUS_OUT` event is dispatched to re-enable the IME.

## Listening for IME composition events

IME composition events are dispatched when a composition string is being set.
For example, if the user has their IME enabled and active and types a string in
Japanese, the `IMEEvent.IME_COMPOSITION` event would dispatch as soon as the
user selects the composition string. In order to listen for the
`IMEEvent.IME_COMPOSITION` event, you need to add an event listener to the
static `ime` property in the System class (
`flash.system.System.ime.addEventListener(...)`), as shown in the following
example:

```
var inputTxt:TextField;
var outputTxt:TextField;

inputTxt = new TextField();
inputTxt.type = TextFieldType.INPUT;
inputTxt.width = 200;
inputTxt.height = 18;
inputTxt.border = true;
inputTxt.background = true;
addChild(inputTxt);

outputTxt = new TextField();
outputTxt.autoSize = TextFieldAutoSize.LEFT;
outputTxt.y = 20;
addChild(outputTxt);

if (Capabilities.hasIME)
{
	IME.enabled = true;
	try
	{
		IME.conversionMode = IMEConversionMode.JAPANESE_HIRAGANA;
	}
	catch (error:Error)
	{
		outputTxt.text = "Unable to change IME.";
	}
	System.ime.addEventListener(IMEEvent.IME_COMPOSITION, imeCompositionHandler);
}
else
{
	outputTxt.text = "Please install IME and try again.";
}

function imeCompositionHandler(event:IMEEvent):void
{
	outputTxt.text = "you typed: " + event.text;
}
```

The previous code creates two text fields and adds them to the display list. The
first text field, `inputTxt`, is an input text field that allows the user to
enter Japanese text. The second text field, `outputTxt`, is a dynamic text field
that displays error messages to the user, or echoes the Japanese string that the
user types into the `inputTxt` text field.
