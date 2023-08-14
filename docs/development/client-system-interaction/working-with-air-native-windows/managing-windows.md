---
sidebar_position: 3
---

# Managing windows

You use the properties and methods of the NativeWindow class to manage the
appearance, behavior, and life cycle of desktop windows.

Note: When using the Flex framework, it is generally better to manage window
behavior using the framework classes. Most of the NativeWindow properties and
methods can be accessed through the mx:WindowedApplication and mx:Window
classes.

## Getting a NativeWindow instance

To manipulate a window, you must first get the window instance. You can get a
window instance from one of the following places:

- The native window constructor used to create the window:

      var win:NativeWindow = new NativeWindow(initOptions);

- The `nativeWindow` property of the window stage:

      var win:NativeWindow = stage.nativeWindow;

- The `stage` property of a display object in the window:

      var win:NativeWindow = displayObject.stage.nativeWindow;

- The `target` property of a native window event dispatched by the window:

      private function onNativeWindowEvent(event:NativeWindowBoundsEvent):void
      {
      	var win:NativeWindow = event.target as NativeWindow;
      }

- The `nativeWindow` property of an HTML page displayed in the window:

      var win:NativeWindow = htmlLoader.window.nativeWindow;

- The `activeWindow` and `openedWindows` properties of the NativeApplication
  object:

      var nativeWin:NativeWindow = NativeApplication.nativeApplication.activeWindow;
      var firstWindow:NativeWindow = NativeApplication.nativeApplication.openedWindows[0];

  `NativeApplication.nativeApplication.activeWindow` references the active
  window of an application (but returns `null` if the active window is not a
  window of this AIR application). The
  `NativeApplication.nativeApplication.openedWindows` array contains all of the
  windows in an AIR application that have not been closed.

Because the Flex mx:WindowedApplication, and mx:Window objects are display
objects, you can easily reference the application window in an MXML file using
the `stage` property, as follows:

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" applicationComplete="init();">
    	<mx:Script>
    	<![CDATA[
    		import flash.display.NativeWindow;

    		public function init():void{
    			var appWindow:NativeWindow = this.stage.nativeWindow;
    			//set window properties
    			appWindow.visible = true;
    		}
    	]]>
    	</mx:Script>
    </WindowedApplication

Note: Until the WindowedApplication or Window component is added to the window
stage by the Flex framework, the component's `stage` property is `null`. This
behavior is consistent with that of the Flex Application component, but does
mean that it is not possible to access the stage or the NativeWindow instance in
listeners for events that occur earlier in the initialization cycle of the
WindowedApplication and Window components, such as `creationComplete`. It is
safe to access the stage and NativeWindow instance when the
`applicationComplete` event is dispatched.

## Activating, showing, and hiding windows

To activate a window, call the NativeWindow `activate()` method. Activating a
window brings the window to the front, gives it keyboard and mouse focus, and,
if necessary, makes it visible by restoring the window or setting the `visible`
property to `true`. Activating a window does not change the ordering of other
windows in the application. Calling the `activate()` method causes the window to
dispatch an `activate` event.

To show a hidden window without activating it, set the `visible` property to
`true`. This brings the window to the front, but will not assign the focus to
the window.

To hide a window from view, set its `visible` property to `false`. Hiding a
window suppresses the display of both the window, any related taskbar icons,
and, on Mac OS X, the entry in the Windows menu.

When you change the visibility of a window, the visibility of any windows that
window owns is also changed. For example, if you hide a window, all of its owned
windows are also hidden.

Note: On Mac OS X, it is not possible to completely hide a minimized window that
has an icon in the window portion of the dock. If the `visible` property is set
to `false` on a minimized window, the dock icon for the window is still
displayed. If the user clicks the icon, the window is restored to a visible
state and displayed.

## Changing the window display order

