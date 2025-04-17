---
sidebar_position: 8
---

# Printing example: Page setup and print options

The following example initializes the PrintJob settings for number of copies,
paper size (legal), and page orientation (landscape). It forces the Page Setup
dialog to be displayed first, then starts the print job by displaying the Print
dialog.

```
package
{
	import flash.printing.PrintJob;
	import flash.printing.PrintJobOrientation;
	import flash.printing.PaperSize;
	import flash.printing.PrintUIOptions;
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.display.Stage;
	import flash.geom.Rectangle;

	public class PrintAdvancedExample extends Sprite
	{
		private var bg:Sprite = new Sprite();
		private var txt:TextField = new TextField();
		private var pj:PrintJob = new PrintJob();
		private var uiOpt:PrintUIOptions = new PrintUIOptions();

		public function PrintAdvancedExample():void
		{
			initPrintJob();
			initContent();
			draw();
			printPage();
		}

		private function printPage():void
		{
			//test for dialog support as a static property of PrintJob class
			if (PrintJob.supportsPageSetupDialog)
			{
				pj.showPageSetupDialog();
			}
			if (pj.start2(uiOpt, true))
			{
				try
				{
					pj.addPage(this, new Rectangle(0, 0, 100, 100));
				}
				catch (error:Error)
				{
					// Do nothing.
				}
				pj.send();
			}
			else
			{
				txt.text = "Print job terminated";
				pj.terminate();
			}
		}

		private function initContent():void
		{
			bg.graphics.beginFill(0x00FF00);
			bg.graphics.drawRect(0, 0, 100, 200);
			bg.graphics.endFill();

			txt.border = true;
			txt.text = "Hello World";
		}

		private function initPrintJob():void
		{
			pj.selectPaperSize(PaperSize.LEGAL);
			pj.orientation = PrintJobOrientation.LANDSCAPE;
			pj.copies = 2;
			pj.jobName = "Flash test print";
		}

		private function draw():void
		{
			addChild(bg);
			addChild(txt);
			txt.x = 50;
			txt.y = 50;
		}
	}
}
```
