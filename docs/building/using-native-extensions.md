---
title: Using native extensions
sidebar_position: 5
---

Native extensions for Adobe AIR provide ActionScript APIs that provide you access to device-specific functionality programmed in native code. Native extension developers sometimes work with device manufacturers, and sometimes are third-party developers.

A native extension is a combination of:

- ActionScript classes
- Native code

However, as an AIR application developer using a native extension, you work with only the ActionScript classes.

Native extensions are useful in the following situations:

- The native code implementation provides access to platform-specific features. These platform-specific features are not available in the built-in ActionScript classes, and are not possible to implement in application-specific ActionScript classes. The native code implementation can provide such functionality because it has access to device-specific hardware and software.

- A native code implementation can sometimes be faster than an implementation that uses only ActionScript.

- The native code implementation can provide ActionScript access to legacy native code.

## AIR Native Extension (ANE) files

Native extension developers package a native extension into an ANE file. An ANE file is an archive file that contains the necessary libraries and resources for the native extension.

Note for some devices, the ANE file contains the native code library that the native extension uses. But for other devices, the native code library is installed on the device. In some cases, the native extension has no native code at all for a particular device; it is implemented with ActionScript only.

As an AIR application developer, you use the ANE file as follows:

- Include the ANE file in the application’s library path in the same way you include a SWC file in the library path. This action allows the application to reference the extension’s ActionScript classes.

  :::note
  When compiling your application, be sure to use dynamic linking for the ANE. If you use Flash Builder, specify External on the ActionScript Builder Path Properties panel; if you use the command line, specify `-external-library-path`.
  :::

- Package the ANE file with the AIR application.

## Native extensions versus the NativeProcess ActionScript class

ActionScript 3.0 provides a `NativeProcess` class. This class lets an AIR application execute native processes on the host operating system. This capability is similar to native extensions, which provide access to platform-specific features and libraries. When deciding on using the `NativeProcess` class versus using a native extension, consider the following:

- Only the `extendedDesktop` AIR profile supports the `NativeProcess` class. Therefore, for applications with the AIR profiles `mobileDevice` and `extendedMobileDevice`, native extensions are the only choice.

- Native extension developers often provide native implementations for various platforms, but the ActionScript API they provide is typically the same across platforms. When using the `NativeProcess` class, ActionScript code to start the native process can vary among the different platforms.

- The `NativeProcess` class starts a separate process, whereas a native extension runs in the same process as the AIR application. Therefore, if you are concerned about code crashing, using the `NativeProcess` class is safer. However, the separate process means that you possibly have interprocess communication handling to implement.

## Native extensions versus ActionScript class libraries (SWC files)

A SWC file is an ActionScript class library in an archive format. The SWC file contains a SWF file and other resource files. The SWC file is a convenient way to share ActionScript classes instead of sharing individual ActionScript code and resource files.

A native extension package is an ANE file. Like a SWC file, an ANE file is also an ActionScript class library, containing a SWF file and other resource files in an archive format. However, the most important difference between an ANE file and a SWC file is that only an ANE file can contain a native code library.

:::note
When compiling your application, be sure to use dynamic linking for the ANE file. If you use Flash Builder, specify External on the ActionScript Builder Path Properties panel; if you use the command line, specify `-external-library-path`.
:::

## Supported devices

Starting in AIR 3, you can use native extensions in applications for the following devices:

- Android devices, starting with Android 2.2
- iOS devices, starting with iOS 4.0
- iOS Simulator, starting with AIR 3.3
- Blackberry PlayBook
- Windows desktop devices that support AIR 3.0
- Mac OS X desktop devices that support AIR 3.0

Often, the same native extension targets multiple platforms. The extension’s ANE file contains ActionScript and native libraries for each supported platform. Usually, the ActionScript libraries have the same public interfaces for all the platforms. The native libraries are necessarily different.

Sometimes a native extension supports a default platform. The default platform’s implementation has only ActionScript code, but no native code. If you package an application for a platform that the extension does not specifically support, the application uses the default implementation when it executes. For example, consider an extension that provides a feature that applies only to mobile devices. The extension can also provide a default implementation that a desktop application can use to simulate the feature.

## Supported device profiles

The following AIR profiles support native extensions:

- `extendedDesktop`, starting in AIR 3.0
- `mobileDevice`, starting in AIR 3.0
- `extendedMobileDevice`, starting in AIR 3.0

## Task list for using a native extension

To use a native extension in your application, do the following tasks:

1. Declare the extension in your application descriptor file.
2. Include the ANE file in your application’s library path.
3. Package the application.

## Declaring the extension in your application descriptor

