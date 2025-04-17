# JavaScript in AIR

AIR makes several changes to the typical behavior of common JavaScript objects.
Many of these changes are made to make it easier to write secure applications in
AIR. At the same time, these differences in behavior mean that some common
JavaScript coding patterns, and existing web applications using those patterns,
might not always execute as expected in AIR. For information on correcting these
types of issues, see
[Avoiding security-related JavaScript errors](../programming-html-and-javascript-in-air/avoiding-security-related-javascript-errors.md).

## HTML Sandboxes

AIR places content into isolated sandboxes according to the origin of the
content. The sandbox rules are consistent with the same-origin policy
implemented by most web browsers, as well as the rules for sandboxes implemented
by the Adobe Flash Player. In addition, AIR provides a new _application_ sandbox
type to contain and protect application content. See
[Security sandboxes](../../security/security-sandboxes.md) for more information
on the types of sandboxes you may encounter when developing AIR applications.

Access to the run-time environment and AIR APIs are only available to HTML and
JavaScript running within the application sandbox. At the same time, however,
dynamic evaluation and execution of JavaScript, in its various forms, is largely
restricted within the application sandbox for security reasons. These
restrictions are in place whether or not your application actually loads
information directly from a server. (Even file content, pasted strings, and
direct user input may be untrustworthy.)

The origin of the content in a page determines the sandbox to which it is
consigned. Only content loaded from the application directory (the installation
directory referenced by the `app:` URL scheme) is placed in the application
sandbox. Content loaded from the file system is placed in the _local-with-file
system_ or the _local-trusted_ sandbox, which allows access and interaction with
content on the local file system, but not remote content. Content loaded from
the network is placed in a remote sandbox corresponding to its domain of origin.

To allow an application page to interact freely with content in a remote
sandbox, the page can be mapped to the same domain as the remote content. For
example, if you write an application that displays map data from an Internet
service, the page of your application that loads and displays content from the
service could be mapped to the service domain. The attributes for mapping pages
into a remote sandbox and domain are new attributes added to the frame and
iframe HTML elements.

To allow content in a non-application sandbox to safely use AIR features, you
can set up a parent sandbox bridge. To allow application content to safely call
methods and access properties of content in other sandboxes, you can set up a
child sandbox bridge. Safety here means that remote content cannot accidentally
get references to objects, properties, or methods that are not explicitly
exposed. Only simple data types, functions, and anonymous objects can be passed
across the bridge. However, you must still avoid explicitly exposing potentially
dangerous functions. If, for example, you exposed an interface that allowed
remote content to read and write files anywhere on a user's system, then you
might be giving remote content the means to do considerable harm to your users.

## JavaScript eval() function

