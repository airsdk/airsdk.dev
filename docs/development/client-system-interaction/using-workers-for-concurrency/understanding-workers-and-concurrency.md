---
sidebar_position: 1
---

# Understanding workers and concurrency

When an application doesn't use workers, the application's code executes in a
single linear block of executing steps known as an execution <span class="dfn">
thread </span>. The thread executes the code that a developer writes. It also
executes much of the code that's part of the runtime, most notably the code that
updates the screen when display objects' properties change. Although code is
written in chunks as methods and classes, at run time the code executes one line
at a time as though it were written in a single long series of steps. Consider
this hypothetical example of the steps that an application executes:

1.  Enter frame: The runtime calls any `enterFrame` event handlers and runs
    their code one at a time

2.  Mouse event: The user moves the mouse, and the runtime calls any mouse event
    handlers as the various rollover and rollout events happen

3.  Load complete event: A request to load an xml file from a url returns with
    the loaded file data. The event handler is called and runs its steps,
    reading the xml content and creating a set of objects from the xml data.

4.  Mouse event: The mouse has moved again, so the runtime calls the relevant
    mouse event handlers

5.  Rendering: No more events are waiting, so the runtime updates the screen
    based on any changes made to display objects

6.  Enter frame: The cycle begins again

As described in the example, the hypothetical steps 1-5 run in sequence within a
single block of time called a frame. Because they run in sequence in a single
thread, the runtime can't interrupt one step of the process to run another one.
At a frame rate of 30 frames-per-second, the runtime has less than one thirtieth
of a second to execute all those operations. In many cases that is enough time
for the code to run, and the runtime simply waits during the remaining time.
However, suppose the xml data that loads in step 3 is a very large, deeply
nested xml structure. As the code loops over the xml and creates objects, it
might conceivably take longer than one thirtieth of a second to do that work. In
that case, the later steps (responding to the mouse and redrawing the screen) do
not happen as soon as they should. This causes the screen to freeze and stutter
as the screen isn't redrawn fast enough in response to the user moving the
mouse.

If all the code executes in the same thread, there is only one way to avoid
occasional stutters and freezes. This is to not do long-running operations such
as looping over a large set of data. ActionScript workers provide another
solution. Using a worker, you can execute long-running code in a separate
worker. Each worker runs in a separate thread, so the background worker performs
the long-running operation in its own thread. That frees up the main worker's
execution thread to redraw the screen each frame without being blocked by other
work.

The ability to run multiple code operations at the same time in this way is
known as <span class="dfn"> concurrency </span>. When the background worker
finishes its work, or at "progress" points along the way, you can send the main
worker notifications and data. In this way, you can write code that performs
complex or time consuming operations but avoid the bad user experience of having
the screen freeze.

Workers are useful because they decrease the chances of the frame rate dropping
due to the main rendering thread being blocked by other code. However, workers
require additional system memory and CPU use, which can be costly to overall
application performance. Because each worker uses its own instance of the
runtime virtual machine, even the overhead of a trivial worker can be large.
When using workers, test your code across all your target platforms to ensure
that the demands on the system are not too large. Adobe recommends that you do
not use more than one or two background workers in a typical scenario.
