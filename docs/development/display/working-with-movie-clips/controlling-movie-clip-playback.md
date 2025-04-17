# Controlling movie clip playback

Flash uses the metaphor of a timeline to convey animation or a change in state.
Any visual element that employs a timeline must be either a MovieClip object or
extend from the MovieClip class. While ActionScript can direct any movie clip to
stop, play, or go to another point on the timeline, it cannot be used to
dynamically create a timeline or add content at specific frames; this is only
possible using the Flash authoring tool.

When a MovieClip is playing, it progresses along its timeline at a speed
dictated by the frame rate of the SWF file. Alternatively, you can override this
setting by setting the `Stage.frameRate` property in ActionScript.

## Playing movie clips and stopping playback

The `play()` and `stop()` methods allow basic control of a movie clip across its
timeline. For example, suppose you have a movie clip symbol on the Stage which
contains an animation of a bicycle moving across the screen, with its instance
name set to `bicycle`. If the following code is attached to a keyframe on the
main timeline,

```
bicycle.stop();
```

the bicycle will not move (its animation will not play). The bicycle's movement
could start through some other user interaction. For example, if you had a
button named `startButton`, the following code on a keyframe on the main
timeline would make it so that clicking the button causes the animation to play:

```
// This function will be called when the button is clicked. It causes the
// bicycle animation to play.
function playAnimation(event:MouseEvent):void
{
    bicycle.play();
}
// Register the function as a listener with the button.
startButton.addEventListener(MouseEvent.CLICK, playAnimation);
```

## Fast-forwarding and rewinding

The `play()` and `stop()` methods are not the only way of controlling playback
in a movie clip. You can also move the playhead forward or backward along the
timeline manually by using the `nextFrame()` and `prevFrame()` methods. Calling
either of these methods stops playback and moves the playhead one frame forward
or backward, respectively.

Using the `play()` method is analogous to calling `nextFrame()` every time the
movie clip object's `enterFrame` event is triggered. Along these lines, you
could make the `bicycle` movie clip play backwards by creating an event listener
for the `enterFrame` event and telling `bicycle` to go to its previous frame in
the listener function, as follows:

```
// This function is called when the enterFrame event is triggered, meaning
// it's called once per frame.
function everyFrame(event:Event):void
{
    if (bicycle.currentFrame == 1)
    {
        bicycle.gotoAndStop(bicycle.totalFrames);
    }
    else
    {
        bicycle.prevFrame();
    }
}
bicycle.addEventListener(Event.ENTER_FRAME, everyFrame);
```

In normal playback, if a movie clip contains more than a single frame, it will
loop indefinitely when playing; that is, it will return to Frame 1 if it
progresses past its final frame. When you use `prevFrame()` or `nextFrame()`,
this behavior does not happen automatically (calling `prevFrame()` when the
playhead is on Frame 1 doesn't move the playhead to the last frame). The `if`
condition in the example above checks to see if the playhead has progressed
backwards to the first frame, and sets the playhead ahead to its final frame,
effectively creating a continuous loop of the movie clip playing backwards.

## Jumping to a different frame and using frame labels

Sending a movie clip to a new frame is a simple affair. Calling either
`gotoAndPlay()` or `gotoAndStop()` will jump the movie clip to the frame number
specified as a parameter. Alternatively, you can pass a string that matches the
name of a frame label. Any frame on the timeline can be assigned a label. To do
this, select a frame on the timeline and then enter a name in the Frame Label
field on the Property inspector.

The advantages of using frame labels instead of numbers are particularly evident
when creating a complex movie clip. When the number of frames, layers, and
tweens in an animation becomes large, consider labeling important frames with
explanatory descriptions that represent shifts in the behavior of the movie clip
(for example, "off," "walking," or "running"). This improves code readability
and also provides flexibility, since ActionScript calls that go to a labeled
frame are pointers to a single reference—the label—rather than a specific frame
number. If later on you decide to move a particular segment of the animation to
a different frame, you will not need to change your ActionScript code as long as
you keep the same label for the frames in the new location.

To represent frame labels in code, ActionScript 3.0 includes the FrameLabel
class. Each instance of this class represents a single frame label, and has a
`name` property representing the name of the frame label as specified in the
Property inspector, and a `frame` property representing the frame number of the
frame where the label is placed on the timeline.

In order to get access to the FrameLabel instances associated with a movie clip
instance, the MovieClip class includes two properties that directly return
FrameLabel objects. The `currentLabels` property returns an array that consists
of all FrameLabel objects across the entire timeline of a movie clip. The
`currentLabel` property returns a string containing the name of the frame label
encountered most recently along the timeline.

Suppose you were creating a movie clip named `robot` and had labeled the various
states of its animation. You could set up a condition that checks the
`currentLabel` property to access the current state of `robot`, as in the
following code:

```
if (robot.currentLabel == "walking")
{
    // do something
}
```

Flash Player 11.3 and AIR 3.3 added the `frameLabel` event to the FrameLabel
class. You can assign an event handler to the FrameLabel instance that
represents a frame label. The event is dispatched when the playhead enters the
frame.

The following example creates a FrameLabel instance for the second frame label
in the Array of frame labels for the MovieClip. It then registers an event
handler for the `frameLabel` event:

```
var myFrameLabel:FrameLabel = robot.currentLabels[1];
myFrameLabel.addEventListener(Event.FRAME_LABEL, onFrameLabel);

function onFrameLabel(e:Event):void {
    // do something
}
```

## Working with scenes

In the Flash authoring environment, you can use scenes to demarcate a series of
timelines that a SWF file will progress through. Using the second parameter of
the `gotoAndPlay()` or `gotoAndStop()` methods, you can specify a scene to send
the playhead to. All FLA files start with only the initial scene, but you can
create new scenes.

Using scenes is not always the best approach because scenes have a number of
drawbacks. A Flash document that contains multiple scenes can be difficult to
maintain, particularly in multiauthor environments. Multiple scenes can also be
inefficient in bandwidth, because the publishing process merges all scenes into
a single timeline. This causes a progressive download of all scenes, even if
they are never played. For these reasons, use of multiple scenes is often
discouraged except for organizing lengthy multiple timeline-based animations.

The `scenes` property of the MovieClip class returns an array of Scene objects
representing all the scenes in the SWF file. The `currentScene` property returns
a Scene object that represents the scene that is currently playing.

The Scene class has several properties that give information about a scene. The
`labels` property returns an array of FrameLabel objects representing the frame
labels in that scene. The `name` property returns the scene's name as a string.
The `numFrames` property returns an int representing the total number of frames
in the scene.
