---
title: Advanced use of the drawing API
sidebar_position: 9
---

Flash Player 10, Adobe AIR 1.5, and later Flash runtimes, support an advanced set of drawing features. The drawing API enhancements for these runtimes expand upon the drawing methods from previous releases so you can establish data sets to generate shapes, alter shapes at runtime, and create three-dimensional effects. The drawing API enhancements consolidate existing methods into alternative commands. These commands leverage vector arrays and enumeration classes to provide data sets for drawing methods. Using vector arrays allows for more complex shapes to render quickly and for developers to change the array values programmatically for dynamic shape rendering at runtime.

The drawing features introduced in Flash Player 10 are described in the following sections: Drawing Paths , Defining winding rules , Using graphics data classes , and About using drawTriangles() .

The following tasks are things you’ll likely want to accomplish using the advanced drawing API in ActionScript:

- Using Vector objects to store data for drawing methods
- Defining paths for drawing shapes programmatically in a single operation
- Defining winding rules to determine how overlapping shapes are filled
- Reading the vector graphics content of a display object, such as to serialize and save the graphics data, to generate a spritesheet at runtime, or to draw a copy of the vector graphics content
- Using triangles and drawing methods for three-dimensional effects

### Important concepts and terms

The following reference list contains important terms that you will encounter in this section:

- Vector: An array of values all of the same data type. A Vector object can store an array of values that drawing methods use to construct lines and shapes with a single command. For more information on Vector objects, see [Indexed arrays](/docs/development/core-actionscript-classes/working-with-arrays) .
- Path: A path is made up of one or more straight or curved segments. The beginning and end of each segment are marked by coordinates, which work like pins holding a wire in place. A path can be closed (for example, a circle), or open, with distinct endpoints (for example, a wavy line).
- Winding: The direction of a path as interpreted by the renderer; either positive (clockwise) or negative (counter-clockwise).
- GraphicsStroke: A class for setting the line style. While the term “stroke” isn’t part of the drawing API enhancements, the use of a class to designate a line style with its own fill property is part of the new drawing API. You can dynamically adjust a line’s style using the `GraphicsStroke` class.
- Fill object: Objects created using display classes like `flash.display.GraphicsBitmapFill` and `flash.display.GraphicsGradientFill` that are passed to the drawing command `Graphics.drawGraphicsData()` . Fill objects and the enhanced drawing commands introduce a more object-oriented programming approach to replicating `Graphics.beginBitmapFill()` and `Graphics.beginGradientFill()` .
