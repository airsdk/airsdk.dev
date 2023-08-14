---
sidebar_position: 2
---

# XML-RPC web service requests

An XML-RPC web service takes its call parameters as an XML document rather than
as a set of URL variables. To conduct a transaction with an XML-RPC web service,
create a properly formatted XML message and send it to the web service using the
HTTP `POST` method. In addition, you should set the `Content-Type` header for
the request so that the server treats the request data as XML.

The following example illustrates how to use the same web service call shown in
the REST example, but this time as an XML-RPC service:

    import flash.events.Event;
    import flash.events.ErrorEvent;
    import flash.events.IOErrorEvent;
    import flash.events.SecurityErrorEvent;
    import flash.net.URLLoader;
    import flash.net.URLRequest;
    import flash.net.URLRequestMethod;
    import flash.net.URLVariables;
    public function xmlRPCRequest():void
    {
    	//Create the XML-RPC document
    	var xmlRPC:XML = <methodCall>
    									<methodName></methodName>
    									<params>
    										<param>
    											<value>
    												<struct/>
    											</value>
    										</param>
    									</params>
    								</methodCall>;

    	xmlRPC.methodName = "test.echo";

    	//Add the method parameters
    	var parameters:Object = new Object();
    	parameters.api_key = "123456ABC";
    	parameters.message = "Able was I, ere I saw Elba.";

    	for( var propertyName:String in parameters )
    	{
    		xmlRPC..struct.member[xmlRPC..struct.member.length + 1] =
    			<member>
    				<name>{propertyName}</name>
    				<value>
    					<string>{parameters[propertyName]}</string>
    				</value>
    			</member>;
    	}

    	//Create the HTTP request object
    	var request:URLRequest = new URLRequest( "http://service.example.com/xml-rpc/" );
    	request.method = URLRequestMethod.POST;
    	request.cacheResponse = false;
    	request.requestHeaders.push(new URLRequestHeader("Content-Type", "application/xml"));
    	request.data = xmlRPC;

    	//Initiate the request
    	requestor = new URLLoader();
    	requestor.dataFormat = URLLoaderDataFormat.TEXT;
    	requestor.addEventListener( Event.COMPLETE, xmlRPCRequestComplete );
    	requestor.addEventListener( IOErrorEvent.IO_ERROR, xmlRPCRequestError );
    	requestor.addEventListener( SecurityErrorEvent.SECURITY_ERROR, xmlRPCRequestError );
    	requestor.load( request );
    }

    private function xmlRPCRequestComplete( event:Event ):void
    {
    	trace( XML(event.target.data).toXMLString() );
    }

    private function xmlRPCRequestError( error:ErrorEvent ):void
    {
    	trace( "An error occurred: " + error );
    }

WebKit in AIR doesn't support E4X syntax, so the method used to create the XML
document in the previous example does not work in JavaScript code. Instead, you
must use the DOM methods to create the XML document or create the document as a
string and use the JavaScript DOMParser class to convert the string to XML.

The following example uses DOM methods to create an XML-RPC message and an
XMLHttpRequest to conduct the web service transaction:

    <html>
    <head>
    	<title>XML-RPC web service request</title>
    	<script type="text/javascript">

    		function makeRequest()
    		{
    			var requestDisplay = document.getElementById( "request" );
    			var resultDisplay  = document.getElementById( "result" );

    			var request = {};
    			request.URL = "http://services.example.com/xmlrpc/";
    			request.method = "test.echo";
    			request.HTTPmethod = "POST";
    			request.parameters = {};
    			request.parameters.api_key = "123456ABC";
    			request.parameters.message = "Able was I ere I saw Elba.";
    			var requestMessage = formatXMLRPC( request );

    			xmlhttp = new XMLHttpRequest();
    			xmlhttp.open( request.HTTPmethod, request.URL, true);
    			xmlhttp.onreadystatechange = function() {
    				if (xmlhttp.readyState == 4) {
    					resultDisplay.innerText = xmlhttp.responseText;
    				}
    			}
    			xmlhttp.send( requestMessage );

    			requestDisplay.innerText = xmlToString( requestMessage.documentElement );
    		}

    		//Formats a request as XML-RPC document
    		function formatXMLRPC( request )
    		{
    			var xmldoc = document.implementation.createDocument( "", "", null );
    			var root = xmldoc.createElement( "methodCall" );
    			xmldoc.appendChild( root );
    			var methodName = xmldoc.createElement( "methodName" );
    			var methodString = xmldoc.createTextNode( request.method );
    			methodName.appendChild( methodString );

    			root.appendChild( methodName );

    			var params = xmldoc.createElement( "params" );
    			root.appendChild( params );

    			var param = xmldoc.createElement( "param" );
    			params.appendChild( param );
    			var value = xmldoc.createElement( "value" );
    			param.appendChild( value );
    			var struct = xmldoc.createElement( "struct" );
    			value.appendChild( struct );

    			for( var property in request.parameters )
    			{
    				var member = xmldoc.createElement( "member" );
    				struct.appendChild( member );

    				var name = xmldoc.createElement( "name" );
    				var paramName = xmldoc.createTextNode( property );
    				name.appendChild( paramName )
    				member.appendChild( name );

    				var value = xmldoc.createElement( "value" );
    				var type = xmldoc.createElement( "string" );
    				value.appendChild( type );
    				var paramValue = xmldoc.createTextNode( request.parameters[property] );
    				type.appendChild( paramValue )
    				member.appendChild( value );
    			}
    			return xmldoc;
    		}

    		//Returns a string representation of an XML node
    		function xmlToString( rootNode, indent )
    		{
    			if( indent == null ) indent = "";
    			var result = indent + "<" + rootNode.tagName + ">\n";
    			for( var i = 0; i < rootNode.childNodes.length; i++)
    			{
    				if(rootNode.childNodes.item( i ).nodeType == Node.TEXT_NODE )
    				{
    					result += indent + "    " + rootNode.childNodes.item( i ).textContent + "\n";
    				}
    			}
    			if( rootNode.childElementCount > 0 )
    			{
    				result += xmlToString( rootNode.firstElementChild, indent + "    " );
    			}
    			if( rootNode.nextElementSibling )
    			{
    				result += indent + "</" + rootNode.tagName + ">\n";
    				result += xmlToString( rootNode.nextElementSibling, indent );
    			}
    			else
    			{
    				result += indent +"</" + rootNode.tagName + ">\n";
    			}
    			return result;
    		}

    	</script>
    </head>
    <body onload="makeRequest()">
    	<h1>Request:</h1>
    	<pre id="request"></pre>
    	<h1>Result:</h1>
    	<pre id="result"></pre>
    </body>
    </html>
