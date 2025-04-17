---
sidebar_position: 3
---

# Using the ExternalInterface class

Communication between ActionScript and the container application can take one of
two forms: either ActionScript can call code (such as a JavaScript function)
defined in the container, or code in the container can call an ActionScript
function that has been designated as being callable. In either case, information
can be sent to the code being called, and results can be returned to the code
making the call.

To facilitate this communication, the ExternalInterface class includes two
static properties and two static methods. These properties and methods are used
to obtain information about the external interface connection, to execute code
in the container from ActionScript, and to make ActionScript functions available
to be called by the container.

## Getting information about the external container

The `ExternalInterface.available` property indicates whether the current Flash
Player is in a container that offers an external interface. If the external
interface is available, this property is `true` ; otherwise, it is `false`.
Before using any of the other functionality in the ExternalInterface class, you
should always check to make sure that the current container supports external
interface communication, as follows:

```
if (ExternalInterface.available)
{
	// Perform ExternalInterface method calls here.
}
```

Note: The `ExternalInterface.available` property reports whether the current
container is a type that supports ExternalInterface connectivity. It doesn't
tell you if JavaScript is enabled in the current browser.

The `ExternalInterface.objectID` property allows you to determine the unique
identifier of the Flash Player instance (specifically, the `id` attribute of the
`object` tag in Internet Explorer or the `name` attribute of the `embed` tag in
browsers using the NPRuntime interface). This unique ID represents the current
SWF document in the browser, and can be used to make reference to the SWF
document—for example, when calling a JavaScript function in a container HTML
page. When the Flash Player container is not a web browser, this property is
`null`.

## Calling external code from ActionScript

The `ExternalInterface.call()` method executes code in the container
application. It requires at least one parameter, a string containing the name of
the function to be called in the container application. Any additional
parameters passed to the `ExternalInterface.call()` method are passed along to
the container as parameters of the function call.

```
// calls the external function "addNumbers"
// passing two parameters, and assigning that function's result
// to the variable "result"
var param1:uint = 3;
var param2:uint = 7;
var result:uint = ExternalInterface.call("addNumbers", param1, param2);
```

If the container is an HTML page, this method invokes the JavaScript function
with the specified name, which must be defined in a `script` element in the
containing HTML page. The return value of the JavaScript function is passed back
to ActionScript.

```
<script language="JavaScript">
	// adds two numbers, and sends the result back to ActionScript
	function addNumbers(num1, num2)
	{
		return (num1 + num2);
	}
</script>
```

If the container is some other ActiveX container, this method causes the Flash
Player ActiveX control to dispatch its `FlashCall` event. The specified function
name and any parameters are serialized into an XML string by Flash Player. The
container can access that information in the `request` property of the event
object and use it to determine how to execute its own code. To return a value to
ActionScript, the container code calls the ActiveX object's `SetReturnValue()`
method, passing the result (serialized into an XML string) as a parameter of
that method. For more information about the XML format used for this
communication, see
[The external API's XML format](#the-external-apis-xml-format).

Whether the container is a web browser or another ActiveX container, if the call
fails or the container method does not specify a return value, `null` is
returned. The `ExternalInterface.call()` method throws a SecurityError exception
if the containing environment belongs to a security sandbox to which the calling
code does not have access. You can work around this by setting an appropriate
value for `allowScriptAccess` in the containing environment. For example, to
change the value of `allowScriptAccess` in an HTML page, you would edit the
appropriate attribute in the `object` and `embed` tags.

## Calling ActionScript code from the container

A container can only call ActionScript code that's in a function—no other
ActionScript code can be called by a container. To call an ActionScript function
from the container application, you must do two things: register the function
with the ExternalInterface class, and then call it from the container's code.

First, you must register your ActionScript function to indicate that it should
be made available to the container. Use the `ExternalInterface.addCallback()`
method, as follows:

```
function callMe(name:String):String
{
	return "busy signal";
}
ExternalInterface.addCallback("myFunction", callMe);
```

The `addCallback()` method takes two parameters. The first, a function name as a
String, is the name by which the function will be known to the container. The
second parameter is the actual ActionScript function that will be executed when
the container calls the defined function name. Because these names are distinct,
you can specify a function name that will be used by the container, even if the
actual ActionScript function has a different name. This is especially useful if
the function name is not known—for example, if an anonymous function is
specified, or if the function to be called is determined at run time.

Once an ActionScript function has been registered with the ExternalInterface
class, the container can actually call the function. How this is done varies
according to the type of container. For example, in JavaScript code in a web
browser, the ActionScript function is called using the registered function name
as though it's a method of the Flash Player browser object (that is, a method of
the JavaScript object representing the `object` or `embed` tag). In other words,
parameters are passed and a result is returned as though a local function is
being called.

```
<script language="JavaScript">
	// callResult gets the value "busy signal"
	var callResult = flashObject.myFunction("my name");
</script>
...
<object id="flashObject"...>
	...
	<embed name="flashObject".../>
</object>
```

