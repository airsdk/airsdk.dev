---
sidebar_position: 2
---

# Data type support

Unlike most SQL databases, the Adobe AIR SQL database engine does not require or
enforce that table columns contain values of a certain type. Instead, the
runtime uses two concepts, storage classes and column affinity, to control data
types. This section describes storage classes and column affinity, as well as
how data type differences are resolved under various conditions.

## Storage classes

Storage classes represent the actual data types that are used to store values in
a database. The following storage classes are used by the database:

NULL  
The value is a NULL value.

INTEGER  
The value is a signed integer.

REAL  
The value is a floating-point number value.

TEXT  
The value is a text string (limited to 256 MB).

BLOB  
The value is a Binary Large Object (BLOB); in other words, raw binary data
(limited to 256 MB).

All values supplied to the database as literals embedded in a SQL statement or
values bound using parameters to a prepared SQL statement are assigned a storage
class before the SQL statement is executed.

Literals that are part of a SQL statement are assigned storage class TEXT if
they are enclosed by single or double quotes, INTEGER if the literal is
specified as an unquoted number with no decimal point or exponent, REAL if the
literal is an unquoted number with a decimal point or exponent and NULL if the
value is a NULL. Literals with storage class BLOB are specified using the
X'ABCD' notation. For more information, see Literal values in expressions.

Values supplied as parameters using the SQLStatement.parameters associative
array are assigned the storage class that most closely matches the native data
type bound. For example, int values are bound as INTEGER storage class, Number
values are given the REAL storage class, String values are given the TEXT
storage class, and ByteArray objects are given the BLOB storage class.

## Column affinity

The _affinity_ of a column is the recommended type for data stored in that
column. When a value is stored in a column (through an INSERT or UPDATE
statement), the runtime attempts to convert that value from its data type to the
specified affinity. For example, if a Date value (an ActionScript or JavaScript
Date instance) is inserted into a column whose affinity is TEXT, the Date value
is converted to the String representation (equivalent to calling the object's
toString() method) before being stored in the database. If the value cannot be
converted to the specified affinity an error occurs and the operation is not
performed. When a value is retrieved from the database using a SELECT statement,
it is returned as an instance of the class corresponding to the affinity,
regardless of whether it was converted from a different data type when it was
stored.

If a column accepts NULL values, the ActionScript or JavaScript value null can
be used as a parameter value to store NULL in the column. When a NULL storage
class value is retrieved in a SELECT statement, it is always returned as the
ActionScript or JavaScript value null, regardless of the column's affinity. If a
column accepts NULL values, always check values retrieved from that column to
determine if they're null before attempting to cast the values to a non-nullable
type (such as Number or Boolean).

Each column in the database is assigned one of the following type affinities:

- TEXT (or String)

- NUMERIC

- INTEGER (or int)

- REAL (or Number)

- Boolean

- Date

- XML

- XMLLIST

- Object

- NONE

**TEXT (or String)**

A column with TEXT or String affinity stores all data using storage classes
NULL, TEXT, or BLOB. If numerical data is inserted into a column with TEXT
affinity it is converted to text form before being stored.

**NUMERIC**

A column with NUMERIC affinity contains values using storage classes NULL, REAL,
or INTEGER. When text data is inserted into a NUMERIC column, an attempt is made
to convert it to an integer or real number before it is stored. If the
conversion is successful, then the value is stored using the INTEGER or REAL
storage class (for example, a value of '10.05' is converted to REAL storage
class before being stored). If the conversion cannot be performed an error
occurs. No attempt is made to convert a NULL value. A value that's retrieved
from a NUMERIC column is returned as an instance of the most specific numeric
type into which the value fits. In other words, if the value is a positive
integer or 0, it's returned as a uint instance. If it’s a negative integer, it’s
returned as an int instance. Finally, if it has a floating-point component (it's
not an integer) it's returned as a Number instance.

**INTEGER (or int)**

