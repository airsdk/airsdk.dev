---
title: Setting Stage properties
sidebar_position: 6
---

The Stage class overrides most properties and methods of the DisplayObject class. If you call one of these overridden properties or methods, Flash Player and AIR throw an exception. For example, the Stage object does not have x or y properties, since its position is fixed as the main container for the application. The x and y properties refer to the position of a display object relative to its container, and since the Stage is not contained in another display object container, these properties do not apply.

:::note
Some properties and methods of the Stage class are only available to display objects that are in the same security sandbox as the first SWF file loaded. For details, see Stage security .
:::

## Controlling the playback frame rate

The `frameRate` property of the Stage class is used to set the frame rate for all SWF files loaded into the application. For more information, see the ActionScript 3.0 Reference for the Adobe Flash Platform .

## Controlling Stage scaling

When the portion of the screen representing Flash Player or AIR is resized, the runtime automatically adjusts the Stage contents to compensate. The Stage class’s `scaleMode` property determines how the Stage contents are adjusted. This property can be set to four different values, defined as constants in the `flash.display.StageScaleMode` class:

- `StageScaleMode.EXACT_FIT` scales the SWF to fill the new stage dimensions without regard for the original content aspect ratio. The scale factors might not be the same for width and height, so the content can appear squeezed or stretched if the aspect ratio of the stage is changed.
- `StageScaleMode.SHOW_ALL` scales the SWF to fit entirely within the new stage dimensions without changing the content aspect ratio. This scale mode displays all of the content, but can result in “letterbox” borders, like the black bars that appear when viewing a wide-screen movie on a standard television.
- `StageScaleMode.NO_BORDER` scales the SWF to entirely fill the new stage dimensions without changing the aspect ratio of the content. This scale mode makes full use of the stage display area, but can result in cropping.
- `StageScaleMode.NO_SCALE` — does not scale the SWF. If the new stage dimensions are smaller, the content is cropped; if larger, the added space is blank.

In the `StageScaleMode.NO_SCALE` scale mode only, the `stageWidth` and `stageHeight` properties of the Stage class can be used to determine the actual pixel dimensions of the resized stage. (In the other scale modes, the `stageWidth` and `stageHeight` properties always reflect the original width and height of the SWF.) In addition, when `scaleMode` is set to `StageScaleMode.NO_SCALE` and the SWF file is resized, the Stage class’s resize event is dispatched, allowing you to make adjustments accordingly.

Consequently, having `scaleMode` set to `StageScaleMode.NO_SCALE` allows you to have greater control over how the screen contents adjust to the window resizing if you desire. For example, in a SWF containing a video and a control bar, you might want to make the control bar stay the same size when the Stage is resized, and only change the size of the video window to accommodate the Stage size change. This is demonstrated in the following example:

```actionscript
// mainContent is a display object containing the main content;
// it is positioned at the top-left corner of the Stage, and
// it should resize when the SWF resizes.

// controlBar is a display object (e.g. a Sprite) containing several
// buttons; it should stay positioned at the bottom-left corner of the
// Stage (below mainContent) and it should not resize when the SWF
// resizes.

import flash.display.Stage;
import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.events.Event;

var swfStage:Stage = mainContent.stage;
swfStage.scaleMode = StageScaleMode.NO_SCALE;
swfStage.align = StageAlign.TOP_LEFT;
swfStage.addEventListener(Event.RESIZE, resizeDisplay);

function resizeDisplay(event:Event):void
{
    var swfWidth:int = swfStage.stageWidth;
    var swfHeight:int = swfStage.stageHeight;

    // Resize the main content area
    var newContentHeight:Number = swfHeight - controlBar.height;
    mainContent.height = newContentHeight;
    mainContent.scaleX = mainContent.scaleY;

    // Reposition the control bar.
    controlBar.y = newContentHeight;

}
```

### Setting the stage scale mode for AIR windows

The stage `scaleMode` property determines how the stage scales and clips child display objects when a window is resized. Only the `noScale` mode should be used in AIR. In this mode, the stage is not scaled. Instead, the size of the stage changes directly with the bounds of the window. Objects may be clipped if the window is resized smaller.

The stage scale modes are designed for use in a environments such as a web browser where you don't always have control over the size or aspect ratio of the stage. The modes let you choose the least bad compromise when the stage does not match the ideal size or aspect ratio of your application. In AIR, you always have control of the stage, so in most cases re-laying out your content or adjusting the dimensions of your window will give you better results than enabling stage scaling.

