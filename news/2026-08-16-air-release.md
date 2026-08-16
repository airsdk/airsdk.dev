---
title: Release 51.3.4.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.4.1**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.4.1/release-notes/Release_Notes_AIR_SDK_51.3.4.pdf)

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::

## Features

- AIR-8026: AIR Android: update ADT to target SDK 36 by default
- AIR-8027: AIR Android: updates to use 36 build tools and target API level

## Bug Fixes

- [github-3945](https://github.com/airsdk/Adobe-Runtime-Support/issues/3945): Removing read of FlashAuthor.cfg for mobile builds
- [github-4214](https://github.com/airsdk/Adobe-Runtime-Support/issues/4214): Correcting the fix for soft keyboard on newer Android targets
- [github-4262](https://github.com/airsdk/Adobe-Runtime-Support/issues/4262): Fixing implementation so ADT eliminates duplicate 'rpath' options
- [github-4275](https://github.com/airsdk/Adobe-Runtime-Support/issues/4275): Fixing Vector.includes() handling for non-object values
- [github-4276](https://github.com/airsdk/Adobe-Runtime-Support/issues/4276): Ensuring Win32 WebView2 does not send errors when navigation is cancelled
- [github-4278](https://github.com/airsdk/Adobe-Runtime-Support/issues/4278): Adding numeric collation sorting on Windows 7 and later
- [github-4287](https://github.com/airsdk/Adobe-Runtime-Support/issues/4287): Fixing Android ANR on keyboard panning surface update