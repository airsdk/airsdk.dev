---
title: Release 50.2.3.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.3.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.3.1/release-notes/Release_Notes_AIR_SDK_50.2.3.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.3.1)  

<!-- truncate -->

### Features  

- AIR-6564: AIR Media - basic iOS sound output implementation
- [github-1453](https://github.com/airsdk/Adobe-Runtime-Support/issues/1453): Adding certificateError event for secure HTTP/socket connections


### Bug Fixes    

- AIR-4357: Removing deferred framebuffer clears for Android runtime in background thread
- [github-1824](https://github.com/airsdk/Adobe-Runtime-Support/issues/1824): Ensuring AIR apps can run from the root folder of a Windows drive
- [github-1856](https://github.com/airsdk/Adobe-Runtime-Support/issues/1856): Fixing URL session closure on macOS for cancelled connections
- [github-1871](https://github.com/airsdk/Adobe-Runtime-Support/issues/1871): Further updates to support File.openWithDefaultApplication on Android
- [github-2409](https://github.com/airsdk/Adobe-Runtime-Support/issues/2409): Fixing tvOS stub generation and reverting symbol removals
- [github-2535](https://github.com/airsdk/Adobe-Runtime-Support/issues/2535): Don't Activate on _NET_WM_STATE event if the window is being hidden
- [github-2603](https://github.com/airsdk/Adobe-Runtime-Support/issues/2603): Ensuring Android file chooser ignores non-mime type filters
- [github-2615](https://github.com/airsdk/Adobe-Runtime-Support/issues/2615): Updating Android StageText to work in a background thread
- [github-2655](https://github.com/airsdk/Adobe-Runtime-Support/issues/2655): Fixing the iOS certificate security alert message by moving it out from async thread
- [github-2660](https://github.com/airsdk/Adobe-Runtime-Support/issues/2660): Ensuring Android platformsdk is picked up properly on cmdline
- [github-2665](https://github.com/airsdk/Adobe-Runtime-Support/issues/2665): Removing memory leakage in Worker when sending strings over MessageChannel
- [github-2666](https://github.com/airsdk/Adobe-Runtime-Support/issues/2666): Ensuring android CameraUI provider is properly named with air prefix
- [github-2667](https://github.com/airsdk/Adobe-Runtime-Support/issues/2667): Fixing JNI problems with Android TimeZone.availableTimeZoneNames
- [github-2670](https://github.com/airsdk/Adobe-Runtime-Support/issues/2670): Ensuring AIR on Android shuts down appropriately on exit() call
- [github-2671](https://github.com/airsdk/Adobe-Runtime-Support/issues/2671): Preventing Android JNI-detach crash
- [github-2684](https://github.com/airsdk/Adobe-Runtime-Support/issues/2684): Ensuring command-line platformsdk has priority in ADT
- [github-2694](https://github.com/airsdk/Adobe-Runtime-Support/issues/2694): Excluding invalid libc++.so files from Gradle builds


Note re [github-2409](https://github.com/airsdk/Adobe-Runtime-Support/issues/2409) (Fixing tvOS stub generation) - the stub-tvos folder update didn't work in this release,
so this error is actually still present; there is a patch library under the github issue entry to resolve it.
