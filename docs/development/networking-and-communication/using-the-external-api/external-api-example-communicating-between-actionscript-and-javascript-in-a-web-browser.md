---
sidebar_position: 4
---

# External API example: Communicating between ActionScript and JavaScript in a web browser

This sample application demonstrates appropriate techniques for communicating
between ActionScript and JavaScript in a web browser, in the context of an
Instant Messaging application that allows a person to chat with him or herself
(hence the name of the application: Introvert IM). Messages are sent between an
HTML form in the web page and a SWF interface using the external API. The
techniques demonstrated by this example include the following:

- Properly initiating communication by verifying that the browser is ready to
  communicate before setting up communication

- Checking whether the container supports the external API

- Calling JavaScript functions from ActionScript, passing parameters, and
  receiving values in response

- Making ActionScript methods available to be called by JavaScript, and
  performing those calls

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Introvert IM application files can be found in the Samples/IntrovertIM_HTML
folder. The application consists of the following files:

<table>
<thead>
	<tr>
		<th><p>File</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p>IntrovertIMApp.fla</p>
		<p>or</p>
		<p>IntrovertIMApp.mxml</p></td>
		<td><p>The main application file for Flash (FLA) or Flex
		(MXML).</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/introvertIM/IMManager.as</p></td>
		<td><p>The class that establishes and manages communication between
		ActionScript and the container.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/introvertIM/IMMessageEvent.as</p></td>
		<td><p>Custom event type, dispatched by the IMManager class when a
		message is received from the container.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/introvertIM/IMStatus.as</p></td>
		<td><p>Enumeration whose values represent the different "availability"
		status values that can be selected in the application.</p></td>
	</tr>
	<tr>
		<td><p>html-flash/IntrovertIMApp.html</p>
		<p>or</p>
		<p>html-template/index.template.html</p></td>
		<td><p>The HTML page for the application for Flash
		(html-flash/IntrovertIMApp.html) or the template that is used to create
		the container HTML page for the application for Adobe Flex
		(html-template/index.template.html). This file contains all the
		JavaScript functions that make up the container part of the
		application.</p></td>
	</tr>
</tbody>
</table>

## Preparing for ActionScript-browser communication

One of the most common uses for the external API is to allow ActionScript
applications to communicate with a web browser. Using the external API,
ActionScript methods can call code written in JavaScript and vice versa. Because
of the complexity of browsers and how they render pages internally, there is no
way to guarantee that a SWF document will register its callbacks before the
first JavaScript on the HTML page runs. For that reason, before calling
functions in the SWF document from JavaScript, your SWF document should always
call the HTML page to notify it that the SWF document is ready to accept
connections.

For example, through a series of steps performed by the IMManager class, the
Introvert IM determines whether the browser is ready for communication and
prepares the SWF file for communication. The first step, determining when the
browser is ready for communication, happens in the IMManager constructor, as
follows:

    public function IMManager(initialStatus:IMStatus)
    {
    	_status = initialStatus;

    	// Check if the container is able to use the external API.
    	if (ExternalInterface.available)
    	{
    		try
    		{
    			// This calls the isContainerReady() method, which in turn calls
    			// the container to see if Flash Player has loaded and the container
    			// is ready to receive calls from the SWF.
    			var containerReady:Boolean = isContainerReady();
    			if (containerReady)
    			{
    				// If the container is ready, register the SWF's functions.
    				setupCallbacks();
    			}
    			else
    			{
    				// If the container is not ready, set up a Timer to call the
    				// container at 100ms intervals. Once the container responds that
    				// it's ready, the timer will be stopped.
    				var readyTimer:Timer = new Timer(100);
    				readyTimer.addEventListener(TimerEvent.TIMER, timerHandler);
    				readyTimer.start();
    			}
    		}
    		...
    	}
    	else
    	{
    		trace("External interface is not available for this container.");
    	}
    }

First of all, the code checks whether the external API is even available in the
current container using the `ExternalInterface.available` property. If so, it
begins the process of setting up communication. Because security exceptions and
other errors can occur when you attempt communication with an external
application, the code is wrapped in a `try` block (the corresponding `catch`
blocks were omitted from the listing for brevity).

