---
sidebar_position: 6
---

# Printing example: Multiple-page printing

When printing more than one page of content, you can associate each page of
content with a different sprite (in this case, `sheet1` and `sheet2`), and then
use `PrintJob.addPage()` for each sprite. The following code illustrates this
technique:

    package
    {
    	import flash.display.MovieClip;
    	import flash.printing.PrintJob;
    	import flash.printing.PrintJobOrientation;
    	import flash.display.Stage;
    	import flash.display.Sprite;
    	import flash.text.TextField;
    	import flash.geom.Rectangle;

    	public class PrintMultiplePages extends MovieClip
    	{
    		private var sheet1:Sprite;
    		private var sheet2:Sprite;

    		public function PrintMultiplePages():void
    		{
    			init();
    			printPages();
    		}

    		private function init():void
    		{
    			sheet1 = new Sprite();
    			createSheet(sheet1, "Once upon a time...", {x:10, y:50, width:80, height:130});
    			sheet2 = new Sprite();
    			createSheet(sheet2, "There was a great story to tell, and it ended quickly.\n\nThe end.", null);
    		}

    		private function createSheet(sheet:Sprite, str:String, imgValue:Object):void
    		{
    			sheet.graphics.beginFill(0xEEEEEE);
    			sheet.graphics.lineStyle(1, 0x000000);
    			sheet.graphics.drawRect(0, 0, 100, 200);
    			sheet.graphics.endFill();

    			var txt:TextField = new TextField();
    			txt.height = 200;
    			txt.width = 100;
    			txt.wordWrap = true;
    			txt.text = str;

    			if (imgValue != null)
    			{
    				var img:Sprite = new Sprite();
    				img.graphics.beginFill(0xFFFFFF);
    				img.graphics.drawRect(imgValue.x, imgValue.y, imgValue.width, imgValue.height);
    				img.graphics.endFill();
    				sheet.addChild(img);
    			}
    			sheet.addChild(txt);
    		}

    		private function printPages():void
    		{
    			var pj:PrintJob = new PrintJob();
    			var pagesToPrint:uint = 0;
    			if (pj.start())
    			{
    				if (pj.orientation == PrintJobOrientation.LANDSCAPE)
    				{
    					throw new Error("Page is not set to an orientation of portrait.");
    				}

    				sheet1.height = pj.pageHeight;
    				sheet1.width = pj.pageWidth;
    				sheet2.height = pj.pageHeight;
    				sheet2.width = pj.pageWidth;

    				try
    				{
    					pj.addPage(sheet1);
    					pagesToPrint++;
    				}
    				catch (error:Error)
    				{
    				// Respond to error.
    				}

    				try
    				{
    					pj.addPage(sheet2);
    					pagesToPrint++;
    				}
    				catch (error:Error)
    				{
    					// Respond to error.
    				}

    				if (pagesToPrint > 0)
    				{
    					pj.send();
    				}
    			}
    		}
    	}
    }
