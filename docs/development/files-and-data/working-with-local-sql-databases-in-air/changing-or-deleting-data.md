---
sidebar_position: 7.6
---

# Changing or deleting data

The process for executing other data manipulation operations is identical to the
process used to execute a SQL `SELECT` or `INSERT` statement, as described in
[Working with SQL statements](./working-with-sql-statements.md). Simply
substitute a different SQL statement in the
[SQLStatement](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLStatement.html)
instance's `text` property:

- To change existing data in a table, use an `UPDATE` statement.

- To delete one or more rows of data from a table, use a `DELETE` statement.

For descriptions of these statements, see
[SQL support in local databases](./working-with-sql-statements.md).
