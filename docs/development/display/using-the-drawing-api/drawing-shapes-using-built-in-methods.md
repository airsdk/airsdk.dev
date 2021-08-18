---
title: Drawing shapes using built-in methods
sidebar_position: 5
---

For convenience when drawing common shapes such as circles, ellipses, rectangles, and rectangles with rounded corners, ActionScript 3.0 has methods that draw these common shapes for you. These are the `drawCircle()` , `drawEllipse()` , `drawRect()` , and `drawRoundRect()` methods of the Graphics class. These methods may be used in place of the `lineTo()` and `curveTo()` methods. Note, however, that you must still specify line and fill styles before calling these methods.

The following example recreates the example of drawing red, green, and blue squares with width and height of 100 pixels. This code uses the drawRect() method, and additionally specifies that the fill color has an alpha of 50% (0.5):

```actionscript
var squareSize:uint = 100;
var square:Shape = new Shape();
square.graphics.beginFill(0xFF0000, 0.5);
square.graphics.drawRect(0, 0, squareSize, squareSize);
square.graphics.beginFill(0x00FF00, 0.5);
square.graphics.drawRect(200, 0, squareSize, squareSize);
square.graphics.beginFill(0x0000FF, 0.5);
square.graphics.drawRect(400, 0, squareSize, squareSize);
square.graphics.endFill();
this.addChild(square);
```

In a Sprite or MovieClip object, the drawing content created with the graphics property always appears behind all child display objects that are contained by the object. Also, the `graphics` property content is not a separate display object so it does not appear in the list of a Sprite or MovieClip object’s children. For example, the following Sprite object has a circle drawn with its graphics property, and it has a TextField object in its list of child display objects:

```actionscript
var mySprite:Sprite = new Sprite();
mySprite.graphics.beginFill(0xFFCC00);
mySprite.graphics.drawCircle(30, 30, 30);
var label:TextField = new TextField();
label.width = 200;
label.text = "They call me mellow yellow...";
label.x = 20;
label.y = 20;
mySprite.addChild(label);
this.addChild(mySprite);
```

Note that the TextField appears on top of the circle drawn with the graphics object.