Alternatively, when calling an ActionScript function in a SWF file running in a
desktop application, the registered function name and any parameters must be
serialized into an XML-formatted string. Then the call is actually performed by
calling the `CallFunction()` method of the ActiveX control with the XML string
as a parameter. For more information about the XML format used for this
communication, see
[The external API's XML format](#the-external-apis-xml-format).

In either case, the return value of the ActionScript function is passed back to
the container code, either directly as a value when the caller is JavaScript
code in a browser, or serialized as an XML-formatted string when the caller is
an ActiveX container.

## The external API's XML format

Communication between ActionScript and an application hosting the Shockwave
Flash ActiveX control uses a specific XML format to encode function calls and
values. There are two parts to the XML format used by the external API. One
format is used to represent function calls. Another format is used to represent
individual values; this format is used for parameters in functions as well as
function return values. The XML format for function calls is used for calls to
and from ActionScript. For a function call from ActionScript, Flash Player
passes the XML to the container; for a call from the container, Flash Player
expects the container application to pass it an XML string in this format. The
following XML fragment shows an example XML-formatted function call:

```
<invoke name="functionName" returntype="xml">
	<arguments>
		... (individual argument values)
	</arguments>
</invoke>
```

The root node is the `invoke` node. It has two attributes: `name` indicates the
name of the function to call, and `returntype` is always `xml`. If the function
call includes parameters, the `invoke` node has a child `arguments` node, whose
child nodes will be the parameter values formatted using the individual value
format explained next.

Individual values, including function parameters and function return values, use
a formatting scheme that includes data type information in addition to the
actual values. The following table lists ActionScript classes and the XML format
used to encode values of that data type:

<table>
<thead>
    <tr>
        <th><p>ActionScript class/value</p></th>
        <th><p>C# class/value</p></th>
        <th><p>Format</p></th>
        <th><p>Comments</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>null</p></td>
        <td><p>null</p></td>
        <td><p>&lt;null/&gt;</p></td>
        <td></td>
    </tr>
    <tr>
        <td><p>Boolean <samp>true</samp></p></td>
        <td><p>bool true</p></td>
        <td><p>&lt;true/&gt;</p></td>
        <td></td>
    </tr>
    <tr>
        <td><p>Boolean <samp>false</samp></p></td>
        <td><p>bool false</p></td>
        <td><p>&lt;false/&gt;</p></td>
        <td></td>
    </tr>
    <tr>
        <td><p>String</p></td>
        <td><p>string</p></td>
        <td><p>&lt;string&gt;string value&lt;/string&gt;</p></td>
        <td></td>
    </tr>
    <tr>
        <td><p>Number, int, uint</p></td>
        <td><p>single, double, int, uint</p></td>
        <td><div>
        <pre><code>&lt;number&gt;27.5&lt;/number&gt; 
        &lt;number&gt;-12&lt;/number&gt;</code></pre>
        </div></td>
        <td></td>
    </tr>
    <tr>
        <td><p>Array (elements can be mixed types)</p></td>
        <td><p>A collection that allows mixed-type elements, such as ArrayList
        or object[]</p></td>
        <td><div>
        <pre><code>&lt;array&gt; 
        &lt;property id=&quot;0&quot;&gt; 
            &lt;number&gt;27.5&lt;/number&gt; 
        &lt;/property&gt; 
        &lt;property id=&quot;1&quot;&gt; 
            &lt;string&gt;Hello there!&lt;/string&gt; 
        &lt;/property&gt; 
        ... 
        &lt;/array&gt;</code></pre>
        </div></td>
        <td><p>The <samp>property</samp> node defines individual elements, and
        the <samp>id</samp> attribute is the numeric, zero-based index.</p></td>
    </tr>
    <tr>
        <td><p>Object</p></td>
        <td><p>A dictionary with string keys and object values, such as a
        HashTable with string keys</p></td>
        <td><div>
        <pre><code>&lt;object&gt; 
        &lt;property id=&quot;name&quot;&gt; 
            &lt;string&gt;John Doe&lt;/string&gt; 
        &lt;/property&gt; 
        &lt;property id=&quot;age&quot;&gt; 
            &lt;string&gt;33&lt;/string&gt; 
        &lt;/property&gt; 
        ... 
        &lt;/object&gt;</code></pre>
        </div></td>
        <td><p>The <samp>property</samp> node defines individual properties, and
        the <samp>id</samp> attribute is the property name (a string).</p></td>
    </tr>
    <tr>
        <td><p>Other built-in or custom classes</p></td>
        <td></td>
        <td><div>
        <pre><code>&lt;null/&gt; or  
        &lt;object&gt;&lt;/object&gt;</code></pre>
        </div></td>
        <td><p>ActionScript encodes other objects as null or as an empty object.
        In either case any property values are lost.</p></td>
    </tr>
</tbody>
</table>

Note: By way of example, this table shows equivalent C# classes in addition to
ActionScript classes; however, the external API can be used to communicate with
any programming language or run time that supports ActiveX controls, and is not
limited to C# applications.

When you are building your own applications using the external API with an
ActiveX container application, you'll probably find it convenient to write a
proxy that will perform the task of converting native function calls to the
serialized XML format. For an example of a proxy class written in C#, see Inside
the ExternalInterfaceProxy class.
