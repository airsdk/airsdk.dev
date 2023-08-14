---
sidebar_position: 5
---

# Advanced printing techniques

Starting with Adobe AIR 2, the PrintJob class has additional properties and
methods, and three additional classes are supported: PrintUIOptions, PaperSize,
and PrintMethod. These changes allow additional printer workflows and give
authors greater control over the printing process. Changes include:

- Page setup dialogs: Both standard and custom page setup dialogs can be
  displayed. The user can set page ranges, paper size, orientation, and scaling
  before printing.

- Print view: A viewing mode can be created which accurately shows paper size,
  margins, and the position of content on the page.

- Restricted printing: Authors can restrict printing options, such as the range
  of printable pages.

- Quality options: Authors can adjust the print quality for a document and allow
  the user to select resolution and color options.

- Multiple print sessions: A single PrintJob instance can now be used for
  multiple printing sessions. Applications can provide consistent settings each
  time the page setup and print dialogs are displayed.

## Print workflow changes

The new print workflow consists of the following steps:

- `new PrintJob()`: Creates a PrintJob instance (or reuse an existing instance).
  Many new PrintJob properties and methods, such as `selectPaperSize()`, are
  available before the print job starts or during printing.

- `PrintJob.showPageSetupDialog()`: (optional) Display the page setup dialog
  without starting a print job.

- `PrintJob.start()` or `PrintJob.start2()`: In addition to the `start()`
  method, the `start2()` method is used to initiate the print spooling process.
  The `start2()` method allows you to choose whether to display the Print dialog
  and customize the dialog if it is shown.

- `PrintJob.addPage()`: Add content to the print job. Unchanged from existing
  process.

- `PrintJob.send()` or `PrintJob.terminate()`: Send the pages to the selected
  printer or terminate the print job without sending. Print jobs are terminated
  in response to an error. If a PrintJob instance is terminated, it can still be
  reused. Regardless of whether the print job is sent to the printer or
  terminated, the current print settings are retained when you reuse the
  PrintJob instance.

## Page setup dialog

The `showPageSetupDialog()` method displays the operating system's Page Setup
dialog, if the current environment supports it. Always check the
`supportsPageSetupDialog` property before calling this method. Here is a simple
example:

    import flash.printing.PrintJob;

    var myPrintJob:PrintJob = new PrintJob();
    //check for static property supportsPageSetupDialog of PrintJob class
    if (PrintJob.supportsPageSetupDialog) {
    	myPrintJob.showPageSetupDialog();
    }

The method can optionally be called with a
[](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/printing/PrintUIOptions.html)
[PrintUIOptions class](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/printing/PrintUIOptions.html)
property to control which options are displayed in the Page Setup dialog. The
min and max page numbers can be set. The following example limits printing to
the first three pages:

    import flash.printing.PrintJob;

    var myPrintJob:PrintJob = new PrintJob();
    if (PrintJob.supportsPageSetupDialog) {
    	var uiOpt:PrintUIOptions = new PrintUIOptions();
    	uiOpt.minPage = 1;
    	uiOpt.maxPage = 3;
    	myPrintJob.showPageSetupDialog(uiOpt);
    }

## Changing print settings

The settings for a PrintJob instance can be changed at any time after it is
constructed. This includes changing settings between `addPage()` calls and after
a print job has been sent or terminated. Some settings, such as the `printer`
property, apply to the entire print job, not individual pages. Those settings
must be set before a call to `start()` or `start2()`.

The `selectPaperSize()` method can be called to set the default paper size in
the Page Setup and Print dialogs. It can also be called during a print job to
set the paper size for a range of pages. It is called using constants defined in
the `PaperSize` class, as in this example, which selects a number 10 envelope
size:

    import flash.printing.PrintJob;
    import flash.printing.PaperSize;

    var myPrintJob:PrintJob = new PrintJob();
    myPrintJob.selectPaperSize(PaperSize.ENV_10);

Use the `printer` property to get or set the name of the printer for the current
print job. By default it is set to the name of the default printer. The
`printer` property is `null` if no printers are available or the system does not
support printing. To change the printer, first get the list of available
printers using the `printers` property. That property is a Vector whose String
elements are available printer names. Set the `printer` property to one of those
String values to make that printer the active one. The `printer` property of an
active print job cannot be changed. Attempts to change it after a successful
call to `start()` or `start2()` and before the job is sent or terminated fail.
Here is an example of setting this property:

    import flash.printing.PrintJob;

    var myPrintJob:PrintJob = new PrintJob();
    myPrintJob.printer = "HP_LaserJet_1";
    myPrintJob.start();

The `copies` property gets the value for the number of copies set in the
operating system's Print dialog. The `firstPage` and `lastPage` properties get
the page range. The `orientation` property gets the paper orientation setting.
These properties can be set to override the values from the Print dialog. The
following example sets these properties:

    import flash.printing.PrintJob;
    import flash.printing.PrintJobOrientation;

    var myPrintJob:PrintJob = new PrintJob();
    myPrintJob.copies = 3;
    myPrintJob.firstPage = 1;
    myPrintJob.lastPage = 3;
    myPrintJob.orientation = PrintJobOrientation.LANDSCAPE;

The following read-only settings associated with `PrintJob` provide helpful
information on the current printer setup:

- `paperArea`: The rectangular bounds of the printer medium, in points.

- `printableArea`: The rectangular bounds of the printable area, in points.

- `maxPixelsPerInch`: The physical resolution of the current printer, in pixels
  per inch.

- `isColor`: The ability of the current printer to print color (returns `true`
  if the current printer can print color).

See
[Printing example: Page setup and print options](./printing-example-page-setup-and-print-options.md).
