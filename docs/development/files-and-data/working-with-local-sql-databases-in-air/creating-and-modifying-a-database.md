---
sidebar_position: 2
---

# Creating and modifying a database

Before your application can add or retrieve data, there must be a database with
tables defined in it that your application can access. Described here are the
tasks of creating a database and creating the data structure within a database.
While these tasks are less frequently used than data insertion and retrieval,
they are necessary for most applications.

## Creating a database

To create a database file, you first create a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance. You call its `open()` method to open it in synchronous execution mode,
or its `openAsync()` method to open it in asynchronous execution mode. The
`open()` and `openAsync()` methods are used to open a connection to a database.
If you pass a File instance that refers to a non-existent file location for the
`reference` parameter (the first parameter), the `open()` or `openAsync()`
method creates a database file at that file location and open a connection to
the newly created database.

Whether you call the `open()` method or the `openAsync()` method to create a
database, the database file's name can be any valid filename, with any filename
extension. If you call the `open()` or `openAsync()` method with `null` for the
`reference` parameter, a new in-memory database is created rather than a
database file on disk.

The following code listing shows the process of creating a database file (a new
database) using asynchronous execution mode. In this case, the database file is
saved in the
[Pointing to the application storage directory](../working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#pointing-to-the-application-storage-directory),
with the filename "DBSample.db":

    import flash.data.SQLConnection;
    import flash.events.SQLErrorEvent;
    import flash.events.SQLEvent;
    import flash.filesystem.File;

    var conn:SQLConnection = new SQLConnection();

    conn.addEventListener(SQLEvent.OPEN, openHandler);
    conn.addEventListener(SQLErrorEvent.ERROR, errorHandler);

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    conn.openAsync(dbFile);

    function openHandler(event:SQLEvent):void
    {
    	trace("the database was created successfully");
    }

    function errorHandler(event:SQLErrorEvent):void
    {
    	trace("Error message:", event.error.message);
    	trace("Details:", event.error.details);
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.events.SQLErrorEvent;
    			import flash.events.SQLEvent;
    			import flash.filesystem.File;

    			private function init():void
    			{
    				var conn:SQLConnection = new SQLConnection();

    				conn.addEventListener(SQLEvent.OPEN, openHandler);
    				conn.addEventListener(SQLErrorEvent.ERROR, errorHandler);

    				// The database file is in the application storage directory
    				var folder:File = File.applicationStorageDirectory;
    				var dbFile:File = folder.resolvePath("DBSample.db");

    				conn.openAsync(dbFile);
    			}

    			private function openHandler(event:SQLEvent):void
    			{
    				trace("the database was created successfully");
    			}

    			private function errorHandler(event:SQLErrorEvent):void
    			{
    				trace("Error message:", event.error.message);
    				trace("Details:", event.error.details);
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

Note: Although the File class lets you point to a specific native file path,
doing so can lead to applications that will not work across platforms. For
example, the path C:\Documents and Settings\joe\test.db only works on Windows.
For these reasons, it is best to use the static properties of the
[File class](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/File.html)
such as `File.applicationStorageDirectory`, as well as the `resolvePath()`
method (as shown in the previous example). For more information, see
[Paths of File objects](../working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#paths-of-file-objects).

To execute operations synchronously, when you open a database connection with
the SQLConnection instance, call the `open()` method. The following example
shows how to create and open a SQLConnection instance that executes its
operations synchronously:

    import flash.data.SQLConnection;
    import flash.errors.SQLError;
    import flash.filesystem.File;

    var conn:SQLConnection = new SQLConnection();

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    try
    {
    	conn.open(dbFile);
    	trace("the database was created successfully");
    }
    catch (error:SQLError)
    {
    	trace("Error message:", error.message);
    	trace("Details:", error.details);
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.errors.SQLError;
    			import flash.filesystem.File;

    			private function init():void
    			{
    				var conn:SQLConnection = new SQLConnection();

    				// The database file is in the application storage directory
    				var folder:File = File.applicationStorageDirectory;
    				var dbFile:File = folder.resolvePath("DBSample.db");

    				try
    				{
    					conn.open(dbFile);
    					trace("the database was created successfully");
    				}
    				catch (error:SQLError)
    				{
    					trace("Error message:", error.message);
    					trace("Details:", error.details);
    				}
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

## Creating database tables

Creating a table in a database involves
[executing a SQL statement](<https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLStatement.html#execute()>)
on that database, using the same process that you use to execute a SQL statement
such as `SELECT`, `INSERT`, and so forth. To create a table, you use a
`CREATE TABLE` statement, which includes definitions of columns and constraints
for the new table. For more information about executing SQL statements, see
[Working with SQL statements](./working-with-sql-statements.md).

The following example demonstrates creating a table named "employees" in an
existing database file, using asynchronous execution mode. Note that this code
assumes there is a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance named `conn` that is already instantiated and is already connected to a
database.

    import flash.data.SQLConnection;
    import flash.data.SQLStatement;
    import flash.events.SQLErrorEvent;
    import flash.events.SQLEvent;

    // ... create and open the SQLConnection instance named conn ...

    var createStmt:SQLStatement = new SQLStatement();
    createStmt.sqlConnection = conn;

    var sql:String =
    	"CREATE TABLE IF NOT EXISTS employees (" +
    	"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +
    	"    firstName TEXT, " +
    	"    lastName TEXT, " +
    	"    salary NUMERIC CHECK (salary > 0)" +
    	")";
    createStmt.text = sql;

    createStmt.addEventListener(SQLEvent.RESULT, createResult);
    createStmt.addEventListener(SQLErrorEvent.ERROR, createError);

    createStmt.execute();

    function createResult(event:SQLEvent):void
    {
    	trace("Table created");
    }

    function createError(event:SQLErrorEvent):void
    {
    	trace("Error message:", event.error.message);
    	trace("Details:", event.error.details);
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.data.SQLStatement;
    			import flash.events.SQLErrorEvent;
    			import flash.events.SQLEvent;

    			private function init():void
    			{
    				// ... create and open the SQLConnection instance named conn ...

    				var createStmt:SQLStatement = new SQLStatement();
    				createStmt.sqlConnection = conn;

    				var sql:String =
    					"CREATE TABLE IF NOT EXISTS employees (" +
    					"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +
    					"    firstName TEXT, " +
    					"    lastName TEXT, " +
    					"    salary NUMERIC CHECK (salary > 0)" +
    					")";
    				createStmt.text = sql;

    				createStmt.addEventListener(SQLEvent.RESULT, createResult);
    				createStmt.addEventListener(SQLErrorEvent.ERROR, createError);

    				createStmt.execute();
    			}

    			private function createResult(event:SQLEvent):void
    			{
    				trace("Table created");
    			}

    			private function createError(event:SQLErrorEvent):void
    			{
    				trace("Error message:", event.error.message);
    				trace("Details:", event.error.details);
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

The following example demonstrates how to create a table named "employees" in an
existing database file, using synchronous execution mode. Note that this code
assumes there is a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance named `conn` that is already instantiated and is already connected to a
database.

    import flash.data.SQLConnection;
    import flash.data.SQLStatement;
    import flash.errors.SQLError;

    // ... create and open the SQLConnection instance named conn ...

    var createStmt:SQLStatement = new SQLStatement();
    createStmt.sqlConnection = conn;

    var sql:String =
    	"CREATE TABLE IF NOT EXISTS employees (" +
    	"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +
    	"    firstName TEXT, " +
    	"    lastName TEXT, " +
    	"    salary NUMERIC CHECK (salary > 0)" +
    	")";
    createStmt.text = sql;

    try
    {
    	createStmt.execute();
    	trace("Table created");
    }
    catch (error:SQLError)
    {
    	trace("Error message:", error.message);
    	trace("Details:", error.details);
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.data.SQLStatement;
    			import flash.errors.SQLError;

    			private function init():void
    			{
    				// ... create and open the SQLConnection instance named conn ...

    				var createStmt:SQLStatement = new SQLStatement();
    				createStmt.sqlConnection = conn;

    				var sql:String =
    					"CREATE TABLE IF NOT EXISTS employees (" +
    					"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +
    					"    firstName TEXT, " +
    					"    lastName TEXT, " +
    					"    salary NUMERIC CHECK (salary > 0)" +
    					")";
    				createStmt.text = sql;

    				try
    				{
    					createStmt.execute();
    					trace("Table created");
    				}
    				catch (error:SQLError)
    				{
    					trace("Error message:", error.message);
    					trace("Details:", error.details);
    				}
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

More Help topics

[Mind the Flex: Updating an existing AIR database](https://web.archive.org/web/20120309072807/http://www.mindtheflex.com/?p=83)
