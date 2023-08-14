---
sidebar_position: 2
---

# Creating strings

The String class is used to represent string (textual) data in ActionScript 3.0.
ActionScript strings support both ASCII and Unicode characters. The simplest way
to create a string is to use a string literal. To declare a string literal, use
straight double quotation mark (`"`) or single quotation mark (`'`) characters.
For example, the following two strings are equivalent:

```actionscript
var str1:String = "hello";
var str2:String = 'hello';
```

You can also declare a string by using the `new` operator, as follows:

```actionscript
var str1:String = new String("hello");  
var str2:String = new String(str1);
var str3:String = new String();       // str3 == ""
```

The following two strings are equivalent:

```actionscript
var str1:String = "hello";
var str2:String = new String("hello");
```

To use single quotation marks (`'`) within a string literal defined with single
quotation mark (`'`) delimiters, use the backslash escape character (`\`).
Similarly, to use double quotation marks (`"`) within a string literal defined
with double quotation marks (`"`) delimiters, use the backslash escape character
(`\`). The following two strings are equivalent:

```actionscript
var str1:String = "That's \"A-OK\"";
var str2:String = 'That\'s "A-OK"';
```

You may choose to use single quotation marks or double quotation marks based on
any single or double quotation marks that exist in a string literal, as in the
following:

```actionscript
var str1:String = "ActionScript <span class='heavy'>3.0</span>";
var str2:String = '<item id="155">banana</item>';
```

Keep in mind that ActionScript distinguishes between a straight single quotation
mark (`'`) and a left or right single quotation mark (`'` or `'`). The same is
true for double quotation marks. Use straight quotation marks to delineate
string literals. When pasting text from another source into ActionScript, be
sure to use the correct characters.

As the following table shows, you can use the backslash escape character (`\`)
to define other characters in string literals:

| Escape sequence | Character                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `\b`            | Backspace                                                                                                                                 |
| `\f`            | Form feed                                                                                                                                 |
| `\n`            | Newline                                                                                                                                   |
| `\r`            | Carriage return                                                                                                                           |
| `\t`            | Tab                                                                                                                                       |
| `\u` `nnnn`     | The Unicode character with the character code specified by the hexadecimal number _nnnn_ ; for example, `\u263a` is the smiley character. |
| `\\x` `nn`      | The ASCII character with the character code specified by the hexadecimal number _nn_                                                      |
| `\'`            | Single quotation mark                                                                                                                     |
| `\"`            | Double quotation mark                                                                                                                     |
| `\\`            | Single backslash character                                                                                                                |
