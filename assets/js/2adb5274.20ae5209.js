"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[3310],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),h=c(n),g=i,u=h["".concat(l,".").concat(g)]||h[g]||p[g]||a;return n?o.createElement(u,s(s({ref:t},d),{},{components:n})):o.createElement(u,s({ref:t},d))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,s=new Array(a);s[0]=h;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:i,s[1]=r;for(var c=2;c<a;c++)s[c]=n[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2843:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var o=n(7462),i=(n(7294),n(4137));const a={title:"Changing position",sidebar_position:2},s=void 0,r={unversionedId:"development/display/display-programming/manipulating-display-objects/changing-position",id:"development/display/display-programming/manipulating-display-objects/changing-position",title:"Changing position",description:"The most basic manipulation to any display object is positioning it on the screen. To set a display object\u2019s position, change the object\u2019s x and y properties.",source:"@site/docs/development/display/display-programming/manipulating-display-objects/changing-position.md",sourceDirName:"development/display/display-programming/manipulating-display-objects",slug:"/development/display/display-programming/manipulating-display-objects/changing-position",permalink:"/docs/development/display/display-programming/manipulating-display-objects/changing-position",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/display/display-programming/manipulating-display-objects/changing-position.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Changing position",sidebar_position:2},sidebar:"mainSidebar",previous:{title:"Overview",permalink:"/docs/development/display/display-programming/manipulating-display-objects/"},next:{title:"Panning and scrolling display objects",permalink:"/docs/development/display/display-programming/manipulating-display-objects/panning-and-scrolling-display-objects"}},l={},c=[{value:"Changing position relative to the Stage",id:"changing-position-relative-to-the-stage",level:2},{value:"Moving display objects with the mouse",id:"moving-display-objects-with-the-mouse",level:2}],d={toc:c};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The most basic manipulation to any display object is positioning it on the screen. To set a display object\u2019s position, change the object\u2019s x and y properties."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"myShape.x = 17;\nmyShape.y = 212;\n")),(0,i.kt)("p",null,"The display object positioning system treats the Stage as a Cartesian coordinate system (the common grid system with a horizontal x axis and vertical y axis). The origin of the coordinate system (the 0,0 coordinate where the x and y axes meet) is at the top-left corner of the Stage. From there, x values are positive going right and negative going left, while (in contrast to typical graphing systems) y values are positive going down and negative going up. For example, the previous lines of code move the object myShape to the x coordinate 17 (17 pixels to the right of the origin) and y coordinate 212 (212 pixels below the origin)."),(0,i.kt)("p",null,"By default, when a display object is created using ActionScript, the ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"y")," properties are both set to 0, placing the object at the top-left corner of its parent content."),(0,i.kt)("h2",{id:"changing-position-relative-to-the-stage"},"Changing position relative to the Stage"),(0,i.kt)("p",null,"It's important to remember that the ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"y")," properties always refer to the position of the display object relative to the 0,0 coordinate of its parent display object\u2019s axes. So for a Shape instance (such as a circle) contained inside a Sprite instance, setting the Shape object\u2019s x and y properties to 0 will place the circle at the top-left corner of the Sprite, which is not necessarily the top-left corner of the Stage. To position an object relative to the global Stage coordinates, you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"globalToLocal()")," method of any display object to convert coordinates from global (Stage) coordinates to local (display object container) coordinates, like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"// Position the shape at the top-left corner of the Stage,\n// regardless of where its parent is located.\n\n// Create a Sprite, positioned at x:200 and y:200.\nvar mySprite:Sprite = new Sprite();\nmySprite.x = 200;\nmySprite.y = 200;\nthis.addChild(mySprite);\n\n// Draw a dot at the Sprite's 0,0 coordinate, for reference.\nmySprite.graphics.lineStyle(1, 0x000000);\nmySprite.graphics.beginFill(0x000000);\nmySprite.graphics.moveTo(0, 0);\nmySprite.graphics.lineTo(1, 0);\nmySprite.graphics.lineTo(1, 1);\nmySprite.graphics.lineTo(0, 1);\nmySprite.graphics.endFill();\n\n// Create the circle Shape instance.\nvar circle:Shape = new Shape();\nmySprite.addChild(circle);\n\n// Draw a circle with radius 50 and center point at x:50, y:50 in the Shape.\ncircle.graphics.lineStyle(1, 0x000000);\ncircle.graphics.beginFill(0xff0000);\ncircle.graphics.drawCircle(50, 50, 50);\ncircle.graphics.endFill();\n\n// Move the Shape so its top-left corner is at the Stage's 0, 0 coordinate.\nvar stagePoint:Point = new Point(0, 0);\nvar targetPoint:Point = mySprite.globalToLocal(stagePoint);\ncircle.x = targetPoint.x;\ncircle.y = targetPoint.y;\n")),(0,i.kt)("p",null,"You can likewise use the ",(0,i.kt)("inlineCode",{parentName:"p"},"DisplayObject")," class\u2019s ",(0,i.kt)("inlineCode",{parentName:"p"},"localToGlobal()")," method to convert local coordinates to Stage coordinates."),(0,i.kt)("h2",{id:"moving-display-objects-with-the-mouse"},"Moving display objects with the mouse"),(0,i.kt)("p",null,"You can let a user move display objects with mouse using two different techniques in ActionScript. In both cases, two mouse events are used: when the mouse button is pressed down, the object is told to follow the mouse cursor, and when it\u2019s released, the object is told to stop following the mouse cursor."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Flash Player 11.3 and higher, AIR 3.3 and higher: You can also use the MouseEvent.RELEASE_OUTSIDE event to cover the case of a user releasing the mouse button outside the bounds of the containing Sprite.")),(0,i.kt)("p",null,"The first technique, using the ",(0,i.kt)("inlineCode",{parentName:"p"},"startDrag()")," method, is simpler, but more limited. When the mouse button is pressed, the ",(0,i.kt)("inlineCode",{parentName:"p"},"startDrag()")," method of the display object to be dragged is called. When the mouse button is released, the ",(0,i.kt)("inlineCode",{parentName:"p"},"stopDrag()")," method is called. The Sprite class defines these two functions, so the object moved must be a Sprite or one of its subclasses."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"// This code creates a mouse drag interaction using the startDrag()\n// technique.\n// square is a MovieClip or Sprite instance).\n\nimport flash.events.MouseEvent;\n\n// This function is called when the mouse button is pressed.\nfunction startDragging(event:MouseEvent):void\n{\n    square.startDrag();\n}\n\n// This function is called when the mouse button is released.\nfunction stopDragging(event:MouseEvent):void\n{\n    square.stopDrag();\n}\n\nsquare.addEventListener(MouseEvent.MOUSE_DOWN, startDragging);\nsquare.addEventListener(MouseEvent.MOUSE_UP, stopDragging);\n")),(0,i.kt)("p",null,"This technique suffers from one fairly significant limitation: only one item at a time can be dragged using ",(0,i.kt)("inlineCode",{parentName:"p"},"startDrag()")," . If one display object is being dragged and the ",(0,i.kt)("inlineCode",{parentName:"p"},"startDrag()")," method is called on another display object, the first display object stops following the mouse immediately. For example, if the ",(0,i.kt)("inlineCode",{parentName:"p"},"startDragging()")," function is changed as shown here, only the circle object will be dragged, in spite of the ",(0,i.kt)("inlineCode",{parentName:"p"},"square.startDrag()")," method call:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"function startDragging(event:MouseEvent):void\n{\n    square.startDrag();\n    circle.startDrag();\n}\n")),(0,i.kt)("p",null,"As a consequence of the fact that only one object can be dragged at a time using ",(0,i.kt)("inlineCode",{parentName:"p"},"startDrag()")," , the ",(0,i.kt)("inlineCode",{parentName:"p"},"stopDrag()")," method can be called on any display object and it stops whatever object is currently being dragged."),(0,i.kt)("p",null,"If you need to drag more than one display object, or to avoid the possibility of conflicts where more than one object might potentially use startDrag() , it\u2019s best to use the mouse-following technique to create the dragging effect. With this technique, when the mouse button is pressed, a function is subscribed as a listener to the mouseMove event of the Stage. This function, which is then called every time the mouse moves, causes the dragged object to jump to the x, y coordinate of the mouse. Once the mouse button is released, the function is unsubscribed as a listener, meaning it is no longer called when the mouse moves and the object stops following the mouse cursor. Here is some code that demonstrates this technique:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"// This code moves display objects using the mouse-following\n// technique.\n// circle is a DisplayObject (e.g. a MovieClip or Sprite instance).\n\nimport flash.events.MouseEvent;\n\nvar offsetX:Number;\nvar offsetY:Number;\n\n// This function is called when the mouse button is pressed.\nfunction startDragging(event:MouseEvent):void\n{\n    // Record the difference (offset) between where\n    // the cursor was when the mouse button was pressed and the x, y\n    // coordinate of the circle when the mouse button was pressed.\n    offsetX = event.stageX - circle.x;\n    offsetY = event.stageY - circle.y;\n\n    // tell Flash Player to start listening for the mouseMove event\n    stage.addEventListener(MouseEvent.MOUSE_MOVE, dragCircle);\n}\n\n// This function is called when the mouse button is released.\nfunction stopDragging(event:MouseEvent):void\n{\n    // Tell Flash Player to stop listening for the mouseMove event.\n    stage.removeEventListener(MouseEvent.MOUSE_MOVE, dragCircle);\n}\n\n// This function is called every time the mouse moves,\n// as long as the mouse button is pressed down.\nfunction dragCircle(event:MouseEvent):void\n{\n    // Move the circle to the location of the cursor, maintaining\n    // the offset between the cursor's location and the\n    // location of the dragged object.\n    circle.x = event.stageX - offsetX;\n    circle.y = event.stageY - offsetY;\n\n    // Instruct Flash Player to refresh the screen after this event.\n    event.updateAfterEvent();\n}\n\ncircle.addEventListener(MouseEvent.MOUSE_DOWN, startDragging);\ncircle.addEventListener(MouseEvent.MOUSE_UP, stopDragging);\n")),(0,i.kt)("p",null,"In addition to making a display object follow the mouse cursor, it is often desirable to move the dragged object to the front of the display, so that it appears to be floating above all the other objects. For example, suppose you have two objects, a circle and a square, that can both be moved with the mouse. If the circle happens to be below the square on the display list, and you click and drag the circle so that the cursor is over the square, the circle will appear to slide behind the square, which breaks the drag-and-drop illusion. Instead, you can make it so that when the circle is clicked, it moves to the top of the display list, and thus always appears on top of any other content."),(0,i.kt)("p",null,"The following code (adapted from the previous example) allows two display objects, a circle and a square, to be moved with the mouse. Whenever the mouse button is pressed over either one, that item is moved to the top of the Stage\u2019s display list, so that the dragged item always appears on top. (Code that is new or changed from the previous listing appears in boldface.)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-actionscript"},"// This code creates a drag-and-drop interaction using the mouse-following\n// technique.\n// circle and square are DisplayObjects (e.g. MovieClip or Sprite\n// instances).\n\nimport flash.display.DisplayObject;\nimport flash.events.MouseEvent;\n\nvar offsetX:Number;\nvar offsetY:Number;\nvar draggedObject:DisplayObject;\n\n// This function is called when the mouse button is pressed.\nfunction startDragging(event:MouseEvent):void\n{\n    // remember which object is being dragged\n    draggedObject = DisplayObject(event.target);\n\n    // Record the difference (offset) between where the cursor was when\n    // the mouse button was pressed and the x, y coordinate of the\n    // dragged object when the mouse button was pressed.\n    offsetX = event.stageX - draggedObject.x;\n    offsetY = event.stageY - draggedObject.y;\n\n    // move the selected object to the top of the display list\n    stage.addChild(draggedObject);\n\n    // Tell Flash Player to start listening for the mouseMove event.\n    stage.addEventListener(MouseEvent.MOUSE_MOVE, dragObject);\n}\n\n// This function is called when the mouse button is released.\nfunction stopDragging(event:MouseEvent):void\n{\n    // Tell Flash Player to stop listening for the mouseMove event.\n    stage.removeEventListener(MouseEvent.MOUSE_MOVE, dragObject);\n}\n\n// This function is called every time the mouse moves,\n// as long as the mouse button is pressed down.\nfunction dragObject(event:MouseEvent):void\n{\n    // Move the dragged object to the location of the cursor, maintaining\n    // the offset between the cursor's location and the location\n    // of the dragged object.\n    draggedObject.x = event.stageX - offsetX;\n    draggedObject.y = event.stageY - offsetY;\n\n    // Instruct Flash Player to refresh the screen after this event.\n    event.updateAfterEvent();\n}\n\ncircle.addEventListener(MouseEvent.MOUSE_DOWN, startDragging);\ncircle.addEventListener(MouseEvent.MOUSE_UP, stopDragging);\n\nsquare.addEventListener(MouseEvent.MOUSE_DOWN, startDragging);\nsquare.addEventListener(MouseEvent.MOUSE_UP, stopDragging);\n")),(0,i.kt)("p",null,'To extend this effect further, such as for a game where tokens or cards are moved among piles, you could add the dragged object to the Stage\u2019s display list when it\u2019s "picked up," and then add it to another display list\u2014such as the "pile" where it is dropped\u2014when the mouse button is released.'),(0,i.kt)("p",null,"Finally, to enhance the effect, you could apply a drop shadow filter to the display object when it is clicked (when you start dragging it) and remove the drop shadow when the object is released. For details on using the drop shadow filter and other display object filters in ActionScript, see ",(0,i.kt)("a",{parentName:"p",href:"/docs/development/display/filtering-display-objects/"},"Filtering display objects")," ."))}p.isMDXComponent=!0}}]);