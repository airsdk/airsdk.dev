---
title: Using XML namespaces
sidebar_position: 9
---

Namespaces in an XML object (or document) identify the type of data that the object contains. For example, in sending and delivering XML data to a web service that uses the SOAP messaging protocol, you declare the namespace in the opening tag of the XML:

```actionscript
var message:XML =
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    <soap:Body xmlns:w="http://www.test.com/weather/">
        <w:getWeatherResponse>
            <w:tempurature >78</w:tempurature>
        </w:getWeatherResponse>
    </soap:Body>
</soap:Envelope>;
```

The namespace has a prefix, soap , and a URI that defines the namespace, http://schemas.xmlsoap.org/soap/envelope/ .

ActionScript 3.0 includes the Namespace class for working with XML namespaces. For the XML object in the previous example, you can use the Namespace class as follows:

```actionscript
var soapNS:Namespace = message.namespace("soap");
trace(soapNS); // Output: http://schemas.xmlsoap.org/soap/envelope/

var wNS:Namespace = new Namespace("w", "http://www.test.com/weather/");
message.addNamespace(wNS);
var encodingStyle:XMLList = message.@soapNS::encodingStyle;
var body:XMLList = message.soapNS::Body;

message.soapNS::Body.wNS::GetWeatherResponse.wNS::tempurature = "78";
```

The XML class includes the following methods for working with namespaces: `addNamespace()` , `inScopeNamespaces()` , `localName()` , `name()` , `namespace()` , `namespaceDeclarations()` , `removeNamespace()` , `setLocalName()` , `setName()` , and `setNamespace()` .

The `default` `xml` `namespace` directive lets you assign a default namespace for XML objects. For example, in the following, both `x1` and `x2` have the same default namespace:

```actionscript
var ns1:Namespace = new Namespace("http://www.example.com/namespaces/");
default xml namespace = ns1;
var x1:XML = <test1 />;
var x2:XML = <test2 />;
```
