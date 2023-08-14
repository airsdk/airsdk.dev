# Working with byte arrays

The ByteArray class allows you to read from and write to a binary stream of
data, which is essentially an array of bytes. This class provides a way to
access data at the most elemental level. Because computer data consists of
bytes, or groups of 8 bits, the ability to read data in bytes means that you can
access data for which classes and access methods do not exist. The ByteArray
class allows you to parse any stream of data, from a bitmap to a stream of data
traveling over the network, at the byte level.

The `writeObject()` method allows you to write an object in serialized Action
Message Format (AMF) to a ByteArray, while the `readObject()` method allows you
to read a serialized object from a ByteArray to a variable of the original data
type. You can serialize any object except for display objects, which are those
objects that can be placed on the display list. You can also assign serialized
objects back to custom class instances if the custom class is available to the
runtime. After converting an object to AMF, you can efficiently transfer it over
a network connection or save it to a file.

The sample Adobe® AIR® application described here reads a .zip file as an
example of processing a byte stream, extracting a list of the files that the
.zip file contains and writing them to the desktop.

- [Reading and writing a ByteArray](./reading-and-writing-a-bytearray.md)
- [ByteArray example: Reading a .zip file](./bytearray-example-reading-a-zip-file.md)

More Help topics

![](../../img/flashplatformLinkIndicator.png)
[flash.utils.ByteArray](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/ByteArray.html)

![](../../img/flashplatformLinkIndicator.png)
[flash.utils.IExternalizable](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/utils/IExternalizable.html)

[Action Message Format specification](http://opensource.adobe.com/wiki/download/attachments/1114283/amf3_spec_05_05_08.pdf)
