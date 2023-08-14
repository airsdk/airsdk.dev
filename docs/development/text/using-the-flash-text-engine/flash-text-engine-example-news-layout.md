# Flash Text Engine example: News layout

This programming example shows the Flash Text Engine in use laying out a simple
newspaper page. The page includes a large headline, a subhead, and a multicolumn
body section.

First, create an FLA file, and attach the following code to frame \#2 of the
default layer:

    import com.example.programmingas3.newslayout.StoryLayout;
    // frame sc ript - create  a 3-columned arti cle layout
    var story:StoryLayout = new StoryLayout(720, 500, 3, 10);
    story.x = 20;
    story.y = 80;
    addChild(story);
    stop();

StoryLayout.as is the controller script for this example. It sets the content,
reads in style information from an external style sheet, and assigns those
styles to ElementFormat objects. It then creates the headline, subhead and
multicolumn text elements.

    package com.example.programmingas3.newslayout
    {
    	import flash.display.Sprite;
    	import flash.text.StyleSheet;
    	import flash.text.engine.*;

    	import flash.events.Event;
    	import flash.net.URLRequest;
    	import flash.net.URLLoader;
    	import flash.display.Sprite;
    	import flash.display.Graphics;

    	public class StoryLayout extends Sprite
    	{
    		public var headlineTxt:HeadlineTextField;
    		public var subtitleTxt:HeadlineTextField;
    		public var storyTxt:MultiColumnText;
    		public var sheet:StyleSheet;
    		public var h1_ElFormat:ElementFormat;
    		public var h2_ElFormat:ElementFormat;
    		public var p_ElFormat:ElementFormat;

    		private var loader:URLLoader;

    		public var paddingLeft:Number;
    		public var paddingRight:Number;
    		public var paddingTop:Number;
    		public var paddingBottom:Number;

    		public var preferredWidth:Number;
    		public var preferredHeight:Number;

    		public var numColumns:int;

    		public var bgColor:Number = 0xFFFFFF;

    		public var headline:String = "News Layout Example";
    		public var subtitle:String = "This example formats text like a newspaper page using the Flash Text Engine API. ";

    		public var rawTestData:String =
    		"From the part Mr. Burke took in the American Revolution, it was natural that I should consider him a friend to mankind; and as our acquaintance commenced on that ground, it would have been more agreeable to me to have had cause to continue in that opinion than to change it. " +
    		"At the time Mr. Burke made his violent speech last winter in the English Parliament against the French Revolution and the National Assembly, I was in Paris, and had written to him but a short time before to inform him how prosperously matters were going on. Soon after this I saw his advertisement of the Pamphlet he intended to publish: As the attack was to be made in a language but little studied, and less understood in France, and as everything suffers by translation, I promised some of the friends of the Revolution in that country that whenever Mr. Burke's Pamphlet came forth, I would answer it. This appeared to me the more necessary to be done, when I saw the flagrant misrepresentations which Mr. Burke's Pamphlet contains; and that while it is an outrageous abuse on the French Revolution, and the principles of Liberty, it is an imposition on the rest of the world. " +
    		"I am the more astonished and disappointed at this conduct in Mr. Burke, as (from the circumstances I am going to mention) I had formed other expectations. " +
    		"I had seen enough of the miseries of war, to wish it might never more have existence in the world, and that some other mode might be found out to settle the differences that should occasionally arise in the neighbourhood of nations. This certainly might be done if Courts were disposed to set honesty about it, or if countries were enlightened enough not to be made the dupes of Courts. The people of America had been bred up in the same prejudices against France, which at that time characterised the people of England; but experience and an acquaintance with the French Nation have most effectually shown to the Americans the falsehood of those prejudices; and I do not believe that a more cordial and confidential intercourse exists between any two countries than between America and France. ";

    		public function StoryLayout(w:int = 400, h:int = 200, cols:int = 3, padding:int = 10):void
    		{
    			this.preferredWidth = w;
    			this.preferredHeight = h;

    			this.numColumns = cols;

    			this.paddingLeft = padding;
    			this.paddingRight = padding;
    			this.paddingTop = padding;
    			this.paddingBottom = padding;

    			var req:URLRequest = new URLRequest("story.css");
    			loader = new URLLoader();
    			loader.addEventListener(Event.COMPLETE, onCSSFileLoaded);
    			loader.load(req);
    		}

    		public function onCSSFileLoaded(event:Event):void
    		{
    			this.sheet = new StyleSheet();
    			this.sheet.parseCSS(loader.data);

    			// convert headline styles to ElementFormat objects
    			h1_ElFormat = getElFormat("h1", this.sheet);
    			h1_ElFormat.typographicCase = TypographicCase.UPPERCASE;
    			h2_ElFormat = getElFormat("h2", this.sheet);
    			p_ElFormat = getElFormat("p", this.sheet);
    			displayText();
    		}

    		public function drawBackground():void
    		{
    			var h:Number = this.storyTxt.y + this.storyTxt.height +
    							this.paddingTop + this.paddingBottom;
    			var g:Graphics = this.graphics;
    			g.beginFill(this.bgColor);
    			g.drawRect(0, 0, this.width + this.paddingRight + this.paddingLeft, h);
    			g.endFill();
    		}

    		/**
    		 * Reads a set of style properties for a named style and then creates
    		 * a TextFormat object that uses the same properties.
    		 */
    		public function getElFormat(styleName:String, ss:StyleSheet):ElementFormat
    		{
    			var style:Object = ss.getStyle(styleName);
    			if (style != null)
    			{
    				var colorStr:String = style.color;
    				if (colorStr != null && colorStr.indexOf("#") == 0)
    				{
    					style.color = colorStr.substr(1);
    				}
    				var fd:FontDescription = new FontDescription(
    									style.fontFamily,
    									style.fontWeight,
    									FontPosture.NORMAL,
    									FontLookup.DEVICE,
    									RenderingMode.NORMAL,
    									CFFHinting.NONE);
    				var format:ElementFormat = new ElementFormat(fd,
    									style.fontSize,
    									style.color,
    									1,
    									TextRotation.AUTO,
    									TextBaseline.ROMAN,
    									TextBaseline.USE_DOMINANT_BASELINE,
    									0.0,
    									Kerning.ON,
    									0.0,
    									0.0,
    									"en",
    									BreakOpportunity.AUTO,
    									DigitCase.DEFAULT,
    									DigitWidth.DEFAULT,
    									LigatureLevel.NONE,
    									TypographicCase.DEFAULT);

    				if (style.hasOwnProperty("letterSpacing"))
    				{
    					format.trackingRight = style.letterSpacing;
    				}
    			}
    			return format;
    		}

    		public function displayText():void
    		{
    			headlineTxt = new HeadlineTextField(h1_ElFormat,headline,this.preferredWidth);
    			headlineTxt.x = this.paddingLeft;
    			headlineTxt.y = 40 + this.paddingTop;
    			headlineTxt.fitText(1);
    			this.addChild(headlineTxt);

    			subtitleTxt = new HeadlineTextField(h2_ElFormat,subtitle,this.preferredWidth);
    			subtitleTxt.x = this.paddingLeft;
    			subtitleTxt.y = headlineTxt.y + headlineTxt.height;
    			subtitleTxt.fitText(2);
    			this.addChild(subtitleTxt);

    			storyTxt = new MultiColumnText(rawTestData, this.numColumns,
    						20, this.preferredWidth, this.preferredHeight, p_ElFormat);
    			storyTxt.x = this.paddingLeft;
    			storyTxt.y = subtitleTxt.y + subtitleTxt.height + 10;
    			this.addChild(storyTxt);

    			drawBackground();
    		}
    	}
    }

