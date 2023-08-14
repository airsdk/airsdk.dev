---
sidebar_position: 11
---

# Loading embedded content from SWF files imported into a security domain

When you load a SWF file, you can set the `context` parameter of the `load()`
method of the Loader object that is used to load the file. This parameter takes
a LoaderContext object. When you set the `securityDomain` property of this
LoaderContext object to `Security.currentDomain`, Flash Player checks for a URL
policy file on the server of the loaded SWF file. If there is a policy file, and
it grants access to the domain of the loading SWF file, you can load the SWF
file as imported media. In this way, the loading file can get access to objects
in the library of the SWF file.

An alternative way for a SWF file to access classes in loaded SWF files from a
different security sandbox is to have the loaded SWF file call the
`Security.allowDomain()` method to grant access to the domain of the calling SWF
file. You can add the call to the `Security.allowDomain()` method to the
constructor method of the main class of the loaded SWF file, and then have the
loading SWF file add an event listener to respond to the `init` event dispatched
by the `contentLoaderInfo` property of the Loader object. When this event is
dispatched, the loaded SWF file has called the `Security.allowDomain()` method
in the constructor method, and classes in the loaded SWF file are available to
the loading SWF file. The loading SWF file can retrieve classes from the loaded
SWF file by calling `Loader.contentLoaderInfo.applicationDomain.getDefinition()`
or `Loader.contentLoaderInfo.applicationDomain.getQualifiedDefinitionNames()`
(Flash Player 11.3 and higher; AIR 3.3 and higher).
