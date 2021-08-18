---
title: Loading display content dynamically
sidebar_position: 9
---

You can load any of the following external display assets into an ActionScript 3.0 application:

- A SWF file authored in ActionScript 3.0 — This file can be a Sprite, MovieClip, or any class that extends Sprite. In AIR applications on iOS, only SWF files that do not contain ActionScript bytecode can be loaded. This means that SWF files containing embedded data, such as images and sound can be loaded, but not SWF files containing executable code.
- An image file — This includes JPG, PNG, and GIF files.
- An AVM1 SWF file — This is a SWF file written in ActionScript 1.0 or 2.0. (not supported in mobile AIR applications)

You load these assets by using the Loader class.

## Loading display objects

Loader objects are used to load SWF files and graphics files into an application. The Loader class is a subclass of the DisplayObjectContainer class. A Loader object can contain only one child display object in its display list—the display object representing the SWF or graphic file that it loads. When you add a Loader object to the display list, as in the following code, you also add the loaded child display object to the display list once it loads:

```actionscript
var pictLdr:Loader = new Loader();
var pictURL:String = "banana.jpg"
var pictURLReq:URLRequest = new URLRequest(pictURL);
pictLdr.load(pictURLReq);
this.addChild(pictLdr);
```

Once the SWF file or image is loaded, you can move the loaded display object to another display object container, such as the `container` DisplayObjectContainer object in this example:

```actionscript
import flash.display.\*;
import flash.net.URLRequest;
import flash.events.Event;
var container:Sprite = new Sprite();
addChild(container);
var pictLdr:Loader = new Loader();
var pictURL:String = "banana.jpg"
var pictURLReq:URLRequest = new URLRequest(pictURL);
pictLdr.load(pictURLReq);
pictLdr.contentLoaderInfo.addEventListener(Event.COMPLETE, imgLoaded);

function imgLoaded(event:Event):void
{
    container.addChild(pictLdr.content);
}
```

## Monitoring loading progress

Once the file has started loading, a LoaderInfo object is created. A LoaderInfo object provides information such as load progress, the URLs of the loader and loadee, the number of bytes total for the media, and the nominal height and width of the media. A LoaderInfo object also dispatches events for monitoring the progress of the load.

The following diagram shows the different uses of the LoaderInfo object—for the instance of the main class of the SWF file, for a Loader object, and for an object loaded by the Loader object:

![](images/dp_loaderInfo_object.png)

The LoaderInfo object can be accessed as a property of both the Loader object and the loaded display object. As soon as loading begins, the LoaderInfo object can be accessed through the `contentLoaderInfo` property of the Loader object. Once the display object has finished loading, the LoaderInfo object can also be accessed as a property of the loaded display object through the display object's `loaderInfo` property. The `loaderInfo` property of the loaded display object refers to the same LoaderInfo object as the `contentLoaderInfo` property of the Loader object. In other words, a LoaderInfo object is shared between a loaded object and the Loader object that loaded it (between loader and loadee).

In order to access properties of loaded content, you will want to add an event listener to the LoaderInfo object, as in the following code:

```actionscript
import flash.display.Loader;
import flash.display.Sprite;
import flash.events.Event;

var ldr:Loader = new Loader();
var urlReq:URLRequest = new URLRequest("Circle.swf");
ldr.load(urlReq);
ldr.contentLoaderInfo.addEventListener(Event.COMPLETE, loaded);
addChild(ldr);

function loaded(event:Event):void
{
    var content:Sprite = event.target.content;
    content.scaleX = 2;
}
```

For more information, see [Handling events](/docs/development/core-actionscript-classes/handling-events).

## Specifying loading context

When you load an external file into Flash Player or AIR through the `load()` or `loadBytes()` method of the Loader class, you can optionally specify a `context` parameter. This parameter is a `LoaderContext` object.

The `LoaderContext` class includes three properties that let you define the context of how the loaded content can be used:

- `checkPolicyFile` : Use this property only when loading an image file (not a SWF file). If you set this property to true , the Loader checks the origin server for a policy file (see Website controls (policy files) ). This is necessary only for content originating from domains other than that of the SWF file containing the Loader object. If the server grants permission to the Loader domain, ActionScript from SWF files in the Loader domain can access data in the loaded image; in other words, you can use the `BitmapData.draw()` command to access data in the loaded image.

