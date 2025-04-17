# Scrolling bitmaps

Imagine you have created a street mapping application where each time the user
moves the map you are required to update the view (even if the map has been
moved by just a few pixels).

One way to create this functionality would be to re-render a new image
containing the updated map view each time the user moves the map. Alternatively,
you could create a large single image and use the `scroll()` method.

The `scroll()` method copies an on-screen bitmap and then pastes it to a new
offset location—specified by (`x`, `y`) parameters. If a portion of the bitmap
happens to reside off-stage, this gives the effect that the image has shifted.
When combined with a timer function (or an `enterFrame` event), you can make the
image appear to be animating or scrolling.

The following example takes the previous perlin noise example and generates a
larger bitmap image (three-fourths of which is rendered off-stage). The
`scroll()` method is then applied, along with an `enterFrame` event listener
that offsets the image by one pixel in a diagonally downward direction. This
method is called each time the frame is entered and as a result, the off screen
portions of the image are rendered to the Stage as the image scrolls down.

```
import flash.display.Bitmap;
import flash.display.BitmapData;

var myBitmapDataObject:BitmapData = new BitmapData(1000, 1000, false, 0x00FF0000);
var seed:Number = Math.floor(Math.random() * 100);
var channels:uint = BitmapDataChannel.GREEN | BitmapDataChannel.BLUE;
myBitmapDataObject.perlinNoise(100, 80, 6, seed, false, true, channels, false, null);

var myBitmap:Bitmap = new Bitmap(myBitmapDataObject);
myBitmap.x = -750;
myBitmap.y = -750;
addChild(myBitmap);

addEventListener(Event.ENTER_FRAME, scrollBitmap);

function scrollBitmap(event:Event):void
{
```

        myBitmapDataObject.scroll(1, 1);
```
}
```
