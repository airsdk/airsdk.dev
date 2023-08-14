---
sidebar_position: 2
---

# Indexed arrays

Indexed arrays store a series of one or more values organized such that each
value can be accessed using an unsigned integer value. The first index is always
the number 0, and the index increments by 1 for each subsequent element added to
the array. In ActionScript 3.0, two classes are used as indexed arrays: the
Array class and the Vector class.

Indexed arrays use an unsigned 32-bit integer for the index number. The maximum
size of an indexed array is 2 <sup>32</sup> - 1 or 4,294,967,295. An attempt to
create an array that is larger than the maximum size results in a run-time
error.

To access an individual element of an indexed array, you use the array access (
`[]` ) operator to specify the index position of the element you wish to access.
For example, the following code represents the first element (the element at
index 0) in an indexed array named `songTitles`:

    songTitles[0]

The combination of the array variable name followed by the index in square
brackets functions as a single identifier. (In other words, it can be used in
any way a variable name can). You can assign a value to an indexed array element
by using the name and index on the left side of an assignment statement:

    songTitles[1] = "Symphony No. 5 in D minor";

Likewise, you can retrieve the value of an indexed array element by using the
name and index on the right side of an assignment statement:

    var nextSong:String = songTitles[2];

You can also use a variable in the square brackets rather than providing an
explicit value. (The variable must contain a non-negative integer value such as
a uint, a positive int, or a positive integer Number instance). This technique
is commonly used to "loop over" the elements in an indexed array and perform an
operation on some or all the elements. The following code listing demonstrates
this technique. The code uses a loop to access each value in an Array object
named `oddNumbers`. It uses the `trace()` statement to print each value in the
form "oddNumber\[ _index_ \] = _value_ ":

    var oddNumbers:Array = [1, 3, 5, 7, 9, 11];
    var len:uint = oddNumbers.length;
    for (var i:uint = 0; i < len; i++)
    {
        trace("oddNumbers[" + i.toString() + "] = " + oddNumbers[i].toString());
    }

#### The Array class

The first type of indexed array is the Array class. An Array instance can hold a
value of any data type. The same Array object can hold objects that are of
different data types. For example, a single Array instance can have a String
value in index 0, a Number instance in index 1, and an XML object in index 2.

#### The Vector class

Another type of indexed array that's available in ActionScript 3.0 is the Vector
class. A Vector instance is a _typed array_, which means that all the elements
in a Vector instance always have the same data type.

Note: The Vector class is available starting with Flash Player 10 and Adobe AIR
1.5.

When you declare a Vector variable or instantiate a Vector object, you
explicitly specify the data type of the objects that the Vector can contain. The
specified data type is known as the Vector's _base type_. At run time and at
compile time (in strict mode), any code that sets the value of a Vector element
or retrieves a value from a Vector is checked. If the data type of the object
being added or retrieved doesn't match the Vector's base type, an error occurs.

In addition to the data type restriction, the Vector class has other
restrictions that distinguish it from the Array class:

- A Vector is a dense array. An Array object may have values in indices 0 and 7
  even if it has no values in positions 1 through 6. However, a Vector must have
  a value (or `null` ) in each index.

- A Vector can optionally be fixed-length. This means that the number of
  elements the Vector contains can't change.

- Access to a Vector's elements is bounds-checked. You can never read a value
  from an index greater than the final element (`length` - 1). You can never set
  a value with an index more than one beyond the current final index. (In other
  words, you can only set a value at an existing index or at index `[length]`.)

As a result of its restrictions, a Vector has three primary benefits over an
Array instance whose elements are all instances of a single class:

- Performance: array element access and iteration are much faster when using a
  Vector instance than when using an Array instance.

- Type safety: in strict mode the compiler can identify data type errors.
  Examples of such errors include assigning a value of the incorrect data type
  to a Vector or expecting the wrong data type when reading a value from a
  Vector. At run time, data types are also checked when adding data to or
  reading data from a Vector object. Note, however, that when you use the
  `push()` method or `unshift()` method to add values to a Vector, the
  arguments' data types are not checked at compile time. When using those
  methods the values are still checked at run time.

