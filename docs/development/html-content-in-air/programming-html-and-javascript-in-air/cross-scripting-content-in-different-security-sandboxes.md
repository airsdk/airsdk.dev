# Cross-scripting content in different security sandboxes

The runtime security model isolates code from different origins. By
cross-scripting content in different security sandboxes, you can allow content
in one security sandbox to access selected properties and methods in another
sandbox.

## AIR security sandboxes and JavaScript code

AIR enforces a same-origin policy that prevents code in one domain from
interacting with content in another. All files are placed in a sandbox based on
their origin. Ordinarily, content in the application sandbox cannot violate the
same-origin principle and cross-script content loaded from outside the
application install directory. However, AIR provides a few techniques that let
you cross-script non-application content.

One technique uses frames or iframes to map application content into a different
security sandbox. Any pages loaded from the sandboxed area of the application
behave as if they were loaded from the remote domain. For example, by mapping
application content to the _example.com_ domain, that content could cross-script
pages loaded from example.com.

Since this technique places the application content into a different sandbox,
code within that content is also no longer subject to the restrictions on the
execution of code in evaluated strings. You can use this sandbox mapping
technique to ease these restrictions even when you don't need to cross-script
remote content. Mapping content in this way can be especially useful when
working with one of the many JavaScript frameworks or with existing code that
relies on evaluating strings. However, you should consider and guard against the
additional risk that untrusted content could be injected and executed when
content is run outside the application sandbox.

At the same time, application content mapped to another sandbox loses its access
to the AIR APIs, so the sandbox mapping technique cannot be used to expose AIR
functionality to code executed outside the application sandbox.

Another cross-scripting technique lets you create an interface called a _sandbox
bridge_ between content in a non-application sandbox and its parent document in
the application sandbox. The bridge allows the child content to access
properties and methods defined by the parent, the parent to access properties
and methods defined by the child, or both.

Finally, you can also perform cross-domain XMLHttpRequests from the application
sandbox and, optionally, from other sandboxes.

