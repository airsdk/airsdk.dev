---
title: Release 51.0.1.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.1.2** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.1.2/release-notes/Release_Notes_AIR_SDK_51.0.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.1.2)  


<!-- truncate -->

### Bug fixes

- AIR-6054: Fixing zip file type flags for DOS attributes
- AIR-7090: Fixing crashes when shutting down due to OOM signal on Windows
- AIR-7097: AS3 JIT failure on Android arm64 for double conversion
- AIR-7100: Crash in AIR on rasterisation of bitmap/texture with zero dimension
- AIR-7101: AIR Windows 32-bit should support large addresses
- AIR-7102: Cannot build for iPhoneSimulator if using native codesign
- AIR-7111: ADT tries to validate externalSwfs even for non-iOS builds
- [github-15](https://github.com/airsdk/Adobe-Runtime-Support/issues/15): Ensuring NetStream SoundTransform on iOS can reduce the volume
- [github-162](https://github.com/airsdk/Adobe-Runtime-Support/issues/162): Ensuring large scaled-down bitmaps don't cause maths overflows
- [github-1316](https://github.com/airsdk/Adobe-Runtime-Support/issues/1316): Ensuring NetStream.appendBytes() uses all frames in correct order on Windows
- [github-2303](https://github.com/airsdk/Adobe-Runtime-Support/issues/2303): Linux EncryptedLocalStore fallback to file system for sudo usage
- [github-2625](https://github.com/airsdk/Adobe-Runtime-Support/issues/2625): Eliminating spurious networkChanged events from private ipv6 updates
- [github-3173](https://github.com/airsdk/Adobe-Runtime-Support/issues/3173): Updating CFBundleSupportedPlatforms entry to be an array
- [github-3212](https://github.com/airsdk/Adobe-Runtime-Support/issues/3212): Ensuring NetStream.play(null) is allowed (only) in data generation mode
- [github-3229](https://github.com/airsdk/Adobe-Runtime-Support/issues/3229): Ensuring SWF security context isn't affected when using NetStream data generation mode
- [github-3231](https://github.com/airsdk/Adobe-Runtime-Support/issues/3231): Ensuring mac socket data events occur more frequently
- [github-3236](https://github.com/airsdk/Adobe-Runtime-Support/issues/3236): Ensuring Android Gradle builds work with compileSdk > 33 and minSdk < 24
- [github-3242](https://github.com/airsdk/Adobe-Runtime-Support/issues/3242): Ensuring externalSwfs file list can cope with backslash in paths
- [github-3245](https://github.com/airsdk/Adobe-Runtime-Support/issues/3245): ELS does not overwrite short values with long values
- [github-3247](https://github.com/airsdk/Adobe-Runtime-Support/issues/3247): Adding debug output for when an external SWF can't be parsed
- [github-3249](https://github.com/airsdk/Adobe-Runtime-Support/issues/3249): Ensuring local variables can be accessed via the debugger
- [github-3251](https://github.com/airsdk/Adobe-Runtime-Support/issues/3251): iOS https crash after connecting via http
- [github-3264](https://github.com/airsdk/Adobe-Runtime-Support/issues/3264): Ensuring TextField autoscroll works for final line visibility
