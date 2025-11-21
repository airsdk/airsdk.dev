---
title: Release 51.2.0.1 (beta)
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.2.0.1** has been released to beta by Harman.  

:::info From Andrew:
Finally, our first 51.2 BETA version is available for download. There are a number of issues we found whilst testing and we resolved those we felt to be showstoppers. There are other issues outstanding that we'll address now, with an updated beta version coming out once we've sorted those (plus the latest updates from 51.1 will be merged in).
:::

:::warning Beta
[Feedback and bug reports](https://github.com/airsdk/Adobe-Runtime-Support/issues/new/choose) are welcome, of course! But please don't use this in any production software.
:::

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.0.1/release-notes/Release_Notes_AIR_SDK_51.2.0.pdf)  
- Download: Please use the [AIR SDK Manager](https://airsdk.dev/docs/basics/getting-started) 
  - Go to "Settings" 
  - Enable "Show Pre-releases"
  - Open the "Labs (Pre-releases)" section
  - We suggest using a different path for your prerelease AIR SDKs so as not to confuse them with release builds

  ![](images/airsdkmanager-prereleases.png)

<!-- truncate -->

### Features

- AIR-6452: Updating ADT analytics to use airsdk.harman.com and log country/language
- AIR-7037: Adding support for coloured emoji using DirectWrite font support
- AIR-7330: Android SecureSocket to be implemented via Android's SSLSocket class
- AIR-7397: AIR Windows to support ANGLE for OpenGL ES rendering
- AIR-7414: AIR Linux support for GTK3
- AIR-7415: Audio/Video on Linux using FFMPEG
- AIR-7421: AIR updates to shutdown the runtime more cleanly
- AIR-7430: AIR Linux ADT to support 'arch' option for cross-CPU bundling
- AIR-7440: ADT macOS bundles should accept an ICNS file
- AIR-7528: AIR ANE - API to access the graphics context (OGLES)
- AIR-7530: AIR Diagnostics - app descriptor set-up in the runtime
- AIR-7546: Updating license file generation and handling with validity checks
- AIR-7563: ADT to output symbols from IPA production builds via IPASymbolFile setting
- AIR-7567: ADT configuration to link iOS executables via LLVM and iPhoneOS SDK
- [github-3616](https://github.com/airsdk/Adobe-Runtime-Support/issues/3616): Optimising memory usage for every-frame events and lists
- [github-3647](https://github.com/airsdk/Adobe-Runtime-Support/issues/3647): Adding IPA code signature checks on start-up


### Bug fixes

- [github-3394](https://github.com/airsdk/Adobe-Runtime-Support/issues/3394): Correcting AOT output for unplus (float support)
- [github-3506](https://github.com/airsdk/Adobe-Runtime-Support/issues/3506): Fixing Matrix3D interpolation calculation (for 51.2+ apps)
