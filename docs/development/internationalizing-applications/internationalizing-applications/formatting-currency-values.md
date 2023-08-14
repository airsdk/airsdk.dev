---
sidebar_position: 5
---

# Formatting currency values

The display formats of currency values vary as much as number formats do. For
example, here is how the US dollar value \$123456.78 is formatted for certain
locales:

| Locale                  | Number Format  |
| ----------------------- | -------------- |
| en-US (English, USA)    | \$123,456.78   |
| de-DE (German, Germany) | 123.456,78 \$  |
| en-IN (English, India)  | \$ 1,23,456.78 |

Currency formatting involves all the same factors as number formatting, plus
these additional factors:

- Currency ISO code. The three letter ISO 4217 currency code for the actual
  locale being used, such as USD or EUR.

- Currency symbol. The currency symbol or string for the actual locale being
  used, such as \$ or €.

- Negative currency format. Defines the location of the currency symbol and the
  negative symbol or parentheses in relation to the numeric portion of the
  currency amount.

- Positive currency format. Defines the location of currency symbol relative to
  the numeric portion of the currency amount.

## Using the CurrencyFormatter class

The CurrencyFormatter class formats numeric values into strings that contain
currency strings and formatted numbers, according to the conventions of a
specific locale.

When you instantiate a new CurrencyFormatter object, it sets its currency to the
default currency for the given locale.

The following example shows that a CurrencyFormatter object created using a
German locale assumes that currency amounts are in Euros:

    var cf:CurrencyFormatter = new CurrencyFormatter( "de-DE" );
    trace(cf.format(1234567.89)); // 1.234.567,89 EUR

In most cases, do not rely on the default currency for a locale. If the user's
default locale is not supported, then the CurrencyFormatter class assigns a
fallback locale. The fallback locale can have a different default currency. In
addition, you normally want the currency formats to look correct to your user,
even if the amounts are not in the user's local currency. For example, a
Canadian user can want to see a German company's prices in Euros, but formatted
in the Canadian style.

The CurrencyFormatter.setCurrency() method specifies the exact currency string
and currency symbol to use.

The following example shows currency amounts in Euros to users in the French
part of Canada:

    var cf:CurrencyFormatter = new CurrencyFormatter( "fr-CA" );
    cf.setCurrency("EUR", "€");
    trace(cf.format(1234567.89)); // 1.234.567,89 EUR

The setCurrency() method can also be used to reduce confusion by setting
unambiguous currency symbols. For example:

    cf.setCurrency("USD","US$");

By default the format() method displays a three character ISO 4217 currency code
instead of the currency symbol. ISO 4217 codes are unambiguous and do not
require localization. However many users prefer to see currency symbols rather
than ISO codes.

The CurrencyFormatter class can help you decide which symbol a formatted
currency string uses: a currency symbol, like a dollar sign or Euro sign, or a
three character ISO currency string, such as USD or EUR. For example, an amount
in Canadian dollars could be displayed as \$200 for a user in Canada. For a user
in the United States, however, it could be displayed as CAD 200. Use the method
formattingWithCurrencySymbolIsSafe() to determine whether the amount's currency
symbol would be ambiguous or incorrect given the user's locale settings.

The following example formats a value in Euros into a format for the en-US
locale. Depending on the user's locale, the output string uses either the ISO
currency code or the currency symbol.

    var cf:CurrencyFormatter = new CurrencyFormatter( "en-CA");

    if (cf.formattingWithCurrencySymbolIsSafe("USD"))
    {
    	trace(cf.format(1234567.89, true)); // $1,234,567.89
    }
    else
    {
    	cf.setCurrency("USD", "$");
    	trace(cf.format(1234567.89)); // USD1,234,567.89
    }

## Parsing strings that contain currency values

The CurrencyFormatter class can also extract a currency amount and a currency
string from an input string that conforms to locale-specific formatting
requirements. The CurrencyFormatter.parse() method stores the parsed amount and
currency string in a CurrencyParseResult object, as shown here:

    var cf:CurrencyFormatter = new CurrencyFormatter( "en-US" );
    var inputCurrencyString:String = "(GBP 123,56,7.890)";
    var parseResult:CurrencyParseResult = cf.parse(inputCurrencyString);
    trace("parsed amount: " + parseResult.value); // -1234567.89
    trace("currencyString: " + parseResult.currencyString ); // GBP

The currency string portion of the input string can contain a currency symbol, a
currency ISO code, and additional text characters. The positions of the currency
string, the negative number indicator, and the numeric value, match the formats
specified by the negativeCurrencyFormat and positiveCurrencyFormat properties.
For example:

    var cf:CurrencyFormatter = new CurrencyFormatter( "en-US" );
    var inputCurrencyString:String = "Total $-123,56,7.890";
    var parseResult:CurrencyParseResult = cf.parse(inputCurrencyString);
    trace("status: " + cf.lastOperationStatus ); // parseError
    trace("parsed amount: " + parseResult.value); // NaN
    trace("currencyString: " + parseResult.currencyString ); //
    cf.negativeCurrencyFormat = 2;
    parseResult = cf.parse(inputCurrencyString);
    trace("status: " + cf.lastOperationStatus ); // noError
    trace("parsed amount: " + parseResult.value); // -123567.89
    trace("currencyString: " + parseResult.currencyString ); // Total $

In this example, the input string has a currency string followed by a minus sign
and a number. However the default negativeCurrencyFormat value for the en-US
locale specifies that the negative indicator comes first. As a result, the
parse() method generates an error and the parsed value is NaN.

After it sets the negativeCurrencyFormat to 2, which specifies that the currency
string comes first, the parse() method succeeds.
