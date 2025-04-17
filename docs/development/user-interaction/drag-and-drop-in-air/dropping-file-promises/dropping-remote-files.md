---
sidebar_position: 1
---

# Dropping remote files

Use the URLFilePromise class to create file promise objects representing files
or data available at a URL. Add one or more file promise objects to the
clipboard using the `FILE_PROMISE_LIST` clipboard format. In the following
example, a single file, available at http://www.example.com/foo.txt, is
downloaded and saved to the drop location as bar.txt. (The remote and the local
file names do not have to match.)

```
if( Clipboard.supportsFilePromise )
{
	var filePromise:URLFilePromise = new URLFilePromise();
	filePromise.request = new URLRequest("http://example.com/foo.txt");
	filePromise.relativePath = "bar.txt";

	var fileList:Array = new Array( filePromise );
	var clipboard:Clipboard = new Clipboard();
	clipboard.setData( ClipboardFormats.FILE_PROMISE_LIST_FORMAT, fileList );
	NativeDragManager.doDrag( dragSource, clipboard );
}
```

You can allow the user to drag more than one file at a time by adding more file
promise objects to the array assigned to the clipboard. You can also specify
subdirectories in the `relativePath` property so that some or all of the files
included in the operation are placed in a subfolder relative to the drop
location.

The following example illustrates how to initiate a drag operation that includes
multiple file promises. In this example, an html page, _article.html_ , is put
on the clipboard as a file promise, along with its two linked image files. The
images are copied into an _images_ subfolder so that the relative links are
maintained.

```
if( Clipboard.supportsFilePromise )
{
	//Create the promise objects
	var filePromise:URLFilePromise = new URLFilePromise();
	filePromise.request = new URLRequest("http://example.com/article.html");
	filePromise.relativePath = "article.html";

	var image1Promise:URLFilePromise = new URLFilePromise();
	image1Promise.request = new URLRequest("http://example.com/images/img_1.jpg");
	image1Promise.relativePath = "images/img_1.html";
	var image2Promise:URLFilePromise = new URLFilePromise();
	image2Promise.request = new URLRequest("http://example.com/images/img_2.jpg");
	image2Promise.relativePath = "images/img_2.jpg";

	//Put the promise objects onto the clipboard inside an array
	var fileList:Array = new Array( filePromise, image1Promise, image2Promise );
	var clipboard:Clipboard = new Clipboard();
	clipboard.setData( ClipboardFormats.FILE_PROMISE_LIST_FORMAT, fileList );
	//Start the drag operation
	NativeDragManager.doDrag( dragSource, clipboard );
}
```
