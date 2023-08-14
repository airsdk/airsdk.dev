---
sidebar_position: 3
---

# HTML copy and paste in AIR

The HTML environment in Adobe AIR provides its own set of events and default
behavior for copy and paste. Only code running in the application sandbox can
access the system clipboard directly through the AIR
`Clipboard.generalClipboard` object. JavaScript code in a non-application
sandbox can access the clipboard through the event object dispatched in response
to one of the copy or paste events dispatched by an element in an HTML document.

Copy and paste events include: `copy`, `cut`, and `paste`. The object dispatched
for these events provides access to the clipboard through the `clipboardData`
property.

## Default behavior

By default, AIR copies selected items in response to the copy command, which can
be generated either by a keyboard shortcut or a context menu. Within editable
regions, AIR cuts text in response to the cut command or pastes text to the
cursor or selection in response to the paste command.

To prevent the default behavior, your event handler can call the
`preventDefault()` method of the dispatched event object.

## Using the clipboardData property of the event object

The `clipboardData` property of the event object dispatched as a result of one
of the copy or paste events allows you to read and write clipboard data.

To write to the clipboard when handling a copy or cut event, use the `setData()`
method of the `clipboardData` object, passing in the data to copy and the MIME
type:

    function customCopy(event){
    	event.clipboardData.setData("text/plain", "A copied string.");
    }

To access the data that is being pasted, you can use the `getData()` method of
the `clipboardData` object, passing in the MIME type of the data format. The
available formats are reported by the `types` property.

    function customPaste(event){
    	var pastedData = event.clipboardData("text/plain");
    }

The `getData()` method and the `types` property can only be accessed in the
event object dispatched by the `paste` event.

The following example illustrates how to override the default copy and paste
behavior in an HTML page. The `copy` event handler italicizes the copied text
and copies it to the clipboard as HTML text. The `cut` event handler copies the
selected data to the clipboard and removes it from the document. The `paste`
handler inserts the clipboard contents as HTML and styles the insertion as bold
text.

    <html>
    <head>
    <title>Copy and Paste</title>
    <script language="javascript" type="text/javascript">
        function onCopy(event){
            var selection = window.getSelection();
            event.clipboardData.setData("text/html","<i>" + selection + "</i>");
            event.preventDefault();
        }

        function onCut(event){
             var selection = window.getSelection();
             event.clipboardData.setData("text/html","<i>" + selection + "</i>");
             var range = selection.getRangeAt(0);
             range.extractContents();

            event.preventDefault();
        }

        function onPaste(event){
            var insertion = document.createElement("b");
            insertion.innerHTML = event.clipboardData.getData("text/html");
             var selection = window.getSelection();
             var range = selection.getRangeAt(0);
             range.insertNode(insertion);
            event.preventDefault();
        }
    </script>
    </head>
    <body onCopy="onCopy(event)"
     onPaste="onPaste(event)"
     onCut="onCut(event)">
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
    veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
    magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    </body>
    </html>
