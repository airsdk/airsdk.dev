# Specifying shader input and parameter values

Many Pixel Bender shaders are defined to use one or more input images that are
used in the shader processing. For example, it's common for a shader to accept a
source image and output that image with a particular effect applied to it.
Depending on how the shader is used the input value may be specified
automatically or you may need to explicitly provide a value. Similarly, many
shaders specify parameters that are used to customize the output of the shader.
You must also explicitly set a value for each parameter before using the shader.

You use the Shader object's `data` property to set shader inputs and parameters
and to determine whether a particular shader expects inputs or parameters. The
`data` property is a ShaderData instance.

## Identifying shader inputs and parameters

The first step in specifying shader input and parameter values is to find out
whether the particular shader you're using expects any input images or
parameters. Each Shader instance has a `data` property containing a ShaderData
object. If the shader defines any inputs or parameters, they are accessed as
properties of that ShaderData object. The properties' names match the names
specified for the inputs and parameters in the shader source code. For example,
if a shader defines an input named `src`, the ShaderData object has a property
named `src` representing that input. Each property that represents an input is a
ShaderInput instance, and each property that represents a parameter is a
ShaderParameter instance.

Ideally, the author of the shader provides documentation for the shader,
indicating what input image values and parameters the shader expects, what they
represent, the appropriate values, and so forth.

However, if the shader isn't documented (and you don't have its source code) you
can inspect the shader data to identify the inputs and parameters. The
properties representing inputs and parameters are dynamically added to the
ShaderData object. Consequently, you can use a `for..in` loop to examine the
ShaderData object to find out whether its associated shader defines any inputs
or parameters. As described in
[Accessing shader metadata](./accessing-shader-metadata.md), any metadata value
defined for a shader is also accessed as a dynamic property added to the
`Shader.data` property. When you use this technique to identify shader inputs
and parameters, check the data type of the dynamic properties. If a property is
a ShaderInput instance it represents an input. If it is a ShaderParameter
instance it represents a parameter. Otherwise, it is a metadata value. The
following example shows how to use a `for..in` loop to examine the dynamic
properties of a shader's `data` property. Each input (ShaderInput object) is
added to a Vector instance named `inputs`. Each parameter (ShaderParameter
object) is added to a Vector instance named `parameters`. Finally, any metadata
properties are added to a Vector instance named `metadata`. Note that this
example assumes a Shader instance named `myShader` is already created:

    var shaderData:ShaderData = myShader.data;
    var inputs:Vector.<ShaderInput> = new Vector.<ShaderInput>();
    var parameters:Vector.<ShaderParameter> = new Vector.<ShaderParameter>();
    var metadata:Vector.<String> = new Vector.<String>();

    for (var prop:String in shaderData)
    {
    	if (shaderData[prop] is ShaderInput)
    	{
    		inputs[inputs.length] = shaderData[prop];
    	}
    	else if (shaderData[prop] is ShaderParameter)
    	{
    		parameters[parameters.length] = shaderData[prop];
    	}
    	else
    	{
    		metadata[metadata.length] = shaderData[prop];
    	}
    }

    // do something with the inputs or properties

## Specifying shader input values

Many shaders expect one or more input images that are used in the shader
processing. However, in many cases an input is specified automatically when the
Shader object is used. For example, suppose a shader requires one input, and
that shader is used as a filter. When the filter is applied to a display object
or BitmapData object, that object is automatically set as the input. In that
case you do not explicitly set an input value.

