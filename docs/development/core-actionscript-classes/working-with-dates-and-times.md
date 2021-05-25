---
title: Working with dates and times
sidebar_position: 1
---

Timing might not be everything, but it's usually a key factor in software applications. ActionScript 3.0 provides powerful ways to manage calendar dates, times, and time intervals. Two main classes provide most of this timing functionality: the Date class and the new Timer class in the flash.utils package.

Dates and times are a common type of information used in ActionScript programs. For instance, you might need to know the current day of the week or to measure how much time a user spends on a particular screen, among many other possibilities. In ActionScript, you can use the Date class to represent a single moment in time, including date and time information. Within a Date instance are values for the individual date and time units, including year, month, date, day of the week, hour, minutes, seconds, milliseconds, and time zone. For more advanced uses, ActionScript also includes the Timer class, which you can use to perform actions after a certain delay or at repeated intervals.


## Managing calendar dates and times

All of the calendar date and time management functions in ActionScript 3.0 are concentrated in the top-level Date class. The Date class contains methods and properties that let you handle dates and times in either Coordinated Universal Time (UTC) or in local time specific to a time zone. UTC is a standard time definition that is essentially the same as Greenwich Mean Time (GMT).

### Creating Date objects

The Date class boasts one of the most versatile constructor methods of all the core classes. You can invoke it four different ways.

First, if given no parameters, the Date() constructor returns a Date object containing the current date and time, in local time based on your time zone. Here’s an example:

```actionscript
var now:Date = new Date();
```

Second, if given a single numeric parameter, the Date() constructor treats that as the number of milliseconds since January 1, 1970, and returns a corresponding Date object. Note that the millisecond value you pass in is treated as milliseconds since January 1, 1970, in UTC. However, the Date object shows values in your local time zone, unless you use the UTC-specific methods to retrieve and display them. If you create a new Date object using a single milliseconds parameter, make sure you account for the time zone difference between your local time and UTC. The following statements create a Date object set to midnight on the day of January 1, 1970, in UTC:

```actionscript
var millisecondsPerDay:int = 1000 * 60 * 60 * 24; 
// gets a Date one day after the start date of 1/1/1970 
var startTime:Date = new Date(millisecondsPerDay);
```

Third, you can pass multiple numeric parameters to the Date() constructor. It treats those parameters as the year, month, day, hour, minute, second, and millisecond, respectively, and returns a corresponding Date object. Those input parameters are assumed to be in local time rather than UTC. The following statements get a Date object set to midnight at the start of January 1, 2000, in local time:

```actionscript
var millenium:Date = new Date(2000, 0, 1, 0, 0, 0, 0);
```

Fourth, you can pass a single string parameter to the Date() constructor. It will try to parse that string into date or time components and then return a corresponding Date object. If you use this approach, it’s a good idea to enclose the Date() constructor in a try..catch block to trap any parsing errors. The Date() constructor accepts a number of different string formats (which are listed in the ActionScript 3.0 Reference for the Adobe Flash Platform ). The following statement initializes a new Date object using a string value:

```actionscript
var nextDay:Date = new Date("Mon May 1 2006 11:30:00 AM");
```

If the `Date()` constructor cannot successfully parse the string parameter, it will not raise an exception. However, the resulting Date object will contain an invalid date value.


### Getting time unit values

You can extract the values for various units of time within a Date object using properties or methods of the Date class. Each of the following properties gives you the value of a time unit in the Date object:

- The `fullYear` property
- The `month` property, which is in a numeric format with 0 for January up to 11 for December
- The `date` property, which is the calendar number of the day of the month, in the range of 1 to 31
- The `day` property, which is the day of the week in numeric format, with 0 standing for Sunday
- The `hours` property, in the range of 0 to 23
- The `minutes` property
- The `seconds` property
- The `milliseconds` property

In fact, the Date class gives you a number of ways to get each of these values. For example, you can get the month value of a Date object in four different ways:

- The `month` property
- The `getMonth()` method
- The `monthUTC` property
- The `getMonthUTC()` method

All four ways are essentially equivalent in terms of efficiency, so you can use whichever approach suits your application best.

