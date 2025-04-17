# Creating and applying filters

Filters allow you to apply a range of effects to bitmap and display objects,
ranging from drop shadows to bevels and blurs. Each filter is defined as a
class, so applying filters involves creating instances of filter objects, which
is no different from constructing any other object. Once you've created an
instance of a filter object, it can easily be applied to a display object by
using the object's `filters` property, or in the case of a BitmapData object, by
using the `applyFilter()` method.

## Creating a filter

To create a filter object, simply call the constructor method of your selected
filter class. For example, to create a DropShadowFilter object, use the
following code:

```
import flash.filters.DropShadowFilter;
var myFilter:DropShadowFilter = new DropShadowFilter();
```

Although not shown here, the `DropShadowFilter()` constructor (like all the
filter classes' constructors) accepts several optional parameters that can be
used to customize the appearance of the filter effect.

## Applying a filter

Once you've constructed a filter object, you can apply it to a display object or
a BitmapData object; how you apply the filter depends on the object to which
you're applying it.

#### Applying a filter to a display object

When you apply filter effects to a display object, you apply them through the
`filters` property. The `filters` property of a display object is an Array
instance, whose elements are the filter objects applied to the display object.
To apply a single filter to a display object, create the filter instance, add it
to an Array instance, and assign that Array object to the display object's
`filters` property:

```
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.filters.DropShadowFilter;

// Create a bitmapData object and render it to screen
var myBitmapData:BitmapData = new BitmapData(100,100,false,0xFFFF3300);
var myDisplayObject:Bitmap = new Bitmap(myBitmapData);
addChild(myDisplayObject);

// Create a DropShadowFilter instance.
var dropShadow:DropShadowFilter = new DropShadowFilter();

// Create the filters array, adding the filter to the array by passing it as
// a parameter to the Array() constructor.
var filtersArray:Array = new Array(dropShadow);

// Assign the filters array to the display object to apply the filter.
myDisplayObject.filters = filtersArray;
```

If you want to assign multiple filters to the object, simply add all the filters
to the Array instance before assigning it to the `filters` property. You can add
multiple objects to an Array by passing them as parameters to its constructor.
For example, this code applies a bevel filter and a glow filter to the
previously created display object:

```
import flash.filters.BevelFilter;
import flash.filters.GlowFilter;

// Create the filters and add them to an array.
var bevel:BevelFilter = new BevelFilter();
var glow:GlowFilter = new GlowFilter();
var filtersArray:Array = new Array(bevel, glow);

// Assign the filters array to the display object to apply the filter.
myDisplayObject.filters = filtersArray;
```

When you're creating the array containing the filters, you can create it using
the `new Array()` constructor (as shown in the previous examples) or you can use
Array literal syntax, wrapping the filters in square brackets (`[]`). For
instance, this line of code:

```
var filters:Array = new Array(dropShadow, blur);
```

does the same thing as this line of code:

```
var filters:Array = [dropShadow, blur];
```

If you apply multiple filters to display objects, they are applied in a
cumulative, sequential manner. For example, if a filters array has two elements,
a bevel filter added first and a drop shadow filter added second, the drop
shadow filter is applied to both the bevel filter and the display object. This
is because of the drop shadow filter's second position in the filters array. If
you want to apply filters in a noncumulative manner, apply each filter to a new
copy of the display object.

If you're only assigning one or a few filters to a display object, you can
create the filter instance and assign it to the object in a single statement.
For example, the following line of code applies a blur filter to a display
object called `myDisplayObject`:

```
myDisplayObject.filters = [new BlurFilter()];
```

The previous code creates an Array instance using Array literal syntax (square
braces), creates a BlurFilter instance as an element in the Array, and assigns
that Array to the `filters` property of the display object named
`myDisplayObject`.

#### Removing filters from a display object

Removing all filters from a display object is as simple as assigning a null
value to the `filters` property:

```
myDisplayObject.filters = null;
```

If you've applied multiple filters to an object and want to remove only one of
the filters, you must go through several steps to change the `filters` property
array. For more information, see
[Potential issues for working with filters](./creating-and-applying-filters.md#potential-issues-for-working-with-filters).

#### Applying a filter to a BitmapData object

Applying a filter to a BitmapData object requires the use of the BitmapData
object's `applyFilter()` method:

```
var rect:Rectangle = new Rectangle();
var origin:Point = new Point();
myBitmapData.applyFilter(sourceBitmapData, rect, origin, new BlurFilter());
```

The `applyFilter()` method applies a filter to a source BitmapData object,
producing a new, filtered image. This method does not modify the original source
image; instead, the result of the filter being applied to the source image is
stored in the BitmapData instance on which the `applyFilter()` method is called.

## How filters work

Display object filtering works by caching a copy of the original object as a
transparent bitmap.

Once a filter has been applied to a display object, the runtime caches the
object as a bitmap for as long as the object has a valid filter list. This
source bitmap is then used as the original image for all subsequently applied
filter effects.

Each display object usually contains two bitmaps: one with the original
unfiltered source display object and another for the final image after
filtering. The final image is used when rendering. As long as the display object
does not change, the final image does not need updating.

## Potential issues for working with filters

There are several potential sources of confusion or trouble to keep in mind when
you're working with filters.

#### Filters and bitmap caching

To apply a filter to a display object, bitmap caching must be enabled for that
object. When you apply a filter to a display object whose `cacheAsBitmap`
property is set to `false`, the object's `cacheAsBitmap` property is
automatically set to `true`. If you later remove all the filters from the
display object, the `cacheAsBitmap` property is reset to the last value it was
set to.

#### Changing filters at run time

If a display object already has one or more filters applied to it, you can't
change the set of filters by adding additional filters to or removing filters
from the `filters` property array. Instead, to add to or change the set of
filters being applied, you must make your changes to a separate array, then
assign that array to the filters property of the display object for the filters
to be applied to the object. The simplest way to do this is to read the
`filters` property array into an Array variable and make your modifications to
this temporary array. You then reassign this array back to the `filters`
property of the display object. In more complex cases, you might need to keep a
separate master array of filters. You make any changes to that master filter
array, and reassign the master array to the display object's `filters` property
after each change.

#### Adding an additional filter

The following code demonstrates the process of adding an additional filter to a
display object that already has one or more filters applied to it. Initially, a
glow filter is applied to the display object named `myDisplayObject` ; later,
when the display object is clicked, the `addFilters()` function is called. In:

```
import flash.events.MouseEvent;
import flash.filters.*;

myDisplayObject.filters = [new GlowFilter()];

function addFilters(event:MouseEvent):void
{
    // Make a copy of the filters array.
    var filtersCopy:Array = myDisplayObject.filters;

    // Make desired changes to the filters (in this case, adding filters).
    filtersCopy.push(new BlurFilter());
    filtersCopy.push(new DropShadowFilter());

    // Apply the changes by reassigning the array to the filters property.
    myDisplayObject.filters = filtersCopy;
}

myDisplayObject.addEventListener(MouseEvent.CLICK, addFilters);
```

#### Removing one filter from a set of filters

If a display object has multiple filters applied to it, and you want to remove
one of the filters while the other filters continue to be applied to the object,
you copy the filters into a temporary array, remove the unwanted filter from
that array, and reassign the temporary array to the display object's `filters`
property. Several ways to remove one or more elements from any array are
described in
[Retrieving values and removing array elements](../../core-actionscript-classes/working-with-arrays/indexed-arrays.md#retrieving-values-and-removing-array-elements).

The most straightforward situation is to remove the top-most filter on the
object (the last filter applied to the object). You use the Array class's
`pop()` method to remove the filter from the array:

```
// Example of removing the top-most filter from a display object
// named "filteredObject".

var tempFilters:Array = filteredObject.filters;

// Remove the last element from the Array (the top-most filter).
tempFilters.pop();

// Apply the new set of filters to the display object.
filteredObject.filters = tempFilters;
```

Similarly, to remove the bottom-most filter (the first one applied to the
object) you use the same code, substituting the Array class's `shift()` method
in place of the `pop()` method.

To remove a filter from the middle of an array of filters (assuming that the
array has more than two filters) you can use the `splice()` method. You must
know the index (the position in the array) of the filter you want to remove. For
example, the following code removes the second filter (the filter at index 1)
from a display object:

```
// Example of removing a filter from the middle of a stack of filters
// applied to a display object named "filteredObject".

var tempFilters:Array = filteredObject.filters;

// Remove the second filter from the array. It's the item at index 1
// because Array indexes start from 0.
// The first "1" indicates the index of the filter to remove; the
// second "1" indicates how many elements to remove.
tempFilters.splice(1, 1);

// Apply the new set of filters to the display object.
filteredObject.filters = tempFilters;
```

#### Determining a filter's index

You need to know which filter to remove from the array, so that you know the
index of the filter. You must either know (by virtue of the way the application
is designed), or calculate the index of the filter to remove.

The best approach is to design your application so that the filter you want to
remove is always in the same position in the set of filters. For example, if you
have a single display object with a convolution filter and a drop-shadow filter
applied to it (in that order), and you want to remove the drop-shadow filter but
keep the convolution filter, the filter is in a known position (the top-most
filter) so that you can know ahead of time which Array method to use (in this
case `Array.pop()` to remove the drop-shadow filter).

If the filter you want to remove is always a certain type, but not necessarily
always in the same position in the set of filters, you can check the data type
of each filter in the array to determine which one to remove. For example, the
following code determines which of a set of filters is a glow filter, and
removes that filter from the set.

```
// Example of removing a glow filter from a set of filters, where the
// filter you want to remove is the only GlowFilter instance applied
// to the filtered object.

var tempFilters:Array = filteredObject.filters;

// Loop through the filters to find the index of the GlowFilter instance.
var glowIndex:int;
var numFilters:int = tempFilters.length;
for (var i:int = 0; i < numFilters; i++)
{
    if (tempFilters[i] is GlowFilter)
    {
        glowIndex = i;
        break;
    }
}

// Remove the glow filter from the array.
tempFilters.splice(glowIndex, 1);

// Apply the new set of filters to the display object.
filteredObject.filters = tempFilters;
```

In a more complex case, such as if the filter to remove is selected at runtime,
the best approach is to keep a separate, persistent copy of the filter array
that serves as the master list of filters. Any time you make a change to the set
of filters, change the master list then apply that filter array as the `filters`
property of the display object.

For example, in the following code listing, multiple convolution filters are
applied to a display object to create different visual effects, and at a later
point in the application one of those filters is removed while the others are
retained. In this case, the code keeps a master copy of the filters array, as
well as a reference to the filter to remove. Finding and removing the specific
filter is similar to the preceding approach, except that instead of making a
temporary copy of the filters array, the master copy is manipulated and then
applied to the display object.

```
// Example of removing a filter from a set of
// filters, where there may be more than one
// of that type of filter applied to the filtered
// object, and you only want to remove one.

// A master list of filters is stored in a separate,
// persistent Array variable.
var masterFilterList:Array;

// At some point, you store a reference to the filter you
// want to remove.
var filterToRemove:ConvolutionFilter;

// ... assume the filters have been added to masterFilterList,
// which is then assigned as the filteredObject.filters:
filteredObject.filters = masterFilterList;

// ... later, when it's time to remove the filter, this code gets called:

// Loop through the filters to find the index of masterFilterList.
var removeIndex:int = -1;
var numFilters:int = masterFilterList.length;
for (var i:int = 0; i < numFilters; i++)
{
    if (masterFilterList[i] == filterToRemove)
    {
        removeIndex = i;
        break;
    }
}

if (removeIndex >= 0)
{
    // Remove the filter from the array.
    masterFilterList.splice(removeIndex, 1);

    // Apply the new set of filters to the display object.
    filteredObject.filters = masterFilterList;
}
```

In this approach (when you're comparing a stored filter reference to the items
in the filters array to determine which filter to remove), you _must_ keep a
separate copy of the filters array—the code does not work if you compare the
stored filter reference to the elements in a temporary array copied from the
display object's `filters` property. This is because internally, when you assign
an array to the `filters` property, the runtime makes a copy of each filter
object in the array. Those copies (rather than the original objects) are applied
to the display object, and when you read the `filters` property into a temporary
array, the temporary array contains references to the copied filter objects
rather than references to the original filter objects. Consequently, if in the
preceding example you try to determine the index of `filterToRemove` by
comparing it to the filters in a temporary filters array, no match is found.

#### Filters and object transformations

No filtered region—a drop shadow, for example—outside of a display object's
bounding box rectangle is considered to be part of the surface for the purposes
of hit detection (determining if an instance overlaps or intersects with another
instance). Because the DisplayObject class's hit detection methods are
vector-based, you cannot perform a hit detection on the bitmap result. For
example, if you apply a bevel filter to a button instance, hit detection is not
available on the beveled portion of the instance.

Scaling, rotating, and skewing are not supported by filters; if the filtered
display object itself is scaled (if `scaleX` and `scaleY` are not 100%), the
filter effect does not scale with the instance. This means that the original
shape of the instance rotates, scales, or skews; however, the filter does not
rotate, scale, or skew with the instance.

You can animate an instance with a filter to create realistic effects, or nest
instances and use the BitmapData class to animate filters to achieve this
effect.

#### Filters and Bitmap objects

When you apply any filter to a BitmapData object, the `cacheAsBitmap` property
is automatically set to `true`. In this way, the filter is actually applied to
the copy of the object rather than to the original.

This copy is then placed on the main display (over the original object) as close
as possible to the nearest pixel. If the bounds of the original bitmap change,
the filtered copy bitmap is recreated from the original, rather than being
stretched or distorted.

If you clear all filters for a display object, the `cacheAsBitmap` property is
reset to what it was before the filter was applied.
