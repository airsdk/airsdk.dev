# Selecting and manipulating text

You can select dynamic or input text. Since the text selection properties and
methods of the TextField class use index positions to set the range of text to
manipulate, you can programmatically select dynamic or input text even if you
don't know the content.

Note: In Flash Professional, if you choose the selectable option on a static
text field, the text field that is exported and placed on the display list is a
regular, dynamic text field.

## Selecting text

The `flash.text.TextField.selectable` property is `true` by default, and you can
programmatically select text using the `setSelection()` method.

For example, you can set specific text within a text field to be selected when
the user clicks the text field:

    var myTextField:TextField = new TextField();
    myTextField.text = "No matter where you click on this text field the TEXT IN ALL CAPS is selected.";
    myTextField.autoSize = TextFieldAutoSize.LEFT;
    addChild(myTextField);
    addEventListener(MouseEvent.CLICK, selectText);

    function selectText(event:MouseEvent):void
    {
    	myTextField.setSelection(49, 65);
    }

Similarly, if you want text within a text field to be selected as the text is
initially displayed, create an event handler function that is called as the text
field is added to the display list.

## Capturing user-selected text

The TextField `selectionBeginIndex` and `selectionEndIndex` properties, which
are "read-only" so they can't be set to programmatically select text, can be
used to capture whatever the user has currently selected. Additionally, input
text fields can use the `caretIndex` property.

For example, the following code traces the index values of user-selected text:

    var myTextField:TextField = new TextField();
    myTextField.text = "Please select the TEXT IN ALL CAPS to see the index values for the first and last letters.";
    myTextField.autoSize = TextFieldAutoSize.LEFT;
    addChild(myTextField);
    addEventListener(MouseEvent.MOUSE_UP, selectText);

    function selectText(event:MouseEvent):void
    {
    	trace("First letter index position: " + myTextField.selectionBeginIndex);
    	trace("Last letter index position: " + myTextField.selectionEndIndex);
    }

You can apply a collection of TextFormat object properties to the selection to
change the text appearance. For more information about applying a collection of
TextFormat properties to selected text, see
[Formatting ranges of text within a text field](./formatting-text.md#formatting-ranges-of-text-within-a-text-field).