- Reliability: runtime range checking (or fixed-length checking) increases
  reliability significantly over Arrays.

Aside from the additional restrictions and benefits, the Vector class is very
much like the Array class. The properties and methods of a Vector object are
similar—for the most part identical—to the properties and methods of an Array.
In most situations where you would use an Array in which all the elements have
the same data type, a Vector instance is preferable.

## Creating arrays

You can use several techniques to create an Array instance or a Vector instance.
However, the techniques to create each type of array are somewhat different.

### Creating an Array instance

You create an Array object by calling the `Array()` constructor or by using
Array literal syntax.

The `Array()` constructor function can be used in three ways. First, if you call
the constructor with no arguments, you get an empty array. You can use the
`length` property of the Array class to verify that the array has no elements.
For example, the following code calls the `Array()` constructor with no
arguments:

    var names:Array = new Array();
    trace(names.length); // output: 0

Second, if you use a number as the only parameter to the `Array()` constructor,
an array of that length is created, with each element's value set to
`undefined`. The argument must be an unsigned integer between the values 0 and
4,294,967,295. For example, the following code calls the `Array()` constructor
with a single numeric argument:

    var names:Array = new Array(3);
    trace(names.length); // output: 3
    trace(names[0]); // output: undefined
    trace(names[1]); // output: undefined
    trace(names[2]); // output: undefined

Third, if you call the constructor and pass a list of elements as parameters, an
array is created, with elements corresponding to each of the parameters. The
following code passes three arguments to the `Array()` constructor:

    var names:Array = new Array("John", "Jane", "David");
    trace(names.length); // output: 3
    trace(names[0]); // output: John
    trace(names[1]); // output: Jane
    trace(names[2]); // output: David

You can also create arrays with Array literals. An Array literal can be assigned
directly to an array variable, as shown in the following example:

    var names:Array = ["John", "Jane", "David"];

### Creating a Vector instance

You create a Vector instance by calling the `Vector.<T>()` constructor. You can
also create a Vector by calling the `Vector.<T>()` global function. That
function converts a specified object to a Vector instance. In Flash Professional
CS5 and later, Flash Builder 4 and later, and Flex 4 and later, you can also
create a vector instance by using Vector literal syntax.

Any time you declare a Vector variable (or similarly, a Vector method parameter
or method return type) you specify the base type of the Vector variable. You
also specify the base type when you create a Vector instance by calling the
`Vector.<T>()` constructor. Put another way, any time you use the term `Vector`
in ActionScript, it is accompanied by a base type.

You specify the Vector's base type using type parameter syntax. The type
parameter immediately follows the word `Vector` in the code. It consists of a
dot ( `.` ), then the base class name surrounded by angle brackets ( `<>` ), as
shown in this example:

    var v:Vector.<String>;
    v = new Vector.<String>();

In the first line of the example, the variable `v` is declared as a
`Vector.<String>` instance. In other words, it represents an indexed array that
can only hold String instances. The second line calls the `Vector()` constructor
to create an instance of the same Vector type (that is, a Vector whose elements
are all String objects). It assigns that object to `v`.

#### Using the Vector.\<T\>() constructor

If you use the `Vector.<T>()` constructor without any arguments, it creates an
empty Vector instance. You can test that a Vector is empty by checking its
`length` property. For example, the following code calls the `Vector.<T>()`
constructor with no arguments:

    var names:Vector.<String> = new Vector.<String>();
    trace(names.length); // output: 0

If you know ahead of time how many elements a Vector initially needs, you can
pre-define the number of elements in the Vector. To create a Vector with a
certain number of elements, pass the number of elements as the first parameter
(the `length` parameter). Because Vector elements can't be empty, the elements
are filled with instances of the base type. If the base type is a reference type
that allows `null` values, the elements all contain `null`. Otherwise, the
elements all contain the default value for the class. For example, a uint
variable can't be `null`. Consequently, in the following code listing the Vector
named `ages` is created with seven elements, each containing the value 0:

    var ages:Vector.<uint> = new Vector.<uint>(7);
    trace(ages); // output: 0,0,0,0,0,0,0

