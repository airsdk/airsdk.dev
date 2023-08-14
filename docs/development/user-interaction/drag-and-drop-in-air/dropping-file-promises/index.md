# Dropping file promises

A file promise is a drag-and-drop clipboard format that allows a user to drag a
file that does not yet exist out of an AIR application. For example, using file
promises, your application could allow a user to drag a proxy icon to a desktop
folder. The proxy icon represents a file or some data known to be available at a
URL. After the user drops the icon, the runtime downloads the data and writes
the file to the drop location.

You can use the URLFilePromise class in an AIR application to drag-and-drop
files accessible at a URL. The URLFilePromise implementation is provided in the
aircore library as part of the AIR 2 SDK. Use either the aircore.swc or
aircore.swf file found in the SDK frameworks/libs/air directory.

Alternately, you can implement your own file promise logic using the
IFilePromise interface (which is defined in the runtime flash.desktop package).

File promises are similar in concept to deferred rendering using a data handler
function on the clipboard. Use file promises instead of deferred rendering when
dragging and dropping files. The deferred rendering technique can lead to
undesirable pauses in the drag gesture as the data is generated or downloaded.
Use deferred rendering for copy and paste operations (for which file promises
are not supported).

#### Limitations when using file promises

File promises have the following limitations compared to other data formats that
you can put in a drag-and-drop clipboard:

- File promises can only be dragged out of an AIR application; they cannot be
  dropped into an AIR application.

- File promises are not supported on all operating systems. Use the
  `Clipboard.supportsFilePromise` property to test whether file promises are
  supported on the host system. On systems that do not support file promises,
  you should provide an alternative mechanism for downloading or generating the
  file data.

- File promises cannot be used with the copy-and-paste clipboard (
  `Clipboard.generalClipboard`).

More Help topics

[Dropping remote files](./dropping-remote-files.md)

[Implementing the IFilePromise interface](./implementing-the-ifilepromise-interface.md)

![](../../../img/flashplatformLinkIndicator.png)
[flash.desktop.IFilePromise](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/desktop/IFilePromise.html)

![](../../../img/flashplatformLinkIndicator.png)
[air.desktop.URLFilePromise](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/air/desktop/URLFilePromise.html)
