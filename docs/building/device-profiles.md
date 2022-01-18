---
title: Device Profiles
sidebar_position: 10
---

Profiles are a mechanism for defining the classes of computing devices on which your application works. A profile defines a set of APIs and capabilities typically supported on a particular class of device. The available profiles include:

- `desktop`
- `extendedDesktop`
- `mobileDevice`
- `extendedMobileDevice`

You can define the profiles for your application in the application descriptor. Users of computers and devices in the included profiles can install your application, users of other computers and devices cannot. For example, if you include only the desktop profile in your application descriptor, users can install and run your application only on desktop computers.

If you include a profile that your application does not truly support, the user experience in such environments may be poor. If you do not specify any profiles in the application descriptor, then AIR does not limit your application. You can package the application in any of the supported formats, and users with devices from any profile can install it — however, it may fail to work properly at runtime.

Where possible, profile restrictions are enforced when you package your application. For example, if you include only the extendedDesktop profile, then you cannot package your application as an AIR file — only as a native installer. Likewise, if you do not include the mobileDevice profile, you cannot package your application as an Android APK.

A single computing device can support more than one profile. For example, AIR on desktop computers support applications from both the desktop and the extendedDesktop profiles. However, an extended desktop profile application can communicate with native processes and MUST be packaged as a native installer (exe, dmg, deb, or rpm). A desktop profile application, on the other hand, cannot communicate with a native process. A desktop profile application can be packaged as either an AIR file or a native installer.

The inclusion of a feature in a profile indicates that support for that feature is common in the class of devices for which that profile is defined. However, it does not mean that every device in a profile supports every feature. For example, most, but not all, mobile phones contain an accelerometer. Classes and features that do not have universal support usually have a boolean property that you can check before using the feature. In the accelerometer case, for instance, you can test the static property Accelerometer.isSupported to determine whether the current device has a supported accelerometer.

There are following profiles can be assigned to your AIR application using the supportedProfiles element in the application descriptor:

- **Desktop**: The desktop profile defines a set of capabilities for AIR applications that are installed as AIR files on a desktop computer. These applications install and run on supported desktop platforms (Mac OS, Windows, and Linux). AIR applications developed in versions of AIR before AIR 2 can be considered to be in the desktop profile. Some APIs are non-functioning in this profile. For example, desktop applications cannot communicate with native processes.

- **Extended desktop**: The extended desktop profile defines a set of capabilities for AIR applications that are packaged into and installed with a native installer. These native installers are EXE files on Windows, DMG files on Mac OS, and BIN, DEB, or RPM files on Linux. Extended desktop applications have additional capabilities that are not available in desktop profile applications. For more information, see [Packaging a desktop native installer](/docs/tutorials/platform/desktop/packaging-native-installer).

- **Mobile device**: The mobile device profile defines a set of capabilities for applications that are installed on mobile devices such as cell phones and tablets. These applications install and run on supported mobile platforms, including Android, Blackberry Tablet OS, and iOS.

- **Extended mobile device**: The extended mobile device profile defines an extended set of capabilities for applications that are installed on mobile devices. Currently, there are no devices that support this profile.

## Restricting target profiles in the application descriptor file

As of AIR 2, the application descriptor file includes a supportedProfiles element, which lets you restrict target profiles. For example, the following setting specifies that the application is only available in the desktop profile:

```xml
<supportedProfiles>desktop</supportedProfiles>
```

When this element is set, the application can only be packaged in the profiles you list. Use the following values:

- `desktop` — The desktop profile
- `extendedDesktop` — The extended desktop profile
- `mobileDevice` — The mobile device profile

The `supportedProfiles` element is optional. When you do not include this element in the application descriptor file, the application can be packaged and deployed for any profile.

To specify multiple profiles in the `supportedProfiles` element, separate each with a space character, as in the following:

```xml
<supportedProfiles>desktop extendedDesktop</supportedProfiles>
```

## Capabilities of different profiles

The following table lists the classes and features that are not supported in all profiles.

