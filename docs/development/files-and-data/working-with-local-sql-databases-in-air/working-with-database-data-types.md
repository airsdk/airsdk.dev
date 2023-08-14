---
sidebar_position: 7.9
---

# Working with database data types

When a table is created in a database, the SQL statement for creating the table
defines the affinity, or data type, for each column in the table. Although
affinity declarations can be omitted, it's a good idea to explicitly declare
column affinity in your `CREATE TABLE` SQL statements.

As a general rule, any object that you store in a database using an `INSERT`
statement is returned as an instance of the same data type when you execute a
`SELECT` statement. However, the data type of the retrieved value can be
different depending on the affinity of the database column in which the value is
stored. When a value is stored in a column, if its data type doesn't match the
column's affinity, the database attempts to convert the value to match the
column's affinity. For example, if a database column is declared with `NUMERIC`
affinity, the database attempts to convert inserted data into a numeric storage
class ( `INTEGER` or `REAL`) before storing the data. The database throws an
error if the data can't be converted. According to this rule, if the String
"12345" is inserted into a `NUMERIC` column, the database automatically converts
it to the integer value 12345 before storing it in the database. When it's
retrieved with a `SELECT` statement, the value is returned as an instance of a
numeric data type (such as Number) rather than as a String instance.

The best way to avoid undesirable data type conversion is to follow two rules.
First, define each column with the affinity that matches the type of data that
it is intended to store. Next, only insert values whose data type matches the
defined affinity. Following these rules provides two benefits. When you insert
the data it isn't converted unexpectedly (possibly losing its intended meaning
as a result). In addition, when you retrieve the data it is returned with its
original data type.

For more information about the available column affinity types and using data
types in SQL statements, see the
[Data type support](../../appendixes/sql-support-in-local-databases/data-type-support.md).
