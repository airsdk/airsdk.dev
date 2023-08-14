# Shader filter

The ShaderFilter class lets you use a custom filter effect defined as a Pixel
Bender shader. Because the filter effect is written as a Pixel Bender shader,
the effect can be completely customized. The filtered content is passed in to
the shader as an image input, and the result of the shader operation becomes the
filter result.

Note: The Shader filter is available in ActionScript starting with Flash Player
10 and Adobe AIR 1.5.

To apply a shader filter to an object, you first create a Shader instance
representing the Pixel Bender shader that you are using. For details on the
procedure for creating a Shader instance and on how to specify input image and
parameter values, see
[Working with Pixel Bender shaders](../working-with-pixel-bender-shaders/index.md).

When using a shader as a filter, there are three important things to keep in
mind:

- The shader must be defined to accept at least one input image.

- The filtered object (the display object or BitmapData object to which the
  filter is applied) is passed to the shader as the first input image value.
  Because of this, do not manually specify a value for the first image input.

- If the shader defines more that one input image, the additional inputs must be
  specified manually (that is, by setting the `input` property of any
  ShaderInput instance that belongs to the Shader instance).

Once you have a Shader object for your shader, you create a ShaderFilter
instance. This is the actual filter object that you use like any other filter.
To create a ShaderFilter that uses a Shader object, call the `ShaderFilter()`
constructor and pass the Shader object as an argument, as shown in this listing:

    var myFilter:ShaderFilter = new ShaderFilter(myShader);

For a complete example of using a shader filter, see
[Using a shader as a filter](../working-with-pixel-bender-shaders/using-a-shader-as-a-filter.md).