Finally, using the `Vector.<T>()` constructor you can also create a fixed-length
Vector by passing `true` for the second parameter (the `fixed` parameter). In
that case the Vector is created with the specified number of elements and the
number of elements can't be changed. Note, however, that you can still change
the values of the elements of a fixed-length Vector.

#### Using the Vector literal syntax constructor

In Flash Professional CS5 and later, Flash Builder 4 and later, and Flex 4 and
later, you can pass a list of values to the `Vector.<T>()` constructor to
specify the Vector's initial values:

    // var v:Vector.<T> = new <T>[E0, ..., En-1 ,];
    // For example:
    var v:Vector.<int> = new <int>[0,1,2,];

The following information applies to this syntax:

- The trailing comma is optional.

- Empty items in the array are not supported; a statement such as
  `var v:Vector.<int> = new <int>[0,,2,]` throws a compiler error.

- You can't specify a default length for the Vector instance. Instead, the
  length is the same as the number of elements in the initialization list.

- You can't specify whether the Vector instance has a fixed length. Instead, use
  the `fixed` property.

- Data loss or errors can occur if items passed as values don't match the
  specified type. For example:

      var v:Vector.<int> = new <int>[4.2]; // compiler error when running in strict mode
      trace(v[0]); //returns 4 when not running in strict mode

#### Using the Vector.\<T\>() global function

In addition to the `Vector.<T>()` and Vector literal syntax constructors, you
can also use the `Vector.<T>()` global function to create a Vector object. The
`Vector.<T>()` global function is a conversion function. When you call the
`Vector.<T>()` global function you specify the base type of the Vector that the
method returns. You pass a single indexed array (Array or Vector instance) as an
argument. The method then returns a Vector with the specified base type,
containing the values in the source array argument. The following code listing
shows the syntax for calling the `Vector.<T>()` global function:

    var friends:Vector.<String> = Vector.<String>(["Bob", "Larry", "Sarah"]);

The `Vector.<T>()` global function performs data type conversion on two levels.
First, when an Array instance is passed to the function, a Vector instance is
returned. Second, whether the source array is an Array or Vector instance the
function attempts to convert the source array's elements to values of the base
type. The conversion uses standard ActionScript data type conversion rules. For
example, the following code listing converts the String values in the source
Array to integers in the result Vector. The decimal portion of the first value (
`"1.5"` ) is truncated, and the non-numeric third value ( `"Waffles"` ) is
converted to 0 in the result:

    var numbers:Vector.<int> = Vector.<int>(["1.5", "17", "Waffles"]);
    trace(numbers); // output: 1,17,0

If any of the source elements can't be converted, an error occurs.

When code calls the `Vector.<T>()` global function, if an element in the source
array is an instance of a subclass of the specified base type, the element is
added to the result Vector (no error occurs). Using the `Vector.<T>()` global
function is the only way to convert a Vector with base type `T` to a Vector with
a base type that's a superclass of `T`.

## Inserting array elements

The most basic way to add an element to an indexed array is to use the array
access ( `[]` ) operator. To set the value of an indexed array element, use the
Array or Vector object name and index number on the left side of an assignment
statement:

    songTitles[5] = "Happy Birthday";

If the Array or Vector doesn't already have an element at that index, the index
is created and the value is stored there. If a value exists at that index, the
new value replaces the existing one.

An Array object allows you to create an element at any index. However, with a
Vector object you can only assign a value to an existing index or to the next
available index. The next available index corresponds to the Vector object's
`length` property. The safest way to add a new element to a Vector object is to
use code like this listing:

    myVector[myVector.length] = valueToAdd;

