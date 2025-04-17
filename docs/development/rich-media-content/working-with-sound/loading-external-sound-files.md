---
sidebar_position: 3
---

# Loading external sound files

Each instance of the Sound class exists to load and trigger the playback of a
specific sound resource. An application can't reuse a Sound object to load more
than one sound. If it wants to load a new sound resource, it should create a new
Sound object.

If you are loading a small sound file, such as a click sound to be attached to a
button, your application can create a new Sound and have it automatically load
the sound file, as shown below:

```
var req:URLRequest = new URLRequest("click.mp3");
var s:Sound = new Sound(req);
```

The `Sound()` constructor accepts a URLRequest object as its first parameter.
When a value for the URLRequest parameter is supplied, the new Sound object
starts loading the specified sound resource automatically.

In all but the simplest cases, your application should pay attention to the
sound's loading progress and watch for errors during loading. For example, if
the click sound is fairly large, it might not be completely loaded by the time
the user clicks the button that triggers the sound. Trying to play an unloaded
sound could cause a run-time error. It's safer to wait for the sound to load
completely before letting users take actions that might start sounds playing.

A Sound object dispatches a number of different events during the sound loading
process. Your application can listen for these events to track loading progress
and make sure that the sound loads completely before playing. The following
table lists the events that can be dispatched by a Sound object.

| Event                                | Description                                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| open ( `Event.OPEN`)                 | Dispatched right before the sound loading operation begins.                                                                      |
| progress ( `ProgressEvent.PROGRESS`) | Dispatched periodically during the sound loading process when data is received from the file or stream.                          |
| id3 ( `Event.ID3`)                   | Dispatched when ID3 data is available for an mp3 sound.                                                                          |
| complete ( `Event.COMPLETE`)         | Dispatched when all of the sound resource's data has been loaded.                                                                |
| ioError ( `IOErrorEvent.IO_ERROR`)   | Dispatched when a sound file cannot be located or when the loading process is interrupted before all sound data can be received. |

The following code illustrates how to play a sound after it has finished
loading:

```
import flash.events.Event;
import flash.media.Sound;
import flash.net.URLRequest;

var s:Sound = new Sound();
s.addEventListener(Event.COMPLETE, onSoundLoaded);
var req:URLRequest = new URLRequest("bigSound.mp3");
s.load(req);

function onSoundLoaded(event:Event):void
{
	var localSound:Sound = event.target as Sound;
	localSound.play();
}
```

First, the code sample creates a new Sound object without giving it an initial
value for the URLRequest parameter. Then, it listens for the `Event.COMPLETE`
event from the Sound object, which causes the `onSoundLoaded()` method to
execute when all the sound data is loaded. Next, it calls the `Sound.load()`
method with a new URLRequest value for the sound file.

The `onSoundLoaded()` method executes when the sound loading is complete. The
`target` property of the Event object is a reference to the Sound object.
Calling the `play()` method of the Sound object then starts the sound playback.

## Monitoring the sound loading process

Sound files can be very large and take a long time to load. While Flash Player
and AIR let your application play sounds even before they are fully loaded, you
might want to give the user an indication of how much of the sound data has been
loaded and how much of the sound has already been played.

The Sound class dispatches two events that make it relatively easy to display
the loading progress of a sound: `ProgressEvent.PROGRESS` and `Event.COMPLETE`.
The following example shows how to use these events to display progress
information about the sound being loaded:

```
import flash.events.Event;
import flash.events.ProgressEvent;
import flash.media.Sound;
import flash.net.URLRequest;

var s:Sound = new Sound();
s.addEventListener(ProgressEvent.PROGRESS, onLoadProgress);
s.addEventListener(Event.COMPLETE, onLoadComplete);
s.addEventListener(IOErrorEvent.IO_ERROR, onIOError);

var req:URLRequest = new URLRequest("bigSound.mp3");
s.load(req);

function onLoadProgress(event:ProgressEvent):void
{
	var loadedPct:uint =         Math.round(100 * (event.bytesLoaded / event.bytesTotal));
	trace("The sound is " + loadedPct + "% loaded.");
}

function onLoadComplete(event:Event):void
{
	var localSound:Sound = event.target as Sound;
	localSound.play();
}
function onIOError(event:IOErrorEvent)
{
	trace("The sound could not be loaded: " + event.text);
}
```

This code first creates a Sound object and then adds listeners to that object
for the `ProgressEvent.PROGRESS` and `Event.COMPLETE` events. After the
`Sound.load()` method has been called and the first data is received from the
sound file, a `ProgressEvent.PROGRESS` event occurs and triggers the
`onSoundLoadProgress()` method.

The percentage of the sound data that has been loaded is equal to the value of
the `bytesLoaded` property of the ProgressEvent object divided by the value of
the `bytesTotal` property. The same `bytesLoaded` and `bytesTotal` properties
are available on the Sound object as well. The example above simply shows
messages about the sound loading progress, but you can easily use the
`bytesLoaded` and `bytesTotal` values to update progress bar components, such as
the ones that come with the Adobe Flex framework or the Adobe Flash authoring
tool.

This example also shows how an application can recognize and respond to an error
when loading sound files. For example, if a sound file with the given filename
cannot be located, an `Event.IO_ERROR` event is dispatched by the Sound object.
In the previous code, the `onIOError()` method executes and displays a brief
error message when an error occurs.
