---
sidebar_position: 4
---

# Scripting between content in different domains

AIR applications are granted special privileges when they are installed. It is
crucial that the same privileges not be leaked to other content, including
remote files and local files that are not part of the application.

## About the AIR sandbox bridge

Normally, content from other domains cannot call scripts in other domains. To
protect AIR applications from accidental leakage of privileged information or
control, the following restrictions are placed on content in the `application`
security sandbox (content installed with the application):

- Code in the application security sandbox cannot allow to other sandboxes by
  calling the `Security.allowDomain()` method. Calling this method from the
  application security sandbox will throw an error.

- Importing non-application content into the application sandbox by setting the
  `LoaderContext.securityDomain` or the `LoaderContext.applicationDomain`
  property is prevented.

There are still cases where the main AIR application requires content from a
remote domain to have controlled access to scripts in the main AIR application,
or vice versa. To accomplish this, the runtime provides a _sandbox bridge_
mechanism, which serves as a gateway between the two sandboxes. A sandbox bridge
can provide explicit interaction between remote and application security
sandboxes.

The sandbox bridge exposes two objects that both loaded and loading scripts can
access:

- The `parentSandboxBridge` object lets loading content expose properties and
  functions to scripts in the loaded content.

- The `childSandboxBridge` object lets loaded content expose properties and
  function to scripts in the loading content.

Objects exposed via the sandbox bridge are passed by value, not by reference.
All data is serialized. This means that the objects exposed by one side of the
bridge cannot be set by the other side, and that objects exposed are all
untyped. Also, you can only expose simple objects and functions; you cannot
expose complex objects.

If child content attempts to set an object to the parentSandboxBridge object,
the runtime throws a SecurityError exception. Similarly, if parent content
attempts to set an object to the childSandboxBridge object, the runtime throws a
SecurityError exception.

## Sandbox bridge example (SWF)

Suppose an AIR music store application wants to allow remote SWF files to
broadcast the price of albums, but does not want the remote SWF file to disclose
whether the price is a sale price. To do this, a StoreAPI class provides a
method to acquire the price, but obscures the sale price. An instance of this
StoreAPI class is then assigned to the `parentSandboxBridge` property of the
LoaderInfo object of the Loader object that loads the remote SWF.

The following is the code for the AIR music store:

```
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" layout="absolute" title="Music Store" creationComplete="initApp()">
	<mx:Script>
	<![CDATA
		import flash.display.Loader;
		import flash.net.URLRequest;

		private var child:Loader;
		private var isSale:Boolean = false;

		private function initApp():void {
			var request:URLRequest =
					new URLRequest("http://[www.yourdomain.com]/PriceQuoter.swf")

			child = new Loader();
			child.contentLoaderInfo.parentSandboxBridge = new StoreAPI(this);
			child.load(request);
			container.addChild(child);
		}
		public function getRegularAlbumPrice():String {
			return "$11.99";
		}
		public function getSaleAlbumPrice():String {
			return "$9.99";
		}
		public function getAlbumPrice():String {
			if(isSale) {
				return getSaleAlbumPrice();
			}
			else {
				return getRegularAlbumPrice();
			}
		}
	]]>
	</mx:Script>
	<mx:UIComponent id="container" />
</mx:WindowedApplication>
```

The StoreAPI object calls the main application to retrieve the regular album
price, but returns "Not available" when the `getSaleAlbumPrice()` method is
called. The following code defines the StoreAPI class:

```
public class StoreAPI
{
	private static var musicStore:Object;

	public function StoreAPI(musicStore:Object)
	{
		this.musicStore = musicStore;
	}

	public function getRegularAlbumPrice():String {
		return musicStore.getRegularAlbumPrice();
	}

	public function getSaleAlbumPrice():String {
		return "Not available";
	}

	public function getAlbumPrice():String {
		return musicStore.getRegularAlbumPrice();
	}
}
```

The following code represents an example of a PriceQuoter SWF file that reports
the store's price, but cannot report the sale price:

```
package
{
	import flash.display.Sprite;
	import flash.system.Security;
	import flash.text.*;

	public class PriceQuoter extends Sprite
	{
		private var storeRequester:Object;

		public function PriceQuoter() {
			trace("Initializing child SWF");
			trace("Child sandbox: " + Security.sandboxType);
			storeRequester = loaderInfo.parentSandboxBridge;

			var tf:TextField = new TextField();
			tf.autoSize = TextFieldAutoSize.LEFT;
			addChild(tf);

			tf.appendText("Store price of album is: " + storeRequester.getAlbumPrice());
			tf.appendText("\n");
			tf.appendText("Sale price of album is: " + storeRequester.getSaleAlbumPrice());
		}
	}
}
```

## Sandbox bridge example (HTML)

In HTML content, the `parentSandboxBridge` and `childSandboxBridge` properties
are added to the JavaScript window object of a child document. For an example of
how to set up bridge functions in HTML content, see
[Setting up a sandbox bridge interface](../../html-content-in-air/programming-html-and-javascript-in-air/cross-scripting-content-in-different-security-sandboxes.md#setting-up-a-sandbox-bridge-interface).

## Limiting API exposure

When exposing sandbox bridges, it's important to expose high-level APIs that
limit the degree to which they can be abused. Keep in mind that the content
calling your bridge implementation may be compromised (for example, via a code
injection). So, for example, exposing a `readFile(path:String)` method (that
reads the contents of an arbitrary file) via a bridge is vulnerable to abuse. It
would be better to expose a `readApplicationSetting()` API that doesn't take a
path and reads a specific file. The more semantic approach limits the damage
that an application can do once part of it is compromised.

More Help topics

[Cross-scripting content in different security sandboxes](../../html-content-in-air/programming-html-and-javascript-in-air/cross-scripting-content-in-different-security-sandboxes.md)

[The AIR application sandbox](../security-sandboxes.md#the-air-application-sandbox)
