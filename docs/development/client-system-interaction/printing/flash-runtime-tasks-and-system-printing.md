---
sidebar_position: 3
---

# Flash runtime tasks and system printing

Because Flash runtimes dispatch pages to the operating system's printing
interface, be aware of the tasks managed by Flash runtimes and the tasks managed
by an operating system's own printing interface. Flash runtimes can initiate a
print job, read some of a printer's page settings, pass the content for a print
job to the operating system, and verify if the user or system has canceled a
print job. Other processes, such as displaying printer specific dialog boxes,
canceling a spooled print job, or reporting on the printer's status, are all
handled by the operating system. Flash runtimes are able to respond if there is
a problem initiating or formatting a print job, but can report back only on
certain properties or conditions from the operating system's printing interface.
As a developer, your code needs to respond to these properties or conditions.

## Working with exceptions and returns

Check to see if the `PrintJob.start()` method returns `true` before executing
`addPage()` and `send()` calls, in case the user has canceled the print job. A
simple way to check whether these methods have been canceled before continuing
is to wrap them in an `if` statement, as follows:

    if (myPrintJob.start())
    {
    	// addPage() and send() statements here
    }

If `PrintJob.start()` is `true`, the user selected Print (or a Flash runtime,
such as Flash Player or AIR, has initiated a Print command). So, the `addPage()`
and `send()` methods can be called.

Also, to help manage the printing process, Flash runtimes throw exceptions for
the `PrintJob.addPage()` method, so that you can catch errors and provide
information and options to the user. If a `PrintJob.addPage()` method fails, you
can also call another function or stop the current print job. You catch these
exceptions by embedding `addPage()` calls within a `try..catch` statement, as in
the following example. In the example, `[params]` is a placeholder for the
parameters specifying the actual content you want to print:

    if (myPrintJob.start())
    {
    	try
    	{
    		myPrintJob.addPage([params]);
    	}
    	catch (error:Error)
    	{
    		// Handle error,
    	}
    	myPrintJob.send();
    }

After the print job starts, you can add the content using `PrintJob.addPage()`
and see if that generates an exception (for example, if the user has canceled
the print job). If it does, you can add logic to the `catch` statement to
provide the user (or the Flash runtime) with information and options, or you can
stop the current print job. If you add the page successfully, you can proceed to
send the pages to the printer using `PrintJob.send()`.

If the Flash runtime encounters a problem sending the print job to the printer
(for example, if the printer is offline), you can catch that exception, too, and
provide more information or more options (such as displaying message text or
providing an alert within an animation). For example, you can assign new text to
a text field in an `if..else` statement, as the following code shows:

    if (myPrintJob.start())
    {
    	try
    	{
    		myPrintJob.addPage([params]);
    	}
    	catch (error:Error)
    	{
    		// Handle error.
    	}
    	myPrintJob.send();
    }
    else
    {
    	myAlert.text = "Print job canceled";
    }

For a working example, see
[Printing example: Scaling, cropping, and responding](./printing-example-scaling-cropping-and-responding.md).

## Working with page properties

Once the user clicks OK in the Print dialog box and `PrintJob.start()` returns
`true`, you can access the properties defined by the printer's settings. These
settings include the paper width, paper height ( `pageHeight` and `pageWidth`),
and content orientation on the paper. Because these are printer settings, not
controlled by the Flash runtime, you cannot alter these settings; however, you
can use them to align the content you send to the printer to match the current
settings. For more information, see
[Setting size, scale, and orientation](./setting-size-scale-and-orientation.md).

## Setting vector or bitmap rendering

You can manually set the print job to spool each page as vector graphics or a
bitmap image. In some cases, vector printing produces a smaller spool file, and
a better image than bitmap printing. However, if your content includes a bitmap
image, and you want to preserve any alpha transparency or color effects, print
the page as a bitmap image. Also, a non-PostScript printer automatically
converts any vector graphics to bitmap images.

You specify bitmap printing by passing a PrintJobOptions object as the third
parameter of `PrintJob.addPage()`.

For Flash Player and AIR prior to AIR 2, set the PrintJobOptions object's
`printAsBitmap` parameter set to `true`, as follows:

    var options:PrintJobOptions = new PrintJobOptions();
    options.printAsBitmap = true;
    myPrintJob.addPage(mySprite, null, options);

If you don't specify a value for the third parameter, the print job uses the
default, which is vector printing.

For AIR 2 and later, use the PrintJobOptions object's `printMethod` property to
specify the print method. This property accepts three values, which are defined
as constants in the PrintMethod class:

- `PrintMethod.AUTO`: Automatically chooses the best print method based on the
  content being printed. For example, if a page consists of text, the vector
  print method is chosen. However, if a watermark image with alpha transparency
  is overlaid on the text, bitmap printing is chosen to preserve the
  transparency.

- `PrintMethod.BITMAP`: Forces bitmap printing regardless of the content

- `PrintMethod.VECTOR`: Forces vector printing regardless of the content

## Timing print job statements

ActionScript 3.0 does not restrict a PrintJob object to a single frame (as did
previous versions of ActionScript). However, because the operating system
displays print status information to the user once the user has clicked the OK
button in the Print dialog box, call `PrintJob.addPage()` and `PrintJob.send()`
as soon as possible to send pages to the spooler. A delay reaching the frame
containing the `PrintJob.send()` call delays the printing process.

In ActionScript 3.0, there is a script time-out limit of 15 seconds. Therefore,
the time between each major statement in a print job sequence cannot exceed 15
seconds. In other words, the 15-second script time-out limit applies to the
following intervals:

- Between `PrintJob.start()` and the first `PrintJob.addPage()`

- Between `PrintJob.addPage()` and the next `PrintJob.addPage()`

- Between the last `PrintJob.addPage()` and `PrintJob.send()`

If any of these intervals spans more than 15 seconds, the next call to
`PrintJob.start()` on the PrintJob instance returns `false`, and the next
`PrintJob.addPage()` on the PrintJob instance causes Flash Player or AIR to
throw a run-time exception.
