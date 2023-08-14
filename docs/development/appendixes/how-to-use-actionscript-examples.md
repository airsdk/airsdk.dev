---
sidebar_position: 1
---

# How to Use ActionScript Examples

Running an ActionScript 3.0 code example is one of the best ways to learn how
particular classes and methods work. You can use examples in different ways,
depending on the devices you are using or targeting.

Computers running Flash Professional or Flash Builder  
See
[Running ActionScript 3.0 examples in Flash Professional](#running-actionscript-30-examples-in-flash-professional)
or
[Running ActionScript 3.0 examples in Flash Builder](#running-actionscript-30-examples-in-flash-builder)
for information about how to use these development environments to run
ActionScript 3.0 examples. Use trace statements and other debugging tools to
increase your understanding of how a code example works.

Mobile devices  
You can run the ActionScript 3.0 code examples on mobile devices that support
Flash Player 10.1 and later releases. See
[Running ActionScript 3.0 examples on mobile devices](#running-actionscript-30-examples-on-mobile-devices).
You can also run these examples on your computer using Flash Professional or
Flash Builder.

TV devices  
Though you cannot run these examples on TV devices, you can still learn from the
examples by running them on your computer. See
[Flash Platform for TV](https://web.archive.org/web/20140302163619/https://www.adobe.com/devnet/devices/flash_platform_tv.html)
on the Adobe Developer Connection website for information about developing
applications for TV devices.

## Types of examples

The types of ActionScript 3.0 code examples are:

- Code snippet examples (found throughout the ActionScript 3.0 documentation
  set)

- Class-based examples (found primarily in the
  [ActionScript 3.0 Language Reference](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html))

- Practical examples containing multiple source files (download source ZIP file
  from
  [_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original))

#### Code snippet examples

A code snippet example looks like this:

    var x:int = 5;
    trace(x); // 5

Code snippets only contain enough code to demonstrate a single idea. They do not
normally contain package or class statements.

#### Class-based examples

Many examples show the source code for a complete ActionScript class. A
class-based example looks like this:

    package {
    	public class Example1 {
    		public function Example1():void {
    			var x:int = 5;
    			trace(x); //5
    		}
    	}
    }

The code for a class-based example includes a package statement, a class
declaration, and a constructor function.

#### Practical examples containing multiple source files

Many of the topics in the ActionScript 3.0 Developer's Guide conclude with
practical examples that show how to use certain ActionScript features in a
practical, real-world context. These examples usually contain multiple files
including:

- One or more ActionScript source files

- A .FLA file for use with Flash Professional

- One or more MXML files for use with Flash Builder

- Data files, image files, sound files, or other assets used by the example
  application (optional).

Practical examples are normally delivered as ZIP archive files.

List of Developer Guide examples in the ZIP file

The ZIP file for Flash Professional CS5 and Flex 4 (download from
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original))
contains the following examples:

- AlarmClock (
  [Event handling example: Alarm Clock](../core-actionscript-classes/working-with-dates-and-times/date-and-time-example-simple-analog-clock.md))

- AlgorithmicVisualGenerator (
  [Drawing API example: Algorithmic Visual Generator](../display/using-the-drawing-api/drawing-api-example-algorithmic-visual-generator.md))

- ASCIIArt (
  [Strings example: ASCII art](../core-actionscript-classes/working-with-strings/strings-example-ascii-art.md))

- CapabilitiesExplorer (
  [Capabilities example: Detecting system capabilities](../client-system-interaction/client-system-environment/capabilities-example-detecting-system-capabilities.md))

- CustomErrors (
  [Handling errors example: CustomErrors application](../core-actionscript-classes/handling-errors/handling-errors-example-custom-errors-application.md))

- DisplayObjectTransformer (
  [Geometry example: Applying a matrix transformation to a display object](../display/working-with-geometry/geometry-example-applying-a-matrix-transformation-to-a-display-object.md))

- FilterWorkbench (
  [Filtering display objects example: Filter Workbench](../display/filtering-display-objects/filtering-display-objects-example-filter-workbench.md))

- GlobalStockTicker (
  [Example: Internationalizing a stock ticker application](../internationalizing-applications/internationalizing-applications/example-internationalizing-a-stock-ticker-application.md))

- IntrovertIM_HTML (
  [External API example: Communicating between ActionScript and JavaScript in a web browser](../networking-and-communication/using-the-external-api/external-api-example-communicating-between-actionscript-and-javascript-in-a-web-browser.md))

- NewsLayout (
  [TextField Example: Newspaper-style text formatting](../text/using-the-textfield-class/textfield-example-newspaper-style-text-formatting.md))

- PlayList (
  [Arrays example: PlayList](../core-actionscript-classes/working-with-arrays/arrays-example-playlist.md))

- PodcastPlayer (
  [Sound example: Podcast Player](../rich-media-content/working-with-sound/sound-example-podcast-player.md))

- ProjectionDragger (
  [Example: Perspective projection](../display/working-in-three-dimensions/example-perspective-projection.md))

- ReorderByZ (
  [Using Matrix3D objects for reordering display](../display/working-in-three-dimensions/performing-complex-3d-transformations.md#using-matrix3d-objects-for-reordering-display))

- RSSViewer (
  [XML in ActionScript example: Loading RSS data from the Internet](../core-actionscript-classes/working-with-xml/xml-in-actionscript-example.md))

- RuntimeAssetsExplorer (
  [Movie clip example: RuntimeAssetsExplorer](../display/working-with-movie-clips/movie-clip-example-runtime-assets-explorer.md))

- SimpleClock (
  [Date and time example: Simple analog clock](../core-actionscript-classes/working-with-dates-and-times/date-and-time-example-simple-analog-clock.md))

- SpinningMoon (
  [Bitmap example: Animated spinning moon](../display/working-with-bitmaps/bitmap-example-animated-spinning-moon.md))

- SpriteArranger (
  [Display object example: SpriteArranger](../display/display-programming/display-object-example-sprite-arranger.md))

- TelnetSocket (
  [TCP socket example: Building a Telnet client](../networking-and-communication/sockets.md#tcp-socket-example-building-a-telnet-client))

- VideoJukebox (
  [Video example: Video Jukebox](../rich-media-content/working-with-video/video-example-video-jukebox.md))

- WikiEditor (
  [Regular expressions example: A Wiki parser](../core-actionscript-classes/using-regular-expressions/regular-expressions-example-a-wiki-parser.md))

- WordSearch (
  [Mouse input example: WordSearch](../user-interaction/mouse-input/mouse-input-example-word-search.md))

Practical examples are also found with many of the Quick Start articles in the
Flash Developer Center and Flex Developer Center.

## Running ActionScript 3.0 examples in Flash Professional

Use one of the following procedures (depending on example type) to run an
example using Flash Professional.

#### Running a code snippet example in Flash Professional

To run a code snippet example in Flash Professional:

1.  Select File \> New.

2.  In the New Document dialog box, select Flash Document, and click OK.

    A new Flash window is displayed.

3.  Click on the first frame of the first layer in the Timeline panel.

4.  In the Actions panel, type or paste the code snippet example.

5.  Select File \> Save. Give the file a name and click OK.

6.  To test the example, select Control \> Test Movie.

#### Running a class-based example in Flash Professional

To run a class-based example in Flash Professional:

1.  Select File \> New.

2.  In the New Document dialog box, select ActionScript File, and click OK. A
    new editor window is displayed.

3.  Copy the class-based example code and paste it into the editor window.

    If the class is the main document class for the program, it must extend the
    MovieClip class:

        import flash.display.MovieClip;
        public class Example1 extends MovieClip {
        	//...
        }

    Also make sure that all the classes referenced in the example are declared
    using `import` statements.

4.  Select File \> Save. Give the file the same name as the class in the example
    (e.g. ContextMenuExample.as).

    Note: Some of the class-based examples, such as the
    [flashx.textLayout.container.ContainerController class example](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flashx/textLayout/container/ContainerController.html#includeExamplesSummary),
    include multiple levels in the package declaration (
    `package flashx.textLayout.container.examples {`). For these examples, save
    the file in a sub folder that matches the package declaration
    (flashx/textLayout/container/examples), or remove the package name (so the
    ActionScript starts with `package {` only) and you can test the file from
    any location.

5.  Select File \> New.

6.  In the New Document dialog box, select Flash Document (ActionScript 3.0),
    and click OK. A new Flash window is displayed.

7.  In the Properties panel, in the Document Class field, enter the name of the
    example class, which should match the name of the ActionScript source file
    you just saved (e.g. ContextMenuExample).

8.  Select File \> Save. Give the FLA file the same name as the class in the
    example (e.g. ContextMenuExample.fla).

9.  To test the example, select Control \> Test Movie.

#### Running a practical example in Flash Professional

Practical examples are normally delivered as ZIP archive files. To run a
practical example using Flash Professional:

1.  Unzip the archive file into a folder of your choice.

2.  In Flash Professional select File \> Open.

3.  Browse to the folder where you unzipped the archive file. Select the FLA
    file in that folder and click Open.

4.  To test the example, select Control \> Test Movie.

## Running ActionScript 3.0 examples in Flash Builder

Use one of the following procedures (depending on example type) to run an
example using Flash Builder.

#### Running a code snippet example in Flash Builder

To run a code snippet example in Flash Builder:

1.  Either create a new Flex Project (select File \> New \> Flex Project), or
    within an existing Flex project create a new MXML Application (select File
    \> New \> MXML Application). Give the project or application a descriptive
    name (such as ContextMenuExample).

2.  Inside the generated MXML file, add a `<mx:Script>` tag.

3.  Paste the contents of the code snippet example between the `<mx:Script>` and
    `</mx:Script>` tags. Save the MXML file.

4.  To run the example, select the Run \> Run menu option for the main MXML file
    (such as Run \> Run ContextMenuExample).

#### Running a class-based example in Flash Builder

1.  Select File \> New \> ActionScript Project.

2.  Enter the name of the primary class (such as ContextMenuExample) into the
    Project Name field. Use the default values for other fields (or change them
    according to your specific environment). Click Finish to create the project
    and the main ActionScript file.

3.  Erase any generated content from the ActionScript file. Paste the example
    code, including package and import statements, into the ActionScript file
    and save the file.

    Note: Some of the class-based examples, such as the
    [flashx.textLayout.container.ContainerController class example](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flashx/textLayout/container/ContainerController.html#includeExamplesSummary),
    include multiple levels in the package declaration (
    `package flashx.textLayout.container.examples {`). For these examples, save
    the file in a sub folder that matches the package declaration
    (flashx/textLayout/container/examples), or remove the package name (so the
    ActionScript starts with `package {` only) and you can test the file from
    any location.

4.  To run the example, select the Run \> Run menu option for the main
    ActionScript class name (such as Run \> Run ContextMenuExample).

#### Running a practical example inFlash Builder

Practical examples are normally delivered as ZIP archive files. To run a
practical example using Flash Builder:

1.  Unzip the archive file into a folder of your choice. Give the folder a
    descriptive name (such as ContextMenuExample).

2.  In Flash Builder select File \> New Flex Project. In the Project Location
    section, click Browse and select the folder containing the example files. In
    the Project Name field enter the folder name (such as ContextMenuExample).
    Use the default values for other fields (or change them according to your
    specific environment). Click Next to continue.

3.  In the Output panel click Next to accept the default value.

4.  In the Source Paths panel click the Browse button next to the Main
    Application File field. Select the main MXML example file from the example
    folder. Click Finish to create the project files.

5.  To run the example, select the Run \> Run menu option for the main MXML file
    (such as Run \> Run ContextMenuExample).

## Running ActionScript 3.0 examples on mobile devices

You can run the ActionScript 3.0 code examples on mobile devices that support
Flash Player 10.1. However, typically you run a code example to learn how
particular classes and methods work. In that case, run the example on a
non-mobile device such as a desktop computer. On the desktop computer, you can
use trace statements and other debugging tools in Flash Professional or Flash
Builder to increase your understanding of a code example.

If you want to run the example on a mobile device, you can either copy the files
to the device or to a web server. To copy files to the device and run the
example in the browser, do the following:

1.  Create the SWF file by following the instructions in
    [Running ActionScript 3.0 examples in Flash Professional](#running-actionscript-30-examples-in-flash-professional)
    or in
    [Running ActionScript 3.0 examples in Flash Builder](#running-actionscript-30-examples-in-flash-builder).
    In Flash Professional, you create the SWF file when you select Control \>
    Test Movie. In Flash Builder, you create the SWF file when you run, debug,
    or build your Flash Builder project.

2.  Copy the SWF file to a directory on the mobile device. Use software provided
    with the device to copy the file.

3.  In the address bar of browser on the mobile device, enter the file:// URL
    for the SWF file. For example, enter `file:://applications/myExample.swf`.

To copy files to a web server and run the example in the device's browser, do
the following:

1.  Create a SWF file and an HTML file. First, follow the instructions in
    [Running ActionScript 3.0 examples in Flash Professional](#running-actionscript-30-examples-in-flash-professional)
    or in
    [Running ActionScript 3.0 examples in Flash Builder](#running-actionscript-30-examples-in-flash-builder).
    In Flash Professional, selecting Control \> Test Movie creates only the SWF
    file. To create both files, first select both Flash and HTML on the Formats
    tab in the Publish Settings dialog. Then select File \> Publish to create
    both the HTML and SWF files. In Flash Builder, you create both the SWF file
    and HTML file when you run, debug, or build your Flash Builder project.

2.  Copy the SWF file and HTML file to a directory on the web server.

3.  In the address bar of browser on the mobile device, enter the HTTP address
    for the HTML file. For example, enter
    `http://www.myWebServer/examples/myExample.html`.

Before running an example on a mobile device, consider each of the following
issues.

#### Stage size

The stage size you use when running an example on a mobile device is much
smaller than when you use a non-mobile device. Many examples do not require a
particular Stage size. When creating the SWF file, specify a Stage size
appropriate to your device. For example, specify 176 x 208 pixels.

The purpose of the practical examples in the ActionScript 3.0 Development Guide
is to illustrate different ActionScript 3.0 concepts and classes. Their user
interfaces are designed to look good and work well on a desktop or laptop
computer. Although the examples work on mobile devices, the Stage size and user
interface design is not suitable to the small screen. Adobe recommends that you
run the practical examples on a computer to learn the ActionScript, and then use
pertinent code snippets in your mobile applications.

#### Text fields instead of trace statements

When running an example on a mobile device, you cannot see the output from the
example's trace statements. To see the output, create an instance of the
TextField class. Then, append the text from the trace statements to the `text`
property of the text field.

You can use the following function to set up a text field to use for tracing:

    function createTracingTextField(x:Number, y:Number,
                                width:Number, height:Number):TextField {
    	var tracingTF:TextField = new TextField();
    	tracingTF.x = x;
    	tracingTF.y = y;
    	tracingTF.width = width;
    	tracingTF.height = height;

    	// A border lets you more easily see the area the text field covers.
    	tracingTF.border = true;
    	// Left justifying means that the right side of the text field is automatically
    	// resized if a line of text is wider than the width of the text field.
    	// The bottom is also automatically resized if the number of lines of text
    	// exceed the length of the text field.
    	tracingTF.autoSize = TextFieldAutoSize.LEFT;

    	// Use a text size that works well on the device.
    	var myFormat:TextFormat = new TextFormat();
    	myFormat.size = 18;
    	tracingTF.defaultTextFormat = myFormat;

    	addChild(tracingTF);
    	return tracingTF;
    }

For example, add this function to the document class as a private function.
Then, in other methods of the document class, trace data with code like the
following:

    var traceField:TextField = createTracingTextField(10, 10, 150, 150);
    // Use the newline character "\n" to force the text to the next line.
    traceField.appendText("data to trace\n");
    traceField.appendText("more data to trace\n");
    // Use the following line to clear the text field.
    traceField.appendText("");

The `appendText()` method accepts only one value as a parameter. That value is a
string (either a String instance or a string literal). To print the value of a
non-string variable, first convert the value to a String. The easiest way to do
that is to call the object's `toString()` method:

    var albumYear:int = 1999;
    traceField.appendText("albumYear = ");
    traceField.appendText(albumYear.toString());

#### Text size

Many examples use text fields to help illustrate a concept. Sometimes adjusting
the size of the text in the text field provides better readability on a mobile
device. For example, if an example uses a text field instance named
`myTextField`, change the size of its text with the following code:

    // Use a text size that works well on the device.
    var myFormat:TextFormat = new TextFormat();
    myFormat.size = 18;
    myTextField.defaultTextFormat = myFormat

#### Capturing user input

The mobile operating system and browser capture some user input events that the
SWF content does not receive. Specific behavior depends on the operating system
and browser, but could result in unexpected behavior when you run the examples
on a mobile device. For more information, see
[KeyboardEvent precedence](../user-interaction/keyboard-input/capturing-keyboard-input.md#keyboardevent-precedence).

Also, the user interfaces of many examples are designed for a desktop or laptop
computer. For example, most of the practical examples in the ActionScript 3.0
Developer's Guide are well-suited for desktop viewing. Therefore, the entire
Stage is sometimes not visible on the mobile device's screen. The ability to pan
through the browser's contents depends on the browser. Furthermore, the examples
are not designed to catch and handle scrolling or panning events. Therefore,
some examples' user interfaces are not suitable for running on the small screen.
Adobe recommends that you run the examples on a computer to learn the
ActionScript, and then use pertinent code snippets in your mobile applications.

For more information, see
[Panning and scrolling display objects](../display/display-programming/manipulating-display-objects/panning-and-scrolling-display-objects.md).

#### Handling focus

Some examples require you to give a field the focus. By giving a field the
focus, you can, for example, enter text or select a button. To give a field
focus, use the mobile device's pointer device, such as a stylus or your finger.
Or, use the mobile device's navigation keys to give a field focus. To select a
button that has the focus, use the mobile device's Select key as you would use
Enter on a computer. On some devices, tapping twice on a button selects it.

For more information about focus, see
[Managing focus](../user-interaction/basics-of-user-interaction.md#managing-focus).

#### Handling mouse events

Many examples listen for mouse events. On a computer, these mouse events can
occur, for example, when a user rolls over a display object with the mouse, or
clicks the mouse button on a display object. On mobile devices, events from
using pointer devices such as a stylus or finger, are called touch events. Flash
Player 10.1 maps touch events to mouse events. This mapping ensures that SWF
content that was developed before Flash Player 10.1 continues to work.
Therefore, examples work when using a pointer device to select or drag a display
object.

#### Performance

Mobile devices have less processing power than desktop devices. Some
CPU-intensive examples possibly perform slowly on mobile devices. For example,
the example in
[Drawing API example: Algorithmic Visual Generator](../display/using-the-drawing-api/drawing-api-example-algorithmic-visual-generator.md)
does extensive computations and drawing upon entering every frame. Running this
example on a computer illustrates various drawing APIs. However, the example is
not suitable on some mobile devices due to their performance limitations.

For more information about performance on mobile devices, see
_[Optimizing Performance for the Flash Platform](https://web.archive.org/web/20150302221450/http://help.adobe.com/en_US/as3/mobile/index.html)_.

#### Best practices

The examples do not consider best practices in developing applications for
mobile devices. Limitations in memory and processing power in mobile devices
require special consideration. Similarly, the user interface for the small
screen has different needs than a desktop display. For more information about
developing applications for mobile devices, _see
_[Optimizing Performance for the Flash Platform](https://web.archive.org/web/20150302221450/http://help.adobe.com/en_US/as3/mobile/index.html)_._
