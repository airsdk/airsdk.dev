---
title: Animating objects
sidebar_position: 7
---

Animation is the process of making something move, or alternatively, of making something change over time. Scripted animation is a fundamental part of video games, and is often used to add polish and useful interaction clues to other applications.

The fundamental idea behind scripted animation is that a change needs to take place, and that change needs to be divided into increments over time. It’s easy to make something repeat in ActionScript, using a common looping statement. However, a loop will run through all its iterations before updating the display. To create scripted animation, you need to write ActionScript that performs some action repeatedly over time and also updates the screen each time it runs.

For example, imagine you want to create a simple animation, such as making a ball travel across the screen. ActionScript includes a simple mechanism that allows you to track the passage of time and update the screen accordingly—meaning you could write code that moves the ball a small amount each time, until it reaches its destination. After each move the screen would update, making the cross-Stage motion visible to the viewer.

From a practical standpoint, it makes sense to synchronize scripted animation with the SWF file’s frame rate (in other words, make one animation change each time a new frame displays or would display), since that defines how frequently Flash Player or AIR updates the screen. Each display object has an enterFrame event that is dispatched according to the frame rate of the SWF file—one event per frame. Most developers who create scripted animation use the enterFrame event as a way to create actions that repeat over time. You could write code that listens to the enterFrame event, moving the animated ball a certain amount each frame, and as the screen is updated (each frame), the ball would be redrawn in its new location, creating motion.

:::note
Another way to perform an action repeatedly over time is to use the Timer class. A Timer instance triggers an event notification each time a specified amount of time has past. You could write code that performs animation by handling the Timer class’s timer event, setting the time interval to a small one (some fraction of a second). For more information about using the Timer class, see [Controlling time intervals](/docs/development/core-actionscript-classes/working-with-dates-and-times#controlling-time-intervals) .
:::

In the following example, a circle Sprite instance, named `circle` , is created on the Stage. When the user clicks the circle, a scripted animation sequence begins, causing `circle` to fade (its `alpha` property is decreased) until it is completely transparent:

```actionscript
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;

// draw a circle and add it to the display list
var circle:Sprite = new Sprite();
circle.graphics.beginFill(0x990000);
circle.graphics.drawCircle(50, 50, 50);
circle.graphics.endFill();
addChild(circle);

// When this animation starts, this function is called every frame.
// The change made by this function (updated to the screen every
// frame) is what causes the animation to occur.
function fadeCircle(event:Event):void
{
    circle.alpha -= .05;

    if (circle.alpha <= 0)
    {
        circle.removeEventListener(Event.ENTER_FRAME, fadeCircle);
    }

}

function startAnimation(event:MouseEvent):void
{
    circle.addEventListener(Event.ENTER_FRAME, fadeCircle);
}

circle.addEventListener(MouseEvent.CLICK, startAnimation);
```

When the user clicks the circle, the function `fadeCircle()` is subscribed as a listener of the `enterFrame` event, meaning it begins to be called once per frame. That function fades circle by changing its `alpha` property, so once per frame the circle’s alpha decreases by .05 (5 percent) and the screen is updated. Eventually, when the alpha value is 0 ( circle is completely transparent), the `fadeCircle()` function is removed as an event listener, ending the animation.

The same code could be used, for example, to create animated motion instead of fading. By substituting a different property for `alpha` in the function that is an `enterFrame` event listener, that property will be animated instead. For example, changing this line

```actionscript
    circle.alpha -= .05;
```

to this code

```actionscript
    circle.x += 5;
```

will animate the x property, causing the circle to move to the right across the Stage. The condition that ends the animation could be changed to end the animation (that is, unsubscribe the enterFrame listener) when the desired x coordinate is reached.
