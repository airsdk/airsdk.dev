---
title: Setting an opaque background color
sidebar_position: 7
---

You can set an opaque background for a display object. For example, when your SWF has a background that contains complex vector art, you can set the opaqueBackground property to a specified color (typically the same color as the Stage). The color is specified as a number (commonly a hexadecimal color value). The background is then treated as a bitmap, which helps optimize performance.

When you set `cacheAsBitmap` to `true` , and also set the `opaqueBackground` property to a specified color, the `opaqueBackground` property allows the internal bitmap to be opaque and rendered faster. If you do not set `cacheAsBitmap` to `true` , the `opaqueBackground` property adds an opaque vector-square shape to the background of the display object. It does not create a bitmap automatically.

The following example shows how to set the background of a display object to optimize performance:

```actionscript
myShape.cacheAsBitmap = true;
myShape.opaqueBackground = 0xFF0000;
```

In this case, the background color of the Shape named myShape is set to red ( `0xFF0000` ). Assuming the Shape instance contains a drawing of a green triangle, on a Stage with a white background, this would show up as a green triangle with red in the empty space in the Shape instance's bounding box (the rectangle that completely encloses the Shape).

![Effect of setting opaqueBackground color](images/dp_opaqueBackground_example.png)

Of course, this code would make more sense if it were used with a Stage with a solid red background. On another colored background, that color would be specified instead. For example, in a SWF with a white background, the `opaqueBackground` property would most likely be set to `0xFFFFFF` , or pure white.
