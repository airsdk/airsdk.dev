---
sidebar_position: 7
---

# Example: Overriding the default HTML drag-in behavior

This example implements a drop target that displays a table showing each data
format available in the dropped item.

The default behavior is used to allow text, links, and images to be dragged
within the application. The example overrides the default drag-in behavior for
the div element that serves as the drop target. The key step to enabling
non-editable content to accept a drag-in gesture is to call the
`preventDefault()` method of the event object dispatched for both the
`dragenter` and `dragover` events. In response to a `drop` event, the handler
converts the transferred data into an HTML row element and inserts the row into
a table for display.

    <html>
    <head>
    	<title>Drag-and-drop</title>
    	<script language="javascript" type="text/javascript" src="AIRAliases.js"></script>
    	<script language="javascript">
    		function init(){
    			var target = document.getElementById('target');
    			target.addEventListener("dragenter", dragEnterOverHandler);
    			target.addEventListener("dragover", dragEnterOverHandler);
    			target.addEventListener("drop", dropHandler);

    			var source = document.getElementById('source');
    			source.addEventListener("dragstart", dragStartHandler);
    			source.addEventListener("dragend", dragEndHandler);

    			emptyRow = document.getElementById("emptyTargetRow");
    		}

    		function dragStartHandler(event){
    			event.dataTransfer.effectAllowed = "copy";
    		}

    		function dragEndHandler(event){
    			air.trace(event.type + ": " + event.dataTransfer.dropEffect);
    		}

    		function dragEnterOverHandler(event){
    			event.preventDefault();
    		}

    		var emptyRow;
    		function dropHandler(event){
    			for(var prop in event){
    				air.trace(prop + " = " + event[prop]);
    			}
    			var row = document.createElement('tr');
    			row.innerHTML = "<td>" + event.dataTransfer.getData("text/plain") + "</td>" +
    				"<td>" + event.dataTransfer.getData("text/html") + "</td>" +
    				"<td>" + event.dataTransfer.getData("text/uri-list") + "</td>" +
    				"<td>" + event.dataTransfer.getData("application/x-vnd.adobe.air.file-list") +
    				"</td>";

    			var imageCell = document.createElement('td');
    			if((event.dataTransfer.types.toString()).search("image/x-vnd.adobe.air.bitmap") > -1){
    				imageCell.appendChild(event.dataTransfer.getData("image/x-vnd.adobe.air.bitmap"));
    			}
    			row.appendChild(imageCell);
    			var parent = emptyRow.parentNode;
    			parent.insertBefore(row, emptyRow);
    		}
    	</script>
    </head>
    <body onLoad="init()" style="padding:5px">
    	<div>
    		<h1>Source</h1>
    		<p>Items to drag:</p>
    		<ul id="source">
    			<li>Plain text.</li>
    			<li>HTML <b>formatted</b> text.</li>
    			<li>A <a href="http://www.adobe.com">URL.</a></li>
    			<li><img src="icons/AIRApp_16.png" alt="An image"/></li>
    			<li style="-webkit-user-drag:none;">
    				Uses "-webkit-user-drag:none" style.
    			</li>
    			<li style="-webkit-user-select:none;">
    				Uses "-webkit-user-select:none" style.
    			</li>
    		</ul>
    	</div>
    	<div id="target" style="border-style:dashed;">
    		<h1>Target</h1>
    		<p>Drag items from the source list (or elsewhere).</p>
    		<table id="displayTable" border="1">
    			<tr><th>Plain text</th><th>Html text</th><th>URL</th><th>File list</th><th>Bitmap Data</th></tr>
    			<tr id="emptyTargetRow"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    		</table>
    	</div>
    </body>
    </html>
