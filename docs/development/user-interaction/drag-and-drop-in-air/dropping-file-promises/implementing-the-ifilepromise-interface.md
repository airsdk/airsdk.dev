---
sidebar_position: 2
---

# Implementing the IFilePromise interface

To provide file promises for resources that cannot be accessed using a
URLFilePromise object, you can implement the IFilePromise interface in a custom
class. The IFilePromise interface defines the methods and properties used by the
AIR runtime to access the data to be written to a file once the file promise is
dropped.

An IFilePromise implementation passes another object to the AIR runtime that
provides the data for the file promise. This object must implement the
IDataInput interface, which the AIR runtime uses to read the data. For example,
the URLFilePromise class, which implements IFilePromise, uses a URLStream object
as the data provider.

AIR can read the data synchronously or asynchronously. The IFilePromise
implementation reports which mode of access is supported by returning the
appropriate value in the `isAsync` property. If asynchronous data access is
provided, the data provider object must implement the IEventDispatcher interface
and dispatch the necessary events, such as `open`, `progress` and `complete`.

You can use a custom class, or one of the following built-in classes, as a data
provider for a file promise:

- ByteArray (synchronous)

- FileStream (synchronous or asynchronous)

- Socket (asynchronous)

- URLStream (asynchronous)

To implement the IFilePromise interface, you must provide code for the following
functions and properties:

