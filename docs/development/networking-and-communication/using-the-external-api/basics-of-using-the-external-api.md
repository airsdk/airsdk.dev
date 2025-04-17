---
sidebar_position: 1
---

# Basics of using the external API

Although in some cases a SWF file can run on its own (for example, if you use
Adobe® Flash® Professional to create a SWF projector), in the majority of cases
a SWF application runs as an element inside of another application. Commonly,
the container that includes the SWF is an HTML file; somewhat less frequently, a
SWF file is used for all or part of the user interface of a desktop application.

As you work on more advanced applications, you may find a need to set up
communication between the SWF file and the container application. For instance,
it's common for a web page to display text or other information in HTML, and
include a SWF file to display dynamic visual content such as a chart or video.
In such a case, you might want to make it so that when users click a button on
the web page, it changes something in the SWF file. ActionScript contains a
mechanism, known as the external API, that facilitates this type of
communication between ActionScript in a SWF file and other code in the container
application.

#### Important concepts and terms

The following reference list contains important terms relevant to this feature:

Container application  
The application within which Flash Player is running a SWF file, such as a web
browser and HTML page that includes Flash Player content or an AIR application
that loads the SWF in a web page..

Projector  
An executable file that includes SWF content and an embedded version of Flash
Player. You can create a projector file using Flash Professional or the
standalone Flash Player. Projectors are commonly used to distribute SWF files by
CD-ROM or in similar situations where download size is not an issue and the SWF
author wants to be certain the user will be able to run the SWF file, regardless
of whether Flash Player is installed on the user's computer.

Proxy  
A go-between application or code that calls code in one application (the
"external application") on behalf of another application (the "calling
application"), and returns values to the calling application. A proxy can be
used for various reasons, including:

- To simplify the process of making external function calls by converting native
  function calls in the calling application into the format understood by the
  external application.

- To work around security or other restrictions that prevent the caller from
  communicating directly with the external application.

Serialize  
To convert objects or data values into a format that can be used to pass the
values in messages between two programming systems, such as over the Internet or
between two different applications running on a single computer.

#### Working through the examples

Many of the code examples provided are small listings of code for demonstration
purposes rather than full working examples or code that checks values. Because
using the external API requires (by definition) writing ActionScript code as
well as code in a container application, testing the examples involves creating
a container (for example, a web page containing the SWF file) and using the code
listings to interact with the container.

#### To test an example of ActionScript-to-JavaScript communication:

1.  Create a new document using Flash Professional and save it to your computer.

2.  From the main menu, choose File \> Publish Settings.

3.  In the Publish Settings dialog box, on the Formats tab, confirm that the
```
Flash and HTML check boxes are selected.
```

4.  Click the Publish button. This generates a SWF file and HTML file in the
```
same folder and with the same name that you used to save the document. Click
OK to close the Publish Settings dialog box.
```

5.  Deselect the HTML check box. Now that the HTML page is generated, you are
```
going to modify it to add the appropriate JavaScript code. Deselecting the
HTML check box ensures that after you modify the HTML page, Flash will not
overwrite your changes with a new HTML page when it's publishing the SWF
file.
```

6.  Click OK to close the Publish Settings dialog box.

7.  With an HTML or text editor application, open the HTML file that was created
```
by Flash when you published the SWF file. In the HTML source code, add
opening and closing `script` tags, and copy into them the JavaScript code
from the example code listing:
```

        <script>
        	// add the sample JavaScript code here
        </script>

8.  Save the HTML file and return to Flash.

9.  Select the keyframe on Frame 1 of the Timeline, and open the Actions panel.

10. Copy the ActionScript code listing into the Script pane.

11. From the main menu, choose File \> Publish to update the SWF file with the
```
changes that you've made.
```

12. Using a web browser, open the HTML page you edited to view the page and test
```
communication between ActionScript and the HTML page.
```

#### To test an example of ActionScript-to-ActiveX container communication:

1.  Create a new document using Flash Professional and save it to your computer.
```
You may want to save it in the folder where your container application will
expect to find the SWF file.
```

2.  From the main menu, choose File \> Publish Settings.

3.  In the Publish Settings dialog box, on the Formats tab, confirm that only
```
the Flash check box is selected.
```

4.  In the File field next to the Flash check box, click the folder icon to
```
select the folder into which your SWF file will be published. By setting the
location for your SWF file, you can (for example) keep the document in one
folder, but put the published SWF file in another folder such as the folder
containing the source code for the container application.
```

5.  Select the keyframe on Frame 1 of the Timeline, and open the Actions panel.

6.  Copy the ActionScript code for the example into the Script pane.

7.  From the main menu, choose File \> Publish to re-publish the SWF file.

8.  Create and run your container application to test communication between
```
ActionScript and the container application.
```

For full examples of using the external API to communicate with an HTML page,
see the following topic:

- [External API example: Communicating between ActionScript and JavaScript in a web browser](./external-api-example-communicating-between-actionscript-and-javascript-in-a-web-browser.md)

Those examples include the full code, including ActionScript and container
error-checking code, which you should use when writing code using the external
API. For another full example using the external API, see the class example for
the ExternalInterface class in the ActionScript 3.0 Reference.
