# Accessing HTML DOM and JavaScript objects from ActionScript

Once the HTMLLoader object dispatches the `complete` event, you can access all
the objects in the HTML DOM (document object model) for the page. Accessible
objects include display elements (such as `div` and `p` objects in the page) as
well as JavaScript variables and functions. The `complete` event corresponds to
the JavaScript page `load` event. Before `complete` is dispatched, DOM elements,
variables, and functions may not have been parsed or created. If possible, wait
for the `complete` event before accessing the HTML DOM.

For example, consider the following HTML page:

```
<html>
	<script>
		foo = 333;
		function test() {
			return "OK.";
		}
	</script>
	<body>
		<p id="p1">Hi.</p>
	</body>
</html>
```

This simple HTML page defines a JavaScript variable named _foo_ and a JavaScript
function named _test()_. Both of these are properties of the global `window`
object of the page. Also, the `window.document` object includes a named P
element (with the ID _p1_ ), which you can access using the `getElementById()`
method. Once the page is loaded (when the HTMLLoader object dispatches the
`complete` event), you can access each of these objects from ActionScript, as
shown in the following ActionScript code:

```
var html:HTMLLoader = new HTMLLoader();
html.width = 300;
html.height = 300;
html.addEventListener(Event.COMPLETE, completeHandler);
var xhtml:XML =
	<html>
		<script>
			foo = 333;
			function test() {
				return "OK.";
			}
		</script>
		<body>
			<p id="p1">Hi.</p>
		</body>
	</html>;
html.loadString(xhtml.toString());

function completeHandler(e:Event):void {
	trace(html.window.foo); // 333
	trace(html.window.document.getElementById("p1").innerHTML); // Hi.
	trace(html.window.test()); // OK.
}
```

To access the content of an HTML element, use the `innerHTML` property. For
example, the previous code uses
`html.window.document.getElementById("p1").innerHTML` to get the contents of the
HTML element named _p1_.

You can also set properties of the HTML page from ActionScript. For example, the
following example sets the contents of the `p1` element and the value of the
`foo` JavaScript variable on the page using a reference to the containing
HTMLLoader object:

```
html.window.document.getElementById("p1").innerHTML = "Goodbye";
html.window.foo = 66;
```
