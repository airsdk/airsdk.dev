---
title: Release 51.2.2.6
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.6**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.6/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug Fixes

- AIR-7839: Correcting adt.lic path mentioned in ADT usage documentation
- AIR-7855: Crash in shared AIR runtime re audio decoding
- AIR-7861: AIR Diagnostics to log AS3 call stack for long-running functions
- [github-3821](https://github.com/airsdk/Adobe-Runtime-Support/issues/3821): Further Android crash protection in EnterPlayer
- [github-3944](https://github.com/airsdk/Adobe-Runtime-Support/issues/3944): Ensuring Android camera preview does not overlay a video
- [github-3997](https://github.com/airsdk/Adobe-Runtime-Support/issues/3997): Correcting macOS Screen.safeArea implementation
- [github-4011](https://github.com/airsdk/Adobe-Runtime-Support/issues/4011): Fixing JIT for 64-bit immediate integer conversion to double type
- [github-4024](https://github.com/airsdk/Adobe-Runtime-Support/issues/4024): Ensuring Android PC devices can access cameras even without FEATURE_CAMERA_ANY
- [github-4028](https://github.com/airsdk/Adobe-Runtime-Support/issues/4028): Prevent Android error reports due to System.load() failing
- [github-4033](https://github.com/airsdk/Adobe-Runtime-Support/issues/4033): Fixing crash when using 32-bit Android AIR diagnostics

