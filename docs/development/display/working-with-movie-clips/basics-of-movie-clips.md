# Basics of movie clips

Movie clips are a key element for people who create animated content with the
Flash authoring tool and want to control that content with ActionScript.
Whenever you create a movie clip symbol in Flash, Flash adds the symbol to the
library of that Flash document. By default, this symbol becomes an instance of
the
[MovieClip class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/MovieClip.html),
and as such has the properties and methods of the MovieClip class.

When an instance of a movie clip symbol is placed on the Stage, the movie clip
automatically progresses through its timeline (if it has more than one frame)
unless its playback is altered using ActionScript. It is this timeline that
distinguishes the MovieClip class, allowing you to create animation through
motion or shape tweens through the Flash authoring tool. By contrast, with a
display object that is an instance of the Sprite class, you can create animation
only by programmatically changing the object's values.

In previous versions of ActionScript, the MovieClip class was the base class of
all instances on the Stage. In ActionScript 3.0, a movie clip is only one of
many display objects that can appear on the screen. If a timeline is not
necessary for the function of a display object, using the Shape class or Sprite
class in lieu of the MovieClip class may improve rendering performance. For more
information on choosing the appropriate display object for a task, see
[Choosing a DisplayObject subclass](../display-programming/working-with-display-objects/choosing-a-displayobject-subclass.md).

#### Important concepts and terms

The following reference list contains important terms related to movie clips:

AVM1 SWF  
A SWF file created using ActionScript 1.0 or ActionScript 2.0, usually targeting
Flash Player 8 or earlier.

AVM2 SWF  
A SWF file created using ActionScript 3.0 for Adobe Flash Player 9 or later or
Adobe AIR.

External SWF  
A SWF file that is created separately from the project SWF file and is intended
to be loaded into the project SWF file and played back within that SWF file.

Frame  
The smallest division of time on the timeline. As with a motion picture
filmstrip, each frame is like a snapshot of the animation in time, and when
frames are played quickly in sequence, the effect of animation is created.

Timeline  
The metaphorical representation of the series of frames that make up a movie
clip's animation sequence. The timeline of a MovieClip object is equivalent to
the timeline in the Flash authoring tool.

Playhead  
A marker identifying the location (frame) in the timeline that is being
displayed at a given moment.
