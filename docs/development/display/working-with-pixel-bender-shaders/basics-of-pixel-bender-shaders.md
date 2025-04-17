# Basics of Pixel Bender shaders

Adobe Pixel Bender is a programming language that is used to create or
manipulate image content. Using Pixel Bender you create a kernel, also known as
a shader. The shader defines a single function that executes on each of the
pixels of an image individually. The result of each call to the function is the
output color at that pixel coordinate in the image. Input images and parameter
values can be specified to customize the operation. In a single execution of a
shader, input and parameter values are constant. The only thing that varies is
the coordinate of the pixel whose color is the result of the function call.

Where possible, the shader function is called for multiple output pixel
coordinates in parallel. This improves shader performance and can provide
high-performance processing.

In ActionScript, three types of effects can be easily created using a shader:

- drawing fill

- blend mode

- filter

A shader can also be executed in stand-alone mode. Using stand-alone mode a
shader's result is accessed directly rather than pre-specifying its intended
use. The result can be accessed as image data or as binary or number data. The
data need not be image data at all. In this way you can give a shader a set of
data as an input. The shader processes the data, and you can access the result
data returned by the shader.

Pixel Bender support is available starting in Flash Player 10 and Adobe AIR 1.5.
Pixel Bender blends, filters, and fills are not supported under GPU rendering.
On mobile devices, Pixel Bender shaders do run under CPU rendering. However,
performance is not at the same level as on a desktop computer. Many shader
programs may only execute at a few frames per second.

#### Important concepts and terms

The following reference list contains important terms that you will encounter
when creating and using Pixel Bender shaders:

Kernel  
For Pixel Bender, a kernel is the same thing as a shader. Using Pixel Bender
your code defines a kernel, which defines a single function that executes on
each of the pixels of an image individually.

Pixel Bender bytecode  
When a Pixel Bender kernel is compiled it is transformed into Pixel Bender
bytecode. The bytecode is accessed and executed at run time.

Pixel Bender language  
The programming language used to create a Pixel Bender kernel.

Pixel Bender Toolkit  
The application that is used to create a Pixel Bender bytecode file from Pixel
Bender source code. The toolkit allows you to write, test, and compile Pixel
Bender source code.

Shader  
For the purposes of this document, a shader is a set of functionality written in
the Pixel Bender language. A shader's code creates a visual effect or performs a
calculation. In either case, the shader returns a set of data (usually the
pixels of an image). The shader performs the same operation on each data point,
with the only difference being the coordinates of the output pixel.The shader is
not written in ActionScript. It is written in the Pixel Bender language and
compiled into Pixel Bender bytecode. It can be embedded into a SWF file at
compile time or loaded as an external file at run time. In either case it is
accessed in ActionScript by creating a Shader object and linking that object to
the shader bytecode.

Shader input  
A complex input, usually bitmap image data, that is provided to a shader to use
in its calculations. For each input variable defined in a shader, a single value
(that is, a single image or set of binary data) is used for the entire execution
of the shader.

Shader parameter  
A single value (or limited set of values) that is provided to a shader to use in
its calculations. Each parameter value is defined for a single shader execution,
and the same value is used throughout the shader execution.

#### Working through the code examples

You may want to test the example code listings that are provided. Testing the
code involves running the code and viewing the results in the SWF that's
created. All the examples create content using the drawing API which uses or is
modified by the shader effect.

Most of the example code listings include two parts. One part is the Pixel
Bender source code for the shader used in the example. You must first use the
Pixel Bender Toolkit to compile the source code to a Pixel Bender bytecode file.
Follow these steps to create the Pixel Bender bytecode file:

1.  Open Adobe Pixel Bender Toolkit. If necessary, from the Build menu choose
```
"Turn on Flash Player warnings and errors."
```

2.  Copy the Pixel Bender code listing and paste it into the code editor pane of
```
the Pixel Bender Toolkit.
```

3.  From the File menu, choose "Export kernel filter for Flash Player."

4.  Save the Pixel Bender bytecode file in the same directory as the Flash
```
document. The file's name should match the name specified in the example
description.
```

The ActionScript part of each example is written as a class file. To test the
example in Flash Professional:

1.  Create an empty Flash document and save it to your computer.

2.  Create a new ActionScript file and save it in the same directory as the
```
Flash document. The file's name should match the name of the class in the
code listing. For instance, if the code listing defines a class named
MyApplication, use the name MyApplication.as to save the ActionScript file.
```

3.  Copy the code listing into the ActionScript file and save the file.

4.  In the Flash document, click a blank part of the Stage or work space to
```
activate the document Property inspector.
```

5.  In the Property inspector, in the Document Class field, enter the name of
```
the ActionScript class you copied from the text.
```

6.  Run the program using Control \> Test Movie

```
You will see the results of the example in the preview window.
```

These techniques for testing example code listings are explained in more detail
in
[How to Use ActionScript Examples](../../appendixes/how-to-use-actionscript-examples.md).
