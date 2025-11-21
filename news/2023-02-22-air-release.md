---
title: Release 50.2.1.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.1.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.1.1/release-notes/Release_Notes_AIR_SDK_50.2.1.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.1.1)  

<!-- truncate -->

### Features

- AIR-4357: AIR Android – adding `runtimeInBackgroundThread` flag to app descriptor
- AIR-6386: Adding handlers for Developer ID Application certs for .air on macOS
- AIR-6424: Adding support for TCP_NODELAY via a host name flag
- AIR-6438: Adding support for content:// URIs on Android
- [github-956](https://github.com/airsdk/Adobe-Runtime-Support/issues/956): Adding gradle dependencies sections to Android ANEs
- [github-2357](https://github.com/airsdk/Adobe-Runtime-Support/issues/2357): Adding 'onRequestPermissionsResult' mechanism for Android ANEs to use
- [github-2369](https://github.com/airsdk/Adobe-Runtime-Support/issues/2369): Adding a package error if the macOS captive runtime is malformed
- [github-2417](https://github.com/airsdk/Adobe-Runtime-Support/issues/2417): Building support for Apple tvOS applications
- [github-2435](https://github.com/airsdk/Adobe-Runtime-Support/issues/2435): Adding configuration file 'iPhoneSimulator' entry
- [github-2467](https://github.com/airsdk/Adobe-Runtime-Support/issues/2467): Adding Java FREByteArray setLength method
- [github-2469](https://github.com/airsdk/Adobe-Runtime-Support/issues/2469): Removing default Android INTERNET permission injection


### Bug fixes

- AIR-5846: Remove A2712Enabler from SDK/runtime
- [github-2208](https://github.com/airsdk/Adobe-Runtime-Support/issues/2208): Allow activation of windows on Linux even if they aren’t owner/owned
- [github-2339](https://github.com/airsdk/Adobe-Runtime-Support/issues/2339): Ensuring Win32 Webview classes move properly between stages
- [github-2372](https://github.com/airsdk/Adobe-Runtime-Support/issues/2372): Adding a default string for `NSLocationAlwaysAndWhenInUseUsageDescription` in IPA info plist file
- [github-2375](https://github.com/airsdk/Adobe-Runtime-Support/issues/2375): Fixing framework code resources in IPA signature
- [github-2385](https://github.com/airsdk/Adobe-Runtime-Support/issues/2385): Reverting FDB Worker workaround from - [github-399](https://github.com/airsdk/Adobe-Runtime-Support/issues/399)
- [github-2441](https://github.com/airsdk/Adobe-Runtime-Support/issues/2441): Ensuring IPA framework packaging handles universal binaries without armv7
