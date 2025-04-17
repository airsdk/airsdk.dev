---
sidebar_position: 9
---

# Controlling sound volume and panning

An individual SoundChannel object controls both the left and the right stereo
channels for a sound. If an mp3 sound is a monaural sound, the left and right
stereo channels of the SoundChannel object will contain identical waveforms.

You can find out the amplitude of each stereo channel of the sound being played
using the `leftPeak` and `rightPeak` properties of the SoundChannel object.
These properties show the peak amplitude of the sound waveform itself. They do
not represent the actual playback volume. The actual playback volume is a
function of the amplitude of the sound wave and the volume values set in the
SoundChannel object and the SoundMixer class.

The pan property of a SoundChannel object can be used to specify a different
volume level for each of the left and right channels during playback. The pan
property can have a value ranging from -1 to 1, where -1 means the left channel
plays at top volume while the right channel is silent, and 1 means the right
channel plays at top volume while the left channel is silent. Numeric values in
between -1 and 1 set proportional values for the left and right channel values,
and a value of 0 means that both channels play at a balanced, mid-volume level.

The following code example creates a SoundTransform object with a volume value
of 0.6 and a pan value of -1 (top left channel volume and no right channel
volume). It passes the SoundTransform object as a parameter to the `play()`
method, which applies that SoundTransform object to the new SoundChannel object
that is created to control the playback.

```
var snd:Sound = new Sound(new URLRequest("bigSound.mp3"));
var trans:SoundTransform = new SoundTransform(0.6, -1);
var channel:SoundChannel = snd.play(0, 1, trans);
```

You can alter the volume and panning while a sound is playing by setting the
`pan` or `volume` properties of a SoundTransform object and then applying that
object as the `soundTransform` property of a SoundChannel object.

You can also set global volume and pan values for all sounds at once using the
`soundTransform` property of the SoundMixer class, as the following example
shows:

```
SoundMixer.soundTransform = new SoundTransform(1, -1);
```

You can also use a SoundTransform object to set volume and pan values for a
Microphone object (see [Capturing sound input](./capturing-sound-input.md)) and
for Sprite objects and SimpleButton objects.

The following example alternates the panning of the sound from the left channel
to the right channel and back while the sound plays.

```
import flash.events.Event;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.media.SoundMixer;
import flash.net.URLRequest;

var snd:Sound = new Sound();
var req:URLRequest = new URLRequest("bigSound.mp3");
snd.load(req);

var panCounter:Number = 0;

var trans:SoundTransform;
trans = new SoundTransform(1, 0);
var channel:SoundChannel = snd.play(0, 1, trans);
channel.addEventListener(Event.SOUND_COMPLETE, onPlaybackComplete);

addEventListener(Event.ENTER_FRAME, onEnterFrame);

function onEnterFrame(event:Event):void
{
	trans.pan = Math.sin(panCounter);
	channel.soundTransform = trans; // or SoundMixer.soundTransform = trans;
	panCounter += 0.05;
}

function onPlaybackComplete(event:Event):void
{
	removeEventListener(Event.ENTER_FRAME, onEnterFrame);
}
```

This code starts by loading a sound file and then creating a new SoundTransform
object with volume set to 1 (full volume) and pan set to 0 (evenly balanced
between left and right). Then it calls the `snd.play()` method, passing the
SoundTransform object as a parameter.

While the sound plays, the `onEnterFrame()` method executes repeatedly. The
`onEnterFrame()` method uses the `Math.sin()` function to generate a value
between -1 and 1, a range that corresponds to the acceptable values of the
`SoundTransform.pan` property. The SoundTransform object's `pan` property is set
to the new value, and then the channel's `soundTransform` property is set to use
the altered SoundTransform object.

To run this example, replace the filename bigSound.mp3 with the name of a local
mp3 file. Then run the example. You should hear the left channel volume getting
louder while the right channel volume gets softer, and vice versa.

In this example, the same effect could be achieved by setting the
`soundTransform` property of the SoundMixer class. However, that would affect
the panning of all sounds currently playing, not just the single sound being
played by this SoundChannel object.