A column that uses INTEGER affinity behaves in the same way as a column with
NUMERIC affinity, with one exception. If the value to be stored is a real value
(such as a Number instance) with no floating point component or if the value is
a text value that can be converted to a real value with no floating point
component, it is converted to an integer and stored using the INTEGER storage
class. If an attempt is made to store a real value with a floating point
component an error occurs.

**REAL (or Number)**

A column with REAL or NUMBER affinity behaves like a column with NUMERIC
affinity except that it forces integer values into floating point
representation. A value in a REAL column is always returned from the database as
a Number instance.

**Boolean**

A column with Boolean affinity stores true or false values. A Boolean column
accepts a value that is an ActionScript or JavaScript Boolean instance. If code
attempts to store a String value, a String with a length greater than zero is
considered true, and an empty String is false. If code attempts to store numeric
data, any non-zero value is stored as true and 0 is stored as false. When a
Boolean value is retrieved using a SELECT statement, it is returned as a Boolean
instance. Non-NULL values are stored using the INTEGER storage class (0 for
false and 1 for true) and are converted to Boolean objects when data is
retrieved.

**Date**

A column with Date affinity stores date and time values. A Date column is
designed to accept values that are ActionScript or JavaScript Date instances. If
an attempt is made to store a String value in a Date column, the runtime
attempts to convert it to a Julian date. If the conversion fails an error
occurs. If code attempts to store a Number, int, or uint value, no attempt is
made to validate the data and it is assumed to be a valid Julian date value. A
Date value that's retrieved using a SELECT statement is automatically converted
to a Date instance. Date values are stored as Julian date values using the REAL
storage class, so sorting and comparing operations work as you would expect them
to.

**XML or XMLList**

