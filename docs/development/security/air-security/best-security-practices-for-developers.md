---
sidebar_position: 7
---

# Best security practices for developers

Although AIR applications are built using web technologies, it is important for
developers to note that they are not working within the browser security
sandbox. This means that it is possible to build AIR applications that can do
harm to the local system, either intentionally or unintentionally. AIR attempts
to minimize this risk, but there are still ways where vulnerabilities can be
introduced. This topic covers important potential insecurities.

## Risk from importing files into the application security sandbox

Files that exist in the application directory are assigned to the application
sandbox and have the full privileges of the runtime. Applications that write to
the local file system are advised to write to `app-storage:/`. This directory
exists separately from the application files on the user's computer, hence the
files are not assigned to the application sandbox and present a reduced security
risk. Developers are advised to consider the following:

- Include a file in an AIR file (in the installed application) only if it is
  necessary.

- Include a scripting file in an AIR file (in the installed application) only if
  its behavior is fully understood and trusted.

- Do not write to or modify content in the application directory. The runtime
  prevents applications from writing or modifying files and directories using
  the `app:/` URL scheme by throwing a SecurityError exception.

- Do not use data from a network source as parameters to methods of the AIR API
  that may lead to code execution. This includes use of the `Loader.loadBytes()`
  method and the JavaScript `eval()` function.

## Risk from using an external source to determine paths

An AIR application can be compromised when using external data or content. For
this reason, take special care when using data from the network or file system.
The onus of trust is ultimately on the developer and the network connections
they make, but loading foreign data is inherently risky, and should not be used
for input into sensitive operations. Developers are advised against the
following:

- Using data from a network source to determine a file name

- Using data from a network source to construct a URL that the application uses
  to send private information

## Risk from using, storing, or transmitting insecure credentials

Storing user credentials on the user's local file system inherently introduces
the risk that these credentials may be compromised. Developers are advised to
consider the following:

- If credentials must be stored locally, encrypt the credentials when writing to
  the local file system. The runtime provides an encrypted storage unique to
  each installed application, via the EncryptedLocalStore class. For details,
  see
  [Encrypted local storage](../../files-and-data/storing-local-data/encrypted-local-storage.md).

- Do not transmit unencrypted user credentials to a network source unless that
  source is trusted and the transmission uses the HTTPS: or Transport Layer
  Security (TLS) protocols.

- Never specify a default password in credential creation — let users create
  their own. Users who leave the default unchanged expose their credentials to
  an attacker who already knows the default password.

## Risk from a downgrade attack

During application install, the runtime checks to ensure that a version of the
application is not currently installed. If an application is already installed,
the runtime compares the version string against the version that is being
installed. If this string is different, the user can choose to upgrade their
installation. The runtime does not guarantee that the newly installed version is
newer than the older version, only that it is different. An attacker can
distribute an older version to the user to circumvent a security weakness. For
this reason, the developer is advised to make version checks when the
application is run. It is a good idea to have applications check the network for
required updates. That way, even if an attacker gets the user to run an old
version, that old version will recognize that it needs to be updated. Also,
using a clear versioning scheme for your application makes it more difficult to
trick users into installing a downgraded version.

More Help topics

![](../../img/airLinkIndicator.png)
[Setting AIR application properties](https://web.archive.org/web/20221205160703/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff1.html)
