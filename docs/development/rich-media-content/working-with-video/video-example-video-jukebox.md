---
sidebar_position: 13
---

# Video example: Video Jukebox

The following example builds a simple video jukebox which dynamically loads a
list of videos to play back in a sequential order. This allows you to build an
application that lets a user browse through a series of video tutorials, or
perhaps specifies which advertisements should be played back before delivering
the user's requested video. This example demonstrates the following features of
ActionScript 3.0:

- Updating a playhead based on a video file's playback progress

- Listening for and parsing a video file's metadata

- Handling specific codes in a net stream

- Loading, playing, pausing, and stopping a dynamically loaded FLV

- Resizing a video object on the display list based on the net stream's metadata

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Video Jukebox application files can be found in the folder
Samples/VideoJukebox. The application consists of the following files:

<table>
<thead>
	<tr>
		<th><p>File</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>
			<p>VideoJukebox.fla</p>
			<p>or</p>
			<p>VideoJukebox.mxml</p>
		</td>
		<td><p>The main
		application file for Flex (MXML) or Flash (FLA).</p></td>
	</tr>
	<tr>
		<td><p>VideoJukebox.as</p></td>
		<td><p>The class
		that provides the main functionality of the application.</p></td>
	</tr>
	<tr>
		<td><p>playlist.xml</p></td>
		<td><p>A file that
		lists which video files will be loaded into the video jukebox.</p></td>
	</tr>
</tbody>
</table>

## Loading an external video playlist file

The external playlist.xml file specifies which videos to load, and the order to
play them back in. In order to load the XML file, you need to use a URLLoader
object and a URLRequest object, as seen in the following code:

```
uldr = new URLLoader();
uldr.addEventListener(Event.COMPLETE, xmlCompleteHandler);
uldr.load(new URLRequest(PLAYLIST_XML_URL));
```

This code is placed in the VideoJukebox class's constructor so the file is
loaded before any other code is run. As soon as the XML file has finished
loading, the `xmlCompleteHandler()` method is called which parses the external
file into an XML object, as seen in the following code:

```
private function xmlCompleteHandler(event:Event):void
{
	playlist = XML(event.target.data);
	videosXML = playlist.video;
	main();
}
```

The `playlist` XML object contains the raw XML from the external file, whereas
the videos XML is an XMLList object which contains just the video nodes. A
sample playlist.xml file can be seen in the following snippet:

```
<videos>
	<video url="video/caption_video.flv" />
	<video url="video/cuepoints.flv" />
	<video url="video/water.flv" />
</videos>
```

Finally, the `xmlCompleteHandler()` method calls the `main()` method which sets
up the various component instances on the display list, as well as the
NetConnection and NetStream objects which are used to load the external FLV
files.

## Creating the user interface

To build the user interface you need to drag five Button instances onto the
display list and give them the following instance names: `playButton`,
`pauseButton`, `stopButton`, `backButton`, and `forwardButton`.

For each of these Button instances, you'll need to assign a handler for the
`click` event, as seen in the following snippet:

```
playButton.addEventListener(MouseEvent.CLICK, buttonClickHandler);
pauseButton.addEventListener(MouseEvent.CLICK, buttonClickHandler);
stopButton.addEventListener(MouseEvent.CLICK, buttonClickHandler);
backButton.addEventListener(MouseEvent.CLICK, buttonClickHandler);
forwardButton.addEventListener(MouseEvent.CLICK, buttonClickHandler);
```

The `buttonClickHandler()` method uses a switch statement to determine which
button instance was clicked, as seen in the following code:

```
private function buttonClickHandler(event:MouseEvent):void
{
	switch (event.currentTarget)
	{
		case playButton:
			ns.resume();
			break;
		case pauseButton:
			ns.togglePause();
			break;
		case stopButton:
			ns.pause();
			ns.seek(0);
			break;
		case backButton:
			playPreviousVideo();
			break;
		case forwardButton:
			playNextVideo();
			break;
	}
}
```

Next, add a Slider instance to the display list and give it an instance name of
`volumeSlider`. The following code sets the slider instance's `liveDragging`
property to `true` and defines an event listener for the slider instance's
`change` event:

```
volumeSlider.value = volumeTransform.volume;
volumeSlider.minimum = 0;
volumeSlider.maximum = 1;
volumeSlider.snapInterval = 0.1;
volumeSlider.tickInterval = volumeSlider.snapInterval;
volumeSlider.liveDragging = true;
volumeSlider.addEventListener(SliderEvent.CHANGE, volumeChangeHandler);
```

Add a ProgressBar instance to the display list and give it an instance name of
`positionBar`. Set its `mode` property to manual, as seen in the following
snippet:

```
positionBar.mode = ProgressBarMode.MANUAL;
```

