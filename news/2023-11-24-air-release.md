---
title: Release 50.2.4.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.4.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.4.1/release-notes/Release_Notes_AIR_SDK_50.2.3.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.4.1)  


### Features

AIR-6707: The earlier update to switch to a 'broadcast' mechanism for any address ending in .255 is now rolled out across all platform binaries.
AIR-6809: Building on Sonoma/Xcode 15 for iPhoneOS/tvOS/macOS
- [github-2885](https://github.com/airsdk/Adobe-Runtime-Support/issues/2885): Picking up iOS/tvOS platform SDK version from platformsdk path
- [github-2911](https://github.com/airsdk/Adobe-Runtime-Support/issues/2911): Switching IPA linker on macOS to use ld-classic

### Bug fixes

- [github-1194](https://github.com/airsdk/Adobe-Runtime-Support/issues/1194): Adjusting Android lifecycle handlers to avoid black screen in Home/Launcher scenario
- [github-2810](https://github.com/airsdk/Adobe-Runtime-Support/issues/2810): Ensuring AIR copes with UIBackgroundModes being a string as well as an array
- [github-2869](https://github.com/airsdk/Adobe-Runtime-Support/issues/2869): Allowing Stage3D contexts to be created in Android gpu rendering mode
- [github-2888](https://github.com/airsdk/Adobe-Runtime-Support/issues/2888): Moving Android planeKickCascade function into UI thread to avoid exception
- [github-2893](https://github.com/airsdk/Adobe-Runtime-Support/issues/2893): Ensuring BitmapData.decode() works for transparency in PNGs
- [github-2923](https://github.com/airsdk/Adobe-Runtime-Support/issues/2923): Updating LLVM LD64.exe to remove MSVC runtime dependencies
