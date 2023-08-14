# About the HTMLLoader class

The
[HTMLLoader](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/html/HTMLLoader.html)
class of Adobe AIR defines the display object that can display HTML content in
an AIR application. SWF-based applications can add an HTMLLoader control to an
existing window or create an HTML window that automatically contains a
HTMLLoader object with `HTMLLoader.createRootWindow()`. The HTMLLoader object
can be accessed through the JavaScript `window.htmlLoader` property from within
the loaded HTML page.

## Loading HTML content from a URL

The following code loads a URL into an HTMLLoader object (add the HTMLLoader as
a child of the stage or other display object container to display the HTML
content in your application):

    import flash.html.HTMLLoader;

    var html:HTMLLoader = new HTMLLoader;
    html.width = 400;
    html.height = 600;
    var urlReq:URLRequest = new URLRequest("https://www.adobe.com/");
    html.load(urlReq);

An HTMLLoader object's `width` and `height` properties are both set to 0 by
default. You will want to set these dimensions when adding an HTMLLoader object
to the stage. The HTMLLoader dispatches several events as a page loads. You can
use these events to determine when it is safe to interact with the loaded page.
These events are described in
[Handling HTML-related events in AIR](../handling-html-related-events-in-air.md).

Note: In the Flex framework, only classes that extend the UIComponent class can
be added as children of a Flex Container components. For this reason, you cannot
directly add an HTMLLoader as a child of a Flex Container component; however you
can use the Flex mx:HTML control, you can build a custom class that extends
UIComponent and contains an HTMLLoader as a child of the UIComponent, or you can
add the HTMLLoader as a child of a UIComponent and add the UIComponent to the
Flex container.

You can also render HTML text by using the TextField class, but its capabilities
are limited. The Adobe® Flash® Player's TextField class supports a subset of
HTML markup, but because of size limitations, its capabilities are limited. (The
HTMLLoader class included in Adobe AIR is not available in Flash Player.)

## Loading HTML content from a string

The `loadString()` method of an HTMLLoader object loads a string of HTML content
into the HTMLLoader object:

    var html:HTMLLoader = new HTMLLoader();
    var htmlStr:String = "<html><body>Hello <b>world</b>.</body></html>";
    html.loadString(htmlStr);

By default, content loaded via the `loadString()` method is placed in a
non-application sandbox with the following characteristics:

- It has access to load content from the network (but not from the file system).

- It cannot load data using XMLHttpRequest.

- The `window.location` property is set to `"about:blank"`.

- The content cannot access the `window.runtime` property (like content in any
  non-application sandbox can).

In AIR 1.5, the HTMLLoader class includes a
`placeLoadStringContentInApplicationSandbox` property. When this property is set
to `true` for an HTMLLoader object, content loaded via the `loadString()` method
is placed in the application sandbox. (The default value is `false`.) This gives
content loaded via the `loadString()` method access to the `window.runtime`
property and to all AIR APIs. If you set this property to `true`, ensure that
the data source for a string used in a call to the `loadString()` method is
trusted. Code statements in the HTML string are executed with full application
privileges when this property is set to `true`. Only set this property to `true`
when you are certain that the string cannot contain harmful code.

In applications compiled with the AIR 1.0 or AIR 1.1 SDKs, content loaded via
the `loadString()` method is placed in the application sandbox.

## Important security rules when using HTML in AIR applications

The files you install with the AIR application have access to the AIR APIs. For
security reasons, content from other sources do not. For example, this
restriction prevents content from a remote domain (such as http://example.com)
from reading the contents the user's desktop directory (or worse).

Because there are security loopholes that can be exploited through calling the
`eval()` function (and related APIs), content installed with the application, by
default, is restricted from using these methods. However, some Ajax frameworks
use the calling the `eval()` function and related APIs.

To properly structure content to work in an AIR application, you must take into
account the rules for the security restrictions on content from different
sources. Content from different sources is placed in separate security
classifications, called sandboxes (see
[Security sandboxes](../../security/security-sandboxes.md)). By default, content
installed with the application is installed in a sandbox known as the
_application_ sandbox, and this grants it access to the AIR APIs. The
application sandbox is generally the most secure sandbox, with restrictions
designed to prevent the execution of untrusted code.

The runtime allows you to load content installed with your application into a
sandbox other than the application sandbox. Content in non-application sandboxes
operates in a security environment similar to that of a typical web browser. For
example, code in non-application sandboxes can use `eval()` and related methods
(but at the same time is not allowed to access the AIR APIs). The runtime
includes ways to have content in different sandboxes communicate securely
(without exposing AIR APIs to non-application content, for example). For
details, see
[Cross-scripting content in different security sandboxes](./cross-scripting-content-in-different-security-sandboxes.md).

If you call code that is restricted from use in a sandbox for security reasons,
the runtime dispatches a JavaScript error: "Adobe AIR runtime security violation
for JavaScript code in the application security sandbox."

To avoid this error, follow the coding practices described in the next section,
[Avoiding security-related JavaScript errors](./avoiding-security-related-javascript-errors.md).

For more information, see
[HTML security in Adobe AIR](../../security/air-security/html-security-in-adobe-air.md).
