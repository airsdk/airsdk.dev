"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[47295],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=d(n),h=i,m=p["".concat(c,".").concat(h)]||p[h]||u[h]||o;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var d=2;d<o;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},46810:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var r=n(87462),i=(n(67294),n(3905));const o={sidebar_position:9},a="Out-of-band Licenses",s={unversionedId:"development/rich-media-content/using-digital-rights-management/out-of-band-licenses",id:"development/rich-media-content/using-digital-rights-management/out-of-band-licenses",title:"Out-of-band Licenses",description:"Licenses can also be obtained out-of-band (without contacting a Adobe Access",source:"@site/docs/development/rich-media-content/using-digital-rights-management/out-of-band-licenses.md",sourceDirName:"development/rich-media-content/using-digital-rights-management",slug:"/development/rich-media-content/using-digital-rights-management/out-of-band-licenses",permalink:"/docs/development/rich-media-content/using-digital-rights-management/out-of-band-licenses",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/rich-media-content/using-digital-rights-management/out-of-band-licenses.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"mainSidebar",previous:{title:"Updating Flash Player to support Adobe Access",permalink:"/docs/development/rich-media-content/using-digital-rights-management/updating-flash-player-to-support-adobe-access"},next:{title:"Domain support",permalink:"/docs/development/rich-media-content/using-digital-rights-management/domain-support"}},c={},d=[],l={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"out-of-band-licenses"},"Out-of-band Licenses"),(0,i.kt)("p",null,"Licenses can also be obtained out-of-band (without contacting a Adobe Access\nLicense Server) by storing the voucher (license) on disk and in memory using the\n",(0,i.kt)("inlineCode",{parentName:"p"},"storeVoucher")," method."),(0,i.kt)("p",null,"To play encrypted videos in Flash Player and AIR, the respective runtime needs\nto obtain the DRM voucher for that video. The DRM voucher contains the video's\ndecryption key and is generated by the Adobe Access License Server that the\ncustomer has deployed."),(0,i.kt)("p",null,"The Flash Player/AIR runtime generally obtains this voucher by sending a voucher\nrequest to the Adobe Access License Server indicated in the video's DRM metadata\n( ",(0,i.kt)("inlineCode",{parentName:"p"},"DRMContentData")," class). The Flash/AIR application can trigger this license\nrequest by calling the ",(0,i.kt)("inlineCode",{parentName:"p"},"DRMManager.loadVoucher()")," method. Or, the Flash\nPlayer/AIR runtime will automatically request a license at the start of the\nencrypted video playback if there is no license for the content on disk or in\nmemory. In either case, the Flash/AIR application's performance gets impacted by\ncommunicating with the Adobe Access License Server."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"DRMManager.storeVoucher()")," allows the Flash/AIR application to send DRM\nvouchers that it has obtained out-of-band to the Flash Player/AIR runtime. The\nruntime can then skip the license request process and use the forwarded vouchers\nfor playing encrypted videos. The DRM voucher still needs to be generated by the\nAdobe Access License Server before it can be obtained out-of-band. However, you\nhave the option of hosting the vouchers on any HTTP server, instead of a\npublic-facing Adobe Access license server."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"DRMManager.storeVoucher()"),' is also used to support DRM voucher sharing between\nmultiple devices. In Adobe Access 3.0, this feature is referred to as "Domain\nSupport". If your deployment supports this use case, you can register multiple\nmachines to a device group using the ',(0,i.kt)("inlineCode",{parentName:"p"},"DRMManager.addToDeviceGroup()")," method. If\nthere is a machine with a valid domain-bound voucher for a given content, the\nAIR application can then extract the serialized DRM vouchers using the\n",(0,i.kt)("inlineCode",{parentName:"p"},"DRMVoucher.toByteArray()")," method and on your other machines you can import the\nvouchers using the ",(0,i.kt)("inlineCode",{parentName:"p"},"DRMManager.storeVoucher()")," method."),(0,i.kt)("p",null,"More Help topics"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/development/rich-media-content/using-digital-rights-management/device-registration"},"Device registration")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/development/rich-media-content/using-digital-rights-management/factory-reset"},"Factory reset")))}u.isMDXComponent=!0}}]);