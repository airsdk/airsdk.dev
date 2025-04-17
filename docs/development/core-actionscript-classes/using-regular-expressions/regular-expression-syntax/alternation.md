---
sidebar_position: 5
---

# Alternation

Use the `|` (pipe) character in a regular expression to have the regular
expression engine consider alternatives for a match. For example, the following
regular expression matches any one of the words `cat, dog, pig, rat`:

```
var pattern:RegExp = /cat|dog|pig|rat/;
```

You can use parentheses to define groups to restrict the scope of the \|
alternator. The following regular expression matches `cat` followed by `nap` or
`nip`:

```
var pattern:RegExp = /cat(nap|nip)/;
```

For more information, see [Groups](./groups.md).

The following two regular expressions, one using the `|` alternator, the other
using a character class (defined with `[` and `]`), are equivalent:

```
/1|3|5|7|9/
/[13579]/
```

For more information, see [Character classes](./character-classes.md).