Finally add a Label instance to the display list and give it an instance name of
`positionLabel`. This Label instance's value will be set by the timer instance

## Listening for a video object's metadata

When Flash Player encounters metadata for each of the loaded videos, the
`onMetaData()` callback handler is called on the NetStream object's `client`
property. The following code initializes an Object and sets up the specified
callback handler:

```
client = new Object();
client.onMetaData = metadataHandler;
```

The `metadataHandler()` method copies its data to the meta property defined
earlier in the code. This allows you to access the metadata for the current
video anytime throughout the entire application. Next, the video object on the
Stage is resized to match the dimensions returned from the metadata. Finally,
the positionBar progress bar instance is moved and resized based on the size of
the currently playing video. The following code contains the entire
`metadataHandler()` method:

```
private function metadataHandler(metadataObj:Object):void
{
	meta = metadataObj;
	vid.width = meta.width;
	vid.height = meta.height;
	positionBar.move(vid.x, vid.y + vid.height);
	positionBar.width = vid.width;
}
```

## Dynamically loading a video

To dynamically load each of the videos, the application uses a NetConnection and
a NetStream object. The following code creates a NetConnection object and passes
`null` to the `connect()` method. By specifying `null`, Flash Player connects to
a video on the local server instead of connecting to a server, such as a Flash
Media Server.

The following code creates both the NetConnection and NetStream instances,
defines an event listener for the `netStatus` event, and assigns the `client`
Object to the `client` property:

```
nc = new NetConnection();
nc.connect(null);

ns = new NetStream(nc);
ns.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
ns.client = client;
```

The `netStatusHandler()` method is called whenever the status of the video is
changed. This includes when a video starts or stops playback, is buffering or if
a video stream cannot be found. The following code lists the
`netStatusHandler()` event:

```
private function netStatusHandler(event:NetStatusEvent):void
{
	try
	{
		switch (event.info.code)
		{
			case "NetStream.Play.Start":
				t.start();
				break;
			case "NetStream.Play.StreamNotFound":
			case "NetStream.Play.Stop":
				t.stop();
				playNextVideo();
				break;
		}
	}
	catch (error:TypeError)
	{
		// Ignore any errors.
	}
}
```

The previous code evaluates the code property of the info object and filters
whether the code is "NetStream.Play.Start", "NetStream.Play.StreamNotFound", or
"NetStream.Play.Stop". All other codes will be ignored. If the net stream is
starting the code starts the Timer instance which updates the playhead. If the
net stream cannot be found or is stopped, the Timer instance is stopped and the
application attempts to play the next video in the playlist.

Every time the Timer executes, the `positionBar` progress bar instance updates
its current position by calling the `setProgress()` method of the ProgressBar
class and the `positionLabel` Label instance is updated with the time elapsed
and total time of the current video.

```
private function timerHandler(event:TimerEvent):void
{
	try
	{
		positionBar.setProgress(ns.time, meta.duration);
		positionLabel.text = ns.time.toFixed(1) + " of " meta.duration.toFixed(1) + " seconds";
	}
	catch (error:Error)
	{
		// Ignore this error.
	}
}
```

## Controlling the volume of the video

You can control the volume for the dynamically loaded video by setting the
`soundTransform` property on the NetStream object. The video jukebox application
allows you to modify the volume level by changing the value of the
`volumeSlider` Slider instance. The following code shows how you can change the
volume level by assigning the value of the Slider component to a SoundTransform
object which is set to the `soundTransform` property on the NetStream object:

```
private function volumeChangeHandler(event:SliderEvent):void
{
	volumeTransform.volume = event.value;
	ns.soundTransform = volumeTransform;
}
```

## Controlling video playback

The rest of the application controls video playback when the video reaches the
end of the video stream or the user skips to the previous or next video.

The following method retrieves the video URL from the XMLList for the currently
selected index:

```
private function getVideo():String
{
	return videosXML[idx].@url;
}
```

The `playVideo()` method calls the `play()` method on the NetStream object to
load the currently selected video:

```
private function playVideo():void
{
	var url:String = getVideo();
	ns.play(url);
}
```

The `playPreviousVideo()` method decrements the current video index, calls the
`playVideo()` method to load the new video file and sets the progress bar to
visible:

```
private function playPreviousVideo():void
{
	if (idx > 0)
	{
		idx--;
		playVideo();
		positionBar.visible = true;
	}
}
```

The final method, `playNextVideo()`, increments the video index and calls the
`playVideo()` method. If the current video is the last video in the playlist,
the `clear()` method is called on the Video object and the progress bar
instance's `visible` property is set to `false`:

```
private function playNextVideo():void
{
	if (idx < (videosXML.length() - 1))
	{
		idx++;
		playVideo();
		positionBar.visible = true;
	}
	else
	{
		idx++;
		vid.clear();
		positionBar.visible = false;
	}
}
```
