# Regular expression syntax

This section describes all of the elements of ActionScript regular expression
syntax. As you'll see, regular expressions can have many complexities and
nuances. You can find detailed resources on regular expressions on the web and
in bookstores. Keep in mind that different programming environments implement
regular expressions in different ways. ActionScript 3.0 implements regular
expressions as defined in the ECMAScript edition 3 language specification
(ECMA-262).

Generally, you use regular expressions that match more complicated patterns than
a simple string of characters. For example, the following regular expression
defines the pattern consisting of the letters A, B, and C in sequence followed
by any digit:

    /ABC\d/

The `\d` code represents "any digit." The backslash (`\`) character is called
the escape character, and combined with the character that follows it (in this
case the letter d), it has special meaning in the regular expression.

The following regular expression defines the pattern of the letters ABC followed
by any number of digits (note the asterisk):

    /ABC\d*/

The asterisk character (`*`) is a _metacharacter_. A metacharacter is a
character that has special meaning in regular expressions. The asterisk is a
specific type of metacharacter called a _quantifier,_ which is used to quantify
the amount of repetition of a character or group of characters. For more
information, see [Quantifiers](./quantifiers.md).

In addition to its pattern, a regular expression can contain flags, which
specify how the regular expression is to be matched. For example, the following
regular expression uses the `i` flag, which specifies that the regular
expression ignores case sensitivity in matching strings:

    /ABC\d*/i

For more information, see [Flags and properties](./flags-and-properties.md).

You can use regular expressions with the following methods of the String class:
`match()`, `replace()`, and `search()`. For more information on these methods,
see
[Finding patterns in strings and replacing substrings](../../working-with-strings/finding-substrings-and-patterns-in-strings.md).

More Help topics

- [Creating an instance of a regular expression](./creating-an-instance-of-a-regular-expression.md)

- [Characters, metacharacters, and metasequences](./characters-metacharacters-and-metasequences.md)

- [Character classes](./character-classes.md)

- [Quantifiers](./quantifiers.md)

- [Alternation](./alternation.md)

- [Groups](./groups.md)

- [Flags and properties](./flags-and-properties.md)