:::note
Note that a SWF file from other domains than that of the Loader object can call `Security.allowDomain()` to permit a specific domain.
:::

- `securityDomain` : Use this property only when loading a SWF file (not an image). Specify this for a SWF file from a domain other than that of the file containing the Loader object. When you specify this option, Flash Player checks for the existence of a policy file, and if one exists, SWF files from the domains permitted in the cross-policy file can cross-script the loaded SWF content. You can specify `flash.system.SecurityDomain.currentDomain` as this parameter.

- `applicationDomain` : Use this property only when loading a SWF file written in ActionScript 3.0 (not an image or a SWF file written in ActionScript 1.0 or 2.0). When loading the file, you can specify that the file be included in the same application domain as that of the Loader object, by setting the applicationDomain parameter to flash.system.ApplicationDomain.currentDomain . By putting the loaded SWF file in the same application domain, you can access its classes directly. This can be useful if you are loading a SWF file that contains embedded media, which you can access via their associated class names. For more information, see [Working with application domains](/docs/development/core-actionscript-classes/working-with-application-domains) .

Here's an example of checking for a policy file when loading a bitmap from another domain:

```actionscript
var context:LoaderContext = new LoaderContext();
context.checkPolicyFile = true;
var urlReq:URLRequest = new URLRequest("http://www.[your_domain_here].com/photo11.jpg");
var ldr:Loader = new Loader();
ldr.load(urlReq, context);
```

Here's an example of checking for a policy file when loading a SWF from another domain, in order to place the file in the same security sandbox as the Loader object. Additionally, the code adds the classes in the loaded SWF file to the same application domain as that of the Loader object:

```actionscript
var context:LoaderContext = new LoaderContext();
context.securityDomain = SecurityDomain.currentDomain;
context.applicationDomain = ApplicationDomain.currentDomain;
var urlReq:URLRequest = new URLRequest("http://www.[your_domain_here].com/library.swf");
var ldr:Loader = new Loader();
ldr.load(urlReq, context);
```

For more information, see the LoaderContext class in the ActionScript 3.0 Reference for the Adobe Flash Platform .

## Loading SWF files in AIR for iOS

On iOS devices, there are restrictions on loading and compiling code at runtime. Because of these restrictions, there are some necessary differences in the task of loading external SWF files into your application:

- All SWF files that contain ActionScript code must be included in the application package. No SWF containing code can be loaded from an external source such as over a network. As part of packaging the application, all ActionScript code in all SWF files in the application package is compiled to native code for iOS devices.
- You can't load, unload, and then re-load a SWF file. If you attempt to do this, an error occurs.
- The behavior of loading into memory and then unloading it is the same as with desktop platforms. If you load a SWF file then unload it, all visual assets contained in the SWF are unloaded from memory. However, any class references to an ActionScript class in the loaded SWF remain in memory and can be accessed in ActionScript code.
- All loaded SWF files must be loaded in the same application domain as the main SWF file. This is not the default behavior, so for each SWF you load you must create a LoaderContext object specifying the main application domain, and pass that LoaderContext object to the Loader.load() method call. If you attempt to load a SWF in an application domain other than the main SWF application domain, an error occurs. This is true even if the loaded SWF only contains visual assets and no ActionScript code.

The following example shows the code to use to load a SWF from the application package into the main SWF's application domain:

```actionscript
var loader:Loader = new Loader();
var url:URLRequest = new URLRequest("swfs/SecondarySwf.swf");
var loaderContext:LoaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, null);
loader.load(url, loaderContext);
```

A SWF file containing only assets and no code can be loaded from the application package or over a network. In either case, the SWF file must still be loaded into the main application domain.

For AIR versions prior to AIR 3.6, all code is stripped from SWFs other than the main application SWF during the compilation process. SWF files containing only visual assets can be included in the application package and loaded at runtime, but no code. If you attempt to load a SWF that contains ActionScript code, an error occurs. The error causes an “Uncompiled ActionScript” error dialog to appear in the application.
