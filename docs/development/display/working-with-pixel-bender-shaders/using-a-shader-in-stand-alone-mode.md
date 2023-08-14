# Using a shader in stand-alone mode

When you use a shader in stand-alone mode, the shader processing runs
independent of how you intend to use the output. You specify a shader to
execute, set input and parameter values, and designate an object into which the
result data is placed. You can use a shader in stand-alone mode for two reasons:

- Processing non-image data: In stand-alone mode, you can choose to pass
  arbitrary binary or number data to the shader rather than bitmap image data.
  You can choose to have the shader result be returned as binary data or number
  data in addition to bitmap image data.

- Background processing: When you run a shader in stand-alone mode, by default
  the shader executes asynchronously. This means that the shader runs in the
  background while your application continues to run, and your code is notified
  when the shader processing finishes. You can use a shader that takes a long
  time to run and it doesn't freeze up the application user interface or other
  processing while the shader is running.

You use a ShaderJob object to execute a shader in stand-alone mode. First you
create the ShaderJob object and link it to the Shader object representing the
shader to execute:

    var job:ShaderJob = new ShaderJob(myShader);

Next, you set any input or parameter values that the shader expects. If you are
executing the shader in the background, you also register a listener for the
ShaderJob object's `complete` event. Your listener is called when the shader
finishes its work:

    function completeHandler(event:ShaderEvent):void
    {
        // do something with the shader result
    }

    job.addEventListener(ShaderEvent.COMPLETE, completeHandler);

Next, you create an object into which the shader operation result is written
when the operation finishes. You assign that object to the ShaderJob object's
`target` property:

    var jobResult:BitmapData = new BitmapData(100, 75);
    job.target = jobResult;

Assign a BitmapData instance to the `target` property if you are using the
ShaderJob to perform image processing. If you are processing binary or number
data, assign a ByteArray object or Vector.\<Number\> instance to the `target`
property. In that case, you must set the ShaderJob object's `width` and `height`
properties to specify the amount of data to output to the `target` object.

Note: You can set the ShaderJob object's `shader`, `target`, `width`, and
`height` properties in one step by passing arguments to the `ShaderJob()`
constructor, like this:
`var job:ShaderJob = new ShaderJob(myShader, myTarget, myWidth, myHeight);`

When you are ready to execute the shader, you call the ShaderJob object's
`start()`) method:

    job.start();

By default calling `start()` causes the ShaderJob to execute asynchronously. In
that case program execution continues immediately with the next line of code
rather than waiting for the shader to finish. When the shader operation
finishes, the ShaderJob object calls its `complete` event listeners, notifying
them that it is done. At that point (that is, in the body of your `complete`
event listener) the `target` object contains the shader operation result.

Note: Instead of using the `target` property object, you can retrieve the shader
result directly from the event object that's passed to your listener method. The
event object is a ShaderEvent instance. The ShaderEvent object has three
properties that can be used to access the result, depending on the data type of
the object you set as the `target` property: `ShaderEvent.bitmapData`,
`ShaderEvent.byteArray`, and `ShaderEvent.vector`.

Alternatively, you can pass a `true` argument to the `start()` method. In that
case the shader operation executes synchronously. All code (including
interaction with the user interface and any other events) pauses while the
shader executes. When the shader finishes, the `target` object contains the
shader result and the program continues with the next line of code.

    job.start(true);
