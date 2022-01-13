---
title: Application compiler (mxmlc)
sidebar_position: 2
---

You use the application compiler to compile SWF files from your ActionScript and MXML source files.

The application compiler’s options let you define settings such as the library path and whether to include debug information in the resulting SWF file. Also, you can set application-specific settings such as the frame rate at which the SWF file should play and its height and width.

To invoke the application compiler with AIR SDK, you use the `mxmlc`/`amxmlc` command-line utilities.

You can compile the Adobe® ActionScript® 3.0 and MXML assets of your AIR application with the command-line MXML compiler (`amxmlc`/`mxmlc`). You use the compiler to generate `SWF` files.

:::note
To compile a SWF in Animate, simply publish the movie to a SWF file.
:::

The basic command-line pattern for using amxmlc is:

```
amxmlc [compiler options] target_file
```

The default option is the target file to compile into a SWF file, and it is required to have a value. If you use a space separated list as part of the options, you can terminate the list with a double hyphen before adding the target file; for
example:

```
amxmlc -option arg1 arg2 arg3 -- target_file.mxml
```

The default output of mxmlc is filename.swf, where filename is the name of the root application file. The default output location is in the same directory as the target, unless you specify an output file and location with the `output` option.

### Basic example of using mxmlc

The most basic example is one in which the MXML file has no external dependencies (such as components in a SWC file or ActionScript classes) and no special options. In this case, you invoke the mxmlc compiler and point it to your MXML file as the following example shows:

```
mxmlc c:/myfiles/app.mxml
```

The default option is the target file to compile into a SWF file, and it is required to have a value. If you use a space separated list as part of the options, you can terminate the list with a double hyphen before adding the target file; for example:

```
mxmlc -option arg1 arg2 arg3 -- target_file.mxml
```

## `amxmlc` configuration

The `amxmlc` command invokes the standard Flex `mxmlc` compiler with an additional parameter, `+configname=air`. This parameter instructs the compiler to use the `air-config.xml` file instead of the `flex-config.xml` file. Using `amxmlc` is otherwise identical to using `mxmlc`.

The compiler loads the `air-config.xml` configuration file specifying the AIR and Flex libraries typically required to compile an AIR application. You can also use a local, project-level configuration file to override or add additional options to the global configuration. Typically, the easiest way to create a local configuration file is to edit a copy of the global version. You can load the local file with the `-load-config` option:

- `-load-config=project-config.xml` Overrides global options.

- `-load-config+=project-config.xml` Adds additional values to those global options that take more than value, such as the -library-path option. Global options that only take a single value are overridden.

If you use a special naming convention for the local configuration file, the amxmlc compiler loads the local file automatically. For example, if the main MXML file is `RunningMan.mxml`, then name the local configuration file: `RunningMan-config.xml`. Now, to compile the application, you only have to type:

```
amxmlc RunningMan.mxml
```

`RunningMan-config.xml` is loaded automatically since its filename matches that of the compiled MXML file.

## Application compiler options

The following table describes the application compiler options.

TODO

## Using SWC files

Often, you use SWC files when compiling files. SWC files can provide themes, components, or other helper files. You typically specify SWC files used by the application by using the library-path option. The following example compiles the RotationApplication.mxml file into the RotationApplication.swf file:

```
mxmlc -library-path+=c:/mylibraries/MyButtonSwc.swc c:/myfiles/comptest/testRotation.mxml
```

In a configuration file, this appears as follows:

```
<compiler>
	<library-path>
		<path-element>libs</path-element>
		<path-element>libs/player</path-element>
		<path-element>libs/player/{targetPlayerMajorVersion}.{targetPlayerMinorVersion}</path-element>
		<path-element>locale/{locale}</path-element>
		<path-element>c:/mylibraries/MyButtonSwc.swc</path-element>
	</library-path>
</compiler>
```

## About incremental compilation

You can use incremental compilation to decrease the time it takes to compile an application or component library with the application compilers. When incremental compilation is enabled, the compiler inspects changes to the bytecode between revisions and only recompiles the section of bytecode that has changed. These sections of bytecode are also referred to as compilation units.

You enable incremental compilation by setting the `incremental` option to `true`, as the following example shows:

```
mxmlc -incremental=true MyApp.mxml
```

