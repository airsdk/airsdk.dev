---
sidebar_position: 7.7
---

# Working with multiple databases

Use the `SQLConnection.attach()` method to open a connection to an additional
database on a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance that already has an open database. You give the attached database a
name using the name parameter in the `attach()` method call. When writing
statements to manipulate that database, you can then use that name in a prefix
(using the form `database-name.table-name`) to qualify any table names in your
SQL statements, indicating to the runtime that the table can be found in the
named database.

You can execute a single SQL statement that includes tables from multiple
databases that are connected to the same SQLConnection instance. If a
transaction is created on the SQLConnection instance, that transaction applies
to all SQL statements that are executed using the SQLConnection instance. This
is true regardless of which attached database the statement runs on.

Alternatively, you can also create multiple SQLConnection instances in an
application, each of which is connected to one or multiple databases. However,
if you do use multiple connections to the same database keep in mind that a
database transaction isn't shared across SQLConnection instances. Consequently,
if you connect to the same database file using multiple SQLConnection instances,
you can't rely on both connections' data changes being applied in the expected
manner. For example, if two `UPDATE` or `DELETE` statements are run against the
same database through different SQLConnection instances, and an application
error occurs after one operation takes place, the database data could be left in
an intermediate state that would not be reversible and might affect the
integrity of the database (and consequently the application).