All AIR applications have an application descriptor file. When an application uses a native extension, the application descriptor file includes an `<extensions>` element. For example:

```xml
<extensions>
    <extensionID>com.example.Extension1</extensionID>
    <extensionID>com.example.Extension2</extensionID>
</extensions>
```

The `extensionID` element has the same value as the id element in the extension descriptor file. The extension descriptor file is an XML file called extension.xml. It is packaged in the ANE file. You can use an archive extractor tool to look at the extension.xml file.

:::note
If you use the AIR Package Manager (`apm`) to manage your extensions then it should manage the `<extensions>` element in your application descriptor as part of the application descriptor generation process. See [Install APM](/docs/basics/install-apm) to get started using `apm`.
:::

## Including the ANE file in your application’s library path

To compile an application that uses a native extension, include the ANE file in your library path.

There are a range of tutorials for adding an extension to your IDE on the [airnativeextensions documentation site](https://docs.airnativeextensions.com/docs/tutorials/getting-started).

## Packaging an application that uses native extensions

Most IDEs will package the extensions for you automatically once you have correctly added the extension identifier to your application descriptor and added the extension to the library path.

You can also use ADT directly to package an application that uses native extensions. You can find details about using ADT are at [AIR Developer Tool (ADT)](air-developer-tool/index).

For example, the following ADT command creates a DMG file (a native installer file for Mac OS X) for an application that uses native extensions:

```
adt -package
    -storetype pkcs12
    -keystore myCert.pfx
    -target native
    myApp.dmg
    application.xml
    index.html resources
    -extdir extensionsDir
```

The following command creates an APK package for an Android device:

```
adt -package
    -target apk
    -storetype pkcs12 -keystore ../codesign.p12
    myApp.apk
    myApp-app.xml
    myApp.swf icons
    -extdir extensionsDir
```

The following command creates an iOS package for an iPhone application:

```
adt -package
    -target ipa-ad-hoc
    -storetype pkcs12 -keystore ../AppleDistribution.p12
    -provisioning-profile AppleDistribution.mobileprofile
    myApp.ipa
    myApp-app.xml
    myApp.swf icons Default.png
    -extdir extensionsDir
```

Note the following:

- Use a native installer package type
- Specify the extension directory
- Make sure that the ANE file supports the application’s target device (or contains a default implementation)

### Use a native installer package type

The application package must be a native installer. You cannot create a cross-platform AIR package (a `.air` package) for an application that uses a native extension, because native extensions usually contain native code. However, typically a native extension supports multiple native platforms with the same ActionScript APIs. In these cases, you can use the same ANE file in different native installer packages.

The following table summarizes the value to use for the `-target` option of the ADT command:

| Application’s target platform       | `-target`                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| Mac OS X or Windows desktop devices | `-target native` <br/>`-target bundle`                                                  |
| Android                             | `-target apk` <br/>or other Android package targets                                     |
| iOS                                 | `-target ipa-ad-hoc` <br/>or other iOS package targets                                  |
| iOS Simulator                       | `-target ipa-test-interpreter-simulator` <br/>`-target ipa-debug-interpreter-simulator` |

### Specify the extension directory

Use the ADT option `-extdir` to tell ADT the directory that contains the native extensions (ANE files).

For details about this option, see [File and path options](air-developer-tool/option-sets/file-and-path-options).

### Make sure that the ANE file supports the application’s target device

When providing an ANE file, the native extension developer informs you which platforms the extension supports. You can also use an archive extractor tool to look at the contents of the ANE file. The extracted files include a directory for each supported platform.

:::info
A good ANE developer should include a "default" implementation in an extension. This implementation will be used when there is no specific native implementation for the current platform. 

However there are extensions that don't contain this "default" implementation. In this case your code will fail to run if you attempt to access the functionality of the extension.
:::

Knowing which platforms the extension supports is important when packaging the application that uses the ANE file. Consider the following rules:

- To create an Android application package, the ANE file must include the Android-ARM platform. Alternatively, the ANE file must include the default platform and at least one other platform.

- To create an iOS application package, the ANE file must include the iPhone-ARM platform. Alternatively, the ANE file must include the default platform and at least one other platform.

- To create an iOS Simulator application package, the ANE file must include the iPhone-x86 platform.

- To create a Mac OS X application package, the ANE file must include the MacOS-x86 platform. Alternatively, the ANE file must include the default platform and at least one other platform.

- To create a Windows application package, the ANE file must include the Windows-x86 platform. Alternatively, the ANE file must include the default platform and at least one other platform.


## More Help topics 

- [AIR Native Extensions Tutorials](https://docs.airnativeextensions.com/docs/tutorials/)