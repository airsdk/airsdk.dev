---
sidebar_position: 4
---

# Capabilities example: Detecting system capabilities

The CapabilitiesExplorer example demonstrates how you can use the
flash.system.Capabilities class to determine which features the user's version
of the Flash runtime supports. This example teaches the following techniques:

- Detecting which capabilities the user's version of the Flash runtime supports
  using the Capabilities class

- Using the ExternalInterface class to detect which browser settings the user's
  browser supports

To get the application files for this sample, see
[_FlashPlatformAS3DevGuideExamples.zip_](https://github.com/joshtynjala/flash-platform-as3-dev-guide-examples/releases/tag/original).
The CapabilitiesExplorer application files can be found in the folder
Samples/CapabilitiesExplorer. This application consists of the following files:

<table>
  <thead>
    <tr>
      <th><p>File</p></th>
      <th><p>Description</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>CapabilitiesExplorer.fla</p>
        <p>or</p>
        <p>CapabilitiesExplorer.mxml</p>
      </td>
      <td><p>The main application file in Flash (FLA) or Flex (MXML).</p></td>
    </tr>
    <tr>
      <td>
        <p>com/example/programmingas3/capabilities/CapabilitiesGrabber.as</p>
      </td>
      <td>
        <p>
          The class that provides the main functionality of the application,
          including adding the system Capabilities to an array, sorting the
          items, and using the ExternalInterface class to retrieve browser
          capabilities.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>capabilities.html</p></td>
      <td>
        <p>
          An HTML container that contains the necessary JavaScript to
          communicate with the external API.
        </p>
      </td>
    </tr>
  </tbody>
</table>


## CapabilitiesExplorer overview

The CapabilitiesExplorer.mxml file is responsible for setting up the user
interface for the CapabilitiesExplorer application. The capabilities of the
user's version of the Flash runtime will be displayed within a DataGrid
component instance on the Stage. Their browser capabilities will also be
displayed if they are running the application from an HTML container and if the
external API is available.

When the main application file's `creationComplete` event is dispatched, the
`initApp()` method is invoked. The `initApp()` method calls the
`getCapabilities()` method from within the
com.example.programmingas3.capabilities.CapabilitiesGrabber class. The code for
the `initApp()` method is as follows:

```
private function initApp():void
{
    var dp:Array = CapabilitiesGrabber.getCapabilities();
    capabilitiesGrid.dataProvider = dp;
}
```

The `CapabilitiesGrabber.getCapabilities()` method returns a sorted array of the
Flash runtime and browser capabilities, which then gets set to the
`dataProvider` property of the `capabilitiesGrid` DataGrid component instance on
the Stage.

## CapabilitiesGrabber class overview

The static `getCapabilities()` method of the CapabilitiesGrabber class adds each
property from the flash.system.Capabilities class to an array ( `capDP`). It
then calls the static `getBrowserObjects()` method in the CapabilitiesGrabber
class. The `getBrowserObjects()` method uses the external API to loop over the
browser's navigator object, which contains the browser's capabilities. The
`getCapabilities()` method is as follows:

```
public static function getCapabilities():Array
{
    var capDP:Array = new Array();
    capDP.push({name:"Capabilities.avHardwareDisable", value:Capabilities.avHardwareDisable});
    capDP.push({name:"Capabilities.hasAccessibility", value:Capabilities.hasAccessibility});
    capDP.push({name:"Capabilities.hasAudio", value:Capabilities.hasAudio});
    ...
    capDP.push({name:"Capabilities.version", value:Capabilities.version});
    var navArr:Array = CapabilitiesGrabber.getBrowserObjects();
    if (navArr.length > 0)
    {
        capDP = capDP.concat(navArr);
    }
    capDP.sortOn("name", Array.CASEINSENSITIVE);
    return capDP;
}
```

The `getBrowserObjects()` method returns an array of each of the properties in
the browser's navigator object. If this array has a length of one or more items,
the array of browser capabilities ( `navArr`) is appended to the array of Flash
Player capabilities ( `capDP`), and the entire array is sorted alphabetically.
Finally, the sorted array is returned to the main application file, which then
populates the data grid. The code for the `getBrowserObjects()` method is as
follows:

```
private static function getBrowserObjects():Array
{
    var itemArr:Array = new Array();
    var itemVars:URLVariables;
    if (ExternalInterface.available)
    {
        try
        {
            var tempStr:String = ExternalInterface.call("JS_getBrowserObjects");
            itemVars = new URLVariables(tempStr);
            for (var i:String in itemVars)
            {
                itemArr.push({name:i, value:itemVars[i]});
            }
        }
        catch (error:SecurityError)
        {
            // ignore
        }
    }
    return itemArr;
}
```

If the external API is available in the current user environment, the Flash
runtime calls the JavaScript `JS_getBrowserObjects()` method, which loops over
the browser's navigator object and returns a string of URL-encoded values to
ActionScript. This string is then converted into a URLVariables object (
`itemVars`) and added to the `itemArr` array, which is returned to the calling
script.

## Communicating with JavaScript

The final piece in building the CapabilitiesExplorer application is writing the
necessary JavaScript to loop over each of the items in the browser's navigator
object and append a name-value pair to a temporary array. The code for the
JavaScript `JS_getBrowserObjects()` method in the container.html file is as
follows:

```
<script language="JavaScript">
    function JS_getBrowserObjects()
    {
        // Create an array to hold each of the browser's items.
        var tempArr = new Array();

        // Loop over each item in the browser's navigator object.
        for (var name in navigator)
        {
            var value = navigator[name];

            // If the current value is a string or Boolean object, add it to the
            // array, otherwise ignore the item.
            switch (typeof(value))
            {
                case "string":
                case "boolean":

                    // Create a temporary string which will be added to the array.
                    // Make sure that we URL-encode the values using JavaScript's
                    // escape() function.
                    var tempStr = "navigator." + name + "=" + escape(value);
                    // Push the URL-encoded name/value pair onto the array.
                    tempArr.push(tempStr);
                    break;
            }
        }
        // Loop over each item in the browser's screen object.
        for (var name in screen)
        {
            var value = screen[name];

            // If the current value is a number, add it to the array, otherwise
            // ignore the item.
            switch (typeof(value))
            {
                case "number":
                    var tempStr = "screen." + name + "=" + escape(value);
                    tempArr.push(tempStr);
                    break;
            }
        }
        // Return the array as a URL-encoded string of name-value pairs.
        return tempArr.join("&");
    }
</script>
```

The code begins by creating a temporary array that will hold all the name-value
pairs in the navigator object. Next, the navigator object is looped over using a
`for..in` loop, and the data type of the current value is evaluated to filter
out unwanted values. In this application, we are interested only in String or
Boolean values, and other data types (such as functions or arrays) are ignored.
Each String or Boolean value in the navigator object is appended to the
`tempArr` array. Next, the browser's screen object is looped over using a
`for..in` loop, and each numeric value is added to the `tempArr` array. Finally,
the temporary array is converted into a string using the `Array.join()` method.
The array uses an ampersand (&) as a delimiter, which allows ActionScript to
easily parse the data using the URLVariables class.
