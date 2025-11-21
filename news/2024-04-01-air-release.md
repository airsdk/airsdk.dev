---
title: Release 50.2.4.5
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.4.5** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.4.5/release-notes/Release_Notes_AIR_SDK_50.2.4.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.4.5)  

Release 50.2.4.5 includes a number of bug fixes that had been provided also within the 51.0 pre- release branch but were also considered useful to release into production at an earlier date, across various different platforms.

<!-- truncate -->

### Bug fixes

- AIR-7028: AIR Android file permission callbacks not always called
- AIR-7029: AIR Android applicationDirectory files may not be accessible
- AIR-7035: String.fromCharCode() should support all unicode code points
- AIR-7059: Fixing AIR crash on iOS around network authentication (see AIR-6479)
- [github-2610](https://github.com/airsdk/Adobe-Runtime-Support/issues/2610): Ensuring Win32 timezone retrieval works for default tz when not dynamic
- [github-2807](https://github.com/airsdk/Adobe-Runtime-Support/issues/2807): Removing ANRs caused by access of nativeGetTextBoxBounds from wrong thread
- [github-2903](https://github.com/airsdk/Adobe-Runtime-Support/issues/2903): Fixing instability when breaking into a debugger on uncaught error
- [github-3049](https://github.com/airsdk/Adobe-Runtime-Support/issues/3049): Eliminating instability in GC following socket thread querying the app descriptor
- [github-3062](https://github.com/airsdk/Adobe-Runtime-Support/issues/3062): Updating Win32 camera handling to include better fallbacks where direct connect fails
- [github-3087](https://github.com/airsdk/Adobe-Runtime-Support/issues/3087): Correcting invalid scheme detection to prevent false-flagging of relative paths
- [github-3098](https://github.com/airsdk/Adobe-Runtime-Support/issues/3098): Allowing a/v data access for NetStream in data generation mode
