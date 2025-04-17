---
sidebar_position: 10
---

# Using cue points and metadata

Use the NetStream callback methods to capture and process cue point and metadata
events as the video plays.

## Using cue points

The following table describes the callback methods that you can use to capture
F4V and FLV cue points in Flash Player and AIR.

| Runtime                | F4V        | FLV        |
| ---------------------- | ---------- | ---------- |
| Flash Player 9/ AIR1.0 |            | OnCuePoint |
|                        |            | OnMetaData |
| Flash Player 10        |            | OnCuePoint |
|                        | OnMetaData | OnMetaData |
|                        | OnXMPData  | OnXMPData  |

The following example uses a simple `for..in` loop to iterate over each of the
properties in the `infoObject` parameter that the `onCuePoint()` function
receives. It calls the trace() function to display a message when it receives
cue point data:

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var ns:NetStream = new NetStream(nc);
ns.client = this;
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);

function onCuePoint(infoObject:Object):void
{
	var key:String;
	for (key in infoObject)
	{
		trace(key + ": " + infoObject[key]);
	}
}
```

The following output appears:

```
parameters:
name: point1
time: 0.418
type: navigation
```

This code uses one of several techniques to set the object on which the callback
method runs. You can use other techniques; for more information, see
[Writing callback methods for metadata and cue points](./writing-callback-methods-for-metadata-and-cue-points.md).

## Using video metadata

You can use the `OnMetaData()` and `OnXMPData()` functions to access the
metadata information in your video file, including cue points.

### Using OnMetaData()

Metadata includes information about your video file, such as duration, width,
height, and frame rate. The metadata information that is added to your video
file depends on the software you use to encode the video file.

```
var nc:NetConnection = new NetConnection();
nc.connect(null);

var ns:NetStream = new NetStream(nc);
ns.client = this;
ns.play("video.flv");

var vid:Video = new Video();
vid.attachNetStream(ns);
addChild(vid);

function onMetaData(infoObject:Object):void
{
	var key:String;
	for (key in infoObject)
	{
		trace(key + ": " + infoObject[key]);
	}
}
```

The previous code generates output like the following:

```
width: 320
audiodelay: 0.038
canSeekToEnd: true
height: 213
cuePoints: ,,
audiodatarate: 96
duration: 16.334
videodatarate: 400
framerate: 15
videocodecid: 4
audiocodecid: 2
```

![](../../img/tip_help.png) If your video does not have audio, the audio-related
metadata information (such as `audiodatarate`) returns `undefined` _because no
audio information is added to the metadata during encoding._

In the previous code, the cue point information was not displaying. To display
the cue point metadata, you can use the following function which recursively
displays the items in an Object:

```
function traceObject(obj:Object, indent:uint = 0):void
{
	var indentString:String = "";
	var i:uint;
	var prop:String;
	var val:*;
	for (i = 0; i < indent; i++)
	{
		indentString += "\t";
	}
	for (prop in obj)
	{
		val = obj[prop];
		if (typeof(val) == "object")
		{
			trace(indentString + " " + prop + ": [Object]");
			traceObject(val, indent + 1);
		}
		else
		{
			trace(indentString + " " + prop + ": " + val);
		}
	}
}
```

Using the previous code snippet to trace the `infoObject` parameter in the
`onMetaData()` method creates the following output:

```
width: 320
audiodatarate: 96
audiocodecid: 2
videocodecid: 4
videodatarate: 400
canSeekToEnd: true
duration: 16.334
audiodelay: 0.038
height: 213
framerate: 15
cuePoints: [Object]
0: [Object]
	parameters: [Object]
		lights: beginning
	name: point1
	time: 0.418
	type: navigation
1: [Object]
	parameters: [Object]
		lights: middle
	name: point2
	time: 7.748
	type: navigation
2: [Object]
	parameters: [Object]
		lights: end
	name: point3
	time: 16.02
	type: navigation
