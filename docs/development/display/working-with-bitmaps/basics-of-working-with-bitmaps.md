# Basics of working with bitmaps

When you work with digital images, you're likely to encounter two main types of
graphics: bitmap and vector. Bitmap graphics, also known as raster graphics, are
composed of tiny squares (pixels) that are arranged in a rectangular grid
formation. Vector graphics are composed of mathematically generated geometric
shapes such as lines, curves, and polygons.

Bitmap images are defined by the width and height of the image, measured in
pixels, and the number of bits contained in each pixel, which represents the
number of colors a pixel can contain. In the case of a bitmap image that
utilizes the RGB color model, the pixels are made up of three bytes: red, green,
and blue. Each of these bytes contains a value ranging from 0 to 255. When the
bytes are combined within the pixel, they produce a color similar to an artist
mixing paint colors. For example, a pixel containing byte values of red-255,
green-102 and blue-0 would produce a vibrant orange color.

The quality of a bitmap image is determined by combining the resolution of the
image with its color depth bit value. _Resolution_ relates to the number of
pixels contained within an image. The greater the number of pixels, the higher
the resolution and the finer the image appears. _Color depth_ relates to the
amount of information a pixel can contain. For example, an image that has a
color depth value of 16 bits per pixel cannot represent the same number of
colors as an image that has a color depth of 48 bits. As a result, the 48-bit
image will have smoother degrees of shading than its 16-bit counterpart.

Because bitmap graphics are resolution-dependent, they don't scale very well.
This is most noticeable when bitmap images are scaled up in size. Scaling up a
bitmap usually results in a loss of detail and quality.

#### Bitmap file formats

Bitmap images are grouped into a number of common file formats. These formats
use different types of compression algorithms to reduce file size, as well as
optimize image quality based on the end purpose of the image. The bitmap image
formats supported by Adobe runtimes are BMP, GIF, JPG, PNG, and TIFF.

#### BMP

The BMP (bit mapped) format is a default image format used by the Microsoft
Windows operating system. It does not use any form of compression algorithm and
as such usually results in large file sizes.

#### GIF

The Graphics Interchange Format (GIF) was originally developed by CompuServe in
1987 as a means to transmit images with 256 colors (8-bit color). The format
provides small file sizes and is ideal for web-based images. Because of this
format's limited color palette, GIF images are generally not suitable for
photographs, which typically require high degrees of shading and color
gradients. GIF images permit single-bit transparency, which allows colors to be
mapped as clear (or transparent). This results in the background color of a web
page showing through the image where the transparency has been mapped.

#### JPEG

Developed by the Joint Photographic Experts Group (JPEG), the JPEG (often
written JPG) image format uses a lossy compression algorithm to allow 24-bit
color depth with a small file size. Lossy compression means that each time the
image is saved, the image loses quality and data but results in a smaller file
size. The JPEG format is ideal for photographs because it is capable of
displaying millions of colors. The ability to control the degree of compression
applied to an image allows you to manipulate image quality and file size.

#### PNG

The Portable Network Graphics (PNG) format was produced as an open-source
alternative to the patented GIF file format. PNGs support up to 64-bit color
depth, allowing for up to 16 million colors. Because PNG is a relatively new
format, some older browsers don't support PNG files. Unlike JPGs, PNGs use
lossless compression, which means that none of the image data is lost when the
image is saved. PNG files also support alpha transparency, which allows for up
to 256 levels of transparency.

#### TIFF

The Tagged Image File Format (TIFF) was the cross-platform format of choice
before the PNG was introduced. The drawback with the TIFF format is that because
of the many different varieties of TIFF, there is no single reader that can
handle every version. In addition, no web browsers currently support the format.
TIFF can use either lossy or lossless compression, and is able to handle
device-specific color spaces (such as CMYK).

#### Transparent bitmaps and opaque bitmaps

Bitmap images that use either the GIF or PNG formats can have an extra byte
(alpha channel) added to each pixel. This extra pixel byte represents the
transparency value of the pixel.

GIF images allow single-bit transparency, which means that you can specify a
single color, from a 256-color palette, to be transparent. PNG images, on the
other hand, can have up to 256 levels of transparency. This function is
especially beneficial when images or text are required to blend into
backgrounds.

ActionScript 3.0 replicates this extra transparency pixel byte within the
BitmapData class. Similar to the PNG transparency model, ActionScript offers up
to 256 levels of transparency.

#### Important concepts and terms

The following list contains important terms that you will encounter when
learning about bitmap graphics:

Alpha  
The level of transparency (or more accurately, opacity) in a color or an image.
The amount of alpha is often described as the _alpha channel_ value.

ARGB color  
A color scheme where each pixel's color is a mixture of red, green, and blue
color values, and its transparency is specified as an alpha value.

Color channel  
Commonly, colors are represented as a mixture of a few basic colors—usually (for
computer graphics) red, green, and blue. Each basic color is considered a color
channel; the amount of color in each color channel, mixed together, determines
the final color.

Color depth  
Also known as _bit depth_, this refers to the amount of computer memory that is
devoted to each pixel, which in turn determines the number of possible colors
that can be represented in the image.

Pixel  
The smallest unit of information in a bitmap image—essentially a dot of color.

Resolution  
The pixel dimensions of an image, which determines the level of fine-grained
detail contained in the image. Resolution is often expressed in terms of width
and height in number of pixels.

RGB color  
A color scheme where each pixel's color is represented as a mixture of red,
green, and blue color values.
