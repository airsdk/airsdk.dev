---
title: ADT Environment Variables
sidebar_position: 5
---

ADT reads the values of the following environment variables (if they are set):

- `AIR_ANDROID_SDK_HOME` specifies the path to the root directory of the Android SDK (the directory containing the tools folder). The AIR 2.6+ SDK includes the tools from the Android SDK needed to implement the relevant ADT commands. Only set this value to use a different version of the Android SDK. If this variable is set, then the `-platformsdk` option does not need to be specified when running the ADT commands which require it. If both this variable and the command-line option are set, the path specified on the command line is used.

- `AIR_EXTENSION_PATH` specifies a list of directories to search for native extensions required by an application. This list of directories is searched in order after any native extension directories specified on the ADT command line. The ADL command also uses this environment variable.


TODO:: Add in current additional environment variables


:::note
On some computer systems, double-byte characters in the file system paths stored in these environment variables can be misinterpreted. If this occurs, try setting the JRE used to run ADT to use the UTF-8 character set. This is done by default in the script used to launch ADT on Mac and Linux. In the Windows `adt.bat` file, or when you run ADT directly from Java, specify the `-Dfile.encoding=UTF-8` option on the Java command line.
:::


