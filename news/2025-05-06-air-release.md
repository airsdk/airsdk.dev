---
title: Release 51.2.1.3
authors: [ marchbold ]
tags: [ airsdk, updates ]
---

New AIR SDK Release **51.2.1.3**

- [Release Notes](https://airsdk.harman.com/api/versions/51.2.1.3/release-notes/Release_Notes_AIR_SDK_51.2.1.pdf) 


## Download

Please use AIR SDK Manager. Follow the instructions to install here: https://airsdk.dev/docs/basics/getting-started

*For Flex users select manual install method.*


## Bug fixes

- AIR-7546: AIR security - license file validation opt-out
- AIR-7677: AIR Linux to support Wayland via GDK_BACKEND
- AIR-7682: AIR configuration for JIT verbose output
- AIR-7683: AIR Windows crash when opening SWFInvestigator
- [github-3723](https://github.com/airsdk/Adobe-Runtime-Support/issues/3723): Fixing diagnostics error checking for Context3D OpenGL ES failures
- [github-3729](https://github.com/airsdk/Adobe-Runtime-Support/issues/3729): Fixing Android text rendering to avoid `BitmapData.draw` issue
- [github-3751](https://github.com/airsdk/Adobe-Runtime-Support/issues/3751): Support individual surrogate-pair values in Strings (cf JavaScript)
- [github-3772](https://github.com/airsdk/Adobe-Runtime-Support/issues/3772): Adding some JIT optimisations to reduce floating point maths
- [github-3773](https://github.com/airsdk/Adobe-Runtime-Support/issues/3773): Avoid MovieClips from advancing during splash screen time
- [github-3777](https://github.com/airsdk/Adobe-Runtime-Support/issues/3777): Updating GTK dependency information in ANE header file
- [github-3779](https://github.com/airsdk/Adobe-Runtime-Support/issues/3779): Ensuring reused enterFrame event objects are reset fully
- [github-3787](https://github.com/airsdk/Adobe-Runtime-Support/issues/3787): Fixing Android `NativeApplication.exit()` mechanism