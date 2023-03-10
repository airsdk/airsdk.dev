---
title: Create an Application
sidebar_position: 5
---

## Create an Application using `asconfig`

[asconfig.json](https://github.com/BowlerHatLLC/vscode-as3mxml/wiki/asconfig.json) is a file describing how an application or library is compiled.

### Installation

To work with asconfig.json, you have two options:

- Use the Visual Studio Code IDE and install the extension _ActionScript & MXML_.
- Use the command `asconfigc`, which can be installed with Node.js through `npm i -g asconfigc`.

### Creating basic application

1. Create an asconfig.json file in the project root directory:

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

2. Create an empty directory `libs`. You may also optionally place a `.gitignore` file into it.

3. Create an application descriptor file:

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

4. Create the entry point ActionScript program:

_src/Main.as_:

```actionscript
package
{
    import flash.display.Sprite;

    public class Main extends Sprite
    {
        public function Main()
        {
            // entry point
        }
    }
}
```

You can now debug the project from the Visual Studio Code IDE or run the `asconfigc` command.

More information:

- [`asconfig.json` Documentation](https://github.com/BowlerHatLLC/vscode-as3mxml/wiki/asconfig.json)
- [`asconfigc` Command](https://www.npmjs.com/package/asconfigc)

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
