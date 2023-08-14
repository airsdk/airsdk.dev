# Accessing the HTML history list

As new pages are loaded in an HTMLLoader object, the runtime maintains a history
list for the object. The history list corresponds to the `window.history` object
in the HTML page. The HTMLLoader class includes the following properties and
methods that let you work with the HTML history list:

| Class member       | Description                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `historyLength`    | The overall length of the history list, including back and forward entries.                                                                                                                                                      |
| `historyPosition`  | The current position in the history list. History items before this position represent "back" navigation, and items after this position represent "forward" navigation.                                                          |
| `getHistoryAt()`   | Returns the URLRequest object corresponding to the history entry at the specified position in the history list.                                                                                                                  |
| `historyBack()`    | Navigates back in the history list, if possible.                                                                                                                                                                                 |
| `historyForward()` | Navigates forward in the history list, if possible.                                                                                                                                                                              |
| `historyGo()`      | Navigates the indicated number of steps in the browser history. Navigates forward if positive, backward if negative. Navigating to zero reloads the page. Specifying a position beyond the end navigates to the end of the list. |

Items in the history list are stored as objects of type
[HTMLHistoryItem](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/html/HTMLHistoryItem.html).
The HTMLHistoryItem class has the following properties:

| Property      | Description                                              |
| ------------- | -------------------------------------------------------- |
| `isPost`      | Set to `true` if the HTML page includes POST data.       |
| `originalUrl` | The original URL of the HTML page, before any redirects. |
| `title`       | The title of the HTML page.                              |
| `url`         | The URL of the HTML page.                                |
