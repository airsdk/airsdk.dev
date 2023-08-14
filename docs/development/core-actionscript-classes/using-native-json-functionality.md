---
title: Using native JSON functionality
sidebar_position: 7
---

ActionScript 3.0 provides a native API for encoding and decoding ActionScript
objects using JavaScript Object Notation (JSON) format. The JSON class and
supporting member functions follow the ECMA-262 5th edition specification with
few variances.

![](../img/byline.png) Community member Todd Anderson provides a comparison
of the native JSON API and the third-party
[as3corelib](https://github.com/mikechambers/as3corelib) JSON class. See
[Working with Native JSON in Flash Player 11](https://web.archive.org/web/20180410161903/http://blog.infrared5.com/2011/07/working-with-native-json-in-flash-player-11).

## Overview of the JSON API

The ActionScript JSON API consists of the JSON class and `toJSON()` member
functions on a few native classes. For applications that require a custom JSON
encoding for any class, the ActionScript framework provides ways to override the
default encoding.

The JSON class internally handles import and export for any ActionScript class
that does not provide a `toJSON()` member. For such cases, JSON traverses the
public properties of each object it encounters. If an object contains other
objects, JSON recurses into the nested objects and performs the same traversal.
If any object provides a `toJSON()` method, JSON uses that custom method instead
of its internal algorithm.

The JSON interface consists of an encoding method, `stringify()`, and a decoding
method, `parse()`. Each of these methods provides a parameter that lets you
insert your own logic into the JSON encoding or decoding workflow. For
`stringify()`, this parameter is named `replacer`; for `parse()`, it is
`reviver`. These parameters take a function definition with two arguments using
the following signature:

    function(k, v):*

### toJSON() methods

The signature for `toJSON()` methods is

    public function toJSON(k:String):*

`JSON.stringify()` calls `toJSON()`, if it exists, for each public property that
it encounters during its traversal of an object. A property consists of a
key-value pair. When `stringify()`) calls `toJSON()`, it passes in the key, `k`,
of the property that it is currently examining. A typical `toJSON()`
implementation evaluates each property name and returns the desired encoding of
its value.

The `toJSON()` method can return a value of any type (denoted as \*)—not just a
String. This variable return type allows `toJSON()` to return an object if
appropriate. For example, if a property of your custom class contains an object
from another third-party library, you can return that object when `toJSON()`
encounters your property. JSON then recurses into the third-party object. The
encoding process flow behaves as follows:

- If `toJSON()` returns an object that doesn't evaluate to a string,
  `stringify()` recurses into that object.

- If `toJSON()` returns a string, `stringify()` wraps that value in another
  string, returns the wrapped string, and then moves to the next value.

In many cases, returning an object is preferable to returning a JSON string
created by your application. Returning an object takes leverages the built-in
JSON encoding algorithm and also allows JSON to recurse into nested objects.

The `toJSON()` method is not defined in the Object class or in most other native
classes. Its absence tells JSON to perform its standard traversal over the
object's public properties. If you like, you can also use `toJSON()` to expose
your object's private properties.

A few native classes pose challenges that the ActionScript libraries can't solve
effectively for all use cases. For these classes, ActionScript provides a
trivial implementation that clients can reimplement to suit their needs. The
classes that provide trivial `toJSON()` members include:

- ByteArray

- Date

- Dictionary

- XML

You can subclass the ByteArray class to override its `toJSON()` method, or you
can redefine its prototype. The Date and XML classes, which are declared final,
require you to use the class prototype to redefine `toJSON()`. The Dictionary
class is declared dynamic, which gives you extra freedom in overriding
`toJSON()`.

## Defining custom JSON behavior

To implement your own JSON encoding and decoding for native classes, you can
choose from several options:

- Defining or overriding `toJSON()` on your custom subclass of a non-final
  native class

- Defining or redefining `toJSON()` on the class prototype

- Defining a `toJSON` property on a dynamic class

- Using the `JSON.stringify() replacer` and `JSON.parser() reviver` parameters

### Defining toJSON() on the prototype of a built-in class

The native JSON implementation in ActionScript mirrors the ECMAScript JSON
mechanism defined in ECMA-262, 5th edition. Since ECMAScript doesn't support
classes, ActionScript defines JSON behavior in terms of prototype-based
dispatch. Prototypes are precursors to ActionScript 3.0 classes that allow
simulated inheritance as well as member additions and redefinitions.

ActionScript allows you to define or redefine `toJSON()` on the prototype of any
class. This privilege applies even to classes that are marked final. When you
define `toJSON()` on a class prototype, your definition becomes current for all
instances of that class within the scope of your application. For example,
here's how you can define a `toJSON()` method on the MovieClip prototype:

    MovieClip.prototype.toJSON = function(k):* {
        trace("prototype.toJSON() called.");
        return "toJSON";
    }

When your application then calls `stringify()` on any MovieClip instance,
`stringify()` returns the output of your `toJSON()` method:

    var mc:MovieClip = new MovieClip();
    var js:String = JSON.stringify(mc); //"prototype toJSON() called."
    trace("js: " + js); //"js: toJSON"

You can also override `toJSON()` in native classes that define the method. For
example, the following code overrides `Date.toJSON()`:

    Date.prototype.toJSON = function (k):* {
        return "any date format you like via toJSON: "+
            "this.time:"+this.time + " this.hours:"+this.hours;
    }
    var dt:Date = new Date();
    trace(JSON.stringify(dt));
    // "any date format you like via toJSON: this.time:1317244361947 this.hours:14"

### Defining or overriding toJSON() at the class level

Applications aren't always required to use prototypes to redefine `toJSON()`.
You can also define `toJSON()` as a member of a subclass if the parent class is
not marked final. For example, you can extend the ByteArray class and define a
public `toJSON()` function:

    package
    {
        import flash.utils.ByteArray;
        public class MyByteArray extends ByteArray
        {
            public function MyByteArray() {
            }

            public function toJSON(s:String):*
            {
                return "MyByteArray";
            }

        }
    }


    var ba:ByteArray = new ByteArray();
    trace(JSON.stringify(ba)); //"ByteArray"
    var mba:MyByteArray = new MyByteArray(); //"MyByteArray"
    trace(JSON.stringify(mba)); //"MyByteArray"

If a class is dynamic, you can add a `toJSON` property to an object of that
class and assign a function to it as follows:

    var d:Dictionary = new Dictionary();
    trace(JSON.stringify((d))); // "Dictionary"
    d.toJSON = function(){return {c : "toJSON override."};} // overrides existing function
    trace(JSON.stringify((d))); // {"c":"toJSON override."}

You can override, define, or redefine `toJSON()` on any ActionScript class.
However, most built-in ActionScript classes don't define `toJSON()`. The Object
class does not define `toJSON` in its default prototype or declare it as a class
member. Only a handful of native classes define the method as a prototype
function. Thus, in most classes you can't override `toJSON()` in the traditional
sense.

Native classes that don't define `toJSON()` are serialized to JSON by the
internal JSON implementation. Avoid replacing this built-in functionality if
possible. If you define a `toJSON()` member, the JSON class uses your logic
instead of its own functionality.

### Using the JSON.stringify() replacer parameter

Overriding `toJSON()` on the prototype is useful for changing a class's JSON
export behavior throughout an application. In some cases, though, your export
logic might apply only to special cases under transient conditions. To
accommodate such small-scope changes, you can use the `replacer` parameter of
the `JSON.stringify()` method.

The `stringify()` method applies the function passed through the `replacer`
parameter to the object being encoded. The signature for this function is
similar to that of `toJSON()`:

    function (k,v):*

Unlike `toJSON()`, the `replacer` function requires the value, `v`, as well as
the key, `k`. This difference is necessary because `stringify()` is defined on
the static JSON object instead of the object being encoded. When
`JSON.stringify()` calls `replacer(k,v)`, it is traversing the original input
object. The implicit `this` parameter passed to the `replacer` function refers
to the object that holds the key and value. Because `JSON.stringify()` does not
modify the original input object, that object remains unchanged in the container
being traversed. Thus, you can use the code `this[k]` to query the key on the
original object. The `v` parameter holds the value that `toJSON()` converts.

Like `toJSON()`, the `replacer` function can return any type of value. If
`replacer` returns a string, the JSON engine escapes the contents in quotes and
then wraps those escaped contents in quotes as well. This wrapping guarantees
that `stringify()` receives a valid JSON string object that remains a string in
a subsequent call to `JSON.parse()`.

The following code uses the `replacer` parameter and the implicit `this`
parameter to return the `time` and `hours` values of a Date object:

    JSON.stringify(d, function (k,v):* {
        return "any date format you like via replacer: "+
            "holder[k].time:"+this[k].time + " holder[k].hours:"+this[k].hours;
    });

### Using the JSON.parse() reviver parameter

The `reviver` parameter of the `JSON.parse()` method does the opposite of the
`replacer` function: It converts a JSON string into a usable ActionScript
object. The `reviver` argument is a function that takes two parameters and
returns any type:

    function (k,v):*

In this function, `k` is a key, and `v` is the value of `k`. Like `stringify()`,
`parse()` traverses the JSON key-value pairs and applies the `reviver`
function—if one exists—to each pair. A potential problem is the fact that the
JSON class does not output an object's ActionScript class name. Thus, it can be
challenging to know which type of object to revive. This problem can be
especially troublesome when objects are nested. In designing `toJSON()`,
`replacer`, and `reviver` functions, you can devise ways to identify the
ActionScript objects that are exported while keeping the original objects
intact.

### Parsing example

The following example shows a strategy for reviving objects parsed from JSON
strings. This example defines two classes: JSONGenericDictExample and
JSONDictionaryExtnExample. Class JSONGenericDictExample is a custom dictionary
class. Each record contains a person's name and birthday, as well as a unique
ID. Each time the JSONGenericDictExample constructor is called, it adds the
newly created object to an internal static array with a statically incrementing
integer as its ID. Class JSONGenericDictExample also defines a `revive()` method
that extracts just the integer portion from the longer `id` member. The
`revive()` method uses this integer to look up and return the correct revivable
object.

Class JSONDictionaryExtnExample extends the ActionScript Dictionary class. Its
records have no set structure and can contain any data. Data is assigned after a
JSONDictionaryExtnExample object is constructed, rather than as class-defined
properties. JSONDictionaryExtnExample records use JSONGenericDictExample objects
as keys. When a JSONDictionaryExtnExample object is revived, the
`JSONGenericDictExample.revive()` function uses the ID associated with
JSONDictionaryExtnExample to retrieve the correct key object.

Most importantly, the `JSONDictionaryExtnExample.toJSON()` method returns a
marker string in addition to the JSONDictionaryExtnExample object. This string
identifies the JSON output as belonging to the JSONDictionaryExtnExample class.
This marker leaves no doubt as to which object type is being processed during
`JSON.parse()`.

    package {
        // Generic dictionary example:
        public class JSONGenericDictExample {
            static var revivableObjects = [];
            static var nextId = 10000;
            public var id;
            public var dname:String;
            public var birthday;

            public function JSONGenericDictExample(name, birthday) {
                revivableObjects[nextId] = this;
                this.id       = "id_class_JSONGenericDictExample_" + nextId;
                this.dname     = name;
                this.birthday = birthday;
                nextId++;
            }
            public function toString():String { return this.dname; }
            public static function revive(id:String):JSONGenericDictExample {
                var r:RegExp = /^id_class_JSONGenericDictExample_([0-9]*)$/;
                var res = r.exec(id);
                return JSONGenericDictExample.revivableObjects[res[1]];
            }
        }
    }

    package {
        import flash.utils.Dictionary;
        import flash.utils.ByteArray;

        // For this extension of dictionary, we serialize the contents of the
        // dictionary by using toJSON
        public final class JSONDictionaryExtnExample extends Dictionary {
            public function toJSON(k):* {
                var contents = {};
                for (var a in this) {
                    contents[a.id] = this[a];
                }

                // We also wrap the contents in an object so that we can
                // identify it by looking for the marking property "class E"
                // while in the midst of JSON.parse.
                return {"class JSONDictionaryExtnExample": contents};
            }

            // This is just here for debugging and for illustration
            public function toString():String {
                var retval = "[JSONDictionaryExtnExample <";
                var printed_any = false;
                for (var k in this) {
                    retval += k.toString() + "=" +
                    "[e="+this[k].earnings +
                    ",v="+this[k].violations + "], "
                    printed_any = true;
                }
                if (printed_any)
                    retval = retval.substring(0, retval.length-2);
                retval += ">]"
                return retval;
            }
        }
    }

When the following runtime script calls `JSON.parse()` on a
JSONDictionaryExtnExample object, the `reviver` function calls
`JSONGenericDictExample.revive()` on each object in JSONDictionaryExtnExample.
This call extracts the ID that represents the object key. The
`JSONGenericDictExample.revive()` function uses this ID to retrieve and return
the stored JSONDictionaryExtnExample object from a private static array.

    import flash.display.MovieClip;
    import flash.text.TextField;

    var a_bob1:JSONGenericDictExample = new JSONGenericDictExample("Bob", new Date(Date.parse("01/02/1934")));
    var a_bob2:JSONGenericDictExample = new JSONGenericDictExample("Bob", new Date(Date.parse("05/06/1978")));
    var a_jen:JSONGenericDictExample = new JSONGenericDictExample("Jen", new Date(Date.parse("09/09/1999")));

    var e = new JSONDictionaryExtnExample();
    e[a_bob1] = {earnings: 40, violations: 2};
    e[a_bob2] = {earnings: 10, violations: 1};
    e[a_jen]  = {earnings: 25, violations: 3};

    trace("JSON.stringify(e): " + JSON.stringify(e)); // {"class JSONDictionaryExtnExample":
                            //{"id_class_JSONGenericDictExample_10001":
                            //{"earnings":10,"violations":1},
                            //"id_class_JSONGenericDictExample_10002":
                            //{"earnings":25,"violations":3},
                            //"id_class_JSONGenericDictExample_10000":
                            // {"earnings":40,"violations":2}}}

    var e_result = JSON.stringify(e);

    var e1 = new JSONDictionaryExtnExample();
    var e2 = new JSONDictionaryExtnExample();

    // It's somewhat easy to convert the string from JSON.stringify(e) back
    // into a dictionary (turn it into an object via JSON.parse, then loop
    // over that object's properties to construct a fresh dictionary).
    //
    // The harder exercise is to handle situations where the dictionaries
    // themselves are nested in the object passed to JSON.stringify and
    // thus does not occur at the topmost level of the resulting string.
    //
    // (For example: consider roundtripping something like
    //   var tricky_array = [e1, [[4, e2, 6]], {table:e3}]
    // where e1, e2, e3 are all dictionaries.  Furthermore, consider
    // dictionaries that contain references to dictionaries.)
    //
    // This parsing (or at least some instances of it) can be done via
    // JSON.parse, but it's not necessarily trivial.  Careful consideration
    // of how toJSON, replacer, and reviver can work together is
    // necessary.

    var e_roundtrip =
        JSON.parse(e_result,
                   // This is a reviver that is focused on rebuilding JSONDictionaryExtnExample objects.
                   function (k, v) {
                        if ("class JSONDictionaryExtnExample" in v) { // special marker tag;
                            //see JSONDictionaryExtnExample.toJSON().
                           var e = new JSONDictionaryExtnExample();
                           var contents = v["class JSONDictionaryExtnExample"];
                           for (var i in contents) {
                              // Reviving JSONGenericDictExample objects from string
                              // identifiers is also special;
                              // see JSONGenericDictExample constructor and
                              // JSONGenericDictExample's revive() method.
                               e[JSONGenericDictExample.revive(i)] = contents[i];
                           }
                           return e;
                       } else {
                           return v;
                       }
                   });

    trace("// == Here is an extended Dictionary that has been round-tripped  ==");
    trace("// == Note that we have revived Jen/Jan during the roundtrip.    ==");
    trace("e:           " + e); //[JSONDictionaryExtnExample <Bob=[e=40,v=2], Bob=[e=10,v=1],
                               //Jen=[e=25,v=3]>]
    trace("e_roundtrip: " + e_roundtrip); //[JSONDictionaryExtnExample <Bob=[e=40,v=2],
                                         //Bob=[e=10,v=1], Jen=[e=25,v=3]>]
    trace("Is e_roundtrip a JSONDictionaryExtnExample? " + (e_roundtrip is JSONDictionaryExtnExample)); //true
    trace("Name change: Jen is now Jan");
    a_jen.dname = "Jan"

    trace("e:           " + e); //[JSONDictionaryExtnExample <Bob=[e=40,v=2], Bob=[e=10,v=1],
                               //Jan=[e=25,v=3]>]
    trace("e_roundtrip: " + e_roundtrip); //[JSONDictionaryExtnExample <Bob=[e=40,v=2],
                                         //Bob=[e=10,v=1], Jan=[e=25,v=3]>]

More Help topics

![](../img/flashplatformLinkIndicator.png)
[JSON class](https://airsdk.dev/reference/actionscript/3.0/JSON.html)

[The prototype object](https://web.archive.org/web/20151029173219/http://help.adobe.com/en_US/as3/learn/WS5b3ccc516d4fbf351e63e3d118a9b90204-7f3f.html#WS5b3ccc516d4fbf351e63e3d118a9b90204-7fa3)

[ECMA-262 specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
