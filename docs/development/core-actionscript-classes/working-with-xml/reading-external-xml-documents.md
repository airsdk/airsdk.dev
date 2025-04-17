---
title: Reading external XML documents
sidebar_position: 11
---

You can use the URLLoader class to load XML data from a URL. To use the following code in your applications, replace the `XML_URL` value in the example with a valid URL:

```actionscript
import flash.events.Event;
import flash.net.URLLoader;

var myXML:XML = new XML();
var XML_URL:String = "http://www.example.com/Sample3.xml";
var myXMLURL:URLRequest = new URLRequest(XML_URL);
var myLoader:URLLoader = new URLLoader(myXMLURL);
myLoader.addEventListener(Event.COMPLETE, xmlLoaded);

function xmlLoaded(event:Event):void
{
```
myXML = XML(myLoader.data);
trace("Data loaded.");
```

}
```

You can also use the XMLSocket class to set up an asynchronous XML socket connection with a server. For more information, see the [ActionScript 3.0 Reference for the Adobe Flash Platform](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html) .
