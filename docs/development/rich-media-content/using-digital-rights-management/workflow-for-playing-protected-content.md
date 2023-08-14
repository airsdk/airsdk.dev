# Workflow for playing protected content

1.  Create a `MediaPlayer` instance.

        player = new MediaPlayer();

2.  Register `MediaPlayerCapabilityChangeEvent.HAS_DRM_CHANGE` event to the
    player. This event will be dispatched if the content is DRM protected.

        player.addEventListener(MediaPlayerCapabilityChangeEvent.HAS_DRM_CHANGE, onDRMCapabilityChange);

3.  In the event handler, obtain the `DRMTrait` instance. `DRMTrait` is the
    interface through which you invoke DRM-related methods, such as
    `authenticate()`. When loading a DRM-protected content, OSMF performs the
    DRM validating actions and dispatches state events. Add a
    `DRMEvent.DRM_STATE_CHANGE` event handler to the `DRMTrait`.

        private function onDRMCapabilityChange(event :MediaPlayerCapabilityChangeEvent):void
            {
                if (event.type == MediaPlayerCapabilityChangeEvent.HAS_DRM_CHANGE
                    && event.enabled)
                {
                    drmTrait = player.media.getTrait(MediaTraitType.DRM) as DRMTrait;
                    drmTrait.addEventListener
                        (DRMEvent.DRM_STATE_CHANGE,                     onDRMStateChange);
                }
            }

4.  Handle the DRM events in the `onDRMStateChange()` method.

        private function onDRMStateChange(event :DRMEvent) :void
        {
        	trace ( "DRMState: ",event.drmState);
        	switch(event.drmState)
        	{
        		case DRMState.AUTHENTICATION_NEEDED:
        			// Identity-based content
        			var authPopup :AuthWindow = AuthWindow.create(_parentWin);
        			authPopup.serverURL = event.serverURL;
        			authPopup.addEventListener("dismiss", function () :void {
        				trace ("Authentication dismissed");
        				if(_drmTrait != null)
        				{
        					//Ignore authentication. Just
        					//try to acquire a license.
        					_drmTrait.authenticate(null, null);
        				}
        			});
        			authPopup.addEventListener("authenticate",
        							function (event :AuthWindowEvent) :void {
        				if(_drmTrait != null)
        				{
        					_drmTrait.authenticate(event.username, event.password);
        				}
        			});
        			authPopup.show();
        			break;
        		case DRMState.AUTHENTICATING:
        			//Display any authentication message.
        			trace("Authenticating...");
        			break;
        		case DRMState.AUTHENTICATION_COMPLETE:
        			// Start to retrieve voucher and playback.
        			// You can display the voucher information at this point.
        			if(event.token)
        			// You just received the authentication token.
        			{
        				trace("Authentication success. Token: \n", event.token);
        			}
        			else
        			// You have got the voucher.
        			{
        				trace("DRM License:");
        				trace("Playback window period: ",
        					!isNaN(event.period) ? event.period == 0 ?
        					"<unlimited>" : event.period : "<none>");
        				trace("Playback window end date: ",
        					event.endDate != null ? event.endDate : "<none>");
        				trace("Playback window start date: ",
        					event.startDate != null ? event.startDate : "<none>");
        			}
        			break;
        		case DRMState.AUTHENTICATION_ERROR:
        			trace ("DRM Error:", event.mediaError.errorID +
        				"[" + DRMErrorEventRef.getDRMErrorMnemonic
        				(event.mediaError.errorID) + "]");
        			//Stop everything.
        			player.media = null;
        			break;
        		case DRMState.DRM_SYSTEM_UPDATING:
        			Logger.log("Downloading DRM module...");
        			break;
        		case DRMState.UNINITIALIZED:
        			break;
        	}
        }
