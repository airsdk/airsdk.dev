---
title: Release 51.0.1.1
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.1.1** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.1.1/release-notes/Release_Notes_AIR_SDK_51.0.1.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.1.1)  

Release 51.0.1.1 of the AIR SDK is a feature update in order to provide some of the additional
capabilities required to support Privacy Manifests for iPhone/iPad applications. There are some other
minor functional changes plus recent bug fixes that have been implemented.

<!-- truncate -->

### Features

- AIR-6288: Implementation of digests and encryption using CommonCrypto for mac/ios
- AIR-6979: Colour profile conversion for macOS displays
- [github-907](https://github.com/airsdk/Adobe-Runtime-Support/issues/907): Adding support for fileType icon size 256x256
- [github-3010](https://github.com/airsdk/Adobe-Runtime-Support/issues/3010): Provide mechanism for remote linking an IPA's executables on a macOS machine
- [github-3108](https://github.com/airsdk/Adobe-Runtime-Support/issues/3108): Updating AIR xml signatures to use SHA-256 for signed info
- [github-3116](https://github.com/airsdk/Adobe-Runtime-Support/issues/3116): Adding support for PrivacyAdditions tag
- [github-3171](https://github.com/airsdk/Adobe-Runtime-Support/issues/3171): Allow Android manifestAdditions to override activity's screenOrientation attribute
- [github-3172](https://github.com/airsdk/Adobe-Runtime-Support/issues/3172): Mac bundle creation to generate CFBundleDisplayName tag
- [github-3173](https://github.com/airsdk/Adobe-Runtime-Support/issues/3173): Mac bundle creation to generate CFBundleSupportedPlatforms tag


### Bug fixes

- AIR-6054: Ensuring zip extraction creates subfolders where needed
- [github-2409](https://github.com/airsdk/Adobe-Runtime-Support/issues/2409): Including new AS3 implementations into tvOS runtime
- [github-2903](https://github.com/airsdk/Adobe-Runtime-Support/issues/2903): Fixing instability when breaking into a debugger on uncaught error
- [github-2976](https://github.com/airsdk/Adobe-Runtime-Support/issues/2976): Adding 'property' as a supported Android Manifest tag
- [github-3049](https://github.com/airsdk/Adobe-Runtime-Support/issues/3049): Ensuring we avoid the hang on debugger on iOS with nagle check
- [github-3049](https://github.com/airsdk/Adobe-Runtime-Support/issues/3049): Eliminating instability in GC following socket thread querying the app descriptor
- [github-3098](https://github.com/airsdk/Adobe-Runtime-Support/issues/3098): Ensuring a/v from NetStream.appendBytes() works with SoundMixer.computeSpectrum()
- [github-3126](https://github.com/airsdk/Adobe-Runtime-Support/issues/3126): Fixing issue with Loader.loadBytes() throwing errors in Workers
- [github-3154](https://github.com/airsdk/Adobe-Runtime-Support/issues/3154): Preventing iOS worker crash caused by background alert
- [github-3160](https://github.com/airsdk/Adobe-Runtime-Support/issues/3160): Ensuring Linux bundles can be created even if the rpm/deb identification checks fail
- [github-3195](https://github.com/airsdk/Adobe-Runtime-Support/issues/3195): Fixing crash in Worker start-up caused by lack of Stage


:::note Note
For the "remote linker" capability on macOS, please read the details in the release notes PDF! Section 7.2, pp 20-22. Feedback welcomed!
:::