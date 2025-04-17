---
sidebar_position: 10
---

# Working with sound metadata

Sound files that use the mp3 format can contain additional data about the sound
in the form of ID3 tags.

Not every mp3 file contains ID3 metadata. When a Sound object loads an mp3 sound
file, it dispatches an `Event.ID3` event if the sound file contains ID3
metadata. To prevent run-time errors, your application should wait to receive
the `Event.ID3` event before accessing the `Sound.id3` property for a loaded
sound.

The following code shows how to recognize when the ID3 metadata for a sound file
has been loaded:

```
import flash.events.Event;
import flash.media.ID3Info;
import flash.media.Sound;

var s:Sound = new Sound();
s.addEventListener(Event.ID3, onID3InfoReceived);
s.load("mySound.mp3");

function onID3InfoReceived(event:Event)
{
	var id3:ID3Info = event.target.id3;

	trace("Received ID3 Info:");
	for (var propName:String in id3)
	{
		trace(propName + " = " + id3[propName]);
	}
}
```

This code starts by creating a Sound object and telling it to listen for the
`Event.ID3` event. When the sound file's ID3 metadata is loaded, the
`onID3InfoReceived()` method is called. The target of the Event object that is
passed to the `onID3InfoReceived()` method is the original Sound object, so the
method then gets the Sound object's `id3` property and then iterates through all
of its named properties to trace their values.
