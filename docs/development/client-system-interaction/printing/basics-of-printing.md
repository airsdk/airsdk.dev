---
sidebar_position: 1
---

# Basics of printing

In ActionScript 3.0, you use the PrintJob class to create snapshots of display
content to convert to the ink-and-paper representation in a printout. In some
ways, setting up content for printing is the same as setting it up for on-screen
display—you position and size elements to create the desired layout. However
printing has some idiosyncrasies that make it different from screen layout. For
example, printers use different resolution than computer monitors; the contents
of a computer screen are dynamic and can change, while printed content is
inherently static; and in planning printing, consider the constraints of fixed
page size and the possibility of multipage printing.

Even though these differences seem obvious, it's important to keep them in mind
when setting up printing with ActionScript. Accurate printing depends on a
combination of the values specified by you and the characteristics of the user's
printer. The PrintJob class includes properties that allow you to determine the
important characteristics of the user's printer.

#### Important concepts and terms

The following reference list contains important terms related to printing:

Spooler  
A portion of the operating system or printer driver software that tracks the
pages as they are waiting to be printed and sends them to the printer when it is
available.

Page orientation  
The rotation of the printed content in relation to the paper—either horizontal
(landscape) or vertical (portrait).

Print job  
The page or set of pages that make up a single printout.
