---
sidebar_position: 3
---

# Permission controls

The Flash Player client run-time security model has been designed around
resources, which are objects such as SWF files, local data, and Internet URLs.
_Stakeholders_ are the parties who own or use those resources. Stakeholders can
exercise controls (security settings) over their own resources, and each
resource has four stakeholders. Flash Player strictly enforces a hierarchy of
authority for these controls, as the following illustration shows:

![Hierarchy of authority](../img/sc_hierarchy_securityControl.png)

Hierarchy of security controls

This means, for instance, that if an administrator restricts access to a
resource, no other stakeholders can override that restriction.

For AIR applications, these permission controls only apply to content running
outside the AIR application sandbox.

## Administrator controls

An administrative user of a computer (a user who has logged in with
administrative rights) can apply Flash Player security settings that affect all
users of the computer. In a non-enterprise environment, such as on a home
computer, there is usually one user who also has administrative access. Even in
an enterprise environment, individual users may have administrative rights to
the computer.

There are two types of administrative user controls:

- The mms.cfg file

- The Global Flash Player Trust directory

### The mms.cfg file

The mms.cfg file is a text file that lets administrators enable or restrict
access to a variety of capabilities. When Flash Player starts, it reads its
security settings from this file, and uses them to limit functionality. The
mms.cfg file includes settings that the administrator uses to manage
capabilities such as privacy controls, local file security, socket connections,
and so on.

A SWF file can access some information on capabilities that have been disabled
by calling the `Capabilities.avHardwareDisable` and
`Capabilities.localFileReadDisable` properties. However, most of the settings in
the mms.cfg file cannot be queried from ActionScript.

To enforce application-independent security and privacy policies for a computer,
the mms.cfg file should be modified only by system administrators. The mms.cfg
file is not for use by application installers. While an installer running with
administrative privileges could modify the contents of the mms.cfg file, Adobe
considers such usage a violation of the user's trust and urges creators of
installers never to modify the mms.cfg file.

The mms.cfg file is stored in the following location:

- Windows 32-bit: _system_ %WINDIR%\System32\Macromed\Flash\mms.cfg

  (for example, C:\WINDOWS\system32\Macromed\Flash\mms.cfg)

- Windows 64-bit: _system_ %WINDIR%\SysWOW64\Macromed\Flash\mms.cfg

  (for example, C:\WINDOWS\sysWOW64\Macromed\Flash\mms.cfg)

- Mac: _app support_ /Macromedia/mms.cfg

  (for example, /Library/Application Support/Macromedia/mms.cfg)

- Linux: /etc/adobe/mms.cfg

- Google Chrome: Google Chrome uses its own version of the mms.cfg file, saved
  at:

- Mac: _/Users/(username)_ /Library/Application
  Support/Google/Chrome/Default/Pepper Data/Shockwave Flash/System

- Win: _%USERNAME%_ /AppData/Local/Google/Chrome/User Data/Default/Pepper
  Data/Shockwave Flash/System

  The System directory may not exist. If not, create it manually.

  You might use third-party administration tools, such as Microsoft System
  Management Server, to replicate the configuration file to the user's computer.

  Use the standard techniques provided by your operating system to hide or
  otherwise prevent end users from seeing or modifying the mms.cfg file on their
  systems.

