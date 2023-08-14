# Formatting text

A `TextBlock` object is a factory for creating lines of text. The content of a
`TextBlock` is assigned via the `TextElement` object. An `ElementFormat` object
handles the formatting for the text. The ElementFormat class defines such
properties as baseline alignment, kerning, tracking, text rotation, and font
size, color, and case. It also includes a `FontDescription`, which is covered in
detail in [Working with fonts](./working-with-fonts.md).

## Using the ElementFormat object

The constructor for the `ElementFormat` object takes any of a long list of
optional parameters, including a `FontDescription`. You can also set these
properties outside the constructor. The following example shows the relationship
of the various objects in defining and displaying a simple text line:

    package
    {
    	import flash.display.Sprite;
    	import flash.text.*;

    	public class ElementFormatExample extends Sprite
    	{
    		private var tb:TextBlock = new TextBlock();
    		private var te:TextElement;
    		private var ef:ElementFormat;
    		private var fd:FontDescription = new FontDescription();
    		private var str:String;
    		private var tl:TextLine;

    		public function ElementFormatExample()
    		{
    			fd.fontName = "Garamond";
    			ef = new ElementFormat(fd);
    			ef.fontSize = 30;
    			ef.color = 0xFF0000;
    			str = "This is flash text";
    			te = new TextElement(str, ef);
    			tb.content = te;
    			tl = tb.createTextLine(null,600);
    			addChild(tl);
    		}
    	}
    }

## Font color and transparency (alpha)

The `color` property of the `ElementFormat` object sets the font color. The
value is an integer representing the RGB components of the color; for example,
0xFF0000 for red and 0x00FF00 for green. The default is black (0x000000).

The `alpha` property sets the alpha transparency value for an element (both
`TextElement` and `GraphicElement`). Values can range from 0 (fully transparent)
to 1 (fully opaque, which is the default). Elements with an `alpha` of 0 are
invisible, but still active. This value is multiplied by any inherited alpha
values, thus making the element more transparent.

    var ef:ElementFormat = new ElementFormat();
    ef.alpha = 0.8;
    ef.color = 0x999999;

## Baseline alignment and shift

The font and size of the largest text in a line determine its dominant baseline.
You can override these values by setting `TextBlock.baselineFontDescription` and
`TextBlock.baselineFontSize`. You can align the dominant baseline with one of
several baselines within the text. These baselines include the ascent line and
the descent line or the ideographic top, center, or bottom.

![Text showing ascent line, baseline, decsent line and x-height](../../img/te_baseline_align2.png)

**A.** Ascent

**B.** Baseline

**C.** Descent

**D.** x-height

In the `ElementFormat` object, three properties determine baseline and alignment
characteristics. The `alignmentBaseline` property sets the main baseline of a
`TextElement` or `GraphicElement`. This baseline is the "snap-to" line for the
element, and it's to this position that the dominant baseline of all text
aligns.

The `dominantBaseline` property specifies which of the various baselines of the
element to use, which determines the vertical position of the element on the
line. The default value is `TextBaseline.ROMAN`, but it can also be set to have
the `IDEOGRAPHIC_TOP` or `IDEOGRAPHIC_BOTTOM` baselines be dominant.

The `baselineShift` property moves the baseline by a set number of pixels on the
y-axis. In normal (non-rotated) text, a positive value moves the baseline down
and a negative value moves it up.

## Typographic Case

The `TypographicCase` property of `ElementFormat` specifies text case, such as
uppercase, lowercase, or small caps.

    var ef_Upper:ElementFormat = new ElementFormat();
    ef_Upper.typographicCase = TypographicCase.UPPERCASE;

    var ef_SmallCaps:ElementFormat = new ElementFormat();
    ef_SmallCaps.typographicCase = TypographicCase.SMALL_CAPS;

## Rotating text

You can rotate a block of text or the glyphs within a segment of text in
increments of 90°. The TextRotation class defines the following constants for
setting both text block and glyph rotation:

