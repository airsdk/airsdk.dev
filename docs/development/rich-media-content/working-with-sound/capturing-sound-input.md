---
sidebar_position: 12
---

# Capturing sound input

The Microphone class lets your application connect to a microphone or other
sound input device on the user's system and broadcast the input audio to that
system's speakers or send the audio data to a remote server, such as Flash Media
Server. You can access the raw audio data from the microphone and record or
process it; you can also send the audio directly to the system's speakers or
send compressed audio data to a remote server. You can use either Speex or
Nellymoser codec for data sent to a remote server. (The Speex codec is supported
starting with Flash Player 10 and Adobe AIR 1.5.)

## Accessing a microphone

The Microphone class does not have a constructor method. Instead, you use the
static `Microphone.getMicrophone()` method to obtain a new Microphone instance,
as shown below:

    var mic:Microphone = Microphone.getMicrophone();

Calling the `Microphone.getMicrophone()` method without a parameter returns the
first sound input device discovered on the user's system.

A system can have more than one sound input device attached to it. Your
application can use the `Microphone.names` property to get an array of the names
of all available sound input devices. Then it can call the
`Microphone.getMicrophone()` method with an `index` parameter that matches the
index value of a device's name in the array.

A system might not have a microphone or other sound input device attached to it.
You can use the `Microphone.names` property or the `Microphone.getMicrophone()`
method to check whether the user has a sound input device installed. If the user
doesn't have a sound input device installed, the `names` array has a length of
zero, and the `getMicrophone()` method returns a value of `null`.

When your application calls the `Microphone.getMicrophone()` method, Flash
Player displays the Flash Player Settings dialog box, which prompts the user to
either allow or deny Flash Player access to the camera and microphone on the
system. After the user clicks on either the Allow button or the Deny button in
this dialog, a StatusEvent is dispatched. The `code` property of that
StatusEvent instance indicates whether microphone access was allowed or denied,
as shown in this example:

    import flash.media.Microphone;

    var mic:Microphone = Microphone.getMicrophone();
    mic.addEventListener(StatusEvent.STATUS, this.onMicStatus);

    function onMicStatus(event:StatusEvent):void
    {
    	if (event.code == "Microphone.Unmuted")
    	{
    		trace("Microphone access was allowed.");
    	}
    	else if (event.code == "Microphone.Muted")
    	{
    		trace("Microphone access was denied.");
    	}
    }

The `StatusEvent.code` property will contain "Microphone.Unmuted" if access was
allowed, or "Microphone.Muted" if access was denied.

The `Microphone.muted` property is set to `true` or `false` when the user allows
or denies microphone access, respectively. However, the `muted` property is not
set on the Microphone instance until the StatusEvent has been dispatched, so
your application should also wait for the `StatusEvent.STATUS` event to be
dispatched before checking the `Microphone.muted` property.

In order for Flash Player to display the settings dialog, the application window
must be large enough to display it (at least 215 by 138 pixels). Otherwise,
access is denied automatically.

Content running in the AIR application sandbox does not need the permission of
the user to access the microphone. Thus, status events for muting and unmuting
the microphone are never dispatched. Content running in AIR outside the
application sandbox does require permission from the user, so these status
events can be dispatched.

## Routing microphone audio to local speakers

Audio input from a microphone can be routed to the local system speakers by
calling the `Microphone.setLoopback()` method with a parameter value of `true`.

When sound from a local microphone is routed to local speakers, there is a risk
of creating an audio feedback loop, which can cause loud squealing sounds and
can potentially damage sound hardware. Calling the
`Microphone.setUseEchoSuppression()` method with a parameter value of `true`
reduces, but does not completely eliminate, the risk that audio feedback will
occur. Adobe recommends you always call `Microphone.setUseEchoSuppression(true)`
before calling `Microphone.setLoopback(true)`, unless you are certain that the
user is playing back the sound using headphones or something other than
speakers.

The following code shows how to route the audio from a local microphone to the
local system speakers:

    var mic:Microphone = Microphone.getMicrophone();
    mic.setUseEchoSuppression(true);
    mic.setLoopBack(true);

## Altering microphone audio

Your application can alter the audio data that comes from a microphone in two
ways. First, it can change the gain of the input sound, which effectively
multiplies the input values by a specified amount to create a louder or quieter
sound. The `Microphone.gain` property accepts numeric values between 0 and 100
inclusive. A value of 50 acts like a multiplier of one and specifies normal
volume. A value of zero acts like a multiplier of zero and effectively silences
the input audio. Values above 50 specify higher than normal volume.

