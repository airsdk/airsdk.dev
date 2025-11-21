---
title: Release 51.1.2.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.2.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.2.1/release-notes/Release_Notes_AIR_SDK_51.1.2.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.2.1)  


<!-- truncate -->

### Features

- AIR-7350: ADT to create an APK file from an AAB file
- AIR-7351: Updating ADT to allow signing using provider class and config file args
- AIR-7369: Updating build files and settings for MacOS/iOS/tvOS SDK with latest platforms
- AIR-7379: Removing unnecessary NOTE outputs from ADT
- AIR-7395: ADT properties file should cope with single-backslash in Windows paths
- [github-3487](https://github.com/airsdk/Adobe-Runtime-Support/issues/3487): Use banner320x180 instead of banner for Android manifest


### Bug fixes

- AIR-7390: Basic Authentication not working on iOS
- AIR-7391: Android gesture events are not dispatched in the correct background thread
- AIR-7394: Adjusting Android background thread for surface changed events
- [github-78](https://github.com/airsdk/Adobe-Runtime-Support/issues/78): Ensuring italic text is not cut off when rendering direct mode on Windows
- [github-3394](https://github.com/airsdk/Adobe-Runtime-Support/issues/3394): Correcting AOT output for unplus (float support)
- [github-3446](https://github.com/airsdk/Adobe-Runtime-Support/issues/3446): Fixing Android StageWebView dropdown caused by spurious window focus events
- [github-3492](https://github.com/airsdk/Adobe-Runtime-Support/issues/3492): Prevent continuous FDB output on XML Loader error