# Drop shadow filter

Drop shadows give the impression that there is a separate light source situated
above a target object. The position and intensity of this light source can be
modified to produce a variety of different drop shadow effects.

The DropShadowFilter class uses an algorithm that is similar to the blur
filter's algorithm. The main difference is that the drop shadow filter has a few
more properties that you can modify to simulate different light-source
attributes (such as alpha, color, offset and brightness).

The drop shadow filter also allows you to apply custom transformation options on
the style of the drop shadow, including inner or outer shadow and knockout (also
known as cutout) mode.

The following code creates a square box sprite and applies a drop shadow filter
to it:

    import flash.display.Sprite;
    import flash.filters.DropShadowFilter;

    // Draw a box.
    var boxShadow:Sprite = new Sprite();
    boxShadow.graphics.lineStyle(1);
    boxShadow.graphics.beginFill(0xFF3300);
    boxShadow.graphics.drawRect(0, 0, 100, 100);
    boxShadow.graphics.endFill();
    addChild(boxShadow);

    // Apply the drop shadow filter to the box.
    var shadow:DropShadowFilter = new DropShadowFilter();
    shadow.distance = 10;
    shadow.angle = 25;

    // You can also set other properties, such as the shadow color,
    // alpha, amount of blur, strength, quality, and options for
    // inner shadows and knockout effects.

    boxShadow.filters = [shadow];
