---
title: Release 51.2.2.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.2**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.2/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7748: AIR Android packaging fails to handle uncompressed extensions
- [github-3804](https://github.com/airsdk/Adobe-Runtime-Support/issues/3804): Adding protection against a scratch canvas allocation failure
- [github-3804](https://github.com/airsdk/Adobe-Runtime-Support/issues/3804): Fixing instability in iOS/macOS URL stream failure handling
- [github-3889](https://github.com/airsdk/Adobe-Runtime-Support/issues/3889): Workaround for Android JNI failures reading large files
- [github-3903](https://github.com/airsdk/Adobe-Runtime-Support/issues/3903): Updating mutex usage in save dialog handling
- [github-3912](https://github.com/airsdk/Adobe-Runtime-Support/issues/3912): Ensuring Digest.hash() does not crash on iOS
- [github-3916](https://github.com/airsdk/Adobe-Runtime-Support/issues/3916): Ensuring Worker bytes contain a SWF header
- [github-3924](https://github.com/airsdk/Adobe-Runtime-Support/issues/3924): Ensuring Android camera functionality copes with lack of device camera
- [github-3930](https://github.com/airsdk/Adobe-Runtime-Support/issues/3930): Fixing crash-on-startup for some 51.2 namespace apps
- [github-3934](https://github.com/airsdk/Adobe-Runtime-Support/issues/3934): Ensuring reserved words in Android applicationId are handled
