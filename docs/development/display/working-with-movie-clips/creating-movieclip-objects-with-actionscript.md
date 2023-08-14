# Creating MovieClip objects with ActionScript

One way of adding content to the screen in Flash is by dragging assets from the
library onto the Stage, but that is not the only workflow. For complex projects,
experienced developers commonly prefer to create movie clips programatically.
This approach brings several advantages: easier re-use of code, faster
compile-time speed, and more sophisticated modifications that are available only
to ActionScript.

The display list API of ActionScript 3.0 streamlines the process of dynamically
creating MovieClip objects. The ability to instantiate a MovieClip instance
directly, separate from the process of adding it to the display list, provides
flexibility and simplicity without sacrificing control.

In ActionScript 3.0, when you create a movie clip (or any other display object)
instance programatically, it is not visible on the screen until it is added to
the display list by calling the `addChild()` or the `addChildAt()` method on a
display object container. This allows you to create a movie clip, set its
properties, and even call methods before it is rendered to the screen. For more
information on working with the display list, see
[Working with display object containers](../display-programming/working-with-display-objects/working-with-display-object-containers.md).
