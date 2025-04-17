---
sidebar_position: 6
---

# Extending the Array class

The Array class is one of the few core classes that is not final, which means
that you can create your own subclass of Array. This section provides an example
of how to create a subclass of Array and discusses some of the issues that can
arise during the process.

As mentioned previously, arrays in ActionScript are not typed, but you can
create a subclass of Array that accepts elements of only a specific data type.
The example in the following sections defines an Array subclass named TypedArray
that limits its elements to values of the data type specified in the first
parameter. The TypedArray class is presented merely as an example of how to
extend the Array class and may not be suitable for production purposes for
several reasons. First, type checking occurs at run time rather than at compile
time. Second, when a TypedArray method encounters a mismatch, the mismatch is
ignored and no exception is thrown, although the methods can be easily modified
to throw exceptions. Third, the class cannot prevent the use of the array access
operator to insert values of any type into the array. Fourth, the coding style
favors simplicity over performance optimization.

Note: You can use the technique described here to create a typed array. However,
a better approach is to use a Vector object. A Vector instance is a true typed
array, and provides performance and other improvements over the Array class or
any subclass. The purpose of this discussion is to demonstrate how to create an
Array subclass.

#### Declaring the subclass

Use the `extends` keyword to indicate that a class is a subclass of Array. A
subclass of Array should use the `dynamic` attribute, just as the Array class
does. Otherwise, your subclass will not function properly.

The following code shows the definition of the TypedArray class, which contains
a constant to hold the data type, a constructor method, and the four methods
that are capable of adding elements to the array. The code for each method is
omitted in this example, but is delineated and explained fully in the sections
that follow:

```
public dynamic class TypedArray extends Array
{
    private const dataType:Class;

    public function TypedArray(...args) {}

    AS3 override function concat(...args):Array {}

    AS3 override function push(...args):uint {}

    AS3 override function splice(...args) {}

    AS3 override function unshift(...args):uint {}
}
```

The four overridden methods all use the AS3 namespace instead of the `public`
attribute because this example assumes that the compiler option `-as3` is set to
`true` and the compiler option `-es` is set to `false`. These are the default
settings for Adobe Flash Builder and for AdobeFlashProfessional.

![](../../img/tip_help.png) If you are an advanced developer who prefers to use
prototype inheritance, you can make two minor changes to the TypedArray class to
make it compile with the compiler option `-es` set to `true`. First, remove all
occurrences of the `override` attribute and replace the AS3 namespace with the
`public` attribute. Second, substitute `Array.prototype` for all four
occurrences of `super` _._

#### TypedArray constructor

The subclass constructor poses an interesting challenge because the constructor
must accept a list of arguments of arbitrary length. The challenge is how to
pass the arguments on to the superconstructor to create the array. If you pass
the list of arguments as an array, the superconstructor considers it a single
argument of type Array and the resulting array is always 1 element long. The
traditional way to handle pass-through argument lists is to use the
`Function.apply()` method, which takes an array of arguments as its second
parameter but converts it to a list of arguments when executing the function.
Unfortunately, the `Function.apply()` method cannot be used with constructors.

The only option left is to recreate the logic of the Array constructor in the
TypedArray constructor. The following code shows the algorithm used in the Array
class constructor, which you can reuse in your Array subclass constructor:

```
public dynamic class Array
{
    public function Array(...args)
    {
        var n:uint = args.length
        if (n == 1 && (args[0] is Number))
        {
            var dlen:Number = args[0];
            var ulen:uint = dlen;
            if (ulen != dlen)
            {
                throw new RangeError("Array index is not a 32-bit unsigned integer ("+dlen+")");
            }
            length = ulen;
        }
        else
        {
            length = n;
            for (var i:int=0; i < n; i++)
            {
                this[i] = args[i]
            }
        }
    }
}
```

