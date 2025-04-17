---
title: AIR Debug Launcher (adl)
sidebar_position: 2
---

Use the AIR Debug Launcher (ADL) to run both SWF-based and HTML-based applications during development. Using ADL, you can run an application without first packaging and installing it. By default, ADL uses a runtime included with the SDK, which means you do not have to install the runtime separately to use ADL.

ADL prints trace statements and run-time errors to the standard output, but does not support breakpoints or other debugging features. You can use the Flash Debugger (or an integrated development environment such as Flash Builder) for complex debugging issues.

:::note
If your `trace()` statements do not display on the console, ensure that you have not specified `ErrorReportingEnable` or `TraceOutputFileEnable` in the `mm.cfg` file.
:::

AIR supports debugging directly, so you do not need a debug version of the runtime. To conduct command-line debugging, you use the Flash Debugger and the AIR Debug Launcher (ADL).

The Flash Debugger is distributed in the AIR SDK directory. The native versions, such as `fdb.exe` on Windows, are in the `bin` subdirectory. The Java version is in the `lib` subdirectory. The AIR Debug Launcher, `adl.exe`, is in the bin directory of your AIR SDK installation. (There is no separate Java version).

:::note
You cannot start an AIR application directly with `fdb`, because `fdb` attempts to launch it with Flash Player. Instead, let the AIR application connect to a running `fdb` session.
:::

## ADL usage

To run an application with ADL, use the following pattern:

```
adl application.xml
```

Where `application.xml` is the application descriptor file for the application.

The full syntax for the ADL is:

```
adl     [-runtime runtime-directory]
    [-pubid publisher-id]
    [-nodebug]
    [-atlogin]
    [-profile profileName]
    [-screensize value]
    [-extdir extension-directory]
    application.xml
    [root-directory]
    [-- arguments]
```

(Items in brackets, [], are optional.)

### `-runtime runtime-directory`

Specifies the directory containing the runtime to use. If not specified, the runtime directory in the same SDK as the ADL program is used. If you move ADL out of its SDK folder, specify the runtime directory. On Windows and Linux, specify the directory containing the Adobe AIR directory. On Mac OS X, specify the directory containing Adobe AIR.framework.

### `-pubid publisher-id`

Assigns the specified value as the publisher ID of the AIR application for this run. Specifying a temporary publisher ID allows you to test features of an AIR application, such as communicating over a local connection, that use the publisher ID to help uniquely identify an application. As of AIR 1.5.3, you can also specify the publisher ID in the application descriptor file (and should not use this parameter).

:::note
As of AIR 1.5.3, a Publisher ID is no longer automatically computed and assigned to an AIR application. You can specify a publisher ID when creating an update to an existing AIR application, but new applications do not need and should not specify a publisher ID.
:::

### `-nodebug`

Turns off debugging support. If used, the application process cannot connect to the Flash debugger and dialogs for unhandled exceptions are suppressed. (However, trace statements still print to the console window.) Turning off debugging allows your application to run a little faster and also emulates the execution mode of an installed application more closely.

### `-atlogin`

Simulates launching the application at login. This flag allows you to test application logic that executes only when an application is set to launch when the user logs in. When -atlogin is used, the reason property of the InvokeEvent object dispatched to the application will be login instead of standard (unless the application is already running).

### `-profile profileName`

ADL debugs the application using the specified profile. The profileName can be one of the following values:

- `desktop`
- `extendedDesktop`
- `mobileDevice`

If the application descriptor includes a `supportedProfiles` element, then the profile you specify with `-profile` must be a member of the supported list. If the `-profile` flag is not used, the first profile in the application descriptor is used as the active profile. If the application descriptor does not include the `supportedProfiles` element and you do not use the `-profile` flag, then the `desktop` profile is used.

