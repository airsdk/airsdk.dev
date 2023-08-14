---
sidebar_position: 6
---

# Data formats, and choosing the read and write methods to use

Every file is a set of bytes on a disk. In ActionScript, the data from a file
can always be represented as a ByteArray. For example, the following code reads
the data from a file into a ByteArray object named `bytes`:

    var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
    var myFileStream:FileStream = new FileStream();
    myFileStream.addEventListener(Event.COMPLETE, completeHandler);
    myFileStream.openAsync(myFile, FileMode.READ);
    var bytes:ByteArray = new ByteArray();

    function completeHandler(event:Event):void
    {
    	myFileStream.readBytes(bytes, 0, myFileStream.bytesAvailable);
    }

Similarly, the following code writes data from a ByteArray named `bytes` to a
file:

    var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
    var myFileStream:FileStream = new FileStream();
    myFileStream.open(myFile, FileMode.WRITE);
    myFileStream.writeBytes(bytes, 0, bytes.length);

However, often you do not want to store the data in an ActionScript ByteArray
object. And often the data file is in a specified file format.

For example, the data in the file may be in a text file format, and you may want
to represent such data in a String object.

For this reason, the FileStream class includes read and write methods for
reading and writing data to and from types other than ByteArray objects. For
example, the `readMultiByte()` method lets you read data from a file and store
it to a string, as in the following code:

    var myFile:File = File.documentsDirectory.resolvePath("AIR Test/test.txt");
    var myFileStream:FileStream = new FileStream();
    myFileStream.addEventListener(Event.COMPLETE, completed);
    myFileStream.openAsync(myFile, FileMode.READ);
    var str:String = "";

    function completeHandler(event:Event):void
    {
    	str = myFileStream.readMultiByte(myFileStream.bytesAvailable, "iso-8859-1");
    }

The second parameter of the `readMultiByte()` method specifies the text format
that ActionScript uses to interpret the data ("iso-8859-1" in the example).
Adobe AIR supports common character set encodings (see
[Supported character sets](https://airsdk.dev/reference/actionscript/3.0/charset-codes.html)).

The FileStream class also includes the `readUTFBytes()` method, which reads data
from the read buffer into a string using the UTF-8 character set. Since
characters in the UTF-8 character set are of variable length, do not use
`readUTFBytes()` in a method that responds to the `progress` event, since the
data at the end of the read buffer may represent an incomplete character. (This
is also true when using the `readMultiByte()` method with a variable-length
character encoding.) For this reason, read the entire set of data when the
FileStream object dispatches the `complete` event.

There are also similar write methods, `writeMultiByte()` and `writeUTFBytes()`,
for working with String objects and text files.

The `readUTF()` and the `writeUTF()` methods (not to be confused with
`readUTFBytes()` and `writeUTFBytes()`) also read and write the text data to a
file, but they assume that the text data is preceded by data specifying the
length of the text data, which is not a common practice in standard text files.

Some UTF-encoded text files begin with a "UTF-BOM" (byte order mark) character
that defines the endianness as well as the encoding format (such as UTF-16 or
UTF-32).

For an example of reading and writing to a text file, see
[Example: Reading an XML file into an XML object](../example-reading-an-xml-file-into-an-xml-object.md).

The `readObject()` and `writeObject()` are convenient ways to store and retrieve
data for complex ActionScript objects. The data is encoded in AMF (ActionScript
Message Format). Adobe AIR, Flash Player, Flash Media Server, and Flex Data
Services include APIs for working with data in this format.

There are some other read and write methods (such as `readDouble()` and
`writeDouble()`). However, if you use these, make sure that the file format
matches the formats of the data defined by these methods.

File formats are often more complex than simple text formats. For example, an
MP3 file includes compressed data that can only be interpreted with the
decompression and decoding algorithms specific to MP3 files. MP3 files also may
include ID3 tags that contain meta tag information about the file (such as the
title and artist for a song). There are multiple versions of the ID3 format, but
the simplest (ID3 version 1) is discussed in the
[Example: Reading and writing data with random access](../example-reading-and-writing-data-with-random-access.md)
section.

Other files formats (for images, databases, application documents, and so on)
have different structures, and to work with their data in ActionScript, you must
understand how the data is structured.
