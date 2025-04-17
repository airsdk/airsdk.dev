---
sidebar_position: 3
---

# The position property of a FileStream object

The `position` property of a FileStream object determines where data is read or
written on the next read or write method.

Before a read or write operation, set the `position` property to any valid
position in the file.

For example, the following code writes the string `"hello"` (in UTF encoding) at
position 8 in the file:

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.open(myFile, FileMode.UPDATE);
myFileStream.position = 8;
myFileStream.writeUTFBytes("hello");
```

When you first open a FileStream object, the `position` property is set to 0.

Before a read operation, the value of `position` must be at least 0 and less
than the number of bytes in the file (which are existing positions in the file).

The value of the `position` property is modified only in the following
conditions:

- When you explicitly set the `position` property.

- When you call a read method.

- When you call a write method.

When you call a read or write method of a FileStream object, the `position`
property is immediately incremented by the number of bytes that you read or
write. Depending on the read method you use, the `position` property is either
incremented by the number of bytes you specify to read or by the number of bytes
available. When you call a read or write method subsequently, it reads or writes
starting at the new position.

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.open(myFile, FileMode.UPDATE);
myFileStream.position = 4000;
trace(myFileStream.position); // 4000
myFileStream.writeBytes(myByteArray, 0, 200);
trace(myFileStream.position); // 4200
```

There is, however, one exception: for a FileStream opened in append mode, the
`position` property is not changed after a call to a write method. (In append
mode, data is always written to the end of the file, independent of the value of
the `position` property.)

For a file opened for asynchronous operations, the write operation does not
complete before the next line of code is executed. However, you can call
multiple asynchronous methods sequentially, and the runtime executes them in
order:

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.openAsync(myFile, FileMode.WRITE);
myFileStream.writeUTFBytes("hello");
myFileStream.writeUTFBytes("world");
myFileStream.addEventListener(Event.CLOSE, closeHandler);
myFileStream.close();
trace("started.");

closeHandler(event:Event):void
{
	trace("finished.");
}
```

The trace output for this code is the following:

```
started.
finished.
```

You _can_ specify the `position` value immediately after you call a read or
write method (or at any time), and the next read or write operation will take
place starting at that position. For example, note that the following code sets
the `position` property right after a call to the `writeBytes()` operation, and
the `position` is set to that value (300) even after the write operation
completes:

```
var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
var myFileStream:FileStream = new FileStream();
myFileStream.openAsync(myFile, FileMode.UPDATE);
myFileStream.position = 4000;
trace(myFileStream.position); // 4000
myFileStream.writeBytes(myByteArray, 0, 200);
myFileStream.position = 300;
trace(myFileStream.position); // 300
```
