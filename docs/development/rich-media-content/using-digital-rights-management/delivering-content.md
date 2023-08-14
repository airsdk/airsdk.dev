---
sidebar_position: 13
---

# Delivering content

Adobe Access is agnostic to the delivery mechanism of the content as the Flash
Player abstracts out the networking layer and simply provides the protected
content to the Adobe Access subsystem. Hence, content can be delivered through
HTTP, HTTP Dynamic Streaming, RTMP, or RTMPE.

However, you may get some issues due to the necessity of the protected content's
metadata (usually in the form of a '.metadata' file) before Adobe Access can
acquire a license to decrypt the content. Specifically, with the RTMP/RTMPE
protocol, only FLV and F4V data can be delivered to the client through the Flash
Media Server (FMS). Because of this, the client must retrieve the metadata blob
by other ways. One option to solve this problem is to host the metadata on an
HTTP web server, and implement the client video player to retrieve the
appropriate metadata, depending on the content being played back.

    private function getMetadata():void {

    	extrapolated-path-to-metadata = "http://metadatas.mywebserver.com/" + videoname;
    	var urlRequest : URLRequest = new URLRequest(extrapolated-path-to-the-metadata + ".metadata");
    	var urlStream : URLStream = new URLStream();
    	urlStream.addEventListener(Event.COMPLETE, handleMetadata);
    	urlStream.addEventListener(IOErrorEvent.NETWORK_ERROR, handleIOError);
    	urlStream.addEventListener(IOErrorEvent.IO_ERROR, handleIOError);
    	urlStream.addEventListener(IOErrorEvent.VERIFY_ERROR, handleIOError);
    	try {
    		urlStream.load(urlRequest);
    	} catch(se:SecurityError) {
    		videoLog.text += se.toString() + "\n";
    	} catch(e:Error) {
    		videoLog.text += e.toString() + "\n";
    	}
    }
