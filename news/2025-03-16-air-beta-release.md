---
title: Release 51.2.0.2 (beta)
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.2.0.2** has been released to beta by Harman.  

:::info From Andrew:
This one hopefully will be a little more reliable than the ".1" version!
We have been having some issues on Linux which may be related to the distribution/version; we're working on improving the stability (related to GTK3 updates, we believe) but thought it worth pushing this release out anyway.
:::

:::warning Beta
[Feedback and bug reports](https://github.com/airsdk/Adobe-Runtime-Support/issues/new/choose) are welcome, of course! But please don't use this in any production software.
:::

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.0.2/release-notes/Release_Notes_AIR_SDK_51.2.0.pdf)  
- Download: Please use the [AIR SDK Manager](https://airsdk.dev/docs/basics/getting-started) 
  - Go to "Settings" 
  - Enable "Show Pre-releases"
  - Open the "Labs (Pre-releases)" section
  - We suggest using a different path for your prerelease AIR SDKs so as not to confuse them with release builds

  ![](images/airsdkmanager-prereleases.png)

:::note Linux
The AIR SDK Manager for Linux should be available soon
:::

### Features

- AIR-7037: Adding support for coloured emoji using DirectWrite font support
- AIR-7330: Android SecureSocket to be implemented via Android's SSLSocket class
- AIR-7397: AIR Windows to support ANGLE for OpenGL ES rendering
- AIR-7528: AIR ANE - API to access the graphics context (OGLES)
- AIR-7530: AIR Diagnostics - app descriptor set-up in the runtime


### Bug fixes

- AIR-7631: AIR Windows runtime crash when using NAIP
- AIR-7632: AIR throws error 5016 under ADL
