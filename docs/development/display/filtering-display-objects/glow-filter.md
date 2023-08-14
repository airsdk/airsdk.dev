# Glow filter

The GlowFilter class applies a lighting effect to display objects, making it
appear that a light is being shined up from underneath the object to create a
soft glow.

Similar to the drop shadow filter, the glow filter includes properties to modify
the distance, angle, and color of the light source to produce varying effects.
The GlowFilter also has several options for modifying the style of the glow,
including inner or outer glow and knockout mode.

The following code creates a cross using the Sprite class and applies a glow
filter to it:

    import flash.display.Sprite;
    import flash.filters.BitmapFilterQuality;
    import flash.filters.GlowFilter;

    // Create a cross graphic.
    var crossGraphic:Sprite = new Sprite();
    crossGraphic.graphics.lineStyle();
    crossGraphic.graphics.beginFill(0xCCCC00);
    crossGraphic.graphics.drawRect(60, 90, 100, 20);
    crossGraphic.graphics.drawRect(100, 50, 20, 100);
    crossGraphic.graphics.endFill();
    addChild(crossGraphic);

    // Apply the glow filter to the cross shape.
    var glow:GlowFilter = new GlowFilter();
    glow.color = 0x009922;
    glow.alpha = 1;
    glow.blurX = 25;
    glow.blurY = 25;
    glow.quality = BitmapFilterQuality.MEDIUM;

    crossGraphic.filters = [glow];
