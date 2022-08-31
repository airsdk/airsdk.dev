"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[1828],{4137:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var o=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,o,i=function(e,t){if(null==e)return{};var a,o,i={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=o.createContext({}),p=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var a=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(a),m=i,y=u["".concat(l,".").concat(m)]||u[m]||d[m]||n;return a?o.createElement(y,r(r({ref:t},c),{},{components:a})):o.createElement(y,r({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=a.length,r=new Array(n);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var p=2;p<n;p++)r[p]=a[p];return o.createElement.apply(null,r)}return o.createElement.apply(null,a)}u.displayName="MDXCreateElement"},5050:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>n,metadata:()=>s,toc:()=>p});var o=a(7462),i=(a(7294),a(4137));const n={title:"Choosing a DisplayObject subclass",sidebar_position:8},r=void 0,s={unversionedId:"development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass",id:"development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass",title:"Choosing a DisplayObject subclass",description:"With several options to choose from, one of the important decisions you\u2019ll make when you\u2019re working with display objects is which display object to use for what purpose. Here are some guidelines to help you decide. These same suggestions apply whether you need an instance of a class or you\u2019re choosing a base class for a class you\u2019re creating:",source:"@site/docs/development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass.md",sourceDirName:"development/display/display-programming/working-with-display-objects",slug:"/development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass",permalink:"/docs/development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/display/display-programming/working-with-display-objects/choosing-a-displayobject-subclass.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Choosing a DisplayObject subclass",sidebar_position:8},sidebar:"mainSidebar",previous:{title:"Handling events for display objects",permalink:"/docs/development/display/display-programming/working-with-display-objects/handling-events-for-display-objects"},next:{title:"Overview",permalink:"/docs/development/display/display-programming/manipulating-display-objects/"}},l={},p=[],c={toc:p};function d(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"With several options to choose from, one of the important decisions you\u2019ll make when you\u2019re working with display objects is which display object to use for what purpose. Here are some guidelines to help you decide. These same suggestions apply whether you need an instance of a class or you\u2019re choosing a base class for a class you\u2019re creating:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you don\u2019t need an object that can be a container for other display objects (that is, you just need one that serves as a stand-alone screen element), choose one of these DisplayObject or InteractiveObject subclasses, depending on what it will be used for:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Bitmap for displaying a bitmap image.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"TextField for adding text.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Video for displaying video.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Shape for a \u201ccanvas\u201d for drawing content on-screen. In particular, if you want to create an instance for drawing shapes on the screen, and it won\u2019t be a container for other display objects, you\u2019ll gain significant performance benefits using Shape instead of Sprite or MovieClip.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"MorphShape, StaticText, or SimpleButton for items created by the Flash authoring tool. (You can\u2019t create instances of these classes programmatically, but you can create variables with these data types to refer to items created using the Flash authoring tool.)")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you need a variable to refer to the main Stage, use the Stage class as its data type.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you need a container for loading an external SWF file or image file, use a Loader instance. The loaded content will be added to the display list as a child of the Loader instance. Its data type will depend on the nature of the loaded content, as follows:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"A loaded image will be a Bitmap instance."),(0,i.kt)("li",{parentName:"ul"},"A loaded SWF file written in ActionScript 3.0 will be a Sprite or MovieClip instance (or an instance of a subclass of those classes, as specified by the content creator)."),(0,i.kt)("li",{parentName:"ul"},"A loaded SWF file written in ActionScript 1.0 or ActionScript 2.0 will be an AVM1Movie instance."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you need an object to serve as a container for other display objects (whether or not you\u2019ll also be drawing onto the display object using ActionScript), choose one of the DisplayObjectContainer subclasses:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Sprite if the object will be created using only ActionScript, or as the base class for a custom display object that will be created and manipulated solely with ActionScript."),(0,i.kt)("li",{parentName:"ul"},"MovieClip if you\u2019re creating a variable to refer to a movie clip symbol created in the Flash authoring tool."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you are creating a class that will be associated with a movie clip symbol in the Flash library, choose one of these DisplayObjectContainer subclasses as your class\u2019s base class:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"MovieClip if the associated movie clip symbol has content on more than one frame"),(0,i.kt)("li",{parentName:"ul"},"Sprite if the associated movie clip symbol has content only on the first frame")))))}d.isMDXComponent=!0}}]);