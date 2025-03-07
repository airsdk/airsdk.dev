---
title: Release 51.1.3.8
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.1.3.8** has been released by Harman.  

:::info
Whilst the 51.2 branch is still in 'beta' state, we have another set of bug fixes in the 51.1 branch.. which might be the last; these changes (and those from 51.1.3.7) will be merged into the next 51.2 release.
:::

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.3.8/release-notes/Release_Notes_AIR_SDK_51.1.3.pdf)  
- [Download](https://airsdk.harman.com/download/51.1.3.8)  


### Bug fixes

- AIR-7604: ANR on Android within nativeGetMultitouchMode
- AIR-7609, 7621-7624: AIR diagnostic fixes and improvements
- [github-1199](https://github.com/airsdk/Adobe-Runtime-Support/issues/1199): Ensuring an Android loadLibrary failure is reported properly
- [github-3679](https://github.com/airsdk/Adobe-Runtime-Support/issues/3679): Fixing glue around StageWebView postMessage and webViewMessage dispatching (Windows)
- [github-3683](https://github.com/airsdk/Adobe-Runtime-Support/issues/3683): Ensuring NativeExtension library loading works on Windows
- [github-3693](https://github.com/airsdk/Adobe-Runtime-Support/issues/3693): Ensuring video playback continues through slightly dry buffer levels - reverting 2505 fix
- [github-3694](https://github.com/airsdk/Adobe-Runtime-Support/issues/3694): Fixing handling of surrogate pairs for string-to-utf8 buffered writing
- [github-3697](https://github.com/airsdk/Adobe-Runtime-Support/issues/3697): Adding latest Apple WWDC intermediate certificates