The TypedArray constructor shares most of the code from the Array constructor,
with only four changes to the code. First, the parameter list includes a new
required parameter of type Class that allows specification of the array's data
type. Second, the data type passed to the constructor is assigned to the
`dataType` variable. Third, in the `else` statement, the value of the `length`
property is assigned after the `for` loop so that `length` includes only
arguments that are the proper type. Fourth, the body of the `for` loop uses the
overridden version of the `push()` method so that only arguments of the correct
data type are added to the array. The following example shows the TypedArray
constructor function:

```
public dynamic class TypedArray extends Array
{
    private var dataType:Class;
    public function TypedArray(typeParam:Class, ...args)
    {
        dataType = typeParam;
        var n:uint = args.length
        if (n == 1 && (args[0] is Number))
        {
            var dlen:Number = args[0];
            var ulen:uint = dlen
            if (ulen != dlen)
            {
                throw new RangeError("Array index is not a 32-bit unsigned integer ("+dlen+")")
            }
            length = ulen;
        }
        else
        {
            for (var i:int=0; i < n; i++)
            {
                // type check done in push()
                this.push(args[i])
            }
            length = this.length;
        }
    }
}
```

#### TypedArray overridden methods

The TypedArray class overrides the four methods of the Array class that are
capable of adding elements to an array. In each case, the overridden method adds
a type check that prevents the addition of elements that are not the correct
data type. Subsequently, each method calls the superclass version of itself.

The `push()` method iterates through the list of arguments with a `for..in` loop
and does a type check on each argument. Any argument that is not the correct
type is removed from the `args` array with the `splice()` method. After the
`for..in` loop ends, the `args` array contains values only of type `dataType`.
The superclass version of `push()` is then called with the updated `args` array,
as the following code shows:

 ```
AS3 override function push(...args):uint
{
    for (var i:* in args)
    {
        if (!(args[i] is dataType))
        {
            args.splice(i,1);
        }
    }
    return (super.push.apply(this, args));
}
```

The `concat()` method creates a temporary TypedArray named `passArgs` to store
the arguments that pass the type check. This allows the reuse of the type check
code that exists in the `push()` method. A `for..in` loop iterates through the
`args` array, and calls `push()` on each argument. Because `passArgs` is typed
as TypedArray, the TypedArray version of `push()` is executed. The `concat()`
method then calls its own superclass version, as the following code shows:

```
AS3 override function concat(...args):Array
{
    var passArgs:TypedArray = new TypedArray(dataType);
    for (var i:* in args)
    {
        // type check done in push()
        passArgs.push(args[i]);
    }
    return (super.concat.apply(this, passArgs));
}
```

The `splice()` method takes an arbitrary list of arguments, but the first two
arguments always refer to an index number and the number of elements to delete.
This is why the overridden `splice()` method does type checking only for `args`
array elements in index positions 2 or higher. One point of interest in the code
is that there appears to be a recursive call to `splice()` inside the `for`
loop, but this is not a recursive call because `args` is of type Array rather
than TypedArray, which means that the call to `args.splice()` is a call to the
superclass version of the method. After the `for..in` loop concludes, the `args`
array contains only values of the correct type in index positions 2 or higher,
and `splice()` calls its own superclass version, as shown in the following code:

```
AS3 override function splice(...args):*
{
    if (args.length > 2)
    {
        for (var i:int=2; i< args.length; i++)
        {
            if (!(args[i] is dataType))
            {
                args.splice(i,1);
            }
        }
    }
    return (super.splice.apply(this, args));
}
```

The `unshift()` method, which adds elements to the beginning of an array, also
accepts an arbitrary list of arguments. The overridden `unshift()` method uses
an algorithm very similar to that used by the `push()` method, as shown in the
following example code:

```
AS3 override function unshift(...args):uint
{
    for (var i:* in args)
    {
        if (!(args[i] is dataType))
        {
            args.splice(i,1);
        }
    }
    return (super.unshift.apply(this, args));
}
```
