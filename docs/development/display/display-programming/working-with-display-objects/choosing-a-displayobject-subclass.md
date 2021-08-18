---
title: Choosing a DisplayObject subclass
sidebar_position: 8
---

With several options to choose from, one of the important decisions you’ll make when you’re working with display objects is which display object to use for what purpose. Here are some guidelines to help you decide. These same suggestions apply whether you need an instance of a class or you’re choosing a base class for a class you’re creating:

- If you don’t need an object that can be a container for other display objects (that is, you just need one that serves as a stand-alone screen element), choose one of these DisplayObject or InteractiveObject subclasses, depending on what it will be used for:

  - Bitmap for displaying a bitmap image.
  - TextField for adding text.
  - Video for displaying video.

  - Shape for a “canvas” for drawing content on-screen. In particular, if you want to create an instance for drawing shapes on the screen, and it won’t be a container for other display objects, you’ll gain significant performance benefits using Shape instead of Sprite or MovieClip.

  - MorphShape, StaticText, or SimpleButton for items created by the Flash authoring tool. (You can’t create instances of these classes programmatically, but you can create variables with these data types to refer to items created using the Flash authoring tool.)

- If you need a variable to refer to the main Stage, use the Stage class as its data type.

- If you need a container for loading an external SWF file or image file, use a Loader instance. The loaded content will be added to the display list as a child of the Loader instance. Its data type will depend on the nature of the loaded content, as follows:

  - A loaded image will be a Bitmap instance.
  - A loaded SWF file written in ActionScript 3.0 will be a Sprite or MovieClip instance (or an instance of a subclass of those classes, as specified by the content creator).
  - A loaded SWF file written in ActionScript 1.0 or ActionScript 2.0 will be an AVM1Movie instance.

- If you need an object to serve as a container for other display objects (whether or not you’ll also be drawing onto the display object using ActionScript), choose one of the DisplayObjectContainer subclasses:

  - Sprite if the object will be created using only ActionScript, or as the base class for a custom display object that will be created and manipulated solely with ActionScript.
  - MovieClip if you’re creating a variable to refer to a movie clip symbol created in the Flash authoring tool.

- If you are creating a class that will be associated with a movie clip symbol in the Flash library, choose one of these DisplayObjectContainer subclasses as your class’s base class:

  - MovieClip if the associated movie clip symbol has content on more than one frame
  - Sprite if the associated movie clip symbol has content only on the first frame
