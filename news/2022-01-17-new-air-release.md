---
title: New AIR Runtime Release 33.1.1.743
author: Jan
author_title: Developer at Dallmeier electronic GmbH
author_url: https://github.com/2jfw
author_image_url: https://avatars.githubusercontent.com/u/73781224?v=4
tags: [ airsdk, updates ]
---

**AIR Runtime 33.1.1.743** has been released by Harman.


- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.743/release-notes/Release_Notes_AIR_SDK_33.1.1.743.pdf)
- [Download](https://airsdk.harman.com/download/33.1.1.743)


### Bug Fixes  
github-183: Fixing crash when cleaning up Windows StageWebView when debugger is active  
github-1509/1522/1529: Correcting file dialog handling of properties such as filters and filenames  
github-1510: Protected the audio track 'stopped' property from destroyed objects on Android  
github-1516: Fixing problem with ANE zips being closed before extracting all Android files  
github-1528: Using XML descriptor 'versionLabel' for Android 'versionName' field  
github-1531: Ensure event handlers are still called when lower-priority event listeners are added within an earlier handler  
github-1536: Detecting Windows 11 version in Capabilities information  
github-1541: Ensuring unnamed local variables can still be inspected via a debugger connection  
