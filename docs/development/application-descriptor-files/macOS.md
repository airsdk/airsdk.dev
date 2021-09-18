---
title: macOS elements
sidebar_position: 6
---

The `macOS` element provides platform-specific settings for applications running on the macOS operating systems. It can contain the following elements:

- `Entitlements`: developers may need to specify particular strings for their application entitlements, to ensure an appropriate message is shown when requesting access to system resources such as webcams.
  Use the Entitlements element to specify this information as key-value pairs enclosed in a CDATA block. For more information, see the [Entitlements documentation](https://developer.apple.com/documentation/bundleresources/entitlements) in the Apple Developer website.

  For example:

  ```xml
  <macOS>
    <Entitlements>
      <![CDATA[
         <key>com.apple.security.device.camera</key>
         <true/>
      ]]>
    </Entitlements>
  </macOS>
  ```

- `InfoAdditions`: Allows you to specify additional properties of a macOS application. Properties are provided as key-value pairs enclosed in a CDATA block and are injected into the application's Info.plist file.
  For more information, see the [Information Property List documentation](https://developer.apple.com/documentation/bundleresources/information_property_list) in the Apple Developer website.

  For example:

  ```xml
  <macOS>
    <InfoAdditions>
      <![CDATA[
        <key>NSCameraUsageDescription</key>
        <string>Our application needs to use your camera for some purpose</string>
      ]]>
    </InfoAdditions>
  </macOS>
  ```
