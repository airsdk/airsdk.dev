---
sidebar_position: 15
---

# Shared objects

Flash Player provides the ability to use _shared objects_ , which are
ActionScript objects that persist outside of a SWF file, either locally on a
user's file system or remotely on an RTMP server. Shared objects, like other
media in Flash Player, are partitioned into security sandboxes. However, the
sandbox model for shared objects is somewhat different, because shared objects
are not resources that can ever be accessed across domain boundaries. Instead,
shared objects are always retrieved from a shared object store that is
particular to the domain of each SWF file that calls methods of the SharedObject
class. Usually a shared object store is even more particular than a SWF file's
domain: by default, each SWF file uses a shared object store particular to its
entire origin URL. For more information on shared objects, see
[Shared objects](../files-and-data/storing-local-data/shared-objects.md).

A SWF file can use the `localPath` parameter of the `SharedObject.getLocal()`
and `SharedObject.getRemote()` methods to use a shared object store associated
with only a part of its URL. In this way, the SWF file can permit sharing with
other SWF files from other URLs. Even if you pass `'/'` as the `localPath`
parameter, this still specifies a shared object store particular to its own
domain.

Users can restrict shared object access by using the Flash Player Settings
dialog box or the Settings Manager. By default, shared objects can be created up
to a maximum of 100 KB of data per domain. Administrative users and users can
also place restrictions on the ability to write to the file system. For more
information, see
[Administrator controls](./permission-controls.md#administrator-controls) and
[User controls](./permission-controls.md#user-controls).

You can specify that a shared object is secure, by specifying `true` for the
`secure` parameter of the `SharedObject.getLocal()` method or the
`SharedObject.getRemote()` method. Note the following about the `secure`
parameter:

- If this parameter is set to `true`, Flash Player creates a new secure shared
  object or gets a reference to an existing secure shared object. This secure
  shared object can be read from or written to only by SWF files delivered over
  HTTPS that call `SharedObject.getLocal()` with the `secure` parameter set to
  `true`.

- If this parameter is set to `false`, Flash Player creates a new shared object
  or gets a reference to an existing shared object that can be read from or
  written to by SWF files delivered over non-HTTPS connections.

If the calling SWF file is not from an HTTPS URL, specifying `true` for the
`secure` parameter of the `SharedObject.getLocal()` method or the
`SharedObject.getRemote()` method results in a SecurityError exception.

The choice of a shared object store is based on a SWF file's origin URL. This is
true even in the two situations where a SWF file does not originate from a
simple URL: import loading and dynamic loading. Import loading refers to the
situation where you load a SWF file with the `LoaderContext.securityDomain`
property set to `SecurityDomain.currentDomain`. In this situation, the loaded
SWF file will have a pseudo-URL that begins with its loading SWF file's domain
and then specifies its actual origin URL. Dynamic loading refers to the loading
of a SWF file using the `Loader.loadBytes()` method. In this situation, the
loaded SWF file will have a pseudo-URL that begins with its loading SWF file's
full URL followed by an integer ID. In both the import loading and dynamic
loading cases, a SWF file's pseudo-URL can be examined using the
`LoaderInfo.url` property. The pseudo-URL is treated exactly like a real URL for
the purposes of choosing a shared object store. You can specify a shared object
`localPath` parameter that uses part or all of the pseudo-URL.

Users and administrators can elect to disable the use of _third-party shared
objects_. This is the usage of shared objects by any SWF file that is executing
in a web browser, when that SWF file's origin URL is from a different domain
than the URL shown in the browser's address bar. Users and administrators may
choose to disable third-party shared object usage for reasons of privacy,
wishing to avoid cross-domain tracking. In order to avoid this restriction, you
may wish to ensure that any SWF file using shared objects is loaded only within
HTML page structures that ensure that the SWF file comes from the same domain as
is shown in the browser's address bar. When you attempt to use shared objects
from a third-party SWF file, and third-party shared object use is disabled, the
`SharedObject.getLocal()` and `SharedObject.getRemote()` methods return `null`.
For more information, see
[www.adobe.com/products/flashplayer/articles/thirdpartylso](https://www.adobe.com/products/flashplayer/articles/thirdpartylso).
