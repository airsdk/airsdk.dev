---
title: Release 51.1.4.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.1.4.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.4.1/release-notes/Release_Notes_AIR_SDK_51.1.4.pdf) 

:::note
This is for people who still prefer the 51.1 branch but need mobile apps that contain the latest values and configurations for the Play Store and App Store. No functional updates other than the 16kb support and Android API 35 targeting, and the latest Xcode/iOS SDK values. We've got a new 51.2 release coming out next week that will have the latest updates and fixes in it.
:::

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7732: Updating IPA default constants for Xcode 16.4 with 18.5 SDKs
- [github-3800](https://github.com/airsdk/Adobe-Runtime-Support/issues/3800): Updating ADT to use the correct tools/settings for 16kb Android support
- [github-3800](https://github.com/airsdk/Adobe-Runtime-Support/issues/3800): Build settings for Android runtime native library for 16kb support
