---
sidebar_position: 8
---

# Understanding cue points

You can embed cue points in an Adobe F4V or FLV video file during encoding.
Historically, cue points were embedded in movies to give the projectionist a
visual signal that indicated the reel of film was nearing the end. In Adobe F4V
and FLV video formats, a cue point allows you to trigger one or more other
actions in your application at the time that it occurs in the video stream.

You can use several different kinds of cue points with Flash video. You can use
ActionScript to interact with cue points that you embed in a video file when you
create it.

- Navigation cue points: You embed navigation cue points in the video stream and
  metadata packet when you encode the video file. You use navigation cue points
  to let users seek to a specified part of a file.

- Event cue points: You embed event cue points in the video stream and metadata
  packet when you encode the video file. You can write code to handle the events
  that are triggered at specified points during video playback.

- ActionScript cue points: ActionScript cue points are available only to the
  Flash FLVPlayback component. ActionScript cue points are external cue points
  that you create and access with ActionScript code. You can write code to
  trigger these cue points in relation to the video's playback. These cue points
  are less accurate than embedded cue points (up to a tenth of a second),
  because the video player tracks them separately. If you plan to create an
  application in which you want users to navigate to a cue point, you should
  create and embed cue points when you encode the file instead of using
  ActionScript cue points. You should embed the cue points in the FLV file,
  because they are more accurate.

Navigation cue points create a keyframe at the specified cue point location, so
you can use code to move a video player's playhead to that location. You can set
particular points in a video file where you might want users to seek. For
example, your video might have multiple chapters or segments, and you can
control the video by embedding navigation cue points in the video file.

For more information on encoding Adobe video files with cue points, see "Embed
cue points" in _Using Flash_.

You can access cue point parameters by writing ActionScript. Cue point
parameters are a part of the event object received by the callback handler.

To trigger certain actions in your code when an FLV file reaches a specific cue
point, use the `NetStream.onCuePoint` event handler.

To synchronize an action for a cue point in an F4V video file, you must retrieve
the cue point data from either the `onMetaData()` or the `onXMPData()` callback
functions and trigger the cue point using the Timer class in ActionScript 3.0.
For more information on F4V cue points, see
[Using onXMPData()](./using-cue-points-and-metadata.md#using-onxmpdata).

For more information on handling cue points and metadata, see
[Writing callback methods for metadata and cue points](./writing-callback-methods-for-metadata-and-cue-points.md).
