---
title: Coding Conventions
---

## Introduction

This document lays out the coding standards for writing open-source ActionScript 3 using the AIR SDK. Adhering to these standards makes the source code look consistent, well-organized, and professional.

Some of these standards are completely arbitrary, since there is not always a "best way" to code.

Code conventions are important. Code reviewers should point out when code doesn't follow the conventions. If there are disagreements, they can be discussed and the conventions adjusted but following the conventions is not optional.

## Naming

Choosing good names is critical to creating code that is easy to use and easy to understand. You should always take the time to think about whether you have chosen the right name for something, especially if it is part of the public API.

Our naming standards are mostly consistent with those of ECMAScript and Flash Player 9.

### Abbreviations

Avoid them as a general rule. For example, `calculateOptimalValue()` is a better method name than `calcOptVal()`.

Being clear is more important than minimizing keystrokes. And if you don't abbreviate, developers won't have to remember whether you shortened a word like "qualified" to "qual" or "qlfd".

However, we have standardized on a few abbreviations:

- acc for accessibility, as in `ButtonAccImpl`
- auto for automatic, as in `autoLayout`
- eval for evaluate, as in `EvalBindingResponder`
- impl for implementation, as in `ButtonAccImpl`
- info for information, as in `GridRowInfo`
- num for number of, as in `numChildren`
- min for minimum, as in `minWidth`
- max for maximum, as in `maxHeight`
- nav for navigation, as in `NavBar`
- regexp for regular expression, as in `RegExpValidator`
- util for utility, as in `StringUtil`

This list probably does not include all abbreviations that are currently in use. If you're considering using an abbreviation that isn't listed here, please search the source code to determine whether it is already in use. If you don't find it, think twice about whether abbreviating is really appropriate.

Occasionally we are (deliberately) inconsistent about abbreviations. For example, we spell out "horizontal" and "vertical" in most places, such as `horizontalScrollPolicy` and `verticalScrollPolicy` but we abbreviate them to `H` and `V` in the very-commonly-used container names `HBox` and `VBox`.

### Acronyms

Various acronyms are common in Flex and AIR, such as AIR, CSS, HLOC, IME, MX, MXML, RPC, RSL, SWF, UI, UID, URL, WSDL, and XML.

An acronym is always all-uppercase or all-lowercase (e.g., `SWF` or `swf`, but never `Swf`). The only time that all-lowercase is used is when the acronym is used by itself as an identifier, or at the beginning of an identifier, and the identifier should start with a lowercase letter. See the rules below for which identifiers should start with which case.

Examples of identifiers with acronyms are `CSSStyleDeclaration`, `IUID`, `uid`, `IIME`, and `imeMode`.

### Word boundaries

When an identifier contains multiple words, we use two ways of indicating word boundaries: intercaps (as in `LayoutManager` or `measuredWidth`) and underscores (as in `object_proxy`). See the rules below for which method to use.

Sometimes it isn't clear whether a word combination has become its own single word, and we are unforunately inconsistent about this in some places: `dropdown`, `popUp`, `pulldown`.