Three of the Array and Vector class methods— `push()`, `unshift()`, and
`splice()` —allow you to insert elements into an indexed array. The `push()`
method appends one or more elements to the end of an array. In other words, the
last element inserted into the array using the `push()` method will have the
highest index number. The `unshift()` method inserts one or more elements at the
beginning of an array, which is always at index number 0. The `splice()` method
will insert any number of items at a specified index in the array.

The following example demonstrates all three methods. An array named `planets`
is created to store the names of the planets in order of proximity to the Sun.
First, the `push()` method is called to add the initial item, `Mars`. Second,
the `unshift()` method is called to insert the item that belongs at the front of
the array, `Mercury`. Finally, the `splice()` method is called to insert the
items `Venus` and `Earth` after `Mercury`, but before `Mars`. The first argument
sent to `splice()`, the integer 1, directs the insertion to begin at index 1.
The second argument sent to `splice()`, the integer 0, indicates that no items
should be deleted. Finally, the third and fourth arguments sent to `splice()`,
`Venus` and `Earth`, are the items to be inserted.

    var planets:Array = new Array();
    planets.push("Mars"); // array contents: Mars
    planets.unshift("Mercury"); // array contents: Mercury,Mars
    planets.splice(1, 0, "Venus", "Earth");
    trace(planets); // array contents: Mercury,Venus,Earth,Mars

The `push()` and `unshift()` methods both return an unsigned integer that
represents the length of the modified array. The `splice()` method returns an
empty array when used to insert elements, which may seem strange, but makes more
sense in light of the `splice()` method's versatility. You can use the
`splice()` method not only to insert elements into an array, but also to remove
elements from an array. When used to remove elements, the `splice()` method
returns an array containing the elements removed.

Note: If a Vector object's `fixed` property is `true`, the total number of
elements in the Vector can't change. If you try to add a new element to a
fixed-length Vector using the techniques described here, an error occurs.

## Retrieving values and removing array elements

The simplest way to retrieve the value of an element from an indexed array is to
use the array access ( `[]` ) operator. To retrieve the value of an indexed
array element, use the Array or Vector object name and index number on the right
side of an assignment statement:

    var myFavoriteSong:String = songTitles[3];

It's possible to attempt to retrieve a value from an Array or Vector using an
index where no element exists. In that case, an Array object returns the value
undefined and a Vector throws a RangeError exception.

Three methods of the Array and Vector classes— `pop()`, `shift()`, and
`splice()` —allow you to remove elements. The `pop()` method removes an element
from the end of the array. In other words, it removes the element at the highest
index number. The `shift()` method removes an element from the beginning of the
array, which means that it always removes the element at index number 0. The
`splice()` method, which can also be used to insert elements, removes an
arbitrary number of elements starting at the index number specified by the first
argument sent to the method.

The following example uses all three methods to remove elements from an Array
instance. An Array named `oceans` is created to store the names of large bodies
of water. Some of the names in the Array are lakes rather than oceans, so they
need to be removed.

First, the `splice()` method is used to remove the items `Aral` and `Superior`,
and insert the items `Atlantic` and `Indian`. The first argument sent to
`splice()`, the integer 2, indicates that the operation should start with the
third item in the list, which is at index 2. The second argument, 2, indicates
that two items should be removed. The remaining arguments, `Atlantic` and
`Indian`, are values to be inserted at index 2.

Second, the `pop()` method is used to remove last element in the array, `Huron`.
And third, the `shift()` method is used to remove the first item in the array,
`Victoria`.

    var oceans:Array = ["Victoria", "Pacific", "Aral", "Superior", "Indian", "Huron"];
    oceans.splice(2, 2, "Arctic", "Atlantic"); // replaces Aral and Superior
    oceans.pop(); // removes Huron
    oceans.shift(); // removes Victoria
    trace(oceans);// output: Pacific,Arctic,Atlantic,Indian

