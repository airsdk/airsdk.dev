---
title: Release 33.1.1.698
authors: [ jan ]
tags: [ airsdk, updates ]
---

**AIR Runtime 33.1.1.698** has been released by Harman.


- [Release Notes](https://airsdk.harman.com/api/versions/33.1.1.698/release-notes/Release_Notes_AIR_SDK_33.1.1.698.pdf)
- [Download](https://airsdk.harman.com/download/33.1.1.698)

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
github-1387: Switch APK builds so that they use Android Gradle plug-in. When an Android APK build is
requested, the default mechanism is now to use Gradle (similarly to how the AAB bundles are created). This
brings some parity to the two mechanisms which should help to ensure developers don’t encounter problems
with deployed bundles that haven’t been first spotted during local testing.
For developers who would prefer to keep using the earlier APK generation mechanisms, a flag can be added
to the XML Descriptor File under the &lt;android&gt; section: “&lt;BuildLegacyAPK&gt;true&lt;/BuildLegacyAPK&gt;”.
  
### 3.1.5 Bug Fixes  
github-972: Ensure signing of an App Bundle preserves the file permissions  
github-1006: Adding support for 'webViewAllowFileAccess' tag for Android local file access in WebView  
github-1340: Ensuring 'resdir' option in XML descriptor can use relative paths  
github-1376: Ensuring no-compress settings are used in App Bundle packages  
github-1391: Fixing signing block format for dynamic frameworks in macho binaries  
github-1392: Android APK: updating Java code generation to target 1.8  
github-1397: Ensuring Android package names don't include Java reserved words  
github-apm40: Fixing crash when using command-line tools with nativeprocess  
AIR-4740: Remove use of sun internal security classes for APK/AAB signing  
AIR-5427: AIR Android security update for https certificate errors  
