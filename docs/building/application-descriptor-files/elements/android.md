---
title: Android Elements
sidebar_label: android
sidebar_position: 5
---

The `android` element provides platform-specific settings for applications running on Android devices. It can contain the following optional elements.

## Elements

### `colorDepth`

The bit-depth of color to use when rendering on Android devices. By default this is `32bit` but can be set to `16bit` as long as there is no use of `StageVideo` in an application.

#### Example

```xml
<android>
    <colorDepth>16bit</colorDepth>
    <manifestAdditions>...</manifestAdditions>
</android>
```

### `containsVideo`

Specifies whether the application will contain any video content or not. This is used to determine whether to create a graphical surface for `StageVideo` content in the application.

One of the following values:

- `true`
- `false`

#### Example

```xml
<android>
    <containsVideo>true</containsVideo>
    <manifestAdditions>...</manifestAdditions>
</android>
```

### `webContentsDebuggingEnabled`

Set to `true` to enable `StageWebView` debugging, so that developers can debug web content (HTML / CSS / JavaScript) used in AIR Android applications.

To perform the debugging, connect your Android device to your machine via USB cable and navigate to `chrome://inspect` to debug embedded web content in your AIR application.

#### Example

```xml
<android>
    <webContentsDebuggingEnabled>true</webContentsDebuggingEnabled>
    <manifestAdditions>...</manifestAdditions>
</android>
```

### `assetPacks`

This section contains a list of `assetPack` entries that define folders that should be packaged up for use by Android's Play Asset Delivery mechanism.

Each asset pack item has attributes to provide an ID value (used to retrieve the asset pack from the Android application at runtime); a delivery mechanism (one of `on-demand`, `fast-follow`, or `install-time`); and a folder name. The contents of this folder will then be packaged into the asset pack rather than included in the main part of the App Bundle.

For example:

```xml
<android>
	<assetPacks>
		<assetPack id="my_asset_pack1" delivery="on-demand" folder="assetpack1"/>
	</assetPacks>
</android>
```

### `manifestAdditions`

Contains a `CDATA` block of text that provides additional settings to be added to the generated Android application's manifest file (AndroidManifest.xml).

#### Details

The `manifestAdditions` element contains XML that will be injected into the AndroidManifest.xml file. It must contain a `manifest` element where attributes and child elements can be specified subject to a set of rules and restrictions.

#### Example

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

#### Restrictions

AIR sets several manifest entries in the generated Android manifest document to ensure that application and runtime features work correctly. You cannot override the following settings:

- You cannot set the following attributes of the `manifest` element:

  - `package`
  - `android:versionCode`
  - `android:versionName`

- You cannot set the following attributes for the main `activity` element:

  - `android:label`
  - `android:icon`

- You cannot set the following attributes of the `application` element:

  - `android:theme`
  - `android:name`
  - `android:label`
  - `android:windowSoftInputMode`
  - `android:configChanges`
  - `android:screenOrientation`
  - `android:launchMode`



### `BuildLegacyAPK` 

(optional)

Available: 33.1.1.698

If `true` then `adt` will use the legacy build process to create an APK. The current process uses Android build tools and Gradle to create AAB and APK outputs. Setting this value to `true` will utilise the legacy Java build process for packaging an APK. It will not affect the AAB process. 

The default is `false`, which will use the modern Gradle build process. Note that setting this to `true` may cause problems for new applications needing some Android features or using ANEs.

#### Example

```xml
<android>
	<manifestAdditions></manifestAdditions>
	<BuildLegacyAPK>true</BuildLegacyAPK>
</android>
```



### `addAirToAppID`

(optional)

Available: 50.0.0.1

This flag provides a way to remove the default `air.` prefix that the AIR Developer Tool normally adds to an Android application ID. By default this is `true` which matches the earlier Adobe behaviour,
but if an application already has a fully-qualified reverse domain name type identifier, then this could be set to `false` in order to generate an application without the prefix in the Android package ID.


### `buildArchitectures`

(optional)

Available: 50.0.0.1

This is a utility setting to instruct the AIR Developer Tool to only use certain architectures in the final APK/AAB file. It overrides whatever might have been provided on the command line instruction to
ADT, so this can be used to change the outputs of a build that was created via Adobe Animate or other IDEs that haven't been updated to provide the appropriate options.

The default is `armv7,armv8,x86,x64` which means an Android App Bundle would include all of the supported platforms. To remove support for 32-bit devices, this could be updated to `armv8,x64`.
Or to remove support for Intel-architecture devices, this could be set to `armv7,armv8`.


### `createAppBundle`

(optional)

Available: 50.0.0.1

This is another utility, to force the AIR Developer Tool to create an Android App Bundle file even if the command line or IDE had requested an APK file.
Note that the output filename will not be updated so if the request was to generate a file "output.apk" then this will be honoured even though this .apk file is actually an AAB.

### `uncompressedExtensions`

(optional)

Available: 50.0.0.1

This utility setting can be used to specify a set of file extensions that should not be compressed when stored in the APK or AAB file. Normally these are compressed formats and so most files
are added using the 'deflate' option, but using this setting the developer can prevent certain files from being compressed, which allows them to be accessed via some of the Android asset APIs.

#### Example

```xml
<android>
	<uncompressedExtensions>jpg,gif,png</uncompressedExtensions>
</android>
```


### `newFontRenderingFromAPI`

(optional)

Available: 33.1.1.779

Due to changes in the native Android font rendering code, the AIR runtime will switch to render text fields using the Android Java APIs when a device is running Android S or later.
This option gives some finer control over this switch. By default the value is `31` which is the API level for Android S, but if a lower value is used, the new Java-based APIs will be used
from that API level and above.

To always use the Java-based font rendering, the value should be set to zero. To never use it (which is not advisable unless the text is always within the Latin character set) it can be set to 9999 or similar.


### `webViewAllowFileAccess`

(optional)

Available: 33.1.1.698

Allows an Android webview control to access local files via `WebSettings.setAllowFileAccess(true)`. Default is `false`.


### `preventDeviceModelAccess`

(optional)

Available: 33.1.1.795

This is a security/privacy setting to prevent the runtime from accessing the device model (`android.os.Build.MODEL`). Default is `false` and should be set to `true` if this `MODEL` property access should not be made.


### `disableSensorAccess`

(optional)

Available: 50.1.1.1

This goes beyond the above privacy setting, to completely disable the access of sensor hardware APIs including input mechanisms, orientation sensors, and telephony services.
Note that this value can be overriden by adding a file into the application's app storage folder, see release notes for further details.

The default value is `false`, and should be set to `true` if required by privacy controls.


### `runtimeInBackgroundThread`

(optional)

Available: 50.2.1.1

If `true`, this causes the AIR runtime to be launched in a separate, background thread rather than in the main Android UI thread. This should help prevent ANE issues,
but may require some updates in other Android Java code (i.e. from AIR Native Extensions that may need some of their code to run on the UI thread). Default is `false`.


### `storageAccessFrameworkFromAPI`

(optional)

Available: 50.2.1.1

This changes how the ActionScript `File.browse...` methods work, and the file-based permission handling, due to changes in the Android file system security.
The default value here is `30` which equates to Android R (11.0). From this version and beyond, the `File` browse methods will use the Storage Access Framework and
launch the standard system intents to browse for opening and saving files or to select a folder. Permissions are then automatically granted and persisted for the selected files/folder.

To switch to this mechanism from earlier versions of Android, the value can be changed to the appropriate API level, or to ensure this doesn't change behaviour yet, the value can be set much higher.

