# Using a shader

Once a Pixel Bender shader is available in ActionScript as a Shader object, it
can be used in several ways:

- Shader drawing fill: The shader defines the fill portion of a shape drawn
  using the drawing api

- Blend mode: The shader defines the blend between two overlapping display
  objects

- Filter: The shader defines a filter that modifies the appearance of visual
  content

- Stand-alone shader processing: The shader processing runs without specifying
  the intended use of the output. The shader can optionally run in the
  background, with the result is available when the processing completes. This
  technique can be used to generate bitmap data and also to process non-visual
  data.

- [Using a shader as a drawing fill](./using-a-shader-as-a-drawing-fill.md)

- [Using a shader as a blend mode](./using-a-shader-as-a-blend-mode.md)

- [Using a shader as a filter](./using-a-shader-as-a-filter.md)

- [Using a shader in stand-alone mode](./using-a-shader-in-stand-alone-mode.md)
