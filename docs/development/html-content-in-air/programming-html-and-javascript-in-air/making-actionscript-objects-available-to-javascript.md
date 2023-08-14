# Making ActionScript objects available to JavaScript

JavaScript in the HTML page loaded by an HTMLLoader object can call the classes,
objects, and functions defined in the ActionScript execution context using the
`window.runtime`, `window.htmlLoader`, and `window.nativeWindow` properties of
the HTML page. You can also make ActionScript objects and functions available to
JavaScript code by creating references to them within the JavaScript execution
context.

## A basic example of accessing JavaScript objects from ActionScript

The following example illustrates how to add properties referencing ActionScript
objects to the global window object of an HTML page:

    var html:HTMLLoader = new HTMLLoader();
    var foo:String = "Hello from container SWF."
    function helloFromJS(message:String):void {
    	trace("JavaScript says:", message);
    }
    var urlReq:URLRequest = new URLRequest("test.html");
    html.addEventListener(Event.COMPLETE, loaded);
    html.load(urlReq);

    function loaded(e:Event):void{
    	html.window.foo = foo;
    	html.window.helloFromJS = helloFromJS;
    }

The HTML content (in a file named test.html) loaded into the HTMLLoader object
in the previous example can access the `foo` property and the `helloFromJS()`
method defined in the parent SWF file:

    <html>
    <script>
        function alertFoo() {
            alert(foo);
        }
    </script>
    <body>
        <button onClick="alertFoo()">
            What is foo?
        </button>
        <p><button onClick="helloFromJS('Hi.')">
            Call helloFromJS() function.
        </button></p>
    </body>
    </html>

When accessing the JavaScript context of a loading document, you can use the
`htmlDOMInitialize` event to create objects early enough in the page
construction sequence that any scripts defined in the page can access them. If
you wait for the `complete` event, only scripts in the page that run after the
page `load` event can access the added objects.

## Making class definitions available to JavaScript

To make the ActionScript classes of your application available in JavaScript,
you can assign the loaded HTML content to the application domain containing the
class definitions. The application domain of the JavaScript execution context
can be set with the `runtimeApplicationDomain` property of the HTMLLoader
object. To set the application domain to the primary application domain, for
example, set `runtimeApplicationDomain` to `ApplicationDomain.currentDomain`, as
shown in the following code:

    html.runtimeApplicationDomain = ApplicationDomain.currentDomain;

Once the `runtimeApplicationDomain` property is set, the JavaScript context
shares class definitions with the assigned domain. To create an instance of a
custom class in JavaScript, reference the class definition through the
`window.runtime` property and use the `new` operator:

    var customClassObject = new window.runtime.CustomClass();

The HTML content must be from a compatible security domain. If the HTML content
is from a different security domain than that of the application domain you
assign, the page uses a default application domain instead. For example, if you
load a remote page from the Internet, you could not assign
ApplicationDomain.currentDomain as the application domain of the page.

## Removing event listeners

When you add JavaScript event listeners to objects outside the current page,
including runtime objects, objects in loaded SWF content, and even JavaScript
objects running in other pages, you should always remove those event listeners
when the page unloads. Otherwise, the event listener dispatches the event to a
handler function that no longer exists. If this happens, you will see the
following error message: "The application attempted to reference a JavaScript
object in an HTML page that is no longer loaded." Removing unneeded event
listeners also lets AIR reclaim the associated memory. For more information, see
[Removing event listeners in HTML pages that navigate](../handling-html-related-events-in-air.md#removing-event-listeners-in-html-pages-that-navigate).
