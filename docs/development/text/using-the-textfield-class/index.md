# Using the TextField class

You can use an instance of the TextField class to display text or create a text
input field on the screen in Adobe® Flash® Player or Adobe® AIR™. The TextField
class is the basis for other text-based components, such as the TextArea
components or the TextInput components.

Text field content can be pre-specified in the SWF file, loaded from a text file
or database, or entered by a user interacting with your application. Within a
text field, the text can appear as rendered HTML content, with images embedded
in the rendered HTML. After you create an instance of a text field, you can use
flash.text classes, such as TextFormat and StyleSheet, to control the appearance
of the text. The
[flash.text package](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/text/package-detail.html)
contains nearly all the classes related to creating, managing, and formatting
text in ActionScript.

You can format text by defining the formatting with a TextFormat object and
assigning that object to the text field. If your text field contains HTML text,
you can apply a StyleSheet object to the text field to assign styles to specific
pieces of the text field content. The TextFormat object or StyleSheet object
contains properties defining the appearance of the text, such as color, size,
and weight. The TextFormat object assigns the properties to all the content
within a text field or to a range of text. For example, within the same text
field, one sentence can be bold red text and the next sentence can be blue
italic text.

In addition to the classes in the flash.text package, you can use the
flash.events.TextEvent class to respond to user actions related to text.

- [Displaying text](./displaying-text.md)
- [Selecting and manipulating text](./selecting-and-manipulating-text.md)
- [Capturing text input](./capturing-text-input.md)
- [Restricting text input](./restricting-text-input.md)
- [Formatting text](./formatting-text.md)
- [Advanced text rendering](./advanced-text-rendering.md)
- [Working with static text](./working-with-static-text.md)
- [TextField Example: Newspaper-style text formatting](./textfield-example-newspaper-style-text-formatting.md)

More Help topics

[Text](https://web.archive.org/web/20111120185735/https://help.adobe.com/en_US/Flash/10.0_UsingFlash/WSd60f23110762d6b883b18f10cb1fe1af6-7d54a.html)

[MX text controls](https://web.archive.org/web/20150303093237/https://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7d84.html)
