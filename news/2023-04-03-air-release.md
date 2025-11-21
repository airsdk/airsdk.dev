---
title: Release 50.2.2.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.2.3** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.2.3/release-notes/Release_Notes_AIR_SDK_50.2.2.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.2.3)  

<!-- truncate -->

### Bug fixes

- AIR-6525: Generating stub files for swift libraries
- AIR-6526: Ensuring ADT does not generate bitcode (for tvOS)
- [github-1984](https://github.com/airsdk/Adobe-Runtime-Support/issues/1984): Removing Linux H.264 video support whilst issues are resolved
- [github-2326](https://github.com/airsdk/Adobe-Runtime-Support/issues/2326): Workaround for Android ANE functions to run in UI thread
- [github-2409](https://github.com/airsdk/Adobe-Runtime-Support/issues/2409): Removing tvOS invalid reference
- [github-2486](https://github.com/airsdk/Adobe-Runtime-Support/issues/2486): Ensuring only one maximize event is sent on macOS
- [github-2517](https://github.com/airsdk/Adobe-Runtime-Support/issues/2517): Check for intent handling before requesting SAF file permissions
- [github-2532](https://github.com/airsdk/Adobe-Runtime-Support/issues/2532): Fixing argumenterror thrown when closing a window after StageWebView.dispose() call
- [github-2533](https://github.com/airsdk/Adobe-Runtime-Support/issues/2533): Attempting to resolve Android content files and launch in default app; Updating Android file handling functions to use Java to fix permission issues; Correcting File.resolvePath() for Android content URLs
- [github-2547](https://github.com/airsdk/Adobe-Runtime-Support/issues/2547): Ensure StateChange Events are sent for maximise events on Linux even if the window has already been resized.