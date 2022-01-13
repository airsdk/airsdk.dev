---
title: ADT Debugger connection options
sidebar_label: Debugger connection 
sidebar_position: 3
---

When the target of the package is `apk-debug`, `ipa-debug`, or `ipa-debug-interpreter`, the connection options can be used to specify whether the app will attempt to connect to a remote debugger (typically used for wifi debugging) or listen for an incoming connection from a remote debugger (typically used for USB debugging). Use the `-connect` option to connect to a debugger; use the `-listen` option to accept a connection from a debugger over a USB connection. These options are mutually exclusive; that is, you cannot use them together.


## Connect

The `-connect` option uses the following syntax:

```
-connect hostString
```

### `-connect`

If present, the app will attempt to connect to a remote debugger.

### `hostString`

A string identifying the computer running the Flash debugging tool FDB. If not specified, the app will attempt to connect to a debugger running on the computer on which the package is created. The host string can be a fully qualified computer domain name: `machinename.subgroup.example.com`, or an IP address: `192.168.4.122`. If the specified (or default) machine cannot be found, then the runtime will display a dialog requesting a valid host name.


## Listen

The `-listen` option uses the following syntax:

```
-listen port
```

### `-listen`

If present, the runtime waits for a connection from a remote debugger.

### `port` 
(Optional)

The port to listen on. By default, the runtime listens on port 7936. For more information on using the `-listen` option, see [Remote debugging with FDB over USB](https://help.adobe.com/en_US/air/build/WS901d38e593cd1bac7b2281cc12cd6bced97-8000.html).
