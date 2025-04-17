---
title: Fading objects
sidebar_position: 11
---

You can control the transparency of a display object to make it partially (or completely transparent), or change the transparency to make the object appear to fade in or out. The DisplayObject class’s alpha property defines the transparency (or more accurately, the opacity) of a display object. The alpha property can be set to any value between 0 and 1, where 0 is completely transparent, and 1 is completely opaque. For example, these lines of code make the object named myBall partially (50 percent) transparent when it is clicked with the mouse:

```actionscript
function fadeBall(event:MouseEvent):void
{
```
myBall.alpha = .5;
```

}
myBall.addEventListener(MouseEvent.CLICK, fadeBall);
```

You can also alter the transparency of a display object using the color adjustments available through the ColorTransform class. For more information, see [Adjusting DisplayObject colors](adjusting-displayobject-colors) .
