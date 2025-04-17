# Avoiding security-related JavaScript errors

If you call code that is restricted from use in a sandbox due to these security
restrictions, the runtime dispatches a JavaScript error: "Adobe AIR runtime
security violation for JavaScript code in the application security sandbox." To
avoid this error, follow these coding practices.

## Causes of security-related JavaScript errors

Code executing in the application sandbox is restricted from most operations
that involve evaluating and executing strings once the document `load` event has
fired and any `load` event handlers have exited. Attempting to use the following
types of JavaScript statements that evaluate and execute potentially insecure
strings generates JavaScript errors:

- [eval() function](#eval-function)

- [setTimeout() and setInterval()](#settimeout-and-setinterval)

- [Function constructor](#function-constructor)

  In addition, the following types of JavaScript statements fail without
  generating an unsafe JavaScript error:

- [javascript: URLs](#javascript-urls)

- [Event callbacks assigned through onevent attributes in innerHTML and outerHTML statements](#event-callbacks-assigned-through-onevent-attributes-in-innerhtml-and-outerhtml-statements)

- [Loading JavaScript files from outside the application installation directory](#loading-javascript-files-from-outside-the-application-installation-directory)

- [document.write() and document.writeln()](#documentwrite-and-documentwriteln)

- [Synchronous XMLHttpRequests before the load event or during a load event handler](#synchronous-xmlhttprequests-before-the-load-event-or-during-a-load-event-handler)

- [Dynamically created script elements](#dynamically-created-script-elements)

  Note: In some restricted cases, evaluation of strings is permitted. See
  [Code restrictions for content in different sandboxes](../../security/air-security/html-security-in-adobe-air.md#code-restrictions-for-content-in-different-sandboxes)
  for more information.

  Adobe maintains a list of Ajax frameworks known to support the application
  security sandbox, at [https://www.adobe.com/go/airappsandboxframeworks](https://web.archive.org/web/20110326163726/http://www.adobe.com/products/air/tools/ajax/community/).

  The following sections describe how to rewrite scripts to avoid these unsafe
  JavaScript errors and silent failures for code running in the application
  sandbox.

## Mapping application content to a different sandbox

In most cases, you can rewrite or restructure an application to avoid
security-related JavaScript errors. However, when rewriting or restructuring is
not possible, you can load the application content into a different sandbox
using the technique described in
[Loading application content into a non-application sandbox](./cross-scripting-content-in-different-security-sandboxes.md#loading-application-content-into-a-non-application-sandbox).
If that content also must access AIR APIs, you can create a sandbox bridge, as
described in
[Setting up a sandbox bridge interface](./cross-scripting-content-in-different-security-sandboxes.md#setting-up-a-sandbox-bridge-interface).

## eval() function

In the application sandbox, the `eval()` function can only be used before the
page `load` event or during a `load` event handler. After the page has loaded,
calls to `eval()` will not execute code. However, in the following cases, you
can rewrite your code to avoid the use of `eval()`.

## Assigning properties to an object

Instead of parsing a string to build the property accessor:

```
eval("obj." + propName + " = " + val);
```

access properties with bracket notation:

```
obj[propName] = val;
```

## Creating a function with variables available in context

Replace statements such as the following:

```
function compile(var1, var2){
	eval("var fn = function(){ this." + var1 + "(var2) }");
	return fn;
}
```

with:

```
function compile(var1, var2) {
	var self = this;
	return function(){ self[var1](var2) };
}
```

## Creating an object using the name of the class as a string parameter

Consider a hypothetical JavaScript class defined with the following code:

```
var CustomClass =
{
    Utils:
    {
        Parser: function(){ alert('constructor') }
    },
    Data:
    {

    }
};
var constructorClassName = "CustomClass.Utils.Parser";
```

The simplest way to create a instance would be to use `eval()`:

```
var myObj;
eval('myObj=new ' + constructorClassName +'()')
```

However, you could avoid the call to `eval()` by parsing each component of the
class name and building the new object using bracket notation:

```
function getter(str)
{
	var obj = window;
	var names = str.split('.');
	for(var i=0;i<names.length;i++) {
		if(typeof obj[names[i]]=='undefined') {
			var undefstring = names[0];
			for(var j=1;j<=i;j++)
				undefstring+="."+names[j];
			throw new Error(undefstring+" is undefined");
		}
		obj = obj[names[i]];
	}
	return obj;
}
```

To create the instance, use:

```
try {
var Parser = getter(constructorClassName);
var a = new Parser();
} catch(e) {
    alert(e);
}
```

## setTimeout() and setInterval()

Replace the string passed as the handler function with a function reference or
object. For example, replace a statement such as:

```
setTimeout("alert('Timeout')", 100);
```

with:

```
setTimeout(function(){alert('Timeout')}, 100);
```

Or, when the function requires the `this` object to be set by the caller,
replace a statement such as:

```
this.appTimer = setInterval("obj.customFunction();", 100);
```

with the following:

```
var _self = this;
this.appTimer = setInterval(function(){obj.customFunction.apply(_self);}, 100);
```

## Function constructor

Calls to `new Function(param, body)` can be replaced with an inline function
declaration or used only before the page `load` event has been handled.

## javascript: URLs

The code defined in a link using the javascript: URL scheme is ignored in the
application sandbox. No unsafe JavaScript error is generated. You can replace
links using javascript: URLs, such as:

```
<a href="javascript:code()">Click Me</a>
```

with:

```
<a href="#" onclick="code()">Click Me</a>
```

## Event callbacks assigned through onevent attributes in innerHTML and outerHTML statements

When you use innerHTML or outerHTML to add elements to the DOM of a document,
any event callbacks assigned within the statement, such as `onclick` or
`onmouseover`, are ignored. No security error is generated. Instead, you can
assign an `id` attribute to the new elements and set the event handler callback
functions using the `addEventListener()` method.

For example, given a target element in a document, such as:

```
<div id="container"></div>
```

Replace statements such as:

```
document.getElementById('container').innerHTML =
	'<a href="#" onclick="code()">Click Me.</a>';
```

with:

```
document.getElementById('container').innerHTML = '<a href="#" id="smith">Click Me.</a>';
document.getElementById('smith').addEventListener("click", function() { code(); });
```

## Loading JavaScript files from outside the application installation directory

Loading script files from outside the application sandbox is not permitted. No
security error is generated. All script files that run in the application
sandbox must be installed in the application directory. To use external scripts
in a page, you must map the page to a different sandbox. See
[Loading application content into a non-application sandbox](./cross-scripting-content-in-different-security-sandboxes.md#loading-application-content-into-a-non-application-sandbox).

## document.write() and document.writeln()

Calls to `document.write()` or `document.writeln()` are ignored after the page
`load` event has been handled. No security error is generated. As an
alternative, you can load a new file, or replace the body of the document using
DOM manipulation techniques.

## Synchronous XMLHttpRequests before the load event or during a load event handler

Synchronous XMLHttpRequests initiated before the page `load` event or during a
`load` event handler do not return any content. Asynchronous XMLHttpRequests can
be initiated, but do not return until after the `load` event. After the `load`
event has been handled, synchronous XMLHttpRequests behave normally.

## Dynamically created script elements

Dynamically created script elements, such as when created with innerHTML or
`document.createElement()` method are ignored.
