# Working with fonts

The `FontDescription` object is used in conjunction with `ElementFormat` to
identify a font face and define some of its characteristics. These
characteristics include the font name, weight, posture, rendering, and how to
find the font (device versus embedded).

Note: FTE does not support Type 1 fonts or bitmap fonts such as Type 3, ATC,
sfnt-wrapped CID, or Naked CID.

## Defining font characteristics (FontDescription object)

The `fontName` property of the `FontDescription` object can be a single name or
a comma-separated list of names. For example, in a list such as "Arial,
Helvetica, \_sans", the text engine looks for "Arial" first, then "Helvetica",
and finally "\_sans", if it can't find either of the first two fonts. The set of
font names include three generic device font names: "\_sans", "\_serif", and
"\_typewriter". They map to specific device fonts, depending on the playback
system. It is good practice to specify default names such as these in all font
descriptions that use device fonts. If no `fontName` is specified, "\_serif" is
used as the default.

The `fontPosture` property can either be set to the default (
`FontPosture.NORMAL`) or to italics ( `FontPosture.ITALIC`). The `fontWeight`
property can be set to the default ( `FontWeight.NORMAL`) or to bold (
`FontWeight.BOLD`).

    var fd1:FontDescription = new FontDescription();
    fd1.fontName = "Arial, Helvetica, _sans";
    fd1.fontPosture = FontPosture.NORMAL;
    fd1.fontWeight = FontWeight.BOLD;

## Embedded versus device fonts

The `fontLookup` property of the `FontDescription` object specifies whether the
text engine looks for a device font or embedded font to render text. If a device
font ( `FontLookup.DEVICE`) is specified, the runtime looks for the font on the
playback system. Specifying an embedded font ( `FontLookup.EMBEDDED_CFF`) causes
the runtime to look for an embedded font with the specified name in the SWF
file. Only embedded CFF (Compact Font Format) fonts work with this setting. If
the specified font is not found, a fallback device font is used.

Device fonts result in a smaller SWF file size. Embedded fonts give you greater
fidelity across platforms.

    var fd1:FontDescription = new FontDescription();
    fd1.fontLookup = FontLookup.EMBEDDED_CFF;
    fd1.fontName = "Garamond, _serif";

## Rendering mode and hinting

CFF (Compact Font Format) rendering is available starting with Flash Player 10
and Adobe AIR 1.5. This type of font rendering makes text more legible, and
permits higher-quality display of fonts at small sizes. This setting only
applies to embedded fonts. `FontDescription` defaults to this setting (
`RenderingMode.CFF`) for the `renderingMode` property. You can set this property
to `RenderingMode.NORMAL` to match the type of rendering used by Flash Player 7
or earlier versions.

When CFF rendering is selected, a second property, `cffHinting`, controls how a
font's horizontal stems are fit to the subpixel grid. The default value,
`CFFHinting.HORIZONTAL_STEM`, uses CFF hinting. Setting this property to
`CFFHinting.NONE` removes hinting, which is appropriate for animation or for
large font sizes.

    var fd1:FontDescription = new FontDescription();
    fd1.renderingMode = RenderingMode.CFF;
    fd1.cffHinting = CFFHinting.HORIZONTAL_STEM;

## Locking and cloning FontDescription

When a `FontDescription` object is assigned to an `ElementFormat`, its `locked`
property is automatically set to `true`. Attempting to modify a locked
`FontDescription` object throws an `IllegalOperationError`. The best practice is
to fully define such an object before assigning it to a `ElementFormat`.

If you want to modify an existing `FontDescription`, first check its `locked`
property. If it's `true`, use the `clone()` method to create an unlocked copy of
the object. The properties of this unlocked object can be changed, and it can
then be assigned to the `ElementFormat`. Any new lines created from this
`TextElement` have the new formatting. Previous lines created from this same
object are unchanged.

    package
    {
    	import flash.display.Sprite;
    	import flash.text.*;

    	public class FontDescriptionCloneExample extends Sprite
    	{
    		private var tb:TextBlock = new TextBlock();
    		private var te:TextElement;
    		private var ef1:ElementFormat;
    		private var ef2:ElementFormat;
    		private var fd1:FontDescription = new FontDescription();
    		private var fd2:FontDescription;

    		public function FontDescriptionCloneExample()
    		{
    			fd1.fontName = "Garamond";
    			ef1 = new ElementFormat(fd);
    			var str:String = "This is flash text";
    			te = new TextElement(str, ef);
    			tb.content = te;
    			var tx1:TextLine = tb.createTextLine(null,600);
    			addChild(tx1);

    			fd2 = (fd1.locked) ? fd1.clone() : fd1;
    			fd2.fontName = "Arial";
    			ef2 = (ef1.locked) ? ef1.clone() : ef1;
    			ef2.fontDescription = fd2;
    			tb.content.elementFormat = ef2;
    			var tx2:TextLine = tb.createTextLine(null,600);
    			addChild(tx2);
    		}
    	}
    }
