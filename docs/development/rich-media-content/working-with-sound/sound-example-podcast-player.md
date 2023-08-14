---
sidebar_position: 13
---

# Sound example: Podcast Player

A podcast is a sound file that is distributed over the Internet, on demand or by
subscription. Podcasts are usually published as part of a series, which is also
called a podcast channel. Because podcast episodes can last anywhere from one
minute to many hours, they are usually streamed while playing. Podcast episodes,
which are also called items, are usually delivered in the mp3 file format. Video
podcasts are also popular, but this sample application plays only audio podcasts
that use mp3 files.

This example is not a full-featured podcast aggregator application. For example,
it does not manage subscriptions to specific podcasts or remember which podcasts
the user has listened to the next time the application is run. It could serve as
a starting point for a more full-featured podcast aggregator.

The Podcast Player example illustrates the following ActionScript programming
techniques:

- Reading an external RSS feed and parsing its XML content

- Creating a SoundFacade class to simplify loading and playback of sound files

- Displaying sound playback progress

- Pausing and resuming sound playback

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Podcast Player application files can be found in the folder
Samples/PodcastPlayer. The application consists of the following files:

<table>
<thead>
	<tr>
		<th><p>File</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p>PodcastPlayer.mxml</p>
		<p>or</p>
		<p>PodcastPlayer.fla</p></td>
		<td><p>The user
		interface for the application for Flex (MXML) or Flash (FLA).</p></td>
	</tr>
	<tr>
		<td><p>comp/example/programmingas3/podcastplayer/PodcastPlayer.as</p></td>
		<td><p>Document
		class containing the user interface logic for the podcast player (Flash
		only).</p></td>
	</tr>
	<tr>
		<td><p>SoundPlayer.mxml</p></td>
		<td><p>An MXML
		component that displays playback buttons and progress bars and controls
		sound playback, for Flex only.</p></td>
	</tr>
	<tr>
		<td><p>main.css</p></td>
		<td><p>Styles for
		the application user interface (Flex only).</p></td>
	</tr>
	<tr>
		<td><p>images/</p></td>
		<td><p>Icons for
		styling the buttons (Flex only).</p></td>
	</tr>
	<tr>
		<td><p>comp/example/programmingas3/podcastplayer/SoundPlayer.as</p></td>
		<td><p>Class for the
		SoundPlayer movie clip symbol containing the user interface logic for
		the sound player (Flash only).</p></td>
	</tr>
	<tr>
		<td><p>comp/example/programmingas3/podcastplayer/PlayButtonRenderer.as</p></td>
		<td><p>Custom cell
		renderer for displaying a play button in a data grid cell (Flash
		only).</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/podcastplayer/RSSBase.as</p></td>
		<td><p>A base class
		that provides common properties and methods for the RSSChannel class and
		the RSSItem class.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/podcastplayer/RSSChannel.as</p></td>
		<td><p>An
		ActionScript class that holds data about an RSS channel.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/podcastplayer/RSSItem.as</p></td>
		<td><p>An
		ActionScript class that holds data about an RSS item.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/podcastplayer/SoundFacade.as</p></td>
		<td><p>The main
		ActionScript class for the application. It encapsulates the methods and
		events of the Sound class and the SoundChannel class and adds support
		for pausing and resuming playback.</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/podcastplayer/URLService.as</p></td>
		<td><p>An
		ActionScript class that retrieves data from a remote URL.</p></td>
	</tr>
	<tr>
		<td><p>playerconfig.xml</p></td>
		<td><p>An XML file
		containing a list of RSS feeds that represent podcast channels.</p></td>
	</tr>
	<tr>
		<td><p>comp/example/programmingas3/utils/DateUtil.as</p></td>
		<td><p>Class that is
		used for easy date formatting (Flash only).</p></td>
	</tr>
</tbody>
</table>

## Reading RSS data for a podcast channel

The Podcast Player application starts by reading information about a number of
podcast channels and their episodes:

1\. First, the application reads an XML configuration file that contains a list
of podcast channels and displays the list of channels to the user.

2\. When the user selects one of the podcast channels, it reads the RSS feed for
the channel and displays a list of the channel episodes.

This example uses the URLLoader utility class to retrieve text-based data from a
remote location or a local file. The Podcast Player first creates a URLLoader
object to get a list of RSS feeds in XML format from the playerconfig.xml file.
Next, when the user selects a specific feed from the list, a new URLLoader
object is created to read the RSS data from that feed's URL.

## Simplifying sound loading and playback using the SoundFacade class

The ActionScript 3.0 sound architecture is powerful but complex. Applications
that only need basic sound loading and playback features can use a class that
hides some of the complexity by providing a simpler set of method calls and
events. In the world of software design patterns, such a class is called a
_facade_.

