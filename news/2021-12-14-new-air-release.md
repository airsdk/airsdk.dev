---
title: Release 33.1.1.713
authors: [ jan ]
tags: [ airsdk, updates ]
---

**AIR Runtime 33.1.1.713** has been released by Harman.


- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.713/release-notes/Release_Notes_AIR_SDK_33.1.1.713.pdf)
- [Download](https://airsdk.harman.com/download/33.1.1.713)

<!-- truncate -->

## Changes and Issues
3.1 Changes in this Release  

### 3.1.1 Runtime  
No changes – the below details will be fixed for all “33.1” version numbers:  
Namespace: 33.1  
SWF version: 44  
  
The namespace and SWF version updates are made across all platforms and may be used to access the
updated ActionScript APIs that will be introduced in future beta releases of 33.1.
Note that using “33.0” as a namespace is not valid, and is resulting in behaviors such as VerifyErrors being
dispatched at application start-up with built-in class names such as ExtensionContext, Context3D, and others.
  
### 3.1.2 Build Tools  
Xcode 13 and the latest macOS and iphoneOS SDKs are now being used to build the AIR SDK.
The build system for this is on a version of macOS that doesn’t support 32-bit processes hence we cannot
generate the 32-bit versions of the stub files. This means that we can no longer support older 32-bit
iPhone/iPad devices.
  
### 3.1.3 AS3 APIs  
Updated AS3 APIs are described in section 12.
  
### 3.1.4 Features  
github-1432: Updating version of ADB to 1.0.41 to match recent Android platform-tools
  
### 3.1.5 Bug Fixes  
github-274: Updating Java bytecode generator to cope with Android styleable resources  
github-444: Allow additional languages to be used in AIR mobile apps  
github-1368: Failed to package Android APK  using Java 17  
github-1392: Ensuring utf-8 based Android resources can be compiled with javac  
github-1405: Failed to package Android AAB using Java 17  
github-1409: Ensuring jarsigner process uses quotes around arguments and correct relative paths  
github-1418: Ensuring default APK build is targeting armv7  
github-1424: Ensuring correct ANE .so files are placed in the correct ABI subfolders  
github-1426: Gradle java process to use the higher of ADT memory vs config setting  
github-1429: APKs generated without legacy build mode will include all ABIs  
github-1430: ADT failing to launch an Android application when using new build mechanism  
github-1431: Better error handling for invalid license files  
AIR-5449: AIR Android packaging using ADT should work with compatible major/minor AIR releases  
