---
title: Release 51.2.1.7
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.1.7**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.1.7/release-notes/Release_Notes_AIR_SDK_51.2.1.pdf) 

:::note
Only updating Linux and Android packages (and ADT/ADL core tools): Windows/macOS/iOS will appear to be the earlier versions.
:::


## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- https://github.com/airsdk/airsdkmanager-releases/releases/latest

:::info
For Flex users: download an AIR SDK using the above and then click on the cog button to allow you to choose an existing Flex SDK folder on top of which to overlay the AIR files.
:::


## Bug fixes

- AIR-7733: Fixing android.uncompressedExtensions app descriptor validation
- [github-1984](https://github.com/airsdk/Adobe-Runtime-Support/issues/1984): Updates to the ffmpeg video decoding mechanisms on Linux to cope with different versions
- [github-3708](https://github.com/airsdk/Adobe-Runtime-Support/issues/3708): Adding arch 'all' option in ADT usage instructions
- [github-3871](https://github.com/airsdk/Adobe-Runtime-Support/issues/3871): Android Worker protection against code accessing a null window object
- [github-3892](https://github.com/airsdk/Adobe-Runtime-Support/issues/3892): Adding usage details for ADT (-cmdline) and ADL (-cmd)