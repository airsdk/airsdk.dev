---
sidebar_position: 6
---

# Obtaining string representations of other objects

You can obtain a String representation for any kind of object. All objects have
a `toString()` method for this purpose:

```actionscript
var n:Number = 99.47;
var str:String = n.toString();
// str == "99.47"
```

When using the `+` concatenation operator with a combination of String objects
and objects that are not strings, you do not need to use the `toString()`
method. For details on concatenation, see the next section.

The `String()` global function returns the same value for a given object as the
value returned by the object calling the `toString()` method.
