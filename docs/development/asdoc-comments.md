---
title: ASDoc Comments
---

It is a standard programming practice to include comments in source code. This section covers the elements ASDoc recognizes in comments.
Currently ASDoc comments support XML syntax.

## Writing an ASDoc comment

An ASDoc comment consists of the text between the characters `/**` that
mark the beginning of the ASDoc comment, and the characters `*/`
that mark the end of it. The text in a comment can continue onto multiple lines.

Use the following format for an ASDoc comment:

```actionscript
/**
 * Main comment text.
 *
 * @tag Tag text.
 */
```

As a best practice, prefix each line of an ASDoc comment with an asterisk (star) character,
followed by a single white space to make the comment more readable in the ActionScript file,
and to ensure correct parsing of comments. When the ASDoc tool parses a comment,
the leading asterisk and white space characters on each line are discarded; blanks and tabs preceding the initial asterisk are also discarded.

The ASDoc comment in the previous example creates a single-paragraph description in the output.
To add additional comment paragraphs, enclose each subsequent paragraph in HTML paragraph tags, `<p></p>`.
You must close the `<p>` tag, in accordance with XHTML standards, as the following example shows:

```actionscript
/**
 * First paragraph of a multiparagraph description.
 *
 * <p>Second paragraph of the description.</p>
 */
```

## Placing ASDoc comments

Place an ASDoc comment immediately before the declaration for a class, interface, constructor, method, property, or metadata tag that you want to document, as the following example shows for the `myMethod()` method:

```actionscript
/**
 * This is the typical format of a simple
 * multiline (single paragraph) main description
 * for the myMethod() method, which is declared in
 * the ActionScript code below.
 * Notice the leading asterisks and single white space
 * following each asterisk.
 */
public function myMethod(param1:String, param2:Number):Boolean
{
}
```

The ASDoc tool ignores comments placed in the body of a method and recognizes only one comment per ActionScript statement.

A common mistake is to put an import statement between the ASDoc comment for a class and the class declaration.
Because an ASDoc comment is associated with the next ActionScript statement in the file after the comment, this example associates the comment with the import statement, not the class declaration:

```actionscript title="Invalid"
/**
 * This is the class comment for the class MyClass.
 */
import flash.display.*; // MISTAKE - Do not to put import statement here.
class MyClass
{
}
```

## Formatting ASDoc comments

The main body of an ASDoc comment begins immediately after the starting characters, `/**`, and continues until the tag section, as the following example shows:

```actionscript
/**
 * Main comment text continues until the first @ tag.
 *
 * @tag Tag text.
 */
```

The first sentence of the main description of the ASDoc comment should contain a concise
but complete description of the declared entity.
The first sentence ends at the first period that is followed by a space, tab, or line terminator.

ASDoc uses the first sentence to populate the summary table at the top of the HTML page for the class.
Each type of class element (method, property, event, effect, and style) has a separate summary table in the ASDoc output.

The tag section begins with the first ASDoc tag in the comment, which is defined by the first `@` character that begins a line,
ignoring leading asterisks, white space, and the leading separator characters, `/**`.
The main description cannot continue after the tag section begins.

The text following an ASDoc tag can span multiple lines. You can have any number of tags, where some tags can be repeated, such as the `@param` and `@see` tags, while others cannot.

The following example shows an ASDoc comment that includes a main description and a tag section. Notice the use of white space and leading asterisks to make the comment more readable:

```actionscript
/**
* Typical format of a simple multiline comment.
* This text describes the myMethod() method, which is declared below.
*
* @param param1 Describe param1 here.
* @param param2 Describe param2 here.
*
* @return Describe return value here.
*
* @see someOtherMethod
*/
public function myMethod(param1:String, param2:Number):Boolean
{
}
```

## Supported Tags

### `@copy reference` 
Copies an ASDoc comment from the referenced location. The main description, `@param`, and `@return` content is copied; other tags are not copied.

You typically use the `@copy` tag to copy information from a source class or interface not in the inheritance list of the destination class. If the source class or interface is in the inheritance list, use the `@inheritDoc` tag instead.


```actionscript title="Example"
@copy #stop

@copy MovieClip#stop
``` 


### `@default value` 

Specifies the default value for a property, style, or effect. The ASDoc tool automatically creates a sentence in the following form when it encounters an `@default` tag: 

The default value is `value`.

