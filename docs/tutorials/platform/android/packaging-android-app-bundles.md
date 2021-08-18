---
title: Packaging Android App Bundles
---

:::info
This is specific for Google Play Publishing
:::

:::note
Important: From August 2021, new apps are required to publish with the Android App Bundle on Google Play. New apps larger than 150 MB are now supported by either Play Feature Delivery or Play Asset Delivery.
:::

An Android App Bundle is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

Google Play uses your app bundle to generate and serve optimized APKs for each device configuration, so only the code and resources that are needed for a specific device are downloaded to run your app. You no longer have to build, sign, and manage multiple APKs to optimize support for different devices, and users get smaller, more-optimized downloads.

## Packaging

AIR supports creation of an App Bundle by creating an Android Studio project and using Gradle to build this. **It requires an Android SDK to be installed.** It also needs to have a JDK present and available via the `JAVA_HOME` environment variable.

:::info
The creation of an Android App Bundle involves a few steps and can take significantly longer than creating an APK file. We recommend that APK generation is still used during development and testing, and the AAB output can be used when packaging up an application for upload to the Play Store.
:::

### Setting the Android SDK

You must download and install the Android SDK to your development machine. The easiest way to do this is to install Android Studio. [Download](https://developer.android.com/studio).

#### Using `platformsdk`

If you use `adt` to package your application you can supply the path to the Android SDK via the `-platformsdk` option:

```
adt ... -platformsdk /path/to/android/sdk
```

#### Using an environment variable

You can set the path to the Android SDK by setting an environment variable named `AIR_ANDROID_SDK_HOME` that points to the Android SDK location.

This has the advantage of applying the setting to all installs of the AIR SDK.

#### Using `adt.cfg`

You can specify the Android SDK in the `adt.cfg` file located at `[AIRSDK]/lib/adt.cfg` and adding the following line:

```
AndroidPlatformSDK=/path/to/android/sdk
```

This will need to be updated in every AIR SDK you use.

### Creating the AAB

#### Using `adt`

To package an AAB using `adt` simply change the target from `apk` to `aab` and ensure you provide the `platformsdk`

```
adt -package -target aab <signing options> output.aab <app descriptor and files> [-extdir <folder>] -platformsdk <path_to_android_sdk>
```

#### IDE's without direct options

If you are using an IDE that currently cannot change the output target to `aab` you can force AIR to output an `aab` from the normal `apk` packaging process. This is done by setting a configuration option in `adt.cfg` (located at `[AIRSDK]/lib/adt.cfg`):

```
CreateAndroidAppBundle=true
```

:::note
This will force the output to be in the AAB format, however your IDE may still output a file with the extension of `apk`. If this is the case you will need to rename the output from `application.apk` to `application.aab`.
:::

### Specifying Certificates

TODO

Note that the APK generation here will use a default/debug keystore; additional command-line parameters
can be used if the output APK needs to be signed with a particular certificate.

## Creating Certificates

TODO:: Provide information on the certificates required (Play App Signing etc)

## Testing

ADT allows an AAB file to be installed onto a handset using the `-installApp` command, which wraps up the necessary bundletool commands that generate an APKS file (that contains a set of APK files suitable for a particular device) and then installs it.

If developers want to do this manually, instructions for this are available at https://developer.android.com/studio/command-line/bundletool#deploy_with_bundletool, essentially the below lines can be used:

```
java -jar bundletool.jar build-apks --bundle output.aab --output output.apks --connected-device
java -jar bundletool.jar install-apks --apks=output.apks
```

TODO:: More information required here about signing, as this process needs to supply a certificate to sign the apk
