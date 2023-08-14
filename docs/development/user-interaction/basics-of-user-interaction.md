---
sidebar_position: 1
---

# Basics of user interaction

Your application can create interactivity by using ActionScript 3.0 to respond
to user activity. Note that this section assumes that you are already familiar
with the ActionScript 3.0 event model. For more information, see
[Handling events](../core-actionscript-classes/handling-events/index.md).

## Capturing user input

User interaction, whether by keyboard, mouse, camera, or a combination of these
devices, is the foundation of interactivity. In ActionScript 3.0, identifying
and responding to user interaction primarily involves listening to events.

The InteractiveObject class, a subclass of the DisplayObject class, provides the
common structure of events and functionality necessary for handling user
interaction. You do not directly create an instance of the InteractiveObject
class. Instead, display objects such as SimpleButton, Sprite, TextField, and
various Flash authoring tool and Flex components inherit their user interaction
model from this class and therefore share a common structure. This means that
the techniques you learn and the code you write to handle user interaction in an
object derived from InteractiveObject are applicable to all the others.

#### Important concepts and terms

It's important to familiarize yourself with the following key user interaction
terms before proceeding:

Character code  
A numeric code representing a character in the current character set (associated
with a key being pressed on the keyboard). For example, "D" and "d" have
different character codes even though they're created by the same key on a U.S.
English keyboard.

Context menu  
The menu that appears when a user right-clicks or uses a particular
keyboard-mouse combination. Context menu commands typically apply directly to
what has been clicked. For example, a context menu for an image may contain a
command to show the image in a separate window and a command to download it.

Focus  
The indication that a selected element is active and that it is the target of
keyboard or mouse interaction.

Key code  
A numeric code corresponding to a physical key on the keyboard.

## Managing focus

An interactive object can receive focus, either programmatically or through a
user action. Additionally, if the `tabEnabled` property is set to `true`, the
user can pass focus from one object to another by pressing the Tab key. Note
that the `tabEnabled` value is `false` by default, except in the following
cases:

- For a SimpleButton object, the value is `true`.

- For a input text field, the value is `true`.

- For a Sprite or MovieClip object with `buttonMode` set to `true,` the value is
  `true`.

In each of these situations, you can add a listener for `FocusEvent.FOCUS_IN` or
`FocusEvent.FOCUS_OUT` to provide additional behavior when focus changes. This
is particularly useful for text fields and forms, but can also be used on
sprites, movie clips, or any object that inherits from the InteractiveObject
class. The following example shows how to enable focus cycling with the Tab key
and how to respond to the subsequent focus event. In this case, each square
changes color as it receives focus.

Note: Flash Professional uses keyboard shortcuts to manage focus; therefore, to
properly simulate focus management, SWF files should be tested in a browser or
AIR rather than within Flash.

    var rows:uint = 10;
    var cols:uint = 10;
    var rowSpacing:uint = 25;
    var colSpacing:uint = 25;
    var i:uint;
    var j:uint;
    for (i = 0; i < rows; i++)
    {
    	for (j = 0; j < cols; j++)
    	{
    		createSquare(j * colSpacing, i * rowSpacing, (i * cols) + j);
    	}
    }

    function createSquare(startX:Number, startY:Number, tabNumber:uint):void
    {
    	var square:Sprite = new Sprite();
    	square.graphics.beginFill(0x000000);
    	square.graphics.drawRect(0, 0, colSpacing, rowSpacing);
    	square.graphics.endFill();
    	square.x = startX;
    	square.y = startY;
    	square.tabEnabled = true;
    	square.tabIndex = tabNumber;
    	square.addEventListener(FocusEvent.FOCUS_IN, changeColor);
    	addChild(square);
    }
    function changeColor(event:FocusEvent):void
    {
    	event.target.transform.colorTransform = getRandomColor();
    }
    function getRandomColor():ColorTransform
    {
    	// Generate random values for the red, green, and blue color channels.
    	var red:Number = (Math.random() * 512) - 255;
    	var green:Number = (Math.random() * 512) - 255;
    	var blue:Number = (Math.random() * 512) - 255;

    	// Create and return a ColorTransform object with the random colors.
    	return new ColorTransform(1, 1, 1, 1, red, green, blue, 0);
    }

