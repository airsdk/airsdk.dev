---
title: ADT -package
sidebar_label: package
sidebar_position: 1
---

The `-package` command should be run from the main application directory. The command uses the following syntaxes:

Create an AIR package from the component application files:

```
adt -package
    AIR_SIGNING_OPTIONS
    -target packageType
    -sampler
    ‑hideAneLibSymbols
    NATIVE_SIGNING_OPTIONS
    output
    app_descriptor
    FILE_OPTIONS
```

Create a native package from the component application files:

```
adt -package
    AIR_SIGNING_OPTIONS
    -target packageType
    DEBUGGER_CONNECTION_OPTIONS
    -airDownloadURL URL
    NATIVE_SIGNING_OPTIONS
    output
    app_descriptor
    -platformsdk path
    FILE_OPTIONS
```

Create a native package that includes a native extension from the component application files:

```
adt -package
    AIR_SIGNING_OPTIONS
    -migrate MIGRATION_SIGNING_OPTIONS
    -target packageType
    DEBUGGER_CONNECTION_OPTIONS
    -airDownloadURL URL
    NATIVE_SIGNING_OPTIONS
    output
    app_descriptor
    -platformsdk path
    FILE_OPTIONS
```

Create a native package from an AIR or AIRI file:

```
adt -package
    -target packageType
    NATIVE_SIGNING_OPTIONS
    output
    input_package
```

Create a native extension package from the component native extension files:

```
adt -package
    AIR_SIGNING_OPTIONS
    -target ane
    output
    ANE_OPTIONS
```

> Note: You do not have to sign an ANE file, so the AIR_SIGNING_OPTIONS parameters are optional in this example.

### `AIR_SIGNING_OPTIONS` 

The AIR signing options identify the certificate used to sign an AIR installation file. The signing options are fully described in [ADT code signing options](../option-sets/code-signing-options.md).

### `-migrate` 

This flag specifies that the application is signed with a migration certificate in addition to the certificate specified in the `AIR_SIGNING_OPTIONS` parameters. This flag is only valid if you are packaging a desktop application as a native installer and the application uses a native extension. In other cases an error occurs. The signing options for the migration certificate are specified as the `MIGRATION_SIGNING_OPTIONS` parameters. Those signing options are fully described in [ADT code signing options](../option-sets/code-signing-options.md). Using the `-migrate` flag allows you to create an update for a desktop native installer application that uses a native extension and change the code signing certificate for the application, such as when the original certificate expires. For more information, see Signing an updated version of an AIR application.

The `-migrate` flag of the `-package` command is available in AIR 3.6 and later.

### `-target`

The type of package to create. The supported package types are:

	- `air` — an AIR package. “air” is the default value and the `-target` flag does not need to be specified when creating AIR or AIRI files.
	- `airn` — a native application package for devices in the extended television profile.
	- `ane` —an AIR native extension package

- Android package targets:

	- `apk` — an Android package. A package produced with this target can only be installed on an Android device, not an emulator.
	- `apk‑captive‑runtime` — an Android package that includes both the application and a captive version of the AIR runtime. A package produced with this target can only be installed on an Android device, not an emulator.
	- `apk-debug` — an Android package with extra debugging information. (The SWF files in the application must also be compiled with debugging support.)
	- `apk-emulator` — an Android package for use on an emulator without debugging support. (Use the apk-debug target to permit debugging on both emulators and devices.)
	- `apk-profile` — an Android package that supports application performance and memory profiling.

- iOS package targets:

	- `ipa-ad-hoc` — an iOS package for ad hoc distribution.
	- `ipa-app-store` — an iOS package for Apple App store distribution.
	- `ipa-debug` — an iOS package with extra debugging information. (The SWF files in the application must also be compiled with debugging support.)
	- `ipa-test` — an iOS package compiled without optimization or debugging information.
	- `ipa-debug-interpreter` — functionally equivalent to a debug package, but compiles more quickly. However, the ActionScript bytecode is interpreted and not translated to machine code. As a result, code execution is slower in an interpreter package.
	- `ipa-debug-interpreter-simulator` — functionally equivalent to ipa-debug-interpreter, but packaged for the iOS simulator. Macintosh-only. If you use this option, you must also include the `-platformsdk` option, specifying the path to the iOS Simulator SDK.
	- `ipa-test-interpreter` — functionally equivalent to a test package, but compiles more quickly. However, the ActionScript bytecode is interpreted and not translated to machine code. As a result, code execution is slower in an interpreter package.
	- `ipa-test-interpreter-simulator` — functionally equivalent to `ipa-test-interpreter`, but packaged for the iOS simulator. Macintosh-only. If you use this option, you must also include the `-platformsdk` option, specifying the path to the iOS Simulator SDK.

