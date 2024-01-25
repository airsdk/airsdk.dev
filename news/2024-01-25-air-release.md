---
title: Release 50.2.4.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 50.2.4.3** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/50.2.4.3/release-notes/Release_Notes_AIR_SDK_50.2.4.pdf)  
- [Download](https://airsdk.harman.com/download/50.2.4.3)  


### Bug fixes

- AIR-6479: Thread protection around credential handling in macOS URL stream
- AIR-6931: Ensure macOS apps installed via AIR shared runtime are always x64
- AIR-6964: AIR Android manifest additional features should override any from the template
- [github-2010](https://github.com/airsdk/Adobe-Runtime-Support/issues/2010): Re-implementing fix to allow Rectangle ..ToOutput methods to use 'this' as output
- [github-2625](https://github.com/airsdk/Adobe-Runtime-Support/issues/2625): Updating RTMPS code to accept self-signed certificates
- [github-2978](https://github.com/airsdk/Adobe-Runtime-Support/issues/2978): Ensuring APK files are code-signed with a release configuration
- [github-2988](https://github.com/airsdk/Adobe-Runtime-Support/issues/2988): Ensuring URL schemes conforming to RFC3986 are accepted in AIR
- [github-2989](https://github.com/airsdk/Adobe-Runtime-Support/issues/2989): Correcting DER-encoding of macho entitlements for IPA code signature
- [github-2992](https://github.com/airsdk/Adobe-Runtime-Support/issues/2992): Ensuring AABs built using Animate have all the native libraries included
- [github-2993](https://github.com/airsdk/Adobe-Runtime-Support/issues/2993): Adding thread-safety to new audio code to avoid segfault
