---
title: Traversing the display list
sidebar_position: 5
---

As you've seen, the display list is a tree structure. At the top of the tree is the Stage, which can contain multiple display objects. Those display objects that are themselves display object containers can contain other display objects, or display object containers.

![](images/dp_Display_List_Organization.png)

The `DisplayObjectContainer` class includes properties and methods for traversing the display list, by means of the child lists of display object containers. For example, consider the following code, which adds two display objects, title and pict , to the container object (which is a `Sprite`, and the `Sprite` class extends the `DisplayObjectContainer` class):

```actionscript
var container:Sprite = new Sprite();
var title:TextField = new TextField();
title.text = "Hello";
var pict:Loader = new Loader();
var url:URLRequest = new URLRequest("banana.jpg");
pict.load(url);
pict.name = "banana loader";
container.addChild(title);
container.addChild(pict);
```

The `getChildAt()` method returns the child of the display list at a specific index position:

```actionscript
trace(container.getChildAt(0) is TextField); // true
```

You can also access child objects by name. Each display object has a name property, and if you don’t assign it, Flash Player or AIR assigns a default value, such as "instance1" . For example, the following code shows how to use the `getChildByName()` method to access a child display object with the name `"banana loader"` :

```actionscript
trace(container.getChildByName("banana loader") is Loader); // true
```

Using the `getChildByName()` method can result in slower performance than using the `getChildAt()` method.

Since a display object container can contain other display object containers as child objects in its display list, you can traverse the full display list of the application as a tree. For example, in the code excerpt shown earlier, once the load operation for the pict Loader object is complete, the pict object will have one child display object, which is the bitmap, loaded. To access this bitmap display object, you can write `pict.getChildAt(0)` . You can also write `container.getChildAt(0).getChildAt(0)` (since `container.getChildAt(0) == pict` ).

The following function provides an indented trace() output of the display list from a display object container:

```actionscript
function traceDisplayList(container:DisplayObjectContainer, indentString:String = ""):void
{
    var child:DisplayObject;
    for (var i:uint=0; i < container.numChildren; i++)
    {
        child = container.getChildAt(i);
        trace(indentString, child, child.name);
        if (container.getChildAt(i) is DisplayObjectContainer)
        {
            traceDisplayList(DisplayObjectContainer(child), indentString + " ")
        }
    }
}
```

## Adobe Flex

If you use Flex, you should know that Flex defines many component display object classes, and these classes override the display list access methods of the `DisplayObjectContainer` class. For example, the Container class of the `mx.core` package overrides the `addChild()` method and other methods of the `DisplayObjectContainer` class (which the Container class extends). In the case of the `addChild()` method, the class overrides the method in such a way that you cannot add all types of display objects to a Container instance in Flex. The overridden method, in this case, requires that the child object that you are adding be a type of `mx.core.UIComponent` object.
