---
sidebar_position: 3
---

# Working with AIR runtime and operating system information

This section discusses ways that an AIR application can manage operating system
file associations, detect user activity, and get information about the Adobe®
AIR® runtime.

## Managing file associations

Associations between your application and a file type must be declared in the
application descriptor. During the installation process, the AIR application
installer associates the AIR application as the default opening application for
each of the declared file types, unless another application is already the
default. The AIR application install process does not override an existing file
type association. To take over the association from another application, call
the `NativeApplication.setAsDefaultApplication()` method at run time.

It is a good practice to verify that the expected file associations are in place
when your application starts up. This is because the AIR application installer
does not override existing file associations, and because file associations on a
user’s system can change at any time. When another application has the current
file association, it is also a polite practice to ask the user before taking
over an existing association.

The following methods of the NativeApplication class let an application manage
file associations. Each of the methods takes the file type extension as a
parameter:

| Method                       | Description                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| isSetAsDefaultApplication()  | Returns true if the AIR application is currently associated with the specified file type. |
| setAsDefaultApplication()    | Creates the association between the AIR application and the open action of the file type. |
| removeAsDefaultApplication() | Removes the association between the AIR application and the file type.                    |
| getDefaultApplication()      | Reports the path of the application that is currently associated with the file type.      |

AIR can only manage associations for the file types originally declared in the
application descriptor. You cannot get information about the associations of a
non-declared file type, even if a user has manually created the association
between that file type and your application. Calling any of the file association
management methods with the extension for a file type not declared in the
application descriptor causes the application to throw a runtime exception.

## Getting the runtime version and patch level

The NativeApplication object has a `runtimeVersion` property, which is the
version of the runtime in which the application is running (a string, such as
`"1.0.5"`). The NativeApplication object also has a `runtimePatchLevel`
property, which is the patch level of the runtime (a number, such as 2960). The
following code uses these properties:

```
trace(NativeApplication.nativeApplication.runtimeVersion);
trace(NativeApplication.nativeApplication.runtimePatchLevel);
```

## Detecting AIR capabilities

For a file that is bundled with the Adobe AIR application, the
`Security.sandboxType` property is set to the value defined by the
`Security.APPLICATION` constant. You can load content (which may or may not
contain APIs specific to AIR) based on whether a file is in the Adobe AIR
security sandbox, as illustrated in the following code:

```
if (Security.sandboxType == Security.APPLICATION)
{
```

        // Load SWF that contains AIR APIs
```
}
else
{
```

        // Load SWF that does not contain AIR APIs
```
}
```

All resources that are not installed with the AIR application are assigned to
the same security sandboxes as would be assigned by Adobe® Flash® Player in a
web browser. Remote resources are put in sandboxes according to their source
domains, and local resources are put in the local-with-networking,
local-with-filesystem, or local-trusted sandbox.

You can check if the `Capabilities.playerType` static property is set to
`"Desktop"` to see if content is executing in the runtime (and not running in
Flash Player running in a browser).

For more information, see [AIR security](../security/air-security/index.md).

## Tracking user presence

The NativeApplication object dispatches two events that help you detect when a
user is actively using a computer. If no mouse or keyboard activity is detected
in the interval determined by the `NativeApplication.idleThreshold` property,
the NativeApplication dispatches a `userIdle` event. When the next keyboard or
mouse input occurs, the NativeApplication object dispatches a `userPresent`
event. The `idleThreshold` interval is measured in seconds and has a default
value of 300 (5 minutes). You can also get the number of seconds since the last
user input from the `NativeApplication.nativeApplication.lastUserInput`
property.

The following lines of code set the idle threshold to 2 minutes and listen for
both the `userIdle` and `userPresent` events:

```
NativeApplication.nativeApplication.idleThreshold = 120;
NativeApplication.nativeApplication.addEventListener(Event.USER_IDLE, function(event:Event) {
```

        trace("Idle");
```
});
NativeApplication.nativeApplication.addEventListener(Event.USER_PRESENT, function(event:Event) {
```

        trace("Present");
```
});
```

Note: Only a single `userIdle` event is dispatched between any two `userPresent`
events.

More Help topics

![](../img/flashplatformLinkIndicator.png)
[flash.desktop.NativeApplication](https://airsdk.dev/reference/actionscript/3.0/flash/desktop/NativeApplication.html)

![](../img/airLinkIndicator.png)
[Declaring file type associations](https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7cc3.html)
