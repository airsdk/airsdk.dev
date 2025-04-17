# The Bitmap and BitmapData classes

The main ActionScript 3.0 classes for working with bitmap images are the Bitmap
class, which is used to display bitmap images on the screen, and the BitmapData
class, which is used to access and manipulate the raw image data of a bitmap.

## Understanding the Bitmap class

As a subclass of the DisplayObject class, the Bitmap class is the main
ActionScript 3.0 class used for displaying bitmap images. These images may have
been loaded via the flash.display.Loader class or created dynamically using the
`Bitmap()` constructor. When loading an image from an external source, a Bitmap
object can only use GIF, JPEG, or PNG format images. Once instantiated, the
Bitmap instance can be considered a wrapper for a BitmapData object that needs
to be rendered to the Stage. Because a Bitmap instance is a display object, all
the characteristics and functionality of display objects can be used to
manipulate a Bitmap instance as well. For more information about working with
display objects, see [Display programming](../display-programming/index.md).

## Pixel snapping and smoothing

In addition to the functionality common to all display objects, the Bitmap class
provides some additional features that are specific to bitmap images.

The `pixelSnapping` property of the Bitmap class determines whether or not a
Bitmap object snaps to its nearest pixel. This property accepts one of three
constants defined in the PixelSnapping class: `ALWAYS`, `AUTO`, and `NEVER`.

The syntax for applying pixel snapping is as follows:

```
myBitmap.pixelSnapping = PixelSnapping.ALWAYS;
```

Often, when bitmap images are scaled, they become blurred and distorted. To help
reduce this distortion, use the `smoothing` property of the BitmapData class.
This Boolean property, when set to `true`, smooths, or anti-aliases, the pixels
within the image when it is scaled. This gives the image a clearer and more
natural appearance.

## Understanding the BitmapData class

The BitmapData class, which is in the flash.display package, can be likened to a
photographic snapshot of the pixels contained within a loaded or dynamically
created bitmap image. This snapshot is represented by an array of pixel data
within the object. The BitmapData class also contains a series of built-in
methods that are useful for creation and manipulation of pixel data.

To instantiate a BitmapData object, use the following code:

```
var myBitmap:BitmapData = new BitmapData(width:Number, height:Number, transparent:Boolean, fillColor:uinit);
```

The `width` and `height` parameters specify the size of the bitmap. Starting
with AIR 3 and Flash player 11, the size limits for a BitmapData object have
been removed. The maximum size of a bitmap is dependent on the operating system.

In AIR 1.5 and Flash Player 10, the maximum size for a BitmapData object is
8,191 pixels in width or height, and the total number of pixels cannot exceed
16,777,215 pixels. (So, if a BitmapData object is 8,191 pixels wide, it can only
be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier,
the limitation is 2,880 pixels in height and 2,880 in width.

The `transparent` parameter specifies whether the bitmap data includes an alpha
channel (`true`) or not (`false`). The `fillColor` parameter is a 32-bit color
value that specifies the background color, as well as the transparency value (if
it has been set to `true`). The following example creates a BitmapData object
with an orange background that is 50 percent transparent:

```
var myBitmap:BitmapData = new BitmapData(150, 150, true, 0x80FF3300);
```

To render a newly created BitmapData object to the screen, assign it to or wrap
it in a Bitmap instance. To do this, you can either pass the BitmapData object
as a parameter of the Bitmap object's constructor, or you can assign it to the
`bitmapData` property of an existing Bitmap instance. You must also add the
Bitmap instance to the display list by calling the `addChild()` or
`addChildAt()` methods of the display object container that will contain the
Bitmap instance. For more information on working with the display list, see
[Adding display objects to the display list](../display-programming/working-with-display-objects/adding-display-objects-to-the-display-list.md).

The following example creates a BitmapData object with a red fill, and displays
it in a Bitmap instance:

```
var myBitmapDataObject:BitmapData = new BitmapData(150, 150, false, 0xFF0000);
var myImage:Bitmap = new Bitmap(myBitmapDataObject);
addChild(myImage);
```
