---
sidebar_position: 2
---

# ByteArray example: Reading a .zip file

This example demonstrates how to read a simple .zip file containing several
files of different types. It does so by extracting relevant data from the
metadata for each file, uncompressing each file into a ByteArray and writing the
file to the desktop.

The general structure of a .zip file is based on the specification by PKWARE
Inc., which is maintained at
http://www.pkware.com/documents/casestudies/APPNOTE.TXT. First is a file
header and file data for the first file in the .zip archive, followed by a file
header and file data pair for each additional file. (The structure of the file
header is described later.) Next, the .zip file optionally includes a data
descriptor record (usually when the output zip file was created in memory rather
than saved to a disk). Next are several additional optional elements: archive
decryption header, archive extra data record, central directory structure, Zip64
end of central directory record, Zip64 end of central directory locator, and end
of central directory record.

The code in this example is written to only parse zip files that do not contain
folders and it does not expect data descriptor records. It ignores all
information following the last file data.

The format of the file header for each file is as follows:

|                          |                                     |
| ------------------------ | ----------------------------------- |
| file header signature    | 4 bytes                             |
| required version         | 2 bytes                             |
| general-purpose bit flag | 2 bytes                             |
| compression method       | 2 bytes (8=DEFLATE; 0=UNCOMPRESSED) |
| last modified file time  | 2 bytes                             |
| last modified file date  | 2 bytes                             |
| crc-32                   | 4 bytes                             |
| compressed size          | 4 bytes                             |
| uncompressed size        | 4 bytes                             |
| file name length         | 2 bytes                             |
| extra field length       | 2 bytes                             |
| file name                | variable                            |
| extra field              | variable                            |

Following the file header is the actual file data, which can be either
compressed or uncompressed, depending on the compression method flag. The flag
is 0 (zero) if the file data is uncompressed, 8 if the data is compressed using
the DEFLATE algorithm, or another value for other compression algorithms.

The user interface for this example consists of a label and a text area (
`taFiles`). The application writes the following information to the text area
for each file it encounters in the .zip file: the file name, the compressed
size, and the uncompressed size. The following MXML document defines the user
interface for the Flex version of the application:

```
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" layout="vertical" creationComplete="init();">
	<mx:Script>
	<![CDATA[
		// The application code goes here
	]]>
	</mx:Script>
	<mx:Form>
		<mx:FormItem label="Output">
			<mx:TextArea id="taFiles" width="320" height="150"/>
		</mx:FormItem>
	</mx:Form>
</mx:WindowedApplication>
```

The beginning of the program performs the following tasks:

- Imports the required classes

      import flash.filesystem.*;
      import flash.utils.ByteArray;
      import flash.events.Event;

- Defines the user interface for Flash

      import fl.controls.*;

      //requires TextArea and Label components in the Library
      var taFiles = new TextArea();
      var output = new Label();
      taFiles.setSize(320, 150);
      taFiles.move(10, 30);
      output.move(10, 10);
      output.width = 150;
      output.text = "Contents of HelloAir.zip";
      addChild(taFiles);
      addChild(output);

- Defines the `bytes` ByteArray

      var bytes:ByteArray = new ByteArray();

- Defines variables to store metadata from the file header

      // variables for reading fixed portion of file header
      var fileName:String = new String();
      var flNameLength:uint;
      var xfldLength:uint;
      var offset:uint;
      var compSize:uint;
      var uncompSize:uint;
      var compMethod:int;
      var signature:int;

- Defines File ( `zfile`) and FileStream ( `zStream`) objects to represent the
  .zip file, and specifies the location of the .zip file from which the files
  are extracted—a file named "HelloAIR.zip" in the desktop directory.

      // File variables for accessing .zip file
      var zfile:File = File.desktopDirectory.resolvePath("HelloAIR.zip");
      var zStream:FileStream = new FileStream();

In Flex, the program code starts in the `init()` method, which is called as the
`creationComplete` handler for the root `mx:WindowedApplication` tag.

```
// for Flex
private function init():void
{
```

The program begins by opening the .zip file in READ mode.

```
zStream.open(zfile, FileMode.READ);
```

It then sets the `endian` property of `bytes` to `LITTLE_ENDIAN` to indicate
that the byte order of numeric fields has the least significant byte first.

```
bytes.endian = Endian.LITTLE_ENDIAN;
```

Next, a `while()` statement begins a loop that continues until the current
position in the file stream is greater than or equal to the size of the file.

```
while (zStream.position < zfile.size)
{
```

The first statement inside the loop reads the first 30 bytes of the file stream
into the ByteArray `bytes`. The first 30 bytes make up the fixed-size part of
the first file header.

```
// read fixed metadata portion of local file header

zStream.readBytes(bytes, 0, 30);
```

Next, the code reads an integer ( `signature`) from the first bytes of the
30-byte header. The ZIP format definition specifies that the signature for every
file header is the hexadecimal value `0x04034b50` ; if the signature is
different it means that the code has moved beyond the file portion of the .zip
file and there are no more files to extract. In that case the code exits the
`while` loop immediately rather than waiting for the end of the byte array.

