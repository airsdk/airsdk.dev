# Adding PDF content in AIR

Applications running in Adobe® AIR® can render not only SWF and HTML content,
but also PDF content. AIR applications render PDF content using the HTMLLoader
class, the WebKit engine, and the Adobe® Reader® browser plug-in. In an AIR
application, PDF content can either stretch across the full height and width of
your application or alternatively as a portion of the interface. The Adobe
Reader browser plug-in controls display of PDF files in an AIR application.
modifications to the Reader toolbar interface (such as controls for position,
anchoring, and visibility) persist in subsequent viewing of PDF files in both
AIR applications and the browser.

Important: To render PDF content in AIR, the user must have Adobe Reader or
Adobe® Acrobat® version 8.1 or higher installed.

## Detecting PDF Capability

If the user does not have Adobe Reader or Adobe Acrobat 8.1 or higher, PDF
content is not displayed in an AIR application. To detect if a user can render
PDF content, first check the `HTMLLoader.pdfCapability` property. This property
is set to one of the following constants of the HTMLPDFCapability class:

| Constant                                           | Description                                                                                                                                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTMLPDFCapability.STATUS_OK                        | A sufficient version (8.1 or greater) of Adobe Reader is detected and PDF content can be loaded into an HTMLLoader object.                                                                                       |
| HTMLPDFCapability.ERROR_INSTALLED_READER_NOT_FOUND | No version of Adobe Reader is detected. An HTMLLoader object cannot display PDF content.                                                                                                                         |
| HTMLPDFCapability.ERROR_INSTALLED_READER_TOO_OLD   | Adobe Reader has been detected, but the version is too old. An HTMLLoader object cannot display PDF content.                                                                                                     |
| HTMLPDFCapability.ERROR_PREFERRED_READER_TOO_OLD   | A sufficient version (8.1 or later) of Adobe Reader is detected, but the version of Adobe Reader that is set up to handle PDF content is older than Reader 8.1. An HTMLLoader object cannot display PDF content. |

On Windows, if Adobe Acrobat or Adobe Reader version 7.x or above is running on
the user's system, that version is used even if a later version that supports
loading PDF is installed. In this case, if the value of the `pdfCapability`
property is `HTMLPDFCapability.STATUS_OK`, when an AIR application attempts to
load PDF content, the older version of Acrobat or Reader displays an alert (and
no exception is thrown in the AIR application). If this is a possible situation
for your end users, consider providing them with instructions to close Acrobat
while running your application. You may want to display these instructions if
the PDF content does not load within an acceptable time frame.

On Linux, AIR looks for Adobe Reader in the PATH exported by the user (if it
contains the acroread command) and in the /opt/Adobe/Reader directory.

The following code detects whether a user can display PDF content in an AIR
application. If the user cannot display PDF, the code traces the error code that
corresponds to the HTMLPDFCapability error object:

    if(HTMLLoader.pdfCapability == HTMLPDFCapability.STATUS_OK)
    {
    	trace("PDF content can be displayed");
    }
    else
    {
    	trace("PDF cannot be displayed. Error code:", HTMLLoader.pdfCapability);
    }

## Loading PDF content

You can add a PDF to an AIR application by creating an HTMLLoader instance,
setting its dimensions, and loading the path of a PDF.

The following example loads a PDF from an external site. Replace the URLRequest
with the path to an available external PDF.

    var request:URLRequest = new URLRequest("http://www.example.com/test.pdf");
    pdf = new HTMLLoader();
    pdf.height = 800;
    pdf.width = 600;
    pdf.load(request);
    container.addChild(pdf);

You can also load content from file URLs and AIR-specific URL schemes, such as
app and app-storage. For example, the following code loads the test.pdf file in
the PDFs subdirectory of the application directory:

app:/js_api_reference.pdf

