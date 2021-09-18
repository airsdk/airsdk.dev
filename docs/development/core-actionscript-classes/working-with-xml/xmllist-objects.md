---
title: XMLList objects
sidebar_position: 5
---

An `XMLList` instance represents an arbitrary collection of `XML` objects. It can contain full XML documents, XML fragments, or the results of an XML query.

The following methods allow you to work with the hierarchical structure of XMLList objects:

- child()
- children()
- descendants()
- elements()
- parent()

The following methods allow you to work with XMLList object attributes:

- attribute()
- attributes()

The following methods allow you to you work with XMLList properties:

- hasOwnProperty()
- propertyIsEnumerable()

The following methods are for working with and determining certain types of XML content:

- comments()
- hasComplexContent()
- hasSimpleContent()
- processingInstructions()
- text()

The following are for conversion to strings and for formatting the XMLList object:

- normalize()
- toString()
- toXMLString()

There are a few additional methods:

- contains()
- copy()
- length()
- valueOf()

For details on these methods, see the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

For an XMLList object that contains exactly one XML element, you can use all properties and methods of the XML class, because an XMLList with one XML element is treated the same as an XML object. For example, in the following code, because doc.div is an XMLList object containing one element, you can use the appendChild() method from the XML class:

```actionscript
var doc:XML =
    <body>
        <div>
            <p>Hello</p>
        </div>
    </body>;
doc.div.appendChild(<p>World</p>);
```

For a list of XML properties and methods, see [XML objects](xml-objects) .