The SoundFacade class presents a single interface for performing the following
tasks:

- Loading sound files using a Sound object, a SoundLoaderContext object, and the
  SoundMixer class

- Playing sound files using the Sound object and the SoundChannel object

- Dispatching playback progress events

- Pausing and resuming playback of the sound using the Sound object and the
  SoundChannel object

The SoundFacade class tries to offer most of the functionality of the
ActionScript sound classes with less complexity.

The following code shows the class declaration, the class properties, and the
`SoundFacade()` constructor method:

    public class SoundFacade extends EventDispatcher
    {
    	public var s:Sound;
    	public var sc:SoundChannel;
    	public var url:String;
    	public var bufferTime:int = 1000;

    	public var isLoaded:Boolean = false;
    	public var isReadyToPlay:Boolean = false;
    	public var isPlaying:Boolean = false;
    	public var isStreaming:Boolean = true;
    	public var autoLoad:Boolean = true;
    	public var autoPlay:Boolean = true;

    	public var pausePosition:int = 0;

    	public static const PLAY_PROGRESS:String = "playProgress";
    	public var progressInterval:int = 1000;
    	public var playTimer:Timer;

    	public function SoundFacade(soundUrl:String, autoLoad:Boolean = true,
    									autoPlay:Boolean = true, streaming:Boolean = true,
    									bufferTime:int = -1):void
    	{
    		this.url = soundUrl;

    		// Sets Boolean values that determine the behavior of this object
    		this.autoLoad = autoLoad;
    		this.autoPlay = autoPlay;
    		this.isStreaming = streaming;

    		// Defaults to the global bufferTime value
    		if (bufferTime < 0)
    		{
    			bufferTime = SoundMixer.bufferTime;
    		}

    		// Keeps buffer time reasonable, between 0 and 30 seconds
    		this.bufferTime = Math.min(Math.max(0, bufferTime), 30000);

    		if (autoLoad)
    		{
    			load();
    		}
    	}

The SoundFacade class extends the EventDispatcher class so that it can dispatch
its own events. The class code first declares properties for a Sound object and
a SoundChannel object. The class also stores the value of the URL of the sound
file and a `bufferTime` property to use when streaming the sound. In addition,
it accepts some Boolean parameter values that affect the loading and playback
behavior:

- The `autoLoad` parameter tells the object that sound loading should start as
  soon as this object is created.

- The `autoPlay` parameter indicates that sound playing should start as soon as
  enough sound data has been loaded. If this is a streaming sound, playback will
  begin as soon as enough data, as specified by the `bufferTime` property, has
  loaded.

- The `streaming` parameter indicates that this sound file can start playing
  before loading has completed.

The `bufferTime` parameter defaults to a value of -1. If the constructor method
detects a negative value in the `bufferTime` parameter, it sets the `bufferTime`
property to the value of `SoundMixer.bufferTime`. This lets the application
default to the global `SoundMixer.bufferTime` value as desired.

If the `autoLoad` parameter is set to `true`, the constructor method immediately
calls the following `load()` method to start loading the sound file:

    public function load():void
    {
    	if (this.isPlaying)
    	{
    		this.stop();
    		this.s.close();
    	}
    	this.isLoaded = false;

    	this.s = new Sound();

    	this.s.addEventListener(ProgressEvent.PROGRESS, onLoadProgress);
    	this.s.addEventListener(Event.OPEN, onLoadOpen);
    	this.s.addEventListener(Event.COMPLETE, onLoadComplete);
    	this.s.addEventListener(Event.ID3, onID3);
    	this.s.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
    	this.s.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onIOError);

    	var req:URLRequest = new URLRequest(this.url);

    	var context:SoundLoaderContext = new SoundLoaderContext(this.bufferTime, true);
    	this.s.load(req, context);
    }

The `load()` method creates a new Sound object and then adds listeners for all
of the important sound events. Then it tells the Sound object to load the sound
file, using a SoundLoaderContext object to pass in the `bufferTime` value.

Because the `url` property can be changed, a SoundFacade instance can be used to
play different sound files in succession: simply change the `url` property and
call the `load()` method, and the new sound file will be loaded.

The following three event listener methods show how the SoundFacade object
tracks loading progress and decides when to start playing the sound:

    public function onLoadOpen(event:Event):void
    {
    	if (this.isStreaming)
    	{
    		this.isReadyToPlay = true;
    		if (autoPlay)
    		{
    			this.play();
    		}
    	}
    	this.dispatchEvent(event.clone());
    }

    public function onLoadProgress(event:ProgressEvent):void
    {
    	this.dispatchEvent(event.clone());
    }

    public function onLoadComplete(event:Event):void
    {
    	this.isReadyToPlay = true;
    	this.isLoaded = true;
    	this.dispatchEvent(evt.clone());

    	if (autoPlay && !isPlaying)
    	{
    		play();
    	}
    }

