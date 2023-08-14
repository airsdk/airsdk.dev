---
sidebar_position: 1
---

# Basics of networking and communication

When you build applications in Flash Player or AIR, you often need to access
resources outside your application. For example, you might send a request for an
image to an Internet web server and get the image data in return. Or, you might
send serialized objects back and forth over a socket connection with an
application server. The Flash Player and AIR APIs provide several classes that
allow your applications to participate in this exchange. These APIs support
IP-based networking for protocols like UDP, TCP, HTTP, RTMP, and RTMFP.

The following classes can be used to send and receive data across a network:

<table>
<thead>
	<tr>
		<th><p>Class</p></th>
		<th><p>Supported data formats</p></th>
		<th><p>Protocols</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/Loader.html">Loader</a></p></td>
		<td><p>SWF, PNG, JPEG, GIF</p></td>
		<td><p>HTTP, HTTPS</p></td>
		<td><p>Loads supported data types and converts the data into a display
		object.</p>
		<p>See <a href="../display/display-programming/loading-display-content-dynamically">Loading
		display content dynamically</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/URLLoader.html">URLLoader</a></p></td>
		<td><p>Any (text, XML, binary, etc.)</p></td>
		<td><p>HTTP, HTTPS</p></td>
		<td><p>Loads arbitrary formats of data. Your application is responsible
		for interpreting the data.</p>
		<p>See <a href="./http-communications/loading-external-data#using-the-urlloader-class">Using
		the URLLoader class</a></p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/FileReference.html">FileReference</a></p></td>
		<td><p>Any</p></td>
		<td><p>HTTP</p></td>
		<td><p>Upload and download files.</p>
		<p>See <a href="../files-and-data/working-with-the-file-system/using-the-filereference-class">Using
		the FileReference class</a></p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html">NetConnection</a></p></td>
		<td><p>Video, audio, ActionScript Message Format (AMF)</p></td>
		<td><p>HTTP, HTTPS, RTMP, RTMFP</p></td>
		<td><p>Connects to video, audio and remote object streams.</p>
		<p>See <a href="../rich-media-content/working-with-video">Working
		with video</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html">Sound</a></p></td>
		<td><p>Audio</p></td>
		<td><p>HTTP</p></td>
		<td><p>Loads and plays supported audio formats.</p>
		<p>See <a href="../rich-media-content/working-with-sound/loading-external-sound-files">Loading
		external sound files</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/XMLSocket.html">XMLSocket</a></p></td>
		<td><p>XML</p></td>
		<td><p>TCP</p></td>
		<td><p>Exchanges XML messages with an XMLSocket server.</p>
		<p>See <a href="./sockets#xml-sockets">XML
		sockets</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/Socket.html">Socket</a></p></td>
		<td><p>Any</p></td>
		<td><p>TCP</p></td>
		<td><p>Connects to a TCP socket server.</p>
		<p>See <a href="./sockets#binary-client-sockets">Binary
		client sockets</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/SecureSocket.html">SecureSocket</a>
		(AIR)</p></td>
		<td><p>Any</p></td>
		<td><p>TCP with SSLv3 or TLSv1</p></td>
		<td><p>Connects to a TCP socket server that requires SSL or TLS
		security.</p>
		<p>See <a href="./sockets#secure-client-sockets-air">Secure
		client sockets (AIR)</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/ServerSocket.html">ServerSocket</a>
		(AIR)</p></td>
		<td><p>Any</p></td>
		<td><p>TCP</p></td>
		<td><p>Acts as a server for incoming TCP socket connections.</p>
		<p>See <a href="./sockets#server-sockets">Server
		sockets</a>.</p></td>
	</tr>
	<tr>
		<td><p><a
		href="https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/DatagramSocket.html">DatagramSocket</a>
		(AIR)</p></td>
		<td><p>Any</p></td>
		<td><p>UDP</p></td>
		<td><p>Sends and receives UDP packets.</p>
		<p>See <a href="./sockets#udp-sockets-air">UDP
		sockets (AIR)</a></p></td>
	</tr>
</tbody>
</table>

Often, when creating a web application it is helpful to store persistent
information about the user's application state. HTML pages and applications
typically use cookies for this purpose. In Flash Player, you can use the
SharedObject class for the same purpose. See
[Shared objects](../files-and-data/storing-local-data/shared-objects.md). (The
SharedObject class can be used in AIR applications, but there are fewer
restrictions when just saving the data to a regular file.)

