# Advanced text rendering

ActionScript 3.0 provides a variety of classes in the flash.text package to
control the properties of displayed text, including embedded fonts,
anti-aliasing settings, alpha channel control, and other specific settings. The
ActionScript 3.0 Reference provides detailed descriptions of these classes and
properties, including the CSMSettings, Font, and TextRenderer classes.

## Using embedded fonts

When you specify a specific font for a TextField in your application, Flash
Player or AIR look for a device font (a font that resides on the user's
computer) with the same name. If it doesn't find that font on the system, or if
the user has a slightly different version of a font with that name, the text
display could look very different from what you intend. By default, the text
appears in a Times Roman font.

To make sure the user sees exactly the right font, you can embed that font in
your application SWF file. Embedded fonts have a number of benefits:

- Embedded font characters are anti-aliased, making their edges appear smoother,
  especially for larger text.

- You can rotate text that uses embedded fonts.

- Embedded font text can be made transparent or semitransparent.

- You can use the `kerning` CSS style with embedded fonts.

The biggest limitation to using embedded fonts is that they increase the file
size or download size of your application.

The exact method of embedding a font file into your application SWF file varies
according to your development environment.

Once you have embedded a font you can make sure a TextField uses the correct
embedded font:

- Set the `embedFonts` property of the TextField to `true`.

- Create a TextFormat object, set its `fontFamily` property to the name of the
  embedded font, and apply the TextFormat object to the TextField. When
  specifying an embedded font, the `fontFamily` property should only contain a
  single name; it cannot use a comma-delimited list of multiple font names.

- If using CSS styles to set fonts for TextFields or components, set the
  `font-family` CSS property to the name of the embedded font. The `font-family`
  property must contain a single name and not a list of names if you want to
  specify an embedded font.

#### Embedding a font in Flash

Flash Professional lets you embed almost any font you have installed on your
system, including TrueType fonts and Type 1 Postscript fonts.

You can embed fonts in an application in many ways, including:

- Setting the font and style properties of a TextField on the Stage and clicking
  the Embed Fonts checkbox

- Creating and referencing a font symbol

- Creating and using a run-time shared library containing embedded font symbols

For more details about how to embed fonts in applications, see "Embedded fonts
for dynamic or input text fields" in _Using Flash_.

#### Embedding a font in Flex

You can embed fonts in a Flex application in many ways, including:

- Using the `[Embed]` metadata tag in a script

- Using the `@font-face` style declaration

- Establish a class for the font and use the `[Embed]` tag to embed it.

You can only embed TrueType fonts directly in a Flex application. Fonts in other
formats, such as Type 1 Postscript fonts, can first be embedded in a SWF file
using Flash Professional and then that SWF file can be used in your Flex
application. For more details about using embedded fonts from SWF files in Flex,
see "Embedding fonts from SWF files" in _Using Flex 4_.

## Controlling sharpness, thickness, and anti-aliasing

By default, Flash Player or AIR determines the settings for text display
controls like sharpness, thickness, and anti-aliasing as text resizes, changes
color, or is displayed on various backgrounds. In some cases, like when you have
very small or very large text, or text on a variety of unique backgrounds, you
might want to maintain control over these settings. You can override Flash
Player or AIR settings using the `flash.text.TextRenderer` class and its
associated classes, like the CSMSettings class. These classes give you precise
control over the rendering quality of embedded text. For more information about
embedded fonts, see [Using embedded fonts](#using-embedded-fonts).

Note: The `flash.text.TextField`.antiAliasType property must have the value
`AntiAliasType.ADVANCED` in order for you to set the sharpness, thickness, or
the gridFitType property, or to use the
`TextRenderer.setAdvancedAntiAliasingTable()` method.

The following example applies custom continuous stroke modulation (CSM)
properties and formatting to displayed text using an embedded font called
`myFont`. When the user clicks the displayed text, Flash Player or Adobe AIR
applies the custom settings:

    var format:TextFormat = new TextFormat();
    format.color = 0x336699;
    format.size = 48;
    format.font = "myFont";

    var myText:TextField = new TextField();
    myText.embedFonts = true;
    myText.autoSize = TextFieldAutoSize.LEFT;
    myText.antiAliasType = AntiAliasType.ADVANCED;
    myText.defaultTextFormat = format;
    myText.selectable = false;
    myText.mouseEnabled = true;
    myText.text = "Hello World";
    addChild(myText);
    myText.addEventListener(MouseEvent.CLICK, clickHandler);

    function clickHandler(event:Event):void
    {
    	var myAntiAliasSettings = new CSMSettings(48, 0.8, -0.8);
    	var myAliasTable:Array = new Array(myAntiAliasSettings);
    	TextRenderer.setAdvancedAntiAliasingTable("myFont", FontStyle.ITALIC, TextColorType.DARK_COLOR, myAliasTable);
    }

More Help topics

![](../../img/flashLinkIndicator.png)
[Embed fonts for consistent text appearance](https://web.archive.org/web/20111122163656/https://help.adobe.com/en_US/flash/cs/using/WSb03e830bd6f770ee21a3597d124daee0526-8000.html)

![](../../img/flexLinkIndicator.png)
[Embedding assets](https://web.archive.org/web/20150313235357/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7fce.html)

![](../../img/flexLinkIndicator.png)
[Fonts](https://web.archive.org/web/20150325110136/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7f9e.html)

[Peter deHaan: Embedding fonts](https://web.archive.org/web/20121122200914/https://www.adobe.com/devnet/flash/quickstart/embedding_fonts.html)

[Divillysausages.com: AS3 Font embedding masterclass](https://web.archive.org/web/20120622225455/http://divillysausages.com/blog/as3_font_embedding_masterclass)
