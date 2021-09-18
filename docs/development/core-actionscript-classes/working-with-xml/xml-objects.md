---
title: XML objects
sidebar_position: 4
---

An `XML` object may represent an XML element, attribute, comment, processing instruction, or text element.

An XML object is classified as having either simple content or complex content . An XML object that has child nodes is classified as having complex content. An XML object is said to have simple content if it is any one of the following: an attribute, a comment, a processing instruction, or a text node.

For example, the following XML object contains complex content, including a comment and a processing instruction:

```actionscript
XML.ignoreComments = false;
XML.ignoreProcessingInstructions = false;
var x1:XML =
    <order>
        <!--This is a comment. -->
        <?PROC_INSTR sample ?>
        <item id='1'>
            <menuName>burger</menuName>
            <price>3.95</price>
        </item>
        <item id='2'>
            <menuName>fries</menuName>
            <price>1.45</price>
        </item>
    </order>
```

As the following example shows, you can now use the comments() and processingInstructions() methods to create new XML objects, a comment and a processing instruction:

```actionscript
var x2:XML = x1.comments()[0];
var x3:XML = x1.processingInstructions()[0];
```

## XML properties

The XML class has five static properties:

- The `ignoreComments` and `ignoreProcessingInstructions` properties determine whether comments or processing instructions are ignored when the XML object is parsed.
- The `ignoreWhitespace` property determines whether white space characters are ignored in element tags and embedded expressions that are separated only by white space characters.
- The `prettyIndent` a nd `prettyPrinting` properties are used to format the text that is returned by the `toString()` and `toXMLString()` methods of the XML class.

For details on these properties, see the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

## XML methods

The following methods allow you to work with the hierarchical structure of XML objects:

- `appendChild()`
- `child()`
- `childIndex()`
- `children()`
- `descendants()`
- `elements()`
- `insertChildAfter()`
- `insertChildBefore()`
- `parent()`
- `prependChild()`

The following methods allow you to work with XML object attributes:

- `attribute()`
- `attributes()`

The following methods allow you to you work with XML object properties:

- `hasOwnProperty()`
- `propertyIsEnumerable()`
- `replace()`
- `setChildren()`

The following methods are for working with qualified names and namespaces:

- `addNamespace()`
- `inScopeNamespaces()`
- `localName()`
- `name()`
- `namespace()`
- `namespaceDeclarations()`
- `removeNamespace()`
- `setLocalName()`
- `setName()`
- `setNamespace()`

The following methods are for working with and determining certain types of XML content:

- `comments()`
- `hasComplexContent()`
- `hasSimpleContent()`
- `nodeKind()`
- `processingInstructions()`
- `text()`

The following methods are for conversion to strings and for formatting XML objects:

- `defaultSettings()`
- `setSettings()`
- `settings()`
- `normalize()`
- `toString()`
- `toXMLString()`

There are a few additional methods:

- `contains()`
- `copy()`
- `valueOf()`
- `length()`

For details on these methods, see the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).
