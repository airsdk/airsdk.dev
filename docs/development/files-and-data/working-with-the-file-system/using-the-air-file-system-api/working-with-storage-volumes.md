---
sidebar_position: 6
---

# Working with storage volumes

In AIR 2, you can detect when mass storage volumes are mounted or unmounted. The
StorageVolumeInfo class defines a singleton `storageVolumeInfo` object. The
`StorageVolumeInfo.storageVolumeInfo` object dispatches a `storageVolumeMount`
event when a storage volume is mounted. And it dispatches a
`storageVolumeUnmount` event when a volume is unmounted. The
StorageVolumeChangeEvent class defines these events.

Note: On modern Linux distributions, the StorageVolumeInfo object only
dispatches `storageVolumeMount` and `storageVolumeUnmount` events for physical
devices and network drives mounted at particular locations.

The `storageVolume` property of the StorageVolumeChangeEvent class is a
StorageVolume object. The StorageVolume class defines basic properties of the
storage volume:

- `drive` —The volume drive letter on Windows ( `null` on other operating
  systems)

- `fileSystemType` —The type of file system on the storage volume (such as
  "FAT", "NTFS", "HFS", or "UFS")

- `isRemoveable` —Whether a volume is removable ( `true`) or not ( `false`)

- `isWritable` —Whether a volume is writable ( `true`) or not ( `false`)

- `name` —The name of the volume

- `rootDirectory` —A File object corresponding to the root directory of the
  volume

The StorageVolumeChangeEvent class also includes a `rootDirectory` property. The
`rootDirectory` property is a File object referencing the root directory of the
storage volume that has been mounted or unmounted.

The `storageVolume` property of the StorageVolumeChangeEvent object is undefined
( `null`) for an unmounted volume. However you can access the `rootDirectory`
property of the event.

The following code outputs the name and file path of a storage volume when it is
mounted:

```
StorageVolumeInfo.storageVolumeInfo.addEventListener(StorageVolumeChangeEvent.STORAGE_VOLUME_MOUNT, onVolumeMount);
function onVolumeMount(event:StorageVolumeChangeEvent):void
{
	trace(event.storageVolume.name, event.rootDirectory.nativePath);
}
```

The following code outputs the file path of a storage volume when it is
unmounted:

```
StorageVolumeInfo.storageVolumeInfo.addEventListener(StorageVolumeChangeEvent.STORAGE_VOLUME_UNMOUNT, onVolumeUnmount);
function onVolumeUnmount(event:StorageVolumeChangeEvent):void
{
	trace(event.rootDirectory.nativePath);
}
```

The `StorageVolumeInfo.storageVolumeInfo` object includes a
`getStorageVolumes()` method. This method returns a vector of StorageVolume
objects corresponding to the currently mounted storage volumes. The following
code shows how to list the names and root directories of all mounted storage
volumes:

```
var volumes:Vector.<StorageVolume> = new Vector.<StorageVolume>;
volumes = StorageVolumeInfo.storageVolumeInfo.getStorageVolumes();
for (var i:int = 0; i < volumes.length; i++)
{
	trace(volumes[i].name, volumes[i].rootDirectory.nativePath);
}
```

Note: On modern Linux distributions, the `getStorageVolumes()` method returns
objects corresponding to physical devices and network drives mounted at
particular locations.

The `File.getRootDirectories()` method lists the root directories (see
[Pointing to the file system root](./working-with-file-objects-in-air.md#pointing-to-the-file-system-root).
However, the StorageVolume objects (enumerated by the
`StorageVolumeInfo.getStorageVolumes()` method) provides more information about
the storage volumes.

You can use the `spaceAvailable` property of the `rootDirectory` property of a
StorageVolume object to get the space available on a storage volume. (See
[Determining space available on a volume](./working-with-file-objects-in-air.md#determining-space-available-on-a-volume).)

More Help topics

![](../../../img/flashplatformLinkIndicator.png)
[StorageVolume](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/StorageVolume.html)

![](../../../img/flashplatformLinkIndicator.png)
[StorageVolumeInfo](https://airsdk.dev/reference/actionscript/3.0/flash/filesystem/StorageVolumeInfo.html)
