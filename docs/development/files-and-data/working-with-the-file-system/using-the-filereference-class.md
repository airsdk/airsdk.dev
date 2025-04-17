---
sidebar_position: 1
---

# Using the FileReference class

A FileReference object represents a data file on a client or server machine. The
methods of the FileReference class let your application load and save data files
locally, and transfer file data to and from remote servers.

The FileReference class offers two different approaches to loading,
transferring, and saving data files. Since its introduction, the FileReference
class has includedthe `browse()` method, the `upload()` method, and the
`download()` method. Use the `browse()` method to let the user select a file.
Use the `upload()` method to transfer the file data to a remote server. Use the
`download()` method to retrieve that data from the server and save it in a local
file. Starting with Flash Player 10 and Adobe AIR 1.5, the FileReference class
includes the `load()` and `save()` methods. The `load()` and `save()` methods
allow you to access and save local files directly as well. The use of those
methods is similar to the equivalent-named methods in the URLLoader and Loader
classes.

Note: The File class, which extends the FileReference class, and the FileStream
class provide additional functions for working with files and the local file
system. The File and FileStream classes are only supported in AIR and not in the
Flash Player.

## FileReference class

Each FileReference object represents a single data file on the local machine.
The properties of the FileReference class contain information about the file's
size, type, name, filename extension, creator, creation date, and modification
date.

Note: The `creator` property is supported on Mac OS only. All other platforms
return `null`.

Note: The `extension` property is only supported in Adobe AIR.

You can create an instance of the FileReference class one of two ways:

- Use the `new` operator, as shown in the following code: import
  flash.net.FileReference; var fileRef:FileReference = new FileReference();

- Call the `FileReferenceList.browse()` method, which opens a dialog box and
  prompts the user to select one or more files to upload. It then creates an
  array of FileReference objects if the user successfully selects one or more
  files.

Once you have created a FileReference object, you can do the following:

- Call the `FileReference.browse()` method, which opens a dialog box and prompts
  the user to select a single file from the local file system. This is usually
  done before a subsequent call to the `FileReference.upload()` method or
  `FileReference.load()` method. Call the `FileReference.upload()` method to
  upload the file to a remote server. Call to the `FileReference.load()` method
  to open a local file.

- Call the `FileReference.download()` method. The `download()` method opens a
  dialog box to let the user select a location for saving a new file. Then it
  downloads data from the server and stores it in the new file.

- Call the `FileReference.load()` method. This method begins loading data from a
  file selected previously using the `browse()` method. The `load()` method
  can't be called until the `browse()` operation completes (the user selects a
  file).

- Call the `FileReference.save()` method. This method opens a dialog box and
  prompts the user to choose a single file location on the local file system. It
  then saves data to the specified location.

Note: You can only perform one `browse()`, `download()`, or `save()` action at a
time, because only one dialog box can be open at any point.

The FileReference object properties such as `name`, `size`, or
`modificationDate` are not defined until one of the following happens:

- The `FileReference.browse()` method or `FileReferenceList.browse()` method has
  been called, and the user has selected a file using the dialog box.

- The `FileReference.download()` method has been called, and the user has
  specified a new file location using the dialog box.

Note: When performing a download, only the `FileReference.name` property is
populated before the download is complete. After the file has been downloaded,
all properties are available.

While calls to the `FileReference.browse()`, `FileReferenceList.browse()`,
`FileReference.download()`, `FileReference.load()`, or `FileReference.save()`
methods are executing, most players continue SWF file playback including
dispatching events and executing code.

For uploading and downloading operations, a SWF file can access files only
within its own domain, including any domains specified by a policy file. You
need to put a policy file on the server containing the file if that server is
not in the same domain as the SWF file initiating the upload or download.

