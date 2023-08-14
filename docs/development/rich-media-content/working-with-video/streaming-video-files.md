---
sidebar_position: 7
---

# Streaming video files

To stream files from Flash Media Server, you can use the NetConnection and
NetStream classes to connect to a remote server instance and play a specified
stream. To specify a Real-Time Messaging Protocol (RTMP) server, you pass the
desired RTMP URL, such as "rtmp://localhost/appName/appInstance", to the
`NetConnection.connect()` method instead of passing `null`. To play a specific
live or recorded stream from the specified Flash Media Server, you pass an
identifying name for live data published by `NetStream.publish()`, or a recorded
filename for playback to the `NetStream.play()` method.

## Sending video to a server

If you want to build more complex applications involving video or camera
objects, Flash Media Server offers a combination of streaming media capabilities
and a development environment for creating and delivering media applications to
a wide audience. This combination enables developers to create applications such
as Video on Demand, live web-event broadcasts, and Mp3 streaming as well as
video blogging, video messaging, and multimedia chat environments. For more
information, see the Flash Media Server documentation online at
[www.adobe.com/go/learn_fms_docs_en](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).
