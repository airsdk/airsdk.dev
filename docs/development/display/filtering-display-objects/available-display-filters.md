# Available display filters

ActionScript 3.0 includes ten filter classes that you can apply to display
objects and BitmapData objects:

- Bevel filter (BevelFilter class)

- Blur filter (BlurFilter class)

- Drop shadow filter (DropShadowFilter class)

- Glow filter (GlowFilter class)

- Gradient bevel filter (GradientBevelFilter class)

- Gradient glow filter (GradientGlowFilter class)

- Color matrix filter (ColorMatrixFilter class)

- Convolution filter (ConvolutionFilter class)

- Displacement map filter (DisplacementMapFilter class)

- Shader filter (ShaderFilter class)

The first six filters are simple filters that can be used to create one specific
effect, with some customization of the effect available. Those six filters can
be applied using ActionScript, and can also be applied to objects in Flash
Professional using the Filters panel. Consequently, even if you're applying
filters using ActionScript, if you have Flash Professional you can use the
visual interface to quickly try out different filters and settings to figure out
how to create a desired effect.

The final four filters are available in ActionScript only. Those filters, the
color matrix filter, convolution filter, displacement map filter, and shader
filter, are much more flexible in the types of effects that they can be used to
create. Rather than being optimized for a single effect, they provide power and
flexibility. For example, by selecting different values for its matrix, the
convolution filter can be used to create effects such as blurring, embossing,
sharpening, finding color edges, transformations, and more.

Each of the filters, whether simple or complex, can be customized using their
properties. Generally, you have two choices for setting filter properties. All
the filters let you set the properties by passing parameter values to the filter
object's constructor. Alternatively, whether or not you set the filter
properties by passing parameters, you can adjust the filters later by setting
values for the filter object's properties. Most of the example code listings set
the properties directlyto make the example easier to follow. Nevertheless, you
could usually achieve the same result in fewer lines of code by passing the
values as parameters in the filter object's constructor. For more details on the
specifics of each filter, its properties and its constructor parameters, see the
listings for the
[flash.filters package](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/filters/package-detail.html)
in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

- [Bevel filter](./bevel-filter.md)

- [Blur filter](./blur-filter.md)

- [Drop shadow filter](./drop-shadow-filter.md)

- [Glow filter](./glow-filter.md)

- [Gradient bevel filter](./gradient-bevel-filter.md)

- [Gradient glow filter](./gradient-glow-filter.md)

- [Example: Combining basic filters](./example-combining-basic-filters.md)

- [Color matrix filter](./color-matrix-filter.md)

- [Convolution filter](./convolution-filter.md)

- [Displacement map filter](./displacement-map-filter.md)

- [Shader filter](./shader-filter.md)
