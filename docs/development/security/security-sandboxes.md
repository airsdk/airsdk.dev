---
sidebar_position: 2
---

# Security sandboxes

Client computers can obtain individual files containing code, content, and data
from a number of sources, such as from external websites, from a local file
system, or from an installed AIR application. The Flash Player and AIR runtimes
individually assign code files and other resources, such as shared objects,
bitmaps, sounds, videos, and data files, to security sandboxes based on their
origin when they are loaded. The following sections describe the rules, enforced
by the runtimes, that govern what a code or content executing within a given
sandbox can access.

For more information on Flash Player security, see the Flash Player Developer
Center topic "Security" at
[www.adobe.com/go/devnet_security_en](https://web.archive.org/web/20150422111248/http://www.adobe.com/devnet/flashplayer/security.html).

## Remote sandboxes

The Flash Player and AIR runtimes classify assets (including SWF files) from the
Internet in separate sandboxes that correspond to their domain of origin. For
example, assets loaded from _example.com_ will be placed into a different
security sandbox than assets loaded from _foo.org_. By default, these files are
authorized to access any resources from their own server. Remote SWF files can
be allowed to access additional data from other domains by explicit website and
author permissions, such as URL policy files and the `Security.allowDomain()`
method. For details, see
[Website controls (policy files)](./permission-controls.md#website-controls-policy-files)
and
[Author (developer) controls](./permission-controls.md#author-developer-controls).

Remote SWF files cannot load any local files or resources.

For more information on Flash Player security, see the Flash Player Developer
Center topic "Security" at
[www.adobe.com/go/devnet_security_en](https://web.archive.org/web/20150422111248/http://www.adobe.com/devnet/flashplayer/security.html).

## Local sandboxes

_Local file_ describes any file that is referenced by using the `file:` protocol
or a Universal Naming Convention (UNC) path. Local SWF files are placed into one
of four local sandboxes:

- The local-with-filesystem sandbox—For security purposes, the Flash Player and
  AIR runtimes place all local files in the local-with-file-system sandbox, by
  default. From this sandbox, executable code can read local files (by using the
  URLLoader class, for example), but cannot communicate with the network in any
  way. This assures the user that local data cannot be leaked out to the network
  or otherwise inappropriately shared.

- The local-with-networking sandbox—When compiling a SWF file, you can specify
  that it has network access when run as a local file (see
  [Setting the sandbox type of local SWF files](#setting-the-sandbox-type-of-local-swf-files)).These
  files are placed in the local-with-networking sandbox. SWF files that are
  assigned to the local-with-networking sandbox forfeit their local file access.
  In return, the SWF files are allowed to access data from the network. However,
  a local-with-networking SWF file is still not allowed to read any
  network-derived data unless permissions are present for that action, through a
  URL policy file or a call to the `Security.allowDomain()` method. In order to
  grant such permission, a URL policy file must grant permission to _all_
  domains by using `<allow-access-from domain="*"/>` or by using
  `Security.allowDomain("*")`. For more information, see
  [Website controls (policy files)](./permission-controls.md#website-controls-policy-files)
  and
  [Author (developer) controls](./permission-controls.md#author-developer-controls).

- The local-trusted sandbox—Local SWF files that are registered as trusted (by
  users or by installer programs) are placed in the local-trusted sandbox.
  System administrators and users also have the ability to reassign (move) a
  local SWF file to or from the local-trusted sandbox based on security
  considerations (see
  [Administrator controls](./permission-controls.md#administrator-controls) and
  [User controls](./permission-controls.md#user-controls)). SWF files that are
  assigned to the local-trusted sandbox can interact with any other SWF files
  and can load data from anywhere (remote or local).

- The AIR application sandbox—This sandbox contains content that was installed
  with the running AIR application. By default, code executing in the AIR
  application sandbox can cross-script code from any domain. However, files
  outside the AIR application sandbox are not permitted to cross-script code in
  the application sandbox. By default, code and content in the AIR application
  sandbox can load content and data from any domain.

Communication between the local-with-networking and local-with-filesystem
sandboxes, as well as communication between the local-with-filesystem and remote
sandboxes, is strictly forbidden. Permission to allow such communication cannot
be granted by an application running in Flash Player or by a user or
administrator.

Scripting in either direction between local HTML files and local SWF files—for
example, using the ExternalInterface class—requires that both the HTML file and
SWF file involved be in the local-trusted sandbox. This is because the local
security models for browsers differ from the Flash Player local security model.

SWF files in the local-with-networking sandbox cannot load SWF files in the
local-with-filesystem sandbox. SWF files in the local-with-filesystem sandbox
cannot load SWF files in the local-with-networking sandbox.

## The AIR application sandbox

The Adobe AIR runtime adds an additional sandbox, called the _application_
sandbox, to the Flash Player security sandbox model. Files installed as part of
an AIR application load into the application sandbox. Any other files loaded by
the application have security restrictions corresponding to those specified by
the regular Flash Player security model.

When an application is installed, all files included within an AIR package are
installed onto the user's computer into an application directory. Developers can
reference this directory in code through the `app:/` URL scheme (see
[URI schemes](../networking-and-communication/http-communications/loading-external-data.md#uri-schemes)).
All files within the application directory tree are assigned to the application
sandbox when the application is run. Content in the application sandbox is
blessed with the full privileges available to an AIR application, including
interaction with the local file system.

Many AIR applications use only these locally installed files to run the
application. However, AIR applications are not restricted to just the files
within the application directory — they can load any type of file from any
source. This includes files local to the user's computer as well as files from
available external sources, such as those on a local network or on the Internet.
File type has no impact on security restrictions; loaded HTML files have the
same security privileges as loaded SWF files from the same source.

Content in the application security sandbox has access to AIR APIs that content
in other sandboxes are prevented from using. For example, the
`air.NativeApplication.nativeApplication.applicationDescriptor` property, which
returns the contents of the application descriptor file for the application, is
restricted to content in the application security sandbox. Another example of a
restricted API is the FileStream class, which contains methods for reading and
writing to the local file system.

ActionScript APIs that are only available to content in the application security
sandbox are indicated with the AIR logo in the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).
Using these APIs in other sandboxes causes the runtime to throw a SecurityError
exception.

For HTML content (in an HTMLLoader object), all AIR JavaScript APIs (those that
are available via the `window.runtime` property, or via the `air` object when
using the AIRAliases.js file) are available to content in the application
security sandbox. HTML content in another sandbox does not have access to the
`window.runtime` property, so this content cannot access the AIR or Flash Player
APIs.

Content executing within the AIR application sandbox has the following
additional restrictions:

- For HTML content in the application security sandbox, there are limitations on
  using APIs that can dynamically transform strings into executable code after
  the code is loaded. This is to prevent the application from inadvertently
  injecting (and executing) code from non-application sources (such as
  potentially insecure network domains). An example is the use of the `eval()`
  function. For details, see
  [Code restrictions for content in different sandboxes](./air-security/html-security-in-adobe-air.md#code-restrictions-for-content-in-different-sandboxes).

- To prevent possible phishing attacks, `img` tags in HTML content in
  ActionScript TextField objects are ignored in SWF content in the application
  security sandbox.

- Content in the application sandbox cannot use the `asfunction` protocol in
  HTML content in ActionScript 2.0 text fields.

- SWF content in the application sandbox cannot use the cross-domain cache, a
  feature that was added to Flash Player 9 Update 3. This feature lets Flash
  Player persistently cache Adobe platform component content and reuse it in
  loaded SWF content on demand (eliminating the need to reload the content
  multiple times).

## Restrictions for JavaScript inside AIR

Unlike content in the application security sandbox, JavaScript content in a
non-application security sandbox _can_ call the `eval()` function to execute
dynamically generated code at any time. However, there are restrictions on
JavaScript running in a non-application security sandbox within AIR. These
include:

- JavaScript code in a non-application sandbox does not have access to the
  `window.runtime` object, and as such this code cannot execute AIR APIs.

- By default, content in a non-application security sandbox cannot use
  XMLHttpRequest calls to load data from other domains other than the domain
  calling the request. However, application code can grant non-application
  content permission to do so by setting an `allowCrossdomainXHR` attribute in
  the containing frame or iframe. For more information, see
  [Code restrictions for content in different sandboxes](./air-security/html-security-in-adobe-air.md#code-restrictions-for-content-in-different-sandboxes).

- There are restrictions on calling the JavaScript `window.open()` method. For
  details, see
  [Restrictions on calling the JavaScript window.open() method](./air-security/html-security-in-adobe-air.md#restrictions-on-calling-the-javascript-windowopen-method).

- HTML content in remote (network) security sandboxes can only load CSS,
  `frame`, `iframe`, and `img` content from remote domains (from network URLs).

- HTML content in local-with-filesystem, local-with-networking, or local-trusted
  sandboxes can only load CSS, `frame`, `iframe`, and `img` content from local
  sandboxes (not from application or network URLs).

For details, see
[Code restrictions for content in different sandboxes](./air-security/html-security-in-adobe-air.md#code-restrictions-for-content-in-different-sandboxes).

## Setting the sandbox type of local SWF files

An end user or the administrator of a computer can specify that a local SWF file
is trusted, allowing it to load data from all domains, both local and network.
This is specified in the Global Flash Player Trust and User Flash Player Trust
directories. For more information, see
[Administrator controls](./permission-controls.md#administrator-controls) and
[User controls](./permission-controls.md#user-controls).

For more information on local sandboxes, see
[Local sandboxes](#local-sandboxes).

#### Adobe Flash Professional

You can configure a SWF file for the local-with-filesystem sandbox or the
local-with-networking sandbox by setting the document's publish settings in the
authoring tool.

#### Adobe Flex

You can configure a SWF file for the local-with-filesystem sandbox or the
local-with-networking sandbox by setting the `use-network` flag in the Adobe
Flex compiler. For more information, see "About the application compiler
options" in _Building and Deploying Adobe Flex 3 Applications_.

## The Security.sandboxType property

An author of a SWF file can use the read-only static `Security.sandboxType`
property to determine the type of sandbox to which the Flash Player or AIR
runtime has assigned the SWF file. The Security class includes constants that
represent possible values of the `Security.sandboxType` property, as follows:

- `Security.REMOTE` —The SWF file is from an Internet URL, and operates under
  domain-based sandbox rules.

- `Security.LOCAL_WITH_FILE` —The SWF file is a local file, but it has not been
  trusted by the user and was not published with a networking designation. The
  SWF file can read from local data sources but cannot communicate with the
  Internet.

- `Security.LOCAL_WITH_NETWORK` —The SWF file is a local file and has not been
  trusted by the user, but it was published with a networking designation. The
  SWF file can communicate with the Internet but cannot read from local data
  sources.

- `Security.LOCAL_TRUSTED` —The SWF file is a local file and has been trusted by
  the user, using either the Settings Manager or a Flash Player trust
  configuration file. The SWF file can both read from local data sources and
  communicate with the Internet.

- `Security.APPLICATION` —The SWF file is running in an AIR application, and it
  was installed with the package (AIR file) for that application. By default,
  files in the AIR application sandbox can cross-script any file from any
  domain. However, files outside the AIR application sandbox are not permitted
  to cross-script the AIR file. By default, files in the AIR application sandbox
  can load content and data from any domain.
