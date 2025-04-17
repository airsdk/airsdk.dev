# HTML in AIR

AIR and WebKit define a couple of non-standard HTML elements and attributes,
including:

[HTML frame and iframe elements](#html-frame-and-iframe-elements)

[HTML element event handlers](#html-element-event-handlers)

## HTML frame and iframe elements

AIR adds new attributes to the frame and iframe elements of content in the
application sandbox:

sandboxRoot attribute  
The `sandboxRoot` attribute specifies an alternate, non-application domain of
origin for the file specified by the frame `src` attribute. The file is loaded
into the non-application sandbox corresponding to the specified domain. Content
in the file and content loaded from the specified domain can cross-script each
other.

Important: If you set the value of `sandboxRoot` _to the base URL of the domain,
all requests for content from that domain are loaded from the application
directory instead of the remote server (whether that request results from page
navigation, from an XMLHttpRequest, or from any other means of loading
content)._

documentRoot attribute  
The `documentRoot` attribute specifies the local directory from which to load
URLs that resolve to files within the location specified by `sandboxRoot`.

When resolving URLs, either in the frame `src` attribute, or in content loaded
into the frame, the part of the URL matching the value specified in
`sandboxRoot` is replaced with the value specified in `documentRoot`. Thus, in
the following frame tag:

```
<iframe src="http://www.example.com/air/child.html"
```

            documentRoot="app:/sandbox/"
            sandboxRoot="http://www.example.com/air/"/>

`child.html` is loaded from the `sandbox` subdirectory of the application
installation folder. Relative URLs in `child.html` are resolved based on
`sandbox` directory. Note that any files on the remote server at
`www.example.com/air` are not accessible in the frame, since AIR would attempt
to load them from the app:/sandbox/ directory.

allowCrossDomainXHR attribute  
Include `allowCrossDomainXHR="allowCrossDomainXHR"` in the opening frame tag to
allow content in the frame to make XMLHttpRequests to any remote domain. By
default, non-application content can only make such requests to its own domain
of origin. There are serious security implications involved in allowing
cross-domain XHRs. Code in the page is able to exchange data with any domain. If
malicious content is somehow injected into the page, any data accessible to code
in the current sandbox can be compromised. Only enable cross-domain XHRs for
pages that you create and control and only when cross-domain data loading is
truly necessary. Also, carefully validate all external data loaded by the page
to prevent code injection or other forms of attack.

Important: If the `allowCrossDomainXHR` attribute is included in a frame or
iframe element, cross-domain XHRs are enabled (unless the value assigned is "0"
or starts with the letters "f" or "n"). For example, setting
`allowCrossDomainXHR` to " `deny"` _would still enable cross-domain XHRs. Leave
the attribute out of the element declaration altogether if you do not want to
enable cross-domain requests._

ondominitialize attribute  
Specifies an event handler for the `dominitialize` event of a frame. This event
is an AIR-specific event that fires when the window and document objects of the
frame have been created, but before any scripts have been parsed or document
elements created.

The frame dispatches the `dominitialize` event early enough in the loading
sequence that any script in the child page can reference objects, variables, and
functions added to the child document by the `dominitialize` handler. The parent
page must be in the same sandbox as the child to directly add or access any
objects in a child document. However, a parent in the application sandbox can
establish a sandbox bridge to communicate with content in a non-application
sandbox.

The following examples illustrate use of the iframe tag in AIR:

Place `child.html` in a remote sandbox, without mapping to an actual domain on a
remote server:

```
<iframe src="http://localhost/air/child.html"
```

            documentRoot="app:/sandbox/"
            sandboxRoot="http://localhost/air/"/>

Place `child.html` in a remote sandbox, allowing XMLHttpRequests only to
`www.example.com`:

```
<iframe src="http://www.example.com/air/child.html"
```

            documentRoot="app:/sandbox/"
            sandboxRoot="http://www.example.com/air/"/>

Place `child.html` in a remote sandbox, allowing XMLHttpRequests to any remote
domain:

```
<iframe src="http://www.example.com/air/child.html"
```

            documentRoot="app:/sandbox/"
            sandboxRoot="http://www.example.com/air/"
            allowCrossDomainXHR="allowCrossDomainXHR"/>

Place `child.html` in a local-with-file-system sandbox:

```
<iframe src="file:///templates/child.html"
```

            documentRoot="app:/sandbox/"
            sandboxRoot="app-storage:/templates/"/>

Place `child.html` in a remote sandbox, using the `dominitialize` event to
establish a sandbox bridge:

```
<html>
<head>
	<script>
		var bridgeInterface = {};
		bridgeInterface.testProperty = "Bridge engaged";
		function engageBridge(){
			document.getElementById("sandbox").parentSandboxBridge = bridgeInterface;
		}
	</script>
</head>
<body>
	<iframe id="sandbox"
			src="http://www.example.com/air/child.html"
			documentRoot="app:/"
			sandboxRoot="http://www.example.com/air/"
			ondominitialize="engageBridge()"/>
</body>
</html>
```

The following `child.html` document illustrates how child content can access the
parent sandbox bridge:

```
<html>
<head>
```

        <script>
            document.write(window.parentSandboxBridge.testProperty);
        </script>
```
</head>
<body></body>
</html>
```

For more information, see
[Cross-scripting content in different security sandboxes](../programming-html-and-javascript-in-air/cross-scripting-content-in-different-security-sandboxes.md)
and
[HTML security in Adobe AIR](../../security/air-security/html-security-in-adobe-air.md).

## HTML element event handlers

DOM objects in AIR and WebKit dispatch some events not found in the standard DOM
event model. The following table lists the related event attributes you can use
to specify handlers for these events:

| Callback attribute name | Description                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| oncontextmenu           | Called when a context menu is invoked, such as through a right-click or command-click on selected text.                              |
| oncopy                  | Called when a selection in an element is copied.                                                                                     |
| oncut                   | Called when a selection in an element is cut.                                                                                        |
| ondominitialize         | Called when the DOM of a document loaded in a frame or iframe is created, but before any DOM elements are created or scripts parsed. |
| ondrag                  | Called when an element is dragged.                                                                                                   |
| ondragend               | Called when a drag is released.                                                                                                      |
| ondragenter             | Called when a drag gesture enters the bounds of an element.                                                                          |
| ondragleave             | Called when a drag gesture leaves the bounds of an element.                                                                          |
| ondragover              | Called continuously while a drag gesture is within the bounds of an element.                                                         |
| ondragstart             | Called when a drag gesture begins.                                                                                                   |
| ondrop                  | Called when a drag gesture is released while over an element.                                                                        |
| onerror                 | Called when an error occurs while loading an element.                                                                                |
| oninput                 | Called when text is entered into a form element.                                                                                     |
| onpaste                 | Called when an item is pasted into an element.                                                                                       |
| onscroll                | Called when the content of a scrollable element is scrolled.                                                                         |
| onselectstart           | Called when a selection begins.                                                                                                      |

## HTML contentEditable attribute

You can add the `contentEditable` attribute to any HTML element to allow users
to edit the content of the element. For example, the following example HTML code
sets the entire document as editable, except for first `p` element:

```
<html>
<head/>
<body contentEditable="true">
	<h1>de Finibus Bonorum et Malorum</h1>
	<p contentEditable="false">Sed ut perspiciatis unde omnis iste natus error.</p>
	<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
</body>
</html>
```

Note: If you set the `document.designMode` property to `on`, then all elements
in the document are editable, regardless of the setting of `contentEditable` for
an individual element. However, setting `designMode` to `off`, does not disable
editing of elements for which `contentEditable` is `true`. See
[Document.designMode property](./javascript-in-air.md#documentdesignmode-property)
for additional information.

## Data: URLs

AIR supports `data:` URLs for the following elements:

- img

- input type="image"

- CSS rules allowing images (such as background-image)

Data URLs allow you to insert binary image data directly into a CSS or HTML
document as a base64-encoded string. The following example uses a data: URL as a
repeating background:

```
<html>
<head>
	<style>
		body {
			background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF%2F6cA%2F%2F%2F%2Fgxp3lwAAAAJ0Uk5T%2FwDltzBKAAABF0lEQVR42uzZQQ7CMAxE0e%2F7X5oNCyRocWzPiJbMBZ6qpIljE%2BnwklgKG7kwUjc2IkIaxkY0CPdEsCCasws6ShXBgmBBmEagpXQQLAgWBAuSY2gaKaWPYEGwIEwg0FRmECwIFoQeQjJlhJWUEFazjFDJCkI5WYRWMgjtfEGYyQnCXD4jTCdm1zmngFpBFznwVNi5RPSbwbWnpYr%2BBHi%2FtCTfgPLEPL7jBctAKBRptXJ8M%2BprIuZKu%2BUKcg4YK1PLz7kx4bSqHyPaT4d%2B28OCJJiRBo4FCQsSA0bziT3XubMgYUG6fc5fatmGBQkL0hoJ1IaZMiQsSFiQ8vRscTjlQOI2iHZwtpHuf%2BJAYiOiJSkj8Z%2FIQ4ABANvXGLd3%2BZMrAAAAAElFTkSuQmCC');
			background-repeat:repeat;
		}
	</style>
</head>
<body>
</body>
</html>
```

When using data: URLS, be aware that extra whitespace is significant. For
example, the data string must be entered as a single, unbroken line. Otherwise,
the line breaks are treated as part of the data and the image cannot be decoded.