The code next calls the `isContainerReady()` method, listed here:

    private function isContainerReady():Boolean
    {
    	var result:Boolean = ExternalInterface.call("isReady");
    	return result;
    }

The `isContainerReady()` method in turn uses `ExternalInterface.call()` method
to call the JavaScript function `isReady()`, as follows:

    <script language="JavaScript">
    	<!--
    	// ------- Private vars -------
    	var jsReady = false;
    	...
    	// ------- functions called by ActionScript -------
    	// called to check if the page has initialized and JavaScript is available
    	function isReady()
    	{
    		return jsReady;
    	}
    	...
    	// called by the onload event of the <body> tag
    	function pageInit()
    	{
    		// Record that JavaScript is ready to go.
    		jsReady = true;
    	}
    	...
    	//-->
    </script>

The `isReady()` function simply returns the value of the `jsReady` variable.
That variable is initially `false` ; once the `onload` event of the web page has
been triggered, the variable's value is changed to `true`. In other words, if
ActionScript calls the `isReady()` function before the page is loaded,
JavaScript returns `false` to `ExternalInterface.call("isReady")`, and
consequently the ActionScript `isContainerReady()` method returns `false`. Once
the page has loaded, the JavaScript `isReady()` function returns `true`, so the
ActionScript `isContainerReady()` method also returns `true`.

Back in the IMManager constructor, one of two things happens depending on the
readiness of the container. If `isContainerReady()` returns `true`, the code
simply calls the `setupCallbacks()` method, which completes the process of
setting up communication with JavaScript. On the other hand, if
`isContainerReady()` returns `false`, the process is essentially put on hold. A
Timer object is created and is told to call the `timerHandler()` method every
100 milliseconds, as follows:

    private function timerHandler(event:TimerEvent):void
    {
    	// Check if the container is now ready.
    	var isReady:Boolean = isContainerReady();
    	if (isReady)
    	{
    		// If the container has become ready, we don't need to check anymore,
    		// so stop the timer.
    		Timer(event.target).stop();
    		// Set up the ActionScript methods that will be available to be
    		// called by the container.
    		setupCallbacks();
    	}
    }

Each time the `timerHandler()` method gets called, it once again checks the
result of the `isContainerReady()` method. Once the container is initialized,
that method returns `true.` The code then stops the Timer and calls the
`setupCallbacks()` method to finish the process of setting up communication with
the browser.

## Exposing ActionScript methods to JavaScript

As the previous example showed, once the code determines that the browser is
ready, the `setupCallbacks()` method is called. This method prepares
ActionScript to receive calls from JavaScript, as shown here:

    private function setupCallbacks():void
    {
    	// Register the SWF client functions with the container
    	ExternalInterface.addCallback("newMessage", newMessage);
    	ExternalInterface.addCallback("getStatus", getStatus);
    	// Notify the container that the SWF is ready to be called.
    	ExternalInterface.call("setSWFIsReady");
    }

The `setCallBacks()` method finishes the task of preparing for communication
with the container by calling `ExternalInterface.addCallback()` to register the
two methods that will be available to be called from JavaScript. In this code,
the first parameter—the name by which the method is known to JavaScript (
`"newMessage"` and `"getStatus"`)—is the same as the method's name in
ActionScript. (In this case, there was no benefit to using different names, so
the same name was reused for simplicity.) Finally, the
`ExternalInterface.call()` method is used to call the JavaScript function
`setSWFIsReady()`, which notifies the container that the ActionScript functions
have been registered.

## Communication from ActionScript to the browser

The Introvert IM application demonstrates a range of examples of calling
JavaScript functions in the container page. In the simplest case (an example
from the `setupCallbacks()` method), the JavaScript function `setSWFIsReady()`
is called without passing any parameters or receiving a value in return:

    ExternalInterface.call("setSWFIsReady");

In another example from the `isContainerReady()` method, ActionScript calls the
`isReady()` function and receives a Boolean value in response:

    var result:Boolean = ExternalInterface.call("isReady");

