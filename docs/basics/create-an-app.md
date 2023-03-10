---
title: Create an Application
sidebar_position: 5
---

## Create an Application using `asconfig`

The [asconfig.json](https://github.com/BowlerHatLLC/vscode-as3mxml/wiki/asconfig.json) is a configuration file mainly supported by https://as3mxml.com which is an extension for the Visual Studio Code IDE. There is also a command line version of the extension for building the application from the asconfig.json file.

If you do not use Visual Studio Code, but have Node.js installed, you can use the command `asconfigc` by installing it via `npm`:

```sh
npm i -g asconfigc
```

Here is an example application with `asconfig.json`:

_asconfig.json_:

```json
{
    "config": "air",
    "type": "app",
    "files": [
        "src/Main.as"
    ],
    "application": "app.xml",
    "compilerOptions": {
        "source-path": ["src"],
        "library-path": ["libs"],
        "output": "build/app.swf"
    }
}
```

Some observations:

- Note the `library-path` option. It enumerates directories from where to find pre-compiled libraries (SWCs).

Create an empty directory `libs`. You may also optionally place a `.gitignore` file into it.

Here is an example application descriptor:

_app.xml_:

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<application xmlns="http://ns.adobe.com/air/application/2.7"> 
    <id>com.qux.foo</id> 
    <versionNumber>1.0</versionNumber> 
    <filename>Foo</filename> 
    <initialWindow>
        <title>Foo</title>
        <content>build/app.swf</content> 
        <visible>true</visible> 
        <width>800</width> 
        <height>600</height> 
    </initialWindow> 
</application>
```

Here is our entry point ActionScript program:

_src/Main.as_:

```actionscript
package {
    import flash.display.Sprite;

    public class Main extends Sprite {
        public function Main() {
            // entry point
        }
    }
}
```

You can now debug the project from Visual Studio Code or run the `asconfigc` command.

More information:

- [`asconfigc` command](https://www.npmjs.com/package/asconfigc)
- [`asconfig.json` file](https://github.com/BowlerHatLLC/vscode-as3mxml/wiki/asconfig.json)

## Create a Library using `asconfig`

Creating a library with `asconfig` is just a bit different. Here is an example `asconfig.json` file:

```json
{
    "config": "air",
    "type": "lib",
    "compilerOptions": {
        "include-sources": ["src"],
        "library-path": ["libs"],
        "output": "swc/my-lib.swc"
    }
}
```

## `asconfig` templates

You can find empty Adobe AIR project templates at https://github.com/hydroper/adobe-air-templates.
