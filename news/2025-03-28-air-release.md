---
title: Release 51.1.3.10
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.3.10** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.3.10/release-notes/Release_Notes_AIR_SDK_51.1.3.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.3.10)  

<!-- truncate -->

### Bug fixes

- AIR-7604: ANR on Android within nativeGetSoftKeyboardType
- AIR-7623: Reverting fixes in onDestroy to ensure runtime remains
- AIR-7639: AIR Linux opening multiple install.log file handles
- AIR-7646: AIR Android NativeApplication.exit() does not close the app on a background thread
- AIR-7653: AIR Diagnostics crashing due to multiple threads
- [github-3711](https://github.com/airsdk/Adobe-Runtime-Support/issues/3711): Android TV fix to cope with screen orientation changes
- [github-3723](https://github.com/airsdk/Adobe-Runtime-Support/issues/3723): Ensuring index buffer creation is not impacted by earlier GLES error
