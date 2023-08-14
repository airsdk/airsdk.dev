---
sidebar_position: 2
---

# DRM-related members and events of the NetStream class

The NetStream class provides a one-way streaming connection between Flash Player
or an AIR application, and either Flash Media Server or the local file system.
(The NetStream class also supports progressive download.) A NetStream object is
a channel within a NetConnection object. The NetStream class dispatches four
DRM-related events:

<table>
<thead>
    <tr>
        <th><p>Event</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>drmAuthenticate</p>
        <p>(AIR only)</p></td>
        <td><p>Defined in
        the DRMAuthenticateEvent class. This event is dispatched when a
        NetStream object tries to play protected content that requires a user
        credential for authentication before playback.</p>
        <p>The properties of this event include header, usernamePrompt,
        passwordPrompt, and urlPrompt properties that can be used in obtaining
        and setting the user's credentials. This event occurs repeatedly until
        the NetStream object receives valid user credentials.</p></td>
    </tr>
    <tr>
        <td><p>drmError</p></td>
        <td><p>Defined in
        the DRMErrorEvent class and dispatched when a NetStream object tries to
        play protected content and encounters a DRM-related error. For example,
        DRM error event object is dispatched when the user authorization fails.
        This error could occur because the user has not purchased the rights to
        view the content. It could also occur because the content provider does
        not support the viewing application.</p></td>
    </tr>
    <tr>
        <td><p>drmStatus</p></td>
        <td><p>Defined in
        the DRMStatusEvent class. This event is dispatched when the protected
        content begins playing (when the user is authenticated and authorized to
        play the content). The DRMStatusEvent object contains information
        related to the voucher. Voucher information includes whether the content
        can be made available offline or when the voucher expires and the
        content can no longer be viewed.</p></td>
    </tr>
    <tr>
        <td><p>status</p></td>
        <td><p>Defined in
        events.StatusEvent and only dispatched when the application attempts to
        play protected content, by invoking the NetStream.play() method. The
        value of the status code property is "DRM.encryptedFLV".</p></td>
    </tr>
</tbody>
</table>

The NetStream class includes the following DRM-specific methods, for use in AIR
only:

<table>
<thead>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>resetDRMVouchers()</p></td>
        <td><p>Deletes all
        the locally cached digital rights management (DRM) voucher data. The
        application must download the vouchers again for the user to be able to
        access the encrypted content.</p>
        <p>For example, the following code removes all vouchers from the
        cache:</p>
        <p>NetStream.resetDRMVouchers();</p></td>
    </tr>
    <tr>
        <td><p>setDRMAuthenticationCredentials()</p></td>
        <td><p>Passes a set
        of authentication credentials, namely user name, password, and
        authentication type, to the NetStream object for authentication. Valid
        authentication types are <samp>"drm"</samp> and <samp>"proxy"</samp>.
        With <samp>"drm"</samp> authentication type, the credentials provided
        are authenticated against Adobe Access. With <samp>"proxy"</samp>
        authentication type, the credentials authenticate against the proxy
        server and must match the credentials required by the proxy server. For
        example, an enterprise can require the application to authenticate
        against a proxy server before the user can access the Internet. The
        proxy option allows this type of authentication. Unless anonymous
        authentication is used, after the proxy authentication, the user must
        still authenticate against Adobe Access to obtain the voucher and play
        the content. You can use <samp>setDRMAuthenticationCredentials()</samp>
        a second time, with " <samp>drm</samp> " option, to authenticate against
        Adobe Access.</p></td>
    </tr>
    <tr>
        <td><p>preloadEmbeddedMetadata()</p></td>
        <td><p>Parses a
        local media file for embedded metadata. When DRM-related metadata is
        found, AIR calls the <samp>onDRMContentData()</samp> callback
        function.</p></td>
    </tr>
</tbody>
</table>

In addition, in AIR, a NetStream object calls the `onDRMContentData()` and
`onPlayStatus()` callback functions as a result of a call to the
`preloadEmbeddedMetaData()` method. The `onDRMContentData()` function is called
when DRM metadata is encountered in a media file. The `onPlayStatus()` function
is called when the file has been parsed. The `onDRMContentData()` and
`onPlayStatus()` functions must be defined on the `client` object assigned to
the NetStream instance. If you use the same NetStream object to preload vouchers
and play content, wait for the `onPlayStatus()` call generated by
`preloadEmbeddedMetaData()` before starting playback.

In the following code for AIR, user name ("administrator"), password
("password") and the "drm" authentication type are set for authenticating the
user. The setDRMAuthenticationCredentials() method must provide credentials that
match credentials known and accepted by the content provider. These credentials
are the same user credentials that permit the user to view the content. The code
for playing the video and making sure that a successful connection to the video
stream has been made is not included here.

    var connection:NetConnection = new NetConnection();
    connection.connect(null);

    var videoStream:NetStream = new NetStream(connection);

    videoStream.addEventListener(DRMAuthenticateEvent.DRM_AUTHENTICATE,
                            drmAuthenticateEventHandler)

    private function drmAuthenticateEventHandler(event:DRMAuthenticateEvent):void
    {
    	videoStream.setDRMAuthenticationCredentials("administrator", "password", "drm");
    }
