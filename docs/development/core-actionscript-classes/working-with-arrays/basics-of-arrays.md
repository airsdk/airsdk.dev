---
sidebar_position: 1
---

# Basics of arrays

Often in programming you'll need to work with a set of items rather than a
single object. For example, in a music player application, you might want to
have a list of songs waiting to be played. You wouldn't want to have to create a
separate variable for each song on that list. It would be preferable to have all
the Song objects together in a bundle, and be able to work with them as a group.

An array is a programming element that acts as a container for a set of items,
such as a list of songs. Most commonly all the items in an array are instances
of the same class, but that is not a requirement in ActionScript. The individual
items in an array are known as the array's _elements_. You can think of an array
as a file drawer for variables. Variables can be added as elements in the array,
which is like placing a folder into the file drawer. You can work with the array
as a single variable (like carrying the whole drawer to a different location).
You can work with the variables as a group (like flipping through the folders
one by one searching for a piece of information). You can also access them
individually (like opening the drawer and selecting a single folder).

For example, imagine you're creating a music player application where a user can
select multiple songs and add them to a playlist. In your ActionScript code, you
have a method named `addSongsToPlaylist()`, which accepts a single array as a
parameter. No matter how many songs you want to add to the list (a few, a lot,
or even only one), you call the `addSongsToPlaylist()` method only one time,
passing it the array containing the Song objects. Inside the
`addSongsToPlaylist()` method, you can use a loop to go through the array's
elements (the songs) one by one and actually add them to the playlist.

The most common type of ActionScript array is an _indexed array_. In an indexed
array each item is stored in a numbered slot (known as an _index_). Items are
accessed using the number, like an address. Indexed arrays work well for most
programming needs. The Array class is one common class that's used to represent
an indexed array.

Often, an indexed array is used to store multiple items of the same type
(objects that are instances of the same class). The Array class doesn't have any
means for restricting the type of items it contains. The Vector class is a type
of indexed array in which all the items in a single array are the same type.
Using a Vector instance instead of an Array instance can also provide
performance improvements and other benefits. The Vector class is available
starting with Flash Player 10 and Adobe AIR 1.5.

A special use of an indexed array is a _multidimensional array_. A
multidimensional array is an indexed array whose elements are indexed arrays
(which in turn contain other elements).

Another type of array is an _associative array_, which uses a string _key_
instead of a numeric index to identify individual elements. Finally,
ActionScript 3.0 also includes the Dictionary class, which represents a
_dictionary_. A dictionary is an array that allows you to use any type of object
as a key to distinguish between elements.

#### Important concepts and terms

The following reference list contains important terms that you will encounter
when programming array and vector handling routines:

Array  
An object that serves as a container to group multiple objects.

Array access (\[\]) operator  
A pair of square brackets surrounding an index or key that uniquely identifies
an array element. This syntax is used after an array variable name to specify a
single element of the array rather than the entire array.

Associative array  
An array that uses string keys to identify individual elements.

Base type  
The data type of the objects that a Vector instance is allowed to store.

Dictionary  
An array whose items consist of pairs of objects, known as the key and the
value. The key is used instead of a numeric index to identify a single element.

Element  
A single item in an array.

Index  
The numeric "address" used to identify a single element in an indexed array.

Indexed array  
The standard type of array that stores each element in a numbered position, and
uses the number (index) to identify individual elements.

Key  
The string or object used to identify a single element in an associative array
or a dictionary.

Multidimensional array  
An array containing items that are arrays rather than single values.

T  
The standard convention that's used in this documentation to represent the base
type of a Vector instance, whatever that base type happens to be. The T
convention is used to represent a class name, as shown in the Type parameter
description. ("T" stands for "type," as in "data type.").

Type parameter  
The syntax that's used with the Vector class name to specify the Vector's base
type (the data type of the objects that it stores). The syntax consists of a
period (`.`), then the data type name surrounded by angle brackets (`<>`). Put
together, it looks like this: `Vector.<T>`. In this documentation, the class
specified in the type parameter is represented generically as `T`.

Vector  
A type of array whose elements are all instances of the same data type.
