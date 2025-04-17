# Associating a motion tween with its display objects

The last task is to associate the motion tween with the display object or
objects that it manipulates.

The AnimatorFactory class manages the association between a motion tween and its
target display objects. The argument to the AnimatorFactory constructor is the
Motion object:

```
var __animFactory_Wheel:AnimatorFactory = new AnimatorFactory(__motion_Wheel);
```

Use the `addTarget()` method of the AnimatorFactory class to associate the
target display object with its motion tween. The ActionScript copied from Flash
comments out the `addTarget()` line and does not specify an instance name:

```
// __animFactory_Wheel.addTarget(<instance name goes here>, 0);
```

In your copy, specify the display object to associate with the motion tween. In
the following example, the targets are specified as `greenWheel` and `redWheel`:

```
__animFactory_Wheel.AnimatorFactory.addTarget(greenWheel, 0);
__animFactory_Wheel.AnimationFactory.addTarget(redWheel, 0);
```

You can associate multiple display objects with the same motion tween using
multiple calls to `addTarget().`
