---
title: Release 51.0.0.2
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 51.0.0.2** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/51.0.0.2/release-notes/Release_Notes_AIR_SDK_51.0.0.pdf)  
- [Download](https://airsdk.harman.com/download/51.0.0.2)  


Discussion on the new features can be found [here](https://github.com/airsdk/Adobe-Runtime-Support/discussions/3081).


<!-- truncate -->

## New features

- AIR-309: Adding AS3 API for allowing AS3 to handle HTTPS certificate errors
- AIR-5963: Add ANE capabilities to render a Sprite using a MediaBuffer - initial support via BitmapData
- AIR-6012: AS3 API for StageWebView constructor changes
- AIR-6051, AIR-6053, AIR-6054: AIR zip support: Basic reading in of zip files to get entry details
- AIR-6063: Updated OpenSSL-based ELS key storage
- AIR-6279: AIR runtime support for float (removing float4 code)
- AIR-6288: AIR AS3 API for encrypting and decrypting a byte array
- AIR-6425: AS3 API for Socket.tcpNoDelay setting
- AIR-6579: AS3 String startsWith and endsWith
- AIR-6580: Add 'includes' and 'isEmpty' to Array and Vector classes
- AIR-6581: Adding ByteArray conversions to/from base16 and base64
- AIR-6707: Adding DatagramSocket.broadcast() method for UDP broadcasts
- AIR-6752: AIR Digest to include SHA-512 support
- AIR-6991: ByteArray write random bytes
- AIR-6992: Update SWF tag encryption to support custom keys
- AIR-7018: ADT move all iOS linker inputs into a single folder structure
- [github-216](https://github.com/airsdk/Adobe-Runtime-Support/issues/216): Support for WebSocket servers
- [github-1242](https://github.com/airsdk/Adobe-Runtime-Support/issues/1242): Allow images in HTML text fields via 'allowedDomains' property
- [github-1858](https://github.com/airsdk/Adobe-Runtime-Support/issues/1858): Adding horizontal mouse wheel support
- [github-1936](https://github.com/airsdk/Adobe-Runtime-Support/issues/1936): Allow windows.UseWebView2 'exclusive' mode to prevent IE/WebBrowser usage
- [github-2625](https://github.com/airsdk/Adobe-Runtime-Support/issues/2625): Adding NetworkInfo.disableNetworkChanges flag to prevent socket disconnects
- [github-2742](https://github.com/airsdk/Adobe-Runtime-Support/issues/2742): Adding Function.declaration property to find details of a function
- [github-3060](https://github.com/airsdk/Adobe-Runtime-Support/issues/3060): AS3 StageTextContentType class for StageText support for OTP SMS entry


## Bug fixes

- AIR-6840: FileReference.upload() to cope with binary file responses (Windows)
- [github-2318](https://github.com/airsdk/Adobe-Runtime-Support/issues/2318): Removing StageVideo viewport coordinate limits for AIR 51 apps
- [github-3024](https://github.com/airsdk/Adobe-Runtime-Support/issues/3024): Removing StageWebView viewport coordination limits for AIR 51 apps
- [github-3062](https://github.com/airsdk/Adobe-Runtime-Support/issues/3062): Updating Win32 camera handling to include better fallbacks where direct connect fails