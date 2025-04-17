---
sidebar_position: 10
---

# Display object example: SpriteArranger

The SpriteArranger sample application builds upon the Geometric Shapes sample
application described separately in _Learning ActionScript 3.0_.

The SpriteArranger sample application illustrates a number of concepts for
dealing with display objects:

- Extending display object classes

- Adding objects to the display list

- Layering display objects and working with display object containers

- Responding to display object events

- Using properties and methods of display objects

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The SpriteArranger application files can be found in the folder
Examples/SpriteArranger. The application consists of the following files:

<table>
<thead>
    <tr>
        <th><p>File</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td >
            <p>SpriteArranger.mxml</p>
            <p>or</p>
            <p>SpriteArranger.fla</p>
        </td>
        <td ><p>The main
        application file in Flash (FLA) or Flex (MXML).</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/SpriteArranger/CircleSprite.as</p></td>
        <td ><p>A class
        defining a type of Sprite object that renders a circle
        on-screen.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/SpriteArranger/DrawingCanvas.as</p></td>
        <td ><p>A class
        defining the canvas, which is a display object container that contains
        GeometricSprite objects.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/SpriteArranger/SquareSprite.as</p></td>
        <td ><p>A class
        defining a type of Sprite object that renders a square
        on-screen.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/SpriteArranger/TriangleSprite.as</p></td>
        <td ><p>A class
        defining a type of Sprite object that renders a triangle
        on-screen.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/SpriteArranger/GeometricSprite.as</p></td>
        <td ><p>A class that
        extends the Sprite object, used to define an on-screen shape. The
        CircleSprite, SquareSprite, and TriangleSprite each extend this
        class.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/IGeometricShape.as</p></td>
        <td ><p>The base
        interface defining methods to be implemented by all geometric shape
        classes.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/IPolygon.as</p></td>
        <td ><p>An interface
        defining methods to be implemented by geometric shape classes that have
        multiple sides.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/RegularPolygon.as</p></td>
        <td ><p>A type of
        geometric shape that has sides of equal length positioned symmetrically
        around the shape's center.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/Circle.as</p></td>
        <td ><p>A type of
        geometric shape that defines a circle.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/EquilateralTriangle.as</p></td>
        <td ><p>A subclass of
        RegularPolygon that defines a triangle with all sides the same
        length.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/Square.as</p></td>
        <td ><p>A subclass of
        RegularPolygon defining a rectangle with all four sides the same
        length.</p></td>
    </tr>
    <tr>
        <td ><p>com/example/programmingas3/geometricshapes/GeometricShapeFactory.as</p></td>
        <td ><p>A class
        containing a "factory method" for creating shapes given a shape type and
        size.</p></td>
    </tr>
</tbody>
</table>

## Defining the SpriteArranger classes

The SpriteArranger application lets the user add a variety of display objects to
the on-screen "canvas."

The DrawingCanvas class defines a drawing area, a type of display object
container, to which the user can add on-screen shapes. These on-screen shapes
are instances of one of the subclasses of the GeometricSprite class.

#### The DrawingCanvas class

In Flex, all child display objects added to a Container object must be of a
class that descends from the mx.core.UIComponent class. This application adds an
instance of the DrawingCanvas class as a child of an mx.containers.VBox object,
as defined in MXML code in the SpriteArranger.mxml file. This inheritance is
defined in the DrawingCanvas class declaration, as follows:

```
public class DrawingCanvas extends UIComponent
```

The UIComponent class inherits from the DisplayObject, DisplayObjectContainer,
and Sprite classes, and the code in the DrawingCanvas class uses methods and
properties of those classes.

The DrawingCanvas class extends the Sprite class, and this inheritance is
defined in the DrawingCanvas class declaration, as follows:

```
public class DrawingCanvas extends Sprite
```

The Sprite class is a subclass of the DisplayObjectContainer and DisplayObject
classes, and the DrawingCanvas class uses methods and properties of those
classes.

The `DrawingCanvas()` constructor method sets up a Rectangle object, `bounds`,
which is property that is later used in drawing the outline of the canvas. It
then calls the `initCanvas()` method, as follows:

```
this.bounds = new Rectangle(0, 0, w, h);
initCanvas(fillColor, lineColor);
```

AS the following example shows, the `initCanvas()` method defines various
properties of the DrawingCanvas object, which were passed as arguments to the
constructor function:

