---
title: Advantages of the display list approach
sidebar_position: 4
---

In ActionScript 3.0, there are separate classes for different types of display objects. In ActionScript 1.0 and 2.0, many of the same types of objects are all included in one class: the MovieClip class.

This individualization of classes and the hierarchical structure of display lists have the following benefits:

- More efficient rendering and reduced memory usage
- Improved depth management
- Full traversal of the display list
- Off-list display objects
- Easier subclassing of display objects

## More efficient rendering and smaller file sizes

In ActionScript 1.0 and 2.0, you could draw shapes only in a MovieClip object. In ActionScript 3.0, there are simpler display object classes in which you can draw shapes. Because these ActionScript 3.0 display object classes do not include the full set of methods and properties that a MovieClip object includes, they are less taxing on memory and processor resources.

For example, each MovieClip object includes properties for the timeline of the movie clip, whereas a Shape object does not. The properties for managing the timeline can use a lot of memory and processor resources. In ActionScript 3.0, using the Shape object results in better performance. The Shape object has less overhead than the more complex MovieClip object. Flash Player and AIR do not need to manage unused MovieClip properties, which improves speed and reduces the memory footprint the object uses.

## Improved depth management

In ActionScript 1.0 and 2.0, depth was managed through a linear depth management scheme and methods such as getNextHighestDepth() .

ActionScript 3.0 includes the DisplayObjectContainer class, which has more convenient methods and properties for managing the depth of display objects.

In ActionScript 3.0, when you move a display object to a new position in the child list of a DisplayObjectContainer instance, the other children in the display object container are repositioned automatically and assigned appropriate child index positions in the display object container.

Also, in ActionScript 3.0 it is always possible to discover all of the child objects of any display object container. Every DisplayObjectContainer instance has a numChildren property, which lists the number of children in the display object container. And since the child list of a display object container is always an indexed list, you can examine every object in the list from index position 0 through the last index position ( numChildren - 1 ). This was not possible with the methods and properties of a MovieClip object in ActionScript 1.0 and 2.0.

In ActionScript 3.0, you can easily traverse the display list sequentially; there are no gaps in the index numbers of a child list of a display object container. Traversing the display list and managing the depth of objects is much easier than was possible in ActionScript 1.0 and 2.0. In ActionScript 1.0 and 2.0, a movie clip could contain objects with intermittent gaps in the depth order, which could make it difficult to traverse the list of object. In ActionScript 3.0, each child list of a display object container is cached internally as an array, resulting in very fast lookups (by index). Looping through all children of a display object container is also very fast.

In ActionScript 3.0, you can also access children in a display object container by using the getChildByName() method of the DisplayObjectContainer class.

## Full traversal of the display list

In ActionScript 1.0 and 2.0, you could not access some objects, such as vector shapes, that were drawn in the Flash authoring tool. In ActionScript 3.0, you can access all objects on the display list—both those created using ActionScript and all display objects created in the Flash authoring tool. For details, see [Traversing the display list](working-with-display-objects/traversing-the-display-list.md) .

## Off-list display objects

In ActionScript 3.0, you can create display objects that are not on the visible display list. These are known as off-list display objects. A display object is added to the visible display list only when you call the `addChild()` or `addChildAt()` method of a `DisplayObjectContainer` instance that has already been added to the display list.

You can use off-list display objects to assemble complex display objects, such as those that have multiple display object containers containing multiple display objects. By keeping display objects off-list, you can assemble complicated objects without using the processing time to render these display objects. You can then add an off-list display object to the display list when it is needed. Also, you can move a child of a display object container on and off the display list and to any desired position in the display list at will.

## Easier subclassing of display objects

In ActionScript 1.0 and 2.0, you would often have to add new `MovieClip` objects to a SWF file to create basic shapes or to display bitmaps. In ActionScript 3.0, the DisplayObject class includes many built-in subclasses, including Shape and Bitmap. Because the classes in ActionScript 3.0 are more specialized for specific types of objects, it is easier to create basic subclasses of the built-in classes.

For example, in order to draw a circle in ActionScript 2.0, you could create a `CustomCircle` class that extends the `MovieClip` class when an object of the custom class is instantiated. However, that class would also include a number of properties and methods from the `MovieClip` class (such as `totalFrames` ) that do not apply to the class. In ActionScript 3.0, however, you can create a `CustomCircle` class that extends the `Shape` object, and as such does not include the unrelated properties and methods that are contained in the `MovieClip` class. The following code shows an example of a `CustomCircle` class:

```actionscript
import flash.display.*;

public class CustomCircle extends Shape
{
    var xPos:Number;
    var yPos:Number;
    var radius:Number;
    var color:uint;

    public function CustomCircle(

        xInput:Number,
        yInput:Number,
        rInput:Number,
        colorInput:uint)
    {
        xPos = xInput;
        yPos = yInput;
        radius = rInput;
        color = colorInput;
        this.graphics.beginFill(color);
        this.graphics.drawCircle(xPos, yPos, radius);
    }
}
```
