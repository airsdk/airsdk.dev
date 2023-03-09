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
