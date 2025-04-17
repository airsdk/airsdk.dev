---
sidebar_position: 10
---

# Loading data

Flash Player and AIR content can exchange data with servers. Loading data is a
different kind of operation from loading media, because the loaded information
appears as program objects, rather than being displayed as media. Generally,
content may load data from the same domain that the content originated from.
However, content usually requires policy files in order to load data from other
domains (see
[Website controls (policy files)](./permission-controls.md#website-controls-policy-files)).

Note: Content running in the AIR application sandbox is never served from a
remote domain (unless the developer intentionally imports remote content into
the application sandbox), so it cannot participate in the types of attacks that
policy files protect against. AIR content in the application sandbox is not
restricted from loading data by policy files. However, AIR content in other
sandboxes is subject to the restrictions described here.

## Using URLLoader and URLStream

You can load data, such as an XML file or a text file. The `load()` methods of
the URLLoader and URLStream classes are governed by URL policy file permissions.

If you use the `load()` method to load content from a domain other than that of
the code that is calling the method, the runtime checks for a URL policy file on
the server of the loaded assets. If there is a policy file, and it grants access
to the domain of the loading content, you can load the data.

## Connecting to sockets

By default, the runtime looks for a socket policy file served from port 843. As
with URL policy files, this file is called the _master policy file_.

When policy files were first introduced in Flash Player 6, there was no support
for socket policy files. Connections to socket servers were authorized by a
policy file in the default location on an HTTP server on port 80 of the same
host as the socket server. Flash Player 9 still supports this capability, but
Flash Player 10 does not. In Flash Player 10, only socket policy files can
authorize socket connections.

Like URL policy files, socket policy files support a meta-policy statement that
specifies which ports can serve policy files. However, instead of "master-only,"
the default meta-policy for socket policy files is "all." That is, unless the
master policy file specifies a more restrictive setting, Flash Player assumes
that any socket on the host can serve a socket policy file.

Access to socket and XML socket connections is disabled by default, even if the
socket you are connecting to is in the same domain as the SWF file. You can
permit socket-level access by serving a socket policy file from any of the
following locations:

- Port 843 (the location of the master policy file)

- The same port as the main socket connection

- A different port than the main socket connection

By default, Flash Player looks for a socket policy file on port 843 and on the
same port as the main socket connection. If you want to serve a socket policy
file from a different port, the SWF file must call `Security.loadPolicyFile()`.

A socket policy file has the same syntax as a URL policy file, except that it
must also specify the ports to which it grants access. When a socket policy file
is served from a port number below 1024, it may grant access to any ports; when
a policy file comes from port 1024 or higher, it may grant access only to ports
1024 and higher. The allowed ports are specified in a `to-ports` attribute in
the `<allow-access-from>` tag. Single port numbers, port ranges, and wildcards
are accepted values.

Here is an example socket policy file:

```
<?xml version="1.0"?>
<!DOCTYPE cross-domain-policy SYSTEM "https://www.adobe.com/xml/dtds/cross-domain-policy.dtd">
<!-- Policy file for xmlsocket://socks.mysite.com -->
<cross-domain-policy>
	<allow-access-from domain="*" to-ports="507" />
	<allow-access-from domain="*.example.com" to-ports="507,516" />
	<allow-access-from domain="*.example.org" to-ports="516-523" />
	<allow-access-from domain="adobe.com" to-ports="507,516-523" />
	<allow-access-from domain="192.0.34.166" to-ports="*" />
</cross-domain-policy>
```

To retrieve a socket policy file from port 843 or from the same port as a main
socket connection, call the `Socket.connect()` or `XMLSocket.connect()` method.
Flash Player first checks for a master policy file on port 843. If it finds one,
it checks to see if the file contains a meta-policy statement that prohibits
socket policy files on the target port. If access isn't prohibited, Flash Player
first looks for the appropriate `allow-access-from` statement in the master
policy file. If it doesn't find one, it then looks for a socket policy file on
the same port as the main socket connection.

To retrieve a socket policy file a different location, first call the
`Security.loadPolicyFile()` method with the special `"xmlsocket"` syntax, as in
the following:

```
Security.loadPolicyFile("xmlsocket://server.com:2525");
```

Call the `Security.loadPolicyFile()` method before calling the
`Socket.connect()` or `XMLSocket.connect()` method. Flash Player then waits
until it has fulfilled your policy file request before deciding whether to allow
your main connection. However, if the master policy file specifies that the
target location can't serve policy files, the call to `loadPolicyFile()` has no
effect, even if there is a policy file at that location.

If you are implementing a socket server and you need to provide a socket policy
file, decide whether to provide the policy file using the same port that accepts
main connections, or using a different port. In either case, your server must
wait for the first transmission from your client before sending a response.

When Flash Player requests a policy file, it always transmits the following
string as soon as a connection is established:

```
<policy-file-request/>
```

Once the server receives this string, it can transmit the policy file. The
request from Flash Player is always terminated by a null byte, and the response
from the server must also be terminated by a null byte.

Do not expect to reuse the same connection for both a policy file request and a
main connection; close the connection after transmitting the policy file. If you
do not, Flash Player closes the policy file connection before reconnecting to
set up the main connection.

## Protecting data

To protect data from eavesdropping and alteration as it travels over the
Internet, you can use the Transport Layer Security (TLS) or Socket Layer
Security (SSL) on the server where the data originates. You can then connect to
the server using the HTTPS protocol.

In applications created for AIR 2 or above, you can also protect TCP socket
communications. The SecureSocket class allows you to initiate a socket
connection to a socket server that uses TLS version 1or SSL version 4.

## Sending data

Data sending occurs when code sends data to a server or resource. Sending data
is always permitted for content from a network domain. A local SWF file can send
data to network addresses only if it is in the local-trusted,
local-with-networking, or AIR application sandbox. For more information, see
[Local sandboxes](./security-sandboxes.md#local-sandboxes).

You can use the `flash.net.sendToURL()` function to send data to a URL. Other
methods also send requests to URLs. These include loading methods, such as
`Loader.load()` and `Sound.load()`, and data-loading methods, such as
`URLLoader.load()` and `URLStream.load()`.

## Uploading and downloading files

The `FileReference.upload()` method starts the upload of a file selected by a
user to a remote server. You must call the `FileReference.browse()` or
`FileReferenceList.browse()` method before calling the `FileReference.upload()`
method.

The code that initiates the `FileReference.browse()` or
`FileReferenceList.browse()` method can be called only in response to a mouse
event or keyboard event. If it is called in other situations, Flash Player 10
and later throws an exception. However, a user-initiated event is not required
to call these methods from the AIR application sandbox.

Calling the `FileReference.download()` method opens a dialog box in which the
user can download a file from a remote server.

Note: If your server requires user authentication, only SWF files running in a
browser—that is, using the browser plug-in or ActiveX control—can provide a
dialog box to prompt the user for a user name and password for authentication,
and only for downloads. Flash Player does not allow uploads to a server that
requires user authentication.

Uploads and downloads are not allowed if the calling SWF file is in the
local-with-filesystem sandbox.

By default, a SWF file may not initiate an upload to, or a download from, a
server other than its own. A SWF file may upload to, or download from, a
different server if that server provides a policy file that grants permission to
the domain of the invoking SWF file.
