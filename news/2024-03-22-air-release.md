---
title: Release 51.0.0.4
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.0.4** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.0.4/release-notes/Release_Notes_AIR_SDK_51.0.0.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.0.4)  



## New features

- AIR-6054: Adding support for file modification times for zip entries
- AIR-6055: AIR Zip support for creation and saving of zip archives
- AIR-7046: Adding ZipArchive.load/saveFromByteArray implementations
- AIR-6866: Enable NativeWindow class for Android
- AIR-7018: ADT add IPALinkFolder build configuration and linker script for macOS remote build
- AIR-7044: AIR TextLine embedded fonts to support COLR tables
- AIR-7045: AIR TextLine embedded fonts to support CBDT tables
- [github-149](https://github.com/airsdk/Adobe-Runtime-Support/issues/149): Implementing FontDescription.createFromByteArray to load an OpenType/TrueType font for FTE
- [github-216](https://github.com/airsdk/Adobe-Runtime-Support/issues/216): WebSocket client connection and handshaking
- [github-pad20](https://github.com/airsdk/ANE-PlayAssetDelivery/issues/20): Updating NetStream.play() to accept IDataInput argument

## Bug fixes

- AIR-6743: Update icon list in descriptor XSD
- AIR-7031: AIRSDK Android dependency lists
- AIR-7035: String.fromCharCode() should support all unicode code points
- AIR-7036: Adding platform-specific fallback fonts for Emoji character ranges in Flash Text Engine
- AIR-7059: Fixing AIR crash on iOS around network authentication (see AIR-6479)
- [github-1917](https://github.com/airsdk/Adobe-Runtime-Support/issues/1917): Correcting Linux bundle creation to support ARM64 ANEs
- [github-2807](https://github.com/airsdk/Adobe-Runtime-Support/issues/2807): Removing ANRs caused by access of nativeGetTextBoxBounds from wrong thread
- [github-2871](https://github.com/airsdk/Adobe-Runtime-Support/issues/2871): Switching to a 64-bit version of the LLVM ld64 linker
- [github-3098](https://github.com/airsdk/Adobe-Runtime-Support/issues/3098): Allowing a/v data access for NetStream in data generation mode
- [github-3102](https://github.com/airsdk/Adobe-Runtime-Support/issues/3102): Preventing crash when using Workers in a beta/prerelease build
- [github-3106](https://github.com/airsdk/Adobe-Runtime-Support/issues/3106): MacOS EncryptedLocalStore updating key storage mechanisms