---
sidebar_position: 3
---

# HTML security in Adobe AIR

This topic describes the AIR HTML security architecture and how to use iframes,
frames, and the sandbox bridge to set up HTML-based applications and safely
integrate HTML content into SWF-based applications.

The runtime enforces rules and provides mechanisms for overcoming possible
security vulnerabilities in HTML and JavaScript. The same rules are enforced
whether your application is primarily written in JavaScript or whether you load
the HTML and JavaScript content into a SWF-based application. Content in the
application sandbox and the non-application security sandbox have different
privileges. When loading content into an iframe or frame, the runtime provides a
secure _sandbox bridge_ mechanism that allows content in the frame or iframe to
communicate securely with content in the application security sandbox.

The AIR SDK provides three classes for rendering HTML content.

The HTMLLoader class provides close integration between JavaScript code and the
AIR APIs.

The StageWebView class is an HTML rendering class and has very limited
integration with the host AIR application. Content loaded by the StageWebView
class is never placed in the application security sandbox and cannot access data
or call functions in the host AIR application. On desktop platforms, the
StageWebView class uses the built-in AIR HTML engine, based on Webkit, which is
also used by the HTMLLoader class. On mobile platforms, the StageWebView class
uses the HTML control provided by the operating system. Thus, on mobile
platforms the StageWebView class has the same security considerations and
vulnerabilities as the system web browser.

The TextField class can display strings of HTML text. No JavaScript can be
executed, but the text can include links and externally loaded images.

For more information, see
[Avoiding security-related JavaScript errors](../../html-content-in-air/programming-html-and-javascript-in-air/avoiding-security-related-javascript-errors.md).

## Overview on configuring your HTML-based application

Frames and iframes provide a convenient structure for organizing HTML content in
AIR. Frames provide a means both for maintaining data persistence and for
working securely with remote content.

Because HTML in AIR retains its normal, page-based organization, the HTML
environment completely refreshes if the top frame of your HTML content
"navigates" to a different page. You can use frames and iframes to maintain data
persistence in AIR, much the same as you would for a web application running in
a browser. Define your main application objects in the top frame and they
persist as long as you don't allow the frame to navigate to a new page. Use
child frames or iframes to load and display the transient parts of the
application. (There are a variety of ways to maintain data persistence that can
be used in addition to, or instead of, frames. These include cookies, local
shared objects, local file storage, the encrypted file store, and local database
storage.)

