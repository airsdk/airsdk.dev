# Copying bitmap data

To copy bitmap data from one image to another, you can use several methods:
`clone()`, `copyPixels()`, `copyChannel()`, `draw()`, and `drawWithQuality()` (
`drawWithQuality` method available in Flash Player 11.3 and higher; AIR 3.3 and
higher).

As its name suggests, the `clone()` method lets you clone, or sample, bitmap
data from one BitmapData object to another. When called, the method returns a
new BitmapData object that is an exact clone of the original instance it was
copied from.

The following example clones a copy of an orange (parent) square and places the
clone beside the original parent square:

    import flash.display.Bitmap;
    import flash.display.BitmapData;

    var myParentSquareBitmap:BitmapData = new BitmapData(100, 100, false, 0x00ff3300);
    var myClonedChild:BitmapData = myParentSquareBitmap.clone();

    var myParentSquareContainer:Bitmap = new Bitmap(myParentSquareBitmap);
    this.addChild(myParentSquareContainer);

    var myClonedChildContainer:Bitmap = new Bitmap(myClonedChild);
    this.addChild(myClonedChildContainer);
    myClonedChildContainer.x = 110;

The `copyPixels()` method is a quick and easy way of copying pixels from one
BitmapData object to another. The method takes a rectangular snapshot (defined
by the `sourceRect` parameter) of the source image and copies it to another
rectangular area (of equal size). The location of the newly "pasted" rectangle
is defined within the `destPoint` parameter.

The `copyChannel()` method samples a predefined color channel value (alpha, red,
green, or blue) from a source BitmapData object and copies it into a channel of
a destination BitmapData object. Calling this method does not affect the other
channels in the destination BitmapData object.

The `draw()` and `drawWithQuality()` methods draw, or render, the graphical
content from a source sprite, movie clip, or other display object on to a new
bitmap. Using the `matrix`, `colorTransform`, `blendMode`, and destination
`clipRect` parameters, you can modify the way in which the new bitmap is
rendered. This method uses the vector renderer in Flash Player and AIR to
generate the data.

When you call `draw()` or `drawWithQuality()` you pass the source object
(sprite, movie clip, or other display object) as the first parameter, as
demonstrated here:

    myBitmap.draw(movieClip);

If the source object has had any transformations (color, matrix, and so forth)
applied to it after it was originally loaded, these transformations are not
copied across to the new object. If you want to copy the transformations to the
new bitmap, then you need to copy the value of the `transform` property from the
original object to the `transform` property of the Bitmap object that uses the
new BitmapData object.
