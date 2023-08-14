---
sidebar_position: 7.3
---

# Using parameters in statements

Using SQL statement parameters allows you to create a reusable SQL statement.
When you use statement parameters, values within the statement can change (such
as values being added in an `INSERT` statement) but the basic statement text
remains unchanged. Consequently, using parameters provides performance benefits
and makes it easier to code an application.

## Understanding statement parameters

Frequently an application uses a single SQL statement multiple times in an
application, with slight variation. For example, consider an inventory-tracking
application where a user can add new inventory items to the database. The
application code that adds an inventory item to the database executes a SQL
`INSERT` statement that actually adds the data to the database. However, each
time the statement is executed there is a slight variation. Specifically, the
actual values that are inserted in the table are different because they are
specific to the inventory item being added.

In cases where you have a SQL statement that's used multiple times with
different values in the statement, the best approach is to use a SQL statement
that includes parameters rather than literal values in the SQL text. A parameter
is a placeholder in the statement text that is replaced with an actual value
each time the statement is executed. To use parameters in a SQL statement, you
create the
[SQLStatement](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLStatement.html)
instance as usual. For the actual SQL statement assigned to the `text` property,
use parameter placeholders rather than literal values. You then define the value
for each parameter by setting the value of an element in the SQLStatement
instance's `parameters` property. The `parameters` property is an associative
array, so you set a particular value using the following syntax:

    statement.parameters[parameter_identifier] = value;

The _parameter_identifier_ is a string if you're using a named parameter, or an
integer index if you're using an unnamed parameter.

## Using named parameters

A parameter can be a named parameter. A named parameter has a specific name that
the database uses to match the parameter value to its placeholder location in
the statement text. A parameter name consists of the ":" or "@" character
followed by a name, as in the following examples:

    :itemName
    @firstName

The following code listing demonstrates the use of named parameters:

    var sql:String =
    	"INSERT INTO inventoryItems (name, productCode)" +
    	"VALUES (:name, :productCode)";

    var addItemStmt:SQLStatement = new SQLStatement();
    addItemStmt.sqlConnection = conn;
    addItemStmt.text = sql;

    // set parameter values
    addItemStmt.parameters[":name"] = "Item name";
    addItemStmt.parameters[":productCode"] = "12345";

    addItemStmt.execute();

## Using unnamed parameters

As an alternative to using named parameters, you can also use unnamed
parameters. To use an unnamed parameter you denote a parameter in a SQL
statement using a "?" character. Each parameter is assigned a numeric index,
according to the order of the parameters in the statement, starting with index 0
for the first parameter. The following example demonstrates a version of the
previous example, using unnamed parameters:

    var sql:String =
    	"INSERT INTO inventoryItems (name, productCode)" +
    	"VALUES (?, ?)";

    var addItemStmt:SQLStatement = new SQLStatement();
    addItemStmt.sqlConnection = conn;
    addItemStmt.text = sql;

    // set parameter values
    addItemStmt.parameters[0] = "Item name";
    addItemStmt.parameters[1] = "12345";

    addItemStmt.execute();

## Benefits of using parameters

Using parameters in a SQL statement provides several benefits:

Better performance  
A SQLStatement instance that uses parameters can execute more efficiently
compared to one that dynamically creates the SQL text each time it executes. The
performance improvement is because the statement is prepared a single time and
can then be executed multiple times using different parameter values, without
needing to recompile the SQL statement.

Explicit data typing  
Parameters are used to allow for typed substitution of values that are unknown
at the time the SQL statement is constructed. The use of parameters is the only
way to guarantee the storage class for a value passed in to the database. When
parameters are not used, the runtime attempts to convert all values from their
text representation to a storage class based on the associated column's type
affinity.

For more information on storage classes and column affinity, see
[Data type support](../../appendixes/sql-support-in-local-databases/data-type-support.md).

Greater security  
The use of parameters helps prevent a malicious technique known as a SQL
injection attack. In a SQL injection attack, a user enters SQL code in a
user-accessible location (for example, a data entry field). If application code
constructs a SQL statement by directly concatenating user input into the SQL
text, the user-entered SQL code is executed against the database. The following
listing shows an example of concatenating user input into SQL text. **Do not use
this technique** :

    // assume the variables "username" and "password"
    // contain user-entered data

    var sql:String =
    	"SELECT userId " +
    	"FROM users " +
    	"WHERE username = '" + username + "' " +
    	"    AND password = '" + password + "'";

    var statement:SQLStatement = new SQLStatement();
    statement.text = sql;

Using statement parameters instead of concatenating user-entered values into a
statement's text prevents a SQL injection attack. SQL injection can't happen
because the parameter values are treated explicitly as substituted values,
rather than becoming part of the literal statement text. The following is the
recommended alternative to the previous listing:

    // assume the variables "username" and "password"
    // contain user-entered data

    var sql:String =
    	"SELECT userId " +
    	"FROM users " +
    	"WHERE username = :username " +
    	"    AND password = :password";

    var statement:SQLStatement = new SQLStatement();
    statement.text = sql;

    // set parameter values
    statement.parameters[":username"] = username;
    statement.parameters[":password"] = password;
