---
sidebar_position: 6
---

# Event handling example: Alarm Clock

The Alarm Clock example consists of a clock that allows the user to specify a
time at which an alarm will go off, as well as a message to be displayed at that
time. The Alarm Clock example builds on the SimpleClock application from
[Working with dates and times](../working-with-dates-and-times/index.md) Alarm
Clock illustrates several aspects of working with events in ActionScript 3.0,
including:

- Listening and responding to an event

- Notifying listeners of an event

- Creating a custom event type

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The Alarm Clock application files can be found in the Samples/AlarmClock folder.
The application includes these files:

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
        <p>AlarmClockApp.mxml</p>
        <p>or</p>
        <p>AlarmClockApp.fla</p>
      </td>
      <td><p>The main application file in Flash (FLA) or Flex (MXML).</p></td>
    </tr>
    <tr>
      <td><p>com/example/programmingas3/clock/AlarmClock.as</p></td>
      <td>
        <p>
          A class which extends the SimpleClock class, adding alarm clock
          functionality.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>com/example/programmingas3/clock/AlarmEvent.as</p></td>
      <td>
        <p>
          A custom event class (a subclass of flash.events.Event) which serves
          as the event object for the AlarmClock class's
          <samp>alarm</samp> event.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>com/example/programmingas3/clock/AnalogClockFace.as</p></td>
      <td>
        <p>
          Draws a round clock face and hour, minute, and seconds hands based on
          the time (described in the SimpleClock example).
        </p>
      </td>
    </tr>
    <tr>
      <td><p>com/example/programmingas3/clock/SimpleClock.as</p></td>
      <td>
        <p>
          A clock interface component with simple timekeeping functionality
          (described in the SimpleClock example).
        </p>
      </td>
    </tr>
  </tbody>
</table>


## Alarm Clock overview

The primary functionality of the clock in this example, including tracking the
time and displaying the clock face, reuses the SimpleClock application code,
which is described in
[Date and time example: Simple analog clock](../working-with-dates-and-times/date-and-time-example-simple-analog-clock.md).
The AlarmClock class extends the SimpleClock class from that example by adding
the functionality required for an alarm clock, including setting the alarm time
and providing notification when the alarm "goes off."

Providing notification when something happens is the job that events are made
for. The AlarmClock class exposes the Alarm event, which other objects can
listen for in order to perform desired actions. In addition, the AlarmClock
class uses an instance of the Timer class to determine when to trigger its
alarm. Like the AlarmClock class, the Timer class provides an event to notify
other objects (an AlarmClock instance, in this case) when a certain amount of
time has passed. As with most ActionScript applications, events form an
important part of the functionality of the Alarm Clock sample application.

## Triggering the alarm

As mentioned previously, the only functionality that the AlarmClock class
actually provides relates to setting and triggering the alarm. The built-in
Timer class (flash.utils.Timer) provides a way for a developer to define code
that will be executed after a specified amount of time. The AlarmClock class
uses a Timer instance to determine when to set off the alarm.

```
import flash.events.TimerEvent;
import flash.utils.Timer;

/**
    * The Timer that will be used for the alarm.
    */
public var alarmTimer:Timer;
...
/**
    * Instantiates a new AlarmClock of a given size.
    */
public override function initClock(faceSize:Number = 200):void
{
    super.initClock(faceSize);
    alarmTimer = new Timer(0, 1);
    alarmTimer.addEventListener(TimerEvent.TIMER, onAlarm);
}
```

The Timer instance defined in the AlarmClock class is named `alarmTimer`. The
`initClock()` method, which performs necessary setup operations for the
AlarmClock instance, does two things with the `alarmTimer` variable. First, the
variable is instantiated with parameters instructing the Timer instance to wait
0 milliseconds and only trigger its timer event one time. After instantiating
`alarmTimer`, the code calls that variable's `addEventListener()` method to
indicate that it wants to listen to that variable's `timer` event. A Timer
instance works by dispatching its `timer` event after a specified amount of time
has passed. The AlarmClock class will need to know when the `timer` event is
dispatched in order to set off its own alarm. By calling `addEventListener()`,
the AlarmClock code registers itself as a listener with `alarmTimer`. The two
parameters indicate that the AlarmClock class wants to listen for the `timer`
event (indicated by the constant `TimerEvent.TIMER`), and that when the event
happens, the AlarmClock class's `onAlarm()` method should be called in response
to the event.

In order to actually set the alarm, the AlarmClock class's `setAlarm()` method
is called, as follows:

```
/**
 * Sets the time at which the alarm should go off.
 * @param hour The hour portion of the alarm time.
 * @param minutes The minutes portion of the alarm time.
 * @param message The message to display when the alarm goes off.
 * @return The time at which the alarm will go off.
 */
public function setAlarm(hour:Number = 0, minutes:Number = 0, message:String = "Alarm!"):Date
{
    this.alarmMessage = message;
    var now:Date = new Date();
    // Create this time on today's date.
    alarmTime = new Date(now.fullYear, now.month, now.date, hour, minutes);

    // Determine if the specified time has already passed today.
    if (alarmTime <= now)
    {
        alarmTime.setTime(alarmTime.time + MILLISECONDS_PER_DAY);
    }

    // Stop the alarm timer if it's currently set.
    alarmTimer.reset();
    // Calculate how many milliseconds should pass before the alarm should
    // go off (the difference between the alarm time and now) and set that
    // value as the delay for the alarm timer.
    alarmTimer.delay = Math.max(1000, alarmTime.time - now.time);
    alarmTimer.start();

    return alarmTime;
}
```

