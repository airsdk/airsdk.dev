---
title: ADT -certificate
sidebar_label: certificate
sidebar_position: 6
---

The `-certificate` command lets you create a self-signed digital code signing certificate. The command uses the following syntax:

```
adt -certificate 
	-cn name 
	-ou orgUnit 
	-o orgName 
	-c country 
	-validityPeriod years 
	key-type 
	output 
	password
```

### `-cn`

The string assigned as the common name of the new certificate.

### `-ou`

A string assigned as the organizational unit issuing the certificate. (Optional.)

### `-o`

A string assigned as the organization issuing the certificate. (Optional.)

### `-c`

A two-letter ISO-3166 country code. A certificate is not generated if an invalid code is supplied. (Optional.)

### `-validityPeriod`

The number of years that the certificate will be valid. If not specified a validity of five years is assigned. (Optional.)

### `key_type`

The type of key to use for the certificate is 2048-RSA.

### `output`

The path and file name for the certificate file to be generated.

### `password`

The password for accessing the new certificate. The password is required when signing AIR files with this certificate.