---
title: Panning and scrolling display objects
sidebar_position: 3
---

If you have a display object that is too large for the area in which you want it to display it, you can use the `scrollRect` property to define the viewable area of the display object. In addition, by changing the `scrollRect` property in response to user input, you can cause the content to pan left and right or scroll up and down.

The `scrollRect` property is an instance of the `Rectangle` class, which is a class that combines the values needed to define a rectangular area as a single object. To initially define the viewable area of the display object, create a new `Rectangle` instance and assign it to the display object’s `scrollRect` property. Later, to scroll or pan, you read the `scrollRect` property into a separate `Rectangle` variable, and change the desired property (for instance, change the `Rectangle` instance’s `x` property to pan or `y` property to scroll). Then you reassign that `Rectangle` instance to the `scrollRect` property to notify the display object of the changed value.

For example, the following code defines the viewable area for a `TextField` object named `bigText` that is too tall to fit in the SWF file’s boundaries. When the two buttons named up and down are clicked, they call functions that cause the contents of the `TextField` object to scroll up or down by modifying the `y` property of the `scrollRect` Rectangle instance.

```actionscript
import flash.events.MouseEvent;
import flash.geom.Rectangle;

// Define the initial viewable area of the TextField instance:
// left: 0, top: 0, width: TextField's width, height: 350 pixels.
bigText.scrollRect = new Rectangle(0, 0, bigText.width, 350);

// Cache the TextField as a bitmap to improve performance.
bigText.cacheAsBitmap = true;

// called when the "up" button is clicked
function scrollUp(event:MouseEvent):void
{
```
// Get access to the current scroll rectangle.
var rect:Rectangle = bigText.scrollRect;
// Decrease the y value of the rectangle by 20, effectively
// shifting the rectangle down by 20 pixels.
rect.y -= 20;
// Reassign the rectangle to the TextField to "apply" the change.
bigText.scrollRect = rect;
```

}

// called when the "down" button is clicked
function scrollDown(event:MouseEvent):void
{
```
// Get access to the current scroll rectangle.
var rect:Rectangle = bigText.scrollRect;
// Increase the y value of the rectangle by 20, effectively
// shifting the rectangle up by 20 pixels.
rect.y += 20;
// Reassign the rectangle to the TextField to "apply" the change.
bigText.scrollRect = rect;
```

}

up.addEventListener(MouseEvent.CLICK, scrollUp);
down.addEventListener(MouseEvent.CLICK, scrollDown);
```

As this example illustrates, when you work with the `scrollRect` property of a display object, it’s best to specify that Flash Player or AIR should cache the display object’s content as a bitmap, using the cacheAsBitmap property. When you do so, Flash Player and AIR don’t have to re-draw the entire contents of the display object each time it is scrolled, and can instead use the cached bitmap to render the necessary portion directly to the screen. For details, see [Caching display objects](caching-display-objects.md) .
