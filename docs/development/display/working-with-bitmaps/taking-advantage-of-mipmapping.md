# Taking advantage of mipmapping

_MIP maps_ (also known as _mipmaps_), are bitmaps grouped together and
associated with a texture to increase runtime rendering quality and performance.
Each bitmap image in the MIP map is a version of the main bitmap image, but at a
reduced level of detail from the main image.

For example, you can have a MIP map that includes at the highest quality a main
image at 64 × 64 pixels. Lower quality images in the MIP map would be 32 × 32,
16 × 16, 8 × 8, 4 × 4, 2 × 2, and 1 × 1 pixels.

_Texture streaming_ is the ability to load the lowest quality bitmap first, and
then to progressively display higher quality bitmaps as the bitmaps are loaded.
Because lower quality bitmaps are small, they load faster than the main image.
Therefore, application users can view image in an application before the main,
high quality bitmap loads.

Flash Player 9.115.0 and later versions and AIR implement this technology (the
process is called _mipmapping_), by creating optimized versions of varying scale
of each bitmap (starting at 50%).

Flash Player 11.3 and AIR 3.3 support texture streaming through the
`streamingLevels` parameter of the `Context3D.createCubeTexture()` and
`Context3D.createTexture()` methods.

Texture compression lets you store texture images in compressed format directly
on the GPU, which saves GPU memory and memory bandwidth. Typically, compressed
textures are compressed offline and uploaded to the GPU in compressed format.
However, Flash Player 11.4 and AIR 3.4 support runtime texture compression,
which is useful in certain situations, such as when rendering dynami textures
from vector art. To use runtime texture compression, perform the following
steps:

- Create the texture object by calling the `Context3D.createTexture()` method,
  passing either `flash.display3D.Context3DTextureFormat.COMPRESSED` or
  `flash.display3D.Context3DTextureFormat.COMPRESSED_ALPHA` in the third
  parameter.

- Using the `flash.display3D.textures.Texture` instance returned by
  `createTexture()`, call either
  `flash.display3D.textures.Texture.uploadFromBitmapData()` or
  `flash.display3D.textures.Texture.uploadFromByteArray()`. These methods upload
  and compress the texture in one step.

MIP maps are created for the following types of bitmaps:

- a bitmap (JPEG, GIF, or PNG files) displayed using the ActionScript 3.0 Loader
  class

- a bitmap in the library of a Flash Professional document

- a BitmapData object

- a bitmap displayed using the ActionScript 2.0 `loadMovie()` function

MIP maps are not applied to filtered objects or bitmap-cached movie clips.
However, MIP maps are applied if you have bitmap transformations within a
filtered display object, even if the bitmap is within masked content.

Mipmapping happens automatically, but you can follow a few guidelines to make
sure your images take advantage of this optimization:

- For video playback, set the `smoothing` property to `true` for the Video
  object (see the Video class).

- For bitmaps, the `smoothing` property does not have to be set to `true`, but
  the quality improvements are more visible when bitmaps use smoothing.

- Use bitmap sizes that are divisible by 4 or 8 for two-dimensional images (such
  as 640 x 128, which can be reduced as follows: 320 x 64 \> 160 x 32 \> 80 x 16
  \> 40 x 8 \> 20 x 4 \> 10 x 2 \> 5 x 1).

  For three-dimensional textures, use MIP maps where each image is at a
  resolution that is a power of 2 (meaning 2^n). For example, the main image is
  at a resolution of 1024 x 1024 pixels. The lower quality images in the MIP map
  would then be at 512 x 512, 256 x 256, 128 x 128 down to 1 x 1 pixels for a
  total of 11 images in the MIP map.

  Note that mipmapping does not occur for bitmap content with an odd width or
  height.
