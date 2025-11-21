---
title: Release 33.1.1.856
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 33.1.1.856** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.856/release-notes/Release_Notes_AIR_SDK_33.1.1.856.pdf)  
- [Download](https://airsdk.harman.com/download/33.1.1.856)  

<!-- truncate -->

### Features  

- AIR-5912: Adding the ability to capture Android device logs via ADT
- AIR-5878: Changes for new Android Scout companion app for Android 12 support
- [github-1818](https://github.com/airsdk/Adobe-Runtime-Support/issues/1818): Adding new ADT targets 'android-studio' and 'android-studio-debug'
- [github-1866](https://github.com/airsdk/Adobe-Runtime-Support/issues/1866): Add support for certificate generation with RSA-4096 keys


### Bug Fixes    

- AIR-331: Defaulting Android manifests to use a high max_aspect ratio
- AIR-5864: BitmapData.draw doesn't cope above 8192 pixels
- AIR-5895: Scout - add query section to AIR Android manifests
- AIR-5901: Moving macOS ANE frameworks into Contents/Frameworks
- [github-964](https://github.com/airsdk/Adobe-Runtime-Support/issues/964): Ensuring stage color changes force a refresh in direct mode
- [github-1641](https://github.com/airsdk/Adobe-Runtime-Support/issues/1641): Ensuring StageWebView does not send navigation error events when the navigation was deliberately cancelled
- [github-1742](https://github.com/airsdk/Adobe-Runtime-Support/issues/1742): Updating NAIB to display errors if an installer is used without the AIR runtime
- [github-1824](https://github.com/airsdk/Adobe-Runtime-Support/issues/1824): Re-introducing support for HTML-based AIR applications via native StageWebView
- [github-1847](https://github.com/airsdk/Adobe-Runtime-Support/issues/1847): Updating HTMLLoader to not throw on API errors - and 1x1 objects made invisible
- [github-1860](https://github.com/airsdk/Adobe-Runtime-Support/issues/1860): Updating EGL configuration choice for depth/stencil buffers
- [github-1875](https://github.com/airsdk/Adobe-Runtime-Support/issues/1875): Fixing crash on macOS caused by user home folder permissions
- [github-1878](https://github.com/airsdk/Adobe-Runtime-Support/issues/1878): Updating default player/swf versions to 33.1/44 in the AS compiler
