---
title: Release 33.1.1.929
authors: [ marchbold ]
tags: [ airsdk, updates ]
---


**AIR SDK 33.1.1.929** has been released by Harman.  

- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.929/release-notes/Release_Notes_AIR_SDK_33.1.1.929.pdf)  
- [Download](https://airsdk.harman.com/download/33.1.1.929)  

<!-- truncate -->

### Features  

- AIR-5964: Reverting the merging of ABC blocks in SWCs
- [github-1963](https://github.com/airsdk/Adobe-Runtime-Support/issues/1963): Allowing the app descriptor to limit the Direct3D version level (using a new descriptor option
`<maxD3D>` under the `<windows>` section)
- [github-2014](https://github.com/airsdk/Adobe-Runtime-Support/issues/2014): Adding 'ignore' option for autoOrients to avoid using OrientationEventListener


### Bug Fixes    

- [github-402](https://github.com/airsdk/Adobe-Runtime-Support/issues/402): Sending ByteArray from Worker cause Adobe Scout show incorrect memory consumption
- [github-1950](https://github.com/airsdk/Adobe-Runtime-Support/issues/1950): Cleaning up local JNI references to avoid Java OutOfMemory errors
- [github-1965](https://github.com/airsdk/Adobe-Runtime-Support/issues/1965): Fixing runtimeClases.jar file format to remove directory entries, and enabling jetifier
- [github-1973](https://github.com/airsdk/Adobe-Runtime-Support/issues/1973): Removing exe and dll files from the Linux and macOS SDK zips
- [github-1974](https://github.com/airsdk/Adobe-Runtime-Support/issues/1974): Reworking omit-trace-statements to ensure the compiler still works within Flash Builder
- [github-2010](https://github.com/airsdk/Adobe-Runtime-Support/issues/2010): Fixing error in Rectangle.unionToOutput if 'this' object is the same as 'output' parameter
- [github-2042](https://github.com/airsdk/Adobe-Runtime-Support/issues/2042), [github-2047](https://github.com/airsdk/Adobe-Runtime-Support/issues/2047): Fixing problem with autoOrients setting being skipped