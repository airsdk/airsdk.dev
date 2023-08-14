# Loading an external SWF file

In ActionScript 3.0, SWF files are loaded using the Loader class. To load an
external SWF file, your ActionScript needs to do four things:

1.  Create a new URLRequest object with the url of the file.

2.  Create a new Loader object.

3.  Call the Loader object's `load()` method, passing the URLRequest instance as
    a parameter.

4.  Call the `addChild()` method on a display object container (such as the main
    timeline of a Flash document) to add the Loader instance to the display
    list.

Ultimately, the code looks like this:

    var request:URLRequest = new URLRequest("http://www.[yourdomain].com/externalSwf.swf");
    var loader:Loader = new Loader()
    loader.load(request);
    addChild(loader);

This same code can be used to load an external image file such as a JPEG, GIF,
or PNG image, by specifying the image file's url rather than a SWF file's url. A
SWF file, unlike an image file, may contain ActionScript. Thus, although the
process of loading a SWF file may be identical to loading an image, when loading
an external SWF file both the SWF file doing the loading and the SWF file being
loaded must reside in the same security sandbox if Flash Player or AIR is
playing the SWF and you plan to use ActionScript to communicate in any way to
the external SWF file. Additionally, if the external SWF file contains classes
that share the same namespace as classes in the loading SWF file, you may need
to create a new application domain for the loaded SWF file in order to avoid
namespace conflicts. For more information on security and application domain
considerations, see
[Working with application domains](../../core-actionscript-classes/working-with-application-domains.md)
and [Loading content](../../security/loading-content.md).

When the external SWF file is successfully loaded, it can be accessed through
the `Loader.content` property. If the external SWF file is published for
ActionScript 3.0, this will be either a movie clip or a sprite, depending on
which class it extends.

There are a few differences for loading a SWF file in Adobe AIR for iOS versus
other platforms. For more information, see
[Loading SWF files in AIR for iOS](../display-programming/loading-display-content-dynamically.md#loading-swf-files-in-air-for-ios).

## Considerations for loading an older SWF file

If the external SWF file has been published with an older version of
ActionScript, there are important limitations to consider. Unlike an
ActionScript 3.0 SWF file that runs in AVM2 (ActionScript Virtual Machine 2), a
SWF file published for ActionScript 1.0 or 2.0 runs in AVM1 (ActionScript
Virtual Machine 1).

There are important differences when loading an ActionScript 1.0 or 2.0 SWF file
into an ActionScript 3.0 SWF file (compared to loading an ActionScript 3.0 SWF
file). Flash Player provides full backward compatibility with previously
published content. Any content that runs in previous versions of Flash Player
runs in Flash Player versions that support ActionScript 3.0. However, the
following limitations apply:

- ActionScript 3.0 code can load a SWF file written in ActionScript 1.0 or 2.0.
  When an ActionScript 1.0 or 2.0 SWF file is successfully loaded, the loaded
  object (the `Loader.content` property) is an AVM1Movie object. An AVM1Movie
  instance is not the same as a MovieClip instance. It is a display object, but
  unlike a movie clip, it does not include timeline-related methods or
  properties. The parent AVM2 SWF file cannot access the properties, methods, or
  objects of the loaded AVM1Movie object.

- SWF files written in ActionScript 1.0 or 2.0 cannot load SWF files written in
  ActionScript 3.0. This means that SWF files authored in Flash 8 or Flex
  Builder 1.5 or earlier versions cannot load ActionScript 3.0 SWF files.

  The only exception to this rule is that an ActionScript 2.0 SWF file can
  replace itself with an ActionScript 3.0 SWF file, as long as the ActionScript
  2.0 SWF file hasn't previously loaded anything into any of its levels. An
  ActionScript 2.0 SWF file can do this through a call to `loadMovieNum()`,
  passing a value of 0 to the `level` parameter.

- In general, SWF files written in ActionScript 1.0 or 2.0 must be migrated if
  they are to work together with SWF files written in ActionScript 3.0. For
  example, suppose you created a media player using ActionScript 2.0. The media
  player loads various content that was also created using ActionScript 2.0. You
  cannot create new content in ActionScript 3.0 and load it in the media player.
  You must migrate the video player to ActionScript 3.0.

  If, however, you create a media player in ActionScript 3.0, that media player
  can perform simple loads of your ActionScript 2.0 content.

The following tables summarize the limitations of previous versions of Flash
Player in relation to loading newer content and executing code, as well as the
limitations for cross-scripting between SWF files written in different versions
of ActionScript.

| Supported functionality           | Flash Player 7 | Flash Player 8 | Flash Player 9 and 10 |
| --------------------------------- | -------------- | -------------- | --------------------- |
| Can load SWFs published for       | 7 and earlier  | 8 and earlier  | 9 (or 10) and earlier |
| Contains this AVM                 | AVM1           | AVM1           | AVM1 and AVM2         |
| Runs SWFs written in ActionScript | 1.0 and 2.0    | 1.0 and 2.0    | 1.0 and 2.0, and 3.0  |

In the following table, "Supported functionality" refers to content running in
Flash Player 9 or later. Content running in Flash Player 8 or earlier can load,
display, execute, and cross-script only ActionScript 1.0 and 2.0.

<table>
<thead>
    <tr>
        <th><p>Supported functionality</p></th>
        <th><p>Content created in ActionScript
        1.0 and 2.0</p></th>
        <th><p>Content created in ActionScript
        3.0</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>Can load
        content and execute code in content created in</p></td>
        <td><p>ActionScript
        1.0 and 2.0 only</p></td>
        <td><p>ActionScript
        1.0 and 2.0, and ActionScript 3.0</p></td>
    </tr>
    <tr>
        <td><p>Can cross
        script content created in</p></td>
        <td><p>ActionScript
        1.0 and 2.0 only (ActionScript 3.0 through Local Connection)</p></td>
        <td><p>ActionScript
        1.0 and 2.0 through LocalConnection.</p>
        <p>ActionScript 3.0</p></td>
    </tr>
</tbody>
</table>
