---
sidebar_position: 6
---

# Formatting dates and times

The display format of date and time values also varies widely from region to
region. For example, here is how the second day of January, 1962 at 1:01 PM is
displayed in a short format for certain locales:

| Locale                  | Date and Time Format |
| ----------------------- | -------------------- |
| en-US (English, USA)    | 1/2/62 1:01pm        |
| fr-FR (France, French)  | 2/1/62 13:01         |
| ja-JP (Japan, Japanese) | 1962/2/1 13:01       |

## Using the DateTimeFormatter class

The DateTimeFormatter class formats Date values into date and time strings
according to the conventions of a specific locale.

Formatting follows a pattern string which contains sequences of letters that are
replaced with date or time values. For example, in the pattern "yyyy/MM" the
characters "yyyy" are replaced with a four-digit year, followed by a "/"
character, and a two-digit month.

The pattern string can be set explicitly using the setDateTimePattern() method.
However it is best to let the pattern be set automatically according to the
user's locale and operating system preferences. This practice helps assure that
the result is culturally appropriate.

The DateTimeFormatter can represent dates and times in three standard styles
(LONG, MEDIUM, and SHORT) and it can also use a CUSTOM pattern. One style can be
used for the date, and a second style for the time. The actual patterns used for
each style vary somewhat by operating system.

You can specify the styles when you create a DateTimeFormatter object. If the
style parameters are not specified, then they are set to DateTimeStyle.LONG by
default. You can change the styles later by using the setDateTimeStyles()
method, as shown in the following example:

    var date:Date = new Date(2009, 2, 27, 13, 1);
    var dtf:DateTimeFormatter = new DateTimeFormatter("en-US",
    DateTimeStyle.LONG, DateTimeStyle.LONG);

    var longDate:String = dtf.format(date);
    trace(longDate); // March 27, 2009 1:01:00 PM

    dtf.setDateTimeStyles(DateTimeStyle.SHORT, DateTimeStyle.SHORT);
    var shortDate:String = dtf.format(date);
    trace(shortDate); // 3/27/09 1:01 PM

## Localizing month names and day names

Many applications use lists of month names and the names of the days of the week
in calendar displays or pull-down lists.

You can retrieve a localized list of the month names using the method
DateTimeFormatter.getMonthNames(). Depending on the operating system, full and
abbreviated forms might be available. Pass the value DateTimeNameStyle.FULL to
get full length month names. Pass the values DateTimeNameStyle.LONG_ABBREVIATION
or DateTimeNameStyle.SHORT_ABBREVIATION to get shorter versions.

In some languages, a month name changes (into its genitive form) when it is
placed next to the day value in a date format. If you plan to use the month
names alone, pass the value DateTimeNameContext.STANDALONE to the
getMonthNames() method. To use the month names in formatted dates, however, pass
the value DateTimeNameContext.FORMAT.

    var dtf:DateTimeFormatter = new DateTimeFormatter("fr-FR");
    var months:Vector.<String> = dtf.getMonthNames(DateTimeNameStyle.FULL,
        DateTimeNameContext.STANDALONE);
    trace(months[0]); // janvier
    months = dtf.getMonthNames(DateTimeNameStyle.SHORT_ABBREVIATION,
         DateTimeNameContext.STANDALONE);
    trace(months[0]); // janv.

The DateTimeFormatter.getWeekdayNames() method provides a localized list of the
names of the days of the week. The getWeekdayNames() method accepts the same
nameStyle and context parameters that the getMonthNames() method does.

    var dtf:DateTimeFormatter = new DateTimeFormatter("fr-FR");
    var weekdays:Vector.<String> = dtf.getWeekdayNames(DateTimeNameStyle.FULL,
           DateTimeNameContext.STANDALONE);
    trace(weekdays[0]); // dimanche
    weekdays = dtf.getWeekdayNames(DateTimeNameStyle.LONG_ABBREVIATION,
           DateTimeNameContext.STANDALONE);
    trace(weekdays[0]); // dim.

In addition, the getFirstWeekday() method returns the index value of the day
that traditionally marks the beginning of the week in the selected locale.
