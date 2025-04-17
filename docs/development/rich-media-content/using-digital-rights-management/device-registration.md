# Device registration

The DRM vouchers are bound to the end user’s machine. Hence Flash /AIR
applications will need a unique ID for the user’s machine to refer to the right
serialized DRM voucher object. The following scenario depicts a device
registration process:

Assuming that you have performed the following tasks:

- You have set up the Adobe Access Server SDK.

- You have set up an HTTP server for obtaining pre-generated licenses.

- You have created a Flash application to view the protected content.

The device registration phase involves the following actions:

1.  The Flash application creates a randomly generated ID.

2.  The Flash application invokes the `DRMManager.authenticate()` method. The
```
application must include the randomly generated ID in the authentication
request. For instance, include the ID in the username field.
```

3.  The action mentioned in Step 2 will result in Adobe Access sending an
```
authentication request to the customer’s server. This request includes the
device certificate.

1.  The server extracts the device certificate and the generated ID from the
```

        request and stores.

```
2.  The customer sub-system pre-generates licenses for this device
```

        certificate, stores them and grants access to them in a way that
        associates them with the generated ID.

4.  The server responds to the request with a “success” message.

5.  The Flash application stores the generated ID locally in a Local Shared
```
Object (LSO).
```

After the device registration, the Flash application uses the generated ID in
the same way as it would have used the device ID in the previous scheme:

1.  The Flash application will try to locate the generated ID in LSO.

2.  If the generated ID is found, the Flash application will use the generated
```
ID while downloading the pre-generated licenses. The Flash application will
send the licenses to the Adobe Access client for consumption using the
`DRMManager.storeVoucher()` method.
```

3.  If the generated ID is not found, the Flash application will go through the
```
device registration procedure.
```