For more information, see [supportedProfiles](application-descriptor-files/elements/application#supportedprofiles) and [Device profiles](device-profiles).

### `-screensize value`

The simulated screen size to use when running apps in the `mobileDevice` profile on the desktop. Specify the screen size as a predefined screen type, or as the pixel dimensions of the normal width and height for portrait layout, plus the fullscreen width and height. To specify the value by type, use one of the following predefined screen types:

> TODO: Need to confirm the following values are complete!

| Screen type      | Normal width x height | Fullscreen width x height |
| ---------------- | --------------------- | ------------------------- |
| 480              | 720 x 480             | 720 x 480                 |
| 720              | 1280 x 720            | 1280 x 720                |
| 1080             | 1920 x 1080           | 1920 x 1080               |
| Droid            | 480 x 816             | 480 x 854                 |
| FWQVGA           | 240 x 432             | 240 x 432                 |
| FWVGA            | 480 x 854             | 480 x 854                 |
| HVGA             | 320 x 480             | 320 x 480                 |
| iPad             | 768 x 1004            | 768 x 1024                |
| iPadRetina       | 1536 x 2008           | 1536 x 2048               |
| iPhone           | 320 x 460             | 320 x 480                 |
| iPhoneRetina     | 640 x 920             | 640 x 960                 |
| iPhone5Retina    | 640 x 1096            | 640 x 1136                |
| iPhone6          | 750 x 1294            | 750 x 1334                |
| iPhone6Plus      | 1242 x 2148           | 1242 x 2208               |
| iPod             | 320 x 460             | 320 x 480                 |
| iPodRetina       | 640 x 920             | 640 x 960                 |
| iPod5Retina      | 640 x 1096            | 640 x 1136                |
| NexusOne         | 480 x 762             | 480 x 800                 |
| QVGA             | 240 x 320             | 240 x 320                 |
| SamsungGalaxyS   | 480 x 762             | 480 x 800                 |
| SamsungGalaxyTab | 600 x 986             | 600 x 1024                |
| WQVGA            | 240 x 400             | 240 x 400                 |
| WVGA             | 480 x 800             | 480 x 800                 |

To specify the screen pixel dimensions directly, use the following format:

```
widthXheight:fullscreenWidthXfullscreenHeight
```

Always specify the pixel dimensions for portrait layout, meaning specify the width as a value smaller than the value for height. For example, the NexusOne screen can be specified with:

```
-screensize 480x762:480x800
```

### `-extdir extension-directory`

The directory in which the runtime should search for native extensions. The directory contains a subdirectory for each native extension that the application uses. Each of these subdirectories contain the unpackaged ANE file of an extension. For example:

```
C:\extensionDirs\
    extension1.ane\
        META-INF\
            ANE\
                Android-ARM\
                    library.swf
                    extension1.jar
                extension.xml
            signatures.xml
        catalog.xml
        library.swf
        mimetype
    extension2.ane\
        META-INF\
            ANE\
                Android-ARM\
                    library.swf
                    extension2.jar
                extension.xml
            signatures.xml
        catalog.xml
        library.swf
        mimetype
```

:::info
When using the `-extdir` parameter, consider the following:

- The ADL command requires that each of the specified directories have the `.ane` filename extension. However, the part of the filename before the `.ane` suffix can be any valid filename. It does not have to match the value of the extensionID element of the application descriptor file.
- You can specify the `-extdir` parameter more than once.
- The use of the `-extdir` parameter is different for the ADT tool and the ADL tool. In ADT, the parameter specifies a directory that contains ANE files.
- You can also use the environment variable `AIR_EXTENSION_PATH` to specify the extension directories. See ADT environment variables.
:::

### `application.xml`

The application descriptor file. See [AIR application descriptor files](application-descriptor-files/introduction.md). The application descriptor is the only parameter required by ADL and, in most cases, the only parameter needed.

### `root-directory`

Specifies the root directory of the application to run. If not specified, the directory containing the application descriptor file is used.

### `-- arguments`

Any character strings appearing after "--" are passed to the application as command line arguments.

:::note
When you launch an AIR application that is already running, a new instance of that application is not started. Instead, an invoke event is dispatched to the running instance.
:::

## ADL Examples

Run an application in the current directory:

```
adl myApp-app.xml
```

Run an application in a subdirectory of the current directory:

```
adl source/myApp-app.xml release
```

Run an application and pass in two command-line arguments, "tick" and "tock":

```
adl myApp-app.xml -- tick tock
```

Run an application using a specific runtime:

```
adl -runtime /AIRSDK/runtime myApp-app.xml
```

Run an application without debugging support:

```
adl -nodebug myApp-app.xml
```

Run an application in the mobile device profile and simulate the Nexus One screen size:

```
adl -profile mobileDevice -screensize NexusOne myMobileApp-app.xml
```

Run an application using Apache Ant to run the application (the paths shown in the example are for Windows):

```xml
<property name="SDK_HOME" value="C:/AIRSDK"/>
<property name="ADL" value="${SDK_HOME}/bin/adl.exe"/>
<property name="APP_ROOT" value="c:/dev/MyApp/bin-debug"/>
<property name="APP_DESCRIPTOR" value="${APP_ROOT}/myApp-app.xml"/>

<target name="test">
    <exec executable="${ADL}">
        <arg value="${APP_DESCRIPTOR}"/>
        <arg value="${APP_ROOT}"/>
    </exec>
</target>
```

## ADL exit and error codes

The following table describes the exit codes printed by ADL:

| Exit code | Description                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 0         | Successful launch. ADL exits after the AIR application exits.                                                                                 |
| 1         | Successful invocation of an already running AIR application. ADL exits immediately.                                                           |
| 2         | Usage error. The arguments supplied to ADL are incorrect.                                                                                     |
| 3         | The runtime cannot be found.                                                                                                                  |
| 4         | The runtime cannot be started. Often, this occurs because the version specified in the application does not match the version of the runtime. |
| 5         | An error of unknown cause occurred.                                                                                                           |
| 6         | The application descriptor file cannot be found.                                                                                              |
| 7         | The contents of the application descriptor are not valid. This error usually indicates that the XML is not well formed.                       |
| 8         | The main application content file (specified in the `<content>` element of the application descriptor file) cannot be found.                  |
| 9         | The main application content file is not a valid SWF or HTML file.                                                                            |
| 10        | The application doesn’t support the profile specified with the `-profile` option.                                                             |
| 11        | The `-screensize` argument is not supported in the current profile.                                                                           |
