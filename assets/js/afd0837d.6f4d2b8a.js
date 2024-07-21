"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[56064],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(a),y=r,h=d["".concat(l,".").concat(y)]||d[y]||m[y]||i;return a?n.createElement(h,s(s({ref:t},p),{},{components:a})):n.createElement(h,s({ref:t},p))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,s=new Array(i);s[0]=y;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[d]="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=a[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}y.displayName="MDXCreateElement"},80827:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var n=a(87462),r=(a(67294),a(3905));const i={sidebar_position:1},s="Basics of arrays",o={unversionedId:"development/core-actionscript-classes/working-with-arrays/basics-of-arrays",id:"development/core-actionscript-classes/working-with-arrays/basics-of-arrays",title:"Basics of arrays",description:"Often in programming you'll need to work with a set of items rather than a",source:"@site/docs/development/core-actionscript-classes/working-with-arrays/basics-of-arrays.md",sourceDirName:"development/core-actionscript-classes/working-with-arrays",slug:"/development/core-actionscript-classes/working-with-arrays/basics-of-arrays",permalink:"/docs/development/core-actionscript-classes/working-with-arrays/basics-of-arrays",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/core-actionscript-classes/working-with-arrays/basics-of-arrays.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"mainSidebar",previous:{title:"Working with arrays",permalink:"/docs/development/core-actionscript-classes/working-with-arrays/"},next:{title:"Indexed arrays",permalink:"/docs/development/core-actionscript-classes/working-with-arrays/indexed-arrays"}},l={},c=[{value:"Important concepts and terms",id:"important-concepts-and-terms",level:4}],p={toc:c},d="wrapper";function m(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"basics-of-arrays"},"Basics of arrays"),(0,r.kt)("p",null,"Often in programming you'll need to work with a set of items rather than a\nsingle object. For example, in a music player application, you might want to\nhave a list of songs waiting to be played. You wouldn't want to have to create a\nseparate variable for each song on that list. It would be preferable to have all\nthe Song objects together in a bundle, and be able to work with them as a group."),(0,r.kt)("p",null,"An array is a programming element that acts as a container for a set of items,\nsuch as a list of songs. Most commonly all the items in an array are instances\nof the same class, but that is not a requirement in ActionScript. The individual\nitems in an array are known as the array's ",(0,r.kt)("em",{parentName:"p"},"elements"),". You can think of an array\nas a file drawer for variables. Variables can be added as elements in the array,\nwhich is like placing a folder into the file drawer. You can work with the array\nas a single variable (like carrying the whole drawer to a different location).\nYou can work with the variables as a group (like flipping through the folders\none by one searching for a piece of information). You can also access them\nindividually (like opening the drawer and selecting a single folder)."),(0,r.kt)("p",null,"For example, imagine you're creating a music player application where a user can\nselect multiple songs and add them to a playlist. In your ActionScript code, you\nhave a method named ",(0,r.kt)("inlineCode",{parentName:"p"},"addSongsToPlaylist()"),", which accepts a single array as a\nparameter. No matter how many songs you want to add to the list (a few, a lot,\nor even only one), you call the ",(0,r.kt)("inlineCode",{parentName:"p"},"addSongsToPlaylist()")," method only one time,\npassing it the array containing the Song objects. Inside the\n",(0,r.kt)("inlineCode",{parentName:"p"},"addSongsToPlaylist()")," method, you can use a loop to go through the array's\nelements (the songs) one by one and actually add them to the playlist."),(0,r.kt)("p",null,"The most common type of ActionScript array is an ",(0,r.kt)("em",{parentName:"p"},"indexed array"),". In an indexed\narray each item is stored in a numbered slot (known as an ",(0,r.kt)("em",{parentName:"p"},"index"),"). Items are\naccessed using the number, like an address. Indexed arrays work well for most\nprogramming needs. The Array class is one common class that's used to represent\nan indexed array."),(0,r.kt)("p",null,"Often, an indexed array is used to store multiple items of the same type\n(objects that are instances of the same class). The Array class doesn't have any\nmeans for restricting the type of items it contains. The Vector class is a type\nof indexed array in which all the items in a single array are the same type.\nUsing a Vector instance instead of an Array instance can also provide\nperformance improvements and other benefits. The Vector class is available\nstarting with Flash Player 10 and Adobe AIR 1.5."),(0,r.kt)("p",null,"A special use of an indexed array is a ",(0,r.kt)("em",{parentName:"p"},"multidimensional array"),". A\nmultidimensional array is an indexed array whose elements are indexed arrays\n(which in turn contain other elements)."),(0,r.kt)("p",null,"Another type of array is an ",(0,r.kt)("em",{parentName:"p"},"associative array"),", which uses a string ",(0,r.kt)("em",{parentName:"p"},"key"),"\ninstead of a numeric index to identify individual elements. Finally,\nActionScript 3.0 also includes the Dictionary class, which represents a\n",(0,r.kt)("em",{parentName:"p"},"dictionary"),". A dictionary is an array that allows you to use any type of object\nas a key to distinguish between elements."),(0,r.kt)("h4",{id:"important-concepts-and-terms"},"Important concepts and terms"),(0,r.kt)("p",null,"The following reference list contains important terms that you will encounter\nwhen programming array and vector handling routines:"),(0,r.kt)("p",null,"Array",(0,r.kt)("br",{parentName:"p"}),"\n","An object that serves as a container to group multiple objects."),(0,r.kt)("p",null,"Array access (","[","]",") operator",(0,r.kt)("br",{parentName:"p"}),"\n","A pair of square brackets surrounding an index or key that uniquely identifies\nan array element. This syntax is used after an array variable name to specify a\nsingle element of the array rather than the entire array."),(0,r.kt)("p",null,"Associative array",(0,r.kt)("br",{parentName:"p"}),"\n","An array that uses string keys to identify individual elements."),(0,r.kt)("p",null,"Base type",(0,r.kt)("br",{parentName:"p"}),"\n","The data type of the objects that a Vector instance is allowed to store."),(0,r.kt)("p",null,"Dictionary",(0,r.kt)("br",{parentName:"p"}),"\n","An array whose items consist of pairs of objects, known as the key and the\nvalue. The key is used instead of a numeric index to identify a single element."),(0,r.kt)("p",null,"Element",(0,r.kt)("br",{parentName:"p"}),"\n","A single item in an array."),(0,r.kt)("p",null,"Index",(0,r.kt)("br",{parentName:"p"}),"\n",'The numeric "address" used to identify a single element in an indexed array.'),(0,r.kt)("p",null,"Indexed array",(0,r.kt)("br",{parentName:"p"}),"\n","The standard type of array that stores each element in a numbered position, and\nuses the number (index) to identify individual elements."),(0,r.kt)("p",null,"Key",(0,r.kt)("br",{parentName:"p"}),"\n","The string or object used to identify a single element in an associative array\nor a dictionary."),(0,r.kt)("p",null,"Multidimensional array",(0,r.kt)("br",{parentName:"p"}),"\n","An array containing items that are arrays rather than single values."),(0,r.kt)("p",null,"T",(0,r.kt)("br",{parentName:"p"}),"\n",'The standard convention that\'s used in this documentation to represent the base\ntype of a Vector instance, whatever that base type happens to be. The T\nconvention is used to represent a class name, as shown in the Type parameter\ndescription. ("T" stands for "type," as in "data type.").'),(0,r.kt)("p",null,"Type parameter",(0,r.kt)("br",{parentName:"p"}),"\n","The syntax that's used with the Vector class name to specify the Vector's base\ntype (the data type of the objects that it stores). The syntax consists of a\nperiod (",(0,r.kt)("inlineCode",{parentName:"p"},"."),"), then the data type name surrounded by angle brackets (",(0,r.kt)("inlineCode",{parentName:"p"},"<>"),"). Put\ntogether, it looks like this: ",(0,r.kt)("inlineCode",{parentName:"p"},"Vector.<T>"),". In this documentation, the class\nspecified in the type parameter is represented generically as ",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"."),(0,r.kt)("p",null,"Vector",(0,r.kt)("br",{parentName:"p"}),"\n","A type of array whose elements are all instances of the same data type."))}m.isMDXComponent=!0}}]);