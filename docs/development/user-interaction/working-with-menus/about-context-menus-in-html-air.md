---
sidebar_position: 3
---

# About context menus in HTML (AIR)

In HTML content displayed using the HTMLLoader object, the `contextmenu` event
can be used to display a context menu. By default, a context menu is displayed
automatically when the user invokes the context menu event on selected text (by
right-clicking or command-clicking the text). To prevent the default menu from
opening, listen for the `contextmenu` event and call the event object's
`preventDefault()` method:

```
function showContextMenu(event){
	event.preventDefault();
}
```

You can then display a custom context menu using DHTML techniques or by
displaying an AIR native context menu. The following example displays a native
context menu by calling the menu `display()` method in response to the HTML
`contextmenu` event:

```
<html>
<head>
	<script src="AIRAliases.js" language="JavaScript" type="text/javascript"></script>
	<script language="javascript" type="text/javascript">
		function showContextMenu(event){
			event.preventDefault();
			contextMenu.display(window.nativeWindow.stage, event.clientX, event.clientY);
		}

		function createContextMenu(){
			var menu = new air.NativeMenu();
			var command = menu.addItem(new air.NativeMenuItem("Custom command"));
			command.addEventListener(air.Event.SELECT, onCommand);
			return menu;
		}

		function onCommand(){
			air.trace("Context command invoked.");
		}

		var contextMenu = createContextMenu();
	</script>
</head>
<body>
	<p oncontextmenu="showContextMenu(event)" style="-khtml-user-select:auto;">Custom context menu.</p>
</body>
</html>
```
