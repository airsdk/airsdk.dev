---
title: Release 51.2.2.4
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.4**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.4/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7776: AIR packaging fails if an encrypted SWF is used
- AIR-7782: StageWebView.assignFocus() not working on Windows webview2
- [github-3804](https://github.com/airsdk/Adobe-Runtime-Support/issues/3804): Further updates to URL handling on iOS to identify instabilities
- [github-3825](https://github.com/airsdk/Adobe-Runtime-Support/issues/3825): Ensuring APK builds include an abiFilter for their architecture
- [github-3825](https://github.com/airsdk/Adobe-Runtime-Support/issues/3825): Updating Android start-up code to reduce slow start metric
- [github-3903](https://github.com/airsdk/Adobe-Runtime-Support/issues/3903): Adding capability to switch to legacy/XP file dialogs on Windows
- [github-3931](https://github.com/airsdk/Adobe-Runtime-Support/issues/3931): Optimising bitmap use when not shared with mediabuffer
- [github-3940](https://github.com/airsdk/Adobe-Runtime-Support/issues/3940): Allowing true/false options for PackageValidation config
- [github-3942](https://github.com/airsdk/Adobe-Runtime-Support/issues/3942): Fixing iOS simulator crash on start-up
- [github-3949](https://github.com/airsdk/Adobe-Runtime-Support/issues/3949): Safe area is incorrect on Android 35
- [github-3951](https://github.com/airsdk/Adobe-Runtime-Support/issues/3951): Adjusting start-up on Android to avoid reading large SWFs at once
- [github-3961](https://github.com/airsdk/Adobe-Runtime-Support/issues/3961): Protecting against null reference exception in AndroidIdleState

