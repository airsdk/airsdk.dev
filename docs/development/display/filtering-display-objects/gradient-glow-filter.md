# Gradient glow filter

The GradientGlowFilter class lets you apply an enhanced glow effect to display
objects or BitmapData objects. The effect gives you greater color control of the
glow, and in turn produces a more realistic glow effect. Additionally, the
gradient glow filter allows you to apply a gradient glow to the inner, outer, or
upper edges of an object.

The following example draws a circle on the Stage, and applies a gradient glow
filter to it. As you move the mouse further to the right and down, the amount of
blur increases in the horizontal and vertical directions respectively. In
addition, any time you click on the Stage, the strength of the blur increases.

    import flash.events.MouseEvent;
    import flash.filters.BitmapFilterQuality;
    import flash.filters.BitmapFilterType;
    import flash.filters.GradientGlowFilter;

    // Create a new Shape instance.
    var shape:Shape = new Shape();

    // Draw the shape.
    shape.graphics.beginFill(0xFF0000, 100);
    shape.graphics.moveTo(0, 0);
    shape.graphics.lineTo(100, 0);
    shape.graphics.lineTo(100, 100);
    shape.graphics.lineTo(0, 100);
    shape.graphics.lineTo(0, 0);
    shape.graphics.endFill();

    // Position the shape on the Stage.
    addChild(shape);
    shape.x = 100;
    shape.y = 100;

    // Define a gradient glow.
    var gradientGlow:GradientGlowFilter = new GradientGlowFilter();
    gradientGlow.distance = 0;
    gradientGlow.angle = 45;
    gradientGlow.colors = [0x000000, 0xFF0000];
    gradientGlow.alphas = [0, 1];
    gradientGlow.ratios = [0, 255];
    gradientGlow.blurX = 10;
    gradientGlow.blurY = 10;
    gradientGlow.strength = 2;
    gradientGlow.quality = BitmapFilterQuality.HIGH;
    gradientGlow.type = BitmapFilterType.OUTER;

    // Define functions to listen for two events.
    function onClick(event:MouseEvent):void
    {
        gradientGlow.strength++;
        shape.filters = [gradientGlow];
    }

    function onMouseMove(event:MouseEvent):void
    {
        gradientGlow.blurX = (stage.mouseX / stage.stageWidth) * 255;
        gradientGlow.blurY = (stage.mouseY / stage.stageHeight) * 255;
        shape.filters = [gradientGlow];
    }
    stage.addEventListener(MouseEvent.CLICK, onClick);
    stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
