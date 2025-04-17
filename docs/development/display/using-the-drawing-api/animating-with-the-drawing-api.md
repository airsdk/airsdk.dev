---
title: Animating with the drawing API
sidebar_position: 8
---

One advantage of creating content with the drawing API is that you are not limited to positioning your content once. What you draw can be modified by maintaining and modifying the variables you use to draw. You can convey animation by changing variables and redrawing, either over a period of frames or with a timer.

For example, the following code changes the display with each passing frame (by listening to the `Event.ENTER_FRAME` event), incrementing the current degree count, and directs the graphics object to clear and redraw with the updated position.

```actionscript
stage.frameRate = 31;

var currentDegrees:Number = 0;
var radius:Number = 40;
var satelliteRadius:Number = 6;

var container:Sprite = new Sprite();
container.x = stage.stageWidth / 2;
container.y = stage.stageHeight / 2;
addChild(container);
var satellite:Shape = new Shape();
container.addChild(satellite);

addEventListener(Event.ENTER_FRAME, doEveryFrame);

function doEveryFrame(event:Event):void
{
```
currentDegrees += 4;
var radians:Number = getRadians(currentDegrees);
var posX:Number = Math.sin(radians) * radius;
var posY:Number = Math.cos(radians) * radius;
satellite.graphics.clear();
satellite.graphics.beginFill(0);
satellite.graphics.drawCircle(posX, posY, satelliteRadius);
```

}

function getRadians(degrees:Number):Number
{
```
return degrees * Math.PI / 180;
```

}
```

To produce a significantly different result, you can experiment by modifying the initial seed variables at the beginning of the code, `currentDegrees` , `radius` , and `satelliteRadius` . For example, try shrinking the radius variable and/or increasing the totalSatellites variable. This is only one example of how the drawing API can create a visual display whose complexity conceals the simplicity of its creation.
