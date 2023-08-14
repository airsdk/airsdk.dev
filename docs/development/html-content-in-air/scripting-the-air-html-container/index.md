# Scripting the AIR HTML Container

The
[HTMLLoader](https://airsdk.dev/reference/actionscript/3.0/flash/html/HTMLLoader.html)
class serves as the container for HTML content in Adobe® AIR®. The class
provides many properties and methods, inherited from the Sprite class, for
controlling the behavior and appearance of the object on the ActionScript® 3.0
display list. In addition, the class defines properties and methods for such
tasks as loading and interacting with HTML content and managing history.

The
[HTMLHost](https://airsdk.dev/reference/actionscript/3.0/flash/html/HTMLHost.html)
class defines a set of default behaviors for an HTMLLoader. When you create an
HTMLLoader object, no HTMLHost implementation is provided. Thus when HTML
content triggers one of the default behaviors, such as changing the window
location, or the window title, nothing happens. You can extend the HTMLHost
class to define the behaviors desired for your application.

A default implementation of the HTMLHost is provided for HTML windows created by
AIR. You can assign the default HTMLHost implementation to another HTMLLoader
object by setting the `htmlHost` property of the object using a new HTMLHost
object created with the `defaultBehavior` parameter set to `true`.

Note: In the Adobe® Flex™ Framework, the HTMLLoader object is wrapped by the
mx:HTML component. When using Flex, use the HTML component.

- [Display properties of HTMLLoader objects](./display-properties-of-htmlloader-objects.md)
- [Scrolling HTML content](./scrolling-html-content.md)
- [Accessing the HTML history list](./accessing-the-html-history-list.md)
- [Setting the user agent used when loading HTML content](./setting-the-user-agent-when-loading-html-content.md)
- [Setting the character encoding to use for HTML content](./setting-the-character-encoding-to-use-for-html-content.md)
- [Defining browser-like user interfaces for HTML content](./defining-browser-like-user-interfaces-for-html-content.md)
- [Creating subclasses of the HTMLLoader class](./creating-subclasses-of-the-htmlloader-class.md)
