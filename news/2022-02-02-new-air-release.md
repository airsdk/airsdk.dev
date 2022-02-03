---
title: New AIR Runtime Release 33.1.1.758
author: Jan
author_title: Developer at Dallmeier electronic GmbH
author_url: https://github.com/2jfw
author_image_url: https://avatars.githubusercontent.com/u/73781224?v=4
tags: [ airsdk, updates ]
---

**AIR Runtime 33.1.1.758** has been released by Harman.  
**Date:** 02-Feb-2022  


- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.758/release-notes/Release_Notes_AIR_SDK_33.1.1.758.pdf)
- [Download](https://airsdk.harman.com/download/33.1.1.758)


**WARNING:**  
Significant changes have been added in this version of the SDK, see AIR-5250 to remove the WebKit dependency (so HTMLLoader and StageWebView behaviour may change) and github-1299 to change how the Android font rendering is implemented. Please test your apps and let us know of any issues.  

### Features  
AIR-5250: Removing HTMLLoader built-in webkit and using native StageWebView instead  
AIR-5676: AS3 to support verbatim strings (similar to C#)  
[github-1541](https://github.com/airsdk/Adobe-Runtime-Support/issues/1541): Allow const definitions to be listed in the debug commands  
[github-1594](https://github.com/airsdk/Adobe-Runtime-Support/issues/1594): Removing old analytics references from AdobeAIRMainActivity class  

### Bug Fixes  
[github-773](https://github.com/airsdk/Adobe-Runtime-Support/issues/773): Updating code-signing using native process to allow IPAs to install on M1 hardware  
[github-1290](https://github.com/airsdk/Adobe-Runtime-Support/issues/1290): Updating StageWebView.drawViewPortToBitmapData to cope with Retina high-res mac displays  
[github-1299](https://github.com/airsdk/Adobe-Runtime-Support/issues/1299): Updating Android font rendering mechanism to work on Android 12  
[github-1307](https://github.com/airsdk/Adobe-Runtime-Support/issues/1307): Allowing the specification of a custom Android application class name in Gradle builds  
[github-1430](https://github.com/airsdk/Adobe-Runtime-Support/issues/1430): Fixing fallback code to launch an Android AIR app built with legacy APK mode  
[github-1505](https://github.com/airsdk/Adobe-Runtime-Support/issues/1505): Ensuring the default ANE library is always included in Android bundles  
[github-1506](https://github.com/airsdk/Adobe-Runtime-Support/issues/1506): Updating ADT to better look for an Android SDK and JDK installation automatically  
[github-1564](https://github.com/airsdk/Adobe-Runtime-Support/issues/1564): Ensuring custom Android TV banner images are used rather than the AIR SDK default  
[github-1565](https://github.com/airsdk/Adobe-Runtime-Support/issues/1565): Checking for per-user installations of Edge Webview2 with new registry locations  
[github-1565](https://github.com/airsdk/Adobe-Runtime-Support/issues/1565): Adding fallback from Edge WebView2 to IE-based WebBrowser control for Windows native StageWebView  
[github-1583](https://github.com/airsdk/Adobe-Runtime-Support/issues/1583): Add iPhone 'excludeDefaultUsageDescriptions' option for XML descriptor file and IPA generation  
[github-1588](https://github.com/airsdk/Adobe-Runtime-Support/issues/1588): Adding support for tools:node='remove' for Android permissions  
[github-1596](https://github.com/airsdk/Adobe-Runtime-Support/issues/1596): Adding extra thread protection around andoid audio track clean-up  
