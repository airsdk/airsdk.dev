---
sidebar_position: 2
---

# Understanding the sound architecture

Your applications can load sound data from five main sources:

- External sound files loaded at run time

- Sound resources embedded within the application's SWF file

- Sound data from a microphone attached to the user's system

- Sound data streamed from a remote media server, such as Flash Media Server

- Sound data being generated dynamically through the use of the `sampleData`
  event handler

Sound data can be fully loaded before it is played back, or it can be streamed,
meaning that it is played back while it is still loading.

The ActionScript 3.0 sound classes support sound files that are stored in the
mp3 format. They cannot directly load or play sound files in other formats, such
as WAV or AIFF. However, starting with Flash Player 9.0.115.0, AAC audio files
can be loaded and played using the NetStream class. This is the same technique
as is used for loading and playing video content. For more information on this
technique, see [Working with video](../working-with-video/index.md).

Using Adobe Flash Professional, you can import WAV or AIFF sound files and then
embed them into your application's SWF files in the mp3 format. The Flash
Authoring tool also lets you compress embedded sound files to reduce their file
size, though this size reduction comes at the expense of sound quality. For more
information see "Importing Sounds" in _Using Flash_.

The ActionScript 3.0 sound architecture makes use of the following classes in
the flash.media package.

| Class                          | Description                                                                                                                                                                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| flash.media.Sound              | The Sound class handles the loading of sound, manages basic sound properties, and starts a sound playing.                                                                                                                                                                                                      |
| flash.media.SoundChannel       | When an application plays a Sound object, a new SoundChannel object is created to control the playback. The SoundChannel object controls the volume of both the left and right playback channels of the sound. Each sound that plays has its own SoundChannel object.                                          |
| flash.media.SoundLoaderContext | The SoundLoaderContext class specifies how many seconds of buffering to use when loading a sound, and whether Flash Player or AIR looks for a policy file from the server when loading a file. A SoundLoaderContext object is used as a parameter to the `Sound.load()` method.                                |
| flash.media.SoundMixer         | The SoundMixer class controls playback and security properties that pertain to all sounds in an application. In effect, multiple sound channels are mixed through a common SoundMixer object, so property values in the SoundMixer object will affect all SoundChannel objects that are currently playing.     |
| flash.media.SoundTransform     | The SoundTransform class contains values that control sound volume and panning. A SoundTransform object can be applied to an individual SoundChannel object, to the global SoundMixer object, or to a Microphone object, among others.                                                                         |
| flash.media.ID3Info            | An ID3Info object contains properties that represent ID3 metadata information that is often stored in mp3 sound files.                                                                                                                                                                                         |
| flash.media.Microphone         | The Microphone class represents a microphone or other sound input device attached to the user's computer. Audio input from a microphone can be routed to local speakers or sent to a remote server. The Microphone object controls the gain, sampling rate, and other characteristics of its own sound stream. |
| flash.media.AudioPlaybackMode  | The AudioPlaybackMode class defines constants for the `audioPlaybackMode` property of the SoundMixer class.                                                                                                                                                                                                    |

Each sound that is loaded and played needs its own instance of the Sound class
and the SoundChannel class. The output from multiple SoundChannel instances is
then mixed together by the global SoundMixer class during playback,

The Sound, SoundChannel, and SoundMixer classes are not used for sound data
obtained from a microphone or from a streaming media server like Flash Media
Server.
