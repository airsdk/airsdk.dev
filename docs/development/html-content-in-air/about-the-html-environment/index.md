# About the HTML environment

Adobe® AIR® uses [WebKit](http://www.webkit.org) _(www.webkit.org_ ), also used
by the Safari web browser, to parse, layout, and render HTML and JavaScript
content. Using the AIR APIs in HTML content is optional. You can program in the
content of an HTMLLoader object or HTML window entirely with HTML and
JavaScript. Most existing HTML pages and applications should run with few
changes (assuming they use HTML, CSS, DOM, and JavaScript features compatible
with WebKit).

**Important:** New versions of the Adobe AIR runtime may include updated
versions of WebKit. A WebKit update in a new version of AIR _may_ result in
unexpected changes in a deployed AIR application. These changes may affect the
behavior or appearance of HTML content in an application. For example,
improvements or corrections in WebKit rendering may change the layout of
elements in an application's user interface. For this reason, it is highly
recommended that you provide an update mechanism in your application. Should you
need to update your application due to a change in the WebKit version included
in AIR, the AIR update mechanism can prompt the user to install the new version
of your application.

The following table lists the version of the Safari web browser that uses the
version of WebKit equivalent to that used in AIR:

| AIR version | Safari version |
| ----------- | -------------- |
| 1.0         | 2.04           |
| 1.1         | 3.04           |
| 1.5         | 4.0 Beta       |
| 2.0         | 4.03           |
| 2.5         | 4.03           |
| 2.6         | 4.03           |
| 2.7         | 4.03           |
| 3           | 5.0.3          |

You can always determine the installed version of WebKit by examining the
default user agent string returned by a HTMLLoader object:

    var htmlLoader:HTMLLoader = new HTMLLoader();
    trace( htmlLoader.userAgent );

Keep in mind that the version of WebKit used in AIR is not identical to the open
source version. Some features are not supported in AIR and the AIR version can
include security and bug fixes not yet available in the corresponding WebKit
version. See
[WebKit features not supported in AIR](./webkit-features-not-supported-in-air.md).

Because AIR applications run directly on the desktop, with full access to the
file system, the security model for HTML content is more stringent than the
security model of a typical web browser. In AIR, only content loaded from the
application installation directory is placed in the _application sandbox_. The
application sandbox has the highest level of privilege and allows access to the
AIR APIs. AIR places other content into isolated sandboxes based on where that
content came from. Files loaded from the file system go into a local sandbox.
Files loaded from the network using the http: or https: protocols go into a
sandbox based on the domain of the remote server. Content in these
non-application sandboxes is prohibited from accessing any AIR API and runs much
as it would in a typical web browser.

HTML content in AIR does not display SWF or PDF content if alpha, scaling, or
transparency settings are applied. For more information, see
[Considerations when loading SWF or PDF content in an HTML page](../scripting-the-air-html-container/display-properties-of-htmlloader-objects.md#considerations-when-loading-swf-or-pdf-content-in-an-html-page)
and
[Window transparency](../../client-system-interaction/working-with-air-native-windows/basics-of-native-windows-in-air.md#window-transparency).

- [Overview of the HTML environment](./overview-of-the-html-environment.md)
- [AIR and WebKit](./air-and-webkit.md)

More Help topics

[Webkit DOM Reference](http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/WebKitDOMRef/index.html#//apple_ref/doc/uid/TP40006089)

[Safari HTML Reference](http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariHTMLRef/Introduction.html)

[Safari CSS Reference](http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariCSSRef/Introduction.html)

[www.webkit.org](http://www.webkit.org)

![](../../img/airLinkIndicator.png)
[Updating AIR applications](https://web.archive.org/web/20221230223123/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff2.html)
