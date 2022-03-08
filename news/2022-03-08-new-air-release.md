---
title: New AIR Runtime Release 33.1.1.795
author: Jan
author_title: Developer at Dallmeier electronic GmbH
author_url: https://github.com/2jfw
author_image_url: https://avatars.githubusercontent.com/u/73781224?v=4
tags: [ airsdk, updates ]
---


**AIR Runtime 33.1.1.795** has been released by Harman.


- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.795/release-notes/Release_Notes_AIR_SDK_33.1.1.795.pdf)
- [Download](https://airsdk.harman.com/download/33.1.1.795)


### Features
[github-1724](https://github.com/airsdk/Adobe-Runtime-Support/issues/1724): Adding 'preventDeviceModelAccess' tag in the ‘android’ section of the application descriptor to stop Build.MODEL call
[github-1729](https://github.com/airsdk/Adobe-Runtime-Support/issues/1729): Enabling low/medium quality mode on desktop builds via an ‘allowLowQuality’ tag in the ‘initialWindow’ section of the application descriptor file.
Bug Fixes

### Bug Fixes  
AIR-5760: Fixing crash in Android font rendering with clip larger than bitmap
[github-427](https://github.com/airsdk/Adobe-Runtime-Support/issues/427): Moving the adt.lic file into a user-specific folder rather than in the SDK
[github-1001](https://github.com/airsdk/Adobe-Runtime-Support/issues/1001): Fixing StageVideo full screen viewport on MacOS Retina screens
[github-1299](https://github.com/airsdk/Adobe-Runtime-Support/issues/1299): Fixing Android text rendering: invalid text width, and JNI error after long time running
[github-1404](https://github.com/airsdk/Adobe-Runtime-Support/issues/1404): Fixing white-screen issue with Android non-full-screen content after the splash screen
[github-1584](https://github.com/airsdk/Adobe-Runtime-Support/issues/1584): Handling empty R.java arrays in internal Android resource bytecode generator
[github-1654](https://github.com/airsdk/Adobe-Runtime-Support/issues/1654): Removing spurious alpha channel from VideoTexture camera inputs
[github-1666](https://github.com/airsdk/Adobe-Runtime-Support/issues/1666): Ensure we don't package multidex.jar from ANEs
[github-1715](https://github.com/airsdk/Adobe-Runtime-Support/issues/1715): Updating URLs used in native installers to point to HARMAN AIR runtimes
[github-1700](https://github.com/airsdk/Adobe-Runtime-Support/issues/1700): Ensuring Android arch overrides work with new gradle-based APK building
[github-1704](https://github.com/airsdk/Adobe-Runtime-Support/issues/1704): Ensuring asset folders starting with underscores are packaged in Android
[github-1709](https://github.com/airsdk/Adobe-Runtime-Support/issues/1709): Ensuring correct support for camera input on Linux
[github-1721](https://github.com/airsdk/Adobe-Runtime-Support/issues/1721): Skipping APKSigner v2 process if running within JRE < 1.8 