- `native` — a native desktop installer. The type of file produced is the native installation format of the operating system on which the command is run:

	- `EXE` — Windows
	- `DMG` — Mac
	- `DEB` — Ubuntu Linux (AIR 2.6 or earlier)
	- `RPM` — Fedora or OpenSuse Linux (AIR 2.6 or earlier)

For more information see [Packaging a desktop native installer](/docs/tutorials/platform/desktop/packaging-native-installer.md).

### `-sampler`

(iOS only, AIR 3.4 and higher) 

Enables the telemetry-based ActionScript sampler in iOS applications. Using this flag lets you profile the application with Adobe Scout. Although Scout can profile any Flash platform content, enabling detailed telemetry gives you deep insight into ActionScript function timing, DisplayList, Stage3D rendering and more. Note that using this flag will have a slight performance impact, so do not use it for production applications.

### `-hideAneLibSymbols`

(iOS only, AIR 3.4 and higher) 

Application developers can use multiple native extensions from multiple sources and if the ANEs share a common symbol name, ADT generates a "duplicate symbol in object file" error. In some cases, this error can even manifest itself as a crash at runtime. You can use the hideAneLibSymbols option to specify whether or not to make the ANE library’s symbols visible only to that library’s sources (yes) or visible globally (no):
  - `yes` — Hides ANE symbols, which resolves any unintended symbol conflict issues.
  - `no` — (Default) Does not hide ANE symbols. This is the pre-AIR 3.4 behavior.

:::warning
We do not suggest usage of the `hideAneLibSymbols` under any circumstances. It makes usage of shared libraries across extensions impossible. Most modern native extensions that rely on shared libraries will fail if this is enabled.
:::

### `-embedBitcode`

(iOS/tvOS only, AIR 25 and higher) 

Application developers can use the `embedBitcode` option to specify whether or not to embed bitcode in their iOS/tvOS application by specifying `yes` or `no`. The default value of this switch if not specified is `no`. For tvOS default value is `yes` in `ipa-app-store` target.

### `DEBUGGER_CONNECTION_OPTIONS` 

The debugger connection options specify whether a debug package should attempt to connect to a remote debugger running on another computer or listen for a connection from a remote debugger. This set of options is only supported for mobile debug packages (targets `apk-debug` and `ipa-debug`). These options are described in [Debugger connection options](../option-sets/debugger-connection-options.md).

### `-airDownloadURL`

Specifies an alternate URL for downloading and installing the AIR runtime on Android devices. If not specified, an AIR application will redirect the user to the AIR runtime on the Android Market if the runtime is not already installed.

If your application is distributed through an alternate marketplace (other than the Android Market administered by Google), then you might need to specify the URL for downloading the AIR runtime from that market. Some alternate markets do not allow applications to require a download from outside the market. This option is only supported for Android packages.

:::note Deprecated
The shared runtime is no longer supported on Android.
:::

### `NATIVE_SIGNING_OPTIONS` 

The native signing options identify the certificate used to sign a native package file. These signing options are used to apply a signature used by the native operating system, not the AIR runtime. The options are otherwise identical to the AIR_SIGNING_OPTIONS and are fully described in [ADT code signing options](../option-sets/code-signing-options.md).

Native signatures are supported on Windows and Android. On Windows, both an AIR signing options and the native signing options should be specified. On Android, only the native signing options can be specified.

In many cases, you can use the same code signing certificate to apply both an AIR and a native signature. However, this is not true in all cases. For example, Google’s policy for apps submitted to the Android Market dictates that all apps must be signed with a certificate valid until at least the year 2033. This means that a certificate issued by a well known certificate authority, which are recommended when applying an AIR signature, should not be used to sign an Android app. (No certificate authorities issue a code signing certificate with that long a validity period.)

### `output` 

The name of the package file to create. Specifying the file extension is optional. If not specified, an extension appropriate to the `-target` value and current operating system is added.

### `app_descriptor` 

The path to the application descriptor file. The path can be specified relative to the current directory or as an absolute path. (The application descriptor file is renamed as `application.xml` in the AIR file.)

### `-platformsdk` 

The path to the platform SDK for the target device:

- **Android** - The AIR 2.6+ SDK includes the tools from the Android SDK needed to implement the relevant ADT commands. Only set this value to use a different version of the Android SDK. Also, the platform SDK path does not need to be supplied on the command line if the `AIR_ANDROID_SDK_HOME` environment variable is already set. (If both are set, then the path provided on the command line is used.) _TODO:: Add adt.cfg details_

- **iOS** - The AIR SDK ships with a captive iOS SDK. The `-platformsdk` option lets you package applications with an external SDK so that you are not restricted to using the captive iOS SDK. For example, if you have built an extension with the latest iOS SDK, you can specify that SDK when packaging your application. Additionally, when using ADT with the iOS Simulator, you must always include the `-platformsdk` option, specifying the path to the iOS Simulator SDK.

### `-arch` 

Application developers can use this argument to create an APK for a specific platform architecture, it takes following values:

