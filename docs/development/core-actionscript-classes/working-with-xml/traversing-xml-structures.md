---
title: Traversing XML structures
sidebar_position: 8
---

One of the powerful features of XML is its ability to provide complex, nested data via a linear string of text characters. When you load data into an XML object, ActionScript parses the data and loads its hierarchical structure into memory (or it sends a run-time error if the XML data is not well formed).

The operators and methods of the `XML` and `XMLList` objects make it easy to traverse the structure of XML data.

Use the dot (.) operator and the descendent accessor (..) operator to access child properties of an XML object. Consider the following XML object:

```actionscript
var myXML:XML =
    <order>
        <book ISBN="0942407296">
            <title>Baking Extravagant Pastries with Kumquats</title>
            <author>
                <lastName>Contino</lastName>
                <firstName>Chuck</firstName>
            </author>
            <pageCount>238</pageCount>
        </book>
        <book ISBN="0865436401">
            <title>Emu Care and Breeding</title>
            <editor>
                <lastName>Case</lastName>
                <firstName>Justin</firstName>
            </editor>
            <pageCount>115</pageCount>
        </book>
    </order>
```

The object `myXML.book` is an `XMLList` object containing child properties of the `myXML` object that have the name book . These are two XML objects, matching the two book properties of the myXML object.

The object `myXML..lastName` is an `XMLList` object containing any descendent properties with the name lastName . These are two XML objects, matching the two lastName of the myXML object.

The object `myXML.book.editor.lastName` is an `XMLList` object containing any children with the name lastName of children with the name editor of children with the name book of the `myXML` object: in this case, an XMLList object containing only one XML object (the lastName property with the value " Case ").

## Accessing parent and child nodes

The `parent()` method returns the parent of an XML object.

You can use the ordinal index values of a child list to access specific child objects. For example, consider an XML object `myXML` that has two child properties named book . Each child property named book has an index number associated with it:

```actionscript
myXML.book[0]
myXML.book[1]
```

To access a specific grandchild, you can specify index numbers for both the child and grandchild names:

```actionscript
myXML.book[0].title[0]
```

However, if there is only one child of `x.book[0]` that has the name `title` , you can omit the `index` reference, as follows:

```actionscript
myXML.book[0].title
```

Similarly, if there is only one book child of the object `x` , and if that child object has only one `title` object, you can omit both `index` references, like this:

```actionscript
myXML.book.title
```

You can use the `child()` method to navigate to children with names based on a variable or expression, as the following example shows:

```actionscript
var myXML:XML =
        <order>
            <book>
                <title>Dictionary</title>
            </book>
        </order>;

var childName:String = "book";

trace(myXML.child(childName).title) // output: Dictionary
```

## Accessing attributes

Use the `@` symbol (the attribute identifier operator) to access attributes in an `XML` or `XMLList` object, as shown in the following code:

```actionscript
var employee:XML =
    <employee id="6401" code="233">
        <lastName>Wu</lastName>
        <firstName>Erin</firstName>
    </employee>;
trace(employee.@id); // 6401
```

You can use the `* `wildcard symbol with the `@` symbol to access all attributes of an `XML` or `XMLList` object, as in the following code:

```actionscript
var employee:XML =
    <employee id="6401" code="233">
        <lastName>Wu</lastName>
        <firstName>Erin</firstName>
    </employee>;
trace(employee.@*.toXMLString());
// 6401
// 233
```

You can use the `attribute()` or `attributes()` method to access a specific attribute or all attributes of an `XML` or `XMLList` object, as in the following code:

```actionscript
var employee:XML =
    <employee id="6401" code="233">
        <lastName>Wu</lastName>
        <firstName>Erin</firstName>
    </employee>;
trace(employee.attribute("id")); // 6401
trace(employee.attribute("*").toXMLString());
// 6401
// 233
trace(employee.attributes().toXMLString());
// 6401
// 233
```

