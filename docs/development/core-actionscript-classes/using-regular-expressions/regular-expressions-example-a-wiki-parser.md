---
sidebar_position: 4
---

# Regular expressions example: A Wiki parser

This simple Wiki text conversion example illustrates a number of uses for
regular expressions:

- Converting lines of text that match a source Wiki pattern to the appropriate
  HTML output strings.

- Using a regular expression to convert URL patterns to HTML `<a>` hyperlink
  tags.

- Using a regular expression to convert U.S. dollar strings (such as `"$9.95"`)
  to euro strings (such as `"8.24 €"`).

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The WikiEditor application files can be found in the folder Samples/WikiEditor.
The application consists of the following files:

<table>
<thead>
    <tr>
        <th><p>File</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>
            <p>WikiEditor.mxml</p>
            <p>or</p>
            <p>WikiEditor.fla</p>
        </td>
        <td><p>The main
        application file in Flash (FLA) or Flex (MXML).</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/regExpExamples/WikiParser.as</p></td>
        <td><p>A class that
        includes methods that use regular expressions to convert Wiki input text
        patterns to the equivalent HTML output.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/regExpExamples/URLParser.as</p></td>
        <td><p>A class that
        includes methods that use regular expressions to convert URL strings to
        HTML <samp>&lt;a&gt;</samp>
        hyperlink tags.</p></td>
    </tr>
    <tr>
        <td><p>com/example/programmingas3/regExpExamples/CurrencyConverter.as</p></td>
        <td><p>A class that
        includes methods that use regular expressions to convert U.S. dollar
        strings to euro strings.</p></td>
    </tr>
</tbody>
</table>

## Defining the WikiParser class

The WikiParser class includes methods that convert Wiki input text into the
equivalent HTML output. This is not a very robust Wiki conversion application,
but it does illustrate some good uses of regular expressions for pattern
matching and string conversion.

The constructor function, along with the `setWikiData()` method, simply
initializes a sample string of Wiki input text, as follows:

```
public function WikiParser()
{
```

        wikiData = setWikiData();
```
}
```

When the user clicks the Test button in the sample application, the application
invokes the `parseWikiString()` method of the WikiParser object. This method
calls a number of other methods, which in turn assemble the resulting HTML
string.

```
public function parseWikiString(wikiString:String):String
{
```

        var result:String = parseBold(wikiString);
        result = parseItalic(result);
        result = linesToParagraphs(result);
        result = parseBullets(result);
        return result;
```
}
```

Each of the methods called— `parseBold()`, `parseItalic()`,
`linesToParagraphs()`, and `parseBullets()` —uses the `replace()` method of the
string to replace matching patterns, defined by a regular expression, in order
to transform the input Wiki text into HTML-formatted text.

#### Converting boldface and italic patterns

The `parseBold()` method looks for a Wiki boldface text pattern (such as
`'''foo'''`) and transforms it into its HTML equivalent (such as `<b>foo</b>`),
as follows:

```
private function parseBold(input:String):String
{
```

        var pattern:RegExp = /'''(.*?)'''/g;
        return input.replace(pattern, "<b>$1</b>");
```
}
```

Note that the `(.?*)` portion of the regular expression matches any number of
characters (`*`) between the tw defining `'''` patterns. The `?` quantifier
makes the match nongreedy, so that for a string such as
`'''aaa''' bbb '''ccc'''`, the first matched string will be `'''aaa'''` and not
the entire string (which starts and ends with the `'''` pattern).

The parentheses in the regular expression define a capturing group, and the
`replace()` method refers to this group by using the `$1` code in the
replacement string. The `g` (`global`) flag in the regular expression ensures
that the `replace()` method replaces all matches in the string (not simply the
first one).

The `parseItalic()` method works similarly to the `parseBold()` method, except
that it checks for two apostrophes (`''`) as the delimiter for italic text (not
three):

```
private function parseItalic(input:String):String
{
```

        var pattern:RegExp = /''(.*?)''/g;
        return input.replace(pattern, "<i>$1</i>");
```
}
```

#### Converting bullet patterns

As the following example shows, the `parseBullet()` method looks for the Wiki
bullet line pattern (such as `* foo`) and transforms it into its HTML equivalent
(such as `<li>foo</li>`):

```
private function parseBullets(input:String):String
{
```

        var pattern:RegExp = /^\*(.*)/gm;
        return input.replace(pattern, "<li>$1</li>");
```
}
```

The `^` symbol at the beginning of the regular expression matches the beginning
of a line. The `m` (`multiline`) flag in the regular expression causes the
regular expression to match the `^` symbol against the start of a line, not
simply the start of the string.

The `\*` pattern matches an asterisk character (the backslash is used to signal
a literal asterisk instead of a `*` quantifier).

The parentheses in the regular expression define a capturing group, and the
`replace()` method refers to this group by using the `$1` code in the
replacement string. The `g` (`global`) flag in the regular expression ensures
that the `replace()` method replaces all matches in the string (not simply the
first one).

#### Converting paragraph Wiki patterns

