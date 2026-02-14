---
title: Release 51.3.1.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.1.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.1.1/release-notes/Release_Notes_AIR_SDK_51.3.1.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Features

- AIR-5913: AIR Android should support camera2 API alongside existing camera API
- AIR-7274: Add configuration for stack overflow JIT protection
- AIR-7438: ADT option for manually updating a license
- AIR-7729: Updating Android build platform to 35
- AIR-7732: Updating IPA default constants for Xcode 16.4 with 18.5 SDKs
- AIR-7726: Implemented wkwebview for web content rendering on macOS
- AIR-7737: Android WebView updates for UA string and zoom enablement
- AIR-7738: Android WebView updates for postMessage support
- AIR-7788: macOS WebView support for postMessage
- AIR-7797: macOS WebView support for assignFocus top or bottom
- AIR-7803: AIR Windows to allow local/roaming appdata option
- AIR-7814: Adding Android API level to Capabilities.os
- AIR-7902: AIR app descriptor option for DirectDraw font rendering
- AIR-7903: AIR GC memory parameters in application descriptor
- AIR-7909: AIR Android synchronous start-up option
[github-2904](https://github.com/airsdk/Adobe-Runtime-Support/issues/2904): Updating compile-abc to a universal binary on macos
[github-3030](https://github.com/airsdk/Adobe-Runtime-Support/issues/3030): Ensuring IPA info.plist settings come from the local Xcode/SDK values
[github-4141](https://github.com/airsdk/Adobe-Runtime-Support/issues/4141): Ensuring free-tier developers are warned of assets.car issue


## Bug Fixes

- AIR-7910: AIR iOS libraries are being built with wrong iOS deployment target value
