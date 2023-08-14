---
sidebar_position: 9
---

# Security on Android devices

On Android, as on all computing devices, AIR conforms to the native security
model. At the same time, AIR maintains its own security rules, which are
intended to make it easy for developers to write secure, Internet-connected
applications.

Since AIR applications on Android use the Android package format, installation
falls under the Android security model. The AIR application installer is not
used.

The Android security model has three primary aspects:

- Permissions

- Application signatures

- Application user IDs

#### Android permissions

Many features of Android are protected by the operating system permission
mechanism. In order to use a protected feature, the AIR application descriptor
must declare that the application requires the necessary permission. When a user
attempts to install the app, the Android operating system displays all requested
permissions to the user before the installation proceeds.

Most AIR applications will need to specify Android permissions in the
application descriptor. By default, no permissions are included. The following
permissions are required for protected Android features exposed through the AIR
runtime:

ACCESS_COARSE_LOCATION  
Allows the application to access WIFI and cellular network location data through
the Geolocation class.

ACCESS_FINE_LOCATION  
Allows the application to access GPS data through the Geolocation class.

ACCESS_NETWORK_STATE and ACCESS_WIFI_STATE  
Allows the application to access network information the NetworkInfo class.

CAMERA  
Allows the application to access the camera.

INTERNET  
Allows the application to make network requests. Also allows remote debugging.

READ_PHONE_STATE  
Allows the AIR runtime to mute audio when an incoming call occurs.

RECORD_AUDIO  
Allows the application to access the microphone.

WAKE_LOCK and DISABLE_KEYGUARD  
Allows the application to prevent the device from going to sleep using the
SystemIdleMode class settings.

WRITE_EXTERNAL_STORAGE  
Allows the application to write to the external memory card on the device.

#### Application signatures

All application packages created for the Android platform must be signed. Since
AIR applications on Android are packaged in the native Android APK format, they
are signed in accordance to Android conventions rather than AIR conventions.
While Android and AIR use code signing in a similar fashion, there are
significant differences:

- On Android, the signature verifies that the private key is in possession of
  the developer, but is not used to verify the identity of the developer.

- For apps submitted to the Android market, the certificate must be valid for at
  least 25 years.

- Android does not support migrating the package signature to another
  certificate. If an update is signed by a different certificate, then users
  must uninstall the original app before they can install the updated app.

- Two apps signed with the same certificate can specify a shared ID that permits
  them to access each others cache and data files. (Such sharing is not
  facilitated by AIR. )

#### Application user IDs

Android uses a Linux kernel. Every installed app is assigned a Linux-type user
ID that determines its permissions for such operations as file access. Files in
the application, application storage, and temporary directories are protected
from access by file system permissions. Files written to external storage (in
other words, the SD card) can be read, modified, and deleted by other
applications, or by the user, when the SD card is mounted as a mass storage
device on a computer.

Cookies received with internet requests are not shared between AIR applications.

#### Background image privacy

When a user switches an application to the background, some Android versions
capture a screenshot that it uses a thumbnail in the recent applications list.
This screenshot is stored in device memory and can be accessed by an attacker in
physical control of the device.

If your application displays sensitive information, you should guard against
such information being captured by the background screenshot. The `deactivate`
event dispatched by the NativeApplication object signals that an application is
about to switch to the background. Use this event to clear or hide any sensitive
information.

## Encrypted data on Android

AIR applications on Android can use the encryption options available in the
built-in SQL database to save encrypted data. For optimum security, base the
encryption key on a user-entered password that is entered whenever the
application is run. A locally stored encryption key or password is difficult or
impossible to "hide" from an attacker who has access to the application files.
If the attacker can retrieve the key, then encrypting the data does not afford
any additional protection beyond the user ID-based filesystem security provided
by the Android system.

The EncryptedLocalStore class can be used to save data, but that data is not
encrypted on Android devices. Instead, the Android security model relies on the
application user ID to protect the data from other applications. Applications
that use a shared user ID and which are signed with the same code signing
certificate use the same encrypted local store.

Important: On a rooted phone, any application running with root privileges can
access the files of any other application. Thus, data stored using the encrypted
local store is not secure on a rooted device.

More Help topics

![](../../img/airLinkIndicator.png)
[Android permissions](https://web.archive.org/web/20170703170631/http://help.adobe.com/en_US/air/build/WSfffb011ac560372f-5d0f4f25128cc9cd0cb-7ffc.html#WS901d38e593cd1bac1e63e3d129d39606f2-8000)

[Android: Security and Permissions](http://developer.android.com/guide/topics/security/security.html)