| Class or Feature                                                    | desktop | extendedDesktop | mobileDevice |
| ------------------------------------------------------------------- | ------- | --------------- | ------------ |
| Accelerometer (Accelerometer.isSupported)                           | No      | No              | Check        |
| Accessibility (Capabilities.hasAccessibility)                       | Yes     | Yes             | No           |
| Acoustic echo cancellation (Microphone.getEnhancedMicrophone())     | Yes     | Yes             | No           |
| ActionScript 2                                                      | Yes     | Yes             | No           |
| CacheAsBitmap matrix                                                | No      | No              | Yes          |
| Camera (Camera.isSupported)                                         | Yes     | Yes             | Yes          |
| CameraRoll                                                          | No      | No              | Yes          |
| CameraUI (CameraUI.isSupported)                                     | No      | No              | Yes          |
| Captive runtime bundles                                             | Yes     | Yes             | Yes          |
| ContextMenu (ContextMenu.isSupported)                               | Yes     | Yes             | No           |
| DatagramSocket (DatagramSocket.isSupported)                         | Yes     | Yes             | Yes          |
| DockIcon (NativeApplication.supportsDockIcon)                       | Check   | Check           | No           |
| Drag-and-drop (NativeDragManager.isSupported)                       | Yes     | Yes             | Check        |
| EncryptedLocalStore (EncryptedLocalStore.isSupported)               | Yes     | Yes             | Yes          |
| Flash Access (DRMManager.isSupported)                               | Yes     | Yes             | No           |
| GameInput (GameInput.isSupported)                                   | No      | No              | No           |
| Geolocation (Geolocation.isSupported)                               | No      | No              | Check        |
| HTMLLoader (HTMLLoader.isSupported)                                 | Yes     | Yes             | No           |
| IME (IME.isSupported)                                               | Yes     | Yes             | Check        |
| LocalConnection (LocalConnection.isSupported)                       | Yes     | Yes             | No           |
| Microphone (Microphone.isSupported)                                 | Yes     | Yes             | Check        |
| Multichannel audio (Capabilities.hasMultiChannelAudio())            | No      | No              | No           |
| Native Extensions                                                   | No      | Yes             | Yes          |
| NativeMenu (NativeMenu.isSupported)                                 | Yes     | Yes             | No           |
| NativeProcess (NativeProcess.isSupported)                           | No      | Yes             | No           |
| NativeWindow (NativeWindow.isSupported)                             | Yes     | Yes             | No           |
| NetworkInfo (NetworkInfo.isSupported)                               | Yes     | Yes             | Check        |
| Open files with default application                                 | Limited | Yes             | No           |
| PrintJob (PrintJob.isSupported                                      | Yes     | Yes             | No           |
| SecureSocket (SecureSocket.isSupported)                             | Yes     | Yes             | Check        |
| ServerSocket (ServerSocket.isSupported)                             | Yes     | Yes             | Yes          |
| Shader                                                              | Yes     | Yes             | Limited      |
| Stage3D (Stage.stage3Ds.length)                                     | Yes     | Yes             | Yes          |
| Stage orientation (Stage.supportsOrientationChange)                 | No      | No              | Yes          |
| StageVideo                                                          | No      | No              | Check        |
| StageWebView (StageWebView.isSupported)                             | Yes     | Yes             | Yes          |
| Start application at login (NativeApplication.supportsStartAtLogin) | Yes     | Yes             | No           |
| StorageVolumeInfo (StorageVolumeInfo.isSupported)                   | Yes     | Yes             | No           |
| System idle mode                                                    | No      | No              | Yes          |
| SystemTrayIcon (NativeApplication.supportsSystemTrayIcon)           | Check   | Check           | No           |
| Text Layout Framework input                                         | Yes     | Yes             | No           |
| Updater (Updater.isSupported)                                       | Yes     | No              | No           |
| XMLSignatureValidator (XMLSignatureValidator.isSupported)           | Yes     | Yes             | No           |

The entries in the table have the following meanings:

- _Check_ — The feature is supported on some, but not all devices in the profile. You should check at runtime whether the feature is supported before using it.
- _Limited_ — The feature is supported, but has significant limitations. See the relevant documentation for more information.
- _No_ — The feature is not supported in the profile.
- _Yes_ — The feature is supported in the profile. Note that individual computing devices make lack the hardware necessary for a feature. For example, not all phones have cameras.

## Specifying profiles when debugging with ADL

ADL checks if you specify supported profiles in the supportedProfiles element of the application descriptor file. If you do, by default ADL uses the first supported profile listed as the profile when debugging.

You can specify a profile for the ADL debug session by using the -profile command-line argument. (See [AIR Debug Launcher (ADL)](air-debug-launcher).) You can use this argument regardless of whether you specify a profile in the supportedProfiles element in the application descriptor file. However, if you do specify a supportedProfiles element, it must include the profile you specify in the command line. Otherwise, ADL generates an error.
