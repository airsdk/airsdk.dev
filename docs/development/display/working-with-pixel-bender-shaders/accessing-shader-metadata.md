# Accessing shader metadata

While creating a Pixel Bender shader kernel, the author can specify metadata
about the shader in the Pixel Bender source code. While using a shader in
ActionScript, you can examine the shader and extract its metadata.

When you create a Shader instance and link it to a Pixel Bender shader, a
ShaderData object containing data about the shader is created and stored in the
Shader object's `data` property. The ShaderData class doesn't define any
properties of its own. However, at run time a property is dynamically added to
the ShaderData object for each metadata value defined in the shader source code.
The name given to each property is the same as the name specified in the
metadata. For example, suppose the source code of a Pixel Bender shader includes
the following metadata definition:

    namespace : "Adobe::Example";
    vendor : "Bob Jones";
    version : 1;
    description : "Creates a version of the specified image with the specified brightness.";

The ShaderData object created for that shader is created with the following
properties and values:

- `namespace` (String): `"Adobe::Example"`

- `vendor` (String): `"Bob Jones"`

- `version` (String): `"1"`

- `description` (String):
  `"Creates a version of the specified image with the specified brightness"`

Because metadata properties are dynamically added to the ShaderData object, you
can use a `for..in` loop to examine the ShaderData object. Using this technique
you can find out whether the shader has any metadata and what the metadata
values are. In addition to metadata properties, a ShaderData object can have
properties representing inputs and parameters that are defined in the shader.
When you use a `for..in` loop to examine a ShaderData object, check the data
type of each property to determine whether the property is an input (a
ShaderInput instance), a parameter (a ShaderParameter instance), or a metadata
value (a String instance). The following example shows how to use a `for..in`
loop to examine the dynamic properties of a shader's `data` property. Each
metadata value is added to a Vector instance named `metadata`. Note that this
example assumes a Shader instance named `myShader` is already created:

    var shaderData:ShaderData = myShader.data;
    var metadata:Vector.<String> = new Vector.<String>();

    for (var prop:String in shaderData)
    {
        if (!(shaderData[prop] is ShaderInput) && !(shaderData[prop] is ShaderParameter))
        {
            metadata[metadata.length] = shaderData[prop];
        }
    }

    // do something with the metadata

For a version of this example that also extracts shader inputs and parameters,
see
[Identifying shader inputs and parameters](./specifying-shader-input-and-parameter-values.md#identifying-shader-inputs-and-parameters).
For more information about input and parameter properties, see
[Specifying shader input and parameter values](./specifying-shader-input-and-parameter-values.md).
