---
sidebar_position: 1
---

# About local SQL databases

For a quick explanation and code examples of using SQL databases, see the
following quick start articles on the Adobe Developer Connection:

- [Working asynchronously with a local SQL database](https://web.archive.org/web/20111126102614/http://www.adobe.com/devnet/air/flex/quickstart/articles/simple_sql_database.html)
  (Flex)

- [Working synchronously with a local SQL database](https://web.archive.org/web/20111126104857/http://www.adobe.com/devnet/air/flex/quickstart/articles/sync_simple_sql_database.html)
  (Flex)

- [Using an encrypted database](https://web.archive.org/web/20111126104912/http://www.adobe.com/devnet/air/flex/quickstart/articles/encrypted_database.html)
  (Flex)

- [Working asynchronously with a local SQL database](https://web.archive.org/web/20111126104852/http://www.adobe.com/devnet/air/flash/quickstart/articles/simple_sql_database.html)
  (Flash)

- [Working synchronously with a local SQL database](https://web.archive.org/web/20111126104902/http://www.adobe.com/devnet/air/flash/quickstart/articles/sync_simple_sql_database.html)
  (Flash)

- [Using an encrypted database](https://web.archive.org/web/20111126104907/http://www.adobe.com/devnet/air/flash/quickstart/articles/encrypted_database_flash.html)
  (Flash)

Adobe AIR includes a SQL-based relational database engine that runs within the
runtime, with data stored locally in database files on the computer on which the
AIR application runs (for example, on the computer's hard drive). Because the
database runs and data files are stored locally, a database can be used by an
AIR application regardless of whether a network connection is available. Thus,
the runtime's local SQL database engine provides a convenient mechanism for
storing persistent, local application data, particularly if you have experience
with SQL and relational databases.

## Uses for local SQL databases

The AIR local SQL database functionality can be used for any purpose for which
you might want to store application data on a user's local computer. Adobe AIR
includes several mechanisms for storing data locally, each of which has
different advantages. The following are some possible uses for a local SQL
database in your AIR application:

- For a data-oriented application (for example an address book), a database can
  be used to store the main application data.

- For a document-oriented application, where users create documents to save and
  possibly share, each document could be saved as a database file, in a
  user-designated location. (Note, however, that unless the database is
  encrypted any AIR application would be able to open the database file.
  Encryption is recommended for potentially sensitive documents.)

- For a network-aware application, a database can be used to store a local cache
  of application data, or to store data temporarily when a network connection
  isn't available. You could create a mechanism for synchronizing the local
  database with the network data store.

- For any application, a database can be used to store individual users'
  application settings, such as user options or application information like
  window size and position.

## About AIR databases and database files

An individual Adobe AIR local SQL database is stored as a single file in the
computer's file system. The runtime includes the SQL database engine that
manages creation and structuring of database files and manipulation and
retrieval of data from a database file. The runtime does not specify how or
where database data is stored on the file system; rather, each database is
stored completely within a single file. You specify the location in the file
system where the database file is stored. A single AIR application can access
one or many separate databases (that is, separate database files). Because the
runtime stores each database as a single file on the file system, you can locate
your database as needed by the design of your application and file access
constraints of the operating system. Each user can have a separate database file
for their specific data, or a database file can be accessed by all application
users on a single computer for shared data. Because the data is local to a
single computer, data is not automatically shared among users on different
computers. The local SQL database engine doesn't provide any capability to
execute SQL statements against a remote or server-based database.

## About relational databases

A relational database is a mechanism for storing (and retrieving) data on a
computer. Data is organized into tables: rows represent records or items, and
columns (sometimes called "fields") divide each record into individual values.
For example, an address book application could contain a "friends" table. Each
row in the table would represent a single friend stored in the database. The
table's columns would represent data such as first name, last name, birth date,
and so forth. For each friend row in the table, the database stores a separate
value for each column.

Relational databases are designed to store complex data, where one item is
associated with or related to items of another type. In a relational database,
any data that has a one-to-many relationship—where a single record can be
related to multiple records of a different type—should be divided among
different tables. For example, suppose you want your address book application to
store multiple phone numbers for each friend; this is a one-to-many
relationship. The "friends" table would contain all the personal information for
each friend. A separate "phone numbers" table would contain all the phone
numbers for all the friends.

In addition to storing the data about friends and phone numbers, each table
would need a piece of data to keep track of the relationship between the two
tables—to match individual friend records with their phone numbers. This data is
known as a primary key—a unique identifier that distinguishes each row in a
table from other rows in that table. The primary key can be a "natural key,"
meaning it's one of the items of data that naturally distinguishes each record
in a table. In the "friends" table, if you knew that none of your friends share
a birth date, you could use the birth date column as the primary key (a natural
key) of the "friends" table. If there isn't a natural key, you would create a
separate primary key column such as a "friend id" —an artificial value that the
application uses to distinguish between rows.

Using a primary key, you can set up relationships between multiple tables. For
example, suppose the "friends" table has a column "friend id" that contains a
unique number for each row (each friend). The related "phone numbers" table can
be structured with two columns: one with the "friend id" of the friend to whom
the phone number belongs, and one with the actual phone number. That way, no
matter how many phone numbers a single friend has, they can all be stored in the
"phone numbers" table and can be linked to the related friend using the "friend
id" primary key. When a primary key from one table is used in a related table to
specify the connection between the records, the value in the related table is
known as a foreign key. Unlike many databases, the AIR local database engine
does not allow you to create foreign key constraints, which are constraints that
automatically check that an inserted or updated foreign key value has a
corresponding row in the primary key table. Nevertheless, foreign key
relationships are an important part of the structure of a relational database,
and foreign keys should be used when creating relationships between tables in
your database.

## About SQL

Structured Query Language (SQL) is used with relational databases to manipulate
and retrieve data. SQL is a descriptive language rather than a procedural
language. Instead of giving the computer instructions on how it should retrieve
data, a SQL statement describes the set of data you want. The database engine
determines how to retrieve that data.

The SQL language has been standardized by the American National Standards
Institute (ANSI). The Adobe AIR local SQL database supports most of the SQL-92
standard.

For specific descriptions of the SQL language supported in Adobe AIR, see
[SQL support in local databases](../../appendixes/sql-support-in-local-databases/index.md).

## About SQL database classes

To work with local SQL databases in ActionScript 3.0, you use instances of these
classes in the flash.data package:

| Class                                                                                                                         | Description                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [flash.data.SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html) | Provides the means to create and open databases (database files), as well as methods for performing database-level operations and for controlling database transactions.                                          |
| [flash.data.SQLStatement](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLStatement.html)   | Represents a single SQL statement (a single query or command) that is executed on a database, including defining the statement text and setting parameter values.                                                 |
| [flash.data.SQLResult](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLResult.html)         | Provides a way to get information about or results from executing a statement, such as the result rows from a `SELECT` statement, the number of rows affected by an `UPDATE` or `DELETE` statement, and so forth. |

To obtain schema information describing the structure of a database, you use
these classes in the flash.data package:

| Class                                                                                                                               | Description                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [flash.data.SQLSchemaResult](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLSchemaResult.html)   | Serves as a container for database schema results generated by calling the `SQLConnection.loadSchema()` method. |
| [flash.data.SQLTableSchema](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLTableSchema.html)     | Provides information describing a single table in a database.                                                   |
| [flash.data.SQLViewSchema](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLViewSchema.html)       | Provides information describing a single view in a database.                                                    |
| [flash.data.SQLIndexSchema](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLIndexSchema.html)     | Provides information describing a single column of a table or view in a database.                               |
| [flash.data.SQLTriggerSchema](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLTriggerSchema.html) | Provides information describing a single trigger in a database.                                                 |

Other classes in the flash.data package provide constants that are used with the
SQLConnection class and the SQLColumnSchema class:

| Class                                                                                                                                           | Description                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [flash.data.SQLMode](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLMode.html)                               | Defines a set of constants representing the possible values for the `openMode` parameter of the `SQLConnection.open()` and `SQLConnection.openAsync()` methods.                                      |
| [flash.data.SQLColumnNameStyle](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLColumnNameStyle.html)         | Defines a set of constants representing the possible values for the `SQLConnection.columnNameStyle` property.                                                                                        |
| [flash.data.SQLTransactionLockType](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLTransactionLockType.html) | Defines a set of constants representing the possible values for the option parameter of the `SQLConnection.begin()` method.                                                                          |
| [flash.data.SQLCollationType](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLCollationType.html)             | Defines a set of constants representing the possible values for the `SQLColumnSchema.defaultCollationType` property and the `defaultCollationType` parameter of the `SQLColumnSchema()` constructor. |

In addition, the following classes in the flash.events package represent the
events (and supporting constants) that you use:

| Class                                                                                                                               | Description                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [flash.events.SQLEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/SQLEvent.html)             | Defines the events that a SQLConnection or SQLStatement instance dispatches when any of its operations execute successfully. Each operation has an associated event type constant defined in the SQLEvent class. |
| [flash.events.SQLErrorEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/SQLErrorEvent.html)   | Defines the event that a SQLConnection or SQLStatement instance dispatches when any of its operations results in an error.                                                                                       |
| [flash.events.SQLUpdateEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/SQLUpdateEvent.html) | Defines the event that a SQLConnection instances dispatches when table data in one of its connected databases changes as a result of an `INSERT`, `UPDATE`, or `DELETE` SQL statement being executed.            |

Finally, the following classes in the flash.errors package provide information
about database operation errors:

| Class                                                                                                                                     | Description                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [flash.errors.SQLError](https://airsdk.dev/reference/actionscript/3.0/flash/errors/SQLError.html)                   | Provides information about a database operation error, including the operation that was being attempted and the cause of the failure.                                        |
| [flash.errors.SQLErrorOperation](https://airsdk.dev/reference/actionscript/3.0/flash/errors/SQLErrorOperation.html) | Defines a set of constants representing the possible values for the SQLError class's `operation` property, which indicates the database operation that resulted in an error. |

## About synchronous and asynchronous execution modes

When you're writing code to work with a local SQL database, you specify that
database operations execution in one of two execution modes: asynchronous or
synchronous execution mode. In general, the code examples show how to perform
each operation in both ways, so that you can use the example that's most
appropriate for your needs.

In asynchronous execution mode, you give the runtime an instruction and the
runtime dispatches an event when your requested operation completes or fails.
First you tell the database engine to perform an operation. The database engine
does its work in the background while the application continues running.
Finally, when the operation is completed (or when it fails) the database engine
dispatches an event. Your code, triggered by the event, carries out subsequent
operations. This approach has a significant benefit: the runtime performs the
database operations in the background while the main application code continues
executing. If the database operation takes a notable amount of time, the
application continues to run. Most importantly, the user can continue to
interact with it without the screen freezing. Nevertheless, asynchronous
operation code can be more complex to write than other code. This complexity is
usually in cases where multiple dependent operations must be divided up among
various event listener methods.

Conceptually, it is simpler to code operations as a single sequence of steps—a
set of synchronous operations—rather than a set of operations split into several
event listener methods. In addition to asynchronous database operations, Adobe
AIR also allows you to execute database operations synchronously. In synchronous
execution mode, operations don't run in the background. Instead they run in the
same execution sequence as all other application code. You tell the database
engine to perform an operation. The code then pauses at that point while the
database engine does its work. When the operation completes, execution continues
with the next line of your code.

Whether operations execute asynchronously or synchronously is set at the
SQLConnection level. Using a single database connection, you can't execute some
operations or statements synchronously and others asynchronously. You specify
whether a SQLConnection operates in synchronous or asynchronous execution mode
by calling a SQLConnection method to open the database. If you call
`SQLConnection.open()` the connection operates in synchronous execution mode,
and if you call `SQLConnection.openAsync()` the connection operates in
asynchronous execution mode. Once a SQLConnection instance is connected to a
database using `open()` or `openAsync()`, it is fixed to synchronous or
asynchronous execution mode unless you close and reopen the connection to the
database.

Each execution mode has benefits. While most aspects of each mode are similar,
there are some differences you'll want to keep in mind when working in each
mode. For more information on these topics, and suggestions for working in each
mode, see
[Using synchronous and asynchronous database operations](./using-synchronous-and-asynchronous-database-operations/index.md).

More Help topics

[Christophe Coenraets: Employee Directory on AIR for Android](https://web.archive.org/web/20130904212327/http://coenraets.org/blog/air-for-android-samples/employee-directory-for-android)

[Raymond Camden: jQuery and AIR - Moving from web page to application](https://web.archive.org/web/20101213041415/http://insideria.com/2009/09/jquery-and-air---moving-from-w-1.html)
