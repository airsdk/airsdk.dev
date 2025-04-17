# Compressing bitmap data

The `flash.display.BitmapData.encode()` method lets you natively compress bitmap
data into one of the following image compression formats:

- **PNG** - Uses PNG compression, optionally using fast compression, which
  emphasizes compression speed over file size. To use PNG compression, pass a
  new `flash.display.PNGEncoderOptions` object as the second parameter of the
  `BitmapData.encode()` method.

- **JPEG** - Uses JPEG compression, optionally specifying image quality. To use
  JPEG compression, pass a new `flash.display.JPEGEncoderOptions` object as the
  second parameter of the `BitmapData.encode()` method.

- **JPEGXR** - Uses JPEG Extended Range (XR) compression, optionally specifying
  color channel, lossy, and entropy settings. To use JPEGXR compression, pass a
  new `flash.display.JPEGXREncoderOptions` object as the second parameter of the
  `BitmapData.encode()` method.

You can use this feature for image processing as part of a server upload or
download workflow.

The following example snippet compresses a BitmapData object using
`JPEGEncoderOptions`:

```
// Compress a BitmapData object as a JPEG file.
var bitmapData:BitmapData = new BitmapData(640,480,false,0x00FF00);
var byteArray:ByteArray = new ByteArray();
bitmapData.encode(new Rectangle(0,0,640,480), new flash.display.JPEGEncoderOptions(), byteArray);
```
