---
sidebar_position: 2
---

# Types of errors

When you develop and run applications, you encounter different types of errors
and error terminology. The following list introduces the major error types and
terms:

- _Compile-time errors_ are raised by the ActionScript compiler during code
  compilation. Compile-time errors occur when syntactical problems in your code
  prevent your application from being built.

- _Run-time errors_ occur when you run your application after you compile it.
  Run-time errors represent errors that are caused while a SWF file plays in a
  Flash runtime (such as Adobe Flash Player or Adobe AIR). In most cases, you
  handle run-time errors as they occur, reporting them to the user and taking
  steps to keep your application running. If the error is a fatal error, such as
  not being able to connect to a remote website or load required data, you can
  use error handling to allow your application to finish, gracefully.

- _Synchronous errors_ are run-time errors that occur at the time a function is
  called—for example, when you try to use a specific method and the argument you
  pass to the method is invalid, so the Flash runtime throws an exception. Most
  errors occur synchronously—at the time the statement executes—and the flow of
  control passes immediately to the most applicable `catch` statement.

  For example, the following code excerpt throws a run-time error because the
  `browse()` method is not called before the program attempts to upload a file:

      var fileRef:FileReference = new FileReference();
      try
      {
          fileRef.upload(new URLRequest("http://www.yourdomain.com/fileupload.cfm"));
      }
      catch (error:IllegalOperationError)
      {
          trace(error);
          // Error #2037: Functions called in incorrect sequence, or earlier
          // call was unsuccessful.
      }

  In this case, a run-time error is thrown synchronously because Flash Player
  determined that the `browse()` method was not called before the file upload
  was attempted.

  For detailed information on synchronous error handling, see
  [Handling synchronous errors in an application](./handling-synchronous-errors-in-an-application.md).

- _Asynchronous_ _errors_ are run-time errors that occur outside of the normal
  program flow. They generate events and event listeners catch them. An
  asynchronous operation is one in which a function initiates an operation, but
  doesn't wait for it to complete. You can create an error event listener to
  wait for the application or user to try some operation. If the operation
  fails, you catch the error with an event listener and respond to the error
  event. Then, the event listener calls an event handler function to respond to
  the error event in a useful manner. For example, the event handler could
  launch a dialog box that prompts the user to resolve the error.

  Consider the file-upload synchronous error example presented earlier. If you
  successfully call the `browse()` method before beginning a file upload, Flash
  Player would dispatch several events. For example, when an upload starts, the
  `open` event is dispatched. When the file upload operation completes
  successfully, the `complete` event is dispatched. Because event handling is
  asynchronous (that is, it does not occur at specific, known, predesignated
  times), use the `addEventListener()` method to listen for these specific
  events, as the following code shows:

      var fileRef:FileReference = new FileReference();
      fileRef.addEventListener(Event.SELECT, selectHandler);
      fileRef.addEventListener(Event.OPEN, openHandler);
      fileRef.addEventListener(Event.COMPLETE, completeHandler);
      fileRef.browse();

      function selectHandler(event:Event):void
      {
          trace("...select...");
          var request:URLRequest = new URLRequest("http://www.yourdomain.com/fileupload.cfm");
          request.method = URLRequestMethod.POST;
          event.target.upload(request);
      }
      function openHandler(event:Event):void
      {
          trace("...open...");
      }
      function completeHandler(event:Event):void
      {
          trace("...complete...");
      }

  For detailed information on asynchronous error handling, see
  [Responding to error events and status](./responding-to-error-events-and-status.md).

- _Uncaught exceptions_ are errors thrown with no corresponding logic (like a
  `catch` statement) to respond to them. If your application throws an error,
  and no appropriate `catch` statement or event handler can be found at the
  current or higher level to handle the error, the error is considered an
  uncaught exception.

  When an uncaught error happens, the runtime dispatches an `uncaughtError`
  event. This event is also known as a "global error handler." This event is
  dispatched by the SWF's UncaughtErrorEvents object, which is available through
  the `LoaderInfo.uncaughtErrorEvents` property. If no listeners are registered
  for the `uncaughtError` event, the runtime ignores uncaught errors and tries
  to continue running, as long as the error doesn't stop the SWF.

  In addition to dispatching the `uncaughtError` event, debugger versions of the
  Flash runtime respond to uncaught errors by terminating the current script.
  Then, they display the uncaught error in `trace` statement output or writing
  the error message to a log file. If the exception object is an instance of the
  Error class or one of its subclasses, stack trace information is also
  displayed in the output. For more information about using the debugger version
  of Flash runtimes, see
  [Working with the debugger versions of Flash runtimes](./working-with-the-debugger-versions-of-flash-runtimes.md).

  Note: While processing an uncaughtError event, if an error event is thrown
  from an uncaughtError handler, the event handler is called multiple times.
  This results in an infinite loop of exceptions. It is recommended that you
  avoid such a scenario.