The properties just listed all represent components of the total date value. For example, the milliseconds property will never be greater than 999, since when it reaches 1000 the seconds value increases by 1 and the milliseconds property resets to 0.

If you want to get the value of the Date object in terms of milliseconds since January 1, 1970 (UTC), you can use the `getTime()` method. Its counterpart, the `setTime()` method, lets you change the value of an existing Date object using milliseconds since January 1, 1970 (UTC).


### Performing date and time arithmetic

You can perform addition and subtraction on dates and times with the Date class. Date values are kept internally in terms of milliseconds, so you should convert other values to milliseconds before adding them to or subtracting them from Date objects.

If your application will perform a lot of date and time arithmetic, you might find it useful to create constants that hold common time unit values in terms of milliseconds, like the following:

```actionscript
public static const millisecondsPerMinute:int = 1000 * 60; 
public static const millisecondsPerHour:int = 1000 * 60 * 60; 
public static const millisecondsPerDay:int = 1000 * 60 * 60 * 24;
```

Now it is easy to perform date arithmetic using standard time units. The following code sets a date value to one hour from the current time using the `getTime()` and `setTime()` methods:

```actionscript
var oneHourFromNow:Date = new Date(); 
oneHourFromNow.setTime(oneHourFromNow.getTime() + millisecondsPerHour);
```

Another way to set a date value is to create a new Date object using a single milliseconds parameter. For example, the following code adds 30 days to one date to calculate another:

```actionscript
// sets the invoice date to today's date 
var invoiceDate:Date = new Date(); 
 
// adds 30 days to get the due date 
var dueDate:Date = new Date(invoiceDate.getTime() + (30 * millisecondsPerDay));
```

Next, the `millisecondsPerDay` constant is multiplied by 30 to represent 30 days’ time and the result is added to the `invoiceDate` value and used to set the dueDate value.


### Converting between time zones

Date and time arithmetic comes in handy when you want to convert dates from one time zone to another. So does the getTimezoneOffset() method, which returns the value in minutes by which the Date object’s time zone differs from UTC. It returns a value in minutes because not all time zones are set to even-hour increments—some have half-hour offsets from neighboring zones.

The following example uses the time zone offset to convert a date from local time to UTC. It does the conversion by first calculating the time zone value in milliseconds and then adjusting the Date value by that amount:

```actionscript
// creates a Date in local time 
var nextDay:Date = new Date("Mon May 1 2006 11:30:00 AM"); 
 
// converts the Date to UTC by adding or subtracting the time zone offset 
var offsetMilliseconds:Number = nextDay.getTimezoneOffset() * 60 * 1000; 
nextDay.setTime(nextDay.getTime() + offsetMilliseconds);
```




## Controlling time intervals

When you develop applications using Adobe Flash CS4 Professional, you have access to the timeline, which provides a steady, frame-by-frame progression through your application. In pure ActionScript projects, however, you must rely on other timing mechanisms.

### Loops versus timers

In some programming languages, you must devise your own timing schemes using loop statements like for or do..while.

Loop statements generally execute as fast as the local machine allows, which means that the application runs faster on some machines and slower on others. If your application needs a consistent timing interval, you need to tie it to an actual calendar or clock time. Many applications, such as games, animations, and real-time controllers, need regular, time-driven ticking mechanisms that are consistent from machine to machine.

The ActionScript 3.0 Timer class provides a powerful solution. Using the ActionScript 3.0 event model, the Timer class dispatches timer events whenever a specified time interval is reached.


### The Timer class

The preferred way to handle timing functions in ActionScript 3.0 is to use the Timer class (flash.utils.Timer), which can be used to dispatch events whenever an interval is reached.

To start a timer, you first create an instance of the Timer class, telling it how often to generate a timer event and how many times to do so before stopping.

For example, the following code creates a Timer instance that dispatches an event every second and continues for 60 seconds:

```actionscript
var oneMinuteTimer:Timer = new Timer(1000, 60);
```

The Timer object dispatches a TimerEvent object each time the given interval is reached. A TimerEvent object’s event type is timer (defined by the constant TimerEvent.TIMER ). A TimerEvent object contains the same properties as a standard Event object.

