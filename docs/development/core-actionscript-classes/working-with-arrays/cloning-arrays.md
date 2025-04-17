---
sidebar_position: 5
---

# Cloning arrays

The Array class has no built-in method for making copies of arrays. You can
create a _shallow copy_ of an array by calling either the `concat()` or
`slice()` methods with no arguments. In a shallow copy, if the original array
has elements that are objects, only the references to the objects are copied
rather than the objects themselves. The copy points to the same objects as the
original does. Any changes made to the objects are reflected in both arrays.

In a _deep copy_, any objects found in the original array are also copied so
that the new array does not point to the same objects as does the original
array. Deep copying requires more than one line of code, which usually calls for
the creation of a function. Such a function could be created as a global utility
function or as a method of an Array subclass.

The following example defines a function named `clone()` that does deep copying.
The algorithm is borrowed from a common Java programming technique. The function
creates a deep copy by serializing the array into an instance of the ByteArray
class, and then reading the array back into a new array. This function accepts
an object so that it can be used with both indexed arrays and associative
arrays, as shown in the following code:

```
import flash.utils.ByteArray;

function clone(source:Object):*
{
```

        var myBA:ByteArray = new ByteArray();
        myBA.writeObject(source);
        myBA.position = 0;
        return(myBA.readObject());
```
}
```
