---
title: Initializing XML variables
sidebar_position: 6
---

You can assign an XML literal to an XML object, as follows:

```actionscript
var myXML:XML =
    <order>
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

As the following snippet shows, you can also use the new constructor to create an instance of an XML object from a string that contains XML data:

```actionscript
var str:String = "<order><item id='1'><menuName>burger</menuName>" + "<price>3.95</price></item></order>";
var myXML:XML = new XML(str);
```

If the XML data in the string is not well formed (for example, if a closing tag is missing), you will see a run-time error.

You can also pass data by reference (from other variables) into an XML object, as the following example shows:

```actionscript
var tagname:String = "item";
var attributename:String = "id";
var attributevalue:String = "5";
var content:String = "Chicken";
var x:XML = <{tagname} {attributename}={attributevalue}>{content}</{tagname}>;
trace(x.toXMLString())
// Output: <item id="5">Chicken</item>
```

To load XML data from a URL, use the URLLoader class, as the following example shows:

```actionscript
import flash.events.Event;
import flash.net.URLLoader;
import flash.net.URLRequest;

var externalXML:XML;
var loader:URLLoader = new URLLoader();
var request:URLRequest = new URLRequest("xmlFile.xml");
loader.load(request);
loader.addEventListener(Event.COMPLETE, onComplete);

function onComplete(event:Event):void
{
    var loader:URLLoader = event.target as URLLoader;
    if (loader != null)
    {
        externalXML = new XML(loader.data);
        trace(externalXML.toXMLString());
    }
    else
    {
        trace("loader is not a URLLoader!");
    }
}
```

To read XML data from a socket connection, use the XMLSocket class. For more information, see the XMLSocket class in the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).
