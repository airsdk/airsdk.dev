---
sidebar_position: 3
---

# Methods for using regular expressions with strings

The RegExp class includes two methods: `exec()` and `test()`.

In addition to the `exec()` and `test()` methods of the RegExp class, the String
class includes the following methods that let you match regular expressions in
strings: `match()`, `replace()`, `search()`, and `splice()`.

## The test() method

The `test()` method of the RegExp class simply checks the supplied string to see
if it contains a match for the regular expression, as the following example
shows:

```
var pattern:RegExp = /Class-\w/;
var str = "Class-A";
trace(pattern.test(str)); // output: true
```

## The exec() method

The `exec()` method of the RegExp class checks the supplied string for a match
of the regular expression and returns an array with the following:

- The matching substring

- Substring matches for any parenthetical groups in the regular expression

The array also includes an `index` property, indicating the index position of
the start of the substring match.

For example, consider the following code:

```
var pattern:RegExp = /\d{3}\-\d{3}-\d{4}/; //U.S phone number
var str:String = "phone: 415-555-1212";
var result:Array = pattern.exec(str);
trace(result.index, " - ", result);
// 7-415-555-1212
```

Use the `exec()` method multiple times to match multiple substrings when the `g`
(`global`) flag is set for the regular expression:

```
var pattern:RegExp = /\w*sh\w*/gi;
var str:String = "She sells seashells by the seashore";
var result:Array = pattern.exec(str);

while (result != null)
{
```

        trace(result.index, "\t", pattern.lastIndex, "\t", result);
        result = pattern.exec(str);
```
}
//output:
// 0      3      She
// 10      19      seashells
// 27      35      seashore
```

## String methods that use RegExp parameters

The following methods of the String class take regular expressions as
parameters: `match()`, `replace()`, `search()`, and `split()`. For more
information on these methods, see
[Finding patterns in strings and replacing substrings](../working-with-strings/finding-substrings-and-patterns-in-strings.md).