This method does several things, including storing the alarm message and
creating a Date object (`alarmTime`) representing the actual moment in time when
the alarm is to go off. Of most relevance to the current discussion, in the
final several lines of the method, the `alarmTimer` variable's timer is set and
activated. First, its `reset()` method is called, stopping the timer and
resetting it in case it is already running. Next, the current time (represented
by the `now` variable) is subtracted from the `alarmTime` variable's value to
determine how many milliseconds need to pass before the alarm goes off. The
Timer class doesn't trigger its `timer` event at an absolute time, so it is this
relative time difference that is assigned to the `delay` property of
`alarmTimer`. Finally, the `start()` method is called to actually start the
timer.

Once the specified amount of time has passed, `alarmTimer` dispatches the
`timer` event. Because the AlarmClock class registered its `onAlarm()` method as
a listener for that event, when the `timer` event happens, `onAlarm()` is
called.

```
/**
 * Called when the timer event is dispatched.
 */
public function onAlarm(event:TimerEvent):void
{
    trace("Alarm!");
    var alarm:AlarmEvent = new AlarmEvent(this.alarmMessage);
    this.dispatchEvent(alarm);
}
```

A method that is registered as an event listener must be defined with the
appropriate signature (that is, the set of parameters and return type of the
method). To be a listener for the Timer class's `timer` event, a method must
define one parameter whose data type is TimerEvent (flash.events.TimerEvent), a
subclass of the Event class. When the Timer instance calls its event listeners,
it passes a TimerEvent instance as the event object.

## Notifying others of the alarm

Like the Timer class, the AlarmClock class provides an event that allows other
code to receive notifications when the alarm goes off. For a class to use the
event-handling framework built into ActionScript, that class must implement the
flash.events.IEventDispatcher interface. Most commonly, this is done by
extending the flash.events.EventDispatcher class, which provides a standard
implementation of IEventDispatcher (or by extending one of EventDispatcher's
subclasses). As described previously, the AlarmClock class extends the
SimpleClock class, which (through a chain of inheritance) extends the
EventDispatcher class. All of this means that the AlarmClock class already has
built-in functionality to provide its own events.

Other code can register to be notified of the AlarmClock class's `alarm` event
by calling the `addEventListener()` method that AlarmClock inherits from
EventDispatcher. When an AlarmClock instance is ready to notify other code that
its `alarm` event has been raised, it does so by calling the `dispatchEvent()`
method, which is also inherited from EventDispatcher.

```
var alarm:AlarmEvent = new AlarmEvent(this.alarmMessage);
this.dispatchEvent(alarm);
```

These lines of code are taken from the AlarmClock class's `onAlarm()` method
(shown in its entirety previously). The AlarmClock instance's `dispatchEvent()`
method is called, which in turn notifies all the registered listeners that the
AlarmClock instance's `alarm` event has been triggered. The parameter that is
passed to `dispatchEvent()` is the event object that will be passed along to the
listener methods. In this case, it is an instance of the AlarmEvent class, an
Event subclass created specifically for this example.

## Providing a custom alarm event

All event listeners receive an event object parameter with information about the
particular event being triggered. In many cases, the event object is an instance
of the Event class. However, in some cases it is useful to provide additional
information to event listeners. A common way to accomplish this is to define a
new class, a subclass of the Event class, and use an instance of that class as
the event object. In this example, an AlarmEvent instance is used as the event
object when the AlarmClock class's `alarm` event is dispatched. The AlarmEvent
class, shown here, provides additional information about the `alarm` event,
specifically the alarm message:

```
import flash.events.Event;

/**
 * This custom Event class adds a message property to a basic Event.
 */
public class AlarmEvent extends Event
{
    /**
     * The name of the new AlarmEvent type.
     */
    public static const ALARM:String = "alarm";

    /**
     * A text message that can be passed to an event handler
     * with this event object.
     */
    public var message:String;

    /**
     * Constructor.
     * @param message The text to display when the alarm goes off.
     */
    public function AlarmEvent(message:String = "ALARM!")
    {
        super(ALARM);
        this.message = message;
    }
    ...
}
```

The best way to create a custom event object class is to define a class that
extends the Event class, as shown in the preceding example. To supplement the
inherited functionality, the AlarmEvent class defines a property `message` that
contains the text of the alarm message associated with the event; the `message`
value is passed in as a parameter in the AlarmEvent constructor. The AlarmEvent
class also defines the constant `ALARM`, which can be used to refer to the
specific event (`alarm`) when calling the AlarmClock class's
`addEventListener()` method.

In addition to adding custom functionality, every Event subclass must override
the inherited `clone()` method as part of the ActionScript event-handling
framework. Event subclasses can also optionally override the inherited
`toString()` method to include the custom event's properties in the value
returned when the `toString()` method is called.

```
/**
 * Creates and returns a copy of the current instance.
 * @return A copy of the current instance.
 */
public override function clone():Event
{
    return new AlarmEvent(message);
}

/**
 * Returns a String containing all the properties of the current
 * instance.
 * @return A string representation of the current instance.
 */
public override function toString():String
{
    return formatToString("AlarmEvent", "type", "bubbles", "cancelable", "eventPhase", "message");
}
```

The overridden `clone()` method needs to return a new instance of the custom
Event subclass, with all the custom properties set to match the current
instance. In the overridden `toString()` method, the utility method
`formatToString()` (inherited from Event) is used to provide a string with the
name of the custom type, as well as the names and values of all its properties.
