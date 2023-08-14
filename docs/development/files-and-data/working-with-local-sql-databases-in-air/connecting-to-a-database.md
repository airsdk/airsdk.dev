---
sidebar_position: 7.1
---

# Connecting to a database

Before you can perform any database operations, first open a connection to the
database file. A
[SQLConnection](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLConnection.html)
instance is used to represent a connection to one or more databases. The first
database that is connected using a SQLConnection instance is known as the "main"
database. This database is connected using the `open()` method (for synchronous
execution mode) or the `openAsync()` method (for asynchronous execution mode).

If you open a database using the asynchronous `openAsync()` operation, register
for the SQLConnection instance's `open` event in order to know when the
`openAsync()` operation completes. Register for the SQLConnection instance's
`error` event to determine if the operation fails.

The following example shows how to open an existing database file for
asynchronous execution. The database file is named "DBSample.db" and is located
in the user's
[Pointing to the application storage directory](../working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#pointing-to-the-application-storage-directory).

    import flash.data.SQLConnection;
    import flash.data.SQLMode;
    import flash.events.SQLErrorEvent;
    import flash.events.SQLEvent;
    import flash.filesystem.File;

    var conn:SQLConnection = new SQLConnection();

    conn.addEventListener(SQLEvent.OPEN, openHandler);
    conn.addEventListener(SQLErrorEvent.ERROR, errorHandler);

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    conn.openAsync(dbFile, SQLMode.UPDATE);

    function openHandler(event:SQLEvent):void
    {
    	trace("the database opened successfully");
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
    			import flash.data.SQLMode;
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

    				conn.openAsync(dbFile, SQLMode.UPDATE);
    			}

    			private function openHandler(event:SQLEvent):void
    			{
    				trace("the database opened successfully");
    			}

    			private function errorHandler(event:SQLErrorEvent):void
    			{
    				trace("Error message:", event.error.message);
    				trace("Details:", event.error.details);
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

The following example shows how to open an existing database file for
synchronous execution. The database file is named "DBSample.db" and is located
in the user's
[Pointing to the application storage directory](../working-with-the-file-system/using-the-air-file-system-api/working-with-file-objects-in-air.md#pointing-to-the-application-storage-directory).

    import flash.data.SQLConnection;
    import flash.data.SQLMode;
    import flash.errors.SQLError;
    import flash.filesystem.File;

    var conn:SQLConnection = new SQLConnection();

    // The database file is in the application storage directory
    var folder:File = File.applicationStorageDirectory;
    var dbFile:File = folder.resolvePath("DBSample.db");

    try
    {
    	conn.open(dbFile, SQLMode.UPDATE);
    	trace("the database opened successfully");
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
    			import flash.data.SQLMode;
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
    					conn.open(dbFile, SQLMode.UPDATE);
    					trace("the database opened successfully");
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

Notice that in the `openAsync()` method call in the asynchronous example, and
the `open()` method call in the synchronous example, the second argument is the
constant `SQLMode.UPDATE`. Specifying `SQLMode.UPDATE` for the second parameter
( `openMode`) causes the runtime to dispatch an error if the specified file
doesn't exist. If you pass `SQLMode.CREATE` for the `openMode` parameter (or if
you leave the `openMode` parameter off), the runtime attempts to create a
database file if the specified file doesn't exist. However, if the file exists
it is opened, which is the same as if you use `SQLMode.Update`. You can also
specify `SQLMode.READ` for the `openMode` parameter to open an existing database
in a read-only mode. In that case data can be retrieved from the database but no
data can be added, deleted, or changed.
