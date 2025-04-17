---
sidebar_position: 2
---

# Characters, metacharacters, and metasequences

The simplest regular expression is one that matches a sequence of characters, as
in the following example:

```
var pattern:RegExp = /hello/;
```

However, the following characters, known as metacharacters _,_ have special
meanings in regular expressions:

```
^ $ \ . * + ? ( ) [ ] { } |
```

For example, the following regular expression matches the letter A followed by
zero or more instances of the letter B (the asterisk metacharacter indicates
this repetition), followed by the letter C:

```
/AB*C/
```

To include a metacharacter without its special meaning in a regular expression
pattern, you must use the backslash ( `\` ) escape character. For example, the
following regular expression matches the letter A followed by the letter B,
followed by an asterisk, followed by the letter C:

```
var pattern:RegExp = /AB\*C/;
```

A _metasequence,_ like a metacharacter, has special meaning in a regular
expression. A metasequence is made up of more than one character. The following
sections provide details on using metacharacters and metasequences.

#### About metacharacters

The following table summarizes the metacharacters that you can use in regular
expressions:

<table>
  <thead>
    <tr>
      <th><p>Metacharacter</p></th>
      <th><p>Description</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p><samp>^</samp> (caret)</p>
      </td>
      <td>
        <p>
          Matches at the start of the string. With the <samp>m</samp> (
          <samp>multiline</samp> ) flag set, the caret matches the start of a
          line as well (see
          <a href="flags-and-properties">Flags and properties</a> ). Note that
          when used at the start of a character class, the caret indicates
          negation, not the start of a string. For more information, see
          <a href="character-classes">Character classes</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>$</samp> (dollar sign)</p>
      </td>
      <td>
        <p>
          Matches at the end of the string. With the <samp>m</samp> (
          <samp>multiline</samp> ) flag set, <samp>$</samp> matches the position
          before a newline ( <samp>\n</samp> ) character as well. For more
          information, see
          <a href="flags-and-properties">Flags and properties</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>&#92;</samp> (backslash)</p>
      </td>
      <td>
        <p>Escapes the special metacharacter meaning of special characters.</p>
        <p>
          Also, use the backslash character if you want to use a forward slash
          character in a regular expression literal, as in
          <samp>/1\/2/</samp> (to match the character 1, followed by the forward
          slash character, followed by the character 2).
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>.</samp> (dot)</p>
      </td>
      <td>
        <p>Matches any single character.</p>
        <p>
          A dot matches a newline character ( <samp>\n</samp> ) only if the
          <samp>s</samp> ( <samp>dotall</samp> ) flag is set. For more
          information, see
          <a href="flags-and-properties">Flags and properties</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>*</samp> (star)</p>
      </td>
      <td>
        <p>Matches the previous item repeated zero or more times.</p>
        <p>For more information, see <a href="quantifiers">Quantifiers</a>.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>+</samp> (plus)</p>
      </td>
      <td>
        <p>Matches the previous item repeated one or more times.</p>
        <p>For more information, see <a href="quantifiers">Quantifiers</a>.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>?</samp> (question mark)</p>
      </td>
      <td>
        <p>Matches the previous item repeated zero times or one time.</p>
        <p>For more information, see <a href="quantifiers">Quantifiers</a>.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>(</samp> and <samp>)</samp></p>
      </td>
      <td>
        <p>
          Defines groups within the regular expression. Use groups for the
          following:
        </p>
        <ul class="incremental">
          <li>
            <p>
              To confine the scope of the | alternator: <samp>/(a|b|c)d/</samp>
            </p>
          </li>
          <li>
            <p>
              To define the scope of a quantifier: <samp>/(walla.){1,2}/</samp>
            </p>
          </li>
          <li>
            <p>
              In backreferences. For example, the <samp>\1</samp> in the
              following regular expression matches whatever matched the first
              parenthetical group of the pattern:
            </p>
          </li>
          <li>
            <p><samp>/(\w*) is repeated: \1/</samp></p>
          </li>
        </ul>
        <p>For more information, see <a href="groups">Groups</a>.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>[</samp> and <samp>]</samp></p>
      </td>
      <td>
        <p>
          Defines a character class, which defines possible matches for a single
          character:
        </p>
        <p>
          <samp>/[aeiou]/</samp> matches any one of the specified characters.
        </p>
        <p>
          Within character classes, use the hyphen (
          <samp>-</samp>
          ) to designate a range of characters:
        </p>
        <p>
          <samp>/[A-Z0-9]/</samp> matches uppercase A through Z or 0 through 9.
        </p>
        <p>Within character classes, insert a backslash to escape the ] and</p>
        <p>- characters:</p>
        <p>
          <samp>/[+\-]\d+/</samp> matches either <samp>+</samp> or
          <samp>-</samp> before one or more digits.
        </p>
        <p>
          Within character classes, other characters, which are normally
          metacharacters, are treated as normal characters (not metacharacters),
          without the need for a backslash:
        </p>
        <p>
          <samp>/[$]/</samp> £ matches either <samp>$</samp> <samp>or</samp> £.
        </p>
        <p>
          For more information, see
          <a href="character-classes">Character classes</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>|</samp> <em>(pipe)</em></p>
      </td>
      <td>
        <p>
          Used for alternation, to match either the part on the left side or the
          part on the right side:
        </p>
        <p>
          <samp>/abc|xyz/</samp> matches either <samp>abc</samp> or
          <samp>xyz</samp> .
        </p>
      </td>
    </tr>
  </tbody>
</table>


#### About metasequences

Metasequences are sequences of characters that have special meaning in a regular
expression pattern. The following table describes these metasequences:

| Metasequence | Description |
| -----------: | ----------- |
| <br/><br/>
<samp>&#123;n&#125;</samp><br/>
<samp>&#123;n,&#125;</samp><br/>
<samp>&#123;n, n&#125;</samp><br/><br/><br/> | Specifies a numeric quantifier or quantifier range for the previous item:<br/><br/>`/A{27}/` matches the character A repeated 27 times.<br/>`/A{3,}/` matches the character A repeated 3 or more times.<br/>`/A{3,5}/` matches the character A repeated 3 to 5 times.<br/><br/>For more information, see [Quantifiers](quantifiers.md). |
| <samp>\b</samp> | Matches at the position between a word character and a nonword character. If the first or last character in the string is a word character, also matches the start or end of the string. |



<table>
  <thead>
    <tr>
      <th><p>Metasequence</p></th>
      <th><p>Description</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>
          <samp>{'{'}</samp>
          <samp>n</samp>
          <samp>}</samp>
        </p>
        <p>
          <samp>{'{'}</samp>
          <samp>n</samp>
          <samp>{',}'}</samp>
        </p>
        <p>and</p>
        <p>
          <samp>{'{'}</samp>
          <samp>n</samp>
          <samp>,</samp>
          <samp>n</samp>
          <samp>}</samp>
        </p>
      </td>
      <td>
        <p>
          Specifies a numeric quantifier or quantifier range for the previous
          item:
        </p>
        <p>
          <samp>/A{27}/</samp> matches the character <samp>A</samp> repeated
          <samp>27</samp> times.
        </p>
        <p>
          <samp>/A{'{3,}'}/</samp> matches the character <samp>A</samp> repeated
          <samp>3</samp> or more times.
        </p>
        <p>
          <samp>/A{'{3,5}'}/</samp> matches the character
          <samp>A</samp> repeated <samp>3</samp> to <samp>5</samp> times.
        </p>
        <p>For more information, see [Quantifiers](quantifiers.md) .</p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\b</samp></p>
      </td>
      <td>
        <p>
          Matches at the position between a word character and a nonword
          character. If the first or last character in the string is a word
          character, also matches the start or end of the string.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\B</samp></p>
      </td>
      <td>
        <p>
          Matches at the position between two word characters. Also matches the
          position between two nonword characters.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\d</samp></p>
      </td>
      <td><p>Matches a decimal digit.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\D</samp></p>
      </td>
      <td><p>Matches any character other than a digit.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\f</samp></p>
      </td>
      <td><p>Matches a form feed character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\n</samp></p>
      </td>
      <td><p>Matches the newline character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\r</samp></p>
      </td>
      <td><p>Matches the return character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\s</samp></p>
      </td>
      <td>
        <p>
          Matches any white-space character (a space, tab, newline, or return
          character).
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\S</samp></p>
      </td>
      <td><p>Matches any character other than a white-space character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\t</samp></p>
      </td>
      <td><p>Matches the tab character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\u</samp> <samp>nnnn</samp></p>
      </td>
      <td>
        <p>
          Matches the Unicode character with the character code specified by the
          hexadecimal number <em>nnnn</em>. For example, <samp>\u263a</samp> is
          the smiley character.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\v</samp></p>
      </td>
      <td><p>Matches a vertical feed character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\w</samp></p>
      </td>
      <td>
        <p>
          Matches a word character ( <samp>AZ</samp> –, <samp>az</samp> –,
          <samp>0-9</samp> , or <samp>_</samp> ). Note that <samp>\w</samp> does
          not match non-English characters, such as <samp>é</samp>,
          <samp>ñ</samp>, or <samp>ç</samp>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p><samp>\W</samp></p>
      </td>
      <td><p>Matches any character other than a word character.</p></td>
    </tr>
    <tr>
      <td>
        <p><samp>\\x</samp> <samp>nn</samp></p>
      </td>
      <td>
        <p>
          Matches the character with the specified ASCII value, as defined by
          the hexadecimal number <em>nn</em>.
        </p>
      </td>
    </tr>
  </tbody>
</table>
