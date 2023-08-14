# Using graphics data classes

The enhanced drawing API includes a set of classes in the flash.display package
that implement the
[IGraphicsData](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/IGraphicsData.html)
interface. These classes act as value objects (data containers) that represent
the drawing methods of the drawing API.

The following classes implement the IGraphicsData interface:

- [GraphicsBitmapFill](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsBitmapFill.html)

- [GraphicsEndFill](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsEndFill.html)

- [GraphicsGradientFill](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsGradientFill.html)

- [GraphicsPath](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPath.html)

- [GraphicsShaderFill](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsShaderFill.html)

- [GraphicsSolidFill](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsSolidFill.html)

- [GraphicsStroke](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsStroke.html)

- [GraphicsTrianglePath](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsTrianglePath.html)

With these classes, you can store a complete drawing in a Vector object of
IGraphicsData type (Vector.\<IGraphicsData\>). You can then reuse the graphics
data as the data source for other shape instances or to store drawing
information for later use.

Notice you have multiple fill classes for each style of fill, but only one
stroke class. ActionScript has only one stroke IGraphicsData class because the
stroke class uses the fill classes to define its style. So every stroke is
actually defined by a combination of the stroke class and a fill class.
Otherwise, the API for these graphics data classes mirror the methods they
represent in the flash.display.Graphics class:

<table>
<thead>
    <tr>
        <th><p>Graphics Method</p></th>
        <th><p>Corresponding Class</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>beginBitmapFill()</p></td>
        <td><p>GraphicsBitmapFill</p></td>
    </tr>
    <tr>
        <td><p>beginFill()</p></td>
        <td><p>GraphicsSolidFill</p></td>
    </tr>
    <tr>
        <td><p>beginGradientFill()</p></td>
        <td><p>GraphicsGradientFill</p></td>
    </tr>
    <tr>
        <td><p>beginShaderFill()</p></td>
        <td><p>GraphicsShaderFill</p></td>
    </tr>
    <tr>
        <td><p>lineBitmapStyle()</p></td>
        <td><p>GraphicsStroke + GraphicsBitmapFill</p></td>
    </tr>
    <tr>
        <td><p>lineGradientStyle()</p></td>
        <td><p>GraphicsStroke + GraphicsGradientFill</p></td>
    </tr>
    <tr>
        <td><p>lineShaderStyle()</p></td>
        <td><p>GraphicsStroke + GraphicsShaderFill</p></td>
    </tr>
    <tr>
        <td><p>lineStyle()</p></td>
        <td><p>GraphicsStroke + GraphicsSolidFill</p></td>
    </tr>
    <tr>
        <td><p>moveTo()</p>
        <p>lineTo()</p>
        <p>curveTo()</p>
        <p>drawPath()</p></td>
        <td><p>GraphicsPath</p></td>
    </tr>
    <tr>
        <td><p>drawTriangles()</p></td>
        <td><p>GraphicsTrianglePath</p></td>
    </tr>
</tbody>
</table>

In addition, the
[GraphicsPath](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPath.html)
class has its own `GraphicsPath.moveTo()`, `GraphicsPath.lineTo()`,
`GraphicsPath.curveTo()`, `GraphicsPath.wideLineTo()`, and
`GraphicsPath.wideMoveTo()` utility methods to easily define those commands for
a GraphicsPath instance. These utility methods simplify the task of defining or
updating the commands and data values directly.

## Drawing with vector graphics data

Once you have a collection of IGraphicsData instances, use the Graphics class's
`drawGraphicsData()` method to render the graphics. The `drawGraphicsData()`
method carries out a set of drawing instructions from a vector of IGraphicsData
instances in sequential order:

    // stroke object
    var stroke:GraphicsStroke = new GraphicsStroke(3);
    stroke.joints = JointStyle.MITER;
    stroke.fill = new GraphicsSolidFill(0x102020);// solid stroke

    // fill object
    var fill:GraphicsGradientFill = new GraphicsGradientFill();
    fill.colors = [0x0000FF, 0xEEFFEE];
    fill.matrix = new Matrix();
    fill.matrix.createGradientBox(70, 70, Math.PI/2);
    // path object
    var path:GraphicsPath = new GraphicsPath(new Vector.<int>(), new Vector.<Number>());
    path.commands.push(GraphicsPathCommand.MOVE_TO, GraphicsPathCommand.LINE_TO, GraphicsPathCommand.LINE_TO);
    path.data.push(125,0, 50,100, 175,0);

    // combine objects for complete drawing
    var drawing:Vector.<IGraphicsData> = new Vector.<IGraphicsData>();
    drawing.push(stroke, fill, path);

    // draw the drawing
    graphics.drawGraphicsData(drawing);

By modifying one value in the path used by the drawing in the example, the shape
can be redrawn multiple times for a more complex image:

    // draw the drawing multiple times
    // change one value to modify each variation
    graphics.drawGraphicsData(drawing);
    path.data[2] += 200;
    graphics.drawGraphicsData(drawing);
    path.data[2] -= 150;
    graphics.drawGraphicsData(drawing);
    path.data[2] += 100;
    graphics.drawGraphicsData(drawing);
    path.data[2] -= 50;graphicsS.drawGraphicsData(drawing);

Though IGraphicsData objects can define fill and stroke styles, the fill and
stroke styles are not a requirement. In other words, Graphics class methods can
be used to set styles while IGraphicsData objects can be used to draw a saved
collection of paths, or vice-versa.

Note: Use the `Graphics.clear()` method to clear out a previous drawing before
starting a new one; unless you're adding on to the original drawing, as seen in
the example above. As you change a single portion of a path or collection of
IGraphicsData objects, redraw the entire drawing to see the changes.

When using graphics data classes, the fill is rendered whenever three or more
points are drawn, because the shape is inherently closed at that point. Even
though the fill closes, the stroke does not, and this behavior is different than
when using multiple `Graphics.lineTo()` or `Graphics.moveTo()` commands.

## Reading vector graphics data

In addition to drawing vector content to a display object, in Flash Player 11.6
and Adobe AIR 3.6 and later you can use the Graphics class's
`readGraphicsData()` method to obtain a data representation of the vector
graphics content of a display object. This can be used to create a snapshot of a
graphic to save, copy, create a spritesheet at run time, and more.

Calling the `readGraphicsData()` method returns a Vector instance containing
IGraphicsData objects. These are the same objects used to draw vector graphics
with the `drawGraphicsData()` method.

There are several limitations to reading vector graphics with the
`readGraphicsData()` method. For more information, see the
[readGraphicsData()](<https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/Graphics.html#readGraphicsData()>)
entry in the
[ActionScript 3.0 Language Reference](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).
