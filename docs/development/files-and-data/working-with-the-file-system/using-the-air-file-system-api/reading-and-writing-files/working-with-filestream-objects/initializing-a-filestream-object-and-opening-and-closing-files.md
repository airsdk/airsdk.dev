---
sidebar_position: 2
---

# Initializing a FileStream object, and opening and closing files

When you open a FileStream object, you make it available to read and write data
to a file. You open a FileStream object by passing a File object to the `open()`
or `openAsync()` method of the FileStream object:

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.open(myFile, FileMode.READ);
```

The `fileMode` parameter (the second parameter of the `open()` and `openAsync()`
methods), specifies the mode in which to open the file: for read, write, append,
or update. For details, see the previous section,
[FileStream open modes](./filestream-open-modes.md).

If you use the `openAsync()` method to open the file for asynchronous file
operations, set up event listeners to handle the asynchronous events:

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.addEventListener(Event.COMPLETE, completeHandler);
myFileStream.addEventListener(ProgressEvent.PROGRESS, progressHandler);
myFileStream.addEventListener(IOErrorEvent.IO_Error, errorHandler);
myFileStream.openAsync(myFile, FileMode.READ);

function completeHandler(event:Event):void {
	// ...
}

function progressHandler(event:ProgressEvent):void {
	// ...
}

function errorHandler(event:IOErrorEvent):void {
	// ...
}
```

The file is opened for synchronous or asynchronous operations, depending upon
whether you use the `open()` or `openAsync()` method. For details, see
[AIR file basics](../../air-file-basics.md).

If you set the `fileMode` parameter to `FileMode.READ` or `FileMode.UPDATE` in
the open method of the FileStream object, data is read into the read buffer as
soon as you open the FileStream object. For details, see
[The read buffer and the bytesAvailable property of a FileStream object](./the-read-buffer-and-the-bytesavailable-property-of-a-filestream-object.md).

You can call the `close()` method of a FileStream object to close the associated
file, making it available for use by other applications.