Incremental compilation means that the compiler inspects your code, determines which parts of the application are affected by your changes, and only recompiles the newer classes and assets. The compilers generate many compilation units that do not change between compilation cycles. It is possible that when you change one part of your application, the change might not have any effect on the bytecode of another.
As part of the incremental compilation process, the compiler generates a cache file that lists the compilation units of your application and information on your application’s structure. This file is located in the same directory as the file that you are compiling. For example, if my application is called `MyApp.mxml`, the cache file is called `MyApp.mxml.cache`. This file helps the compiler determine which parts of your application must be recompiled. One way to force a complete recompile is to delete the cache file from the directory.

Incremental compilation can help reduce compile time on small applications, but you achieve the biggest gains on larger applications.

For the mxmlc command-line compiler, the default is `false`.

## Using conditional compilation

To include or exclude blocks of code for certain builds, you can use conditional compilation. The mxmlc compiler lets you pass the values of constants to the application at compile time. Commonly, you pass a Boolean that is used to include or exclude a block of code such as debugging or instrumentation code. The following example conditionalizes a block of code by using an inline constant Boolean:

```
CONFIG::debugging {
	// Execute debugging code here.
}
```

To pass constants, you use the `compiler.define` compiler option. The constant can be a Boolean, String, or Number, or an expression that can be evaluated in ActionScript at compile time. This constant is then accessible within the application source code as a global constant.

To use the define option, you define a configuration namespace for the constant, a variable name, and a value using the following syntax:

```
-define=namespace::variable_name,value
```

The configuration namespace can be anything you want. The following example defines the constant debugging with a value of true in the CONFIG namespace:

```
-define=CONFIG::debugging,true
```

You use the `+=` operator rather than the `=` operator to append definitions on the command line to the definitions set in the configuration file. Use the `=` operator to replace the definitions in the configuration file with the definitions on
the command line.

To set the values of multiple constants on the command-line, use the define option more than once; for example:

```
mxmlc -define+=CONFIG::debugging,true -define+=CONFIG::release,false MyApp.mxml
```

To set the value of these constants in the flex-config.xml file, rather than on the command line, you write this as the following example shows:

```
<compiler>
	<define append="true">
		<name>CONFIG::debugging</name>
		<value>true</value>
	</define>
	<define append="true">
		<name>CONFIG::release</name>
		<value>false</value>
	</define>
</compiler>
```

If you set the same definition in a configuration file and on the command line, the value on the command line takes precedence.
In a Flex Ant task, you can set constants with a define element, as the following example shows:

```
<mxmlc ... >
<define name="CONFIG::debugging" value="true"/>
<define name="CONFIG::release" value="false"/>
</mxmlc>
```

### Using inline constants

You can use inline constants in ActionScript. Boolean values can be used to conditionalize top-level definitions of functions, classes, and variables, in much the same way you would use an #IFDEF preprocessor command in C or C++. You cannot use constant Boolean values to conditionalize metadata or import statements.

The following example conditionalizes which class definition the compiler uses when compiling the application:

```actionscript
// compilers/MyButton.as
package {
	import mx.controls.Button;
	CONFIG::debugging
	public class MyButton extends Button {
		public function MyButton() {
			super();
			// Set the label text to blue.
			setStyle("color", 0x0000FF);
		}
	}
	CONFIG::release
	public class MyButton extends Button {
		public function MyButton() {
			super();
			// Set the label text to red.
			setStyle("color", 0xFF0000);
		}
	}
}
```

You can also pass Strings and Numbers to the application and use them as inline constants, in the same way you might use a `#define` directive in C or C++. For example, if you pass a value named `NAMES::Company`, you replace it with a constant in your application by using an ActionScript statement like the following example shows:

```actionscript
private static const companyName:String = NAMES::Company;
```

### Passing expressions

You can pass expressions that can be evaluated at compile time as the value of the constant. The following example evaluates to `false`:

```
-define+=CONFIG::myConst,"1 > 2"
```

The following example evaluates to 3:

```
-define+=CONFIG::myConst,"4 - 1"
```

Expressions can contain constants and other configuration values; for example:

```
-define+=CONFIG::bool2,false -define+=CONFIG::and1,"CONFIG::bool2 && false"
```

In general, you should wrap all constants with double quotes, so that the mxmlc compiler correctly parses them as a single argument.

### Passing Strings

When passing Strings, you must add extra quotes to ensure that the compiler parses them correctly. To define Strings on the command-line, you must surround them with double-quotes, and either escape-quote them (`"\"Adobe Systems\""` or `"\\x\\x`) or single-quote them (`"'Adobe Systems'"`).

