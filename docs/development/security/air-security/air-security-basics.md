---
sidebar_position: 1
---

# AIR security basics

AIR applications run with the same security restrictions as native applications.
In general, AIR applications, like native applications, have broad access to
operating system capabilities such as reading and writing files, starting
applications, drawing to the screen, and communicating with the network.
Operating system restrictions that apply to native applications, such as
user-specific privileges, equally apply to AIR applications.

Although the Adobe® AIR® security model is an evolution of the Adobe® Flash®
Player security model, the security contract is different from the security
contract applied to content in a browser. This contract offers developers a
secure means of broader functionality for rich experiences with freedoms that
would be inappropriate for a browser-based application.

AIR applications are written using either compiled bytecode (SWF content) or
interpreted script (JavaScript, HTML) so that the runtime provides memory
management. This minimizes the chances of AIR applications being affected by
vulnerabilities related to memory management, such as buffer overflows and
memory corruption. These are some of the most common vulnerabilities affecting
desktop applications written in native code.

## Adobe recommends

> ### [![](../../img/ethanAndpeleus.png) Maintaining Security with Adobe AIR](https://web.archive.org/web/20130309154244/http://tv.adobe.com/watch/max-2008-develop/maintaining-security-with-adobe-air/)
>
> Peleus Uhley and Ethan Malasky provide an overview of the security-related
> issues that can arise when developing Adobe AIR applications.