In the browser and for the initial AIR window, the relationship between the window size and the initial scale factor is read from the loaded SWF file. However, when you create a NativeWindow object, AIR chooses an arbitrary relationship between the window size and the scale factor of 72:1. Thus, if your window is 72x72 pixels, a 10x10 rectangle added to the window is drawn the correct size of 10x10 pixels. However, if the window is 144x144 pixels, then a 10x10 pixel rectangle is scaled to 20x20 pixels. If you insist on using a scaleMode other than noScale for a window stage, you can compensate by setting the scale factor of any display objects in the window to the ratio of 72 pixels to the current width and height of the stage. For example, the following code calculates the required scale factor for a display object named client :

```actionscript
if(newWindow.stage.scaleMode != StageScaleMode.NO_SCALE){
    client.scaleX = 72/newWindow.stage.stageWidth;
    client.scaleY = 72/newWindow.stage.stageHeight;
}
```

:::note
Flex and HTML windows automatically set the stage scaleMode to noScale . Changing the scaleMode disturbs the automatic layout mechanisms used in these types of windows.
:::

## Working with full-screen mode

Full-screen mode allows you to set a movie’s stage to fill a viewer’s entire monitor without any container borders or menus. The Stage class’s displayState property is used to toggle full-screen mode on and off for a SWF. The displayState property can be set to one of the values defined by the constants in the flash.display.StageDisplayState class. To turn on full-screen mode, set the displayState property to StageDisplayState.FULL_SCREEN :

```actionscript
stage.displayState = StageDisplayState.FULL_SCREEN;
```

To turn on full-screen interactive mode (new in Flash Player 11.3), set the displayState property to `StageDisplayState.FULL_SCREEN_INTERACTIVE` :

```actionscript
stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
```

In Flash Player, full-screen mode can only be initiated through ActionScript in response to a mouse click (including right-click) or keypress. AIR content running in the application security sandbox does not require that full-screen mode be entered in response to a user gesture.

To exit full-screen mode, set the displayState property to `StageDisplayState.NORMAL` .

```actionscript
stage.displayState = StageDisplayState.NORMAL;
```

In addition, a user can choose to leave full-screen mode by switching focus to a different window or by using one of several key combinations: the Esc key (all platforms), Control-W (Windows), Command-W (Mac), or Alt-F4 (Windows).

### Enabling full-screen mode in Flash Player

To enable full-screen mode for a SWF file embedded in an HTML page, the HTML code to embed Flash Player must include a param tag and embed attribute with the name allowFullScreen and value true , like this:

```html
<object>
  ...
  <param name="allowFullScreen" value="true" />
  <embed ... allowFullScreen="true" />
</object>
```

In the Flash authoring tool, select File -> Publish Settings and in the Publish Settings dialog box, on the HTML tab, select the Flash Only - Allow Full Screen template.

In Flex, ensure that the HTML template includes `<object>` and `<embed>` tags that support full screen.

If you are using JavaScript in a web page to generate the SWF-embedding tags, you must alter the JavaScript to add the allowFullScreen param tag and attribute. For example, if your HTML page uses the `AC_FL_RunContent()` function (which is used in HTML pages generated by Flash Professional and Flash Builder), you should add the `allowFullScreen` parameter to that function call as follows:

```javascript
AC_FL_RunContent(
...
'allowFullScreen','true',
...
); //end AC code
```

This does not apply to SWF files running in the stand-alone Flash Player.

:::note
If you set the Window Mode (wmode in the HTML) to Opaque Windowless (opaque) or Transparent Windowless (transparent), the full-screen window is always opaque
:::

There are also security-related restrictions for using full-screen mode with Flash Player in a browser. These restrictions are described in Security .

### Enabling full-screen interactive mode in Flash Player 11.3 and higher

Flash Player 11.3 and higher support full-screen interactive mode, which enables full support for all keyboard keys (except for Esc , which exits full-screen interactive mode). Full-screen interactive mode is useful for gaming (for example, to enable chat in a multi-player game or WASD keyboard controls in a first-person shooter game.)

To enable full-screen interactive mode for a SWF file embedded in an HTML page, the HTML code to embed Flash Player must include a param tag and embed attribute with the name allowFullScreenInteractive and value true , like this:

```html
<object>
  ...
  <param name="allowFullScreenInteractive" value="true" />
  <embed ... allowFullScreenInteractive="true" />
</object>
```

