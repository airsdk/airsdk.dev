---
title: Features
sidebar_position: 1.1
---

## Cross platform

The runtime provides a consistent cross-operating system framework for deploying applications and therefore reduces cross-platform testing by ensuring consistent functionality and interactions across platforms. Instead of developing for a specific operating system, you target the runtime, which has the following benefits:

- Applications developed for AIR run across multiple operating systems without any additional work by you. The runtime ensures consistent and predictable presentation and interactions across all the operating systems supported by AIR.
- Applications can be built faster by enabling you to leverage existing web technologies and design patterns. You can extend applications to the desktop and mobile devices without learning traditional development technologies or the complexity of native code.
- Application development is easier than using lower-level languages such as C and C++.
- You do not need to manage the complex, low-level APIs specific to each operating system, but can access them if required through powerful native extensions.


AIR applications are installed and run just like any other desktop or mobile application and appear no different to the end user.

- With AIR, you can target desktop (Windows and MacOS) and main mobile platforms (iOS, Android, Amazon Fire devices...)

- You can even quickly build and deploy iOS apps to Apple devices on Windows ! *

- The same code has identical behavior across various devices, allowing to develop on a platform and port it to another with almost no changes.


## Mature and free environment

AIR was released in 2008 by Adobe and is very stable and mature. It has been used in countless projects by big companies over the years. It is now actively maintained and updated by Harman, a Samsung company.

- AIR has a free tier that allows you to develop your applications completely for free! (only an AIR splash screen will be displayed at startup). [Reasonable paid tiers](https://airsdk.harman.com/pricing) will remove the default splash screen and give you access to extra support.
- You can use ActionScript 3 to develop elegant OOP code (the Haxe language can also be used to compile to AIR for even more advanced language features).
- AIR offers a [very rich API](/reference) covering many areas: Graphics (vectors and bitmap), Animation, User input, Rich text display, Sound, Networking, Data storage...
- Many libraries and code examples are already available.
- Some awesome libraries like [Starling](https://gamua.com/starling/) (GPU accelerated engine) or [Feathers UI](https://feathersui.com/learn/as3-starling/getting-started/) (complete UI design solution) as also available for free!


## Development made easy

Due to its consistent behavior across different platforms, the AIR desktop simulator allows to quickly test your code without having to deploy your apps to actual devices.

- You can debug your apps over Wifi or USB, and inspect your code with breakpoints at runtime. Profile your apps and see potential bottlenecks with Adobe Scout.
- The compile times are very fast, making tests and iterations easy.
- [Different quality IDEs](basics/setup-an-editor.mdx) are available, both free or commercial.
- Join our [friendly community](/community) for extra guidance and support!


## Native extensions

You can expand AIR functionalities with native extensions, to call native functionality not exposed by the runtime or to access native SDKs.

Many extensions are already available, both open source or [commercially maintained](https://airnativeextensions.com): in-app billing, app rating, social sharing, analytics, ads, notifications, and many more!
 

