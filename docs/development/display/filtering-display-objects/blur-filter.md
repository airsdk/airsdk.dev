# Blur filter

The BlurFilter class smears, or blurs, a display object and its contents. Blur
effects are useful for giving the impression that an object is out of focus or
for simulating fast movement, as in a motion blur. By setting the `quality`
property of the blur filter too low, you can simulate a softly out-of-focus lens
effect. Setting the `quality` property to high results in a smooth blur effect
similar to a Gaussian blur.

The following example creates a circle object using the `drawCircle()` method of
the Graphics class and applies a blur filter to it:

    import flash.display.Sprite;
    import flash.filters.BitmapFilterQuality;
    import flash.filters.BlurFilter;

    // Draw a circle.
    var redDotCutout:Sprite = new Sprite();
    redDotCutout.graphics.lineStyle();
    redDotCutout.graphics.beginFill(0xFF0000);
    redDotCutout.graphics.drawCircle(145, 90, 25);
    redDotCutout.graphics.endFill();

    // Add the circle to the display list.
    addChild(redDotCutout);

    // Apply the blur filter to the rectangle.
    var blur:BlurFilter = new BlurFilter();
    blur.blurX = 10;
    blur.blurY = 10;
    blur.quality = BitmapFilterQuality.MEDIUM;
    redDotCutout.filters = [blur];