See
[FileReference](https://airsdk.dev/reference/actionscript/3.0/flash/net/FileReference.html).

## Loading data from files

The `FileReference.load()` method lets you load data from a local file into
memory.

Note: Your code must first call the `FileReference.browse()` method to let the
user select a file to load. This restriction does not apply to content running
in Adobe AIR in the application security sandbox

The `FileReference.load()` method returns immediately after being called, but
the data being loaded isn't available immediately. The FileReference object
dispatches events to invoke listener methods at each step of the loading
process.

The FileReference object dispatches the following events during the loading
process.

- `open` event ( `Event.OPEN`): Dispatched when the load operation starts.

- `progress` event ( `ProgressEvent.PROGRESS`): Dispatched periodically as bytes
  of data are read from the file.

- `complete` event ( `Event.COMPLETE`): Dispatched when the load operation
  completes successfully.

- `ioError` event ( `IOErrorEvent.IO_ERROR`): Dispatched if the load process
  fails because an input/output error occurs while opening or reading data from
  the file.

Once the FileReference object dispatches the complete event, the loaded data can
be accessed as a ByteArray in the FileReference object's `data` property.

The following example shows how to prompt the user to select a file and then
load the data from that file into memory:

```
package
{
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;

	public class FileReferenceExample1 extends Sprite
	{
		private var fileRef:FileReference;
		public function FileReferenceExample1()
		{
			fileRef = new FileReference();
			fileRef.addEventListener(Event.SELECT, onFileSelected);
			fileRef.addEventListener(Event.CANCEL, onCancel);
			fileRef.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
			fileRef.addEventListener(SecurityErrorEvent.SECURITY_ERROR,
						onSecurityError);
			var textTypeFilter:FileFilter = new FileFilter("Text Files (*.txt, *.rtf)",
						"*.txt;*.rtf");
			fileRef.browse([textTypeFilter]);
		}
		public function onFileSelected(evt:Event):void
		{
			fileRef.addEventListener(ProgressEvent.PROGRESS, onProgress);
			fileRef.addEventListener(Event.COMPLETE, onComplete);
			fileRef.load();
		}

		public function onProgress(evt:ProgressEvent):void
		{
			trace("Loaded " + evt.bytesLoaded + " of " + evt.bytesTotal + " bytes.");
		}

		public function onComplete(evt:Event):void
		{
			trace("File was successfully loaded.");
			trace(fileRef.data);
		}

		public function onCancel(evt:Event):void
		{
			trace("The browse request was canceled by the user.");
		}

		public function onIOError(evt:IOErrorEvent):void
		{
			trace("There was an IO Error.");
		}
		public function onSecurityError(evt:Event):void
		{
			trace("There was a security error.");
		}
	}
}
```

The example code first creates the FileReference object named `fileRef` and then
calls its `browse()` method. The `browse()` method opens a dialog box that
prompts the user to select a file. When a file is selected, the code invokes the
`onFileSelected()` method. This method adds listeners for the `progress` and
`complete` events and then calls the FileReference object's `load()` method. The
other handler methods in the example simply output messages to report on the
progress of the load operation. When the loading completes, the application
displays the contents of the loaded file using the `trace()` method.

In Adobe AIR, the FileStream class provides additional functionality for reading
data from a local file. See
[Reading and writing files](./using-the-air-file-system-api/reading-and-writing-files/index.md).

## Saving data to local files

The `FileReference.save()` method lets you save data to a local file. It starts
by opening a dialog box to let the user enter a new filename and location to
which to save a file. After the user selects the filename and location, the data
is written to the new file. When the file is saved successfully, the properties
of the FileReference object are populated with the properties of the local file.

Note: Your code can only call the `FileReference.save()` method in response to a
user-initiated event such as a mouse click or a keypress event. Otherwise an
error is thrown. This restriction does not apply to content running in Adobe AIR
in the application security sandbox.

The `FileReference.save()` method returns immediately after being called. The
FileReference object then dispatches events to call listener methods at each
step of the file saving process.

The FileReference object dispatches the following events during the file saving
process:

- `select` event ( `Event.SELECT`): Dispatched when the user specifies the
  location and file name for the new file to be saved.

- `cancel` event ( `Event.CANCEL`): Dispatched when the user click the Cancel
  button in the dialog box.

- `open` event ( `Event.OPEN`): Dispatched when the save operation starts.

- `progress` event ( `ProgressEvent.PROGRESS`): Dispatched periodically as bytes
  of data are saved to the file.

- `complete` event ( `Event.COMPLETE`): Dispatched when the save operation
  completes successfully.

- `ioError` event ( `IOErrorEvent.IO_ERROR`): Dispatched if the saving process
  fails because an input/output error occurs while attempting to save data to
  the file.

The type of object passed in the `data` parameter of the `FileReference.save()`
method determines how the data is written to the file:

- If it is a String value, then it is saved as a text file using UTF-8 encoding.

- If it is an XML object, then it is written to a file in XML format with all
  formatting preserved.

- If it is a ByteArray object, then its contents are written directly to the
  file with no conversion.

- If it is some other object, then the `FileReference.save()` method calls the
  object's `toString()` method and then saves the resulting String value to a
  UTF-8 text file. If the object's `toString()` method can't be called, then an
  error is thrown.

If the value of the `data` parameter is `null`, then an error is thrown.

The following code extends the previous example for the `FileReference.load()`
method. After reading the data from the file, this example prompts the user for
a filename and then saves the data in a new file:

```
package
{
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;

	public class FileReferenceExample2 extends Sprite
	{
		private var fileRef:FileReference;
		public function FileReferenceExample2()
		{
			fileRef = new FileReference();
			fileRef.addEventListener(Event.SELECT, onFileSelected);
			fileRef.addEventListener(Event.CANCEL, onCancel);
			fileRef.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
			fileRef.addEventListener(SecurityErrorEvent.SECURITY_ERROR,
						onSecurityError);
			var textTypeFilter:FileFilter = new FileFilter("Text Files (*.txt, *.rtf)",
						"*.txt;*.rtf");
			fileRef.browse([textTypeFilter]);
		}
		public function onFileSelected(evt:Event):void
		{
			fileRef.addEventListener(ProgressEvent.PROGRESS, onProgress);
			fileRef.addEventListener(Event.COMPLETE, onComplete);
			fileRef.load();
		}

		public function onProgress(evt:ProgressEvent):void
		{
			trace("Loaded " + evt.bytesLoaded + " of " + evt.bytesTotal + " bytes.");
		}
		public function onCancel(evt:Event):void
		{
			trace("The browse request was canceled by the user.");
		}
		public function onComplete(evt:Event):void
		{
			trace("File was successfully loaded.");
			fileRef.removeEventListener(Event.SELECT, onFileSelected);
			fileRef.removeEventListener(ProgressEvent.PROGRESS, onProgress);
			fileRef.removeEventListener(Event.COMPLETE, onComplete);
			fileRef.removeEventListener(Event.CANCEL, onCancel);
			saveFile();
		}
		public function saveFile():void
		{
			fileRef.addEventListener(Event.SELECT, onSaveFileSelected);
			fileRef.save(fileRef.data,"NewFileName.txt");
		}

		public function onSaveFileSelected(evt:Event):void
		{
			fileRef.addEventListener(ProgressEvent.PROGRESS, onSaveProgress);
			fileRef.addEventListener(Event.COMPLETE, onSaveComplete);
			fileRef.addEventListener(Event.CANCEL, onSaveCancel);
		}

		public function onSaveProgress(evt:ProgressEvent):void
		{
			trace("Saved " + evt.bytesLoaded + " of " + evt.bytesTotal + " bytes.");
		}

		public function onSaveComplete(evt:Event):void
		{
			trace("File saved.");
			fileRef.removeEventListener(Event.SELECT, onSaveFileSelected);
			fileRef.removeEventListener(ProgressEvent.PROGRESS, onSaveProgress);
			fileRef.removeEventListener(Event.COMPLETE, onSaveComplete);
			fileRef.removeEventListener(Event.CANCEL, onSaveCancel);
		}

		public function onSaveCancel(evt:Event):void
		{
			trace("The save request was canceled by the user.");
		}

		public function onIOError(evt:IOErrorEvent):void
		{
			trace("There was an IO Error.");
		}
		public function onSecurityError(evt:Event):void
		{
			trace("There was a security error.");
		}
	}
}
```

When all of the data loads from the file, the code calls the `onComplete()`
method. The `onComplete()` method removes the listeners for the loading events
and then calls the `saveFile()` method. The `saveFile()` method calls the
`FileReference.save()` method. The `FileReference.save()` method opens a new
dialog box to let the user enter a new filename and location to save the file.
The remaining event listener methods trace the progress of the file saving
process until it is complete.

In Adobe AIR, the FileStream class provides additional functionality for writing
data to a local file. See
[Reading and writing files](./using-the-air-file-system-api/reading-and-writing-files/index.md).

## Uploading files to a server

To upload files to a server, first call the `browse()` method to allow a user to
select one or more files. Next, when the `FileReference.upload()` method is
called, the selected file is transferred to the server. If the user selects
multiple files using the `FileReferenceList.browse()` method, Flash Player
creates an array of selected files called `FileReferenceList.fileList`. You can
then use the `FileReference.upload()` method to upload each file individually.

Note: Using the `FileReference.browse()` method allows you to upload single
files only. To allow a user to upload multiple files, use the
`FileReferenceList.browse()` method.

By default, the system file picker dialog box allows users to pick any file type
from the local computer. Developers can specify one or more custom file type
filters by using the FileFilter class and passing an array of file filter
instances to the `browse()` method:

```
var imageTypes:FileFilter = new FileFilter("Images (*.jpg, *.jpeg, *.gif, *.png)", "*.jpg; *.jpeg; *.gif; *.png");
var textTypes:FileFilter = new FileFilter("Text Files (*.txt, *.rtf)", "*.txt; *.rtf");
var allTypes:Array = new Array(imageTypes, textTypes);
var fileRef:FileReference = new FileReference();
fileRef.browse(allTypes);
```

When the user has selected the files and clicked the Open button in the system
file picker, the `Event.SELECT` event is dispatched. If the
`FileReference.browse()` method is used to select a file to upload, the
following code sends the file to a web server:

```
var fileRef:FileReference = new FileReference();
fileRef.addEventListener(Event.SELECT, selectHandler);
fileRef.addEventListener(Event.COMPLETE, completeHandler);
try
{
	var success:Boolean = fileRef.browse();
}
catch (error:Error)
{
	trace("Unable to browse for files.");
}
function selectHandler(event:Event):void
{
	var request:URLRequest = new URLRequest("http://www.[yourdomain].com/fileUploadScript.cfm")
	try
	{
		fileRef.upload(request);
	}
	catch (error:Error)
	{
		trace("Unable to upload file.");
	}
}
function completeHandler(event:Event):void
{
	trace("uploaded");
}
```

![](../../img/tip_help.png) You can send data to the server with the
`FileReference.upload()` method by using the `URLRequest.method` and
`URLRequest.data` properties to send variables using the `POST` or `GET`
_methods._

When you attempt to upload a file using the `FileReference.upload()` method, the
following events are dispatched:

- `open` event ( `Event.OPEN`): Dispatched when the upload operation starts.

- `progress` event ( `ProgressEvent.PROGRESS`): Dispatched periodically as bytes
  of data from the file are uploaded.

- `complete` event ( `Event.COMPLETE`): Dispatched when the upload operation
  completes successfully.

- `httpStatus` event ( `HTTPStatusEvent.HTTP_STATUS`): Dispatched when the
  upload process fails because of an HTTP error.

- `httpResponseStatus` event ( `HTTPStatusEvent.HTTP_RESPONSE_STATUS`):
  Dispatched if a call to the `upload()` or `uploadUnencoded()` method attempts
  to access data over HTTP and Adobe AIR is able to detect and return the status
  code for the request.

- `securityError` event ( `SecurityErrorEvent.SECURITY_ERROR`): Dispatched when
  an upload operation fails because of a security violation.

- `uploadCompleteData` event ( `DataEvent.UPLOAD_COMPLETE_DATA`): Dispatched
  after data is received from the server after a successful upload.

- `ioError` event ( `IOErrorEvent.IO_ERROR`): Dispatched if the upload process
  fails for any of the following reasons:

  - An input/output error occurred while Flash Player is reading, writing, or
```
transmitting the file.
```

  - The SWF tried to upload a file to a server that requires authentication
```
(such as a user name and password). During upload, Flash Player does not
provide a means for users to enter passwords.
```

  - The `url` parameter contains an invalid protocol. The
```
`FileReference.upload()` method must use either HTTP or HTTPS.
```

![](../../img/tip_help.png) Flash Player does not offer complete support for
servers that require authentication. Only SWF files that are running in a
browser using the browser plug-in or Microsoft ActiveX® control can provide a
dialog box to prompt the user to enter a user name and password for
authentication, and then only for downloads. For uploads using the plug-in or
ActiveX control or upload/download using either the stand-alone or external
player, the file transfer fails.

To create a server script in ColdFusion to accept a file upload from Flash
Player, you can use code similar to the following:

```
<cffile action="upload" filefield="Filedata" destination="#ExpandPath('./')#" nameconflict="OVERWRITE" />
```

This ColdFusion code uploads the file sent by Flash Player and saves it to the
same directory as the ColdFusion template, overwriting any file with the same
name. The previous code shows the bare minimum amount of code necessary to
accept a file upload; this script should not be used in a production
environment. Ideally, add data validation to ensure that users upload only
accepted file types, such as an image instead of a potentially dangerous
server-side script.

The following code demonstrates file uploads using PHP, and it includes data
validation. The script limits the number of uploaded files in the upload
directory to 10, ensures that the file is less than 200 KB, and permits only
JPEG, GIF, or PNG files to be uploaded and saved to the file system.

```
<?php
	$MAXIMUM_FILESIZE = 1024 * 200; // 200KB
	$MAXIMUM_FILE_COUNT = 10; // keep maximum 10 files on server
	echo exif_imagetype($_FILES['Filedata']);
	if ($_FILES['Filedata']['size'] <= $MAXIMUM_FILESIZE)
	{
		move_uploaded_file($_FILES['Filedata']['tmp_name'], "./temporary/".$_FILES['Filedata']['name']);
		$type = exif_imagetype("./temporary/".$_FILES['Filedata']['name']);
		if ($type == 1 || $type == 2 || $type == 3)
		{
			rename("./temporary/".$_FILES['Filedata']['name'], "./images/".$_FILES['Filedata']['name']);
		}
		else
		{
			unlink("./temporary/".$_FILES['Filedata']['name']);
		}
	}
	$directory = opendir('./images/');
	$files = array();
	while ($file = readdir($directory))
	{
		array_push($files, array('./images/'.$file, filectime('./images/'.$file)));
	}
	usort($files, sorter);
	if (count($files) > $MAXIMUM_FILE_COUNT)
	{
		$files_to_delete = array_splice($files, 0, count($files) - $MAXIMUM_FILE_COUNT);
		for ($i = 0; $i < count($files_to_delete); $i++)
		{
			unlink($files_to_delete[$i][0]);
		}
	}
	print_r($files);
	closedir($directory);

	function sorter($a, $b)
	{
		if ($a[1] == $b[1])
		{
			return 0;
		}
		else
		{
			return ($a[1] < $b[1]) ? -1 : 1;
		}
	}
?>
```

You can pass additional variables to the upload script using either the `POST`
or `GET` request method. To send additional `POST` variables to your upload
script, you can use the following code:

```
var fileRef:FileReference = new FileReference();
fileRef.addEventListener(Event.SELECT, selectHandler);
fileRef.addEventListener(Event.COMPLETE, completeHandler);
fileRef.browse();
function selectHandler(event:Event):void
{
	var params:URLVariables = new URLVariables();
	params.date = new Date();
	params.ssid = "94103-1394-2345";
	var request:URLRequest = new URLRequest("http://www.yourdomain.com/FileReferenceUpload/fileupload.cfm");
	request.method = URLRequestMethod.POST;
	request.data = params;
	fileRef.upload(request, "Custom1");
}
function completeHandler(event:Event):void
{
	trace("uploaded");
}
```

The previous example creates a URLVariables object that you pass to the remote
server- side script. In previous versions of ActionScript, you could pass
variables to the server upload script by passing values in the query string.
ActionScript 3.0 allows you to pass variables to the remote script using a
URLRequest object, which allows you to pass data using either the `POST` or
`GET` method; this, in turn, makes passing larger sets of data easier and
cleaner. In order to specify whether the variables are passed using the `GET` or
`POST` request method, you can set the `URLRequest.method` property to either
`URLRequestMethod.GET` or `URLRequestMethod.POST`, respectively.

ActionScript 3.0 also lets you override the default `Filedata` upload file field
name by providing a second parameter to the `upload()` method, as demonstrated
in the previous example (which replaced the default value `Filedata` with
`Custom1`).

By default, Flash Player does not attempt to send a test upload, although you
can override this default by passing a value of `true` as the third parameter to
the `upload()` method. The purpose of the test upload is to check whether the
actual file upload will be successful and that server authentication, if
required, will succeed.

Note: A test upload occurs only on Windows-based Flash Players at this time.

The server script that handles the file upload should expect an HTTP `POST`
request with the following elements:

- `Content-Type` with a value of `multipart/form-data.`

- `Content-Disposition` with a `name` attribute set to " `Filedata` " and a
  `filename` attribute set to the name of the original file. You can specify a
  custom `name` attribute by passing a value for the `uploadDataFieldName`
  parameter in the `FileReference.upload()` method.

- The binary contents of the file.

Here is a sample HTTP `POST` request:

```
POST /handler.asp HTTP/1.1
Accept: text/*
Content-Type: multipart/form-data;
boundary=----------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
User-Agent: Shockwave Flash
Host: www.mydomain.com
Content-Length: 421
Connection: Keep-Alive
Cache-Control: no-cache
```

    ------------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
```
Content-Disposition: form-data; name="Filename"

sushi.jpg
```

    ------------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
```
Content-Disposition: form-data; name="Filedata"; filename="sushi.jpg"
Content-Type: application/octet-stream

Test File
```

    ------------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
```
Content-Disposition: form-data; name="Upload"

Submit Query
```

    ------------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
```
(actual file data,,,)
```

The following sample HTTP `POST` request sends three `POST` variables:
`api_sig`, `api_key`, and `auth_token`, and uses a custom upload data field name
value of `"photo"`:

```
POST /handler.asp HTTP/1.1
Accept: text/*
Content-Type: multipart/form-data;
boundary=----------Ij5ae0ae0KM7GI3KM7ei4cH2ei4gL6
User-Agent: Shockwave Flash
Host: www.mydomain.com
Content-Length: 421
Connection: Keep-Alive
Cache-Control: no-cache
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="Filename"

sushi.jpg
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="api_sig"

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="api_key"

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="auth_token"

XXXXXXXXXXXXXXXXXXXXXXX
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="photo"; filename="sushi.jpg"
Content-Type: application/octet-stream

(actual file data,,,)
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7
```
Content-Disposition: form-data; name="Upload"

Submit Query
```

    ------------Ij5GI3GI3ei4GI3ei4KM7GI3KM7KM7--

## Downloading files from a server

You can let users download files from a server using the
`FileReference.download()` method, which takes two parameters: `request` and
`defaultFileName`. The first parameter is the URLRequest object that contains
the URL of the file to download. The second parameter is optional—it lets you
specify a default filename that appears in the download file dialog box. If you
omit the second parameter, `defaultFileName`, the filename from the specified
URL is used.

The following code downloads a file named index.xml from the same directory as
the SWF file:

```
var request:URLRequest = new URLRequest("index.xml");
var fileRef:FileReference = new FileReference();
fileRef.download(request);
```

To set the default name to currentnews.xml instead of index.xml, specify the
`defaultFileName` parameter, as the following snippet shows:

```
var request:URLRequest = new URLRequest("index.xml");
var fileToDownload:FileReference = new FileReference();
fileToDownload.download(request, "currentnews.xml");
```

Renaming a file can be useful if the server filename was not intuitive or was
server-generated. It's also good to explicitly specify the `defaultFileName`
parameter when you download a file using a server-side script, instead of
downloading the file directly. For example, you need to specify the
`defaultFileName` parameter if you have a server-side script that downloads
specific files based on URL variables passed to it. Otherwise, the default name
of the downloaded file is the name of your server-side script.

Data can be sent to the server using the `download()` method by appending
parameters to the URL for the server script to parse. The following ActionScript
3.0 snippet downloads a document based on which parameters are passed to a
ColdFusion script:

```
package
{
	import flash.display.Sprite;
	import flash.net.FileReference;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;

	public class DownloadFileExample extends Sprite
	{
		private var fileToDownload:FileReference;
		public function DownloadFileExample()
		{
			var request:URLRequest = new URLRequest();
			request.url = "http://www.[yourdomain].com/downloadfile.cfm";
			request.method = URLRequestMethod.GET;
			request.data = new URLVariables("id=2");
			fileToDownload = new FileReference();
			try
			{
				fileToDownload.download(request, "file2.txt");
			}
			catch (error:Error)
			{
				trace("Unable to download file.");
			}
		}
	}
}
```

The following code demonstrates the ColdFusion script, download.cfm, that
downloads one of two files from the server, depending on the value of a URL
variable:

```
<cfparam name="URL.id" default="1" />
	<cfswitch expression="#URL.id#">
	<cfcase value="2">
		<cfcontent type="text/plain" file="#ExpandPath('two.txt')#" deletefile="No" />
	</cfcase>
	<cfdefaultcase>
		<cfcontent type="text/plain" file="#ExpandPath('one.txt')#" deletefile="No" />
	</cfdefaultcase>
</cfswitch>
```

## FileReferenceList class

The FileReferenceList class lets the user select one or more files to upload to
a server-side script. The file upload is handled by the `FileReference.upload()`
method, which must be called on each file that the user selects.

The following code creates two FileFilter objects ( `imageFilter` and
`textFilter`) and passes them in an array to the `FileReferenceList.browse()`
method. This causes the operating system file dialog box to display two possible
filters for file types.

```
var imageFilter:FileFilter = new FileFilter("Image Files (*.jpg, *.jpeg, *.gif, *.png)", "*.jpg; *.jpeg; *.gif; *.png");
var textFilter:FileFilter = new FileFilter("Text Files (*.txt, *.rtf)", "*.txt; *.rtf");
var fileRefList:FileReferenceList = new FileReferenceList();
try
{
	var success:Boolean = fileRefList.browse(new Array(imageFilter, textFilter));
}
catch (error:Error)
{
	trace("Unable to browse for files.");
}
```

Allowing the user to select and upload one or more files by using the
FileReferenceList class is the same as using `FileReference.browse()` to select
files, although the FileReferenceList allows you to select more than one file.
Uploading multiple files requires you to upload each of the selected files by
using `FileReference.upload()`, as the following code shows:

```
var fileRefList:FileReferenceList = new FileReferenceList();
fileRefList.addEventListener(Event.SELECT, selectHandler);
fileRefList.browse();

function selectHandler(event:Event):void
{
	var request:URLRequest = new URLRequest("http://www.[yourdomain].com/fileUploadScript.cfm");
	var file:FileReference;
	var files:FileReferenceList = FileReferenceList(event.target);
	var selectedFileArray:Array = files.fileList;
	for (var i:uint = 0; i < selectedFileArray.length; i++)
	{
		file = FileReference(selectedFileArray[i]);
		file.addEventListener(Event.COMPLETE, completeHandler);
		try
		{
			file.upload(request);
		}
		catch (error:Error)
		{
			trace("Unable to upload files.");
		}
	}
}
function completeHandler(event:Event):void
{
	trace("uploaded");
}
```

Because the `Event.COMPLETE` event is added to each individual FileReference
object in the array, Flash Player calls the `completeHandler()` method when each
individual file finishes uploading.

## Adobe recommends

> ### [![](../../img/kevin_hoyt.png) Load and Save Local Files](https://web.archive.org/web/20100906103656/http://tv.adobe.com/watch/adobe-evangelists-kevin-hoyt/load-and-save-local-files)
>
> In this video,
> [Kevin Hoyt](https://web.archive.org/web/20160918100357/http://www.adobe.com/devnet/author_bios/kevin_hoyt.html)
> reveals the ease of loading and saving local content using Flash.
