---
title: windows elements
sidebar_position: 7
---

The `windows` element provides platform-specific settings for applications running on the Windows operating systems. It can contain the following optional elements:

- `UseWebView2`: Requests the runtime to try creating a Microsoft Edge "WebView2" component, rather than the IE-based "WebBrowser" control, when a native StageWebView element is created.

This component will need to be present on an end user's computer before this works: please see Microsoft's information on [downloading the WebView2 runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section)