- `armv7` - ADT packages an APK for the Android armv7 platform.
- `armv8` - ADT packages an APK for the Android armv8 platform.
- `x86` - ADT packages an APK for the Android Intel x86 platform.
- `x64` - ADT packages an APK for the Android Intel x64 platform.
- `all` - ADT packages a "universal APK" containing all architectures.

`armv7` is the default value when no value is specified

### `FILE_OPTIONS`

Identifies the application files to include in the package. The file options are fully described in [File and path options](../option-sets/file-and-path-options.md). Do not specify file options when creating a native package from an AIR or AIRI file.

### `input_airi`

Specify when creating a native package from an AIRI file. The `AIR_SIGNING_OPTIONS` are required if the target is `air` (or no target is specified).

### `input_air`

Specify when creating a native package from an AIR file. Do not specify `AIR_SIGNING_OPTIONS`.

### `ANE_OPTIONS`

Identifies the options and files for creating a native extension package. The extension package options are fully described in [Native extension options](../option-sets/native-extension-options.md).

## ADT -package command examples

Package specific application files in the current directory for a SWF-based AIR application:

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.swf components.swc
```

Package specific application files in the current directory for an HTML-based AIR application:

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.html AIRAliases.js image.gif
```

Package all files and subdirectories in the current working directory:

```
adt –package -storetype pkcs12 -keystore ../cert.p12 myApp.air myApp.xml .
```

:::note
The keystore file contains the private key used to sign your application. Never include the signing certificate inside the AIR package! If you use wildcards in the ADT command, place the keystore file in a different location so that it is not included in the package. In this example the keystore file, `cert.p12`, resides in the parent directory.
:::

Package only the main files and an images subdirectory:

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.swf images
```

Package an HTML-based application and all files in the HTML, scripts, and images subdirectories:

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml index.html AIRALiases.js html scripts images
```

Package the `application.xml` file and main SWF located in a working directory (`release/bin`):

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air release/bin/myApp.xml –C release/bin myApp.swf
```

Package assets from more than one place in your build file system. In this example, the application assets are located in the following folders before packaging:

```
/devRoot
    /myApp
        /release
            /bin
                myApp-app.xml
                myApp.swf or myApp.html
    /artwork
        /myApp
            /images
                image-1.png
                ...
                image-n.png
    /libraries
        /release
            /libs
                lib-1.swf
                lib-2.swf
                lib-a.js
                AIRAliases.js
```

Running the following ADT command from the /devRoot/myApp directory:

```
adt –package -storetype pkcs12 -keystore cert.p12 myApp.air release/bin/myApp-app.xml
    –C release/bin myApp.swf (or myApp.html)
    –C ../artwork/myApp images
    –C ../libraries/release libs
```

Results in the following package structure:

```
/myAppRoot
    /META-INF
        /AIR
            application.xml
            hash
    myApp.swf or myApp.html
    mimetype
    /images
        image-1.png
        ...
        image-n.png
    /libs
        lib-1.swf
        lib-2.swf
        lib-a.js
        AIRAliases.js
```

Run ADT as a Java program for a simple SWF-based application (without setting the classpath):

```
java –jar {AIRSDK}/lib/ADT.jar –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.swf
```

Run ADT as a Java program for a simple HTML-based application (without setting the classpath):

```
java –jar {AIRSDK}/lib/ADT.jar –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.html AIRAliases.js
```

Run ADT as a Java program (with the Java classpath set to include the ADT.jar package):

```
java -com.adobe.air.ADT –package -storetype pkcs12 -keystore cert.p12 myApp.air myApp.xml myApp.swf
```

Run ADT as a Java task in Apache Ant (although it’s usually best to use the ADT command directly in Ant scripts). The paths shown in the example are for Windows:

```
<property name="SDK_HOME" value="C:/AIRSDK"/>
<property name="ADT.JAR" value="${SDK_HOME}/lib/adt.jar"/>

target name="package">
    <java jar="${ADT.JAR}" fork="true" failonerror="true">
        <arg value="-package"/>
        <arg value="-storetype"/>
        <arg value="pkcs12"/>
        <arg value="-keystore"/>
        <arg value="../../ExampleCert.p12"/>
        <arg value="myApp.air"/>
        <arg value="myApp-app.xml"/>
        <arg value="myApp.swf"/>
        <arg value="icons/*.png"/>
    </java>
</target>
```

For more on using `ant` see the [Apache Ant documentation](/docs/tools/building/ant/index.mdx)

:::note
On some computer systems, double-byte characters in the file system paths can be misinterpreted. If this occurs, try setting the JRE used to run ADT to use the UTF-8 character set. This is done by default in the script used to launch ADT on Mac and Linux. In the Windows `adt.bat` file, or when you run ADT directly from Java, specify the `‑Dfile.encoding=UTF-8` option on the Java command line.
:::
