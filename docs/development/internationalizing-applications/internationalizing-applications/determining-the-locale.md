---
sidebar_position: 3
---

# Determining the locale

A locale identifies a specific combination of language and cultural conventions
for a country or region.

A locale identifier can be safely managed as a string. But you can use the
LocaleID class to obtain additional information related to a locale.

You create a LocaleID object as follows:

```
var locale:LocaleID = new LocaleID("es-MX");
```

After the LocaleID object is created, you can retrieve data about the locale ID.
Use the `getKeysAndValues()`, `getLanguage()`, `getRegion()`, `getScript()`,
`getVariant()`, and `isRightToLeft()` methods, and the `name` property.

The values retrieved from these methods and properties can reflect additional
information that cannot be extracted directly from the locale identifier about
the locale.

When an application creates a locale-aware service, such as a date formatter, it
must specify the intended locale. The list of supported locales varies from one
operating system to another; hence, the requested locale can be unavailable.

Flash Player first tries to match the language code of the locale that you
requested. Then it tries to refine the locale by finding a matching writing
system (script) and region. For example:

```
var loc:LocaleID = new LocaleID("es");
trace(loc.getLanguage()); // es
trace(loc.getScript()); // Latn
trace(loc.getRegion()); // ES
```

In this example, the `LocaleID()` constructor retrieved data about the locale
that best matches the language code "es" for that user.

## Setting the locale ID

There are a number of ways to set the current locale for an application,
including:

- Hard-code a single locale ID into the application. This approach is common,
  but it does not support internationalization of the application.

- Use the locale ID preferences from the user's operating system, or browser, or
  other user preferences. This technique usually results in the best locale
  settings for the user, but it is not always accurate. There is a risk that the
  operating system settings do not reflect the user's actual preferences. For
  example, the user could be using a shared computer and be unable to change the
  operating system's preferred locales.

- After setting the locale ID based on the user's preferences, let the user
  select from a list of supported locales. This strategy is normally the best
  option if your application can support more than one locale.

You can implement this third option as follows:

1.  Retrieve a list of the user's preferred locales or languages from a user
```
profile, browser settings, operating system settings, or a cookie. (Your
application would need to implement this logic itself. The
flash.globalization library does not support reading such preferences
directly.)
```

2.  Determine which of those locales your application supports and select the
```
best one by default. Use the method LocaleID.determinePreferredLocales() to
find the best locales for a user based on their preferred locales and the
locales supported by the operating system.
```

3.  Give the user a way to change the default locale setting in case the default
```
locale is not satisfactory.
```

## Limitations of other locale and language classes

The `fl.lang.Locale` class lets you replace text strings based on a locale,
using resource bundles containing string values. However this class does not
support other internationalization features such as number, currency, or date
formatting, sorting and matching, and so on. In addition, this class is only
available with Flash Professional.

You can also retrieve the current language code setting for the operating system
using the `flash.system.Capabilities.language` property. However, this property
retrieves only the two-character ISO 639-1 language code—not the full locale
ID—and it only supports a specific set of locales.

With AIR 1.5, you can use the `flash.system.Capabilities.languages` property.
This property provides an array of the user's preferred user interface
languages. Thus, it does not have the limitations of `Capabilities.language`.