AIR provides several methods for directly changing the display order of windows.
You can move a window to the front of the display order or to the back; you can
move a window above another window or behind it. At the same time, the user can
reorder windows by activating them.

You can keep a window in front of other windows by setting its `alwaysInFront`
property to `true`. If more than one window has this setting, then the display
order of these windows is sorted among each other, but they are always sorted
above windows which have `alwaysInFront` set to false.

Windows in the top-most group are also displayed above windows in other
applications, even when the AIR application is not active. Because this behavior
can be disruptive to a user, setting `alwaysInFront` to `true` should only be
done when necessary and appropriate. Examples of justified uses include:

- Temporary pop-up windows for controls such as tool tips, pop-up lists, custom
  menus, or combo boxes. Because these windows should close when they lose
  focus, the annoyance of blocking a user from viewing another window can be
  avoided.

- Extremely urgent error messages and alerts. When an irrevocable change may
  occur if the user does not respond in a timely manner, it may be justified to
  push an alert window to the forefront. However, most errors and alerts can be
  handled in the normal window display order.

- Short-lived toast-style windows.

Note: AIR does not enforce proper use of the `alwaysInFront` property. However,
if your application disrupts a user's workflow, it is likely to be consigned to
that same user's trash can.

If a window owns other windows, those windows are always ordered in front of it.
If you call `orderToFront()` or set `alwaysInFront` to `true` on a window that
owns other windows, then the owned windows are re-ordered along with the owner
window in front of other windows, but the owned windows still display in front
of the owner.

Calling the window ordering methods on owned windows works normally among
windows owned by the same window, but can also change the ordering of the entire
group of owned windows compared to windows outside that group. For example, if
you call `orderToFront()` on an owned window, then both that window, its owner,
and any other windows owned by the same owner are moved to the front of the
window display order.

The NativeWindow class provides the following properties and methods for setting
the display order of a window relative to other windows:

<table>
<thead>
	<tr>
		<th><p>Member</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p>alwaysInFront property</p></td>
		<td>
			<p>Specifies whether the window is displayed in the top-most group of windows.</p>
			<p>In almost all cases, <samp>false</samp> is the best setting. Changing
			the value from <samp>false</samp> to <samp>true</samp> brings the window
			to the front of all windows (but does not activate it). Changing the
			value from <samp>true</samp> to <samp>false</samp> orders the window
			behind windows remaining in the top-most group, but still in front of
			other windows. Setting the property to its current value for a window
			does not change the window display order.</p>
			<p>The <samp>alwaysInFront</samp> setting has no affect on windows owned by another window.</p></td>
	</tr>
	<tr>
		<td><p>orderToFront()</p></td>
		<td><p>Brings the window to the front.</p></td>
	</tr>
	<tr>
		<td><p>orderInFrontOf()</p></td>
		<td><p>Brings the window directly in front of a particular window.</p></td>
	</tr>
	<tr>
		<td><p>orderToBack()</p></td>
		<td><p>Sends the window behind other windows.</p></td>
	</tr>
	<tr>
		<td><p>orderBehind()</p></td>
		<td><p>Sends the window directly behind a particular window.</p></td>
	</tr>
	<tr>
		<td><p>activate()</p></td>
		<td><p>Brings the window to the front (along with making the window visible and assigning focus).</p></td>
	</tr>
</tbody>
</table>

Note: If a window is hidden ( `visible` is `false`) or minimized, then calling
the display order methods has no effect.

On the Linux operating system, different window managers enforce different rules
regarding the window display order:

- On some window managers, utility windows are always displayed in front of
  normal windows.

- On some window managers, a full screen window with `alwaysInFront` set to
  `true` is always displayed in front of other windows that also have
  `alwaysInFront` set to `true`.

## Closing a window

To close a window, use the `NativeWindow.close()` method.

