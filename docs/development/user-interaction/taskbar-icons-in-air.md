---
sidebar_position: 8
---

# Taskbar icons in AIR

Many operating systems provide a taskbar, such as the Mac OS X dock, that can
contain an icon to represent an application. Adobe® AIR® provides an interface
for interacting with the application task bar icon through the
`NativeApplication.nativeApplication.icon` property.

- [Using the system tray and dock icons](https://web.archive.org/web/20120623062652/http://www.adobe.com/devnet/air/flex/quickstart/articles/stopwatch_dock_system_tray.html)
  (Flex)

- [Using the system tray and dock icons](https://web.archive.org/web/20120623063842/http://www.adobe.com/devnet/air/flash/quickstart/articles/stopwatch_dock_system_tray.html)
  (Flash)

<!-- -->

## About taskbar icons

AIR creates the `NativeApplication.nativeApplication.icon` object automatically.
The object type is either DockIcon or SystemTrayIcon, depending on the operating
system. You can determine which of these InteractiveIcon subclasses that AIR
supports on the current operating system using the
`NativeApplication.supportsDockIcon` and
`NativeApplication.supportsSystemTrayIcon` properties. The InteractiveIcon base
class provides the properties `width`, `height`, and `bitmaps`, which you can
use to change the image used for the icon. However, accessing properties
specific to DockIcon or SystemTrayIcon on the wrong operating system generates a
runtime error.

To set or change the image used for an icon, create an array containing one or
more images and assign it to the
`NativeApplication.nativeApplication.icon.bitmaps` property. The size of taskbar
icons can be different on different operating systems. To avoid image
degradation due to scaling, you can add multiple sizes of images to the
`bitmaps` array. If you provide more than one image, AIR selects the size
closest to the current display size of the taskbar icon, scaling it only if
necessary. The following example sets the image for a taskbar icon using two
images:

```
NativeApplication.nativeApplication.icon.bitmaps =
```

            [bmp16x16.bitmapData, bmp128x128.bitmapData];

To change the icon image, assign an array containing the new image or images to
the `bitmaps` property. You can animate the icon by changing the image in
response to an `enterFrame` or `timer` event.

To remove the icon from the notification area on Windows and Linux, or to
restore the default icon appearance on Mac OS X, set `bitmaps` to an empty
array:

```
NativeApplication.nativeApplication.icon.bitmaps = [];
```

## Dock icons

AIR supports dock icons when `NativeApplication.supportsDockIcon` is `true`. The
`NativeApplication.nativeApplication.icon` property represents the application
icon on the dock (not a window dock icon).

Note: AIR does not support changing window icons on the dock under Mac OS X.
Also, changes to the application dock icon only apply while an application is
running — the icon reverts to its normal appearance when the application
terminates.

### Dock icon menus

You can add commands to the standard dock menu by creating a NativeMenu object
containing the commands and assigning it to the
`NativeApplication.nativeApplication.icon.menu` property. The items in the menu
are displayed above the standard dock icon menu items.

### Bouncing the dock

You can bounce the dock icon by calling the
`NativeApplication.nativeApplication.icon.bounce()` method. If you set the
`bounce() priority` parameter to informational, then the icon bounces once. If
you set it to critical, then the icon bounces until the user activates the
application. Constants for the `priority` parameter are defined in the
NotificationType class.

Note: The icon does not bounce if the application is already active.

### Dock icon events

When the dock icon is clicked, the NativeApplication object dispatches an
`invoke` event. If the application is not running, the system launches it.
Otherwise, the `invoke` event is delivered to the running application instance.

## System Tray icons

AIR supports system tray icons when `NativeApplication.supportsSystemTrayIcon`
is `true`, which is currently the case only on Windows and most Linux
distributions. On Windows and Linux, system tray icons are displayed in the
notification area of the taskbar. No icon is displayed by default. To show an
icon, assign an array containing BitmapData objects to the icon `bitmaps`
property. To change the icon image, assign an array containing the new images to
`bitmaps`. To remove the icon, set `bitmaps` to `null`.

### System tray icon menus

You can add a menu to the system tray icon by creating a NativeMenu object and
assigning it to the `NativeApplication.nativeApplication.icon.menu` property (no
default menu is provided by the operating system). Access the system tray icon
menu by right-clicking the icon.

### System tray icon tooltips

Add a tooltip to an icon by setting the tooltip property:

```
NativeApplication.nativeApplication.icon.tooltip = "Application name";
```

### System tray icon events

The SystemTrayIcon object referenced by the
NativeApplication.nativeApplication.icon property dispatches a ScreenMouseEvent
for `click`, `mouseDown`, `mouseUp`, `rightClick`, `rightMouseDown`, and
`rightMouseUp` events. You can use these events, along with an icon menu, to
allow users to interact with your application when it has no visible windows.

### Example: Creating an application with no windows

The following example creates an AIR application which has a system tray icon,
but no visible windows. (The `visible` property of the application must not be
set to `true` in the application descriptor, or the window will be visible when
the application starts up.)

```
package
{
	import flash.display.Loader;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.NativeWindow;
	import flash.display.Sprite;
	import flash.desktop.DockIcon;
	import flash.desktop.SystemTrayIcon;
	import flash.events.Event;
	import flash.net.URLRequest;
	import flash.desktop.NativeApplication;

	public class SysTrayApp extends Sprite
	{
		public function SysTrayApp():void
		{
			NativeApplication.nativeApplication.autoExit = false;
			var icon:Loader = new Loader();
			var iconMenu:NativeMenu = new NativeMenu();
			var exitCommand:NativeMenuItem = iconMenu.addItem(new NativeMenuItem("Exit"));
				exitCommand.addEventListener(Event.SELECT, function(event:Event):void {
					NativeApplication.nativeApplication.icon.bitmaps = [];
					NativeApplication.nativeApplication.exit();
				});

			if (NativeApplication.supportsSystemTrayIcon)
			{
				NativeApplication.nativeApplication.autoExit = false;
				icon.contentLoaderInfo.addEventListener(Event.COMPLETE, iconLoadComplete);
				icon.load(new URLRequest("icons/AIRApp_16.png"));

				var systray:SystemTrayIcon =
					NativeApplication.nativeApplication.icon as SystemTrayIcon;
				systray.tooltip = "AIR application";
				systray.menu = iconMenu;
			}

			if (NativeApplication.supportsDockIcon)
			{
				icon.contentLoaderInfo.addEventListener(Event.COMPLETE,iconLoadComplete);
				icon.load(new URLRequest("icons/AIRApp_128.png"));
				var dock:DockIcon = NativeApplication.nativeApplication.icon as DockIcon;
				dock.menu = iconMenu;
			}
		}

		private function iconLoadComplete(event:Event):void
		{
			NativeApplication.nativeApplication.icon.bitmaps =
				[event.target.content.bitmapData];
		}
	}
}
```

Note: When using the Flex WindowedApplication component, you must set the
`visible` attribute of the WindowedApplication tag to `false`. This attribute
supercedes the setting in the application descriptor.

Note: The example assumes that there are image files named `AIRApp_16.png` and
`AIRApp_128.png` in an `icons` subdirectory of the application. (Sample icon
files, which you can copy to your project folder, are included in the AIR SDK.)

## Window taskbar icons and buttons

Iconified representations of windows are typically displayed in the window area
of a taskbar or dock to allow users to easily access background or minimized
windows. The Mac OS X dock displays an icon for your application as well as an
icon for each minimized window. The Microsoft Windows and Linux taskbars display
a button containing the progam icon and title for each normal-type window in
your application.

### Highlighting the taskbar window button

When a window is in the background, you can notify the user that an event of
interest related to the window has occurred. On Mac OS X, you can notify the
user by bouncing the application dock icon (as described in
[Bouncing the dock](#bouncing-the-dock)). On Windows and Linux, you can
highlight the window taskbar button by calling the `notifyUser()` method of the
NativeWindow instance. The `type` parameter passed to the method determines the
urgency of the notification:

- `NotificationType.CRITICAL`: the window icon flashes until the user brings the
  window to the foreground.

- `NotificationType.INFORMATIONAL`: the window icon highlights by changing
  color.

  Note: On Linux, only the informational type of notification is supported.
  Passing either type value to the `notifyUser()` function will create the same
  effect.

  The following statement highlights the taskbar button of a window:

      stage.nativeWindow.notifyUser(NotificationType.CRITICAL);

  Calling the `NativeWindow.notifyUser()` method on an operating system that
  does not support window-level notification has no effect. Use the
  `NativeWindow.supportsNotification` property to determine if window
  notification is supported.

### Creating windows without taskbar buttons or icons

On the Windows operating system, windows created with the types _utility_ or
_lightweight_ do not appear on the taskbar. Invisible windows do not appear on
the taskbar, either.

Because the initial window is necessarily of type, _normal_ , in order to create
an application without any windows appearing in the taskbar, you must either
close the initial window or leave it invisible. To close all windows in your
application without terminating the application, set the `autoExit` property of
the NativeApplication object to `false` before closing the last window. To
simply prevent the initial window from ever becoming visible, add
`<visible>false</visible>` to the `<initalWindow>` element of the application
descriptor file (and do not set the `visible` property to `true` or call the
`activate()` method of the window).

In new windows opened by the application, set the `type` property of the
NativeWindowInitOption object passed to the window constructor to
`NativeWindowType.UTILITY` or `NativeWindowType.LIGHTWEIGHT`.

On Mac OS X, windows that are minimized are displayed on the dock taskbar. You
can prevent the minimized icon from being displayed by hiding the window instead
of minimizing it. The following example listens for a `nativeWindowDisplayState`
change event and cancels it if the window is being minimized. Instead the
handler sets the window `visible` property to `false`:

```
private function preventMinimize(event:NativeWindowDisplayStateEvent):void {
	if(event.afterDisplayState == NativeWindowDisplayState.MINIMIZED) {
		event.preventDefault();
		event.target.visible = false;
	}
}
```

If a window is minimized on the Mac OS X dock when you set the `visible`
property to `false`, the dock icon is not removed. A user can still click the
icon to make the window reappear.

More Help topics

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.NativeApplication](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeApplication.html)

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.DockIcon](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/DockIcon.html)

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.SystemTrayIcon](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/SystemTrayIcon.html)
