---
sidebar_position: 1
---

# Basics of error handling

A run-time error is something that goes wrong in your ActionScript code that
stops the ActionScript content from running as intended. To ensure that your
ActionScript code runs smoothly for users, write code in your application that
handles the error—that fixes it, works around it, or at least lets the user know
that it has happened. This process is called _error handling_.

Error handling is a broad category that includes responding to many kinds of
errors that are thrown during compilation or while an application is running.
Errors that happen at compile time are often easier to identify— fix them to
complete the process of creating a SWF file.

Run-time errors can be more difficult to detect, because in order for them to
occur the erroneous code must actually be run. If a segment of your program has
several branches of code, like an `if..then..else` statement, test every
possible condition, with all the possible input values that real users might
use, to confirm that your code is error-free.

Run-time errors can be divided into two categories: _program errors_ are
mistakes in your ActionScript code, such as specifying the wrong data type for a
method parameter; _logical errors_ are mistakes in the logic (the data checking
and value manipulation) of your program, such as using the wrong formula to
calculate interest rates in a banking application. Again, both of these types of
errors can often be detected and corrected ahead of time by diligently testing
your application.

Ideally, you'll want to identify and remove all errors from your application
before it is released to end users. However, not all errors can be foreseen or
prevented. For example, suppose your ActionScript application loads information
from a particular website that is outside your control. If at some point that
website isn't available, the part of your application that depends on that
external data won't behave correctly. The most important aspect of error
handling involves preparing for these unknown cases and handling them
gracefully. Users need to continue to use your application, or at least get a
friendly error message explaining why it isn't working.

Run-time errors are represented in two ways in ActionScript:

- Error classes: Many errors have an error class associated with them. When an
  error occurs, the Flash runtime (such as Flash Player or Adobe AIR) creates an
  instance of the specific error class that is associated with that particular
  error. Your code can use the information contained in that error object to
  make an appropriate response to the error.

- Error events: Sometimes an error occurs when the Flash runtime would normally
  trigger an event. In those cases, an error event is triggered instead. Each
  error event has a class associated with it, and the Flash runtime passes an
  instance of that class to the methods that are subscribed to the error event.

To determine whether a particular method can trigger an error or error event,
see the method's entry in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html).

#### Important concepts and terms

The following reference list contains important terms for programming error
handling routines:

Asynchronous  
A program command such as a method call that doesn't provide an immediate
result; instead it gives a result (or error) in the form of an event.

Catch  
When an exception (a run-time error) occurs and your code becomes aware of the
exception, that code is said to _catch_ the exception. Once an exception is
caught, the Flash runtime stops notifying other ActionScript code of the
exception.

Debugger version  
A special version of the Flash runtime, such as the Flash Player dubugger
version or the AIR Debug Launcher (ADL), that contains code for notifying users
of run-time errors. In the standard version of Flash Player or Adobe AIR (the
one that most users have), errors that aren't handled by your ActionScript code
are ignored. In the debugger versions (which are included with Adobe Flash CS4
Professional and Adobe Flash Builder), a warning message appears when an
unhandled error happens.

Exception  
An error that happens while an application is running and that the Flash runtime
can't resolve on its own.

Re-throw  
When your code catches an exception, the Flash runtime no longer notifies other
objects of the exception. If it's important for other objects to receive the
exception, your code must _re-throw_ the exception to start the notification
process again.

Synchronous  
A program command, such as a method call, that provides an immediate result (or
immediately throws an error), meaning that the response can be used within the
same code block.

Throw  
The act of notifying a Flash runtime (and consequently, notifying other objects
and ActionScript code) that an error has occurred is known as _throwing_ an
error.
