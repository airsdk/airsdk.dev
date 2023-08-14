---
sidebar_position: 7
---

# Responding to error events and status

One of the most noticeable improvements to error handling in ActionScript 3.0 is
the support for error event handling for responding to asynchronous errors while
an application is running. (For a definition of asynchronous errors, see
[Types of errors](./types-of-errors.md).)

You can create event listeners and event handlers to respond to the error
events. Many classes dispatch error events the same way they dispatch other
events. For example, an instance of the XMLSocket class normally dispatches
three types of events: `Event.CLOSE`, `Event.CONNECT`, and `DataEvent.DATA`.
However, when a problem occurs, the XMLSocket class can dispatch the
`IOErrorEvent.IOError` or the `SecurityErrorEvent.SECURITY_ERROR`. For more
information about event listeners and event handlers, see
[Handling events](../handling-events/index.md).

Error events fit into one of two categories:

- Error events that extend the ErrorEvent class

  The flash.events.ErrorEvent class contains the properties and methods for
  managing errors related to networking and communication operations in a
  running application. The AsyncErrorEvent, IOErrorEvent, and SecurityErrorEvent
  classes extend the ErrorEvent class. If you're using the debugger version of a
  Flash runtime, a dialog box informs you at run-time of any error events
  without listener functions that the player encounters.

- Status-based error events

  The status-based error events are related to the `netStatus` and `status`
  properties of the networking and communication classes. If a Flash runtime
  encounters a problem when reading or writing data, the value of the
  `netStatus.info.level` or `status.level` properties (depending on the class
  object you're using) is set to the value `"error"`. You respond to this error
  by checking if the `level` property contains the value `"error"` in your event
  handler function.

## Working with error events

The ErrorEvent class and its subclasses contain error types for handling errors
dispatched by Flash runtimes as they try to read or write data.

The following example uses both a `try..catch` statement and error event
handlers to display any errors detected while trying to read a local file. You
can add more sophisticated handling code to provide a user with options or
otherwise handle the error automatically in the places indicated by the comment
"your error-handling code here":

    package
    {
        import flash.display.Sprite;
        import flash.errors.IOError;
        import flash.events.IOErrorEvent;
        import flash.events.TextEvent;
        import flash.media.Sound;
        import flash.media.SoundChannel;
        import flash.net.URLRequest;
        import flash.text.TextField;
        import flash.text.TextFieldAutoSize;

        public class LinkEventExample extends Sprite
        {
            private var myMP3:Sound;
            public function LinkEventExample()
            {
                myMP3 = new Sound();
                var list:TextField = new TextField();
                list.autoSize = TextFieldAutoSize.LEFT;
                list.multiline = true;
                list.htmlText = "<a href=\"event:track1.mp3\">Track 1</a><br>";
                list.htmlText += "<a href=\"event:track2.mp3\">Track 2</a><br>";
                addEventListener(TextEvent.LINK, linkHandler);
                addChild(list);
            }

            private function playMP3(mp3:String):void
            {
                try
                {
                    myMP3.load(new URLRequest(mp3));
                    myMP3.play();
                }
                catch (err:Error)
                {
                    trace(err.message);
                    // your error-handling code here
                }
                myMP3.addEventListener(IOErrorEvent.IO_ERROR, errorHandler);
            }

            private function linkHandler(linkEvent:TextEvent):void
            {
                playMP3(linkEvent.text);
                // your error-handling code here
            }

            private function errorHandler(errorEvent:IOErrorEvent):void
            {
                trace(errorEvent.text);
                // your error-handling code here
            }
        }
    }

## Working with status change events

Flash runtimes dynamically change the value of the `netStatus.info.level` or
`status.level` properties for the classes that support the `level` property
while an application is running. The classes that have the
`netStatus.info.level` property are NetConnection, NetStream, and SharedObject.
The classes that have the `status.level` property are HTTPStatusEvent, Camera,
Microphone, and LocalConnection. You can write a handler function to respond to
the change in `level` value and track communication errors.

The following example uses a `netStatusHandler()` function to test the value of
the `level` property. If the `level` property indicates that an error has been
encountered, the code traces the message "Video stream failed".

    package
    {
        import flash.display.Sprite;
        import flash.events.NetStatusEvent;
        import flash.events.SecurityErrorEvent;
        import flash.media.Video;
        import flash.net.NetConnection;
        import flash.net.NetStream;

        public class VideoExample extends Sprite
        {
            private var videoUrl:String = "Video.flv";
            private var connection:NetConnection;
            private var stream:NetStream;

            public function VideoExample()
            {
                connection = new NetConnection();
                connection.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
                connection.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
                connection.connect(null);
            }

            private function netStatusHandler(event:NetStatusEvent):void
            {
                if (event.info.level == "error")
                {
                    trace("Video stream failed")
                }
                else
                {
                    connectStream();
                }
            }

            private function securityErrorHandler(event:SecurityErrorEvent):void
            {
                trace("securityErrorHandler: " + event);
            }

            private function connectStream():void
            {
                var stream:NetStream = new NetStream(connection);
                var video:Video = new Video();
                video.attachNetStream(stream);
                stream.play(videoUrl);
                addChild(video);
            }
        }
    }
