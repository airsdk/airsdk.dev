---
sidebar_position: 8
---

# Handling file drops in non-application HTML sandboxes

Non-application content cannot access the File objects that result when files
are dragged into an AIR application. Nor is it possible to pass one of these
File objects to application content through a sandbox bridge. (The object
properties must be accessed during serialization.) However, you can still drop
files in your application by listening for the AIR nativeDragDrop events on the
HTMLLoader object.

Normally, if a user drops a file into a frame that hosts non-application
content, the drop event does not propagate from the child to the parent.
However, since the events dispatched by the HTMLLoader (which is the container
for all HTML content in an AIR application) are not part of the HTML event flow,
you can still receive the drop event in application content.

To receive the event for a file drop, the parent document adds an event listener
to the HTMLLoader object using the reference provided by `window.htmlLoader`:

    window.htmlLoader.addEventListener("nativeDragDrop",function(event) {
    	var filelist = event.clipboard.getData(air.ClipboardFormats.FILE_LIST_FORMAT);
    	air.trace(filelist[0].url);
    });

The following example uses a parent document that loads a child page into a
remote sandbox (http://localhost/). The parent listens for the `nativeDragDrop`
event on the HTMLLoader object and traces out the file url.

    <html>
    <head>
    	<title>Drag-and-drop in a remote sandbox</title>
    	<script language="javascript" type="text/javascript" src="AIRAliases.js"></script>
    	<script language="javascript">
    	window.htmlLoader.addEventListener("nativeDragDrop",function(event){
    		var filelist = event.clipboard.getData(air.ClipboardFormats.FILE_LIST_FORMAT);
    		air.trace(filelist[0].url);
    	});
    	</script>
    </head>
    <body>
    	<iframe src="child.html"
    			sandboxRoot="http://localhost/"
    			documentRoot="app:/"
    			frameBorder="0"  width="100%" height="100%">
    	</iframe>
    </body>
    </html>

The child document must present a valid drop target by calling the Event object
`preventDefault()` method in the HTML `dragenter` and `dragover` event handlers.
Otherwise, the drop event can never occur.

    <html>
    <head>
    	<title>Drag and drop target</title>
    	<script language="javascript" type="text/javascript">
    		function preventDefault(event){
    			event.preventDefault();
    		}
    	</script>
    </head>
    <body ondragenter="preventDefault(event)" ondragover="preventDefault(event)">
    	<div>
    		<h1>Drop Files Here</h1>
    	</div>
    </body>
    </html>
