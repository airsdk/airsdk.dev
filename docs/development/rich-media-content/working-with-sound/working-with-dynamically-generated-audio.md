---
sidebar_position: 6
---

# Working with dynamically generated audio

Note: The ability to dynamically generate audio is available starting with Flash
Player 10 and Adobe AIR 1.5.

Instead of loading or streaming an existing sound, you can generate audio data
dynamically. You can generate audio data when you assign an event listener for
the `sampleData` event of a Sound object. (The `sampleData` event is defined in
the SampleDataEvent class in the flash.events package.) In this environment, the
Sound object doesn't load sound data from a file. Instead, it acts as a socket
for sound data that is being streamed to it through the use of the function you
assign to this event.

When you add a `sampleData` event listener to a Sound object, the object
periodically requests data to add to the sound buffer. This buffer contains data
for the Sound object to play. When you call the `play()` method of the Sound
object, it dispatches the `sampleData` event when requesting new sound data.
(This is true only when the Sound object has not loaded mp3 data from a file.)

The SampleDataEvent object includes a `data` property. In your event listener,
you write ByteArray objects to this `data` object. The byte arrays you write to
this object add to buffered sound data that the Sound object plays. The byte
array in the buffer is a stream of floating-point values from -1 to 1. Each
floating-point value represents the amplitude of one channel (left or right) of
a sound sample. Sound is sampled at 44,100 samples per second. Each sample
contains a left and right channel, interleaved as floating-point data in the
byte array.

In your handler function, you use the `ByteArray.writeFloat()` method to write
to the `data` property of the `sampleData` event. For example, the following
code generates a sine wave:

```
var mySound:Sound = new Sound();
mySound.addEventListener(SampleDataEvent.SAMPLE_DATA, sineWaveGenerator);
mySound.play();
function sineWaveGenerator(event:SampleDataEvent):void
{
	for (var i:int = 0; i < 8192; i++)
	{
		var n:Number = Math.sin((i + event.position) / Math.PI / 4);
		event.data.writeFloat(n);
		event.data.writeFloat(n);
	}
}
```

When you call `Sound.play()`, the application starts calling your event handler,
requesting sound sample data. The application continues to send events as the
sound plays back until you stop providing data, or until you call
`SoundChannel.stop()`.

The latency of the event varies from platform to platform, and could change in
future versions of Flash Player and AIR. Do not depend on a specific latency;
calculate it instead. To calculate the latency, use the following formula:

```
(SampleDataEvent.position / 44.1) - SoundChannelObject.position
```

Provide from 2048 through 8192 samples to the `data` property of the
SampleDataEvent object (for each call to the event listener). For best
performance, provide as many samples as possible (up to 8192). The fewer samples
you provide, the more likely it is that clicks and pops will occur during
playback. This behavior can differ on various platforms and can occur in various
situations—for example, when resizing the browser. Code that works on one
platform when you provide only 2048 sample might not work as well when run on a
different platform. If you require the lowest latency possible, consider making
the amount of data user-selectable.

If you provide fewer than 2048 samples (per call to the `sampleData` event
listener), the application stops after playing the remaining samples. The
SoundChannel object then dispatches a SoundComplete event.

## Modifying sound from mp3 data

You use the `Sound.extract()` method to extract data from a Sound object. You
can use (and modify) that data to write to the dynamic stream of another Sound
object for playback. For example, the following code uses the bytes of a loaded
MP3 file and passes them through a filter function, `upOctave()`:

```
var mySound:Sound = new Sound();
var sourceSnd:Sound = new Sound();
var urlReq:URLRequest = new URLRequest("test.mp3");
sourceSnd.load(urlReq);
sourceSnd.addEventListener(Event.COMPLETE, loaded);
function loaded(event:Event):void
{
	mySound.addEventListener(SampleDataEvent.SAMPLE_DATA, processSound);
	mySound.play();
}
function processSound(event:SampleDataEvent):void
{
```

        var bytes:ByteArray = new ByteArray();
        sourceSnd.extract(bytes, 8192);
        event.data.writeBytes(upOctave(bytes));
```
}
function upOctave(bytes:ByteArray):ByteArray
{
	var returnBytes:ByteArray = new ByteArray();
	bytes.position = 0;
	while(bytes.bytesAvailable > 0)
	{
		returnBytes.writeFloat(bytes.readFloat());
		returnBytes.writeFloat(bytes.readFloat());
		if (bytes.bytesAvailable > 0)
		{
			bytes.position += 8;
		}
	}
	return returnBytes;
}
```

## Limitations on generated sounds

When you use a `sampleData` event listener with a Sound object, the only other
Sound methods that are enabled are `Sound.extract()` and `Sound.play()`. Calling
any other methods or properties results in an exception. All methods and
properties of the SoundChannel object are still enabled.
