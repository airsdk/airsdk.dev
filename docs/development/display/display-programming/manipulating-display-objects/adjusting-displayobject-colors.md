---
title: Adjusting DisplayObject colors
sidebar_position: 9
---

You can use the methods of the `ColorTransform` class (`flash.geom.ColorTransform`) to adjust the color of a display object. Each display object has a `transform` property, which is an instance of the `Transform` class, and contains information about various transformations that are applied to the display object (such as rotation, changes in scale or position, and so forth). In addition to its information about geometric transformations, the Transform class also includes a colorTransform property, which is an instance of the ColorTransform class, and provides access to make color adjustments to the display object. To access the color transformation information of a display object, you can use code such as this:

```actionscript
var colorInfo:ColorTransform = myDisplayObject.transform.colorTransform;
```

Once you’ve created a `ColorTransform` instance, you can read its property values to find out what color transformations have already been applied, or you can set those values to make color changes to the display object. To update the display object after any changes, you must reassign the `ColorTransform` instance back to the `transform.colorTransform` property.

```actionscript
var colorInfo:ColorTransform = myDisplayObject.transform.colorTransform;

// Make some color transformations here.

// Commit the change.
myDisplayObject.transform.colorTransform = colorInfo;
```

## Setting color values with code

The `color` property of the ColorTransform class can be used to assign a specific red, green, blue (RGB) color value to the display object. The following example uses the `color` property to change the color of the display object named square to blue, when the user clicks a button named blueBtn :

```actionscript
// square is a display object on the Stage.
// blueBtn, redBtn, greenBtn, and blackBtn are buttons on the Stage.

import flash.events.MouseEvent;
import flash.geom.ColorTransform;

// Get access to the ColorTransform instance associated with square.
var colorInfo:ColorTransform = square.transform.colorTransform;

// This function is called when blueBtn is clicked.
function makeBlue(event:MouseEvent):void
{
```
// Set the color of the ColorTransform object.
colorInfo.color = 0x003399;
// apply the change to the display object
square.transform.colorTransform = colorInfo;
```

}

blueBtn.addEventListener(MouseEvent.CLICK, makeBlue);
```

Note that when you change a display object’s color using the color property, it completely changes the color of the entire object, regardless of whether the object previously had multiple colors. For example, if there is a display object containing a green circle with black text on top, setting the color property of that object’s associated ColorTransform instance to a shade of red will make the entire object, circle and text, turn red (so the text will no longer be distinguishable from the rest of the object).

## Altering color and brightness effects with code

Suppose you have a display object with multiple colors (for example, a digital photo) and you don’t want to completely recolor the object; you just want to adjust the color of a display object based on the existing colors. In this scenario, the `ColorTransform` class includes a series of multiplier and offset properties that you can use to make this type of adjustment. The multiplier properties, named `redMultiplier` , `greenMultiplier` , `blueMultiplier` , and `alphaMultiplier` , work like colored photographic filters (or colored sunglasses), amplifying or diminishing certain colors in the display object. The offset properties ( `redOffset` , `greenOffset` , `blueOffset` , and `alphaOffset` ) can be used to add extra amounts of a certain color to the object, or to specify the minimum value that a particular color can have.

These multiplier and offset properties are identical to the advanced color settings that are available for movie clip symbols in the Flash authoring tool when you choose Advanced from the Color pop-up menu on the Property inspector.

The following code loads a JPEG image and applies a color transformation to it, which adjusts the red and green channels as the mouse pointer moves along the x axis and y axis. In this case, because no offset values are specified, the color value of each color channel displayed on screen will be a percentage of the original color value in the image—meaning that the most red or green displayed in any given pixel will be the original amount of red or green in that pixel.

```actionscript
import flash.display.Loader;
import flash.events.MouseEvent;
import flash.geom.Transform;
import flash.geom.ColorTransform;
import flash.net.URLRequest;

// Load an image onto the Stage.
var loader:Loader = new Loader();
var url:URLRequest = new URLRequest("http://www.helpexamples.com/flash/images/image1.jpg");
loader.load(url);
this.addChild(loader);

// This function is called when the mouse moves over the loaded image.
function adjustColor(event:MouseEvent):void
{
```
// Access the ColorTransform object for the Loader (containing the image)
var colorTransformer:ColorTransform = loader.transform.colorTransform;

// Set the red and green multipliers according to the mouse position.
// The red value ranges from 0% (no red) when the cursor is at the left
// to 100% red (normal image appearance) when the cursor is at the right.
// The same applies to the green channel, except it's controlled by the
// position of the mouse in the y axis.
colorTransformer.redMultiplier = (loader.mouseX / loader.width) * 1;
colorTransformer.greenMultiplier = (loader.mouseY / loader.height) * 1;

// Apply the changes to the display object.
loader.transform.colorTransform = colorTransformer;
```

}

loader.addEventListener(MouseEvent.MOUSE_MOVE, adjustColor);
```
