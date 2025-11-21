---
title: Release 51.1.1.4
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.1.4** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.1.4/release-notes/Release_Notes_AIR_SDK_51.1.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.1.4)  


<!-- truncate -->

### Bug fixes

- AIR-7340: ANE loading information available when debugging
- [github-3391](https://github.com/airsdk/Adobe-Runtime-Support/issues/3391): Improving ELS fallback capability, fixing key filestorage on mobile and ELS file writing on Window
- [github-3394](https://github.com/airsdk/Adobe-Runtime-Support/issues/3394): Ensuring iOS Worker asynchronous calls don't block the main UI thread
- [github-3413](https://github.com/airsdk/Adobe-Runtime-Support/issues/3413): Ensuring NAIP uses command-line runtime option on Linux and Mac
- [github-3418](https://github.com/airsdk/Adobe-Runtime-Support/issues/3418): Ensuring ld64 on old macOS versions doesn't use platform_version argument
- [github-3418](https://github.com/airsdk/Adobe-Runtime-Support/issues/3418): Updating compile-abc tool to run on macOS 10.13
- [github-3419](https://github.com/airsdk/Adobe-Runtime-Support/issues/3419): Correcting default timestamp URL from symantec to digicert
- [github-3434](https://github.com/airsdk/Adobe-Runtime-Support/issues/3434): Updating cacheAsBitmap max dimensions to use device/gpu capabilities