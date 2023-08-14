---
sidebar_position: 4
---

# Handling HTML-related events in AIR

An event-handling system allows programmers to respond to user input and system
events in a convenient way. The Adobe® AIR® event model is not only convenient,
but also standards-compliant. Based on the Document Object Model (DOM) Level 3
Events Specification, an industry-standard event-handling architecture, the
event model provides a powerful, yet intuitive, event-handling tool for
programmers.

## HTMLLoader events

An HTMLLoader object dispatches the following Adobe® ActionScript® 3.0 events:

<table>
<thead>
    <tr>
        <th><p>Event</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p><samp>htmlDOMInitialize</samp></p></td>
        <td><p>Dispatched when the HTML document is created, but before any
        scripts are parsed or DOM nodes are added to the page.</p></td>
    </tr>
    <tr>
        <td><p><samp>complete</samp></p></td>
        <td><p>Dispatched when the HTML DOM has been created in response to a
        load operation, immediately after the <samp>onload</samp> event in the
        HTML page.</p></td>
    </tr>
    <tr>
        <td><p><samp>htmlBoundsChanged</samp></p></td>
        <td><p>Dispatched when one or both of the <samp>contentWidth</samp> and
        <samp>contentHeight</samp> properties have changed.</p></td>
    </tr>
    <tr>
        <td><p><samp>locationChange</samp></p></td>
        <td><p>Dispatched when the location property of the HTMLLoader has
        changed.</p></td>
    </tr>
    <tr>
        <td><p><samp>locationChanging</samp></p></td>
        <td><p>Dispatched before the location of the HTMLLoader changes because
        of user navigation, a JavaScript call, or a redirect. The
        <samp>locationChanging</samp> event is not dispatched when you call the
        <samp>load()</samp>, <samp>loadString()</samp>, <samp>reload()</samp>,
        <samp>historyGo()</samp>, <samp>historyForward()</samp>, or
        <samp>historyBack()</samp> methods.</p>
        <p>Calling the <samp>preventDefault()</samp> method of the dispatched
        event object cancels navigation.</p>
        <p>If a link is opened in the system browser, a locationChanging event
        is not dispatched since the HTMLLoader does not change
        location.</p></td>
    </tr>
    <tr>
        <td><p><samp>scroll</samp></p></td>
        <td><p>Dispatched anytime the HTML engine changes the scroll position.
        Scroll events can be because of navigation to anchor links (
        <samp>#</samp> links) in the page or because of calls to the
        <samp>window.scrollTo()</samp> method. Entering text in a text input or
        text area can also cause a scroll event.</p></td>
    </tr>
    <tr>
        <td><p><samp>uncaughtScriptException</samp></p></td>
        <td><p>Dispatched when a JavaScript exception occurs in the HTMLLoader
        and the exception is not caught in JavaScript code.</p></td>
    </tr>
</tbody>
</table>

You can also register an ActionScript function for a JavaScript event (such as
`onClick`). For details, see
[Handling DOM events with ActionScript](./handling-html-related-events-in-air.md#handling-dom-events-with-actionscript).

## Handling DOM events with ActionScript

You can register ActionScript functions to respond to JavaScript events. For
example, consider the following HTML content:

    <html>
    <body>
    	<a href="#" id="testLink">Click me.</a>
    </html>

You can register an ActionScript function as a handler for any event in the
page. For example, the following code adds the `clickHandler()` function as the
listener for the `onclick` event of the `testLink` element in the HTML page:

    var html:HTMLLoader = new HTMLLoader( );
    var urlReq:URLRequest = new URLRequest("test.html");
    html.load(urlReq);
    html.addEventListener(Event.COMPLETE, completeHandler);

    function completeHandler(event:Event):void {
    	html.window.document.getElementById("testLink").onclick = clickHandler;
    }

    function clickHandler( event:Object ):void {
    	trace("Event of type: " + event.type );
    }

The event object dispatched is not of type flash.events.Event or one of the
Event subclasses. Use the Object class to declare a type for the event handler
function argument.

You can also use the `addEventListener()` method to register for these events.
For example, you could replace the `completeHandler()` method in the previous
example with the following code:

    function completeHandler(event:Event):void {
    	var testLink:Object = html.window.document.getElementById("testLink");
    	testLink.addEventListener("click", clickHandler);
    }

When a listener refers to a specific DOM element, it is good practice to wait
for the parent HTMLLoader to dispatch the `complete` event before adding the
event listeners. HTML pages often load multiple files and the HTML DOM is not
fully built until all the files are loaded and parsed. The HTMLLoader dispatches
the `complete` event when all elements have been created.

## Responding to uncaught JavaScript exceptions

Consider the following HTML:

    <html>
    <head>
    	<script>
    		function throwError() {
    			var x = 400 * melbaToast;
    		}
    	</script>
    </head>
    <body>
    	<a href="#" onclick="throwError()">Click me.</a>
    </html>

It contains a JavaScript function, `throwError()`, that references an unknown
variable, `melbaToast`:

    var x = 400 * melbaToast;

When a JavaScript operation encounters an illegal operation that is not caught
in the JavaScript code with a `try` / `catch` structure, the HTMLLoader object
containing the page dispatches an HTMLUncaughtScriptExceptionEvent event. You
can register a handler for this event, as in the following code:

    var html:HTMLLoader = new HTMLLoader();
    var urlReq:URLRequest = new URLRequest("test.html");
    html.load(urlReq);
    html.width = container.width;
    html.height = container.height;
    container.addChild(html);
    html.addEventListener(HTMLUncaughtScriptExceptionEvent.UNCAUGHT_SCRIPT_EXCEPTION,
                           htmlErrorHandler);
    function htmlErrorHandler(event:HTMLUncaughtJavaScriptExceptionEvent):void
    {
    	event.preventDefault();
    	trace("exceptionValue:", event.exceptionValue)
    	for (var i:int = 0; i < event.stackTrace.length; i++)
    	{
    		trace("sourceURL:", event.stackTrace[i].sourceURL);
    		trace("line:", event.stackTrace[i].line);
    		trace("function:", event.stackTrace[i].functionName);
    	}
    }

Within JavaScript, you can handle the same event using the window.htmlLoader
property:

    <html>
    <head>
    	<script language="javascript" type="text/javascript" src="AIRAliases.js"></script>
    	<script>
    		function throwError() {
    			var x = 400 * melbaToast;
    		}

    		function htmlErrorHandler(event) {
    			event.preventDefault();
    			var message = "exceptionValue:" + event.exceptionValue + "\n";
    			for (var i = 0; i < event.stackTrace.length; i++){
    				message += "sourceURL:" + event.stackTrace[i].sourceURL +"\n";
    				message += "line:" + event.stackTrace[i].line +"\n";
    				message += "function:" + event.stackTrace[i].functionName + "\n";
    			}
    			alert(message);
    		}

    		window.htmlLoader.addEventListener("uncaughtScriptException", htmlErrorHandler);
    	</script>
    </head>
    <body>
    	<a href="#" onclick="throwError()">Click me.</a>
    </html>

The `htmlErrorHandler()` event handler cancels the default behavior of the event
(which is to send the JavaScript error message to the AIR trace output), and
generates its own output message. It outputs the value of the `exceptionValue`
of the HTMLUncaughtScriptExceptionEvent object. It outputs the properties of
each object in the `stackTrace` array:

    exceptionValue: ReferenceError: Can't find variable: melbaToast
    sourceURL: app:/test.html
    line: 5
    function: throwError
    sourceURL: app:/test.html
    line: 10
    function: onclick

## Handling runtime events with JavaScript

The runtime classes support adding event handlers with the `addEventListener()`
method. To add a handler function for an event, call the `addEventListener()`
method of the object that dispatches the event, providing the event type and the
handling function. For example, to listen for the `closing` event dispatched
when a user clicks the window close button on the title bar, use the following
statement:

    window.nativeWindow.addEventListener(air.NativeWindow.CLOSING, handleWindowClosing);

### Creating an event handler function

The following code creates a simple HTML file that displays information about
the position of the main window. A handler function named `moveHandler()`,
listens for a move event (defined by the NativeWindowBoundsEvent class) of the
main window.

    <html>
    <script src="AIRAliases.js" />
    <script>
        function init() {
            writeValues();
            window.nativeWindow.addEventListener(air.NativeWindowBoundsEvent.MOVE,
                                                     moveHandler);
        }
        function writeValues() {
            document.getElementById("xText").value = window.nativeWindow.x;
            document.getElementById("yText").value = window.nativeWindow.y;
        }
        function moveHandler(event) {
            air.trace(event.type); // move
            writeValues();
        }
    </script>
    <body onload="init()" />
        <table>
            <tr>
                <td>Window X:</td>
                <td><textarea id="xText"></textarea></td>
            </tr>
            <tr>
                <td>Window Y:</td>
                <td><textarea id="yText"></textarea></td>
            </tr>
        </table>
    </body>
    </html>

When a user moves the window, the textarea elements display the updated X and Y
positions of the window:

Notice that the event object is passed as an argument to the `moveHandler()`
method. The event parameter allows your handler function to examine the event
object. In this example, you use the event object's `type` property to report
that the event is a `move` event.

#### Removing event listeners

You can use the `removeEventListener()` method to remove an event listener that
you no longer need. It is a good idea to remove any listeners that will no
longer be used. Required parameters include the `eventName` and `listener`
parameters, which are the same as the required parameters for the
`addEventListener()` method.

#### Removing event listeners in HTML pages that navigate

When HTML content navigates, or when HTML content is discarded because a window
that contains it is closed, the event listeners that reference objects on the
unloaded page are not automatically removed. When an object dispatches an event
to a handler that has already been unloaded, you see the following error
message: "The application attempted to reference a JavaScript object in an HTML
page that is no longer loaded."

To avoid this error, remove JavaScript event listeners in an HTML page before it
goes away. In the case of page navigation (within an HTMLLoader object), remove
the event listener during the `unload` event of the `window` object.

For example, the following JavaScript code removes an event listener for an
`uncaughtScriptException` event:

    window.onunload = cleanup;
    window.htmlLoader.addEventListener('uncaughtScriptException', uncaughtScriptException);
    function cleanup()
    {
    	window.htmlLoader.removeEventListener('uncaughtScriptException',
    							uncaughtScriptExceptionHandler);
    }

To prevent the error from occurring when closing windows that contain HTML
content, call a cleanup function in response to the `closing` event of the
NativeWindow object ( `window.nativeWindow`). For example, the following
JavaScript code removes an event listener for an `uncaughtScriptException`
event:

    window.nativeWindow.addEventListener(air.Event.CLOSING, cleanup);
    function cleanup()
    {
    	window.htmlLoader.removeEventListener('uncaughtScriptException',
    							uncaughtScriptExceptionHandler);
    }

You can also prevent this error from occurring by removing an event listener as
soon as it runs (if the event only needs to be handled once). For example, the
following JavaScript code creates an html window by calling the
`createRootWindow()` method of the HTMLLoader class and adds an event listener
for the `complete` event. When the `complete` event handler is called, it
removes its own event listener using the `removeEventListener()` function:

    var html = runtime.flash.html.HTMLLoader.createRootWindow(true);
    html.addEventListener('complete', htmlCompleteListener);
    function htmlCompleteListener()
    {
    	html.removeEventListener(complete, arguments.callee);
    	// handler code..
    }
    html.load(new runtime.flash.net.URLRequest("second.html"));

Removing unneeded event listeners also allows the system garbage collector to
reclaim any memory associated with those listeners.

#### Checking for existing event listeners

The `hasEventListener()` method lets you check for the existence of an event
listener on an object.
