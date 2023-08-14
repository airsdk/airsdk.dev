---
sidebar_position: 8
---

# Cross-scripting

If two SWF files written with ActionScript 3.0, or two HTML files running in AIR
are served from the same domain—for example, the URL for one SWF file is
http://www.example.com/swfA.swf and the URL for the other is
http://www.example.com/swfB.swf—then code defined in one file can examine and
modify variables, objects, properties, methods, and so on in the other, and vice
versa. This is called _cross-scripting_.

If the two files are served from different domains—for example,
http://siteA.com/swfA.swf and http://siteB.com/swfB.swf—then, by default, Flash
Player and AIR do not allow swfA.swf to script swfB.swf, nor swfB.swf to script
swfA.swf. A SWF file gives permission to SWF files from other domains by calling
`Security.allowDomain()`. By calling `Security.allowDomain("siteA.com")`,
swfB.swf gives SWF files from siteA.com permission to script it.

Cross-scripting is not supported between AVM1 SWF files and AVM2 SWF files. An
AVM1 SWF file is one created by using ActionScript 1.0 or ActionScript 2.0.
(AVM1 and AVM2 refer to the ActionScript Virtual Machine.) You can, however, use
the LocalConnection class to send data between AVM1 and AVM2.

In any cross-domain situation, it is important to be clear about the two parties
involved. For the purposes of this discussion, the side that is performing the
cross-scripting is called the _accessing party_ (usually the accessing SWF), and
the other side is called the _party being accessed_ (usually the SWF being
accessed). When siteA.swf scripts siteB.swf, siteA.swf is the accessing party,
and siteB.swf is the party being accessed, as the following illustration shows:

![](../img/sc_crossScript_load_popup.png)

Cross-domain permissions that are established with the `Security.allowDomain()`
method are asymmetrical. In the previous example, siteA.swf can script
siteB.swf, but siteB.swf cannot script siteA.swf, because siteA.swf has not
called the `Security.allowDomain()` method to give SWF files at siteB.com
permission to script it. You can set up symmetrical permissions by having both
SWF files call the `Security.allowDomain()` method.

In addition to protecting SWF files from cross-domain scripting originated by
other SWF files, Flash Player protects SWF files from cross-domain scripting
originated by HTML files. HTML-to-SWF scripting can occur with callbacks
established through the `ExternalInterface.addCallback()` method. When
HTML-to-SWF scripting crosses domains, the SWF file being accessed must call the
`Security.allowDomain()` method, just as when the accessing party is a SWF file,
or the operation will fail. For more information, see
[Author (developer) controls](./permission-controls.md#author-developer-controls).

Also, Flash Player provides security controls for SWF-to-HTML scripting. For
more information, see
[Controlling outbound URL access](./controlling-outbound-url-access.md).

## Stage security

Some properties and methods of the Stage object are available to any sprite or
movie clip on the display list.

However, the Stage object is said to have an owner: the first SWF file loaded.
By default, the following properties and methods of the Stage object are
available only to SWF files in the same security sandbox as the Stage owner:

|                          |                      |
| ------------------------ | -------------------- |
| Properties               | Methods              |
| `align`                  | `addChild()`         |
| displayState             | `addChildAt()`       |
| frameRate                | `addEventListener()` |
| `height`                 | `dispatchEvent()`    |
| `mouseChildren`          | `hasEventListener()` |
| `numChildren`            | `setChildIndex()`    |
| `quality`                | `willTrigger()`      |
| `scaleMode`              |                      |
| `showDefaultContextMenu` |                      |
| `stageFocusRect`         |                      |
| `stageHeight`            |                      |
| `stageWidth`             |                      |
| `tabChildren`            |                      |
| `textSnapshot`           |                      |
| `width`                  |                      |

In order for a SWF file in a sandbox other than that of the Stage owner to
access these properties and methods, the Stage owner SWF file must call the
`Security.allowDomain()` method to permit the domain of the external sandbox.
For more information, see
[Author (developer) controls](./permission-controls.md#author-developer-controls).

The `frameRate` property is a special case—any SWF file can read the `frameRate`
property. However, only those in the Stage owner's security sandbox (or those
granted permission by a call to the `Security.allowDomain()` method) can change
the property.

There are also restrictions on the `removeChildAt()` and `swapChildrenAt()`
methods of the Stage object, but these are different from the other
restrictions. Rather than needing to be in the same domain as the Stage owner,
to call these methods code must be in the same domain as the owner of the
affected child object(s), or the child object(s) can call the
`Security.allowDomain()` method.

## Traversing the display list

The ability of one SWF file to access display objects loaded from other
sandboxes is restricted. In order for a SWF file to access a display object
created by another SWF file in a different sandbox, the SWF file being accessed
must call the `Security.allowDomain()` method to permit access by the domain of
the accessing SWF file. For more information, see
[Author (developer) controls](./permission-controls.md#author-developer-controls).

To access a Bitmap object that was loaded by a Loader object, a URL policy file
must exist on the origin server of the image file, and that policy file must
grant permission to the domain of the SWF file trying to access the Bitmap
object (see
[Website controls (policy files)](./permission-controls.md#website-controls-policy-files)).

The LoaderInfo object that corresponds to a loaded file (and to the Loader
object) includes the following three properties, which define the relationship
between the loaded object and the Loader object: `childAllowsParent`,
`parentAllowsChild`, and `sameDomain`.

## Event security

Events related to the display list have security access limitations, based on
the sandbox of the display object that is dispatching the event. An event in the
display list has bubbling and capture phases (described in
[Handling events](../core-actionscript-classes/handling-events/index.md)).
During the bubbling and capture phases, an event migrates from the source
display object through parent display objects in the display list. If a parent
object is in a different security sandbox than the source display object, the
capture and bubble phase stops below that parent object, unless there is mutual
trust between the owner of the parent object and the owner of the source object.
This mutual trust can be achieved by the following:

1.  The SWF file that owns the parent object must call the
    `Security.allowDomain()` method to trust the domain of the SWF file that
    owns the source object.

2.  The SWF file that owns the source object must call the
    `Security.allowDomain()` method to trust the domain of the SWF file that
    owns the parent object.

The LoaderInfo object that corresponds to a loaded file (and to the Loader
object) includes the following two properties, which define the relationship
between the loaded object and the Loader object: `childAllowsParent` and
`parentAllowsChild`.

For events that are dispatched from objects other than display objects, there
are no security checks or security-related implications.
