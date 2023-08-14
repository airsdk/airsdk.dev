---
sidebar_position: 4
---

# Setting size, scale, and orientation

The section [Printing a page](./printing-a-page.md) details the steps for a
basic print job, where the output directly reflects the printed equivalent of
the screen size and position of the specified sprite. However, printers use
different resolutions for printing, and can have settings that adversely affect
the appearance of the printed sprite.

Flash runtimes can read an operating system's printing settings, but note that
these properties are read-only: although you can respond to their values, you
can't set them. So, for example, you can find out the printer's page size
setting and adjust your content to fit the size. You can also determine a
printer's margin settings and page orientation. To respond to the printer
settings, specify a print area, adjust for the difference between a screen's
resolution and a printer's point measurements, or transform your content to meet
the size or orientation settings of the user's printer.

## Using rectangles for the print area

The `PrintJob.addPage()` method allows you to specify the region of a sprite
that you want printed. The second parameter, `printArea,` is in the form of a
Rectangle object. You have three options for providing a value for this
parameter:

- Create a Rectangle object with specific properties and then use that rectangle
  in the `addPage()` call, as in the following example:

      private var rect1:Rectangle = new Rectangle(0, 0, 400, 200);
      myPrintJob.addPage(sheet, rect1);

- If you haven't already specified a Rectangle object, you can do it within the
  call itself, as in the following example:

      myPrintJob.addPage(sheet, new Rectangle(0, 0, 100, 100));

- If you plan to provide values for the third parameter in the `addPage()` call,
  but don't want to specify a rectangle, you can use `null` for the second
  parameter, as in the following;

      myPrintJob.addPage(sheet, null, options);

## Comparing points and pixels

A rectangle's width and height are pixel values. A printer uses points as print
units of measurement. Points are a fixed physical size (1/72 inch), but the size
of a pixel on the screen depends on the resolution of the particular screen. The
conversion rate between pixels and points depends on the printer settings and
whether the sprite is scaled. An unscaled sprite that is 72 pixels wide prints
out one inch wide, with one point equal to one pixel, independent of screen
resolution.

You can use the following equivalencies to convert inches or centimeters to
twips or points (a twip is 1/20 of a point):

- 1 point = 1/72 inch = 20 twips

- 1 inch = 72 points = 1440 twips

- 1 centimeter = 567 twips

If you omit the `printArea` parameter, or if it is passed incorrectly, the full
area of the sprite is printed.

## Scaling

If you want to scale a Sprite object before you print it, set the scale
properties (see
[Manipulating size and scaling objects](../../display/display-programming/manipulating-display-objects/manipulating-size-and-scaling-objects.md))
before calling the `PrintJob.addPage()` method, and set them back to their
original values after printing. The scale of a Sprite object has no relation to
the `printArea` property. In other words, if you specify a print area that is 50
pixels by 50 pixels, 2500 pixels are printed. If you scale the Sprite object,
the same 2500 pixels are printed, but the Sprite object is printed at the scaled
size.

For an example, see
[Printing example: Scaling, cropping, and responding](./printing-example-scaling-cropping-and-responding.md).

## Printing for landscape or portrait orientation

Because Flash Player and AIR can detect the settings for orientation, you can
build logic into your ActionScript to adjust the content size or rotation in
response to the printer settings, as the following example illustrates:

    if (myPrintJob.orientation == PrintJobOrientation.LANDSCAPE)
    {
    	mySprite.rotation = 90;
    }

Note: If you plan to read the system setting for content orientation on the
paper, remember to import the
[PrintJobOrientation class](https://airsdk.dev/reference/actionscript/3.0/flash/printing/PrintJobOrientation.html).
The PrintJobOrientation class provides constant values that define the content
orientation on the page. You import the class using the following statement:

    import flash.printing.PrintJobOrientation;

## Responding to page height and width

Using a strategy that is similar to handling printer orientation settings, you
can read the page height and width settings and respond to them by embedding
some logic into an `if` statement. The following code shows an example:

    if (mySprite.height > myPrintJob.pageHeight)
    {
    	mySprite.scaleY = .75;
    }

In addition, a page's margin settings can be determined by comparing the page
and paper dimensions, as the following example illustrates:

    margin_height = (myPrintJob.paperHeight - myPrintJob.pageHeight) / 2;
    margin_width = (myPrintJob.paperWidth - myPrintJob.pageWidth) / 2;
