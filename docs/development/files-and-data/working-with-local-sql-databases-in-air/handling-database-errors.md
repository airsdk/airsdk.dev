---
sidebar_position: 7.8
---

# Handling database errors

In general, database error handling is like other runtime error handling. You
should write code that is prepared for errors that may occur, and respond to the
errors rather than leave it up to the runtime to do so. In a general sense, the
possible database errors can be divided into three categories: connection
errors, SQL syntax errors, and constraint errors.

## Connection errors

Most database errors are connection errors, and they can occur during any
operation. Although there are strategies for preventing connection errors, there
is rarely a simple way to gracefully recover from a connection error if the
database is a critical part of your application.

Most connection errors have to do with how the runtime interacts with the
operating system, the file system, and the database file. For example, a
connection error occurs if the user doesn't have permission to create a database
file in a particular location on the file system. The following strategies help
to prevent connection errors:

Use user-specific database files  
Rather than using a single database file for all users who use the application
on a single computer, give each user their own database file. The file should be
located in a directory that's associated with the user's account. For example,
it could be in the application's storage directory, the user's documents folder,
the user's desktop, and so forth.

Consider different user types  
Test your application with different types of user accounts, on different
operating systems. Don't assume that the user has administrator permission on
the computer. Also, don't assume that the individual who installed the
application is the user who's running the application.

Consider various file locations  
If you allow a user to specify where to save a database file or select a file to
open, consider the possible file locations that the users might use. In
addition, consider defining limits on where users can store (or from where they
can open) database files. For example, you might only allow users to open files
that are within their user account's storage location.

If a connection error occurs, it most likely happens on the first attempt to
create or open the database. This means that the user is unable to do any
database-related operations in the application. For certain types of errors,
such as read-only or permission errors, one possible recovery technique is to
copy the database file to a different location. The application can copy the
database file to a different location where the user does have permission to
create and write to files, and use that location instead.

## Syntax errors

A syntax error occurs when a SQL statement is incorrectly formed, and the
application attempts to execute the statement. Because local database SQL
statements are created as strings, compile-time SQL syntax checking is not
possible. All SQL statements must be executed to check their syntax. Use the
following strategies to prevent SQL syntax errors:

Test all SQL statements thoroughly  
If possible, while developing your application test your SQL statements
separately before encoding them as statement text in the application code. In
addition, use a code-testing approach such as unit testing to create a set of
tests that exercise every possible option and variation in the code.

Use statement parameters and avoid concatenating (dynamically generating) SQL  
Using parameters, and avoiding dynamically built SQL statements, means that the
same SQL statement text is used each time a statement is executed. Consequently,
it's much easier to test your statements and limit the possible variation. If
you must dynamically generate a SQL statement, keep the dynamic parts of the
statement to a minimum. Also, carefully validate any user input to make sure it
won't cause syntax errors.

To recover from a syntax error, an application would need complex logic to be
able to examine a SQL statement and correct its syntax. By following the
previous guidelines for preventing syntax errors, your code can identify any
potential run-time sources of SQL syntax errors (such as user input used in a
statement). To recover from a syntax error, provide guidance to the user.
Indicate what to correct to make the statement execute properly.

## Constraint errors

Constraint errors occur when an `INSERT` or `UPDATE` statement attempts to add
data to a column. The error happens if the new data violates one of the defined
constraints for the table or column. The set of possible constraints includes:

Unique constraint  
Indicates that across all the rows in a table, there cannot be duplicate values
in one column. Alternatively, when multiple columns are combined in a unique
constraint, the combination of values in those columns must not be duplicated.
In other words, in terms of the specified unique column or columns, each row
must be distinct.

Primary key constraint  
In terms of the data that a constraint allows and doesn't allow, a primary key
constraint is identical to a unique constraint.

Not null constraint  
Specifies that a single column cannot store a `NULL` value and consequently that
in every row, that column must have a value.

Check constraint  
Allows you to specify an arbitrary constraint on one or more tables. A common
check constraint is a rule that define that a column's value must be within
certain bounds (for example, that a numeric column's value must be larger than
0). Another common type of check constraint specifies relationships between
column values (for example, that a column's value must be different from the
value of another column in the same row).

