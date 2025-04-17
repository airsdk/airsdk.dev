---
title: Masking display objects
sidebar_position: 12
---

You can use a display object as a mask to create a hole through which the contents of another display object are visible.

## Defining a mask

To indicate that a display object will be the mask for another display object, set the mask object as the mask property of the display object to be masked:

```actionscript
// Make the object maskSprite be a mask for the object mySprite.
mySprite.mask = maskSprite;
```

The masked display object is revealed under all opaque (nontransparent) areas of the display object acting as the mask. For instance, the following code creates a Shape instance containing a red 100 by 100 pixel square and a Sprite instance containing a blue circle with a radius of 25 pixels. When the circle is clicked, it is set as the mask for the square, so that the only part of the square that shows is the part that is covered by the solid part of the circle. In other words, only a red circle will be visible.

```actionscript
// This code assumes it's being run within a display object container
// such as a MovieClip or Sprite instance.

import flash.display.Shape;

// Draw a square and add it to the display list.
var square:Shape = new Shape();
square.graphics.lineStyle(1, 0x000000);
square.graphics.beginFill(0xff0000);
square.graphics.drawRect(0, 0, 100, 100);
square.graphics.endFill();
this.addChild(square);

// Draw a circle and add it to the display list.
var circle:Sprite = new Sprite();
circle.graphics.lineStyle(1, 0x000000);
circle.graphics.beginFill(0x0000ff);
circle.graphics.drawCircle(25, 25, 25);
circle.graphics.endFill();
this.addChild(circle);

function maskSquare(event:MouseEvent):void
{
```
square.mask = circle;
circle.removeEventListener(MouseEvent.CLICK, maskSquare);
```

}

circle.addEventListener(MouseEvent.CLICK, maskSquare);
```

The display object that is acting as a mask can be draggable, animated, resized dynamically, and can use separate shapes within a single mask. The mask display object doesn’t necessarily need to be added to the display list. However, if you want the mask object to scale when the Stage is scaled or if you want to enable user interaction with the mask (such as user-controlled dragging and resizing), the mask object must be added to the display list. The actual z-index (front-to-back order) of the display objects doesn’t matter, as long as the mask object is added to the display list. (The mask object will not appear on the screen except as a mask.) If the mask object is a MovieClip instance with multiple frames, it plays all the frames in its timeline, the same as it would if it were not serving as a mask. You can remove a mask by setting the `mask` property to `null` :

```actionscript
// remove the mask from mySprite
mySprite.mask = null;
```

You cannot use a mask to mask another mask. You cannot set the `alpha` property of a mask display object. Only fills are used in a display object that is used as a mask; strokes are ignored.

### AIR 2

If a masked display object is cached by setting the `cacheAsBitmap` and `cacheAsBitmapMatrix` properties, the mask must be a child of the masked display object. Similarly, if the masked display object is a descendent of a display object container that is cached, both the mask and the display object must be descendents of that container. If the masked object is a descendent of more than one cached display object container, the mask must be a descendent of the cached container closest to the masked object in the display list.

## About masking device fonts

You can use a display object to mask text that is set in a device font. When you use a display object to mask text set in a device font, the rectangular bounding box of the mask is used as the masking shape. That is, if you create a non-rectangular display object mask for device font text, the mask that appears in the SWF file is the shape of the rectangular bounding box of the mask, not the shape of the mask itself.

## Alpha channel masking

Alpha channel masking is supported if both the mask and the masked display objects use bitmap caching, as shown here:

```actionscript
// maskShape is a Shape instance which includes a gradient fill.
mySprite.cacheAsBitmap = true;
maskShape.cacheAsBitmap = true;
mySprite.mask = maskShape;
```

For instance, one application of alpha channel masking is to use a filter on the mask object independently of a filter that is applied to the masked display object.

In the following example, an external image file is loaded onto the Stage. That image (or more accurately, the Loader instance it is loaded into) will be the display object that is masked. A gradient oval (solid black center fading to transparent at the edges) is drawn over the image; this will be the alpha mask. Both display objects have bitmap caching turned on. The oval is set as a mask for the image, and it is then made draggable.

```actionscript
// This code assumes it's being run within a display object container
// such as a MovieClip or Sprite instance.

import flash.display.GradientType;
import flash.display.Loader;
import flash.display.Sprite;
import flash.geom.Matrix;
import flash.net.URLRequest;

// Load an image and add it to the display list.
var loader:Loader = new Loader();
var url:URLRequest = new URLRequest("http://www.helpexamples.com/flash/images/image1.jpg");
loader.load(url);
this.addChild(loader);

// Create a Sprite.
var oval:Sprite = new Sprite();
// Draw a gradient oval.
var colors:Array = [0x000000, 0x000000];
var alphas:Array = [1, 0];
var ratios:Array = [0, 255];
var matrix:Matrix = new Matrix();
matrix.createGradientBox(200, 100, 0, -100, -50);
oval.graphics.beginGradientFill(
```
GradientType.RADIAL,
colors,
alphas,
ratios,
matrix );
```

oval.graphics.drawEllipse(-100, -50, 200, 100);
oval.graphics.endFill();
// add the Sprite to the display list
this.addChild(oval);

// Set cacheAsBitmap = true for both display objects.
loader.cacheAsBitmap = true;
oval.cacheAsBitmap = true;
// Set the oval as the mask for the loader (and its child, the loaded image)
loader.mask = oval;

// Make the oval draggable.
oval.startDrag(true);
```
