---
title: Release 50.2.3.7
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.3.7** has been released by Harman.  

This release is primarily intended to revert the problems we'd caused when trying to fix [#2772](https://github.com/airsdk/Adobe-Runtime-Support/issues/2772) - there are a few other Android-related changes brought into it too. But we're almost finished preparing a "50.2.4" version that will include the new iPhoneOS/macOS SDKs and Xcode version, and will be something people can then use in production whilst we push out the 51.0 branch initially as a beta.

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.3.7/release-notes/Release_Notes_AIR_SDK_50.2.3.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.3.7)  


### Bug Fixes    

- [github-2835](https://github.com/airsdk/Adobe-Runtime-Support/issues/2835): Preventing crash in Android VideoTexture dispose
- [github-2837](https://github.com/airsdk/Adobe-Runtime-Support/issues/2837): Fixing calls to OpenGL for texture set-up to avoid later failure in VertexBuffer
- [github-2864](https://github.com/airsdk/Adobe-Runtime-Support/issues/2864): Ensuring Android screen state is known to avoid black-screen
- [github-2873](https://github.com/airsdk/Adobe-Runtime-Support/issues/2873): Building APK target can use 'all' arch plus the config file to limit the included ABIs
- [github-2879](https://github.com/airsdk/Adobe-Runtime-Support/issues/2879): Reverting [github-2772](https://github.com/airsdk/Adobe-Runtime-Support/issues/2772) regarding activate/deactivate events on Android
