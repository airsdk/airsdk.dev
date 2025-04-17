---
sidebar_position: 2
---

# Controlling time intervals

When you develop applications using Adobe Flash CS4 Professional, you have
access to the timeline, which provides a steady, frame-by-frame progression
through your application. In pure ActionScript projects, however, you must rely
on other timing mechanisms.

## Loops versus timers

In some programming languages, you must devise your own timing schemes using
loop statements like `for` or `do..while.`

Loop statements generally execute as fast as the local machine allows, which
means that the application runs faster on some machines and slower on others. If
your application needs a consistent timing interval, you need to tie it to an
actual calendar or clock time. Many applications, such as games, animations, and
real-time controllers, need regular, time-driven ticking mechanisms that are
consistent from machine to machine.

The ActionScript 3.0 Timer class provides a powerful solution. Using the
ActionScript 3.0 event model, the Timer class dispatches timer events whenever a
specified time interval is reached.

## The Timer class

The preferred way to handle timing functions in ActionScript 3.0 is to use the
Timer class (flash.utils.Timer), which can be used to dispatch events whenever
an interval is reached.

To start a timer, you first create an instance of the Timer class, telling it
how often to generate a timer event and how many times to do so before stopping.

For example, the following code creates a Timer instance that dispatches an
event every second and continues for 60 seconds:

```actionscript
var oneMinuteTimer:Timer = new Timer(1000, 60);
```

The Timer object dispatches a TimerEvent object each time the given interval is
reached. A TimerEvent object's event type is `timer` (defined by the constant
`TimerEvent.TIMER`). A TimerEvent object contains the same properties as a
standard Event object.

If the Timer instance is set to a fixed number of intervals, it will also
dispatch a `timerComplete` event (defined by the constant
`TimerEvent.TIMER_COMPLETE`) when it reaches the final interval.

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

When the ShortTimer class is created, it creates a Timer instance that will tick
once per second for five seconds. Then it adds two listeners to the timer: one
that listens to each tick, and one that listens for the `timerComplete` event.

Next, it starts the timer ticking, and from that point forward, the `onTick()`
method executes at one-second intervals.

The `onTick()` method simply displays the current tick count. After five seconds
have passed, the `onTimerComplete()` method executes, telling you that the time
is up.

When you run this sample, you should see the following lines appear in your
console or trace window at the rate of one line per second:

```
tick 1 
tick 2 
tick 3 
tick 4 
tick 5 
Time's Up!
```

## Timing functions in the flash.utils package

ActionScript 3.0 contains a number of timing functions similar to those that
were available in ActionScript 2.0. These functions are provided as
package-level functions in the flash.utils package, and they operate just as
they did in ActionScript 2.0.

| Function                                                          | Description                                                                                                     |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `clearInterval(id:uint):void`                                     | Cancels a specified `setInterval()` call.                                                                       |
| `clearTimeout(id:uint):void`                                      | Cancels a specified `setTimeout()` call.                                                                        |
| `getTimer():int`                                                  | Returns the number of milliseconds that have elapsed since Adobe® Flash® Player or Adobe® AIR™ was initialized. |
| `setInterval(closure:Function, delay:Number, ... arguments):uint` | Runs a function at a specified interval (in milliseconds).                                                      |
| `setTimeout(closure:Function, delay:Number, ... arguments):uint`  | Runs a specified function after a specified delay (in milliseconds).                                            |

These functions remain in ActionScript 3.0 for backward compatibility. Adobe
does not recommend that you use them in new ActionScript 3.0 applications. In
general, it is easier and more efficient to use the Timer class in your
applications.
