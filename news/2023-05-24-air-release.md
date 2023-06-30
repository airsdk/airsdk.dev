---
title: Release 50.2.2.6
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.2.6** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.2.6/release-notes/Release_Notes_AIR_SDK_50.2.2.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.2.6)  


### Bug Fixes    

- AIR-6609: AIR Android ANRs caused by surface nativeIsXXX calls blocking
- AIR-6626: AIR Android JNI stability improvements for runtime in background thread
- [github-360](https://github.com/airsdk/Adobe-Runtime-Support/issues/360): Eliminating duplication on the command line when calling LD64
- [github-1871](https://github.com/airsdk/Adobe-Runtime-Support/issues/1871): Ensuring Android AIR file utils have API-level conditional access
- [github-1871](https://github.com/airsdk/Adobe-Runtime-Support/issues/1871): Adjusting Android openWithDefaultApplication to not need query-package permissions
- [github-2326](https://github.com/airsdk/Adobe-Runtime-Support/issues/2326): Updating Android WebView creation to work in a background thread
- [github-2385](https://github.com/airsdk/Adobe-Runtime-Support/issues/2385): Ensuring Worker start-up continues if an ANE loading fails due to permissions
- [github-2571](https://github.com/airsdk/Adobe-Runtime-Support/issues/2571): Fixing crash-on-exit due to use of permission manager
- [github-2612](https://github.com/airsdk/Adobe-Runtime-Support/issues/2612): Adding support for provisioning profile for macOS app bundle packaging
- [github-2618](https://github.com/airsdk/Adobe-Runtime-Support/issues/2618): Fixing asynchronous XML signature verification
- [github-2620](https://github.com/airsdk/Adobe-Runtime-Support/issues/2620): Ensuring Android secure socket returns the certificate status
- [github-2657](https://github.com/airsdk/Adobe-Runtime-Support/issues/2657): Adding Android lint options to not abort on error