```
@default 0xCCCCCC
```

### `@eventType`

```
@eventType package.class.CONSTANT
@eventType String
```

Use the first form in a comment for an `[Event]` metadata tag. It specifies the constant that defines the value of the `Event.type` property of the event object associated with the event. The ASDoc tool copies the description of the event constant to the referencing class.

Use the second form in the comment for the constant definition. It specifies the name of the event associated with the constant. If the tag is omitted, ASDoc cannot copy the constant's comment to a referencing class.

### `@example exampleText` 

Applies style properties, generates a heading, and puts the code example in the correct location. Enclose the code in `<listing version="3.0"></listing>` tags. Whitespace formatting is preserved and the code is displayed in a gray, horizontally scrolling box. 


```actionscript title="Example"
/**
 * @example The following code sets the volume level for your sound:
 *
 * <listing version="3.0">
 *     var mySound:Sound = new Sound;
 *     mySound.setVolume(VOL_HIGH);
 * </listing>
 */
```

### `@exampleText string` 

Use this tag in an ASDoc comment in an external example file that is referenced by the `@example` tag. The ASDoc comment must precede the first line of the example, or follow the last line of the example. External example files support one comment before and one comment after example code.

```actionscript title="Example"
/** 
 * This text does not appear
 * in the output.
 * @exampleText But this does.
 */
```

### `@inheritDoc` 

Use this tag in the comment of an overridden method or property. It copies the comment from the superclass into the subclass, or from an interface implemented by the subclass.

The main ASDoc comment, `@param`, and `@return` content are copied; other tags are not. You can add content to the comment before the `@inheritDoc` tag.

When you include this tag, ASDoc uses the following search order:
1. Interfaces implemented by the current class (in no particular order) and all of their base-interfaces.
2. Immediate superclass of current class.
3. Interfaces of immediate superclass and all of their base-interfaces.
4. Repeat steps 2 and 3 until the Object class is reached.

You can also use the `@copy` tag, but the `@copy` tag is for copying information from a source class or interface that is not in the inheritance chain of the subclass.

### `@internal text` 

Hides the text attached to the tag in the generated output. The hidden text can be used for internal comments. 

```actionscript title="Example"
@internal Please do not publicize the undocumented use of the third parameter in this method.
```

### `@langversion`

Use this tag to indicate the language versions at which a feature is supported.

```actionscript title="Example"
@langversion 3.0
```

### `@param paramName description` 

Adds a descriptive comment to a method parameter. The paramName argument must match a parameter definition in the method signature. 

```actionscript title="Example"
@param fileName The name of the file to load.
```

### `@playerversion`

Use this tag to indicate the runtime versions at which a feature is supported, as plain text. This tag may be repeated multiple times.

```actionscript title="Example"
@playerversion Flash 10.2
@playerversion AIR 2.6
```

### `@private`

Exclude the element from the generated output.

To omit an entire class, put the `@private` tag in the ASDoc comment for the class; to omit a single class element, put the `@private` tag in the ASDoc comment for the element

### `@productversion`

Use this tag to indicate the product versions at which a feature is supported, as plain text.

```actionscript title="Example"
@productversion Product N1 1.0, Product N2 1.0
```

### `@return description` 

Adds a Returns section to a method description with the specified text. ASDoc automatically determines the data type of the return value. 

```actionscript title="Example" 
@return The translated message.
```

### `@see`

`@see reference [displayText]` 

Adds a See Also heading with a link to a class element. For more information, see Using the `@see` tag.

Do not include HTML formatting characters in the arguments to the `@see` tag.


### `@throws package.class.className description` 

Documents an error that a method can throw. 

```actionscript title="Example" 
@throws SecurityError Local untrusted SWFs may not communicate with the Internet.
```

## Supported meta-data

## `[Event]`

The `[Event]` meta-data specifies an event that is likely to be dispatched by an `EventDispatcher` subclass. It may be preceded by an ASDoc comment that applies to it.

```actionscript
[Event(name="eventName", type="T")]
```

When attaching this meta-data to a class definition, it must precede the ASDoc comments that apply to the class itself; for example:

```actionscript title="Example"
import flash.events.EventDispatcher;

[Event(name="received", type="flash.events.Event")]
/**
 * Represents a WebSocket communication.
 */
public final class WebSocket extends EventDispatcher {}
```

## Using the `@private` tag

