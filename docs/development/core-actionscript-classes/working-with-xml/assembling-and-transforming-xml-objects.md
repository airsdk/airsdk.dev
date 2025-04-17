---
title: Assembling and transforming XML objects
sidebar_position: 7
---

Use the `prependChild()` method or the `appendChild()` method to add a property to the beginning or end of an `XML` object’s list of properties, as the following example shows:

```actionscript
var x1:XML = <p>Line 1</p>
var x2:XML = <p>Line 2</p>
var x:XML = <body></body>
x = x.appendChild(x1);
x = x.appendChild(x2);
x = x.prependChild(<p>Line 0</p>);
```
// x == <body><p>Line 0</p><p>Line 1</p><p>Line 2</p></body>
```

```

Use the `insertChildBefore()` method or the `insertChildAfter()` method to add a property before or after a specified property, as follows:

```actionscript
var x:XML =
    <body>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </body>

var newNode:XML = <p>Paragraph 1.5</p>
x = x.insertChildAfter(x.p[0], newNode)
x = x.insertChildBefore(x.p[2], <p>Paragraph 1.75</p>)
```

As the following example shows, you can also use curly brace operators `{` and `}` to pass data by reference (from other variables) when constructing XML objects:

```actionscript
var ids:Array = [121, 122, 123];
var names:Array = [["Murphy","Pat"], ["Thibaut","Jean"], ["Smith","Vijay"]]
var x:XML = new XML("<employeeList></employeeList>");

for (var i:int = 0; i < 3; i++)
{
    var newnode:XML = new XML();
    newnode =
        <employee id={ids[i]}>
            <last>{names[i][0]}</last>
            <first>{names[i][1]}</first>
        </employee>;

    x = x.appendChild(newnode)
}
```

You can assign properties and attributes to an XML object by using the = operator, as in the following:

```actionscript
var x:XML =
    <employee>
        <lastname>Smith</lastname>
    </employee>
x.firstname = "Jean";
x.@id = "239";
```

This sets the XML object x to the following:

```xml
<employee id="239">
<lastname>Smith</lastname>
<firstname>Jean</firstname>
</employee>
```

You can use the `+` and `+=` operators to concatenate XMLList objects:

```actionscript
var x1:XML = <a>test1</a>
var x2:XML = <b>test2</b>
var xList:XMLList = x1 + x2;
xList += <c>test3</c>
```

This sets the XMLList object xList to the following:

```xml
<a>test1</a>
<b>test2</b>
<c>test3</c>
```
