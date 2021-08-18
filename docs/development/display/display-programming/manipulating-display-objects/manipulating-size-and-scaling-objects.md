---
title: Manipulating size and scaling objects
sidebar_position: 4
---

You can measure and manipulate the size of a display object in two ways, using either the dimension properties ( `width` and `height` ) or the scale properties ( `scaleX` and `scaleY` ).

Every display object has a `width` property and a `height` property, which are initially set to the size of the object in pixels. You can read the values of those properties to measure the size of the display object. You can also specify new values to change the size of the object, as follows:

```actionscript
// Resize a display object.
square.width = 420;
square.height = 420;

// Determine the radius of a circle display object.
var radius:Number = circle.width / 2;
```

Changing the `height` or `width` of a display object causes the object to scale, meaning its contents stretch or squeeze to fit in the new area. If the display object contains only vector shapes, those shapes will be redrawn at the new scale, with no loss in quality. Any bitmap graphic elements in the display object will be scaled rather than redrawn. So, for example, a digital photo whose width and height are increased beyond the actual dimensions of the pixel information in the image will be pixelated, making it look jagged.

When you change the `width` or `height` properties of a display object, Flash Player and AIR update the `scaleX` and `scaleY` properties of the object as well.

:::note
TextField objects are an exception to this scaling behavior. Text fields need to resize themselves to accommodate text wrapping and font sizes, so they reset their scaleX or scaleY values to 1 after resizing. However, if you adjust the scaleX or scaleY values of a TextField object, the width and height values change to accommodate the scaling values you provide.
:::

These properties represent the relative size of the display object compared to its original size. The scaleX and scaleY properties use fraction (decimal) values to represent percentage. For example, if a display object’s `width` has been changed so that it’s half as wide as its original size, the object’s `scaleX` property will have the value `.5` , meaning 50 percent. If its height has been doubled, its `scaleY` property will have the value `2` , meaning 200 percent.

```actionscript
// circle is a display object whose width and height are 150 pixels.
// At original size, scaleX and scaleY are 1 (100%).
trace(circle.scaleX); // output: 1
trace(circle.scaleY); // output: 1

// When you change the width and height properties,
// Flash Player changes the scaleX and scaleY properties accordingly.
circle.width = 100;
circle.height = 75;
trace(circle.scaleX); // output: 0.6622516556291391
trace(circle.scaleY); // output: 0.4966887417218543
```

Size changes are not proportional. In other words, if you change the height of a square but not its width , its proportions will no longer be the same, and it will be a rectangle instead of a square. If you want to make relative changes to the size of a display object, you can set the values of the `scaleX` and `scaleY` properties to resize the object, as an alternative to setting the `width` or `height` properties. For example, this code changes the width of the display object named square , and then alters the vertical scale ( `scaleY` ) to match the horizontal scale, so that the size of the square stays proportional.

```actionscript
// Change the width directly.
square.width = 150;

// Change the vertical scale to match the horizontal scale,
// to keep the size proportional.
square.scaleY = square.scaleX;
```
