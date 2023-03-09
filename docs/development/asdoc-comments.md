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
@example The following code sets the volume level for your sound:<br/>
&lt;listing version="3.0"&gt;
    var mySound:Sound = new Sound;
    mySound.setVolume(VOL_HIGH);
&lt;/listing&gt;
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
<!--
<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>

<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>

<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>

<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>

<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>

<tr>
<td><code>@x</code></td>
<td></td>
<td></td></tr>
-->
</table>
