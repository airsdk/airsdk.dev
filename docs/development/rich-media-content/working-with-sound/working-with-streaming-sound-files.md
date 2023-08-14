---
sidebar_position: 5
---

# Working with streaming sound files

When a sound file or video file is playing back while its data is still being
loaded, it is said to be _streaming_. External sound files that are loaded from
a remote server are often streamed so that the user doesn't have to wait for all
the sound data to load before listening to the sound.

The `SoundMixer.bufferTime` property represents the number of milliseconds of
sound data that Flash Player or AIR should gather before letting the sound play.
In other words, if the `bufferTime` property is set to 5000, Flash Player or AIR
loads at least 5000 milliseconds worth of data from the sound file before the
sound begins to play. The default `SoundMixer.bufferTime` value is 1000.

Your application can override the global `SoundMixer.bufferTime` value for an
individual sound by explicitly specifying a new `bufferTime` value when loading
the sound. To override the default buffer time, first create a new instance of
the SoundLoaderContext class, set its `bufferTime` property, and then pass it as
a parameter to the `Sound.load()` method, as shown below:

    import flash.media.Sound;
    import flash.media.SoundLoaderContext;
    import flash.net.URLRequest;

    var s:Sound = new Sound();
    var req:URLRequest = new URLRequest("bigSound.mp3");
    var context:SoundLoaderContext = new SoundLoaderContext(8000, true);
    s.load(req, context);
    s.play();

As playback continues, Flash Player and AIR try to keep the sound buffer at the
same size or greater. If the sound data loads faster than the playback speed,
playback will continue without interruption. However, if the data loading rate
slows down because of network limitations, the playhead could reach the end of
the sound buffer. If this happens, playback is suspended, though it
automatically resumes once more sound data has been loaded.

To find out if playback is suspended because Flash Player or AIR is waiting for
data to load, use the `Sound.isBuffering` property.