You can also pass parameters to JavaScript functions using the external API. For
instance, consider the IMManager class's `sendMessage()` method, which is called
when the user is sending a new message to his or her "conversation partner":

    public function sendMessage(message:String):void
    {
    	ExternalInterface.call("newMessage", message);
    }

Once again, `ExternalInterface.call()` is used to call the designated JavaScript
function, notifying the browser of the new message. In addition, the message
itself is passed as an additional parameter to `ExternalInterface.call()`, and
consequently it is passed as a parameter to the JavaScript function
`newMessage()`.

## Calling ActionScript code from JavaScript

Communication is supposed to be a two-way street, and the Introvert IM
application is no exception. Not only does the Flash Player IM client call
JavaScript to send messages, but the HTML form calls JavaScript code to send
messages to and ask for information from the SWF file as well. For example, when
the SWF file notifies the container that it has finished establishing contact
and it's ready to communicate, the first thing the browser does is call the
IMManager class's `getStatus()` method to retrieve the initial user availability
status from the SWF IM client. This is done in the web page, in the
`updateStatus()` function, as follows:

    <script language="JavaScript">
    	...
    	function updateStatus()
    	{
    		if (swfReady)
    		{
    			var currentStatus = getSWF("IntrovertIMApp").getStatus();
    			document.forms["imForm"].status.value = currentStatus;
    		}
    	}
    	...
    </script>

The code checks the value of the `swfReady` variable, which tracks whether the
SWF file has notified the browser that it has registered its methods with the
ExternalInterface class. If the SWF file is ready to receive communication, the
next line ( `var currentStatus =`...) actually calls the `getStatus()` method in
the IMManager class. Three things happen in this line of code:

- The `getSWF()` JavaScript function is called, returning a reference to the
  JavaScript object representing the SWF file. The parameter passed to
  `getSWF()` determines which browser object is returned in case there is more
  than one SWF file in an HTML page. The value passed to that parameter must
  match the `id` attribute of the `object` tag and `name` attribute of the
  `embed` tag used to include the SWF file.

- Using the reference to the SWF file, the `getStatus()` method is called as
  though it's a method of the SWF object. In this case the function name "
  `getStatus` " is used because that's the name under which the ActionScript
  function is registered using `ExternalInterface.addCallback()`.

- The `getStatus()` ActionScript method returns a value, and that value is
  assigned to the `currentStatus` variable, which is then assigned as the
  content (the `value` property) of the `status` text field.

Note: If you're following along in the code, you've probably noticed that in the
source code for the `updateStatus()` function, the line of code that calls the
`getSWF()` function, is actually written as follows: var currentStatus =
getSWF("\${application}").getStatus(); The `${application}` text is a
placeholder in the HTML page template; when Adobe Flash Builder generates the
actual HTML page for the application, this placeholder text is replaced by the
same text that is used as the `object` tag's `id` attribute and the `embed`
tag's `name` attribute ( `IntrovertIMApp` in the example). That is the value
that is expected by the `getSWF()` function.

The `sendMessage()` JavaScript function demonstrates passing a parameter to an
ActionScript function. ( `sendMessage()` is thefunction that is called when the
user presses the Send button on the HTML page.)

    <script language="JavaScript">
    	...
    	function sendMessage(message)
    	{
    		if (swfReady)
    		{
    			...
    			getSWF("IntrovertIMApp").newMessage(message);
    		}
    	}
    	...
    </script>

The `newMessage()` ActionScript method expects one parameter, so the JavaScript
`message` variable gets passed to ActionScript by using it as a parameter in the
`newMessage()` method call in the JavaScript code.

## Detecting the browser type

Because of differences in how browsers access content, it's important to always
use JavaScript to detect which browser the user is running and to access the
movie according to the browser-specific syntax, using the window or document
object, as shown in the `getSWF()` JavaScript function in this example:

    <script language="JavaScript">
    	...
    	function getSWF(movieName)
    	{
    		if (navigator.appName.indexOf("Microsoft") != -1)
    		{
    			return window[movieName];
    		}
    		else
    		{
    			return document[movieName];
    		}
    	}
    	...
    </script>

If your script does not detect the user's browser type, the user might see
unexpected behavior when playing SWF files in an HTML container.
