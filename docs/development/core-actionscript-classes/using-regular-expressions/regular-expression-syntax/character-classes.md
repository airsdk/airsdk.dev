---
sidebar_position: 3
---

# Character classes

You use character classes to specify a list of characters to match one position
in the regular expression. You define character classes with square brackets (
`[` and `]`). For example, the following regular expression defines a character
class that matches `bag`, `beg`, `big`, `bog`, or `bug`:

```
/b[aeiou]g/
```

#### Escape sequences in character classes

Most metacharacters and metasequences that normally have special meanings in a
regular expression _do not_ have those same meanings inside a character class.
For example, in a regular expression, the asterisk is used for repetition, but
this is not the case when the asterisk appears in a character class. The
following character class matches the asterisk literally, along with any of the
other characters listed:

```
/[abc*123]/
```

However, the three characters listed in the following table do function as
metacharacters, with special meaning, in character classes:

| Metacharacter | Meaning in character classes                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `]`           | Defines the end of the character class.                                                                |
| `-`           | Defines a range of characters (see the following section "Ranges of characters in character classes"). |
| `\`           | Defines metasequences and undoes the special meaning of metacharacters.                                |

For any of these characters to be recognized as literal characters (without the
special metacharacter meaning), you must precede the character with the
backslash escape character. For example, the following regular expression
includes a character class that matches any one of four symbols (`$`, `\`, `]`,
or `-`):

```
/[$\\\]\-]/
```

In addition to the metacharacters that retain their special meanings, the
following metasequences function as metasequences within character classes:

| Metasequence | Meaning in character classes                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `\n`         | Matches a newline character.                                                                                     |
| `\r`         | Matches a return character.                                                                                      |
| `\t`         | Matches a tab character.                                                                                         |
| `\u` `nnnn`  | Matches the character with the specified Unicode code point value (as defined by the hexadecimal number _nnnn_). |
| `\\x` `nn`   | Matches the character with the specified ASCII value (as defined by the hexadecimal number _nn_).                |

Other regular expression metasequences and metacharacters are treated as normal
characters within a character class.

#### Ranges of characters in character classes

Use the hyphen to specify a range of characters, such as `A-Z`, `a-z`, or `0-9`.
These characters must constitute a valid range in the character set. For
example, the following character class matches any one of the characters in the
range `a-z` or any digit:

```
/[a-z0-9]/
```

You can also use the `\\x` _nn_ ASCII character code to specify a range by ASCII
value. For example, the following character class matches any character from a
set of extended ASCII characters (such as `é` and `ê`):

```
\\x
```

#### Negated character classes

When you use a caret (`^`) character at the beginning of a character class, it
negates that class—any character not listed is considered a match. The following
character class matches any character _except_ for a lowercase letter ( `az` –)
or a digit:

```
/[^a-z0-9]/
```

You must type the caret (`^`) character at the _beginning_ of a character class
to indicate negation. Otherwise, you are simply adding the caret character to
the characters in the character class. For example, the following character
class matches any one of a number of symbol characters, including the caret:

```
/[!.,#+*%$&^]/
```
