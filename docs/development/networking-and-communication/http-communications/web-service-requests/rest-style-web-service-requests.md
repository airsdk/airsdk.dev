---
sidebar_position: 1
---

# REST-style web service requests

REST-style web services use HTTP method verbs to designate the basic action and
URL variables to specify the action details. For example, a request to get data
for an item could use the GET verb and URL variables to specify a method name
and item ID. The resulting URL string might look like:

```
http://service.example.com/?method=getItem&id=d3452
```

To access a REST-style web service with ActionScript, you can use the
URLRequest, URLVariables, and URLLoader classes. In JavaScript code within an
AIR application, you can also use an XMLHttpRequest.

Programming a REST-style web service call in ActionScript, typically involves
the following steps:

1.  Create a URLRequest object.

2.  Set the service URL and HTTP method verb on the request object.

3.  Create a URLVariables object.

4.  Set the service call parameters as dynamic properties of the variables
```
object.
```

5.  Assign the variables object to the data property of the request object.

6.  Send the call to the service with a URLLoader object.

7.  Handle the `complete` event dispatched by the URLLoader that indicates that
```
the service call is complete. It is also wise to listen for the various
error events that can be dispatched by a URLLoader object.
```

For example, consider a web service that exposes a test method that echoes the
call parameters back to the requestor. The following ActionScript code could be
used to call the service:

```
import flash.events.Event;
import flash.events.ErrorEvent;
import flash.events.IOErrorEvent;
import flash.events.SecurityErrorEvent;
import flash.net.URLLoader;
import flash.net.URLRequest;
import flash.net.URLRequestMethod;
import flash.net.URLVariables;

private var requestor:URLLoader = new URLLoader();
public function restServiceCall():void
{
	//Create the HTTP request object
	var request:URLRequest = new URLRequest( "http://service.example.com/" );
	request.method = URLRequestMethod.GET;

	//Add the URL variables
	var variables:URLVariables = new URLVariables();
	variables.method = "test.echo";
	variables.api_key = "123456ABC";
	variables.message = "Able was I, ere I saw Elba.";
	request.data = variables;

	//Initiate the transaction
	requestor = new URLLoader();
	requestor.addEventListener( Event.COMPLETE, httpRequestComplete );
	requestor.addEventListener( IOErrorEvent.IOERROR, httpRequestError );
	requestor.addEventListener( SecurityErrorEvent.SECURITY_ERROR, httpRequestError );
	requestor.load( request );
}
private function httpRequestComplete( event:Event ):void
{
	trace( event.target.data );
}

private function httpRequestError( error:ErrorEvent ):void{
	trace( "An error occured: " + error.message );
}
```

In JavaScript within an AIR application, you can make the same request using the
XMLHttpRequest object:

```
<html>
<head>
	<title>RESTful web service request</title>
	<script type="text/javascript">
		function makeRequest()
		{
			var requestDisplay = document.getElementById( "request" );
			var resultDisplay  = document.getElementById( "result" );

			//Create a conveninece object to hold the call properties
			var request = {};
			request.URL = "http://service.example.com/";
			request.method = "test.echo";
			request.HTTPmethod = "GET";
			request.parameters = {};
			request.parameters.api_key = "ABCDEF123";
			request.parameters.message = "Able was I ere I saw Elba.";
			var requestURL = makeURL( request );
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open( request.HTTPmethod, requestURL, true);
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					resultDisplay.innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.send(null);

			requestDisplay.innerHTML = requestURL;
		}
		//Convert the request object into a properly formatted URL
		function makeURL( request )
		{
			var url = request.URL + "?method=" + escape( request.method );
			for( var property in request.parameters )
			{
				url += "&" + property + "=" + escape( request.parameters[property] );
			}

			return url;
		}
	</script>
</head>
<body onload="makeRequest()">
	<h1>Request:</h1>
	<div id="request"></div>
	<h1>Result:</h1>
	<div id="result"></div>
</body>
</html>
```
