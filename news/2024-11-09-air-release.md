---
title: Release 51.1.2.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.2.2** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.2.2/release-notes/Release_Notes_AIR_SDK_51.1.2.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.2.2)  


### Bug fixes

- AIR-7364: ADT to abort if a malformed ABC block is found during IPA creation
- AIR-7402: Crashes reported in Android runtime - strstr and JNI exceptions
- AIR-7437: Ensuring trace() output works in command-line apps
- AIR-7441: Fixing iPhone build target and eliminating duplicate symbols
- [github-78](https://github.com/airsdk/Adobe-Runtime-Support/issues/78): Correcting adjustment for italic text in Windows direct mode
- [github-1453](https://github.com/airsdk/Adobe-Runtime-Support/issues/1453): Fixing certificateError behaviour on Linux and for Loader
- [github-2088](https://github.com/airsdk/Adobe-Runtime-Support/issues/2088): Updating AIR mac app bundle signing to remove entitlements from libraries
- [github-2610](https://github.com/airsdk/Adobe-Runtime-Support/issues/2610): TimeZone.getTimeZone(null) returns null
- [github-3516](https://github.com/airsdk/Adobe-Runtime-Support/issues/3516): Android stability fixes for reported crashes
- [github-3521](https://github.com/airsdk/Adobe-Runtime-Support/issues/3521): Partial fix for problems with Chinese font in iOS 18
- [github-3534](https://github.com/airsdk/Adobe-Runtime-Support/issues/3534): Removing hard dependency on libsecret in AIR Linux runtime
- [github-3542](https://github.com/airsdk/Adobe-Runtime-Support/issues/3542): Ensuring ADT does not package up .DS_Store files
- [github-3552](https://github.com/airsdk/Adobe-Runtime-Support/issues/3552): Ensuring activate events are not sent when minimising an app in Windows