Your application can also change the sample rate of the input audio. Higher
sample rates increase sound quality, but they also create denser data streams
that use more resources for transmission and storage. The `Microphone.rate`
property represents the audio sample rate measured in kilohertz (kHz). The
default sample rate is 8 kHz. You can set the `Microphone.rate` property to a
value higher than 8 kHz if your microphone supports the higher rate. For
example, setting the `Microphone.rate` property to a value of 11 sets the sample
rate to 11 kHz; setting it to 22 sets the sample rate to 22 kHz, and so on. The
sample rates available depend on the selected codec. When you use the Nellymoser
codec, you can specify 5, 8, 11, 16, 22 and 44 kHz as the sample rate. When you
use Speex codec (available starting in Flash Player 10 and Adobe AIR 1.5), you
can only use 16 kHz.

## Detecting microphone activity

To conserve bandwidth and processing resources, Flash Player tries to detect
when no sound is being transmitted by a microphone. When the microphone's
activity level stays below the silence level threshold for a period of time,
Flash Player stops transmitting the audio input and dispatches a simple
ActivityEvent instead. If you use the Speex codec (available in Flash Player 10
or later and Adobe AIR 1.5 or later), set the silence level to 0, to ensure that
the application continuously transmits audio data. Speex voice activity
detection automatically reduces bandwidth.

Note: A Microphone object only dispatches Activity events when your application
is monitoring the microphone. Thus, if you do not call `setLoopBack( true )`,
add a listener for sample data events, or attach the microphone to a NetStream
object, then no activity events are dispatched.

Three properties of the Microphone class monitor and control the detection of
activity:

- The read-only `activityLevel` property indicates the amount of sound the
  microphone is detecting, on a scale from 0 to 100.

- The `silenceLevel` property specifies the amount of sound needed to activate
  the microphone and dispatch an `ActivityEvent.ACTIVITY` event. The
  `silenceLevel` property also uses a scale from 0 to 100, and the default value
  is 10.

- The `silenceTimeout` property describes the number of milliseconds that the
  activity level must stay below the silence level, until an
  `ActivityEvent.ACTIVITY` event is dispatched to indicate that the microphone
  is now silent. The default `silenceTimeout` value is 2000.

Both the `Microphone.silenceLevel` property and the `Microphone.silenceTimeout`
property are read only, but their values can be changed by using the
`Microphone.setSilenceLevel()` method.

In some cases, the process of activating the microphone when new activity is
detected can cause a short delay. Keeping the microphone active at all times can
remove such activation delays. Your application can call the
`Microphone.setSilenceLevel()` method with the `silenceLevel` parameter set to
zero to tell Flash Player to keep the microphone active and keep gathering audio
data, even when no sound is being detected. Conversely, setting the
`silenceLevel` parameter to 100 prevents the microphone from being activated at
all.

The following example displays information about the microphone and reports on
activity events and status events dispatched by a Microphone object:

    import flash.events.ActivityEvent;
    import flash.events.StatusEvent;
    import flash.media.Microphone;

    var deviceArray:Array = Microphone.names;
    trace("Available sound input devices:");
    for (var i:int = 0; i < deviceArray.length; i++)
    {
    	trace(" " + deviceArray[i]);
    }

    var mic:Microphone = Microphone.getMicrophone();
    mic.gain = 60;
    mic.rate = 11;
    mic.setUseEchoSuppression(true);
    mic.setLoopBack(true);
    mic.setSilenceLevel(5, 1000);

    mic.addEventListener(ActivityEvent.ACTIVITY, this.onMicActivity);
    mic.addEventListener(StatusEvent.STATUS, this.onMicStatus);

    var micDetails:String = "Sound input device name: " + mic.name + '\n';
    micDetails += "Gain: " + mic.gain + '\n';
    micDetails += "Rate: " + mic.rate + " kHz" + '\n';
    micDetails += "Muted: " + mic.muted + '\n';
    micDetails += "Silence level: " + mic.silenceLevel + '\n';
    micDetails += "Silence timeout: " + mic.silenceTimeout + '\n';
    micDetails += "Echo suppression: " + mic.useEchoSuppression + '\n';
    trace(micDetails);

    function onMicActivity(event:ActivityEvent):void
    {
    	trace("activating=" + event.activating + ", activityLevel=" +
    		mic.activityLevel);
    }

    function onMicStatus(event:StatusEvent):void
    {
    	trace("status: level=" + event.level + ", code=" + event.code);
    }

When you run the above example, speak or makes noises into your system
microphone and watch the resulting trace statements appear in a console or debug
window.

## Sending audio to and from a media server

