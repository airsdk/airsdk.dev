---
sidebar_position: 5
---

# Handling menu events

A menu dispatches events when the user selects the menu or when the user selects
a menu item.

## Events summary for menu classes

Add event listeners to menus or individual items to handle menu events.

<table>
<thead>
    <tr>
        <th><p>Object</p></th>
        <th><p>Events dispatched</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>NativeMenu (AIR)</p></td>
        <td>
            <p>Event.PREPARING (Adobe AIR 2.6 and later)</p>
            <p>Event.DISPLAYING</p>
            <p>Event.SELECT (propagated from child items and submenus)</p>
        </td>
    </tr>
    <tr>
        <td><p>NativeMenuItem (AIR)</p></td>
        <td>
            <p>Event.PREPARING (Adobe AIR 2.6 and later)</p>
            <p>Event.SELECT</p>
            <p>Event.DISPLAYING (propagated from parent menu)</p>
        </td>
    </tr>
    <tr>
        <td><p>ContextMenu</p></td>
        <td><p>ContextMenuEvent.MENU_SELECT</p></td>
    </tr>
    <tr>
        <td><p>ContextMenuItem</p></td>
        <td>
            <p>ContextMenuEvent.MENU_ITEM_SELECT</p>
            <p>Event.SELECT (AIR)</p>
        </td>
    </tr>
</tbody>
</table>

## Select menu events

To handle a click on a menu item, add an event listener for the `select` event
to the NativeMenuItem object:

```
var menuCommandX:NativeMenuItem = new NativeMenuItem("Command X");
menuCommandX.addEventListener(Event.SELECT, doCommandX)
```

Because `select` events bubble up to the containing menus, you can also listen
for select events on a parent menu. When listening at the menu level, you can
use the event object `target` property to determine which menu command was
selected. The following example traces the label of the selected command:

```
var colorMenuItem:NativeMenuItem = new NativeMenuItem("Choose a color");
var colorMenu:NativeMenu = new NativeMenu();
colorMenuItem.submenu = colorMenu;

var red:NativeMenuItem = new NativeMenuItem("Red");
var green:NativeMenuItem = new NativeMenuItem("Green");
var blue:NativeMenuItem = new NativeMenuItem("Blue");
colorMenu.addItem(red);
colorMenu.addItem(green);
colorMenu.addItem(blue);

if(NativeApplication.supportsMenu) {
	NativeApplication.nativeApplication.menu.addItem(colorMenuItem);
	NativeApplication.nativeApplication.menu.addEventListener(Event.SELECT, colorChoice);
} else if (NativeWindow.supportsMenu) {
	var windowMenu:NativeMenu = new NativeMenu();
	this.stage.nativeWindow.menu = windowMenu;
	windowMenu.addItem(colorMenuItem);
	windowMenu.addEventListener(Event.SELECT, colorChoice);
}

function colorChoice(event:Event):void {
	var menuItem:NativeMenuItem = event.target as NativeMenuItem;
	trace(menuItem.label + " has been selected");
}
```

If you are using the ContextMenuItem class, you can listen for either the
`select` event or the `menuItemSelect` event. The `menuItemSelect` event gives
you additional information about the object owning the context menu, but does
not bubble up to the containing menus.

## Displaying menu events

To handle the opening of a menu, you can add a listener for the `displaying`
event, which is dispatched before a menu is displayed. You can use the
displaying event to update the menu, for example by adding or removing items, or
by updating the enabled or checked states of individual items. You can also
listen for the `menuSelect` event from a ContextMenu object.

In AIR 2.6 and later, you can use the `preparing` event to update a menu in
response to either displaying a menu or selecting an item with a keyboard
shortcut.
