---
sidebar_position: 9
---

# Converting strings between uppercase and lowercase

As the following example shows, the `toLowerCase()` method and the
`toUpperCase()` method convert alphabetical characters in the string to
lowercase and uppercase, respectively:

```actionscript
var str:String = "Dr. Bob Roberts, #9."
trace(str.toLowerCase()); // dr. bob roberts, #9.
trace(str.toUpperCase()); // DR. BOB ROBERTS, #9.
```

After these methods are executed, the source string remains unchanged. To
transform the source string, use the following code:

```actionscript
str = str.toUpperCase();
```

These methods work with extended characters, not simply a–z and A–Z:

```actionscript
var str:String = "José Barça";
trace(str.toUpperCase(), str.toLowerCase()); // JOSÉ BARÇA josé barça
```
