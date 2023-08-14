# Loading or embedding a shader

The first step in using a Pixel Bender shader in ActionScript is to get access
to the shader in your ActionScript code. Because a shader is created using the
Adobe Pixel Bender Toolkit, and written in the Pixel Bender language, it cannot
be directly accessed in ActionScript. Instead, you create an instance of the
Shader class that represents the Pixel Bender shader to ActionScript. The Shader
object allows you to find out information about the shader, such as whether it
expects parameters or input image values. You pass the Shader object to other
objects to actually use the shader. For example, to use the shader as a filter
you assign the Shader object to a ShaderFilter object's `shader` property.
Alternatively, to use the shader as a drawing fill, you pass the Shader object
as an argument to the `Graphics.beginShaderFill()` method.

Your ActionScript code can access a shader created by Adobe Pixel Bender Toolkit
(a .pbj file) in two ways:

- Loaded at run time: the shader file can be loaded as an external asset using a
  URLLoader object. This technique is like loading an external asset such as a
  text file. The following example demonstrates loading a shader bytecode file
  at run time and linking it to a Shader instance:

      var loader:URLLoader = new URLLoader();
      loader.dataFormat = URLLoaderDataFormat.BINARY;
      loader.addEventListener(Event.COMPLETE, onLoadComplete);
      loader.load(new URLRequest("myShader.pbj"));

      var shader:Shader;

      function onLoadComplete(event:Event):void {
        // Create a new shader and set the loaded data as its bytecode
        shader = new Shader();
        shader.byteCode = loader.data;

        // You can also pass the bytecode to the Shader() constructor like this:
        // shader = new Shader(loader.data);

        // do something with the shader
      }

- Embedded in the SWF file: the shader file can be embedded in the SWF file at
  compile time using the `[Embed]` metadata tag. The `[Embed]` metadata tag is
  only available if you use the Flex SDK to compile the SWF file. The `[Embed]`
  tag's `source` parameter points to the shader file, and its `mimeType`
  parameter is `"application/octet-stream"`, as in this example:

      [Embed(source="myShader.pbj", mimeType="application/octet-stream")]
      var MyShaderClass:Class;

      // ...

      // create a shader and set the embedded shader as its bytecode
      var shader:Shader = new Shader();
      shader.byteCode = new MyShaderClass();

      // You can also pass the bytecode to the Shader() constructor like this:
      // var shader:Shader = new Shader(new MyShaderClass());

      // do something with the shader

In either case, you link the raw shader bytecode (the `URLLoader.data` property
or an instance of the `[Embed]` data class) to the Shader instance. As the
previous examples demonstrate, you can assign the bytecode to the Shader
instance in two ways. You can pass the shader bytecode as an argument to the
`Shader()` constructor. Alternatively, you can set it as the Shader instance's
`byteCode` property.

Once a Pixel Bender shader has been created and linked to a Shader object, you
can use the shader to create effects in several ways. You can use it as a
filter, a blend mode, a bitmap fill, or for stand-alone processing of bitmap or
other data. You can also use the Shader object's `data` property to access the
shader's metadata, specify input images, and set parameter values.
