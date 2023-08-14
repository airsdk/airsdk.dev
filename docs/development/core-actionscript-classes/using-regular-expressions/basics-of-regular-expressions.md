---
sidebar_position: 1
---

# Basics of regular expressions

A regular expression describes a pattern of characters. Regular expressions are
typically used to verify that a text value conforms to a particular pattern
(such as verifying that a user-entered phone number has the proper number of
digits) or to replace portions of a text value that matches a particular
pattern.

Regular expressions can be simple. For example, suppose you wanted to confirm
that a particular string matches "ABC," or wanted to replace every occurrence of
"ABC" in a string with some other text. In that case, you could use the
following regular expression, which defines the pattern consisting of the
letters A, B, and C in sequence:

    /ABC/

Note that the regular expression literal is delineated with the forward slash
(`/`) character.

Regular expression patterns can also be complex, and sometimes cryptic in
appearance, such as the following expression to match a valid e-mail address:

    /([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}/

Most commonly you will use regular expressions to search for patterns in strings
and to replace characters. In those cases, you will create a regular expression
object and use it as a parameter for one of several String class methods. The
following methods of the String class take regular expressions as parameters:
`match()`, `replace()`, `search()`, and `split()`. For more information on these
methods, see
[Finding patterns in strings and replacing substrings](../working-with-strings/finding-substrings-and-patterns-in-strings.md).

The RegExp class includes the following methods: `test()` and `exec()`. For more
information, see
[Methods for using regular expressions with strings](./methods-for-using-regular-expressions-with-strings.md).

#### Important concepts and terms

The following reference list contains important terms that are relevant to this
feature:

Escape character  
A character indicating that the character that follows should be treated as a
metacharacter rather than a literal character. In regular expression syntax, the
backslash character (\\) is the escape character, so a backslash followed by
another character is a special code rather than just the character itself.

Flag  
A character that specifies some option about how the regular expression pattern
should be used, such as whether to distinguish between uppercase and lowercase
characters.

Metacharacter  
A character that has special meaning in a regular expression pattern, as opposed
to literally representing that character in the pattern.

Quantifier  
A character (or several characters) indicating how many times a part of the
pattern should repeat. For example, a quantifier would be used to designate that
a United States postal code should contain five or nine numbers.

Regular expression  
A program statement defining a pattern of characters that can be used to confirm
whether other strings match that pattern or to replace portions of a string.