FormattedTextBlock.as is used as a base class for creating blocks of text. It
also includes utility functions for changing font size and case.

    package com.example.programmingas3.newslayout
    {
    	import flash.text.engine.*;
    	import flash.display.Sprite;

    	public class FormattedTextBlock extends Sprite
    	{
    		public var tb:TextBlock;
    		private var te:TextElement;
    		private var ef1:ElementFormat;
    		private var textWidth:int;
    		public var totalTextLines:int;
    		public var blockText:String;
    		public var leading:Number = 1.25;
    		public var preferredWidth:Number = 720;
    		public var preferredHeight:Number = 100;

    		public function FormattedTextBlock(ef:ElementFormat,txt:String, colW:int = 0)
    		{
    			this.textWidth = (colW==0) ? preferredWidth : colW;
    			blockText = txt;
    			ef1 = ef;
    			tb = new TextBlock();
    			tb.textJustifier = new SpaceJustifier("en",LineJustification.UNJUSTIFIED,false);
    			te = new TextElement(blockText,this.ef1);
    			tb.content = te;
    			this.breakLines();
    		}

    		private function breakLines()
    		{
    			var textLine:TextLine = null;
    			var y:Number = 0;
    			var lineNum:int = 0;
    			while (textLine = tb.createTextLine(textLine,this.textWidth,0,true))
    			{
    				textLine.x = 0;
    				textLine.y = y;
    				y += this.leading*textLine.height;
    				this.addChild(textLine);
    			}
    			for (var i:int = 0; i < this.numChildren; i++)
    			{
    				TextLine(this.getChildAt(i)).validity = TextLineValidity.STATIC;
    			}
    			this.totalTextLines = this.numChildren;
    		}

    		private function rebreakLines()
    		{
    			this.clearLines();
    			this.breakLines();
    		}

    		private function clearLines()
    		{
    			while(this.numChildren)
    			{
    				this.removeChildAt(0);
    			}
    		}

    		public function changeSize(size:uint=12):void
    		{
    			if (size > 5)
    			{
    				var ef2:ElementFormat = ef1.clone();
    				ef2.fontSize = size;
    				te.elementFormat = ef2;
    				this.rebreakLines();
    			}
    		}

    		public function changeCase(newCase:String = "default"):void
    		{
    			var ef2:ElementFormat = ef1.clone();
    			ef2.typographicCase = newCase;
    			te.elementFormat = ef2;
    		}
    	}
    }

