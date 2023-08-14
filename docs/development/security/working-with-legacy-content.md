---
sidebar_position: 12
---

# Working with legacy content

In Flash Player 6, the domain that is used for certain Flash Player settings is
based on the trailing portion of the domain of the SWF file. These settings
include settings for camera and microphone permissions, storage quotas, and
storage of persistent shared objects.

If the domain of a SWF file includes more than two segments, such as
www.example.com, the first segment of the domain (www) is removed, and the
remaining portion of the domain is used. So, in Flash Player 6, www.example.com
and store.example.com both use example.com as the domain for these settings.
Similarly, www.example.co.uk and store.example.co.uk both use example.co.uk as
the domain for these settings. This can lead to problems in which SWF files from
unrelated domains, such as example1.co.uk and example2.co.uk, have access to the
same shared objects.

In Flash Player 7 and later, player settings are chosen by default according to
a SWF file's exact domain. For example, a SWF file from www.example.com would
use the player settings for www.example.com. A SWF file from store.example.com
would use the separate player settings for store.example.com.

In a SWF file written using ActionScript 3.0, when `Security.exactSettings` is
set to `true` (the default), Flash Player uses exact domains for player
settings. When it is set to `false`, Flash Player uses the domain settings used
in Flash Player 6. If you change `exactSettings` from its default value, you
must do so before any events occur that require Flash Player to choose player
settings—for example, using a camera or microphone, or retrieving a persistent
shared object.

If you published a version 6 SWF file and created persistent shared objects from
it, to retrieve those persistent shared objects from a SWF that uses
ActionScript 3.0, you must set `Security.exactSettings` to `false` before
calling `SharedObject.getLocal()`.