If the Timer instance is set to a fixed number of intervals, it will also dispatch a timerComplete event (defined by the constant TimerEvent.TIMER_COMPLETE ) when it reaches the final interval.

Here is a small sample application showing the Timer class in action:

```actionscript
package  
{ 
    import flash.display.Sprite; 
    import flash.events.TimerEvent; 
    import flash.utils.Timer; 
 
    public class ShortTimer extends Sprite 
    { 
        public function ShortTimer()  
        { 
            // creates a new five-second Timer 
            var minuteTimer:Timer = new Timer(1000, 5); 
             
            // designates listeners for the interval and completion events 
            minuteTimer.addEventListener(TimerEvent.TIMER, onTick); 
            minuteTimer.addEventListener(TimerEvent.TIMER_COMPLETE, onTimerComplete); 
             
            // starts the timer ticking 
            minuteTimer.start(); 
        } 
 
        public function onTick(event:TimerEvent):void  
        { 
            // displays the tick count so far 
            // The target of this event is the Timer instance itself. 
            trace("tick " + event.target.currentCount); 
        } 
 
        public function onTimerComplete(event:TimerEvent):void 
        { 
            trace("Time's Up!"); 
        } 
    } 
}
```

When the ShortTimer class is created, it creates a Timer instance that will tick once per second for five seconds. Then it adds two listeners to the timer: one that listens to each tick, and one that listens for the timerComplete event.

Next, it starts the timer ticking, and from that point forward, the onTick() method executes at one-second intervals.

The onTick() method simply displays the current tick count. After five seconds have passed, the onTimerComplete() method executes, telling you that the time is up.

When you run this sample, you should see the following lines appear in your console or trace window at the rate of one line per second:

```
tick 1 
tick 2 
tick 3 
tick 4 
tick 5 
Time's Up!
```

### Timing functions in the flash.utils package

ActionScript 3.0 contains a number of timing functions similar to those that were available in ActionScript 2.0. These functions are provided as package-level functions in the flash.utils package, and they operate just as they did in ActionScript 2.0.

| Function | Description |
| --- | --- |
| `clearInterval(id:uint):void` | Cancels a specified setInterval() call. |
| `clearTimeout(id:uint):void` | Cancels a specified setTimeout() call. |
| `getTimer():int` | Returns the number of milliseconds that have elapsed since Adobe® Flash® Player or Adobe® AIR™ was initialized. |
| `setInterval(closure:Function, delay:Number, ... arguments):uint` | Runs a function at a specified interval (in milliseconds). |
| `setTimeout(closure:Function, delay:Number, ... arguments):uint` | Runs a specified function after a specified delay (in milliseconds). |


These functions remain in ActionScript 3.0 for backward compatibility. Adobe does not recommend that you use them in new ActionScript 3.0 applications. In general, it is easier and more efficient to use the Timer class in your applications.





## Date and time example: Simple analog clock


A simple analog clock example illustrates these two date and time concepts:

- Getting the current date and time and extracting values for the hours, minutes, and seconds
- Using a Timer to set the pace of an application

To get the application files for this sample, see www.adobe.com/go/learn_programmingAS3samples_flash . The SimpleClock application files can be found in the folder Samples/SimpleClock. The application consists of the following files:

:::danger
TODO this example needs to be recreated or update
:::

| File | Description |
| --- | --- |
| `SimpleClockApp.mxml` or `SimpleClockApp.fla` | The main application file in Flash (FLA) or Flex (MXML). |
| `com/example/programmingas3/simpleclock/SimpleClock.as` | The main application file. |
| `com/example/programmingas3/simpleclock/AnalogClockFace.as` | Draws a round clock face and hour, minute, and seconds hands based on the time. |

### Defining the SimpleClock class

The clock example is simple, but it’s a good idea to organize even simple applications well so you could easily expand them in the future. To that end, the SimpleClock application uses the SimpleClock class to handle the startup and time-keeping tasks, and then uses another class named AnalogClockFace to actually display the time.

Here is the code that defines and initializes the SimpleClock class (note that in the Flash version, SimpleClock extends the Sprite class instead):