Data type (column affinity) constraint  
The runtime enforces the data type of columns' values, and an error occurs if an
attempt is made to store a value of the incorrect type in a column. However, in
many conditions values are converted to match the column's declared data type.
See [Working with database data types](./working-with-database-data-types.md)
for more information.

The runtime does not enforce constraints on foreign key values. In other words,
foreign key values aren't required to match an existing primary key value.

In addition to the predefined constraint types, the runtime SQL engine supports
the use of triggers. A trigger is like an event handler. It is a predefined set
of instructions that are carried out when a certain action happens. For example,
a trigger could be defined that runs when data is inserted into or deleted from
a particular table. One possible use of a trigger is to examine data changes and
cause an error to occur if specified conditions aren't met. Consequently, a
trigger can serve the same purpose as a constraint, and the strategies for
preventing and recovering from constraint errors also apply to trigger-generated
errors. However, the error id for trigger-generated errors is different from the
error id for constraint errors.

The set of constraints that apply to a particular table is determined while
you're designing an application. Consciously designing constraints makes it
easier to design your application to prevent and recover from constraint errors.
However, constraint errors are difficult to systematically predict and prevent.
Prediction is difficult because constraint errors don't appear until application
data is added. Constraint errors occur with data that is added to a database
after it's created. These errors are often a result of the relationship between
new data and data that already exists in the database. The following strategies
can help you avoid many constraint errors:

Carefully plan database structure and constraints  
The purpose of constraints is to enforce application rules and help protect the
integrity of the database's data. When you're planning your application,
consider how to structure your database to support your application. As part of
that process, identify rules for your data, such as whether certain values are
required, whether a value has a default, whether duplicate values are allowed,
and so forth. Those rules guide you in defining database constraints.

Explicitly specify column names  
An `INSERT` statement can be written without explicitly specifying the columns
into which values are to be inserted, but doing so is an unnecessary risk. By
explicitly naming the columns into which values are to be inserted, you can
allow for automatically generated values, columns with default values, and
columns that allow `NULL` values. In addition, by doing so you can ensure that
all `NOT NULL` columns have an explicit value inserted.

Use default values  
Whenever you specify a `NOT NULL` constraint for a column, if at all possible
specify a default value in the column definition. Application code can also
provide default values. For example, your code can check if a String variable is
`null` and assign it a value before using it to set a statement parameter value.

Validate user-entered data  
Check user-entered data ahead of time to make sure that it obeys limits
specified by constraints, especially in the case of `NOT NULL` and `CHECK`
constraints. Naturally, a `UNIQUE` constraint is more difficult to check for
because doing so would require executing a `SELECT` query to determine whether
the data is unique.

Use triggers  
You can write a trigger that validates (and possibly replaces) inserted data or
takes other actions to correct invalid data. This validation and correction can
prevent a constraint error from occurring.

In many ways constraint errors are more difficult to prevent than other types of
errors. Fortunately, there are several strategies to recover from constraint
errors in ways that don't make the application unstable or unusable:

Use conflict algorithms  
When you define a constraint on a column, and when you create an `INSERT` or
`UPDATE` statement, you have the option of specifying a conflict algorithm. A
conflict algorithm defines the action the database takes when a constraint
violation occurs. There are several possible actions the database engine can
take. The database engine can end a single statement or a whole transaction. It
can ignore the error. It can even remove old data and replace it with the data
that the code is attempting to store.

For more information see the section "ON CONFLICT (conflict algorithms)" in the
[SQL support in local databases](../../appendixes/sql-support-in-local-databases/index.md).

Provide corrective feedback  
The set of constraints that can affect a particular SQL command can be
identified ahead of time. Consequently, you can anticipate constraint errors
that a statement could cause. With that knowledge, you can build application
logic to respond to a constraint error. For example, suppose an application
includes a data entry form for entering new products. If the product name column
in the database is defined with a `UNIQUE` constraint, the action of inserting a
new product row in the database could cause a constraint error. Consequently,
the application is designed to anticipate a constraint error. When the error
happens, the application alerts the user, indicating that the specified product
name is already in use and asking the user to choose a different name. Another
possible response is to allow the user to view information about the other
product with the same name.
