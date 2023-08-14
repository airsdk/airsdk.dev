---
sidebar_position: 1
---

# Capturing keyboard input

Display objects that inherit their interaction model from the InteractiveObject
class can respond to keyboard events by using event listeners. For example, you
can place an event listener on the Stage to listen for and respond to keyboard
input. In the following code, an event listener captures a key press, and the
key name and key code properties are displayed:

    function reportKeyDown(event:KeyboardEvent):void
    {
    	trace("Key Pressed: " + String.fromCharCode(event.charCode) +         " (character code: " + event.charCode + ")");
    }
    stage.addEventListener(KeyboardEvent.KEY_DOWN, reportKeyDown);

Some keys, such as the Ctrl key, generate events even though they have no glyph
representation.

In the previous code example, the keyboard event listener captured keyboard
input for the entire Stage. You can also write an event listener for a specific
display object on the Stage; this event listener is triggered when the object
has the focus.

In the following example, keystrokes are reflected in the Output panel only when
the user types inside the TextField instance. Holding the Shift key down
temporarily changes the border color of the TextField to red.

This code assumes there is a TextField instance named `tf` on the Stage.

    tf.border = true;
    tf.type = "input";
    tf.addEventListener(KeyboardEvent.KEY_DOWN,reportKeyDown);
    tf.addEventListener(KeyboardEvent.KEY_UP,reportKeyUp);

    function reportKeyDown(event:KeyboardEvent):void
    {
    	trace("Key Pressed: " + String.fromCharCode(event.charCode) + " (key code: " + event.keyCode + " character code: " + event.charCode + ")");
    	if (event.keyCode == Keyboard.SHIFT) tf.borderColor = 0xFF0000;
    }

    function reportKeyUp(event:KeyboardEvent):void
    {
    	trace("Key Released: " + String.fromCharCode(event.charCode) + " (key code: " + event.keyCode + " character code: " + event.charCode + ")");
    	if (event.keyCode == Keyboard.SHIFT)
    	{
    		tf.borderColor = 0x000000;
    	}
    }

The TextField class also reports a `textInput` event that you can listen for
when a user enters text. For more information, see
[Capturing text input](../../text/using-the-textfield-class/capturing-text-input.md).

Note: In the AIR runtime, a keyboard event can be canceled. In the Flash Player
runtime, a keyboard event cannot be canceled.

## Key codes and character codes

You can access the `keyCode` and `charCode` properties of a keyboard event to
determine what key was pressed and then trigger other actions. The `keyCode`
property is a numeric value that corresponds to the value of a key on the
keyboard. The `charCode` property is the numeric value of that key in the
current character set. (The default character set is UTF-8, which supports
ASCII.)

The primary difference between the key code and character values is that a key
code value represents a particular key on the keyboard (the 1 on a keypad is
different than the 1 in the top row, but the key that generates "1" and the key
that generates "!" are the same key) and the character value represents a
particular character (the R and r characters are different).

Note: For the mappings between keys and their character code values in ASCII,
see the
[flash.ui.Keyboard](https://airsdk.dev/reference/actionscript/3.0/flash/ui/Keyboard.html)
class listing in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).

The mappings between keys and their key codes is dependent on the device and the
operating system. For this reason, you should not use key mappings to trigger
actions. Instead, you should use the predefined constant values provided by the
Keyboard class to reference the appropriate `keyCode` properties. For example,
instead of using the key mapping for the Shift key, use the `Keyboard.SHIFT`
constant (as shown in the preceding code sample).

## KeyboardEvent precedence

As with other events, the keyboard event sequence is determined by the display
object hierarchy and not the order in which `addEventListener()` methods are
assigned in code.

For example, suppose you place a text field called `tf` inside a movie clip
called `container` and add an event listener for a keyboard event to both
instances, as the following example shows:

    container.addEventListener(KeyboardEvent.KEY_DOWN,reportKeyDown);
    container.tf.border = true;
    container.tf.type = "input";
    container.tf.addEventListener(KeyboardEvent.KEY_DOWN,reportKeyDown);

    function reportKeyDown(event:KeyboardEvent):void
    {
    	trace(event.currentTarget.name + " hears key press: " + String.fromCharCode(event.charCode) + " (key code: " +         event.keyCode + " character code: " + event.charCode + ")");
    }

Because there is a listener on both the text field and its parent container, the
`reportKeyDown()` function is called twice for every keystroke inside the
TextField. Note that for each key pressed, the text field dispatches an event
before the `container` movie clip dispatches an event.

The operating system and the web browser will process keyboard events before
Adobe Flash Player or AIR. For example, in Microsoft Internet Explorer, pressing
Ctrl+W closes the browser window before any contained SWF file dispatches a
keyboard event.
