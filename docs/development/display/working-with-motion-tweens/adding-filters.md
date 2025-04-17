# Adding filters

If the target object of a motion tween contains filters, those filters are added
using the `initFilters()` and `addFilterPropertyArray()` methods of the Motion
class.

## Initializing the filters array

The `initFilters()` method initializes the filters. Its first argument is an
array of the fully qualified class names of all the filters applied to the
display object. This array of filter names is generated from the filters list
for the motion tween in Flash. In your copy of the script, you can remove or add
any of the filters in the `flash.filters` package to this array. The following
call initializes the filters list for the target display object. It applies the
`DropShadowFilter`, `GlowFilter`, and `BevelFilter` and copies the list to each
keyframe in the Motion object.

```
__motion_Box.initFilters(["flash.filters.DropShadowFilter", "flash.filters.GlowFilter", "flash.filters.BevelFilter"], [0, 0, 0]);
```

## Adding filters

The `addFilterPropertyArray()` method describes the properties of an initialized
filter with the following arguments:

1.  Its first argument identifies a filter by index. The index refers to the
```
position of the filter name in the filter class names array passed in a
previous call to `initFilters()`.
```

2.  Its second argument is the filter property to store for that filter in each
```
keyframe.
```

3.  Its third argument is the value of the specified filter property.

Given the previous call to `initFilters()`, the following calls to
`addFilterPropertyArray()` assign a value of 5 to the `blurX` and `blurY`
properties of the `DropShadowFilter`. The `DropShadowFilter` is the first
(index 0) item in the initialized filters array:

```
__motion_Box.addFilterPropertyArray(0, "blurX", [5]);
__motion_Box.addFilterPropertyArray(0, "blurY", [5]);
```

The next three calls assign values to the quality, alpha, and color properties
of the `GlowFilter,` the second item (index 1) in the initialized filter array:

```
__motion_Box.addFilterPropertyArray(1, "quality", [BitmapFilterQuality.LOW]);
__motion_Box.addFilterPropertyArray(1, "alpha", [1.00]);
__motion_Box.addFilterPropertyArray(1, "color", [0xff0000]);
```

The next four calls assign values to the `shadowAlpha`, `shadowColor`,
`highlightAlpha`, and `highlightColor` of the `BevelFilter`, the third (index 2)
item in the initialized filters array:

```
__motion_Box.addFilterPropertyArray(2, "shadowAlpha", [1.00]);
__motion_Box.addFilterPropertyArray(2, "shadowColor", [0x000000]);
__motion_Box.addFilterPropertyArray(2, "highlightAlpha", [1.00]);
__motion_Box.addFilterPropertyArray(2, "highlightColor", [0xffffff]);
```

## Adjusting color with the ColorMatrixFilter

After the `ColorMatrixFilter` has been initialized, you can set the appropriate
`AdjustColor` properties to adjust the brightness, contrast, saturation, and hue
of the tweened display object. Typically, the `AdjustColor` filter is applied
when the motion tween is created in Flash; you can fine-tune it in your copy of
the ActionScript. The following example transforms the hue and saturation of the
display object as it moves.

```
__motion_Leaf_1.initFilters(["flash.filters.ColorMatrix"], [0], -1, -1);
__motion_Leaf_1.addFilterPropertyArray(0, "adjustColorBrightness", [0], -1, -1);
__motion_Leaf_1.addFilterPropertyArray(0, "adjustColorContrast", [0], -1, -1);
__motion_Leaf_1.addFilterPropertyArray(0, "adjustColorSaturation",
```

        [
            0,-0.589039,1.17808,-1.76712,-2.35616,-2.9452,-3.53424,-4.12328,
            -4.71232,-5.30136,-5.89041, 6.47945,-7.06849,-7.65753,-8.24657,
            -8.83561,-9.42465,-10.0137,-10.6027,-11.1918,11.7808,-12.3699,
            -12.9589,-13.5479,-14.137,-14.726,-15.3151,-15.9041,-16.4931,
            17.0822,-17.6712,-18.2603,-18.8493,-19.4383,-20.0274,-20.6164,
            -21.2055,-21.7945,22.3836,-22.9726,-23.5616,-24.1507,-24.7397,
            -25.3288,-25.9178,-26.5068,-27.0959,27.6849,-28.274,-28.863,-29.452,
            -30.0411,-30.6301,-31.2192,-31.8082,-32.3973,32.9863,-33.5753,
            -34.1644,-34.7534,-35.3425,-35.9315,-36.5205,-37.1096,-37.6986,
            38.2877,-38.8767,-39.4657,-40.0548,-40.6438,-41.2329,-41.8219,
            -42.411,-43
        ],
        -1, -1);
```
__motion_Leaf_1.addFilterPropertyArray(0, "adjustColorHue",
```

        [
            0,0.677418,1.35484,2.03226,2.70967,3.38709,4.06451,4.74193,5.41935,
            6.09677,6.77419,7.45161,8.12903,8.80645,9.48387,10.1613,10.8387,11.5161,
            12.1935,12.871,13.5484,14.2258,14.9032,15.5806,16.2581,16.9355,17.6129,
            18.2903,18.9677,19.6452,20.3226,21,22.4286,23.8571,25.2857,26.7143,28.1429,
            29.5714,31,32.4286,33.8571,35.2857,36.7143,38.1429,39.5714,41,42.4286,43.8571,
            45.2857,46.7143,48.1429,49.5714,51,54,57,60,63,66,69,72,75,78,81,84,87,
            90,93,96,99,102,105,108,111,114
        ],
        -1, -1);
