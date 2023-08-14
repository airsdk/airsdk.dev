---
sidebar_position: 8
---

# Security considerations when loading and playing sounds

Your application's ability to access sound data can be limited according to the
Flash Player or AIR security model. Each sound is subject to the restrictions of
two different security sandboxes, the sandbox for the content itself (the
"content sandbox"), and the sandbox for the application or object that loads and
plays the sound (the "owner sandbox"). For AIR application content in the
application security sandbox, all sounds, including those loaded from other
domains, are accessible to content in the application security sandbox. However,
content in other security security sandboxes observe the same rules as content
running in Flash Player. For more information about the Flash Player security
model in general, and the definition of sandboxes, see
[Security](../../security/index.md).

The content sandbox controls whether detailed sound data can be extracted from
the sound using the `id3` property or the `SoundMixer.computeSpectrum()` method.
It doesn't restrict the loading or playing of the sound file itself.

The domain of origin of the sound file defines the security limitations of the
content sandbox. Generally, if a sound file is located in the same domain or
folder as the SWF file of the application or object that loads it, the
application or object will have full access to that sound file. If the sound
comes from a different domain than the application does, it can still be brought
within the content sandbox by using a policy file.

Your application can pass a SoundLoaderContext object with a `checkPolicyFile`
property as a parameter to the `Sound.load()` method. Setting the
`checkPolicyFile` property to `true` tells Flash Player or AIR to look for a
policy file on the server from which the sound is loaded. If a policy file
exists, and it grants access to the domain of the loading SWF file, the SWF file
can load the sound file, access the `id3` property of the Sound object, and call
the `SoundMixer.computeSpectrum()` method for loaded sounds.

The owner sandbox controls local playback of the sounds. The application or
object that starts playing a sound defines the owner sandbox.

The `SoundMixer.stopAll()` method silences the sounds in all SoundChannel
objects that are currently playing, as long as they meet the following criteria:

- The sounds were started by objects within the same owner sandbox.

- The sounds are from a source with a policy file that grants access to the
  domain of the application or object that calls the `SoundMixer.stopAll()`
  method.

However, in an AIR application, content in the application security sandbox
(content installed with the AIR application) are not restricted by these
security limitations.

To find out if the `SoundMixer.stopAll()` method will indeed stop all playing
sounds, your application can call the `SoundMixer.areSoundsInaccessible()`
method. If that method returns a value of `true,` some of the sounds being
played are outside the control of the current owner sandbox and will not be
stopped by the `SoundMixer.stopAll()` method.

The `SoundMixer.stopAll()` method also stops the playhead from continuing for
all sounds that were loaded from external files. However, sounds that are
embedded in FLA files and attached to frames in the timeline using the Flash
Authoring tool might start playing again if the animation moves to a new frame.