Additional audio capabilities are available when using ActionScript with a
streaming media server such as Flash Media Server.

In particular, your application can attach a Microphone object to a NetStream
object and transmit data directly from the user's microphone to the server.
Audio data can also be streamed from the server to an application and played
back as part of a MovieClip or by using a Video object.

The Speex codec is available starting with Flash Player 10 and Adobe AIR 1.5. To
set the codec used for compressed audio sent to the media server, set the
`codec` property of the Microphone object. This property can have two values,
which are enumerated in the SoundCodec class. Setting the codec property to
`SoundCodec.SPEEX` selects the Speex codec for compressing audio. Setting the
property to `SoundCodec.NELLYMOSER` (the default) selects the Nellymoser codec
for compressing audio.

For more information, see the Flash Media Server documentation online at
[www.adobe.com/go/learn_fms_docs_en](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).

## Capturing microphone sound data

In Flash Player 10.1 and AIR 2, or later, you can capture data from a microphone
data as a byte array of floating point values. Each value represents a sample of
monophonic audio data.

To get microphone data, set an event listener for the `sampleData` event of the
Microphone object. The Microphone object dispatches `sampleData` events
periodically as the microphone buffer is filled with sound samples. The
SampleDataEvent object has a `data` property that is a byte array of sound
samples. The samples are each represented as floating point values, each
representing a monophonic sound sample.

The following code captures microphone sound data into a ByteArray object named
`soundBytes`:

    var mic:Microphone = Microphone.getMicrophone();
    mic.setSilenceLevel(0, DELAY_LENGTH);
    mic.addEventListener(SampleDataEvent.SAMPLE_DATA, micSampleDataHandler);
    function micSampleDataHandler(event:SampleDataEvent):void {
    	while(event.data.bytesAvailable) {
    		var sample:Number = event.data.readFloat();
    		soundBytes.writeFloat(sample);
    	}
    }

You can reuse the sample bytes as playback audio for a Sound object. If you do,
you should set the `rate` property of the Microphone object to 44, which is the
sample rate used by Sound objects. (You can also convert microphone samples
captured at a lower rate to 44 kHz rate required by the Sound object.) Also,
keep in mind that the Microphone object captures monophonic samples, whereas the
Sound object uses stereo sound; so you should write each of the bytes captured
by the Microphone object to the Sound object twice. The following example
captures 4 seconds of microphone data and plays it back using a Sound object:

    const DELAY_LENGTH:int = 4000;
    var mic:Microphone = Microphone.getMicrophone();
    mic.setSilenceLevel(0, DELAY_LENGTH);
    mic.gain = 100;
    mic.rate = 44;
    mic.addEventListener(SampleDataEvent.SAMPLE_DATA, micSampleDataHandler);

    var timer:Timer = new Timer(DELAY_LENGTH);
    timer.addEventListener(TimerEvent.TIMER, timerHandler);
    timer.start();

    function micSampleDataHandler(event:SampleDataEvent):void
    {
    	while(event.data.bytesAvailable)
    	{
    		var sample:Number = event.data.readFloat();
    		soundBytes.writeFloat(sample);
    	}
    }
    var sound:Sound = new Sound();
    var channel:SoundChannel;
    function timerHandler(event:TimerEvent):void
    {
    	mic.removeEventListener(SampleDataEvent.SAMPLE_DATA, micSampleDataHandler);
    	timer.stop();
    	soundBytes.position = 0;
    	sound.addEventListener(SampleDataEvent.SAMPLE_DATA, playbackSampleHandler);
    	channel.addEventListener( Event.SOUND_COMPLETE, playbackComplete );
    	channel = sound.play();
    }

    function playbackSampleHandler(event:SampleDataEvent):void
    {
    	for (var i:int = 0; i < 8192 && soundBytes.bytesAvailable > 0; i++)
    	{
    		trace(sample);
    		var sample:Number = soundBytes.readFloat();
    		event.data.writeFloat(sample);
    		event.data.writeFloat(sample);
    	}
    }

    function playbackComplete( event:Event ):void
    {
    	trace( "Playback finished.");
    }

For more information on playing back sounds from sound sample data, see
[Working with dynamically generated audio](./working-with-dynamically-generated-audio.md).

More Help topics

[Michael Chaize: AIR, Android, and the Microphone](https://web.archive.org/web/20150120163947/http://www.riagora.com/2010/08/air-android-and-the-microphone/)

[Christophe Coenraets: Voice Notes for Android](https://web.archive.org/web/20120913011517/http://coenraets.org/blog/air-for-android-samples/voice-notes-for-android/)
