---
title: Release 51.2.2.7
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.2.7**

This is the final planned release on the 51.2 branch, we have 51.3 coming shortly with some new features. This one should improve stability particularly around multimedia (reversion of [#3788](https://github.com/airsdk/Adobe-Runtime-Support/issues/3788) which had caused a number of issues) and iOS URL streams ([#4004](https://github.com/airsdk/Adobe-Runtime-Support/issues/4004) and related reports).

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.2.7/release-notes/Release_Notes_AIR_SDK_51.2.2.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug Fixes

- AIR-7546: AIR security - notify users on license/package mismatch
- AIR-7858: ADT to get correct serial no. when using macOS native codesign
- AIR-7894: Crash in WebView2 shutdown with pending postMessage events
- [github-3537](https://github.com/airsdk/Adobe-Runtime-Support/issues/3537): AIR ApplicationUpdater to use the active window's renderMode
- [github-3788](https://github.com/airsdk/Adobe-Runtime-Support/issues/3788): Reverting Netstream disposal optimisations due to instabilities
- [github-4004](https://github.com/airsdk/Adobe-Runtime-Support/issues/4004): Refactoring URLStream handling on iOS to avoid crash
- [github-4111](https://github.com/airsdk/Adobe-Runtime-Support/issues/4111): Ensuring symlinks are accepted when packaging macOS apps
