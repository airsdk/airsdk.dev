# Using ActionScript libraries within an HTML page

AIR extends the HTML script element so that a page can import ActionScript
classes in a compiled SWF file. For example, to import a library named,
_myClasses.swf_ , located in the `lib` subdirectory of the root application
folder, include the following script tag within an HTML file:

    <script src="lib/myClasses.swf" type="application/x-shockwave-flash"></script>

Important: The type attribute must be `type="application/x-shockwave-flash"`
_for the library to be properly loaded._

If the SWF content is compiled as a Flash Player 10 or AIR 1.5 SWF, you must set
the XML namespace of the application descriptor file to the AIR 1.5 namespace.

The `lib` directory and `myClasses.swf` file must also be included when the AIR
file is packaged.

Access the imported classes through the `runtime` property of the JavaScript
Window object:

    var libraryObject = new window.runtime.LibraryClass();

If the classes in the SWF file are organized in packages, you must include the
package name as well. For example, if the LibraryClass definition was in a
package named _utilities_ , you would create an instance of the class with the
following statement:

    var libraryObject = new window.runtime.utilities.LibraryClass();

Note: To compile an ActionScript SWF library for use as part of an HTML page in
AIR, use the `acompc` compiler. The acompc utility is part of the Flex SDK and
is described in the Flex SDK documentation.

## Accessing the HTML DOM and JavaScript objects from an imported ActionScript file

To access objects in an HTML page from ActionScript in a SWF file imported into
the page using the `<script>` tag, pass a reference to a JavaScript object, such
as `window` or `document`, to a function defined in the ActionScript code. Use
the reference within the function to access the JavaScript object (or other
objects accessible through the passed-in reference).

For example, consider the following HTML page:

    <html>
    <script src="ASLibrary.swf" type="application/x-shockwave-flash"></script>
    <script>
        num = 254;
        function getStatus() {
            return "OK.";
        }
        function runASFunction(window){
            var obj = new runtime.ASClass();
            obj.accessDOM(window);
        }
    </script>
    <body onload="runASFunction">
        <p id="p1">Body text.</p>
    </body>
    </html>

This simple HTML page has a JavaScript variable named _num_ and a JavaScript
function named _getStatus()_. Both of these are properties of the `window`
object of the page. Also, the `window.document` object includes a named P
element (with the ID _p1_ ).

The page loads an ActionScript file, "ASLibrary.swf," that contains a class,
ASClass. ASClass defines a function named `accessDOM()` that simply traces the
values of these JavaScript objects. The `accessDOM()` method takes the
JavaScript Window object as an argument. Using this Window reference, it can
access other objects in the page including variables, functions, and DOM
elements as illustrated in the following definition:

    public class ASClass {
    	public function accessDOM(window:*):void {
    		trace(window.num); // 254
    		trace(window.document.getElementById("p1").innerHTML); // Body text..
    		trace(window.getStatus()); // OK.
    	}
    }

You can both get and set properties of the HTML page from an imported
ActionScript class. For example, the following function sets the contents of the
`p1` element on the page and it sets the value of the `foo` JavaScript variable
on the page:

    public function modifyDOM(window:*):void {
    	window.document.getElementById("p1").innerHTML = "Bye";
    	window.foo = 66;
    }

More Help topics

![](../../img/airLinkIndicator.png)
[Specifying the required AIR version](https://web.archive.org/web/20150913114906/http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff1.html#WSe3d2d52902616553396777a311d6a2e014f-8000)

![](../../img/flexLinkIndicator.png)
[Using compc, the component compiler](https://web.archive.org/web/20150611085602/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7fd2.html)
