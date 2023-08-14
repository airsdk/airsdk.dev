---
sidebar_position: 4
---

# Formatting numbers

The display format of numeric values varies widely from region to region. For
example, here is how the number 123456.78 is formatted for certain locales:

| Locale                      | Number Format |
| --------------------------- | ------------- |
| en-US (English, USA)        | -123,456.78   |
| de-DE (German, Germany)     | -123.456,78   |
| fr-FR (France, French)      | -123 456,78   |
| de-CH (German, Switzerland) | -123'456.78   |
| en-IN (English, India)      | -1,23,456.78  |
| Many Arabic locales         | 123,456.78-   |

There are many factors that influence number formats, including:

- Separators. The decimal separator is placed between the integer and fractional
  portions of a number. It can be a period, comma, or another character. The
  grouping separator or thousands separator can be a period, a comma, a
  non-breaking space, or another character.

- Grouping patterns. The number of digits between each grouping separator to the
  left of the decimal point can be two or three or another value.

- Negative number indicators. Negative numbers can be shown with a minus sign to
  the left or the right of the number, or within parentheses for financial
  applications. For example, negative 19 can be shown as -19, 19-, or (19).

- Leading and trailing zeroes. Some cultural conventions add leading or trailing
  zeroes to displayed numbers. For example the value 0.17 can be displayed as
  .17, 0.17, or 0.170, among other options.

- Sets of digit characters. Many languages, including Hindi, Arabic, and
  Japanese, use different sets of digit characters. The flash.globalization
  package supports any digit character sets that map to the digits 0-9.

The NumberFormatter class considers all of these factors when formatting numeric
values.

## Using the NumberFormatter class

The NumberFormatter class formats numeric values (of type int, uint, or Number)
according to the conventions of a specific locale.

The following example shows the simplest way to format a number using the
default formatting properties provided by the user's operating system:

    var nf:NumberFormatter = new NumberFormatter(LocaleID.DEFAULT);
    trace(nf.formatNumber(-123456.789))

The result vary based on the user's locale settings and user preferences. For
example, if the user's locale is fr-FR then the formatted value would be:

-123.456,789

If you only want to format a number for a specific locale, regardless of the
user's settings, set the locale name specifically. For example:

    var nf:NumberFormatter = new NumberFormatter("de-CH");
    trace(nf.formatNumber(-123456.789));

The result in this case are:

-123'456.789

The formatNumber() method takes a Number as a parameter. The NumberFormatter
class also has a formatInt() method that takes an int as input, and a
formatUint() method that takes a uint.

You can explicitly control the formatting logic by setting properties of the
NumberFormatter class, as shown in this example:

    var nf:NumberFormatter = new NumberFormatter("de-CH");
    nf.negativeNumberFormat = 0;
    nf.fractionalDigits = 5;
    nf.trailingZeros = true;
    nf.decimalSeparator = ",";
    nf.useGrouping = false;
    trace(nf.formatNumber(-123456.789)); //(123456.78900)

This example first creates a NumberFormatter object and then:

- sets the negative number format to use parentheses (as in financial
  applications);

- sets the number of digits after the decimal separator to 5;

- specifies that trailing zeroes be used to ensure five decimal places;

- sets the decimal separator to a comma;

- tells the formatter not to use any grouping separators.

Note: When some of these properties change, the resulting number format no
longer corresponds to the preferred format for the specified locale. Use some of
these properties only when locale-awareness is not important; when you need
detailed control over a single aspect of the format, such as the number of
trailing zeroes; or when the user requests the change directly, for example,
through the Windows Control Panel.

## Parsing strings that contain numeric values

The NumberFormatter class can also extract numeric values from strings that
conform to locale-specific formatting requirements. The
NumberFormatter.parseNumber() method extracts a single numeric value from a
string. For example:

    var nf:NumberFormatter = new NumberFormatter( "en-US" );
    var inputNumberString:String =  "-1,234,567.890"
    var parsedNumber:Number = nf.parseNumber(inputNumberString);
    trace("Value:" + parsedNumber); // -1234567.89
    trace("Status:" + nf.lastOperationStatus); // noError

The parseNumber() method handles strings that contain only digits and number
formatting characters such as negative signs and separators. If the string
contains other characters, an error code is set:

    var nf:NumberFormatter = new NumberFormatter( "en-US" );
    var inputNumberString:String =  "The value is 1,234,567.890"
    var parsedNumber:Number = nf.parseNumber(inputNumberString);
    trace("Value:" + parsedNumber); // NaN
    trace("Status:" + nf.lastOperationStatus); // parseError

To extract numbers from strings that contain additional alphabetic characters,
use the NumberFormatter.parse() method:

    var nf:NumberFormatter = new NumberFormatter( "en-US" );
    var inputNumberString:String = "The value is 123,456,7.890";
    var parseResult:NumberParseResult = nf.parse(inputNumberString);
    trace("Value:" + parseResult.value); // 1234567.89
    trace("startIndex: " + parseResult.startIndex); // 14
    trace("Status:" + nf.lastOperationStatus); // noError

The parse() method returns a NumberParseResult object that contains the parsed
numeric value in its value property. The startIndex property indicates the index
of the first numeric character that was found. You can use the startIndex and
endIndex properties to extract the portions of the string that come before and
after the digits.
