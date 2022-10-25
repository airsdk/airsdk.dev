---
title: initialWindow
sidebar_position: 3
---

The `initialWindow` element provides information about the first window that will be created for an application by the AIR runtime. It can contain the following elements, several of which are only applicable to desktop applications or to mobile applications.

#### Example

```xml
<initialWindow> 
    <title>Hello World</title> 
    <content>HelloWorld.swf</content> 
    <depthAndStencil>true</depthAndStencil> 
    <systemChrome>none</systemChrome> 
    <transparent>true</transparent> 
    <visible>true</visible> 
    <maxSize>1024 800</maxSize> 
    <minSize>320 240</minSize> 
    <maximizable>false</maximizable> 
    <minimizable>false</minimizable> 
    <resizable>true</resizable> 
    <x>20</x> 
    <y>20</y> 
    <height>600</height> 
    <width>800</width> 
    <aspectRatio>landscape</aspectRatio> 
    <autoOrients>true</autoOrients> 
    <fullScreen>false</fullScreen> 
    <renderMode>direct</renderMode> 
</initialWindow>
```


## Elements used on all platforms:

### `content`

<span class="badge badge--info">required</span>

The value specified for the content element is the URL for the main content file of the application. This may be either a SWF file or an HTML file.

The URL is specified relative to the root of the application installation folder. (When running an AIR application with ADL, the URL is relative to the folder containing the application descriptor file. You can use the root-dir parameter of ADL to specify a different root directory.)

