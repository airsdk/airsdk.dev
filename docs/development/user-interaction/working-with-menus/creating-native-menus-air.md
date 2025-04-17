---
sidebar_position: 2
---

# Creating native menus (AIR)

This topic describes how to create the various types of native menu supported by
AIR.

## Creating a root menu object

To create a NativeMenu object to serve as the root of the menu, use the
NativeMenu constructor:

```
var root:NativeMenu = new NativeMenu();
```

For application and window menus, the root menu represents the menu bar and
should only contain items that open submenus. Context menu and pop-up menus do
not have a menu bar, so the root menu can contain commands and separator lines
as well as submenus.

After the menu is created, you can add menu items. Items appear in the menu in
the order in which they are added, unless you add the items at a specific index
using the `addItemAt()` method of a menu object.

Assign the menu as an application, window, icon, or context menu, or display it
as a pop-up menu as shown in the following sections:

#### Setting the application menu or window menu

It's important that your code accommodate both application menus (supported on
Mac OS) and window menus (supported on other operating systems)

```
var root:NativeMenu = new NativeMenu();
if (NativeApplication.supportsMenu)
{
	NativeApplication.nativeApplication.menu = root;
}
else if (NativeWindow.supportsMenu)
{
	nativeWindow.menu = root;
}
```

Note: Mac OS defines a menu containing standard items for every application.
Assigning a new NativeMenu object to the `menu` property of the
NativeApplication object replaces the standard menu. You can also use the
standard menu instead of replacing it.

The Adobe Flex provides a FlexNativeMenu class for easily creating menus that
work across platforms. If you are using the Flex Framework, use the
FlexNativeMenu classes instead of the NativeMenu class.

#### Setting a context menu on an interactive object

```
interactiveObject.contextMenu = root;
```

#### Setting a dock icon menu or system tray icon menu

It's important that your code accommodate both application menus (supported on
Mac OS) and window menus (supported on other operating systems)

```
if (NativeApplication.supportsSystemTrayIcon)
{
	SystemTrayIcon(NativeApplication.nativeApplication.icon).menu = root;
}
else if (NativeApplication.supportsDockIcon)
{
	DockIcon(NativeApplication.nativeApplication.icon).menu = root;
}
```

Note: Mac OS X defines a standard menu for the application dock icon. When you
assign a new NativeMenu to the menu property of the DockIcon object, the items
in that menu are displayed above the standard items. You cannot remove, access,
or modify the standard menu items.

#### Displaying a menu as a pop-up

```
root.display(stage, x, y);
```

## Creating a submenu

To create a submenu, you add a NativeMenuItem object to the parent menu and then
assign the NativeMenu object defining the submenu to the item's `submenu`
property. AIR provides two ways to create submenu items and their associated
menu object:

You can create a menu item and its related menu object in one step with the
`addSubmenu()` method:

```
var editMenuItem:NativeMenuItem = root.addSubmenu(new NativeMenu(), "Edit");
```

You can also create the menu item and assign the menu object to its `submenu`
property separately:

```
var editMenuItem:NativeMenuItem = root.addItem("Edit", false);
editMenuItem.submenu = new NativeMenu();
```

## Creating a menu command

To create a menu command, add a NativeMenuItem object to a menu and add an event
listener referencing the function implementing the menu command:

```
var copy:NativeMenuItem = new NativeMenuItem("Copy", false);
copy.addEventListener(Event.SELECT, onCopyCommand);
editMenu.addItem(copy);
```

You can listen for the `select` event on the command item itself (as shown in
the example), or you can listen for the `select` event on a parent menu object.

Note: Menu items that represent submenus and separator lines do not dispatch
`select` events and so cannot be used as commands.

## Creating a menu separator line

To create a separator line, create a NativeMenuItem, setting the `isSeparator`
parameter to `true` in the constructor. Then add the separator item to the menu
in the correct location:

```
var separatorA:NativeMenuItem = new NativeMenuItem("A", true);
editMenu.addItem(separatorA);
```

The label specified for the separator, if any, is not displayed.

More Help topics

![](../../img/flexLinkIndicator.png)
[Using the Flex AIR components](https://web.archive.org/web/20150519004618/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WSacd9bdd0c5c09f4a-690d4877120e8b878b0-8000.html)

[Developing cross-platform AIR applications](https://web.archive.org/web/20150214073806/https://www.adobe.com/devnet/air/articles/developing_crossplatform.html)
