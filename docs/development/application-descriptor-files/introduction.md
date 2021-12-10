---
title: Introduction to Application Descriptor Files
sidebar_position: 1
---

Every AIR application has an Application Descriptor File, which is used to tell the AIR tools and runtime about the contents of the application and preferences for its display.
It is an XML file with a set of elements that are used at different points in the development process, for example:

1. Setting up the name of the application and the icons that will appear when it's installed onto a phone
2. Providing information about AIR Native Extensions that are required by the application
3. Configuring some of the display properties that will be used by the application when it launches on a computer

The descriptor file is required when running an application during development, via the AIR Debug Launcher (ADL), and is provided to the AIR Developer Tool (ADT) when packaging up an application for deployment.
A packaged AIR application will contain the descriptor file - renamed to a standard `application.xml` - so that it can then be used by the AIR runtime's bootstrap code to load in extensions and perform other runtime configuration.

### The Application Descriptor format

The application descriptor file has to conform to an XML Schema Definition which is provided as part of the AIR SDK along with a template file that some IDEs use when creating a new project.
The format changes over time when new features and capabilities are added, and is versioned by use of a namespace value that matches the version of the AIR runtime which can read the configuration.
It is possible for the AIR runtime to read an older version of the application descriptor file, but it cannot read a newer version.

The XML file is split up into main sections with some generic information about the application being provided at the top level within the `application` root element. Details on these sections can be
seen via the navigation bar in this website: as well as the `initialWindow` block that specifies details about the main window to be created by the AIR runtime, there are platform-specific sections that
are used purely for the operating system which is being targeted by the build or on which the application is running: `android`, `iPhone`, `macOS` and `windows`.

### Creating and editing your Application Descriptor

Most IDEs that support AIR will create an initial Application Descriptor file using details provided in their 'new project' UI, but it is also possible to hand-edit a simple descriptor file.
There is a suitable template provided within the AIR SDK (see `templates/air/descriptor-template.xml`). The application descriptor file can have any filename but is typically either called `application.xml`
or named after the application/project name with `-app.xml` appended, for example `MyProject-app.xml`.

For more advanced generation and manipulation of the application descriptor file, including to add dependencies (third party libraries or AIR Native Extensions) into a project, the
AIR Package Manager (apm) can be used. For more details please see the [apm wiki](https://github.com/airsdk/apm/wiki).


### Example application descriptor

The following application descriptor document sets the basic properties used by most AIR applications:

```xml
<?xml version="1.0" encoding="utf-8" ?> 
<application xmlns="http://ns.adobe.com/air/application/3.0"> 
    <id>example.HelloWorld</id> 
    <versionNumber>1.0.1</versionNumber> 
    <filename>Hello World</filename> 
    <name>Example Co. AIR Hello World</name> 
    <description> 
        <text xml:lang="en">This is an example.</text> 
        <text xml:lang="fr">C'est un exemple.</text> 
        <text xml:lang="es">Esto es un ejemplo.</text> 
    </description> 
    <copyright>Copyright (c) 2010 Example Co.</copyright> 
    <initialWindow> 
        <title>Hello World</title> 
        <content> 
            HelloWorld.swf 
        </content> 
    </initialWindow>  
    <icon> 
        <image16x16>icons/smallIcon.png</image16x16> 
        <image32x32>icons/mediumIcon.png</image32x32> 
        <image48x48>icons/bigIcon.png</image48x48> 
        <image128x128>icons/biggerIcon.png</image128x128>  
    </icon> 
</application>
```