In the Flash authoring tool, select File -> Publish Settings and in the Publish Settings dialog box, on the HTML tab, select the Flash Only - Allow Full Screen Interactive template.

In Flash Builder and Flex, ensure that the HTML templates include `<object>` and `<embed>` tags that support full screen interactive mode.

If you are using JavaScript in a web page to generate the SWF-embedding tags, you must alter the JavaScript to add the allowFullScreenInteractive param tag and attribute. For example, if your HTML page uses the AC_FL_RunContent() function (which is used in HTML pages generated by Flash Professional and Flash Builder), you should add the allowFullScreenInteractive parameter to that function call as follows:

```javascript
AC_FL_RunContent(
...
'allowFullScreenInteractive','true',
...
); //end AC code
```

This does not apply to SWF files running in the stand-alone Flash Player.

### Full screen stage size and scaling

The `Stage.fullScreenHeight` and `Stage.fullScreenWidth` properties return the height and the width of the monitor that’s used when going to full-screen size, if that state is entered immediately. These values can be incorrect if the user has the opportunity to move the browser from one monitor to another after you retrieve these values but before entering full-screen mode. If you retrieve these values in the same event handler where you set the Stage.displayState property to StageDisplayState.FULL_SCREEN , the values are correct.For users with multiple monitors, the SWF content expands to fill only one monitor. Flash Player and AIR use a metric to determine which monitor contains the greatest portion of the SWF, and uses that monitor for full-screen mode. The fullScreenHeight and fullScreenWidth properties only reflect the size of the monitor that is used for full-screen mode. For more information, see `Stage.fullScreenHeight` and `Stage.fullScreenWidth` in the ActionScript 3.0 Reference for the Adobe Flash Platform .

Stage scaling behavior for full-screen mode is the same as under normal mode; the scaling is controlled by the Stage class’s `scaleMode` property. If the `scaleMode` property is set to `StageScaleMode.NO_SCALE` , the Stage’s `stageWidth` and `stageHeight` properties change to reflect the size of the screen area occupied by the SWF (the entire screen, in this case); if viewed in the browser the HTML parameter for this controls the setting.

You can use the Stage class’s `fullScreen` event to detect and respond when full-screen mode is turned on or off. For example, you might want to reposition, add, or remove items from the screen when entering or leaving full-screen mode, as in this example:

```actionscript
import flash.events.FullScreenEvent;

function fullScreenRedraw(event:FullScreenEvent):void
{
    if (event.fullScreen)
    {
        // Remove input text fields.
        // Add a button that closes full-screen mode.
    }
    else
    {
        // Re-add input text fields.
        // Remove the button that closes full-screen mode.
    }
}

mySprite.stage.addEventListener(FullScreenEvent.FULL_SCREEN, fullScreenRedraw);
```

As this code shows, the event object for the `fullScreen` event is an instance of the `flash.events.FullScreenEvent` class, which includes a `fullScreen` property indicating whether full-screen mode is enabled ( `true` ) or not ( `false` ).

### Keyboard support in full-screen mode

When Flash Player runs in a browser, all keyboard-related ActionScript, such as keyboard events and text entry in TextField instances, is disabled in full-screen mode. The exceptions (the keys that are enabled) are:

- Selected non-printing keys, specifically the arrow keys, space bar, and tab key
- Keyboard shortcuts that terminate full-screen mode: Esc (Windows and Mac), Control-W (Windows), Command-W (Mac), and Alt-F4

These restrictions are not present for SWF content running in the stand-alone Flash Player or in AIR. AIR supports an interactive full-screen mode that allows keyboard input.

### Mouse support in full-screen mode

By default, mouse events in full-screen mode work the same way as when not in full-screen mode. However, in full-screen mode, you can optionally set the Stage.mouseLock property to enable mouse locking. Mouse locking disables the cursor and enables unbounded mouse movement.

:::note
You can only enable mouse locking in full-screen mode for desktop applications. Setting it on applications not in full-screen mode, or for applications on mobile devices, throws an exception.
:::

Mouse locking is disabled automatically and the mouse cursor is made visible again when:

- The user exits full-screen mode by using the Escape key (all platforms), Control-W (Windows), Command-W (Mac), or Alt-F4 (Windows).
- The application window loses focus.
- Any settings UI is visible, including all privacy dialog boxes.
- A native dialog box is shown, such as a file upload dialog box.

