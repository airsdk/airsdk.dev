# Describing the animation

The `addPropertyArray()` method of the MotionBase class adds an array of values
to describe every tweened property.

Potentially the array contains one array item for every keyframe in the motion
tween. Often some of these arrays contain fewer items than the total number of
keyframes in the motion tween. This situation occurs when the last value in the
array does not change for the remaining frames.

If the length of the array argument is greater than the `duration` property of
the Motion object, `addPropertyArray()` adjusts the value of the `duration`
property accordingly. It does not add keyframes for the properties that were
previously added. The newly added keyframes persist for the extra frames of the
animation.

The `x` and `y` properties of the Motion object describe the changing position
of the tweened object as the animation is running. These coordinates are the
values that are most likely to change in every keyframe, if the position of the
display object changes. You can add additional motion properties with the
`addPropertyArray()` method. For example, add the `scaleX` and `scaleY` values
if the tweened object is resized. Add the s `cewX` and `skewY` values if it is
skewed. Add the `rotationConcat` property if it rotates.

Use the `addPropertyArray()` method to define the following tween properties:

|                     |                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x`                 | horizontal position of the transformation point of the object in the coordinate space of its parent                                                        |
| `y`                 | vertical position of the transformation point of the object in the coordinate space of its parent                                                          |
| `z`                 | depth (z-axis) position of the transformation point of the object in the coordinate space of its parent                                                    |
| `scaleX`            | horizontal scale as a percentage of the object as applied from the transformation point                                                                    |
| `scaleY`            | vertical scale as a percentage of the object as applied from the transformation point                                                                      |
| `skewX`             | horizontal skew angle of the object in degrees as applied from the transformation point                                                                    |
| `skewY`             | vertical skew angle of the object in degrees as applied from the transformation point                                                                      |
| `rotationX`         | rotation of the object around the x-axis from its original orientation                                                                                     |
| `rotationY`         | rotation of the object around the y-axis from its original orientation                                                                                     |
| `rotationConcat`    | rotation (z-axis) values of the object in the motion relative to previous orientation as applied from the transformation point                             |
| `useRotationConcat` | If set, causes the target object to rotate when `addPropertyArray()` supplies data for motion                                                              |
| `blendMode`         | BlendMode class value specifying mixture the colors of the object with graphics underneath                                                                 |
| `matrix3D`          | matrix3D property if one exists for the keyframe; used for 3D tweens; if used, all the previous transform properties are ignored                           |
| `rotationZ`         | z-axis rotation of the object, in degrees, from its original orientation relative to the 3D parent container; used for 3D tweens instead of rotationConcat |

The properties that are added in the automatically generated script depend on
the properties that were assigned to the motion tween in Flash. You can add,
remove, or modify some of these properties when customizing your own version of
the script.

The following code assigns values to the properties of a motion tween named
`__motion_Wheel.` In this case, the tweened display object does not change
location but rather spins in place throughout the 29 frames in the motion tween.
The multiple values assigned to the `rotationConcat` array define the rotation.
The other property values of this motion tween do not change.

```
__motion_Wheel = new Motion();
__motion_Wheel.duration = 29;
__motion_Wheel.addPropertyArray("x", [0]);
__motion_Wheel.addPropertyArray("y", [0]);
__motion_Wheel.addPropertyArray("scaleX", [1.00]);
__motion_Wheel.addPropertyArray("scaleY", [1.00]);
__motion_Wheel.addPropertyArray("skewX", [0]);
__motion_Wheel.addPropertyArray("skewY", [0]);
__motion_Wheel.addPropertyArray("rotationConcat",
```

        [
            0,-13.2143,-26.4285,-39.6428,-52.8571,-66.0714,-79.2857,-92.4999,-105.714,
            -118.929,-132.143,-145.357,-158.571,-171.786,-185,-198.214,-211.429,-224.643,
            -237.857,-251.071,-264.286,-277.5,-290.714,-303.929,-317.143,-330.357,
            -343.571,-356.786,-370
        ]
```
);
__motion_Wheel.addPropertyArray("blendMode", ["normal"]);
```

In the next example, the display object named `Leaf_1` moves across the stage.
Its `x` and `y` property arrays contain different values for each of the 100
frames of the animation. In addition, the object rotates on its `z` axis as it
moves across the stage. The multiple items in the `rotationZ` property array
determine the rotation.

```
__motion_Leaf_1 = new MotionBase();
__motion_Leaf_1.duration = 100;
__motion_Symbol1_4.addPropertyArray("y",
```

        [
            0,5.91999,11.84,17.76,23.68,29.6,35.52,41.44,47.36,53.28,59.2,65.12,71.04,
            76.96,82.88,88.8,94.72,100.64,106.56,112.48,118.4,124.32,130.24,136.16,142.08,
            148,150.455,152.909,155.364,157.818,160.273,162.727,165.182,167.636,170.091,
            172.545,175,177.455,179.909,182.364,184.818,187.273,189.727,192.182,194.636,
            197.091,199.545,202,207.433,212.865,218.298,223.73,229.163,234.596,240.028,
            245.461,250.893,256.326,261.759,267.191,272.624,278.057,283.489,
            288.922,294.354,299.787,305.22,310.652,316.085,321.517,326.95,330.475,334,
            337.525,341.05,344.575,348.1,351.625,355.15,358.675,362.2,365.725,369.25,
            372.775,376.3,379.825,383.35,386.875,390.4,393.925,397.45,400.975,404.5,
            407.5,410.5,413.5,416.5,419.5,422.5,425.5
        ]
```
);
__motion_Symbol1_4.addPropertyArray("scaleX", [1.00]);
__motion_Symbol1_4.addPropertyArray("scaleY", [1.00]);
__motion_Symbol1_4.addPropertyArray("skewX", [0]);
__motion_Symbol1_4.addPropertyArray("skewY", [0]);
__motion_Symbol1_4.addPropertyArray("z",
```

        [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ]
```
);
__motion_Symbol1_4.addPropertyArray("rotationX", [64.0361]);
__motion_Symbol1_4.addPropertyArray("rotationY", [41.9578]);
__motion_Symbol1_4.addPropertyArray("rotationZ",
```

        [
            -18.0336,-17.5536,-17.0736,-16.5936,-16.1136,-15.6336,-15.1536,-14.6736,
            -14.1936,-13.7136,-13.2336,-12.7536,-12.2736,-11.7936,-11.3136,-10.8336,
            -10.3536,-9.8736,-9.3936,-8.9136,-8.4336,-7.9536,-7.4736,-6.9936,-6.5136,
            -6.0336,-7.21542,-8.39723,-9.57905,-10.7609,-11.9427,-13.1245,-14.3063,
            -15.4881,-16.67,-17.8518,-19.0336,-20.2154,-21.3972,-22.5791,-23.7609,
            -24.9427,-26.1245,-27.3063,-28.4881,-29.67,-30.8518,-32.0336,-31.0771,
            -30.1206,-29.164,-28.2075,-27.251,-26.2945,-25.338,-24.3814,-23.4249,
            -22.4684,-21.5119,-20.5553,-19.5988,-18.6423,-17.6858,-16.7293,-15.7727
            -14.8162,-13.8597,-12.9032,-11.9466,-10.9901,-10.0336,-10.9427,-11.8518,
            -12.7609,-13.67,-14.5791,-15.4881,-16.3972,-17.3063,-18.2154,-19.1245,
            -20.0336,-20.9427,-21.8518,-22.7609,-23.67,-24.5791,-25.4881,-26.3972,
            -27.3063,-28.2154,-29.1245,-30.0336,-28.3193,-26.605,-24.8907,-23.1765,
            -21.4622,-19.7479,-18.0336
        ]
```
);
__motion_Symbol1_4.addPropertyArray("blendMode", ["normal"]);
```
