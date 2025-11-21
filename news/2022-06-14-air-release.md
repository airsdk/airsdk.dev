---
title: Release 33.1.1.889
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 33.1.1.889** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.889/release-notes/Release_Notes_AIR_SDK_33.1.1.889.pdf)  
- [Download](https://airsdk.harman.com/download/33.1.1.889)  

<!-- truncate -->

### Features  

- AIR-5964: Updating Falcon2 compiler to merge ABC blocks within SWC libraries
- [github-1829](https://github.com/airsdk/Adobe-Runtime-Support/issues/): Encrypted Local Store support on Linux


### Bug Fixes    

- AIR-5931: Fixing CRL issue 'Extension of the wrong type' when signing an AIR package
- AIR-5932: Switching AAB jar-signing JDK detection to new build configuration
- AIR-5990: Fixing problem running ADL from Animate on Apple M1 hardware
- [github-1856](https://github.com/airsdk/Adobe-Runtime-Support/issues/1856): Fixing URL session and connection reuse on macOS
- [github-1875](https://github.com/airsdk/Adobe-Runtime-Support/issues/1875): Fixing crash on macOS caused by user home folder permissions
- [github-1905](https://github.com/airsdk/Adobe-Runtime-Support/issues/1905): Ensuring Android 'queries' manifest section supports 'intent' sub-items
- [github-1912](https://github.com/airsdk/Adobe-Runtime-Support/issues/1912): Implementing support for omit-trace-statements, by default omitting only in release mode
- [github-1915](https://github.com/airsdk/Adobe-Runtime-Support/issues/1915): Fixing crash when calling Graphics.readGraphicsData() on Android-GPU
- [github-1923](https://github.com/airsdk/Adobe-Runtime-Support/issues/1923): Ensuring apk-debug and aab-debug builds use the debug gradle configurations
- [github-1936](https://github.com/airsdk/Adobe-Runtime-Support/issues/1936): Correcting StageWebView.isSupported to reflect availability of any native webview
- [github-1952](https://github.com/airsdk/Adobe-Runtime-Support/issues/1952): Fixing Android crash when viewing Video after VideoTexture