# Using the AIRAliases.js file

The runtime classes are organized in a package structure, as in the following:

- `window.runtime.flash.desktop.NativeApplication`

- `window.runtime.flash.desktop.ClipboardManager`

- `window.runtime.flash.filesystem.FileStream`

- `window.runtime.flash.data.SQLDatabase`

  Included in the AIR SDK is an AIRAliases.js file that provide "alias"
  definitions that let you access the runtime classes with less typing. For
  example, you can access the classes listed above by simply typing the
  following:

- `air.NativeApplication`

- `air.Clipboard`

- `air.FileStream`

- `air.SQLDatabase`

  This list is just a short subset of the classes in the AIRAliases.js file. The
  complete list of classes and package-level functions is provided in the _Adobe
  AIR API Reference for HTML Developers_.

  In addition to commonly used runtime classes, the AIRAliases.js file includes
  aliases for commonly used package-level functions: `window.runtime.trace()`,
  `window.runtime.flash.net.navigateToURL()`, and
  `window.runtime.flash.net.sendToURL()`, which are aliased as `air.trace()`,
  `air.navigateToURL()`, and `air.sendToURL()`.

  To use the AIRAliases.js file, include the following `script` reference in
  your HTML page:

      <script src="AIRAliases.js"></script>

  Adjust the path in the `src` reference, as needed.

  Important: Except where noted, the JavaScript example code in this
  documentation assumes that you have included the AIRAliases.js file in your
  HTML page.
