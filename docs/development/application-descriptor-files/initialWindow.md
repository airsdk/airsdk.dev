---
title: initialWindow elements
sidebar_position: 3
---

The `initialWindow` element provides information about the first window that will be created for an application by the AIR runtime. It can contain the following elements, several of which are only applicable to desktop applications or to mobile applications.

## Elements used on all platforms:

- `content` (required): The value specified for the content element is the URL for the main content file of the application. This may be either a SWF file or an HTML file.

  The URL is specified relative to the root of the application installation folder. (When running an AIR application with ADL, the URL is relative to the folder containing the application descriptor file. You can use the root-dir parameter of ADL to specify a different root directory.)

  Because the value of the content element is treated as a URL, characters in the name of the content file must be URL encoded according to the rules defined in [RFC 1738](https://tools.ietf.org/html/rfc1738). Space characters, for example, must be encoded as %20.

- `renderMode` (optional): Specifies whether to use graphics processing unit (GPU) acceleration, if supported on the current device. This can be set to one of the following values:

  - `auto` (default) — currently falls back to CPU mode.
  - `cpu` — hardware acceleration is not used.
  - `direct` — rendering composition occurs in the CPU; blitting uses the GPU.
  - `gpu` — hardware rendering acceleration is used, if available.

  Note that `direct` mode is required in order to use Stage3D APIs and frameworks such as [Starling](https://gamua.com/starling/).

- `depthAndStencil` (optional): Indicates that the application requires the use of the depth or stencil buffer. You typically use these buffers when working with 3D content.
  By default, the value of this element is false to disable the depth and stencil buffers. This element is necessary because the buffers must be allocated on application startup, before any content loads.

  The setting of this element must match the value passed for the `enableDepthAndStencil` argument to the `Context3D.configureBackBuffer()` method. If the values do not match, AIR issues an error.
  This element is only available when `renderMode` is set to `direct`.

## Elements used on desktop platforms:

- `title` (optional): Specifies the title displayed in the title bar of the initial application window. A title is only displayed if the systemChrome element is set to standard.

- `systemChrome` (optional): Specifies whether the initial application window is created with the standard title bar, borders, and controls provided by the operating system.
  The system chrome setting of the window cannot be changed at run time. This can be set to one of the following values:
  - `none` — No system chrome is provided. The application (or an application framework such as Flex) is responsible for displaying window chrome.
  - `standard` (default) — System chrome is provided by the operating system.
- `transparent` (optional): Specifies whether the initial application window is alpha-blended with the desktop. A window with transparency enabled may draw more slowly and require more memory.
  The transparent setting cannot be changed at run time. Important: You can only set `transparent` to `true` when `systemChrome` is `none`.

- `visible` (optional): Specifies whether the initial application window is visible as soon as it is created.

  AIR windows, including the initial window, are created in an invisible state by default. You can display a window by calling the activate() method of the NativeWindow object or by setting the visible property to true. You may want to leave the main window hidden initially, so that changes to the window’s position, the window’s size, and the layout of its contents are not shown.

- `minimizable` (optional): Specifies whether the window can be minimized.

- `maximizable` (optional): Specifies whether the window can be maximized.

- `resizable` (optional): Specifies whether the window can be resized.

  Note: On operating systems, such as Mac OS X, for which maximizing windows is a resizing operation, both maximizable and resizable must be set to false to prevent the window from being zoomed or resized.

- `x` and `y` (optional): The horizontal and vertical positions of the initial application window (from an origin at the top, left-hand corner of the main desktop screen).

  In most cases, it is better to let the operating system determine the initial position of the window rather than assigning a fixed value.

- `width` and `height` (optional): The initial width and height of the main window of the application. If you do not set these values, they are determined by the settings in the root SWF file or,
  in the case of an HTML-based AIR application, by the operating system. The maximum dimension of a window is 4096 pixels.

- `minSize` (optional): Specifies the minimum size allowed for the window, as two integers for width/height e.g. `<minSize>120 60</minSize>`.
  Note that the minimum size imposed by the operating system takes precedence over the value set in the application descriptor.

- `maxSize` (optional): Specifies the maximum size allowed for the window, as two integers for width/height e.g. `<maxSize>1024 720</maxSize>`.
  If you do not set a maximum size, it is determined by the operating system.

- `requestedDisplayResolution` (optional): Specifies whether the application desires to use the standard or high resolution on a computer monitor with a high-resolution screen.
  When set to `standard` (the default), the screen will appear to the application as a standard-resolution screen. When set to `high`, the application can address each high-resolution pixel.

  For example, on a 4K/UHD monitor, if the setting is `standard` then the full-screen stage dimensions would be 1920x1080, and each application pixel is rendered using four screen pixels.
  If the setting is `high`, the full-screen stage dimensions match the monitor at 3840x2160.

  On devices with standard-resolution screens, the stage dimensions match the screen dimensions no matter which setting is used.

## Elements used on mobile platforms:

- `aspectRatio` (optional): Specifies the aspect ratio of the application. Options are `any`, `portrait` or `landscape`.

  If not specified, the application opens in the “natural” aspect ratio and orientation of the device. The natural orientation varies from device to device.
  Typically, it is the portrait aspect ratio on small-screen devices such as phones. On some devices, such as the iPad tablet, the application opens in the current orientation.

- `autoOrients` (optional): Specifies whether the orientation of content in the application automatically reorients as the device itself changes physical orientation. For more information, see Stage orientation.

  When using auto-orientation, consider setting the align and scaleMode properties of the Stage to the following:

  ```actionscript
  stage.align = StageAlign.TOP_LEFT;
  stage.scaleMode = StageScaleMode.NO_SCALE;
  ```

  These settings allow the application to rotate around the top, left corner and prevents your application content from being automatically scaled. While the other scale modes do adjust your content to fit the rotated stage dimensions, they also clip, distort, or excessively shrink that content. Better results can almost always be achieved by redrawing or relaying out the content yourself.

- `softKeyboardBehavior` (optional): Specifies the default behavior of the application when a virtual keyboard is displayed. The default behavior is to pan the application upward.
  The runtime keeps the focused text field or interactive object on the screen. Use the `pan` option if your application does not provide its own keyboard handling logic.

  You can also turn off the automatic behavior by setting the `softKeyboardBehavior` element to `none`.
  In this case, text fields and interactive objects dispatch a SoftKeyboardEvent when the soft keyboard is raised, but the runtime does not pan or resize the application.
  It is your application’s responsibility to keep the text entry area in view.

- `fullscreen` (optional): TBC as the Adobe documentation does not match the observed behaviour.
