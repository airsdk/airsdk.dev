---
title: XML type conversion
sidebar_position: 10
---

You can convert XML objects and XMLList objects to String values. Similarly, you can convert strings to XML objects and XMLList objects. Also, keep in mind that all XML attribute values, names, and text values are strings. The following sections discuss all these forms of XML type conversion.

## Converting XML and XMLList objects to strings

The XML and XMLList classes include a `toString()` method and a `toXMLString()` method. The `toXMLString()` method returns a string that includes all tags, attributes, namespace declarations, and content of the XML object. For XML objects with complex content (child elements), the toString() method does exactly the same as the `toXMLString()` method. For XML objects with simple content (those that contain only one text element), the toString() method returns only the text content of the element, as the following example shows:

```actionscript
var myXML:XML =
<order>
    <item id='1' quantity='2'>
        <menuName>burger</menuName>
        <price>3.95</price>
    </item>
<order>;
```

trace(myXML.item[0].menuName.toXMLString());
// <menuName>burger</menuName>

trace(myXML.item[0].menuName.toString());
// burger
```

If you use the `trace()` method without specifying `toString()` or `toXMLString()` , the data is converted using the `toString()` method by default, as this code shows:

```actionscript
var myXML:XML =
<order>
    <item id='1' quantity='2'>
        <menuName>burger</menuName>
        <price>3.95</price>
    </item>
<order>;

trace(myXML.item[0].menuName);
// burger
```

When using the trace() method to debug code, you will often want to use the toXMLString() method so that the trace() method outputs more complete data.

## Converting strings to XML objects

You can use the new XML() constructor to create an XML object from a string, as follows:

```actionscript
var x:XML = new XML("<a>test</a>");
```

If you attempt to convert a string to XML from a string that represents invalid XML or XML that is not well formed, a run-time error is thrown, as follows:

```actionscript
var x:XML = new XML("<a>test"); // throws an error
```

## Converting attribute values, names, and text values from strings

All XML attribute values, names, and text values are String data types, and you may need to convert these to other data types. For example, the following code uses the `Number()` function to convert text values to numbers:

```actionscript
var myXML:XML =
        <order>
            <item>
                <price>3.95</price>
            </item>
            <item>
                <price>1.00</price>
            </item>
        </order>;

var total:XML = <total>0</total>;
myXML.appendChild(total);

for each (var item:XML in myXML.item)
{
    myXML.total.children()[0] = Number(myXML.total.children()[0])
                                                + Number(item.price.children()[0]);
}
trace(myXML.total); // 4.95;
```

If this code did not use the `Number()` function, the code would interpret the `+` operator as the string concatenation operator, and the `trace()` method in the last line would output the following:

```actionscript
01.003.95
```
