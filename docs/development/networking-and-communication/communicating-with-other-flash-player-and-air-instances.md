---
sidebar_position: 4
---

# Communicating with other Flash Player and AIR instances

The
[LocalConnection](https://airsdk.dev/reference/actionscript/3.0/flash/net/LocalConnection.html)
class enables communications between Adobe® AIR® applications, as well as
between SWF content running in the browser. You can also use the LocalConnection
class to communicate between an AIR application and SWF content running in the
browser. The LocalConnection class allows you to build versatile applications
that can share data between Flash Player and AIR instances.

## About the LocalConnection class

The LocalConnection class lets you develop SWF files that can send instructions
to other SWF files without the use of the fscommand() method or JavaScript.
LocalConnection objects can communicate only among SWF files that are running on
the same client computer, but they can run in different applications. For
example, a SWF file running in a browser and a SWF file running in a projector
can share information, with the projector maintaining local information and the
browser-based SWF file connecting remotely. (A projector is a SWF file saved in
a format that can run as a stand-alone application—that is, the projector
doesn't require Flash Player to be installed because it is embedded inside the
executable.)

LocalConnection objects can be used to communicate between SWFs using different
ActionScript versions:

- ActionScript 3.0 LocalConnection objects can communicate with LocalConnection
  objects created in ActionScript 1.0 or 2.0.

- ActionScript 1.0 or 2.0 LocalConnection objects can communicate with
  LocalConnection objects created in ActionScript 3.0.

Flash Player handles this communication between LocalConnection objects of
different versions automatically.

The simplest way to use a LocalConnection object is to allow communication only
between LocalConnection objects located in the same domain or the same AIR
application. That way, you do not have to worry about security issues. However,
if you need to allow communication between domains, you have several ways to
implement security measures. For more information, see the discussion of the
`connectionName` parameter of the `send()` method and the `allowDomain()` and
`domain` entries in the
[LocalConnection](https://airsdk.dev/reference/actionscript/3.0/flash/net/LocalConnection.html)
class listing in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).

![](../img/tip_help.png) It is possible to use LocalConnection objects to send
and receive data within a single SWF file, but Adobe does not recommended doing
so. Instead, use shared objects.

There are three ways to add callback methods to your LocalConnection objects:

- Subclass the LocalConnection class and add methods.

- Set the `LocalConnection.client` property to an object that implements the
  methods.

- Create a dynamic class that extends LocalConnection and dynamically attach
  methods.

The first way to add callback methods is to extend the LocalConnection class.
You define the methods within the custom class instead of dynamically adding
them to the LocalConnection instance. This approach is demonstrated in the
following code:

    package
    {
    	import flash.net.LocalConnection;
    	public class CustomLocalConnection extends LocalConnection
    	{
    		public function CustomLocalConnection(connectionName:String)
    		{
    			try
    			{
    				connect(connectionName);
    			}
    			catch (error:ArgumentError)
    			{
    				// server already created/connected
    			}
    		}
    		public function onMethod(timeString:String):void
    		{
    			trace("onMethod called at: " + timeString);
    		}
    	}
    }

In order to create a new instance of the CustomLocalConnection class, you can
use the following code:

    var serverLC:CustomLocalConnection;
    serverLC = new CustomLocalConnection("serverName");

The second way to add callback methods is to use the `LocalConnection.client`
property. This involves creating a custom class and assigning a new instance to
the `client` property, as the following code shows:

    var lc:LocalConnection = new LocalConnection();
    lc.client = new CustomClient();

The `LocalConnection.client` property indicates the object callback methods that
should be invoked. In the previous code, the `client` property was set to a new
instance of a custom class, CustomClient. The default value for the `client`
property is the current LocalConnection instance. You can use the `client`
property if you have two data handlers that have the same set of methods but act
differently—for example, in an application where a button in one window toggles
the view in a second window.

To create the CustomClient class, you could use the following code:

    package
    {
    	public class CustomClient extends Object
    	{
    		public function onMethod(timeString:String):void
    		{
    			trace("onMethod called at: " + timeString);
    		}
    	}
    }

The third way to add callback methods, creating a dynamic class and dynamically
attaching the methods, is very similar to using the LocalConnection class in
earlier versions of ActionScript, as the following code shows:

    import flash.net.LocalConnection;
    dynamic class DynamicLocalConnection extends LocalConnection {}

Callback methods can be dynamically added to this class by using the following
code:

    var connection:DynamicLocalConnection = new DynamicLocalConnection();
    connection.onMethod = this.onMethod;
    // Add your code here.
    public function onMethod(timeString:String):void
    {
    	trace("onMethod called at: " + timeString);
    }

The previous way of adding callback methods is not recommended because the code
is not very portable. In addition, using this method of creating local
connections could create performance issues, because accessing dynamic
properties is dramatically slower than accessing sealed properties.

#### isPerUser property

The `isPerUser` property was added to Flash Player (10.0.32) and AIR (1.5.2) to
resolve a conflict that occurs when more than one user is logged into a Mac
computer. On other operating systems, the property is ignored since the local
connection has always been scoped to individual users. The `isPerUser` property
should be set to `true` in new code. However, the default value is currently
`false` for backward compatibility. The default may be changed in future
versions of the runtimes.

## Sending messages between two applications

You use the LocalConnection class to communicate between different AIR
applications and between different Adobe® Flash® Player (SWF) applications
running in a browser. You can also use the LocalConnection class to communicate
between an AIR application and a SWF application running in a browser.

For example, you could have multiple Flash Player instances on a web page, or
have a Flash Player instance retrieve data from a Flash Player instance in a
pop-up window.

The following code defines a LocalConnection object that acts as a server and
accepts incoming LocalConnection calls from other applications:

    package
    {
    	import flash.net.LocalConnection;
    	import flash.display.Sprite;
    	public class ServerLC extends Sprite
    	{
    		public function ServerLC()
    		{
    			var lc:LocalConnection = new LocalConnection();
    			lc.client = new CustomClient1();
    			try
    			{
    				lc.connect("conn1");
    			}
    			catch (error:Error)
    			{
    				trace("error:: already connected");
    			}
    		}
    	}
    }

This code first creates a LocalConnection object named `lc` and sets the
`client` property to an object, `clientObject`. When another application calls a
method in this LocalConnection instance, the runtime looks for that method in
the `clientObject` object.

If you already have a connection with the specified name, an Argument Error
exception is thrown, indicating that the connection attempt failed because the
object is already connected.

Whenever a Flash Player instance connects to this SWF file and tries to invoke
any method for the specified local connection, the request is sent to the class
specified by the `client` property, which is set to the CustomClient1 class:

    package
    {
    	import flash.events.*;
    	import flash.system.fscommand;
    	import flash.utils.Timer;
    	public class CustomClient1 extends Object
    	{
    		public function doMessage(value:String = ""):void
    		{
    			trace(value);
    		}
    		public function doQuit():void
    		{
    			trace("quitting in 5 seconds");
    			this.close();
    			var quitTimer:Timer = new Timer(5000, 1);
    			quitTimer.addEventListener(TimerEvent.TIMER, closeHandler);
    		}
    		public function closeHandler(event:TimerEvent):void
    		{
    			fscommand("quit");
    		}
    	}
    }

To create a LocalConnection server, call the `LocalConnection.connect()` method
and provide a unique connection name. If you already have a connection with the
specified name, an ArgumentError error is generated, indicating that the
connection attempt failed because the object is already connected.

The following snippet demonstrates how to create a LocalConnection with the name
`conn1`:

    try
    {
    	connection.connect("conn1");
    }
    catch (error:ArgumentError)
    {
    	trace("Error! Server already exists\n");
    }

Connecting to the primary application from a secondary application requires that
you first create a LocalConnection object in the sending LocalConnection object;
then call the `LocalConnection.send()` method with the name of the connection
and the name of the method to execute. For example, to send the `doQuit` method
to the LocalConnection object that you created earlier, use the following code:

    sendingConnection.send("conn1", "doQuit");

This code connects to an existing LocalConnection object with the connection
name `conn1` and invokes the `doMessage()` method in the remote application. If
you want to send parameters to the remote application, you specify additional
arguments after the method name in the `send()` method, as the following snippet
shows:

    sendingConnection.send("conn1", "doMessage", "Hello world");

## Connecting to content in different domains and to AIR applications

To allow communications only from specific domains, you call the `allowDomain()`
or `allowInsecureDomain()` method of the LocalConnection class and pass a list
of one or more domains that are allowed to access this LocalConnection object,
passing one or more names of domains to be allowed.

In earlier versions of ActionScript, `LocalConnection.allowDomain()` and
`LocalConnection.allowInsecureDomain()` were callback methods that had to be
implemented by developers and that had to return a Boolean value. In
ActionScript 3.0, `LocalConnection.allowDomain()` and
`LocalConnection.allowInsecureDomain()` are both built-in methods, which
developers can call just like `Security.allowDomain()` and
`Security.allowInsecureDomain()`, passing one or more names of domains to be
allowed.

Flash Player 8 introduced security restrictions on local SWF files. A SWF file
that is allowed to access the Internet cannot also have access to the local file
system. If you specify `localhost`, any local SWF file can access the SWF file.
If the `LocalConnection.send()` method attempts to communicate with a SWF file
from a security sandbox to which the calling code does not have access, a
`securityError` event( `SecurityErrorEvent.SECURITY_ERROR`) is dispatched. To
work around this error, you can specify the caller's domain in the receiver's
`LocalConnection.allowDomain()` method.

There are two special values that you can pass to the
`LocalConnection.allowDomain()` and `LocalConnection.allowInsecureDomain()`
methods: `*` and `localhost`. The asterisk value `(*)` allows access from all
domains. The string `localhost` allows calls to the application from content
locally installed, but outside of the application resource directory.

If the `LocalConnection.send()` method attempts to communicate with an
application from a security sandbox to which the calling code does not have
access, a `securityError` event( `SecurityErrorEvent.SECURITY_ERROR`) is
dispatched. To work around this error, you can specify the caller's domain in
the receiver's `LocalConnection.allowDomain()` method.

If you implement communication only between content in the same domain, you can
specify a `connectionName` parameter that does not begin with an underscore (
`_`) and does not specify a domain name (for example,
`myDomain:connectionName`). Use the same string in the
`LocalConnection.connect(connectionName)` command.

If you implement communication between content in different domains, you specify
a `connectionName` parameter that begins with an underscore. Specifying the
underscore makes the content with the receiving LocalConnection object more
portable between domains. Here are the two possible cases:

- If the string for `connectionName` does not begin with an underscore, the
  runtime adds a prefix with the superdomain name and a colon (for example,
  `myDomain:connectionName`). Although this ensures that your connection does
  not conflict with connections of the same name from other domains, any sending
  LocalConnection objects must specify this superdomain (for example,
  `myDomain:connectionName`). If you move the HTML or SWF file with the
  receiving LocalConnection object to another domain, the runtime changes the
  prefix to reflect the new superdomain (for example,
  `anotherDomain:connectionName`). All sending LocalConnection objects have to
  be manually edited to point to the new superdomain.

- If the string for `connectionName` begins with an underscore (for example,
  `_connectionName`), the runtime does not add a prefix to the string. This
  means the receiving and sending LocalConnection objects use identical strings
  for `connectionName`. If the receiving object uses
  `LocalConnection.allowDomain()` to specify that connections from any domain
  will be accepted, you can move the HTML or SWF file with the receiving
  LocalConnection object to another domain without altering any sending
  LocalConnection objects.

  A downside to using underscore names in `connectionName` is the potential for
  collisions, such as when two applications both try to connect using the same
  `connectionName`. A second, related downside is security-related. Connection
  names that use underscore syntax do not identify the domain of the listening
  application. For these reasons, domain-qualified names are preferred.

#### Adobe AIR

To communicate with content running in the AIR application security sandbox
(content installed with the AIR application), you must prefix the connection
name with a superdomain identifying the AIR application. The superdomain string
starts with `app#` followed by the application ID followed by a dot (.)
character, followed by the publisher ID (if defined). For example, the proper
superdomain to use in the `connectionName` parameter for an application with the
application ID, `com.example.air.MyApp`, and no publisher ID is:
`"app#com.example.air.MyApp"`. Thus, if the base connection name is
"appConnection," then the entire string to use in the `connectionName` parameter
is: `"app#com.example.air.MyApp:appConnection"`. If the application has the
publisher ID, then the that ID must also be included in the superdomain string:
`"app#com.example.air.MyApp.B146A943FBD637B68C334022D304CEA226D129B4.1"`.

When you allow another AIR application to communicate with your application
through the local connection, you must call the `allowDomain()` of the
LocalConnection object, passing in the local connection domain name. For an AIR
application, this domain name is formed from the application and publisher IDs
in the same fashion as the connection string. For example, if the sending AIR
application has an application ID of `com.example.air.FriendlyApp` and a
publisher ID of `214649436BD677B62C33D02233043EA236D13934.1`, then the domain
string that you would use to allow this application to connect is:
`app#com.example.air.FriendlyApp.214649436BD677B62C33D02233043EA236D13934.1`.
(As of AIR 1.5.3, not all AIR applications have publisher IDs.)

More Help topics

![](../img/airLinkIndicator.png)
[Setting AIR application properties](https://web.archive.org/web/20221205160703/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff1.html)

![](../img/airLinkIndicator.png)
[Getting the application and publisher identifiers](https://web.archive.org/web/20120514072051/http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118676a5e5e-7fff.html#WS5b3ccc516d4fbf351e63e3d118666ade46-7ccc)
