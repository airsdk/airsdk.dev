---
title: Release 51.1.3.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

> A few final fixes for 2024.. a couple of them seemed fairly important to get out asap. We're now looking to do a 51.2 beta as early as possible in January but several of us are having a bit of a break over the New Year period so responses may be slow for a bit.

**AIR SDK 51.1.3.3** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.3.3/release-notes/Release_Notes_AIR_SDK_51.1.3.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.3.3)  


### Bug fixes

- AIR-7524: Use of Screen.mainScreen in a Worker causes crash on iOS
- [github-2505](https://github.com/airsdk/Adobe-Runtime-Support/issues/2505): Ensuring Windows video pipeline is drained if video finishes before audio
- [github-3478](https://github.com/airsdk/Adobe-Runtime-Support/issues/3478): Fixing XML transformer exception when older namespace is used
- [github-3614](https://github.com/airsdk/Adobe-Runtime-Support/issues/3614): Ensuring NetStream.Play.Complete is triggered from Windows H.264 decoder
- [github-3621](https://github.com/airsdk/Adobe-Runtime-Support/issues/3621): Fixing crash in Win32 HTTP handling of zero-length responses
- [github-3625](https://github.com/airsdk/Adobe-Runtime-Support/issues/3625): Preventing hang/crash in sound closure on Linux

