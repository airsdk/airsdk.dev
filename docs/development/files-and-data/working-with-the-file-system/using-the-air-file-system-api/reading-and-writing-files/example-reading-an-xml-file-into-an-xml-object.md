---
sidebar_position: 4
---

# Example: Reading an XML file into an XML object

The following examples demonstrate how to read and write to a text file that
contains XML data.

To read from the file, initialize the File and FileStream objects, call the
`readUTFBytes()` method of the FileStream and convert the string to an XML
object:

```
var file:File = File.documentsDirectory.resolvePath("AIR Test/preferences.xml");
var fileStream:FileStream = new FileStream();
fileStream.open(file, FileMode.READ);
var prefsXML:XML = XML(fileStream.readUTFBytes(fileStream.bytesAvailable));
fileStream.close();
```

Similarly, writing the data to the file is as easy as setting up appropriate
File and FileStream objects, and then calling a write method of the FileStream
object. Pass the string version of the XML data to the write method as in the
following code:

```
var prefsXML:XML = <prefs><autoSave>true</autoSave></prefs>;
var file:File = File.documentsDirectory.resolvePath("AIR Test/preferences.xml");
fileStream = new FileStream();
fileStream.open(file, FileMode.WRITE);

var outputString:String = '<?xml version="1.0" encoding="utf-8"?>\n';
outputString += prefsXML.toXMLString();

fileStream.writeUTFBytes(outputString);
fileStream.close();
```

These examples use the `readUTFBytes()` and `writeUTFBytes()` methods, because
they assume that the files are in UTF-8 format. If not, you may need to use a
different method (see
[Data formats, and choosing the read and write methods to use](./working-with-filestream-objects/data-formats-and-choosing-the-read-and-write-methods-to-use.md)).

The previous examples use FileStream objects opened for synchronous operation.
You can also open files for asynchronous operations (which rely on event
listener functions to respond to events). For example, the following code shows
how to read an XML file asynchronously:

```
var file:File = File.documentsDirectory.resolvePath("AIR Test/preferences.xml");
var fileStream:FileStream = new FileStream();
fileStream.addEventListener(Event.COMPLETE, processXMLData);
fileStream.openAsync(file, FileMode.READ);
var prefsXML:XML;

function processXMLData(event:Event):void
{
	prefsXML = XML(fileStream.readUTFBytes(fileStream.bytesAvailable));
	fileStream.close();
}
```

The `processXMLData()` method is invoked when the entire file is read into the
read buffer (when the FileStream object dispatches the `complete` event). It
calls the `readUTFBytes()` method to get a string version of the read data, and
it creates an XML object, `prefsXML`, based on that string.

To see a sample application that shows these capabilities, see
[Reading and writing from an XML preferences file](https://web.archive.org/web/20170319130306/http://www.adobe.com/devnet/air/flex/quickstart/articles/xml_prefs.html).
