---
title: Release 51.2.1.5
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.1.5**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.1.5/release-notes/Release_Notes_AIR_SDK_51.2.1.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

*For Flex users select manual install method.*


## Bug fixes

- AIR-7703: ANEs do not package symlinks when built on Linux
- AIR-7706: AIR Android crash when enumerating fonts
- AIR-7707: AIR Android crash in audio callback when shutting down
- AIR-7708: AIR Android crash in timer callback post destruction
- [github-392](https://github.com/airsdk/Adobe-Runtime-Support/issues/392): Fixing y-flip of Stage3D render to bitmapdata for OpenGL/ES
- [github-3766](https://github.com/airsdk/Adobe-Runtime-Support/issues/3766): Updating Linux loading of openssl library
- [github-3781](https://github.com/airsdk/Adobe-Runtime-Support/issues/3781): Ensuring linkerscript generation creates appropriate script when configured
- [github-3788](https://github.com/airsdk/Adobe-Runtime-Support/issues/3788): Streamlining Netstream disposal process on Android
- [github-3811](https://github.com/airsdk/Adobe-Runtime-Support/issues/3811): Splash screen display skips first-frame script execution on desktop
- [github-3828](https://github.com/airsdk/Adobe-Runtime-Support/issues/3828): Updating jpeg decoder to cope with V4L2 camera
- [github-3833](https://github.com/airsdk/Adobe-Runtime-Support/issues/3833): Fixing crash in macOS async texture uploads
- [github-3834](https://github.com/airsdk/Adobe-Runtime-Support/issues/3834): Fixing DateTimeFormatter default locale on Android
