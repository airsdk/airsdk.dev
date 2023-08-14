---
sidebar_position: 1
---

# Supported SQL syntax

The following SQL syntax listings are supported by the Adobe AIR SQL database
engine. The listings are divided into explanations of different statement and
clause types, expressions, built-in functions, and operators. The following
topics are covered:

- General SQL syntax

- Data manipulation statements (SELECT, INSERT, UPDATE, and DELETE)

- Data definition statements (CREATE, ALTER, and DROP statements for tables,
  indices, views, and triggers)

- Special statements and clauses

- Built-in functions (Aggregate, scalar, and date/time formatting functions)

- Operators

- Parameters

- Unsupported SQL features

- Additional SQL features

## General SQL syntax

In addition to the specific syntax for various statements and expressions, the
following are general rules of SQL syntax:

Case sensitivity  
SQL statements, including object names, are not case sensitive. Nevertheless,
SQL statements are frequently written with SQL keywords written in uppercase,
and this document uses that convention. While SQL syntax is not case sensitive,
literal text values in SQL are case sensitive, and comparison and sorting
operations can be case sensitive, as specified by the collation sequence defined
for a column or operation. For more information see COLLATE.

White space  
A white-space character (such as space, tab, new line, and so forth) must be
used to separate individual words in an SQL statement. However, white space is
optional between words and symbols. The type and quantity of white-space
characters in a SQL statement is not significant. You can use white space, such
as indenting and line breaks, to format your SQL statements for easy
readability, without affecting the meaning of the statement.

## Data manipulation statements

Data manipulation statements are the most commonly used SQL statements. These
statements are used to retrieve, add, modify, and remove data from database
tables. The following data manipulation statements are supported: SELECT,
INSERT, UPDATE, and DELETE.

**SELECT**

The SELECT statement is used to query the database. The result of a SELECT is
zero or more rows of data where each row has a fixed number of columns. The
number of columns in the result is specified by the result column name or
expression list between the SELECT and optional FROM keywords.

    sql-statement   ::=  SELECT [ALL | DISTINCT] result
                     [FROM table-list]
                     [WHERE expr]
                     [GROUP BY expr-list]
                     [HAVING expr]
                     [compound-op select-statement]*
                     [ORDER BY sort-expr-list]
                     [LIMIT integer [( OFFSET | , ) integer]]
    result          ::=  result-column [, result-column]*
    result-column   ::=  * | table-name . * | expr [[AS] string]
    table-list      ::=  table [ join-op table join-args ]*
    table           ::=  table-name [AS alias] |
                     ( select ) [AS alias]
    join-op         ::=  , | [NATURAL] [LEFT | RIGHT | FULL] [OUTER | INNER | CROSS] JOIN
    join-args       ::=  [ON expr] [USING ( id-list )]
    compound-op     ::=  UNION | UNION ALL | INTERSECT | EXCEPT
    sort-expr-list  ::=  expr [sort-order] [, expr [sort-order]]*
    sort-order      ::=  [COLLATE collation-name] [ASC | DESC]
    collation-name  ::=  BINARY | NOCASE

Any arbitrary expression can be used as a result. If a result expression is \*
then all columns of all tables are substituted for that one expression. If the
expression is the name of a table followed by .\* then the result is all columns
in that one table.

The DISTINCT keyword causes a subset of result rows to be returned, in which
each result row is different. NULL values are not treated as distinct from each
other. The default behavior is that all result rows are returned, which can be
made explicit with the keyword ALL.

The query is executed against one or more tables specified after the FROM
keyword. If multiple table names are separated by commas, then the query uses
the cross join of the various tables. The JOIN syntax can also be used to
specify how tables are joined. The only type of outer join that is supported is
LEFT OUTER JOIN. The ON clause expression in join-args must resolve to a boolean
value. A subquery in parentheses may be used as a table in the FROM clause. The
entire FROM clause may be omitted, in which case the result is a single row
consisting of the values of the result expression list.

The WHERE clause is used to limit the number of rows the query retrieves. WHERE
clause expressions must resolve to a boolean value. WHERE clause filtering is
performed before any grouping, so WHERE clause expressions may not include
aggregate functions.

The GROUP BY clause causes one or more rows of the result to be combined into a
single row of output. A GROUP BY clause is especially useful when the result
contains aggregate functions. The expressions in the GROUP BY clause do not have
to be expressions that appear in the SELECT expression list.

The HAVING clause is like WHERE in that it limits the rows returned by the
statement. However, the HAVING clause applies after any grouping specified by a
GROUP BY clause has occurred. Consequently, the HAVING expression may refer to
values that include aggregate functions. A HAVING clause expression is not
required to appear in the SELECT list. Like a WHERE expression, a HAVING
expression must resolve to a boolean value.

The ORDER BY clause causes the output rows to be sorted. The sort-expr-list
argument to the ORDER BY clause is a list of expressions that are used as the
key for the sort. The expressions do not have to be part of the result for a
simple SELECT, but in a compound SELECT (a SELECT using one of the compound-op
operators) each sort expression must exactly match one of the result columns.
Each sort expression may be optionally followed by a sort-order clause
consisting of the COLLATE keyword and the name of a collation function used for
ordering text and/or the keyword ASC or DESC to specify the sort order
(ascending or descending). The sort-order can be omitted and the default
(ascending order) is used. For a definition of the COLLATE clause and collation
functions, see COLLATE.

The LIMIT clause places an upper bound on the number of rows returned in the
result. A negative LIMIT indicates no upper bound. The optional OFFSET following
LIMIT specifies how many rows to skip at the beginning of the result set. In a
compound SELECT query, the LIMIT clause may only appear after the final SELECT
statement, and the limit is applied to the entire query. Note that if the OFFSET
keyword is used in the LIMIT clause, then the limit is the first integer and the
offset is the second integer. If a comma is used instead of the OFFSET keyword,
then the offset is the first number and the limit is the second number. This
seeming contradiction is intentional — it maximizes compatibility with legacy
SQL database systems.

A compound SELECT is formed from two or more simple SELECT statements connected
by one of the operators UNION, UNION ALL, INTERSECT, or EXCEPT. In a compound
SELECT, all the constituent SELECT statements must specify the same number of
result columns. There can only be a single ORDER BY clause after the final
SELECT statement (and before the single LIMIT clause, if one is specified). The
UNION and UNION ALL operators combine the results of the preceding and following
SELECT statements into a single table. The difference is that in UNION, all
result rows are distinct, but in UNION ALL, there may be duplicates. The
INTERSECT operator takes the intersection of the results of the preceding and
following SELECT statements. EXCEPT takes the result of preceding SELECT after
removing the results of the following SELECT. When three or more SELECT
statements are connected into a compound, they group from first to last.

For a definition of permitted expressions, see Expressions.

Starting with AIR 2.5, the SQL CAST operator is supported when reading to
convert BLOB data to ActionScript ByteArray objects. For example, the following
code reads raw data that is not stored in the AMF format and stores it in a
ByteArray object:

    stmt.text = "SELECT CAST(data AS ByteArray) AS data FROM pictures;";
    stmt.execute();
    var result:SQLResult = stmt.getResult();
    var bytes:ByteArray = result.data[0].data;

#### INSERT

The INSERT statement comes in two basic forms and is used to populate tables
with data.

    sql-statement  ::=  INSERT [OR conflict-algorithm] INTO [database-name.] table-name [(column-list)] VALUES (value-list) |
                    INSERT [OR conflict-algorithm] INTO [database-name.] table-name [(column-list)] select-statement
                    REPLACE INTO [database-name.] table-name [(column-list)] VALUES (value-list) |
                    REPLACE INTO [database-name.] table-name [(column-list)] select-statement

