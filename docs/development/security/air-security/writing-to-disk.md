---
sidebar_position: 5
---

# Writing to disk

Applications running in a web browser have only limited interaction with the
user's local file system. Web browsers implement security policies that ensure
that a user's computer cannot be compromised as a result of loading web content.
For example, SWF files running through Flash Player in a browser cannot directly
interact with files already on a user's computer. Shared objects and cookies can
be written to a user's computer for the purpose of maintaining user preferences
and other data, but this is the limit of file system interaction. Because AIR
applications are natively installed, they have a different security contract,
one which includes the capability to read and write across the local file
system.

This freedom comes with high responsibility for developers. Accidental
application insecurities jeopardize not only the functionality of the
application, but also the integrity of the user's computer. For this reason,
developers should read
[Best security practices for developers](./best-security-practices-for-developers.md).

AIR developers can access and write files to the local file system using several
URL scheme conventions:

| URL scheme    | Description                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app:/         | An alias to the application directory. Files accessed from this path are assigned the application sandbox and have the full privileges granted by the runtime.                                                         |
| app-storage:/ | An alias to the local storage directory, standardized by the runtime. Files accessed from this path are assigned a non-application sandbox.                                                                            |
| file:///      | An alias that represents the root of the user's hard disk. A file accessed from this path is assigned an application sandbox if the file exists in the application directory, and a non-application sandbox otherwise. |

Note: AIR applications cannot modify content using the app: URL scheme. Also,
the application directory may be read only because of administrator settings.

Unless there are administrator restrictions to the user's computer, AIR
applications are privileged to write to any location on the user's hard drive.
Developers are advised to use the `app-storage:/` path for local storage related
to their application. Files written to `app-storage:/` from an application are
put in a standard location:

- On Mac OS: the storage directory of an application is
  `<appData>/<appId>/Local Store/` where `<appData>` is the user's preferences
  folder. This is typically `/Users/<user>/Library/Preferences`

- On Windows: the storage directory of an application is
  `<appData>\<appId>\Local Store\` where `<appData>` is the user's CSIDL_APPDATA
  Special Folder. This is typically
  `C:\Documents and Settings\<userName>\Application Data`

- On Linux: `<appData>/<appID>/Local Store/` where `<appData>` is
  `/home/<user>/.appdata`

If an application is designed to interact with existing files in the user's file
system, be sure to read
[Best security practices for developers](./best-security-practices-for-developers.md).
