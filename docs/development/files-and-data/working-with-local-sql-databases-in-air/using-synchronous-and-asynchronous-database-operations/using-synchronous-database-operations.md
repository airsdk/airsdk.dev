---
sidebar_position: 1
---

# Using synchronous database operations

There is little difference in the actual code that you use to execute and
respond to operations when using synchronous execution, compared to the code for
asynchronous execution mode. The key differences between the two approaches fall
into two areas. The first is executing an operation that depends on another
operation (such as `SELECT` result rows or the primary key of the row added by
an `INSERT` statement). The second area of difference is in handling errors.

## Writing code for synchronous operations

The key difference between synchronous and asynchronous execution is that in
synchronous mode you write the code as a single series of steps. In contrast, in
asynchronous code you register event listeners and often divide operations among
listener methods. When a database is
[connected in synchronous execution mode](<https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLConnection.html#open()>),
you can execute a series of database operations in succession within a single
code block. The following example demonstrates this technique:

    var conn:SQLConnection = new SQLConnection();

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    // open the database
    conn.open(dbFile, OpenMode.UPDATE);

    // start a transaction
    conn.begin();

    // add the customer record to the database
    var insertCustomer:SQLStatement = new SQLStatement();
    insertCustomer.sqlConnection = conn;
    insertCustomer.text =
    "INSERT INTO customers (firstName, lastName) " +
    "VALUES ('Bob', 'Jones')";
    insertCustomer.execute();

    var customerId:Number = insertCustomer.getResult().lastInsertRowID;

    // add a related phone number record for the customer
    var insertPhoneNumber:SQLStatement = new SQLStatement();
    insertPhoneNumber.sqlConnection = conn;
    insertPhoneNumber.text =
    "INSERT INTO customerPhoneNumbers (customerId, number) " +
    "VALUES (:customerId, '800-555-1234')";
    insertPhoneNumber.parameters[":customerId"] = customerId;
    insertPhoneNumber.execute();

    // commit the transaction
    conn.commit();

As you can see, you call the same methods to perform database operations whether
you're using synchronous or asynchronous execution. The key differences between
the two approaches are executing an operation that depends on another operation
and handling errors.

## Executing an operation that depends on another operation

When you're using synchronous execution mode, you don't need to write code that
listens for an event to determine when an operation completes. Instead, you can
assume that if an operation in one line of code completes successfully,
execution continues with the next line of code. Consequently, to perform an
operation that depends on the success of another operation, simply write the
dependent code immediately following the operation on which it depends. For
instance, to code an application to begin a transaction, execute an `INSERT`
statement, retrieve the primary key of the inserted row, insert that primary key
into another row of a different table, and finally commit the transaction, the
code can all be written as a series of statements. The following example
demonstrates these operations:

    var conn:SQLConnection = new SQLConnection();

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    // open the database
    conn.open(dbFile, SQLMode.UPDATE);

    // start a transaction
    conn.begin();

    // add the customer record to the database
    var insertCustomer:SQLStatement = new SQLStatement();
    insertCustomer.sqlConnection = conn;
    insertCustomer.text =
    "INSERT INTO customers (firstName, lastName) " +
    "VALUES ('Bob', 'Jones')";
    insertCustomer.execute();

    var customerId:Number = insertCustomer.getResult().lastInsertRowID;

    // add a related phone number record for the customer
    var insertPhoneNumber:SQLStatement = new SQLStatement();
    insertPhoneNumber.sqlConnection = conn;
    insertPhoneNumber.text =
    "INSERT INTO customerPhoneNumbers (customerId, number) " +
    "VALUES (:customerId, '800-555-1234')";
    insertPhoneNumber.parameters[":customerId"] = customerId;
    insertPhoneNumber.execute();

    // commit the transaction
    conn.commit();

## Handling errors with synchronous execution

In synchronous execution mode, you don't listen for an error event to determine
that an operation has failed. Instead, you surround any code that could trigger
errors in a set of `try..catch..finally` code blocks. You wrap the
error-throwing code in the `try` block. Write the actions to perform in response
to each type of error in separate `catch` blocks. Place any code that you want
to always execute regardless of success or failure (for example, closing a
database connection that's no longer needed) in a `finally` block. The following
example demonstrates using `try..catch..finally` blocks for error handling. It
builds on the previous example by adding error handling code:

    var conn:SQLConnection = new SQLConnection();

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    // open the database
    conn.open(dbFile, SQLMode.UPDATE);

    // start a transaction
    conn.begin();

    try
    {
    	// add the customer record to the database
    	var insertCustomer:SQLStatement = new SQLStatement();
    	insertCustomer.sqlConnection = conn;
    	insertCustomer.text =
    		"INSERT INTO customers (firstName, lastName)" +
    		"VALUES ('Bob', 'Jones')";

    	insertCustomer.execute();

    	var customerId:Number = insertCustomer.getResult().lastInsertRowID;

    	// add a related phone number record for the customer
    	var insertPhoneNumber:SQLStatement = new SQLStatement();
    	insertPhoneNumber.sqlConnection = conn;
    	insertPhoneNumber.text =
    		"INSERT INTO customerPhoneNumbers (customerId, number)" +
    		"VALUES (:customerId, '800-555-1234')";
    	insertPhoneNumber.parameters[":customerId"] = customerId;

    	insertPhoneNumber.execute();

    	// if we've gotten to this point without errors, commit the transaction
    	conn.commit();
    }
    catch (error:SQLError)
    {
    	// rollback the transaction
    	conn.rollback();
    }
