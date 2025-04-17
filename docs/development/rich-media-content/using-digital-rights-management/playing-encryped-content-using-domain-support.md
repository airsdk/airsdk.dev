---
sidebar_position: 11
---

# Playing encrypted content using domain support

To play encrypted content using Adobe Access, perform the following steps:

1.  Using `VoucherAccessInfo.deviceGroup`, check if device group registration is
```
required.
```

2.  If authentication is required:

```
1.  Use the `DeviceGroupInfo.authenticationMethod` property find out if
```

        authentication is required.

```
2.  If authentication is required, authenticate the user by performing ONE
```

        of the following steps:

        - Obtain user's username and password. Invoke
          `DRMManager.authenticate(deviceGroup.serverURL, deviceGroup.domain, username, password)`.

        - Obtain a cached/pre-generated authentication token and invoke
          `DRMManager.setAuthenticationToken()`.

```
3.  Invoke `DRMManager.addToDeviceGroup()`.
```

3.  Get the voucher for the content by performing one of the following tasks:

```
1.  Use the `DRMManager.loadVoucher()` method.

2.  Obtain the voucher from a different device registered in the same device
```

        group. Provide the voucher to the `DRMManager` through the
        `DRMManager.storeVoucher()` method.

4.  Play the encrypted content using the `NetStream.play()` method.

To export the license for the content, any of the devices can provide the
license's raw bytes using the `DRMVoucher.toByteArray()` method after obtaining
the license from the Adobe Access License Server. Content providers typically
limit the number of devices in a device group. If the limit is reached, you may
need to call the `DRMManager.removeFromDeviceGroup()` method on an unused device
before registering the current device.