However, in some cases, especially if a shader defines multiple inputs, you do
explicitly set a value for an input. Each input that is defined in a shader is
represented in ActionScript by a ShaderInput object. The ShaderInput object is a
property of the ShaderData instance in the Shader object's `data` property, as
described in
[Identifying shader inputs and parameters](./specifying-shader-input-and-parameter-values.md#identifying-shader-inputs-and-parameters).
For example, suppose a shader defines an input named `src`, and that shader is
linked to a Shader object named `myShader`. In that case you access the
ShaderInput object corresponding to the `src` input using the following
identifier:

    myShader.data.src

Each ShaderInput object has an `input` property that is used to set the value
for the input. You set the `input` property to a BitmapData instance to specify
image data. You can also set the `input` property to a BitmapData or
Vector.\<Number\> instance to specify binary or number data. For details and
restrictions on using a BitmapData or Vector.\<Number\> instance as an input,
see the
[`ShaderInput.input`](https://airsdk.dev/reference/actionscript/3.0/flash/display/ShaderInput.html#input)
listing in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).

In addition to the `input` property, a ShaderInput object has properties that
can be used to determine what type of image the input expects. These properties
include the `width`, `height`, and `channels` properties. Each ShaderInput
object also has an `index` property that is useful for determining whether an
explicit value must be provided for the input. If a shader expects more inputs
than the number that are automatically set, then you set values for those
inputs. For details on the different ways to use a shader, and whether input
values are automatically set, see [Using a shader](./using-a-shader.md).

## Specifying shader parameter values

Some shaders define parameter values that the shader uses in creating its
result. For example, a shader that alters the brightness of an image might
specify a brightness parameter that determines how much the operation affects
the brightness. A single parameter defined in a shader can expect a single value
or multiple values, according to the parameter definition in the shader. Each
parameter that is defined in a shader is represented in ActionScript by a
ShaderParameter object. The ShaderParameter object is a property of the
ShaderData instance in the Shader object's data property, as described in
[Identifying shader inputs and parameters](./specifying-shader-input-and-parameter-values.md#identifying-shader-inputs-and-parameters).
For example, suppose a shader defines a parameter named `brightness`, and that
shader is represented by a Shader object named `myShader`. In that case you
access the ShaderParameter corresponding to the `brightness` parameter using the
following identifier:

    myShader.data.brightness

To set a value (or values) for the parameter, create an ActionScript array
containing the value or values and assign that array to the ShaderParameter
object's `value` property. The `value` property is defined as an Array instance
because it's possible that a single shader parameter requires multiple values.
Even if the shader parameter only expects a single value, you must wrap the
value in an Array object to assign it to the `ShaderParameter.value` property.
The following listing demonstrates setting a single value as the `value`
property:

    myShader.data.brightness.value = [75];

If the Pixel Bender source code for the shader defines a default value for the
parameter, an array containing the default value or values is created and
assigned to the ShaderParameter object's `value` property when the Shader object
is created. Once an array has been assigned to the `value` property (including
if it's the default array) the parameter value can be changed by changing the
value of the array element. You do not need to create a new array and assign it
to the `value` property.

The following example demonstrates setting a shader's parameter value in
ActionScript. In this example the shader defines a parameter named `color`. The
`color` parameter is declared as a `float4` variable in the Pixel Bender source
code, which means it is an array of four floating point numbers. In the example,
the `color` parameter value is changed continuously, and each time it changes
the shader is used to draw a colored rectangle on the screen. The result is an
animated color change.

Note: The code for this example was written by Ryan Taylor. Thank you Ryan for
sharing this example. 

The ActionScript code centers around three methods:

- `init()` : In the `init()` method the code loads the Pixel Bender bytecode
  file containing the shader. When the file loads, the `onLoadComplete()` method
  is called.

- `onLoadComplete()` : In the `onLoadComplete()` method the code creates the
  Shader object named `shader`. It also creates a Sprite instance named
  `texture`. In the `renderShader()` method, the code draws the shader result
  into `texture` once per frame.

- `onEnterFrame()` : The `onEnterFrame()` method is called once per frame,
  creating the animation effect. In this method, the code sets the shader
  parameter value to the new color, then calls the `renderShader()` method to
  draw the shader result as a rectangle.

- `renderShader()` : In the `renderShader()` method, the code calls the
  `Graphics.beginShaderFill()` method to specify a shader fill. It then draws a
  rectangle whose fill is defined by the shader output (the generated color) For
  more information on using a shader in this way, see
  [Using a shader as a drawing fill](./using-a-shader-as-a-drawing-fill.md).

The following is the ActionScript code for this example. Use this class as the
main application class for an ActionScript-only project in Flash Builder, or as
the document class for the FLA file in Flash Professional:

    package
    {
    	import flash.display.Shader;
    	import flash.display.Sprite;
    	import flash.events.Event;
    	import flash.net.URLLoader;
    	import flash.net.URLLoaderDataFormat;
    	import flash.net.URLRequest;

    	public class ColorFilterExample extends Sprite
    	{
    		private const DELTA_OFFSET:Number = Math.PI * 0.5;
    		private var loader:URLLoader;
    		private var shader:Shader;
    		private var texture:Sprite;
    		private var delta:Number = 0;

    		public function ColorFilterExample()
    		{
    			init();
    		}

    		private function init():void
    		{
    			loader = new URLLoader();
    			loader.dataFormat = URLLoaderDataFormat.BINARY;
    			loader.addEventListener(Event.COMPLETE, onLoadComplete);
    			loader.load(new URLRequest("ColorFilter.pbj"));
    		}

    		private function onLoadComplete(event:Event):void
    		{
    			shader = new Shader(loader.data);

    			texture = new Sprite();

    			addChild(texture);

    			addEventListener(Event.ENTER_FRAME, onEnterFrame);
    		}
    		private function onEnterFrame(event:Event):void
    		{
    			shader.data.color.value[0] = 0.5 + Math.cos(delta - DELTA_OFFSET) * 0.5;
    			shader.data.color.value[1] = 0.5 + Math.cos(delta) * 0.5;
    			shader.data.color.value[2] = 0.5 + Math.cos(delta + DELTA_OFFSET) * 0.5;
    			// The alpha channel value (index 3) is set to 1 by the kernel's default
    			// value. This value doesn't need to change.

    			delta += 0.1;

    			renderShader();
    		}

    		private function renderShader():void
    		{
    			texture:graphics.clear();
    			texture.graphics.beginShaderFill(shader);
    			texture.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
    			texture.graphics.endFill();
    		}
    	}
    }

The following is the source code for the ColorFilter shader kernel, used to
create the "ColorFilter.pbj" Pixel Bender bytecode file:

    <languageVersion : 1.0;>
    kernel ColorFilter
    <
    namespace : "boostworthy::Example";
    vendor : "Ryan Taylor";
    version : 1;
    description : "Creates an image where every pixel has the specified color value.";
    >
    {
    	output pixel4 result;

    	parameter float4 color
    	<
    		minValue:float4(0, 0, 0, 0);
    		maxValue:float4(1, 1, 1, 1);
    		defaultValue:float4(0, 0, 0, 1);
    	>;

    	void evaluatePixel()
    	{
    		result = color;
    	}
    }

If you're using a shader whose parameters aren't documented, you can figure out
how many elements of what type must be included in the array by checking the
ShaderParameter object's `type` property. The `type` property indicates the data
type of the parameter as defined in the shader itself. For a list of the number
and type of elements expected by each parameter type, see the
`ShaderParameter.value` property listing in the ActionScript 3.0 Reference.

Each ShaderParameter object also has an `index` property that indicates where
the parameter fits in the order of the shader's parameters. In addition to these
properties, a ShaderParameter object can have additional properties containing
metadata values provided by the shader's author. For example, the author can
specify metadata values such as minimum, maximum, and default values for a
parameter. Any metadata values that the author specifies are added to the
ShaderParameter object as dynamic properties. To examine those properties, use a
`for..in` loop to loop over the ShaderParameter object's dynamic properties to
identify its metadata. The following example shows how to use a `for..in` loop
to identify a ShaderParameter object's metadata. Each metadata value is added to
a Vector instance named `metadata`. Note that this example assumes a Shader
instance named `myShader` is already created, and that it is known to have a
parameter named `brightness`:

    var brightness:ShaderParameter = myShader.data.brightness;
    var metadata:Vector.<String> = new Vector.<String>();

    for (var prop:String in brightness)
    {
    	if (brightness[prop] is String)
    	{
    		metadata[metadata.length] = brightness[prop];
    	}
    }

    // do something with the metadata
