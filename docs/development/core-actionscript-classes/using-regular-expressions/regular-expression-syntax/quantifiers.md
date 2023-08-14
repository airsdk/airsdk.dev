---
sidebar_position: 4
---

# Quantifiers

You use quantifiers to specify repetitions of characters or sequences in
patterns, as follows:

<table>
<thead>
    <tr>
        <th><p>Quantifier metacharacter</p></th>
        <th><p>Description</p></th>
    </tr>
    </thead>
<tbody>
    <tr>
        <td><p><samp>*</samp>
        (star)</p></td>
        <td><p>Matches the
        previous item repeated zero or more times.</p></td>
    </tr>
    <tr>
        <td><p><samp>+</samp>
        (plus)</p></td>
        <td><p>Matches the
        previous item repeated one or more times.</p></td>
    </tr>
    <tr>
        <td><p><samp>?</samp>
        (question mark)</p></td>
        <td><p>Matches the
        previous item repeated zero times or one time.</p></td>
    </tr>
    <tr>
        <td><p><samp>{'{'}</samp>
        <samp>n</samp>
        <samp>}</samp></p>
        <p><samp>{'{'}</samp>
        <samp>n</samp>
        <samp>{',}'}</samp></p>
        <p>and</p>
        <p><samp>{'{'}</samp>
        <samp>n</samp>
        <samp>,</samp>
        <samp>n</samp>
        <samp>}</samp></p></td>
        <td><p>Specifies a
        numeric quantifier or quantifier range for the previous item:</p>
        <p><samp>/A{27}/</samp> matches the
        character A repeated 27 times.</p>
        <p><samp>/A{'{3,}'}/</samp> matches the
        character A repeated 3 or more times.</p>
        <p><samp>/A{3,5}/</samp> matches
        the character A repeated 3 to 5 times.</p></td>
    </tr>
</tbody>
</table>

You can apply a quantifier to a single character, to a character class, or to a
group:

- `/a+/` matches the character `a` repeated one or more times.

- `/\d+/` matches one or more digits.

- `/[abc]+/` matches a repetition of one or more character, each of which is
  either `a`, `b`, or `c`.

- `/(very, )*/` matches the word `very` followed by a comma and a space repeated
  zero or more times.

You can use quantifiers within parenthetical groupings that have quantifiers
applied to them. For example, the following quantifier matches strings such as
`word` and `word-word-word`:

    /\w+(-\w+)*/

By default, regular expressions perform what is known as _greedy matching._ Any
subpattern in the regular expression (such as `.*`) tries to match as many
characters in the string as possible before moving forward to the next part of
the regular expression. For example, consider the following regular expression
and string:

    var pattern:RegExp = /<p>.*<\/p>/;
    str:String = "<p>Paragraph 1</p> <p>Paragraph 2</p>";

The regular expression matches the entire string:

    <p>Paragraph 1</p> <p>Paragraph 2</p>

Suppose, however, that you want to match only one `<p>...</p>` grouping. You can
do this with the following:

    <p>Paragraph 1</p>

Add a question mark (`?`) after any quantifier to change it to what is known as
a _lazy quantifier_. For example, the following regular expression, which uses
the lazy `*?` quantifier, matches `<p>` followed by the minimum number of
characters possible (lazy), followed by `</p>`:

    /<p>.*?<\/p>/

Keep in mind the following points about quantifiers:

- The quantifiers `{0}` and `{0,0}` do not exclude an item from a match.

- Do not combine multiple quantifiers, as in `/abc+*/`.

- The dot (.) does not span lines unless the `s` (`dotall`) flag is set, even if
  it is followed by a `*` quantifier. For example, consider the following code:

      var str:String = "<p>Test\n";
      str += "Multiline</p>";
      var re:RegExp = /<p>.*<\/p>/;
      trace(str.match(re)); // null;

      re = /<p>.*<\/p>/s;
      trace(str.match(re));
          // output: <p>Test
          //                    Multiline</p>

For more information, see [Flags and properties](./flags-and-properties.md).
