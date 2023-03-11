---
title: Embedding fonts
sidebar_position: 5
---

You can statically embed fonts in ActionScript through the `Embed` meta-data. Here is a basic example:

```actionscript
public final class Fonts {
    [Embed(
        source = 'path/to/font.ttf',
        fontName = 'Font Name',
        mimeType = 'application/x-font',
        advancedAntiAliasing = 'true',
        embedAsCFF = 'false'
    )]
    public static const myFont:Class;
}
```

Note that if you want to refer to that font, you also need to refer to this `Fonts` class somewhere in your ActionScript program.

## Using embedded font in a TextField

To use the font in a `TextField` object, you must set its `embedFonts` property to true and match the property `font` of the desired `TextFormat` with the `fontName` option from the `Embed` meta-data.

```actionscript
textField.embedFonts = true;
textField.defaultTextFormat = new TextFormat;
textField.defaultTextFormat.font = 'Font Name';
```

## Embed options

### `mimeType`

The `mimeType` can be set to either:

- `"application/x-font-truetype"`
- `"application/x-font"` (resolves to system font)

### `source`

Path to the font file relative to the ActionScript file that uses `Embed`.

### `fontFamily`

Defines a name for the font that can be used in style sheets.

### `fontStyle`

This option can be either:

- `"normal"`
- `"italic"`
- `"oblique"`

### `fontWeight`

This option can be either a number in quotes, such as `"700"` or one of the following: 

- `"normal"`
- `"bold"`
- `"heavy"`

### `advancedAntiAliasing`

Determines whether to include the advanced anti-aliasing information when embedding the font.

### `unicodeRange`

Specifies a range (or subset) of characters that compose the face of an embedded font, in the format `U+[beginning of range]-[end of range]`. Each character in a font that you use must be described; removing some of these characters reduces the overall size of the description information that Flash must include for each embedded font.

Examples:

- `[Embed(unicodeRange="U+0041")]`
- `[Embed(unicodeRange="U+0041-007F")]`
- `[Embed(unicodeRange="U+0041,U+0043-00FF,U+0045")]`

### `systemFont`

Allows to embed a system font. Replaces the option `source`. It will embed the font defined by "name" from the computer's Fonts folder.
