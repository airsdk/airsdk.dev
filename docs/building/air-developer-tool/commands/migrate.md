---
title: ADT -migrate
sidebar_label: migrate
sidebar_position: 4
---

The `-migrate` command applies a migration signature to an AIR file. A migration signature must be used when you renew or change your digital certificate and need to update applications signed with the old certificate.

For more information about packaging AIR applications with a migration signature, see Signing an updated version of an AIR application.

:::note
The migration certificate must be applied within 365 days from the expiration of the certificate. Once this grace period has elapsed, your application updates can no longer be signed with a migration signature. Users can first update to a version of your application that was signed with a migration signature and then install the latest update, or they can uninstall the original application and install the new AIR package.
:::

To use a migration signature, first sign your AIR application using the new or renewed certificate (using the [`-package`](package) or [`-sign`](sign) commands), and then apply the migration signature using the old certificate and the `-migrate` command.

The -migrate command uses the following syntax:

```
adt -migrate AIR_SIGNING_OPTIONS input output
```

- `AIR_SIGNING_OPTIONS`: The AIR signing options identifying the original certificate that was used to sign existing versions of the AIR application. The signing options are fully described in [ADT code signing options](../option-sets/code-signing-options).

- `input`: The AIR file already signed with the NEW application certificate.

- `output`: The name of the final package bearing signatures from both the new and the old certificates.

The file names used for the input and output AIR files must be different.


:::note
The ADT migrate command cannot be used with AIR desktop applications that include native extensions, because those applications are packaged as native installers, not as `.air` files. To change certificates for an AIR desktop application that includes a native extension, package the application using the [ADT package command](package) with the `-migrate` flag.
:::