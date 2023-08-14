# Accessing AIR API classes from JavaScript

In addition to the standard and extended elements of Webkit, HTML and JavaScript
code can access the host classes provided by the runtime. These classes let you
access the advanced features that AIR provides, including:

- Access to the file system

- Use of local SQL databases

- Control of application and window menus

- Access to sockets for networking

- Use of user-defined classes and objects

- Sound capabilities

  For example, the AIR file API includes a File class, contained in the
  flash.filesystem package. You can create a File object in JavaScript as
  follows:

      var myFile = new window.runtime.flash.filesystem.File();

  The `runtime` object is a special JavaScript object, available to HTML content
  running in AIR in the application sandbox. It lets you access runtime classes
  from JavaScript. The `flash` property of the `runtime` object provides access
  to the flash package. In turn, the `flash.filesystem` property of the
  `runtime` object provides access to the flash.filesystem package (and this
  package includes the File class). Packages are a way of organizing classes
  used in ActionScript.

  Note: The `runtime` property is not automatically added to the window objects
  of pages loaded in a frame or iframe. However, as long as the child document
  is in the application sandbox, the child can access the `runtime` property of
  the parent.

  Because the package structure of the runtime classes would require developers
  to type long strings of JavaScript code strings to access each class (as in
  `window.runtime.flash.desktop.NativeApplication`), the AIR SDK includes an
  AIRAliases.js file that lets you access runtime classes much more easily (for
  instance, by simply typing `air.NativeApplication`).

  The AIR API classes are discussed throughout this guide. Other classes from
  the Flash Player API, which may be of interest to HTML developers, are
  described in the _Adobe AIR API Reference for HTML Developers_. ActionScript
  is the language used in SWF (Flash Player) content. However, JavaScript and
  ActionScript syntax are similar. (They are both based on versions of the
  ECMAScript language.) All built-in classes are available in both JavaScript
  (in HTML content) and ActionScript (in SWF content).

  Note: JavaScript code cannot use the Dictionary, XML, and XMLList classes,
  which are available in ActionScript.

More Help topics

[Using the AIRAliases.js file](./using-the-airaliases-js-file.md)
