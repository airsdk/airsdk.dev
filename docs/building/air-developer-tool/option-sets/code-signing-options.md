---
title: ADT code signing options
sidebar_label: Code signing
sidebar_position: 1
---

ADT uses the Java Cryptography Architecture (JCA) to access private keys and certificates for signing AIR applications. The signing options identify the keystore and the private key and certificate within that keystore.

The keystore must include both the private key and the associated certificate chain. If the signing certificate chains to a trusted certificate on a computer, then the contents of the common name field of the certificate is displayed as the publisher name on the AIR installation dialog.

ADT requires that the certificate conform to the x509v3 standard ([RFC3280](http://tools.ietf.org/html/rfc3280)) and include the Extended Key Usage extension with the proper values for code signing. Constraints defined within the certificate are respected and could preclude the use of some certificates for signing AIR applications.

:::note
ADT uses the Java runtime environment proxy settings, when appropriate, for connecting to Internet resources for checking certificate revocation lists and obtaining time-stamps. If you encounter problems connecting to these Internet resources when using ADT and your network requires specific proxy settings, you may need to configure the JRE proxy settings.
:::

## AIR signing options syntax

The signing options use the following syntax (on a single command line):

```
-alias aliasName
-storetype type
-keystore path
-storepass password1
-keypass password2
-providerName className
-tsa url
```

### `-alias` 

The alias of a key in the keystore. Specifying an alias is not necessary when a keystore only contains a single certificate. If no alias is specified, ADT uses the first key in the keystore.

Not all keystore management applications allow an alias to be assigned to certificates. When using the Windows system keystore, for example, use the distinguished name of the certificate as the alias. You can use the Java Keytool utility to list the available certificates so that you can determine the alias. For example, running the command:

```
keytool -list -storetype Windows-MY
```

produces output like the following for a certificate:

```
CN=TestingCert,OU=QE,O=Adobe,C=US, PrivateKeyEntry,
Certificate fingerprint (MD5): 73:D5:21:E9:8A:28:0A:AB:FD:1D:11:EA:BB:A7:55:88
```

To reference this certificate on the ADT command line, set the alias to:

```
CN=TestingCert,OU=QE,O=Adobe,C=US
```

On Mac OS X, the alias of a certificate in the Keychain is the name displayed in the Keychain Access application.

### `-storetype`

The type of keystore, determined by the keystore implementation. The default keystore implementation included with most installations of Java supports the JKS and PKCS12 types. Java 5.0 includes support for the PKCS11 type, for accessing keystores on hardware tokens, and Keychain type, for accessing the Mac OS X keychain. Java 6.0 includes support for the MSCAPI type (on Windows). If other JCA providers have been installed and configured, additional keystore types might be available. If no keystore type is specified, the default type for the default JCA provider is used.

| Store type                 | Keystore format                | Minimum Java version |
| -------------------------- | ------------------------------ | -------------------- |
| JKS                        | Java keystore file (.keystore) | 1.2                  |
| PKCS12                     | PKCS12 file (.p12 or .pfx)     | 1.4                  |
| PKCS11                     | Hardware token                 | 1.5                  |
| KeychainStore              | Mac OS X Keychain              | 1.5                  |
| Windows-MY or Windows-ROOT | MSCAPI                         | 1.6                  |

### `-keystore` 

The path to the keystore file for file-based store types.

### `-storepass`

The password required to access the keystore. If not specified, ADT prompts for the password.

### `-keypass`

The password required to access the private key that is used to sign the AIR application. If not specified, ADT prompts for the password.

:::note
If you enter a password as part of the ADT command, the password characters are saved in the command-line history. Therefore, using the `-keypass` or `-storepass` options is not recommended when the security of the certificate is important. Also note that when you omit the password options, the characters you type at the password prompts are not displayed (for the same security reasons). Simply type the password and press the Enter key.
:::

### `-providerName`

The JCA provider for the specified keystore type. If not specified, then ADT uses the default provider for that type of keystore.

### `-tsa` 

Specifies the URL of an [RFC3161](http://www.ietf.org/rfc/rfc3161.txt)-compliant timestamp server to time-stamp the digital signature. If no URL is specified, a default time-stamp server provided by Geotrust is used. When the signature of an AIR application is time-stamped, the application can still be installed after the signing certificate expires, because the timestamp verifies that the certificate was valid at the time of signing.

If ADT cannot connect to the time-stamp server, then signing is canceled and no package is produced. Specify -tsa none to disable time-stamping. However, an AIR application packaged without a timestamp ceases to be installable after the signing certificate expires.

:::note
Many of the signing options are equivalent to the same option of the Java Keytool utility. You can use the Keytool utility to examine and manage keystores on Windows. The Apple® security utility can also be used for this purpose on Mac OS X.
:::

### `-provisioning-profile` 

The Apple iOS provisioning file. (Required for packaging iOS applications, only.)


## Signing option examples

Signing with a .p12 file:

```
-storetype pkcs12 -keystore cert.p12
```

Signing with the default Java keystore:

```
-alias AIRcert -storetype jks
```

Signing with a specific Java keystore:

```
-alias AIRcert -storetype jks -keystore certStore.keystore
```

Signing with the Mac OS X keychain:

```
-alias AIRcert -storetype KeychainStore -providerName Apple
```

Signing with the Windows system keystore:

```
-alias cn=AIRCert -storeype Windows-MY
```

Signing with a hardware token (refer to the token manufacturer’s instructions on configuring Java to use the token and for the correct `providerName` value):

```
-alias AIRCert -storetype pkcs11 -providerName tokenProviderName
```

Signing without embedding a timestamp:

```
-storetype pkcs12 -keystore cert.p12 -tsa none
```
