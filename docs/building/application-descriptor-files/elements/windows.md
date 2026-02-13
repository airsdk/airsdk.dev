---
title: windows 
sidebar_position: 8
---

The `windows` element provides platform-specific settings for applications running on the Windows operating systems. It can contain the following optional elements.

## Elements

### `UseWebView2`

(optional)

Available: 33.1.1.620

Requests the runtime to try creating a Microsoft Edge "WebView2" component, rather than the IE-based "WebBrowser" control, when a native `StageWebView` element is created.

This component will need to be present on an end user's computer before this works: please see Microsoft's information on [downloading the WebView2 runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section)

As well as true/false values, a new option `exclusive` can be used from AIR SDK 51.0.0.2. In this mode, there will be no fallback to the IE-based "WebBrowser" control should the AIR runtime be unable to create a "WebView2" component.

### `maxD3D`

(optional)

Available: 33.1.1.929

Sets a limit on the Direct3D APIs used by the AIR runtime on Windows. If this value is set, it should be an integer value and AIR will not use a Direct3D version higher than this value.
Currently this means that to force the runtime to use Direct3D 9, it can be set to `9`, and to prevent the runtime from using Direct3D, it can be set to `0`. The default for new SWFs is Direct3D 11.


### `clipboardFullHTML`

(optional)

Available: 50.0.0.1

This setting can be used to retrieve the full Windows clipboard entry for HTML strings. Default behaviour is `false` which will only provide the body text of the HTML contents.
To ensure the full clipboard contents are retrieved for HTML strings, set the value to `true`.


### `localAppData`

(optional)

Available: 51.3.1.1

This setting determines where the application's local storage folder is located (i.e. `File.applicationStorageDirectory`). Normally this is under the standard "AppData" folder
on Windows, as determined by the `%APPDATA%` environment variable, which is under a "Roaming" folder. If this setting is configured as `true` then the "Local" folder will be used
instead, i.e. the application storage directory will be a subfolder of the path given by the `%LOCALAPPDATA%` environment variable.


### `useDirectDrawFonts`

(optional)

Available: 51.3.1.1

Font rendering for FTE-based text lines was updated in AIR SDK 51.2 to use DirectDraw/DirectWrite, which allowed for colored emoji characters to be suported. However, some
computer systems display some poor behaviour (memory leaks and system hangs) when this is used, so this setting has been introduced as a mechanism by which developers can turn
off the use of the DirectX graphics system for font rendering (switching back to the earlier GDI-based font support). The default value is `true` so that existing behaviour will
not change if the value is omitted.

Note that the DirectDraw font rendering is carried out in a different library (DDrawFontSupport.dll) due to dependencies on Windows versions/APIs, and if the setting here had
been set to `false`, this library will not be packaged up when creating an application bundle on Windows.

