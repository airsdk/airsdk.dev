---
title: Release 51.0.1.4
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.1.4** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.1.4/release-notes/Release_Notes_AIR_SDK_51.0.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.1.4)  

With 51.0.1.4, additional ELS stability improvements have been made, with a key fix also for the handling of the Android Gradle Plug-in depending on the availability of different Java runtime versions. If your latest Android platform needs an update to the Android Gradle Plug-in, this will only be applied if the appropriate Java runtime version is detected.


### Bug fixes

- AIR-7082 (Android) / AIR-7113 (iOS): Hook up NativeWindow events for the primary/main window
- AIR-7136: ANE validator for Android derives from wrong class in AIR 51.0
- AIR-7158: AIR Android has additional deactivate/activate events on NativeWindow when NativeApplication also fires
- AIR-7250: AIR MMgc needs to cope with varying memory page sizes
- [github-3063](https://github.com/airsdk/Adobe-Runtime-Support/issues/3063): Updating Socket class to throw error on host name that's a URI
- [github-3283](https://github.com/airsdk/Adobe-Runtime-Support/issues/3283): Additional stability and error checking in ELS code
- [github-3297](https://github.com/airsdk/Adobe-Runtime-Support/issues/3297): Ensuring we don't switch to AGP v8 if we can't find Java 17
- [github-3311](https://github.com/airsdk/Adobe-Runtime-Support/issues/3311): Incorrect text selection when mouse is outside embedded TextField
- [github-3317](https://github.com/airsdk/Adobe-Runtime-Support/issues/3317): Revising glib event loop handling for Linux
- [github-3322](https://github.com/airsdk/Adobe-Runtime-Support/issues/3322): ELS failures when updating on iOS