For more information about the mms.cfg file, see the Flash Player Administration
Guide at
[www.adobe.com/go/flash_player_admin](https://web.archive.org/web/20151111130758/http://www.adobe.com/devnet/flashplayer/articles/flash_player_admin_guide.html).

### The Global Flash Player Trust directory

Administrative users and installer applications can register specified local SWF
files as trusted for all users. These SWF files are assigned to the
local-trusted sandbox. They can interact with any other SWF files, and they can
load data from anywhere, remote or local. Files are designated as trusted in the
Global Flash Player Trust directory, in the following location:

- Windows: _system_ \Macromed\Flash\FlashPlayerTrust

  (for example, C:\WINDOWS\system32\Macromed\Flash\FlashPlayerTrust)

- Mac: _app support_ /Macromedia/FlashPlayerTrust

  (for example, /Library/Application Support/Macromedia/FlashPlayerTrust)

The Flash Player Trust directory can contain any number of text files, each of
which lists trusted paths, with one path per line. Each path can be an
individual SWF file, HTML file, or directory. Comment lines begin with the `#`
symbol. For example, a Flash Player trust configuration file containing the
following text grants trusted status to all files in the specified directory and
all subdirectories:

    # Trust files in the following directories:
    C:\Documents and Settings\All Users\Documents\SampleApp

The paths listed in a trust configuration file should always be local paths or
SMB network paths. Any HTTP path in a trust configuration file is ignored; only
local files can be trusted.

To avoid conflicts, give each trust configuration file a filename corresponding
to the installing application, and use a .cfg file extension.

As a developer distributing a locally run SWF file through an installer
application, you can have the installer application add a configuration file to
the Global Flash Player Trust directory, granting full privileges to the file
that you are distributing. The installer application must be run by a user with
administrative rights. Unlike the mms.cfg file, the Global Flash Player Trust
directory is included for the purpose of installer applications granting trust
permissions. Both administrative users and installer applications can designate
trusted local applications using the Global Flash Player Trust directory.

There are also Flash Player Trust directories for individual users (see
[User controls](#user-controls)).

## User controls

Flash Player provides three different user-level mechanisms for setting
permissions: the Settings UI and Settings Manager, and the User Flash Player
Trust directory.

### The Settings UI and Settings Manager

The Settings UI is a quick, interactive mechanism for configuring the settings
for a specific domain. The Settings Manager presents a more detailed interface
and provides the ability to make global changes that affect permissions for many
or all domains. Additionally, when a new permission is requested by a SWF file,
requiring run-time decisions concerning security or privacy, dialog boxes are
displayed in which users can adjust some Flash Player settings.

The Settings Manager and Settings UI provide security-related options such as
camera and microphone settings, shared object storage settings, settings related
to legacy content, and so on. Neither the Settings Manager nor the Settings UI
are available to AIR applications.

Note: Any settings made in the mms.cfg file (see
[Administrator controls](#administrator-controls)) are not reflected in the
Settings Manager.

For details on the Settings Manager, see
[www.adobe.com/go/settingsmanager](https://web.archive.org/web/20150219041754/http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager.html).

### The User Flash Player Trust directory

Users and installer applications can register specified local SWF files as
trusted. These SWF files are assigned to the local-trusted sandbox. They can
interact with any other SWF files, and they can load data from anywhere, remote
or local. A user designates a file as trusted in the User Flash Player Trust
directory, which is in same directory as the shared object storage area, in the
following locations (locations are specific to the current user):

- Windows: app data\Macromedia\Flash Player\\Security\FlashPlayerTrust

  (for example, C:\Documents and Settings\JohnD\Application
  Data\Macromedia\Flash Player\\Security\FlashPlayerTrust on Windows XP or
  C:\Users\JohnD\AppData\Roaming\Macromedia\Flash
  Player\\Security\FlashPlayerTrust on Windows Vista)

  In Windows, the Application Data folder is hidden by default. To show hidden
  folders and files, select My Computer to open Windows Explorer, select
  Tools \> Folder Options and then select the View tab. Under the View tab,
  select the Show hidden files and folders radio button.

- Mac: app data/Macromedia/Flash Player/#Security/FlashPlayerTrust

  (for example, /Users/JohnD/Library/Preferences/Macromedia/Flash
  Player/#Security/FlashPlayerTrust)

  These settings affect only the current user, not other users who log in to the
  computer. If a user without administrative rights installs an application in
  their own portion of the system, the User Flash Player Trust directory lets
  the installer register the application as trusted for that user.

  As a developer distributing a locally run SWF file by way of an installer
  application, you can have the installer application add a configuration file
  to the User Flash Player Trust directory, granting full privileges to the file
  that you are distributing. Even in this situation, the User Flash Player Trust
  directory file is considered a user control, because a user action
  (installation) initiates it.

  There is also a Global Flash Player Trust directory, used by the
  administrative user or installers to register an application for all users of
  a computer (see [Administrator controls](#administrator-controls)).

## Website controls (policy files)

To make data from your web server available to SWF files from other domains, you
can create a policy file on your server. A _policy file_ is an XML file placed
in a specific location on your server.

Policy files affect access to a number of assets, including the following:

- Data in bitmaps, sounds, and videos

- Loading XML and text files

- Importing SWF files from other security domains into the security domain of
  the loading SWF file

- Access to socket and XML socket connections

ActionScript objects instantiate two different kinds of server connections:
document-based server connections and socket connections. ActionScript objects
like Loader, Sound, URLLoader, and URLStream instantiate document-based server
connections, and these objects load a file from a URL. ActionScript Socket and
XMLSocket objects make socket connections, which operate with streaming data,
not loaded documents.

Because Flash Player supports two kinds of server connections, there are two
types of policy files—URL policy files and socket policy files.

- Document-based connections require _URL policy files_. These files let the
  server indicate that its data and documents are available to SWF files served
  from certain domains or from all domains.

- Socket connections require _socket policy files,_ which enable networking
  directly at the lower TCP socket level, using the Socket and XMLSocket
  classes.

Flash Player requires policy files to be transmitted using the same protocol
that the attempted connection wants to use. For example, when you place a policy
file on your HTTP server, SWF files from other domains are allowed to load data
from it as an HTTP server. However, if you don't provide a socket policy file at
the same server, you are forbidding SWF files from other domains to connect to
the server at the socket level. In other words, the means by which a policy file
is retrieved must match the means of connecting.

Policy file usage and syntax are discussed briefly in the rest of this section,
as they apply to SWF files published for Flash Player 10. (Policy file
implementation is slightly different in earlier versions of Flash Player, as
successive releases have strengthened Flash Player security.) For more detailed
information on policy files, see the Flash Player Developer Center topic "Policy
File Changes in Flash Player 9" at
[www.adobe.com/go/devnet_security_en](https://web.archive.org/web/20150422111248/http://www.adobe.com/devnet/flashplayer/security.html).

Code executing in the AIR application sandbox does not require a policy file to
access data from a URL or socket. Code in an AIR application executing in a
non-application sandbox does require a policy file.

### Master policy files

By default, Flash Player (and AIR content that is not in the AIR application
sandbox) first looks for a URL policy file named `crossdomain.xml` in the root
directory of the server, and looks for a socket policy file on port 843. A file
in either of these locations is called the _master policy file_. (In the case of
socket connections, Flash Player also looks for a socket policy file on the same
port as the main connection. However, a policy file found on that port is not
considered a master policy file.)

In addition to specifying access permissions, the master policy file can also
contain a _meta-policy_ statement. A meta-policy specifies which locations can
contain policy files. The default meta-policy for URL policy files is
"master-only," which means that /crossdomain.xml is the only policy file allowed
on the server. The default meta-policy for socket policy files is "all," which
means that any socket on the host can serve a socket policy file.

Note: In Flash Player 9 and earlier, the default meta-policy for URL policy
files was "all," which means that any directory can contain a policy file. If
you have deployed applications that load policy files from locations other than
the default /crossdomain.xml file, and those applications might now be running
in Flash Player 10, make sure you (or the server administrator) modify the
master policy file to allow additional policy files. For information on how to
specify different a different meta-policy, see the Flash Player Developer Center
topic "Policy File Changes in Flash Player 9" at
[www.adobe.com/go/devnet_security_en](https://web.archive.org/web/20150422111248/http://www.adobe.com/devnet/flashplayer/security.html).

A SWF file can check for a different policy filename or a different directory
location by calling the `Security.loadPolicyFile()` method. However, if the
master policy file doesn't specify that the target location can serve policy
files, the call to `loadPolicyFile()` has no effect, even if there is a policy
file at that location. Call `loadPolicyFile()` before attempting any network
operations that require the policy file. Flash Player automatically queues
networking requests behind their corresponding policy file attempts. So, for
example, it is acceptable to call `Security.loadPolicyFile()` immediately before
initiating a networking operation.

When checking for a master policy file, Flash Player waits three seconds for a
server response. If a response isn't received, Flash Player assumes that no
master policy file exists. However, there is no default timeout value for calls
to `loadPolicyFile()` ; Flash Player assumes that the file being called exists,
and waits as long as necessary to load it. Therefore, if you want to make sure
that a master policy file is loaded, use `loadPolicyFile()` to call it
explicitly.

Even though the method is named `Security.loadPolicyFile()`, a policy file isn't
loaded until a network call that requires a policy file is issued. Calls to
`loadPolicyFile()` simply tell Flash Player where to look for policy files when
they are needed.

You can't receive notification of when a policy file request is initiated or
completed, and there is no reason to do so. Flash Player performs policy checks
asynchronously, and automatically waits to initiate connections until after the
policy file checks have succeeded.

The following sections contain information that applies only to URL policy
files. For more information on socket policy files, see
[Connecting to sockets](./loading-data.md#connecting-to-sockets).

### URL policy file scope

A URL policy file applies only to the directory from which it is loaded and to
its child directories. A policy file in the root directory applies to the whole
server; a policy file loaded from an arbitrary subdirectory applies only to that
directory and its subdirectories.

A policy file affects access only to the particular server on which it resides.
For example, a policy file located at `https://www.adobe.com:8080/crossdomain.xml`
applies only to data- loading calls made to www.adobe.com over HTTPS at
port 8080.

### Specifying access permissions in a URL policy file

A policy file contains a single `<cross-domain-policy>` tag, which in turn
contains zero or more `<allow-access-from>` tags. Each `<allow-access-from>` tag
contains an attribute, `domain`, which specifies either an exact IP address, an
exact domain, or a wildcard domain (any domain). Wildcard domains are indicated
in one of two ways:

- By a single asterisk (`*`), which matches all domains and all IP addresses

- By an asterisk followed by a suffix, which matches only those domains that end
  with the specified suffix

Suffixes must begin with a dot. However, wildcard domains with suffixes can
match domains that consist of only the suffix without the leading dot. For
example, `xyz.com` is considered to be part of `*.xyz.com`. Wildcards are not
allowed in IP domain specifications.

The following example shows a URL policy file that permits access to SWF files
that originate from `*.example.com`, `www.friendOfExample.com` and `192.0.34.166`:

    <?xml version="1.0"?>
    <cross-domain-policy>
    	<allow-access-from domain="*.example.com" />
    	<allow-access-from domain="www.friendOfExample.com" />
    	<allow-access-from domain="192.0.34.166" />
    </cross-domain-policy>

If you specify an IP address, access is granted only to SWF files loaded from
that IP address using IP syntax (for example,
`http://65.57.83.12/flashmovie.swf`). Access isn't granted to SWF files using
domain-name syntax. Flash Player does not perform DNS resolution.

You can permit access to documents originating from any domain, as shown in the
following example:

    <?xml version="1.0"?>
    <!-- http://www.foo.com/crossdomain.xml -->
    <cross-domain-policy>
    	<allow-access-from domain="*" />
    </cross-domain-policy>

Each `<allow-access-from>` tag also has the optional `secure` attribute, which
defaults to `true`. If your policy file is on an HTTPS server and you want to
allow SWF files on a non-HTTPS server to load data from the HTTPS server, you
can set the attribute to `false`.

Setting the `secure` attribute to `false` could compromise the security offered
by HTTPS. In particular, setting this attribute to `false` opens secure content
to snooping and spoofing attacks. Adobe strongly recommends that you not set the
`secure` attribute to `false`.

If data to be loaded is on an HTTPS server, but the SWF file loading it is on an
HTTP server, Adobe recommends that you move the loading SWF file to an HTTPS
server. Doing so lets you keep all copies of your secure data under the
protection of HTTPS. However, if you decide that you must keep the loading SWF
file on an HTTP server, add the `secure="false"` attribute to the
`<allow-access-from>` tag, as shown in the following code:

    <allow-access-from domain="www.example.com" secure="false" />

Another element you can use to permit access is the
`allow-http-request-headers-from` tag. This element grants a client hosting
content from another permission domain to send user-defined headers to your
domain. While the `<allow-access-from>` tag grants other domains permission to
pull data from your domain, the `allow-http-request-headers-from` tag grants
other domains permission to push data to your domain, in the form of headers. In
the following example, any domain is permitted to send the SOAPAction header to
the current domain:

    <cross-domain-policy>
    	<allow-http-request-headers-from domain="*" headers="SOAPAction"/>
    </cross-domain-policy>

If the `allow-http-request-headers-from` statement is in the master policy file,
it applies to all directories on the host. Otherwise, it applies only to the
directory and subdirectories of the policy file that contains the statement.

### Preloading policy files

Loading data from a server or connecting to a socket is an asynchronous
operation. Flash Player simply waits for the policy file to finish downloading
before it begins the main operation. However, extracting pixel data from images
or extracting sample data from sounds is a synchronous operation. The policy
file must load before you can extract data. When you load the media, specify
that it check for a policy file:

- When using the `Loader.load()` method, set the `checkPolicyFile` property of
  the `context` parameter, which is a LoaderContext object.

- When embedding an image in a text field using the `<img>` tag, set the
  `checkPolicyFile` attribute of the `<img>` tag to `"true"`, as in the
  following:

      <img checkPolicyFile = "true" src = "example.jpg">

- When using the `Sound.load()` method, set the `checkPolicyFile` property of
  the `context` parameter, which is a SoundLoaderContext object.

- When using the NetStream class, set the `checkPolicyFile` property of the
  NetStream object.

When you set one of these parameters, Flash Player first checks for any policy
files that it already has downloaded for that domain. Then it looks for the
policy file in the default location on the server, checking both for
`<allow-access-from>` statements and for the presence of a meta-policy. Finally,
it considers any pending calls to the `Security.loadPolicyFile()` method to see
if they are in scope.

## Author (developer) controls

The main ActionScript API used to grant security privileges is the
`Security.allowDomain()` method, which grant privileges to SWF files in the
domains that you specify. In the following example, a SWF file grants access to
SWF files served from the www.example.com domain:

    Security.allowDomain("www.example.com")

This method grants permissions for the following:

- Cross-scripting between SWF files (see
  [Cross-scripting](./cross-scripting.md))

- Display list access (see
  [Traversing the display list](./cross-scripting.md#traversing-the-display-list))

- Event detection (see [Event security](./cross-scripting.md#event-security))

- Full access to properties and methods of the Stage object (see
  [Stage security](./cross-scripting.md#stage-security))

The primary purpose of calling the `Security.allowDomain()` method is to grant
permission for SWF files in an outside domain to script the SWF file calling the
`Security.allowDomain()` method. For more information, see
[Cross-scripting](./cross-scripting.md).

Specifying an IP address as a parameter to the `Security.allowDomain()` method
does not permit access by all parties that originate at the specified IP
address. Instead, it permits access only by a party that contains the specified
IP address as its URL, rather than a domain name that maps to that IP address.
For example, if the domain name www.example.com maps to the IP address
192.0.34.166, a call to `Security.allowDomain("192.0.34.166")` does not grant
access to www.example.com.

You can pass the `"*"` wildcard to the `Security.allowDomain()` method to allow
access from all domains. Because it grants permission for SWF files from _all_
domains to script the calling SWF file, use the `"*"` wildcard with care.

ActionScript includes a second permission API, called
`Security.allowInsecureDomain()`. This method does the same thing as the
`Security.allowDomain()` method, except that, when called from a SWF file served
by a secure HTTPS connection, it additionally permits access to the calling SWF
file by other SWF files that are served from an insecure protocol, such as HTTP.
However, it is not a good security practice to allow scripting between files
from a secure protocol (HTTPS) and those from insecure protocols (such as HTTP);
doing so can open secure content to snooping and spoofing attacks. Here is how
such attacks can work: since the `Security.allowInsecureDomain()` method allows
access to your secure HTTPS data by SWF files served over HTTP connections, an
attacker interposed between your HTTP server and your users could replace your
HTTP SWF file with one of their own, which can then access your HTTPS data.

Important: Code executing in the AIR application sandbox is not permitted to
call either the `allowDomain()` or `allowInsecureDomain()` methods of the
Security class.

Another important security-related method is the `Security.loadPolicyFile()`
method, which causes Flash Player to check for a policy file at a nonstandard
location. For more information, see
[Website controls (policy files)](#website-controls-policy-files).
