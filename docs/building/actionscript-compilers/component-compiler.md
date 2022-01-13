---
title: Component compiler (compc)
sidebar_position: 3
---


You use the component compiler to generate a SWC file from component source files and other asset files such as images and style sheets. A SWC file is an archive of components and other assets. 

Use the component compiler, `acompc`, to compile AIR libraries and independent components. The `acompc` component compiler behaves like the `amxmlc` compiler, with the following exceptions:

- You must specify which classes within the code base to include in the library or component.
- `acompc` does not look for a local configuration file automatically. To use a project configuration file, you must use the `–load-config` option.

The `acompc` command invokes the standard Flex `compc` component compiler, but loads its configuration options from the `air-config.xml` file instead of the `flex-config.xml` file.



## Component compiler options

The component compiler options let you define settings such as the classes, resources, and namespaces to include in the resulting SWC file.
The component compiler can take most of the application compiler options, and the options described in this section.

For a description of the application compiler options, see [Application compiler options](application-compiler#application-compiler-options).

Application compiler options that do not apply to the component compiler include the metadata options (such as `contributor`, `title`, and `date`), default application options (such as `default-frame-rate`), `locale`, `debug-password`, and `theme`.

The component compiler has compiler options that the application compilers do not have. The following table describes the component compiler options that are not used by the application compilers:


TODO



## Compiling stand-alone components and classes

In many cases, you have one or more components that you use in your applications, but you do not have them in a package structure. You want to be able to use them in the generic namespace (“*”) inside your applications. In these cases, you use the `include-classes` option to add the components to your SWC file.

The following command-line example compiles two components, `Rotation.as` and `RotationInstance.as`, into a single SWC file:

```
compc -source-path .
      -output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/RotationClasses.swc
      -include-classes rotationClasses.Rotation rotationClasses.RotationInstance
```

The `rotationClasses` directory is a subdirectory of the current directory, which is in the source path. The SWC file is output to the `user_classes` directory, so the new components require no additional configuration to be used in a server environment.

You use the `include-classes` option to add components to the SWC file. You use just the class name of the component and not the full filename (for example, `MyComponent` rather than `MyComponent.as`). Use dot-notation to specify the location of the component in the package structure. 

You also set the `source-path` to the current directory or a directory from which the component directory can be
determined.

You can also add the `framework.swc` and `framework_rb.swc` files to the `library-path` option. This addition is not always required if the compiler can determine the location of these SWC files on its own. However, if you move the compiler utility out of the default location relative to the frameworks files, you must add it to the library path.

The previous command-line example appears in a configuration file as follows:
```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
	</source-path>
	<output>
		c:/jrun4/servers/flex/WEB-INF/flex/user_classes/RotationClasses.swc
	</output>
</compiler>
<include-classes>
	<class>rotationClasses.Rotation</class>
	<class>rotationClasses.RotationInstance</class>
</include-classes>
```

To use components that are not in a package in an application, you must declare a namespace that includes the directory structure of the components. The following example declares a namespace for the components compiled in the previous example:

```xml
<?xml version="1.0"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:local="rotationclasses.*">
	...
	<local:Rotation id="Rotate75" angleFrom="0" angleTo="75" duration="100"/>
	...
</s:Application>
```

To use the generic namespace of "*" rather than a namespace that includes a component’s directory structure, you can include the directory in the source-path as the following command-line example shows:
```
compc -source-path . c:/flexdeploy/comps/rotationClasses
      -output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/RotationComps.swc
      -include-classes Rotation RotationInstance
```

Then, you can specify the namespace in your application as:
```xml
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:local="*">
```

You are not required to use the directory name in the include-classes option if you add the directory to the source
path. 

These options appear in a configuration file, as the following example shows:

```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
		<path-element>c:/flexdeploy/comps/rotationClasses</path-element>
	</source-path>
	<output>c:/jrun4/servers/flex/WEB-INF/flex/user_classes/RotationComps.swc</output>
</compiler>
<include-classes>
	<class>Rotation</class>
	<class>RotationInstance</class>
<include-classes>
```

This example assumes that the components are not in a named package

## Compiling components in packages

Some components are created inside packages or directory structures so that they can be logically grouped and separated from application code. As a result, packaged components can have a namespace declaration that includes the package name or a unique namespace identifier that references their location within a package.

You compile packaged components similarly to how you compile components that are not in packages. The only difference is that you must use the package name in the namespace declaration, regardless of how you compiled the SWC file, and that package name uses dot-notation instead of slashes. You must be sure to specify the location of the classes in the `source-path`.

In the following command-line example, the `MyButton` component is in the `mypackage` package:
```
compc -source-path . c:/flexdeploy/comps/mypackage/
      -output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MyButtonComp.swc
      -include-classes mypackage.MyButton
```

These options appear in a configuration file, as the following example shows:
```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
		<path-element>c:/flexdeploy/comps/mypackage/</path-element>
	</source-path>
	<output>
		c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MyButtonComp.swc
	</output>
</compiler>
<include-classes>
	<class>mypackage.MyButton</class>
<include-classes>
```

To access the `MyButton` class in your application, you must declare a namespace that includes its package; for example:

```actionscript
import mypackage.*;
```
or

```xml
<s:Application
	xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:mine="mypackage.*">
```

You can use the `compc` compiler to compile components from multiple packages into a single SWC file. In the following command-line example, the `MyButton` control is in the `mypackage` package, and the `CustomComboBox` control is in the `acme` package:

```
compc -source-path .
	-output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/CustomComps.swc
	-include-classes mypackage.MyButton
	acme.CustomComboBox
```

You then define each package as a separate namespace in your MXML application:

```xml
<?xml version="1.0"?>
<s:Application <s:Application
	xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:mine="mypackage.*"
	xmlns:acme="acme.*">
	<mine:MyButton/>
	<acme:CustomComboBox/>
</s:Application>
```

or 

```actionscript
import mypackage.*;
import acme.*;

var button:MyButton;
var box:CustomComboBox;
```


## Compiling components using namespaces

When you have many components in one or more packages that you want to add to a SWC file and want to reference from an MXML file through a custom namespace, you can list them in a manifest file, then reference that manifest file on the command line. Also, you can specify a namespace for that component or define multiple manifest files and, therefore, specify multiple namespaces to compile into a single SWC file. 

When you use manifest files to define the components in your SWC file, you specify the namespace that the components use in your applications. You can compile all the components from one or more packages into a single SWC file. If you have more than one package, you can set it up so that all packages use a single namespace or so that each package has an individual namespace.

### Components in a single namespace

In the manifest file, you define which components are in a namespace. The following sample manifest file defines two components to be included in the namespace:

```xml
<?xml version="1.0"?>
<!-- SimpleManifest.xml -->
<componentPackage>
	<component id="MyButton" class="MyButton"/>
	<component id="MyOtherButton" class="MyOtherButton"/>
</componentPackage>
```

The manifest file can contain references to any number of components in a namespace. The class option is the full class name (including package) of the class. The id property is optional, but you can use it to define the MXML tag interface that you use in your applications. If the compiler cannot find one or more files listed in the manifest, it throws an error. 

On the command line, you define the namespace with the namespace option; for example:
```
-namespace http://mynamespace SimpleManifest.xml
```

Next, you target the defined namespace for inclusion in the SWC file with the include-namespaces option; for example:
```
-include-namespaces http://mynamespace
```

The namespace option matches a namespace (such as "http://ns.adobe.com/mxml/2009") with a manifest file. The `include-namespaces` option instructs compc to include all the components listed in that namespace’s manifest file in the SWC file.

After you define the manifest file, you can compile the SWC file. The following command-line example compiles the components into the "http://mynamespace" namespace:

```
compc -source-path .
	-output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MyButtons.swc
	-namespace http://mynamespace SimpleManifest.xml
	-include-namespaces http://mynamespace
```

In a configuration file, these options appear as the following example shows:
```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
	</source-path>
	<output>c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MyButtons.swc</output>
	<namespaces>
		<namespace>
			<uri>http://mynamespace</uri>
			<manifest>SimpleManifest.xml</manifest>
		</namespace>
	</namespaces>
</compiler>
<include-namespaces>
	<uri>http://mynamespace</uri>
<include-namespaces>
```

In your application, you can access the components by defining the new namespace in the <s:Application> tag, as the following example shows:

```xml
<?xml version="1.0"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:a="http://mynamespace">
	<a:MyButton/>
	<a:MyOtherButton/>
</s:Application>
```


### Components in multiple namespaces

You can use the compc compiler to compile components that use multiple namespaces into a SWC file. Each namespace must have its own manifest file. 

The following command-line example compiles components defined in the `AcmeManifest.xml` and `SimpleManifest.xml` manifest files:

```
compc -source-path .
	-output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MyButtons.swc
	-namespace http://acme2009 AcmeManifest.xml
	-namespace http://mynamespace SimpleManifest.xml
	-include-namespaces http://acme2009 http://mynamespace
```

In this case, all components in both the "http://mynamespace" and "http://acme2009" namespaces are targeted and included in the output SWC file.

In a configuration file, these options appear as the following example shows:
```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
	</source-path>
	<output>c:/jrun4/servers/flex/flex/WEB-INF/flex/user_classes/MyButtons.swc</output>
	<namespaces>
		<namespace>
			<uri>http://acme2009</uri>
			<manifest>AcmeManifest.xml</manifest>
		</namespace>
		<namespace>
			<uri>http://mynamespace</uri>
			<manifest>SimpleManifest.xml</manifest>
		</namespace>
	</namespaces>
</compiler>
<include-namespaces>
	<uri>http://acme2009</uri>
	<uri>http://mynamespace</uri>
<include-namespaces>
```

In your MXML application, you define both namespaces separately:

```xml
<?xml version="1.0"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
	xmlns:s="library://ns.adobe.com/flex/spark"
	xmlns:mx="library://ns.adobe.com/flex/mx"
	xmlns:simple="http://mynamespace"
	xmlns:acme="http://acme2009">
	<simple:SimpleComponent/>
	<acme:AcmeComponent/>
</s:Application>
```

You are not required to include all namespaces that you define as target namespaces. You can define multiple namespaces, but use only one target namespace. You might do this if some components use other components that are not directly exposed as MXML tags. You cannot then directly access the components in the unused namespace, however.

The following command line example defines two namespaces, "http://acme2009" and "http://mynamespace", but only includes one as a namespace target:

```
compc -source-path .
	-output c:/jrun4/servers/flex/flex/WEB-INF/flex/user_classes/MyButtons.swc
	-namespace http://acme2009 AcmeManifest.xml
	-namespace http://mynamespace SimpleManifest.xml
	-include-namespaces http://mynamespace
```


## Adding utility classes

You can add any classes that you want to use in your applications to a SWC file. These classes do not have to be components, but are often files that components use. They are classes that might be used at run time and, therefore, are not checked by the compiler. For example, your components might use a library of classes that perform mathematical functions, or use a custom logging utility. This documentation refers to these classes as utility classes. Utility classes are not exposed as MXML tags.

To add utility classes to a SWC file, you use the `include-sources` option. This option lets you specify a path to a class file rather than the class name, or specify an entire directory of classes.

The following command-line example adds the `FV_calc.as` and `FV_format.as` utility classes to the SWC file:

```
compc -source-path .
	-output c:/jrun4/servers/flex/WEB-INF/flex/user_classes/MySwc.swc
	-include-sources FV_classes/FV_format.as FV_classes/FV_calc.as
	-include-classes asbutton.MyButton
```

In a configuration file, these options appear as the following example shows:

```xml
<compiler>
	<source-path>
		<path-element>.</path-element>
	</source-path>
	<output>c:/jrun4/servers/flex/flex/WEB-INF/flex/user_classes/MySwc.swc</output>
</compiler>
<include-classes>
	<class>asbutton.MyButton</class>
</include-classes>
<include-sources>
	<path-element>FV_classes/FV_format.as</path-element>
	<path-element>FV_classes/FV_calc.as</path-element>
<include-sources>
```

When specifying files with the `include-sources` option, you must give the full filename (for example, `FV_calc.as` instead of `FV_calc`) because the file is not a component. If you use this option to include MXML components that are in a non-default package, you must include the source folder in the source path. You can also provide a directory name to the include-sources option. In this case, the compiler includes all files with an MXML or AS extension, and ignores all other files.

Classes that you add with the include-sources option can be accessed from the generic namespace in your applications. To use them, you need to add the following code in your application tag: 

```
xmlns:local="*"
```

You can then use them as tags; for example:
```
<local:FV_calc id="calc" rate=".0125" nper="12" pmt="100" pv="0" type="1"/>
```

## Adding nonsource classes

You often include noncompiled (or nonsource) files with your applications. A nonsource file is a class or resource (such as a style sheet or graphic) that is not compiled but is included in the SWC file for other classes to use. For example, a font file that you embed or a set of images that you use as graphical skins in a component’s style sheet should not be compiled but should be included in the SWC file. These are classes that you typically do not use the [Embed] syntax to link in to your application.

Use the `include-file` option to define nonsource files in a SWC file.

The syntax for the `include-file` option is as follows:
```
-include-file name path
```

The `name` argument is the name used to reference the embedded file in your applications. The path argument is the current path to the file in the file system.

When you use the `include-file` option, you specify both a name and a filepath, as the following example shows:

```
compc -include-file logo.gif c:/images/logo/logo1.gif ...
```

In a configuration file, these options appear as the following example shows:

```xml
<compiler>
	<output>c:/jrun4/servers/flex/flex/WEB-INF/flex/user_classes/Combo.swc</output>
</compiler>
<include-file>
	<name>logo.gif</name>
	<path>c:/images/logo/logo1.gif</path>
</include-file>
<include-classes>
	<class>asbutton.MyButton</class>
<include-classes>
```

Each name that you assign to a resource must be unique because the name becomes a global variable. You cannot specify a list of files with the include-file option. So, you must add a separate include-file option for each file that you include, as the following command-line example shows:
```
compc -include-file file1.jpg ../images/file1.jpg -include-file file2.jpg ../images/file2.jpg
-- -output MyFile.swc
```

If you want to add many resources to the SWC file, consider using a configuration file rather than listing all the resources on the command line. 

In general, specify a file extension for files that you include with the `include-file` option. In some cases, omitting the file extension can lead to a loss of functionality. For example, if you include a CSS file in a theme SWC file, you must set the name to be `*.css`. When AIR examines the SWC file, it applies all CSS files in that SWC file to the application. CSS files without the CSS extension are ignored.



## Component compiler configuration file

Use a local configuration file to avoid typing (and perhaps incorrectly typing) the source path and class names on the command line. Add the -load-config option to the acompc command line to load the local configuration file.

The following example illustrates a configuration for building a library with two classes, ParticleManager and Particle, both in the package: com.adobe.samples.particles. The class files are located in the source/com/adobe/samples/particles folder.

```xml
<flex-config> 
    <compiler> 
        <source-path> 
            <path-element>source</path-element> 
        </source-path> 
    </compiler> 
    <include-classes> 
        <class>com.adobe.samples.particles.ParticleManager</class> 
        <class>com.adobe.samples.particles.Particle</class> 
    </include-classes> 
</flex-config>
```

To compile the library using the configuration file, named `ParticleLib-config.xml`, type:

```
acompc -load-config ParticleLib-config.xml -output ParticleLib.swc
```

To run the same command entirely on the command line, type:

```
acompc -source-path source -include-classes com.adobe.samples.particles.Particle  
com.adobe.samples.particles.ParticleManager -output ParticleLib.swc
```

(Type the entire command on one line, or use the line continuation character for your command shell.)

## `compc` examples

These examples assume that you are using a configuration file named `myLib-config.xml`.

Compile an AIR component or library:

```
acompc -load-config myLib-config.xml -output lib/myLib.swc
```

Compile a runtime-shared library:

```
acompc -load-config myLib-config.xml -directory -output lib
```

(Note, the folder lib must exist and be empty before running the command.)



