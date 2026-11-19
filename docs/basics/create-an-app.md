---
title: Create an Application
sidebar_position: 5
---
this is an Hello World in ActionScript,each line explains what everything does so that you will a familiarity with the ActionScript Language.
```
package{ //tells where's the script locate which can later be use to import(for example:flash.display.Sprite)

    import flash.display.Sprite; //imports the Sprite class(nessecery)

    public class Main extends Sprite{
        public function say(sentence:String){ //A Comment
            trace(sentence); //print() function
        }
        public function Main(){ //the Main function,needs to have the same name as the class
            say("Hello World"); //print the variable
        }
    }
}
```
#### after you finish writing the code use mxmlc(which come with the AIR SDK) to compile it to a swf 

`mxmlc helloworld.as`