By default, the ASDoc tool generates output for all public and protected elements in an ActionScript class, even if you omit the ASDoc comment.
To make ASDoc ignore an element, insert an ASDoc comment that contains the `@private` tag anywhere in the comment.
The ASDoc comment can contain additional text along with the `@private` tag, which is also excluded from the output.

ASDoc also generates output for all public classes in the list of input classes.
You can specify to ignore an entire class by inserting an ASDoc comment that contains the `@private` tag
before the class definition. The ASDoc comment can contain additional text along with the `@private` tag, which is also excluded from the output.

## Excluding an inherited element

By default, the ASDoc tool copies information and a link for all ActionScript elements inherited by a subclass from a superclass.
In some cases, a subclass may not support an inherited element.
You can use the `Exclude` metadata tag to cause ASDoc to omit the inherited element from the list of inherited elements.

The `Exclude` metadata tag has the following syntax:

```actionscript
[Exclude(name="elementName", kind="property|method|event|style|effect")]
```

For example, to exclude documentation on the click event in the MyButton subclass of the Button class, insert the following `Exclude` metadata tag in the MyButton.as file:

```actionscript
[Exclude(name="click", kind="event")]
```

## Using HTML tags

You must write the text of an ASDoc comment in XHTML-compliant HTML.
You can use selected HTML entities and HTML tags to define paragraphs, format text, create lists, and add anchors.

The following example comment contains HTML tags to format the output:

```actionscript
/**
 * This is the typical format of a simple multiline comment
 * for the myMethod() method.
 *
 * <p>This is the second paragraph of the main description
 * of the `myMethod` method.
 * Notice that you do not use the paragraph tag in the
 * first paragraph of the description.</p>
 *
 * @param param1 Describe param1 here.
 * @param param2 Describe param2 here.
 *
 * @return A value of `true` means this;
 * `false` means that.
 *
 * @see someOtherMethod
 */
public function myMethod(param1:String, param2:Number):Boolean
{
}
```

## Using special characters

The ASDoc tool might fail if your source files contain non-UTF-8 characters such as curly quotes.
If it does fail, the error messages it displays should refer to a line number in the interim XML file that was created for that class.
That can help you track down the location of the special character.

ASDoc passes all HTML tags and tag entities in a comment to the output.
Therefore, if you want to use special characters in a comment, you must enter them using HTML code equivalents.
For example, to use a less-than (`<`) or greater-than (`>`) symbols in a comment, use `&lt;` and `&gt;`. To use the at-sign (`@`) in a comment, use `&#64;`.
Otherwise, these characters will be interpreted as literal HTML characters in the output.

For a list of common HTML tags and their entity equivalents, see Summary of commonly used HTML elements.

Because asterisks are used to delimit comments, ASDoc does not support asterisks within a comment.
To use an asterisk in an ASDoc comment, you must use the double tilde (`~~`).

## Hiding text in ASDoc comments

The ASDoc style sheet contains a class called `hide`, which you use to hide text in an ASDoc comment by setting the class attribute to `hide`.
Hidden text does not appear in the ASDoc HTML output, but does appear in the generated HTML file so you should not use it for confidential information.
The following example uses the `hide` class:

```actionscript
/**
 * Dispatched when the user presses the Button control.
 * If the `autoRepeat` property is `true`,
 * this event is dispatched repeatedly as long as the button stays down.
 *
 * <span class="hide">This text is hidden.</span>
 * @eventType mx.events.FlexEvent.BUTTON_DOWN
 */
```

## Rules for parsing ASDoc comments

The following rules summarize how ASDoc processes an ActionScript file:

- If an ASDoc comment precedes an ActionScript element, ASDoc copies the comment and code element to the output file.
- If an ActionScript element is not preceded by an ASDoc comment, ASDoc copies the code element to the output file with an empty description.
- If an ASDoc comment contains the `@private` ASDoc tag, the associated ActionScript element and the ASDoc comment are ignored.
- The comment text should always precede any `@` tags, otherwise the comment text is interpreted as an argument to an `@` tag.
The only exception is the `@private` tag, which can appear anywhere in an ASDoc comment.
- HTML tags, such as `<p></p>`, and `<ul></ul>`, in ASDoc comments are passed through to the output.
- HTML tags must use XML style conventions, which means there must be a beginning and ending tag. For example, an `<li>` tag must always be closed by a `</li>` tag.