Use of the `eval()` function is restricted within the application sandbox once a
page has finished loading. Some uses are permitted so that JSON-formatted data
can be safely parsed, but any evaluation that results in executable statements
results in an error.
[Code restrictions for content in different sandboxes](../../security/air-security/html-security-in-adobe-air.md#code-restrictions-for-content-in-different-sandboxes)
describes the allowed uses of the `eval()` function.

## Function constructors

In the application sandbox, function constructors can be used before a page has
finished loading. After all page `load` event handlers have finished, new
functions cannot be created.

## Loading external scripts

HTML pages in the application sandbox cannot use the `script` tag to load
JavaScript files from outside of the application directory. For a page in your
application to load a script from outside the application directory, the page
must be mapped to a non-application sandbox.

## The XMLHttpRequest object

AIR provides an XMLHttpRequest (XHR) object that applications can use to make
data requests. The following example illustrates a simple data request:

```
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http:/www.example.com/file.data", true);
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4) {
		//do something with data...
	}
}
xmlhttp.send(null);
```

In contrast to a browser, AIR allows content running in the application sandbox
to request data from any domain. The result of an XHR that contains a JSON
string can be evaluated into data objects unless the result also contains
executable code. If executable statements are present in the XHR result, an
error is thrown and the evaluation attempt fails.

To prevent accidental injection of code from remote sources, synchronous XHRs
return an empty result if made before a page has finished loading. Asynchronous
XHRs will always return after a page has loaded.

By default, AIR blocks cross-domain XMLHttpRequests in non-application
sandboxes. A parent window in the application sandbox can choose to allow
cross-domain requests in a child frame containing content in a non-application
sandbox by setting `allowCrossDomainXHR`, an attribute added by AIR, to `true`
in the containing frame or iframe element:

```
<iframe id="mashup"
	src="http://www.example.com/map.html"
	allowCrossDomainXHR="true">
</iframe>
```

Note: When convenient, the AIR URLStream class can also be used to download
data.

If you dispatch an XMLHttpRequest to a remote server from a frame or iframe
containing application content that has been mapped to a remote sandbox, make
sure that the mapping URL does not mask the server address used in the XHR. For
example, consider the following iframe definition, which maps application
content into a remote sandbox for the example.com domain:

```
<iframe id="mashup"
	src="http://www.example.com/map.html"
	documentRoot="app:/sandbox/"
	sandboxRoot="http://www.example.com/"
	allowCrossDomainXHR="true">
</iframe>
```

Because the `sandboxRoot` attribute remaps the root URL of the www.example.com
address, all requests are loaded from the application directory and not the
remote server. Requests are remapped whether they derive from page navigation or
from an XMLHttpRequest.

To avoid accidentally blocking data requests to your remote server, map the
`sandboxRoot` to a subdirectory of the remote URL rather than the root. The
directory does not have to exist. For example, to allow requests to the
www.example.com to load from the remote server rather than the application
directory, change the previous iframe to the following:

```
<iframe id="mashup"
	src="http://www.example.com/map.html"
	documentRoot="app:/sandbox/"
	sandboxRoot="http://www.example.com/air/"
	allowCrossDomainXHR="true">
</iframe>
```

In this case, only content in the `air` subdirectory is loaded locally.

For more information on sandbox mapping see
[HTML frame and iframe elements](./html-in-air.md#html-frame-and-iframe-elements)
and
[HTML security in Adobe AIR](../../security/air-security/html-security-in-adobe-air.md).

## Cookies

In AIR applications, only content in remote sandboxes (content loaded from http:
and https: sources) can use cookies (the `document.cookie` property). In the
application sandbox, other means for storing persistent data are available,
including the EncryptedLocalStore, SharedObject, and FileStream classes.

## The Clipboard object

The WebKit Clipboard API is driven with the following events: `copy`, `cut`, and
`paste`. The event object passed in these events provides access to the
clipboard through the `clipboardData` property. Use the following methods of the
`clipboardData` object to read or write clipboard data:

| Method                  | Description                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clearData(mimeType)     | Clears the clipboard data. Set the `mimeType` parameter to the MIME type of the data to clear.                                                                  |
| getData(mimeType)       | Get the clipboard data. This method can only be called in a handler for the `paste` event. Set the `mimeType` parameter to the MIME type of the data to return. |
| setData(mimeType, data) | Copy data to the clipboard. Set the `mimeType` parameter to the MIME type of the data.                                                                          |

JavaScript code outside the application sandbox can only access the clipboard
through theses events. However, content in the application sandbox can access
the system clipboard directly using the AIR Clipboard class. For example, you
could use the following statement to get text format data on the clipboard:

```
var clipping = air.Clipboard.generalClipboard.getData("text/plain",
```

                                air.ClipboardTransferMode.ORIGINAL_ONLY);

The valid data MIME types are:

| MIME type | Value                                   |
| --------- | --------------------------------------- |
| Text      | "text/plain"                            |
| HTML      | "text/html"                             |
| URL       | "text/uri-list"                         |
| Bitmap    | "image/x-vnd.adobe.air.bitmap"          |
| File list | "application/x-vnd.adobe.air.file-list" |

Important: Only content in the application sandbox can access file data present
on the clipboard. If non-application content attempts to access a file object
from the clipboard, a security error is thrown.

For more information on using the clipboard, see
[Copy and paste](../../user-interaction/copy-and-paste/index.md) and
[Using the Pasteboard from JavaScript (Apple Developer Center)](http://developer.apple.com/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Tasks/CopyAndPaste.html#//apple_ref/doc/uid/30001234).

## Drag and Drop

Drag-and-drop gestures into and out of HTML produce the following DOM events:
`dragstart`, `drag`, `dragend`, `dragenter`, `dragover`, `dragleave`, and
`drop`. The event object passed in these events provides access to the dragged
data through the `dataTransfer` property. The `dataTransfer` property references
an object that provides the same methods as the `clipboardData` object
associated with a clipboard event. For example, you could use the following
function to get text format data from a `drop` event:

```
function onDrop(dragEvent){
	return dragEvent.dataTransfer.getData("text/plain",
			air.ClipboardTransferMode.ORIGINAL_ONLY);
}
```

The `dataTransfer` object has the following important members:

| Member                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clearData(mimeType)     | Clears the data. Set the `mimeType` parameter to the MIME type of the data representation to clear.                                                                                                                                                                                                                                                                                                                                                                                                          |
| getData(mimeType)       | Get the dragged data. This method can only be called in a handler for the `drop` event. Set the `mimeType` parameter to the MIME type of the data to get.                                                                                                                                                                                                                                                                                                                                                    |
| setData(mimeType, data) | Set the data to be dragged. Set the `mimeType` parameter to the MIME type of the data.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| types                   | An array of strings containing the MIME types of all data representations currently available in the `dataTransfer` object.                                                                                                                                                                                                                                                                                                                                                                                  |
| effectsAllowed          | Specifies whether the data being dragged can be copied, moved, linked, or some combination thereof. Set the `effectsAllowed` property in the handler for the `dragstart` event.                                                                                                                                                                                                                                                                                                                              |
| dropEffect              | Specifies which of the allowed drop effects are supported by a drag target. Set the `dropEffect` property in the handler for the `dragEnter` event. During the drag, the cursor changes to indicate which effect would occur if the user released the mouse. If no `dropEffect` is specified, an `effectsAllowed` property effect is chosen. The copy effect has priority over the move effect, which itself has priority over the link effect. The user can modify the default priority using the keyboard. |

For more information on adding support for drag-and-drop to an AIR application
see [Drag and drop in AIR](../../user-interaction/drag-and-drop-in-air/index.md)
and
[Using the Drag-and-Drop from JavaScript (Apple Developer Center)](http://developer.apple.com/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Tasks/DragAndDrop.html#//apple_ref/doc/uid/30001233).

## innerHTML and outerHTML properties

AIR places security restrictions on the use of the `innerHTML` and `outerHTML`
properties for content running in the application sandbox. Before the page load
event, as well as during the execution of any load event handlers, use of the
`innerHTML` and `outerHTML` properties is unrestricted. However, once the page
has loaded, you can only use `innerHTML` or `outerHTML` properties to add static
content to the document. Any statement in the string assigned to `innerHTML` or
`outerHTML` that evaluates to executable code is ignored. For example, if you
include an event callback attribute in an element definition, the event listener
is not added. Likewise, embedded `<script>` tags are not evaluated. For more
information, see the
[HTML security in Adobe AIR](../../security/air-security/html-security-in-adobe-air.md).

## Document.write() and Document.writeln() methods

Use of the `write()` and `writeln()` methods is not restricted in the
application sandbox before the `load` event of the page. However, once the page
has loaded, calling either of these methods does not clear the page or create a
new one. In a non-application sandbox, as in most web browsers, calling
`document.write()` or `writeln()` after a page has finished loading clears the
current page and opens a new, blank one.

## Document.designMode property

Set the `document.designMode` property to a value of `on` to make all elements
in the document editable. Built-in editor support includes text editing, copy,
paste, and drag-and-drop. Setting `designMode` to `on` is equivalent to setting
the `contentEditable` property of the `body` element to `true`. You can use the
`contentEditable` property on most HTML elements to define which sections of a
document are editable. See
[HTML contentEditable attribute](./html-in-air.md#html-contenteditable-attribute)
for additional information.

## unload events (for body and frameset objects)

In the top-level `frameset` or `body` tag of a window (including the main window
of the application), do not use the `unload` event to respond to the window (or
application) being closed. Instead, use `exiting` event of the NativeApplication
object (to detect when an application is closing). Or use the `closing` event of
the NativeWindow object (to detect when a window is closing). For example, the
following JavaScript code displays a message ( `"Goodbye."`) when the user
closes the application:

```
var app = air.NativeApplication.nativeApplication;
app.addEventListener(air.Event.EXITING, closeHandler);
function closeHandler(event)
{
	alert("Goodbye.");
}
```

However, scripts _can_ successfully respond to the `unload` event caused by
navigation of a frame, iframe, or top-level window content.

Note: These limitations may be removed in a future version of Adobe AIR.

## JavaScript Window object

The Window object remains the global object in the JavaScript execution context.
In the application sandbox, AIR adds new properties to the JavaScript Window
object to provide access to the built-in classes of AIR, as well as important
host objects. In addition, some methods and properties behave differently
depending on whether they are within the application sandbox or not.

Window.runtime property  
The `runtime` property allows you to instantiate and use the built-in runtime
classes from within the application sandbox. These classes include the AIR and
Flash Player APIs (but not, for example, the Flex framework). For example, the
following statement creates an AIR file object:

```
var preferencesFile = new window.runtime.flash.filesystem.File();
```

The `AIRAliases.js` file, provided in the AIR SDK, contains alias definitions
that allow you to shorten such references. For example, when `AIRAliases.js` is
imported into a page, a File object can be created with the following statement:

```
var preferencesFile = new air.File();
```

The `window.runtime` property is only defined for content within the application
sandbox and only for the parent document of a page with frames or iframes.

See
[Using the AIRAliases.js file](../programming-html-and-javascript-in-air/using-the-airaliases-js-file.md).

Window.nativeWindow property  
The `nativeWindow` property provides a reference to the underlying native window
object. With this property, you can script window functions and properties such
as screen position, size, and visibility, and handle window events such as
closing, resizing, and moving. For example, the following statement closes the
window:

```
window.nativeWindow.close();
```

Note: The window control features provided by the NativeWindow object overlap
the features provided by the JavaScript Window object. In such cases, you can
use whichever method you find most convenient.

The `window.nativeWindow` property is only defined for content within the
application sandbox and only for the parent document of a page with frames or
iframes.

Window.htmlLoader property  
The `htmlLoader` property provides a reference to the AIR HTMLLoader object that
contains the HTML content. With this property, you can script the appearance and
behavior of the HTML environment. For example, you can use the
`htmlLoader.paintsDefaultBackground` property to determine whether the control
paints a default, white background:

```
window.htmlLoader.paintsDefaultBackground = false;
```

Note: The HTMLLoader object itself has a `window` property, which references the
JavaScript Window object of the HTML content it contains. You can use this
property to access the JavaScript environment through a reference to the
containing HTMLLoader.

The `window.htmlLoader` property is only defined for content within the
application sandbox and only for the parent document of a page with frames or
iframes.

Window.parentSandboxBridge and Window.childSandboxBridge properties  
The `parentSandboxBridge` and `childSandboxBridge` properties allow you to
define an interface between a parent and a child frame. For more information,
see
[Cross-scripting content in different security sandboxes](../programming-html-and-javascript-in-air/cross-scripting-content-in-different-security-sandboxes.md).

Window.setTimeout() and Window.setInterval() functions  
AIR places security restrictions on use of the `setTimeout()` and
`setInterval()` functions within the application sandbox. You cannot define the
code to be executed as a string when calling `setTimeout()` or `setInterval()`.
You must use a function reference. For more information, see
[setTimeout() and setInterval()](../programming-html-and-javascript-in-air/avoiding-security-related-javascript-errors.md#settimeout-and-setinterval).

Window.open() function  
When called by code running in a non-application sandbox, the `open()` method
only opens a window when called as a result of user interaction (such as a mouse
click or keypress). In addition, the window title is prefixed with the
application title (to prevent windows opened by remote content from
impersonating windows opened by the application). For more information, see the
[Restrictions on calling the JavaScript window.open() method](../../security/air-security/html-security-in-adobe-air.md#restrictions-on-calling-the-javascript-windowopen-method).

## air.NativeApplication object

The NativeApplication object provides information about the application state,
dispatches several important application-level events, and provides useful
functions for controlling application behavior. A single instance of the
NativeApplication object is created automatically and can be accessed through
the class-defined `NativeApplication.nativeApplication` property.

To access the object from JavaScript code you could use:

```
var app = window.runtime.flash.desktop.NativeApplication.nativeApplication;
```

Or, if the `AIRAliases.js` script has been imported, you could use the shorter
form:

```
var app = air.NativeApplication.nativeApplication;
```

The NativeApplication object can only be accessed from within the application
sandbox. For more information about the NativeApplication object, see
[Working with AIR runtime and operating system information](../../client-system-interaction/working-with-air-runtime-and-operating-system-information.md).

## The JavaScript URL scheme

Execution of code defined in a JavaScript URL scheme (as in
`href="javascript:alert('Test')"`) is blocked within the application sandbox. No
error is thrown.
