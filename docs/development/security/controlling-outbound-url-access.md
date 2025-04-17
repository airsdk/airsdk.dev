---
sidebar_position: 14
---

# Controlling outbound URL access

Outbound scripting and URL access (through the use of HTTP URLs, mailto: and so
on) are achieved through use of the following APIs:

- The `flash.system.fscommand()` function

- The `ExternalInterface.call()` method

- The `flash.net.navigateToURL()` function

For content loaded from the local file system, calls to these methods are
successful only if the code and the containing web page (if there is one) are in
the local-trusted or AIR application security sandboxes. Calls to these methods
fail if the content is in the local-with-networking or local-with-filesystem
sandbox.

For content that is not loaded locally, all of these APIs can communicate with
the web page in which they are embedded, depending on the value of the
AllowScriptAccess parameter described below. The `flash.net.navigateToURL()`
function has the additional ability to communicate with any open browser window
or frame, not just the page in which the SWF file is embedded. For more
information on this functionality, see
[Using the navigateToURL() function](#using-the-navigatetourl-function).

The `AllowScriptAccess` parameter in the HTML code that loads a SWF file
controls the ability to perform outbound URL access from within the SWF file.
Set this parameter inside the PARAM or EMBED tag. If no value is set for
`AllowScriptAccess`, the SWF file and the HTML page can communicate only if both
are from the same domain.

The `AllowScriptAccess` parameter can have one of three possible values:
`"always"`, `"sameDomain"`, or `"never"`.

- When `AllowScriptAccess` is `"always"`, the SWF file can communicate with the
  HTML page in which it is embedded even when the SWF file is from a different
  domain than the HTML page.

- When `AllowScriptAccess` is `"sameDomain"`, the SWF file can communicate with
  the HTML page in which it is embedded only when the SWF file is from the same
  domain as the HTML page. This value is the default value for
  `AllowScriptAccess`. Use this setting, or do not set a value for
  `AllowScriptAccess`, to prevent a SWF file hosted from one domain from
  accessing a script in an HTML page that comes from another domain.

- When `AllowScriptAccess` is `"never"`, the SWF file cannot communicate with
  any HTML page. Using this value has been deprecated since the release of Adobe
  Flash CS4 Professional. It is not recommended and shouldn't be necessary if
  you don't serve untrusted SWF files from your own domain. If you do need to
  serve untrusted SWF files, Adobe recommends that you create a distinct
  subdomain and place all untrusted content there.

Here is an example of setting the `AllowScriptAccess` tag in an HTML page to
allow outbound URL access to a different domain:

```
<object id='MyMovie.swf' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' height='100%' width='100%'>
	<param name='AllowScriptAccess' value='always'/>
	<param name='src' value=''MyMovie.swf'/>
	<embed name='MyMovie.swf' pluginspage='https://www.adobe.com/go/getflashplayer' src='MyMovie.swf' height='100%' width='100%' AllowScriptAccess='never'/>
</object>
```

## Using the navigateToURL() function

In addition to the security setting specified by the `allowScriptAccess`
parameter discussed above, the `navigateToURL()` function has an optional second
parameter - `target`. The `target` parameter can be used to specify the name of
an HTML window or frame to send the URL request to. Additional security
restrictions apply to such requests, and the restrictions vary depending on
whether `navigateToURL()` is being used as a scripting or non-scripting
statement.

For scripting statements, such as
`navigateToURL("javascript: alert('Hello from Flash Player.')")`, the following
rules apply.

- If the SWF file is a locally trusted file, the request succeeds.

- If the target is the HTML page in which the SWF file is embedded, the
  `allowScriptAccess` rules described above apply.

- If the target holds content loaded from the same domain as the SWF file, the
  request succeeds.

- If the target holds content loaded from a different domain than the SWF file,
  and neither of the previous two conditions is met, the request fails.

For non-scripting statements (such as HTTP, HTTPS, and `mailto:`, the request
fails if all of the following conditions apply:

- The target is one of the special keywords `"_top"` or `"_parent"`, and

- the SWF file is in a web page hosted from a different domain, and

- the SWF file is embedded with a value for `allowScriptAccess` that is not
  `"always"`.

## For more information

For more information on outbound URL access, see the following entries in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html):

- The
  [flash.system.fscommand()](https://airsdk.dev/reference/actionscript/3.0/flash/system/package.html#fscommand%28%29)
  function

- The
  [call()](https://airsdk.dev/reference/actionscript/3.0/flash/external/ExternalInterface.html#call%28%29)
  method of the ExternalInterface class

- The
  ` `[`flash.net.navigateToURL()`](https://airsdk.dev/reference/actionscript/3.0/flash/net/package.html#navigateToURL%28%29)
  function
