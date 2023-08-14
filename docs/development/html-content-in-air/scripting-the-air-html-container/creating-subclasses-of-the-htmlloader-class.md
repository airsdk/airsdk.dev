# Creating subclasses of the HTMLLoader class

You can create a subclass of the HTMLLoader class, to create new behaviors. For
example, you can create a subclass that defines default event listeners for
HTMLLoader events (such as those events dispatched when HTML is rendered or when
the user clicks a link).

The following example extends the HTMLHost class to provide _normal_ behavior
when the JavaScript `window.open()` method is called. The example then defines a
subclass of HTMLLoader that uses the custom HTMLHost implementation class:

    package
    {
    	import flash.html.HTMLLoader;
    	public class MyHTMLHost extends HTMLHost
    	{
    		public function MyHTMLHost()
    		{
    			super(false);
    		}
    		override public function createWindow(opts:HTMLWindowCreateOptions):void
    		{
    			var initOptions:NativeWindowInitOptions = new NativeWindowInitOptions();
    			var bounds:Rectangle = new Rectangle(opts.x, opts.y, opts.width, opts.height);
    			var html:HTMLLoader = HTMLLoader.createRootWindow(true,
    													initOptions,
    													opts.scrollBarsVisible,
    													bounds);
    			html.stage.nativeWindow.orderToFront();
    			return html
    		}
    	}
    }

The following defines a subclass of the HTMLLoader class that assigns a
MyHTMLHost object to its `htmlHost` property:

    package
    {
    	import flash.html.HTMLLoader;
    	public class MyHTML extends HTMLLoader
    	{
    		public function MyHTML()
    		{
    			super();
    			htmlHost = new MyHTMLHost();
    		}
    	}
    }

For details on the HTMLHost class and the `HTMLLoader.createRootWindow()` method
used in this example, see
[Defining browser-like user interfaces for HTML content](./defining-browser-like-user-interfaces-for-html-content.md).
