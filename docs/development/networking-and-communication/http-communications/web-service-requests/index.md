# Web service requests

There are a variety of HTTP-based web services. The main types include:

- REST

- XML-RPC

- SOAP

To use a web service in ActionScript 3, you create a URLRequest object,
construct the web service call using either URL variables or an XML document,
and send the call to the service using a URLLoader object. The Flex framework
contains several classes that make it easier to use web services—especially
useful when accessing complex SOAP services. Starting with Flash Professional
CS3, you can use the Flex classes in applications developed with Flash
Professional as well as in applications developed in Flash Builder.

In HTML-based AIR applications, you can use either the URLRequest and URLLoader
classes or the JavaScript XMLHttpRequest class. If desired, you can also create
a SWF library that exposes the web service components of the Flex framework to
your JavaScript code.

When your application runs in a browser, you can only use web services in the
same Internet domain as the calling SWF unless the server hosting the web
service also hosts a cross-domain policy file that permits access from other
domains. A technique that is often used when a cross-domain policy file is not
available is to proxy the requests through your own server. Adobe Blaze DS and
Adobe LiveCycle support web service proxying.

In AIR applications, a cross-domain policy file is not required when the web
service call originates from the application security sandbox. AIR application
content is never served from a remote domain, so it cannot participate in the
types of attacks that cross-domain policies prevent. In HTML-based AIR
applications, content in the application security sandbox can make cross-domain
XMLHttpRequests. You can allow content in other security sandboxes to make
cross-domain XMLHttpRequests as long as that content is loaded into an iframe.

More Help topics

[Website controls (policy files)](../../../security/permission-controls.md#website-controls-policy-files)

[REST-style web service requests](./rest-style-web-service-requests.md)

[XML-RPC web service requests](./xml-rpc-web-service-requests.md)

[SOAP web service requests](./soap-web-service-requests.md)

![](../../../img/flexLinkIndicator.png)
[Accessing server-side data](https://web.archive.org/web/20150414032840/http://help.adobe.com/en_US/flex/accessingdata/WS2db454920e96a9e51e63e3d11c0bf69084-7ff2.html)

[Adobe BlazeDS](http://opensource.adobe.com/wiki/display/blazeds/BlazeDS)

[Apache BlazeDS](https://flex.apache.org/download-blazeds.html)

[Adobe LiveCycle ES2](https://web.archive.org/web/20140302041751/http://www.adobe.com/devnet/livecycle.html)

[REST architecture](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

[XML-RPC](http://en.wikipedia.org/wiki/XML-RPC)

[SOAP protocol](http://www.w3.org/TR/soap/)
