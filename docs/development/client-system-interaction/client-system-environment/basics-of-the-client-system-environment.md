---
sidebar_position: 1
---

# Basics of the client system environment

As you build more advanced applications, you may find a need to know details
about—and access functions of—your users' operating systems. The flash.system
package contains a collection of classes that allow you to access system-level
functionality such as the following:

- Determining which application and security domain code is executing in

- Determining the capabilities of the user's Flash runtime (such as Flash®
  Player or Adobe® AIR™) instance, such as the screen size (resolution) and
  whether certain functionality is available, such as mp3 audio

- Building multilingual sites using the IME

- Interacting with the Flash runtime's container (which could be an HTML page or
  a container application).

- Saving information to the user's clipboard

The flash.system package also includes the IMEConversionMode and SecurityPanel
classes. These classes contain static constants that you use with the IME and
Security classes, respectively.

#### Important concepts and terms

The following reference list contains important terms:

Operating system  
The main program that runs on a computer, within which all other applications
run—such as Microsoft Windows, Mac OS X, or Linux®.

Clipboard  
The operating system's container for holding text or items that are copied or
cut, and from which items are pasted into applications.

Application domain  
A mechanism for separating classes used in different SWF files, so that if the
SWF files include different classes with the same name, the classes don't
overwrite each other.

IME (input method editor)  
A program (or operating system tool) that is used to enter complex characters or
symbols using a standard keyboard.

Client system  
In programming terms, a client is the part of an application (or whole
application) that runs on an individual's computer and is used by a single user.
The client system is the underlying operating system on the user's computer.
