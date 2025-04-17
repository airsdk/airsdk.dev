# Projecting 3D objects onto a 2D view

The
[PerspectiveProjection](https://airsdk.dev/reference/actionscript/3.0/flash/geom/PerspectiveProjection.html)
class in the `flash.geom` package provides a simple way of applying rudimentary
perspective when moving display objects through 3D space.

If you do not explicitly create a perspective projection for your 3D space, the
3D engine uses a default PerspectiveProjection object that exists on the root
and is propagated to all its children.

The three properties that define how a PerspectiveProjection object displays 3D
space are:

- `fieldOfView`

- `projectionCenter`

- `focalLength`

Modifying the value of the `fieldOfView` automatically modifies the value of the
`focalLength` and vice-versa, since they are interdependent.

The formula used to calculate the `focalLength` given the `fieldOfView` value
is:

```
focalLength = stageWidth/2 * (cos(fieldOfView/2) / sin(fieldOfView/2)
```

Typically you would modify the `fieldOfView` property explicitly.

## Field of view

By manipulating the `fieldOfView` property of the PerspectiveProjection class,
you can make a 3D display object approaching the viewer appear larger and an
object receding from the viewer appear smaller.

The `fieldOfView` property specifies an angle _between_ 0 and 180 degrees that
determines the strength of the perspective projection. The greater the value,
the stronger the distortion applied to a display object moving along its z-axis.
A low `fieldOfView` value results in very little scaling and causes objects to
appear to move only slightly back in space. A high `fieldOfView` value causes
more distortion and the appearance of greater movement. The maximum value of
179.9999... degrees results in an extreme fish-eye camera lens effect. The
maximum value of `fieldOfView` is 179.9999... and the minimum is 0.00001...
Exactly 0 and 180 are illegal values.

## Projection center

The `projectionCenter` property represents the vanishing point in the
perspective projection. It is applied as an offset to the default registration
point (0,0) in the upper-left corner of the stage.

As an object appears to move further from the viewer, it skews towards the
vanishing point and eventually vanishes. Imagine an infinitely long hall. As you
look down the hall, the edges of the walls converge to a vanishing point far
down the hall.

If the vanishing point is at the center of the stage, the hall disappears
towards a point in the center. The default value for the `projectionCenter`
property is the center of the stage. If, for example, you want elements to
appear on the left of the stage and a 3D area to appear on the right, set the
`projectionCenter` to a point on the right of the stage to make that the
vanishing point of your 3D viewing area.

## Focal length

The `focalLength` property represents the distance between the origin of the
viewpoint (0,0,0) and the location of the display object on its z-axis.

A long focal length is like a telephoto lens with a narrow view and compressed
distances between objects. A short focal length is like a wide angle lens, with
which you get a wide view with a lot of distortion. A medium focal length
approximates what the human eye sees.

Typically the `focalLength` is re-calculated dynamically during perspective
transformation as the display object moves, but you can set it explicitly.

## Default perspective projection values

The default PerspectiveProjection object created on the root has the following
values:

- `fieldOfView: 55`

- `perspectiveCenter: stagewidth/2, stageHeight/2`

- `focalLength: stageWidth / 2 * ( cos(fieldOfView/2) / sin(fieldOfView/2) )`

These are the values that are used if you do not create your own
PerspectiveProjection object.

You can instantiate your own PerspectiveProjection object with the intention of
modifying the `projectionCenter` and `fieldOfView` yourself. In this case, the
default values of the newly created object are the following, based on a default
stage size of 500 by 500:

- `fieldOfView: 55`

- `perspectiveCenter: 250,250`

- `focalLength: 480.24554443359375`