```

The following example displays the metadata for an MP4 video. It assumes that
there is a TextArea object called `metaDataOut`, to which it writes the
metadata.

```
package
{
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.events.NetStatusEvent;
	import flash.media.Video;
	import flash.display.StageDisplayState;
	import flash.display.Loader;
	import flash.display.Sprite;
	import flash.events.MouseEvent;

	public class onMetaDataExample extends Sprite
	{
		var video:Video = new Video();

		public function onMetaDataExample():void
		{
			var videoConnection:NetConnection = new NetConnection();
			videoConnection.connect(null);

			var videoStream:NetStream = new NetStream(videoConnection);
			videoStream.client = this;

			addChild(video);
			video.x = 185;
			video.y = 5;

			video.attachNetStream(videoStream);

			videoStream.play("video.mp4");

			videoStream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
		}

		public function onMetaData(infoObject:Object):void
		{
			for(var propName:String in infoObject)
			{
				metaDataOut.appendText(propName + "=" + infoObject[propName] + "\n");
			}
		}

		private function netStatusHandler(event:NetStatusEvent):void
		{
			if(event.info.code == "NetStream.Play.Stop")
				stage.displayState = StageDisplayState.NORMAL;
		}
	}
}
```

The `onMetaData()` function produced the following output for this video:

```
moovposition=731965
height=352
avclevel=21
videocodecid=avc1
duration=2.36
width=704
videoframerate=25
avcprofile=88
trackinfo=[object Object]
```

#### Using the information object

The following table shows the possible values for video metadata that are passed
to the `onMetaData()` callback function in the Object that they receive:

<table>
  <thead>
    <tr>
      <th><p>Parameter</p></th>
      <th><p>Description</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>aacaot</p></td>
      <td><p>AAC audio object type; 0, 1, or 2 are supported.</p></td>
    </tr>
    <tr>
      <td><p>avclevel</p></td>
      <td><p>AVC IDC level number such as 10, 11, 20, 21, and so on.</p></td>
    </tr>
    <tr>
      <td><p>avcprofile</p></td>
      <td><p>AVC profile number such as 55, 77, 100, and so on.</p></td>
    </tr>
    <tr>
      <td><p>audiocodecid</p></td>
      <td>
        <p>
          A string that indicates the audio codec (code/decode technique) that
          was used - for example ".mp3" or "mp4a"
        </p>
      </td>
    </tr>
    <tr>
      <td><p>audiodatarate</p></td>
      <td>
        <p>
          A number that indicates the rate at which audio was encoded, in
          kilobytes per second.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>audiodelay</p></td>
      <td>
        <p>
          A number that indicates what time in the FLV file "time 0" of the
          original FLV file exists. The video content needs to be delayed by a
          small amount to properly synchronize the audio.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>canSeekToEnd</p></td>
      <td>
        <p>
          A Boolean value that is <samp>true</samp> if the FLV file is encoded
          with a keyframe on the last frame, which allows seeking to the end of
          a progressive -download video file. It is <samp>false</samp> if the
          FLV file is not encoded with a keyframe on the last frame.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>cuePoints</p></td>
      <td>
        <p>
          An array of objects, one for each cue point embedded in the FLV file.
          Value is undefined if the FLV file does not contain any cue points.
          Each object has the following properties:
        </p>
        <ul class="incremental">
          <li>
            <p>
              <samp>type</samp>: a string that specifies the type of cue point
              as either "navigation" or "event".
            </p>
          </li>
          <li>
            <p>
              <samp>name</samp>: a string that is the name of the cue point.
            </p>
          </li>
          <li>
            <p>
              <samp>time</samp>: a number that is the time of the cue point in
              seconds with a precision of three decimal places (milliseconds).
            </p>
          </li>
          <li>
            <p>
              <samp>parameters</samp>: an optional object that has name-value
              pairs that are designated by the user when creating the cue
              points.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>duration</p></td>
      <td>
        <p>
          A number that specifies the duration of the video file, in seconds.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>framerate</p></td>
      <td><p>A number that is the frame rate of the FLV file.</p></td>
    </tr>
    <tr>
      <td><p>height</p></td>
      <td><p>A number that is the height of the FLV file, in pixels.</p></td>
    </tr>
    <tr>
      <td><p>seekpoints</p></td>
      <td>
        <p>
          An array that lists the available keyframes as timestamps in
          milliseconds. Optional.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>tags</p></td>
      <td>
        <p>
          An array of key-value pairs that represent the information in the
          "ilst" atom, which is the equivalent of ID3 tags for MP4 files. iTunes
          uses these tags. Can be used to display artwork, if available.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>trackinfo</p></td>
      <td>
        <p>
          Object that provides information on all the tracks in the MP4 file,
          including their sample description ID.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>videocodecid</p></td>
      <td>
        <p>
          A string that is the codec version that was used to encode the video.
          - for example, "avc1" or "VP6F"
        </p>
      </td>
    </tr>
    <tr>
      <td><p>videodatarate</p></td>
      <td><p>A number that is the video data rate of the FLV file.</p></td>
    </tr>
    <tr>
      <td><p>videoframerate</p></td>
      <td><p>Framerate of the MP4 video.</p></td>
    </tr>
    <tr>
      <td><p>width</p></td>
      <td><p>A number that is the width of the FLV file, in pixels.</p></td>
    </tr>
  </tbody>
</table>


The following table shows the possible values for the `videocodecid` parameter:

| videocodecid | Codec name                                                  |
| ------------ | ----------------------------------------------------------- |
| 2            | Sorenson H.263                                              |
| 3            | Screen video (SWF version 7 and later only)                 |
| 4            | VP6 (SWF version 8 and later only)                          |
| 5            | VP6 video with alpha channel (SWF version 8 and later only) |

The following table shows the possible values for the `audiocodecid` parameter:

| audiocodecid | Codec Name               |
| ------------ | ------------------------ |
| 0            | uncompressed             |
| 1            | ADPCM                    |
| 2            | Mp3                      |
| 4            | Nellymoser @ 16 kHz mono |
| 5            | Nellymoser, 8kHz mono    |
| 6            | Nellymoser               |
| 10           | AAC                      |
| 11           | Speex                    |

### Using onXMPData()

The `onXMPData()` callback function receives information specific to Adobe
Extensible Metadata Platform (XMP) that is embedded in the Adobe F4V or FLV
video file. The XMP metadata includes cue points as well as other video
metadata. XMP metadata support is introduced with Flash Player 10 and Adobe AIR
1.5 and supported by subsequent versions.

The following example processes cue point data in the XMP metadata:

```
package
{
	import flash.display.*;
	import flash.net.*;
	import flash.events.NetStatusEvent;
	import flash.media.Video;

	public class onXMPDataExample extends Sprite
	{
		public function onXMPDataExample():void
		{
			var videoConnection:NetConnection = new NetConnection();
			videoConnection.connect(null);

			var videoStream:NetStream = new NetStream(videoConnection);
			videoStream.client = this;
			var video:Video = new Video();

			addChild(video);

			video.attachNetStream(videoStream);

			videoStream.play("video.f4v");
		}

		public function onMetaData(info:Object):void {
			trace("onMetaData fired");
		}

		public function onXMPData(infoObject:Object):void
		{
			trace("onXMPData Fired\n");
			//trace("raw XMP =\n");
			//trace(infoObject.data);
			var cuePoints:Array = new Array();
			var cuePoint:Object;
			var strFrameRate:String;
			var nTracksFrameRate:Number;
			var strTracks:String = "";
			var onXMPXML = new XML(infoObject.data);
			// Set up namespaces to make referencing easier
			var xmpDM:Namespace = new Namespace("http://ns.adobe.com/xmp/1.0/DynamicMedia/");
			var rdf:Namespace = new Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
			for each (var it:XML in onXMPXML..xmpDM::Tracks)
			{
				var strTrackName:String = it.rdf::Bag.rdf::li.rdf::Description.@xmpDM::trackName;
				var strFrameRateXML:String = it.rdf::Bag.rdf::li.rdf::Description.@xmpDM::frameRate;
				strFrameRate = strFrameRateXML.substr(1,strFrameRateXML.length);

				nTracksFrameRate = Number(strFrameRate);

				strTracks += it;
			}
			var onXMPTracksXML:XML = new XML(strTracks);
			var strCuepoints:String = "";
			for each (var item:XML in onXMPTracksXML..xmpDM::markers)
			{
				strCuepoints += item;
			}
			trace(strCuepoints);
		}
	}
}
```

For a short video file called startrekintro.f4v, this example produces the
following trace lines. The lines show the cue point data for navigation and
event cue points in the XMP meta data:

```
onMetaData fired
onXMPData Fired

