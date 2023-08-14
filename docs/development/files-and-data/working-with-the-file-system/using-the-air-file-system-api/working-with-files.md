---
sidebar_position: 5
---

# Working with files

Using the AIR file API, you can add basic file interaction capabilities to your
applications. For example, you can read and write files, copy and delete files,
and so on. Since your applications can access the local file system, refer to
[AIR security](../../../security/air-security/index.md), if you haven't already
done so.

Note: You can associate a file type with an AIR application (so that
double-clicking it opens the application). For details, see
[Managing file associations](../../../client-system-interaction/working-with-air-runtime-and-operating-system-information.md#managing-file-associations).

## Getting file information

The File class includes the following properties that provide information about
a file or directory to which a File object points:

<table>
<thead>
    <tr>
        <th><p>File property</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>creationDate</p></td>
        <td><p>The creation date of the file on the local disk.</p></td>
    </tr>
    <tr>
        <td><p>creator</p></td>
        <td><p>Obsolete—use the <samp>extension</samp> property. (This property
        reports the Macintosh creator type of the file, which is only used in
        Mac OS versions prior to Mac OS X.)</p></td>
    </tr>
    <tr>
        <td><p>downloaded</p></td>
        <td><p>(AIR 2 and later) Indicates whether the referenced file or
        directory was downloaded (from the internet) or not. property is only
        meaningful on operating systems in which files can be flagged as
        downloaded:</p><ul class="incremental">
        <li><p>Windows XP service pack 2 and later, and on Windows
        Vista</p></li>
        <li><p>Mac OS 10.5 and later</p></li>
        </ul>
        </td>
    </tr>
    <tr>
        <td><p>exists</p></td>
        <td><p>Whether the referenced file or directory exists.</p></td>
    </tr>
    <tr>
        <td><p>extension</p></td>
        <td><p>The file extension, which is the part of the name following (and
        not including) the final dot ("."). If there is no dot in the filename,
        the extension is <samp>null</samp>.</p></td>
    </tr>
    <tr>
        <td><p>icon</p></td>
        <td><p>An Icon object containing the icons defined for the
        file.</p></td>
    </tr>
    <tr>
        <td><p>isDirectory</p></td>
        <td><p>Whether the File object reference is to a directory.</p></td>
    </tr>
    <tr>
        <td><p>modificationDate</p></td>
        <td><p>The date that the file or directory on the local disk was last
        modified.</p></td>
    </tr>
    <tr>
        <td><p>name</p></td>
        <td><p>The name of the file or directory (including the file extension,
        if there is one) on the local disk.</p></td>
    </tr>
    <tr>
        <td><p>nativePath</p></td>
        <td><p>The full path in the host operating system representation. See <a
        href="./working-with-file-objects-in-air#paths-of-file-objects">Paths of File
        objects</a>.</p></td>
    </tr>
    <tr>
        <td><p>parent</p></td>
        <td><p>The folder that contains the folder or file represented by the
        File object. This property is <samp>null</samp> if the File object
        references a file or directory in the root of the file system.</p></td>
    </tr>
    <tr>
        <td><p>size</p></td>
        <td><p>The size of the file on the local disk in bytes.</p></td>
    </tr>
    <tr>
        <td><p>type</p></td>
        <td><p>Obsolete—use the <samp>extension</samp> property. (On the
        Macintosh, this property is the four-character file type, which is only
        used in Mac OS versions prior to Mac OS X.)</p></td>
    </tr>
    <tr>
        <td><p>url</p></td>
        <td><p>The URL for the file or directory. See <a
        href="./working-with-file-objects-in-air#paths-of-file-objects">Paths of File
        objects</a>.</p></td>
    </tr>
</tbody>
</table>

For details on these properties, see the
[File](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/filesystem/File.html)
class listing in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

## Copying and moving files

The File class includes two methods for copying files or directories: `copyTo()`
and `copyToAsync()`. The File class includes two methods for moving files or
directories: `moveTo()` and `moveToAsync()`. The `copyTo()` and `moveTo()`
methods work synchronously, and the `copyToAsync()` and `moveToAsync()` methods
work asynchronously (see [AIR file basics](./air-file-basics.md)).

To copy or move a file, you set up two File objects. One points to the file to
copy or move, and it is the object that calls the copy or move method; the other
points to the destination (result) path.

The following copies a test.txt file from the AIR Test subdirectory of the
user's documents directory to a file named copy.txt in the same directory:

    var original:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
    var newFile:File = File.resolvePath("AIR Test/copy.txt");
    original.copyTo(newFile, true);

In this example, the value of `overwrite` parameter of the `copyTo()` method
(the second parameter) is set to `true`. By setting `overwrite` to `true`, an
existing target file is overwritten. This parameter is optional. If you set it
to `false` (the default value), the operation dispatches an IOErrorEvent event
if the target file exists (and the file is not copied).

The "Async" versions of the copy and move methods work asynchronously. Use the
`addEventListener()` method to monitor completion of the task or error
conditions, as in the following code:

    var original = File.documentsDirectory;
    original = original.resolvePath("AIR Test/test.txt");

    var destination:File = File.documentsDirectory;
    destination =  destination.resolvePath("AIR Test 2/copy.txt");

    original.addEventListener(Event.COMPLETE, fileMoveCompleteHandler);
    original.addEventListener(IOErrorEvent.IO_ERROR, fileMoveIOErrorEventHandler);
    original.moveToAsync(destination);

    function fileMoveCompleteHandler(event:Event):void {
    	trace(event.target); // [object File]
    }
    function fileMoveIOErrorEventHandler(event:IOErrorEvent):void {
    	trace("I/O Error.");
    }

The File class also includes the `File.moveToTrash()` and
`File.moveToTrashAsync()` methods, which move a file or directory to the system
trash.

## Deleting a file

The File class includes a `deleteFile()` method and a `deleteFileAsync()`
method. These methods delete files, the first working synchronously, the second
working asynchronously (see [AIR file basics](./air-file-basics.md)).

For example, the following code synchronously deletes the test.txt file in the
user's documents directory:

    var file:File = File.documentsDirectory.resolvePath("test.txt");
    file.deleteFile();

The following code asynchronously deletes the test.txt file of the user's
documents directory:

    var file:File = File.documentsDirectory.resolvePath("test.txt");
    file.addEventListener(Event.COMPLETE, completeHandler)
    file.deleteFileAsync();

    function completeHandler(event:Event):void {
    	trace("Deleted.")
    }

Also included are the `moveToTrash()` and `moveToTrashAsync` methods, which you
can use to move a file or directory to the System trash. For details, see
[Moving a file to the trash](#moving-a-file-to-the-trash).

## Moving a file to the trash

The File class includes a `moveToTrash()` method and a `moveToTrashAsync()`
method. These methods send a file or directory to the System trash, the first
working synchronously, the second working asynchronously (see
[AIR file basics](./air-file-basics.md)).

For example, the following code synchronously moves the test.txt file in the
user's documents directory to the System trash:

    var file:File = File.documentsDirectory.resolvePath("test.txt");
    file.moveToTrash();

Note: On operating systems that do not support the concept of a recoverable
trash folder, the files are removed immediately.

## Creating a temporary file

The File class includes a `createTempFile()` method, which creates a file in the
temporary directory folder for the System, as in the following example:

    var temp:File = File.createTempFile();

The `createTempFile()` method automatically creates a unique temporary file
(saving you the work of determining a new unique location).

You can use a temporary file to temporarily store information used in a session
of the application. Note that there is also a `createTempDirectory()` method,
for creating a unique temporary directory in the System temporary directory.

You may want to delete the temporary file before closing the application, as it
is _not_ automatically deleted on all devices.