A column that uses XML or XMLList affinity stores XML structures. When code
attempts to store data in an XML column using a SQLStatement parameter the
runtime attempts to convert and validate the value using the ActionScript XML()
or XMLList() function. If the value cannot be converted to valid XML an error
occurs. If the attempt to store the data uses a literal SQL text value (for
example INSERT INTO (col1) VALUES ('Invalid XML (no closing tag)'), the value is
not parsed or validated — it is assumed to be well-formed. If an invalid value
is stored, when it is retrieved it is returned as an empty XML object. XML and
XMLList Data is stored using the TEXT storage class or the NULL storage class.

**Object**

A column with Object affinity stores ActionScript or JavaScript complex objects,
including Object class instances as well as instances of Object subclasses such
as Array instances and even custom class instances. Object column data is
serialized in AMF3 format and stored using the BLOB storage class. When a value
is retrieved, it is deserialized from AMF3 and returned as an instance of the
class as it was stored. Note that some ActionScript classes, notably display
objects, cannot be deserialized as instances of their original data type. Before
storing a custom class instance, you must register an alias for the class using
the flash.net.registerClassAlias() method (or in Flex by adding \[RemoteObject\]
metadata to the class declaration). Also, before retrieving that data you must
register the same alias for the class. Any data that can't be deserialized
properly, either because the class inherently can't be deserialized or because
of a missing or mismatched class alias, is returned as an anonymous object (an
Object class instance) with properties and values corresponding to the original
instance as stored.

**NONE**

A column with affinity NONE does not prefer one storage class over another. It
makes no attempt to convert data before it is inserted.

#### Determining affinity

The type affinity of a column is determined by the declared type of the column
in the CREATE TABLE statement. When determining the type the following rules
(not case-sensitive) are applied:

- If the data type of the column contains any of the strings "CHAR", "CLOB",
  "STRI", or "TEXT" then that column has TEXT/String affinity. Notice that the
  type VARCHAR contains the string "CHAR" and is thus assigned TEXT affinity.

- If the data type for the column contains the string "BLOB" or if no data type
  is specified then the column has affinity NONE.

- If the data type for column contains the string "XMLL" then the column has
  XMLList affinity.

- If the data type is the string "XML" then the column has XML affinity.

- If the data type contains the string "OBJE" then the column has Object
  affinity.

- If the data type contains the string "BOOL" then the column has Boolean
  affinity.

- If the data type contains the string "DATE" then the column has Date affinity.

- If the data type contains the string "INT" (including "UINT") then it is
  assigned INTEGER/int affinity.

- If the data type for a column contains any of the strings "REAL", "NUMB",
  "FLOA", or "DOUB" then the column has REAL/Number affinity.

- Otherwise, the affinity is NUMERIC.

- If a table is created using a CREATE TABLE t AS SELECT... statement then all
  columns have no data type specified and they are given the affinity NONE.

## Data types and comparison operators

The following binary comparison operators =, \<, \<=, \>= and != are supported,
along with an operation to test for set membership, IN, and the ternary
comparison operator BETWEEN. For details about these operators see Operators.

The results of a comparison depend on the storage classes of the two values
being compared. When comparing two values the following rules are applied:

- A value with storage class NULL is considered less than any other value
  (including another value with storage class NULL).

- An INTEGER or REAL value is less than any TEXT or BLOB value. When an INTEGER
  or REAL is compared to another INTEGER or REAL, a numerical comparison is
  performed.

- A TEXT value is less than a BLOB value. When two TEXT values are compared, a
  binary comparison is performed.

- When two BLOB values are compared, the result is always determined using a
  binary comparison.

The ternary operator BETWEEN is always recast as the equivalent binary
expression. For example, a BETWEEN b AND c is recast to a \>= b AND a \<= c,
even if this means that different affinities are applied to a in each of the
comparisons required to evaluate the expression.

Expressions of the type a IN (SELECT b ....) are handled by the three rules
enumerated previously for binary comparisons, that is, in a similar manner to a
= b. For example, if b is a column value and a is an expression, then the
affinity of b is applied to a before any comparisons take place. The expression
a IN (x, y, z) is recast as a = +x OR a = +y OR a = +z. The values to the right
of the IN operator (the x, y, and z values in this example) are considered to be
expressions, even if they happen to be column values. If the value of the left
of the IN operator is a column, then the affinity of that column is used. If the
value is an expression then no conversions occur.

How comparisons are performed can also be affected by the use of a COLLATE
clause. For more information, see COLLATE.

## Data types and mathematical operators

For each of the supported mathematical operators, \*, /, %, +, and -, numeric
affinity is applied to each operand before evaluating the expression. If any
operand cannot be converted to the NUMERIC storage class successfully the
expression evaluates to NULL.

When the concatenation operator \|\| is used each operand is converted to the
TEXT storage class before the expression is evaluated. If any operand cannot be
converted to the TEXT storage class then the result of the expression is NULL.
This inability to convert the value can happen in two situations, if the value
of the operand is NULL, or if it's a BLOB containing a non-TEXT storage class.

## Data types and sorting

When values are sorted by an ORDER BY clause, values with storage class NULL
come first. These are followed by INTEGER and REAL values interspersed in
numeric order, followed by TEXT values in binary order or based on the specified
collation (BINARY or NOCASE). Finally come BLOB values in binary order. No
storage class conversions occur before the sort.

## Data types and grouping

When grouping values with the GROUP BY clause, values with different storage
classes are considered distinct. An exception is INTEGER and REAL values which
are considered equal if they are numerically equivalent. No affinities are
applied to any values as the result of a GROUP BY clause.

## Data types and compound SELECT statements

The compound SELECT operators UNION, INTERSECT, and EXCEPT perform implicit
comparisons between values. Before these comparisons are performed an affinity
may be applied to each value. The same affinity, if any, is applied to all
values that may be returned in a single column of the compound SELECT result
set. The affinity that is applied is the affinity of the column returned by the
first component SELECT statement that has a column value (and not some other
kind of expression) in that position. If for a given compound SELECT column none
of the component SELECT statements return a column value, no affinity is applied
to the values from that column before they are compared.
