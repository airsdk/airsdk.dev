---
title: Release 51.3.3.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.3.2**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.3.2/release-notes/Release_Notes_AIR_SDK_51.3.3.pdf)

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::

## Bug Fixes

- [github-1803](https://github.com/airsdk/Adobe-Runtime-Support/issues/1803): Ensuring Linux symlinks are null-terminated
- [github-1977](https://github.com/airsdk/Adobe-Runtime-Support/issues/1977): Ensuring macOS windows receive 'move' event if they are dragged
- [github-4214](https://github.com/airsdk/Adobe-Runtime-Support/issues/4214): Ensuring Android 15+ apps are panned when soft keyboard is raised
- [github-4224](https://github.com/airsdk/Adobe-Runtime-Support/issues/4224): Correcting fix to avoid iOS deadlock during multiple URLStream clean-up
- [github-4246](https://github.com/airsdk/Adobe-Runtime-Support/issues/4246): Outputting parameter details on Win32 integer overflow error in fixed div
- [github-4253](https://github.com/airsdk/Adobe-Runtime-Support/issues/4253): Correct Windows mousewheel handling when using track-pads
- [github-4259](https://github.com/airsdk/Adobe-Runtime-Support/issues/4259): Ensuring package validation can be disabled fully