The `linesToParagraphs()` method converts each line in the input Wiki string to
an HTML `<p>` paragraph tag. These lines in the method strip out empty lines
from the input Wiki string:

```
var pattern:RegExp = /^$/gm;
var result:String = input.replace(pattern, "");
```

The `^` and `$` symbols the regular expression match the beginning and end of a
line. The `m` (`multiline`) flag in the regular expression causes the regular
expression to match the ^ symbol against the start of a line, not simply the
start of the string.

The `replace()` method replaces all matching substrings (empty lines) with an
empty string (`""`). The `g` (`global`) flag in the regular expression ensures
that the `replace()` method replaces all matches in the string (not simply the
first one).

## Converting URLs to HTML \<a\> tags

When the user clicks the Test button in the sample application, if the user
selected the `urlToATag` check box, the application calls the
`URLParser.urlToATag()` static method to convert URL strings from the input Wiki
string into HTML `<a>` tags.

```
var protocol:String = "((?:http|ftp)://)";
var urlPart:String = "([a-z0-9_-]+\.[a-z0-9_-]+)";
var optionalUrlPart:String = "(\.[a-z0-9_-]*)";
var urlPattern:RegExp = new RegExp(protocol + urlPart + optionalUrlPart, "ig");
var result:String = input.replace(urlPattern, "<a href='$1$2$3'><u>$1$2$3</u></a>");
```

The `RegExp()` constructor function is used to assemble a regular expression
(`urlPattern`) from a number of constituent parts. These constituent parts are
each strings that define part of the regular expression pattern.

The first part of the regular expression pattern, defined by the `protocol`
string, defines an URL protocol: either `http://` or `ftp://`. The parentheses
define a noncapturing group, indicated by the `?` symbol. This means that the
parentheses are simply used to define a group for the `|` alternation pattern;
the group will not match backreference codes (`$1`, `$2`, `$3`) in the
replacement string of the `replace()` method.

The other constituent parts of the regular expression each use capturing groups
(indicated by parentheses in the pattern), which are then used in the
backreference codes (`$1`, `$2`, `$3`) in the replacement string of the
`replace()` method.

The part of the pattern defined by the `urlPart` string matches _at least_ one
of the following characters: `a-z`, `0-9`, `_`, or `-`. The `+` quantifier
indicates that at least one character is matched. The `\.` indicates a required
dot (`.`) character. And the remainder matches another string of at least one of
these characters: `a-z`, `0-9`, `_`, or `-`.

The part of the pattern defined by the `optionalUrlPart` string matches _zero or
more_ of the following: a dot (`.`) character followed by any number of
alphanumeric characters (including `_` and `-`). The `*` quantifier indicates
that zero or more characters are matched.

The call to the `replace()` method employs the regular expression and assembles
the replacement HTML string, using backreferences.

The `urlToATag()` method then calls the `emailToATag()` method, which uses
similar techniques to replace e-mail patterns with HTML `<a>` hyperlink strings.
The regular expressions used to match HTTP, FTP, and e-mail URLs in this sample
file are fairly simple, for the purposes of exemplification; there are much more
complicated regular expressions for matching such URLs more correctly.

## Converting U.S. dollar strings to euro strings

When the user clicks the Test button in the sample application, if the user
selected the `dollarToEuro` check box, the application calls the
`CurrencyConverter.usdToEuro()` static method to convert U.S. dollar strings
(such as `"$9.95"`) to euro strings (such as `"8.24 €"`), as follows:

```
var usdPrice:RegExp = /\$([\d,]+.\d+)+/g;
return input.replace(usdPrice, usdStrToEuroStr);
```

The first line defines a simple pattern for matching U.S. dollar strings. Notice
that the `$` character is preceded with the backslash (`\`) escape character.

The `replace()` method uses the regular expression as the pattern matcher, and
it calls the `usdStrToEuroStr()` function to determine the replacement string (a
value in euros).

When a function name is used as the second parameter of the `replace()` method,
the following are passed as parameters to the called function:

- The matching portion of the string.

- Any captured parenthetical group matches. The number of arguments passed this
  way varies depending on the number of captured parenthetical group matches.
  You can determine the number of captured parenthetical group matches by
  checking `arguments.length - 3` within the function code.

- The index position in the string where the match begins.

- The complete string.

The `usdStrToEuroStr()` method converts U.S. dollar string patterns to euro
strings, as follows:

```
private function usdToEuro(...args):String
{
```

        var usd:String = args[1];
        usd = usd.replace(",", "");
        var exchangeRate:Number = 0.828017;
        var euro:Number = Number(usd) * exchangeRate;
        trace(usd, Number(usd), euro);
        const euroSymbol:String = String.fromCharCode(8364); // €
        return euro.toFixed(2) + " " + euroSymbol;
```
}
```

Note that `args[1]` represents the captured parenthetical group matched by the
`usdPrice` regular expression. This is the numerical portion of the U.S. dollar
string: that is, the dollar amount without the `$` sign. The method applies an
exchange rate conversion and returns the resulting string (with a trailing €
symbol instead of a leading $ symbol).
