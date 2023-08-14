---
sidebar_position: 2
---

# Sockets

A socket is a type of network connection established between two computer
processes. Typically, the processes are running on two different computers
attached to the same Internet Protocol (IP) network. However, the connected
processes can be running on the same computer using the special "local host" IP
address.

Adobe Flash Player supports client-side Transport Control Protocol (TCP)
sockets. A Flash Player application can connect to another process acting as a
socket server, but cannot accept incoming connection requests from other
processes. In other words, a Flash Player application can connect to a TCP
server, but cannot serve as one.

The Flash Player API also includes the XMLSocket class. The XMLSocket class uses
a Flash Player-specific protocol that allows you to exchange XML messages with a
server that understands that protocol. The XMLSocket class was introduced in
ActionScript 1 and is still supported to provide backward compatibility. In
general, the Socket class should be used for new applications unless you are
connecting to a server specifically created to communicate with Flash
XMLSockets.

Adobe AIR adds several additional classes for socket-based network programming.
AIR applications can act as TCP socket servers with the ServerSocket class and
can connect to socket servers requiring SSL or TLS security with the
SecureSocket class. AIR applications can also send and receive Universal
Datagram Protocol (UDP) messages with the DatagramSocket class.

## TCP sockets

The Transmission Control Protocol (TCP) provides a way to exchange messages over
a persistent network connection. TCP guarantees that any messages sent arrive in
the correct order (barring major network problems). TCP connections require a
"client" and a "server." Flash Player can create client sockets. Adobe AIR can,
additionally, create server sockets.

The following ActionScript APIs provide TCP connections:

- Socket — allows a client application to connect to a server. The Socket class
  cannot listen for incoming connections.

- SecureSocket (AIR) — allows a client application to connect to a trusted
  server and engage in encrypted communications.

- ServerSocket (AIR) — allows an application to listen for incoming connections
  and act as a server.

- XMLSocket — allows a client application to connect to an XMLSocket server.

### Binary client sockets

A binary socket connection is similar to an XML socket except that the client
and server are not limited to exchanging XML messages. Instead, the connection
can transfer data as binary information. Thus, you can connect to a wider range
of services, including mail servers (POP3, SMTP, and IMAP), and news servers
(NNTP).

#### Socket class

The Socket class enables you to make socket connections and to read and write
raw binary data. The Socket class is useful for interoperating with servers that
use binary protocols. By using binary socket connections, you can write code
that interacts with several different Internet protocols, such as POP3, SMTP,
IMAP, and NNTP. This interaction, in turn, enables your applications to connect
to mail and news servers.

Flash Player can interface with a server by using the binary protocol of that
server directly. Some servers use the big-endian byte order, and some use the
little-endian byte order. Most servers on the Internet use the big-endian byte
order because "network byte order" is big-endian. The little-endian byte order
is popular because the Intel® x86 architecture uses it. You should use the
endian byte order that matches the byte order of the server that is sending or
receiving data. All operations that are performed by the IDataInput and
IDataOutput interfaces, and the classes that implement those interfaces
(ByteArray, Socket, and URLStream), are encoded by default in big-endian format;
that is, with the most significant byte first. This default byte order was
chosen to match Java and the official network byte order. To change whether
big-endian or little-endian byte order is used, you can set the `endian`
property to `Endian.BIG_ENDIAN` or `Endian.LITTLE_ENDIAN`.

![](../img/tip_help.png) The Socket class inherits all the methods defined by
the IDataInput and IDataOutput interfaces (located in the flash.utils package).
Those methods must be used to write to and read from the Socket.

For more information, see:

- [Socket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/Socket.html)

- [IDataInput](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/IDataInput.html)

- [IDataOutput](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/IDataOutput.html)

