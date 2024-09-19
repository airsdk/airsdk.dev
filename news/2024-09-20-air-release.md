---
title: Release 51.1.1.5
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.1.5** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.1.5/release-notes/Release_Notes_AIR_SDK_51.1.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.1.5)  


### Bug fixes

- AIR-7119: AIR Android - remove use of APIs that are restricted by strict mode
- AIR-7354: ADT fails to package a macOS app bundle if default ANEs are needed
- AIR-7355: ADT fails to package Mac App Bundle
- AIR-7360: Android AS3 keyboard mapping for Escape key events
- [github-3330](https://github.com/airsdk/Adobe-Runtime-Support/issues/3330): Ensuring keyboard deactivation doesn't happen if a StageText element has focus
- [github-3359](https://github.com/airsdk/Adobe-Runtime-Support/issues/3359): Updating FileStream async handling and Linux event loops
- [github-3391](https://github.com/airsdk/Adobe-Runtime-Support/issues/3391): Adding ELS recovery code following format issues in 51.0 stores
- [github-3399](https://github.com/airsdk/Adobe-Runtime-Support/issues/3399): Reverting AIR-7115 to ensure keyboard display works better on Android TextField touch
- [github-3414](https://github.com/airsdk/Adobe-Runtime-Support/issues/3414): Ensuring Android background thread can use recreated EGL surfaces
- [github-3460](https://github.com/airsdk/Adobe-Runtime-Support/issues/3460): Fixing EncryptedLocalStore.reset failure on Windows
- [github-3467](https://github.com/airsdk/Adobe-Runtime-Support/issues/3467): Correcting Linux timezone offset to use ms
- [github-3470](https://github.com/airsdk/Adobe-Runtime-Support/issues/3470): Correcting daylightSavingsOffset value for Linux