```
this.lineColor = lineColor;
this.fillColor = fillColor;
this.width = 500;
this.height = 200;
```

The `initCanvas()` method then calls the `drawBounds()` method, which draws the
canvas using the DrawingCanvas class's `graphics` property. The `graphics`
property is inherited from the Shape class.

```
this.graphics.clear();
this.graphics.lineStyle(1.0, this.lineColor, 1.0);
this.graphics.beginFill(this.fillColor, 1.0);
this.graphics.drawRect(bounds.left - 1,
                        bounds.top - 1,
                        bounds.width + 2,
                        bounds.height + 2);
this.graphics.endFill();
```

The following additional methods of the DrawingCanvas class are invoked based on
user interactions with the application:

- The `addShape()` and `describeChildren()` methods, which are described in
  [Adding display objects to the canvas](./display-object-example-sprite-arranger.md#adding-display-objects-to-the-canvas)

- The `moveToBack()`, `moveDown()`, `moveToFront()`, and `moveUp()` methods,
  which are described in
  [Rearranging display object layering](./display-object-example-sprite-arranger.md#rearranging-display-object-layering)

- The `onMouseUp()` method, which is described in
  [Clicking and dragging display objects](./display-object-example-sprite-arranger.md#clicking-and-dragging-display-objects)

#### The GeometricSprite class and its subclasses

Each display object the user can add to the canvas is an instance of one of the
following subclasses of the GeometricSprite class:

- CircleSprite

- SquareSprite

- TriangleSprite

The GeometricSprite class extends the flash.display.Sprite class:

```
public class GeometricSprite extends Sprite
```

The GeometricSprite class includes a number of properties common to all
GeometricSprite objects. These are set in the constructor function based on
parameters passed to the function. For example:

```
this.size = size;
this.lineColor = lColor;
this.fillColor = fColor;
```

The `geometricShape` property of the GeometricSprite class defines an
IGeometricShape interface, which defines the mathematical properties, but not
the visual properties, of the shape. The classes that implement the
IGeometricShape interface are defined in the GeometricShapes sample application
described in _Learning ActionScript 3.0_.

The GeometricSprite class defines the `drawShape()` method, which is further
refined in the override definitions in each subclass of GeometricSprite. For
more information, see the "Adding display objects to the canvas" section, which
follows.

The GeometricSprite class also provides the following methods:

- The `onMouseDown()` and `onMouseUp()` methods, which are described in
  [Clicking and dragging display objects](./display-object-example-sprite-arranger.md#clicking-and-dragging-display-objects)

- The `showSelected()` and `hideSelected()` methods, which are described in
  [Clicking and dragging display objects](./display-object-example-sprite-arranger.md#clicking-and-dragging-display-objects)

## Adding display objects to the canvas

When the user clicks the Add Shape button, the application calls the
`addShape()` method of the DrawingCanvas class. It instantiates a new
GeometricSprite by calling the appropriate constructor function of one of the
GeometricSprite subclasses, as the following example shows:

```
public function addShape(shapeName:String, len:Number):void
{
    var newShape:GeometricSprite;
    switch (shapeName)
    {
        case "Triangle":
            newShape = new TriangleSprite(len);
            break;

        case "Square":
            newShape = new SquareSprite(len);
            break;

        case "Circle":
            newShape = new CircleSprite(len);
            break;
    }
    newShape.alpha = 0.8;
    this.addChild(newShape);
}
```

Each constructor method calls the `drawShape()` method, which uses the
`graphics` property of the class (inherited from the Sprite class) to draw the
appropriate vector graphic. For example, the `drawShape()` method of the
CircleSprite class includes the following code:

```
this.graphics.clear();
this.graphics.lineStyle(1.0, this.lineColor, 1.0);
this.graphics.beginFill(this.fillColor, 1.0);
var radius:Number = this.size / 2;
this.graphics.drawCircle(radius, radius, radius);
```

The second to last line of the `addShape()` function sets the `alpha` property
of the display object (inherited from the DisplayObject class), so that each
display object added to the canvas is slightly transparent, letting the user see
the objects behind it.

The final line of the `addChild()` method adds the new display object to the
child list of the instance of the DrawingCanvas class, which is already on the
display list. This causes the new display object to appear on the Stage.

The interface for the application includes two text fields, `selectedSpriteTxt`
and `outputTxt`. The text properties of these text fields are updated with
information about the GeometricSprite objects that have been added to the canvas
or selected by the user. The GeometricSprite class handles this
information-reporting task by overriding the `toString()` method, as follows:

```
public override function toString():String
{
```

        return this.shapeType + " of size " + this.size + " at " + this.x + ", " + this.y;
```
}
```

The `shapeType` property is set to the appropriate value in the constructor
method of each GeometricSprite subclass. For example, the `toString()` method
might return the following value for a CircleSprite instance recently added to
the DrawingCanvas instance:

```
Circle of size 50 at 0, 0
```

The `describeChildren()` method of the DrawingCanvas class loops through the
canvas's child list, using the `numChildren` property (inherited from the
DisplayObjectContainer class) to set the limit of the `for` loop. It generates a
string listing each child, as follows:

```
var desc:String = "";
var child:DisplayObject;
for (var i:int=0; i < this.numChildren; i++)
{
    child = this.getChildAt(i);
    desc += i + ": " + child + '\n';
}
```

The resulting string is used to set the `text` property of the `outputTxt` text
field.

## Clicking and dragging display objects

When the user clicks on a GeometricSprite instance, the application calls the
`onMouseDown()` event handler. As the following shows, this event handler is set
to listen for mouse down events in the constructor function of the
GeometricSprite class:

```
this.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
```

The `onMouseDown()` method then calls the `showSelected()` method of the
GeometricSprite object. If it is the first time this method has been called for
the object, the method creates a new Shape object named `selectionIndicator` and
it uses the `graphics` property of the Shape object to draw a red highlight
rectangle, as follows:

```
this.selectionIndicator = new Shape();
this.selectionIndicator.graphics.lineStyle(1.0, 0xFF0000, 1.0);
this.selectionIndicator.graphics.drawRect(-1, -1, this.size + 1, this.size + 1);
this.addChild(this.selectionIndicator);
```

If this is not the first time the `onMouseDown()` method is called, the method
simply sets the `selectionIndicator` shape's `visible` property (inherited from
the DisplayObject class), as follows:

```
this.selectionIndicator.visible = true;
```

The `hideSelected()` method hides the `selectionIndicator` shape of the
previously selected object by setting its `visible` property to `false`.

The `onMouseDown()` event handler method also calls the `startDrag()` method
(inherited from the Sprite class), which includes the following code:

```
var boundsRect:Rectangle = this.parent.getRect(this.parent);
boundsRect.width -= this.size;
boundsRect.height -= this.size;
this.startDrag(false, boundsRect);
```

This lets the user drag the selected object around the canvas, within the
boundaries set by the `boundsRect` rectangle.

When the user releases the mouse button, the `mouseUp` event is dispatched. The
constructor method of the DrawingCanvas sets up the following event listener:

```
this.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
```

This event listener is set for the DrawingCanvas object, rather than for the
individual GeometricSprite objects. This is because when the GeometricSprite
object is dragged, it could end up behind another display object (another
GeometricSprite object) when the mouse is released. The display object in the
foreground would receive the mouse up event but the display object the user is
dragging would not. Adding the listener to the DrawingCanvas object ensures that
the event is always handled.

The `onMouseUp()` method calls the `onMouseUp()` method of the GeometricSprite
object, which in turn calls the `stopDrag()` method of the GeometricSprite
object.

## Rearranging display object layering

The user interface for the application includes buttons labeled Move Back, Move
Down, Move Up, and Move to Front. When the user clicks one of these buttons, the
application calls the corresponding method of the DrawingCanvas class:
`moveToBack()`, `moveDown()`, `moveUp()`, or `moveToFront()`. For example, the
`moveToBack()` method includes the following code:

```
public function moveToBack(shape:GeometricSprite):void
{
    var index:int = this.getChildIndex(shape);
    if (index > 0)
    {
        this.setChildIndex(shape, 0);
    }
}
```

The method uses the `setChildIndex()` method (inherited from the
DisplayObjectContainer class) to position the display object in index position 0
in the child list of the DrawingCanvas instance (`this`).

The `moveDown()` method works similarly, except that it decrements the index
position of the display object by 1 in the child list of the DrawingCanvas
instance:

```
public function moveDown(shape:GeometricSprite):void
{
    var index:int = this.getChildIndex(shape);
    if (index > 0)
    {
        this.setChildIndex(shape, index - 1);
    }
}
```

The `moveUp()` and `moveToFront()` methods work similarly to the `moveToBack()`
and `moveDown()` methods.