Events associated with mouse movement, such as the mouseMove event, use the `MouseEvent` class to represent the event object. When mouse locking is disabled, use the `MouseEvent.localX` and `MouseEvent.localY` properties to determine the location of the mouse.When mouse locking is enabled, use the `MouseEvent.movementX` and `MouseEvent.movementY` properties to determine the location of the mouse. The movementX and movementY properties contain changes in the position of the mouse since the last event, instead of absolute coordinates of the mouse location.

### Hardware scaling in full-screen mode

You can use the Stage class’s `fullScreenSourceRect` property to set Flash Player or AIR to scale a specific region of the stage to full-screen mode. Flash Player and AIR scale in hardware, if available, using the graphics and video card on a user's computer, and generally display content more quickly than software scaling.

To take advantage of hardware scaling, you set the whole stage or part of the stage to full-screen mode. The following ActionScript 3.0 code sets the whole stage to full-screen mode:

```actionscript
import flash.geom.*;
{
    stage.fullScreenSourceRect = new Rectangle(0,0,320,240);
    stage.displayState = StageDisplayState.FULL_SCREEN;
}
```

When this property is set to a valid rectangle and the displayState property is set to full-screen mode, Flash Player and AIR scale the specified area. The actual Stage size in pixels within ActionScript does not change. Flash Player and AIR enforce a minimum limit for the size of the rectangle to accommodate the standard “Press Esc to exit full-screen mode” message. This limit is usually around 260 by 30 pixels but can vary depending on platform and Flash Player version.

:::info
The fullScreenSourceRect property can only be set when Flash Player or AIR is not in full-screen mode. To use this property correctly, set this property first, then set the displayState property to full-screen mode.
:::

To enable scaling, set the `fullScreenSourceRect` property to a rectangle object.

```actionscript
stage.fullScreenSourceRect = new Rectangle(0,0,320,240);
```

To disable scaling, set the `fullScreenSourceRect` property to `null` .

```actionscript
stage.fullScreenSourceRect = null;
```

To take advantage of all hardware acceleration features with Flash Player, enable it through the Flash Player Settings dialog box. To load the dialog box, right-click (Windows) or Control-click (Mac) inside Flash Player content in your browser. Select the Display tab, which is the first tab, and click the checkbox: Enable hardware acceleration.

### Direct and GPU-compositing window modes

Flash Player 10 introduces two window modes, direct and GPU compositing, which you can enable through the publish settings in the Flash authoring tool. These modes are not supported in AIR. To take advantage of these modes, you must enable hardware acceleration for Flash Player.

Direct mode uses the fastest, most direct path to push graphics to the screen, which is advantageous for video playback.

GPU Compositing uses the graphics processing unit on the video card to accelerate compositing. Video compositing is the process of layering multiple images to create a single video image. When compositing is accelerated with the GPU it can improve the performance of YUV conversion, color correction, rotation or scaling, and blending. YUV conversion refers to the color conversion of composite analog signals, which are used for transmission, to the RGB (red, green, blue) color model that video cameras and displays use. Using the GPU to accelerate compositing reduces the memory and computational demands that are otherwise placed on the CPU. It also results in smoother playback for standard-definition video.

Be cautious in implementing these window modes. Using GPU compositing can be expensive for memory and CPU resources. If some operations (such as blend modes, filtering, clipping or masking) cannot be carried out in the GPU, they are done by the software. Adobe recommends limiting yourself to one SWF file per HTML page when using these modes and you should not enable these modes for banners. The Flash Test Movie facility does not use hardware acceleration but you can use it through the Publish Preview option.

Setting a frame rate in your SWF file that is higher than 60, the maximum screen refresh rate, is useless. Setting the frame rate from 50 through 55 allows for dropped frames, which can occur for various reasons from time to time.

Using direct mode requires Microsoft DirectX 9 with VRAM 128 MB on Windows and OpenGL for Apple Macintosh, Mac OS X v10.2 or higher. GPU compositing requires Microsoft DirectX 9 and Pixel Shader 2.0 support on Windows with 128 MB of VRAM. On Mac OS X and Linux, GPU compositing requires OpenGL 1.5 and several OpenGL extensions (framebuffer object, multitexture, shader objects, shading language, fragment shader).

You can activate `direct` and `gpu` acceleration modes on a per-SWF basis through the Flash Publish Settings dialog box, using the Hardware Acceleration menu on the Flash tab. If you choose None, the window mode reverts to `default` , `transparent` , or `opaque` , as specified by the Window Mode setting on the HTML tab.
