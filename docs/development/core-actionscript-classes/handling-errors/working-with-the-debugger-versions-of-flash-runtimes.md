---
sidebar_position: 4
---

# Working with the debugger versions of Flash runtimes

Adobe provides developers with special editions of the Flash runtimes to assist
debugging efforts. You obtain a copy of the debugger version of Flash Player
when you install Adobe Flash Professional or Adobe Flash Builder. You also
obtain a utility for the debugging of Adobe AIR applications, which is called
ADL, when you install either of those tools, or as part of the Adobe AIR SDK.

There is a notable difference in how the debugger versions and the release
versions of Flash Player and Adobe AIR indicate errors. The debugger versions
shows the error type (such as a generic Error, IOError, or EOFError), error
number, and a human-readable error message. The release versions shows only the
error type and error number. For example, consider the following code:

    try
    {
        tf.text = myByteArray.readBoolean();
    }
    catch (error:EOFError)
    {
        tf.text = error.toString();
    }

If the `readBoolean()` method throws an EOFError in the debugger version of
Flash Player, the following message displays in the `tf` text field: "EOFError:
Error \#2030: End of file was encountered."

The same code in a release version of Flash Player or Adobe AIR would display
the following text: "EOFError: Error \#2030."

Note: The debugger players broadcast an event named "allComplete"; avoid
creating custom events with the name "allComplete". Otherwise, you will
encounter unpredictable behavior when debugging.

To keep resources and size to a minimum in the release versions, error message
strings are not present. You can look up the error number in the documentation
(the appendixes of the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html))
to correlate to an error message. Alternatively, you can reproduce the error
using the debugger versions of Flash Player and AIR to see the full message.