<xmpDM:markers xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:xmpDM="http://ns.adobe.com/xmp/1.0/DynamicMedia/" xmlns:stDim="http://ns.adobe.com/xap/1.0/sType/Dimensions#" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:x="adobe:ns:meta/">
<rdf:Seq>
<rdf:li>
	<rdf:Description xmpDM:startTime="7695905817600" xmpDM:name="Title1" xmpDM:type="FLVCuePoint" xmpDM:cuePointType="Navigation">
	<xmpDM:cuePointParams>
		<rdf:Seq>
		<rdf:li xmpDM:key="Title" xmpDM:value="Star Trek"/>
		<rdf:li xmpDM:key="Color" xmpDM:value="Blue"/>
		</rdf:Seq>
	</xmpDM:cuePointParams>
	</rdf:Description>
</rdf:li>
<rdf:li>
	<rdf:Description xmpDM:startTime="10289459980800" xmpDM:name="Title2" xmpDM:type="FLVCuePoint" xmpDM:cuePointType="Event">
	<xmpDM:cuePointParams>
		<rdf:Seq>
		<rdf:li xmpDM:key="William Shatner" xmpDM:value="First Star"/>
		<rdf:li xmpDM:key="Color" xmpDM:value="Light Blue"/>
		</rdf:Seq>
	</xmpDM:cuePointParams>
	</rdf:Description>