```actionscript
public class SimpleClock extends UIComponent 
{ 
    /** 
     * The time display component. 
     */ 
    private var face:AnalogClockFace; 
     
    /** 
     * The Timer that acts like a heartbeat for the application. 
     */ 
    private var ticker:Timer;
```

The class has two important properties:

- The `face` property, which is an instance of the AnalogClockFace class
- The `ticker` property, which is an instance of the Timer class

The SimpleClock class uses a default constructor. The initClock() method takes care of the real setup work, creating the clock face and starting the Timer instance ticking.

### Creating the clock face

The next lines in the SimpleClock code create the clock face that is used to display the time:

```actionscript
    /** 
     * Sets up a SimpleClock instance. 
     */ 
    public function initClock(faceSize:Number = 200)  
    { 
        // creates the clock face and adds it to the display list 
        face = new AnalogClockFace(Math.max(20, faceSize)); 
        face.init(); 
        addChild(face); 
         
        // draws the initial clock display 
        face.draw();
```

The size of the face can be passed in to the `initClock()` method. If no faceSize value is passed, a default size of 200 pixels is used.

Next, the application initializes the face and then adds it to the display list using the addChild() method inherited from the DisplayObjectContainer class. Then it calls the AnalogClockFace.draw() method to display the clock face once, showing the current time.

### Starting the timer

After creating the clock face, the initClock() method sets up a timer:

```actionscript
        // creates a Timer that fires an event once per second 
        ticker = new Timer(1000);  
     
        // designates the onTick() method to handle Timer events 
        ticker.addEventListener(TimerEvent.TIMER, onTick); 
 
        // starts the clock ticking 
        ticker.start();
```

First this method instantiates a Timer instance that will dispatch an event once per second (every 1000 milliseconds). Since no second repeatCount parameter is passed to the Timer() constructor, the Timer will keep repeating indefinitely.

The SimpleClock.onTick() method will execute once per second when the timer event is received:

```actionscript
    public function onTick(event:TimerEvent):void  
    { 
        // updates the clock display 
        face.draw(); 
    }
```

The AnalogClockFace.draw() method simply draws the clock face and hands.

### Displaying the current time

Most of the code in the AnalogClockFace class involves setting up the clock face’s display elements. When the AnalogClockFace is initialized, it draws a circular outline, places a numeric text label at each hour mark, and then creates three Shape objects, one each for the hour hand, the minute hand, and the second hand on the clock.

Once the SimpleClock application is running, it calls the AnalogClockFace.draw() method each second, as follows:

```actionscript
    /** 
     * Called by the parent container when the display is being drawn. 
     */ 
    public override function draw():void 
    { 
        // stores the current date and time in an instance variable 
        currentTime = new Date(); 
        showTime(currentTime); 
    }
```

This method saves the current time in a variable, so the time can’t change in the middle of drawing the clock hands. Then it calls the showTime() method to display the hands, as the following shows:

```actionscript
    /** 
     * Displays the given Date/Time in that good old analog clock style. 
     */ 
    public function showTime(time:Date):void  
    { 
        // gets the time values 
        var seconds:uint = time.getSeconds(); 
        var minutes:uint = time.getMinutes(); 
        var hours:uint = time.getHours(); 
 
        // multiplies by 6 to get degrees 
        this.secondHand.rotation = 180 + (seconds * 6); 
        this.minuteHand.rotation = 180 + (minutes * 6); 
 
        // Multiply by 30 to get basic degrees, then 
        // add up to 29.5 degrees (59 * 0.5) 
        // to account for the minutes. 
        this.hourHand.rotation = 180 + (hours * 30) + (minutes * 0.5); 
    }
```

First, this method extracts the values for the hours, minutes, and seconds of the current time. Then it uses these values to calculate the angle for each hand. Since the second hand makes a full rotation in 60 seconds, it rotates 6 degrees each second (360/60). The minute hand rotates the same amount each minute.

The hour hand updates every minute, too, so it can show some progress as the minutes tick by. It rotates 30 degrees each hour (360/12), but it also rotates half a degree each minute (30 degrees divided by 60 minutes).

