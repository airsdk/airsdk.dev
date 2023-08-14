---
sidebar_position: 3
---

# Getting file system information

The File class includes the following static properties that provide some useful
information about the file system:

| Property             | Description                                                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `File.lineEnding`    | The line-ending character sequence used by the host operating system. On Mac OS and Linux, this is the line-feed character. On Windows, this is the carriage return character followed by the line-feed character. |
| `File.separator`     | The host operating system's path component separator character. On Mac OS and Linux, this is the forward slash (/) character. On Windows, it is the backslash (\\ character.                                       |
| `File.systemCharset` | The default encoding used for files by the host operating system. This pertains to the character set used by the operating system, corresponding to its language.                                                  |

The `Capabilities` class also includes useful system information that can be
useful when working with files:

| Property              | Description                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Capabilities.hasIME   | Specifies whether the player is running on a system that does ( `true`) or does not ( `false`) have an input method editor (IME) installed. |
| Capabilities.language | Specifies the language code of the system on which the player is running.                                                                   |
| Capabilities.os       | Specifies the current operating system.                                                                                                     |

Note: Be careful when using `Capabilities.os` to determine system
characteristics. If a more specific property exists to determine a system
characteristic, use it. Otherwise, you run the risk of writing code that does
not work correctly on all platforms. For example, consider the following code:

    var separator:String;
    if (Capablities.os.indexOf("Mac") > -1)
    {
    	separator = "/";
    }
    else
    {
    	separator = "\\";
    }

This code leads to problems on Linux. It is better to simply use the
`File.separator` property.
