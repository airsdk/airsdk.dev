---
sidebar_position: 5
---

# Communicating with native processes in AIR

As of Adobe AIR 2, AIR applications can run and communicate with other native
processes via the command line. For example, an AIR application can run a
process and communicate with it via the standard input and output streams.

To communicate with native processes, package an AIR application to be installed
via a native installer. The file type of native installer is specific to the
operating system for which it is created:

- It is a DMG file on Mac OS.

- It is an EXE file on Windows.

- It is an RPM or DEB package on Linux.

These applications are known as extended desktop profile applications. You can
create a native installer file by specifying the `-target native` option when
calling the `-package` command using ADT.

## Overview of native process communications

An AIR application in the extended desktop profile can execute a file, as if it
were invoked by the command line. It can communicate with the standard streams
of the native process. Standard streams include the standard input stream
(stdin), the output stream (stdout), the standard error stream (stderr).

Note: Applications in the extended desktop profile can also launch files and
applications using the `File.openWithDefaultApplication()` method. However,
using this method does not provide the AIR application with access to the
standard streams. For more information, see
[Opening files with the default system application](../files-and-data/working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#opening-files-with-the-default-system-application)

The following code sample shows how to launch a test.exe application in the
application directory. The application passes the argument `"hello"` as a
command-line argument, and it adds an event listener to the process's standard
output stream:

    var nativeProcessStartupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
    var file:File = File.applicationDirectory.resolvePath("test.exe");
    nativeProcessStartupInfo.executable = file;
    var processArgs:Vector.<String> = new Vector.<String>();
    processArgs.push("hello");
    nativeProcessStartupInfo.arguments = processArgs;
    process = new NativeProcess();
    process.addEventListener(ProgressEvent.STANDARD_OUTPUT_DATA, onOutputData);
    process.start(nativeProcessStartupInfo);
    public function onOutputData(event:ProgressEvent):void
    {
    	var stdOut:ByteArray = process.standardOutput;
    	var data:String = stdOut.readUTFBytes(process.standardOutput.bytesAvailable);
    	trace("Got: ", data);
    }

## Launching and closing a native process

To launch a native process, set up a NativeProcessInfo object to do the
following:

- Point to the file you want to launch

- Store command-line arguments to pass to the process when launched (optional)

- Set the working directory of the process (optional)

To start the native process, pass the NativeProcessInfo object as the parameter
of the `start()` method of a NativeProcess object.

For example, the following code shows how to launch a test.exe application in
the application directory. The application passes the argument `"hello"` and
sets the user's documents directory as the working directory:

    var nativeProcessStartupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
    var file:File = File.applicationDirectory.resolvePath("test.exe");
    nativeProcessStartupInfo.executable = file;
    var processArgs:Vector.<String> = new Vector.<String>();
    processArgs[0] = "hello";
    nativeProcessStartupInfo.arguments = processArgs;
    nativeProcessStartupInfo.workingDirectory = File.documentsDirectory;
    process = new NativeProcess();
    process.start(nativeProcessStartupInfo);

To terminate the process, call the `exit()` method of the NativeProcess object.

If you want a file to be executable in your installed application, make sure
that it's executable on the file system when you package your application. (On
Mac and Linux, you can use chmod to set the executable flag, if needed.)

## Communicating with a native process

Once an AIR application has started a native process, it can communicate with
the standard input, standard output, and standard error streams of the process.

You read and write data to the streams using the following properties of the
NativeProcess object:

- `standardInput` —Contains access to the standard input stream data.

- `standardOutput` —Contains access to the standard output stream data.

- `standardError` —Contains access to the standard error stream data.

#### Writing to the standard input stream

You can write data to the standard input stream using the write methods of the
`standardInput` property of the NativeProcess object. As the AIR application
writes data to the process, the NativeProcess object dispatches
`standardInputProgress` events.

If an error occurs in writing to the standard input stream, the NativeProcess
object dispatches an `ioErrorStandardInput` event.

You can close the input stream by calling the `closeInput()` method of the
NativeProcess object. When the input stream closes, the NativeProcess object
dispatches a `standardInputClose` event.

    var nativeProcessStartupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
    var file:File = File.applicationDirectory.resolvePath("test.exe");
    nativeProcessStartupInfo.executable = file;
    process = new NativeProcess();
    process.start(nativeProcessStartupInfo);
    process.standardInput.writeUTF("foo");
    if(process.running)
    {
    	process.closeInput();
    }

#### Reading from the standard output stream

You can read data from the standard output stream using the read methods of this
property. As the AIR application gets output stream data from the process, the
NativeProcess object dispatches `standardOutputData` events.

