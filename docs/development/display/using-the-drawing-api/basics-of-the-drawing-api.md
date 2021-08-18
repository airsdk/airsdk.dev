---
title: Basics of the drawing API
sidebar_position: 2
---

The drawing API is the name for the functionality built into ActionScript that allows you to create vector graphics—lines, curves, shapes, fills, and gradients—and display them on the screen using ActionScript. The flash.display.Graphics class provides this functionality. You can draw with ActionScript on any Shape, Sprite, or MovieClip instance, using the graphics property defined in each of those classes. (Each of those classes’ `graphics` property is in fact an instance of the Graphics class.)

If you’re just getting started with drawing with code, the Graphics class includes several methods that make it easy to draw common shapes like circles, ellipses, rectangles, and rectangles with rounded corners. You can draw them as empty lines or filled shapes. When you need more advanced functionality, the Graphics class also includes methods for drawing lines and quadratic Bézier curves, which you can use in conjunction with the trigonometry functions in the Math class to create any shape you need.

Flash runtimes (such as Flash Player 10 and Adobe AIR 1.5 and later versions) add an additional API for drawing, which allow you to programmatically draw entire shapes with a single command. Once you’re familiar with the Graphics class and tasks covered in "Basics of using the drawing API", continue to Advanced use of the drawing API to learn more about these drawing API features.

### Important concepts and terms

The following reference list contains important terms that you will encounter while using the drawing API:

- **Anchor point** One of the two end points of a quadratic Bézier curve.
- **Control point** The point that defines the direction and amount of curve of a quadratic Bézier curve. The curved line never reaches the control point; however, the line curves as though being drawn toward the control point.
- **Coordinate space** The graph of coordinates contained in a display object, on which its child elements are positioned.
- **Fill** The solid inner portion of a shape that has a line filled in with color, or all of a shape that has no outline.
- **Gradient** A color that consists of a gradual transition from one color to one or more other colors (as opposed to a solid color).
- **Point** A single location in a coordinate space. In the 2-d coordinate system used in ActionScript, a point is defined by its location along the x axis and the y axis (the point’s coordinates).
- **Quadratic Bézier curve** A type of curve defined by a particular mathematical formula. In this type of curve, the shape of the curve is calculated based on the positions of the anchor points (the end points of the curve) and a control point that defines the amount and direction of the curve.
- **Scale** The size of an object relative to its original size. When used as a verb, to scale an object means to change its size by stretching or shrinking the object.
- **Stroke** The outline portion of a shape that has a line filled in with color, or the lines of an un-filled shape.
- **Translate** To change a point’s coordinates from one coordinate space to another.
- **X axis** The horizontal axis in the 2-d coordinate system used in ActionScript.
- **Y axis** The vertical axis in the 2-d coordinate system used in ActionScript.
