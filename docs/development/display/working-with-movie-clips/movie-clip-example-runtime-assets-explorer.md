# Movie clip example: RuntimeAssetsExplorer

The Export for ActionScript functionality can be especially advantageous for
libraries that may be useful across more than one project. If Flash Player or
AIR executes a SWF file, symbols that have been exported to ActionScript are
available to any SWF file within the same security sandbox as the SWF that loads
it. In this way, a single Flash document can generate a SWF file that is
designated for the sole purpose of holding graphical assets. This technique is
particularly useful for larger projects where designers working on visual assets
can work in parallel with developers who create a "wrapper" SWF file that then
loads the graphical assets SWF file at run time. You can use this method to
maintain a series of versioned files where graphical assets are not dependent
upon the progress of programming development.

The RuntimeAssetsExplorer application loads any SWF file that is a subclass of
RuntimeAsset and allows you to browse the available assets of that SWF file. The
example illustrates the following:

- Loading an external SWF file using `Loader.load()`

- Dynamic creation of a library symbol exported for ActionScript

- ActionScript control of MovieClip playback

Before beginning, note that each of the SWF files to run in Flash Player must be
located in the same security sandbox. For more information, see
[Security sandboxes](../../security/security-sandboxes.md).

To get the application files for this sample, download the
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The RuntimeAssetsExplorer application files can be found in the folder
Samples/RuntimeAssetsExplorer. The application consists of the following files:

<table>
<thead>
    <tr>
        <th><p>File</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>
            <p>RuntimeAssetsExample.mxml</p>
            <p>or</p>
            <p>RuntimeAssetsExample.fla</p>
        </td>
        <td><p>The user
        interface for the application for Flex (MXML) or Flash (FLA).</p></td>
    </tr>
    <tr>
        <td><p>RuntimeAssetsExample.as</p></td>
        <td><p>Document
        class for the Flash (FLA) application.</p></td>
    </tr>
    <tr>
        <td><p>GeometricAssets.as</p></td>
        <td><p>An example
        class that implements the RuntimeAsset interface.</p></td>
    </tr>
    <tr>
        <td><p>GeometricAssets.fla</p></td>
        <td><p>A FLA file
        linked to the GeometricAssets class (the document class of the FLA)
        containing symbols that are exported for ActionScript.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/runtimeassetexplorer/RuntimeLibrary.as</p></td>
        <td><p>An interface
        that defines the required methods expected of all run-time asset SWF
        files that will be loaded into the explorer container.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/runtimeassetexplorer/AnimatingBox.as</p></td>
        <td><p>The class of
        the library symbol in the shape of a rotating box.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/runtimeassetexplorer/AnimatingStar.as</p></td>
        <td><p>The class of
        the library symbol in the shape of a rotating star.</p></td>
    </tr>
</tbody>
</table>

## Establishing a run-time library interface

In order for the explorer to properly interact with a SWF library, the structure
of the run-time asset libraries must be formalized. We will accomplish this by
creating an interface, which is similar to a class in that it's a blueprint of
methods that demarcate an expected structure, but unlike a class it includes no
method bodies. The interface provides a way for both the run-time library and
the explorer to communicate to one another. Each SWF of run-time assets that is
loaded in our browser will implement this interface. For more information about
interfaces and how they can be useful, see Interfaces in _Learning ActionScript
3.0_.

The RuntimeLibrary interface will be very simple—we merely require a function
that can provide the explorer with an array of classpaths for the symbols to be
exported and available in the run-time library. To this end, the interface has a
single method: `getAssets()`.

    package com.example.programmingas3.runtimeassetexplorer
    {
        public interface RuntimeLibrary
        {
            function getAssets():Array;
        }
    }

## Creating the asset library SWF file

By defining the RuntimeLibrary interface, it's possible to create multiple asset
library SWF files that can be loaded into another SWF file. Making an individual
SWF library of assets involves four tasks:

- Creating a class for the asset library SWF file

- Creating classes for individual assets contained in the library

- Creating the actual graphic assets

- Associating graphic elements with classes and publishing the library SWF

#### Creating a class to implement the RuntimeLibrary interface

Next, we'll create the GeometricAssets class that will implement the
RuntimeLibrary interface. This will be the document class of the FLA. The code
for this class is very similar to the RuntimeLibrary interface—the difference
between them is that in the class definition the `getAssets()` method has a
method body.

    package
    {
        import flash.display.Sprite;
        import com.example.programmingas3.runtimeassetexplorer.RuntimeLibrary;

        public class GeometricAssets extends Sprite implements RuntimeLibrary
        {
            public function GeometricAssets() {

            }
            public function getAssets():Array {
                return [ "com.example.programmingas3.runtimeassetexplorer.AnimatingBox",
                        "com.example.programmingas3.runtimeassetexplorer.AnimatingStar" ];
            }
        }
    }

If we were to create a second run-time library, we could create another FLA
based upon another class (for example, AnimationAssets) that provides its own
`getAssets()` implementation.

#### Creating classes for each MovieClip asset

For this example, we'll merely extend the MovieClip class without adding any
functionality to the custom assets. The following code for AnimatingStar is
analogous to that of AnimatingBox:

    package com.example.programmingas3.runtimeassetexplorer
    {
        import flash.display.MovieClip;

        public class AnimatingStar extends MovieClip
        {
            public function AnimatingStar() {
            }
        }
    }

#### Publishing the library

We'll now connect the MovieClip-based assets to the new class by creating a new
FLA and entering GeometricAssets into the Document Class field of the Property
inspector. For the purposes of this example, we'll create two very basic shapes
that use a timeline tween to make one clockwise rotation over 360 frames. Both
the `animatingBox` and `animatingStar` symbols are set to Export for
ActionScript and have the Class field set to the respective classpaths specified
in the `getAssets()` implementation. The default base class of
`flash.display.MovieClip` remains, as we want to subclass the standard MovieClip
methods.

After setting up your symbol's export settings, publish the FLA. You now have
your first run-time library. This SWF file could be loaded into another AVM2 SWF
file and the AnimatingBox and AnimatingStar symbols would be available to the
new SWF file.

## Loading the library into another SWF file

The last functional piece to deal with is the user interface for the asset
explorer. In this example, the path to the run-time library is hard-coded as a
variable named `ASSETS_PATH`. Alternatively, you could use the FileReference
class—for example, to create an interface that browses for a particular SWF file
on your hard drive.

When the run-time library is successfully loaded, Flash Player calls the
`runtimeAssetsLoadComplete()` method:

    private function runtimeAssetsLoadComplete(event:Event):void
    {
        var rl:* = event.target.content;
        var assetList:Array = rl.getAssets();
        populateDropdown(assetList);
        stage.frameRate = 60;
    }

In this method, the variable rl represents the loaded SWF file. The code calls
the `getAssets()` method of the loaded SWF file, obtaining the list of assets
that are available, and uses them to populate a ComboBox component with a list
of available assets by calling the `populateDropDown()` method. That method in
turn stores the full classpath of each asset. Clicking the Add button on the
user interface triggers the `addAsset()` method:

    private function addAsset():void
    {
        var className:String = assetNameCbo.selectedItem.data;
        var AssetClass:Class = getDefinitionByName(className) as Class;
        var mc:MovieClip = new AssetClass();
        ...
    }

which gets the classpath of whichever asset is currently selected in the
ComboBox (`assetNameCbo.selectedItem.data`), and uses the
`getDefinitionByName()` function (from the flash.utils package) to obtain an
actual reference to the asset's class in order to create a new instance of that
asset.
