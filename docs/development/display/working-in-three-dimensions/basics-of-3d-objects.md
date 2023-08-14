# Basics of 3D display objects

The main difference between a two-dimensional (2D) object and a
three-dimensional (3D) object projected on a two-dimensional screen is the
addition of a third dimension to the object. The third dimension allows the
object to move toward and away from viewpoint of the user.

When you explicitly set the `z` property of a display object to a numeric value,
the object automatically creates a 3D transformation matrix. You can alter this
matrix to modify the 3D transformation settings of that object.

In addition, 3D rotation differs from 2D rotation. In 2D the axis of rotation is
always perpendicular to the x/y plane - in other words, on the z-axis. In 3D the
axis of rotation can be around any of the x, y, or z axes. Setting the rotation
and scaling properties of a display object enable it to move in 3D space.

#### Important concepts and terms

The following reference list contains important terms that you will encounter
when programming 3-dimensional graphics:

Perspective  
In a 2D plane, representation of parallel lines as converging on a vanishing
point to give the illusion of depth and distance.

Projection  
The production of a 2D image of a higher-dimensional object; 3D projection maps
3D points to a 2D plane.

Rotation  
Changing the orientation (and often the position) of an object by moving every
point included in the object in a circular motion.

Transformation  
Altering 3D points or sets of points by translation, rotation, scale, skew, or a
combination of these actions.

Translation  
Changing the position of an object by moving every point included in the object
by the same amount in the same direction.

Vanishing point  
Point at which receding parallel lines seem to meet when represented in linear
perspective.

Vector  
A 3D vector represents a point or a location in the three-dimensional space
using the Cartesian coordinates x, y, and z.

Vertex  
A corner point.

Textured mesh  
Any point defining an object in 3D space.

UV mapping  
A way to apply a texture or bitmap to a 3D surface. UV mapping assigns values to
coordinates on an image as percentages of the horizontal (U) axis and vertical
(V) axis.

T value  
The scaling factor for determining the size of a 3D object as the object moves
toward, or away from, the current point of view.

Culling  
Rendering, or not, surfaces with specific winding. Using culling you can hide
surfaces that are not visible to the current point of view.
