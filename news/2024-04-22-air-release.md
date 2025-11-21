---
title: Release 50.2.5.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.5.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.5.1/release-notes/Release_Notes_AIR_SDK_50.2.5.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.5.1)  

Release 50.2.5.1 of the AIR SDK is a feature update in order to provide some of the additional
capabilities required to support Privacy Manifests for iPhone/iPad applications. There are some other
minor functional changes plus recent bug fixes that have been implemented.

<!-- truncate -->

### Features

- AIR-6979: Removing colour-profile adjustments from the loading point of a JPEG
- [github-3116](https://github.com/airsdk/Adobe-Runtime-Support/issues/3116): Adding generation of AIR privacy manifest from defaults merged with ANEs
- [github-3172](https://github.com/airsdk/Adobe-Runtime-Support/issues/3172): Mac bundle creation to generate CFBundleDisplayName tag
- [github-3173](https://github.com/airsdk/Adobe-Runtime-Support/issues/3173): Mac bundle creation to generate CFBundleSupportedPlatforms tag


### Bug fixes

- [github-2976](https://github.com/airsdk/Adobe-Runtime-Support/issues/2976): Adding 'property' as a supported Android Manifest tag
- [github-3126](https://github.com/airsdk/Adobe-Runtime-Support/issues/3126): Fixing issue with Loader.loadBytes() throwing errors in Workers
- [github-3160](https://github.com/airsdk/Adobe-Runtime-Support/issues/3160): Ensuring Linux bundles can be created even if the rpm/deb identification checks fail
- [github-3171](https://github.com/airsdk/Adobe-Runtime-Support/issues/3171): Allow Android manifestAdditions to override activity's screenOrientation attribute