The first form (with the VALUES keyword) creates a single new row in an existing
table. If no column-list is specified then the number of values must be the same
as the number of columns in the table. If a column-list is specified, then the
number of values must match the number of specified columns. Columns of the
table that do not appear in the column list are filled with the default value
defined when the table is created, or with NULL if no default value is defined.

The second form of the INSERT statement takes its data from a SELECT statement.
The number of columns in the result of the SELECT must exactly match the number
of columns in the table if column-list is not specified, or it must match the
number of columns named in the column-list. A new entry is made in the table for
every row of the SELECT result. The SELECT may be simple or compound. For a
definition of allowable SELECT statements, see SELECT.

The optional conflict-algorithm allows the specification of an alternative
constraint conflict resolution algorithm to use during this one command. For an
explanation and definition of conflict algorithms, see
[Special statements and clauses](#special-statements-and-clauses).

The two REPLACE INTO forms of the statement are equivalent to using the standard
INSERT \[OR conflict-algorithm\] form with the REPLACE conflict algorithm (i.e.
the INSERT OR REPLACE... form).

The two REPLACE INTO forms of the statement are equivalent to using the standard
INSERT \[OR conflict-algorithm\] form with the REPLACE conflict algorithm (i.e.
the INSERT OR REPLACE... form).

#### UPDATE

The update command changes the existing records in a table.

    sql-statement  ::=  UPDATE [database-name.] table-name SET column1=value1, column2=value2,... [WHERE expr]

The command consists of the UPDATE keyword followed by the name of the table in
which you want to update the records. After the SET keyword, provide the name of
the column and the value to which the column to be changed as a comma-separated
list. The WHERE clause expression provides the row or rows in which the records
are updated.

#### DELETE

The delete command is used to remove records from a table.

    sql-statement  ::=  DELETE FROM [database-name.] table-name [WHERE expr]

The command consists of the DELETE FROM keywords followed by the name of the
table from which records are to be removed.

Without a WHERE clause, all rows of the table are removed. If a WHERE clause is
supplied, then only those rows that match the expression are removed. The WHERE
clause expression must resolve to a boolean value. For a definition of permitted
expressions, see Expressions.

## Data definition statements

Data definition statements are used to create, modify, and remove database
objects such as tables, views, indices, and triggers. The following data
definition statements are supported:

- Tables:

  - CREATE TABLE

  - ALTER TABLE

  - DROP TABLE

- Indices:

  - CREATE INDEX

  - DROP INDEX

- Views:

  - CREATE VIEWS

  - DROP VIEWS

- Triggers:

  - CREATE TRIGGERS

  - DROP TRIGGERS

#### CREATE TABLE

A CREATE TABLE statement consists of the keywords CREATE TABLE followed by the
name of the new table, then (in parentheses) a list of column definitions and
constraints. The table name can be either an identifier or a string.

    sql-statement       ::=  CREATE [TEMP | TEMPORARY] TABLE [IF NOT EXISTS] [database-name.] table-name
                         ( column-def [, column-def]* [, constraint]* )
    sql-statement       ::=  CREATE [TEMP | TEMPORARY] TABLE [database-name.] table-name AS select-statement
    column-def          ::=  name [type] [[CONSTRAINT name] column-constraint]*
    type                ::=  typename | typename ( number ) | typename ( number , number )
    column-constraint   ::=  NOT NULL [ conflict-clause ] |
                         PRIMARY KEY [sort-order] [ conflict-clause ] [AUTOINCREMENT] |
                         UNIQUE [conflict-clause] |
                         CHECK ( expr ) |
                         DEFAULT default-value |
                         COLLATE collation-name
    constraint          ::=  PRIMARY KEY ( column-list ) [conflict-clause] |
                         UNIQUE ( column-list ) [conflict-clause] |
                         CHECK ( expr )
    conflict-clause     ::=  ON CONFLICT conflict-algorithm
    conflict-algorithm  ::=  ROLLBACK | ABORT | FAIL | IGNORE | REPLACE
    default-value       ::=  NULL | string | number | CURRENT_TIME | CURRENT_DATE | CURRENT_TIMESTAMP
    sort-order          ::=  ASC | DESC
    collation-name      ::=  BINARY | NOCASE
    column-list         ::=  column-name [, column-name]*

Each column definition is the name of the column followed by the data type for
that column, then one or more optional column constraints. The data type for the
column restricts what data may be stored in that column. If an attempt is made
to store a value in a column with a different data type, the runtime converts
the value to the appropriate type if possible, or raises an error. See the Data
type support section for additional information.

The NOT NULL column constraint indicates that the column cannot contain NULL
values.

A UNIQUE constraint causes an index to be created on the specified column or
columns. This index must contain unique keys—no two rows may contain duplicate
values or combinations of values for the specified column or columns. A CREATE
TABLE statement can have multiple UNIQUE constraints, including multiple columns
with a UNIQUE constraint in the column's definition and/or multiple table-level
UNIQUE constraints.

A CHECK constraint defines an expression that is evaluated and must be true in
order for a row's data to be inserted or updated. The CHECK expression must
resolve to a boolean value.

A COLLATE clause in a column definition specifies what text collation function
to use when comparing text entries for the column. The BINARY collating function
is used by default. For details on the COLLATE clause and collation functions,
see COLLATE.

The DEFAULT constraint specifies a default value to use when doing an INSERT.
The value may be NULL, a string constant, or a number. The default value may
also be one of the special case-independent keywords CURRENT_TIME, CURRENT_DATE
or CURRENT_TIMESTAMP. If the value is NULL, a string constant, or a number, it
is literally inserted into the column whenever an INSERT statement does not
specify a value for the column. If the value is CURRENT_TIME, CURRENT_DATE or
CURRENT_TIMESTAMP, then the current UTC date and/or time is inserted into the
column. For CURRENT_TIME, the format is HH:MM:SS. For CURRENT_DATE, the format
is YYYY-MM-DD. The format for CURRENT_TIMESTAMP is YYYY-MM-DD HH:MM:SS.

Specifying a PRIMARY KEY normally just creates a UNIQUE index on the
corresponding column or columns. However, if the PRIMARY KEY constraint is on a
single column that has the data type INTEGER (or one of its synonyms such as
int) then that column is used by the database as the actual primary key for the
table. This means that the column may only hold unique integer values. (Note
that in many SQLite implementations, only the column type INTEGER causes the
column to serve as the internal primary key, but in Adobe AIR synonyms for
INTEGER such as int also specify that behavior.)

If a table does not have an INTEGER PRIMARY KEY column, an integer key is
automatically generated when a row is inserted. The primary key for a row can
always be accessed using one of the special names ROWID, OID, or \_ROWID\_.
These names can be used regardless of whether it is an explicitly declared
INTEGER PRIMARY KEY or an internal generated value. However, if the table has an
explicit INTEGER PRIMARY KEY, the name of the column in the result data is the
actual column name rather than the special name.

An INTEGER PRIMARY KEY column can also include the keyword AUTOINCREMENT. When
the AUTOINCREMENT keyword is used, the database automatically generates and
inserts a sequentially incremented integer key in the INTEGER PRIMARY KEY column
when it executes an INSERT statement that doesn't specify an explicit value for
the column.

There can only be one PRIMARY KEY constraint in a CREATE TABLE statement. It can
either be part of one column's definition or one single table-level PRIMARY KEY
constraint. A primary key column is implicitly NOT NULL.

The optional conflict-clause following many constraints allows the specification
of an alternative default constraint conflict resolution algorithm for that
constraint. The default is ABORT. Different constraints within the same table
may have different default conflict resolution algorithms. If an INSERT or
UPDATE statement specifies a different conflict resolution algorithm, that
algorithm is used in place of the algorithm specified in the CREATE TABLE
statement. See the ON CONFLICT section of
[Special statements and clauses](#special-statements-and-clauses) for additional
information.

Additional constraints, such as FOREIGN KEY constraints, do not result in an
error but the runtime ignores them.

If the TEMP or TEMPORARY keyword occurs between CREATE and TABLE then the table
that is created is only visible within the same database connection
(SQLConnection instance). It is automatically deleted when the database
connection is closed. Any indices created on a temporary table are also
temporary. Temporary tables and indices are stored in a separate file distinct
from the main database file.

If the optional database-name prefix is specified, then the table is created in
a named database (a database that was connected to the SQLConnection instance by
calling the attach() method with the specified database name). It is an error to
specify both a database-name prefix and the TEMP keyword, unless the
database-name prefix is temp. If no database name is specified, and the TEMP
keyword is not present, the table is created in the main database (the database
that was connected to the SQLConnection instance using the open() or
openAsync()method).

There are no arbitrary limits on the number of columns or on the number of
constraints in a table. There is also no arbitrary limit on the amount of data
in a row.

The CREATE TABLE AS form defines the table as the result set of a query. The
names of the table columns are the names of the columns in the result.

If the optional IF NOT EXISTS clause is present and another table with the same
name already exists, then the database ignores the CREATE TABLE command.

A table can be removed using the DROP TABLE statement, and limited changes can
be made using the ALTER TABLE statement.

#### ALTER TABLE

The ALTER TABLE command allows the user to rename or add a new column to an
existing table. It is not possible to remove a column from a table.

    sql-statement ::= ALTER TABLE [database-name.] table-name alteration
    alteration    ::= RENAME TO new-table-name
    alteration    ::= ADD [COLUMN] column-def

The RENAME TO syntax is used to rename the table identified by
\[database-name.\] table-name to new-table-name. This command cannot be used to
move a table between attached databases, only to rename a table within the same
database.

If the table being renamed has triggers or indices, then they remain attached to
the table after it has been renamed. However, if there are any view definitions
or statements executed by triggers that refer to the table being renamed, they
are not automatically modified to use the new table name. If a renamed table has
associated views or triggers, you must manually drop and recreate the triggers
or view definitions using the new table name.

The ADD \[COLUMN\] syntax is used to add a new column to an existing table. The
new column is always appended to the end of the list of existing columns. The
column-def clause may take any of the forms permissible in a CREATE TABLE
statement, with the following restrictions:

- The column may not have a PRIMARY KEY or UNIQUE constraint.

- The column may not have a default value of CURRENT_TIME, CURRENT_DATE or
  CURRENT_TIMESTAMP.

- If a NOT NULL constraint is specified, the column must have a default value
  other than NULL.

The execution time of the ALTER TABLE statement is not affected by the amount of
data in the table.

#### DROP TABLE

The DROP TABLE statement removes a table added with a CREATE TABLE statement.
The table with the specified table-name is the table that's dropped. It is
completely removed from the database and the disk file. The table cannot be
recovered. All indices associated with the table are also deleted.

    sql-statement  ::=  DROP TABLE [IF EXISTS] [database-name.] table-name

By default the DROP TABLE statement does not reduce the size of the database
file. Empty space in the database is retained and used in subsequent INSERT
operations. To remove free space in the database use the SQLConnection.clean()
method. If the autoClean parameter is set to true when the database is initially
created, the space is freed automatically.

The optional IF EXISTS clause suppresses the error that would normally result if
the table does not exist.

#### CREATE INDEX

The CREATE INDEX command consists of the keywords CREATE INDEX followed by the
name of the new index, the keyword ON, the name of a previously created table
that is to be indexed, and a parenthesized list of names of columns in the table
whose values are used for the index key.

    sql-statement  ::=  CREATE [UNIQUE] INDEX [IF NOT EXISTS] [database-name.] index-name
                    ON table-name ( column-name [, column-name]* )
    column-name    ::=  name [COLLATE collation-name] [ASC | DESC]

Each column name can be followed by ASC or DESC keywords to indicate sort order,
but the sort order designation is ignored by the runtime. Sorting is always done
in ascending order.

The COLLATE clause following each column name defines a collating sequence used
for text values in that column. The default collation sequence is the collation
sequence defined for that column in the CREATE TABLE statement. If no collation
sequence is specified, the BINARY collation sequence is used. For a definition
of the COLLATE clause and collation functions see COLLATE.

There are no arbitrary limits on the number of indices that can be attached to a
single table. There are also no limits on the number of columns in an index.

#### DROP INDEX

The drop index statement removes an index added with the CREATE INDEX statement.
The specified index is completely removed from the database file. The only way
to recover the index is to reenter the appropriate CREATE INDEX command.

    sql-statement ::= DROP INDEX [IF EXISTS] [database-name.] index-name

By default the DROP INDEX statement does not reduce the size of the database
file. Empty space in the database is retained and used in subsequent INSERT
operations. To remove free space in the database use the SQLConnection.clean()
method. If the autoClean parameter is set to true when the database is initially
created, the space is freed automatically.

#### CREATE VIEW

The CREATE VIEW command assigns a name to a pre-defined SELECT statement. This
new name can then be used in a FROM clause of another SELECT statement in place
of a table name. Views are commonly used to simplify queries by combining a
complex (and frequently used) set of data into a structure that can be used in
other operations.

    sql-statement ::= CREATE [TEMP | TEMPORARY] VIEW [IF NOT EXISTS] [database-name.] view-name AS select-statement

If the TEMP or TEMPORARY keyword occurs in between CREATE and VIEW then the view
that is created is only visible to the SQLConnection instance that opened the
database and is automatically deleted when the database is closed.

If a \[database-name\] is specified the view is created in the named database (a
database that was connected to the SQLConnection instance using the attach()
method, with the specified name argument. It is an error to specify both a
\[database-name\] and the TEMP keyword unless the \[database-name\] is temp. If
no database name is specified, and the TEMP keyword is not present, the view is
created in the main database (the database that was connected to the
SQLConnection instance using the open() or openAsync() method).

Views are read only. A DELETE, INSERT, or UPDATE statement cannot be used on a
view, unless at least one trigger of the associated type (INSTEAD OF DELETE,
INSTEAD OF INSERT, INSTEAD OF UPDATE) is defined. For information on creating a
trigger for a view, see CREATE TRIGGER.

A view is removed from a database using the DROP VIEW statement.

#### DROP VIEW

The DROP VIEW statement removes a view created by a CREATE VIEW statement.

    sql-statement ::= DROP VIEW [IF EXISTS] view-name

The specified view-name is the name of the view to drop. It is removed from the
database, but no data in the underlying tables is modified.

#### CREATE TRIGGER

The create trigger statement is used to add triggers to the database schema. A
trigger is a database operation (the trigger-action) that is automatically
performed when a specified database event (the database-event) occurs.

    sql-statement   ::=  CREATE [TEMP | TEMPORARY] TRIGGER [IF NOT EXISTS] [database-name.] trigger-name
                     [BEFORE | AFTER] database-event
                     ON table-name
                     trigger-action
    sql-statement   ::=  CREATE [TEMP | TEMPORARY] TRIGGER [IF NOT EXISTS] [database-name.] trigger-name
                     INSTEAD OF database-event
                     ON view-name
                     trigger-action
    database-event  ::=  DELETE |
                     INSERT |
                     UPDATE |
                     UPDATE OF column-list
    trigger-action  ::=  [FOR EACH ROW] [WHEN expr]
                     BEGIN
                       trigger-step ;
                       [ trigger-step ; ]*
                     END
    trigger-step    ::=  update-statement |
                     insert-statement |
                     delete-statement |
                     select-statement
    column-list     ::=  column-name [, column-name]*

A trigger is specified to fire whenever a DELETE, INSERT, or UPDATE of a
particular database table occurs, or whenever an UPDATE of one or more specified
columns of a table are updated. Triggers are permanent unless the TEMP or
TEMPORARY keyword is used. In that case the trigger is removed when the
SQLConnection instance's main database connection is closed. If no timing is
specified (BEFORE or AFTER) the trigger defaults to BEFORE.

Only FOR EACH ROW triggers are supported, so the FOR EACH ROW text is optional.
With a FOR EACH ROW trigger, the trigger-step statements are executed for each
database row being inserted, updated or deleted by the statement causing the
trigger to fire, if the WHEN clause expression evaluates to true.

If a WHEN clause is supplied, the SQL statements specified as trigger-steps are
only executed for rows for which the WHEN clause is true. If no WHEN clause is
supplied, the SQL statements are executed for all rows.

Within the body of a trigger, (the trigger-action clause) the pre-change and
post-change values of the affected table are available using the special table
names OLD and NEW. The structure of the OLD and NEW tables matches the structure
of the table on which the trigger is created. The OLD table contains any rows
that are modified or deleted by the triggering statement, in their state before
the triggering statement's operations. The NEW table contains any rows that are
modified or created by the triggering statement, in their state after the
triggering statement's operations. Both the WHEN clause and the trigger-step
statements can access values from the row being inserted, deleted or updated
using references of the form NEW.column-name and OLD.column-name, where
column-name is the name of a column from the table with which the trigger is
associated. The availability of the OLD and NEW table references depends on the
type of database-event the trigger handles:

- INSERT – NEW references are valid

- UPDATE – NEW and OLD references are valid

- DELETE – OLD references are valid

The specified timing (BEFORE, AFTER, or INSTEAD OF) determines when the
trigger-step statements are executed relative to the insertion, modification or
removal of the associated row. An ON CONFLICT clause may be specified as part of
an UPDATE or INSERT statement in a trigger-step. However, if an ON CONFLICT
clause is specified as part of the statement causing the trigger to fire, then
that conflict handling policy is used instead.

In addition to table triggers, an INSTEAD OF trigger can be created on a view.
If one or more INSTEAD OF INSERT, INSTEAD OF DELETE, or INSTEAD OF UPDATE
triggers are defined on a view, it is not considered an error to execute the
associated type of statement (INSERT, DELETE, or UPDATE) on the view. In that
case, executing an INSERT, DELETE or UPDATE on the view causes the associated
triggers to fire. Because the trigger is an INSTEAD OF trigger, the tables
underlying the view are not modified by the statement that causes the trigger to
fire. However, the triggers can be used to perform modifying operations on the
underlying tables.

There is an important issue to keep in mind when creating a trigger on a table
with an INTEGER PRIMARY KEY column. If a BEFORE trigger modifies the INTEGER
PRIMARY KEY column of a row that is to be updated by the statement that causes
the trigger to fire, the update doesn't occur. A workaround is to create the
table with a PRIMARY KEY column instead of an INTEGER PRIMARY KEY column.

A trigger can be removed using the DROP TRIGGER statement. When a table or view
is dropped, all triggers associated with that table or view are automatically
dropped as well.

#### RAISE () function

A special SQL function RAISE() can be used in a trigger-step statement of a
trigger. This function has the following syntax:

    raise-function  ::=  RAISE ( ABORT, error-message ) |
                     RAISE ( FAIL, error-message ) |
                     RAISE ( ROLLBACK, error-message ) |
                     RAISE ( IGNORE )

When one of the first three forms is called during trigger execution, the
specified ON CONFLICT processing action (ABORT, FAIL, or ROLLBACK) is performed
and the current statement's execution ends. The ROLLBACK is considered a
statement execution failure, so the SQLStatement instance whose execute() method
was being carried out dispatches an error (SQLErrorEvent.ERROR) event. The
SQLError object in the dispatched event object's error property has its details
property set to the error-message specified in the RAISE() function.

When RAISE(IGNORE) is called, the remainder of the current trigger, the
statement that caused the trigger to execute, and any subsequent triggers that
would have been executed are abandoned. No database changes are rolled back. If
the statement that caused the trigger to execute is itself part of a trigger,
that trigger program resumes execution at the beginning of the next step. For
more information about the conflict resolution algorithms, see the section ON
CONFLICT (conflict algorithms).

#### DROP TRIGGER

The DROP TRIGGER statement removes a trigger created by the CREATE TRIGGER
statement.

    sql-statement  ::=  DROP TRIGGER [IF EXISTS] [database-name.] trigger-name

The trigger is deleted from the database. Note that triggers are automatically
dropped when their associated table is dropped.

## Special statements and clauses

This section describes several clauses that are extensions to SQL provided by
the runtime, as well as two language elements that can be used in many
statements, comments and expressions.

#### COLLATE

The COLLATE clause is used in SELECT, CREATE TABLE, and CREATE INDEX statements
to specify the comparison algorithm that is used when comparing or sorting
values.

    sql-statement   ::=  COLLATE collation-name
    collation-name  ::=  BINARY | NOCASE

The default collation type for columns is BINARY. When BINARY collation is used
with values of the TEXT storage class, binary collation is performed by
comparing the bytes in memory that represent the value regardless of the text
encoding.

The NOCASE collation sequence is only applied for values of the TEXT storage
class. When used, the NOCASE collation performs a case-insensitive comparison.

No collation sequence is used for storage classes of type NULL, BLOB, INTEGER,
or REAL.

To use a collation type other than BINARY with a column, a COLLATE clause must
be specified as part of the column definition in the CREATE TABLE statement.
Whenever two TEXT values are compared, a collation sequence is used to determine
the results of the comparison according to the following rules:

- For binary comparison operators, if either operand is a column, then the
  default collation type of the column determines the collation sequence that is
  used for the comparison. If both operands are columns, then the collation type
  for the left operand determines the collation sequence used. If neither
  operand is a column, then the BINARY collation sequence is used.

- The BETWEEN...AND operator is equivalent to using two expressions with the \>=
  and \<= operators. For example, the expression x BETWEEN y AND z is equivalent
  to x \>= y AND x \<= z. Consequently, the BETWEEN...AND operator follows the
  preceding rule to determine the collation sequence.

- The IN operator behaves like the =operator for the purposes of determining the
  collation sequence to use. For example, the collation sequence used for the
  expressionx IN (y, z) is the default collation type of x if x is a column.
  Otherwise, BINARY collation is used.

- An ORDER BY clause that is part of a SELECT statement may be explicitly
  assigned a collation sequence to be used for the sort operation. In that case
  the explicit collation sequence is always used. Otherwise, if the expression
  sorted by an ORDER BYclause is a column, the default collation type of the
  column is used to determine sort order. If the expression is not a column, the
  BINARY collation sequence is used.

#### EXPLAIN

The EXPLAIN command modifier is a non-standard extension to SQL.

    sql-statement  ::=  EXPLAIN sql-statement

If the EXPLAIN keyword appears before any other SQL statement, then instead of
actually executing the command, the result reports the sequence of virtual
machine instructions it would have used to execute the command, had the EXPLAIN
keyword not been present. The EXPLAIN feature is an advanced feature and allows
developers to change SQL statement text in an attempt to optimize performance or
debug a statement that doesn't appear to be working properly.

#### ON CONFLICT (conflict algorithms)

The ON CONFLICT clause is not a separate SQL command. It is a non-standard
clause that can appear in many other SQL commands.

    conflict-clause     ::=  ON CONFLICT conflict-algorithm
    conflict-clause     ::=  OR conflict-algorithm
    conflict-algorithm  ::=  ROLLBACK |
                         ABORT |
                         FAIL |
                         IGNORE |
                         REPLACE

The first form of the ON CONFLICT clause, using the keywords ON CONFLICT, is
used in a CREATE TABLE statement. For an INSERT or UPDATE statement, the second
form is used, with ON CONFLICT replaced by OR to make the syntax seem more
natural. For example, instead of INSERT ON CONFLICT IGNORE, the statement
becomes INSERT OR IGNORE. Although the keywords are different, the meaning of
the clause is the same in either form.

The ON CONFLICT clause specifies the algorithm that is used to resolve
constraint conflicts. The five algorithms are ROLLBACK, ABORT, FAIL, IGNORE, and
REPLACE. The default algorithm is ABORT. The following is an explanation of the
five conflict algorithms:

ROLLBACK  
When a constraint violation occurs, an immediate ROLLBACK occurs, ending the
current transaction. The command aborts and the SQLStatement instance dispatches
an error event. If no transaction is active (other than the implied transaction
that is created on every command) then this algorithm works the same as ABORT.

ABORT  
When a constraint violation occurs, the command backs out any prior changes it
might have made and the SQLStatement instance dispatches an error event. No
ROLLBACK is executed, so changes from prior commands within a transaction are
preserved. ABORT is the default behavior.

FAIL  
When a constraint violation occurs, the command aborts and the SQLStatement
dispatches an error event. However, any changes to the database that the
statement made before encountering the constraint violation are preserved and
are not backed out. For example, if an UPDATE statement encounters a constraint
violation on the 100th row that it attempts to update, then the first 99 row
changes are preserved but changes to rows 100 and beyond don’t occur.

IGNORE  
When a constraint violation occurs, the one row that contains the constraint
violation is not inserted or changed. Aside from this row being ignored, the
command continues executing normally. Other rows before and after the row that
contained the constraint violation continue to be inserted or updated normally.
No error is returned.

REPLACE  
When a UNIQUE constraint violation occurs, the pre-existing rows that are
causing the constraint violation are removed before inserting or updating the
current row. Consequently, the insert or update always occurs, and the command
continues executing normally. No error is returned. If a NOT NULL constraint
violation occurs, the NULL value is replaced by the default value for that
column. If the column has no default value, then the ABORT algorithm is used. If
a CHECK constraint violation occurs then the IGNORE algorithm is used. When this
conflict resolution strategy deletes rows in order to satisfy a constraint, it
does not invoke delete triggers on those rows.

The algorithm specified in the OR clause of an INSERT or UPDATE statement
overrides any algorithm specified in a CREATE TABLE statement. If no algorithm
is specified in the CREATE TABLE statement or the executing INSERT or UPDATE
statement, the ABORT algorithm is used.

#### REINDEX

The REINDEX command is used to delete and re-create one or more indices. This
command is useful when the definition of a collation sequence has changed.

    sql-statement  ::=  REINDEX collation-name
    sql-statement  ::=  REINDEX [database-name .] ( table-name | index-name )

In the first form, all indices in all attached databases that use the named
collation sequence are recreated. In the second form, when a table-name is
specified, all indices associated with the table are rebuilt. If an index-name
is given, only the specified index is deleted and recreated.

#### COMMENTS

Comments aren't SQL commands, but they can occur in SQL queries. They are
treated as white space by the runtime. They can begin anywhere white space can
be found, including inside expressions that span multiple lines.

    comment             ::=  single-line-comment |
                         block-comment
    single-line-comment ::=  -- single-line
    block-comment       ::=  /* multiple-lines or block [*/]

A single-line comment is indicated by two dashes. A single line comment only
extends to the end of the current line.

Block comments can span any number of lines, or be embedded within a single
line. If there is no terminating delimiter, a block comment extends to the end
of the input. This situation is not treated as an error. A new SQL statement can
begin on a line after a block comment ends. Block comments can be embedded
anywhere white space can occur, including inside expressions, and in the middle
of other SQL statements. Block comments do not nest. Single-line comments inside
a block comment are ignored.

#### EXPRESSIONS

Expressions are subcommands within other SQL blocks. The following describes the
valid syntax for an expression within a SQL statement:

    expr            ::=  expr binary-op expr |
                     expr [NOT] like-op expr [ESCAPE expr] |
                     unary-op expr |
                     ( expr ) |
                     column-name |
                     table-name.column-name |
                     database-name.table-name.column-name |
                     literal-value |
                     parameter |
                     function-name( expr-list | * ) |
                     expr ISNULL |
                     expr NOTNULL |
                     expr [NOT] BETWEEN expr AND expr |
                     expr [NOT] IN ( value-list ) |
                     expr [NOT] IN ( select-statement ) |
                     expr [NOT] IN [database-name.] table-name |
                     [EXISTS] ( select-statement ) |
                     CASE [expr] ( WHEN expr THEN expr )+ [ELSE expr] END |
                     CAST ( expr AS type ) |
                     expr COLLATE collation-name
    like-op         ::=  LIKE | GLOB
    binary-op       ::=  see Operators
    unary-op        ::=  see Operators
    parameter       ::=  :param-name | @param-name | ?
    value-list      ::=  literal-value [, literal-value]*
    literal-value   ::=  literal-string | literal-number | literal-boolean | literal-blob | literal-null
    literal-string  ::=  'string value'
    literal-number  ::=  integer | number
    literal-boolean  ::=  true | false
    literal-blob  ::=  X'string of hexadecimal data'
    literal-null  ::=  NULL

An expression is any combination of values and operators that can be resolved to
a single value. Expressions can be divided into two general types, according to
whether they resolve to a boolean (true or false) value or whether they resolve
to a non-boolean value.

In several common situations, including in a WHERE clause, a HAVING clause, the
ON expression in a JOIN clause, and a CHECK expression, the expression must
resolve to a boolean value. The following types of expressions meet this
condition:

- ISNULL

- NOTNULL

- IN ()

- EXISTS ()

- LIKE

- GLOB

- Certain functions

- Certain operators (specifically comparison operators)

#### Literal values

A literal numeric value is written as an integer number or a floating point
number. Scientific notation is supported. The . (period) character is always
used as the decimal point.

A string literal is indicated by enclosing the string in single quotes '. To
include a single quote within a string, put two single quotes in a row like this
example: ''.

A boolean literal is indicated by the value true or false. Literal boolean
values are used with the Boolean column data type.

A BLOB literal is a string literal containing hexadecimal data and proceeded by
a single x or X character, such as X'53514697465'.

A literal value can also be the token NULL.

#### Column name

A column name can be any of the names defined in the CREATE TABLE statement or
one of the following special identifiers: ROWID, OID, or \_ROWID\_. These
special identifiers all describe the unique random integer key (the "row key")
associated with every row of every table. The special identifiers only refer to
the row key if the CREATE TABLE statement does not define a real column with the
same name. Row keys behave as read-only columns. A row key can be used anywhere
a regular column can be used, except that you cannot change the value of a row
key in an UPDATE or INSERT statement. The SELECT \* FROM table statement does
not include the row key in its result set.

#### SELECT statement

A SELECT statement can appear in an expression as either the right-hand operand
of the IN operator, as a scalar quantity (a single result value), or as the
operand of an EXISTS operator. When used as a scalar quantity or the operand of
an IN operator, the SELECT can only have a single column in its result. A
compound SELECT statement (connected with keywords like UNION or EXCEPT) is
allowed. With the EXISTS operator, the columns in the result set of the SELECT
are ignored and the expression returns TRUE if one or more rows exist and FALSE
if the result set is empty. If no terms in the SELECT expression refer to the
value in the containing query, then the expression is evaluated once before any
other processing and the result is reused as necessary. If the SELECT expression
does contain variables from the outer query, known as a correlated subquery,
then the SELECT is re-evaluated every time it is needed.

When a SELECT is the right operand of the IN operator, the IN operator returns
TRUE if the result of the left operand is equal to any of the values in the
SELECT statement's result set. The IN operator may be preceded by the NOT
keyword to invert the sense of the test.

When a SELECT appears within an expression but is not the right operand of an IN
operator, then the first row of the result of the SELECT becomes the value used
in the expression. If the SELECT yields more than one result row, all rows after
the first are ignored. If the SELECT yields no rows, then the value of the
SELECT is NULL.

#### CAST expression

A CAST expression changes the data type of the value specified to the one given.
The type specified can be any non-empty type name that is valid for the type in
a column definition of a CREATE TABLE statement. See Data type support for
details.

#### Additional expression elements

The following SQL elements can also be used in expressions:

- Built-in functions: Aggregate functions, Scalar functions, and Date and time
  formatting functions

- Operators

- Parameters

## Built-in functions

The built-in functions fall into three main categories:

- Aggregate functions

- Scalar functions

- Date and time functions

In addition to these functions, there is a special function RAISE() that is used
to provide notification of an error in the execution of a trigger. This function
can only be used within the body of a CREATE TRIGGER statement. For information
on the RAISE() function, see CREATE TRIGGER \> RAISE().

Like all keywords in SQL, function names are not case sensitive.

#### Aggregate functions

Aggregate functions perform operations on values from multiple rows. These
functions are primarily used in SELECT statements in conjunction with the GROUP
BY clause.

<table>
<tbody>
	<tr>
		<td><p>AVG(X)</p></td>
		<td><p>Returns the average value of all non-NULL X within a group.
		String and BLOB values that do not look like numbers are interpreted as
		0. The result of AVG() is always a floating point value even if all
		inputs are integers.</p></td>
	</tr>
	<tr>
		<td><p>COUNT(X) COUNT(*)</p></td>
		<td><p>The first form returns a count of the number of times that X is
		not NULL in a group. The second form (with the * argument) returns the
		total number of rows in the group.</p></td>
	</tr>
	<tr>
		<td><p>MAX(X)</p></td>
		<td><p>Returns the maximum value of all values in the group. The usual
		sort order is used to determine the maximum.</p></td>
	</tr>
	<tr>
		<td><p>MIN(X)</p></td>
		<td><p>Returns the minimum non-NULL value of all values in the group.
		The usual sort order is used to determine the minimum. If all values in
		the group are NULL, NULL is returned.</p></td>
	</tr>
	<tr>
		<td><p>SUM(X)</p>
		<p>TOTAL(X)</p></td>
		<td><p>Returns the numeric sum of all non-NULL values in the group. If
		all of the values are NULL then SUM() returns NULL, and TOTAL() returns
		0.0. The result of TOTAL() is always a floating point value. The result
		of SUM() is an integer value if all non-NULL inputs are integers. If any
		input to SUM() is not an integer and not NULL then SUM() returns a
		floating point value. This value might be an approximation to the true
		sum.</p></td>
	</tr>
</tbody>
</table>

In any of the preceding aggregate functions that take a single argument, that
argument can be preceded by the keyword DISTINCT. In that case, duplicate
elements are filtered before being passed into the aggregate function. For
example, the function call COUNT(DISTINCT x) returns the number of distinct
values of column X instead of the total number of non-NULL values in column x.

#### Scalar functions

Scalar functions operate on values one row at a time.

|                      |                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ABS(X)               | Returns the absolute value of argument X.                                                                                                                                                                                                                                                                                                           |
| COALESCE(X, Y, ...)  | Returns a copy of the first non-NULL argument. If all arguments are NULL then NULL is returned. There must be at least two arguments.                                                                                                                                                                                                               |
| GLOB(X, Y)           | This function is used to implement the X GLOB Y syntax.                                                                                                                                                                                                                                                                                             |
| IFNULL(X, Y)         | Returns a copy of the first non-NULL argument. If both arguments are NULL then NULL is returned. This function behaves the same as COALESCE().                                                                                                                                                                                                      |
| HEX(X)               | The argument is interpreted as a value of the BLOB storage type. The result is a hexadecimal rendering of the content of that value.                                                                                                                                                                                                                |
| LAST_INSERT_ROWID()  | Returns the row identifier (generated primary key) of the last row inserted to the database through the current SQLConnection. This value is the same as the value returned by the [SQLConnection.lastInsertRowID](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/data/SQLConnection.html#lastInsertRowID) property.     |
| LENGTH(X)            | Returns the string length of X in characters.                                                                                                                                                                                                                                                                                                       |
| LIKE(X, Y \[, Z\])   | This function is used to implement the X LIKE Y \[ESCAPE Z\] syntax of SQL. If the optional ESCAPE clause is present, then the function is invoked with three arguments. Otherwise, it is invoked with two arguments only.                                                                                                                          |
| LOWER(X)             | Returns a copy of string X with all characters converted to lower case.                                                                                                                                                                                                                                                                             |
| LTRIM(X) LTRIM(X, Y) | Returns a string formed by removing spaces from the left side of X. If a Y argument is specified, the function removes any of the characters in Y from the left side of X.                                                                                                                                                                          |
| MAX(X, Y, ...)       | Returns the argument with the maximum value. Arguments may be strings in addition to numbers. The maximum value is determined by the defined sort order. Note that MAX() is a simple function when it has 2 or more arguments but is an aggregate function when it has a single argument.                                                           |
| MIN(X, Y, ...)       | Returns the argument with the minimum value. Arguments may be strings in addition to numbers. The minimum value is determined by the defined sort order. Note that MIN() is a simple function when it has 2 or more arguments but is an aggregate function when it has a single argument.                                                           |
| NULLIF(X, Y)         | Returns the first argument if the arguments are different, otherwise returns NULL.                                                                                                                                                                                                                                                                  |
| QUOTE(X)             | This routine returns a string which is the value of its argument suitable for inclusion into another SQL statement. Strings are surrounded by single-quotes with escapes on interior quotes as needed. BLOB storage classes are encoded as hexadecimal literals. The function is useful when writing triggers to implement undo/redo functionality. |
| RANDOM(\*)           | Returns a pseudo-random integer between -9223372036854775808 and 9223372036854775807. This random value is not crypto-strong.                                                                                                                                                                                                                       |
| RANDOMBLOB(N)        | Returns an N-byte BLOB containing pseudo-random bytes. N should be a positive integer. This random value is not crypto-strong. If the value of N is negative a single byte is returned.                                                                                                                                                             |
| ROUND(X) ROUND(X, Y) | Rounds off the number X to Y digits to the right of the decimal point. If the Y argument is omitted, 0 is used.                                                                                                                                                                                                                                     |
| RTRIM(X) RTRIM(X, Y) | Returns a string formed by removing spaces from the right side of X. If a Y argument is specified, the function removes any of the characters in Y from the right side of X.                                                                                                                                                                        |
| SUBSTR(X, Y, Z)      | Returns a substring of input string X that begins with the Y-th character and which is Z characters long. The left-most character of X is index position 1. If Y is negative the first character of the substring is found by counting from the right rather than the left.                                                                         |
| TRIM(X) TRIM(X, Y)   | Returns a string formed by removing spaces from the right side of X. If a Y argument is specified, the function removes any of the characters in Y from the right side of X.                                                                                                                                                                        |
| TYPEOF(X)            | Returns the type of the expression X. The possible return values are 'null', 'integer', 'real', 'text', and 'blob'. For more information on data types see Data type support.                                                                                                                                                                       |
| UPPER(X)             | Returns a copy of input string X converted to all upper-case letters.                                                                                                                                                                                                                                                                               |
| ZEROBLOB(N)          | Returns a BLOB containing N bytes of 0x00.                                                                                                                                                                                                                                                                                                          |

#### Date and time formatting functions

The date and time formatting functions are a group of scalar functions that are
used to create formatted date and time data. Note that these functions operate
on and return string and number values. These functions are not intended to be
used with the DATE data type. If you use these functions on data in a column
whose declared data type is DATE, they do not behave as expected.

<table>
<tbody>
	<tr>
		<td><p>DATE(T, ...)</p></td>
		<td><p>The DATE() function returns a string containing the date in this
		format: YYYY-MM-DD. The first parameter (T) specifies a time string of
		the format found under Time formats. Any number of modifiers can be
		specified after the time string. The modifiers can be found under
		Modifiers.</p></td>
	</tr>
	<tr>
		<td><p>TIME(T, ...)</p></td>
		<td><p>The TIME() function returns a string containing the time as
		HH:MM:SS. The first parameter (T) specifies a time string of the format
		found under Time formats. Any number of modifiers can be specified after
		the time string. The modifiers can be found under Modifiers.</p></td>
	</tr>
	<tr>
		<td><p>DATETIME(T, ...)</p></td>
		<td><p>The DATETIME() function returns a string containing the date and
		time in YYYY-MM-DD HH:MM:SS format. The first parameter (T) specifies a
		time string of the format found under Time formats. Any number of
		modifiers can be specified after the time string. The modifiers can be
		found under Modifiers.</p></td>
	</tr>
	<tr>
		<td><p>JULIANDAY(T, ...)</p></td>
		<td><p>The JULIANDAY() function returns a number indicating the number
		of days since noon in Greenwich on November 24, 4714 B.C. and the
		provided date. The first parameter (T) specifies a time string of the
		format found under Time formats. Any number of modifiers can be
		specified after the time string. The modifiers can be found under
		Modifiers.</p></td>
	</tr>
	<tr>
		<td><p>STRFTIME(F, T, ...)</p></td>
		<td><p>The STRFTIME() routine returns the date formatted according to
		the format string specified as the first argument F. The format string
		supports the following substitutions:</p>
		<p>%d - day of month</p>
		<p>%f - fractional seconds SS.SSS</p>
		<p>%H - hour 00-24</p>
		<p>%j - day of year 001-366</p>
		<p>%J - Julian day number</p>
		<p>%m -month 01-12</p>
		<p>%M - minute 00-59</p>
		<p>%s - seconds since 1970-01-01</p>
		<p>%S - seconds 00-59</p>
		<p>%w - day of week 0-6 (sunday = 0)</p>
		<p>%W - week of year 00-53</p>
		<p>%Y - year 0000-9999</p>
		<p>%% - %</p>
		<p>The second parameter (T) specifies a time string of the format found
		under Time formats. Any number of modifiers can be specified after the
		time string. The modifiers can be found under Modifiers.</p></td>
	</tr>
</tbody>
</table>

#### Time formats

A time string can be in any of the following formats:

|                         |                                                      |
| ----------------------- | ---------------------------------------------------- |
| YYYY-MM-DD              | 2007-06-15                                           |
| YYYY-MM-DD HH:MM        | 2007-06-15 07:30                                     |
| YYYY-MM-DD HH:MM:SS     | 2007-06-15 07:30:59                                  |
| YYYY-MM-DD HH:MM:SS.SSS | 2007-06-15 07:30:59.152                              |
| YYYY-MM-DDTHH:MM        | 2007-06-15T07:30                                     |
| YYYY-MM-DDTHH:MM:SS     | 2007-06-15T07:30:59                                  |
| YYYY-MM-DDTHH:MM:SS.SSS | 2007-06-15T07:30:59.152                              |
| HH:MM                   | 07:30 (date is 2000-01-01)                           |
| HH:MM:SS                | 07:30:59 (date is 2000-01-01)                        |
| HH:MM:SS.SSS            | 07:30:59:152 (date is 2000-01-01)                    |
| now                     | Current date and time in Universal Coordinated Time. |
| DDDD.DDDD               | Julian day number as a floating-point number.        |

The character T in these formats is a literal character "T" separating the date
and the time. Formats that only include a time assume the date 2001-01-01.

#### Modifiers

The time string can be followed by zero or more modifiers that alter the date or
alter the interpretation of the date. The available modifiers are as follows:

|                  |                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- |
| NNN days         | Number of days to add to the time.                                                  |
| NNN hours        | Number of hours to add to the time.                                                 |
| NNN minutes      | Number of minutes to add to the time.                                               |
| NNN.NNNN seconds | Number of seconds and milliseconds to add to the time.                              |
| NNN months       | Number of months to add to the time.                                                |
| NNN years        | Number of years to add to the time.                                                 |
| start of month   | Shift time backwards to the start of the month.                                     |
| start of year    | Shift time backwards to the start of the year.                                      |
| start of day     | Shift time backwards to the start of the day.                                       |
| weekday N        | Forwards the time to the specified weekday. (0 = Sunday, 1 = Monday, and so forth). |
| localtime        | Converts the date to local time.                                                    |
| utc              | Converts the date to Universal Coordinated Time.                                    |

## Operators

SQL supports a large selection of operators, including common operators that
exist in most programming languages, as well as several operators that are
unique to SQL.

#### Common operators

The following binary operators are allowed in a SQL block and are listed in
order from highest to lowest precedence:

    *    /    %
    +    -
    << >> &     |
    < >=   > >=
    =    ==   !=   <> IN
    AND
    OR

Supported unary prefix operators are:

     !    ~    NOT

The COLLATE operator can be thought of as a unary postfix operator. The COLLATE
operator has the highest precedence. It always binds more tightly than any
prefix unary operator or any binary operator.

Note that there are two variations of the equals and not equals operators.
Equals can be either = or ==. The not-equals operator can be either != or \<\>.

The \|\| operator is the string concatenation operator—it joins together the two
strings of its operands.

The operator % outputs the remainder of its left operand modulo its right
operand.

The result of any binary operator is a numeric value, except for the \|\|
concatenation operator which gives a string result.

#### SQL operators

**LIKE**

The LIKE operator does a pattern matching comparison.

    expr     ::=  (column-name | expr) LIKE pattern
    pattern  ::=  '[ string | % | _ ]'

The operand to the right of the LIKE operator contains the pattern, and the
left-hand operand contains the string to match against the pattern. A percent
symbol (%) in the pattern is a wildcard character—it matches any sequence of
zero or more characters in the string. An underscore (\_) in the pattern matches
any single character in the string. Any other character matches itself or its
lower/upper case equivalent, that is, matches are performed in a
case-insensitive manner. (Note: the database engine only understands upper/lower
case for 7-bit Latin characters. Consequently, the LIKE operator is case
sensitive for 8-bit iso8859 characters or UTF-8 characters. For example, the
expression 'a' LIKE 'A' is TRUE but 'æ' LIKE 'Æ' is FALSE). Case sensitivity for
Latin characters can be changed using the SQLConnection.caseSensitiveLike
property.

If the optional ESCAPE clause is present, then the expression following the
ESCAPE keyword must evaluate to a string consisting of a single character. This
character may be used in the LIKE pattern to match literal percent or underscore
characters. The escape character followed by a percent symbol, underscore or
itself matches a literal percent symbol, underscore or escape character in the
string, respectively.

**GLOB**

The GLOB operator is similar to LIKE but uses the Unix file globbing syntax for
its wildcards. Unlike LIKE, GLOB is case sensitive.

IN

The IN operator calculates whether its left operand is equal to one of the
values in its right operand (a set of values in parentheses).

    in-expr         ::=  expr [NOT] IN ( value-list ) |
                     expr [NOT] IN ( select-statement ) |
                     expr [NOT] IN [database-name.] table-name
    value-list      ::=  literal-value [, literal-value]*

The right operand can be a set of comma-separated literal values, or it can be
the result of a SELECT statement. See SELECT statements in expressions for an
explanation and limitations on using a SELECT statement as the right-hand
operand of the IN operator.

**BETWEEN...AND**

The BETWEEN...AND operator is equivalent to using two expressions with the \>=
and \<= operators. For example, the expression x BETWEEN y AND z is equivalent
to x \>= y AND x \<= z.

**NOT**

The NOT operator is a negation operator. The GLOB, LIKE, and IN operators may be
preceded by the NOT keyword to invert the sense of the test (in other words, to
check that a value does not match the indicated pattern).

## Parameters

A parameter specifies a placeholder in the expression for a literal value that
is filled in at runtime by assigning a value to the SQLStatement.parameters
associative array. Parameters can take three forms:

|       |                                                                                                                                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ?     | A question mark indicates an indexed parameter. Parameters are assigned numerical (zero-based) index values according to their order in the statement.                                                                                                        |
| :AAAA | A colon followed by an identifier name holds a spot for a named parameter with the name AAAA. Named parameters are also numbered according to their order in the SQL statement. To avoid confusion, it is best to avoid mixing named and numbered parameters. |
| @AAAA | An "at sign" is equivalent to a colon.                                                                                                                                                                                                                        |

## Unsupported SQL features

The following is a list of the standard SQL elements that are not supported in
Adobe AIR:

FOREIGN KEY constraints  
FOREIGN KEY constraints are parsed but are not enforced.

Triggers  
FOR EACH STATEMENT triggers are not supported (all triggers must be FOR EACH
ROW). INSTEAD OF triggers are not supported on tables (INSTEAD OF triggers are
only allowed on views). Recursive triggers—triggers that trigger themselves—are
not supported.

ALTER TABLE  
Only the RENAME TABLE and ADD COLUMN variants of the ALTER TABLE command are
supported. Other kinds of ALTER TABLE operations such as DROP COLUMN, ALTER
COLUMN, ADD CONSTRAINT, and so forth are ignored.

Nested transactions  
Only a single active transaction is allowed.

RIGHT and FULL OUTER JOIN  
RIGHT OUTER JOIN or FULL OUTER JOIN are not supported.

Updateable VIEW  
A view is read only. You may not execute a DELETE, INSERT, or UPDATE statement
on a view. An INSTEAD OF trigger that fires on an attempt to DELETE, INSERT, or
UPDATE a view is supported and can be used to update supporting tables in the
body of the trigger.

GRANT and REVOKE  
A database is an ordinary disk file; the only access permissions that can be
applied are the normal file access permissions of the underlying operating
system. The GRANT and REVOKE commands commonly found on client/server RDBMSes
are not implemented.

The following SQL elements and SQLite features are supported in some SQLite
implementations, but are not supported in Adobe AIR. Most of this functionality
is available through methods of the SQLConnection class:

Transaction-related SQL elements (BEGIN, END, COMMIT, ROLLBACK)  
This functionality is available through the transaction-related methods of the
SQLConnection class: SQLConnection.begin(), SQLConnection.commit(), and
SQLConnection.rollback().

ANALYZE  
This functionality is available through the SQLConnection.analyze() method.

ATTACH  
This functionality is available through the SQLConnection.attach() method.

COPY  
This statement is not supported.

CREATE VIRTUAL TABLE  
This statement is not supported.

DETACH  
This functionality is available through the SQLConnection.detach() method.

PRAGMA  
This statement is not supported.

VACUUM  
This functionality is available through the SQLConnection.compact() method.

System table access is not available  
The system tables including sqlite_master and other tables with the "sqlite\_"
prefix are not available in SQL statements. The runtime includes a schema API
that provides an object-oriented way to access schema data. For more information
see the SQLConnection.loadSchema() method.

Regular-expression functions (MATCH() and REGEX())  
These functions are not available in SQL statements.

The following functionality differs between many SQLite implementations and
Adobe AIR:

Indexed statement parameters  
In many implementations indexed statement parameters are one-based. However, in
Adobe AIR indexed statement parameters are zero-based (that is, the first
parameter is given the index 0, the second parameter is given the index 1, and
so forth.

INTEGER PRIMARY KEY column definitions  
In many implementations, only columns that are defined exactly as INTEGER
PRIMARY KEY are used as the actual primary key column for a table. In those
implementations, using another data type that is usually a synonym for INTEGER
(such as int) does not cause the column to be used as the internal primary key.
However, in Adobe AIR, the int data type (and other INTEGER synonyms) are
considered exactly equivalent to INTEGER. Consequently, a column defined as int
PRIMARY KEY is used as the internal primary key for a table. For more
information, see the sections CREATE TABLE and Column affinity.

## Additional SQL features

The following column affinity types are not supported by default in SQLite, but
are supported in Adobe AIR (Note that, like all keywords in SQL, these data type
names are not case-sensitive):

Boolean  
corresponding to the Boolean class.

Date  
corresponding to the Date class.

int  
corresponding to the int class (equivalent to the INTEGER column affinity).

Number  
corresponding to the Number class (equivalent to the REAL column affinity).

Object  
corresponding to the Object class or any subclass that can be serialized and
deserialized using AMF3. (This includes most classes including custom classes,
but excludes some classes including display objects and objects that include
display objects as properties.)

String  
corresponding to the String class (equivalent to the TEXT column affinity).

XML  
corresponding to the ActionScript (E4X) XML class.

XMLList  
corresponding to the ActionScript (E4X) XMLList class.

The following literal values are not supported by default in SQLite, but are
supported in Adobe AIR:

true  
used to represent the literal boolean value true, for working with BOOLEAN
columns.

false  
used to represent the literal boolean value false, for working with BOOLEAN
columns.