The `onLoadOpen()` method executes when sound loading starts. If the sound can
be played in streaming mode, the `onLoadComplete()` method sets the
`isReadyToPlay` flag to `true` right away. The `isReadyToPlay` flag determines
whether the application can start the sound playing, perhaps in response to a
user action like clicking a Play button. The SoundChannel class manages the
buffering of sound data, so there is no need to explicitly check whether enough
data has been loaded before calling the `play()` method.

The `onLoadProgress()` method executes periodically during the loading process.
It simply dispatches a clone of its ProgressEvent object for use by code that
uses this SoundFacade object.

When the sound data has been fully loaded the `onLoadComplete()` method
executes, calling the `play()` method for non-streaming sounds if needed. The
`play(`) method itself is shown below.

    public function play(pos:int = 0):void
    {
    	if (!this.isPlaying)
    	{
    		if (this.isReadyToPlay)
    		{
    			this.sc = this.s.play(pos);
    			this.sc.addEventListener(Event.SOUND_COMPLETE, onPlayComplete);
    			this.isPlaying = true;

    			this.playTimer = new Timer(this.progressInterval);
    			this.playTimer.addEventListener(TimerEvent.TIMER, onPlayTimer);
    			this.playTimer.start();
    		}
    	}
    }

The `play()` method calls the `Sound.play()` method if the sound is ready to
play. The resulting SoundChannel object is stored in the `sc` property. The
`play()` method then creates a Timer object that will be used to dispatch
playback progress events at regular intervals.

## Displaying playback progress

Creating a Timer object to drive playback monitoring is complex operation that
you should only have to code once. Encapsulating this Timer logic in a reusable
class like the SoundFacade class lets applications listen to the same kinds of
progress events when a sound is loading and when it is playing.

The Timer object that is created by the `SoundFacade.play()` method dispatches a
TimerEvent instance every second. The following `onPlayTimer()` method executes
whenever a new TimerEvent arrives:

    public function onPlayTimer(event:TimerEvent):void
    {
    	var estimatedLength:int =
    		Math.ceil(this.s.length / (this.s.bytesLoaded / this.s.bytesTotal));
    	var progEvent:ProgressEvent =
    		new ProgressEvent(PLAY_PROGRESS, false, false, this.sc.position, estimatedLength);
    	this.dispatchEvent(progEvent);
    }

The `onPlayTimer()` method implements the size estimation technique described in
the section [Monitoring playback](./playing-sounds.md#monitoring-playback). Then
it creates a new ProgressEvent instance with an event type of
`SoundFacade.PLAY_PROGRESS`, with the `bytesLoaded` property set to the current
position of the SoundChannel object and the `bytesTotal` property set to the
estimated length of the sound data.

## Pausing and resuming playback

The `SoundFacade.play()` method shown previously accepts a `pos` parameter
corresponding to a starting position in the sound data. If the `pos` value is
zero, the sound starts playing from the beginning.

The `SoundFacade.stop()` method also accepts a `pos` parameter as shown here:

    public function stop(pos:int = 0):void
    {
    	if (this.isPlaying)
    	{
    		this.pausePosition = pos;
    		this.sc.stop();
    		this.playTimer.stop();
    		this.isPlaying = false;
    	}
    }

Whenever the `SoundFacade.stop()` method is called, it sets the `pausePosition`
property so that the application knows where to position the playhead if the
user wants to resume playback of the same sound.

The `SoundFacade.pause()` and `SoundFacade.resume()` methods shown below invoke
the `SoundFacade.stop()` and `SoundFacade.play()` methods respectively, passing
a `pos` parameter value each time.

    public function pause():void
    {
    	stop(this.sc.position);
    }

    public function resume():void
    {
    	play(this.pausePosition);
    }

The `pause()` method passes the current `SoundChannel.position` value to the
`play()` method, which stores that value in the `pausePosition` property. The
`resume()` method starts playing the same sound again using the `pausePosition`
value as the starting point.

## Extending the Podcast Player example

This example presents a bare-bones Podcast Player that showcases the use of the
reusable SoundFacade class. You could add other features to enhance the
usefulness of this application, including the following:

- Store the list of feeds and usage information about each episode in a
  SharedObject instance that can be used the next time the user runs the
  application.

- Let the user add his or her own RSS feeds to the list of podcast channels.

- Remember the position of the playhead when the user stops or leaves an
  episode, so it can be restarted from that point next time the user runs the
  application.

- Download mp3 files of episodes for listening offline, when the user is not
  connected to the Internet.

- Add subscription features that periodically check for new episodes in a
  podcast channel and update the episode list automatically.

- Add podcast searching and browsing functionality using an API from a podcast
  hosting service like Odeo.com.
