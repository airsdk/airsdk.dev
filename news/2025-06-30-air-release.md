---
title: Release 51.2.1.6
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.1.6**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.1.6/release-notes/Release_Notes_AIR_SDK_51.2.1.pdf) 

:::note
Only updating Windows, macOS and Android packages: Linux/iOS will still appear to be 51.2.1.5 versions.
:::

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7714: AIR Windows File.getRootDirectories can take a long time
- [github-3816](https://github.com/airsdk/Adobe-Runtime-Support/issues/3816): Ensuring AIR SignedInfo does not have whitespace that causes a signature error
- [github-3842](https://github.com/airsdk/Adobe-Runtime-Support/issues/3842): Removing internal/test AS3 function System.processCPUUsage
- [github-3851](https://github.com/airsdk/Adobe-Runtime-Support/issues/3851): Ensuring symbolic links in frameworks can be packaged on non-mac platforms
- [github-3853](https://github.com/airsdk/Adobe-Runtime-Support/issues/3853): Ensuring Android Worker.terminate() doesn't cause a crash
- [github-3858](https://github.com/airsdk/Adobe-Runtime-Support/issues/3858): Fixing Android mouse handling in touch event handlers
- [github-3860](https://github.com/airsdk/Adobe-Runtime-Support/issues/3860): Fixing crash with NetStream.dispose() on Windows/Android
- [github-3865](https://github.com/airsdk/Adobe-Runtime-Support/issues/3865): Ensuring large byte arrays are freed immediately upon clear()
- [github-3867](https://github.com/airsdk/Adobe-Runtime-Support/issues/3867): Ensuring only root Assets.car files are checked for splash screens
- [github-3879](https://github.com/airsdk/Adobe-Runtime-Support/issues/3879): Fixing memory leak caused by DirectDraw text rendering