For more information, see
[HTML frame and iframe elements](../about-the-html-environment/html-in-air.md#html-frame-and-iframe-elements),
[HTML security in Adobe AIR](../../security/air-security/html-security-in-adobe-air.md),
and
[The XMLHttpRequest object](../about-the-html-environment/javascript-in-air.md#the-xmlhttprequest-object).

## Loading application content into a non-application sandbox

To allow application content to safely cross-script content loaded from outside
the application install directory, you can use `frame` or `iframe` elements to
load application content into the same security sandbox as the external content.
If you do not need to cross-script remote content, but still wish to load a page
of your application outside the application sandbox, you can use the same
technique, specifying `http://localhost/` or some other innocuous value, as the
domain of origin.

AIR adds the new attributes, `sandboxRoot` and `documentRoot`, to the frame
element that allow you to specify whether an application file loaded into the
frame should be mapped to a non-application sandbox. Files resolving to a path
underneath the `sandboxRoot` URL are loaded instead from the `documentRoot`
directory. For security purposes, the application content loaded in this way is
treated as if it was actually loaded from the `sandboxRoot` URL.

The `sandboxRoot` property specifies the URL to use for determining the sandbox
and domain in which to place the frame content. The `file:`, `http:`, or
`https:` URL schemes must be used. If you specify a relative URL, the content
remains in the application sandbox.

The `documentRoot` property specifies the directory from which to load the frame
content. The `file:`, `app:`, or `app-storage:` URL schemes must be used.

The following example maps content installed in the `sandbox` subdirectory of
the application to run in the remote sandbox and the `www.example.com` domain:

    <iframe
    	src="http://www.example.com/local/ui.html"
    	sandboxRoot="http://www.example.com/local/"
    	documentRoot="app:/sandbox/">
    </iframe>

The `ui.html` page could load a javascript file from the local, `sandbox` folder
using the following script tag:

    <script src="http://www.example.com/local/ui.js"></script>

It could also load content from a directory on the remote server using a script
tag such as the following:

    <script src="http://www.example.com/remote/remote.js"></script>

The `sandboxRoot` URL will mask any content at the same URL on the remote
server. In the above example, you would not be able to access any remote content
at `www.example.com/local/` (or any of its subdirectories) because AIR remaps
the request to the local application directory. Requests are remapped whether
they derive from page navigation, from an XMLHttpRequest, or from any other
means of loading content.

## Setting up a sandbox bridge interface

You can use a sandbox bridge when content in the application sandbox must access
properties or methods defined by content in a non-application sandbox, or when
non-application content must access properties and methods defined by content in
the application sandbox. Create a bridge with the `childSandboxBridge` and
`parentSandboxBridge` properties of the `window` object of any child document.

## Establishing a child sandbox bridge

The `childSandboxBridge` property allows the child document to expose an
interface to content in the parent document. To expose an interface, you set the
`childSandbox` property to a function or object in the child document. You can
then access the object or function from content in the parent document. The
following example shows how a script running in a child document can expose an
object containing a function and a property to its parent:

    var interface = {};
    interface.calculatePrice = function(){
    	return ".45 cents";
    }
    interface.storeID = "abc"
    window.childSandboxBridge = interface;

If this child content was loaded into an iframe assigned an id of "child", you
could access the interface from parent content by reading the
`childSandboxBridge` property of the frame:

    var childInterface = document.getElementById("child").contentWindow.childSandboxBridge;
    air.trace(childInterface.calculatePrice()); //traces ".45 cents"
    air.trace(childInterface.storeID)); //traces "abc"

## Establishing a parent sandbox bridge

The `parentSandboxBridge` property allows the parent document to expose an
interface to content in a child document. To expose an interface, the parent
document sets the `parentSandbox` property of the child document to a function
or object defined in the parent document. You can then access the object or
function from content in the child. The following example shows how a script
running in a parent frame can expose an object containing a function to a child
document:

    var interface = {};
    interface.save = function(text){
    	var saveFile = air.File("app-storage:/save.txt");
    	//write text to file
    }
    document.getElementById("child").contentWindow.parentSandboxBridge = interface;

Using this interface, content in the child frame could save text to a file named
`save.txt`, but would not have any other access to the file system. The child
content could call the save function as follows:

    var textToSave = "A string.";
    window.parentSandboxBridge.save(textToSave);

Application content should expose the narrowest interface possible to other
sandboxes. Non-application content should be considered inherently untrustworthy
since it may be subject to accidental or malicious code injection. You must put
appropriate safeguards in place to prevent misuse of the interface you expose
through the parent sandbox bridge.

## Accessing a parent sandbox bridge during page loading

In order for a script in a child document to access a parent sandbox bridge, the
bridge must be set up before the script is run. Window, frame and iframe objects
dispatch a `dominitialize` event when a new page DOM has been created, but
before any scripts have been parsed, or DOM elements added. You can use the
`dominitialize` event to establish the bridge early enough in the page
construction sequence that all scripts in the child document can access it.

The following example illustrates how to create a parent sandbox bridge in
response to the `dominitialize` event dispatched from the child frame:

    <html>
    <head>
    	<script>
    		var bridgeInterface = {};
    		bridgeInterface.testProperty = "Bridge engaged";
    		function engageBridge(){
    			document.getElementById("sandbox").contentWindow.parentSandboxBridge = bridgeInterface;
    		}
    	</script>
    </head>
    <body>
    	<iframe id="sandbox"
    			src="http://www.example.com/air/child.html"
    			documentRoot="app:/"
    			sandboxRoot="http://www.example.com/air/"
    			ondominitialize="engageBridge()"/>
    </body>
    </html>

The following `child.html` document illustrates how child content can access the
parent sandbox bridge:

    <html>
    <head>
        <script>
            document.write(window.parentSandboxBridge.testProperty);
        </script>
    </head>
    <body></body>
    </html>

To listen for the `dominitialize` event on a child window, rather than a frame,
you must add the listener to the new child window object created by the
`window.open()` function:

    var childWindow = window.open();
    childWindow.addEventListener("dominitialize", engageBridge());
    childWindow.document.location = "http://www.example.com/air/child.html";

In this case, there is no way to map application content into a non-application
sandbox. This technique is only useful when `child.html` is loaded from outside
the application directory. You can still map application content in the window
to a non-application sandbox, but you must first load an intermediate page that
itself uses frames to load the child document and map it to the desired sandbox.

If you use the HTMLLoader class `createRootWindow()` function to create a
window, the new window is not a child of the document from which
`createRootWindow()` is called. Thus, you cannot create a sandbox bridge from
the calling window to non-application content loaded into the new window.
Instead, you must use load an intermediate page in the new window that itself
uses frames to load the child document. You can then establish the bridge from
the parent document of the new window to the child document loaded into the
frame.
