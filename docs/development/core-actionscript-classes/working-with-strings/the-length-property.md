---
sidebar_position: 3
---

# The length property

Every string has a `length` property, which is equal to the number of characters
in the string:

```actionscript
var str:String = "Adobe";
trace(str.length);            // output: 5
```

An empty string and a null string both have a length of 0, as the following
example shows:

```actionscript
var str1:String = new String();
trace(str1.length);           // output: 0

str2:String = '';
trace(str2.length);           // output: 0
```
