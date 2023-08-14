---
sidebar_position: 1
---

# Creating an instance of a regular expression

There are two ways to create a regular expression instance. One way uses forward
slash characters (`/`) to delineate the regular expression; the other uses the
`new` constructor. For example, the following regular expressions are
equivalent:

    var pattern1:RegExp = /bob/i;
    var pattern2:RegExp = new RegExp("bob", "i");

Forward slashes delineate a regular expression literal in the same way as
quotation marks delineate a string literal. The part of the regular expression
within the forward slashes defines the _pattern._ The regular expression can
also include _flags_ after the final delineating slash. These flags are
considered to be part of the regular expression, but they are separate from its
pattern.

When using the `new` constructor, you use two strings to define the regular
expression. The first string defines the pattern, and the second string defines
the flags, as in the following example:

    var pattern2:RegExp = new RegExp("bob", "i");

When including a forward slash _within_ a regular expression that is defined by
using the forward slash delineators, you must precede the forward slash with the
backslash (`\`) escape character. For example, the following regular expression
matches the pattern `1/2`:

    var pattern:RegExp = /1\/2/;

To include quotation marks _within_ a regular expression that is defined with
the `new` constructor, you must add backslash (`\`) escape character before the
quotation marks (just as you would when defining any String literal). For
example, the following regular expressions match the pattern `eat at "joe's"`:

    var pattern1:RegExp = new RegExp("eat at \"joe's\"", "");
    var pattern2:RegExp = new RegExp('eat at "joe\'s"', "");

Do not use the backslash escape character with quotation marks in regular
expressions that are defined by using the forward slash delineators. Similarly,
do not use the escape character with forward slashes in regular expressions that
are defined with the `new` constructor. The following regular expressions are
equivalent, and they define the pattern `1/2 "joe's"`:

    var pattern1:RegExp = /1\/2 "joe's"/;
    var pattern2:RegExp = new RegExp("1/2 \"joe's\"", "");
    var pattern3:RegExp = new RegExp('1/2 "joe\'s"', '');

Also, in a regular expression that is defined with the `new` constructor, to use
a metasequence that begins with the backslash (`\`) character, such as `\d`
(which matches any digit), type the backslash character twice:

    var pattern:RegExp = new RegExp("\\d+", ""); // matches one or more digits

You must type the backlash character twice in this case, because the first
parameter of the `RegExp()` constructor method is a string, and in a string
literal you must type a backslash character twice to have it recognized as a
single backslash character.

The sections that follow describe syntax for defining regular expression
patterns.

For more information on flags, see
[Flags and properties](./flags-and-properties.md).
