---
sidebar_position: 5
---

# Handling synchronous errors in an application

The most common error handling is synchronous error-handling logic, where you
insert statements into your code to catch synchronous errors while an
application is running. This type of error handling lets your application notice
and recover from run-time errors when functions fail. The logic for catching a
synchronous error includes `try..catch..finally` statements, which literally try
an operation, catch any error response from the Flash runtime, and finally
execute some other operation to handle the failed operation.

## Using try catch finally statements

When you work with synchronous run-time errors, use the `try..catch..finally`
statements to catch errors. When a run-time error occurs, the Flash runtime
throws an exception, which means that it suspends normal execution and creates a
special object of type Error. The Error object is then thrown to the first
available `catch` block.

The `try` statement encloses statements that have the potential to create
errors. You always use the `catch` statement with a `try` statement. If an error
is detected in one of the statements in the `try` statement block, the `catch`
statements that are attached to that `try` statement run.

The `finally` statement encloses statements that run whether an error occurs in
the `try` block. If there is no error, the statements within the `finally` block
execute after the `try` block statements complete. If there is an error, the
appropriate `catch` statement executes first, followed by the statements in the
`finally` block.

The following code demonstrates the syntax for using the `try..catch..finally`
statements:

```
try
{
    // some code that could throw an error
}
catch (err:Error)
{
    // code to react to the error
}
finally
{
    // Code that runs whether an error was thrown. This code can clean
    // up after the error, or take steps to keep the application running.
}
```

Each `catch` statement identifies a specific type of exception that it handles.
The `catch` statement can specify only error classes that are subclasses of the
Error class. Each `catch` statement is checked in order. Only the first `catch`
statement that matches the type of error thrown runs. In other words, if you
first check the higher-level Error class and then a subclass of the Error class,
only the higher-level Error class matches. The following code illustrates this
point:

```
try
{
    throw new ArgumentError("I am an ArgumentError");
}
catch (error:Error)
{
    trace("<Error> " + error.message);
}
catch (error:ArgumentError)
{
    trace("<ArgumentError> " + error.message);
}
```

The previous code displays the following output:

```
<Error> I am an ArgumentError
```

To correctly catch the ArgumentError, make sure that the most specific error
types are listed first and the more generic error types are listed later, as the
following code shows:

```
try
{
    throw new ArgumentError("I am an ArgumentError");
}
catch (error:ArgumentError)
{
    trace("<ArgumentError> " + error.message);
}
catch (error:Error)
{
    trace("<Error> " + error.message);
}
```

Several methods and properties in the ActionScript API throw run-time errors if
they encounter errors while they execute. For example, the `close()` method in
the Sound class throws an IOError if the method is unable to close the audio
stream, as demonstrated in the following code:

```
var mySound:Sound = new Sound();
try
{
    mySound.close();
}
catch (error:IOError)
{
    // Error #2029: This URLStream object does not have an open stream.
}
```

As you become more familiar with the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html),
you'll notice which methods throw exceptions, as detailed in each method's
description.

## The throw statement

Flash runtimes throw exceptions when they encounter errors in your running
application. In addition, you can explicitly throw exceptions yourself using the
`throw` statement. When explicitly throwing errors, Adobe recommends that you
throw instances of the Error class or its subclasses. The following code
demonstrates a `throw` statement that throws an instance of the Error class,
`MyErr`, and eventually calls a function, `myFunction()`, to respond after the
error is thrown:

```
var MyError:Error = new Error("Encountered an error with the numUsers value", 99);
var numUsers:uint = 0;
try
{
    if (numUsers == 0)
    {
        trace("numUsers equals 0");
    }
}
catch (error:uint)
{
    throw MyError; // Catch unsigned integer errors.
}
catch (error:int)
{
    throw MyError; // Catch integer errors.
}
catch (error:Number)
{
    throw MyError; // Catch number errors.
}
catch (error:*)
{
    throw MyError; // Catch any other error.
}
finally
{
    myFunction(); // Perform any necessary cleanup here.
}
```

Notice that the `catch` statements are ordered so that the most specific data
types are listed first. If the `catch` statement for the Number data type is
listed first, neither the catch statement for the uint data type nor the catch
statement for the int data type is ever run.

Note: In the Java programming language, each function that can throw an
exception must declare this fact, listing the exception classes it can throw in
a `throws` clause attached to the function declaration. ActionScript does not
require you to declare the exceptions thrown by a function.

## Displaying a simple error message

One of the biggest benefits of the new exception and error event model is that
it allows you to tell users when and why an action has failed. Your part is to
write the code to display the message and offer options in response.

The following code shows a simple `try..catch` statement to display the error in
a text field:

```
package
{
    import flash.display.Sprite;
    import flash.text.TextField;

    public class SimpleError extends Sprite
    {
        public var employee:XML =
            <EmpCode>
                <costCenter>1234</costCenter>
                <costCenter>1-234</costCenter>
            </EmpCode>;

        public function SimpleError()
        {
            try
            {
                if (employee.costCenter.length() != 1)
                {
                    throw new Error("Error, employee must have exactly one cost center assigned.");
                }
            }
            catch (error:Error)
            {
                var errorMessage:TextField = new TextField();
                errorMessage.autoSize = TextFieldAutoSize.LEFT;
                errorMessage.textColor = 0xFF0000;
                errorMessage.text = error.message;
                addChild(errorMessage);
            }
        }
    }
}
```

Using a wider range of error classes and built-in compiler errors, ActionScript
3.0 offers more information than previous versions of ActionScript about why
something has failed. This information enables you to build more stable
applications with better error handling.

## Rethrowing errors

When you build applications, there are several occasions in which you need to
rethrow an error if you are unable to handle the error properly. For example,
the following code shows a nested `try..catch` block, which rethrows a custom
ApplicationError if the nested `catch` block is unable to handle the error:

```
try
{
    try
    {
        trace("<< try >>");
        throw new ApplicationError("some error which will be rethrown");
    }
    catch (error:ApplicationError)
    {
        trace("<< catch >> " + error);
        trace("<< throw >>");
        throw error;
    }
    catch (error:Error)
    {
        trace("<< Error >> " + error);
    }
}
catch (error:ApplicationError)
{
    trace("<< catch >> " + error);
}
```

The output from the previous snippet would be the following:

```
<< try >>
<< catch >> ApplicationError: some error which will be rethrown
<< throw >>
<< catch >> ApplicationError: some error which will be rethrown
```

The nested `try` block throws a custom ApplicationError error that is caught by
the subsequent `catch` block. This nested `catch` block can try to handle the
error, and if unsuccessful, throw the ApplicationError object to the enclosing
`try..catch` block.
