---
sidebar_position: 1
---

# FileStream open modes

The `open()` and `openAsync()` methods of a FileStream object each include a
`fileMode` parameter, which defines some properties for a file stream, including
the following:

- The ability to read from the file

- The ability to write to the file

- Whether data will always be appended past the end of the file (when writing)

- What to do when the file does not exist (and when its parent directories do
  not exist)

The following are the various file modes (which you can specify as the
`fileMode` parameter of the `open()` and `openAsync()` methods):

| File mode       | Description                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FileMode.READ   | Specifies that the file is open for reading only.                                                                                                                                                                                                                                                                         |
| FileMode.WRITE  | Specifies that the file is open for writing. If the file does not exist, it is created when the FileStream object is opened. If the file does exist, any existing data is deleted.                                                                                                                                        |
| FileMode.APPEND | Specifies that the file is open for appending. The file is created if it does not exist. If the file exists, existing data is not overwritten, and all writing begins at the end of the file.                                                                                                                             |
| FileMode.UPDATE | Specifies that the file is open for reading and writing. If the file does not exist, it is created. Specify this mode for random read/write access to the file. You can read from any position in the file. When writing to the file, only the bytes written overwrite existing bytes (all other bytes remain unchanged). |
