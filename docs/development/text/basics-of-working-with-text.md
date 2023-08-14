---
sidebar_position: 1
---

# Basics of Working with text

To display text on the screen in Adobe® Flash® Player or Adobe® AIR™, use an
instance of the TextField class or use the Flash Text Engine classes. These
classes allow you to create, display, and format text. Alternatively, you can
use the Text Layout Framework (TLF) — a component library based on the Flash
Text Engine classes, but designed for ease of use. On mobile devices, you can
use the StageText class for text input.

You can establish specific content for text fields, or designate the source for
the text, and then set the appearance of that text. You can also respond to user
events as the user inputs text or clicks a hypertext link.

Both the TextField class and the Flash Text Engine classes allow you to display
and manage text in Flash Player and AIR.You can use the TextField class to
create text objects for display and input. The TextField class provides the
basis for other text-based components, such as TextArea and TextInput. You can
use the TextFormat class to set character and paragraph formatting for TextField
objects and you can apply Cascading Style Sheets (CSS) using the
Textfield.styleSheet property and the StyleSheet class. You can assign
HTML-formatted text, which can contain embedded media (movie clips, SWF files,
GIF files, PNG files, and JPEG files), directly to a text field.

The Flash Text Engine, available starting with Flash Player 10 and Adobe AIR
1.5, provides low-level support for sophisticated control of text metrics,
formatting, and bi-directional text. It also offers improved text flow and
enhanced language support. While you can use the Flash Text Engine to create and
manage text elements, it is primarily designed as the foundation for creating
text-handling components and requires greater programming expertise.The Text
Layout Framework, which includes a text-handling component based on the Flash
Text Engine, provides an easier way to use the advanced features of the new text
engine. The Text Layout Framework is an extensible library built entirely in
ActionScript 3.0. You can use the existing TLF component, or use the framework
to build your own text component.

The StageText class, available starting in AIR 3, provides a native text input
field. Because this field is provided by the device operating system, it
provides the experience with which users of a device are most familiar. A
StageText instance is not a display object. Instead of adding it to the display
list, you assign an instance a stage and a display area on that stage called a
viewport. The StageText instance displays in front of any display objects.

For more information on these topics, see:

- [Using the TextField class](./using-the-textfield-class/index.md)

- [Using the Flash Text Engine](./using-the-flash-text-engine/index.md)

- [Using the Text Layout Framework](./using-the-text-layout-framework.md)

- [Native text input with StageText](https://web.archive.org/web/20170629011903/http://blogs.adobe.com/cantrell/archives/2011/09/native-text-input-with-stagetext.html)

#### Important concepts and terms

The following reference list contains important terms involved with text
handling:

Cascading style sheets  
A standard syntax for specifying styles and formatting for content that's
structured in XML (or HTML) format.

Device font  
A font that is installed on the user's machine.

Dynamic text field  
A text field whose contents can be changed by ActionScript but not by user
input.

Embedded font  
A font that has its character outline data stored in the application SWF file.

HTML text  
Text content entered into a text field using ActionScript that includes HTML
formatting tags along with actual text content.

Input text field  
A text field whose contents can be changed either by user input or by
ActionScript.

Kerning  
An adjustment of the spacing between pairs of characters to make the spacing in
words more proportional and the text easier to read.

Static text field  
A text field created in the authoring tool, whose content cannot change when the
SWF file is running.

Text line metrics  
Measurements of the size of various parts of the text content in a text field,
such as the baseline of the text, the height of the top of the characters, size
of descenders (the part of some lowercase letters that extends below the
baseline), and so on.

Tracking  
An adjustment of spacing between groups of letters or blocks of text to increase
or decrease the density and make the text more readable.
