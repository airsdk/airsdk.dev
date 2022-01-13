---
title: ADT -runtimeVersion
sidebar_label: runtimeVersion (deprecated)
# sidebar_position: 12
---

:::info Deprecated
The shared runtime on Android has been removed so this command has no real usage now
:::

The `-runtimeVersion` command reports the installed version of the AIR runtime on a device or emulator. The command uses the following syntax:

```
adt -runtimeVersion -platform platformName -platformsdk path_to_sdk -device deviceID
```

### `-platform`

The name of the platform of the device. Currently this command is only supported on the Android platform. Use the name, `android`.

### `-platformsdk`

The path to the platform SDK for the target device. Currently, the only supported platform SDK is Android. The AIR 2.6+ SDK includes the tools from the Android SDK needed to implement the relevant ADT commands. Only set this value to use a different version of the Android SDK. Also, the platform SDK path does not need to be supplied on the command line if the `AIR_ANDROID_SDK_HOME` environment variable is already set. (If both are set, then the path provided on the command line is used.)

### `-device`

The serial number of the device. The device only needs to be specified when more than one device or emulator is attached to your computer and running. If the runtime is not installed or the specified device is not connected, ADT returns exit code 14: Device error. If more than one device or emulator is connected and a device is not specified, ADT returns exit code 2: Usage error.

On Android, use the Android ADB tool to list the serial numbers of attached devices and running emulators:

```
adb devices
```
