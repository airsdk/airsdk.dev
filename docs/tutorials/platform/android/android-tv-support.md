---
title: Android TV Support
---

With AIR 28, Android TV support for AIR Android applications comes with more stability and improvements.

Developers can develop captive runtime applications that are also compatible with Android TV. Use `swf-version` 31 or greater and namespace 20.0 or greater to access this feature. The two tags mentioned below need to be added to the `app.xml` file to support Android TV applications.

1. `<supportsAndroidTV></supportsAndroidTV>`

   Value for the `<supportsAndroidTV>` tag can be either "true" or "false". If this tag is not added, then the default value will be "false".

   - `<supportsAndroidTV>true</supportsAndroidTV>`: Application is supported on Android TV and it will reflect on the home screen of Android TV after the installation.
   - `<supportsAndroidTV>false</supportsAndroidTV>`: Application is not supported on Android TV and it will not be shown on the home screen of the Android TV. However, it will be reflected in the downloaded apps inside Settings of the device.

2. `<banner></banner>`

   This is the tag where the user can give the banner image path. Application Banners represent your app or game on the home screens of TV devices and serve as a way for users to launch the app. The specific requirements for a banner image are 320 x 180 px PNG (xhdpiresource).

   In case the developer does not provide the banner image but enables `supportsAndroidTV`, a default banner image will reflect on the home screen of Android TV.

In order to access new APIs for TV devices, you must create a project or modify an existing project that targets Android 5.0 (API level 21) or higher.

Applications can only be packaged with apk captive runtime target for Android TV.

Android TV support is available from AIR SDK 20.0 or higher, and so the namespace needs to be added accordingly in `app.xml` file.

### Example Application Descriptor

Make the below changes in your application descriptor file parallel to `<manifestAdditions>` tag:

```xml title="app.xml"
<android>

    <manifestAdditions><![CDATA[
    <manifest android:installLocation="auto">


    ...

    </manifest>
    ]]></manifestAdditions>

    <supportsAndroidTV>true</supportsAndroidTV>

    <banner>/path/to/bannerimage_320x180.png</banner>

</android>
```
