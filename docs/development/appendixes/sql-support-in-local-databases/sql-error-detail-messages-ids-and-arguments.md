---
sidebar_position: 3
---

# SQL error detail messages, ids, and arguments

The SQLError class represents various errors that can occur while working with
an Adobe AIR local SQL database. For any given exception, the SQLError instance
has a `details` property containing an English error message. In addition, each
error message has an associated unique identifier that is available in the
SQLError object's `detailID` property. Using the `detailID` property, an
application can identify the specific details error message. The application can
provide alternate text for the end user in the language of his or her locale.
The argument values in the `detailArguments` array can be substituted in the
appropriate position in the error message string. This is useful for
applications that display the `details` property error message for an error
directly to end users in a specific locale.

The following table contains a list of the `detailID` values and the associated
English error message text. Placeholder text in the messages indicates where
`detailArguments` values are substituted in by the runtime. This list can be
used as a source for localizing the error messages that can occur in SQL
database operations.

|                   |                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| SQLError detailID | English error detail message and parameters                                                                                               |
| 1001              | Connection closed.                                                                                                                        |
| 1102              | Database must be open to perform this operation.                                                                                          |
| 1003              | %s \[,\|and %s\] parameter name(s) found in parameters property but not in the SQL specified.                                             |
| 1004              | Mismatch in parameter count. Found %d in SQL specified and %d value(s) set in parameters property. Expecting values for %s \[,\|and %s\]. |
| 1005              | Auto compact could not be turned on.                                                                                                      |
| 1006              | The pageSize value could not be set.                                                                                                      |
| 1007              | The schema object with name '%s' of type '%s' in database '%s' was not found.                                                             |
| 1008              | The schema object with name '%s' in database '%s' was not found.                                                                          |
| 1009              | No schema objects with type '%s' in database '%s' were found.                                                                             |
| 1010              | No schema objects in database '%s' were found.                                                                                            |
| 2001              | Parser stack overflow.                                                                                                                    |
| 2002              | Too many arguments on function '%s'                                                                                                       |
| 2003              | near '%s': syntax error                                                                                                                   |
| 2004              | there is already another table or index with this name: '%s'                                                                              |
| 2005              | PRAGMA is not allowed in SQL.                                                                                                             |
| 2006              | Not a writable directory.                                                                                                                 |
| 2007              | Unknown or unsupported join type: '%s %s %s'                                                                                              |
| 2008              | RIGHT and FULL OUTER JOINs are not currently supported.                                                                                   |
| 2009              | A NATURAL join may not have an ON or USING clause.                                                                                        |
| 2010              | Cannot have both ON and USING clauses in the same join.                                                                                   |
| 2011              | Cannot join using column '%s' - column not present in both tables.                                                                        |
| 2012              | Only a single result allowed for a SELECT that is part of an expression.                                                                  |
| 2013              | No such table: '\[%s.\]%s'                                                                                                                |
| 2014              | No tables specified.                                                                                                                      |
| 2015              | Too many columns in result set\|too many columns on '%s'.                                                                                 |
| 2016              | %s ORDER\|GROUP BY term out of range - should be between 1 and %d                                                                         |
| 2017              | Too many terms in ORDER BY clause.                                                                                                        |
| 2018              | %s ORDER BY term out of range - should be between 1 and %d.                                                                               |
| 2019              | %r ORDER BY term does not match any column in the result set.                                                                             |
| 2020              | ORDER BY clause should come after '%s' not before.                                                                                        |
| 2021              | LIMIT clause should come after '%s' not before.                                                                                           |
| 2022              | SELECTs to the left and right of '%s' do not have the same number of result columns.                                                      |
| 2023              | A GROUP BY clause is required before HAVING.                                                                                              |
| 2024              | Aggregate functions are not allowed in the GROUP BY clause.                                                                               |
| 2025              | DISTINCT in aggregate must be followed by an expression.                                                                                  |
| 2026              | Too many terms in compound SELECT.                                                                                                        |
| 2027              | Too many terms in ORDER\|GROUP BY clause                                                                                                  |
| 2028              | Temporary trigger may not have qualified name                                                                                             |
| 2030              | Trigger '%s' already exists                                                                                                               |
| 2032              | Cannot create BEFORE\|AFTER trigger on view: '%s'.                                                                                        |
| 2033              | Cannot create INSTEAD OF trigger on table: '%s'.                                                                                          |
| 2034              | No such trigger: '%s'                                                                                                                     |
| 2035              | Recursive triggers not supported ('%s').                                                                                                  |
| 2036              | No such column: %s\[.%s\[.%s\]\]                                                                                                          |
| 2037              | VACUUM is not allowed from SQL.                                                                                                           |
| 2043              | Table '%s': indexing function returned an invalid plan.                                                                                   |
| 2044              | At most %d tables in a join.                                                                                                              |
| 2046              | Cannot add a PRIMARY KEY column.                                                                                                          |
| 2047              | Cannot add a UNIQUE column.                                                                                                               |
| 2048              | Cannot add a NOT NULL column with default value NULL.                                                                                     |
| 2049              | Cannot add a column with non-constant default.                                                                                            |
| 2050              | Cannot add a column to a view.                                                                                                            |
| 2051              | ANALYZE is not allowed in SQL.                                                                                                            |
| 2052              | Invalid name: '%s'                                                                                                                        |
| 2053              | ATTACH is not allowed from SQL.                                                                                                           |
| 2054              | %s '%s' cannot reference objects in database '%s'                                                                                         |
| 2055              | Access to '\[%s.\]%s.%s' is prohibited.                                                                                                   |
| 2056              | Not authorized.                                                                                                                           |
| 2058              | No such view: '\[%s.\]%s'                                                                                                                 |
| 2060              | Temporary table name must be unqualified.                                                                                                 |
| 2061              | Table '%s' already exists.                                                                                                                |
| 2062              | There is already an index named: '%s'                                                                                                     |
| 2064              | Duplicate column name: '%s'                                                                                                               |
| 2065              | Table '%s' has more than one primary key.                                                                                                 |
| 2066              | AUTOINCREMENT is only allowed on an INTEGER PRIMARY KEY                                                                                   |
| 2067              | No such collation sequence: '%s'                                                                                                          |
| 2068              | Parameters are not allowed in views.                                                                                                      |
| 2069              | View '%s' is circularly defined.                                                                                                          |
| 2070              | Table '%s' may not be dropped.                                                                                                            |
| 2071              | Use DROP VIEW to delete view '%s'                                                                                                         |
| 2072              | Use DROP TABLE to delete table '%s'                                                                                                       |
| 2073              | Foreign key on '%s' should reference only one column of table '%s'                                                                        |
| 2074              | Number of columns in foreign key does not match the number of columns in the referenced table.                                            |
| 2075              | Unknown column '%s' in foreign key definition.                                                                                            |
| 2076              | Table '%s' may not be indexed.                                                                                                            |
| 2077              | Views may not be indexed.                                                                                                                 |
| 2080              | Conflicting ON CONFLICT clauses specified.                                                                                                |
| 2081              | No such index: '%s'                                                                                                                       |
| 2082              | Index associated with UNIQUE or PRIMARY KEY constraint cannot be dropped.                                                                 |
| 2083              | BEGIN is not allowed in SQL.                                                                                                              |
| 2084              | COMMIT is not allowed in SQL.                                                                                                             |
| 2085              | ROLLBACK is not allowed in SQL.                                                                                                           |
| 2086              | Unable to open a temporary database file for storing temporary tables.                                                                    |
| 2087              | Unable to identify the object to be reindexed.                                                                                            |
| 2088              | Table '%s' may not be modified.                                                                                                           |
| 2089              | Cannot modify '%s' because it is a view.                                                                                                  |
| 2090              | Variable number must be between ?0 and ?%d\<                                                                                              |
| 2092              | Misuse of aliased aggregate '%s'                                                                                                          |
| 2093              | Ambiguous column name: '\[%s.\[%s.\]\]%s'                                                                                                 |
| 2094              | No such function: '%s'                                                                                                                    |
| 2095              | Wrong number of arguments to function '%s'                                                                                                |
| 2096              | Subqueries prohibited in CHECK constraints.                                                                                               |
| 2097              | Parameters prohibited in CHECK constraints.                                                                                               |
| 2098              | Expression tree is too large (maximum depth %d)                                                                                           |
| 2099              | RAISE() may only be used within a trigger-program                                                                                         |
| 2100              | Table '%s' has %d columns but %d values were supplied                                                                                     |
| 2101              | Database schema is locked: '%s'                                                                                                           |
| 2102              | Statement too long.                                                                                                                       |
| 2103              | Unable to delete/modify collation sequence due to active statements                                                                       |
| 2104              | Too many attached databases - max %d                                                                                                      |
| 2105              | Cannot ATTACH database within transaction.                                                                                                |
| 2106              | Database '%s' is already in use.                                                                                                          |
| 2108              | Attached databases must use the same text encoding as main database.                                                                      |
| 2200              | Out of memory.                                                                                                                            |
| 2201              | Unable to open database.                                                                                                                  |
| 2202              | Cannot DETACH database within transaction.                                                                                                |
| 2203              | Cannot detach database: '%s'                                                                                                              |
| 2204              | Database '%s' is locked.                                                                                                                  |
| 2205              | Unable to acquire a read lock on the database.                                                                                            |
| 2206              | \[column\|columns\] '%s'\[,'%s'\] are not \[unique\|is\] not unique.                                                                      |
| 2207              | Malformed database schema.                                                                                                                |
| 2208              | Unsupported file format.                                                                                                                  |
| 2209              | Unrecognized token: '%s'                                                                                                                  |
| 2300              | Could not convert text value to numeric value.                                                                                            |
| 2301              | Could not convert string value to date.                                                                                                   |
| 2302              | Could not convert floating point value to integer without loss of data.                                                                   |
| 2303              | Cannot rollback transaction - SQL statements in progress.                                                                                 |
| 2304              | Cannot commit transaction - SQL statements in progress.                                                                                   |
| 2305              | Database table is locked: '%s'                                                                                                            |
| 2306              | Read-only table.                                                                                                                          |
| 2307              | String or blob too big.                                                                                                                   |
| 2309              | Cannot open indexed column for writing.                                                                                                   |
| 2400              | Cannot open value of type %s.                                                                                                             |
| 2401              | No such rowid: %s\<                                                                                                                       |
| 2402              | Object name reserved for internal use: '%s'                                                                                               |
| 2403              | View '%s' may not be altered.                                                                                                             |
| 2404              | Default value of column '%s' is not constant.                                                                                             |
| 2405              | Not authorized to use function '%s'                                                                                                       |
| 2406              | Misuse of aggregate function '%s'                                                                                                         |
| 2407              | Misuse of aggregate: '%s'                                                                                                                 |
| 2408              | No such database: '%s'                                                                                                                    |
| 2409              | Table '%s' has no column named '%s'                                                                                                       |
| 2501              | No such module: '%s'                                                                                                                      |
| 2508              | No such savepoint: '%s'                                                                                                                   |
| 2510              | Cannot rollback - no transaction is active.                                                                                               |
| 2511              | Cannot commit - no transaction is active.                                                                                                 |
