---
sidebar_position: 6
---

# Working securely with untrusted content

Content not assigned to the application sandbox can provide additional scripting
functionality to your application, but only if it meets the security criteria of
the runtime. This topic explains the AIR security contract with non-application
content.

## Security.allowDomain()

AIR applications restrict scripting access for non-application content more
stringently than the Flash Player browser plug-in restricts scripting access for
untrusted content. For example, in Flash Player in the browser, when a SWF file
that is assigned to the `local-trusted` sandbox calls the `System.allowDomain()`
method, scripting access is granted to any SWF loaded from the specified domain.
The analogous approach is not permitted from `application` content in AIR
applications, since it would grant unreasonable access unto the non-application
file into the user's file system. Remote files cannot directly access the
application sandbox, regardless of calls to the `Security.allowDomain()` method.

## Scripting between application and non-application content

AIR applications that script between application and non-application content
have more complex security arrangements. Files that are not in the application
sandbox are only allowed to access the properties and methods of files in the
application sandbox through the use of a sandbox bridge. A sandbox bridge acts
as a gateway between application content and non-application content, providing
explicit interaction between the two files. When used correctly, sandbox bridges
provide an extra layer of security, restricting non-application content from
accessing object references that are part of application content.

The benefit of sandbox bridges is best illustrated through example. Suppose an
AIR music store application wants to provide an API to advertisers who want to
create their own SWF files, with which the store application can then
communicate. The store wants to provide advertisers with methods to look up
artists and CDs from the store, but also wants to isolate some methods and
properties from the third-party SWF file for security reasons.

A sandbox bridge can provide this functionality. By default, content loaded
externally into an AIR application at runtime does not have access to any
methods or properties in the main application. With a custom sandbox bridge
implementation, a developer can provide services to the remote content without
exposing these methods or properties. Consider the sandbox bridge as a pathway
between trusted and untrusted content, providing communication between loader
and loadee content without exposing object references.

For more information on how to securely use sandbox bridges, see
[Scripting between content in different domains](./scripting-between-content-in-different-domains.md).

## Protection against dynamically generating unsafe SWF content

The `Loader.loadBytes()` method provides a way for an application to generate
SWF content from a byte array. However, injection attacks on data loaded from
remote sources could do severe damage when loading content. This is especially
true when loading data into the application sandbox, where the generated SWF
content can access the full set of AIR APIs.

There are legitimate uses for using the `loadBytes()` method without generating
executable SWF code. You can use the `loadBytes()` method to generate an image
data to control the timing of image display, for example. There are also
legitimate uses that _do_ rely on executing code, such as dynamic creation of
SWF content for audio playback. In AIR, by default the `loadBytes()` method does
_not_ let you load SWF content; it only allows you to load image content. In
AIR, the `loaderContext` property of the `loadBytes()` method has an
`allowLoadBytesCodeExecution` property, which you can set to `true` to
explicitly allow the application to use `loadBytes()` to load executable SWF
content. The following code shows how to use this feature:

    var loader:Loader = new Loader();
    var loaderContext:LoaderContext = new LoaderContext();
    loaderContext.allowLoadBytesCodeExecution = true;
    loader.loadBytes(bytes, loaderContext);

If you call `loadBytes()` to load SWF content and the
`allowLoadBytesCodeExecution` property of the LoaderContext object is set to
`false` (the default), the Loader object throws a SecurityError exception.

Note: In a future release of Adobe AIR, this API may change. When that occurs,
you may need to recompile content that uses the `allowLoadBytesCodeExecution`
property of the LoaderContext class.
