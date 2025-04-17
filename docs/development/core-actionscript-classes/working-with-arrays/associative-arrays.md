---
sidebar_position: 3
---

# Associative arrays

An associative array, sometimes called a _hash_ or _map_, uses _keys_ instead of
a numeric index to organize stored values. Each key in an associative array is a
unique string that is used to access a stored value. An associative array is an
instance of the Object class, which means that each key corresponds to a
property name. Associative arrays are unordered collections of key and value
pairs. Your code should not expect the keys of an associative array to be in a
specific order.

ActionScript 3.0 also includes an advanced type of associative array called a
_dictionary_. Dictionaries, which are instances of the Dictionary class in the
flash.utils package, use keys that can be of any data type. In other words,
dictionary keys are not limited to values of type String.

## Associative arrays with string keys

There are two ways to create associative arrays in ActionScript 3.0. The first
way is to use an Object instance. By using an Object instance you can initialize
your array with an object literal. An instance of the Object class, also called
a _generic object_, is functionally identical to an associative array. Each
property name of the generic object serves as the key that provides access to a
stored value.

The following example creates an associative array named `monitorInfo`, using an
object literal to initialize the array with two key and value pairs:

```
var monitorInfo:Object = {type:"Flat Panel", resolution:"1600 x 1200"};
trace(monitorInfo["type"], monitorInfo["resolution"]);
// output: Flat Panel 1600 x 1200
```

If you do not need to initialize the array at declaration time, you can use the
Object constructor to create the array, as follows:

```
var monitorInfo:Object = new Object();
```

After the array is created using either an object literal or the Object class
constructor, you can add new values to the array using either the array access
(`[]`) operator or the dot operator (`.`). The following example adds two new
values to `monitorArray`:

```
monitorInfo["aspect ratio"] = "16:10"; // bad form, do not use spaces
monitorInfo.colors = "16.7 million";
trace(monitorInfo["aspect ratio"], monitorInfo.colors);
// output: 16:10 16.7 million
```

Note that the key named `aspect ratio` contains a space character. This is
possible with the array access ( `[]`) operator, but generates an error if
attempted with the dot operator. Using spaces in your key names is not
recommended.

The second way to create an associative array is to use the Array constructor
(or the constructor of any dynamic class) and then use either the array access
(`[]`) operator or the dot operator (`.`) to add key and value pairs to the
array. If you declare your associative array to be of type Array, you cannot use
an object literal to initialize the array. The following example creates an
associative array named `monitorInfo` using the Array constructor and adds a key
called `type` and a key called `resolution`, along with their values:

```
var monitorInfo:Array = new Array();
monitorInfo["type"] = "Flat Panel";
monitorInfo["resolution"] = "1600 x 1200";
trace(monitorInfo["type"], monitorInfo["resolution"]);
// output: Flat Panel 1600 x 1200
```

There is no advantage in using the Array constructor to create an associative
array. You cannot use the `Array.length` property or any of the methods of the
Array class with associative arrays, even if you use the Array constructor or
the Array data type. The use of the Array constructor is best left for the
creation of indexed arrays.

## Associative arrays with object keys (Dictionaries)

You can use the Dictionary class to create an associative array that uses
objects for keys rather than strings. Such arrays are sometimes called
dictionaries, hashes, or maps. For example, consider an application that
determines the location of a Sprite object based on its association with a
specific container. You can use a Dictionary object to map each Sprite object to
a container.

The following code creates three instances of the Sprite class that serve as
keys for the Dictionary object. Each key is assigned a value of either `GroupA`
or `GroupB`. The values can be of any data type, but in this example both
`GroupA` and `GroupB` are instances of the Object class. Subsequently, you can
access the value associated with each key with the array access (`[]`) operator,
as shown in the following code:

```
import flash.display.Sprite;
import flash.utils.Dictionary;

var groupMap:Dictionary = new Dictionary();

// objects to use as keys
var spr1:Sprite = new Sprite();
var spr2:Sprite = new Sprite();
var spr3:Sprite = new Sprite();

// objects to use as values
var groupA:Object = new Object();
var groupB:Object = new Object();

// Create new key-value pairs in dictionary.
groupMap[spr1] = groupA;
groupMap[spr2] = groupB;
groupMap[spr3] = groupB;

if (groupMap[spr1] == groupA)
{
```

        trace("spr1 is in groupA");
```
}
if (groupMap[spr2] == groupB)
{
```

        trace("spr2 is in groupB");
```
}
if (groupMap[spr3] == groupB)
{
```

        trace("spr3 is in groupB");
```
}
```

#### Iterating with object keys

You can iterate through the contents of a Dictionary object with either a
`for..in` loop or a `for each..in` loop. A `for..in` loop allows you to iterate
based on the keys, whereas a `for each..in` loop allows you to iterate based on
the values associated with each key.

Use the `for..in` loop for direct access to the object keys of a Dictionary
object. You can also access the values of the Dictionary object with the array
access (`[]`) operator. The following code uses the previous example of the
`groupMap` dictionary to show how to iterate through a Dictionary object with
the `for..in` loop:

```
for (var key:Object in groupMap)
{
```

        trace(key, groupMap[key]);
```
}
/* output:
[object Sprite] [object Object]
[object Sprite] [object Object]
[object Sprite] [object Object]
```

    */

Use the `for each..in` loop for direct access to the values of a Dictionary
object. The following code also uses the `groupMap` dictionary to show how to
iterate through a Dictionary object with the `for each..in` loop:

```
for each (var item:Object in groupMap)
{
```

        trace(item);
```
}
/* output:
[object Object]
[object Object]
[object Object]
```

    */

#### Object keys and memory management

Adobe® Flash® Player and Adobe® AIR™ use a garbage collection system to recover
memory that is no longer used. When an object has no references pointing to it,
the object becomes eligible for garbage collection, and the memory is recovered
the next time the garbage collection system executes. For example, the following
code creates a new object and assigns a reference to the object to the variable
`myObject`:

```
var myObject:Object = new Object();
```

As long as any reference to the object exists, the garbage collection system
will not recover the memory that the object occupies. If the value of `myObject`
is changed such that it points to a different object or is set to the value
`null`, the memory occupied by the original object becomes eligible for garbage
collection, but only if there are no other references to the original object.

If you use `myObject` as a key in a Dictionary object, you are creating another
reference to the original object. For example, the following code creates two
references to an object—the `myObject` variable, and the key in the `myMap`
object:

```
import flash.utils.Dictionary;

var myObject:Object = new Object();
var myMap:Dictionary = new Dictionary();
myMap[myObject] = "foo";
```

To make the object referenced by `myObject` eligible for garbage collection, you
must remove all references to it. In this case, you must change the value of
`myObject` and delete the `myObject` key from `myMap`, as shown in the following
code:

```
myObject = null;
delete myMap[myObject];
```

Alternatively, you can use the `useWeakReference` parameter of the Dictionary
constructor to make all of the dictionary keys _weak references_. The garbage
collection system ignores weak references, which means that an object that has
only weak references is eligible for garbage collection. For example, in the
following code, you do not need to delete the `myObject` key from `myMap` in
order to make the object eligible for garbage collection:

```
import flash.utils.Dictionary;

var myObject:Object = new Object();
var myMap:Dictionary = new Dictionary(true);
myMap[myObject] = "foo";
myObject = null; // Make object eligible for garbage collection.
```
