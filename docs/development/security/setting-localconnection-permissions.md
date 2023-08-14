---
sidebar_position: 13
---

# Setting LocalConnection permissions

The LocalConnection class lets you send messages between one Flash Player or AIR
application and another. LocalConnection objects can communicate only among
Flash Player or AIR content running on the same client computer, but they can be
running in different applications—for example, a SWF file running in a browser,
a SWF file running in a projector, and an AIR application can all communicate
use the LocalConnection class.

For every LocalConnection communication, there is a sender and a listener. By
default, Flash Player allows LocalConnection communication between code running
in the same domain. For code running in different sandboxes, the listener must
allow the sender permission by using the `LocalConnection.allowDomain()` method.
The string you pass as an argument to the `LocalConnection.allowDomain()` method
can contain any of the following: exact domain names, IP addresses, and the `*`
wildcard.

The `allowDomain()` method has changed from the form it had in ActionScript 1.0
and 2.0. In those earlier versions, `allowDomain()` was a callback method that
you implemented. In ActionScript 3.0, `allowDomain()` is a built-in method of
the LocalConnection class that you call. With this change, `allowDomain()` works
in much the same way as `Security.allowDomain()`.

A SWF file can use the `domain` property of the LocalConnection class to
determine its domain.
