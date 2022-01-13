---
title: ADT Native extension options
sidebar_label: Native extension 
sidebar_position: 5
---

The native extension options specify the options and files for packaging an ANE file for a native extension. Use these options with an ADT package command in which the `-target` option is `ane`.

```
extension-descriptor -swc swcPath 
  -platform platformName 
  -platformoptions path/platform.xml 
   FILE_OPTIONS
```

- `extension-descriptor`: The descriptor file for the native extension.

- `-swc`: The SWC file containing the ActionScript code and resources for the native extension.

- `-platform`: The name of the platform that this ANE file supports. You can include multiple -platform options, each with its own FILE_OPTIONS.

- `-platformoptions`: The path to a platform options (platform.xml) file. Use this file to specify non-default linker options, shared libraries, and third-party static libraries used by the extension. For more information and examples, see iOS native libraries.

- `FILE_OPTIONS`: Identifies the native platform files to include in the package, such as static libraries to include in the native extension package. The file options are fully described in [File and path options](file-and-path-options). (Note that the `-e` option cannot be used when packaging an ANE file.)


