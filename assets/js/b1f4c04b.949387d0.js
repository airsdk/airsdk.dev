"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[4033],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var d=r.createContext({}),l=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(d.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,d=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,m=p["".concat(d,".").concat(f)]||p[f]||c[f]||i;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},93945:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(87462),o=(n(67294),n(3905));const i={sidebar_position:5},a="Working with streaming sound files",s={unversionedId:"development/rich-media-content/working-with-sound/working-with-streaming-sound-files",id:"development/rich-media-content/working-with-sound/working-with-streaming-sound-files",title:"Working with streaming sound files",description:"When a sound file or video file is playing back while its data is still being",source:"@site/docs/development/rich-media-content/working-with-sound/working-with-streaming-sound-files.md",sourceDirName:"development/rich-media-content/working-with-sound",slug:"/development/rich-media-content/working-with-sound/working-with-streaming-sound-files",permalink:"/docs/development/rich-media-content/working-with-sound/working-with-streaming-sound-files",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/rich-media-content/working-with-sound/working-with-streaming-sound-files.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"mainSidebar",previous:{title:"Working with embedded sounds",permalink:"/docs/development/rich-media-content/working-with-sound/working-with-embedded-sounds"},next:{title:"Working with dynamically generated audio",permalink:"/docs/development/rich-media-content/working-with-sound/working-with-dynamically-generated-audio"}},d={},l=[],u={toc:l},p="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"working-with-streaming-sound-files"},"Working with streaming sound files"),(0,o.kt)("p",null,"When a sound file or video file is playing back while its data is still being\nloaded, it is said to be ",(0,o.kt)("em",{parentName:"p"},"streaming"),". External sound files that are loaded from\na remote server are often streamed so that the user doesn't have to wait for all\nthe sound data to load before listening to the sound."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"SoundMixer.bufferTime")," property represents the number of milliseconds of\nsound data that Flash Player or AIR should gather before letting the sound play.\nIn other words, if the ",(0,o.kt)("inlineCode",{parentName:"p"},"bufferTime")," property is set to 5000, Flash Player or AIR\nloads at least 5000 milliseconds worth of data from the sound file before the\nsound begins to play. The default ",(0,o.kt)("inlineCode",{parentName:"p"},"SoundMixer.bufferTime")," value is 1000."),(0,o.kt)("p",null,"Your application can override the global ",(0,o.kt)("inlineCode",{parentName:"p"},"SoundMixer.bufferTime")," value for an\nindividual sound by explicitly specifying a new ",(0,o.kt)("inlineCode",{parentName:"p"},"bufferTime")," value when loading\nthe sound. To override the default buffer time, first create a new instance of\nthe SoundLoaderContext class, set its ",(0,o.kt)("inlineCode",{parentName:"p"},"bufferTime")," property, and then pass it as\na parameter to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Sound.load()")," method, as shown below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'import flash.media.Sound;\nimport flash.media.SoundLoaderContext;\nimport flash.net.URLRequest;\n\nvar s:Sound = new Sound();\nvar req:URLRequest = new URLRequest("bigSound.mp3");\nvar context:SoundLoaderContext = new SoundLoaderContext(8000, true);\ns.load(req, context);\ns.play();\n')),(0,o.kt)("p",null,"As playback continues, Flash Player and AIR try to keep the sound buffer at the\nsame size or greater. If the sound data loads faster than the playback speed,\nplayback will continue without interruption. However, if the data loading rate\nslows down because of network limitations, the playhead could reach the end of\nthe sound buffer. If this happens, playback is suspended, though it\nautomatically resumes once more sound data has been loaded."),(0,o.kt)("p",null,"To find out if playback is suspended because Flash Player or AIR is waiting for\ndata to load, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"Sound.isBuffering")," property."))}c.isMDXComponent=!0}}]);