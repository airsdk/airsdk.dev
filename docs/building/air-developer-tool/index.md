---
title: AIR Developer Tool (adt)
sidebar_label: About ADT
sidebar_position: 1
---

The AIR Developer Tool (ADT) is a multi-purpose, command-line tool for developing AIR applications. You can use ADT to perform the following tasks:

- Package an AIR application as an `.air` installation file
- Package an AIR application as a native installer—for example, as a `.exe` installer file on Windows, `.ipa` on iOS, or `.apk` on Android
- Package a native extension as an AIR Native Extension (ANE) file
- Sign an AIR application with a digital certificate
- Change (migrate) the digital signature used for application updates
- Determine the devices connected to a computer
- Create a self-signed digital code signing certificate
- Remotely install, launch, and uninstall an application on a mobile device
- Remotely install and uninstall the AIR runtime on a mobile device

ADT is a Java program included in the AIR SDK. You must have Java 1.5 or higher to use it (requirements may be higher for particular functionality, eg Android requires Java 11 as at January 2022). The SDK includes a script file for invoking ADT. To use this script, the location of the Java program must be included in the path environment variable. If the AIR SDK `bin` directory is also listed in your path environment variable, you can type `adt` on the command line, with the appropriate arguments, to invoke ADT. (Please see the [get started](/docs/basics/getting-started) guide for more on setting up your environment.)

At least 2GB of computer memory is required to use ADT. If you have less memory than this, ADT can run out of memory, especially when packaging applications for iOS.

Assuming both Java and the AIR SDK bin directory are both included in the path variable, you can run ADT using the following basic syntax:

```
adt -command options 
```


:::note
Most integrated development environments can package and sign AIR applications for you. You typically do not need to use ADT for these common tasks when you already use such a development environment. However, you might still need to use ADT as a command-line tool for functions that are not supported by your integrated development environment. In addition, you can use ADT as a command-line tool as part of an automated build process.
:::
