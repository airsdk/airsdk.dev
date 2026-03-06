---
title: Release 51.3.1.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.3.1.2**

- [Release Notes](https://airsdk.harman.com/api/versions/51.3.1.2/release-notes/Release_Notes_AIR_SDK_51.3.1.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug Fixes

- AIR-7924: AIR files need to have the correct CRC for the hash file
- AIR-7949: macOS WebView causes a crash on a certificate error
- AIR-7950: Direct mode glitching caused by fix for ANGLE rendering
- [github-3716](https://github.com/airsdk/Adobe-Runtime-Support/issues/3716): ANGLE on Windows was flipped and unstable when rendering display list content
- [github-3799](https://github.com/airsdk/Adobe-Runtime-Support/issues/3799): Rounding down font scaling to improve line-clipping outcomes
- [github-4157](https://github.com/airsdk/Adobe-Runtime-Support/issues/4157): Adding Android camera2 support for YUV
- [github-4162](https://github.com/airsdk/Adobe-Runtime-Support/issues/4162): Ensuring Angle DLLs are only loaded if useAngle is set to true
- [github-4166](https://github.com/airsdk/Adobe-Runtime-Support/issues/4166): Ensuring Linux symlinks are fully updated by configure script
- [github-4169](https://github.com/airsdk/Adobe-Runtime-Support/issues/4169): Ensuring 'float' is a type of Number and is sent to the Debugger as such
- [github-4170](https://github.com/airsdk/Adobe-Runtime-Support/issues/4170): Ensuring float typeof/instanceof matches int/number behaviour
