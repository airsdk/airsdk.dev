---
title: Application Descriptor File Structure
# sidebar_position: 2
---

The application descriptor file is an XML document with the following structure:

```xml
<application xmlns="http://ns.adobe.com/air/application/33.1"> 
    <allowBrowserInvocation>...<allowBrowserInvocation> 
    <android> 
        <colorDepth>...</colorDepth> 
        <manifestAdditions 
                <manifest>...</manifest> 
            ]]> 
        </manifestAdditions 
    </android> 
    <copyright>...</copyright> 
    <customUpdateUI>...</customUpdateUI> 
    <description> 
        <text xml:lang="...">...</text> 
    </description> 
    <extensions> 
        <extensionID>...</extensionID> 
    </extensions> 
    <filename>...</filename> 
    <fileTypes> 
        <fileType> 
            <contentType>...</contentType> 
            <description>...</description> 
            <extension>...</extension> 
            <icon> 
                <imageNxN>...</imageNxN> 
            </icon> 
            <name>...</name> 
        </fileType> 
    </fileTypes> 
    <icon> 
        <imageNxN>...</imageNxN> 
    </icon> 
    <id>...</id> 
    <initialWindow> 
        <aspectRatio>...</aspectRatio> 
        <autoOrients>...</autoOrients> 
        <content>...</content> 
        <depthAndStencil>...</depthAndStencil> 
        <fullScreen>...</fullScreen> 
        <height>...</height> 
        <maximizable>...</maximizable> 
        <maxSize>...</maxSize> 
        <minimizable>...</minimizable> 
        <minSize>...</minSize> 
        <renderMode>...</renderMode> 
        <requestedDisplayResolution>...</requestedDisplayResolution> 
        <resizable>...</resizable> 
        <softKeyboardBehavior>...</softKeyboardBehavior> 
        <systemChrome>...</systemChrome> 
        <title>...</title> 
        <transparent>...</transparent> 
        <visible>...</visible> 
        <width>...</width> 
        <x>...</x> 
        <y>...</y> 
    </initialWindow> 
    <installFolder>...</installFolder> 
    <iPhone> 
        <Entitlements>...</Entitlements> 
        <InfoAdditions>...</InfoAdditions> 
        <requestedDisplayResolution>...</requestedDisplayResolution> 
        <forceCPURenderModeForDevices>...</forceCPURenderModeForDevices> 
        <externalSwfs>...</externalSwfs> 
    </iPhone> 
    <name> 
        <text xml:lang="...">...</text> 
    </name> 
    <programMenuFolder>...</programMenuFolder> 
    <publisherID>...</publisherID> 
    <supportedLanguages>...</supportedLanguages> 
    <supportedProfiles>...</supportedProfiles> 
    <versionNumber>...</versionNumber> 
    <versionLabel>...</versionLabel> 
</application>
```