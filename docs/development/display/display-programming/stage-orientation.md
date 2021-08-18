---
title: Stage orientation
sidebar_position: 8
---

Mobile devices typically re-orient the user interface to keep the display upright when the user rotates the device. If you enable auto-orientation in your application, the device keeps the display properly oriented, but it is up to you to make sure that your content looks okay when the aspect ratio of the stage changes. If you disable auto-orientation, then the device display remains fixed unless you change the orientation manually.

AIR applications run on a number of different mobile devices and operating systems. The underlying orientation behavior can vary across operating systems, and even across different devices on the same operating system. A simple design strategy, that works well across all devices and operating systems, is to enable auto-orientation and to listen for Stage resize events to determine when you need to refresh the application layout.

Alternately, if your application only supports the portrait aspect ratio or only supports the landscape aspect ratio, you can turn off auto-orientation and set the supported aspect ratio in the AIR application descriptor. This design strategy provides consistent behavior and selects the “best” orientation for the selected aspect ratio. For example, if you specify the landscape aspect ratio, the orientation chosen is appropriate for devices with landscape-mode, slide-out keyboards.

## Getting the current Stage orientation and aspect ratio

Orientation is reported relative to the normal position of the device. On most devices there is a clear, upright position. This position is considered the default orientation. The other three possible orientations are then: rotated left , rotated right , and upside down . The StageOrientation class defines string constants to use when setting or comparing orientation values.

The Stage class defines two properties that report orientation:

- `Stage.deviceOrientation` — Reports the physical orientation of the device relative to the default position.

:::note
The deviceOrientation is not always available when your application first starts up or when the device is lying flat. In these cases, the device orientation is reported as unknown .
:::

- `Stage.orientation` — Reports the orientation of the Stage relative to the default position. When auto-orientation is enabled, the stage rotates in the opposite direction as the device to remain upright. Thus, the right and left positions reported by the orientation property are the opposite of those reported by the `deviceOrientation` property. For example, when `deviceRotation` reports rotated right , orientation reports rotated left .

The aspect ratio of the stage can be derived by simply comparing the current width and height of the stage:

```actionscript
var aspect:String = this.stage.stageWidth >= this.stage.stageHeight ? StageAspectRatio.LANDSCAPE : StageAspectRatio.PORTRAIT;
```

## Automatic orientation

When auto-orientation is on and a user rotates their device, the operating system re-orients the entire user interface, including the system taskbar and your application. As a result, the aspect ratio of the stage changes from portrait to landscape or landscape to portrait. When the aspect ratio changes, the stage dimensions also change.

Enable or disable auto-orientation at runtime, by setting the Stage `autoOrients` property to true or false . You can set the initial value of this property in the AIR application descriptor with the `<autoOrients>` element. (Note that prior to AIR 2.6, `autoOrients` is a read-only property and can only be set in the application descriptor.)

If you specify an aspect ratio of landscape or portrait and also enable auto-orientation, AIR constrains auto-orientation to the specified aspect ratio.

### Stage dimension changes

When the stage dimensions change, the stage contents are scaled and repositioned as specified by the `scaleMode` and `align` properties of the Stage object. In most cases, relying on the automatic behavior provided by the Stage `scaleMode` settings does not produce good results. Instead you must re-layout or redraw your graphics and components to support more than one aspect ratio. (Providing flexible layout logic also means that your application will work better across devices with different screen sizes and aspect ratios.)

The following illustration demonstrates the effects of the different `scaleMode` settings when rotating a typical mobile device:

![Rotation from landscape to portrait aspect ratio](images/PortraitToLandscape.png)

The illustration demonstrates the scaling behavior that occurs when rotating from a landscape aspect ratio to a portrait aspect ratio with different scale modes. Rotating from portrait to landscape causes a similar set of effects.

### Orientation change events

The Stage object dispatches two types of events that you can use to detect and react to orientation changes. Both stage resize and orientationChange events are dispatched when auto-orientation is enabled.

The `resize` event is the best event to use when you are relying on auto-orientation to keep the display upright. When the stage dispatches a `resize` event, relayout or redraw your content, as needed. The `resize` event is only dispatched when the stage scale mode is set to `noScale` .

The `orientationChange` event can also be used to detect orientation changes. The `orientationChange` event is only dispatched when auto-orientation is enabled.

:::note
On some mobile platforms, the stage dispatches a cancelable `orientationChanging` event before dispatching the `resize` or `orientationChange` events. Since the event is not supported on all platforms, avoid relying on it.
:::

## Manual orientation

You can control the stage orientation using the Stage `setOrientation()` or `setAspectRatio()` methods.

### Setting the stage orientation

You can set the stage orientation at runtime using the `setOrientation()` method of the Stage object. Use the string constants defined by the `StageOrientation` class to specify the desired orientation:

```actionscript
this.stage.setOrientation( StageOrientation.ROTATED_RIGHT );
```

Not every device and operating system supports every possible orientation. For example, Android 2.2 does not support programmatically choosing the rotated-left orientation on portrait-standard devices and does not support the upside-down orientation at all. The `supportedOrientations` property of the stage provides a list of the orientations that can be passed to the `setOrientation()` method:

```actionscript
var orientations:Vector.<String> = this.stage.supportedOrientations;
for each( var orientation:String in orientations )
{
    trace( orientation );
}
```

### Setting the stage aspect ratio

If you are primarily concerned about the aspect ratio of the stage, you can set the aspect ratio to portrait or landscape. You can set the aspect ratio in either the AIR application descriptor or, at run time, using the Stage `setAspectRatio()` method:

```actionscript
this.stage.setAspectRatio( StageAspectRatio.LANDSCAPE );
```

The runtime chooses one of the two possible orientations for the specified aspect ratio. This may not match the current device orientation. For example, the default orientation is chosen in preference to the upside-down orientation (AIR 3.2 and earlier) and the orientation appropriate for the slide-out keyboard is chosen in preference to the opposite orientation.

**(AIR 3.3 and higher)** Starting with AIR 3.3 (SWF version 16), you can also use the `StageAspectRatio.ANY` constant. If `Stage.autoOrients` is set to `true` and you call `setAspectRatio(StageAspectRatio.ANY)`, your application has the capability to re-orient to all orientations (landscape-left, landscape-right, portait, and portrait-upside-down). Also new in AIR 3.3, the aspect ratio is persistent, and further rotation of the device is constrained to the specified orientation.

### Example: Setting the stage orientation to match the device orientation

The following example illustrates a function that updates the stage orientation to match the current device orientation. The stage deviceOrientation property indicates the physical orientation of the device, even when auto-orientation is turned off.

```actionscript
function refreshOrientation( theStage:Stage ):void
{
    switch ( theStage.deviceOrientation )
    {
        case StageOrientation.DEFAULT:
            theStage.setOrientation( StageOrientation.DEFAULT );
            break;
        case StageOrientation.ROTATED_RIGHT:
            theStage.setOrientation( StageOrientation.ROTATED_LEFT );
            break;
        case StageOrientation.ROTATED_LEFT:
            theStage.setOrientation( StageOrientation.ROTATED_RIGHT );
            break;
        case StageOrientation.UPSIDE_DOWN:
            theStage.setOrientation( StageOrientation.UPSIDE_DOWN );
            break;
        default:
            //No change
    }
}
```

The orientation change is asynchronous. You can listen for the `orientationChange` event dispatched by the stage to detect the completion of the change. If an orientation is not supported on a device, the `setOrientation()` call fails without throwing an error.
