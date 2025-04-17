---
sidebar_position: 2
---

# Encrypted local storage

The
[EncryptedLocalStore](https://airsdk.dev/reference/actionscript/3.0/flash/data/EncryptedLocalStore.html)
class (ELS) provides an encrypted local storage mechanism that you can be use as
a small cache for an application's private data. ELS data cannot be shared
between applications. The intent of ELS is to allow an application to store
easily recreated items such as login credentials and other private information.
ELS data should not be considered as permanent, as outlined in "Limitations of
the encrypted local store" and "Best practices," below.

Note: In addition to the encrypted local store, AIR also provides encryption for
content stored in SQL databases. For details, see
[Using encryption with SQL databases](../working-with-local-sql-databases-in-air/using-encryption-with-sql-databases.md).

You may want to use the encrypted local store to cache information that must be
secured, such as login credentials for web services. The ELS is appropriate for
storing information that must be kept private from other users. It does not,
however, protect the data from other processes run under the same user account.
It is thus not appropriate for protecting secret application data, such as DRM
or encryption keys.

On desktop platforms, AIR uses DPAPI on Windows, KeyChain on Mac OS and iOS, and
KeyRing or KWallet on Linux to associate the encrypted local store to each
application and user. The encrypted local store uses AES-CBC 128-bit encryption.

On Android, the data stored by the EncryptedLocalStorage class are not
encrypted. Instead the data is protected by the user-level security provided by
the operating system. The Android operating system assigns every application a
separate user ID. Applications can only access their own files and files created
in public locations (such as the removable storage card). Note that on "rooted"
Android devices, applications running with root privileges CAN access the files
of other applications. Thus on a rooted device, the encrypted local store does
not provide as high a level of data protection as it does on on a non-rooted
device.

Information in the encrypted local store is only available to AIR application
content in the application security sandbox.

If you update an AIR application, the updated version retains access to any
existing data in the encrypted local store unless:

- The items were added with the `stronglyBound` parameter set to `true`

- The existing and update versions are both published prior to AIR 1.5.3 and the
  update is signed with a migration signature.

#### Limitations of the encrypted local store

The data in the encrypted local store is protected by the user's operating
system account credentials. Other entities cannot access the data in the store
unless they can login as that user. However, the data is not secure against
access by other applications run by an authenticated user.

Because the user must be authenticated for these attacks to work, the user's
private data is still protected (unless the user account itself is compromised).
However, data that your application may want to keep secret from users, such as
keys used for licensing or digital rights management, is not secure. Thus the
ELS is not an appropriate location for storing such information. It is only an
appropriate place for storing a user's private data, such as passwords.

Data in the ELS can be lost for a variety of reasons. For example, the user
could uninstall the application and delete the encrypted file. Or, the publisher
ID could be changed as a result of an update. Thus the ELS should be treated as
a private cache, not a permanent data storage.

The `stronglyBound` parameter is deprecated and should not be set to `true`.
Setting the parameter to `true` does not provide any additional protection for
data. At the same time, access to the data is lost whenever the application is
updated — even if the publisher ID stays the same.

The encrypted local store may perform more slowly if the stored data exceeds
10MB.

When you uninstall an AIR application, the uninstaller does not delete data
stored in the encrypted local store.

**Best practices**

The best practices for using the ELS include:

- Use the ELS to store sensitive user data such as passwords (setting
  stronglyBound to false)

- Do not use the ELS to store applications secrets such as DRM keys or licensing
  tokens.

- Provide a way for your application to recreate the data stored in the ELS if
  the ELS data is lost. For example, by prompting the user to re-enter their
  account credentials when necessary.

- Do not use the `stronglyBound` parameter.

- If you do set `stronglyBound` to `true`, do not migrate stored items during an
  update. Recreate the data after the update instead.

- Only store relatively small amounts of data. For larger amounts of data, use
  an AIR SQL database with encryption.

## Adding data to the encrypted local store

Use the `setItem()` static method of the EncryptedLocalStore class to store data
in the local store. The data is stored in a hash table, using strings as keys,
with the data stored as byte arrays.

For example, the following code stores a string in the encrypted local store:

```
var str:String = "Bob";
var bytes:ByteArray = new ByteArray();
bytes.writeUTFBytes(str);
EncryptedLocalStore.setItem("firstName", bytes);
```

The third parameter of the `setItem()` method, the `stronglyBound` parameter, is
optional. When this parameter is set to `true`, the encrypted local store binds
the stored item to the storing AIR application's digital signature and bits:

```
var str:String = "Bob";
var bytes:ByteArray = new ByteArray();
bytes.writeUTFBytes(str);
EncryptedLocalStore.setItem("firstName", bytes, false);
```

For an item that is stored with `stronglyBound` set to `true`, subsequent calls
to `getItem()` only succeed if the calling AIR application is identical to the
storing application (if no data in files in the application directory have
changed). If the calling AIR application is different from the storing
application, the application throws an Error exception when you call `getItem()`
for a strongly bound item. If you update your application, it will not be able
to read strongly bound data previously written to the encrypted local store.
Setting `stronglyBound` to `true` on mobile devices is ignored; the parameter is
always treated as `false`.

If the `stronglyBound` parameter is set to `false` (the default), only the
publisher ID needs to stay the same for the application to read the data. The
bits of the application may change (and they need to be signed by the same
publisher), but they do not need to be the exact same bits as were in
application that stored the data. Updated applications with the same publisher
ID as the original can continue to access the data.

Note: In practice, setting `stronglyBound` to `true` does not add any additional
data protection. A "malicious" user could still alter an application to gain
access to items stored in the ELS. Furthermore, data is protected from external,
non-user threats just as strongly whether `stronglyBound` is set to `true` or
`false`. For these reasons, setting `stronglyBound` to `true` is discouraged.

## Accessing data in the encrypted local store

You can retrieve a value from the encrypted local store by using the
`EncryptedLocalStore.getItem()` method, as in the following example:

```
var storedValue:ByteArray = EncryptedLocalStore.getItem("firstName");
trace(storedValue.readUTFBytes(storedValue.length)); // "Bob"
```

## Removing data from the encrypted local store

You can delete a value from the encrypted local store by using the
`EncryptedLocalStore.removeItem()` method, as in the following example:

```
EncryptedLocalStore.removeItem("firstName");
```

You can clear all data from the encrypted local store by calling the
`EncryptedLocalStore.reset()` method, as in the following example:

```
EncryptedLocalStore.reset();
```

More Help topics

![](../../img/flashplatformLinkIndicator.png)
[flash.data.EncryptedLocalStore](https://airsdk.dev/reference/actionscript/3.0/flash/data/EncryptedLocalStore.html)

![](../../img/airLinkIndicator.png)
[About AIR publisher identifiers](https://web.archive.org/web/20220826032343/https://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff0.html#WS5b3ccc516d4fbf351e63e3d118666ade46-7cca)
