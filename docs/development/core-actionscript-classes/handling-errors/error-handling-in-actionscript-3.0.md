---
sidebar_position: 3
---

# Error handling in ActionScript 3.0

Since many applications can run without building the logic to handle errors,
developers are tempted to postpone building error handling into their
applications. However, without error handling, an application can easily stall
or frustrate the user if something doesn't work as expected. ActionScript 2.0
has an Error class that allows you to build logic into custom functions to throw
an exception with a specific message. Because error handling is critical for
making a user-friendly application, ActionScript 3.0 includes an expanded
architecture for catching errors.

Note: While the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html)
documents the exceptions thrown by many methods, it might not include all
possible exceptions for each method. A method might throw an exception for
syntax errors or other problems that are not noted explicitly in the method
description, even when the description does list some of the exceptions a method
throws.

## ActionScript 3.0 error-handling elements

ActionScript 3.0 includes many tools for error handling, including:

- Error classes. ActionScript 3.0 includes a broad range of Error classes to
  expand the scope of situations that can produce error objects. Each Error
  class helps applications handle and respond to specific error conditions,
  whether they are related to system errors (like a MemoryError condition),
  coding errors (like an ArgumentError condition), networking and communication
  errors (like a URIError condition), or other situations. For more information
  on each class, see
  [Comparing the Error classes](./comparing-the-error-classes.md).

- Fewer silent failures. In earlier versions of Flash Player, errors were
  generated and reported only if you explicitly used the `throw` statement. For
  Flash Player 9 and later Flash runtimes, native ActionScript methods and
  properties throw run-time errors. These errors allow you to handle these
  exceptions more effectively when they occur, then react to each exception,
  individually.

- Clear error messages displayed during debugging. When you are using the
  debugger version of a Flash runtime, problematic code or situations generate
  robust error messages, which help you easily identify reasons why a particular
  block of code fails. These messages make fixing errors more efficient. For
  more information, see
  [Working with the debugger versions of Flash runtimes](./working-with-the-debugger-versions-of-flash-runtimes.md).

- Precise errors allow for clear error messages displayed to users. In previous
  versions of Flash Player, the `FileReference.upload()` method returned a
  Boolean value of `false` if the `upload()` call was unsuccessful, indicating
  one of five possible errors. If an error occurs when you call the `upload()`
  method in ActionScript 3.0, four specific errors help you display more
  accurate error messages to end users.

- Refined error handling. Distinct errors are thrown for many common situations.
  For example, in ActionScript 2.0, before a FileReference object has been
  populated, the `name` property has the value `null` (so, before you can use or
  display the `name` property, ensure that the value is set and not `null`). In
  ActionScript 3.0, if you attempt to access the `name` property before it has
  been populated, Flash Player or AIR throws an IllegalOperationError, which
  informs you that the value has not been set, and you can use
  `try..catch..finally` blocks to handle the error. For more information see
  [Using try..catch..finally statements](./handling-synchronous-errors-in-an-application.md#using-try-catch-finally-statements).

- No significant performance drawbacks. Using `try..catch..finally` blocks to
  handle errors takes little or no additional resources compared to previous
  versions of ActionScript.

- An ErrorEvent class that allows you to build listeners for specific
  asynchronous error events. For more information see
  [Responding to error events and status](./responding-to-error-events-and-status.md).

## Error-handling strategies

As long as your application doesn't encounter a problematic condition, it can
still run successfully if you don't build error-handling logic into your code.
However, if you don't actively handle errors and your application does encounter
a problem, your users will never know why your application fails when it does.

There are different ways you can approach error handling in your application.
The following list summarizes the three major options for handling errors:

- Use `try..catch..finally` statements. These statements catch synchronous
  errors as they occur. You can nest your statements into a hierarchy to catch
  exceptions at various levels of code execution. For more information, see
  [Using try..catch..finally statements](./handling-synchronous-errors-in-an-application.md#using-try-catch-finally-statements).

- Create your own custom error objects. You can use the Error class to create
  your own custom error objects to track specific operations in your application
  that are not covered by built-in error types. Then you can use
  `try..catch..finally` statements on your custom error objects. For more
  information see
  [Creating custom error classes](./creating-custom-error-classes.md).

- Write event listeners and handlers to respond to error events. By using this
  strategy, you can create global error handlers that let you handle similar
  events without duplicating much code in `try..catch..finally` blocks. You are
  also more likely to catch asynchronous errors using this approach. For more
  information, see
  [Responding to error events and status](./responding-to-error-events-and-status.md).
