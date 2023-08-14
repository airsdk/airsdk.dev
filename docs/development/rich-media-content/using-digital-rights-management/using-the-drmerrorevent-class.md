---
sidebar_position: 5
---

# Using the DRMErrorEvent class

Adobe Flash Player and Adobe AIR dispatch a DRMErrorEvent object when a
NetStream object, trying to play protected content, encounters a DRM-related
error. If user credentials are invalid in an AIR application, the
DRMAuthenticateEvent object repeatedly dispatches until the user enters valid
credentials or the application denies further attempts. The application is
responsible for listening to any other DRM error events to detect, identify, and
handle the DRM-related errors.

Even with valid user credentials, the terms of the content's voucher can still
prevent a user from viewing the encrypted content. For example, a user can be
denied access for attempting to view content in an unauthorized application. An
unauthorized application is one that the publisher of the encrypted content has
not validated. In this case, a DRMErrorEvent object is dispatched.

The error events can also be fired if the content is corrupted or if the
application's version does not match what the voucher specifies. The application
must provide appropriate mechanism for handling errors.

## DRMErrorEvent properties

For a complete list of errors, see the
[Runtime Error Codes](https://airsdk.dev/reference/actionscript/3.0/runtimeErrors.html)
in the ActionScript 3.0 Reference. The DRM-related errors start at error 3300.

## Creating a DRMErrorEvent handler

The following example creates an event handler for the NetStream object that
originated the event. It is called when the NetStream encounters an error while
attempting to play protected content. Normally, when an application encounters
an error, it performs any number of clean-up tasks. It then informs the user of
the error and provides options for solving the problem.

    private function drmErrorEventHandler(event:DRMErrorEvent):void
    {
    	trace(event.toString());
    }
