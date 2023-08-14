---
sidebar_position: 2
---

# AIR application invocation and termination

This section discusses the ways in which an installed Adobe® AIR® application
can be invoked, as well as options and considerations for closing a running
application.

Note: The NativeApplication, InvokeEvent, and BrowserInvokeEvent objects are
only available to SWF content running in the AIR application sandbox. SWF
content running in the Flash Player runtime, within the browser or the
standalone player (projector), or in an AIR application outside the application
sandbox, cannot access these classes.

For a quick explanation and code examples of invoking and terminating AIR
applications, see the following quick start articles on the Adobe Developer
Connection:

- [Startup Options](https://web.archive.org/web/20150921204315/http://www.adobe.com/devnet/air/flex/quickstart/articles/startup_options.html)

<!-- -->

## Application invocation

An AIR application is invoked when the user (or the operating system):

- Launches the application from the desktop shell.

- Uses the application as a command on a command line shell.

- Opens a type of file for which the application is the default opening
  application.

- (Mac OS X) clicks the application icon in the dock taskbar (whether or not the
  application is currently running).

- Chooses to launch the application from the installer (either at the end of a
  new installation process, or after double-clicking the AIR file for an already
  installed application).

- Begins an update of an AIR application when the installed version has signaled
  that it is handling application updates itself (by including a
  `<customUpdateUI>true</customUpdateUI>` declaration in the application
  descriptor file).

- (iOS) Receives a notification from the Apple Push Notification service (APNs).

- Invokes the application via a URL.

- Visits a web page hosting a Flash badge or application that calls
  `com.adobe.air.AIR launchApplication()` method specifying the identifying
  information for the AIR application. (The application descriptor must also
  include a `<allowBrowserInvocation>true</allowBrowserInvocation>` declaration
  for browser invocation to succeed.)

Whenever an AIR application is invoked, AIR dispatches an InvokeEvent object of
type `invoke` through the singleton NativeApplication object. To allow an
application time to initialize itself and register an event listener, `invoke`
events are queued instead of discarded. As soon as a listener is registered, all
the queued events are delivered.

Note: When an application is invoked using the browser invocation feature, the
NativeApplication object only dispatches an `invoke` event if the application is
not already running.

To receive `invoke` events, call the `addEventListener()` method of the
NativeApplication object ( `NativeApplication.nativeApplication)`. When an event
listener registers for an `invoke` event, it also receives all `invoke` events
that occurred before the registration. Queued `invoke` events are dispatched one
at a time on a short interval after the call to `addEventListener()` returns. If
a new `invoke` event occurs during this process, it may be dispatched before one
or more of the queued events. This event queuing allows you to handle any
`invoke` events that have occurred before your initialization code executes.
Keep in mind that if you add an event listener later in execution (after
application initialization), it will still receive all `invoke` events that have
occurred since the application started.

Only one instance of an AIR application is started. When an already running
application is invoked again, AIR dispatches a new `invoke` event to the running
instance. It is the responsibility of an AIR application to respond to an
`invoke` event and take the appropriate action (such as opening a new document
window).

An `InvokeEvent` object contains any arguments passed to the application, as
well as the directory from which the application has been invoked. If the
application was invoked because of a file-type association, then the full path
to the file is included in the command line arguments. Likewise, if the
application was invoked because of an application update, the full path to the
update AIR file is provided.

When multiple files are opened in one operation a single InvokeEvent object is
dispatched on Mac OS X. Each file is included in the `arguments` array. On
Windows and Linux, a separate InvokeEvent object is dispatched for each file.

Your application can handle `invoke` events by registering a listener with its
NativeApplication object:

    NativeApplication.nativeApplication.addEventListener(InvokeEvent.INVOKE, onInvokeEvent);

And defining an event listener:

    var arguments:Array;
    var currentDir:File;
    public function onInvokeEvent(invocation:InvokeEvent):void {
    	arguments = invocation.arguments;
    	currentDir = invocation.currentDirectory;
    }

## Capturing command line arguments

The command line arguments associated with the invocation of an AIR application
are delivered in the InvokeEvent object dispatched by the NativeApplication
object. The InvokeEvent `arguments` property contains an array of the arguments
passed by the operating system when an AIR application is invoked. If the
arguments contain relative file paths, you can typically resolve the paths using
the `currentDirectory` property.

The arguments passed to an AIR program are treated as white-space delimited
strings, unless enclosed in double quotes:

|                   |                  |
| ----------------- | ---------------- |
| Arguments         | Array            |
| tick tock         | {tick,tock}      |
| tick "tick tock"  | {tick,tick tock} |
| "tick" "tock"     | {tick,tock}      |
| \\tick\\ \\tock\\ | {"tick","tock"}  |

The `currentDirectory` property of an InvokeEvent object contains a File object
representing the directory from which the application was launched.

When an application is invoked because a file of a type registered by the
application is opened, the native path to the file is included in the command
line arguments as a string. (Your application is responsible for opening or
performing the intended operation on the file.) Likewise, when an application is
programmed to update itself (rather than relying on the standard AIR update user
interface), the native path to the AIR file is included when a user
double-clicks an AIR file containing an application with a matching application
ID.

You can access the file using the `resolve()` method of the `currentDirectory`
File object:

    if((invokeEvent.currentDirectory != null)&&(invokeEvent.arguments.length > 0)){
    	dir = invokeEvent.currentDirectory;
    	fileToOpen = dir.resolvePath(invokeEvent.arguments[0]);
    }

You should also validate that an argument is indeed a path to a file.

### Example: Invocation event log

The following example demonstrates how to register listeners for and handle the
`invoke` event. The example logs all the invocation events received and displays
the current directory and command line arguments.

#### ActionScript example

    package
    {
    	import flash.display.Sprite;
    	import flash.events.InvokeEvent;
    	import flash.desktop.NativeApplication;
    	import flash.text.TextField;

    	public class InvokeEventLogExample extends Sprite
    	{
    		public var log:TextField;

    		public function InvokeEventLogExample()
    		{
    			log = new TextField();
    			log.x = 15;
    			log.y = 15;
    			log.width = 520;
    			log.height = 370;
    			log.background = true;

    			addChild(log);

    			NativeApplication.nativeApplication.addEventListener(InvokeEvent.INVOKE, onInvoke);
    		}

    		public function onInvoke(invokeEvent:InvokeEvent):void
    		{
    			var now:String = new Date().toTimeString();
    			logEvent("Invoke event received: " + now);

    			if (invokeEvent.currentDirectory != null)
    			{
    				logEvent("Current directory=" + invokeEvent.currentDirectory.nativePath);
    			}
    			else
    			{
    				logEvent("--no directory information available--");
    			}

    			if (invokeEvent.arguments.length > 0)
    			{
    				logEvent("Arguments: " + invokeEvent.arguments.toString());
    			}
    			else
    			{
    				logEvent("--no arguments--");
    			}
    		}

    		public function logEvent(entry:String):void
    		{
    			log.appendText(entry + "\n");
    			trace(entry);
    		}
    	}
    }

#### Flex example

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" layout="vertical"
    	invoke="onInvoke(event)" title="Invocation Event Log">
    	<mx:Script>
    	<![CDATA[
    		import flash.events.InvokeEvent;
    		import flash.desktop.NativeApplication;

    		public function onInvoke(invokeEvent:InvokeEvent):void {
    			var now:String = new Date().toTimeString();
    			logEvent("Invoke event received: " + now);

    			if (invokeEvent.currentDirectory != null){
    				logEvent("Current directory=" + invokeEvent.currentDirectory.nativePath);
    			} else {
    				logEvent("--no directory information available--");
    			}

    			if (invokeEvent.arguments.length > 0){
    				logEvent("Arguments: " + invokeEvent.arguments.toString());
    			} else {
    				logEvent("--no arguments--");
    			}
    		}

    		public function logEvent(entry:String):void {
    			log.text += entry + "\n";
    			trace(entry);
    		}
    	]]>
    	</mx:Script>
    	<mx:TextArea id="log" width="100%" height="100%" editable="false"
    		valueCommit="log.verticalScrollPosition=log.textHeight;"/>
    </mx:WindowedApplication>

## Invoking an AIR application on user login

An AIR application can be set to launch automatically when the current user logs
in by setting the NativeApplication `startAtLogin` property to `true`. Once set,
the application automatically starts whenever the user logs in. It continues to
launch at login until the setting is changed to `false`, the user manually
changes the setting through the operating system, or the application is
uninstalled. Launching at login is a run-time setting. The setting only applies
to the current user. The application must be installed to successfully set the
`startAtLogin` property to `true`. An error is thrown if the property is set
when an application is not installed (such as when it is launched with ADL).

Note: The application does not launch when the computer system starts. It
launches when the user logs in.

To determine whether an application has launched automatically or as a result of
a user action, you can examine the `reason` property of the InvokeEvent object.
If the property is equal to `InvokeEventReason.LOGIN`, then the application
started automatically. For other invocation paths, the `reason` property is set
as follows:

- `InvokeEventReason.NOTIFICATION` (iOS only) - The application was invoked
  through APNs. For more information on APNs, see
  [Use push notifications](https://web.archive.org/web/20220814032009/https://help.adobe.com/en_US/air/build/WSd6d4f896b3a8801b7be2f55d138e29d5e40-8000.html).

- `InvokeEventReason.OPEN_URL` - The application was invoked by another
  application or by the system.

- `InvokeEventReason.Standard` - All other cases.

To access the `reason` property, your application must target AIR 1.5.1 or
higher (by setting the correct namespace value in the application descriptor
file).

The following, simplified application uses the InvokeEvent reason property to
decide how to behave when an invoke event occurs. If the reason property is
"login", then the application remains in the background. Otherwise, it makes the
main application visible. An application using this pattern typically starts at
login so that it can carry out background processing or event monitoring and
opens a window in response to a user-triggered invoke event.

    package
    {
    	import flash.desktop.InvokeEventReason;
    	import flash.desktop.NativeApplication;
    	import flash.display.Sprite;
    	import flash.events.InvokeEvent;

    	public class StartAtLogin extends Sprite
    	{
    		public function StartAtLogin()
    		{
    			try
    			{
    				NativeApplication.nativeApplication.startAtLogin = true;
    			}
    			catch ( e:Error )
    			{
    				trace( "Cannot set startAtLogin:" + e.message );
    			}

    			NativeApplication.nativeApplication.addEventListener( InvokeEvent.INVOKE, onInvoke );
    		}

    		private function onInvoke( event:InvokeEvent ):void
    		{
    			if( event.reason == InvokeEventReason.LOGIN )
    			{
    				//do background processing...
    				trace( "Running in background..." );
    			}
    			else
    			{
    				this.stage.nativeWindow.activate();
    			}
    		}
    	}
    }

Note: To see the difference in behavior, package and install the application.
The `startAtLogin` property can only be set for installed applications.

## Invoking an AIR application from the browser

Using the browser invocation feature, a web site can launch an installed AIR
application to be launched from the browser. Browser invocation is only
permitted if the application descriptor file sets `allowBrowserInvocation` to
`true`:

    <allowBrowserInvocation>true</allowBrowserInvocation>

When the application is invoked via the browser, the application's
NativeApplication object dispatches a BrowserInvokeEvent object.

To receive BrowserInvokeEvent events, call the `addEventListener()` method of
the NativeApplication object ( `NativeApplication.nativeApplication`) in the AIR
application. When an event listener registers for a BrowserInvokeEvent event, it
also receives all BrowserInvokeEvent events that occurred before the
registration. These events are dispatched after the call to `addEventListener()`
returns, but not necessarily before other BrowserInvokeEvent events that might
be received after registration. This allows you to handle BrowserInvokeEvent
events that have occurred before your initialization code executes (such as when
the application was initially invoked from the browser). Keep in mind that if
you add an event listener later in execution (after application initialization)
it still receives all BrowserInvokeEvent events that have occurred since the
application started.

The BrowserInvokeEvent object includes the following properties:

<table>
<thead>
	<tr>
		<th><p>Property</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p>arguments</p></td>
		<td><p>An array of arguments (strings) to pass to the
	application.</p></td>
	</tr>
	<tr>
		<td><p>isHTTPS</p></td>
		<td><p>Whether the content in the browser uses the https URL scheme (<samp>true</samp>) or not ( <samp>false</samp>).</p></td>
	</tr>
	<tr>
		<td><p>isUserEvent</p></td>
		<td><p>Whether the browser invocation resulted in a user event (such as a mouse click). In AIR 1.0, this is always set to  <samp>true</samp>; AIR requires a user event to the browser invocation feature.</p></td>
	</tr>
	<tr>
		<td><p>sandboxType</p></td>
		<td>
			<p>The sandbox type for the content in the browser. Valid values are defined the same as those that can be used in the <samp>Security.sandboxType</samp> property, and can be one of the following:</p>
			<ul class="incremental">
				<li><p><samp>Security.APPLICATION</samp> — The content is in the application security sandbox.</p></li>
				<li><p><samp>Security.LOCAL_TRUSTED</samp> — The content is in the local-with-filesystem security sandbox.</p></li>
				<li><p><samp>Security.LOCAL_WITH_FILE</samp> — The content is in the local-with-filesystem security sandbox.</p></li>
				<li><p><samp>Security.LOCAL_WITH_NETWORK</samp> — The content is in the local-with-networking security sandbox.</p></li>
				<li><p><samp>Security.REMOTE</samp> — The content is in a remote (network) domain.</p></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><p>securityDomain</p></td>
		<td><p>The security domain for the content in the browser, such as <samp>"www.adobe.com"</samp> or <samp>"www.example.org"</samp>. This property is only set for content in the remote security sandbox (for content from a network domain). It is not set for content in a local or application security sandbox.</p></td>
	</tr>
</tbody>
</table>

If you use the browser invocation feature, be sure to consider security
implications. When a web site launches an AIR application, it can send data via
the `arguments` property of the BrowserInvokeEvent object. Be careful using this
data in any sensitive operations, such as file or code loading APIs. The level
of risk depends on what the application is doing with the data. If you expect
only a specific web site to invoke the application, the application should check
the `securityDomain` property of the BrowserInvokeEvent object. You can also
require the web site invoking the application to use HTTPs, which you can verify
by checking the `isHTTPS` property of the BrowserInvokeEvent object.

The application should validate the data passed in. For example, if an
application expects to be passed URLs to a specific domain, it should validate
that the URLs really do point to that domain. This can prevent an attacker from
tricking the application into sending it sensitive data.

No application should use BrowserInvokeEvent arguments that might point to local
resources. For example, an application should not create File objects based on a
path passed from the browser. If remote paths are expected to be passed from the
browser, the application should ensure that the paths do not use the `file://`
protocol instead of a remote protocol.

## Application termination

The quickest way to terminate an application is to call the NativeApplication
exit() method. This works fine when your application has no data to save or
external resources to clean up. Calling `exit()` closes all windows and then
terminates the application. However, to allow windows or other components of
your application to interrupt the termination process, perhaps to save vital
data, dispatch the proper warning events before calling `exit()`.

Another consideration in gracefully shutting down an application is providing a
single execution path, no matter how the shut-down process starts. The user (or
operating system) can trigger application termination in the following ways:

- By closing the last application window when
  `NativeApplication.nativeApplication.autoExit` is `true`.

- By selecting the application exit command from the operating system; for
  example, when the user chooses the exit application command from the default
  menu. (This only happens on Mac OS; Windows and Linux do not provide an
  application exit command through system chrome.)

- By shutting down the computer.

When an exit command is mediated through the operating system by one of these
routes, the NativeApplication dispatches an `exiting` event. If no listeners
cancel the `exiting` event, any open windows are closed. Each window dispatches
a `closing` and then a `close` event. If any of the windows cancel the `closing`
event, the shut-down process stops.

If the order of window closure is an issue for your application, listen for the
`exiting` event from the NativeApplication and close the windows in the proper
order yourself. You might need to do this, for example, if you have a document
window with tool palettes. It could be inconvenient, or worse, if the system
closed the palettes, but the user decided to cancel the exit command to save
some data. On Windows, the only time you will get the `exiting` event is after
closing the last window (when the `autoExit` property of the NativeApplication
object is set to `true`).

To provide consistent behavior on all platforms, whether the exit sequence is
initiated via operating system chrome, menu commands, or application logic,
observe the following good practices for exiting the application:

1.  Always dispatch an `exiting` event through the NativeApplication object
    before calling `exit()` in application code and check that another component
    of your application doesn't cancel the event.

        public function applicationExit():void {
        	var exitingEvent:Event = new Event(Event.EXITING, false, true);
        	NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
        	if (!exitingEvent.isDefaultPrevented()) {
        		NativeApplication.nativeApplication.exit();
        	}
        }

2.  Listen for the application `exiting` event from the
    `NativeApplication.nativeApplication` object and, in the handler, close any
    windows (dispatching a `closing` event first). Perform any needed clean-up
    tasks, such as saving application data or deleting temporary files, after
    all windows have been closed. Only use synchronous methods during cleanup to
    ensure that they finish before the application quits.

    If the order in which your windows are closed doesn't matter, then you can
    loop through the `NativeApplication.nativeApplication.openedWindows` array
    and close each window in turn. If order _does_ matter, provide a means of
    closing the windows in the correct sequence.

        private function onExiting(exitingEvent:Event):void {
        	var winClosingEvent:Event;
        	for each (var win:NativeWindow in NativeApplication.nativeApplication.openedWindows) {
        		winClosingEvent = new Event(Event.CLOSING,false,true);
        		win.dispatchEvent(winClosingEvent);
        		if (!winClosingEvent.isDefaultPrevented()) {
        			win.close();
        		} else {
        			exitingEvent.preventDefault();
        		}
        	}

        	if (!exitingEvent.isDefaultPrevented()) {
        		//perform cleanup
        	}
        }

3.  Windows should always handle their own clean up by listening for their own
    `closing` events.

4.  Only use one `exiting` listener in your application since handlers called
    earlier cannot know whether subsequent handlers will cancel the `exiting`
    event (and it would be unwise to rely on the order of execution).

More Help topics

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.NativeApplication](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeApplication.html)

![](../img/flashplatformLinkIndicator.png)
[flash.events.InvokeEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/InvokeEvent.html)

![](../img/flashplatformLinkIndicator.png)
[flash.events.BrowserInvokeEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/BrowserInvokeEvent.html)

![](../img/airLinkIndicator.png)
[Launching an installed AIR application from the browser](https://web.archive.org/web/20221230223123/https://help.adobe.com/en_US/air/build/WSfffb011ac560372f-1c6efe05128cca667e7-8000.html#WS5b3ccc516d4fbf351e63e3d118666ade46-7cd2)

![](../img/airLinkIndicator.png)
[Setting AIR application properties](https://web.archive.org/web/20221205160703/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff1.html)

![](../img/airLinkIndicator.png)
[Presenting a custom application update user interface](https://web.archive.org/web/20220814030226/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ccd.html)
