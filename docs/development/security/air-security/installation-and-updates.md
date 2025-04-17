---
sidebar_position: 2
---

# Installation and updates

AIR applications are distributed via AIR installer files which use the `air`
extension or via native installers, which use the file format and extension of
the native platform. For example, the native installer format of Windows is an
EXE file, and for Android the native format is an APK file.

When Adobe AIR is installed and an AIR installer file is opened, the AIR runtime
administers the installation process. When a native installer is used, the
operating system administers the installation process.

Note: Developers can specify a version, and application name, and a publisher
source when using the AIR file format, but the initial application installation
workflow itself cannot be modified. This restriction is advantageous for users
because all AIR applications share a secure, streamlined, and consistent
installation procedure administered by the runtime. If application customization
is necessary, it can be provided when the application is first executed.

## Runtime installation location

AIR applications using the AIR file format first require the runtime to be
installed on a user's computer, just as SWF files first require the Flash Player
browser plug-in to be installed.

The runtime is installed to the following location on desktop computers:

- Mac OS: `/Library/Frameworks/`

- Windows: `C:\Program Files\Common Files\Adobe AIR`

- Linux: `/opt/Adobe AIR/`

On Mac OS, to install an updated version of an application, the user must have
adequate system privileges to install to the application directory. On Windows
and Linux, a user must have administrative privileges.

Note: On iOS, the AIR runtime is not installed separately; every AIR app is a
self-contained application.

The runtime can be installed in two ways: using the seamless install feature
(installing directly from a web browser) or via a manual install. AIR
applications packaged as native installers can also install the AIR runtime as
part of their normal application install process. (Distributing the AIR runtime
in this way requires a redistribution agreement with Adobe.)

## Seamless install (runtime and application)

The seamless install feature provides developers with a streamlined installation
experience for users who do not have Adobe AIR installed yet. In the seamless
install method, the developer creates a SWF file that presents the application
for installation. When a user clicks in the SWF file to install the application,
the SWF file attempts to detect the runtime. If the runtime cannot be detected
it is installed, and the runtime is activated immediately with the installation
process for the developer's application.

## Manual install

Alternatively, the user can manually download and install the runtime before
opening an AIR file. The developer can then distribute an AIR file by different
means (for instance, via e-mail or an HTML link on a website). When the AIR file
is opened, the runtime begins to process the application installation.

## Application installation flow

The AIR security model allows users to decide whether to install an AIR
application. The AIR install experience provides several improvements over
native application install technologies that make this trust decision easier for
users:

- The runtime provides a consistent installation experience on all operating
  systems, even when an AIR application is installed from a link in a web
  browser. Most native application install experiences depend upon the browser
  or other application to provide security information, if it is provided at
  all.

- The AIR application install experience identifies the source of the
  application and information about what privileges are available to the
  application (if the user allows the installation to proceed).

- The runtime administers the installation process of an AIR application. An AIR
  application cannot manipulate the installation process the runtime uses.

In general, users should not install any desktop application that comes from a
source that they do not trust, or that cannot be verified. The burden of proof
on security for native applications is equally true for AIR applications as it
is for other installable applications.

## Application destination

The installation directory can be set using one of the following two options:

1.  The user customizes the destination during installation. The application
```
installs to wherever the user specifies.
```

