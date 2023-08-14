---
sidebar_position: 4
---

# Using the DRMAuthenticateEvent class

The DRMAuthenticateEvent object is dispatched when a NetStream object tries to
play protected content that requires a user credential for authentication before
playback.

The DRMAuthenticateEvent handler is responsible for gathering the required
credentials (user name, password, and type) and passing the values to the
`NetStream.setDRMAuthenticationCredentials()` method for validation. Each AIR
application must provide some mechanism for obtaining user credentials. For
example, the application could provide a user with a simple user interface to
enter the user name and password values. Also, provide a mechanism for handling
and limiting repeated authentication attempts.

## DRMAuthenticateEvent properties

The DRMAuthenticateEvent class includes the following properties:

<table>
<thead>
    <tr>
        <th><p>Property</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>authenticationType</p></td>
        <td><p>Indicates
        whether the supplied credentials are for authenticating against Adobe
        Access ("drm") or a proxy server ("proxy"). For example, the "proxy"
        option allows the application to authenticate against a proxy server if
        necessary before the user can access the Internet. Unless anonymous
        authentication is used, after the proxy authentication, the user must
        still authenticate against Adobe Access to obtain the voucher and play
        the content. You can use setDRMAuthenticationcredentials() a second
        time, with "drm" option, to authenticate against Adobe Access.</p></td>
    </tr>
    <tr>
        <td><p>header</p></td>
        <td><p>The encrypted
        content file header provided by the server. It contains information
        about the context of the encrypted content.</p>
        <p>This header string can be passed on to the Flash application to
        enable the application to construct a user name-password dialog box. The
        header string can be used as the dialog box's instructions. For example,
        the header can be "Please type in your user name and password".</p></td>
    </tr>
    <tr>
        <td><p>netstream</p></td>
        <td><p>The NetStream
        object that initiated this event.</p></td>
    </tr>
    <tr>
        <td><p>passwordPrompt</p></td>
        <td><p>A prompt for
        a password credential, provided by the server. The string can include
        instruction for the type of password required.</p></td>
    </tr>
    <tr>
        <td><p>urlPrompt</p></td>
        <td><p>A prompt for
        a URL string, provided by the server. The string can provide the
        location where the user name and password are sent.</p></td>
    </tr>
    <tr>
        <td><p>usernamePrompt</p></td>
        <td><p>A prompt for
        a user name credential, provided by the server. The string can include
        instruction for the type of user name required. For example, a content
        provider can require an e-mail address as the user name.</p></td>
    </tr>
</tbody>
</table>

The previously mentioned strings are supplied by the FMRMS server only. Adobe
Access Server does not use these strings.

## Creating a DRMAuthenticateEvent handler

The following example creates an event handler that passes a set of hard-coded
authentication credentials to the NetStream object that originated the event.
(The code for playing the video and making sure that a successful connection to
the video stream has been made is not included here.)

    var connection:NetConnection = new NetConnection();
    connection.connect(null);

    var videoStream:NetStream = new NetStream(connection);

    videoStream.addEventListener(DRMAuthenticateEvent.DRM_AUTHENTICATE,
                            drmAuthenticateEventHandler)

    private function drmAuthenticateEventHandler(event:DRMAuthenticateEvent):void
    {
    	videoStream.setDRMAuthenticationCredentials("administrator", "password", "drm");
    }

## Creating an interface for retrieving user credentials

In the case where protected content requires user authentication, the AIR
application must usually retrieve the user's authentication credentials via a
user interface.

The following is a Flex example of a simple user interface for retrieving user
credentials. It consists of a panel object containing two TextInput objects, one
for each of the user name and password credentials. The panel also contains a
button that launches the `credentials()` method.

    <mx:Panel x="236.5" y="113" width="325" height="204" layout="absolute" title="Login">
    <mx:TextInput x="110" y="46" id="uName"/>
    <mx:TextInput x="110" y="76" id="pWord" displayAsPassword="true"/>
    <mx:Text x="35" y="48" text="Username:"/>
    <mx:Text x="35" y="78" text="Password:"/>
    <mx:Button x="120" y="115" label="Login" click="credentials()"/>
    </mx:Panel>

The `credentials()` method is a user-defined method that passes the user name
and password values to the `setDRMAuthenticationCredentials()` method. Once the
values are passed, the `credentials()` method resets the values of the TextInput
objects.

    <mx:Script>
    <![CDATA[
        public function credentials():void
        {
            videoStream.setDRMAuthenticationCredentials(uName, pWord, "drm");
            uName.text = "";
            pWord.text = "";
        }
    ]]>
    </mx:Script>

One way to implement this type of simple interface is to include the panel as
part of a new state. The new state originates from the base state when the
DRMAuthenticateEvent object is thrown. The following example contains a
VideoDisplay object with a source attribute that points to a protected FLV file.
In this case, the `credentials()` method is modified so that it also returns the
application to the base state. This method does so after passing the user
credentials and resetting the TextInput object values.

    <?xml version="1.0" encoding="utf-8"?>
    <mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml"
    	layout="absolute"
    	width="800"
    	height="500"
    	title="DRM FLV Player"
    	creationComplete="initApp()">

    <mx:states>
        <mx:State name="LOGIN">
            <mx:AddChild position="lastChild">
                    <mx:Panel x="236.5" y="113" width="325" height="204" layout="absolute"
                            title="Login">
                    <mx:TextInput x="110" y="46" id="uName"/>
                    <mx:TextInput x="110" y="76" id="pWord" displayAsPassword="true"/>
                    <mx:Text x="35" y="48" text="Username:"/>
                    <mx:Text x="35" y="78" text="Password:"/>
                    <mx:Button x="120" y="115" label="Login" click="credentials()"/>
                    <mx:Button x="193" y="115" label="Reset" click="uName.text='';
                            pWord.text='';"/>
                </mx:Panel>
            </mx:AddChild>
        </mx:State>
    </mx:states>

    <mx:Script>
        <![CDATA[
                import flash.events.DRMAuthenticateEvent;
            private function initApp():void
            {
                videoStream.addEventListener(DRMAuthenticateEvent.DRM_AUTHENTICATE,
                                        drmAuthenticateEventHandler);
            }

            public function credentials():void
            {
                videoStream.setDRMAuthenticationCredentials(uName, pWord, "drm");
                uName.text = "";
                pWord.text = "";
                currentState='';
            }

            private function drmAuthenticateEventHandler(event:DRMAuthenticateEvent):void
            {
                currentState='LOGIN';
            }
        ]]>
    </mx:Script>

    <mx:VideoDisplay id="video" x="50" y="25" width="700" height="350"
        autoPlay="true"
        bufferTime="10.0"
        source="http://www.example.com/flv/Video.flv" />
    </mx:WindowedApplication>
