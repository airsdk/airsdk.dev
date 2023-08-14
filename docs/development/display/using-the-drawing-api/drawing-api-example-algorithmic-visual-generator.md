# Drawing API example: Algorithmic Visual Generator

The Algorithmic Visual Generator example dynamically draws to the stage several
"satellites", or circles moving in a circular orbit. Among the features explored
are:

- Using the drawing API to draw a basic shape with dynamic appearances

- Connecting user interaction with the properties that are used in a draw

- Conveying animation by clearing the stage on each frame and redrawing

The example in the previous subsection animated a solitary "satellite" using the
`Event.ENTER_FRAME` event. This example expands upon this, building a control
panel with series of sliders that immediately update the visual display of
several satellites. This example formalizes the code into external classes and
wraps the satellite creation code into a loop, storing a reference to each
satellite in a `satellites` array.

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The application files can be found in the folder
Samples/AlgorithmicVisualGenerator. This folder contains the following files:

| File                                                                 | Description                                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AlgorithmicVisualGenerator.fla                                       | The main application file in Flash Professional (FLA).                                                                                                                                                                      |
| com/example/programmingas3/algorithmic/AlgorithmicVisualGenerator.as | The class that provides the main functionality of the application, including drawing satellites on the stage and responding to events from the control panel to update the variables that affect the drawing of satellites. |
| com/example/programmingas3/algorithmic/ControlPanel.as               | A class that manages user interaction with several sliders and dispatching events when this occurs.                                                                                                                         |
| com/example/programmingas3/algorithmic/Satellite.as                  | A class which represents the display object that rotates in an orbit around a central point and contains properties related to its current draw state.                                                                      |

## Setting the listeners

The application first creates three listeners. The first listens for a
dispatched event from the control panel that a rebuild of the satellites is
necessary. The second listens to changes to the size of the SWF file's stage.
The third listens for each passing frame in the SWF file and to redraw using the
`doEveryFrame()` function.

## Creating the satellites

Once these listeners are set, the `build()` function is called. This function
first calls the `clear()` function, which empties the `satellites` array and
clears any previous draws to the stage. This is necessary since the `build()`
function could be recalled whenever the control panel sends an event to do so,
such as when the color settings have been changed. In such a case, the
satellites must be removed and recreated.

The function then creates the satellites, setting the initial properties needed
for creation, such as a the `position` variable, which starts at a random
position in the orbit, and the `color` variable, which in this example does not
change once the satellite has been created.

As each satellite is created, a reference to it is added to the `satellites`
array. When the `doEveryFrame()` function is called, it will update to all
satellites in this array.

## Updating the satellite position

The `doEveryFrame()` function is the heart of the application's animation
process. It is called for every frame, at a rate equal the framerate of the SWF
file. Because the variables of the draw change slightly, this conveys the
appearance of animation.

The function first clears all previous draws and redraws the background. Then,
it loops through each satellite container and increments the `position` property
of each satellite, and updates the `radius` and `orbitRadius` properties that
may have changed from user interaction with the control panel. Finally, the
satellite updates to its new position by calling the `draw()` method of the
Satellite class.

Note that the counter, `i`, only increments up to the `visibleSatellites`
variable. This is because if the user has limited the amount of satellites that
are displayed through the control panel, the remaining satellites in the loop
should not be redrawn but should instead be hidden. This occurs in a loop which
immediately follows the loop responsible for drawing.

When the doEveryFrame() function completes, the number of `visibleSatellites`
update in position across the screen.

## Responding to user interaction

User interaction occurs via the control panel, which is managed by the
ControlPanel class. This class sets a listener along with the individual
minimum, maximum, and default values of each slider. As the user moves these
sliders, the `changeSetting()` function is called. This function updates the
properties of the control panel. If the change requires a rebuild of the
display, an event is dispatched which is then handled in the main application
file. As the control panel settings change, the `doEveryFrame()` function draws
each satellite with the updated variables.

## Customizing further

This example is only a basic schematic of how to generate visuals using the
drawing API. It uses relatively few lines of code to create an interactive
experience that appears quite complex. Even so, this example could be extended
with minor changes. A few ideas:

- The `doEveryFrame()` function could increment the color value of the
  satellite.

- The `doEveryFrame()` function could shrink or expand the satellite radius over
  time.

- The satellite radius does not have to be circular; it could use the Math class
  to move according to a sine wave, for example.

- Satellites could use hit detection with other satellites.

The drawing API can be used as an alternative to creating visual effects in the
Flash authoring environment, drawing basic shapes at run time. But it can also
be used to create visual effects of a variety and scope that are not possible to
create by hand. Using the drawing API and a bit of mathematics, the ActionScript
author can give life to many unexpected creations.
