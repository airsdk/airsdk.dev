---
sidebar_position: 1
---

# AIR file basics

For a quick explanation and code examples of working with the file system in
AIR, see the following quick start articles on the Adobe Developer Connection:

- [Building a text-file editor](https://web.archive.org/web/20090130011935/http://www.adobe.com/devnet/air/flash/quickstart/building_text_editor.html)
  (Flash)

- [Building a text-file editor](https://web.archive.org/web/20100817082125/http://www.adobe.com/devnet/air/flex/quickstart/building_text_editor.html)
  (Flex)

- [Building a directory search application](https://web.archive.org/web/20150508062101/http://www.adobe.com/devnet/air/flex/quickstart/articles/directory_search.html)
  (Flex)

- [Reading and writing from an XML preferences file](https://web.archive.org/web/20170319130306/http://www.adobe.com/devnet/air/flex/quickstart/articles/xml_prefs.html)
  (Flex)

- [Compressing files and data](https://web.archive.org/web/20150508064627/http://www.adobe.com/devnet/air/flex/quickstart/articles/compressing_files.html)
  (Flex)

Adobe AIR provides classes that you can use to access, create, and manage both
files and folders. These classes, contained in the flash.filesystem package, are
used as follows:

| File classes                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [File](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/File.html)             | File object represents a path to a file or directory. You use a file object to create a pointer to a file or folder, initiating interaction with the file or folder.                                                                                                                                                                       |
| [FileMode](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/FileMode.html)     | The FileMode class defines string constants used in the `fileMode` parameter of the `open()` and `openAsync()` methods of the FileStream class. The `fileMode` parameter of these methods determines the capabilities available to the FileStream object once the file is opened, which include writing, reading, appending, and updating. |
| [FileStream](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/FileStream.html) | FileStream object is used to open files for reading and writing. Once you've created a File object that points to a new or existing file, you pass that pointer to the FileStream object so that you can open it and read or write data.                                                                                                   |

Some methods in the File class have both synchronous and asynchronous versions:

- `File.copyTo()` and `File.copyToAsync()`

- `File.deleteDirectory()` and `File.deleteDirectoryAsync()`

- `File.deleteFile()` and `File.deleteFileAsync()`

- `File.getDirectoryListing()` and `File.getDirectoryListingAsync()`

- `File.moveTo()` and `File.moveToAsync()`

- `File.moveToTrash()` and `File.moveToTrashAsync()`

Also, FileStream operations work synchronously or asynchronously depending on
how the FileStream object opens the file: by calling the `open()` method or by
calling the `openAsync()` method.

The asynchronous versions let you initiate processes that run in the background
and dispatch events when complete (or when error events occur). Other code can
execute while these asynchronous background processes are taking place. With
asynchronous versions of the operations, you must set up event listener
functions, using the `addEventListener()` method of the File or FileStream
object that calls the function.

The synchronous versions let you write simpler code that does not rely on
setting up event listeners. However, since other code cannot execute while a
synchronous method is executing, important processes such as display object
rendering and animation can be delayed.
