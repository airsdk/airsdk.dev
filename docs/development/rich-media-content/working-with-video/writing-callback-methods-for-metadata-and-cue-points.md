---
sidebar_position: 9
---

# Writing callback methods for metadata and cue points

You can trigger actions in your application when specific metadata is received
by the player or when specific cue points are reached. When these events occur,
you must use specific callback methods as event handlers. The NetStream class
specifies the following metadata events that can occur during playback:
`onCuePoint` (FLV files only), `onImageData`, `onMetaData`, `onPlayStatus`,
`onTextData`, and `onXMPData`.

You must write callback methods for these handlers, or the Flash runtime may
throw errors. For example, the following code plays an FLV file named video.flv
in the same folder where the SWF file resides:

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var ns:NetStream = new NetStream(nc);
ns.addEventListener(AsyncErrorEvent.ASYNC_ERROR, asyncErrorHandler);
ns.play("video.flv");
function asyncErrorHandler(event:AsyncErrorEvent):void
{
	trace(event.text);
}

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

The previous code loads a local video file named video.flv and listens for the
`asyncError` ( `AsyncErrorEvent.ASYNC_ERROR`) to be dispatched. This event is
dispatched when an exception is thrown from native asynchronous code. In this
case, it is dispatched when the video file contains metadata or cue point
information, and the appropriate listeners have not been defined. The previous
code handles the `asyncError` event and ignores the error if you are not
interested in the video file's metadata or cue point information. If you had an
FLV with metadata and several cue points, the `trace()` function would display
the following error messages:

```
Error #2095: flash.net.NetStream was unable to invoke callback onMetaData.
Error #2095: flash.net.NetStream was unable to invoke callback onCuePoint.
Error #2095: flash.net.NetStream was unable to invoke callback onCuePoint.
Error #2095: flash.net.NetStream was unable to invoke callback onCuePoint.
```

The errors occur because the NetStream object was unable to find an `onMetaData`
or `onCuePoint` callback method. There are several ways to define these callback
methods within your applications.

## Set the NetStream object's client property to an Object

By setting the `client` property to either an Object or a subclass of NetStream,
you can reroute the `onMetaData` and `onCuePoint` callback methods or ignore
them completely. The following example demonstrates how you can use an empty
Object to ignore the callback methods without listening for the `asyncError`
event:

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var customClient:Object = new Object();

var ns:NetStream = new NetStream(nc);
ns.client = customClient;
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

If you wanted to listen for either the `onMetaData` or `onCuePoint` callback
methods, you would need to define methods to handle those callback methods, as
shown in the following snippet:

```
var customClient:Object = new Object();
customClient.onMetaData = metaDataHandler;
function metaDataHandler(infoObject:Object):void
{
	trace("metadata");
}
```

The previous code listens for the `onMetaData` callback method and calls the
`metaDataHandler()` method, which traces a string. If the Flash runtime
encountered a cue point, no errors would be generated even though no
`onCuePoint` callback method is defined.

## Create a custom class and define methods to handle the callback methods

The following code sets the NetStream object's `client` property to a custom
class, CustomClient, which defines handlers for the callback methods:

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var ns:NetStream = new NetStream(nc);
ns.client = new CustomClient();
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

The CustomClient class is as follows:

```
package
{
	public class CustomClient
	{
		public function onMetaData(infoObject:Object):void
		{
			trace("metadata");
		}
	}
}
```

The CustomClient class defines a handler for the `onMetaData` callback handler.
If a cue point was encountered and the `onCuePoint` callback handler was called,
an `asyncError` event ( `AsyncErrorEvent.ASYNC_ERROR`) would be dispatched
saying "flash.net.NetStream was unable to invoke callback onCuePoint." To
prevent this error, you would either need to define an `onCuePoint` callback
method in your CustomClient class, or define an event handler for the
`asyncError` event.

## Extend the NetStream class and add methods to handle the callback methods

