---
sidebar_position: 7
---

# Flags and properties

The following table lists the five flags that you can set for regular
expressions. Each flag can be accessed as a property of the regular expression
object.

| Flag | Property     | Description                                                                                                                                                                            |
| ---- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `g`  | `global`     | Matches more than one match.                                                                                                                                                           |
| `i`  | `ignoreCase` | Case-insensitive matching. Applies to the `A` — `Z` and `a` — `z` characters, but not to extended characters such as `É` and `é`.                                                      |
| `m`  | `multiline`  | With this flag set, `$` and `^` can match the beginning of a line and end of a line, respectively.                                                                                     |
| `s`  | `dotall`     | With this flag set, `.` (dot) can match the newline character (`\n`).                                                                                                                  |
| `x`  | `extended`   | Allows extended regular expressions. You can type spaces in the regular expression, which are ignored as part of the pattern. This lets you type regular expression code more legibly. |

Note that these properties are read-only. You can set the flags (`g`, `i`, `m`,
`s`, `x`) when you set a regular expression variable, as follows:

    var re:RegExp = /abc/gimsx;

However, you cannot directly set the named properties. For instance, the
following code results in an error:

    var re:RegExp = /abc/;
    re.global = true; // This generates an error.

By default, unless you specify them in the regular expression declaration, the
flags are not set, and the corresponding properties are also set to `false`.

Additionally, there are two other properties of a regular expression:

- The `lastIndex` property specifies the index position in the string to use for
  the next call to the `exec()` or `test()` method of a regular expression.

- The `source` property specifies the string that defines the pattern portion of
  the regular expression.

#### The g (global) flag

When the `g` (`global`) flag is _not_ included, a regular expression matches no
more than one match. For example, with the `g` flag not included in the regular
expression, the `String.match()` method returns only one matching substring:

    var str:String = "she sells seashells by the seashore.";
    var pattern:RegExp = /sh\w*/;
    trace(str.match(pattern)) // output: she

When the `g` flag is set, the `Sting.match()` method returns multiple matches,
as follows:

    var str:String = "she sells seashells by the seashore.";
    var pattern:RegExp = /sh\w*/g;
    // The same pattern, but this time the g flag IS set.
    trace(str.match(pattern)); // output: she,shells,shore

#### The i (ignoreCase) flag

By default, regular expression matches are case-sensitive. When you set the `i`
(`ignoreCase`) flag, case sensitivity is ignored. For example, the lowercase `s`
in the regular expression does not match the uppercase letter `S`, the first
character of the string:

    var str:String = "She sells seashells by the seashore.";
    trace(str.search(/sh/)); // output: 13 -- Not the first character

With the `i` flag set, however, the regular expression does match the capital
letter `S`:

    var str:String = "She sells seashells by the seashore.";
    trace(str.search(/sh/i)); // output: 0

The `i` flag ignores case sensitivity only for the `A` – `Z` and `a` – `z`
characters, but not for extended characters such as `É` and `é`.

#### The m (multiline) flag

If the `m` (`multiline`) flag is not set, the `^` matches the beginning of the
string and the `$` matches the end of the string. If the `m` flag is set, these
characters match the beginning of a line and end of a line, respectively.
Consider the following string, which includes a newline character:

    var str:String = "Test\n";
    str += "Multiline";
    trace(str.match(/^\w*/g)); // Match a word at the beginning of the string.

Even though the `g` (`global`) flag is set in the regular expression, the
`match()` method matches only one substring, since there is only one match for
the `^` —the beginning of the string. The output is:

    Test

Here is the same code with the `m` flag set:

    var str:String = "Test\n";
    str += "Multiline";
    trace(str.match(/^\w*/gm)); // Match a word at the beginning of lines.

This time, the output includes the words at the beginning of both lines:

    Test,Multiline

Note that only the `\n` character signals the end of a line. The following
characters do not:

- Return (`\r`) character

- Unicode line-separator (`\u2028`) character

- Unicode paragraph-separator (`\u2029`) character

#### The s (dotall) flag

If the `s` (`dotall` or "dot all") flag is not set, a dot (`.`) in a regular
expression pattern does not match a newline character (`\n`). So for the
following example, there is no match:

    var str:String = "<p>Test\n";
    str += "Multiline</p>";
    var re:RegExp = /<p>.*?<\/p>/;
    trace(str.match(re));

However, if the `s` flag is set, the dot matches the newline character:

    var str:String = "<p>Test\n";
    str += "Multiline</p>";
    var re:RegExp = /<p>.*?<\/p>/s;
    trace(str.match(re));

In this case, the match is the entire substring within the `<p>` tags, including
the newline character:

    <p>Test
    Multiline</p>

#### The x (extended) flag

Regular expressions can be difficult to read, especially when they include a lot
of metasymbols and metasequences. For example:

    /<p(>|(\s*[^>]*>)).*?<\/p>/gi

When you use the `x` (`extended`) flag in a regular expression, any blank spaces
that you type in the pattern are ignored. For example, the following regular
expression is identical to the previous example:

    /     <p    (>  | (\s* [^>]* >))    .*?    <\/p>  /gix

If you have the `x` flag set and do want to match a blank space character,
precede the blank space with a backslash. For example, the following two regular
expressions are equivalent:

    /foo bar/
    /foo \ bar/x

#### The lastIndex property

The `lastIndex` property specifies the index position in the string at which to
start the next search. This property affects the `exec()` and `test()` methods
called on a regular expression that has the `g` flag set to `true`. For example,
consider the following code:

    var pattern:RegExp = /p\w*/gi;
    var str:String = "Pedro Piper picked a peck of pickled peppers.";
    trace(pattern.lastIndex);
    var result:Object = pattern.exec(str);
    while (result != null)
    {
        trace(pattern.lastIndex);
        result = pattern.exec(str);
    }

The `lastIndex` property is set to 0 by default (to start searches at the
beginning of the string). After each match, it is set to the index position
following the match. Therefore, the output for the preceding code is the
following:

    0
    5
    11
    18
    25
    36
    44

If the `global` flag is set to `false`, the `exec()` and `test()` methods do not
use or set the `lastIndex` property.

The `match()`, `replace()`, and `search()` methods of the String class start all
searches from the beginning of the string, regardless of the setting of the
`lastIndex` property of the regular expression used in the call to the method.
(However, the `match()` method does set `lastIndex` to 0.)

You can set the `lastIndex` property to adjust the starting position in the
string for regular expression matching.

#### The source property

The `source` property specifies the string that defines the pattern portion of a
regular expression. For example:

    var pattern:RegExp = /foo/gi;
    trace(pattern.source); // foo