Follow the acronym-casing rules even in the rare case that two acronyms must be adjacent. An example (which isn't actually in use) would be something like `loadCSSURL()`. But try to avoid such names.

### Type-specifying names

If you want to incorporate the type into the name, make it the last "word". Don't use the old ActionScript 1 convention of concatenating abbreviated type suffixes such as `_mc` to indicate type. For example, name a border Shape `border`, `borderSkin`, or `borderShape`, but not `border_mc`.

Often, the best name for an object is simply the same as its type, with different casing:

```actionscript
var button:Button = new Button();
```

### Package names

Start them with a lowercase letter and use intercaps for subsequent words: `controls`, `listClasses`.

Package names should always be nouns or gerunds (the -ing noun form of a verb), not verbs, adjectives, or adverbs.

A package implementing lots of similar things should have a name which is the plural form of the thing: `charts`, `collections`, `containers`, `controls`, `effects`, `events`, `formatters`, `managers`, `preloaders`, `resources`, `skins`, `states`, `styles`, `utils`, `validators`.

It is common to use a gerund for the name of a package which implements a concept: `binding`, `logging`, `messaging`, `printing`. Otherwise, they are generally "concept nouns": `accessibility`, `core`, `graphics`, `rpc`.

A package containing classes that support component `FooBar` should be called `fooBarClasses`.

### File names

For importable APIs, the file name must be the same as the public API inside. But include files don't have to follow this rule.

Start the names of include files for `[Style(...)]` metadata with an uppercase letter, use intercaps for subsequent words, and make the last word "Styles": `BorderStyles.as`, `ModalTransparencyStyles.as`.

Start the names of individual asset files with a lowercase letter and use underscores between words: `icon_align_left.png`.

### Namespace names

Start them with a lowercase letter and use underscores between words: `mx_internal`, `object_proxy`.

### Interface names

If the interface is something you expect developers to implement then start them with I and use intercaps for subsequent words: IList, IFocusManager, IUID.

If you are abstracting a type for example in an API where the type may change at runtime, it often makes sense to omit the I to make the API more readable and appear as a Class.

### Class names

Start them with an uppercase letter and use intercaps for subsequent words: `Button`, `FocusManager`, `UIComponent`.

Name `Event` subclasses `FooBarEvent`.

Name `Error` subclasses `FooBarError`.

Name the `EffectInstance` subclass associated with effect `FooBar` `FooBarInstance`.

Name `Formatter` subclasses `FooBarFormatter`.

Name `Validator` subclasses `FooBarValidator`.

Name skinning classes `FooBarBackground`, `FooBarBorder`, `FooBarSkin`, `FooBarIcon`, `FooBarIndicator`, `FooBarSeparator`, `FooBarCursor`, etc.

Name utility classes `FooBarUtil` (not `FooBarUtils`; the package is plural but the class is singular).

It is common to name a base class `FooBarBase`: `ComboBase`, `DateBase`, `DataGridBase`, `ListBase`.

### Event names

Start them with a lowercase letter and use intercaps for subsequent words: `"move"`, `"creationComplete"`.

### Style names

Start them with a lowercase letter and use intercaps for subsequent words: `color`, `fontSize`.

### Enumerated values for String properties

Start them with a lowercase letter and use intercaps for subsequent words: `"auto"`, `"filesOnly"`,

### Constant names

Use all uppercase letters with underscores between words: `OFF`, `DEFAULT_WIDTH`.

The words in the identifier must match the words in the constant value if it is a String:

```actionscript
public static const FOO_BAR:String = "fooBar";
```

### Property (variable and getter/setter) names

Start them with a lowercase letter and use intercaps for subsequent words: `i`, `width`, `numChildren`.

Use `i` for a loop index and `n` for its upper limit. Use `j` for an inner loop index and `m` for its upper limit.

```actionscript
for (var i:int = 0; i < n; i++)
{
    for (var j:int = 0; j < m; j++)
    {
        ...
    }
}
```

Use `p` (for "property") for a `for-in` loop variable:

```actionscript
for (var p:String in o)
{
    ...
}
```

If a class overrides a getter/setter and wants to continue to expose the base getter/setter, it should do so by implementing a property whose name is the base name with a $ prepended. This getter/setter should be marked `final` and should do nothing more than call the supergetter/setter.

```actionscript
mx_internal final function get $numChildren():int
{
    return super.numChildren;
}
```

### Storage variable names

Give the storage variable for the getter/setter foo the name `_foo`.

### Method names

Start them with a lowercase letter and use intercaps for subsequent words: `measure()`, `updateDisplayList()`.

Method names should always be verbs.

Parameterless methods should generally not be named `getFooBar()` or `setFooBar()`; these should be implemented as getter/setters instead. However, if `getFooBar()` is a slow method requiring a large amount of computation, it should be named `findFooBar()`, `calculateFooBar()`, `determineFooBar()`, etc. to suggest this, rather than being a getter.

If a class overrides a method and wants to continue to expose the base method, it should do so by implementing a method whose name is the base name with a $ prepended. This method should be marked final and should do nothing more than call the supermethod.

```actionscript
mx_internal final function $addChild(child:DisplayObject):DisplayObject
{
    return super.addChild(child);
}
```

### Event handler names

Event handlers should be named by concatenating "Handler" to the type of the event: `mouseDownHandler()`.

If the handler is for events dispatched by a subcomponent (i.e., not `this`), prefix the handler name with the subcomponent name and an underscore: `textInput_focusInHandler()`.

### Argument names

Use `value` for the argument of every setter:

Do this:

```actionscript
public function set label(value:String):void
```

Not this:

```actionscript
public function set label(lab:String):void
```

Or this:

```actionscript
public function set label(labelValue:String):void
```

Or this:

```actionscript
public function set label(val:String):void
```

Use `event` (not `e`, `evt`, or `eventObj`) for the argument of every event handler:

```actionscript
protected function mouseDownHandler(event:Event):void
```

### Resource bundle names

If a resource bundle contains resources for a particular package, name the bundle the same as the package: `controls`, `formatters`, `validators`.

### Resource key names

Start them with a lowercase letter and use intercaps for subsequent words: `pm`, `dayNamesShort`.

### Miscellaneous nomenclature

Avoid "object" because it is vague.

An "item" is a data item, not a DisplayObject.

A "renderer" is a DisplayObject that displays a data item.

A "type" is an AS3 type; use "kind" otherwise.

## Language Usage

This section discusses how we use the language constructs of ActionScript 3, especially when there are multiple ways to express the same thing.

### Compilation options

Compile with the options `-strict` and `-show-actionscript-warnings`. (These are the defaults in the flex-config.xml file.)

### Property-based APIs

Favor property-based APIs rather than method-based APIs, because these are more suitable for declarative-style MXML programming.

### Type declarations

Write a type annotation for every constant, variable, function argument, and function return value, even if the annotation is simply `:*` to indicate "no type".

Do this:

```actionscript
var value:*;
```

Not this:

```actionscript
var value;
```

Use the narrowest type that is appropriate. For example, a loop index should be a `int`, not a `Number`, and certainly not an `Object` or `*`. As another example, a `mouseDownHandler` should declare its argument as `event:MouseEvent`, not `event:Event`.

Use `int` for integers, even if they can't be negative. Use `uint` only for RGB colors, bit masks, and other non-numeric values.

Use `*` only if the value can be undefined. You should generally use `Object` rather than `*`, with `null` being the "object doesn't exist" value.

If you declare something to be of type `Array`, add a comment of the form `/* of ElementType */` immediately after `Array` indicate the type of the array elements. A future version of the language is likely to have typed arrays.

Do this:

```actionscript
var a:Array /* of String */ = [];
```

Not this:

```actionscript
var a:Array = [];
```

And this:

```actionscript
function f(a:Array /* of Number */):Array /* of Object */
{
    ...
}
```

Not this:

```actionscript
function f(a:Array):Array
```

### Literals

#### `undefined`

Avoid using this when possible. It is only necessary when dealing with values whose compile-time is type is `*`, and you should be using `*` sparingly as well.

#### `int` and `uint` literals

Do not use a decimal point in a integer.

Do this:

```actionscript
2
```

Not this:

```actionscript
2.
```

Use a lowercase x and uppercase A-Z in hexadecimal numbers.

Do this:

```actionscript
0xFEDCBA
```

Not this:

```actionscript
0Xfedcba
```

Always write an RGB color as a six-digit hexadecimal number.

Do this:

```actionscript
private const BLACK:uint = 0x000000;
```

Not this:

```actionscript
private const BLACK:uint = 0;
```

When dealing with indices, use the value -1 to mean "no index".

#### `Number` literals

If a Number value typically can be fractional, indicate this by using a decimal point, and follow the decimal point by a single trailing zero.

Do this:

```actionscript
alphaFrom = 0.0;
alphaTo = 1.0;
```

Not this:

```actionscript
alphaFrom = 0;
alphaTo = 1;
```

However, don't do this for pixel coordinates, which are by convention integral even though they can in principle be fractional.

Do this:

```actionscript
var xOffset:Number = 3;
```

Not this:

```actionscript
var xOffset:Number = 3.0;
```

Use e, not E, when using exponential notation.

Do this:

```actionscript
1.0e12
```

Not this:

```actionscript
1.0E12
```

Use the default value `NaN` as the "not set" value for a `Number`.

#### `String` literals

Use quotation marks (double quotes), not apostrophes (single quotes), to delimit strings, even if that string contains a quotation mark as a character.

Do this:

```actionscript
"What's up, \"Big Boy\"?"
```

Not this:

```actionscript
'What\'s up, "Big Boy"?'
```

Use `\u`, not `\U`, for unicode escape sequences.

#### `Array` literals

Use Array literals rather than `new Array()`.

Do this:

```actionscript
[]
```

Not this:

```actionscript
new Array()
```

And this:

```actionscript
[ 1, 2, 3 ]
```

Not this:

```actionscript
new Array(1, 2, 3)
```

Use the Array constructor only to allocate an array of a prespecified size, as in `new Array(3)`, which means `[ undefined, undefined, undefined ]`, not `[ 3 ]`.

#### `Object` literals

Use Object literals rather than `new Object()`.

Do this:

```actionscript
{}
```

Not this:

```actionscript
new Object()
```

And this:

```actionscript
o = { a: 1, b: 2, c: 3 };
```

Not this:

```actionscript
o = new Object();
o.a = 1;
o.b = 2;
o.c = 3;
```

Or this:

```actionscript
o = {};
o.a = 1;
o.b = 2;
o.c = 3;
```

#### `Function` literals

Avoid using function literals to define anonymous functions; use a class method or package function instead.

If you must use a function literal, declare a return type, and terminate the last statement inside the function block with a semicolon.

Do this:

```actionscript
function(i:int):void { doIt(i - 1); doIt(i + 1); }
```

Not this:

```actionscript
function(i:int) { doIt(i - 1); doIt(i + 1) }
```

#### `RegExp` literals

Use the literal notation rather than constructing a `RegExp` instance from a String.

Do this:

```actionscript
var pattern:RegExp = /\d+/g;
```

Not this:

```actionscript
var pattern:RegExp = new RegExp("\\d+", "g");
```

#### `XML` and `XMLList` literals

Use the literal notation rather than constructing an XML instance from a String.

Do this:

```actionscript
var node:XML = <name first="Jane" last="Doe"/>;
```

Not this:

```actionscript
var node:XML = new XML("<name first=\"Jane\" last=\"Doe\"/>");
```

Use double-quotes rather than single-quotes around XML attribute values:

Do this:

```actionscript
var node:XML = <name first="Jane" last="Doe"/>;
```

Not this:

```actionscript
var node:XML = <name first='Jane' last='Doe'/>;
```

#### `Class` literals

Use a fully-qualified class literal only if necessary to disambiguate between two imported classes with the same unqualified name.

Do this:

```actionscript
import mx.controls.Button;
...
var b:Button = new Button();
```

Not this:

```actionscript
import mx.controls.Button;
...
var b:Button = new mx.controls.Button();
```

But here a fully-qualified name is required and therefore qppropriate:

```actionscript
import mx.controls.Button;
import my.controls.Button;
...
var b:Button = new mx.controls.Button();
```

### Expressions

#### Parentheses

Don't use unnecessary parentheses with common operators such as `+`, `-`, `*`, `/`, `&&`, `||`, `<`, `<=`, `>`, `>=`, `==`, and `!=`.

Do this:

```actionscript
var e:Number = a * b / (c + d);
```

Not this:

```actionscript
var e:Number = (a * b) / (c + d);
```

And this:

```actionscript
var e:Boolean = a && b || c == d;
```

Not this:

```actionscript
var e:Boolean = ((a && b) || (c == d));
```

The precedence rules for other operators are harder to remember, so parentheses can be helpful with them.

#### Coercion

Don't compare a Boolean value to `true` or `false`; it already is one or the other.

Do this:

```actionscript
if (flag)
```

Not this:

```actionscript
if (flag == true)
```

Do this:

```actionscript
var flag:Boolean = a && b;
```

Not this:

```actionscript
var flag:Boolean = (a && b) != false;
```

Explicitly coerce a `Number`, `String`, `XML`, `XMLList`, `Array`, `Object`, or `*` to a `Boolean`, because these types have multiple values which might reasonably be thought to coerce to `false` and it is difficult to remember which ones actually do coerce to `false` in AS3.

| Type              | Can you remember which of these values coerce to false? |
| ----------------- | ------------------------------------------------------- |
| `Number`          | `0`, `NaN`                                              |
| `String`          | `null`, `""`                                            |
| `XML` / `XMLList` | `null`, `</>`                                           |
| `Array`           | `null`, `[]`                                            |
| `Object`          | `null`, `</>`                                           |
| `*`               | `undefined`, `null`, `{}`, `0`, `NaN`, `false`, `</>`   |

Do this:

```actionscript
if (s != null && s != "")
```

Not this:

```actionscript
if (s)
```

Subclasses of `Object` (e.g., `UIComponent`) can coerce implicitly to `Boolean`, because it is obvious that only the `null` value coerces to `false` and all others coerce to `true`. It's OK to explicitly compare the object to `null` as required in Java. (Note: Object and its subclasses cannot store the value `undefined`.)

Do this:

```actionscript
if (child)
```

Or this:

```actionscript
if (child == null)
```

And this:

```actionscript
if (!child)
```

Or this:

```actionscript
if (child != null)
```

For `int` and `uint`, it is obvious that only the `0` value coerces to `false` and all others coerce to `true`. So if you want to use implicit coercion, it's OK but a comparison against `0` reads more nicely.

Do this:

```actionscript
if (num != 0)
```

Or this:

```actionscript
if (num)
```

And this:

```actionscript
if (num == 0)
```

Or this:

```actionscript
if (!num)
```

Prefer the use of a cast to the use of the `as` operator. Use the `as` operator only if the coercion might fail and you want the expression to evaluate to `null` instead of throwing an exception.

Do this:

```actionscript
IUIComponent(child).document
```

Not this:

```actionscript
(child as IUIComponent).document
```

#### Comparison

Write comparisons in the order that they read most naturally:

Do this:

```actionscript
if (n == 3) // "if n is 3"
```

Not this:

```actionscript
if (3 == n) // "if 3 is n"
```

#### `++` and `--` operators

In cases where the postfix and prefix forms are equivalent, use the postfix form. Use the prefix form only when you need to use the value before it is incremented.

Do this:

```actionscript
for (var i:int = 0; i < n; i++)
```

Not this:

```actionscript
for (var i:int = 0; i < n; ++i)
```

#### Ternary operator

Use a ternary operator in place of a simple `if`/`else` statement, especially for `null` checks:

Do this:

```actionscript
return item ? item.label : null;
```

Not this:

```actionscript
if (!item)
    return null;
return item.label;
```

But don't use nested ternary operators in place of complex `if`/`else` logic.

Do this:

```actionscript
if (a < b)
    return -1;
else if (a > b)
    return 1;
return 0;
```

Not this:

```actionscript
return a < b ? -1 : (a > b ? 1 : 0);
```

#### `new` operator

Use parentheses after the class reference, even if the constructor takes no arguments.

Do this:

```actionscript
var b:Button = new Button();
```

Not this:

```actionscript
var b:Button = new Button;
```

### Statements

Terminate each statement with a semicolon. Do not use the optional-semicolon feature of ActionScript 3.

Do this:

```actionscript
a = 1;
b = 2;
c = 3;
```

Not this:

```actionscript
a = 1
b = 2
c = 3
```

#### include statements

Use `include`, not the deprecated `#include`. Terminate the `include` statement with a semicolon, like any other statement.

Do this:

```actionscript
include "../core/ComponentVersion.as";
```

Not this:

```actionscript
#include "../core/ComponentVersion.as"
```

Use relative, not absolute, paths.

#### `import` statements

Import specific classes, interfaces, and package-level functions rather than using the `*` wildcard.

Do this:

```actionscript
import mx.controls.Button;
import flash.utils.getTimer;
```

Not this:

```actionscript
import mx.core.*;
```

#### `use namespace` statements

Use them. Do not use `::` syntax on each reference to something in a non-open namespace.

Do this:

```actionscript
import mx.core.mx_internal;
use namespace mx_internal;

// Later, in some method...
doSomething();
```

Not this:

```actionscript
import mx.core.mx_internal;

// Later, in some method...
mx_internal::doSomething();
```

#### `if` statements

If the various branches of an if/else statement involve single statements, don't make them into blocks.

Do this:

```actionscript
if (flag)
    doThing1();
```

Not this:

```actionscript
if (flag)
{
    doThing1();
}
```

And this:

```actionscript
if (flag)
    doThing1();
else
    doThing2():
```

Not this:

```actionscript
if (flag)
{
    doThing1();
}
else
{
    doThing2();
}
```

But if any branch has multiple statements, make all of them into blocks.

Do this:

```actionscript
if (flag)
{
    doThing1();
}
else
{
    doThing2();
    doThing3();
}
```

Not this:

```actionscript
if (flag)
    doThing1();
else
{
    doThing2();
    doThing3();
}
```

When doing multiple error checks, use sequential if statements that test for failure and return early. The successful execution flow is then down the page, with the succesful return at the end of the method. Do not use nested tests for success, which make the execution flow drift across the page.

Do this:

```actionscript
if (!condition1)
    return false;
...
if (!condition2)
    return false;
...
if (!condition2)
    return false;
...
return true;
```

Not this:

```actionscript
if (condition1)
{
    ...
    if (condition2)
    {
        ...
        if (condition3)
        {
            ...
            return true;
        }
    }
}
return false;
```

#### `for` statements

Make the body of a `for` loop be a block, even if it consists of only one statement.

Do this:

```actionscript
for (var i:int = 0; i < 3; i++)
{
    doSomething(i);
}
```

Not this:

```actionscript
for (var i:int = 0; i < 3; i++)
    doSomething(i);
```

Store the upper limit for a for-loop variable in a local variable so that it isn't re-evaluated every time through the loop (unless, of course, it needs to be re-evaluated on each interation).

Do this:

```actionscript
var n:int = a.length;
for (var i:int = 0; i < n; i++)
{
    ...
}
```

Not this:

```actionscript
for (var i:int = 0; i < a.length; i++)
{
    ...
}
```

Declare the loop var inside the parentheses of the `for` statement, unless it is reused elsewhere.

Do this:

```actionscript
for (var i:int = 0; i < 3; i++)
```

Not this:

```actionscript
var i:int;
for (i = 0; i < 3; i++)
{
    ...
}
```

#### `while` statements

Make the body of a `while` loop be a block, even if it consists of only one statement.

Do this:

```actionscript
while (i < n)
{
    doSomething(i);
}
```

Not this:

```actionscript
while (i < n)
    doSomething(i);
```

#### `do` statements

Make the body of a `do` loop be a block, even if it consists of only one statement.

Do this:

```actionscript
do
{
    doSomething(i);
}
while (i < n);
```

Not this:

```actionscript
do
    doSomething(i);
while (i < n);
```

#### `switch` statements

Make the body of each `case` clause, and of the `default` clause, be a block. Put the `break` or `return` statement within the block, not after it. If you are returning, don't put a `break` after the `return`. Treat the default clause similarly to the case clauses; `break` or `return` from it rather than falling through the bottom of the `switch`.

Do this:

```actionscript
switch (n)
{
    case 0:
    {
        foo();
        break;
    }

    case 1:
    {
        bar();
        return;
    }

    case 2:
    {
        baz();
        return;
    }

    default:
    {
        blech();
        break;
    }
}
```

Not this:

```actionscript
switch (n)
{
    case 0:
        foo();
        break;

    case 1:
    {
        bar();
    }
    break;

    case 2:
        baz();
        return;
        break;

    default:
        blech();
}
```

#### `return` statements

Do not enclose a return value in unnecessary parentheses.

Do this:

```actionscript
return n + 1;
```

Not this:

```actionscript
return (n + 1);
```

Returning from the middle of a method is OK.

### Declarations

Don't declare multiple constants or variables in a single declaration.

Do this:

```actionscript
var a:int = 1;
var b:int = 2;
```

Not this:

```actionscript
var a:int = 1, b:int = 2;
```

#### The `override` keyword

If present, put this first, before the access specifier.

Do this:

```actionscript
override protected method measure():void
```

Not this:

```actionscript
protected override method measure():void
```

#### Access specifiers

Put an explicit access specifier everywhere that one is allowed. Do not use the fact that `internal` is the implicit access specifier if none is written.

Before making an API `public` or `protected`, think hard about whether it is really needs to be. Public and protected APIs must be documented. They must also be supported for several releases before being formally deprecated.

#### The `static` keyword

If present, put this after the access specifier.

Do this:

```actionscript
public static const MOVE:String = &quot;move&quot;
```

Not this:

```actionscript
static public const MOVE:String = &quot;move&quot;;
```

#### The `final` keyword

If present, put this after the access specifier.

Do this:

```actionscript
public final class BoxDirection
```

Not this:

```actionscript
final public class BoxDirection
```

Declare all "enum classes" to be final.

Also declare "base" properties and methods (those starting with $) to be final.

#### Constants

All constants should be static. There is no reason to use an instance constant, since all instances would store the same value.

Do this:

```actionscript
public static const ALL:String = "all";
```

Not this:

```actionscript
public const ALL:String = "all";
```

#### Variables

If a variable needs to be initialized to a non-default value, do this in the declaration, not in the constructor.

Do this:

```actionscript
private var counter:int = 1;
```

Not this:

```actionscript
private var counter:int;
...
public function MyClass()
{
    super();
    ...
    counter = 1;
}
```

#### Local variables

Declare local variables at or just before the point of first use. Don't declare them all at the top of the function.

Do this:

```actionscript
private function f(i:int, j:int):int
{
    var a:int = g(i - 1) + g(i + 1);
    var b:int = g(a - 1) + g(a + 1);
    var c:int = g(b - 1) + g(b + 1);

    return (a * b * c) / (a + b + c);
}
```

Not this:

```actionscript
private function f(i:int, j:int):int
{
    var a:int;
    var b:int;
    var c:int;

    a = g(i - 1) + g(i + 1);
    b = g(a - 1) + g(a + 1);
    c = g(b - 1) + g(b + 1);

    return (a * b * c) / (a + b + c);
}
```

Declare local variables only one per function. ActionScript 3 doesn't have block-scoped locals.

Do this:

```actionscript
var a:int;
if (flag)
{
    a = 1;
    ...
}
else
{
    a = 2;
    ...
}
```

Not this:

```actionscript
if (flag)
{
    var a:int = 1;
    ...
}
else
{
    var a:int = 2;
    ...
}
```

And this:

```actionscript
var i:int;
for (i = 0; i &lt; n; i++)
{
    ...
}

for (i = 0; i &lt; n; i++)
{
    ...
}
```

Not this:

```actionscript
for (var i:int = 0; i &lt; n; i++)
{
    ...
}

for (var i:int = 0; i &lt; n; i++)
{
    ...
}
```

#### Classes

If a class simply extends `Object`, omit the `extends Object` clause.

The only "bare statements" in a class should be calls to static class initialization methods, such as `loadResources()`.

#### Constructors

If a classes has instance members, write a constructor, and make it explicitly call `super()`, even if it does nothing else.

If the constructor takes arguments that set instance vars, give the the same names as the instance vars.

Do this:

```actionscript
public function MyClass(foo:int, bar:int)
{
    super();
    this.foo = foo;
    this.bar = bar;
}
```

Not this:

```actionscript
public function MyClass(fooVal:int, barVal:int)
{
    super();
    foo = fooVal;
    bar = barVal;
}
```

Don't set the classes' instance vars in the constructor; do this in the declarations of the instance vars. However, if you need to reset the values of inherited instance vars, do this in the consturctor.

#### Interfaces

TBD

#### Namespaces

TBD

#### Implementing properties

TBD

#### Metadata

TBD

### Packages

One public API (usually a class, sometimes a namespace or function) inside the package statement.

Helper classes

bare statements

## ASDoc

### Property comments

Only document the first function of a get/set function pair for a property. The idiom for defining and documenting a property is:

```actionscript
/**
 *  @private
 *  The backing variable for the property.
 */
private var _someProp:Foo;

/**
 *  Place all comments for the property with the getter which is defined first.
 *  Comments should cover both get and set behavior as appropriate.
 */
public function get someProp():Foo
{
  ...
}

/**
 *  @private
 */
public function set someProp(value:Foo):void
{
  ...
}
```

Also, ASDoc comments are applied to metadata tags as well as other constructs within a class so take care that your comments apply to the proper target. If you tag a property as Bindable, your property comment must precede the get function, not the Bindable metadata tag.

Do this:

```actionscript
[Bindable("somePropChanged")]

/**
 *  Comments for someProp
 */
public function get someProp():Foo
```

Not this:

```actionscript
/**
 * Comments for someProp
 */
[Bindable("somePropChanged")]

public function get someProp():Foo
```

### Using the private tag

Do not use the @private tag in ASDoc comments before private variables and private methods. They are not needed and they take up space.

### General Guidelines

- Start each sentence in an ASDoc comment on a new line. It is easier to edit the ASDoc.
- Always close HTML tags in comments, including `<p></p>` and `<code></code>` tags.
- Do not use `@return` in a setter/getter. It is ignored.
- Do not use `<code>` tags around a class name.

## Flex SDK

These sections are specific to contributions to the Flex SDK project, and, in the interest of consistency, all commits to the Flex SDK project will be expected to follow these conventions.

They can act as a guide for anyone writing AS3 code and libraries.

### File Organization

This section presents the order in which a Flex framework file should be organized.

#### File template

When creating a new Flex component the flex template below should be used so that the class is organized in the correct order. Unused sections can be deleted.

<details><summary>File Template for Flex Components</summary>
<p>

```actionscript
////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2011 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////////////////////////

package ${package_name}
{

import packageName;

use namespace ns1;

//--------------------------------------
//  Events
//--------------------------------------

/**
 *  ASDoc comment.
 */
[Event]

//--------------------------------------
//  Styles
//--------------------------------------

/**
 *  ASDoc comment.
 */
[Style]

//--------------------------------------
//  Effects
//--------------------------------------

/**
 *  ASDoc comment.
 */
[Effect]

//--------------------------------------
//  Excluded APIs
//--------------------------------------

[Exclude(name="styleName", kind="style")]

//--------------------------------------
//  Other metadata
//--------------------------------------

//[AccessibilityClass(implementation="spark.accessibility.RichEditableTextAccImpl")]
//[DefaultProperty("content")]
//[IconFile("RichEditableText.png")]
//[DefaultTriggerEvent("change")]
//[DiscouragedForProfile("mobileDevice")]

/**
 *  Primary ASdoc for the class.
 *
 *  @includeExample example.mxml
 *
 *  @langversion 3.0
 *  @playerversion Flash 10
 *  @playerversion AIR 2.5
 *  @productversion Flex 4.5
 *
 *  @see
 */
public class ${class_name}
{

    include "../core/Version.as";

    //----------------------------------------------------------------------------------------------
    //
    //  Class initialization
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Class constants
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Class mixins
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Class resources
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Class variables
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Class properties
    //
    //----------------------------------------------------------------------------------------------

    // Declare static getters and setters here. Order them alphabetically by property name. Use a minor
    // separator with the property name for each one. Put the getter before the setter.

    //----------------------------------------------------------------------------------------------
    //
    //  Class methods
    //
    //----------------------------------------------------------------------------------------------

    // Put static function declarations here.

    //----------------------------------------------------------------------------------------------
    //
    //  Constructor
    //
    //----------------------------------------------------------------------------------------------

    /**
     *  Constructor.
     *
     *  @langversion 3.0
     *  @playerversion Flash 10
     *  @playerversion AIR 2.5
     *  @productversion Flex 4
     */
    public function ${class_name}()
    {
        super();
    }

    //----------------------------------------------------------------------------------------------
    //
    //  Constants
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Variables
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Skin parts
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Overridden properties
    //
    //----------------------------------------------------------------------------------------------

    // Put overrides of non-static getters and setters here. Order them alphabetically by property name.
    // Use a minor separator with the property name for each one. Put the getter before the setter.

    //----------------------------------
    //  propertyName
    //----------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Properties
    //
    //----------------------------------------------------------------------------------------------

    // Put new non-static getters and setters here.  Order them alphabetically by property name.
    // Use a minor separator with the property name for each one. Put the getter before the setter.
    // Before the getter, put a single comment which documents both the getter and the setter.

    //----------------------------------------------------------------------------------------------
    //
    //  Overridden Methods
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Methods
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Overridden Event handlers
    //
    //----------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------------------------------

}

}

//----------------------------------------------------------------------------------------------
//
//  Out-of-package Helper Classes
//
//----------------------------------------------------------------------------------------------
```

</p>
</details>

#### Copyright notice

Include a copyright notice at the top of every .as file in the framework. The format for the 2008 open-source copyright is given below.

```actionscript
////////////////////////////////////////////////////////////////////////////////
//
// ADOBE SYSTEMS INCORPORATED
// Copyright 2008 Adobe Systems Incorporated
// All Rights Reserved.
//
// NOTICE: Adobe permits you to use, modify, and distribute this file
// in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////
```

> Note that it is 80 characters wide.

#### `package` statement

TBD

#### `import` statements

TBD

#### `use namespace` statement

TBD

#### Class metadata

Organize the class metadata into sections, in the order Events, Styles, Effects, Excluded APIs, and Other Metadata.

Put a minor section header before each section. Note that the minor section headers are 40 characters wide and that there are two spaces between the // and the section name.

Alphabetize the metadata by name="..." within each section. In the Other Metadata section, alphabetize them by metadata tag name.

```actionscript
//--------------------------------------
// Events
//--------------------------------------
/**
 * ASDoc comment.
 */
[Event]

/**
 * ASDoc comment.
 */
[Event]

//--------------------------------------
// Styles
//--------------------------------------

/**
 * ASDoc comment.
 */
[Style]

/**
 * ASDoc comment.
 */
[Style]

//--------------------------------------
// Effects
//--------------------------------------

/**
 * ASDoc comment.
 */
[Effect]

/**
 * ASDoc comment.
 */
[Effect]

//--------------------------------------
// Excluded APIs
//--------------------------------------

[Exclude(name=&quot;horizontalAlign&quot;, kind=&quot;style&quot;)]
[Exclude(name=&quot;verticalAlign&quot;, kind=&quot;style&quot;)]

//--------------------------------------
// Other metadata
//--------------------------------------

[DefaultBindingProperty(source=&quot;text&quot;, destination=&quot;text&quot;)]
[IconFile(&quot;Text.png&quot;)]
```

#### Class declaration

TBD

#### `include` statement for Version.as

Every class should include core/Version.as using a relative path. This file contains the declaration for `static const VERSION:String`.

```actionscript
include "../core/Version.as";
```

#### Class constants

Put `static const` declarations here.

ActionScript 3 does not allow a constant to have type `Array` or `Object`. Declare such constants using `static var` rather than `static const`, but put them in this section because they are conceptually constants.

#### Class mix-ins

Declare any static variables of type Function that get mixed in rather than being declared as methods.

#### Class properties

Declare static getters and setters here. Order them alphabetically by property name. Use a minor separator with the property name for each one. Put the getter before the setter.

#### Class methods

Put `static function` declarations here.

#### Constructor

TBD

#### Variables

TBD

#### Overridden properties

Put overrides of non-static getters and setters here. Order them alphabetically by property name. Use a minor separator with the property name for each one. Put the getter before the setter.

#### Properties

Put new non-static getters and setters here. Order them alphabetically by property name. Use a minor separator with the property name for each one. Put the getter before the setter.

#### Overridden methods

Put overrides of non-static functions here.

#### Methods

Put new non-static functions here.

#### Overridden event handlers

Put overrides of event handlers here.

#### Event handlers

Put new event handlers here.

#### Out-of-package helper classes

TBD

### Formatting

This section covers how a Flex framework class should be formatted.

#### Line width

The target line length is 80-characters per line although up to 100-characters per line is permissible.

The most important factor to consider is readability.

#### Indentation

Use 4-space indentation. Configure your text editor to insert spaces rather than tabs. This allows another program that uses a different indentation setting, such as Notepad with its 8-character indents, to display the code without disfiguring it.

#### Section separators

The major section separators inside a class look like this:

```actionscript
    //--------------------------------------------------------------------------
    //
    //  Overridden methods
    //
    //--------------------------------------------------------------------------
```

They extend from column 4 through column 80. The text is indented to column 8.

The minor section separators inside a class, such as between properties, look like this:

```actionscript
    //----------------------------------
    //  visible
    //----------------------------------
```

They extend from column 4 through column 40. The text is indented to column 8.

Put a single blank line above and below the separators.

#### Separation of declarations

Use a single blank line as a vertical separator between constant, variable, or function declarations.

```actionscript
/**
 *  @private
 *  Holds something.
 */
var a:Number;

/**
 *  @private
 */
var b:Number
```

#### Metadata

Do this:

```actionscript
Inspectable[a="1", b="2"]
```

Not this:

```actionscript
Inspectable[a=1 b=2]
```

#### Array indexing

Don't put any spaces before or after the left bracket or before the right bracket.

Do this:

```actionscript
a[0]
```

Not this:

```actionscript
a[ 0 ]
```

#### Commas

Follow a comma with a single space. This applies to argument lists, array literals, and object literals.

#### Array literals

Put a single space after the left bracket and a single space before the right bracket, and put a single space after (but none before) each comma.

Do this:

```actionscript
[ 1, 2, 3 ]
```

Not these:

```actionscript
[1, 2, 3]

[1,2,3]
```

An empty array is a special case.

Do this:

```actionscript
[]
```

Not this:

```actionscript
[ ]
```

Format lengthy array initializers requiring multiple lines with aligned brackets:

```actionscript
static var numberNames:Array /* of String */ =
[
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];
```

#### Object literals

Put a single space after the left brace and a single space before the right brace, and put a single space after the colon separating the property name and value.

Do this:

```actionscript
{ a: 1, b: 2, c: 3 }
```

Not these:

```actionscript
{a: 1, b: 2, c: 3}

{a:1, b:2, c:3}

{a:1,b:2,c:3}
```

An empty Object is a special case.

Do this:

```actionscript
{}
```

Not this:

```actionscript
{ }
```

Format lengthy object initializers requiring multiple lines with aligned braces:

```actionscript
private static var TextStyleMap:Object =
{
    color: true,
    fontFamily: true,
    fontSize: true,
    fontStyle: true,
    fontWeight: true,
    leading: true,
    marginLeft: true,
    marginRight: true,
    textAlign: true,
    textDecoration: true,
    textIndent: true
};
```

#### Function literals

TBD

```actionscript
var f:Function;

f = function():void
{
    doSomething();
};
```

#### Type declarations

Don't put any spaces before or after the colon that separates a variable, parameter, or function from its type.

Do this:

```actionscript
var n:Number;
```

Not these:

```actionscript
var n : Number;

var n: Number;
```

And this:

```actionscript
function f(n:Number):void
```

Not these:

```actionscript
function f(n : Number) : void

function f(n: Number): void
```

#### Operators and assignments

Put a single space around the assignment operator.

Do this:

```actionscript
a = 1;
```

Not this:

```actionscript
a=1;
```

Put a single space around infix operators.

Do this:

```actionscript
a + b \* c
```

Not this:

```actionscript
a+b\*c
```

Put a single space around comparison operators.

Do this:

```actionscript
a == b
```

Not this:

```actionscript
a==b
```

Don't put any spaces between a prefix operator and its operand.

Do this:

```actionscript
!o
```

Not this:

```actionscript
! o
```

Don't put any spaces between a postfix operator and its operand.

Do this:

```actionscript
i++
```

Not this:

```actionscript
i ++
```

#### Statements

Start each statement on a new line, so that you can set a breakpoint on any statement.

Do this:

```actionscript
a = 1;
b = 2;
c = 3;
```

Not this:

```actionscript
a = 1; b = 2; c = 3;
```

Align the braces of statement blocks.

Do this:

```actionscript
function f():void
{
    var n:int = numChildren;
    for (var i:int = 0; i < n; i++)
    {
        if ()
        {
            x = horizontalGap * i;
            y = verticalGap * i;
        }
    }
}
```

Not this:

```actionscript
function f():void {
    var n:int = numChildren;
    for (var i:int = 0; i < n; i++) {
        if () {
            x = horizontalGap * i;
            y = verticalGap * i;
        }
    }
}
```

#### Variable declarations

TBD

#### Constant declarations

Use the `const` keyword for values that are unmodifiable.

Do this:

```actionscript
const vsp:String = getStyle("verticalScrollPolicy");
```

Or this:

```actionscript
const dataProvider:ICollectionView = this.dataProvider as ICollectionView;
```

Avoid calculations and method calls in loops.

Do this:

```actionscript
const myArrayLength:int = myArray.length;
for (var i=0; i < myArrayLength; i++)
{
}
```

Not this:

```actionscript
for (var i=0; i < myArray.length; i++)
{
}
```

#### Function declarations

TBD

Do this:

```actionscript
f(a, b)
```

Not these:

```actionscript
f(a,b)

f( a, b )
```

If the parameters have to wrap, indent the subsequent lines after the left parenthesis. Put multiple parameters per line if they fit. Otherwise, put one per line. If even one won't fit, put the first one on the second line, indented past the beginning of the function name.

```actionscript
public function foo(parameter1:Number, parameter2:String,
                    parameter3:Boolean):void

public function foo(parameter1:Number,
		  parameter2:String,
                    parameter3:Boolean):void

public function aVeryLongFunctionName(
    parameter1:Number, parameter2:String,
    parameter3:Boolean):void
```

#### Function calls

TBD

Do this:

```actionscript
f(a, b)
```

Not these:

```actionscript
f(a,b)

f( a, b )
```

#### `if` statements

Follow the if keywords with a single space before the left parenthesis. Don't put any spaces after the left parenthesis or before the right parenthesis.

Do this:

```actionscript
if (a < b)
```

Not these:

```actionscript
if(a < b)

if( a < b )

if ( a < b )
```

else if ?

multiline ?

#### `for` statements

Follow the `for` keyword with a single space before the left parenthesis. Don't put any spaces after the left parenthesis or before the right parenthesis.

Do this:

```actionscript
for (var i:int = 0; i < n; i++)
```

Not these:

```actionscript
for(var i:int = 0; i < n; i++)

for( var i:int = 0; i < n; i++ )

for ( var i:int = 0; i < n; i++ )
```

If the for clause needs to wrap, indent the subsequent lines after the left parenthesis.

```actionscript
for (var aLongLoopVariableName:int = aLongInitialExpression;
     aLongLoopVariableName < aLongUpperLimit;
     aLongLoopVariableName++)
```

#### `switch` statements

Follow the `switch` keyword with a single space before the left parenthesis. Don't put any spaces after the left parenthesis or before the right parenthesis.

Do this:

```actionscript
switch (n)
```

Not these:

```actionscript
switch(n)

switch( n )

switch ( n )
```

Follow the switch keyword with a single space before the left parenthesis. Don't put any spaces after the left parenthesis or before the right parenthesis.

Do this:

```actionscript
switch (n)
{
    case 1:
    {
        a = foo();
        break;
    }

    case 2:
    {
        a = bar();
        break;
    }

    default:
    {
        a = blech();
        break;
    }
}
```

Not these:

```actionscript
switch(n)

switch( n )

switch ( n )
```

#### `class` and `interface` declarations

braces are always balanced

no braces around single lines

single statement per line

#### Exceptions to formatting rules

It is permissible to deviate from the standard when modifying code that is not conformant to the standard. It is more important to be consistent with the style of the surrounding code.