Because HTML in AIR retains its normal, blurred line between executable code and
data, AIR puts content in the top frame of the HTML environment into the
application sandbox. After the page `load` event, AIR restricts any operations,
such as `eval()`, that can convert a string of text into an executable object.
This restriction is enforced even when an application does not load remote
content. To allow HTML content to execute these restricted operations, you must
use frames or iframes to place the content into a non-application sandbox.
(Running content in a sandboxed child frame may be necessary when using some
JavaScript application frameworks that rely on the `eval()` function.) For a
complete list of the restrictions on JavaScript in the application sandbox, see
[Code restrictions for content in different sandboxes](#code-restrictions-for-content-in-different-sandboxes).

Because HTML in AIR retains its ability to load remote, possibly insecure
content, AIR enforces a same-origin policy that prevents content in one domain
from interacting with content in another. To allow interaction between
application content and content in another domain, you can set up a bridge to
serve as the interface between a parent and a child frame.

### Setting up a parent-child sandbox relationship

AIR adds the `sandboxRoot` and `documentRoot` attributes to the HTML frame and
iframe elements. These attributes let you treat application content as if it
came from another domain:

| Attribute    | Description                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sandboxRoot  | The URL to use for determining the sandbox and domain in which to place the frame content. The `file:`, `http:`, or `https:` URL schemes must be used. |
| documentRoot | The URL from which to load the frame content. The `file:`, `app:`, or `app-storage:` URL schemes must be used.                                         |

The following example maps content installed in the sandbox subdirectory of the
application to run in the remote sandbox and the www.example.com domain:

```
<iframe
	src="ui.html"
	sandboxRoot="http://www.example.com/local/"
	documentRoot="app:/sandbox/">
</iframe>
```

### Setting up a bridge between parent and child frames in different sandboxes or domains

AIR adds the `childSandboxBridge` and `parentSandboxBridge` properties to the
`window` object of any child frame. These properties let you define bridges to
serve as interfaces between a parent and a child frame. Each bridge goes in one
direction:

`childSandboxBridge` — The `childSandboxBridge` property allows the child frame
to expose an interface to content in the parent frame. To expose an interface,
you set the `childSandbox` property to a function or object in the child frame.
You can then access the object or function from content in the parent frame. The
following example shows how a script running in a child frame can expose an
object containing a function and a property to its parent:

```
var interface = {};
interface.calculatePrice = function(){
	return .45 + 1.20;
}
interface.storeID = "abc"
window.childSandboxBridge = interface;
```

If this child content is in an iframe assigned an `id` of `"child"`, you can
access the interface from parent content by reading the `childSandboxBridge`
property of the frame:

```
var childInterface = document.getElementById("child").childSandboxBridge;
air.trace(childInterface.calculatePrice()); //traces "1.65"
air.trace(childInterface.storeID)); //traces "abc"
```

`parentSandboxBridge` — The `parentSandboxBridge` property allows the parent
frame to expose an interface to content in the child frame. To expose an
interface, you set the `parentSandbox` property of the child frame to a function
or object in the parent frame. You can then access the object or function from
content in the child frame. The following example shows how a script running in
the parent frame can expose an object containing a save function to a child:

```
var interface = {};
interface.save = function(text){
	var saveFile = air.File("app-storage:/save.txt");
	//write text to file
}
document.getElementById("child").parentSandboxBridge = interface;
```

Using this interface, content in the child frame could save text to a file named
save.txt. However, it would not have any other access to the file system. In
general, application content should expose the narrowest possible interface to
other sandboxes. The child content could call the save function as follows:

```
var textToSave = "A string.";
window.parentSandboxBridge.save(textToSave);
```

If child content attempts to set a property of the `parentSandboxBridge` object,
the runtime throws a SecurityError exception. If parent content attempts to set
a property of the `childSandboxBridge` object, the runtime throws a
SecurityError exception.

## Code restrictions for content in different sandboxes

As discussed in the introduction to this topic,
[HTML security in Adobe AIR](#), the runtime enforces
rules and provides mechanisms for overcoming possible security vulnerabilities
in HTML and JavaScript. This topic lists those restrictions. If code attempts to
call these restricted APIs, the runtime throws an error with the message "Adobe
AIR runtime security violation for JavaScript code in the application security
sandbox."

For more information, see
[Avoiding security-related JavaScript errors](../../html-content-in-air/programming-html-and-javascript-in-air/avoiding-security-related-javascript-errors.md).

### Restrictions on using the JavaScript eval() function and similar techniques

For HTML content in the application security sandbox, there are limitations on
using APIs that can dynamically transform strings into executable code after the
code is loaded (after the `onload` event of the `body` element has been
dispatched and the `onload` handler function has finished executing). This is to
prevent the application from inadvertently injecting (and executing) code from
non-application sources (such as potentially insecure network domains).

For example, if your application uses string data from a remote source to write
to the innerHTML property of a DOM element, the string could include executable
(JavaScript) code that could perform insecure operations. However, while the
content is loading, there is no risk of inserting remote strings into the DOM.

One restriction is in the use of the JavaScript `eval()` function. Once code in
the application sandbox is loaded and after processing of the onload event
handler, you can only use the `eval()` function in limited ways. The following
rules apply to the use of the `eval()` function _after_ code is loaded from the
application security sandbox:

- Expressions involving literals are allowed. For example:

```
eval("null");
eval("3 + .14");
eval("'foo'");
```

- Object literals are allowed, as in the following:

```
{ prop1: val1, prop2: val2 }
```

- Object literal setter/getters are _prohibited_ , as in the following:

```
{ get prop1() { ... }, set prop1(v) { ... } }
```

- Array literals are allowed, as in the following:

```
[ val1, val2, val3 ]
```

- Expressions involving property reads are _prohibited_ , as in the following:

```
a.b.c
```

- Function invocation is _prohibited._

- Function definitions are _prohibited._

- Setting any property is _prohibited._

- Function literals are _prohibited._

However, while the code is loading, before the `onload` event, and during
execution the `onload` event handler function, these restrictions do not apply
to content in the application security sandbox.

For example, after code is loaded, the following code results in the runtime
throwing an exception:

```
eval("alert(44)");
eval("myFunction(44)");
eval("NativeApplication.applicationID");
```

Dynamically generated code, such as that which is made when calling the `eval()`
function, would pose a security risk if allowed within the application sandbox.
For example, an application may inadvertently execute a string loaded from a
network domain, and that string may contain malicious code. For example, this
could be code to delete or alter files on the user's computer. Or it could be
code that reports back the contents of a local file to an untrusted network
domain.

Ways to generate dynamic code are the following:

- Calling the `eval()` function.

- Using `innerHTML` properties or DOM functions to insert script tags that load
  a script outside of the application directory.

- Using `innerHTML` properties or DOM functions to insert script tags that have
  inline code (rather than loading a script via the `src` attribute).

- Setting the `src` attribute for a `script` tags to load a JavaScript file that
  is outside of the application directory.

- Using the `javascript` URL scheme (as in `href="javascript:alert('Test')"`).

- Using the `setInterval()` or `setTimout()` function where the first parameter
  (defining the function to run asynchronously) is a string (to be evaluated)
  rather than a function name (as in `setTimeout('x = 4', 1000)`).

- Calling `document.write()` or `document.writeln()`.

Code in the application security sandbox can only use these methods while
content is loading.

These restrictions do _not_ prevent using `eval()` with JSON object literals.
This lets your application content work with the JSON JavaScript library.
However, you are restricted from using overloaded JSON code (with event
handlers).

For other Ajax frameworks and JavaScript code libraries, check to see if the
code in the framework or library works within these restrictions on dynamically
generated code. If they do not, include any content that uses the framework or
library in a non-application security sandbox. For details, see
[Restrictions for JavaScript inside AIR](../security-sandboxes.md#restrictions-for-javascript-inside-air)
and
[Scripting between application and non-application content](./working-securely-with-untrusted-content.md#scripting-between-application-and-non-application-content).
Adobe maintains a list of Ajax frameworks known to support the application
security sandbox, at https://www.adobe.com/products/air/develop/ajax/features/.

Unlike content in the application security sandbox, JavaScript content in a
non-application security sandbox _can_ call the `eval()` function to execute
dynamically generated code at any time.

### Restrictions on access to AIR APIs (for non-application sandboxes)

JavaScript code in a non-application sandbox does not have access to the
`window.runtime` object, and as such this code cannot execute AIR APIs. If
content in a non-application security sandbox calls the following code, the
application throws a TypeError exception:

```
try {
	window.runtime.flash.system.NativeApplication.nativeApplication.exit();
}
catch (e)
{
	alert(e);
}
```

The exception type is TypeError (undefined value), because content in the
non-application sandbox does not recognize the `window.runtime` object, so it is
seen as an undefined value.

You can expose runtime functionality to content in a non-application sandbox by
using a script bridge. For details, see and
[Scripting between application and non-application content](./working-securely-with-untrusted-content.md#scripting-between-application-and-non-application-content).

### Restrictions on using XMLHttpRequest calls

HTML content in the application security sandbox cannot use synchronous
XMLHttpRequest methods to load data from outside of the application sandbox
while the HTML content is loading and during `onLoad` event.

By default, HTML content in non-application security sandboxes are not allowed
to use the JavaScript XMLHttpRequest object to load data from domains other than
the domain calling the request. A `frame` or `iframe` tag can include an
`allowcrosscomainxhr` attribute. Setting this attribute to any non-null value
allows the content in the frame or iframe to use the JavaScript XMLHttpRequest
object to load data from domains other than the domain of the code calling the
request:

```
<iframe id="UI"
	src="http://example.com/ui.html"
	sandboxRoot="http://example.com/"
	allowcrossDomainxhr="true"
	documentRoot="app:/">
</iframe>
```

For more information, see
[Scripting between content in different domains](./scripting-between-content-in-different-domains.md).

### Restrictions on loading CSS, frame, iframe, and img elements (for content in non-application sandboxes)

HTML content in remote (network) security sandboxes can only load CSS, `frame`,
`iframe`, and `img` content from remote sandboxes (from network URLs).

HTML content in local-with-filesystem, local-with-networking, or local-trusted
sandboxes can only load CSS, frame, iframe, and `img` content from local
sandboxes (not from application or remote sandboxes).

### Restrictions on calling the JavaScript window.open() method

If a window that is created via a call to the JavaScript `window.open()` method
displays content from a non-application security sandbox, the window's title
begins with the title of the main (launching) window, followed by a colon
character. You cannot use code to move that portion of the title of the window
off screen.

Content in non-application security sandboxes can only successfully call the
JavaScript `window.open()` method in response to an event triggered by a user
mouse or keyboard interaction. This prevents non-application content from
creating windows that might be used deceptively (for example, for phishing
attacks). Also, the event handler for the mouse or keyboard event cannot set the
`window.open()` method to execute after a delay (for example by calling the
`setTimeout()` function).

Content in remote (network) sandboxes can only use the `window.open()` method to
open content in remote network sandboxes. It cannot use the `window.open()`
method to open content from the application or local sandboxes.

Content in the local-with-filesystem, local-with-networking, or local-trusted
sandboxes (see [Security sandboxes](../security-sandboxes.md)) can only use the
`window.open()` method to open content in local sandboxes. It cannot use
`window.open()` to open content from the application or remote sandboxes.

### Errors when calling restricted code

If you call code that is restricted from use in a sandbox due to these security
restrictions, the runtime dispatches a JavaScript error: "Adobe AIR runtime
security violation for JavaScript code in the application security sandbox."

For more information, see
[Avoiding security-related JavaScript errors](../../html-content-in-air/programming-html-and-javascript-in-air/avoiding-security-related-javascript-errors.md).

## Sandbox protection when loading HTML content from a string

The `loadString()` method of the HTMLLoader class lets you create HTML content
at run time. However, data that you use as the HTML content can be corrupted if
the data is loaded from an insecure Internet source. For this reason, by
default, HTML created using the `loadString()` method is not placed in the
application sandbox and it has no access to AIR APIs. However, you can set the
`placeLoadStringContentInApplicationSandbox` property of an HTMLLoader object to
true to place HTML created using the `loadString()` method into the application
sandbox. For more information, see
[Loading HTML content from a string](../../html-content-in-air/programming-html-and-javascript-in-air/about-the-htmlloader-class.md#loading-html-content-from-a-string).
