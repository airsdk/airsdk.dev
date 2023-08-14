# Converting Date and RegExp objects

The JavaScript and ActionScript languages both define Date and RegExp classes,
but objects of these types are not automatically converted between the two
execution contexts. You must convert Date and RegExp objects to the equivalent
type before using them to set properties or function parameters in the alternate
execution context.

For example, the following ActionScript code converts a JavaScript Date object
named `jsDate` to an ActionScript Date object:

    var asDate:Date = new Date(jsDate.getMilliseconds());

The following ActionScript code converts a JavaScript RegExp object named
`jsRegExp` to an ActionScript RegExp object:

    var flags:String = "";
    if (jsRegExp.dotAll) flags += "s";
    if (jsRegExp.extended) flags += "x";
    if (jsRegExp.global) flags += "g";
    if (jsRegExp.ignoreCase) flags += "i";
    if (jsRegExp.multiline) flags += "m";
    var asRegExp:RegExp = new RegExp(jsRegExp.source, flags);
