---
sidebar_position: 2
---

# Overview of the flash.globalization package

The flash.globalization package harnesses the cultural support capabilities of
the underlying operating system. It makes it easier to write applications that
follow the cultural conventions of individual users.

The main classes in the package include:

- The Collator class which governs the sorting and matching of strings

- The CurrencyFormatter class which formats numbers into currency amount
  strings, and parses currency amounts and symbols from input strings

- The DateTimeFormatter class which formats date values

- The LocaleID class for retrieving information about a specific locale

- The NumberFormatter class which formats and parses numeric values

- The StringTools class which handles locale-sensitive case conversion of
  strings

## The flash.globalization package and resource localization

The flash.globalization package doesn't handle resource localization. However
you can use the flash.globalization locale ID as the key value for retrieving
localized resources using other techniques. For example, you can localize
application resources built with Flex using the ResourceManager and
ResourceBundle classes. For more information, see
[Localizing Flex Applications](https://web.archive.org/web/20080405201858/http://livedocs.adobe.com/flex/3/html/help.html?content=l10n_1.html).

Adobe AIR 1.1 also contains some features to help localize AIR applications, as
discussed in
[Localizing AIR applications](../localizing-applications.md#localizing-air-applications).

## A general approach to internationalizing an application

The following steps describe a high-level common approach for internationalizing
an application using the flash.globalization package:

1.  Determine or set the locale.

2.  Create an instance of a service class (Collator, CurrencyFormatter,
    DateTimeFormatter, NumberFormatter, or StringTools).

3.  Check for errors and fallbacks using lastOperationStatus properties.

4.  Format and display information using locale-specific settings.

The next step is to load and display strings and user interface resources that
are specific to the locale. This step can include tasks such as:

- Using the autolayout features to resize the UI to accommodate the string
  lengths

- Choosing the right fonts and supporting font fallbacks

- Using the FTE text engine to support other writing systems

- Ensuring that input method editors are correctly handled

## Checking for errors and fallbacks

The flash.globalization service classes all follow a similar pattern for
identifying errors. They also share a pattern for falling back from an
unavailable requested locale to one that the user's operating system supports.

The following example shows how to check for errors and fallbacks when
instantiating service classes. Each service class has a lastOperationStatus
property that indicates whether the most recent method call triggered their
errors or warnings.

    var nf:NumberFormatter = new NumberFormatter("de-DE");
    if(nf.lastOperationStatus != LastOperationStatus.NO_ERROR)
    {
    	if(nf.lastOperationStatus == LastOperationStatus.USING_FALLBACK_WARNING)
    	{
    		// perform fallback logic here, if needed
    		trace("Warning - Fallback locale ID: " + nf.actualLocaleIDName);
    	}
    	else
    	{
    		// perform error handling logic here, if needed
    		trace("Error: " + nf.lastOperationStatus);
    	}
    }

This example simply traces a message if a fallback locale ID is used, or if
there is an error. Your application can perform additional error handling logic,
if needed. For example, you could display a message to the user or force the
application to use a specific, supported locale.