```
bytes.position = 0;

signature = bytes.readInt();
// if no longer reading data files, quit
if (signature != 0x04034b50)
{
    break;
}
```

The next part of the code reads the header byte at offset position 8 and stores
the value in the variable `compMethod`. This byte contains a value indicating
the compression method that was used to compress this file. Several compression
methods are allowed, but in practice nearly all .zip files use the DEFLATE
compression algorithm. If the current file is compressed with DEFLATE
compression, `compMethod` is 8; if the file is uncompressed, `compMethod` is 0.

```
bytes.position = 8;

compMethod = bytes.readByte();  // store compression method (8 == Deflate)
```

Following the first 30 bytes is a variable-length portion of the header that
contains the file name and, possibly, an extra field. The variable `offset`
stores the size of this portion. The size is calculated by adding the file name
length and extra field length, read from the header at offsets 26 and 28.

```
offset = 0;    // stores length of variable portion of metadata

bytes.position = 26;  // offset to file name length
flNameLength = bytes.readShort();    // store file name
offset += flNameLength;     // add length of file name
bytes.position = 28;    // offset to extra field length
xfldLength = bytes.readShort();
offset += xfldLength;    // add length of extra field
```

Next the program reads the variable-length portion of the file header for the
number of bytes stored in the `offset` variable.

```
// read variable length bytes between fixed-length header and compressed file data

zStream.readBytes(bytes, 30, offset);
```

The program reads the file name from the variable length portion of the header
and displays it in the text area along with the compressed (zipped) and
uncompressed (original) sizes of the file.

```
// Flash version

bytes.position = 30;
fileName = bytes.readUTFBytes(flNameLength); // read file name
taFiles.appendText(fileName + "\n"); // write file name to text area
bytes.position = 18;
compSize = bytes.readUnsignedInt();  // store size of compressed portion
taFiles.appendText("\tCompressed size is: " + compSize + '\n');
bytes.position = 22;  // offset to uncompressed size
uncompSize = bytes.readUnsignedInt();  // store uncompressed size
taFiles.appendText("\tUncompressed size is: " + uncompSize + '\n');
```


```
// Flex version

bytes.position = 30;
fileName = bytes.readUTFBytes(flNameLength); // read file name
taFiles.text += fileName + "\n"; // write file name to text area
bytes.position = 18;
compSize = bytes.readUnsignedInt();  // store size of compressed portion
taFiles.text += "\tCompressed size is: " + compSize + '\n';
bytes.position = 22;  // offset to uncompressed size
uncompSize = bytes.readUnsignedInt();  // store uncompressed size
taFiles.text += "\tUncompressed size is: " + uncompSize + '\n';
```

The example reads the rest of the file from the file stream into `bytes` for the
length specified by the compressed size, overwriting the file header in the
first 30 bytes. The compressed size is accurate even if the file is not
compressed because in that case the compressed size is equal to the uncompressed
size of the file.

```
// read compressed file to offset 0 of bytes; for uncompressed files
// the compressed and uncompressed size is the same
if (compSize == 0) continue;
zStream.readBytes(bytes, 0, compSize);
```

Next, the example uncompresses the compressed file and calls the `outfile()`
function to write it to the output file stream. It passes `outfile()` the file
name and the byte array containing the file data.

```
if (compMethod == 8) // if file is compressed, uncompress

{
    bytes.uncompress(CompressionAlgorithm.DEFLATE);
}
outFile(fileName, bytes);   // call outFile() to write out the file
```

In the previously mentioned example,
`bytes.uncompress(CompressionAlgorithm.DEFLATE)` will work only in AIR
applications. To get deflated data uncompressed for both AIR and Flash Player,
invoke ByteArray's `inflate()` function.

The closing braces indicate the end of the `while` loop, and of the `init()`
method and the Flex application code, except for the `outFile()` method.
Execution loops back to the beginning of the `while` loop and continues
processing the next bytes in the .zip file—either extracting another file or
ending processing of the .zip file if the last file has been processed.

```
        } // end of while loop
} // for Flex version, end of init() method and application
```

The `outfile()` function opens an output file in WRITE mode on the desktop,
giving it the name supplied by the `filename` parameter. It then writes the file
data from the `data` parameter to the output file stream ( `outStream`) and
closes the file.

```
// Flash version
function outFile(fileName:String, data:ByteArray):void
{
	var outFile:File = File.desktopDirectory; // destination folder is desktop
	outFile = outFile.resolvePath(fileName);  // name of file to write
	var outStream:FileStream = new FileStream();
	// open output file stream in WRITE mode
	outStream.open(outFile, FileMode.WRITE);
	// write out the file
	outStream.writeBytes(data, 0, data.length);
	// close it
	outStream.close();
}

private function outFile(fileName:String, data:ByteArray):void
{
	var outFile:File = File.desktopDirectory; // dest folder is desktop
	outFile = outFile.resolvePath(fileName);  // name of file to write
	var outStream:FileStream = new FileStream();
	// open output file stream in WRITE mode
	outStream.open(outFile, FileMode.WRITE);
	// write out the file
	outStream.writeBytes(data, 0, data.length);
	// close it
	outStream.close();
}
```
