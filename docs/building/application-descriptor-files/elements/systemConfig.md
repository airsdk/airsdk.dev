---
title: systemConfig 
sidebar_position: 9
---

The `systemConfig` element provides access to a number of generic settings that can adjust the underlying behaviour of the ActionScript virtual machine within the AIR runtime. 
The VM is based upon the open source `avmplus` component, available at https://github.com/adobe/avmplus/tree/master, and the below descriptions might refer to this and to code
or documentation associated with it such as the [GC Policy](https://github.com/adobe/avmplus/blob/master/doc/mmgc/policy.txt).

All of the elements are optional with the default values mentioned in the descriptions.


## Elements

### `stackOverflowChecks`

Available: 51.3.1.1

Determines whether or not the JIT compiler generates checks for stack overflows when entering an AS3 function. Normally/historically these checks are made to ensure that
the application does not use too much stack space and allows an application to receive and handle a `StackOverflowError` to avoid the application aborting. However, this can
come at a cost for JIT-compiled methods and is not generally such an issue for a lot of AIR applications, so it is now possible to avoid these checks from being injected.

Possible values for this setting are:
- `always` (default behaviour) where the checks are always injected, to match previous behaviour.
- `never` where the JIT will not inject any checks which may improve performance and reduce code memory usage
- `debugOnly` where checks will be injected only for a SWF that has debug information within it (i.e. compiled with the `-debug` mxmlc flag)


### `gcCollectionThreshold`

Available: 51.3.1.1

This parameter can be used to adjust the Garbage Collection mechanism within the AIR runtime. The collection threshold is the amount of memory that the runtime aims to
use up before it then collects some via the internal GC mark-and-sweep method. A higher value uses more memory but can reduce the time spent in GC.

The value is given as a number of 4kb blocks, with the internal default now set at 5120 blocks which is equivalent to 20MB (5120x4x1024).

Adding a value here will result in a call to [`GCPolicyManager::setLowerLimitCollectionThreshold()`](https://github.com/adobe/avmplus/blob/858d034a3bd3a54d9b70909386435cf4aec81d21/MMgc/GCPolicyManager.cpp#L384).


### `gcEfficiency`

Available: 51.3.1.1

The efficiency coefficient is the intended ratio of GC work to program work, referenced as `G` in the [GC Policy document](https://github.com/adobe/avmplus/blob/858d034a3bd3a54d9b70909386435cf4aec81d21/doc/mmgc/policy.txt#L35). This value must be at least 0.01 and less than 1, with a default value of 0.25. Adjusting this value may limit the number/length of pauses that happen
due to GC activity but this may result in other side-effects such as an increase in the amount of memory consumed by the application.

Adding a value here will result in a change of the [`GCPolicyManager::G`](https://github.com/adobe/avmplus/blob/858d034a3bd3a54d9b70909386435cf4aec81d21/MMgc/GCPolicyManager.h#L573) variable.


### `gcMarkingTime`

Available: 51.3.1.1

This value is the intended maximum time slice spent doing incremental marking i.e. where activity is paused but for only a small period.
This is different from the collection time which is the more noticeable delay when the GC has finished marking and has a “stop-the-world” period to free
up the unused objects. In the [GC Policy document](https://github.com/adobe/avmplus/blob/858d034a3bd3a54d9b70909386435cf4aec81d21/doc/mmgc/policy.txt#L32)
this value is referred to as `P`. It is given here in milliseconds, with a default of 5.

Adding a value here will result in a change of the [`GCPolicyManager::P`](https://github.com/adobe/avmplus/blob/858d034a3bd3a54d9b70909386435cf4aec81d21/MMgc/GCPolicyManager.h#L555) variable.

