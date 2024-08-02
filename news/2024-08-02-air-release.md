---
title: Release 51.1.1.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.1.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.1.1/release-notes/Release_Notes_AIR_SDK_51.1.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.1.1)  


### Features

- AIR-6196: Allowing ANEs for Android to have a single platform
- AIR-6197: ability to use AAR files for Android ANEs
- AIR-6679: AIR app bundle creation to use architecture option
- AIR-7069: AIR URL requests should include app-id in a custom header
- AIR-7114: Ability to turn off rotation animations for AIR apps with 'orientationAnimation'
- AIR-7121: Updating Android Gradle builds to AGP 8.4, minSdk 21, target 34
- AIR-7139: Updating icon/banner sizes for Android TV applications
- AIR-7150: Android app descriptor elements for manifestPlaceholders
- AIR-7157: AIR Android support for display cut-out modes
- AIR-7299: Adding configuration settings for ELS to control fallback and key storage
- AIR-7303: Compiler to support '\u{nnnnnn}' format for Unicode chars
- AIR-7315: WebSocket to dispatch and respond to certificate errors
- [github-461](https://github.com/airsdk/Adobe-Runtime-Support/issues/461): Adding ADT handling and updating platform conversion for cmdline bundle
- [github-3297](https://github.com/airsdk/Adobe-Runtime-Support/issues/3297): Adding Android app descriptor settings for compileSdk and build tools folder
- [github-3298](https://github.com/airsdk/Adobe-Runtime-Support/issues/3298): Adding support for iosSimulator in the ADT configuration file
- [github-3349](https://github.com/airsdk/Adobe-Runtime-Support/issues/3349): Adding '-compiler.float' option to turn off float support
- [github-3371](https://github.com/airsdk/Adobe-Runtime-Support/issues/3371): Android WebView to allow file chooser dialogs in forms

### Bug fixes

- AIR-7142: Android OpenGL ES context is lost on device rotation
- AIR-7265: Enhanced ELS v2 file format with error checking
- [github-162](https://github.com/airsdk/Adobe-Runtime-Support/issues/162): Fixing rounding to ensure large scaled-down bitmaps display properly
- [github-1494](https://github.com/airsdk/Adobe-Runtime-Support/issues/1494): Hooking up WebView permission requests to existing PermissionManager implementations
- [github-3307](https://github.com/airsdk/Adobe-Runtime-Support/issues/3307): Ensuring Win32 webview loads an HTML-based AIR app via a FILE url
- [github-3310](https://github.com/airsdk/Adobe-Runtime-Support/issues/3310): Removing redundant WebKit/FP files from AIR SDK
- [github-3334](https://github.com/airsdk/Adobe-Runtime-Support/issues/3334): Correcting debugline values for 'getlex' instructions
- [github-3356](https://github.com/airsdk/Adobe-Runtime-Support/issues/3356): Fixing Array/Vector 'includes' method for strings created via parsing
- [github-3357](https://github.com/airsdk/Adobe-Runtime-Support/issues/3357): Preventing iOS crash when starting up with Scout
- [github-3360](https://github.com/airsdk/Adobe-Runtime-Support/issues/3360): Allowing file uploads from content URIs on Android
- [github-3370](https://github.com/airsdk/Adobe-Runtime-Support/issues/3370): Fixing Android ELS key being reset by AS3 call