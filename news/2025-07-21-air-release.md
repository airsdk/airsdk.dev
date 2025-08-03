---
title: Release 51.2.2.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.1/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

:::note
Only updating Linux and Android packages (and ADT/ADL core tools): Windows/macOS/iOS will appear to be the earlier versions.
:::

This release is primarily to update the toolchain versioning used for mobile packaging i.e. the IPA files will appear as if created using Xcode 16.4 and iPhoneOS SDK 18.5; the Android APKs/bundles will be created with full support for the target and compilation API levels of 35, with 16kb support in the native libraries.


## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Features

- AIR-7732: Updating IPA default constants for Xcode 16.4 with 18.5 SDKs
- [github-3800](https://github.com/airsdk/Adobe-Runtime-Support/issues/3800): Build settings for Android runtime native library for 16kb support
- [github-3800](https://github.com/airsdk/Adobe-Runtime-Support/issues/3800): Updating ADT to use the correct tools/settings for 16kb Android support


## Bug fixes

- [github-3880](https://github.com/airsdk/Adobe-Runtime-Support/issues/3880): Ensuring minimize works on a newly created linux window
