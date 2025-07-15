---
title: ADT File and Path options
sidebar_label: File and path
sidebar_position: 2
---

The file and path options specify all the files that are included in the package. The file and path options use the following syntax:

```
files_and_dirs -C dir files_and_dirs -e file_or_dir dir -extdir dir
```

### `files_and_dirs`

The files and directories to package in the AIR file. Any number of files and directories can be specified, delimited by whitespace. If you list a directory, all files and subdirectories within, except hidden files, are added to the package. (In addition, if the application descriptor file is specified, either directly, or through wildcard or directory expansion, it is ignored and not added to the package a second time.) Files and directories specified must be in the current directory or one of its subdirectories. Use the -C option to change the current directory.

:::info Important
Wild cards cannot be used in the `file_or_dir` arguments following the `–C` option. (Command shells expand the wildcards before passing the arguments to ADT, which causes ADT to look for files in the wrong location.) You can, however, still use the dot character, ".", to stand for the current directory. For example: `-C assets .` copies everything in the `assets` directory, including any subdirectories, to the root level of the application package.
:::

### `-C dir files_and_dirs` 

Changes the working directory to the value of `dir` before processing subsequent files and directories added to the application package (specified in `files_and_dirs`). The files or directories are added to the root of the application package. The `–C` option can be used any number of times to include files from multiple points in the file system. If a relative path is specified for `dir`, the path is always resolved from the original working directory.

As ADT processes the files and directories included in the package, the relative paths between the current directory and the target files are stored. These paths are expanded into the application directory structure when the package is installed. Therefore, specifying `-C release/bin lib/feature.swf` places the file `release/bin/lib/feature.swf` in the lib subdirectory of the root application folder.

### `-e file_or_dir dir`

Places the file or directory into the specified package directory. This option cannot be used when packaging an ANE file.

:::note
The `<content>` element of the application descriptor file must specify the final location of the main application file within the application package directory tree.
:::

### `-resdir dir`

The value of `dir` is the name of a directory that contains Android resources that should be included in the target package. This option can be used to quickly include custom resources, see [Custom Resources](../../../tutorials/platform/android/custom-resources).

### `-extdir dir`

The value of `dir` is the name of a directory to search for native extensions (ANE files). Specify either an absolute path, or a path relative to the current directory. You can specify the `-extdir` option multiple times.

The specified directory contains ANE files for native extensions that the application uses. Each ANE file in this directory has the `.ane` filename extension. However, the filename before the `.ane` filename extension does not have to match the value of the `extensionID` element of the application descriptor file.

For example, if you use `-extdir ./extensions`, the directory extensions can look like the following:

```
extensions/
extension1.ane
extension2.ane
```

:::note
The use of the `-extdir` option is different for the ADT tool and the ADL tool. In ADL, the option specifies a directory that contains subdirectories, each containing an unpackaged ANE file. In ADT, the options specifies a directory that contains ANE files.
:::
