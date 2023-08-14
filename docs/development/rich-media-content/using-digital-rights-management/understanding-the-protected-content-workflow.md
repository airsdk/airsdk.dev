---
sidebar_position: 1
---

# Understanding the protected content workflow

**_Important_** : Flash Player 11.5 and above integrates the Adobe Access
module, so the update step (calling
`SystemUpdater.update(SystemUpdaterType.DRM)`) is unnecessary. This includes the
following browsers and platforms:

- Flash Player 11.5 ActiveX control, for all platforms except Internet Explorer
  on Windows 8 on Intel processors

- Flash Player 11.5 plugin, for all browsers

- Adobe AIR (desktop and mobile)

This means that the update step is _still required_ in the following cases:

- Internet Explorer on Windows 8 on Intel processors

- Flash Player 11.4 and below, except on Google Chrome 22 and above (all
  platforms) or 21 and above (Windows)

Note: You can still safely call `SystemUpdater.update(SystemUpdaterType.DRM)` on
a system with Flash Player 11.5 or higher, but nothing is downloaded.

The following high-level workflow shows that how an application can retrieve and
play protected content. The workflow assumes that the application is designed
specifically to play content protected by Adobe Access:

1.  Get the content metadata.

2.  Handle updates to Flash Player, if needed.

3.  Check if a license is available locally. If so, load it and go to step 7. If
    not, go to step 4.

4.  Check if authentication is required. If not, you can go to step 7.

5.  If authentication is required, get the authentication credentials from the
    user and pass them to the license server.

6.  If domain registration is required, join the domain (AIR 3.0 and higher).

7.  Once authentication succeeds, download the license from the server.

8.  Play the content.

If an error has not occurred and the user was successfully authorized to view
the content, the NetStream object dispatches a DRMStatusEvent object. The
application then begins playback. The DRMStatusEvent object holds the related
voucher information, which identifies the user's policy and permissions. For
example, it holds information regarding whether the content can be made
available offline or when the license expires. The application can use this data
to inform the user of the status of their policy. For example, the application
can display the number of remaining days the user has for viewing the content in
a status bar.

If the user is allowed offline access, the voucher is cached, and the encrypted
content is downloaded to the user's machine. The content is made accessible for
the duration defined in the license caching duration. The `detail` property in
the event contains `"DRM.voucherObtained"`. The application decides where to
store the content locally in order for it to be available offline. You can also
preload vouchers using the DRMManager class.

Note: Caching and pre-loading of vouchers is supported in both AIR and Flash
Player. However, downloading and storing encrypted content is supported only in
AIR.

It is the application's responsibility to explicitly handle the error events.
These events include cases where the user inputs valid credentials, but the
voucher protecting the encrypted content restricts the access to the content.
For example, an authenticated user cannot access content if the rights have not
been paid for. This case can also occur when two registered members of the same
publisher attempt to share content that only one of them has paid for. The
application must inform the user of the error and provide an alternative
suggestion. A typical alternative suggestion is instructions in how to register
and pay for viewing rights.

## Detailed API workflow

This workflow provides a more detailed view of the protected-content workflow.
This workflow describes the specific APIs used to play content protected by
Adobe Access.

1.  Using a URLLoader object, load the bytes of the protected content's metadata
    file. Set this object to a variable, such as `metadata_bytes`.

    All content controlled by Adobe Access has Adobe Access metadata. When the
    content is packaged, this metadata can be saved as a separate metadata file
    (.metadata) alongside the content. For more information, see the Adobe
    Access documentation.

2.  Create a DRMContentData instance. Put this code into a try-catch block:

    `new DRMContentData( `_`metadata_bytes`_` )`

    where _`metadata_bytes`_ is the URLLoader object obtained in step 1.

