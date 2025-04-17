---
sidebar_position: 3
---

# Communicating between workers

Although workers run their code in separate execution threads, they wouldn't
offer any benefit if they were completely isolated from each other.
Communication between workers ultimately means passing data between workers.
There are three main mechanisms for getting data from one worker to another.

When deciding which of these data-sharing techniques is appropriate for a
particular data-passing need, consider the two main ways they differ. One
difference between them is with whether there is an event to notify the receiver
that new data is available or whether the receiving worker must check for
updates. Another difference between these data-sharing techniques has to do with
how the data is actually passed. In some cases the receiving worker gets is a
copy of the shared data, which means that more objects are created taking more
memory and cpu cycles. In other cases the workers access objects that reference
the same underlying system memory, which means fewer objects are created and
less memory is used overall. These differences are outlined here:

| Communication technique  | Dispatches event when receiving data | Shares memory between workers         |
| ------------------------ | ------------------------------------ | ------------------------------------- |
| Worker shared properties | No                                   | No, objects are copies not references |
| MessageChannel           | Yes                                  | No, objects are copies not references |
| Shareable ByteArray      | No                                   | Yes, memory is shared                 |

## Passing data with a shared property

The most basic way to share data between workers is to use a shared property.
Each worker maintains an internal dictionary of shared property values. The
properties are stored with String key names to distinguish between the
properties. To store an object on a worker as a shared property, call the Worker
object's `setSharedProperty()` method with two arguments, the key name and the
value to store:

```
// code running in the parent worker
bgWorker.setSharedProperty("sharedPropertyName", someObject);
```

Once the shared property has been set, the value can be read by calling the
Worker object's `getSharedProperty()` method, passing in the key name:

```
// code running in the background worker
receivedProperty = Worker.current.getSharedProperty("sharedPropertyName");
```

There is no restriction on which worker reads or sets the property value. For
example, code in a background worker can call its `setSharedProperty()` method
to store a value. Code running in the parent worker can then use
`getSharedProperty()` to receive the data.