If an error occurs in writing to the standard output stream, the NativeProcess
object dispatches a `standardOutputError` event.

When process closes the output stream, the NativeProcess object dispatches a
`standardOutputClose` event.

When reading data from the standard input stream, be sure to read data as it is
generated. In other words, add an event listener for the `standardOutputData`
event. In the `standardOutputData` event listener, read the data from the
`standardOutput` property of the NativeProcess object. Do not simply wait for
the `standardOutputClose` event or the `exit` event to read all data. If you do
not read data as the native process generates the data, the buffer can fill up,
or data can be lost. A full buffer can cause the native process to stall when
trying to write more data. However, if you do not register an event listener for
the `standardOutputData` event, then the buffer will not fill and the process
will not stall. In this case, you will not have access to the data.

    var nativeProcessStartupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
    var file:File = File.applicationDirectory.resolvePath("test.exe");
    nativeProcessStartupInfo.executable = file;
    process = new NativeProcess();
    process.addEventListener(ProgressEvent.STANDARD_OUTPUT_DATA, dataHandler);
    process.start(nativeProcessStartupInfo);
    var bytes:ByteArray = new ByteArray();
    function dataHandler(event:ProgressEvent):void
    {
    	bytes.writeBytes(process.standardOutput.readBytes(process.standardOutput.bytesAvailable);
    }

#### Reading from the standard error stream

You can read data from the standard error stream using the read methods of this
property. As the AIR application reads error stream data from the process, the
NativeProcess object dispatches `standardErrorData` events.

If an error occurs in writing to the standard error stream, the NativeProcess
object dispatches an `standardErrorIoError` event.

When process closes the error stream, the NativeProcess object dispatches a
`standardErrorClose` event.

When reading data from the standard error stream, be sure to read data as it is
generated. In other words, add an event listener for the `standardErrorData`
event. In the `standardErrorData` event listener, read the data from the
`standardError` property of the NativeProcess object. Do not simply wait for the
`standardErrorClose` event or the `exit` event to read all data. If you do not
read data as the native process generates the data, the buffer can fill up, or
data can be lost. A full buffer can cause the native process to stall when
trying to write more data. However, if you do not register an event listener for
the `standardErrorData` event, then the buffer will not fill and the process
will not stall. In this case, you will not have access to the data.

    var nativeProcessStartupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
    var file:File = File.applicationDirectory.resolvePath("test.exe");
    nativeProcessStartupInfo.executable = file;
    process = new NativeProcess();
    process.addEventListener(ProgressEvent.STANDARD_ERROR_DATA, errorDataHandler);
    process.start(nativeProcessStartupInfo);
    var errorBytes:ByteArray = new ByteArray();
    function errorDataHandler(event:ProgressEvent):void
    {
    	bytes.writeBytes(process.standardError.readBytes(process.standardError.bytesAvailable);
    }

## Security considerations for native process communication

The native process API can run any executable on the user's system. Take extreme
care when constructing and executing commands. If any part of a command to be
executed originates from an external source, carefully validate that the command
is safe to execute. Likewise, your AIR application should validate any data
passed to a running process.

However, validating input can be difficult. To avoid such difficulties, it is
best to write a native application (such as an EXE file on Windows) that has
specific APIs. These APIs should process only those commands defined by the
application. For example, the application may accept only a limited set of
instructions via the standard input stream.

AIR on Windows does not allow you to run .bat files directly. The command
interpreter application (cmd.exe) executes Windows .bat files. When you invoke a
.bat file, this command application can interpret arguments passed to the
command as additional applications to launch. A malicious injection of extra
characters in the argument string could cause cmd.exe to execute a harmful or
insecure application. For example, without proper data validation, your AIR
application may call `myBat.bat myArguments c:/evil.exe`. The command
application would launch the evil.exe application in addition to running your
batch file.

More Help topics

![](../img/airLinkIndicator.png)
[Packaging an AIR application in a native installer](https://web.archive.org/web/20220523043246/https://help.adobe.com/en_US/air/build/WS789ea67d3e73a8b22388411123785d839c-8000.html)

![](../img/airLinkIndicator.png)
[Application profiles](https://web.archive.org/web/20220817165616/https://help.adobe.com/en_US/air/build/WS144092a96ffef7cc16ddeea2126bb46b82f-8000.html)

![](../img/flashplatformLinkIndicator.png)
[flash.filesystem.File.openWithDefaultApplication()](<https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/File.html#openWithDefaultApplication()>)

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.NativeProcess](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeProcess.html)
