---
sidebar_position: 6
---

# Strategies for working with SQL databases

There are various ways that an application can access and work with a local SQL
database. The application design can vary in terms of how the application code
is organized, the sequence and timing of how operations are performed, and so
on. The techniques you choose can have an impact on how easy it is to develop
your application. They can affect how easy it is to modify the application in
future updates. They can also affect how well the application performs from the
users' perspective.

## Distributing a pre-populated database

When you use an AIR local SQL database in your application, the application
expects a database with a certain structure of tables, columns, and so forth.
Some applications also expect certain data to be pre-populated in the database
file. One way to ensure that the database has the proper structure is to create
the database within the application code. When the application loads it checks
for the existence of its database file in a particular location. If the file
doesn't exist, the application executes a set of commands to create the database
file, create the database structure, and populate the tables with the initial
data.

The code that creates the database and its tables is frequently complex. It is
often only used once in the installed lifetime of the application, but still
adds to the size and complexity of the application. As an alternative to
creating the database, structure, and data programmatically, you can distribute
a pre-populated database with your application. To distribute a predefined
database, include the database file in the application's AIR package.

Like all files that are included in an AIR package, a bundled database file is
installed in the application directory (the directory represented by the
`File.applicationDirectory` property). However, files in that directory are read
only. Use the file from the AIR package as a "template" database. The first time
a user runs the application, copy the original database file into the user's
[Pointing to the application storage directory](../working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#pointing-to-the-application-storage-directory)
(or another location), and use that database within the application.

## Best practices for working with local SQL databases

The following list is a set of suggested techniques you can use to improve the
performance, security, and ease of maintenance of your applications when working
with local SQL databases.

### Pre-create database connections

Even if your application doesn't execute any statements when it first loads,
instantiate a SQLConnection object and call its `open()` or `openAsync()` method
ahead of time (such as after the initial application startup) to avoid delays
when running statements. See
[Connecting to a database](./connecting-to-a-database.md).

### Reuse database connections

If you access a certain database throughout the execution time of your
application, keep a reference to the SQLConnection instance, and reuse it
throughout the application, rather than closing and reopening the connection.
See [Connecting to a database](./connecting-to-a-database.md).

### Favor asynchronous execution mode

When writing data-access code, it can be tempting to execute operations
synchronously rather than asynchronously, because using synchronous operations
frequently requires shorter and less complex code. However, as described in
[Using synchronous and asynchronous database operations](./using-synchronous-and-asynchronous-database-operations/index.md),
synchronous operations can have a performance impact that is obvious to users
and detrimental to their experience with an application. The amount of time a
single operation takes varies according to the operation and particularly the
amount of data it involves. For instance, a SQL `INSERT` statement that only
adds a single row to the database takes less time than a `SELECT` statement that
retrieves thousands of rows of data. However, when you're using synchronous
execution to perform multiple operations, the operations are usually strung
together. Even if the time each single operation takes is very short, the
application is frozen until all the synchronous operations finish. As a result,
the cumulative time of multiple operations strung together may be enough to
stall your application.

Use asynchronous operations as a standard approach, especially with operations
that involve large numbers of rows. There is a technique for dividing up the
processing of large sets of `SELECT` statement results, described in
[Retrieving SELECT results in parts](./retrieving-data-from-a-database.md#retrieving-select-results-in-parts).
However, this technique can only be used in asynchronous execution mode. Only
use synchronous operations when you can't achieve certain functionality using
asynchronous programming, when you've considered the performance trade-off that
your application's users will face, and when you've tested your application so
that you know how your application's performance is affected. Using asynchronous
execution can involve more complex coding. However, remember that you only have
to write the code once, but the application's users have to use it repeatedly,
fast or slow.

In many cases, by using a separate SQLStatement instance for each SQL statement
to be executed, multiple SQL operations can be queued up at one time, which
makes asynchronous code like synchronous code in terms of how the code is
written. For more information, see
[Understanding the asynchronous execution model](./using-synchronous-and-asynchronous-database-operations/understanding-the-asynchronous-execution-model.md).

### Use separate SQL statements and don't change the SQLStatement's text property

For any SQL statement that is executed more than once in an application, create
a separate SQLStatement instance for each SQL statement. Use that SQLStatement
instance each time that SQL command executes. For example, suppose you are
building an application that includes four different SQL operations that are
performed multiple times. In that case, create four separate SQLStatement
instances and call each statement's `execute()` method to run it. Avoid the
alternative of using a single SQLStatement instance for all SQL statements,
redefining its `text` property each time before executing the statement.

### Use statement parameters

Use SQLStatement parameters—never concatenate user input into statement text.
Using parameters makes your application more secure because it prevents the
possibility of SQL injection attacks. It makes it possible to use objects in
queries (rather than only SQL literal values). It also makes statements run more
efficiently because they can be reused without needing to be recompiled each
time they're executed. See
[Using parameters in statements](./using-parameters-in-statements.md) for more
information.
