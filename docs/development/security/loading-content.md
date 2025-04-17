---
sidebar_position: 7
---

# Loading content

Flash Player and AIR content can load many types of other content, including the
following:

- SWF files

- Images

- Sound

- Video

- HTML files (AIR only)

- JavaScript (AIR only)

<!-- -->

## Loading SWF files and images with the Loader class

You use the Loader class to load SWF files and images (JPG, GIF, or PNG files).
Any SWF file, other than one in the local-with-filesystem sandbox, can load SWF
files and images from any network domain. Only SWF files in local sandboxes can
load SWF files and images from the local file system. However, files in the
local-with-networking sandbox can only load local SWF files that are in the
local-trusted or local-with-networking sandbox. SWF files in the
local-with-networking sandbox load local content other than SWF files (such as
images), however they cannot access data in the loaded content.

When loading a SWF file from a non-trusted source (such as a domain other than
that of the Loader object's root SWF file), you may want to define a mask for
the Loader object, to prevent the loaded content (which is a child of the Loader
object) from drawing to portions of the Stage outside of that mask, as in the
following code:

```
import flash.display.*;
import flash.net.URLRequest;
var rect:Shape = new Shape();
rect.graphics.beginFill(0xFFFFFF);
rect.graphics.drawRect(0, 0, 100, 100);
addChild(rect);
var ldr:Loader = new Loader();
ldr.mask = rect;
var url:String = "http://www.unknown.example.com/content.swf";
var urlReq:URLRequest = new URLRequest(url);
ldr.load(urlReq);
addChild(ldr);
```

When you call the `load()` method of the Loader object, you can specify a
`context` parameter, which is a LoaderContext object. The LoaderContext class
includes three properties that let you define the context of how the loaded
content can be used:

- `checkPolicyFile`: Use this property only when loading an image file (not a
  SWF file). Specify this for an image file from a domain other than that of the
  file containing the Loader object. If you set this property to `true`, the
  Loader checks the origin server for a URL policy file (see
  [Website controls (policy files)](./permission-controls.md#website-controls-policy-files)).
  If the server grants permission to the Loader domain, ActionScript from SWF
  files in the Loader domain can access data in the loaded image. In other
  words, you can use the `Loader.content` property to obtain a reference to the
  Bitmap object that represents the loaded image, or the `BitmapData.draw()` or
  `BitmapData.drawWithQuality()` methods to access pixels from the loaded image.
  The `drawWithQuality` method is available in Flash Player 11.3 and higher; AIR
  3.3 and higher.

- `securityDomain`: Use this property only when loading a SWF file (not an
  image). Specify this for a SWF file from a domain other than that of the file
  containing the Loader object. Only two values are currently supported for the
  `securityDomain` property: `null` (the default) and
  `SecurityDomain.currentDomain`. If you specify `SecurityDomain.currentDomain`,
  this requests that the loaded SWF file be _imported_ to the sandbox of the
  loading SWF file, meaning that it operates as though it had been loaded from
  the loading SWF file's own server. This is only permitted if a URL policy file
  is found on the loaded SWF file's server, allowing access by the loading SWF
  file's domain. If the required policy file is found, the loader and loadee can
  freely script each other once the load begins, since they are in the same
  sandbox. Note that sandbox importing can mostly be replaced by performing an
  ordinary load and then having the loaded SWF file call the
  `Security.allowDomain()` method. This latter method may be easier to use,
  since the loaded SWF file will then be in its own natural sandbox, and thus
  able to access resources on its own actual server.

- `applicationDomain`: Use this property only when loading a SWF file written in
  ActionScript 3.0 (not an image or a SWF file written in ActionScript 1.0 or
  2.0). When loading the file, you can specify that the file be placed into a
  particular application domain, rather than the default of being placed in a
  new application domain that is a child of the loading SWF file's application
  domain. Note that application domains are subunits of security domains, and
  thus you can specify a target application domain only if the SWF file that you
  are loading is from your own security domain, either because it is from your
  own server, or because you have successfully imported it into your security
  domain using the `securityDomain` property. If you specify an application
  domain but the loaded SWF file is part of a different security domain, the
  domain you specify in `applicationDomain` is ignored. For more information,
  see
  [Working with application domains](../core-actionscript-classes/working-with-application-domains.md).

For details, see
[Specifying loading context](../display/display-programming/loading-display-content-dynamically.md#specifying-loading-context).

An important property of a Loader object is the `contentLoaderInfo` property,
which is a LoaderInfo object. Unlike most other objects, a LoaderInfo object is
shared between the loading SWF file and the loaded content, and it is always
accessible to both parties. When the loaded content is a SWF file, it can access
the LoaderInfo object through the `DisplayObject.loaderInfo` property.
LoaderInfo objects include information such as load progress, the URLs of loader
and loadee, the trust relationship between loader and loadee, and other
information. For more information, see
[Monitoring loading progress](../display/display-programming/loading-display-content-dynamically.md#monitoring-loading-progress).

## Loading sound and videos

Any content, except content in the local-with-filesystem sandbox, is allowed to
load sound and video from network origins, using the `Sound.load()`,
`NetConnection.connect()`, and `NetStream.play()` methods.

Only content in the local-with-filesystem and AIR application sandboxes can load
media from the local file system. Only content in the local-with-filesystem
sandbox, the AIR application sandbox, or the local-trusted sandbox can access
data in these loaded files.

There are other restrictions on accessing data from loaded media. For details,
see [Accessing loaded media as data](./accessing-loaded-media-as-data.md).

## Loading SWF files and images using the \<img\> tag in a text field

You can load SWF files and bitmaps into a text field by using the `<img>` tag,
as in the following code:

```
<img src = 'filename.jpg' id = 'instanceName' >
```

You can access content loaded this way by using the `getImageReference()` method
of the TextField instance, as in the following code:

```
var loadedObject:DisplayObject = myTextField.getImageReference('instanceName');
```

Note, however, that SWF files and images loaded in this way are put in the
sandbox that corresponds to their origin.

When you load an image file using an `<img>` tag in a text field, access to the
data in the image may be permitted by a URL policy file. You can check for a
policy file by adding a `checkPolicyFile` attribute to the `<img>` tag, as in
the following code:

```
<img src = 'filename.jpg' checkPolicyFile = 'true' id = 'instanceName' >
```

When you load a SWF using an `<img>` tag in a text field, you can permit access
to that SWF file's data through a call to the `Security.allowDomain()` method.

When you use an `<img>` tag in a text field to load an external file (as opposed
to using a Bitmap class embedded within your SWF), a Loader object is
automatically created as a child of the TextField object, and the external file
is loaded into that Loader just as if you had used a Loader object in
ActionScript to load the file. In this case, the `getImageReference()` method
returns the Loader that was automatically created. No security check is needed
to access this Loader object because it is in the same security sandbox as the
calling code.

However, when you refer to the `content` property of the Loader object to access
the loaded media, security rules apply. If the content is an image, you need to
implement a URL policy file, and if the content is a SWF file, you need to have
the code in the SWF file call the `allowDomain()` method.

#### Adobe AIR

In the application sandbox, \<img\> tags in a text field are ignored to prevent
phishing attacks. In addition, code running in the application sandbox is not
permitted to call the Security `allowDomain()` method.

## Content delivered using RTMP servers

Flash Media Server uses the Real-Time Media Protocol (RTMP) to serve data,
audio, and video. You can load this media by using the `connect()` method of the
NetConnection class, passing an RTMP URL as the parameter. Flash Media Server
can restrict connections and prevent content from downloading, based on the
domain of the requesting file. For details, see the Flash Media Server
documentation online at
[www.adobe.com/go/learn_fms_docs_en](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).

To use the `BitmapData.draw()`, `BitmapData.drawWithQuality()`, and
`SoundMixer.computeSpectrum()` methods to extract run-time graphics and sound
data from RTMP streams, you must allow access on the server. Use the Server-Side
ActionScript `Client.videoSampleAccess` and `Client.audioSampleAccess`
properties to allow access to specific directories on Flash Media Server. For
more information, see the
[Server-Side ActionScript Language Reference](https://web.archive.org/web/20150702070954/http://www.adobe.com/support/documentation/en/flashmediaserver/).
(The `drawWithQuality` method is available in Flash Player 11.3 and higher; AIR
3.3 and higher.)
