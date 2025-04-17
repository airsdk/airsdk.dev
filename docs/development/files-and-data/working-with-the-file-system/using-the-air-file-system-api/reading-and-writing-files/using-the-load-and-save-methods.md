---
sidebar_position: 3
---

# Using the load() and save() methods

Flash Player 10 added the `load()` and `save()` methods to the FileReference
class. These methods are also in AIR 1.5, and the File class inherits the
methods from the FileReference class. These methods were designed to provide a
secure means for users to load and save file data in Flash Player. However, AIR
applications can also use these methods as an easy way to load and save files
asynchronously.

For example, the following code saves a string to a text file:

```
var file:File = File.applicationStorageDirectory.resolvePath("test.txt");
var str:String = "Hello.";
file.addEventListener(Event.COMPLETE, fileSaved);
file.save(str);
function fileSaved(event:Event):void
{
	trace("Done.");
}
```

The `data` parameter of the `save()` method can take a String, XML, or ByteArray
value. When the argument is a String or XML value, the method saves the file as
a UTF-8–encoded text file.

When this code sample executes, the application displays a dialog box in which
the user selects the saved file destination.

The following code loads a string from a UTF-8–encoded text file:

```
var file:File = File.applicationStorageDirectory.resolvePath("test.txt");
file.addEventListener(Event.COMPLETE, loaded);
file.load();
var str:String;
function loaded(event:Event):void
{
	var bytes:ByteArray = file.data;
	str = bytes.readUTFBytes(bytes.length);
	trace(str);
}
```

The FileStream class provides more functionality than that provided by the
`load()` and `save()` methods:

- Using the FileStream class, you can read and write data both synchronously and
  asynchronously.

- Using the FileStream class lets you write incrementally to a file.

- Using the FileStream class lets you open a file for random access (both
  reading from and writing to any section of the file).

- The FileStream class lets you specify the type of file access you have to the
  file, by setting the `fileMode` parameter of the `open()` or `openAsync()`
  method.

- The FileStream class lets you save data to files without presenting the user
  with an Open or Save dialog box.

- You can directly use types other than byte arrays when reading data with the
  FileStream class.
