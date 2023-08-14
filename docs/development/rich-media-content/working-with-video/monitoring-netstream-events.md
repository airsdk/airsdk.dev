# Monitoring NetStream events

Two types of events provide valuable usage data: `netStatus` and
`mediaTypeData`. In addition, a timer can be used to periodically log the
position of the NetStream playhead.

`netStatus` events provide information you can use to determine how much of a
stream a user viewed. Buffer and RTMFP stream transition events also result in a
`netStatus` event.

`mediaTypeData` events provide meta and XMP data information. The
Netstream.Play.Complete event is dispatched as a `mediaTypeData` event. Other
data embedded in the stream are also available through `mediaTypeData` events,
including cue points, text, and images.

The following example illustrates how to create a class that monitors status and
data events from any active NetStreams in an application. Typically, such a
class would upload the data it was interested in analyzing to a server for
collection.

    package com.adobe.example
    {
    	import flash.events.NetDataEvent;
    	import flash.events.NetMonitorEvent;
    	import flash.events.NetStatusEvent;
    	import flash.net.NetMonitor;
    	import flash.net.NetStream;

    	public class NetStreamEventMonitor
    	{
    		private var netmon:NetMonitor;
    		private var heartbeat:Timer = new Timer( 5000 );

    		public function NetStreamEventMonitor()
    		{
    			//Create NetMonitor object
    			netmon = new NetMonitor();
    			netmon.addEventListener( NetMonitorEvent.NET_STREAM_CREATE, newNetStream );

    			//Start the heartbeat timer
    			heartbeat.addEventListener( TimerEvent.TIMER, onHeartbeat );
    			heartbeat.start();
    		}

    		//On new NetStream
    		private function newNetStream( event:NetMonitorEvent ):void
    		{
    			trace( "New Netstream object");
    			var stream:NetStream = event.netStream;
    			stream.addEventListener(NetDataEvent.MEDIA_TYPE_DATA, onStreamData);
    			stream.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
    		}

    		//On data events from a NetStream object
    		private function onStreamData( event:NetDataEvent ):void
    		{

    			var netStream:NetStream = event.target as NetStream;
    			trace( "Data event from " + netStream.info.uri + " at " + event.timestamp );
    			switch( event.info.handler )
    			{
    				case "onMetaData":
    					//handle metadata;
    					break;
    				case "onXMPData":
    					//handle XMP;
    					break;
    				case "onPlayStatus":
    					//handle NetStream.Play.Complete
    				case "onImageData":
    					//handle image
    					break;
    				case "onTextData":
    					//handle text
    					break;
    				default:
    					//handle other events

    			}
    		}

    		//On status events from a NetStream object
    		private function onStatus( event:NetStatusEvent ):void
    		{
    			trace( "Status event from " + event.target.info.uri + " at " + event.target.time );
    			//handle status events
    		}
    		//On heartbeat timer
    		private function onHeartbeat( event:TimerEvent ):void
    		{
    			var streams:Vector.<NetStream> = netmon.listStreams();
    			for( var i:int = 0; i < streams.length; i++ )
    			{
    				trace( "Heartbeat on " + streams[i].info.uri + " at " + streams[i].time );
    				//handle heartbeat event
    			}
    		}

    	}
    }