The value that's passed to the `setSharedProperty()` method can be almost any
type of object. When you call the `getSharedProperty()` method, the object
that's returned is a copy of the object passed in to `setSharedProperty()` and
not a reference to the same object, except in a few special cases. The specifics
of how data is shared are explained in
[Shared references and copied values](#shared-references-and-copied-values).

The biggest advantage of using a shared property to pass data between workers is
that it's available even before the worker is running. You can call a background
Worker object's `setSharedProperty()` method to set a shared property even
before the worker is running. When the parent worker calls the Worker's
`start()` method, the runtime calls the child worker's main class's constructor.
Any shared properties that were set before `start()` was called are available
for code in the child worker to read.

## Passing data with a MessageChannel

A message channel provides a one-way data-passing link between two workers.
Using a MessageChannel object to pass data between workers has one key
advantage. When you send a message (an object) using a message channel, the
MessageChannel object dispatches a `channelMessage` event. Code in the receiving
worker can listen for that event to know when data is available. That way the
receiving worker doesn't need to continuously check for data updates.

A message channel is associated with only two workers, a sender and a receiver.
To create a MessageChannel object, call the sending Worker object's
`createMessageChannel()` method, passing the receiving worker as an argument:

```
// In the sending worker swf
var sendChannel:MessageChannel;
sendChannel = Worker.current.createMessageChannel(receivingWorker);
```

Both workers need to have access to the MessageChannel object. The simplest way
to do this is to pass the MessageChannel object using the `setSharedProperty()`
method:

```
receivingWorker.setSharedProperty("incomingChannel", sendChannel);
```

In the receiving worker, register a listener for the MessageChannel object's
`channelMessage` event. This event is dispatched when the sending worker sends
data through the message channel.

```
// In the receiving worker swf
var incomingChannel:MessageChannel;
incomingChannel = Worker.current.getSharedProperty("incomingChannel");
incomingChannel.addEventListener(Event.CHANNEL_MESSAGE, handleIncomingMessage);
```

To actually send data, in the sending worker call the MessageChannel object's
`send()` method:

```
// In the sending worker swf
sendChannel.send("This is a message");
```

In the receiving worker, the MessageChannel calls the `channelMessage` event
handler. The receiving worker can then get the data by calling the
MessageChannel object's `receive()` method.

```
private function handleIncomingMessage(event:Event):void
{
	  var message:String = incomingChannel.receive() as String;
}
```

The object returned by the receive method has the same data type as the object
that was passed in to the `send()` method. The received object is a copy of the
object passed in by the sender and not a reference to the object in the sending
worker, unless it is one of a few data types, as described in
[Shared references and copied values](#shared-references-and-copied-values).

## Sharing data using a shareable ByteArray

When an object is passed between two workers, the receiving worker gets a new
object that's a copy of the original one. The two objects are stored in
different locations in the system's memory. Consequently, each copy of the
object that's received increases the total memory used by the runtime. In
addition, any changes that you make to an object in one worker do not affect the
copy in the other worker. For more details about how data is copied, see
[Shared references and copied values](#shared-references-and-copied-values).

By default, a ByteArray object uses the same behavior. If you pass a ByteArray
instance to a Worker object's `setSharedProperty()` method or a MessageChannel
object's `send()` method, the runtime creates a new ByteArray in the computer's
memory and the receiving worker gets a ByteArray instance that's a reference to
that new ByteArray. However, you can change this behavior for a ByteArray object
by setting its `shareable` property to `true`.

When a shareable ByteArray object is passed from one worker to another, the
ByteArray instance in the receiving worker is a reference to the same underlying
operating system memory that's used by the ByteArray instance in the sending
worker. When code in one worker changes the contents of the byte array, those
changes are immediately available in other workers that have access to that
shared byte array.

Because workers execute their code simultaneously, it's possible for two workers
to attempt to access the same bytes in a byte array at the same time. This could
lead to data loss or corruption. There are several apis that you can use to
manage access to shared resources and avoid those issues.

The ByteArray class has methods that allow you to validate and change the byte
array's contents in a single operation:

- [atomicCompareAndSwapIntAt() method](<https://airsdk.dev/reference/actionscript/3.0/flash/utils/ByteArray.html#atomicCompareAndSwapIntAt()>)

- [atomicCompareAndSwapLength() method](<https://airsdk.dev/reference/actionscript/3.0/flash/utils/ByteArray.html#atomicCompareAndSwapLength()>)

In addition, the flash.concurrent package includes classes that provide access
control for working with shared resources:

- [Mutex class](https://airsdk.dev/reference/actionscript/3.0/flash/concurrent/Mutex.html)

- [Condition class](https://airsdk.dev/reference/actionscript/3.0/flash/concurrent/Condition.html)

## Shared references and copied values

In the normal case, when you call `Worker.setSharedProperty()` or
`MessageChannel.send()`, the object that's passed to the receiving worker is
passed by serializing it in AMF format. This has a few consequences:

- The object that's created in the receiving worker when it's
  `getSharedProperty()` method is called is deserialized from the AMF bytes. It
  is a copy of the original object, not a reference to the object. Any changes
  that are made to the object in either worker are not changed in the copy in
  the other worker.

- Objects that can't be serialized in AMF format such as display objects can't
  be passed to a worker using `Worker.setSharedProperty()` or
  `MessageChannel.send()`.

- In order for a custom class to be deserialized properly, the class definition
  must be registered using the `flash.net.registerClassAlias()` function or
  `[RemoteClass]` metadata. The same alias must be used for both worker's
  versions of the class.

There are five special cases of objects that are truly shared rather than copied
between workers:

- Worker objects

- MessageChannel objects

- shareable byte array (a ByteArray object whose `shareable` property is `true`)

- Mutex objects

- Condition objects

When you pass an instance of one of these objects using the
`Worker.setSharedProperty()` method or `MessageChannel.send()` method, each
worker has a reference to the same underlying object. Changes made to an
instance in one worker are immediately available in other workers. In addition,
if you pass the same instance of one of these objects to a worker more than
once, the runtime doesn't create a new copy of the object in the receiving
worker. Instead, the same reference is re-used.

## Additional data-sharing techniques

In addition to the worker-specific mechanisms for passing data, workers can also
exchange data using any of the existing apis that support sharing data between
two swf applications, such as the following:

- local shared objects

- writing data to a file in one worker and reading from the file in another
  worker

- storing data to and reading data from a SQLite database

When you share a resource between two or more workers, you generally need to
avoid having multiple workers accessing the resource at the same time. For
example, having multiple workers access a file on the local file system could
cause data loss or corruption and may not be supported by the operating system.

To guard against concurrent access problems, use the Mutex and Condition classes
in the flash.concurrent package to provide access control for working with
shared resources.

Unlike other data-sharing mechanisms, the SQLite database engine is designed for
concurrent access and has its own transaction support built in. Multiple workers
can access a SQLite database without risk of corrupting the data. Because the
workers use different SQLConnection instances, each worker accesses the database
in a separate transaction. Simultaneous data manipulation operations do not
affect the integrity of the data.

#### See also

[Working with local SQL databases in AIR](../../files-and-data/working-with-local-sql-databases-in-air/index.md)

[flash.concurrent package](https://airsdk.dev/reference/actionscript/3.0/flash/concurrent/package-detail.html)