Closing a window unloads the contents of the window, but if other objects have
references to this content, the content objects will not be destroyed. The
`NativeWindow.close()` method executes asynchronously, the application that is
contained in the window continues to run during the closing process. The close
method dispatches a close event when the close operation is complete. The
NativeWindow object is still technically valid, but accessing most properties
and methods on a closed window generates an IllegalOperationError. You cannot
reopen a closed window. Check the `closed` property of a window to test whether
a window has been closed. To simply hide a window from view, set the
`NativeWindow.visible` property to `false`.

If the `Nativeapplication.autoExit` property is `true`, which is the default,
then the application exits when its last window closes.

Any windows that have an owner are closed when the owner is closed. The owned
windows do not dispatch a closing event and hence cannot prevent closure. A
close event is dispatched.

## Allowing cancellation of window operations

When a window uses system chrome, user interaction with the window can be
canceled by listening for, and canceling the default behavior of the appropriate
events. For example, when a user clicks the system chrome close button, the
`closing` event is dispatched. If any registered listener calls the
`preventDefault()` method of the event, then the window does not close.

When a window does not use system chrome, notification events for intended
changes are not automatically dispatched before the change is made. Hence, if
you call the methods for closing a window, changing the window state, or set any
of the window bounds properties, the change cannot be canceled. To notify
components in your application before a window change is made, your application
logic can dispatch the relevant notification event using the `dispatchEvent()`
method of the window.

For example, the following logic implements a cancelable event handler for a
window close button:

    public function onCloseCommand(event:MouseEvent):void {
    	var closingEvent:Event = new Event(Event.CLOSING,true,true);
    	dispatchEvent(closing);
    	if(!closingEvent.isDefaultPrevented()) {
    		win.close();
    	}
    }

The `dispatchEvent()` method returns `false` if the event `preventDefault()`
method is called by a listener. However, it can also return `false` for other
reasons, so it is better to explicitly use the `isDefaultPrevented()` method to
test whether the change should be canceled.

## Maximizing, minimizing, and restoring a window

To maximize the window, use the NativeWindow `maximize()` method.

    myWindow.maximize();

To minimize the window, use the NativeWindow `minimize()` method.

    myWindow.minimize();

To restore the window (that is, return it to the size that it was before it was
either minimized or maximized), use the NativeWindow `restore()` method.

    myWindow.restore();

A window that has an owner is minimized and restored when the owning window is
minimized or restored. No events are dispatched by the owned window when it is
minimized because its owner is minimized.

Note: The behavior that results from maximizing an AIR window is different from
the Mac OS X standard behavior. Rather than toggling between an
application-defined "standard" size and the last size set by the user, AIR
windows toggle between the size last set by the application or user and the full
usable area of the screen.

On the Linux operating system, different window managers enforce different rules
regarding setting the window display state:

- On some window managers, utility windows cannot be maximized.

- If a maximum size is set for the window, then some windows do not allow a
  window to be maximized. Some other window managers set the display state to
  maximized, but do not resize the window. In either of these cases, no display
  state change event is dispatched.

- Some window managers do not honor the window `maximizable` or `minimizable`
  settings.

Note: On Linux, window properties are changed asynchronously. If you change the
display state in one line of your program, and read the value in the next, the
value read will still reflect the old setting. On all platforms, the
NativeWindow object dispatches the `displayStateChange` event when the display
state changes. If you need to take some action based on the new state of the
window, always do so in a `displayStateChange` event handler. See
[Listening for window events](./listening-for-window-events.md).

## Example: Minimizing, maximizing, restoring and closing a window

