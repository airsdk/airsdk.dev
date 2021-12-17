---
title: iPhone 
sidebar_position: 4
---

The `iPhone` element provides platform-specific settings for applications running on iOS and tvOS devices including the iPhone and iPad. It can contain the following optional elements:

- `Entitlements`: iOS uses properties called entitlements to provide application access to additional resources and capabilities. Use the Entitlements element to specify this information in a mobile iOS application.

  Entitlements are provided as key-value pairs enclosed in a CDATA block. For more information, see the [Entitlements documentation](https://developer.apple.com/documentation/bundleresources/entitlements) in the Apple Developer website.

  For example:

  ```xml
  <iPhone>
    <Entitlements>
      <![CDATA[
         <key>aps-environment</key>
         <string>development</string>
      ]]>
    </Entitlements>
  </iPhone>
  ```

- `InfoAdditions`: Allows you to specify additional properties of an iOS application. Properties are provided as key-value pairs enclosed in a CDATA block and are injected into the application's Info.plist file.

  For more information, see the [Information Property List documentation](https://developer.apple.com/documentation/bundleresources/information_property_list) in the Apple Developer website.

  For example:

  ```xml
  <iPhone>
    <InfoAdditions>
      <![CDATA[
        <key>UIStatusBarStyle</key>
        <string>UIStatusBarStyleBlackOpaque</string>
        <key>UIRequiresPersistentWiFi</key>
        <string>NO</string>
      ]]>
    </InfoAdditions>
  </iPhone>
  ```

- `externalSwfs`: Specifies the name of a text file that contains a list of SWFs (one per line) to be configured by ADT for remote hosting.
  You can minimize your initial application download size by packaging a subset of the SWFs used by your application and loading the remaining (asset-only) external SWFs at runtime using the Loader.load() method.
  To use this feature, you must package the application such that ADT moves all ActionScript ByteCode (ABC) from the externally loaded SWF files to the main application SWF, leaving a SWF file that contains only assets.
  This is to conform with the Apple Store’s rule that forbids downloading any code after an application is installed.

- `forceCPURenderModeForDevices`: Force CPU render mode for a specified set of devices. This feature effectively lets you selectively enable GPU render mode for the remaining iOS devices.
  You add this tag as a child of the iPhone tag and specify a space-separated list of device model names to force into CPU mode: for example `<forceCPURenderModeForDevices>iPad1,1 iPhone1,1 iPhone1,2</forceCPURenderModeForDevices>`

- `requestedDisplayResolution`: Specifies whether the application desires to use the standard or high resolution on a device with a high-resolution screen.
  When set to `standard` (the default), the screen will appear to the application as a standard-resolution screen. When set to `high`, the application can address each high-resolution pixel.

  For example, on a 640x960 high-resolution iPhone screen, if the setting is `standard` then the full-screen stage dimensions would be 320x480, and each application pixel is rendered using four screen pixels.
  If the setting is `high`, the full-screen stage dimensions match the device at 640x960.

  On devices with standard-resolution screens, the stage dimensions match the screen dimensions no matter which setting is used.

  This element can include an `excludeDevices` attribute to specify a space-separated list of devices for which the setting is not applied: for these devices, the opposite value will apply to that given in the element.
  In other words, if the requestedDisplayResolution value is high, the excluded devices use standard resolution. If the requestedDisplayResolution value is standard, the excluded devices use high resolution.

  For example: `<requestedDisplayResolution excludeDevices="iPad3 iPad4">high</requestedDisplayResolution>`

## Device names

The names used in `excludeDevices` and `forceCPURenderModeForDevices` are iOS device model names or model name prefixes.
For example, the value iPad3,1 refers specificially to a Wi-Fi 3rd-generation iPad (but not GSM or CDMA 3rd-generation iPads).
Alternatively, the value iPad3 refers to any 3rd-generation iPad.
An unofficial list of iOS model names is available as the 'Identifier' column at the [iPhone wiki Models page](https://www.theiphonewiki.com/wiki/Models).
