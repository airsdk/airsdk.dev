---
sidebar_position: 2
---

# Using the System class

The System class contains methods and properties that allow you to interact with
the user's operating system and retrieve the current memory usage of the
runtime. The methods and properties of the System class also allow you to listen
for `imeComposition` events, instruct the runtime to load external text files
using the user's current code page or to load them as Unicode, or set the
contents of the user's clipboard.

## Getting data about the user's system at run time

By checking the `System.totalMemory` property, you can determine the amount of
memory (in bytes) that the runtime is currently using. This property allows you
to monitor memory usage and optimize your applications based on how the memory
level changes. For example, if a particular visual effect causes a large
increase in memory usage, you may want to consider modifying the effect or
eliminating it altogether.

The `System.ime` property is a reference to the currently installed Input Method
Editor (IME). This property allows you to listen for `imeComposition` events (
`flash.events.IMEEvent.IME_COMPOSITION`) by using the `addEventListener()`
method.

The third property in the System class is `useCodePage`. When `useCodePage` is
set to `true`, the runtime uses the traditional code page of the operating
system to load external text files. If you set this property to `false`, you
tell the runtime to interpret the external file as Unicode.

If you set `System.useCodePage` to `true`, remember that the traditional code
page of the operating system must include the characters used in your external
text file in order for the text to display. For example, if you load an external
text file that contains Chinese characters, those characters cannot display on a
system that uses the English Windows code page because that code page does not
include Chinese characters.

To ensure that users on all platforms can view the external text files that are
used in your application, you should encode all external text files as Unicode
and leave `System.useCodePage` set to `false` by default. This way, the runtime
interprets the text as Unicode.

## Saving text to the clipboard

The System class includes a method called `setClipboard()` that allows the Flash
runtime to set the contents of the user's clipboard with a specified string. For
security reasons, there is no `Security.getClipboard()` method, since such a
method could potentially allow malicious sites to access the data last copied to
the user's clipboard.

The following code illustrates how an error message can be copied to the user's
clipboard when a security error occurs. The error message can be useful if the
user wants to report a potential bug with an application.

```
private function securityErrorHandler(event:SecurityErrorEvent):void
{
	var errorString:String = "[" + event.type + "] " + event.text;
	trace(errorString);
	System.setClipboard(errorString);
}
```

#### Flash Player 10 and AIR 1.0

You can use the Clipboard class to read and write clipboard data in response to
a user event. In AIR, a user event is not required for code running in the
application sandbox to access the clipboard.