HeadlineTextBlock.as extends the FormattedTextBlock class and is used for
creating headlines. It includes a function for fitting text within a defined
space on the page.

    package com.example.programmingas3.newslayout
    {
    	import flash.text.engine.*;
    	public class HeadlineTextField extends FormattedTextBlock
    	{

    		public static var MIN_POINT_SIZE:uint = 6;
    		public static var MAX_POINT_SIZE:uint = 128;

    		public function HeadlineTextField(te:ElementFormat,txt:String,colW:int = 0)
    		{
    			super(te,txt);
    		}

    		public function fitText(maxLines:uint = 1, targetWidth:Number = -1):uint
    		{
    			if (targetWidth == -1)
    			{
    				targetWidth = this.width;
    			}

    			var pixelsPerChar:Number = targetWidth / this.blockText.length;
    			var pointSize:Number = Math.min(MAX_POINT_SIZE,
    							Math.round(pixelsPerChar * 1.8 * maxLines));

    			if (pointSize < 6)
    			{
    				// the point size is too small
    				return pointSize;
    			}

    			this.changeSize(pointSize);
    			if (this.totalTextLines > maxLines)
    			{
    				return shrinkText(--pointSize, maxLines);
    			}
    			else
    			{
    				return growText(pointSize, maxLines);
    			}
    		}

    		public function growText(pointSize:Number, maxLines:uint = 1):Number
    		{
    			if (pointSize >= MAX_POINT_SIZE)
    			{
    				return pointSize;
    			}

    			this.changeSize(pointSize + 1);
    			if (this.totalTextLines > maxLines)
    			{
    				// set it back to the last size
    				this.changeSize(pointSize);
    				return pointSize;
    			}
    			else
    			{
    				return growText(pointSize + 1, maxLines);
    			}
    		}

    		public function shrinkText(pointSize:Number, maxLines:uint=1):Number
    		{
    			if (pointSize <= MIN_POINT_SIZE)
    			{
    				return pointSize;
    			}
    			this.changeSize(pointSize);

    			if (this.totalTextLines > maxLines)
    			{
    				return shrinkText(pointSize - 1, maxLines);
    			}
    			else
    			{
    				return pointSize;
    			}
    		}
    	}
    }

MultiColumnText.as handles formatting text within a multicolumn design. It
demonstrates the flexible use a TextBlock object as a factory for creating,
formatting, and placing text lines.

    package com.example.programmingas3.newslayout
    {
    	import flash.display.Sprite;
    	import flash.text.engine.*;

    	public class MultiColumnText extends Sprite
    	{
    		private var tb:TextBlock;
    		private var te:TextElement;
    		private var numColumns:uint = 2;
    		private var gutter:uint = 10;
    		private var leading:Number = 1.25;
    		private var preferredWidth:Number = 400;
    		private var preferredHeight:Number = 100;
    		private var colWidth:int = 200;

    		public function MultiColumnText(txt:String = "",cols:uint = 2,
    			gutter:uint = 10, w:Number = 400, h:Number = 100,
    			ef:ElementFormat = null):void
    		{
    			this.numColumns = Math.max(1, cols);
    			this.gutter = Math.max(1, gutter);

    			this.preferredWidth = w;
    			this.preferredHeight = h;

    			this.setColumnWidth();

    			var field:FormattedTextBlock = new FormattedTextBlock(ef,txt,this.colWidth);
    			var totLines:int = field.totalTextLines;
    			field = null;
    			var linesPerCol:int = Math.ceil(totLines/cols);

    			tb = new TextBlock();
    			te = new TextElement(txt,ef);
    			tb.content = te;
    			var textLine:TextLine = null;
    			var x:Number = 0;
    			var y:Number = 0;
    			var i:int = 0;
    			var j:int = 0;
    			while (textLine = tb.createTextLine(textLine,this.colWidth,0,true))
    			{
    				textLine.x = Math.floor(i/(linesPerCol+1))*(this.colWidth+this.gutter);
    				textLine.y = y;
    				y += this.leading*textLine.height;
    				j++;
    				if(j>linesPerCol)
    				{
    					y = 0;
    					j = 0;
    				}
    				i++;

    				this.addChild(textLine);
    			}
    		}

    		private function setColumnWidth():void
    		{
    			this.colWidth = Math.floor( (this.preferredWidth -
    				((this.numColumns - 1) * this.gutter)) / this.numColumns);
    		}

    	}
    }
