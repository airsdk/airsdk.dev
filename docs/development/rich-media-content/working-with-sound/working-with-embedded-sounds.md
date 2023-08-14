---
sidebar_position: 4
---

# Working with embedded sounds

Using embedded sounds, instead of loading sound from an external file, is most
useful for small sounds that are used as indicators within your application's
user interface, such as sounds that play when buttons are clicked.

When you embed a sound file in your application, the size of the resulting SWF
file increases by the size of the sound file. In other words, embedding large
sound files in your application can increase the size of your SWF file to an
undesirable size.

The exact method of embedding a sound file into your application's SWF file
varies according to your development environment.

## Using an embedded sound file in Flash

The Flash authoring tool lets you import sounds in a number of sound formats and
store them as symbols in the Library. You can then assign them to frames in the
timeline or to the frames of a button state, use them with Behaviors, or use
them directly in ActionScript code. This section describes how to use embedded
sounds in ActionScript code with the Flash authoring tool. For information about
the other ways to use embedded sounds in Flash, see "Importing Sounds" in _Using
Flash_.

#### To embed a sound file using the Flash authoring tool:

1.  Select File \> Import \> Import to Library, and then select a sound file and
    import it.

2.  Right-click the name of the imported file in the Library panel, and select
    Properties. Click the Export for ActionScript checkbox.

3.  In the Class field, enter a name to use when referring to this embedded
    sound in ActionScript. By default, it will use the name of the sound file in
    this field. If the filename includes a period, as in the name
    "DrumSound.mp3", you must change it to something like "DrumSound";
    ActionScript does not allow a period character in a class name. The Base
    Class field should still show flash.media.Sound.

4.  Click OK. You might see a dialog box saying that a definition for this class
    could not be found in the classpath. Click OK and continue. If you entered a
    class name that doesn't match the name of any of the classes in your
    application's classpath, a new class that inherits from the
    flash.media.Sound class is automatically generated for you.

5.  To use the embedded sound, you reference the class name for that sound in
    ActionScript. For example, the following code starts by creating a new
    instance of the automatically generated DrumSound class:

        var drum:DrumSound = new DrumSound();
        var channel:SoundChannel = drum.play();

    DrumSound is a subclass of the flash.media.Sound class so it inherits the
    Sound class's methods and properties, including the `play()` method as shown
    above.

## Using an embedded sound file in Flex

There are many ways to embed sound assets in a Flex application, including:

- Using the `[Embed]` metadata tag in a script

- Using the `@Embed` directive in MXML to assign an embedded asset as a property
  of a component like a Button or a SoundEffect.

- Using the `@Embed` directive within a CSS file

This section describes the first option: how to embed sounds in ActionScript
code within a Flex application using the `[Embed]` metadata tag.

To embed an asset in ActionScript code, use the `[Embed]` metadata tag.

Place the sound file in the main source folder or another folder that is in your
project's build path. When the compiler encounters an Embed metadata tag, it
creates the embedded asset class for you. You can access the class through a
variable of data type Class that you declare immediately after the `[Embed]`
metadata tag.

The following code embeds a sound named smallSound.mp3 and uses a variable named
`soundClass` to store a reference to the embedded asset class associated with
that sound. The code then creates an instance of the embedded asset class, casts
it as an instance of the Sound class, and calls the `play()` method on that
instance:

    package
    {
    	import flash.display.Sprite;
    	import flash.media.Sound;
    	import flash.media.SoundChannel;

    	public class EmbeddedSoundExample extends Sprite
    	{
    		[Embed(source="smallSound.mp3")]
    		public var soundClass:Class;

    		public function EmbeddedSoundExample()
    		{
    			var smallSound:Sound = new soundClass() as Sound;
    			smallSound.play();
    		}
    	}
    }

To use the embedded sound to set a property of a Flex component, it should be
cast as an instance of the mx.core.SoundAsset class instead of as an instance of
the Sound class. For a similar example that uses the SoundAsset class see
"Embedded asset classes" in Learning ActionScript 3.0.

More Help topics

![](../../img/flexLinkIndicator.png)
[Embedding assets](https://web.archive.org/web/20150313235357/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7fce.html)

![](../../img/as3LinkIndicator.png)
[Embedded asset classes](https://web.archive.org/web/20150211003723/http://help.adobe.com/en_US/as3/learn/WS5b3ccc516d4fbf351e63e3d118a9b90204-7f36.html#WS5b3ccc516d4fbf351e63e3d118a9b90204-7f2e)
