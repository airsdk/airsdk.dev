---
sidebar_position: 9
---

# Accessing loaded media as data

To access load data use the `BitmapData.draw()`, `BitmapData.drawWithQuality()`,
and `SoundMixer.computeSpectrum()` methods. By default, you cannot obtain pixel
data or audio data from graphic or audio objects rendered or played by media
loaded in a different sandbox. However, you can use the following methods to
grant permission to access such data across sandbox boundaries:

- In the content rendering or playing the data to be accessed, call the
  `Security.allowDomain()` method to grant data access to content in other
  domains.

- For a loaded image, sound, or video, add a URL policy file on the server of
  the loaded file. This policy file must grant access to the domain of the SWF
  file that is attempting to call the `BitmapData.draw()`,
  `BitmapData.drawWithQuality()`, or `SoundMixer.computeSpectrum()` methods to
  extract data from the file. The `drawWithQuality` method is available in Flash
  Player 11.3 and higher; AIR 3.3 and higher.

The following sections provide details on accessing bitmap, sound, and video
data.

## Accessing bitmap data

The `draw()` and `drawWithQuality()` (Flash Player 11.3; AIR 3.3) methods of a
BitmapData object lets you draw the currently displayed pixels of any display
object to the BitmapData object. This could include the pixels of a MovieClip
object, a Bitmap object, or any display object. The following conditions must be
met for these methods to draw pixels to the BitmapData object:

- In the case of a source object other than a loaded bitmap, the source object
  and (in the case of a Sprite or MovieClip object) all of its child objects
  must come from the same domain as the object calling the draw method, or they
  must be in a SWF file that is accessible to the caller by having called the
  `Security.allowDomain()` method.

- In the case of a Loaded bitmap source object, the source object must come from
  the same domain as the object calling the draw method, or its source server
  must include a URL policy file that grants permission to the calling domain.

If these conditions are not met, a SecurityError exception is thrown.

When you load the image using the `load()` method of the Loader class, you can
specify a `context` parameter, which is a LoaderContext object. If you set the
`checkPolicyFile` property of the LoaderContext object to `true`, Flash Player
checks for a URL policy file on the server from which the image is loaded. If
there is a policy file, and the file permits the domain of the loading SWF file,
the file is allowed to access data in the Bitmap object; otherwise, access is
denied.

You can also specify a `checkPolicyFile` property in an image loaded via an
`<img>` tag in a text field. For details, see
[Loading SWF files and images using the \<img\> tag in a text field](./loading-content.md#loading-swf-files-and-images-using-the-img-tag-in-a-text-field).

## Accessing sound data

The following sound-related ActionScript 3.0 APIs have security restrictions:

- The `SoundMixer.computeSpectrum()` method—Always permitted for code running in
  the same security sandbox as the sound file. For code running in other
  sandboxes, there are security checks.

- The `SoundMixer.stopAll()` method—Always permitted for code running in the
  same security sandbox as the sound file. For files in other sandboxes, there
  are security checks.

- The `id3` property of the Sound class—Always permitted for SWF files that are
  in the same security sandbox as the sound file. For code running in other
  sandboxes, there are security checks.

Every sound has two kinds of sandboxes associated with it—a content sandbox and
an owner sandbox:

- The origin domain for the sound determines the content sandbox, and this
  determines whether data can be extracted from the sound via the `id3` property
  of the sound and the `SoundMixer.computeSpectrum()` method.

- The object that started the sound playing determines the owner sandbox, and
  this determines whether the sound can be stopped using the
  `SoundMixer.stopAll()` method.

When you load the sound using the `load()` method of the Sound class, you can
specify a `context` parameter, which is a SoundLoaderContext object. If you set
the `checkPolicyFile` property of the SoundLoaderContext object to `true`, the
runtime checks for a URL policy file on the server from which the sound is
loaded. If there is a policy file, and the file permits the domain of the
loading code, the code is allowed to access the `id` property of the Sound
object; otherwise, it will not. Also, setting the `checkPolicyFile` property can
enable the `SoundMixer.computeSpectrum()` method for loaded sounds.

You can use the `SoundMixer.areSoundsInaccessible()` method to find out whether
a call to the `SoundMixer.stopAll()` method would not stop all sounds because
the sandbox of one or more sound owners is inaccessible to the caller.

Calling the `SoundMixer.stopAll()` method stops those sounds whose owner sandbox
is the same as that of the caller of `stopAll()`. It also stops those sounds
whose playback was started by SWF files that have called the
`Security.allowDomain()` method to permit access by the domain of the SWF file
calling the `stopAll()` method. Any other sounds are not stopped, and the
presence of such sounds can be revealed by calling the
`SoundMixer.areSoundsInaccessible()` method.

Calling the `computeSpectrum()` method requires that every sound that is playing
be either from the same sandbox as the object calling the method or from a
source that has granted permission to the caller's sandbox; otherwise, a
SecurityError exception is thrown. For sounds that were loaded from embedded
sounds in a library in a SWF file, permission is granted with a call to the
`Security.allowDomain()` method in the loaded SWF file. For sounds loaded from
sources other than SWF files (originating from loaded mp3 files or from video
files), a URL policy file on the source server grants access to data in loaded
media.

For more information, see
[Author (developer) controls](./permission-controls.md#author-developer-controls)
and
[Website controls (policy files)](./permission-controls.md#website-controls-policy-files).

To access sound data from RTMP streams, you must allow access on the server. Use
the Server-Side ActionScript `Client.audioSampleAccess` property to allow access
to specific directories on Flash Media Server. For more information, see the
[Server-Side ActionScript Language Reference](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).

## Accessing video data

You can use the `BitmapData.draw()` or `BitmapData.drawWithQuality()` method to
capture the pixel data of the current frame of a video. (The `drawWithQuality`
method is available in Flash Player 11.3 and higher; AIR 3.3 and higher.)

There are two different kinds of video:

- Video streamed over RTMP from Flash Media Server

- Progressive video, which is loaded from an FLV or F4V file

To use the draw methods to extract run-time graphics from RTMP streams, you must
allow access on the server. Use the Server-Side ActionScript
`Client.videoSampleAccess` property to allow access to specific directories on
Flash Media Server. For more information, see the
[Server-Side ActionScript Language Reference](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).

When you call a draw method with progressive video as the `source` parameter,
the caller of the method must either be from the same sandbox as the FLV file,
or the server of the FLV file must have a policy file that grants permission to
the domain of the calling SWF file. You can request that the policy file be
downloaded by setting the `checkPolicyFile` property of the NetStream object to
`true`.
