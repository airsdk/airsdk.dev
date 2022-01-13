---
title: ADT -prepare
sidebar_label: prepare
sidebar_position: 2
---

The `-prepare` command creates an unsigned AIRI package. An AIRI package cannot be used on its own. Use the [`-sign`](sign) command to convert an AIRI file to a signed AIR package, or the package command to convert the AIRI file to a native package.

The `-prepare` command uses the following syntax:

```
adt -prepare output app_descriptor FILE_OPTIONS 
```

- `output`: The name of the AIRI file that is created.

- `app_descriptor`: The path to the application descriptor file. The path can be specified relative to the current directory or as an absolute path. (The application descriptor file is renamed as application.xml in the AIR file.)

- `FILE_OPTIONS`: Identifies the application files to include in the package. The file options are fully described in [File and path options](../option-sets/file-and-path-options).

