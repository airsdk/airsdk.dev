---
sidebar_position: 2
---

# Creating and managing workers

The first step in using a worker for concurrency is to create a background
worker. You use two types of objects to create a worker. First is a Worker
instance, which is what you create. The other is a WorkerDomain object, which
creates the Worker and manages the running Worker objects in an application.

When the runtime loads, it automatically creates the WorkerDomain object. The
runtime also automatically creates a worker for the main swf of the application.
This first worker is known as the <span class="dfn"> primordial worker </span>.

Because there is only one WorkerDomain object for an application, you access the
WorkerDomain instance using the static `WorkerDomain.current` property.

At any time, you can access the current Worker instance (the worker in which the
current code is running) using the static `Worker.current` property.

## Creating a Worker object from a swf

Just as the main swf runs within the primordial worker, a background worker
executes the code of a single swf file. To use a background worker, you must
author and compile the worker's code as a swf file. To create the background
worker, the parent worker needs access to that swf file's bytes as a ByteArray
object. You pass that ByteArray to the WorkerDomain object's `createWorker()`
method to actually create the worker.

There are three main ways to get the background worker swf as a ByteArray
object:

### Embedding the worker swf

Use the \[Embed\] metatag to embed the worker swf into the main swf as a
ByteArray:

```
[Embed(source="../swfs/BgWorker.swf", mimeType="application/octet-stream")]
private static var BgWorker_ByteClass:Class;
private function createWorker():void
{
	var workerBytes:ByteArray = new BgWorker_ByteClass();
	var bgWorker:Worker = WorkerDomain.current.createWorker(workerBytes);

	// ... set up worker communication and start the worker
}
```

The worker swf is compiled into the main swf as a ByteArray subclass named
BgWorker_ByteClass. Creating an instance of that class gives you a ByteArray
pre-populated with the worker swf's bytes.

### Loading an external worker swf

Use a URLLoader object to load an external swf file. The swf file must come from
the same security domain, such as a swf file loaded from the same internet
domain as the main swf or included in an AIR application package.

```
var workerLoader:URLLoader = new URLLoader();
workerLoader.dataFormat = URLLoaderDataFormat.BINARY;
workerLoader.addEventListener(Event.COMPLETE, loadComplete);
workerLoader.load(new URLRequest("BgWorker.swf"));

private function loadComplete(event:Event):void
{
	// create the background worker
	var workerBytes:ByteArray = event.target.data as ByteArray;
	var bgWorker:Worker = WorkerDomain.current.createWorker(workerBytes);

	// ... set up worker communication and start the worker
}
```

When the URLLoader finishes loading the swf file, the swf's bytes are available
in the URLLoader object's `data` property ( `event.target.data` in the example).

### Using the main swf as the worker swf

You can use a single swf as both the main swf and the worker swf. Use the main
display class's `loaderInfo.bytes` property to access the swf's bytes.

```
// The primordial worker's main class constructor
public function PrimordialWorkerClass()
{
	init();
}

private function init():void
{
	var swfBytes:ByteArray = this.loaderInfo.bytes;

	// Check to see if this is the primordial worker or the background worker
	if (Worker.current.isPrimordial)
	{
		// create a background worker
		var bgWorker:Worker = WorkerDomain.current.createWorker(swfBytes);

		// ... set up worker communication and start the worker
	}
	else // entry point for the background worker
	{
		// set up communication between workers using getSharedProperty()
		// ... (not shown)

		// start the background work
	}
}
```

If you use this technique, use an `if` statement to branch the swf file code
within the main class's constructor or a method it calls. To determine whether
the code is running in the main worker or the background worker, check the
current Worker object's `isPrimordial` property, as shown in the example.

## Starting a worker's execution

Once you have created a worker, you start its code executing by calling the
Worker object's `start()` method. The `start()` operation doesn't happen
immediately. To know when the worker is running, register a listener for the
Worker object's `workerState` event. That event is dispatched when the Worker
object switches states in its lifecycle, such as when it starts executing code.
In your `workerState` event handler, check that the Worker object's `state`
property is `WorkerState.RUNNING`. At that point the worker is running and its
main class's constructor has run. The following code listing shows an example of
registering for the `workerState` event and calling the `start()` method:

```
// listen for worker state changes to know when the worker is running
bgWorker.addEventListener(Event.WORKER_STATE, workerStateHandler);
// set up communication between workers using
// setSharedProperty(), createMessageChannel(), etc.
// ... (not shown)
bgWorker.start();
private function workerStateHandler(event:Event):void
{
	if (bgWorker.state == WorkerState.RUNNING)
	{
		// The worker is running.
		// Send it a message or wait for a response.
	}
}
```

## Managing worker execution

At any time you can access the set of running workers in your application using
the WorkerDomain class's `listWorkers()` method. This method returns the set of
workers whose `state` property is `WorkerState.RUNNING`, including the
primordial worker. If a worker hasn't been started or if its execution has
already been stopped, it is not included.

If you no longer need a worker, you can call the Worker object's `terminate()`
method to shut down the worker and release its memory and other system
resources.
