---
title: encryptedLocalStorage
sidebar_position: 4
---

The `encryptedLocalStorage` element provides details about how the AIR runtime should handle some of the features and mechanisms used for Encrypted Local Storage.

This provides a mechanism for applications to store sensitive details for a user, in a way that cannot be accessed by other users - or by other applications, without the user being complicit.

Note that the user - or an administrator - may be able to get information from which to decrypt some of the data, so this is not 100% secure, but is intended to limit programmatic access only to the intended user.

This element, and its contents, are all optional. Default values are defined below.

#### Example

```xml
<encryptedLocalStorage> 
    <fallbackMode>once</fallbackMode> 
    <storageMode>file</storageMode> 
</encryptedLocalStorage>
```


### `fallbackMode`

The value specified for the fallback mode may be `never`, `always`, or `once`.

Fallback is used if the application calls `getItem` on an encrypted local store, and the requested item is not found in the new (AIR 51) ELS storage location.

It is also invoked when an element is removed (to remove it from the fallback store location as well as the new ELS storage), and when an item is set (it is removed from the fallback store whilst being set in the new ELS storage).

  - `always` (default) - the fallback location is always checked if a data request could not be found from the newer ELS storage location.
  - `never` - the fallback location is never invoked. Data that may have been stored by versions of the application that used earlier AIR SDK versions will not be accessible.
  - `once` - the fallback location is available during the first run of an application that uses ELS functions. So for example this could be used to migrate data from the fallback store location to the new ELS storage.

Once an application has been closed and the new ELS data written, any application with `once` as the fallback mode will no longer be able to read from the fallback storage.


### `storageMode`

The value specified for the storage mode may be `os_store` or `file`.

Storage mode refers to how the ELS system stores the user-specific encryption key that is used when securing the application data. It does not change the mechanisms used for the ELS data store itself: the latest mechanism is always chosen when writing new data.

  - `os_store` (default) — the ELS key is stored in operating system specific secure storage. This uses different mechanisms - Windows Credential Manager, MacOS KeyChain storage, Linux LibSecret, Android private mode storage.
  - `file` - the ELS key is stored in a file in a user-private location on the file system. Generally this will be in the user's private application storage folders but the paths may vary.

One of the reasons for using `file` storage is to eliminate any possibility that the OS-specific key storage mechanism could prompt for user input unexpectedly, which can lead to unnecessary confusion.