The following short MXML application demonstrates the Window `maximize()`,
`minimize()`, `restore()`, and `close()` methods:

    <?xml version="1.0" encoding="utf-8"?>

    <mx:WindowedApplication
    	xmlns:mx="https://www.adobe.com/2006/mxml"
    	layout="vertical">


    	<mx:Script>
    	<![CDATA[
    		public function minimizeWindow():void
    		{
    			this.stage.nativeWindow.minimize();
    		}

    		public function maximizeWindow():void
    		{
    			this.stage.nativeWindow.maximize();
    		}

    		public function restoreWindow():void
    		{
    			this.stage.nativeWindow.restore();
    		}

    		public function closeWindow():void
    		{
    			this.stage.nativeWindow.close();
    		}
    	]]>
    	</mx:Script>

    	<mx:VBox>
    		<mx:Button label="Minimize" click="minimizeWindow()"/>
    		<mx:Button label="Restore" click="restoreWindow()"/>
    		<mx:Button label="Maximize" click="maximizeWindow()"/>
    		<mx:Button label="Close" click="closeWindow()"/>
    	</mx:VBox>

    </mx:WindowedApplication>

The following ActionScript example for Flash creates four clickable text fields
that trigger the NativeWindow `minimize()`, `maximize()`, `restore()`, and
`close()` methods:

    package
    {
    	import flash.display.Sprite;
    	import flash.events.MouseEvent;
    	import flash.text.TextField;

    	public class MinimizeExample extends Sprite
    	{
    		public function MinimizeExample():void
    		{
    			var minTextBtn:TextField = new TextField();
    			minTextBtn.x = 10;
    			minTextBtn.y = 10;
    			minTextBtn.text = "Minimize";
    			minTextBtn.background = true;
    			minTextBtn.border = true;
    			minTextBtn.selectable = false;
    			addChild(minTextBtn);
    			minTextBtn.addEventListener(MouseEvent.CLICK, onMinimize);

    			var maxTextBtn:TextField = new TextField();
    			maxTextBtn.x = 120;
    			maxTextBtn.y = 10;
    			maxTextBtn.text = "Maximize";
    			maxTextBtn.background = true;
    			maxTextBtn.border = true;
    			maxTextBtn.selectable = false;
    			addChild(maxTextBtn);
    			maxTextBtn.addEventListener(MouseEvent.CLICK, onMaximize);

    			var restoreTextBtn:TextField = new TextField();
    			restoreTextBtn.x = 230;
    			restoreTextBtn.y = 10;
    			restoreTextBtn.text = "Restore";
    			restoreTextBtn.background = true;
    			restoreTextBtn.border = true;
    			restoreTextBtn.selectable = false;
    			addChild(restoreTextBtn);
    			restoreTextBtn.addEventListener(MouseEvent.CLICK, onRestore);

    			var closeTextBtn:TextField = new TextField();
    			closeTextBtn.x = 340;
    			closeTextBtn.y = 10;
    			closeTextBtn.text = "Close Window";
    			closeTextBtn.background = true;
    			closeTextBtn.border = true;
    			closeTextBtn.selectable = false;
    			addChild(closeTextBtn);
    			closeTextBtn.addEventListener(MouseEvent.CLICK, onCloseWindow);
    		}
    		function onMinimize(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.minimize();
    		}
    		function onMaximize(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.maximize();
    		}
    		function onRestore(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.restore();
    		}
    		function onCloseWindow(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.close();
    		}
    	}
    }

## Resizing and moving a window

When a window uses system chrome, the chrome provides drag controls for resizing
the window and moving around the desktop. If a window does not use system chrome
you must add your own controls to allow the user to resize and move the window.

