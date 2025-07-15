---
title: ADT -installApp
sidebar_label: installApp
sidebar_position: 7
---

The `-installApp` command installs an app on a device or emulator.

You must uninstall an existing app before reinstalling with this command.

The command uses the following syntax:

```
adt -installApp 
	-platform platformName 
	-platformsdk path-to-sdk 
	-device deviceID 
	‑package fileName
```

### `-platform`

The name of the platform of the device. Specify ios or android. This is optional, as ADT will determine which platform to connect to using the file extension of the package.

### `-platformsdk`

The path to the platform SDK for the target device (optional):
  
- Android - The AIR 2.6+ SDK includes the tools from the Android SDK needed to implement the relevant ADT commands. Only set this value to use a different version of the Android SDK. Also, the platform SDK path does not need to be supplied on the command line if the `AIR_ANDROID_SDK_HOME` environment variable is already set. (If both are set, then the path provided on the command line is used.)

- iOS - The AIR SDK ships with a captive iOS SDK. The `-platformsdk` option lets you package applications with an external SDK so that you are not restricted to using the captive iOS SDK. For example, if you have built an extension with the latest iOS SDK, you can specify that SDK when packaging your application. Additionally, when using ADT with the iOS Simulator, you must always include the `-platformsdk` option, specifying the path to the iOS Simulator SDK.

### `-device`

Specify `ios_simulator`, the serial number (Android), or handle (iOS) of the connected device. On iOS, this parameter is required; on Android, this parameter only needs to be specified when more than one Android device or emulator is attached to your computer and running. If the specified device is not connected, ADT returns exit code 14: Device error (Android) or Invalid device specified (iOS). If more than one device or emulator is connected and a device is not specified, ADT returns exit code 2: Usage error.

:::note
Installing an IPA file directly to an iOS device is available in AIR 3.4 and higher and requires iTunes 10.5.0 or higher.
:::

Use the adt `‑devices` command (available in AIR 3.4 and higher) to determine the handle or serial number of connected devices. Note that on iOS, you use the handle, not the Device UUID. For more information, see [ADT devices command](devices.md).

Additionally, on Android, use the Android ADB tool to list the serial numbers of attached devices and running emulators:

```
adb devices
```

### `-package`

The file name of the package to install. On iOS, this must be an IPA file. On Android, this must be an APK package or an AAB file (which will be converted into an APK using bundletool). If the specified package is already installed, ADT returns error code 14:Device error.


