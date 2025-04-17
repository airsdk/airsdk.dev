---
sidebar_position: 2
---

# Reading from and writing to the system clipboard

To read the operating system clipboard, call the `getData()` method of the
`Clipboard.generalClipboard` object, passing in the name of the format to read:

```
import flash.desktop.Clipboard;
import flash.desktop.ClipboardFormats;

if(Clipboard.generalClipboard.hasFormat(ClipboardFormats.TEXT_FORMAT)){
var text:String = Clipboard.generalClipboard.getData(ClipboardFormats.TEXT_FORMAT);
}
```

Note: Content running in Flash Player or in a non-application sandbox in AIR can
call the `getData()` method only in an event handler for a `paste` event. In
other words, only code running in the AIR application sandbox can call the
`getData()` method outside of a `paste` event handler.

To write to the clipboard, add the data to the `Clipboard.generalClipboard`
object in one or more formats. Any existing data in the same format is
overwritten automatically. Nevertheless, it is a good practice to also clear the
system clipboard before writing new data to it to make sure that unrelated data
in any other formats is also deleted.

```
import flash.desktop.Clipboard;
import flash.desktop.ClipboardFormats;

var textToCopy:String = "Copy to clipboard.";
Clipboard.generalClipboard.clear();
Clipboard.generalClipboard.setData(ClipboardFormats.TEXT_FORMAT, textToCopy, false);
```

Note: Content running in Flash Player or in a non-application sandbox in AIR can
call the `setData()` method only in an event handler for a user event, such as a
keyboard or mouse event, or a `copy` or `cut` event. In other words, only code
running in the AIR application sandbox can call the `setData()` method outside
of a user event handler.
