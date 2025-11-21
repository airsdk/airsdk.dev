---
title: Release 51.2.1.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

**AIR SDK 51.2.1.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.1.1/release-notes/Release_Notes_AIR_SDK_51.2.1.pdf) or see https://airsdk.harman.com/release_notes?q=51.2.1.1

We have used the previous production release, 51.1.3.10, as the baseline for the below features/bug fix list - i.e. this disregards the updates from the pre-release versions (51.2.0.x).

<!-- truncate -->

### Features

- AIR-6452: Updating ADT analytics to use airsdk.harman.com and log country/language
- AIR-7037: Adding support for coloured emoji using DirectWrite font support
- AIR-7330: Android SecureSocket to be implemented via Android's SSLSocket class
- AIR-7397: AIR Windows to support ANGLE for OpenGL ES rendering
- AIR-7414: AIR Linux support for GTK3
- AIR-7415: Audio/Video on Linux using FFMPEG
- AIR-7421: AIR updates to shutdown the runtime more cleanly
- AIR-7430: AIR Linux ADT to support 'arch' option for cross-CPU bundling
- AIR-7440: ADT macOS bundles should accept an ICNS file
- AIR-7528: AIR ANE - API to access the graphics context (OGLES)
- AIR-7530: AIR Diagnostics - app descriptor set-up in the runtime
- AIR-7546: Updating license file generation and handling with validity checks
- AIR-7563: ADT to output symbols from IPA production builds via IPASymbolFile setting
- AIR-7567: ADT configuration to link iOS executables via LLVM and iPhoneOS SDK
- [github-1854](https://github.com/airsdk/Adobe-Runtime-Support/issues/1854), [github-1493](https://github.com/airsdk/Adobe-Runtime-Support/issues/1493): Windows only: StageWebView constructor handles userAgent, enableContextMenu
- [github-3616](https://github.com/airsdk/Adobe-Runtime-Support/issues/3616): Optimising memory usage for every-frame events and lists
- [github-3647](https://github.com/airsdk/Adobe-Runtime-Support/issues/3647): Adding IPA code signature checks on start-up


### Bug fixes

- AIR-7631: AIR Windows runtime crash when using NAIP
- AIR-7632: AIR throws error 5016 under ADL
- AIR-7662: MediaBuffer ANE API does not properly update
- [github-3274](https://github.com/airsdk/Adobe-Runtime-Support/issues/3274): Ensuring OSX secure socket is robust for LetsEncrypt
- [github-3394](https://github.com/airsdk/Adobe-Runtime-Support/issues/3394): Correcting AOT output for unplus (float support)
- [github-3426](https://github.com/airsdk/Adobe-Runtime-Support/issues/3426): Linux camera updates to correctly select mode including FPS
- [github-3506](https://github.com/airsdk/Adobe-Runtime-Support/issues/3506): Fixing Matrix3D interpolation calculation (for 51.2+ apps)
- [github-3573](https://github.com/airsdk/Adobe-Runtime-Support/issues/3573): Ensuring Scout on Android connects with complex app timings
- [github-3727](https://github.com/airsdk/Adobe-Runtime-Support/issues/3727): Updating Win32 timezone cache mechanism
- [github-3729](https://github.com/airsdk/Adobe-Runtime-Support/issues/3729): Ensuring BitmapData.draw on Android picks up all content
- [github-3735](https://github.com/airsdk/Adobe-Runtime-Support/issues/3735): Regular Expression did not work correctly with unicode characters outside of range 0000-FFFF
- [github-3748](https://github.com/airsdk/Adobe-Runtime-Support/issues/3748): AIR getTimer() returns incorrect values on time change on Linux-based OS
- [github-3755](https://github.com/airsdk/Adobe-Runtime-Support/issues/3755): Fixing ANR caused by nativeShowOriginalRect being called from UI thread
