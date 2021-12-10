---
title: application 
sidebar_position: 2
---

The `application` element is the top-level element within the Application Descriptor XML file. It can contain the following elements:

- `id` (required): An identifier string for the application, known as the application ID. A reverse DNS-style identifier is often used, but this style is not required.
  This ID value can only contain alphanumeric characters (0-9, a-z, A-Z) plus dot (.) and hyphon (-) characters, with a maximum length of 212 characters.

- `versionNumber` (required): The version number for the application. This can contain a sequence of up to three integers separated by periods. Each integer must be a number between 0 and 999 (inclusive).

- `versionLabel` (optional): A version string that will be displayed to the user in installation dialogs. If this value is not provided, the `versionNumber` field will be used instead.

- `publisherID` (deprecated): This may only be specified when creating a package for updating an application originally created with AIR version 1.5.2 or earlier.

- `name` (optional): The name of the application, to display within the installation dialogs. If this value is not provided, the `filename` field will be used instead.
  Note that this element may either be a simple string, or may contain a set of localised names - see below.

- `filename` (required): The filename to use when installing the application. This can contain any UTF-8 character above 0x1F, other than one of: `*"/:<>?\|`, and must not start or end with a space or dot.
  It is advised to keep the filename set to the ASCII range of characters, particularly when targeting an iPhone or iPad device, to avoid issues with the filesystems on these devices.

- `description` (optional): A description to display within the installation dialogs. This element may either be a simple string, or may contain a set of localised descriptions - see below.

- `copyright` (optional): The copyright information for the AIR application. On Mac OS, the copyright text appears in the About dialog box for the installed application.
  On Mac OS, the copyright information is also used in the NSHumanReadableCopyright field in the Info.plist file for the application.

- `icon` (optional): An element containing a set of icon files of varying sizes that are used to create the application icon.
  Child items for this element are `image16x16`, `image32x32`, `image128x128`, etc: the images are handled differently for different operating systems which may have specific requirements on icon sizes.

- `supportedProfiles` (optional): Identifies the profiles that are supported for the application. Any combination of the following profiles can be specified:

  - desktop: The desktop profile is for AIR applications that are installed on a desktop computer using an AIR file. These applications do not have access to the NativeProcess class (which provides communication with native applications).
  - extendedDesktop: The extended desktop profile is for AIR applications that are installed on a desktop computer using a native application installer. These applications have access to the NativeProcess class and can run AIR Native Extensions.
  - mobileDevice: The mobile device profile is for mobile applications.
  - extendedMobileDevice: The extended mobile device profile is not currently in use.

  The supportedProfiles property is optional. When you do not include this element in the application descriptor file, the application can be compiled and deployed for any profile.
  To specify multiple profiles, separate each with a space character. For example, the following setting specifies that the application is only available in the desktop and extended profiles:

  ```xml
  <supportedProfiles>desktop extendedDesktop</supportedProfiles>
  ```

  Note: When you run an application with ADL and do not specify a value for the ADL -profile option, then the first profile in the application descriptor is used. (If no profiles are specified in the application descriptor either, then the desktop profile is used.)

- `supportedLanguages` (optional): Identifies the languages supported by the application. This element is only used by iOS, Mac captive runtime, and Android applications. This element is ignored by all other application types.
  If you do not specify this element, then by default the packager performs the following actions based on the application type:

  - iOS — All languages supported by the AIR runtime are listed in the iOS app store as supported languages of the application.
  - Mac captive runtime — Application packaged with captive bundle has no localization information.
  - Android — Application bundle has resources for all languages supported by the AIR runtime.

  The element should contain a space-delimited list of supported languages. Valid language values are ISO 639-1 values for the languages supported by the AIR runtime: en, de, es, fr, it, ja, ko, pt, ru, cs, nl, pl, sv, tr, zh, da, nb, iw.

  The packager generates an error for an empty value for the `supportedLanguages` element.

  Note: Localized tags (such as the name tag) ignore the value of a language if you use the `supportedLanguages` tag and it does not contain that language. If a native extension has resources for a language which is not specified by the `supportedLangauges` tag, a warning is issued and the resources are ignored for that language.

- `installFolder` (optional): Identifies the subdirectory of the default installation directory.
  On Windows, the default installation subdirectory is the Program Files directory. On Mac OS, it is the /Applications directory. On Linux, it is /opt/.

  For example, if the installFolder property is set to "Acme" and an application is named "ExampleApp", then the application is installed in C:\Program Files\Acme\ExampleApp on Windows, in /Applications/Acme/Example.app on MacOS, and /opt/Acme/ExampleApp on Linux.

  If you do not specify an installFolder property, the application is installed in a subdirectory of the default installation directory, based on the name property.
  The installFolder property can contain any Unicode (UTF-8) character except those that are prohibited from use as folder names on various file systems (see the `filename` property for the list of exceptions).
  Use the forward-slash (/) character as the directory separator character if you want to specify a nested subdirectory.