3.  (Flash Player only) The runtime checks for the Adobe Access module. If not
    found, an IllegalOperationError with DRMErrorEvent error code 3344 or
    DRMErrorEvent error code 3343 is thrown.

    To handle this error, download the Adobe Access module using the
    SystemUpdater API. After this module is downloaded, the SystemUpdater object
    dispatches a COMPLETE event. Include an event listener for this event that
    returns to step 2 when this event is dispatched. The following code
    demonstrates these steps:

        flash.system.SystemUpdater.addEventListener(Event.COMPLETE, updateCompleteHandler);
        flash.system.SystemUpdater.update(flash.system.SystemUpdaterType.DRM)

        private function updateCompleteHandler (event:Event):void {
        	/*redo step 2*/
        	drmContentData = new DRMContentData(metadata_bytes);
        }

    If the player itself must be updated, a status event is dispatched. For more
    information on handling this event, see
    [Listening for an update event](./updating-flash-player-to-support-adobe-access.md#listening-for-an-update-event).

    Note: In AIR applications, the AIR installer handles updating the Adobe
    Access module and required runtime updates.

4.  Create listeners to listen for the DRMStatusEvent and DRMErrorEvent
    dispatched from the DRMManager object:

        DRMManager.addEventListener(DRMStatusEvent.DRM_STATUS, onDRMStatus);
        DRMManager.addEventListener(DRMErrorEvent.DRM_ERROR, onDRMError);

    In the DRMStatusEvent listener, check that the voucher is valid (not null).
    In the DRMErrorEvent listener, handle DRMErrorEvents. See
    [Using the DRMStatusEvent class](./using-the-drmstatusevent-class.md) and
    [Using the DRMErrorEvent class](./using-the-drmerrorevent-class.md).

5.  Load the voucher (license) that is required to play the content.

    First, try to load a locally stored license to play the content:

        DRMManager.loadvoucher(drmContentData, LoadVoucherSetting.LOCAL_ONLY)

    After loading completes, the DRMManager object dispatches
    `DRMStatusEvent.DRM_Status`.

6.  If the DRMVoucher object is not null, the voucher is valid. Skip to step 13.

7.  If the DRMVoucher object is null, check the authentication method required
    by the policy for this content. Use the
    `DRMContentData.authenticationMethod` property.

8.  If the authentication method is `ANONYMOUS`, go to step 13.

9.  If the authentication method is `USERNAME_AND_PASSWORD`, your application
    must provide a mechanism to let the user enter credentials. Pass these
    credentials to the license server to authenticate the user:

        DRMManager.authenticate(metadata.serverURL, metadata.domain, username, password)

    The DRMManager dispatches a `DRMAuthenticationErrorEvent` if authentication
    fails or a `DRMAuthenticationCompleteEvent` if authentication succeeds.
    Create listeners for these events.

10. If the authentication method is `UNKNOWN`, a custom authentication method
    must be used. In this case, the content provider has arranged for
    authentication to be done in an out-of-band manner by not using the
    ActionScript 3.0 APIs. The custom authentication procedure must produce an
    authentication token that can be passed to the
    `DRMManager.setAuthenticationToken()` method.

11. If authentication fails, your application must return to step 9. Ensure that
    your application has a mechanism to handle and limit repeated authentication
    failures. For example, after three attempts, you display a message to the
    user indicating the authentication has failed and content cannot be played.

12. To use the stored token instead of prompting the user to enter credentials,
    set the token with `DRMManager.setAuthenticationToken()` method. You then
    download the license from the license server and play content as in step 8.

13. (optional) If authentication succeeds, you can capture the authentication
    token, which is a byte array cached in memory. Get this token with the
    `DRMAuthenticationCompleteEvent.token` property. You can store and use the
    authentication token so that the user does not have to repeatedly enter
    credentials for this content. The license server determines the valid period
    of the authentication token.

14. If authentication succeeds, download the license from the license server:

        DRMManager.loadvoucher(drmContentData, LoadVoucherSetting.FORCE_REFRESH)

    After loading completes, the DRMManager object dispatches
    DRMStatusEvent.DRM_STATUS. Listen for this event, and when it is dispatched,
    you can play the content.

15. Play the video by creating a NetStream object and then calling its `play()`
    method:

        stream = new NetStream(connection);
        stream.addEventListener(DRMStatusEvent.DRM _STATUS, drmStatusHandler);
        stream.addEventListener(DRMErrorEvent.DRM_ERROR, drmErrorHandler);
        stream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
        stream.client = new CustomClient();
        video.attachNetStream(stream);
        stream.play(videoURL);

## DRMContentData and session objects

When `DRMContentData` is created, it will be used as a session object that
refers to the Flash Player DRM module. All the `DRMManager` APIs that receives
this `DRMContentData` will use that particular DRM module. However, there are 2
`DRMManager` APIs that does not use `DRMContentData`. They are:

1.  `authenticate()`

2.  `setAuthenticationToken()`

Since there is no `DRMContentData` associated, invoking these `DRMManager` APIs
will use the latest DRM module from the disk. This may become a problem if an
update of the DRM module happens in the middle of the application's DRM
workflow. Consider the following scenario:

1.  The application creates a `DRMContentData` object `contentData1`, which uses
    _AdobeCP1_ as the DRM module.

2.  The application invokes the
    `DRMManager.authenticate(contentData1.serverURL,...)` method.

3.  The application invokes the `DRMManager.loadVoucher(contentData1, ...)`
    method.

If an update happens for the DRM module before the application can get to step
2, then the `DRMManager.authenticate()` method will end up authenticating using
_AdobeCP2_ as the DRM module. The `loadVoucher()` method in step 3 will fail
since it is still using _AdobeCP1_ as the DRM module. The update may have
happened due to another application invoking the DRM module update.You can avoid
this scenario by invoking the DRM module update on application startup.

## DRM-related events

The runtime dispatches numerous events when an application attempts to play
protected content:

- DRMDeviceGroupErrorEvent (AIR only), dispatched by DRMManager

- DRMAuthenticateEvent (AIR only), dispatched by NetStream

- DRMAuthenticationCompleteEvent, dispatched by DRMManager

- DRMAuthenticationErrorEvent, dispatched by DRMManager

- DRMErrorEvent, dispatched by NetStream and DRMManager

- DRMStatusEvent, dispatched by NetStream and DRMManager

- StatusEvent

- NetStatusEvent. See
  [Listening for an update event](./updating-flash-player-to-support-adobe-access.md#listening-for-an-update-event)

To support content protected by Adobe Access, add event listeners for handling
the DRM events.

## Pre-loading vouchers for offline playback

You can preload the vouchers (licenses) required to play content protected by
Adobe Access. Pre-loaded vouchers allow users to view the content whether they
have an active Internet connection. (The preload process itself requires an
Internet connection.) You can use the NetStream class
`preloadEmbeddedMetadata()` method and the DRMManager class to preload vouchers.
In AIR 2.0 and later, you can use a DRMContentData object to preload vouchers
directly. This technique is preferable because it lets you update the
DRMContentData object independent of the content. (The `preloadEmbeddedData()`
method fetches DRMContentData from the content.)

### Using DRMContentData

The following steps describe the workflow for pre-loading the voucher for a
protected media file using a DRMContentData object.

1.  Get the binary metadata for the packaged content. If using the Adobe Access
    Java Reference Packager, this metadata file is automatically generated with
    a _.metadata_ extension. You could, for example, download this metadata
    using the URLLoader class.

2.  Create a DRMContentData object, passing the metadata to the constructor
    function:

        var drmData:DRMContentData = new DRMContentData( metadata );

3.  The rest of the steps are identical to the workflow described in
    [Understanding the protected content workflow](#understanding-the-protected-content-workflow).

### Using preloadEmbeddedMetadata()

The following steps describe the workflow for pre-loading the voucher for a
DRM-protected media file using `preloadEmbeddedMetadata()`:

1.  Download and store the media file. (DRM metadata can only be pre-loaded from
    locally stored files.)

2.  Create the NetConnection and NetStream objects, supplying implementations
    for the `onDRMContentData()` and `onPlayStatus()` callback functions of the
    NetStream client object.

3.  Create a NetStreamPlayOptions object and set the `stream` property to the
    URL of the local media file.

4.  Call the NetStream `preloadEmbeddedMetadata()`, passing in the
    NetStreamPlayOptions object identifying the media file to parse.

5.  If the media file contains DRM metadata, then the `onDRMContentData()`
    callback function is invoked. The metadata is passed to this function as a
    DRMContentData object.

6.  Use the DRMContentData object to obtain the voucher using the DRMManager
    `loadVoucher()` method.

    If the value of the `authenticationMethod` property of the `DRMContentData`
    object is `flash.net.drm.AuthenticationMethod.USERNAME_AND_PASSWORD`,
    authenticate the user on the media rights server before loading the voucher.
    The `serverURL` and `domain` properties of the DRMContentData object can be
    passed to the DRMManager `authenticate()` method, along with the user's
    credentials.

7.  The `onPlayStatus()` callback function is invoked when file parsing is
    complete. If the `onDRMContentData()` function has not been called, the file
    does not contain the metadata required to obtain a voucher. This missing
    call also possibly means that Adobe Access does not protect this file.

The following code example for AIR illustrates how to preload a voucher for a
local media file:

    package
    {
    	import flash.display.Sprite;
    	import flash.events.DRMAuthenticationCompleteEvent;
    	import flash.events.DRMAuthenticationErrorEvent;
    	import flash.events.DRMErrorEvent;
    	import flash.ev ents.DRMStatusEvent;
    	import flash.events.NetStatusEvent;
    	import flash.net.NetConnection;
    	import flash.net.NetStream;
    	import flash.net.NetStreamPlayOptions;
    	import flash.net.drm.AuthenticationMethod;
    	import flash.net.drm.DRMContentData;
    	import flash.net.drm.DRMManager;
    	import flash.net.drm.LoadVoucherSetting;
    	public class DRMPreloader extends Sprite
    	{
    		private var videoURL:String = "app-storage:/video.flv";
    		private var userName:String = "user";
    		private var password:String = "password";
    		private var preloadConnection:NetConnection;
    		private var preloadStream:NetStream;
    		private var drmManager:DRMManager = DRMManager.getDRMManager();
    		private var drmContentData:DRMContentData;
    		public function DRMPreloader():void {
    			drmManager.addEventListener(
    				DRMAuthenticationCompleteEvent.AUTHENTICATION_COMPLETE,
    				onAuthenticationComplete);
    			drmManager.addEventListener(DRMAuthenticationErrorEvent.AUTHENTICATION_ERROR,
    				onAuthenticationError);
    			drmManager.addEventListener(DRMStatusEvent.DRM_STATUS, onDRMStatus);
    			drmManager.addEventListener(DRMErrorEvent.DRM_ERROR, onDRMError);
    			preloadConnection = new NetConnection();
    			preloadConnection.addEventListener(NetStatusEvent.NET_STATUS, onConnect);
    			preloadConnection.connect(null);
    		}

    		private function onConnect( event:NetStatusEvent ):void
    		{
    			preloadMetadata();
    		}
    		private function preloadMetadata():void
    		{
    			preloadStream = new NetStream( preloadConnection );
    			preloadStream.client = this;
    			var options:NetStreamPlayOptions = new NetStreamPlayOptions();
    			options.streamName = videoURL;
    			preloadStream.preloadEmbeddedData( options );
    		}
    		public function onDRMContentData( drmMetadata:DRMContentData ):void
    		{
    			drmContentData = drmMetadata;
    			if ( drmMetadata.authenticationMethod == AuthenticationMethod.USERNAME_AND_PASSWORD )
    			{
    				authenticateUser();
    			}
    			else
    			{
    				getVoucher();
    			}
    		}
    		private function getVoucher():void
    		{
    			drmManager.loadVoucher( drmContentData, LoadVoucherSetting.ALLOW_SERVER );
    		}

    		private function authenticateUser():void
    		{
    			drmManager.authenticate( drmContentData.serverURL, drmContentData.domain, userName, password );
    		}
    		private function onAuthenticationError( event:DRMAuthenticationErrorEvent ):void
    		{
    			trace( "Authentication error: " + event.errorID + ", " + event.subErrorID );
    		}

    		private function onAuthenticationComplete( event:DRMAuthenticationCompleteEvent ):void
    		{
    			trace( "Authenticated to: " + event.serverURL + ", domain: " + event.domain );
    			getVoucher();
    		}
    		private function onDRMStatus( event:DRMStatusEvent ):void
    		{
    			trace( "DRM Status: " + event.detail);
    			trace("--Voucher allows offline playback = " + event.isAvailableOffline );
    			trace("--Voucher already cached          = " + event.isLocal );
    			trace("--Voucher required authentication = " + !event.isAnonymous );
    		}
    		private function onDRMError( event:DRMErrorEvent ):void
    		{
    			trace( "DRM error event: " + event.errorID + ", " + event.subErrorID + ", " + event.text );
    		}
    		public function onPlayStatus( info:Object ):void
    		{
    			preloadStream.close();
    		}
    	}
    }