</rdf:li>
</rdf:Seq>
</xmpDM:markers>
onMetaData fired
```

Note: In XMP data, time is stored as DVA Ticks rather than seconds. To compute
the cue point time, divide the start time by the framerate. For example, the
start time of 7695905817600 divided by a framerate of 254016000000 equals 30:30.

To see the complete raw XMP metadata, which includes the framerate, remove the
comment identifiers (//'s) preceding the second and third `trace()` statements
at the beginning of the `onXMPData()` function.

For more information on XMP, see:

- [Adobe Extensible Metadata Platform (XMP)](https://web.archive.org/web/20080304172551/http://partners.adobe.com/public/developer/xmp/topic.html)

- [Adobe XMP Developer Center](https://web.archive.org/web/20140302023642/http://www.adobe.com/devnet/xmp.html)

## Using image metadata

The `onImageData` event sends image data as a byte array through an AMF0 data
channel. The data can be in JPEG, PNG, or GIF formats. Define an `onImageData()`
callback method to process this information, in the same way that you would
define callback methods for `onCuePoint` and `onMetaData`. The following example
accesses and displays image data using an `onImageData()` callback method:

```
public function onImageData(imageData:Object):void
{
	// display track number
	trace(imageData.trackid);
	var loader:Loader = new Loader();
	//imageData.data is a ByteArray object
	loader.loadBytes(imageData.data);
	addChild(loader);
}
```

## Using text metadata

The `onTextData` event sends text data through an AMF0 data channel. The text
data is in UTF-8 format and contains additional information about formatting,
based on the 3GP timed-text specification. This specification defines a
standardized subtitle format. Define an `onTextData()` callback method to
process this information, in the same way that you would define callback methods
for `onCuePoint` or `onMetaData`. In the following example, the `onTextData()`
method displays the track ID number and corresponding track text.

```
public function onTextData(textData:Object):void
{
	// display the track number
	trace(textData.trackid);
	// displays the text, which can be a null string, indicating old text
	// that should be erased
	trace(textData.text);
}
```