When your Flash Player or AIR application needs to communicate with another
Flash Player or AIR application on the same computer, you can use the
LocalConnection class. For example, two (or more) SWFs on the same web page can
communicate with each other. Likewise, a SWF running on a web page can
communicate with an AIR application. See
[Communicating with other Flash Player and AIR instances](./communicating-with-other-flash-player-and-air-instances.md).

When you need to communicate with other, non-SWF processes on the local
computer, you can use the NativeProcess class added in AIR 2. The NativeProcess
class allows your AIR application to launch and communicate with other
applications. See
[Communicating with native processes in AIR](./communicating-with-native-processes-in-air.md).

When you need information about the network environment of the computer on which
an AIR application is running, you can use the following classes:

- NetworkInfo — Provides information about the available network interfaces,
  such as the computer's IP address. See
  [Network interfaces](#network-interfaces).

- DNSResolver — Allows you to look up DNS records. See
  [Domain Name System (DNS) records](#domain-name-system-dns-records).

- ServiceMonitor — Allows you to monitor the availability of a server. See
  [Service monitoring](#service-monitoring).

- URLMonitor — Allows you to monitor the availability of a resource at a
  particular URL. See [HTTP monitoring](#http-monitoring).

- SocketMonitor and SecureSocketMonitor—Allows you to monitor the availability
  of a resource at a socket. See [Socket monitoring](#socket-monitoring).

#### Important concepts and terms

The following reference list contains important terms that you will encounter
when programming networking and communications code:

External data  
Data that is stored in some form outside of the application, and loaded into the
application when needed. This data could be stored in a file that's loaded
directly, or stored in a database or other form that is retrieved by calling
scripts or programs running on a server.

URL-encoded variables  
The URL-encoded format provides a way to represent several variables (pairs of
variable names and values) in a single string of text. Individual variables are
written in the format name=value. Each variable (that is, each name-value pair)
is separated by ampersand characters, like this:
variable1=value1&variable2=value2. In this way, an indefinite number of
variables can be sent as a single message.

MIME type  
A standard code used to identify the type of a given file in Internet
communication. Any given file type has a specific code that is used to identify
it. When sending a file or message, a computer (such as a web server or a user's
Flash Player or AIR instance) will specify the type of file being sent.

HTTP  
Hypertext Transfer Protocol—a standard format for delivering web pages and
various other types of content that are sent over the Internet.

Request method  
When an application (such as an AIR application or a web browser) sends a
message (called an HTTP request) to a web server, any data being sent can be
embedded in the request in one of two ways; these are the two request methods
GET and POST. On the server end, the program receiving the request will need to
look in the appropriate portion of the request to find the data, so the request
method used to send data from your application should match the request method
used to read that data on the server.

Socket connection  
A persistent connection for communication between two computers.

Upload  
To send a file to another computer.

Download  
To retrieve a file from another computer.

## Network interfaces

You can use the NetworkInfo object to discover the hardware and software network
interfaces available to your application. The NetworkInfo object is a
_singleton_ object, you do not need to create one. Instead, use the static class
property, `networkInfo`, to access the single NetworkInfo object. The
NetworkInfo object also dispatches a `networkChange` event when one of the
available interfaces change.

Call the `findInterfaces()` method to get a list of NetworkInterface objects.
Each NetworkInterface object in the list describes one of the available
interfaces. The NetworkInterface object provides such information as the IP
address, hardware address, maximum transmission unit, and whether the interface
is active.

The following code example traces the NetworkInterface properties of each
interface on the client computer:

    package
    {
    	import flash.display.Sprite;
    	import flash.net.InterfaceAddress;
    	import flash.net.NetworkInfo;
    	import flash.net.NetworkInterface;

    	public class NetworkInformationExample extends Sprite
    	{
    		public function NetworkInformationExample()
    		{
    			var networkInfo:NetworkInfo = NetworkInfo.networkInfo;
    			var interfaces:Vector.<NetworkInterface> = networkInfo.findInterfaces();

    			if( interfaces != null )
    			{
    				trace( "Interface count: " + interfaces.length );
    				for each ( var interfaceObj:NetworkInterface in interfaces )
    				{
    					trace( "\nname: "             + interfaceObj.name );
    					trace( "display name: "     + interfaceObj.displayName );
    					trace( "mtu: "                 + interfaceObj.mtu );
    					trace( "active?: "             + interfaceObj.active );
    					trace( "parent interface: " + interfaceObj.parent );
    					trace( "hardware address: " + interfaceObj.hardwareAddress );
    					if( interfaceObj.subInterfaces != null )
    					{
    						trace( "# subinterfaces: " + interfaceObj.subInterfaces.length );
    					}
    					trace("# addresses: "     + interfaceObj.addresses.length );
    					for each ( var address:InterfaceAddress in interfaceObj.addresses )
    					{
    						trace( "  type: "           + address.ipVersion );
    						trace( "  address: "         + address.address );
    						trace( "  broadcast: "         + address.broadcast );
    						trace( "  prefix length: "     + address.prefixLength );
    					}
    				}
    			}
    		}
    	}
    }

For more information, see:

- [NetworkInfo](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetworkInfo.html)

- [NetworkInterface](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetworkInterface.html)

- [InterfaceAddress](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/InterfaceAddress.html)

- [Flexpert: Detecting the network connection type with Flex 4.5](http://www.flexpert.be/2011/04/detecting-the-network-connection-type-with-flex-4-5/)

## Network connectivity changes

Your AIR application can run in environments with uncertain and changing network
connectivity. To help an application manage connections to online resources,
Adobe AIR sends a network change event whenever a network connection becomes
available or unavailable. Both the NetworkInfo object and the application's
NativeApplication object dispatch the `networkChange` event. To react to this
event, add a listener:

    NetworkInfo.networkInfo.addEventListener(Event.NETWORK_CHANGE, onNetworkChange);

And define an event handler function:

    function onNetworkChange(event:Event)
    {
    	//Check resource availability
    }

The `networkChange` event does not indicate a change in all network activity,
only that an individual network connection has changed. AIR does not attempt to
interpret the meaning of the network change. A networked computer can have many
real and virtual connections, so losing a connection does not necessarily mean
losing a resource. On the other hand, new connections do not guarantee improved
resource availability, either. Sometimes a new connection can even block access
to resources previously available (for example, when connecting to a VPN).

In general, the only way for an application to determine whether it can connect
to a remote resource is to try it. The service monitoring framework provides an
event-based means of responding to changes in network connectivity to a
specified host.

Note: The service monitoring framework detects whether a server responds
acceptably to a request. A successful check does not guarantee full
connectivity. Scalable web services often use caching and load-balancing
appliances to redirect traffic to a cluster of web servers. In this situation,
service providers only provide a partial diagnosis of network connectivity.

### Service monitoring

The service monitor framework, separate from the AIR framework, resides in the
file aircore.swc. To use the framework, the aircore.swc file must be included in
your build process.

Adobe® Flash® Builder includes this library automatically.

The ServiceMonitor class implements the framework for monitoring network
services and provides a base functionality for service monitors. By default, an
instance of the ServiceMonitor class dispatches events regarding network
connectivity. The ServiceMonitor object dispatches these events when the
instance is created and whenever the runtime detects a network change.
Additionally, you can set the `pollInterval` property of a ServiceMonitor
instance to check connectivity at a specified interval in milliseconds,
regardless of general network connectivity events. A ServiceMonitor object does
not check network connectivity until the `start()` method is called.

The URLMonitor class, a subclass of the ServiceMonitor class, detects changes in
HTTP connectivity for a specified URLRequest.

The SocketMonitor class, also a subclass of the ServiceMonitor class, detects
changes in connectivity to a specified host at a specified port.

Note: Prior to AIR 2, the service monitor framework was published in the
servicemonitor.swc library. This library is now deprecated. Use the aircore.swc
library instead.

#### Flash CS4 and CS5 Professional

To use these classes in Adobe® Flash® CS4 or CS5 Professional:

1.  Select the File \> Publish Settings command.

2.  Click the Settings button for ActionScript 3.0. Select Library Path.

3.  Click the Browse to SWC button and browse to the AIK folder in your Flash
    Professional installation folder.

4.  Within this folder, find the /frameworks/libs/air/aircore.swc (for AIR 2) or
    /frameworks/libs/air/servicemonitor.swc (for AIR 1.5).

5.  Click the OK button.

6.  Add the following import statement to your ActionScript 3.0 code: import
    air.net.\*;

#### Flash CS3 Professional

To use these classes in Adobe® Flash® CS3 Professional, drag the
ServiceMonitorShim component from the Components panel to the Library. Then, add
the following `import` statement to your ActionScript 3.0 code:

    import air.net.*;

### HTTP monitoring

The URLMonitor class determines if HTTP requests can be made to a specified
address at port 80 (the typical port for HTTP communication). The following code
uses an instance of the URLMonitor class to detect connectivity changes to the
Adobe website:

    import air.net.URLMonitor;
    import flash.net.URLRequest;
    import flash.events.StatusEvent;
    var monitor:URLMonitor;
    monitor = new URLMonitor(new URLRequest('http://www.example.com'));
    monitor.addEventListener(StatusEvent.STATUS, announceStatus);
    monitor.start();
    function announceStatus(e:StatusEvent):void {
    	trace("Status change. Current status: " + monitor.available);
    }

### Socket monitoring

AIR applications can also use socket connections for push-model connectivity.
Firewalls and network routers typically restrict network communication on
unauthorized ports for security reasons. For this reason, developers must
consider that users do not always have the capability to make socket
connections.

The following code uses an instance of the SocketMonitor class to detect
connectivity changes to a socket connection. The port monitored is 6667, a
common port for IRC:

    import air.net.ServiceMonitor;
    import flash.events.StatusEvent;

    socketMonitor = new SocketMonitor('www.example.com',6667);
    socketMonitor.addEventListener(StatusEvent.STATUS, socketStatusChange);
    socketMonitor.start();

    function announceStatus(e:StatusEvent):void {
    	trace("Status change. Current status: " + socketMonitor.available);
    }

If the socket server requires a secure connection, you can use the
SecureSocketMonitor class instead of SocketMonitor.

## Domain Name System (DNS) records

You can look up DNS resource records using the DNSResolver class. DNS resource
records provide information like the IP address of a domain name and the domain
name of an IP address. You can look up the following types of DNS resource
records:

- ARecord—IPv4 address for a host.

- AAAARecord—IPv6 address for a host.

- MXRecord—mail exchange record for a host.

- PTRRecord—host name for an IP address.

- SRVRecord—service record for a service.

To look up a record, you pass a query string and the class object representing
the record type to the `lookup()` method of the DNSResolver object. The query
string to use depends on the record type:

| Record class | Query string                                  | Example query string      |
| ------------ | --------------------------------------------- | ------------------------- |
| ARecord      | host name                                     | "example.com"             |
| AAAARecord   | host name                                     | "example.com"             |
| MXRecord     | host name                                     | "example.com"             |
| PTRRecord    | IP address                                    | "208.77.188.166"          |
| SRVRecord    | Service identifier: \_service.\_protocol.host | "\_sip.\_tcp.example.com" |

The following code example looks up the IP address of the host "example.com".

    package
    {
    	import flash.display.Sprite;
    	import flash.events.DNSResolverEvent;
    	import flash.events.ErrorEvent;
    	import flash.net.dns.ARecord;
    	import flash.net.dns.DNSResolver;

    	public class DNSResolverExample extends Sprite
    	{

    		public function DNSResolverExample()
    		{
    			var resolver:DNSResolver = new DNSResolver();
    			resolver.addEventListener( DNSResolverEvent.LOOKUP, lookupComplete );
    			resolver.addEventListener( ErrorEvent.ERROR, lookupError );

    			resolver.lookup( "example.com.", ARecord );
    		}

    		private function lookupComplete( event:DNSResolverEvent ):void
    		{
    			trace( "Query string: " + event.host );
    			trace( "Record count: " + event.resourceRecords.length );
    			for each( var record:* in event.resourceRecords )
    			{
    				if( record is ARecord ) trace( record.address );
    			}

    		}

    		private function lookupError( error:ErrorEvent ):void
    		{
    			trace("Error: " + error.text );
    		}
    	}
    }

For more information, see:

- [DNSResolver](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/DNSResolver.html)

- [DNSResolverEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/DNSResolverEvent.html)

- [ARecord](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/ARecord.html)

- [AAAARecord](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/AAAARecord.html)

- [MXRecord](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/MXRecord.html)

- [PTRRecord](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/PTRRecord.html)

- [SRVRecord](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/dns/SRVRecord.html)
