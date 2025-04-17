---
title: XML in ActionScript example - Loading RSS data from the Internet
sidebar_position: 12
---

TODO Needs the code reference updated

The RSSViewer sample application shows a number of features of working with XML in ActionScript, including the following:

- Using XML methods to traverse XML data in the form of an RSS feed.
- Using XML methods to assemble XML data in the form of HTML to use in a text field.

The RSS format is widely used to syndicate news via XML. A simple RSS data file may look like the following:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>Alaska - Weather</title>
<link>http://www.nws.noaa.gov/alerts/ak.html</link>
<description>Alaska - Watches, Warnings and Advisories</description>

<item>
    <title>
        Short Term Forecast - Taiya Inlet, Klondike Highway (Alaska)
    </title>
    <link>
        http://www.nws.noaa.gov/alerts/ak.html#A18.AJKNK.1900
    </link>
    <description>
        Short Term Forecast Issued At: 2005-04-11T19:00:00
        Expired At: 2005-04-12T01:00:00 Issuing Weather Forecast Office
        Homepage: http://pajk.arh.noaa.gov
    </description>
</item>
<item>
    <title>
        Short Term Forecast - Haines Borough (Alaska)
    </title>
        <link>
        http://www.nws.noaa.gov/alerts/ak.html#AKZ019.AJKNOWAJK.190000
    </link>
    <description>
        Short Term Forecast Issued At: 2005-04-11T19:00:00
        Expired At: 2005-04-12T01:00:00 Issuing Weather Forecast Office
        Homepage: http://pajk.arh.noaa.gov
    </description>
</item>
</channel>
</rss>
```

The SimpleRSS application reads RSS data from the Internet, parses the data for headlines (titles), links, and descriptions, and returns that data. The SimpleRSSUI class provides the UI and calls the SimpleRSS class, which does all of the XML processing.

To get the application files for this sample, see www.adobe.com/go/learn_programmingAS3samples_flash . The RSSViewer application files can be found in the folder Samples/RSSViewer. The application consists of the following files:

| File                                              | Description                                                                                                                                                                                                                                                                |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RSSViewer.mxml or RSSViewer.fla                   | The main application file in Flash (FLA) or Flex (MXML).                                                                                                                                                                                                                   |
| com/example/programmingas3/rssViewer/RSSParser.as | A class that contains methods that use E4X to traverse RSS (XML) data and generate a corresponding HTML representation.                                                                                                                                                    |
| RSSData/ak.rss                                    | A sample RSS file. The application is set up to read RSS data from the web, at a Flex RSS feed hosted by Adobe. However, you can easily change the application to read RSS data from this document, which uses a slightly different schema than that of the Flex RSS feed. |

## Reading and parsing XML data

The RSSParser class includes an `xmlLoaded()` method that converts the input RSS data, stored in the rssXML variable, into an string containing HTML-formatted output, `rssOutput` .

Near the beginning of the method, code sets the default XML namespace if the source RSS data includes a default namespace:

```actionscript
if (rssXML.namespace("") != undefined)
{
    default xml namespace = rssXML.namespace("");
}
```

The next lines then loop through the contents of the source XML data, examining each descendant property named item :

```actionscript
for each (var item:XML in rssXML..item)
{
    var itemTitle:String = item.title.toString();
    var itemDescription:String = item.description.toString();
    var itemLink:String = item.link.toString();
    outXML += buildItemHTML(itemTitle,
                            itemDescription,
                            itemLink);
}
```

The first three lines simply set string variables to represent the title, description and link properties of the item property of the XML data. The next line then calls the `buildItemHTML()` method to get HTML data in the form of an `XMLList` object, using the three new string variables as parameters.

## Assembling XMLList data

The HTML data (an XMLList object) is of the following form:

```xml
<b>itemTitle</b>
<p>
    itemDescription
    <br />
    <a href="link">
            <font color="#008000">More...</font>
    </a>
</p>
```

The first lines of the method clear the default xml namespace:

```actionscript
default xml namespace = new Namespace();
```

The default xml namespace directive has function block-level scope. This means that the scope of this declaration is the `buildItemHTML()` method.

The lines that follow assemble the XMLList, based on the string arguments passed to the function:

```actionscript
var body:XMLList = new XMLList();
body += new XML("<b>" + itemTitle + "</b>");
var p:XML = new XML("<p>" + itemDescription + "</p>");

var link:XML = <a></a>;
link.@href = itemLink; // <link href="itemLinkString"></link>
link.font.@color = "#008000";
        // <font color="#008000"></font></a>
        // 0x008000 = green
link.font = "More...";

p.appendChild(<br/>);
p.appendChild(link);
body += p;
```

This XMLList object represents string data suitable for an ActionScript HTML text field.

The xmlLoaded() method uses the return value of the buildItemHTML() method and converts it to a string:

```actionscript
XML.prettyPrinting = false;
rssOutput = outXML.toXMLString();
```

## Extracting the title of the RSS feed and sending a custom event

The `xmlLoaded()` method sets a `rssTitle` string variable, based on information in the source RSS XML data:

```actionscript
rssTitle = rssXML.channel.title.toString();
```

Finally, the xmlLoaded() method generates an event, which notifies the application that the data is parsed and available:

```actionscript
dataWritten = new Event("dataWritten", true);
```
