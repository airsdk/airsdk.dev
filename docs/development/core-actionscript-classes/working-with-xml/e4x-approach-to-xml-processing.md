---
title: The E4X approach to XML processing
sidebar_position: 3
---

The ECMAScript for XML specification defines a set of classes and functionality for working with XML data. These classes and functionality are known collectively as E4X. ActionScript 3.0 includes the following E4X classes: XML, XMLList, QName, and Namespace.

The methods, properties, and operators of the E4X classes are designed with the following goals:

- Simplicity - Where possible, E4X makes it easier to write and understand code for working with XML data.
- Consistency - The methods and reasoning behind E4X are internally consistent and consistent with other parts of ActionScript.
- Familiarity - You manipulate XML data with well-known operators, such as the dot ( . ) operator.

:::note
There is a different XML class in ActionScript 2.0. In ActionScript 3.0 that class has been renamed as `XMLDocument`, so that the name does not conflict with the ActionScript 3.0 XML class that is part of E4X. In ActionScript 3.0, the legacy classes—XMLDocument, XMLNode, XMLParser, and XMLTag—are included in the flash.xml package primarily for legacy support. The new E4X classes are core classes; you need not import a package to use them. For details on the legacy ActionScript 2.0 XML classes, see the [flash.xml package](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/xml/package-detail.html) in the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html) .
:::

Here is an example of manipulating data with E4X:

```actionscript
var myXML:XML =
```
<order>
```

        <item id='1'>
            <menuName>burger</menuName>
            <price>3.95</price>
        </item>
        <item id='2'>
            <menuName>fries</menuName>
            <price>1.45</price>
        </item>
```
</order>
```

```

Often, your application will load XML data from an external source, such as a web service or a RSS feed. However, for clarity, the code examples provided here assign XML data as literals.

As the following code shows, E4X includes some intuitive operators, such as the dot ( . ) and attribute identifier ( @ ) operators, for accessing properties and attributes in the XML:

```actionscript
trace(myXML.item[0].menuName); // Output: burger
trace(myXML.item.(@id==2).menuName); // Output: fries
trace(myXML.item.(menuName=="burger").price); // Output: 3.95
```

Use the appendChild() method to assign a new child node to the XML, as the following snippet shows:

```actionscript
var newItem:XML =
```
<item id="3">
```

        <menuName>medium cola</menuName>
        <price>1.25</price>
```
</item>
```

myXML.appendChild(newItem);
```

Use the `@` and `.` operators not only to read data, but also to assign data, as in the following:

```actionscript
myXML.item[0].menuName="regular burger";
myXML.item[1].menuName="small fries";
myXML.item[2].menuName="medium cola";

myXML.item.(menuName=="regular burger").@quantity = "2";
myXML.item.(menuName=="small fries").@quantity = "2";
myXML.item.(menuName=="medium cola").@quantity = "2";
```

Use a for loop to iterate through nodes of the XML, as follows:

```actionscript
var total:Number = 0;
for each (var property:XML in myXML.item)
{
```
var q:int = Number(property.@quantity);
var p:Number = Number(property.price);
var itemTotal:Number = q \* p;
total += itemTotal;
trace(q + " " + property.menuName + " $" + itemTotal.toFixed(2))
```

}
trace("Total: $", total.toFixed(2));
```
