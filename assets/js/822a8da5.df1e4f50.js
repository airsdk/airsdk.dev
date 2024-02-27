"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[79695],{3905:(e,n,a)=>{a.d(n,{Zo:()=>p,kt:()=>c});var t=a(67294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function d(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),s=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},p=function(e){var n=s(e.components);return t.createElement(l.Provider,{value:n},e.children)},h="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),h=s(a),u=r,c=h["".concat(l,".").concat(u)]||h[u]||m[u]||o;return a?t.createElement(c,i(i({ref:n},p),{},{components:a})):t.createElement(c,i({ref:n},p))}));function c(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=u;var d={};for(var l in n)hasOwnProperty.call(n,l)&&(d[l]=n[l]);d.originalType=e,d[h]="string"==typeof e?e:r,i[1]=d;for(var s=2;s<o;s++)i[s]=a[s];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},79985:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>d,toc:()=>s});var t=a(87462),r=(a(67294),a(3905));const o={},i="Using a shader as a blend mode",d={unversionedId:"development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode",id:"development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode",title:"Using a shader as a blend mode",description:"Using a shader as a blend mode is like using other blend modes. The shader",source:"@site/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode.md",sourceDirName:"development/display/working-with-pixel-bender-shaders",slug:"/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode",permalink:"/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-blend-mode.md",tags:[],version:"current",frontMatter:{},sidebar:"mainSidebar",previous:{title:"Specifying shader input and parameter values",permalink:"/docs/development/display/working-with-pixel-bender-shaders/specifying-shader-input-and-parameter-values"},next:{title:"Using a shader as a drawing fill",permalink:"/docs/development/display/working-with-pixel-bender-shaders/using-a-shader-as-a-drawing-fill"}},l={},s=[],p={toc:s},h="wrapper";function m(e){let{components:n,...o}=e;return(0,r.kt)(h,(0,t.Z)({},p,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"using-a-shader-as-a-blend-mode"},"Using a shader as a blend mode"),(0,r.kt)("p",null,"Using a shader as a blend mode is like using other blend modes. The shader\ndefines the appearance resulting from two display objects being blended together\nvisually. To use a shader as a blend mode, assign your Shader object to the\n",(0,r.kt)("inlineCode",{parentName:"p"},"blendShader")," property of the foreground display object. Assigning a value other\nthan ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," to the ",(0,r.kt)("inlineCode",{parentName:"p"},"blendShader")," property automatically sets the display\nobject's ",(0,r.kt)("inlineCode",{parentName:"p"},"blendMode")," property to ",(0,r.kt)("inlineCode",{parentName:"p"},"BlendMode.SHADER"),". The following listing\ndemonstrates using a shader as a blend mode. Note that this example assumes that\nthere is a display object named ",(0,r.kt)("inlineCode",{parentName:"p"},"foreground")," contained in the same parent on the\ndisplay list as other display content, with ",(0,r.kt)("inlineCode",{parentName:"p"},"foreground")," overlapping the other\ncontent:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"foreground.blendShader = myShader;\n")),(0,r.kt)("p",null,"When you use a shader as a blend mode, the shader must be defined with at least\ntwo inputs. As the example shows, you do not set the input values in your code.\nInstead, the two blended images are automatically used as shader inputs. The\nforeground image is set as the second image. (This is the display object to\nwhich the blend mode is applied.) A background image is created by taking the\ncomposite of all the pixels behind the foreground image's bounding box. This\nbackground image is set as the first input image. If you use a shader that\nexpects more than two inputs, you provide a value for any input beyond the first\ntwo."),(0,r.kt)("p",null,"The following example demonstrates using a shader as a blend mode. This example\nuses a lighten blend mode based on luminosity. The result of the blend is that\nthe lightest pixel value from either of the blended objects becomes the pixel\nthat's displayed."),(0,r.kt)("p",null,"Note: The code for this example was written by Mario Klingemann. Thank you Mario\nfor sharing this example. You can see more of Mario's work and read his writing\nat ",(0,r.kt)("a",{parentName:"p",href:"http://www.quasimondo.com/"},"www.quasimondo.com/"),"."),(0,r.kt)("p",null,"The important ActionScript code is in these two methods:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"init()"),": The ",(0,r.kt)("inlineCode",{parentName:"p"},"init()")," method is called when the application loads. In this\nmethod the code loads the shader bytecode file.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"onLoadComplete()"),": In the ",(0,r.kt)("inlineCode",{parentName:"p"},"onLoadComplete()")," method the code creates the\nShader object named ",(0,r.kt)("inlineCode",{parentName:"p"},"shader"),". It then draws three objects. The first,\n",(0,r.kt)("inlineCode",{parentName:"p"},"backdrop"),", is a dark gray background behind the blended objects. The second,\n",(0,r.kt)("inlineCode",{parentName:"p"},"backgroundShape"),", is a green gradient ellipse. The third object,\n",(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape"),", is an orange gradient ellipse."),(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape")," ellipse is the foreground object of the blend. The\nbackground image of the blend is formed by the part of ",(0,r.kt)("inlineCode",{parentName:"p"},"backdrop")," and the part\nof ",(0,r.kt)("inlineCode",{parentName:"p"},"backgroundShape")," that are overlapped by the ",(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape")," object's\nbounding box. The ",(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape")," object is the front-most object in the\ndisplay list. It partially overlaps ",(0,r.kt)("inlineCode",{parentName:"p"},"backgroundShape")," and completely overlaps\n",(0,r.kt)("inlineCode",{parentName:"p"},"backdrop"),". Because of this overlap, without a blend mode applied, the orange\nellipse (",(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape"),") shows completely and part of the green ellipse\n(",(0,r.kt)("inlineCode",{parentName:"p"},"backgroundShape"),") is hidden by it:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:a(24485).Z,width:"400",height:"200"})),(0,r.kt)("p",{parentName:"li"},'However, with the blend mode applied, the brighter part of the green ellipse\n"shows through" because it is lighter than the portion of ',(0,r.kt)("inlineCode",{parentName:"p"},"foregroundShape"),"\nthat overlaps it:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:a(27641).Z,width:"400",height:"200"})))),(0,r.kt)("p",null,"The following is the ActionScript code for this example. Use this class as the\nmain application class for an ActionScript-only project in Flash Builder, or as\nthe document class for the FLA file in Flash Professional:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'package\n{\n    import flash.display.BlendMode;\n    import flash.display.GradientType;\n    import flash.display.Graphics;\n    import flash.display.Shader;\n    import flash.display.Shape;\n    import flash.display.Sprite;\n    import flash.events.Event;\n    import flash.geom.Matrix;\n    import flash.net.URLLoader;\n    import flash.net.URLLoaderDataFormat;\n    import flash.net.URLRequest;\n\n    public class LumaLighten extends Sprite\n    {\n        private var shader:Shader;\n        private var loader:URLLoader;\n\n        public function LumaLighten()\n        {\n            init();\n        }\n\n        private function init():void\n        {\n            loader = new URLLoader();\n            loader.dataFormat = URLLoaderDataFormat.BINARY;\n            loader.addEventListener(Event.COMPLETE, onLoadComplete);\n            loader.load(new URLRequest("LumaLighten.pbj"));\n        }\n\n\n        private function onLoadComplete(event:Event):void\n        {\n            shader = new Shader(loader.data);\n\n            var backdrop:Shape = new Shape();\n            var g0:Graphics = backdrop.graphics;\n            g0.beginFill(0x303030);\n            g0.drawRect(0, 0, 400, 200);\n            g0.endFill();\n            addChild(backdrop);\n\n            var backgroundShape:Shape = new Shape();\n            var g1:Graphics = backgroundShape.graphics;\n            var c1:Array = [0x336600, 0x80ff00];\n            var a1:Array = [255, 255];\n            var r1:Array = [100, 255];\n            var m1:Matrix = new Matrix();\n            m1.createGradientBox(300, 200);\n            g1.beginGradientFill(GradientType.LINEAR, c1, a1, r1, m1);\n            g1.drawEllipse(0, 0, 300, 200);\n            g1.endFill();\n            addChild(backgroundShape);\n\n            var foregroundShape:Shape = new Shape();\n            var g2:Graphics = foregroundShape.graphics;\n            var c2:Array = [0xff8000, 0x663300];\n            var a2:Array = [255, 255];\n            var r2:Array = [100, 255];\n            var m2:Matrix = new Matrix();\n            m2.createGradientBox(300, 200);\n            g2.beginGradientFill(GradientType.LINEAR, c2, a2, r2, m2);\n            g2.drawEllipse(100, 0, 300, 200);\n            g2.endFill();\n            addChild(foregroundShape);\n\n            foregroundShape.blendShader = shader;\n            foregroundShape.blendMode = BlendMode.SHADER;\n        }\n    }\n}\n')),(0,r.kt)("p",null,'The following is the source code for the LumaLighten shader kernel, used to\ncreate the "LumaLighten.pbj" Pixel Bender bytecode file:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'<languageVersion : 1.0;>\nkernel LumaLighten\n<\nnamespace : "com.quasimondo.blendModes";\nvendor : "Quasimondo.com";\nversion : 1;\ndescription : "Luminance based lighten blend mode";\n>\n{\n    input image4 background;\n    input image4 foreground;\n\n    output pixel4 dst;\n\n    const float3 LUMA = float3(0.212671, 0.715160, 0.072169);\n\n    void evaluatePixel()\n    {\n        float4 a = sampleNearest(foreground, outCoord());\n        float4 b = sampleNearest(background, outCoord());\n        float luma_a = a.r * LUMA.r + a.g * LUMA.g + a.b * LUMA.b;\n        float luma_b = b.r * LUMA.r + b.g * LUMA.g + b.b * LUMA.b;\n\n        dst = luma_a > luma_b ? a : b;\n    }\n}\n')),(0,r.kt)("p",null,"For more information on using blend modes, see\n",(0,r.kt)("a",{parentName:"p",href:"/docs/development/display/display-programming/manipulating-display-objects/applying-blending-modes"},"Applying blending modes"),"."),(0,r.kt)("p",null,"Note: When a Pixel Bender shader program is run as a blend in Flash Player or\nAIR, the sampling and ",(0,r.kt)("inlineCode",{parentName:"p"},"outCoord()")," functions behave differently than in other\ncontexts.In a blend, a sampling function will always return the current pixel\nbeing evaluated by the shader. You cannot, for example, use add an offset to\n",(0,r.kt)("inlineCode",{parentName:"p"},"outCoord()")," in order to sample a neighboring pixel. Likewise, if you use the\n",(0,r.kt)("inlineCode",{parentName:"p"},"outCoord()")," function outside a sampling function, its coordinates always\nevaluate to 0. You cannot, for example, use the position of a pixel to influence\nhow the blended images are combined."))}m.isMDXComponent=!0},27641:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/sb_blend_mode_after-5cf30b397710b3b3a0332f3936051a2a.png"},24485:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/sb_blend_mode_before-1fef88a3e91a13876f0e04f59f397236.png"}}]);