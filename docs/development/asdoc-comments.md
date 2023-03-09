---
title: ASDoc Comments
---

It is a standard programming pratice to include comments in source code. This section covers the elements ASDoc recognizes in comments.
Currently ASDoc comments support a XML syntax.

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
You must close the <p> tag, in accordance with XHTML standards, as the following example shows:

```actionscript
/**
* First paragraph of a multiparagraph description.
*
* <p>Second paragraph of the description.</p>
*/
```

## Supported Tags

<table>
<tr><th>ASDoc tag</th><th>Description</th><th>Example</th></tr>

<tr>
<td><code>@copy reference</code></td>
<td>Copies an ASDoc comment from the referenced location.
The main description, <code>@param</code>, and <code>@return</code> content is copied; other tags are not copied.
<br/><br/>You typically use the <code>@copy</code> tag to copy information from a source class or interface not in
the inheritance list of the destination class. If the source class or interface is in the inheritance list,
use the <code>@inheritDoc</code> tag instead.
</td>
<td>
<code>@copy #stop</code>
<br/><br/>
<code>@copy MovieClip#stop</code>
</td></tr>

<tr>
<td><code>@default value</code></td>
<td>
Specifies the default value for a property, style, or effect.
The ASDoc tool automatically creates a sentence in the following form when it encounters an <code>@default</code> tag:
<br/><br/>
The default value is <code>value</code>.
</td>
<td><code>@default 0xCCCCCC</code></td></tr>

<tr>
<td><code>@eventType package.class.CONSTANT</code>
<br/><br/>
<code>@eventType String</code></td>
<td>
Use the first form in a comment for an <code>[Event]</code> metadata tag.
It specifies the constant that defines the value of the <code>Event.type</code> property of
the event object associated with the event. The ASDoc tool copies the description of the
event constant to the referencing class.
<br/><br/>
Use the second form in the comment for the constant definition.
It specifies the name of the event associated with the constant.
If the tag is omitted, ASDoc cannot copy the constant's comment to a referencing class.
</td>
<td></td></tr>

<tr>
<td><code>@example exampleTex</code></td>
<td>
Applies style properties, generates a heading, and puts the code example in the correct location. Enclose the code in <code>&lt;listing version="3.0"&gt;&lt;/listing&gt;</code> tags.
Whitespace formatting is preserved and the code is displayed in a gray, horizontally scrolling box.
</td>
<td>
<pre>
/**
 * @example The following code sets the volume level for your sound:
 *
 * &lt;listing version="3.0"&gt;
 *     var mySound:Sound = new Sound;
 *     mySound.setVolume(VOL_HIGH);
 * &lt;/listing&gt;
 */
</pre>
</td></tr>

<tr>
<td><code>@exampleText strin</code></td>
<td>
Use this tag in an ASDoc comment in an external example file that is referenced by the <code>@example</code> tag.
The ASDoc comment must precede the first line of the example, or follow the last line of the example.
<br/><br/>
External example files support one comment before and one comment after example code.
</td>
<td>
<pre>
/**
 * This text does not appear
 * in the output.
 * @exampleText But this does.
 */
</pre>
</td></tr>

<tr>
<td><code>@inheritDoc</code></td>
<td>
Use this tag in the comment of an overridden method or property.
It copies the comment from the superclass into the subclass, or from an interface implemented by the subclass.
<br/><br/>
The main ASDoc comment, <code>@param</code>, and <code>@return</code> content are copied; other tags are not.
You can add content to the comment before the <code>@inheritDoc</code> tag.
<br/><br/>
When you include this tag, ASdoc uses the following search order:
<br/><br/>
1. Interfaces implemented by the current class (in no particular order) and all of their base-interfaces.
2. Immediate superclass of current class.
3. Interfaces of immediate superclass and all of their base-interfaces.
4. Repeat steps 2 and 3 until the Object class is reached.
<br/><br/>
You can also use the <code>@copy</code> tag, but the <code>@copy</code> tag is for copying information from a
source class or interface that is not in the inheritance chain of the subclass.
</td>
<td><code>@inheritDoc</code></td></tr>

<tr>
<td><code>@internal text</code></td>
<td>
Hides the text attached to the tag in the generated output. The hidden text can be used for internal comments.</td>
<td>
<code>@internal Please do not publicize the undocumented use of the third parameter in this method.</code>
</td></tr>

<tr>
<td><code>@param paramName description</code></td>
<td>Adds a descriptive comment to a method parameter. The paramName argument must match a parameter definition in the method signature.</td>
<td><code>@param fileName The name of the file to load.</code></td></tr>

<tr>
<td><code>@private</code></td>
<td>
Exclude the element from the generated output.
<br/><br/>
To omit an entire class, put the <code>@private</code> tag in the ASDoc comment for the class;
to omit a single class element, put the <code>@private</code> tag in the ASDoc comment for the element.
</td>
<td><code>@private</code></td></tr>

<tr>
<td><code>@return description</code></td>
<td>
Adds a Returns section to a method description with the specified text. ASDoc automatically determines the data type of the return value.
</td>
<td><code>@return The translated message.</code></td></tr>

<tr>
<td><code>@see reference [displayText]</code></td>
<td>
Adds a See Also heading with a link to a class element. For more information, see Using the <code>@see</code> tag.
<br/><br/>
Do not include HTML formatting characters in the arguments to the <code>@see</code> tag.
</td>
<td></td></tr>

<tr>
<td><code>@throws package.class.className description</code></td>
<td>Documents an error that a method can throw.</td>
<td><code>@throws SecurityError Local untrusted SWFs may not communicate with the Internet.</code></td></tr>

</table>

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
* of the <code>myMethod</code> method.
* Notice that you do not use the paragraph tag in the
* first paragraph of the description.</p>
*
* @param param1 Describe param1 here.
* @param param2 Describe param2 here.
*
* @return A value of <code>true</code> means this;
* <code>false</code> means that.
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
For example, to use a less-than (`<`) or greater-than (`>`) symbols in a comment, use &amp;lt; and &amp;gt;. To use the at-sign (`@`) in a comment, use \&64;.
Otherwise, these characters will be interpreted as literal HTML characters in the output.

For a list of common HTML tags and their entity equivalents, see Summary of commonly used HTML elements.

Because asterisks are used to delimit comments, ASDoc does not support asterisks within a comment.
To use an asterisk in an ASDoc comment, you must use the double tilde (`~~`).