- `open():IDataInput` — Returns the data provider object from which the data for
  the promised file is read. The object must implement the IDataInput interface.
  If the data is provided asynchronously, the object must also implement the
  IEventDispatcher interface and dispatch the necessary events (see
  [Using an asynchronous data provider in a file promise](#using-an-asynchronous-data-provider-in-a-file-promise)).

- `get relativePath():String` — Provides the path, including file name, for the
  created file. The path is resolved relative to the drop location chosen by the
  user in the drag-and-drop operation. To make sure that the path uses the
  proper separator character for the host operating system, use the
  `File.separator` constant when specifying paths containing directories. You
  can add a setter function or use a constructor parameter to allow the path to
  be set at runtime.

- `get isAsync():Boolean` — Informs the AIR runtime whether the data provider
  object provides it's data asynchronously or synchronously.

- `close():void` — Called by the runtime when the data is fully read (or an
  error prevents further reading). You can use this function to cleanup
  resources.

- `reportError( e:ErrorEvent ):void` — Called by the runtime when an error
  reading the data occurs.

All of the IFilePromise methods are called by the runtime during a drag-and-drop
operation involving the file promise. Typically, your application logic should
not call any of these methods directly.

## Using a synchronous data provider in a file promise

The simplest way to implement the IFilePromise interface is to use a synchronous
data provider object, such as a ByteArray or a synchronous FileStream. In the
following example, a ByteArray object is created, filled with data, and returned
when the `open()` method is called.

    package
    {
    	import flash.desktop.IFilePromise;
    	import flash.events.ErrorEvent;
    	import flash.utils.ByteArray;
    	import flash.utils.IDataInput;

    	public class SynchronousFilePromise implements IFilePromise
    	{
    		private const fileSize:int = 5000; //size of file data
    		private var filePath:String = "SynchronousFile.txt";

    		public function get relativePath():String
    		{
    			return filePath;
    		}

    		public function get isAsync():Boolean
    		{
    			return false;
    		}

    		public function open():IDataInput
    		{
    			var fileContents:ByteArray = new ByteArray();

    			//Create some arbitrary data for the file
    			for( var i:int = 0; i < fileSize; i++ )
    			{
    				fileContents.writeUTFBytes( 'S' );
    			}

    			//Important: the ByteArray is read from the current position
    			fileContents.position = 0;
    			return fileContents;
    		}

    		public function close():void
    		{
    			//Nothing needs to be closed in this case.
    		}

    		public function reportError(e:ErrorEvent):void
    		{
    			trace("Something went wrong: " + e.errorID + " - " + e.type + ", " + e.text );
    		}
    	}
    }

In practice, synchronous file promises have limited utility. If the amount of
data is small, you could just as easily create a file in a temporary directory
and add a normal file list array to the drag-and-drop clipboard. On the other
hand, if the amount of data is large or generating the data is computationally
expensive, a long synchronous process is necessary. Long synchronous processes
can block UI updates for a noticeable amount of time and make your application
seem unresponsive. To avoid this problem, you can create an asynchronous data
provider driven by a timer.

## Using an asynchronous data provider in a file promise

When you use an asynchronous data provider object, the IFilePromise `isAsync`
property must be `true` and the object returned by the `open()` method must
implement the IEventDispatcher interface. The runtime listens for several
alternative events so that different built-in objects can be used as a data
provider. For example, `progress` events are dispatched by FileStream and
URLStream objects, whereas `socketData` events are dispatched by Socket objects.
The runtime listens for the appropriate events from all of these objects.

The following events drive the process of reading the data from the data
provider object:

- Event.OPEN — Informs the runtime that the data source is ready.

- ProgressEvent.PROGRESS — Informs the runtime that data is available. The
  runtime will read the amount of available data from the data provider object.

- ProgressEvent.SOCKET_DATA — Informs the runtime that data is available. The
  `socketData` event is dispatched by socket-based objects. For other object
  types, you should dispatch a `progress` event. (The runtime listens for both
  events to detect when data can be read.)

- Event.COMPLETE — Informs the runtime that the data has all been read.

- Event.CLOSE — Informs the runtime that the data has all been read. (The
  runtime listens for both `close` and `complete` for this purpose.)

- IOErrorEvent.IOERROR — Informs the runtime that an error reading the data has
  occurred. The runtime aborts file creation and calls the IFilePromise
  `close()` method.

- SecurityErrorEvent.SECURITY_ERROR — Informs the runtime that a security error
  has occurred. The runtime aborts file creation and calls the IFilePromise
  `close()` method.

- HTTPStatusEvent.HTTP_STATUS — Used, along with `httpResponseStatus`, by the
  runtime to make sure that the data available represents the desired content,
  rather than an error message (such as a 404 page). Objects based on the HTTP
  protocol should dispatch this event.

- HTTPStatusEvent.HTTP_RESPONSE_STATUS — Used, along with `httpStatus`, by the
  runtime to make sure that the data available represents the desired content.
  Objects based on the HTTP protocol should dispatch this event.

The data provider should dispatch these events in the following sequence:

1.  `open` event

2.  `progress` or `socketData` events

3.  `complete` or `close` event

Note: The built-in objects, FileStream, Socket, and URLStream, dispatch the
appropriate events automatically.

The following example creates a file promise using a custom, asynchronous data
provider. The data provider class extends ByteArray (for the IDataInput support)
and implements the IEventDispatcher interface. At each timer event, the object
generates a chunk of data and dispatches a progress event to inform the runtime
that the data is available. When enough data has been produced, the object
dispatches a complete event.

    package
    {
    	import flash.events.Event;
    	import flash.events.EventDispatcher;
    	import flash.events.IEventDispatcher;
    	import flash.events.ProgressEvent;
    	import flash.events.TimerEvent;
    	import flash.utils.ByteArray;
    	import flash.utils.Timer;

    	[Event(name="open", type="flash.events.Event.OPEN")]
    	[Event(name="complete",  type="flash.events.Event.COMPLETE")]
    	[Event(name="progress", type="flash.events.ProgressEvent")]
    	[Event(name="ioError", type="flash.events.IOErrorEvent")]
    	[Event(name="securityError", type="flash.events.SecurityErrorEvent")]
    	public class AsyncDataProvider extends ByteArray implements IEventDispatcher
    	{
    		private var dispatcher:EventDispatcher = new EventDispatcher();
    		public var fileSize:int = 0; //The number of characters in the file
    		private const chunkSize:int = 1000; //Amount of data written per event
    		private var dispatchDataTimer:Timer = new Timer( 100 );
    		private var opened:Boolean = false;

    		public function AsyncDataProvider()
    		{
    			super();
    			dispatchDataTimer.addEventListener( TimerEvent.TIMER, generateData );
    		}

    		public function begin():void{
    			dispatchDataTimer.start();
    		}

    		public function end():void
    		{
    			dispatchDataTimer.stop();
    		}
    		private function generateData( event:Event ):void
    		{
    			if( !opened )
    			{
    				var open:Event = new Event( Event.OPEN );
    				dispatchEvent( open );
    				opened = true;
    			}
    			else if( position + chunkSize < fileSize )
    			{
    				for( var i:int = 0; i <= chunkSize; i++ )
    				{
    					writeUTFBytes( 'A' );
    				}
    				//Set position back to the start of the new data
    				this.position -= chunkSize;
    				var progress:ProgressEvent =
    					new ProgressEvent( ProgressEvent.PROGRESS, false, false, bytesAvailable, bytesAvailable + chunkSize);
    				dispatchEvent( progress )
    			}
    			else
    			{
    				var complete:Event = new Event( Event.COMPLETE );
    				dispatchEvent( complete );
    			}
    		}
    		//IEventDispatcher implementation
    		public function addEventListener(type:String, listener:Function, useCapture:Boolean=false, priority:int=0, useWeakReference:Boolean=false):void
    		{
    			dispatcher.addEventListener( type, listener, useCapture, priority, useWeakReference );
    		}

    		public function removeEventListener(type:String, listener:Function, useCapture:Boolean=false):void
    		{
    			dispatcher.removeEventListener( type, listener, useCapture );
    		}

    		public function dispatchEvent(event:Event):Boolean
    		{
    			return dispatcher.dispatchEvent( event );
    		}

    		public function hasEventListener(type:String):Boolean
    		{
    			return dispatcher.hasEventListener( type );
    		}

    		public function willTrigger(type:String):Boolean
    		{
    			return dispatcher.willTrigger( type );
    		}
    	}
    }

Note: Because the AsyncDataProvider class in the example extends ByteArray, it
cannot also extend EventDispatcher. To implement the IEventDispatcher interface,
the class uses an internal EventDispatcher object and forwards the
IEventDispatcher method calls to that internal object. You could also extend
EventDispatcher and implement IDataInput (or implement both interfaces).

The asynchronous IFilePromise implementation is almost identical to the
synchronous implementation. The main differences are that `isAsync` returns
`true` and that the `open()` method returns an asynchronous data object:

    package
    {
    	import flash.desktop.IFilePromise;
    	import flash.events.ErrorEvent;
    	import flash.events.EventDispatcher;
    	import flash.utils.IDataInput;

    	public class AsynchronousFilePromise extends EventDispatcher implements IFilePromise
    	{
    		private var fileGenerator:AsyncDataProvider;
    		private const fileSize:int = 5000; //size of file data
    		private var filePath:String = "AsynchronousFile.txt";

    		public function get relativePath():String
    		{
    			return filePath;
    		}

    		public function get isAsync():Boolean
    		{
    			return true;
    		}

    		public function open():IDataInput
    		{
    			fileGenerator = new AsyncDataProvider();
    			fileGenerator.fileSize = fileSize;
    			fileGenerator.begin();
    			return fileGenerator;
    		}

    		public function close():void
    		{
    			fileGenerator.end();
    		}

    		public function reportError(e:ErrorEvent):void
    		{
    			trace("Something went wrong: " + e.errorID + " - " + e.type + ", " + e.text );
    		}
    	}
    }
