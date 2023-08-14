---
sidebar_position: 8
---

# Code signing

All AIR installer files are required to be code signed. Code signing is a
cryptographic process of confirming that the specified origin of software is
accurate. AIR applications can be signed using either by a certificate issued by
an external certificate authority (CA) or by a self-signed certificate you
create yourself. A commercial certificate from a well-known CA is strongly
recommended and provides assurance to your users that they are installing your
application, not a forgery. However, self-signed certificates can be created
using `adt` from the SDK or using either Flash, Flash Builder, or another
application that uses `adt` for certificate generation. Self-signed certificates
do not provide any assurance that the application being installed is genuine and
should only be used for testing an application prior to public release.

More Help topics

![](../../img/airLinkIndicator.png)
[Signing AIR applications](https://web.archive.org/web/20221230223116/https://help.adobe.com/en_US/air/build/WSfffb011ac560372f-19aa73f128cc9f05e8-8000.html)

![](../../img/airLinkIndicator.png)
[ADT code signing options](https://web.archive.org/web/20221208071559/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7f72.html)
