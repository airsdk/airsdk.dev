---
title: ADT -sign
sidebar_label: sign
sidebar_position: 3
---


The `-sign` command signs AIRI and ANE files.

The `-sign` command uses the following syntax:

```
adt -sign AIR_SIGNING_OPTIONS -target type input output
```

### `AIR_SIGNING_OPTIONS`

The AIR signing options identify the certificate used to sign a package file. The signing options are fully described in [ADT code signing options](../option-sets/code-signing-options.md).

### `-target`

This specifies the type of package which is being signed. If omitted, this assumes an AIRI file is provided in order to create an AIR package. Options are:
- `air`: provide an AIRI file as the input, creating a signed AIR file.
- `airn`: provide an AIRN file (a generic native installer package).
- `ane`: provide an ANE file to be signed.
- `bundle`: provide a MacOS .app bundle folder to be signed via the `codesign` tool (only on MacOS).

### `input`

The name of the package to sign.

### `output` 

The name of the signed package to create.

If an ANE file is already signed, the old signature is discarded. (AIR files cannot be resigned — to use a new signature for an application update, use the [`-migrate`](migrate.md) command.)

