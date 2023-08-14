# Gradient bevel filter

The GradientBevelFilter class lets you apply an enhanced bevel effect to display
objects or BitmapData objects. Using a gradient color on the bevel greatly
improves the spatial depth of the bevel, giving edges a more realistic, 3D
appearance.

The following code creates a rectangle object using the `drawRect()` method of
the Shape class and applies a gradient bevel filter to it.

    import flash.display.Shape;
    import flash.filters.BitmapFilterQuality;
    import flash.filters.GradientBevelFilter;

    // Draw a rectangle.
    var box:Shape = new Shape();
    box.graphics.lineStyle();
    box.graphics.beginFill(0xFEFE78);
    box.graphics.drawRect(100, 50, 90, 200);
    box.graphics.endFill();

    // Apply a gradient bevel to the rectangle.
    var gradientBevel:GradientBevelFilter = new GradientBevelFilter();

    gradientBevel.distance = 8;
    gradientBevel.angle = 225; // opposite of 45 degrees
    gradientBevel.colors = [0xFFFFCC, 0xFEFE78, 0x8F8E01];
    gradientBevel.alphas = [1, 0, 1];
    gradientBevel.ratios = [0, 128, 255];
    gradientBevel.blurX = 8;
    gradientBevel.blurY = 8;
    gradientBevel.quality = BitmapFilterQuality.HIGH;

    // Other properties let you set the filter strength and set options
    // for inner bevel and knockout effects.

    box.filters = [gradientBevel];

    // Add the graphic to the display list.
    addChild(box);
