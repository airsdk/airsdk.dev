---
sidebar_position: 5
---

# Displaying full-screen windows

Setting the `displayState` property of the Stage to
`StageDisplayState.FULL_SCREEN_INTERACTIVE` places the window in full-screen
mode, and keyboard input _is_ permitted in this mode. (In SWF content running in
a browser, keyboard input is not permitted). To exit full-screen mode, the user
presses the Escape key.

Note: Some Linux window managers will not change the window dimensions to fill
the screen if a maximum size is set for the window (but do remove the window
system chrome).

For example, the following Flex code defines a simple AIR application that sets
up a simple full-screen terminal:

```
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml"
	layout="vertical"
	applicationComplete="init()" backgroundColor="0x003030" focusRect="false">
	<mx:Script>
	<![CDATA[
		private function init():void
		{
			stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
			focusManager.setFocus(terminal);
			terminal.text = "Welcome to the dumb terminal app. Press the ESC key to exit..\n";
			terminal.selectionBeginIndex = terminal.text.length;
			terminal.selectionEndIndex = terminal.text.length;
		}
	]]>
	</mx:Script>
	<mx:TextArea
		id="terminal"
		height="100%" width="100%"
		scroll="false"
		backgroundColor="0x003030"
		color="0xCCFF00"
		fontFamily="Lucida Console"
		fontSize="44"/>
</mx:WindowedApplication>
```

The following ActionScript example for Flash simulates a simple full-screen text
terminal:

```
import flash.display.Sprite;
import flash.display.StageDisplayState;
import flash.text.TextField;
import flash.text.TextFormat;

public class FullScreenTerminalExample extends Sprite
{
	public function FullScreenTerminalExample():void
	{
		var terminal:TextField = new TextField();
		terminal.multiline = true;
		terminal.wordWrap = true;
		terminal.selectable = true;
		terminal.background = true;
		terminal.backgroundColor = 0x00333333;

		this.stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;

		addChild(terminal);
		terminal.width = 550;
		terminal.height = 400;

		terminal.text = "Welcome to the dumb terminal application. Press the ESC key to exit.\n_";

		var tf:TextFormat = new TextFormat();
		tf.font = "Courier New";
		tf.color = 0x00CCFF00;
		tf.size = 12;
		terminal.setTextFormat(tf);

		terminal.setSelection(terminal.text.length - 1, terminal.text.length);
	}
}
```
