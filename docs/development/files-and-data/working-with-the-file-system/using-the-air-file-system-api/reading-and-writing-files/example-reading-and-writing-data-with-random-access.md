---
sidebar_position: 5
---

# Example: Reading and writing data with random access

MP3 files can include ID3 tags, which are sections at the beginning or end of
the file that contain meta data identifying the recording. The ID3 tag format
itself has different revisions. This example describes how to read and write
from an MP3 file that contains the simplest ID3 format (ID3 version 1.0) using
"random access to file data", which means that it reads from and writes to
arbitrary locations in the file.

An MP3 file that contains an ID3 version 1 tag includes the ID3 data at the end
of the file, in the final 128 bytes.

When accessing a file for random read/write access, it is important to specify
`FileMode.UPDATE` as the `fileMode` parameter for the `open()` or `openAsync()`
method:

```
var file:File = File.documentsDirectory.resolvePath("My Music/Sample ID3 v1.mp3");
var fileStr:FileStream = new FileStream();
fileStr.open(file, FileMode.UPDATE);
```

This lets you both read and write to the file.

Upon opening the file, you can set the `position` pointer to the position 128
bytes before the end of the file:

```
fileStr.position = file.size - 128;
```

This code sets the `position` property to this location in the file because the
ID3 v1.0 format specifies that the ID3 tag data is stored in the last 128 bytes
of the file. The specification also says the following:

- The first 3 bytes of the tag contain the string `"TAG"`.

- The next 30 characters contain the title for the MP3 track, as a string.

- The next 30 characters contain the name of the artist, as a string.

- The next 30 characters contain the name of the album, as a string.

- The next 4 characters contain the year, as a string.

- The next 30 characters contain the comment, as a string.

- The next byte contains a code indicating the track's genre.

- All text data is in ISO 8859-1 format.

The `id3TagRead()` method checks the data after it is read in (upon the
`complete` event):

```
function id3TagRead():void
{
	if (fileStr.readMultiByte(3, "iso-8859-1").match(/tag/i))
	{
		var id3Title:String = fileStr.readMultiByte(30, "iso-8859-1");
		var id3Artist:String = fileStr.readMultiByte(30, "iso-8859-1");
		var id3Album:String = fileStr.readMultiByte(30, "iso-8859-1");
		var id3Year:String = fileStr.readMultiByte(4, "iso-8859-1");
		var id3Comment:String = fileStr.readMultiByte(30, "iso-8859-1");
		var id3GenreCode:String =  fileStr.readByte().toString(10);
	}
}
```

You can also perform a random-access write to the file. For example, you could
parse the `id3Title` variable to ensure that it is correctly capitalized (using
methods of the String class), and then write a modified string, called
`newTitle`, to the file, as in the following:

```
fileStr.position = file.length - 125;    // 128 - 3
fileStr.writeMultiByte(newTitle, "iso-8859-1");
```

To conform with the ID3 version 1 standard, the length of the `newTitle` string
should be 30 characters, padded at the end with the character code 0 (
`String.fromCharCode(0)`).
