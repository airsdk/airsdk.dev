---
sidebar_position: 3
---

# Using the DRMStatusEvent class

A NetStream object dispatches a DRMStatusEvent object when the content protected
by Adobe Access begins playing successfully. (Success implies that the license
is verified and that the user is authenticated and authorized to view the
content). The DRMStatusEvent is also dispatched for anonymous users if they are
permitted access. The license is checked to verify whether anonymous users, who
do not require authentication, are allowed access to play the content. Anonymous
users maybe denied access for various reasons. For example, an anonymous user
does not have access to the content when the license has expired.

The DRMStatusEvent object contains information related to the license. Such
information includes whether the license can be made available offline or when
the voucher expires and the content can no longer be viewed. The application can
use this data to convey the user's policy status and its permissions.

## DRMStatusEvent properties

The DRMStatusEvent class includes the following properties. Some properties
became available in versions of AIR later than 1.0. For complete version
information, see the
[ActionScript 3.0 Reference for the Adobe Flash Platform](https://airsdk.dev/reference/actionscript/3.0/index.html).

For properties that aren't supported in Flash Player 10.1, the DRMVoucher class
provides similar properties for Flash Player.

| Property                      | Description                                                                                                                                                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contentData                   | A DRMContentData object containing the DRM metadata embedded in the content.                                                                                                                                                                                                                            |
| detail (AIR only)             | A string explaining the context of the status event. In DRM 1.0, the only valid value is DRM.voucherObtained.                                                                                                                                                                                           |
| isAnonymous (AIR only)        | Indicates whether the content, protected with Adobe Access, is available without requiring a user to provide authentication credentials (true) or not (false). A false value means that the user must provide a user name and password that matches the one known and expected by the content provider. |
| isAvailableOffline (AIR only) | Indicates whether the content, protected with Adobe Access, can be made available offline (true) or not (false). In order for digitally protected content to be available offline, its voucher must be cached to the user's local machine.                                                              |
| isLocal                       | Indicates whether the voucher that is required to play the content is cached locally.                                                                                                                                                                                                                   |
| offlineLeasePeriod (AIR only) | The remaining number of days that content can be viewed offline.                                                                                                                                                                                                                                        |
| policies (AIR only)           | A custom object that can contain custom DRM properties.                                                                                                                                                                                                                                                 |
| voucher                       | The DRMVoucher.                                                                                                                                                                                                                                                                                         |
| voucherEndDate (AIR only)     | The absolute date on which the voucher expires and the content is no longer viewable.                                                                                                                                                                                                                   |

## Creating a DRMStatusEvent handler

The following example creates an event handler that outputs the DRM content
status information for the NetStream object that originated the event. Add this
event handler to a NetStream object that points to protected content.

    function drmStatusEventHandler(event:DRMStatusEvent):void
    {
    	trace(event);
    }
    function drmStatusEventHandler(event:DRMStatusEvent):void
    {
    	trace(event);
    }
