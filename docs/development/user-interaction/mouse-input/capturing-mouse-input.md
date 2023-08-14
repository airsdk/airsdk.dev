---
sidebar_position: 1
---

# Capturing mouse input

Mouse clicks create mouse events that can be used to trigger interactive
functionality. You can add an event listener to the Stage to listen for mouse
events that occur anywhere within the SWF file. You can also add event listeners
to objects on the Stage that inherit from InteractiveObject (for example, Sprite
or MovieClip); these listeners are triggered when the object is clicked.

As with keyboard events, mouse events bubble. In the following example, because
`square` is a child of the Stage, the event dispatches both from the sprite
`square` as well as from the Stage object when the square is clicked:

```actionscript
var square:Sprite = new Sprite();
square.graphics.beginFill(0xFF0000);
square.graphics.drawRect(0,0,100,100);
square.graphics.endFill();
square.addEventListener(MouseEvent.CLICK, reportClick);
square.x =
square.y = 50;
addChild(square);

stage.addEventListener(MouseEvent.CLICK, reportClick);

function reportClick(event:MouseEvent):void
{
    trace(event.currentTarget.toString() + " dispatches MouseEvent. Local coords [" + event.localX + "," + event.localY + "] Stage coords [" + event.stageX + "," + event.stageY + "]");
}
```

In the previous example, notice that the mouse event contains positional
information about the click. The `localX` and `localY` properties contain the
location of the click on the lowest child in the display chain. For example,
clicking at the top-left corner of `square` reports local coordinates of \[0,0\]
because that is the registration point of `square`. Alternatively, the `stageX`
and `stageY` properties refer to the global coordinates of the click on the
Stage. The same click reports \[50,50\] for these coordinates, because `square`
was moved to these coordinates. Both of these coordinate pairs can be useful
depending on how you want to respond to user interaction.

Note: In full-screen mode, you can configure the application to use mouse
locking. Mouse locking disables the cursor and enables unbounded mouse movement.
For more information, see
[Working with full-screen mode](../../display/display-programming/working-with-display-objects/setting-stage-properties.md#working-with-full-screen-mode).

The MouseEvent object also contains `altKey`, `ctrlKey`, and `shiftKey` Boolean
properties. You can use these properties to check if the Alt, Ctrl, or Shift key
is also being pressed at the time of the mouse click.

## Dragging Sprites around the stage

You can allow users to drag a Sprite object around the stage using the
`startDrag()` method of the Sprite class. The following code shows an example of
this:

```actionscript
import flash.display.Sprite;
import flash.events.MouseEvent;

var circle:Sprite = new Sprite();
circle.graphics.beginFill(0xFFCC00);
circle.graphics.drawCircle(0, 0, 40);

var target1:Sprite = new Sprite();
target1.graphics.beginFill(0xCCFF00);
target1.graphics.drawRect(0, 0, 100, 100);
target1.name = "target1";

var target2:Sprite = new Sprite();
target2.graphics.beginFill(0xCCFF00);
target2.graphics.drawRect(0, 200, 100, 100);
target2.name = "target2";

addChild(target1);
addChild(target2);
addChild(circle);

circle.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown)

function mouseDown(event:MouseEvent):void
{
    circle.startDrag();
}
circle.addEventListener(MouseEvent.MOUSE_UP, mouseReleased);

function mouseReleased(event:MouseEvent):void
{
    circle.stopDrag();
    trace(circle.dropTarget.name);
}
```

For more details, see the section on creating mouse drag interaction in
[Changing position](../../display/display-programming/manipulating-display-objects/changing-position.md).

#### Drag-and-drop in AIR

In Adobe AIR, you can enable drag-and-drop support to allow users to drag data
into and out of your application. For more details, see
[Drag and drop in AIR](../drag-and-drop-in-air/index.md).

## Customizing the mouse cursor

The mouse cursor (mouse pointer) can be hidden or swapped for any display object
on the Stage. To hide the mouse cursor, call the `Mouse.hide()` method.
Customize the cursor by calling `Mouse.hide()`, listening to the Stage for the
`MouseEvent.MOUSE_MOVE` event, and setting the coordinates of a display object
(your custom cursor) to the `stageX` and `stageY` properties of the event. The
following example illustrates a basic execution of this task:

```actionscript
var cursor:Sprite = new Sprite();
cursor.graphics.beginFill(0x000000);
cursor.graphics.drawCircle(0,0,20);
cursor.graphics.endFill();
addChild(cursor);

stage.addEventListener(MouseEvent.MOUSE_MOVE,redrawCursor);
Mouse.hide();

function redrawCursor(event:MouseEvent):void
{
    cursor.x = event.stageX;
    cursor.y = event.stageY;
}
```