The following example shows both methods of including Strings on the command line:

```
-define+=NAMES::Company,"'Adobe Systems'" -define+=NAMES::Ticker,"\"ADBE\""
```

To define Strings in configuration files, you must surround them with single or double quotes; for example:

```xml
<define>
	<name>NAMES::Company</name>
	<value>'Adobe Systems'</value>
</define>
<define>
	<name>NAMES::Ticker</name>
	<value>"ADBE"</value>
</define>
```

To pass empty Strings on the command line, use single quotes surrounded by double quotes, as the following example shows:

```
-define+=CONFIG::debugging,"''"
```

To pass empty Strings in configuration files, use double quotes (`""`) or single quotes (`' '`).

## Editing application settings

The mxmlc compiler includes options to set the application’s frame rate, size, and script limits.

The following command-line example sets default application properties:

```
mxmlc -default-size 240 240 \
      -default-frame-rate=24 \
	  -default-script-limits 5000 10 -- \
	  c:/myfiles/flex/misc/MainApp.mxml
```

### mxmlc examples

The following examples demonstrate use of the `amxmlc` compiler. (Only the ActionScript and MXML assets of your application must be compiled.)

Compile an AIR MXML file:

```
amxmlc myApp.mxml
```

Compile and set the output name:

```
amxmlc –output anApp.swf -- myApp.mxml
```

Compile an AIR ActionScript file:

```
amxmlc myApp.as
```

Specify a compiler configuration file:

```
amxmlc –load-config config.xml -- myApp.mxml
```

Add additional options from another configuration file:

```
amxmlc –load-config+=moreConfig.xml -- myApp.mxml
```

Add libraries on the command line (in addition to the libraries already in the configuration file):

```
amxmlc –library-path+=/libs/libOne.swc,/libs/libTwo.swc  -- myApp.mxml
```

Compile an AIR MXML file without using a configuration file (Win):

```
mxmlc -library-path [AIR SDK]/frameworks/libs/air/airframework.swc, ^
[AIR SDK]/frameworks/libs/air/airframework.swc, ^
-library-path [Flex SDK]/frameworks/libs/framework.swc ^
-- myApp.mxml
```

Compile an AIR MXML file without using a configuration file (Mac OS X or Linux):

```
mxmlc -library-path [AIR SDK]/frameworks/libs/air/airframework.swc, \
[AIR SDK]/frameworks/libs/air/airframework.swc, \
-library-path [Flex 3 SDK]/frameworks/libs/framework.swc \
-- myApp.mxml
```

Compile an AIR MXML file to use a runtime-shared library:

```
amxmlc -external-library-path+=../lib/myLib.swc -runtime-shared-libraries=myrsl.swf -- myApp.mxml
```

Compile an AIR MXML file to use an ANE (be sure to use ‑external‑library‑path for the ANE):

```
amxmlc -external-library-path+=../lib/myANE.ane -output=myAneApp.swf -- myAneApp.mxml
```

Compiling from Java (with the class path set to include mxmlc.jar):

```
java flex2.tools.Compiler +flexlib [Flex SDK 3]/frameworks +configname=air [additional compiler options] -- myApp.mxml
```

The flexlib option identifies the location of your Flex SDK frameworks directory, enabling the compiler to locate the flex_config.xml file.

Compiling from Java (without the class path set):

```
java -jar [Flex SDK 2]/lib/mxmlc.jar +flexlib [Flex SDK 3]/frameworks +configname=air [additional compiler options] -- myApp.mxml
```

To invoke the compiler using Apache Ant (the example uses a Java task to run mxmlc.jar):

```xml
<property name="SDK_HOME" value="C:/Flex46SDK"/>
<property name="MAIN_SOURCE_FILE" value="src/myApp.mxml"/>
<property name="DEBUG" value="true"/>
<target name="compile">
    <java jar="${MXMLC.JAR}" fork="true" failonerror="true">
        <arg value="-debug=${DEBUG}"/>
        <arg value="+flexlib=${SDK_HOME}/frameworks"/>
        <arg value="+configname=air"/>
        <arg value="-file-specs=${MAIN_SOURCE_FILE}"/>
    </java>
</target>
```

For more on using `ant` see the [Apache Ant documentation](/docs/tools/building/ant/index)
