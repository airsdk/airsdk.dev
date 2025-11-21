---
title: Release 50.2.4.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.4.2** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.4.2/release-notes/Release_Notes_AIR_SDK_50.2.4.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.4.2)  


<!-- truncate -->

### Bug fixes

- AIR-4740: Remove use of sun.security classes for code signing - replace with BouncyCastle
- [github-1003](https://github.com/airsdk/Adobe-Runtime-Support/issues/1003): Ensuring Android surface restore copes with different event ordering
- [github-1199](https://github.com/airsdk/Adobe-Runtime-Support/issues/1199): Adjusting VideoViewAIR to prevent UnsatisfiedLinkError when calling JNI method too early
- [github-2409](https://github.com/airsdk/Adobe-Runtime-Support/issues/2409): Adding missing media symbols into AppleTV runtime libraries
- [github-2615](https://github.com/airsdk/Adobe-Runtime-Support/issues/2615): Updating Android stagetext/stagewebview functionality to cope better in background threads
- [github-2642](https://github.com/airsdk/Adobe-Runtime-Support/issues/2642): Adjusting thread handling for iOS audio to avoid glitching
- [github-2863](https://github.com/airsdk/Adobe-Runtime-Support/issues/2863): Ensuring ios webviews are inspectable for debug builds
- [github-2906](https://github.com/airsdk/Adobe-Runtime-Support/issues/2906): Allowing non-latin characters in files for Gradle-based builds (and using gradle for apk-signing)
- [github-2924](https://github.com/airsdk/Adobe-Runtime-Support/issues/2924): Fixing Android VideoTexture flicker at start of video playback
- [github-2950](https://github.com/airsdk/Adobe-Runtime-Support/issues/2950): Ensuring Android ANE .so libraries are packaged in AAB bundles
