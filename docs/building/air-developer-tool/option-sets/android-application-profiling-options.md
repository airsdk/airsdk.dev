---
title: ADT Android application profiling options
sidebar_label: Android application profiling
sidebar_position: 4
---

When the target of the package is `apk-profile`, the profiler options can be used to specify which preloaded SWF file to use for performance and memory profiling. The profiler options use the following syntax:

```
-preloadSWFPath directory
```

### `-preloadSWFPath`

If present, the app will attempt to find the preload SWF at the specified directory. If not specified, ADT includes the preload SWF file from the AIR SDK.


### `directory`

The directory containing the profiler preload SWF file.