2.  If the user does not change the install destination, the application
```
installs to the default path as determined by the runtime:
```

    - Mac OS: `~/Applications/`

    - Windows XP and earlier: `C:\Program Files\`

    - Windows Vista: `~/Apps/`

    - Linux: /opt/

```
If the developer specifies an `installFolder` setting in the application
descriptor file, the application is installed to a subpath of this
directory.
```

## The AIR file system

The install process for AIR applications copies all files that the developer has
included within the AIR installer file onto the user's local computer. The
installed application is composed of:

- Windows: A directory containing all files included in the AIR installer file.
  The runtime also creates an exe file during the installation of the AIR
  application.

- Linux: A directory containing all files included in the AIR installer file.
  The runtime also creates a bin file during the installation of the AIR
  application.

- Mac OS: An `app` file that contains all of the contents of the AIR installer
  file. It can be inspected using the "Show Package Contents" option in Finder.
  The runtime creates this app file as part of the installation of the AIR
  application.

An AIR application is run by:

- Windows: Running the .exe file in the install folder, or a shortcut that
  corresponds to this file (such as a shortcut on the Start Menu or desktop).

- Linux: Launching the .bin file in the install folder, choosing the application
  from the Applications menu, or running from an alias or desktop shortcut.

- Mac OS: Running the .app file or an alias that points to it.

The application file system also includes subdirectories related to the function
of the application. For example, information written to encrypted local storage
is saved to a subdirectory in a directory named after the application identifier
of the application.

## AIR application storage

AIR applications have privileges to write to any location on the user's hard
drive; however, developers are encouraged to use the `app-storage:/` path for
local storage related to their application. Files written to `app-storage:/`
from an application are located in a standard location depending on the user's
operating system:

- On Mac OS: the storage directory of an application varies by AIR version:

  - **AIR 3.2 and earlier** - `<appData>/<appId>/Local Store/` where `<appData>`
```
is the user's "preferences folder," typically:
`/Users/<user>/Library/Preferences`
```

  - **AIR 3.3 and higher** -
```
`<path>/Library/Application Support/<appID>/Local Store`, where `<path>` is
either `/Users/<user>/Library/Containers/<bundle-id>/Data` (sandboxed
environment) or `/Users/<user>` ( when running outside a sandboxed
environment)
```

- On Windows: the storage directory of an application is
  `<appData>\<appId>\Local Store\` where `<appData>` is the user's CSIDL_APPDATA
  "Special Folder," typically:
  `C:\Documents and Settings\<user>\Application Data`

- On Linux: `<appData>/<appID>/Local Store/` where `<appData>` is
  `/home/<user>/.appdata`

You can access the application storage directory via the
`air.File.applicationStorageDirectory` property. You can access its contents
using the `resolvePath()` method of the File class. For details, see
[Working with the file system](../../files-and-data/working-with-the-file-system/index.md).

## Updating Adobe AIR

When the user installs an AIR application that requires an updated version of
the runtime, the runtime automatically installs the required runtime update.

To update the runtime, a user must have administrative privileges for the
computer.

## Updating AIR applications

Development and deployment of software updates are one of the biggest security
challenges facing native code applications. The AIR API provides a mechanism to
improve this: the `Updater.update()` method can be invoked upon launch to check
a remote location for an AIR file. If an update is appropriate, the AIR file is
downloaded, installed, and the application restarts. Developers can use this
class not only to provide new functionality but also respond to potential
security vulnerabilities.

The Updater class can only be used to update applications distributed as AIR
files. Applications distributed as native applications must use the update
facilities, if any, of the native operating system.

Note: Developers can specify the version of an application by setting the
versionNumber property of the application descriptor file.

## Uninstalling an AIR application

Removing an AIR application removes all files in the application directory.
However, it does not remove all files that the application may have written to
outside of the application directory. Removing AIR applications does not revert
changes the AIR application has made to files outside of the application
directory.

## Windows registry settings for administrators

On Windows, administrators can configure a machine to prevent (or allow) AIR
application installation and runtime updates. These settings are contained in
the Windows registry under the following key: HKLM\Software\Policies\Adobe\AIR.
They include the following:

| Registry setting            | Description                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AppInstallDisabled          | Specifies that AIR application installation and uninstallation are allowed. Set to 0 for "allowed," set to 1 for "disallowed."                                                     |
| UntrustedAppInstallDisabled | Specifies that installation of untrusted AIR applications (applications that do not includes a trusted certificate) is allowed. Set to 0 for "allowed," set to 1 for "disallowed." |
| UpdateDisabled              | Specifies that updating the runtime is allowed, either as a background task or as part of an explicit installation. Set to 0 for "allowed," set to 1 for "disallowed."             |

More Help topics

![](../../img/airLinkIndicator.png)
[Distributing, Installing, and Running AIR applications](https://web.archive.org/web/20211015211024/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7fcb.html)

![](../../img/airLinkIndicator.png)
[Setting AIR application properties](https://web.archive.org/web/20221205160703/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff1.html)

![](../../img/airLinkIndicator.png)
[Digitally signing an AIR file](https://web.archive.org/web/20221230223109/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff0.html)
