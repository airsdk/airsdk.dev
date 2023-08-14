---
sidebar_position: 4
---

# Loading video files

Loading videos using the NetStream and NetConnection classes is a multistep
process. As a best practice, the steps of adding the Video object to the display
list, attaching the NetStream object to the Video instance, and calling the
NetStream object's `play()` method should be performed in the specified order:

1.  Create a NetConnection object. If you are connecting to a local video file
    or one that is not using a server such as Adobe's Flash Media Server 2, pass
    `null` to the `connect()` method to play the video files from either an HTTP
    address or a local drive. If you are connecting to a server, set the
    parameter to the URI of the application that contains the video file on the
    server.

        var nc:NetConnection = new NetConnection();
        nc.connect(null);

2.  Create a new Video object that display the video and add it to the stage
    display list, as shown in the following snippet:

        var vid:Video = new Video();
        addChild(vid);

3.  Create a NetStream object, passing the NetConnection object as an argument
    to the constructor. The following snippet connects a NetStream object to the
    NetConnection instance and sets up the event handlers for the stream:

        var ns:NetStream = new NetStream(nc);
        ns.addEventListener(NetStatusEvent.NET_STATUS,netStatusHandler);
        ns.addEventListener(AsyncErrorEvent.ASYNC_ERROR, asyncErrorHandler);

        function netStatusHandler(event:NetStatusEvent):void
        {
        	// handle netStatus events, described later
        }

        function asyncErrorHandler(event:AsyncErrorEvent):void
        {
        	// ignore error
        }

4.  Attach the NetStream object to the Video object using the Video object's
    `attachNetStream()` method, as seen in the following snippet:

        vid.attachNetStream(ns);

5.  Call the NetStream object's `play()` method with the video file url as an
    argument to start the video playing. The following snippet loads and plays a
    video file named "video.mp4" in the same directory as the SWF file:

        ns.play("video.mp4");

More Help topics

![](../../img/flexLinkIndicator.png)
[Flex: Spark VideoPlayer control](https://web.archive.org/web/20150315165855/https://help.adobe.com/en_US/flex/using/WSc78f87379113c38b-669905c51221a3b97af-8000.html)

![](../../img/flashplatformLinkIndicator.png)
[spark.components.VideoDisplay](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/spark/components/VideoDisplay.html?allClasses=1)