The `pop()` and `shift()` methods both return the item that was removed. For an
Array instance, the data type of the return value is Object because arrays can
hold values of any data type. For a Vector instance, the data type of the return
value is the base type of the Vector. The `splice()` method returns an Array or
Vector containing the values removed. You can change the `oceans` Array example
so that the call to `splice()` assigns the returned Array to a new Array
variable, as shown in the following example:

    var lakes:Array = oceans.splice(2, 2, "Arctic", "Atlantic");
    trace(lakes); // output: Aral,Superior

You may come across code that uses the `delete` operator on an Array object
element. The `delete` operator sets the value of an Array element to
`undefined`, but it does not remove the element from the Array. For example, the
following code uses the `delete` operator on the third element in the `oceans`
Array, but the length of the Array remains 5:

    var oceans:Array = ["Arctic", "Pacific", "Victoria", "Indian", "Atlantic"];
    delete oceans[2];
    trace(oceans);// output: Arctic,Pacific,,Indian,Atlantic
    trace(oceans[2]); // output: undefined
    trace(oceans.length); // output: 5

You can truncate an Array or Vector using an array's `length` property. If you
set the `length` property of an indexed array to a length that is less than the
current length of the array, the array is truncated, removing any elements
stored at index numbers higher than the new value of `length` minus 1. For
example, if the `oceans` array were sorted such that all valid entries were at
the beginning of the array, you could use the `length` property to remove the
entries at the end of the array, as shown in the following code:

    var oceans:Array = ["Arctic", "Pacific", "Victoria", "Aral", "Superior"];
    oceans.length = 2;
    trace(oceans); // output: Arctic,Pacific

Note: If a Vector object's `fixed` property is `true`, the total number of
elements in the Vector can't change. If you try to remove an element from or
truncate a fixed-length Vector using the techniques described here, an error
occurs.

## Sorting an array

There are three methods— `reverse()`, `sort()`, and `sortOn()` —that allow you
to change the order of an indexed array, either by sorting or reversing the
order. All of these methods modify the existing array. The following table
summarizes these methods and their behavior for Array and Vector objects:

| Method      | Array behavior                                                                                                                                                   | Vector behavior                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `reverse()` | Changes the order of the elements so that the last element becomes the first element, the penultimate element becomes the second, and so on                      | Identical to Array behavior                                                   |
| `sort()`    | Allows you to sort the Array's elements in a variety of predefined ways, such as alphabetical or numeric order. You can also specify a custom sorting algorithm. | Sorts the elements according to the custom sorting algorithm that you specify |
| `sortOn()`  | Allows you to sort objects that have one or more common properties, specifying the property or properties to use as the sort keys                                | Not available in the Vector class                                             |

#### The reverse() method

The `reverse()` method takes no parameters and does not return a value, but
allows you to toggle the order of your array from its current state to the
reverse order. The following example reverses the order of the oceans listed in
the `oceans` array:

    var oceans:Array = ["Arctic", "Atlantic", "Indian", "Pacific"];
    oceans.reverse();
    trace(oceans); // output: Pacific,Indian,Atlantic,Arctic

#### Basic sorting with the sort() method (Array class only)

For an Array instance, the `sort()` method rearranges the elements in an array
using the _default sort order_. The default sort order has the following
characteristics:

- The sort is case-sensitive, which means that uppercase characters precede
  lowercase characters. For example, the letter D precedes the letter b.

- The sort is ascending, which means that lower character codes (such as A)
  precede higher character codes (such as B).

- The sort places identical values adjacent to each other but in no particular
  order.

- The sort is string-based, which means that elements are converted to strings
  before they are compared (for example, 10 precedes 3 because the string `"1"`
  has a lower character code than the string `"3"` has).

You may find that you need to sort your Array without regard to case, or in
descending order, or perhaps your array contains numbers that you want to sort
numerically instead of alphabetically. The Array class's `sort()` method has an
`options` parameter that allows you to alter each characteristic of the default
sort order. The options are defined by a set of static constants in the Array
class, as shown in the following list:

