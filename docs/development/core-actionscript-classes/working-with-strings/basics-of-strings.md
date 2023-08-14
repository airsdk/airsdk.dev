---
sidebar_position: 1
---

# Basics of strings

In programming parlance, a string is a text value—a sequence of letters,
numbers, or other characters strung together into a single value. For instance,
this line of code creates a variable with the data type String and assigns a
literal string value to that variable:

```actionscript
var albumName:String = "Three for the money";
```

As this example shows, in ActionScript you can denote a string value by
surrounding text with double or single quotation marks. Here are several more
examples of strings:

    "Hello"
    "555-7649"
    "https://www.adobe.com/"

Any time you manipulate a piece of text in ActionScript, you are working with a
string value. The ActionScript String class is the data type you can use to work
with text values. String instances are frequently used for properties, method
parameters, and so forth in many other ActionScript classes.

#### Important concepts and terms

The following reference list contains important terms related to strings that
you will encounter:

ASCII  
A system for representing text characters and symbols in computer programs. The
ASCII system supports the 26-letter English alphabet, plus a limited set of
additional characters.

Character  
The smallest unit of text data (a single letter or symbol).

Concatenation  
Joining multiple string values together by adding one to the end of the other,
creating a new string value.

Empty string  
A string that contains no text, white space, or other characters, written as
`""`. An empty string value is different from a String variable with a null
value—a null String variable is a variable that does not have a String instance
assigned to it, whereas an empty string has an instance with a value that
contains no characters.

String  
A textual value (sequence of characters).

String literal (or "literal string")  
A string value written explicitly in code, written as a text value surrounded by
double quotation marks or single quotation marks.

Substring  
A string that is a portion of another string.

Unicode  
A standard system for representing text characters and symbols in computer
programs. The Unicode system allows for the use of any character in any writing
system.
