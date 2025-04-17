---
sidebar_position: 2
---

# Understanding the asynchronous execution model

One common concern about using asynchronous execution mode is the assumption
that you can't start executing a
[SQLStatement](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLStatement.html)
instance if another SQLStatement is currently executing against the same
database connection. In fact, this assumption isn't correct. While a
SQLStatement instance is executing you can't change the `text` property of the
statement. However, if you use a separate SQLStatement instance for each
different SQL statement that you want to execute, you can call the `execute()`
method of a SQLStatement while another SQLStatement instance is still executing,
without causing an error.

Internally, when you're executing database operations using asynchronous
execution mode, each database connection (each
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance) has its own queue or list of operations that it is instructed to
perform. The runtime executes each operation in sequence, in the order they are
added to the queue. When you create a SQLStatement instance and call its
`execute()` method, that statement execution operation is added to the queue for
the connection. If no operation is currently executing on that SQLConnection
instance, the statement begins executing in the background. Suppose that within
the same block of code you create another SQLStatement instance and also call
that method's `execute()` method. That second statement execution operation is
added to the queue behind the first statement. As soon as the first statement
finishes executing, the runtime moves to the next operation in the queue. The
processing of subsequent operations in the queue happens in the background, even
while the `result` event for the first operation is being dispatched in the main
application code. The following code demonstrates this technique:

```
// Using asynchronous execution mode
var stmt1:SQLStatement = new SQLStatement();
stmt1.sqlConnection = conn;

// ... Set statement text and parameters, and register event listeners ...

stmt1.execute();

// At this point stmt1's execute() operation is added to conn's execution queue.

var stmt2:SQLStatement = new SQLStatement();
stmt2.sqlConnection = conn;

// ... Set statement text and parameters, and register event listeners ...

stmt2.execute();

// At this point stmt2's execute() operation is added to conn's execution queue.
// When stmt1 finishes executing, stmt2 will immediately begin executing
// in the background.
```

There is an important side effect of the database automatically executing
subsequent queued statements. If a statement depends on the outcome of another
operation, you can't add the statement to the queue (in other words, you can't
call its `execute()` method) until the first operation completes. This is
because once you've called the second statement's `execute()` method, you can't
change the statement's `text` or `parameters` properties. In that case you must
wait for the event indicating that the first operation completes before starting
the next operation. For example, if you want to execute a statement in the
context of a transaction, the statement execution depends on the operation of
opening the transaction. After calling the `SQLConnection.begin()` method to
open the transaction, you need to wait for the SQLConnection instance to
dispatch its `begin` event. Only then can you call the SQLStatement instance's
`execute()` method. In this example the simplest way to organize the application
to ensure that the operations are executed properly is to create a method that's
registered as a listener for the `begin` event. The code to call the
`SQLStatement.execute()` method is placed within that listener method.
