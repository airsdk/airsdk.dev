---
title: Release 50.2.3.5
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.3.5** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.3.5/release-notes/Release_Notes_AIR_SDK_50.2.3.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.3.5)  


<!-- truncate -->

### Bug Fixes    

- AIR-6707: Setting UDP broadcast settings for ..*.255 addresses
- AIR-6765: Fixing crash in embedded font rendering cache
- AIR-6766: ADT rejects iOS ANEs that don't contain universal binaries
- [github-88](https://github.com/airsdk/Adobe-Runtime-Support/issues/88): Fixing green strip at the bottom of some Windows H.264 videos
- [github-360](https://github.com/airsdk/Adobe-Runtime-Support/issues/360): ADT packaging IPA files - reducing long ld64 command lines
- [github-1607](https://github.com/airsdk/Adobe-Runtime-Support/issues/1607): Correcting Android Context usage of visual contexts when needed
- [github-2754](https://github.com/airsdk/Adobe-Runtime-Support/issues/2754): Updating JNI reference handling/clean-up for Android file access
- [github-2755](https://github.com/airsdk/Adobe-Runtime-Support/issues/2755): Updating descriptor XSD docs for missing icon sizes
- [github-2771](https://github.com/airsdk/Adobe-Runtime-Support/issues/2771): Ensuring Android content files can be opened/read asynchronously
- [github-2772](https://github.com/airsdk/Adobe-Runtime-Support/issues/2772): Ensuring AIR activate/deactivate events are sent on activity focus events
- [github-2773](https://github.com/airsdk/Adobe-Runtime-Support/issues/2773): Ensuring AIR Android soft keyboard behaviour matches OS
- [github-2777](https://github.com/airsdk/Adobe-Runtime-Support/issues/2777): Dispatch touch events on Android when requested, regardless of the device touchscreen feature flag
- [github-2801](https://github.com/airsdk/Adobe-Runtime-Support/issues/2801): Ensuring macOS KeychainStore certificates can be used without private keys