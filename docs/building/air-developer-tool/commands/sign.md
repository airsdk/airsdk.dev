---
title: ADT -sign
sidebar_label: sign
sidebar_position: 3
---


The `-sign` command signs AIRI and ANE files.

The `-sign` command uses the following syntax:

```
adt -sign AIR_SIGNING_OPTIONS input output
```

### `AIR_SIGNING_OPTIONS`

The AIR signing options identify the certificate used to sign a package file. The signing options are fully described in [ADT code signing options](../option-sets/code-signing-options.md).

### `input`

The name of the AIRI or ANE file to sign.

### `output` 

The name of the signed package to create.

If an ANE file is already signed, the old signature is discarded. (AIR files cannot be resigned — to use a new signature for an application update, use the [`-migrate`](migrate.md) command.)