## Discovering input types

The Flash Player 10.1 and Adobe AIR 2 releases introduced the ability to test
the runtime environment for support of specific input types. You can use
ActionScript to test if the device on which the runtime is currently deployed:

- Supports stylus or finger input (or no touch input at all).

- Has a virtual or physical keyboard for the user (or no keyboard at all).

- Displays a cursor (if not, then features that are dependent upon having a
  cursor hover over an object do not work).

The input discovery ActionScript APIs include:

- [flash.system.Capabilities.touchscreenType property](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/system/Capabilities.html#touchscreenType):
  A value provided at runtime indicating what input type is supported in the
  current environment.

- [flash.system.TouchscreenType class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/system/TouchscreenType.html):
  A class of enumeration value constants for the Capabilities.touchscreenType
  property.

- [flash.ui.Mouse.supportsCursor property](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Mouse.html#supportsCursor):
  A value provided at runtime indicating if a persistent cursor is available or
  not.

- [flash.ui.Keyboard.physicalKeyboardType property](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Keyboard.html#physicalKeyboardType):
  A value provided at runtime indicating if a full physical keyboard is
  available or a numeric keypad, only, or no keyboard at all.

- [flash.ui.KeyboardType class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/KeyboardType.html):
  A class of enumeration value constants for the
  flash.ui.Keyboard.physicalKeyboardType property.

- [flash.ui.Keyboard.hasVirtualKeyboard property](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Keyboard.html#hasVirtualKeyboard):
  A value provided at runtime indicating if a virtual keyboard is provided to
  the user (either in place of a physical keyboard, or in addition to a physical
  keyboard).

The input discovery APIs let you take advantage of a user's device capabilities,
or provide alternatives when those capabilities are not present. These API are
especially useful for developing mobile and touch-enabled applications. For
example, if you have an interface for a mobile device that has small buttons for
a stylus, you can provide an alternative interface with larger buttons for a
user using finger touches for input. The following code is for an application
that has a function called createStylusUI() that assigns one set of user
interface elements appropriate for stylus interaction. Another function, called
createTouchUI(), assigns another set of user interface elements appropriate for
finger interaction:

    if(Capabilities.touchscreenType == TouchscreenType.STYLUS ){
    	//Construct the user interface using small buttons for a stylus
    	//and allow more screen space for other visual content
    	createStylusUI();
    } else if(Capabilities.touchscreenType = TouchscreenType.FINGER){
    	//Construct the user interface using larger buttons
    	//to capture a larger point of contact with the device
    	createTouchUI();
    }

When developing applications for different input environments, consider the
following compatibility chart:

| Environment                                                                                                                     | supportsCursor | touchscreenType == FINGER | touchscreenType == STYLUS | touchscreenType == NONE |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------- | ------------------------- | ----------------------- |
| Traditional Desktop                                                                                                             | true           | false                     | false                     | true                    |
| Capacitive Touchscreen Devices (tablets, PDAs, and phones that detect subtle human touch, such as the Apple iPhone or Palm Pre) | false          | true                      | false                     | false                   |
| Resistive Touchscreen devices (tablets, PDAs, and phones that detect precise, high-pressure contact, such as the HTC Fuze)      | false          | false                     | true                      | false                   |
| Non-Touchscreen devices (feature phones and devices that run applications but don't have screens that detect contact)           | false          | false                     | false                     | true                    |

Note: Different device platforms can support many combinations of input types.
Use this chart as a general guide.

More Help topics

![](../img/flashplatformLinkIndicator.png)
[InteractiveObject](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/InteractiveObject.html)

![](../img/flashplatformLinkIndicator.png)
[Keyboard](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Keyboard.html)

![](../img/flashplatformLinkIndicator.png)
[Mouse](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/Mouse.html)

![](../img/flashplatformLinkIndicator.png)
[ContextMenu](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/ui/ContextMenu.html)
