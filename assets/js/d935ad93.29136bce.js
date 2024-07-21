"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[96467],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=d(n),m=r,f=h["".concat(l,".").concat(m)]||h[m]||c[m]||i;return n?a.createElement(f,o(o({ref:t},p),{},{components:n})):a.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:r,o[1]=s;for(var d=2;d<i;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},96072:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var a=n(87462),r=(n(67294),n(3905));const i={},o="Using a shader as a filter",s={unversionedId:"development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter",id:"development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter",title:"Using a shader as a filter",description:"Using a shader as a filter is like using any of the other filters in",source:"@site/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter.md",sourceDirName:"development/display/working-with-pixel-bender-shaders",slug:"/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter",permalink:"/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-filter.md",tags:[],version:"current",frontMatter:{},sidebar:"mainSidebar",previous:{title:"Using a shader as a drawing fill",permalink:"/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-drawing-fill"},next:{title:"Using a shader in stand-alone mode",permalink:"/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-in-stand-alone-mode"}},l={},d=[],p={toc:d},h="wrapper";function c(e){let{components:t,...i}=e;return(0,r.kt)(h,(0,a.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"using-a-shader-as-a-filter"},"Using a shader as a filter"),(0,r.kt)("p",null,"Using a shader as a filter is like using any of the other filters in\nActionScript. When you use a shader as a filter, the filtered image (a display\nobject or BitmapData object) is passed to the shader. The shader uses the input\nimage to create the filter output, which is usually a modified version of the\noriginal image. If the filtered object is a display object the shader's output\nis displayed on the screen in place of the filtered display object. If the\nfiltered object is a BitmapData object, the shader's output becomes the content\nof the BitmapData object whose ",(0,r.kt)("inlineCode",{parentName:"p"},"applyFilter()")," method is called."),(0,r.kt)("p",null,"To use a shader as a filter, you first create the Shader object as described in\n",(0,r.kt)("a",{parentName:"p",href:"/docs/development/display/working-with-pixel-bender-shaders/loading-or-embedding-a-shader"},"Loading or embedding a shader"),". Next you\ncreate a ShaderFilter object linked to the Shader object. The ShaderFilter\nobject is the filter that is applied to the filtered object. You apply it to an\nobject in the same way that you apply any filter. You pass it to the ",(0,r.kt)("inlineCode",{parentName:"p"},"filters"),"\nproperty of a display object or you call the ",(0,r.kt)("inlineCode",{parentName:"p"},"applyFilter()")," method on a\nBitmapData object. For example, the following code creates a ShaderFilter object\nand applies the filter to a display object named ",(0,r.kt)("inlineCode",{parentName:"p"},"homeButton"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"var myFilter:ShaderFilter = new ShaderFilter(myShader);\nhomeButton.filters = [myFilter];\n")),(0,r.kt)("p",null,"When you use a shader as a filter, the shader must be defined with at least one\ninput. As the example shows, you do not set the input value in your code.\nInstead, the filtered display object or BitmapData object is set as the input\nimage. If you use a shader that expects more than one input, you provide a value\nfor any input beyond the first one."),(0,r.kt)("p",null,"In some cases, a filter changes the dimensions of the original image. For\nexample, a typical drop shadow effect adds extra pixels containing the shadow\nthat's added to the image. When you use a shader that changes the image\ndimensions, set the ",(0,r.kt)("inlineCode",{parentName:"p"},"leftExtension"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"rightExtension"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"topExtension"),", and\n",(0,r.kt)("inlineCode",{parentName:"p"},"bottomExtension")," properties to indicate by how much you want the image size to\nchange."),(0,r.kt)("p",null,'The following example demonstrates using a shader as a filter. The filter in\nthis example inverts the red, green, and blue channel values of an image. The\nresult is the "negative" version of the image.'),(0,r.kt)("p",null,"Note: The shader that this example uses is the invertRGB.pbk Pixel Bender kernel\nthat is included with the Pixel Bender Toolkit. You can load the source code for\nthe kernel from the Pixel Bender Toolkit installation directory. Compile the\nsource code and save the bytecode file in the same directory as the source code."),(0,r.kt)("p",null,"The important ActionScript code is in these two methods:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"init()"),": The ",(0,r.kt)("inlineCode",{parentName:"p"},"init()")," method is called when the application loads. In this\nmethod the code loads the shader bytecode file.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"onLoadComplete()"),": In the ",(0,r.kt)("inlineCode",{parentName:"p"},"onLoadComplete()")," method the code creates the\nShader object named ",(0,r.kt)("inlineCode",{parentName:"p"},"shader"),". It then creates and draws the contents of an\nobject named ",(0,r.kt)("inlineCode",{parentName:"p"},"target"),". The ",(0,r.kt)("inlineCode",{parentName:"p"},"target")," object is a rectangle filled with a linear\ngradient color that is red on the left, yellow-green in the middle, and light\nblue on the right. The unfiltered object looks like this:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:n(61532).Z,width:"300",height:"200"})),(0,r.kt)("p",{parentName:"li"},"With the filter applied the colors are inverted, making the rectangle look\nlike this:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:n(70127).Z,width:"300",height:"200"})))),(0,r.kt)("p",null,'The shader that this example uses is the "invertRGB.pbk" sample Pixel Bender\nkernel that is included with the Pixel Bender Toolkit. The source code is\navailable in the file "invertRGB.pbk" in the Pixel Bender Toolkit installation\ndirectory. Compile the source code and save the bytecode file with the name\n"invertRGB.pbj" in the same directory as your ActionScript source code.'),(0,r.kt)("p",null,"The following is the ActionScript code for this example. Use this class as the\nmain application class for an ActionScript-only project in Flash Builder, or as\nthe document class for the FLA file in Flash Professional:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'package\n{\n    import flash.display.GradientType;\n    import flash.display.Graphics;\n    import flash.display.Shader;\n    import flash.display.Shape;\n    import flash.display.Sprite;\n    import flash.filters.ShaderFilter;\n    import flash.events.Event;\n    import flash.geom.Matrix;\n    import flash.net.URLLoader;\n    import flash.net.URLLoaderDataFormat;\n    import flash.net.URLRequest;\n\n    public class InvertRGB extends Sprite\n    {\n        private var shader:Shader;\n        private var loader:URLLoader;\n\n        public function InvertRGB()\n        {\n            init();\n        }\n\n        private function init():void\n        {\n            loader = new URLLoader();\n            loader.dataFormat = URLLoaderDataFormat.BINARY;\n            loader.addEventListener(Event.COMPLETE, onLoadComplete);\n            loader.load(new URLRequest("invertRGB.pbj"));\n        }\n\n\n        private function onLoadComplete(event:Event):void\n        {\n            shader = new Shader(loader.data);\n\n            var target:Shape = new Shape();\n            addChild(target);\n\n            var g:Graphics = target.graphics;\n            var c:Array = [0x990000, 0x445500, 0x007799];\n            var a:Array = [255, 255, 255];\n            var r:Array = [0, 127, 255];\n            var m:Matrix = new Matrix();\n            m.createGradientBox(w, h);\n            g.beginGradientFill(GradientType.LINEAR, c, a, r, m);\n            g.drawRect(10, 10, w, h);\n            g.endFill();\n\n            var invertFilter:ShaderFilter = new ShaderFilter(shader);\n            target.filters = [invertFilter];\n        }\n    }\n}\n')),(0,r.kt)("p",null,"For more information on applying filters, see\n",(0,r.kt)("a",{parentName:"p",href:"/docs/development/display/filtering-display-objects/creating-and-applying-filters"},"Creating and applying filters"),"."))}c.isMDXComponent=!0},70127:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/sb_filter_after-a89cc4699b6ef0ae1c4641ae963f1dee.png"},61532:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/sb_filter_before-5bac3812d2e339466b4b28956b4fb644.png"}}]);