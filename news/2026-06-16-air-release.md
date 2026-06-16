---
title: Release 51.3.3.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.3.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.3.1/release-notes/Release_Notes_AIR_SDK_51.3.3.pdf)

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::

## Features

- AIR-4887: AIR package format needs to allow code-signed MacOS binaries
- AIR-7993: ADT on macOS to allow IPA default values rather than using xcode
- [github-4210](https://github.com/airsdk/Adobe-Runtime-Support/issues/4210): Updating build and packaging to use universal binary on ios-simulator
- [github-4242](https://github.com/airsdk/Adobe-Runtime-Support/issues/4242): Removing UILaunchImages in an IPA if there is a storyboard

## Bug Fixes

- AIR-7992: Do not delete a license file if network failures prevent validation
- AIR-7996: Android mediacodec/videotexture usage gives a JNI error
- AIR-7999: Ensuring iOS ANEs can specify minimum iOS version in sdkVersion field
- AIR-8004: Ensure ADT doesn't use old locations for license files
- [github-1803](https://github.com/airsdk/Adobe-Runtime-Support/issues/1803): Ensuring symbolic links in ANEs are supported in Linux bundle packages
- [github-1870](https://github.com/airsdk/Adobe-Runtime-Support/issues/1870): Ensuring the Windows runtime does not hang at the splash screen
- [github-4157](https://github.com/airsdk/Adobe-Runtime-Support/issues/4157): Ensuring Android camera list works with logical multi-cameras
- [github-4216](https://github.com/airsdk/Adobe-Runtime-Support/issues/4216): Removing libysshared.so from Android runtime.apk files
- [github-4221](https://github.com/airsdk/Adobe-Runtime-Support/issues/4221): AIR Windows stability improvements in audio handling
- [github-4224](https://github.com/airsdk/Adobe-Runtime-Support/issues/4224): Fixing deadlock in iOS on parallel URL downloads
- [github-4225](https://github.com/airsdk/Adobe-Runtime-Support/issues/4225): Ensuring ADT prevents Android strings.xml values from overwriting AIR values
- [github-4234](https://github.com/airsdk/Adobe-Runtime-Support/issues/4234): Fixing typo in config file, and updating based on latest supported flags
- [github-4236](https://github.com/airsdk/Adobe-Runtime-Support/issues/4236): Ensuring gcEfficiency minimum value (0.01) can be used
- [github-4240](https://github.com/airsdk/Adobe-Runtime-Support/issues/4240): Fixing stability issue when running print job from StageWebView callback
- [github-4241](https://github.com/airsdk/Adobe-Runtime-Support/issues/4241): Ensuring ADT rename option works for root SWF in IPA files
