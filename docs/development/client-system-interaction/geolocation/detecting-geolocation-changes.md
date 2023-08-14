---
sidebar_position: 1
---

# Detecting geolocation changes

To use the geolocation sensor, instantiate a Geolocation object and register for
`update` events it dispatches. The `update` event is a Geolocation event object.
The event has eight properties:

- `altitude` —The altitude in meters.

- `heading` —The direction of movement (with respect to true north) in degrees.

- `horizontalAccuracy` —The horizontal accuracy in meters.

- `latitude` —The latitude in degrees.

- `longitude` —The longitude in degrees.

- `speed` —The speed in meters per second.

- `timestamp` —The number of milliseconds at the time of the event since the
  runtime was initialized.

- `verticalAccuracy` —The vertical accuracy in meters.

The `timestamp` property is an int object. The others are Number objects.

Here is a basic example that displays geolocation data in a text field:

    var geo:Geolocation;
    if (Geolocation.isSupported)
    {
    	geo = new Geolocation();
    	geo.addEventListener(GeolocationEvent.UPDATE, updateHandler);
    }
    else
    {
    	geoTextField.text = "Geolocation feature not supported";
    }
    function updateHandler(event:GeolocationEvent):void
    {
    	geoTextField.text = "latitude: " + event.latitude.toString() + "\n"
    			+ "longitude: " + event.longitude.toString() + "\n"
    			+ "altitude: " + event.altitude.toString()
    			+ "speed: " + event.speed.toString()
    			+ "heading: " + event.heading.toString()
    			+ "horizontal accuracy: " + event.horizontalAccuracy.toString()
    			+ "vertical accuracy: " + event.verticalAccuracy.toString()
    }

To use this example, be sure to create the `geoTextField` text field and add it
to the display list before using this code.

You can adjust the desired time interval for geolocation events by calling the
`setRequestedUpdateInterval()` method of the Geolocation object. This method
takes one parameter, `interval`, which is the requested update interval in
milliseconds:

    var geo:Geolocation = new Geolocation();
    geo.setRequestedUpdateInterval(10000);

The actual time between geolocation updates may be greater or lesser than this
value. Any change in the update interval affects all registered listeners. If
you don't call the `setRequestedUpdateInterval()` method, the application
receives updates based on the device's default interval.

The user can prevent an application from accessing geolocation data. For
example, the iPhone prompts the user when an application attempts to obtain
geolocation data. In response to the prompt, the user can deny the application
access to geolocation data. The Geolocation object dispatches a `status` event
when the user makes access to geolocation data unavailable. Also, the
Geolocation object has a `muted` property, which is set to `true` when the
geolocation sensor is unavailable. The Geolocation object dispatches a `status`
event when the `muted` property changes. The following code shows how to detect
when geolocation data is unavailable:

    package
    {
    	import flash.display.Sprite;
    	import flash.display.StageAlign;
    	import flash.display.StageScaleMode;
    	import flash.events.GeolocationEvent;
    	import flash.events.MouseEvent;
    	import flash.events.StatusEvent;
    	import flash.sensors.Geolocation;
    	import flash.text.TextField;
    	import flash.text.TextFormat;

    	public class GeolocationTest extends Sprite
    	{

    		private var geo:Geolocation;
    		private var log:TextField;

    		public function GeolocationTest()
    		{
    			super();
    			stage.align = StageAlign.TOP_LEFT;
    			stage.scaleMode = StageScaleMode.NO_SCALE;
    			setUpTextField();

    			if (Geolocation.isSupported)
    			{
    				geo = new Geolocation();
    				if (!geo.muted)
    				{
    					geo.addEventListener(GeolocationEvent.UPDATE, geoUpdateHandler);
    				}
    				geo.addEventListener(StatusEvent.STATUS, geoStatusHandler);
    			}
    			else
    			{
    				log.text = "Geolocation not supported";
    			}
    		}

    		public function geoUpdateHandler(event:GeolocationEvent):void
    		{
    			log.text = "latitude : " + event.latitude.toString() + "\n";
    			log.appendText("longitude : " + event.longitude.toString() + "\n");
    		}

    		public function geoStatusHandler(event:StatusEvent):void
    		{
    			if (geo.muted)
    				geo.removeEventListener(GeolocationEvent.UPDATE, geoUpdateHandler);
    			else
    				geo.addEventListener(GeolocationEvent.UPDATE, geoStatusHandler);
    		}

    		private function setUpTextField():void
    		{
    			log = new TextField();
    			var format:TextFormat = new TextFormat("_sans", 24);
    			log.defaultTextFormat = format;
    			log.border = true;
    			log.wordWrap = true;
    			log.multiline = true;
    			log.x = 10;
    			log.y = 10;
    			log.height = stage.stageHeight - 20;
    			log.width = stage.stageWidth - 20;
    			log.addEventListener(MouseEvent.CLICK, clearLog);
    			addChild(log);
    		}
    		private function clearLog(event:MouseEvent):void
    		{
    			log.text = "";
    		}
    	}
    }

Note: First-generation iPhones, which do not include a GPS unit, dispatch
`update` events only occasionally. On these devices, a Geolocation object
initially dispatches one or two `update` events. It then dispatches `update`
events when information changes noticeably.

## Checking geolocation support

Use the `Geolocation.isSupported` property to test the runtime environment for
the ability to use this feature:

    if (Geolocation.isSupported)
    {
    	// Set up geolocation event listeners and code.
    }

Currently, geolocation is only supported on ActionScript-based applications for
the iPhone and in Flash Lite 4. If `Geolocation.isSupported` is `true` at run
time, then geolocation support exists.

Some iPhone models do not have a GPS unit. These models use other means (such as
mobile phone triangulation) to obtain geolocation data. For these models, or on
any iPhone that has the GPS disabled, a Geolocation object may only dispatch one
or two initial `update` events.
