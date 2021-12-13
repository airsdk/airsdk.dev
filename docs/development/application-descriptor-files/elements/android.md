---
title: android 
sidebar_position: 5
---

The `android` element provides platform-specific settings for applications running on Android devices. It can contain the following optional elements:

- `colorDepth`: the bit-depth of color to use when rendering on Android devices. By default this is `32bit` but can be set to `16bit` as long as there is no use of `StageVideo` in an application.

- `containsVideo`: specifies whether the application will contain any video content or not. This is used to determine whether to create a graphical surface for StageVideo content in the application.

- `webContentsDebuggingEnabled`: set to true to enable StageWebView debugging, so that developers can debug web content (HTML / CSS / JavaScript) used in AIR Android applications.
  To perform the debugging, connect your Android device to your machine via USB cable and navigate to chrome://inspect to debug embedded web content in your AIR application.

- `assetPacks`: this section contains a list of `assetPack` entries that define folders that should be packaged up for use by Android's Play Asset Delivery mechanism.
  Each asset pack item has attributes to provide an ID value (used to retrieve the asset pack from the Android application at runtime); a delivery mechanism (one of `on-demand`,
  `fast-follow`, or `install-time`); and a folder name. The contents of this folder will then be packaged into the asset pack rather than included in the main part of the App Bundle.

  For example:

  ```xml
  <android>
    <assetPacks>
      <assetPack id="my_asset_pack1" delivery="on-demand" folder="assetpack1"/>
    </assetPacks>
  </android>
  ```

- `manifestAdditions`: contains a CDATA block of text that provides additional settings to be added to the generated Android application's manifest file (AndroidManifest.xml).

## Manifest additions

The `manifestAdditions` element contains XML that will be injected into the AndroidManifest.xml file. It must contain a `manifest` element where attributes and child elements can be specified
subject to a set of rules and restrictions.

For example:

```xml
<android>
  <manifestAdditions>
    <![CDATA[
      <manifest android:sharedUserID="1001">
        <uses-permission android:name="android.permission.CAMERA"/>
        <uses-feature android:required="false" android:name="android.hardware.camera"/>
        <application  android:allowClearUserData="true"
                      android:enabled="true"
                      android:persistent="true">
		  <meta-data android:name="android.max_aspect" android:value="2.16" />
	    </application>
      </manifest>
    ]]>
  </manifestAdditions>
</android>
```

AIR sets several manifest entries in the generated Android manifest document to ensure that application and runtime features work correctly. You cannot override the following settings:

- You cannot set the following attributes of the manifest element:

  - package
  - android:versionCode
  - android:versionName

- You cannot set the following attributes for the main activity element:

  - android:label
  - android:icon

- You cannot set the following attributes of the application element:
  - android:theme
  - android:name
  - android:label
  - android:windowSoftInputMode
  - android:configChanges
  - android:screenOrientation
  - android:launchMode
