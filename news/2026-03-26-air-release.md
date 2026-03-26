---
title: Release 51.3.1.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.1.3**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.1.3/release-notes/Release_Notes_AIR_SDK_51.3.1.pdf) 

<!-- truncate -->

:::note
Please note this updates the Windows, macOS and Android runtimes only. The Linux and iOS apps would still report a version number of 51.3.1.2.
:::

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug Fixes

- AIR-7955: AndroidTV apps should have leanback feature set as required
- [github-1950](https://github.com/airsdk/Adobe-Runtime-Support/issues/1950): Deleting unused JNI local ref causing PushLocalFrame error
- [github-3821](https://github.com/airsdk/Adobe-Runtime-Support/issues/3821): Android stability improvements in File array handling
- [github-4021](https://github.com/airsdk/Adobe-Runtime-Support/issues/4021): Fixing distortion in D3D going full screen
- [github-4179](https://github.com/airsdk/Adobe-Runtime-Support/issues/4179): Ensuring waveOutOpen is only called if the Windows audio service is running
- [github-4185](https://github.com/airsdk/Adobe-Runtime-Support/issues/4185): Fixing crash in macOS WebView by calling completion handler
