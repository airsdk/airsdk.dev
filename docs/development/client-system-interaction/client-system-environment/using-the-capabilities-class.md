---
sidebar_position: 3
---

# Using the Capabilities class

The Capabilities class allows developers to determine the environment in which
an application is being run. Using various properties of the Capabilities class,
you can find out the resolution of the user's system, whether the user's system
supports accessibility software, and the language of the user's operating
system, as well as the currently installed version of the Flash runtime.

By checking the properties in the Capabilities class, you can customize your
application to work best with the specific user's environment. For example, by
checking the `Capabilities.screenResolutionX` and
`Capabilities.screenResolutionY` properties, you can determine the display
resolution the user's system is using and decide which video size may be most
appropriate. Or you can check the `Capabilities.hasMP3` property to see if the
user's system supports mp3 playback before attempting to load an external mp3
file.

The following code uses a regular expression to parse the Flash runtime version
that the client is using:

```
var versionString:String = Capabilities.version;
var pattern:RegExp = /^(\w*) (\d*),(\d*),(\d*),(\d*)$/;
var result:Object = pattern.exec(versionString);
if (result != null)
{
	trace("input: " + result.input);
	trace("platform: " + result[1]);
	trace("majorVersion: " + result[2]);
	trace("minorVersion: " + result[3]);
	trace("buildNumber: " + result[4]);
	trace("internalBuildNumber: " + result[5]);
}
else
{
	trace("Unable to match RegExp.");
}
```

If you want to send the user's system capabilities to a server-side script so
that the information can be stored in a database, you can use the following
ActionScript code:

```
var url:String = "log_visitor.cfm";
var request:URLRequest = new URLRequest(url);
request.method = URLRequestMethod.POST;
request.data = new URLVariables(Capabilities.serverString);
var loader:URLLoader = new URLLoader(request);
```
