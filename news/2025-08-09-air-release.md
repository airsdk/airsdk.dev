---
title: Release 51.2.2.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.3**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.3/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

:::note
Only updating iOS components plus ADT to fix linking of IPAs that include Swift.
:::


## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7767: Updating iOS/tvOS stub files for 18.2 SDKs
- AIR-7768: Removing AIR iOS duplicate symbol namespaceURIToAPIVersion
- [github-3708](https://github.com/airsdk/Adobe-Runtime-Support/issues/3708): Fixing ADT error output for bad -arch option
- [github-3941](https://github.com/airsdk/Adobe-Runtime-Support/issues/3941): Ensuring IPA linking on Windows includes swift libraries
