---
title: Handling 1024bit Certificates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the past you may have been using a 1024bit certificate for signing your application. With the latest Java releases 1024bit certificates are no longer supported and as creating Android applications requires a newer version of Java you will need to update to a 2048bit certificate (or better).

To generate a new certificate you can use `adt` :

```
adt -certificate -cn ORG_NAME -validityPeriod 20 2048-RSA certificate.p12 PASSWORD
```

:::note
The latest version of Java that supports 1024 bit certificates is 1.8.0_112.
:::


An issue arises however with platforms that don't allow certificate changes, particularly with the Google Play Store. 

In this case the easiest approach is to update to Play App Signing and upload the old certificate for Google to automatically sign releases. You will create a new 2048 "upload certificate" which you will use for testing and uploading.


## Play App Signing

### Convert existing certificate

Firstly go through the process to [convert your existing certificates](packaging-android-app-bundles.md#converting-existing-certificates), including setting up "Play App Signing". When you reach the point of having to "Export and upload a key from Java keystore" it will likely fail as you cannot read your existing certificate using the latest Java.

You will need to ensure you have version 1.8.0_112 of the Java development kit installed on your machine, along with the current version you are using for AIR. You can find versions of the JDK [here](https://www.oracle.com/au/java/technologies/javase/javase8-archive-downloads.html).

Download the [`pepk.jar` tool](resources/pepk.jar.zip) java application and extract it to a known location. (This is an older version of the Google supplied tool that still supports java 1.8).


1. Change Java Environment

You will need to temporarily change your java version to use the version 1.8 you just installed:

<Tabs
  groupId="operating-system"
  defaultValue="macos"
  values={[
	{label: 'macOS', value: 'macos'},
	{label: 'Windows', value: 'windows'},
  ]}>

<TabItem value="macos" >

Open your terminal application, and set the environment to use Java 1.8:

```
export JAVA_HOME=`/usr/libexec/java_home -v1.8.0_112`
export JAVACMD=${JAVA_HOME}/bin/java
```

</TabItem>

<TabItem value="windows" >

There are different ways to temporarily change your java version depending on the terminal app you are using but the simplest way is to just change the global JAVA_HOME environment variable and then change it back when you create your upload certificate.

</TabItem>

</Tabs>

You can confirm by running `java -version` and you should see `1.8.0_112`.


2. Get the certificate alias

Get the alias (generally this value is `1` but you should confirm):

```
keytool -v -list -keystore Certificate.p12
```


3. Encrypt for uploading

Then run the tool (the encryption key should be listed on the play store page "Export and upload a key from Java keystore"):

```
java -jar pepk.jar  \
  --keystore=Certificate.p12 --alias=1 \
  --output=encrypted_certificate.zip \
  --encryptionkey=XXXX
```

This will create a `encrypted_certificate.zip` file which you can upload to the Play console.


### Create an upload certificate

:::danger Important
Do not skip this step when converting an old certificate. It is listed as optional in the documentation for Play App Signing but in this case it is required.
:::

Next you will need to create an upload certificate. This is the certificate you will use to sign your application with AIR for testing and uploading. This should be a newer 2048 bit certificate. 

Close the terminal that you temporarily changed the java version in the previous section and open a new terminal window, confirming your java version has returned to the latest. 

- Create a RSA 2048 certificate using `adt` (replace fields as required): 

```
adt -certificate \
	-cn "common name" \
	-validityPeriod 20 \
	2048-RSA \
	upload_certificate.p12 \
	PASSWORD
```

- Convert the `p12` to a `pem` file:

```
keytool -export -rfc \
		-keystore upload_certificate.p12 \
		-alias 1 \
		-file upload_certificate.pem
```

- Upload the `upload_certificate.pem` file as your upload certificate.

More details on the upload certificate can be found [here](packaging-android-app-bundles.md#upload-certificate) including how to change an upload certificate if you didn't create one when setting up Play App Signing.


:::note Debugging Services
Many Android services are tied to the signature of your application (you may have entered a fingerprint of your certificate when setting up a service). Services such as Firebase and Facebook use this signature to verify the request is coming from the correct application. 

When you are testing with the new upload certificate you may find some of the services are failing due to the signature mismatch. This won't affect your live application as Google is signing it with your original certificate, however to aid your testing it is recommended that you add an additional fingerprint for your new upload certificate to your service configuration.
:::