Because the value of the content element is treated as a URL, characters in the name of the content file must be URL encoded according to the rules defined in [RFC 1738](https://tools.ietf.org/html/rfc1738). Space characters, for example, must be encoded as %20.

#### Example

```xml
<content>TravelPlanner.swf</content>
```

### `renderMode`

<span class="badge badge--success">optional</span>

Specifies whether to use graphics processing unit (GPU) acceleration, if supported on the current device. This can be set to one of the following values:

- `auto` (default) — currently falls back to CPU mode.
- `cpu` — hardware acceleration is not used.
- `direct` — rendering composition occurs in the CPU; blitting uses the GPU.
- `gpu` — hardware rendering acceleration is used, if available.

Note that `direct` mode is required in order to use Stage3D APIs and frameworks such as [Starling](https://gamua.com/starling/).

#### Example

```xml
<renderMode>direct</renderMode>
```

### `depthAndStencil`

<span class="badge badge--success">optional</span>

Indicates that the application requires the use of the depth or stencil buffer. You typically use these buffers when working with 3D content.

By default, the value of this element is false to disable the depth and stencil buffers. This element is necessary because the buffers must be allocated on application startup, before any content loads.

The setting of this element must match the value passed for the `enableDepthAndStencil` argument to the `Context3D.configureBackBuffer()` method. If the values do not match, AIR issues an error.

This element is only available when `renderMode` is set to `direct`.

#### Example

```xml
<depthAndStencil>true</depthAndStencil>
```

## Elements used on desktop platforms:

### `title`

<span class="badge badge--success">optional</span>

Specifies the title displayed in the title bar of the initial application window. A title is only displayed if the [`systemChrome`](#systemchrome) element is set to standard.

#### Content

A string containing the window title.

#### Example

```xml
<title>Example Window Title</title>
```

### `systemChrome`

<span class="badge badge--success">optional</span>

Specifies whether the initial application window is created with the standard title bar, borders, and controls provided by the operating system.
The system chrome setting of the window cannot be changed at run time. This can be set to one of the following values:

- `none` — No system chrome is provided. The application (or an application framework such as Flex) is responsible for displaying window chrome.
- `standard` (default) — System chrome is provided by the operating system.

#### Example

```xml
<systemChrome>standard</systemChrome>
```

### `transparent`

<span class="badge badge--success">optional</span>

Specifies whether the initial application window is alpha-blended with the desktop. A window with transparency enabled may draw more slowly and require more memory.
The transparent setting cannot be changed at run time. 

:::note Important
You can only set `transparent` to `true` when [`systemChrome`](#systemchrome) is `none`.
:::

#### Example

```xml
<transparent>true</transparent>
```

### `visible`

<span class="badge badge--success">optional</span>

Specifies whether the initial application window is visible as soon as it is created.

AIR windows, including the initial window, are created in an invisible state by default. You can display a window by calling the `activate()` method of the `NativeWindow` object or by setting the visible property to `true`. You may want to leave the main window hidden initially, so that changes to the window’s position, the window’s size, and the layout of its contents are not shown.

#### Example

```xml
<visible>true</visible>
```


### `minimizable` 

<span class="badge badge--success">optional</span>

Specifies whether the window can be minimized.


### `maximizable`

<span class="badge badge--success">optional</span>

Specifies whether the window can be maximized.


### `resizable`

<span class="badge badge--success">optional</span>

Specifies whether the window can be resized.

:::note
On operating systems, such as Mac OS X, for which maximizing windows is a resizing operation, both `maximizable` and `resizable` must be set to `false` to prevent the window from being zoomed or resized.
:::

#### Example

```xml
<resizable>false</resizable>
```


### `x`  

<span class="badge badge--success">optional</span>

The horizontal position of the initial application window.

In most cases, it is better to let the operating system determine the initial position of the window rather than assigning a fixed value.

The origin of the screen coordinate system (0,0) is the top, left-hand corner of the main desktop screen (as determined by the operating system).

#### Content

An integer value.

#### Example
```xml
<x>120</x>
```


### `x`  

<span class="badge badge--success">optional</span>

The vertical position of the initial application window.

In most cases, it is better to let the operating system determine the initial position of the window rather than assigning a fixed value.

The origin of the screen coordinate system (0,0) is the top, left-hand corner of the main desktop screen (as determined by the operating system).

#### Content

An integer value.

#### Example

```xml
<y>250</y>
```


### `width`

<span class="badge badge--success">optional</span> 

The initial width of the main window of the application. 

If you do not set this value, it is determined by the settings in the root SWF file or, in the case of an HTML-based AIR application, by the operating system. 

The maximum dimension of a window is 4096 pixels.

#### Content

A positive integer with a maximum value of 4095.

#### Example

```xml
<width>1024</width>
```


### `height`

<span class="badge badge--success">optional</span> 

The initial height of the main window of the application. 

If you do not set this value, it is determined by the settings in the root SWF file or, in the case of an HTML-based AIR application, by the operating system. 

The maximum dimension of a window is 4096 pixels.

#### Content

A positive integer with a maximum value of 4095.

#### Example

```xml
<height>1024</height>
```


### `minSize` 

<span class="badge badge--success">optional</span>

Specifies the minimum size allowed for the window.

#### Content

Two integers representing the minimum width and height, separated by whites pace. Note that the minimum size imposed by the operating system takes precedence over the value set in the application descriptor.

#### Example

```xml
<minSize>120 60</minSize>
```


### `maxSize`

<span class="badge badge--success">optional</span>

Specifies the maximum size allowed for the window.

If you do not set a maximum size, it is determined by the operating system.

#### Content

Two integers representing the maximum width and height, separated by whites pace.

:::note
The maximum window size supported by AIR increased from 2048x2048 pixels to 4096x4096 pixels in AIR 2. (Because the screen coordinates are zero-based, the maximum value you can use for width or height is 4095.)
:::

#### Example

```xml
<maxSize>1024 360</maxSize>
```



### `requestedDisplayResolution`

<span class="badge badge--success">optional</span>

Specifies whether the application desires to use the standard or high resolution on a computer monitor with a high-resolution screen.

When set to `standard` (the default), the screen will appear to the application as a standard-resolution screen. When set to `high`, the application can address each high-resolution pixel.

For example, on a 4K/UHD monitor, if the setting is `standard` then the full-screen stage dimensions would be 1920x1080, and each application pixel is rendered using four screen pixels.

If the setting is `high`, the full-screen stage dimensions match the monitor at 3840x2160.

On devices with standard-resolution screens, the stage dimensions match the screen dimensions no matter which setting is used.

#### Example

```xml
<initialWindow> 
    <requestedDisplayResolution>high</requestedDisplayResolution> 
</initialWindow>
```





## Elements used on mobile platforms:

### `aspectRatio`

<span class="badge badge--success">optional</span>

Specifies the aspect ratio of the application. Options are `any`, `portrait` or `landscape`.

If not specified, the application opens in the "natural" aspect ratio and orientation of the device. The natural orientation varies from device to device. Typically, it is the portrait aspect ratio on small-screen devices such as phones. On some devices, such as the iPad tablet, the application opens in the current orientation.

#### Example

```xml
<aspectRatio>landscape</aspectRatio>
```


### `autoOrients`

<span class="badge badge--success">optional</span>

Specifies whether the orientation of content in the application automatically reorients as the device itself changes physical orientation. For more information, see [Stage orientation](/docs/development/display/display-programming/stage-orientation.md).

When using auto-orientation, consider setting the align and scaleMode properties of the Stage to the following:

```actionscript
stage.align = StageAlign.TOP_LEFT;
stage.scaleMode = StageScaleMode.NO_SCALE;
```

These settings allow the application to rotate around the top, left corner and prevents your application content from being automatically scaled. While the other scale modes do adjust your content to fit the rotated stage dimensions, they also clip, distort, or excessively shrink that content. Better results can almost always be achieved by redrawing or relaying out the content yourself.

#### Example

```xml
<autoOrients>true</autoOrients>
```


### `softKeyboardBehavior`

<span class="badge badge--success">optional</span>

Specifies the default behavior of the application when a virtual keyboard is displayed. The default behavior is to pan the application upward.

The runtime keeps the focused text field or interactive object on the screen. Use the `pan` option if your application does not provide its own keyboard handling logic.

You can also turn off the automatic behavior by setting the `softKeyboardBehavior` element to `none`.

In this case, text fields and interactive objects dispatch a SoftKeyboardEvent when the soft keyboard is raised, but the runtime does not pan or resize the application.

It is your application’s responsibility to keep the text entry area in view.

#### Example
```xml
<softKeyboardBehavior>none</softKeyboardBehavior>
```


### `fullscreen`

<span class="badge badge--success">optional</span>

TODO:: the Adobe documentation does not match the observed behaviour.

#### Example
```xml
<fullscreen>true</fullscreen>
```
