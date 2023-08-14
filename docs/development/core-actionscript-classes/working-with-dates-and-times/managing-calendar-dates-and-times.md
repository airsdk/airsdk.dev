---
sidebar_position: 1
---

# Managing calendar dates and times

All of the calendar date and time management functions in ActionScript 3.0 are
concentrated in the top-level Date class. The Date class contains methods and
properties that let you handle dates and times in either Coordinated Universal
Time (UTC) or in local time specific to a time zone. UTC is a standard time
definition that is essentially the same as Greenwich Mean Time (GMT).

## Creating Date objects

The Date class boasts one of the most versatile constructor methods of all the
core classes. You can invoke it four different ways.

First, if given no parameters, theDate()` constructor returns a Date object
containing the current date and time, in local time based on your time zone.
Here's an example:

```actionscript
var now:Date = new Date();
```

Second, if given a single numeric parameter, the `Date()` constructor treats
that as the number of milliseconds since January 1, 1970, and returns a
corresponding Date object. Note that the millisecond value you pass in is
treated as milliseconds since January 1, 1970, in UTC. However, the Date object
shows values in your local time zone, unless you use the UTC-specific methods to
retrieve and display them. If you create a new Date object using a single
milliseconds parameter, make sure you account for the time zone difference
between your local time and UTC. The following statements create a Date object
set to midnight on the day of January 1, 1970, in UTC:

```actionscript
var millisecondsPerDay:int = 1000 * 60 * 60 * 24; 
// gets a Date one day after the start date of 1/1/1970 
var startTime:Date = new Date(millisecondsPerDay);
```

Third, you can pass multiple numeric parameters to the `Date()` constructor. It
treats those parameters as the year, month, day, hour, minute, second, and
millisecond, respectively, and returns a corresponding Date object. Those input
parameters are assumed to be in local time rather than UTC. The following
statements get a Date object set to midnight at the start of January 1, 2000, in
local time:

```actionscript
var millenium:Date = new Date(2000, 0, 1, 0, 0, 0, 0);
```

Fourth, you can pass a single string parameter to the `Date()` constructor. It
will try to parse that string into date or time components and then return a
corresponding Date object. If you use this approach, it's a good idea to enclose
the `Date()` constructor in a `try..catch` block to trap any parsing errors. The
`Date()` constructor accepts a number of different string formats (which are
listed in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html)).
The following statement initializes a new Date object using a string value:

```actionscript
var nextDay:Date = new Date("Mon May 1 2006 11:30:00 AM");
```

If the `Date()` constructor cannot successfully parse the string parameter, it
will not raise an exception. However, the resulting Date object will contain an
invalid date value.

## Getting time unit values

You can extract the values for various units of time within a Date object using
properties or methods of the Date class. Each of the following properties gives
you the value of a time unit in the Date object:

- The `fullYear` property

- The `month` property, which is in a numeric format with 0 for January up to 11
  for December

- The `date` property, which is the calendar number of the day of the month, in
  the range of 1 to 31

- The `day` property, which is the day of the week in numeric format, with 0
  standing for Sunday

- The `hours` property, in the range of 0 to 23

- The `minutes` property

- The `seconds` property

- The `milliseconds` property

  In fact, the Date class gives you a number of ways to get each of these
  values. For example, you can get the month value of a Date object in four
  different ways:

- The `month` property

- The `getMonth()` method

- The `monthUTC` property

- The `getMonthUTC()` method

  All four ways are essentially equivalent in terms of efficiency, so you can
  use whichever approach suits your application best.

  The properties just listed all represent components of the total date value.
  For example, the milliseconds property will never be greater than 999, since
  when it reaches 1000 the seconds value increases by 1 and the milliseconds
  property resets to 0.

  If you want to get the value of the Date object in terms of milliseconds since
  January 1, 1970 (UTC), you can use the `getTime()` method. Its counterpart,
  the `setTime()` method, lets you change the value of an existing Date object
  using milliseconds since January 1, 1970 (UTC).

## Performing date and time arithmetic

You can perform addition and subtraction on dates and times with the Date class.
Date values are kept internally in terms of milliseconds, so you should convert
other values to milliseconds before adding them to or subtracting them from Date
objects.

If your application will perform a lot of date and time arithmetic, you might
find it useful to create constants that hold common time unit values in terms of
milliseconds, like the following:

```actionscript
public static const millisecondsPerMinute:int = 1000 * 60; 
public static const millisecondsPerHour:int = 1000 * 60 * 60; 
public static const millisecondsPerDay:int = 1000 * 60 * 60 * 24;
```

Now it is easy to perform date arithmetic using standard time units. The
following code sets a date value to one hour from the current time using the
`getTime()` and `setTime()` methods:

```actionscript
var oneHourFromNow:Date = new Date(); 
oneHourFromNow.setTime(oneHourFromNow.getTime() + millisecondsPerHour);
```

Another way to set a date value is to create a new Date object using a single
milliseconds parameter. For example, the following code adds 30 days to one date
to calculate another:

```actionscript
// sets the invoice date to today's date 
var invoiceDate:Date = new Date(); 
 
// adds 30 days to get the due date 
var dueDate:Date = new Date(invoiceDate.getTime() + (30 * millisecondsPerDay));
```

Next, the `millisecondsPerDay` constant is multiplied by 30 to represent 30
days' time and the result is added to the `invoiceDate` value and used to set
the `dueDate` value.

## Converting between time zones

Date and time arithmetic comes in handy when you want to convert dates from one
time zone to another. So does the `getTimezoneOffset()` method, which returns
the value in minutes by which the Date object's time zone differs from UTC. It
returns a value in minutes because not all time zones are set to even-hour
increments—some have half-hour offsets from neighboring zones.

The following example uses the time zone offset to convert a date from local
time to UTC. It does the conversion by first calculating the time zone value in
milliseconds and then adjusting the Date value by that amount:

```actionscript
// creates a Date in local time 
var nextDay:Date = new Date("Mon May 1 2006 11:30:00 AM"); 
 
// converts the Date to UTC by adding or subtracting the time zone offset 
var offsetMilliseconds:Number = nextDay.getTimezoneOffset() * 60 * 1000; 
nextDay.setTime(nextDay.getTime() + offsetMilliseconds);
```

## Adobe recommends

> ### [![](../../img/jabbyPanda.png) 2 - 1 = 2 in math operations with dates in ActionScript](https://web.archive.org/web/20160404212319/http://www.jabbypanda.com/blog/2011/09/when-2-1-when-doing-math-operations-with-dates-in-actionscript/)
>
> [JabbyPanda](https://web.archive.org/web/20210301181454/http://jabbypanda.com/blog/)
