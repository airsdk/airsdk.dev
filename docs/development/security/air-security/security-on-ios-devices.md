---
sidebar_position: 10
---

# Security on iOS devices

On iOS AIR conforms to the native security model. At the same time, AIR
maintains its own security rules, which are intended to make it easy for
developers to write secure, Internet-connected applications.

Since AIR applications on iOS use the iOS package format, installation falls
under the iOS security model. The AIR application installer is not used.
Furthermore, a separate AIR runtime is not used on iOS devices. Every AIR
application contains all the code needed to function.

#### Application signatures

All application packages created for the iOS platform must be signed. Since AIR
applications on iOS are packaged in the native iOS IPA format, they are signed
in accordance with iOS requirements rather than AIR requirements. While iOS and
AIR use code signing in a similar fashion, there are significant differences:

- On iOS, the certificate used to sign an application must be issued by Apple;
  Certificates from other certificate authorities cannot be used.

- On iOS, Apple-issued distribution certificates are typically valid for one
  year.

#### Background image privacy

When a user switches an application to the background on iOS, the operating
system captures a screenshot that it uses to animate the transition. This
screenshot is stored in device memory and can be accessed by an attacker in
physical control of the device.

If your application displays sensitive information, you should guard against
such information being captured by the background screenshot. The `deactivate`
event dispatched by the NativeApplication object signals that an application is
about to switch to the background. Use this event to clear or hide any sensitive
information.