Note: To resize or move a window, you must first obtain a reference to the
NativeWindow instance. For information about how to obtain a window reference,
see [Getting a NativeWindow instance](#getting-a-nativewindow-instance).

#### Resizing a window

To allow a user to resize a window interactively, use the NativeWindow
`startResize()` method. When this method is called from a `mouseDown` event, the
resizing operation is driven by the mouse and completes when the operating
system receives a `mouseUp` event. When calling `startResize()`, you pass in an
argument that specifies the edge or corner from which to resize the window.

To set the window size programmatically, set the `width`, `height`, or `bounds`
properties of the window to the desired dimensions. When you set the bounds, the
window size and position can all be changed at the same time. However, the order
that the changes occur is not guaranteed. Some Linux window managers do not
allow windows to extend outside the bounds of the desktop screen. In these
cases, the final window size may be limited because of the order in which the
properties are set, even though the net affect of the changes would otherwise
have resulted in a legal window. For example, if you change both the height and
y position of a window near the bottom of the screen, then the full height
change might not occur when the height change is applied before the y position
change.

Note: On Linux, window properties are changed asynchronously. If you resize a
window in one line of your program, and read the dimensions in the next, they
will still reflect the old settings. On all platforms, the NativeWindow object
dispatches the `resize` event when the window resizes. If you need to take some
action, such as laying out controls in the window, based on the new size or
state of the window, always do so in a `resize` event handler. See
[Listening for window events](./listening-for-window-events.md).

The scale mode of the stage determines how the window stage and its contents
behaves when a window is resized. Keep in mind that the stage scale modes are
designed for situations, such as a web browser, where the application is not in
control of the size or aspect ratio of its display space. In general, you get
the best results by setting the stage `scaleMode` property to
`StageScaleMode.NO_SCALE`. If you want the contents of the window to scale, you
can still set the `scaleX` and `scaleY` parameters of the content in response to
the window bounds changes.

#### Moving a window

To move a window without resizing it, use the NativeWindow `startMove()` method.
Like the `startResize()` method, when the `startMove()` method is called from a
`mouseDown` event, the move process is mouse-driven and completes when the
operating system receives a `mouseUp` event.

For more information, see the
[`startResize()`](<https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/NativeWindow.html#startResize()>)
and
[`startMove()`](<https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/NativeWindow.html#startMove()>)
method listings in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

To move a window programmatically, set the `x`, `y`, or `bounds` properties of
the window to the desired position. When you set the bounds, the window size and
position can both be changed at the same time.

Note: On Linux, window properties are changed asynchronously. If you move a
window in one line of your program, and read the position in the next, the value
read will still reflect the old setting. On all platforms, the NativeWindow
object dispatches the `move` event when the position changes. If you need to
take some action based on the new position of the window, always do so in a
`move` event handler. See
[Listening for window events](./listening-for-window-events.md).

## Example: Resizing and moving windows

The following example shows how to initiate resizing and moving operations on a
window:

    package
    {
    	import flash.display.Sprite;
    	import flash.events.MouseEvent;
    	import flash.display.NativeWindowResize;

    	public class NativeWindowResizeExample extends Sprite
    	{
    		public function NativeWindowResizeExample():void
    		{
    			// Fills a background area.
    			this.graphics.beginFill(0xFFFFFF);
    			this.graphics.drawRect(0, 0, 400, 300);
    			this.graphics.endFill();

    			// Creates a square area where a mouse down will start the resize.
    			var resizeHandle:Sprite =
    				createSprite(0xCCCCCC, 20, this.width - 20, this.height - 20);
    			resizeHandle.addEventListener(MouseEvent.MOUSE_DOWN, onStartResize);

    			// Creates a square area where a mouse down will start the move.
    			var moveHandle:Sprite = createSprite(0xCCCCCC, 20, this.width - 20, 0);
    			moveHandle.addEventListener(MouseEvent.MOUSE_DOWN, onStartMove);
    		}

    		public function createSprite(color:int, size:int, x:int, y:int):Sprite
    		{
    			var s:Sprite = new Sprite();
    			s.graphics.beginFill(color);
    			s.graphics.drawRect(0, 0, size, size);
    			s.graphics.endFill();
    			s.x = x;
    			s.y = y;
    			this.addChild(s);
    			return s;
    		}

    		public function onStartResize(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.startResize(NativeWindowResize.BOTTOM_RIGHT);
    		}

    		public function onStartMove(event:MouseEvent):void
    		{
    			this.stage.nativeWindow.startMove();
    		}
    	}
    }
