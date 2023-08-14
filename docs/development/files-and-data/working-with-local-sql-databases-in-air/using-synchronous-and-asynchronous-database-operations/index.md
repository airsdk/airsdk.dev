---
sidebar_position: 4
---

# Using synchronous and asynchronous database operations

Previous sections have described common database operations such as retrieving,
inserting, updating, and deleting data, as well as creating a database file and
tables and other objects within a database. The examples have demonstrated how
to perform these operations both asynchronously and synchronously.

As a reminder, in asynchronous execution mode, you instruct the database engine
to perform an operation. The database engine then works in the background while
the application keeps running. When the operation finishes the database engine
dispatches an event to alert you to that fact. The key benefit of asynchronous
execution is that the runtime performs the database operations in the background
while the main application code continues executing. This is especially valuable
when the operation takes a notable amount of time to run.

On the other hand, in synchronous execution mode operations don't run in the
background. You tell the database engine to perform an operation. The code
pauses at that point while the database engine does its work. When the operation
completes, execution continues with the next line of your code.

A single database connection can't execute some operations or statements
synchronously and others asynchronously. You specify whether a
[SQLConnection](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLConnection.html)
operates in synchronous or asynchronous when you open the connection to the
database. If you call `SQLConnection.open()` the connection operates in
synchronous execution mode, and if you call `SQLConnection.openAsync()` the
connection operates in asynchronous execution mode. Once a SQLConnection
instance is connected to a database using `open()` or `openAsync()`, it is fixed
to synchronous or asynchronous execution.

More Help topics

[Using synchronous database operations](./using-synchronous-database-operations.md)

[Understanding the asynchronous execution model](./understanding-the-asynchronous-execution-model.md)
