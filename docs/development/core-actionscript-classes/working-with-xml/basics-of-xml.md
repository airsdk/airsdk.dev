---
title: Basics of XML
sidebar_position: 2
---

XML is a standard way of representing structured information so that it is easy for computers to work with and reasonably easy for people to write and understand. XML is an abbreviation for eXtensible Markup Language. The XML standard is available at https://www.w3.org/XML/ .

XML offers a standard and convenient way to categorize data, to make it easier to read, access, and manipulate. XML uses a tree structure and tag structure that is similar to HTML. Here is a simple example of XML data:

```xml
<song>
```
<title>What you know?</title>
<artist>Steve and the flubberblubs</artist>
<year>1989</year>
<lastplayed>2006-10-17-08:31</lastplayed>
```

</song>
```

XML data can also be more complex, with tags nested in other tags as well as attributes and other structural components. Here is a more complex example of XML data:

```xml
<album>
```
<title>Questions, unanswered</title>
<artist>Steve and the flubberblubs</artist>
<year>1989</year>
<tracks>
```

        <song tracknumber="1" length="4:05">
            <title>What do you know?</title>
            <artist>Steve and the flubberblubs</artist>
            <lastplayed>2006-10-17-08:31</lastplayed>
        </song>
        <song tracknumber="2" length="3:45">
            <title>Who do you know?</title>
            <artist>Steve and the flubberblubs</artist>
            <lastplayed>2006-10-17-08:35</lastplayed>
        </song>
        <song tracknumber="3" length="5:14">
            <title>When do you know?</title>
            <artist>Steve and the flubberblubs</artist>
            <lastplayed>2006-10-17-08:39</lastplayed>
        </song>
        <song tracknumber="4" length="4:19">
            <title>Do you know?</title>
            <artist>Steve and the flubberblubs</artist>
            <lastplayed>2006-10-17-08:44</lastplayed>
        </song>
```
</tracks>
```

</album>
```

Notice that this XML document contains other complete XML structures within it (such as the song tags with their children). It also demonstrates other XML structures such as attributes ( tracknumber and length in the song tags), and tags that contain other tags rather than containing data (such as the tracks tag).

## Getting started with XML

If you have little or no experience with XML, here is a brief description of the most common aspects of XML data. XML data is written in plain-text form, with a specific syntax for organizing the information into a structured format. Generally, a single set of XML data is known as an XML document . In XML format, data is organized into elements (which can be single data items or containers for other elements) using a hierarchical structure. Every XML document has a single element as the top level or main item; inside this root element there may be a single piece of information, although there are more likely to be other elements, which in turn contain other elements, and so forth. For example, this XML document contains the information about a music album:

```xml
<song tracknumber="1" length="4:05">
```
<title>What do you know?</title>
<artist>Steve and the flubberblubs</artist>
<mood>Happy</mood>
<lastplayed>2006-10-17-08:31</lastplayed>
```

</song>
```

Each element is distinguished by a set of tags —the element’s name wrapped in angle brackets (less-than and greater-than signs). The opening tag, indicating the start of the element, has the element name:

```xml
<title>
```

The closing tag, which marks the end of the element, has a forward slash before the element’s name:

```xml
</title>
```

If an element contains no content, it can be written as an empty element (sometimes called a self-closing element). In XML, this element:

```xml
<lastplayed/>
```

is identical to this element:

```xml
<lastplayed></lastplayed>
```

In addition to the element’s content contained between the opening and closing tags, an element can also include other values, known as attributes , defined in the element’s opening tag. For example, this XML element defines a single attribute named length , with the value "4:19" :

```xml
<song length="4:19"></song>
```

Each XML element has content, which is either a single value, one or more XML elements, or nothing (for an empty element).

## Learning more about XML

To learn more about working with XML, there are a number of additional books and resources for learning more about XML, including these web sites:

- W3Schools XML Tutorial: http://w3schools.com/xml/
- XMLpitstop tutorials, discussion lists, and more: http://xmlpitstop.com/

## ActionScript classes for working with XML

ActionScript 3.0 includes several classes that are used for working with XML-structured information. The two main classes are as follows:

- `XML`: Represents a single XML element, which can be an XML document with multiple children or a single-value element within a document.
- `XMLList`: Represents a set of XML elements. An XMLList object is used when there are multiple XML elements that are “siblings” (at the same level, and contained by the same parent, in the XML document’s hierarchy). For instance, an XMLList instance would be the easiest way to work with this set of XML elements (presumably contained in an XML document):

```xml
<artist type="composer">Fred Wilson</artist>
<artist type="conductor">James Schmidt</artist>
<artist type="soloist">Susan Harriet Thurndon</artist>
```

For more advanced uses involving XML namespaces, ActionScript also includes the Namespace and QName classes. For more information, see [Using XML namespaces](using-xml-namespaces.md).

In addition to the built-in classes for working with XML, ActionScript 3.0 also includes several operators that provide specific functionality for accessing and manipulating XML data. This approach to working with XML using these classes and operators is known as ECMAScript for XML (E4X), as defined by the ECMA-357 edition 2 specification.

## Important concepts and terms

The following reference list contains important terms you will encounter when programming XML handling routines:

- **Element** A single item in an XML document, identified as the content contained between a starting tag and an ending tag (including the tags). XML elements can contain text data or other elements, or can be empty.
- **Empty element** An XML element that contains no child elements. Empty elements are often written as self-closing tags (such as `<element/>`).
- **Document** A single XML structure. An XML document can contain any number of elements (or can consist only of a single empty element); however, an XML document must have a single top-level element that contains all the other elements in the document.
- **Node** Another name for an XML element.
- **Attribute** A named value associated with an element that is written into the opening tag of the element in `attributename="value"` format, rather than being written as a separate child element nested inside the element.
