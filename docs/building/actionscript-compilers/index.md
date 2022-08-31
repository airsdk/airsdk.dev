---
title: About the compilers
sidebar_position: 1
---

Before ActionScript and MXML code can be included in an AIR application, it must be compiled.

The compilers create SWF files that are run in an in an Adobe AIR™ application (or Adobe™ Flash® Player clients). 

If you use an Integrated Development Environment (IDE), the IDE handles compilation behind the scenes and you probably will never need to use the compilers directly. However, you can also invoke the ActionScript compilers from the command line to create your SWF files when not using an IDE or when using a build script.


## The command-line compilers

You use the `mxmlc` and `compc` command-line compilers to compile your `MXML` and `AS` files into `SWF` and `SWC` files. 

- The [application compiler](application-compiler.md) (`mxmlc`) generates `SWF` files;
- The [component compiler](component-compiler.md) (`compc`) generates `SWC` files;

To use the command-line compilers, you must have a Java run-time environment in your system path.

The command-line compilers are located in the `[AIRSDK]/bin` directory.

When using `mxmlc` and `compc` on the command line, you can also use a configuration file to store your options rather than list them on the command line. You can store command-line options as XML blocks in a configuration file. 


### Command-line syntax

The mxmlc and compc compilers take many options. The options are listed in the help which you can view with the help option, as the following example shows:

```
mxmlc -help
```

This displays a menu of choices for getting help. The most common choice is to list the basic configuration options:

```
mxmlc -help list
```

To see advanced options, use the list advanced option, as the following example shows:
```
mxmlc -help list advanced
```

To see a list of entries whose names or descriptions include a particular String, use the following syntax:
```
mxmlc -help pattern
```
The following example returns descriptions for the external-library-path, library-path, and runtimeshared-libraries options:
```
mxmlc -help list library
```

For a complete description of mxmlc options, see [Application compiler options](application-compiler.md#application-compiler-options). For a
complete description of compc options, see [Component compiler options](component-compiler.md#component-compiler-options).

Many command-line options, such as `show-actionscript-warnings` and `accessible`, have `true` and `false` values. You specify these values by using the following syntax:

```
mxmlc -accessible=true -show-actionscript-warnings=true
```

Some options, such as `source-path`, take a list of one or more options. You can see which options take a list by examining the help output. Square brackets ([ ]) that surround options indicate that the option can take a list of one or more parameters.

You can separate each entry in a list with a space or a comma. The syntax is as follows:
```
-var val1 val2
```
or
```
-var=val1, val2
```
If you do not use commas to separate entries, you terminate a list by using a double hyphen, as the following example shows:
```
-var val1 val2 -- -next_option
```

If you use commas to separate entries, you terminate a list by not using a comma after the last entry, as the following example shows:
```
-var=val1, val2 -next_option
```

You can append values to an option using the `+=` operator. This adds the new entry to the end of the list of existing entries rather than replacing the existing entries. The following example adds the `c:/myfiles` directory to the `library-path` option:

```
mxmlc -library-path+=c:/myfiles
```


## Using abbreviated option names

In some cases, the command-line help shows an option with dot-notation syntax; for example, source-path is shown as `compiler.source-path`. This notation indicates how you would set this option in a configuration file. On the command line, you can specify the option with only the final node, `source-path`, as long as that node is unique, as the following example shows:

```
mxmlc -source-path . c:/myclasses/ -- foo.mxml
```

For more information about using configuration files to store command-line options, see [Configuration files](configuration-files.md).

Some compiler options have aliases. Aliases provide shortened variations of the option name to make command lines more readable and less verbose. For example, the alias for the output option is o. You can view a list of options by their aliases by using the following command:
```
mxmlc -help list aliases
```
or
```
mxmlc -help list advanced aliases
```

You can also see the aliases in the verbose help output by using the following command:
```
mxmlc -help list details
```



## Invoking the command-line compilers with Java

AIR provides a simple interface to the command-line compilers. For UNIX users, there is a shell script. For Windows users, there is an executable file. These files are located in the bin directory. You can also invoke the compilers using Java. This lets you integrate the compilers into Java-based projects (such as Ant) or other utilities.

The shell scripts and executable files for the command-line compilers wrap calls to the mxmlc.jar and compc.jar JAR files. To invoke the compilers from Java, you call the JAR files directly. The JAR files are located in the `AIRSDK/lib` directory.

To invoke a command in a JAR file, use the java command from the command line and specify the JAR file you want to execute with the jar option. You must also specify the value of the `+flexlib` option. This advanced option lets you set the root directory that is used by the compiler to locate the `flex-config.xml` file, among other files. You typically point it to your frameworks directory. From there, the compiler can detect the location of other configuration files.

The following example compiles MyApp.mxml into a SWF file using the JAR file to invoke the mxmlc compiler:

```
java -jar ../lib/mxmlc.jar +flexlib c:/flex_4_sdk/frameworks c:/flex/MyApp.mxml
```

You pass all other options as you would when you open the command-line compilers. The following example sets the locale and source path when compiling MyApp:

```
java -jar ../lib/mxmlc.jar +flexlib c:/flex_4_sdk/frameworks -locale en_US -source-path locale/{locale} c:/flex/MyApp.mxml
```





