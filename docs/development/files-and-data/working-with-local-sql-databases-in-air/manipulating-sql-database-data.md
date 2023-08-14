---
sidebar_position: 3
---

# Manipulating SQL database data

There are some common tasks that you perform when you're working with local SQL
databases. These tasks include connecting to a database, adding data to tables,
and retrieving data from tables in a database. There are also several issues
you'll want to keep in mind while performing these tasks, such as working with
data types and handling errors.

Note that there are also several database tasks that are things you'll deal with
less frequently, but will often need to do before you can perform these more
common tasks. For example, before you can connect to a database and retrieve
data from a table, you'll need to create the database and create the table
structure in the database. Those less-frequent initial setup tasks are discussed
in [Creating and modifying a database](./creating-and-modifying-a-database.md).

You can choose to perform database operations asynchronously, meaning the
database engine runs in the background and notifies you when the operation
succeeds or fails by dispatching an event. You can also perform these operations
synchronously. In that case the database operations are performed one after
another and the entire application (including updates to the screen) waits for
the operations to complete before executing other code. For more information on
working in asynchronous or synchronous execution mode, see
[Using synchronous and asynchronous database operations](./using-synchronous-and-asynchronous-database-operations/index.md).

More Help topics

[Connecting to a database](./connecting-to-a-database.md)

[Working with SQL statements](./working-with-sql-statements.md)

[Using parameters in statements](./using-parameters-in-statements.md)

[Retrieving data from a database](./retrieving-data-from-a-database.md)

[Inserting data](./inserting-data.md)

[Changing or deleting data](./changing-or-deleting-data.md)

[Working with multiple databases](./working-with-multiple-databases.md)

[Handling database errors](./handling-database-errors.md)

[Working with database data types](./working-with-database-data-types.md)
