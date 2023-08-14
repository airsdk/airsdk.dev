---
sidebar_position: 12
---

# Advanced topics for video files

The following topics address some special issues for working with FLV files.

## About configuring FLV files for hosting on a server

When you work with FLV files, you might have to configure your server to work
with the FLV file format. Multipurpose Internet Mail Extensions (MIME) is a
standardized data specification that lets you send non-ASCII files over Internet
connections. Web browsers and e-mail clients are configured to interpret
numerous MIME types so that they can send and receive video, audio, graphics,
and formatted text. To load FLV files from a web server, you might need to
register the file extension and MIME type with your web server, so you should
check your web server documentation. The MIME type for FLV files is
`video/x-flv`. The full information for the FLV file type is as follows:

- Mime Type: video/x-flv

- File extension: .flv

- Required parameters: none

- Optional parameters: none

- Encoding considerations: FLV files are binary files; some applications might
  require the application/octet-stream subtype to be set

- Security issues: none

- Published specification:
  [www.adobe.com/go/video_file_format](https://web.archive.org/web/20150730113325/http://www.adobe.com/devnet/f4v.html)

Microsoft changed the way streaming media is handled in Microsoft Internet
Information Services (IIS) 6.0 web server from earlier versions. Earlier
versions of IIS do not require any modification to stream Flash Video. In IIS
6.0, the default web server that comes with Windows 2003, the server requires a
MIME type to recognize that FLV files are streaming media.

When SWF files that stream external FLV files are placed on Microsoft Windows
Server® 2003 and are viewed in a browser, the SWF file plays correctly, but the
FLV video does not stream. This issue affects all FLV files placed on Windows
Server 2003, including files you make with earlier versions of the Flash
authoring tool, and the Macromedia Flash Video Kit for Dreamweaver MX 2004 from
Adobe. These files work correctly if you test them on other operating systems.

For information about configuring Microsoft Windows 2003 and Microsoft IIS
Server 6.0 to stream FLV video, see
[www.adobe.com/go/tn_19439](https://web.archive.org/web/20141110203833/http://helpx.adobe.com/flash/kb/flv-files-dont-stream-windows.html).

## About targeting local FLV files on the Macintosh

If you attempt to play a local FLV from a non-system drive on an Apple®
Macintosh® computer by using a path that uses a relative slash (/), the video
will not play. Non-system drives include, but are not limited to, CD-ROMs,
partitioned hard disks, removable storage media, and connected storage devices.

Note: The reason for this failure is a limitation of the operating system, not a
limitation in Flash Player or AIR.

For an FLV file to play from a non-system drive on a Macintosh, refer to it with
an absolute path using a colon-based notation (:) rather than slash-based
notation (/). The following list shows the difference in the two kinds of
notation:

- Slash-based notation **:** myDrive/myFolder/myFLV.flv

- Colon-based notation **:** (Mac OS®) myDrive:myFolder:myFLV.flv
