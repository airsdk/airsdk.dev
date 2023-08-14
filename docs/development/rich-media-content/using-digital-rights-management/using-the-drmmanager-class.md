---
sidebar_position: 6
---

# Using the DRMManager class

Use the DRMManager class to manage vouchers and media rights server sessions in
applications.

**Voucher management (AIR only)**

Whenever a user plays protected content, the runtime obtains and caches the
license required to view the content. If the application saves the file locally,
and the license allows offline playback, the user can view the content in the
AIR application. Such local offline playback succeeds even if a connection to
the media rights server is not available. Using the DRMManager and the NetStream
`preloadEmbeddedMetadata()` method, you can pre-cache the voucher. The
application does not have to obtain the license necessary to view the content.
For example, your application could download the media file and then obtain the
voucher while the user is still online.

To preload a voucher, use the NetStream `preloadEmbeddedMetadata()` method to
obtain a DRMContentData object. The DRMContentData object contains the URL and
domain of the media rights server that can provide the license and describes
whether user authentication is required. With this information, you can call the
DRMManager `loadVoucher()` method to obtain and cache the voucher. The workflow
for pre-loading vouchers is described in more detail in
[Pre-loading vouchers for offline playback](./understanding-the-protected-content-workflow.md#pre-loading-vouchers-for-offline-playback).

**Session management**

You can also use the DRMManager to authenticate the user to a media rights
server and to manage persistent sessions.

Call the DRMManager `authenticate()` method to establish a session with the
media rights server. When authentication is completed successfully, the
DRMManager dispatches a DRMAuthenticationCompleteEvent object. This object
contains a session token. You can save this token to establish future sessions
so that the user does not have to provide their account credentials. Pass the
token to the `setAuthenticationToken()` method to establish a new authenticated
session. (The settings of the server that generated the token determine the
token expiration and other attributes. AIR application code should not interpret
the token data structure, because the structure may change in future AIR
updates.)

Authentication tokens can be transferred to other computers. To protect tokens,
you can store them in the AIR Encrypted Local Store. See
[Encrypted local storage](../../files-and-data/storing-local-data/encrypted-local-storage.md)
for more information.

## DRMStatus Events

The DRMManager dispatches a DRMStatusEvent object after a call to the
`loadVoucher()` method completes successfully.

If a voucher is obtained, then the `detail` property (AIR only) of the event
object has the value: "DRM.voucherObtained", and the `voucher` property contains
the DRMVoucher object.

If a voucher is not obtained, then the `detail` property (AIR only) still has
the value: "DRM.voucherObtained"; however, the `voucher` property is `null`. A
voucher cannot be obtained if, for example, you use the LoadVoucherSetting of
_localOnly_ and there is no locally cached voucher.

If the `loadVoucher()` call does not complete successfully, perhaps because of
an authentication or communication error, then the DRMManager dispatches a
DRMErrorEvent or DRMAuthenticationErrorEvent object instead.

## DRMAuthenticationComplete events

The DRMManager dispatches a DRMAuthenticationCompleteEvent object when a user is
successfully authenticated through a call to the `authenticate()` method.

The DRMAuthenticationCompleteEvent object contains a reusable token that can be
used to persist user authentication across application sessions. Pass this token
to DRMManager `setAuthenticationToken()` method to re-establish the session.
(The token creator sets token attributes such as expiration. Adobe does not
provide an API for examining token attributes.)

## DRMAuthenticationError events

The DRMManager dispatches a DRMAuthenticationErrorEvent object when a user
cannot be successfully authenticated through a call to the `authenticate()` or
`setAuthenticationToken()` methods.
