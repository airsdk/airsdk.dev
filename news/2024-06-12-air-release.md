---
title: Release 51.0.1.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.1.3** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.1.3/release-notes/Release_Notes_AIR_SDK_51.0.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.1.3)  


### Bug fixes

- AIR-7127: Correct code-signing package ID for an iOS framework containing a bundle
- [github-2362](https://github.com/airsdk/Adobe-Runtime-Support/issues/2362): Ensuring correct bounds for objects drawn using line style with a miter
- [github-3039](https://github.com/airsdk/Adobe-Runtime-Support/issues/3039): Ensuring macOS clipboard works after system restart
- [github-3271](https://github.com/airsdk/Adobe-Runtime-Support/issues/3271): Fixing arm64 JIT handling of 64-bit signed intptr atom to double type
- [github-3274](https://github.com/airsdk/Adobe-Runtime-Support/issues/3274): Ensuring WebSocket uses port 443 for wss, and use case insensitive http headers
- [github-3274](https://github.com/airsdk/Adobe-Runtime-Support/issues/3274): Ensuring websocket copes with root path and uses non-default port in host header
- [github-3283](https://github.com/airsdk/Adobe-Runtime-Support/issues/3283): Ensuring ELS setItem() works after a reset()
- [github-3283](https://github.com/airsdk/Adobe-Runtime-Support/issues/3283): Improving stability, error checking and async access of Encrypted Local Store
- [github-3287](https://github.com/airsdk/Adobe-Runtime-Support/issues/3287): Handling mediaPlaybackRequiresUserAction parameter correctly within StageWebView
- [github-3288](https://github.com/airsdk/Adobe-Runtime-Support/issues/3288): Ensuring macOS FontEngine copes if a font doesn't have colr/cblc tables