| Constant   | Value        | Description                                                                                                                          |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| AUTO       | "auto"       | Specifies 90 degree counter-clockwise rotation. Typically used with vertical Asian text to rotate only glyphs that require rotation. |
| ROTATE_0   | "rotate_0"   | Specifies no rotation.                                                                                                               |
| ROTATE_180 | "rotate_180" | Specifies 180 degree rotation.                                                                                                       |
| ROTATE_270 | "rotate_270" | Specifies 270 degree rotation.                                                                                                       |
| ROTATE_90  | "rotate_90"  | Specifies 90 degree clockwise rotation.                                                                                              |

To rotate the lines of text in a text block, set the `TextBlock.lineRotation`
property before calling the `TextBlock.createTextLine()` method to create the
text line.

To rotate the glyphs within a block of text or a segment, set the
`ElementFormat.textRotation` property to the number of degrees that you want the
glyphs to rotate. A glyph is the shape that makes up a character, or a part of a
character that consists of multiple glyphs. The letter "a" and the dot on an
"i", for example, are glyphs.

Rotating glyphs is relevant in some Asian languages in which you want to rotate
the lines to vertical but not rotate the characters within the lines. For more
information on rotating Asian text, see
[Justifying East Asian text](./controlling-text.md#justifying-east-asian-text).

Here is an example of rotating both a block of text and the glyphs within, as
you would with Asian text. The example also uses a Japanese font:

    package
    {
    	import flash.display.Sprite;
    	import flash.text.*;

    	public class RotationExample extends Sprite
    	{
    		private var tb:TextBlock = new TextBlock();
    		private var te:TextElement;
    		private var ef:ElementFormat;
    		private var fd:FontDescription = new FontDescription();
    		private var str:String;
    		private var tl:TextLine;

    		public function RotationExample()
    		{
    			fd.fontName = "MS Mincho";
    			ef = new ElementFormat(fd);
    			ef.textRotation = TextRotation.AUTO;
    			str = "This is rotated Japanese text";
    			te = new TextElement(str, ef);
    			tb.lineRotation = TextRotation.ROTATE_90;
    			tb.content = te;
    			tl = tb.createTextLine(null,600);
    			addChild(tl);
    		}
    	}
    }

## Locking and cloning ElementFormat

When an `ElementFormat` object is assigned to any type of `ContentElement`, its
`locked` property is automatically set to `true`. Attempting to modify a locked
`ElementFormat` object throws an `IllegalOperationError`. The best practice is
to fully define such an object before assigning it to a `TextElement` instance.

If you want to modify an existing `ElementFormat` instance, first check its
`locked` property. If it's `true`, use the `clone()` method to create an
unlocked copy of the object. The properties of this unlocked object can be
changed, and it can then be assigned to the `TextElement` instance. Any new
lines created from it have the new formatting. Previous lines created from this
same object and using the old format are unchanged.

    package
    {
    	import flash.display.Sprite;
    	import flash.text.*;

    	public class ElementFormatCloneExample extends Sprite
    	{
    		private var tb:TextBlock = new TextBlock();
    		private var te:TextElement;
    		private var ef1:ElementFormat;
    		private var ef2:ElementFormat;
    		private var fd:FontDescription = new FontDescription();

    		public function ElementFormatCloneExample()
    		{
    			fd.fontName = "Garamond";
    			ef1 = new ElementFormat(fd);
    			ef1.fontSize = 24;
    			var str:String = "This is flash text";
    			te = new TextElement(str, ef);
    			tb.content = te;
    			var tx1:TextLine = tb.createTextLine(null,600);
    			addChild(tx1);

    			ef2 = (ef1.locked) ? ef1.clone() : ef1;
    			ef2.fontSize = 32;
    			tb.content.elementFormat = ef2;
    			var tx2:TextLine = tb.createTextLine(null,600);
    			addChild(tx2);
    		}
    	}
    }
