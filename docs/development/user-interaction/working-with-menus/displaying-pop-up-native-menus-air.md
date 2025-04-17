---
sidebar_position: 4
---

# Displaying pop-up native menus (AIR)

You can display any NativeMenu object at an arbitrary time and location above a
window, by calling the menu `display()` method. The method requires a reference
to the stage; thus, only content in the application sandbox can display a menu
as a pop-up.

The following method displays the menu defined by a NativeMenu object named
`popupMenu` in response to a mouse click:

```
private function onMouseClick(event:MouseEvent):void {
	popupMenu.display(event.target.stage, event.stageX, event.stageY);
}
```

Note: The menu does not need to be displayed in direct response to an event. Any
method can call the `display()` function.
