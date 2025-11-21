---
title: Release 51.1.3.12
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.1.3.12**

- [Release Notes](https://airsdk.harman.com/api/versions/51.1.3.12/release-notes/Release_Notes_AIR_SDK_51.1.3.pdf) 

<!-- truncate -->

## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

- Direct download: https://airsdk.harman.com/download/51.1.3.12


## Bug fixes

- AIR-7662: MediaBuffer ANE API does not properly update
- [github-392](https://github.com/airsdk/Adobe-Runtime-Support/issues/392): Fixing y-flip of Stage3D render to bitmapdata for OpenGL/ES
- [github-3426](https://github.com/airsdk/Adobe-Runtime-Support/issues/3426): Linux camera updates to correctly select mode including FPS
- [github-3573](https://github.com/airsdk/Adobe-Runtime-Support/issues/3573): Ensuring Scout on Android connects with complex app timings
- [github-3727](https://github.com/airsdk/Adobe-Runtime-Support/issues/3727): Updating Win32 timezone cache mechanism
- [github-3729](https://github.com/airsdk/Adobe-Runtime-Support/issues/3729): Ensuring BitmapData.draw on Android picks up all content
- [github-3735](https://github.com/airsdk/Adobe-Runtime-Support/issues/3735): Regular Expression did not work correctly with unicode characters outside of range 0000-FFFF
- [github-3748](https://github.com/airsdk/Adobe-Runtime-Support/issues/3748): AIR getTimer() returns incorrect values on time change on Linux-based OS
- [github-3755](https://github.com/airsdk/Adobe-Runtime-Support/issues/3755): Fixing ANR caused by nativeShowOriginalRect being called from UI thread
- [github-3767](https://github.com/airsdk/Adobe-Runtime-Support/issues/3767): Updating timestamp mechanism to use SHA-256 for message imprint
- [github-3816](https://github.com/airsdk/Adobe-Runtime-Support/issues/3816): Ensuring AIR SignedInfo does not have whitespace that causes a signature error
- [github-3858](https://github.com/airsdk/Adobe-Runtime-Support/issues/3858): Fixing Android mouse handling in touch event handlers
