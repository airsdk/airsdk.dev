---
sidebar_position: 7.4
---

# Retrieving data from a database

Retrieving data from a database involves two steps. First, you execute a SQL
`SELECT` statement, describing the set of data you want from the database. Next,
you access the retrieved data and display or manipulate it as needed by your
application.

## Executing a SELECT statement

To retrieve existing data from a database, you use a
[SQLStatement](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLStatement.html)
instance. Assign the appropriate SQL `SELECT` statement to the instance's `text`
property, then call its `execute()` method.

For details on the syntax of the `SELECT` statement, see
[SQL support in local databases](../../appendixes/sql-support-in-local-databases/index.md).

The following example demonstrates executing a `SELECT` statement to retrieve
data from a table named "products," using asynchronous execution mode:

    var selectStmt:SQLStatement = new SQLStatement();

    // A SQLConnection named "conn" has been created previously
    selectStmt.sqlConnection = conn;

    selectStmt.text = "SELECT itemId, itemName, price FROM products";

    selectStmt.addEventListener(SQLEvent.RESULT, resultHandler);
    selectStmt.addEventListener(SQLErrorEvent.ERROR, errorHandler);

    selectStmt.execute();

    function resultHandler(event:SQLEvent):void
    {
    	var result:SQLResult = selectStmt.getResult();

    	var numResults:int = result.data.length;
    	for (var i:int = 0; i < numResults; i++)
    	{
    		var row:Object = result.data[i];
    		var output:String = "itemId: " + row.itemId;
    		output += "; itemName: " + row.itemName;
    		output += "; price: " + row.price;
    		trace(output);
    	}
    }

    function errorHandler(event:SQLErrorEvent):void
    {
    	// Information about the error is available in the
    	// event.error property, which is an instance of
    	// the SQLError class.
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.data.SQLResult;
    			import flash.data.SQLStatement;
    			import flash.errors.SQLError;
    			import flash.events.SQLErrorEvent;
    			import flash.events.SQLEvent;

    			private function init():void
    			{
    				var selectStmt:SQLStatement = new SQLStatement();

    				// A SQLConnection named "conn" has been created previously
    				selectStmt.sqlConnection = conn;

    				selectStmt.text = "SELECT itemId, itemName, price FROM products";

    				selectStmt.addEventListener(SQLEvent.RESULT, resultHandler);
    				selectStmt.addEventListener(SQLErrorEvent.ERROR, errorHandler);

    				selectStmt.execute();
    			}

    			private function resultHandler(event:SQLEvent):void
    			{
    				var result:SQLResult = selectStmt.getResult();

    				var numResults:int = result.data.length;
    				for (var i:int = 0; i < numResults; i++)
    				{
    					var row:Object = result.data[i];
    					var output:String = "itemId: " + row.itemId;
    					output += "; itemName: " + row.itemName;
    					output += "; price: " + row.price;
    					trace(output);
    				}
    			}

    			private function errorHandler(event:SQLErrorEvent):void
    			{
    				// Information about the error is available in the
    				// event.error property, which is an instance of
    				// the SQLError class.
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

The following example demonstrates executing a `SELECT` statement to retrieve
data from a table named "products," using synchronous execution mode:

    var selectStmt:SQLStatement = new SQLStatement();

    // A SQLConnection named "conn" has been created previously
    selectStmt.sqlConnection = conn;

    selectStmt.text = "SELECT itemId, itemName, price FROM products";

    try
    {
    	selectStmt.execute();

    	var result:SQLResult = selectStmt.getResult();

    	var numResults:int = result.data.length;
    	for (var i:int = 0; i < numResults; i++)
    	{
    		var row:Object = result.data[i];
    		var output:String = "itemId: " + row.itemId;
    		output += "; itemName: " + row.itemName;
    		output += "; price: " + row.price;
    		trace(output);
    	}
    }
    catch (error:SQLError)
    {
    	// Information about the error is available in the
    	// error variable, which is an instance of
    	// the SQLError class.
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.data.SQLResult;
    			import flash.data.SQLStatement;
    			import flash.errors.SQLError;
    			import flash.events.SQLErrorEvent;
    			import flash.events.SQLEvent;

    			private function init():void
    			{
    				var selectStmt:SQLStatement = new SQLStatement();

    				// A SQLConnection named "conn" has been created previously
    				selectStmt.sqlConnection = conn;

    				selectStmt.text = "SELECT itemId, itemName, price FROM products";

    				try
    				{
    					selectStmt.execute();

    					var result:SQLResult = selectStmt.getResult();

    					var numResults:int = result.data.length;
    					for (var i:int = 0; i < numResults; i++)
    					{
    						var row:Object = result.data[i];
    						var output:String = "itemId: " + row.itemId;
    						output += "; itemName: " + row.itemName;
    						output += "; price: " + row.price;
    						trace(output);
    					}
    				}
    				catch (error:SQLError)
    				{
    					// Information about the error is available in the
    					// error variable, which is an instance of
    					// the SQLError class.
    				}
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

In asynchronous execution mode, when the statement finishes executing, the
SQLStatement instance dispatches a `result` event ( `SQLEvent.RESULT`)
indicating that the statement was run successfully. Alternatively, if a
[Responder](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/Responder.html)
object is passed as an argument to the `execute()` method, the Responder
object's result handler function is called. In synchronous execution mode,
execution pauses until the `execute()` operation completes, then continues on
the next line of code.

## Accessing SELECT statement result data

Once the `SELECT` statement has finished executing, the next step is to access
the data that was retrieved. You retrieve the result data from executing a
`SELECT` statement by calling the SQLStatement object's `getResult()` method:

    var result:SQLResult = selectStatement.getResult();

The `getResult()` method returns a
[SQLResult](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLResult.html)
object. The SQLResult object's `data` property is an Array containing the
results of the `SELECT` statement:

    var numResults:int = result.data.length;
    for (var i:int = 0; i < numResults; i++)
    {
    	// row is an Object representing one row of result data
    	var row:Object = result.data[i];
    }

Each row of data in the `SELECT` result set becomes an Object instance contained
in the `data` Array. That object has properties whose names match the result
set's column names. The properties contain the values from the result set's
columns. For example, suppose a `SELECT` statement specifies a result set with
three columns named "itemId," "itemName," and "price." For each row in the
result set, an Object instance is created with properties named `itemId`,
`itemName`, and `price`. Those properties contain the values from their
respective columns.

The following code listing defines a SQLStatement instance whose text is a
`SELECT` statement. The statement retrieves rows containing the `firstName` and
`lastName` column values of all the rows of a table named `employees`. This
example uses asynchronous execution mode. When the execution completes, the
`selectResult()` method is called, and the resulting rows of data are accessed
using `SQLStatement.getResult()` and displayed using the `trace()` method. Note
that this listing assumes there is a SQLConnection instance named `conn` that
has already been instantiated and is already connected to the database. It also
assumes that the "employees" table has already been created and populated with
data.

    import flash.data.SQLConnection;
    import flash.data.SQLResult;
    import flash.data.SQLStatement;
    import flash.events.SQLErrorEvent;
    import flash.events.SQLEvent;

    // ... create and open the SQLConnection instance named conn ...

    // create the SQL statement
    var selectStmt:SQLStatement = new SQLStatement();
    selectStmt.sqlConnection = conn;

    // define the SQL text
    var sql:String =
    	"SELECT firstName, lastName " +
    	"FROM employees";
    selectStmt.text = sql;

    // register listeners for the result and error events
    selectStmt.addEventListener(SQLEvent.RESULT, selectResult);
    selectStmt.addEventListener(SQLErrorEvent.ERROR, selectError);

    // execute the statement
    selectStmt.execute();

    function selectResult(event:SQLEvent):void
    {
    	// access the result data
    	var result:SQLResult = selectStmt.getResult();

    	var numRows:int = result.data.length;
    	for (var i:int = 0; i < numRows; i++)
    	{
    		var output:String = "";
    		for (var columnName:String in result.data[i])
    		{
    			output += columnName + ": " + result.data[i][columnName] + "; ";
    		}
    		trace("row[" + i.toString() + "]\t", output);
    	}
    }

    function selectError(event:SQLErrorEvent):void
    {
    	trace("Error message:", event.error.message);
    	trace("Details:", event.error.details);
    }

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" creationComplete="init()">
    	<mx:Script>
    		<![CDATA[
    			import flash.data.SQLConnection;
    			import flash.data.SQLResult;
    			import flash.data.SQLStatement;
    			import flash.events.SQLErrorEvent;
    			import flash.events.SQLEvent;

    			private function init():void
    			{
    				// ... create and open the SQLConnection instance named conn ...

    				// create the SQL statement
    				var selectStmt:SQLStatement = new SQLStatement();
    				selectStmt.sqlConnection = conn;

    				// define the SQL text
    				var sql:String =
    					"SELECT firstName, lastName " +
    					"FROM employees";
    				selectStmt.text = sql;

    				// register listeners for the result and error events
    				selectStmt.addEventListener(SQLEvent.RESULT, selectResult);
    				selectStmt.addEventListener(SQLErrorEvent.ERROR, selectError);

    				// execute the statement
    				selectStmt.execute();
    			}

    			private function selectResult(event:SQLEvent):void
    			{
    				// access the result data
    				var result:SQLResult = selectStmt.getResult();

    				var numRows:int = result.data.length;
    				for (var i:int = 0; i < numRows; i++)
    				{
    					var output:String = "";
    					for (var columnName:String in result.data[i])
    					{
    						output += columnName + ": " + result.data[i][columnName] + "; ";
    					}
    					trace("row[" + i.toString() + "]\t", output);
    				}
    			}

    			private function selectError(event:SQLErrorEvent):void
    			{
    				trace("Error message:", event.error.message);
    				trace("Details:", event.error.details);
    			}
    		]]>
    	</mx:Script>
    </mx:WindowedApplication>

The following code listing demonstrates the same techniques as the preceding
one, but uses synchronous execution mode. The example defines a
[SQLStatement](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLStatement.html)
instance whose text is a `SELECT` statement. The statement retrieves rows
containing the `firstName` and `lastName` column values of all the rows of a
table named `employees`. The resulting rows of data are accessed using
`SQLStatement.getResult()` and displayed using the `trace()` method. Note that
this listing assumes there is a SQLConnection instance named `conn` that has
already been instantiated and is already connected to the database. It also
assumes that the "employees" table has already been created and populated with
data.

    import flash.data.SQLConnection;
    import flash.data.SQLResult;
    import flash.data.SQLStatement;
    import flash.errors.SQLError;

    // ... create and open the SQLConnection instance named conn ...

    // create the SQL statement
    var selectStmt:SQLStatement = new SQLStatement();
    selectStmt.sqlConnection = conn;

    // define the SQL text
    var sql:String =
    	"SELECT firstName, lastName " +
    	"FROM employees";
    selectStmt.text = sql;

    try
    {
    	// execute the statement
    	selectStmt.execute();

    	// access the result data
    	var result:SQLResult = selectStmt.getResult();

    	var numRows:int = result.data.length;
    	for (var i:int = 0; i < numRows; i++)
    	{
    		var output:String = "";
    		for (var columnName:String in result.data[i])
    		{
    			output += columnName + ": " + result.data[i][columnName] + "; ";
    		}
    		trace("row[" + i.toString() + "]\t", output);
    	}
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
    			import flash.data.SQLResult;
    			import flash.data.SQLStatement;
    			import flash.errors.SQLError;

    			private function init():void
    			{
    				// ... create and open the SQLConnection instance named conn ...

    				// create the SQL statement
    				var selectStmt:SQLStatement = new SQLStatement();
    				selectStmt.sqlConnection = conn;

    				// define the SQL text
    				var sql:String =
    					"SELECT firstName, lastName " +
    					"FROM employees";
    				selectStmt.text = sql;

    				try
    				{
    					// execute the statement
    					selectStmt.execute();

    					// access the result data
    					var result:SQLResult = selectStmt.getResult();

    					var numRows:int = result.data.length;
    					for (var i:int = 0; i < numRows; i++)
    					{
    						var output:String = "";
    						for (var columnName:String in result.data[i])
    						{
    							output += columnName + ": ";
    							output += result.data[i][columnName] + "; ";
    						}
    						trace("row[" + i.toString() + "]\t", output);
    					}
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

## Defining the data type of SELECT result data

By default, each row returned by a `SELECT` statement is created as an Object
instance with properties named for the result set's column names and with the
value of each column as the value of its associated property. However, before
executing a SQL `SELECT` statement, you can set the `itemClass` property of the
[SQLStatement](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLStatement.html)
instance to a class. By setting the `itemClass` property, each row returned by
the `SELECT` statement is created as an instance of the designated class. The
runtime assigns result column values to property values by matching the column
names in the `SELECT` result set to the names of the properties in the
`itemClass` class.

Any class assigned as an `itemClass` property value must have a constructor that
does not require any parameters. In addition, the class must have a single
property for each column returned by the `SELECT` statement. It is considered an
error if a column in the `SELECT` list does not have a matching property name in
the `itemClass` class.

## Retrieving SELECT results in parts

By default, a `SELECT` statement execution retrieves all the rows of the result
set at one time. Once the statement completes, you usually process the retrieved
data in some way, such as creating objects or displaying the data on the screen.
If the statement returns a large number of rows, processing all the data at once
can be demanding for the computer, which in turn will cause the user interface
to not redraw itself.

You can improve the perceived performance of your application by instructing the
runtime to return a specific number of result rows at a time. Doing so causes
the initial result data to return more quickly. It also allows you to divide the
result rows into sets, so that the user interface is updated after each set of
rows is processed. Note that it's only practical to use this technique in
asynchronous execution mode.

To retrieve `SELECT` results in parts, specify a value for the
`SQLStatement.execute()` method's first parameter (the `prefetch` parameter).
The `prefetch` parameter indicates the number of rows to retrieve the first time
the statement executes. When you call a
[SQLStatement](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLStatement.html)
instance's `execute()` method, specify a `prefetch` parameter value and only
that many rows are retrieved:

    var stmt:SQLStatement = new SQLStatement();
    stmt.sqlConnection = conn;

    stmt.text = "SELECT ...";

    stmt.addEventListener(SQLEvent.RESULT, selectResult);

    stmt.execute(20); // only the first 20 rows (or fewer) are returned

The statement dispatches the `result` event, indicating that the first set of
result rows is available. The resulting
[SQLResult](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLResult.html)
instance's `data` property contains the rows of data, and its `complete`
property indicates whether there are additional result rows to retrieve. To
retrieve additional result rows, call the SQLStatement instance's `next()`
method. Like the `execute()` method, the `next()` method's first parameter is
used to indicate how many rows to retrieve the next time the result event is
dispatched.

    function selectResult(event:SQLEvent):void
    {
    	var result:SQLResult = stmt.getResult();
    	if (result.data != null)
    	{
    		// ... loop through the rows or perform other processing ...

    		if (!result.complete)
    		{
    			stmt.next(20); // retrieve the next 20 rows
    		}
    		else
    		{
    			stmt.removeEventListener(SQLEvent.RESULT, selectResult);
    		}
    	}
    }

The SQLStatement dispatches a `result` event each time the `next()` method
returns a subsequent set of result rows. Consequently, the same listener
function can be used to continue processing results (from `next()` calls) until
all the rows are retrieved.

For more information, see the descriptions for the `SQLStatement.execute()`
method (the `prefetch` parameter description) and the `SQLStatement.next()`
method.