- `programMenuFolder` (optional): Identifies the location in which to place shortcuts to the application in the All Programs menu of the Windows operating system or in the Applications menu on Linux.
  This setting is currently ignored on other operating systems.

  The string used for the programMenuFolder value can contain any Unicode (UTF-8) character except those that are prohibited from use as folder names on various file systems (see the `filename` element for the list of exceptions). Do not use a forward slash (/) character as the last character of this value.

- `customUpdateUI` (optional): Indicates whether an application will provide its own update dialogs.
  If false (or missing), AIR presents standard update dialogs to the user. Only desktop applications distributed as AIR files can use the built-in AIR update system.

  When the installed version of your application has the customUpdateUI element set to true and the user then double-clicks the AIR file for a new version or installs an update of the application using the seamless install feature, the runtime opens the installed version of the application. The runtime does not open the default AIR application installer. Your application logic can then determine how to proceed with the update operation. (The application ID and publisher ID in the AIR file must match the values in the installed application for an upgrade to proceed.)

- `allowBrowserInvocation` (deprecated): This setting was used to trigger the launch of an AIR application from a browser - however this used a utility running within the Flash Player in the browser.
  Following the removal of support for the Flash Player, this setting will be ignored.

- embedFonts (optional): Allows you to use custom fonts on StageText in the AIR application. The embedFonts element may contain any number of font elements.

  For example:

  ```xml
  <embedFonts>
    <font>
      <fontPath>ttf/space age.ttf</fontPath>
      <fontName>space age</fontName>
    </font>
    <font>
      <fontPath>ttf/xminus.ttf</fontPath>
      <fontName>xminus</fontName>
    </font>
  </embedFonts>
  ```

- `resdir` (optional): A folder that should be treated as containing Android resources files, to be merged in with the standard AIR application resources when building an APK or Android App Bundle file.

- `fileTypes` (optional): The fileTypes element allows you to declare the file types with which an AIR application can be associated on a desktop installation. It contains an array of `fileType` elements - see below.

- `extensions` (optional): Identifies the AIR Native Extensions used by an application. This element contains a list of `extensionID` entries, each of which declares the identifier of an AIR Native Extension
  that will need to be loaded by the AIR runtime at application start-up.

  For example:

  ```xml
  <extensions>
    <extensionID>extension.first</extensionID>
    <extensionID>extension.next</extensionID>
    <extensionID>extension.last</extensionID>
  </extensions>
  ```

## Other elements

The `application` element can also contain other elements that are described further in other sections:

- [`initialWindow`](./initialWindow)
- [`iPhone`](./iPhone)
- [`android`](./android)
- [`macOS`](./macOS)
- [`windows`](./windows)

## Localisation

Some descriptor elements - `name` and `description` - can be localised such that they will be displayed to the end user in the most appropriate entry matching the locale of the user's device.
To do this, provide a set of XML nodes with each language code that you want to support (see [RFC4646](https://www.ietf.org/rfc/rfc4646.txt)), for example:

```xml
<name>
    <text xml:lang="en">Hello AIR</text>
    <text xml:lang="fr">Bonjour AIR</text>
    <text xml:lang="es">Hola AIR</text>
	<text xml:lang="ja">こんにちは AIR</text>
</name>
```

## Registering File Types

An application descriptor file may provide a set of `fileType` elements (within the `fileTypes` element), in order to register these file types with the operating system when the AIR application is installed.
The registration is only possible (at install-time) if these file types are not already associated with another application: to override an existing association between a file type and another application,
use the `NativeApplication.setAsDefaultApplication()` method at run time (preferably with the user’s permission). Note that the runtime methods can only manage associations for the file types declared in the application descriptor.

A `fileType` entry can have a number of number of optional child elements:

- name: Identifies the name of a file type. For example: `<name>adobe.VideoFile</name>`
- extension: The extension string of a file type (without the dot). For example: `<extension>png</extension>`
- description: The file type description is displayed to the user by the operating system (not localizable). For example: `<description>PNG image</description>`
- contentType: The MIME type/subtype of the content to register. Note that the value is ignored on Linux if the file type is already registered and has an assigned MIME type. For example: `<contentType>text/plain</contentType>`
- icon: An icon to associate with files that match the registered content type. This element contains a set of `imageNNxNN` entries similar to the main AIR application icon.

If the file type registration is successful, then the operating system will identify these files using the provided details and will open them using your AIR application.
The path of the selected file will be passed to the AIR application via the `InvokeEvent` - adding an event listener for `InvokeEvent.INVOKE` to the `NativeApplication.nativeApplication` object
will trigger any invoke events to be passed to the listener function.