Note that you can also use the following syntax to access attributes, as the following example shows:

```actionscript
employee.attribute("id")
employee["@id"]
employee.@["id"]
```

These are each equivalent to `employee.@id` . However, the syntax `employee.@id` is the preferred approach.

## Filtering by attribute or element value

You can use the parentheses operators — ( and ) — to filter elements with a specific element name or attribute value. Consider the following XML object:

```actionscript
var x:XML =
    <employeeList>
        <employee id="347">
            <lastName>Zmed</lastName>
            <firstName>Sue</firstName>
            <position>Data analyst</position>
        </employee>
        <employee id="348">
            <lastName>McGee</lastName>
            <firstName>Chuck</firstName>
            <position>Jr. data analyst</position>
        </employee>
    </employeeList>
```

The following expressions are all valid:

- `x.employee.(lastName == "McGee")` — This is the second employee node.
- `x.employee.(lastName == "McGee").firstName` — This is the firstName property of the second employee node.
- `x.employee.(lastName == "McGee").@id` — This is the value of the id attribute of the second employee node.
- `x.employee.(@id == 347)` — The first employee node.
- `x.employee.(@id == 347).lastName` — This is the lastName property of the first employee node.
- `x.employee.(@id > 300)` — This is an XMLList with both employee properties.
- `x.employee.(position.toString().search("analyst") > -1)` — This is an XMLList with both position properties.

If you try to filter on attributes or elements that do not exist, an exception is thrown. For example, the final line of the following code generates an error, because there is no `id` attribute in the second `p` element:

```actionscript
var doc:XML =
            <body>
                <p id='123'>Hello, <b>Bob</b>.</p>
                <p>Hello.</p>
            </body>;
trace(doc.p.(@id == '123'));
```

Similarly, the final line of following code generates an error because there is no b property of the second p element:

```actionscript
var doc:XML =
            <body>
                <p id='123'>Hello, <b>Bob</b>.</p>
                <p>Hello.</p>
            </body>;
trace(doc.p.(b == 'Bob'));
```

To avoid these errors, you can identify the properties that have the matching attributes or elements by using the `attribute()` and `elements()` methods, as in the following code:

```actionscript
var doc:XML =
            <body>
                <p id='123'>Hello, <b>Bob</b>.</p>
                <p>Hello.</p>
            </body>;
trace(doc.p.(attribute('id') == '123'));
trace(doc.p.(elements('b') == 'Bob'));
```

You can also use the `hasOwnProperty()` method, as in the following code:

```actionscript
var doc:XML =
            <body>
                <p id='123'>Hello, <b>Bob</b>.</p>
                <p>Hello.</p>
            </body>;
trace(doc.p.(hasOwnProperty('@id') && @id == '123'));
trace(doc.p.(hasOwnProperty('b') && b == 'Bob'));
```

## Using the for..in and the for each..in statements

ActionScript 3.0 includes the `for..in` statement and the `for each..in` statement for iterating through XMLList objects. For example, consider the following XML object, `myXML` , and the XMLList object, `myXML.item` . The XMLList object, `myXML.item`, consists of the two `item` nodes of the XML object.

```actionscript
var myXML:XML =
    <order>
        <item id='1' quantity='2'>
            <menuName>burger</menuName>
            <price>3.95</price>
        </item>
        <item id='2' quantity='2'>
            <menuName>fries</menuName>
            <price>1.45</price>
        </item>
    </order>;
```

The `for..in` statement lets you iterate over a set of property names in an XMLList:

```actionscript
var total:Number = 0;
for (var pname:String in myXML.item)
{
    total += myXML.item.@quantity[pname] * myXML.item.price[pname];
}
```

The `for each..in` statement lets you iterate through the properties in the XMLList:

```actionscript
var total2:Number = 0;
for each (var prop:XML in myXML.item)
{
    total2 += prop.@quantity * prop.price;
}
```