- `Array.CASEINSENSITIVE` : This option makes the sort disregard case. For
  example, the lowercase letter b precedes the uppercase letter D.

- `Array.DESCENDING:` This reverses the default ascending sort. For example, the
  letter B precedes the letter A.

- `Array.UNIQUESORT:` This causes the sort to abort if two identical values are
  found.

- `Array.NUMERIC:` This causes numerical sorting, so that 3 precedes 10.

The following example highlights some of these options. An Array named `poets`
is created that is sorted using several different options.

    var poets:Array = ["Blake", "cummings", "Angelou", "Dante"];
    poets.sort(); // default sort
    trace(poets); // output: Angelou,Blake,Dante,cummings

    poets.sort(Array.CASEINSENSITIVE);
    trace(poets); // output: Angelou,Blake,cummings,Dante

    poets.sort(Array.DESCENDING);
    trace(poets); // output: cummings,Dante,Blake,Angelou

    poets.sort(Array.DESCENDING | Array.CASEINSENSITIVE); // use two options
    trace(poets); // output: Dante,cummings,Blake,Angelou

#### Custom sorting with the sort() method (Array and Vector classes)

In addition to the basic sorting that's available for an Array object, you can
also define a custom sorting rule. This technique is the only form of the
`sort()` method that is available for the Vector class. To define a custom sort,
you write a custom sort function and pass it as an argument to the `sort()`
method.