- [socketData event](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/ProgressEvent.html#SOCKET_DATA)

#### Secure client sockets (AIR)

You can use the SecureSocket class to connect to socket servers that use Secure
Sockets Layer version 4 (SSLv4) or Transport Layer Security version 1 (TLSv1). A
secure socket provides three benefits: server authentication, data integrity,
and message confidentiality. The runtime authenticates a server using the server
certificate and its relationship to the root or intermediate certificate
authority certificates in the user's trust store. The runtime relies on the
cryptography algorithms used by the SSL and TLS protocol implementations to
provide data integrity and message confidentiality.

When you connect to a server using the SecureSocket object, the runtime
validates the server certificate using the certificate trust store. On Windows
and Mac, the operating system provides the trust store. On Linux, the runtime
provides its own trust store.

If the server certificate is not valid or not trusted, the runtime dispatches an
`ioError` event. You can check the `serverCertificateStatus` property of the
SecureSocket object to determine why validation failed. No provision is provided
for communicating with a server that does not have a valid and trusted
certificate.

The CertificateStatus class defines string constants that represent the possible
validation results:

- Expired—the certificate expiration date has passed.

- Invalid—there are a number of reasons that a certificate can be invalid. For
  example, the certificate could have been altered, corrupted, or it could be
  the wrong type of certificate.

- Invalid chain—one or more of the certificates in the server's chain of
  certificates are invalid.

- Principal mismatch—the host name of the server and the certificate common name
  do not match. In other words, the server is using the wrong certificate.

- Revoked—the issuing certificate authority has revoked the certificate.

- Trusted—the certificate is valid and trusted. A SecureSocket object can only
  connect to a server that uses a valid, trusted certificate.

- Unknown—the SecureSocket object has not validated the certificate yet. The
  `serverCertificateStatus` property has this status value before you call
  `connect()` and before either a `connect` or an `ioError` event is dispatched.

- Untrusted signers—the certificate does not "chain" to a trusted root
  certificate in the trust store of the client computer.

Communicating with a SecureSocket object requires a server that uses a secure
protocol and has a valid, trusted certificate. In other respects, using a
SecureSocket object is the same as using a Socket object.

The SecureSocket object is not supported on all platforms. Use the SecureSocket
class `isSupported` property to test whether the runtime supports use of the
SecureSocket object on the current client computer.

For more information, see:

- [SecureSocket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/SecureSocket.html)

- [CertificateStatus](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/CertificateStatus.html)

- [IDataInput](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/IDataInput.html)

- [IDataOutput](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/IDataOutput.html)

- [socketData event](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/ProgressEvent.html#SOCKET_DATA)

#### TCP socket example: Building a Telnet client

The Telnet example demonstrates techniques for connecting with a remote server
and transmitting data using the Socket class. The example demonstrates the
following techniques:

- Creating a custom telnet client using the Socket class

- Sending text to the remote server using a ByteArray object

- Handling received data from a remote server

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Telnet application files can be found in the Samples/Telnet folder. The
application consists of the following files:

<table>
<thead>
	<tr>
		<th><p>File</p></th>
		<th><p>Description</p></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><p>TelnetSocket.fla</p>
		<p>or</p>
		<p>TelnetSocket.mxml</p></td>
		<td><p>The main application file consisting of the user interface for
		Flex (MXML) or Flash (FLA).</p></td>
	</tr>
	<tr>
		<td><p>TelnetSocket.as</p></td>
		<td><p>Document class providing the user interface logic (Flash
		only).</p></td>
	</tr>
	<tr>
		<td><p>com/example/programmingas3/Telnet/Telnet.as</p></td>
		<td><p>Provides the Telnet client functionality for the application,
		such as connecting to a remote server, and sending, receiving, and
		displaying data.</p></td>
	</tr>
</tbody>
</table>

##### Telnet socket application overview

The main TelnetSocket.mxml file is responsible for creating the user interface
(UI) for the entire application.

In addition to the UI, this file also defines two methods, `login()` and
`sendCommand()`, to connect the user to the specified server.

The following code lists the ActionScript in the main application file:

    import com.example.programmingas3.socket.Telnet;

    private var telnetClient:Telnet;
    private function connect():void
    {
    	telnetClient = new Telnet(serverName.text, int(portNumber.text), output);
    	console.title = "Connecting to " + serverName.text + ":" + portNumber.text;
    	console.enabled = true;
    }
    private function sendCommand():void
    {
    	var ba:ByteArray = new ByteArray();
    	ba.writeMultiByte(command.text + "\n", "UTF-8");
    	telnetClient.writeBytesToSocket(ba);
    	command.text = "";
    }

The first line of code imports the Telnet class from the custom
com.example.programmingas.socket package. The second line of code declares an
instance of the Telnet class, `telnetClient`, that is initialized later by the
`connect()` method. Next, the `connect()` method is declared and initializes the
`telnetClient` variable declared earlier. This method passes the user-specified
telnet server name, telnet server port, and a reference to a TextArea component
on the display list, which is used to display the text responses from the socket
server. The final two lines of the `connect()` method set the `title` property
for the Panel and enable the Panel component, which allows the user to send data
to the remote server. The final method in the main application file,
`sendCommand()`, is used to send the user's commands to the remote server as a
ByteArray object.

##### Telnet class overview

The Telnet class is responsible for connecting to the remote Telnet server and
sending/receiving data.

The Telnet class declares the following private variables:

    private var serverURL:String;
    private var portNumber:int;
    private var socket:Socket;
    private var ta:TextArea;
    private var state:int = 0;

The first variable, `serverURL`, contains the user-specified server address to
connect to.

The second variable, `portNumber`, is the port number that the Telnet server is
currently running on. By default, the Telnet service runs on port 23.

The third variable, `socket`, is a Socket instance that attempts to connect to
the server defined by the `serverURL` and `portNumber` variables.

The fourth variable, `ta`, is a reference to a TextArea component instance on
the Stage. This component is used to display responses from the remote Telnet
server, or any possible error messages.

The final variable, `state`, is a numeric value that is used to determine which
options your Telnet client supports.

As you saw before, the Telnet class's constructor function is called by the
`connect()` method in the main application file.

The Telnet constructor takes three parameters: `server`, `port`, and `output`.
The `server` and `port` parameters specify the server name and port number where
the Telnet server is running. The final parameter, `output`, is a reference to a
TextArea component instance on the Stage where server output is displayed to
users.

    public function Telnet(server:String, port:int, output:TextArea)
    {
    	serverURL = server;
    	portNumber = port;
    	ta = output;
    	socket = new Socket();
    	socket.addEventListener(Event.CONNECT, connectHandler);
    	socket.addEventListener(Event.CLOSE, closeHandler);
    	socket.addEventListener(ErrorEvent.ERROR, errorHandler);
    	socket.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
    	socket.addEventListener(ProgressEvent.SOCKET_DATA, dataHandler);
    	Security.loadPolicyFile("http://" + serverURL + "/crossdomain.xml");
    	try
    	{
    		msg("Trying to connect to " + serverURL + ":" + portNumber + "\n");
    		socket.connect(serverURL, portNumber);
    	}
    	catch (error:Error)
    	{
    		msg(error.message + "\n");
    		socket.close();
    	}
    }

##### Writing data to a socket

To write data to a socket connection, you call any of the write methods in the
Socket class. These write methods include `writeBoolean()`, `writeByte()`,
`writeBytes()`, `writeDouble()`, and others. Then, flush the data in the output
buffer using the `flush()` method. In the Telnet server, data is written to the
socket connection using the `writeBytes()` method which takes the byte array as
a parameter and sends it to the output buffer. The `writeBytesToSocket()` method
is as follows:

    public function writeBytesToSocket(ba:ByteArray):void
    {
    	socket.writeBytes(ba);
    	socket.flush();
    }

This method gets called by the `sendCommand()` method of the main application
file.

##### Displaying messages from the socket server

Whenever a message is received from the socket server, or an event occurs, the
custom `msg()` method is called. This method appends a string to the TextArea on
the Stage and calls a custom `setScroll()` method, which causes the TextArea
component to scroll to the bottom. The `msg()` method is as follows:

    private function msg(value:String):void
    {
    	ta.text += value;
    	setScroll();
    }

If you didn't automatically scroll the contents of the TextArea component, users
would need to manually drag the scroll bars on the text area to see the latest
response from the server.

##### Scrolling a TextArea component

The `setScroll()` method contains a single line of ActionScript that scrolls the
TextArea component's contents vertically so the user can see the last line of
the returned text. The following snippet shows the `setScroll()` method:

    public function setScroll():void
    {
    	ta.verticalScrollPosition = ta.maxVerticalScrollPosition;
    }

This method sets the `verticalScrollPosition` property, which is the line number
of the top row of characters that is currently displayed, and sets it to the
value of the `maxVerticalScrollPosition` property.

### XML sockets

An XML socket lets you create a connection to a remote server that remains open
until explicitly closed. You can exchange string data, such as XML, between the
server and client. A benefit of using an XML socket server is that the client
does not need to explicitly request data. The server can send data without
waiting for a request and can send data to every connected client connected.

In Flash Player, and in Adobe AIR content outside the application sandbox, XML
socket connections require the presence of a socket policy file on the target
server. For more information, see
[Website controls (policy files)](../security/permission-controls.md#website-controls-policy-files)
and [Connecting to sockets](../security/loading-data.md#connecting-to-sockets).

The XMLSocket class cannot tunnel through firewalls automatically because,
unlike the Real-Time Messaging Protocol (RTMP), XMLSocket has no HTTP tunneling
capability. If you need to use HTTP tunneling, consider using Flash Remoting or
Flash Media Server (which supports RTMP) instead.

The following restrictions apply to how and where content in Flash Player or in
an AIR application outside of the application security sandbox can use an
XMLSocket object to connect to the server:

- For content outside of the application security sandbox, the
  `XMLSocket.connect()` method can connect only to TCP port numbers greater than
  or equal to 1024. One consequence of this restriction is that the server
  daemons that communicate with the `XMLSocket` object must also be assigned to
  port numbers greater than or equal to 1024. Port numbers below 1024 are often
  used by system services such as FTP (21), Telnet (23), SMTP (25), HTTP (80),
  and POP3 (110), so XMLSocket objects are barred from these ports for security
  reasons. The port number restriction limits the possibility that these
  resources will be inappropriately accessed and abused.

- For content outside of the application security sandbox, the
  `XMLSocket.connect()` method can connect only to computers in the same domain
  where the content resides. (This restriction is identical to the security
  rules for `URLLoader.load()`.) To connect to a server daemon running in a
  domain other than the one where the content resides, you can create a
  cross-domain policy file on the server that allows access from specific
  domains. For details on cross-domain policy files, see
  [AIR security](../security/air-security/index.md).

Note: Setting up a server to communicate with the XMLSocket object can be
challenging. If your application does not require real-time interactivity, use
the URLLoader class instead of the XMLSocket class.

You can use the `XMLSocket.connect()` and `XMLSocket.send()` methods of the
XMLSocket class to transfer XML to and from a server over a socket connection.
The `XMLSocket.connect()` method establishes a socket connection with a web
server port. The `XMLSocket.send()` method passes an XML object to the server
specified in the socket connection.

When you invoke the `XMLSocket.connect()` method, the application opens a TCP/IP
connection to the server and keeps that connection open until one of the
following occurs:

- The `XMLSocket.close()` method of the XMLSocket class is called.

- No more references to the XMLSocket object exist.

- Flash Player exits.

- The connection is broken (for example, the modem disconnects).

#### Connecting to a server with the XMLSocket class

To create a socket connection, you must create a server-side application to wait
for the socket connection request and send a response to the Flash Player or AIR
application. This type of server-side application can be written in AIR or in
another programming language such as Java, Python, or Perl. To use the XMLSocket
class, the server computer must run a daemon that understands the simple
protocol used by the XMLSocket class:

- XML messages are sent over a full-duplex TCP/IP stream socket connection.

- Each XML message is a complete XML document, terminated by a zero (0) byte.

- An unlimited number of XML messages can be sent and received over a single
  XMLSocket connection.

##### Creating and connecting to a Java XML socket server

The following code demonstrates a simple XMLSocket server written in Java that
accepts incoming connections and displays the received messages in the command
prompt window. By default, a new server is created on port 8080 of your local
machine, although you can specify a different port number when starting your
server from the command line.

Create a new text document and add the following code:

    import java.io.*;
    import java.net.*;

    class SimpleServer
    {
    	private static SimpleServer server;
    	ServerSocket socket;
    	Socket incoming;
    	BufferedReader readerIn;
    	PrintStream printOut;

    	public static void main(String[] args)
    	{
    		int port = 8080;

    		try
    		{
    			port = Integer.parseInt(args[0]);
    		}
    		catch (ArrayIndexOutOfBoundsException e)
    		{
    			// Catch exception and keep going.
    		}

    		server = new SimpleServer(port);
    	}

    	private SimpleServer(int port)
    	{
    		System.out.println(">> Starting SimpleServer");
    		try
    		{
    			socket = new ServerSocket(port);
    			incoming = socket.accept();
    			readerIn = new BufferedReader(new InputStreamReader(incoming.getInputStream()));
    			printOut = new PrintStream(incoming.getOutputStream());
    			printOut.println("Enter EXIT to exit.\r");
    			out("Enter EXIT to exit.\r");
    			boolean done = false;
    			while (!done)
    			{
    				String str = readerIn.readLine();
    				if (str == null)
    				{
    					done = true;
    				}
    				else
    				{
    					out("Echo: " + str + "\r");
    					if(str.trim().equals("EXIT"))
    					{
    						done = true;
    					}
    				}
    				incoming.close();
    			}
    		}
    		catch (Exception e)
    		{
    			System.out.println(e);
    		}
    	}

    	private void out(String str)
    	{
    		printOut.println(str);
    		System.out.println(str);
    	}
    }

Save the document to your hard disk as SimpleServer.java and compile it using a
Java compiler, which creates a Java class file named SimpleServer.class.

You can start the XMLSocket server by opening a command prompt and typing
`java SimpleServer`. The SimpleServer.class file can be located anywhere on your
local computer or network; it doesn't need to be placed in the root directory of
your web server.

![](../img/tip_help.png) If you're unable to start the server because the files
are not located within the Java classpath, try starting the server with
`java -classpath . SimpleServer` _._

To connect to the XMLSocket from your application, you need to create a new
instance of the XMLSocket class, and call the `XMLSocket.connect()` method while
passing a host name and port number, as follows:

    var xmlsock:XMLSocket = new XMLSocket();
    xmlsock.connect("127.0.0.1", 8080);

Whenever you receive data from the server, the `data` event (
`flash.events.DataEvent.DATA`) is dispatched:

    xmlsock.addEventListener(DataEvent.DATA, onData);
    private function onData(event:DataEvent):void
    {
    	trace("[" + event.type + "] " + event.data);
    }

To send data to the XMLSocket server, you use the `XMLSocket.send()` method and
pass an XML object or string. Flash Player converts the supplied parameter to a
String object and sends the content to the XMLSocket server followed by a zero
(0) byte:

    xmlsock.send(xmlFormattedData);

The `XMLSocket.send()` method does not return a value that indicates whether the
data was successfully transmitted. If an error occurred while trying to send
data, an IOError error is thrown.

![](../img/tip_help.png) Each message you send to the XML socket server must be
terminated by a newline ( `\n` _) character._

For more information, see
[XMLSocket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/XMLSocket.html).

### Server sockets

Use the ServerSocket class to allow other processes to connect to your
application using a Transport Control Protocol (TCP) socket. The connecting
process can be running on the local computer or on another network-connected
computer. When a ServerSocket object receives a connection request, it
dispatches a `connect` event. The ServerSocketConnectEvent object dispatched
with the event contains a Socket object. You can use this Socket object for
subsequent communication with the other process.

To listen for incoming socket connections:

1.  Create a ServerSocket object and bind it to a local port

2.  Add event listeners for the `connect` event

3.  Call the `listen()` method

4.  Respond to the `connect` event, which provides a Socket object for each
    incoming connection

The ServerSocket object continues to listen for new connections until you call
the `close()` method.

The following code example illustrates how to create a socket server
application. The example listens for incoming connections on port 8087. When a
connection is received, the example sends a message (the string "Connected.") to
the client socket. Thereafter, the server echoes any messages received back to
the client.

    package
    {
    	import flash.display.Sprite;
    	import flash.events.Event;
    	import flash.events.IOErrorEvent;
    	import flash.events.ProgressEvent;
    	import flash.events.ServerSocketConnectEvent;
    	import flash.net.ServerSocket;
    	import flash.net.Socket;

    	public class ServerSocketExample extends Sprite
    	{
    		private var serverSocket:ServerSocket;
    		private var clientSockets:Array = new Array();

    		public function ServerSocketExample()
    		{
    			try
    			{
    				// Create the server socket
    				serverSocket = new ServerSocket();

    				// Add the event listener
    				serverSocket.addEventListener( Event.CONNECT, connectHandler );
    				serverSocket.addEventListener( Event.CLOSE, onClose );

    				// Bind to local port 8087
    				serverSocket.bind( 8087, "127.0.0.1" );

    				// Listen for connections
    				serverSocket.listen();
    				trace( "Listening on " + serverSocket.localPort );

    			}
    			catch(e:SecurityError)
    			{
    				trace(e);
    			}
    		}

    		public function connectHandler(event:ServerSocketConnectEvent):void
    		{
    			//The socket is provided by the event object
    			var socket:Socket = event.socket as Socket;
    			clientSockets.push( socket );

    			socket.addEventListener( ProgressEvent.SOCKET_DATA, socketDataHandler);
    			socket.addEventListener( Event.CLOSE, onClientClose );
    			socket.addEventListener( IOErrorEvent.IO_ERROR, onIOError );

    			//Send a connect message
    			socket.writeUTFBytes("Connected.");
    			socket.flush();

    			trace( "Sending connect message" );
    		}

    		public function socketDataHandler(event:ProgressEvent):void
    		{
    			var socket:Socket = event.target as Socket

    			//Read the message from the socket
    			var message:String = socket.readUTFBytes( socket.bytesAvailable );
    			trace( "Received: " + message);

    			// Echo the received message back to the sender
    			message = "Echo -- " + message;
    			socket.writeUTFBytes( message );
    			socket.flush();
    			trace( "Sending: " + message );
    		}

    		private function onClientClose( event:Event ):void
    		{
    			trace( "Connection to client closed." );
    			//Should also remove from clientSockets array...
    		}

    		private function onIOError( errorEvent:IOErrorEvent ):void
    		{
    			trace( "IOError: " + errorEvent.text );
    		}

    		private function onClose( event:Event ):void
    		{
    			trace( "Server socket closed by OS." );
    		}
    	}
    }

For more information, see:

- [ServerSocket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/ServerSocket.html)

- [ServerSocketConnectEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/ServerSocketConnectEvent.html)

- [Socket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/Socket.html)

## UDP sockets (AIR)

The Universal Datagram Protocol (UDP) provides a way to exchange messages over a
stateless network connection. UDP provides no guarantees that messages are
delivered in order or even that messages are delivered at all. With UDP, the
operating system's network code usually spends less time marshaling, tracking,
and acknowledging messages. Thus, UDP messages typically arrive at the
destination application with a shorter delay than do TCP messages.

UDP socket communication is helpful when you must send real-time information
such as position updates in a game, or sound packets in an audio chat
application. In such applications, some data loss is acceptable, and low
transmission latency is more important than guaranteed arrival. For almost all
other purposes, TCP sockets are a better choice.

Your AIR application can send and receive UDP messages with the DatagramSocket
and DatagramSocketDataEvent classes. To send or receive a UDP message:

1.  Create a DatagramSocket object

2.  Add an event listener for the `data` event

3.  Bind the socket to a local IP address and port using the `bind()` method

4.  Send messages by calling the `send()` method, passing in the IP address and
    port of the target computer

5.  Receive messages by responding to the `data` event. The
    DatagramSocketDataEvent object dispatched for this event contains a
    ByteArray object containing the message data.

The following code example illustrates how an application can send and receive
UDP messages. The example sends a single message containing the string,
"Hello.", to the target computer. It also traces the contents of any messages
received.

    package
    {
    	import flash.display.Sprite;
    	import flash.events.DatagramSocketDataEvent;
    	import flash.events.Event;
    	import flash.net.DatagramSocket;
    	import flash.utils.ByteArray;

    	public class DatagramSocketExample extends Sprite
    	{
    		private var datagramSocket:DatagramSocket;

    		//The IP and port for this computer
    		private var localIP:String = "192.168.0.1";
    		private var localPort:int = 55555;

    		//The IP and port for the target computer
    		private var targetIP:String = "192.168.0.2";
    		private var targetPort:int = 55555;

    		public function DatagramSocketExample()
    		{
    			//Create the socket
    			datagramSocket = new DatagramSocket();
    			datagramSocket.addEventListener( DatagramSocketDataEvent.DATA, dataReceived );

    			//Bind the socket to the local network interface and port
    			datagramSocket.bind( localPort, localIP );

    			//Listen for incoming datagrams
    			datagramSocket.receive();

    			//Create a message in a ByteArray
    			var data:ByteArray = new ByteArray();
    			data.writeUTFBytes("Hello.");

    			//Send the datagram message
    			datagramSocket.send( data, 0, 0, targetIP, targetPort);
    		}

    		private function dataReceived( event:DatagramSocketDataEvent ):void
    		{
    			//Read the data from the datagram
    			trace("Received from " + event.srcAddress + ":" + event.srcPort + "> " +
    				event.data.readUTFBytes( event.data.bytesAvailable ) );
    		}
    	}
    }

Keep in mind the following considerations when using UDP sockets:

- A single packet of data cannot be larger than the smallest maximum
  transmission unit (MTU) of the network interface or any network nodes between
  the sender and the recipient. All of the data in the ByteArray object passed
  to the send() method is sent as a single packet. (In TCP, large messages are
  broken up into separate packets.)

- There is no handshaking between the sender and the target. Messages are
  discarded without error if the target does not exist or does not have an
  active listener at the specified port.

- When you use the `connect()` method, messages sent from other sources are
  ignored. A UDP connection provides convenient packet filtering only. It does
  not mean that there is necessarily a valid, listening process at the target
  address and port.

- UDP traffic can swamp a network. Network administrators might need to
  implement quality-of-service controls if network congestion occurs. (TCP has
  built-in traffic control to reduce the impact of network congestion.)

For more information, see:

- [DatagramSocket](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/DatagramSocket.html)

- [DatagramSocketDataEvent](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/DatagramSocketDataEvent.html)

- [ByteArray](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/ByteArray.html)

## IPv6 addresses

Flash Player 9.0.115.0 and later support IPv6 (Internet Protocol version 6).
IPv6 is a version of Internet Protocol that supports 128-bit addresses (an
improvement on the earlier IPv4 protocol that supports 32-bit addresses). You
might need to activate IPv6 on your networking interfaces. For more information,
see the Help for the operating system hosting the data.

If IPv6 is supported on the hosting system, you can specify numeric IPv6 literal
addresses in URLs enclosed in brackets (\[\]), as in the following:

    [2001:db8:ccc3:ffff:0:444d:555e:666f]

Flash Player returns literal IPv6 values, according to the following rules:

- Flash Player returns the long form of the string for IPv6 addresses.

- The IP value has no double-colon abbreviations.

- Hexadecimal digits are lowercase only.

- IPv6 addresses are enclosed in square brackets (\[\]).

- Each address quartet is output as 0 to 4 hexadecimal digits, with the leading
  zeros omitted.

- An address quartet of all zeros is output as a single zero (not a double
  colon) except as noted in the following list of exceptions.

The IPv6 values that Flash Player returns have the following exceptions:

- An unspecified IPv6 address (all zeros) is output as \[::\].

- The loopback or localhost IPv6 address is output as \[::1\].

- IPv4 mapped (converted to IPv6) addresses are output as \[::ffff:a.b.c.d\],
  where a.b.c.d is a typical IPv4 dotted-decimal value.

- IPv4 compatible addresses are output as \[::a.b.c.d\], where a.b.c.d is a
  typical IPv4 dotted-decimal value.

More Help topics

[Connecting to sockets](../security/loading-data.md#connecting-to-sockets)

![](../img/flashplatformLinkIndicator.png)
[flash.net package](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/package-detail.html)
