"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[1565],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),p=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(l.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,y=d["".concat(l,".").concat(m)]||d[m]||h[m]||r;return n?i.createElement(y,o(o({ref:t},c),{},{components:n})):i.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},96845:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var i=n(87462),a=(n(67294),n(3905));const r={title:"Traversing the display list",sidebar_position:5},o=void 0,s={unversionedId:"development/display/display-programming/working-with-display-objects/traversing-the-display-list",id:"development/display/display-programming/working-with-display-objects/traversing-the-display-list",title:"Traversing the display list",description:"As you've seen, the display list is a tree structure. At the top of the tree is the Stage, which can contain multiple display objects. Those display objects that are themselves display object containers can contain other display objects, or display object containers.",source:"@site/docs/development/display/display-programming/working-with-display-objects/traversing-the-display-list.md",sourceDirName:"development/display/display-programming/working-with-display-objects",slug:"/development/display/display-programming/working-with-display-objects/traversing-the-display-list",permalink:"/docs/development/display/display-programming/working-with-display-objects/traversing-the-display-list",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/display/display-programming/working-with-display-objects/traversing-the-display-list.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Traversing the display list",sidebar_position:5},sidebar:"mainSidebar",previous:{title:"Working with display object containers",permalink:"/docs/development/display/display-programming/working-with-display-objects/working-with-display-object-containers"},next:{title:"Setting Stage properties",permalink:"/docs/development/display/display-programming/working-with-display-objects/setting-stage-properties"}},l={},p=[{value:"Adobe Flex",id:"adobe-flex",level:2}],c={toc:p},d="wrapper";function h(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,i.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"As you've seen, the display list is a tree structure. At the top of the tree is the Stage, which can contain multiple display objects. Those display objects that are themselves display object containers can contain other display objects, or display object containers."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(73194).Z,width:"438",height:"565"})),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"DisplayObjectContainer")," class includes properties and methods for traversing the display list, by means of the child lists of display object containers. For example, consider the following code, which adds two display objects, title and pict , to the container object (which is a ",(0,a.kt)("inlineCode",{parentName:"p"},"Sprite"),", and the ",(0,a.kt)("inlineCode",{parentName:"p"},"Sprite")," class extends the ",(0,a.kt)("inlineCode",{parentName:"p"},"DisplayObjectContainer")," class):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-actionscript"},'var container:Sprite = new Sprite();\nvar title:TextField = new TextField();\ntitle.text = "Hello";\nvar pict:Loader = new Loader();\nvar url:URLRequest = new URLRequest("banana.jpg");\npict.load(url);\npict.name = "banana loader";\ncontainer.addChild(title);\ncontainer.addChild(pict);\n')),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"getChildAt()")," method returns the child of the display list at a specific index position:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-actionscript"},"trace(container.getChildAt(0) is TextField); // true\n")),(0,a.kt)("p",null,'You can also access child objects by name. Each display object has a name property, and if you don\u2019t assign it, Flash Player or AIR assigns a default value, such as "instance1" . For example, the following code shows how to use the ',(0,a.kt)("inlineCode",{parentName:"p"},"getChildByName()")," method to access a child display object with the name ",(0,a.kt)("inlineCode",{parentName:"p"},'"banana loader"')," :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-actionscript"},'trace(container.getChildByName("banana loader") is Loader); // true\n')),(0,a.kt)("p",null,"Using the ",(0,a.kt)("inlineCode",{parentName:"p"},"getChildByName()")," method can result in slower performance than using the ",(0,a.kt)("inlineCode",{parentName:"p"},"getChildAt()")," method."),(0,a.kt)("p",null,"Since a display object container can contain other display object containers as child objects in its display list, you can traverse the full display list of the application as a tree. For example, in the code excerpt shown earlier, once the load operation for the pict Loader object is complete, the pict object will have one child display object, which is the bitmap, loaded. To access this bitmap display object, you can write ",(0,a.kt)("inlineCode",{parentName:"p"},"pict.getChildAt(0)")," . You can also write ",(0,a.kt)("inlineCode",{parentName:"p"},"container.getChildAt(0).getChildAt(0)")," (since ",(0,a.kt)("inlineCode",{parentName:"p"},"container.getChildAt(0) == pict")," )."),(0,a.kt)("p",null,"The following function provides an indented trace() output of the display list from a display object container:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-actionscript"},'function traceDisplayList(container:DisplayObjectContainer, indentString:String = ""):void\n{\n    var child:DisplayObject;\n    for (var i:uint=0; i < container.numChildren; i++)\n    {\n        child = container.getChildAt(i);\n        trace(indentString, child, child.name);\n        if (container.getChildAt(i) is DisplayObjectContainer)\n        {\n            traceDisplayList(DisplayObjectContainer(child), indentString + " ")\n        }\n    }\n}\n')),(0,a.kt)("h2",{id:"adobe-flex"},"Adobe Flex"),(0,a.kt)("p",null,"If you use Flex, you should know that Flex defines many component display object classes, and these classes override the display list access methods of the ",(0,a.kt)("inlineCode",{parentName:"p"},"DisplayObjectContainer")," class. For example, the Container class of the ",(0,a.kt)("inlineCode",{parentName:"p"},"mx.core")," package overrides the ",(0,a.kt)("inlineCode",{parentName:"p"},"addChild()")," method and other methods of the ",(0,a.kt)("inlineCode",{parentName:"p"},"DisplayObjectContainer")," class (which the Container class extends). In the case of the ",(0,a.kt)("inlineCode",{parentName:"p"},"addChild()")," method, the class overrides the method in such a way that you cannot add all types of display objects to a Container instance in Flex. The overridden method, in this case, requires that the child object that you are adding be a type of ",(0,a.kt)("inlineCode",{parentName:"p"},"mx.core.UIComponent")," object."))}h.isMDXComponent=!0},73194:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/dp_Display_List_Organization-a4e371e7d7055af7eaa3a494fb6bb20f.png"}}]);