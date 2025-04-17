---
sidebar_position: 8
---

# Case conversion

Languages also differ in their rules for converting letters between uppercase
forms (majiscules) and lowercase forms (miniscules).

For example, in most languages that use the Latin alphabet the lowercase form of
the capital letter "I" is "i". However in some languages (such as Turkish and
Azeri) there is an additional dotless letter "ı". As a result in those languages
a lowercase dotless "ı" transforms into an uppercase "I". A lowercase "i"
transforms into an uppercase "İ" with a dot.

The StringTools class provides methods that use language-specific rules to
perform such transformations.

## Using the StringTools class

The StringTools class provides two methods to perform case transformations:
toLowerCase() and toUpperCase(). You create a StringTools object by calling the
constructor with a locale ID. The StringTools class retrieves the case
conversion rules for that locale (or a fallback locale) from the operating
system. It is not possible to further customize the case conversion algorithm.

The following example uses the toUpperCase() and toLowerCase() methods to
transform a German phrase that includes the letter "ß" (sharp S).

```
var phrase:String = "Schloß Neuschwanstein";
var converter:StringTools = new StringTools("de-DE");

var upperPhrase:String = converter.toUpperCase(phrase);
trace(upperPhrase); // SCHLOSS NEUSCHWANSTEIN

var lowerPhrase:String = converter.toLowerCase(upperPhrase);
trace(lowerPhrase);    // schloss neuschwanstein
```

The toUpperCase() method transforms the lowercase letter "ß" into the uppercase
letters "SS". This transformation works only in one direction. When the letters
"SS" are transformed back to lowercase, the result is "ss" not "ß".
