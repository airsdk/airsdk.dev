---
title: Release 51.3.2.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.2.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.2.1/release-notes/Release_Notes_AIR_SDK_51.3.2.pdf)

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::

## Features

- AIR-7295: AIR packages and installer to support JAR signing mechanism
- AIR-7791: AIR Windows use SetDllDirectory when loading ANE libraries
- AIR-7907: AIR Android switch to reflection for setAspectRatio
- AIR-7946: AIR Flex RSLs - updated handling and redirection
- AIR-7953: ADT option to output SDK/Xcode values from Info.plist
- AIR-7958: Updating IPA constants for Xcode/iOS 26
- [github-2904](https://github.com/airsdk/Adobe-Runtime-Support/issues/2904): Reverting github-2904 compile-abc-64 arm64/universal binary
- [github-4148](https://github.com/airsdk/Adobe-Runtime-Support/issues/4148): ADT native signing to accept an external script as an argument

## Bug Fixes

- AIR-4148: Allowing EXE native signing to not require a store file
- AIR-7973: Animate publishing reports it cannot access adt.jar
- AIR-7975: Ensuring WebView2 creation on Windows doesn't allow AS3 async re-entry
- [github-4190](https://github.com/airsdk/Adobe-Runtime-Support/issues/4190): Ensuring Linux EncryptedLocalStore does not crash in SSL
