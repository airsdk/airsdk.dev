---
title: Applying blending modes
sidebar_position: 8
---

Blending modes involve combining the colors of one image (the base image) with the colors of another image (the blend image) to produce a third image—the resulting image is the one that is actually displayed on the screen. Each pixel value in an image is processed with the corresponding pixel value of the other image to produce a pixel value for that same position in the result.

Every display object has a `blendMode` property that can be set to one of the following blending modes. These are constants defined in the `BlendMode` class. Alternatively, you can use the String values (in parentheses) that are the actual values of the constants.

- `BlendMode.ADD` ( `"add"` ): Commonly used to create an animated lightening dissolve effect between two images.
- `BlendMode.ALPHA` ( `"alpha"` ): Commonly used to apply the transparency of the foreground on the background. (Not supported under GPU rendering.)
- `BlendMode.DARKEN` ( `"darken"` ): Commonly used to superimpose type. (Not supported under GPU rendering.)
- `BlendMode.DIFFERENCE` ( `"difference"` ): Commonly used to create more vibrant colors.
- `BlendMode.ERASE` ( `"erase"` ): Commonly used to cut out (erase) part of the background using the foreground alpha. (Not supported under GPU rendering.)
- `BlendMode.HARDLIGHT` ( `"hardlight"` ): Commonly used to create shading effects. (Not supported under GPU rendering.)
- `BlendMode.INVERT` ( `"invert"` ): Used to invert the background.
- `BlendMode.LAYER` ( `"layer"` ): Used to force the creation of a temporary buffer for precomposition for a particular display object. (Not supported under GPU rendering.)
- `BlendMode.LIGHTEN` ( `"lighten"` ): Commonly used to superimpose type. (Not supported under GPU rendering.)
- `BlendMode.MULTIPLY` ( `"multiply"` ): Commonly used to create shadows and depth effects.
- `BlendMode.NORMAL` ( `"normal"` ): Used to specify that the pixel values of the blend image override those of the base image.
- `BlendMode.OVERLAY` ( `"overlay"` ): Commonly used to create shading effects. (Not supported under GPU rendering.)
- `BlendMode.SCREEN` ( `"screen"` ): Commonly used to create highlights and lens flares.
- `BlendMode.SHADER` ( `"shader"` ): Used to specify that a Pixel Bender shader is used to create a custom blending effect. For more information about using shaders, see [Working with Pixel Bender shaders](/docs/development/display/working-with-pixel-bender-shaders/index.md) . (Not supported under GPU rendering.)
- `BlendMode.SUBTRACT` ( `"subtract"` ): Commonly used to create an animated darkening dissolve effect between two images.
