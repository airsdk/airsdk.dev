# SQL support in local databases

Adobe AIR includes a SQL database engine with support for local SQL databases
with many standard SQL features, using the open source
[SQLite](https://www.sqlite.org) database system. The runtime does not specify
how or where database data is stored on the file system. Each database is stored
completely within a single file. A developer can specify the location in the
file system where the database file is stored, and a single AIR application can
access one or many separate databases (i.e. separate database files).This
document outlines the SQL syntax and data type support for Adobe AIR local SQL
databases. This document is not intended to serve as a comprehensive SQL
reference. Rather, it describes specific details of the SQL dialect that Adobe
AIR supports. The runtime supports most of the SQL-92 standard SQL dialect.
Because there are numerous references, web sites, books, and training materials
for learning SQL, this document is not intended to be a comprehensive SQL
reference or tutorial. Instead, this document particularly focuses on the
AIR-supported SQL syntax, and the differences between SQL-92 and the supported
SQL dialect.

SQL statement definition conventions

Within statement definitions in this document, the following conventions are
used:

- Text case

  - UPPER CASE - literal SQL keywords are written in all upper case.

  - lower case - placeholder terms or clause names are written in all lower
    case.

- Definition characters

  - ::= Indicates a clause or statement definition.

- Grouping and alternating characters

  - \| The pipe character is used between alternative options, and can be read
    as "or".

  - \[\] Items in square brackets are optional items; the brackets can contain a
    single item or a set of alternative items.

  - () Parentheses surrounding a set of alternatives (a set of items separated
    by pipe characters), designates a required group of items, that is, a set of
    items that are the possible values for a single required item.

- Quantifiers

  - \+ A plus character following an item in parentheses indicates that the
    preceding item can occur 1 or more times.

  - \* An asterisk character following an item in square brackets indicates that
    the preceding (bracketed) item can occur 0 or more times

- Literal characters

  - \* An asterisk character used in a column name or between the parentheses
    following a function name signifies a literal asterisk character rather than
    the "0 or more" quantifier.

  - . A period character represents a literal period.

  - , A comma character represents a literal comma.

  - () A pair of parentheses surrounding a single clause or item indicates that
    the parentheses are required, literal parentheses characters.

  - Other characters, unless otherwise indicated, represent those literal
    characters.

- [Supported SQL syntax](./supported-sql-syntax.md)
- [Data type support](./data-type-support.md)
- [SQL error detail messages, ids, and arguments](./sql-error-detail-messages-ids-and-arguments.md)