For more information on AIR URL schemes, see
[URI schemes](../networking-and-communication/http-communications/loading-external-data.md#uri-schemes).

## Scripting PDF content

You can use JavaScript to control PDF content just as you can in a web page in
the browser.

JavaScript extensions to Acrobat provide the following features, among others:

- Controlling page navigation and magnification

- Processing forms within the document

- Controlling multimedia events

Full details on JavaScript extensions for Adobe Acrobat are provided at the
Adobe Acrobat Developer Connection at
[JavaScript for Acrobat](https://web.archive.org/web/20140302020537/https://www.adobe.com/devnet/acrobat/javascript.html).

### HTML-PDF communication basics

JavaScript in an HTML page can send a message to JavaScript in PDF content by
calling the `postMessage()` method of the DOM object representing the PDF
content. For example, consider the following embedded PDF content:

    <object id="PDFObj" data="test.pdf" type="application/pdf" width="100%" height="100%"/>

The following JavaScript code in the containing HTML content sends a message to
the JavaScript in the PDF file:

    pdfObject = document.getElementById("PDFObj");
    pdfObject.postMessage(["testMsg", "hello"]);

The PDF file can include JavaScript for receiving this message. You can add
JavaScript code to PDF files in some contexts, including the document-, folder-,
page-, field-, and batch-level contexts. Only the document-level context, which
defines scripts that are evaluated when the PDF document opens, is discussed
here.

A PDF file can add a `messageHandler` property to the `hostContainer` object.
The `messageHandler` property is an object that defines handler functions to
respond to messages. For example, the following code defines the function to
handle messages received by the PDF file from the host container (which is the
HTML content embedding the PDF file):

    this.hostContainer.messageHandler = {onMessage: myOnMessage};

    function myOnMessage(aMessage)
    {
    	if(aMessage[0] == "testMsg")
    	{
    		app.alert("Test message: " + aMessage[1]);
    	}
    	else
    	{
    		app.alert("Error");
    	}
    }

JavaScript code in the HTML page can call the `postMessage()` method of the PDF
object contained in the page. Calling this method sends a message (
`"Hello from HTML"`) to the document-level JavaScript in the PDF file:

    <html>
    <head>
    <title>PDF Test</title>
    <script>
        function init()
        {
            pdfObject = document.getElementById("PDFObj");
            try
    		{
                pdfObject.postMessage(["alert", "Hello from HTML"]);
            }
            catch (e)
            {
                alert( "Error: \n name = " + e.name + "\n message = " + e.message );
            }
        }
    </script>
    </head>
    <body onload='init()'>
        <object
            id="PDFObj"
            data="test.pdf"
            type="application/pdf"
            width="100%" height="100%"/>
    </body>
    </html>

For a more advanced example, and for information on using Acrobat 8 to add
JavaScript to a PDF file, see
[Cross-scripting PDF content in Adobe AIR](https://web.archive.org/web/20150121072654/http://www.adobe.com/devnet/air/flex/quickstart/articles/scripting_pdf.html).

### Scripting PDF content from ActionScript

ActionScript code (in SWF content) cannot directly communicate with JavaScript
in PDF content. However, ActionScript can communicate with the JavaScript in the
HTML page loaded in an HTMLLoader object that loads PDF content, and that
JavaScript code can communicate with the JavaScript in the loaded PDF file. For
more information, see
[Programming HTML and JavaScript in AIR](../html-content-in-air/programming-html-and-javascript-in-air/index.md).

## Known limitations for PDF content in AIR

PDF content in Adobe AIR has the following limitations:

- PDF content does not display in a window (a NativeWindow object) that is
  transparent (where the `transparent` property is set to `true`).

- The display order of a PDF file operates differently than other display
  objects in an AIR application. Although PDF content clips correctly according
  to HTML display order, it will always sit on top of content in the AIR
  application's display order.

- If certain visual properties of an HTMLLoader object that contains a PDF
  document are changed, the PDF document will become invisible. These properties
  include the `filters`, `alpha`, `rotation`, and `scaling` properties. Changing
  these properties renders the PDF content invisible until the properties are
  reset. The PDF content is also invisible if you change these properties of
  display object containers that contain the HTMLLoader object.

- PDF content is visible only when the `scaleMode` property of the Stage object
  of the NativeWindow object containing the PDF content is set to
  `StageScaleMode.NO_SCALE`. When it is set to any other value, the PDF content
  is not visible.

- Clicking links to content within the PDF file update the scroll position of
  the PDF content. Clicking links to content outside the PDF file redirect the
  HTMLLoader object that contains the PDF (even if the target of a link is a new
  window).

- PDF commenting workflows do not function in AIR.