The following code creates an instance of the CustomNetStream class, which is
defined in a later code listing:

```
var ns:CustomNetStream = new CustomNetStream();
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

The following code listing defines the CustomNetStream class that extends the
NetStream class, handles the creation of the necessary NetConnection object, and
handles the `onMetaData` and `onCuePoint` callback handler methods:

```
package
{
	import flash.net.NetConnection;
	import flash.net.NetStream;
	public class CustomNetStream extends NetStream
	{
		private var nc:NetConnection;
		public function CustomNetStream()
		{
			nc = new NetConnection();
			nc.connect(null);
			super(nc);
		}
		public function onMetaData(infoObject:Object):void
		{
			trace("metadata");
		}
		public function onCuePoint(infoObject:Object):void
		{
			trace("cue point");
		}
	}
}
```

If you want to rename the `onMetaData()` and `onCuePoint()` methods in the
CustomNetStream class, you could use the following code:

```
package
{
	import flash.net.NetConnection;
	import flash.net.NetStream;
	public class CustomNetStream extends NetStream
	{
		private var nc:NetConnection;
		public var onMetaData:Function;
		public var onCuePoint:Function;
		public function CustomNetStream()
		{
			onMetaData = metaDataHandler;
			onCuePoint = cuePointHandler;
			nc = new NetConnection();
			nc.connect(null);
			super(nc);
		}
		private function metaDataHandler(infoObject:Object):void
		{
			trace("metadata");
		}
		private function cuePointHandler(infoObject:Object):void
		{
			trace("cue point");
		}
	}
}
```

## Extend the NetStream class and make it dynamic

You can extend the NetStream class and make the subclass dynamic so that
`onCuePoint` and `onMetaData` callback handlers can be added dynamically. This
is demonstrated in the following listing:

```
var ns:DynamicCustomNetStream = new DynamicCustomNetStream();
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

The DynamicCustomNetStream class is as follows:

```
package
{
	import flash.net.NetConnection;
	import flash.net.NetStream;
	public dynamic class DynamicCustomNetStream extends NetStream
	{
		private var nc:NetConnection;
		public function DynamicCustomNetStream()
		{
			nc = new NetConnection();
			nc.connect(null);
			super(nc);
		}
	}
}
```

Even with no handlers for the `onMetaData` and `onCuePoint` callback handlers,
no errors are thrown since the DynamicCustomNetStream class is dynamic. If you
want to define methods for the `onMetaData` and `onCuePoint` callback handlers,
you could use the following code:

```
var ns:DynamicCustomNetStream = new DynamicCustomNetStream();
ns.onMetaData = metaDataHandler;
ns.onCuePoint = cuePointHandler;
ns.play("http://www.helpexamples.com/flash/video/cuepoints.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);

function metaDataHandler(infoObject:Object):void
{
	trace("metadata");
}
function cuePointHandler(infoObject:Object):void
{
	trace("cue point");
}
```

## Set the NetStream object's client property to this

By setting the `client` property to `this`, the application looks in the current
scope for `onMetaData()` and `onCuePoint()` methods. You can see this in the
following example:

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var ns:NetStream = new NetStream(nc);
ns.client = this;
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);
```

If the `onMetaData` or `onCuePoint` callback handlers are called and no methods
exist to handle the callback, no errors are generated. To handle these callback
handlers, create an `onMetaData()` and `onCuePoint()` method in your code, as
seen in the following snippet:

```
function onMetaData(infoObject:Object):void
{
	trace("metadata");
}
function onCuePoint(infoObject:Object):void
{
	trace("cue point");
}
```

More Help topics

![](../../img/flashmediaserverLinkIndicator.png)
[Flash Media Server: Handling metadata in streams](https://help.adobe.com/en_US/FlashMediaServer/3.5_Deving/WS5b3ccc516d4fbf351e63e3d11a0773d117-7fc8.html#WS5b3ccc516d4fbf351e63e3d11a0773d117-7fdb)
