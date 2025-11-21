---
title: Release 51.2.2.5
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.5**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.5/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug Fixes

- AIR-7810: AIR trace() failed to output to console from iOS devices
- AIR-7811: AIR Diagnostics for URL requests on iOS
- [github-3821](https://github.com/airsdk/Adobe-Runtime-Support/issues/3821): Protecting against crash in video decoder thread invalid mutex usage
- [github-3910](https://github.com/airsdk/Adobe-Runtime-Support/issues/3910): Fixing ffmpeg-based video playback via VideoTexture
- [github-3914](https://github.com/airsdk/Adobe-Runtime-Support/issues/3914): Fixing Linux crash on second NativeWindow creation
- [github-3972](https://github.com/airsdk/Adobe-Runtime-Support/issues/3972): Avoiding crash in cacheAsBitmapMatrix reset during shutdown
- [github-3973](https://github.com/airsdk/Adobe-Runtime-Support/issues/3973): Fixing crash on start-up with small SWF files
- [github-3980](https://github.com/airsdk/Adobe-Runtime-Support/issues/3980): Android gradle setting useLegacyPackaging=false when targeting v35
- [github-3992](https://github.com/airsdk/Adobe-Runtime-Support/issues/3992): Ensuring LoaderInfo complete event is sent on Android with splash screen
- [github-3993](https://github.com/airsdk/Adobe-Runtime-Support/issues/3993): Fixing screen resolution/handling on new iOS device
- [github-3997](https://github.com/airsdk/Adobe-Runtime-Support/issues/3997): Correcting Android Screen.safeArea values for newer OS versions
- [github-3998](https://github.com/airsdk/Adobe-Runtime-Support/issues/3998): Fixing keyboard menu shortcuts on macOS 26