For example, if you have a list of names in which each list element contains a
person's full name, but you want to sort the list by last name, you must use a
custom sort function to parse each element and use the last name in the sort
function. The following code shows how this can be done with a custom function
that is used as a parameter to the `Array.sort()` method:

    var names:Array = new Array("John Q. Smith", "Jane Doe", "Mike Jones");
    function orderLastName(a, b):int
    {
        var lastName:RegExp = /\b\S+$/;
        var name1 = a.match(lastName);
        var name2 = b.match(lastName);
        if (name1 < name2)
        {
            return -1;
        }
        else if (name1 > name2)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    trace(names); // output: John Q. Smith,Jane Doe,Mike Jones
    names.sort(orderLastName);
    trace(names); // output: Jane Doe,Mike Jones,John Q. Smith

The custom sort function `orderLastName()` uses a regular expression to extract
the last name from each element to use for the comparison operation. The
function identifier `orderLastName` is used as the sole parameter when calling
the `sort()` method on the `names` array. The sort function accepts two
parameters, `a` and `b`, because it works on two array elements at a time. The
sort function's return value indicates how the elements should be sorted:

- A return value of -1 indicates that the first parameter, `a`, precedes the
  second parameter, `b`.

- A return value of 1 indicates that the second parameter, `b`, precedes the
  first, `a`.

- A return value of 0 indicates that the elements have equal sorting precedence.

#### The sortOn() method (Array class only)

The `sortOn()` method is designed for Array objects with elements that contain
objects. These objects are expected to have at least one common property that
can be used as the sort key. The use of the `sortOn()` method for arrays of any
other type yields unexpected results.

Note: The Vector class does not include a `sortOn()` method. This method is only
available for Array objects.

The following example revises the `poets` Array so that each element is an
object instead of a string. Each object holds both the poet's last name and year
of birth.

    var poets:Array = new Array();
    poets.push({name:"Angelou", born:"1928"});
    poets.push({name:"Blake", born:"1757"});
    poets.push({name:"cummings", born:"1894"});
    poets.push({name:"Dante", born:"1265"});
    poets.push({name:"Wang", born:"701"});

You can use the `sortOn()` method to sort the Array by the `born` property. The
`sortOn()` method defines two parameters, `fieldName` and `options`. The
`fieldName` argument must be specified as a string. In the following example,
`sortOn()` is called with two arguments, " `born"` and `Array.NUMERIC`. The
`Array.NUMERIC` argument is used to ensure that the sort is done numerically
instead of alphabetically. This is a good practice even when all the numbers
have the same number of digits because it ensures that the sort will continue to
behave as expected if a number with fewer or more digits is later added to the
array.

    poets.sortOn("born", Array.NUMERIC);
    for (var i:int = 0; i < poets.length; ++i)
    {
        trace(poets[i].name, poets[i].born);
    }
    /* output:
    Wang 701
    Dante 1265
    Blake 1757
    cummings 1894
    Angelou 1928
    */

#### Sorting without modifying the original array (Array class only)

Generally, the `sort()` and `sortOn()` methods modify an Array. If you wish to
sort an Array without modifying the existing array, pass the
`Array.RETURNINDEXEDARRAY` constant as part of the `options` parameter. This
option directs the methods to return a new Array that reflects the sort and to
leave the original Array unmodified. The Array returned by the methods is a
simple Array of index numbers that reflects the new sort order and does not
contain any elements from the original Array. For example, to sort the `poets`
Array by birth year without modifying the Array, include the
`Array.RETURNINDEXEDARRAY` constant as part of the argument passed for the
`options` parameter.

The following example stores the returned index information in an Array named
`indices` and uses the `indices` array in conjunction with the unmodified
`poets` array to output the poets in order of birth year:

    var indices:Array;
    indices = poets.sortOn("born", Array.NUMERIC | Array.RETURNINDEXEDARRAY);
    for (var i:int = 0; i < indices.length; ++i)
    {
        var index:int = indices[i];
        trace(poets[index].name, poets[index].born);
    }
    /* output:
    Wang 701
    Dante 1265
    Blake 1757
    cummings 1894
    Angelou 1928
    */

## Querying an array

Four methods of the Array and Vector classes— `concat()`, `join()`, `slice()`,
and `toString()` —all query the array for information, but do not modify the
array. The `concat()` and `slice()` methods both return new arrays, while the
`join()` and `toString()` methods both return strings. The `concat()` method
takes a new array or list of elements as arguments and combines it with the
existing array to create a new array. The `slice()` method has two parameters,
aptly named `startIndex` and an `endIndex`, and returns a new array containing a
copy of the elements "sliced" from the existing array. The slice begins with the
element at `startIndex` and ends with the element just before `endIndex`. That
bears repeating: the element at `endIndex` is not included in the return value.

The following example uses `concat()` and `slice()` to create new arrays using
elements of other arrays:

    var array1:Array = ["alpha", "beta"];
    var array2:Array = array1.concat("gamma", "delta");
    trace(array2); // output: alpha,beta,gamma,delta

    var array3:Array = array1.concat(array2);
    trace(array3); // output: alpha,beta,alpha,beta,gamma,delta

    var array4:Array = array3.slice(2,5);
    trace(array4); // output: alpha,beta,gamma

You can use the `join()` and `toString()` methods to query the array and return
its contents as a string. If no parameters are used for the `join()` method, the
two methods behave identically—they return a string containing a comma-delimited
list of all elements in the array. The `join()` method, unlike the `toString()`
method, accepts a parameter named `delimiter`, which allows you to choose the
symbol to use as a separator between each element in the returned string.

The following example creates an Array called `rivers` and calls both `join()`
and `toString()` to return the values in the Array as a string. The `toString()`
method is used to return comma-separated values ( `riverCSV` ), while the
`join()` method is used to return values separated by the `+` character.

    var rivers:Array = ["Nile", "Amazon", "Yangtze", "Mississippi"];
    var riverCSV:String = rivers.toString();
    trace(riverCSV); // output: Nile,Amazon,Yangtze,Mississippi
    var riverPSV:String = rivers.join("+");
    trace(riverPSV); // output: Nile+Amazon+Yangtze+Mississippi

One issue to be aware of with the `join()` method is that any nested Array or
Vector instances are always returned with comma-separated values, no matter what
separator you specify for the main array elements, as the following example
shows:

    var nested:Array = ["b","c","d"];
    var letters:Array = ["a",nested,"e"];
    var joined:String = letters.join("+");
    trace(joined); // output: a+b,c,d+e
