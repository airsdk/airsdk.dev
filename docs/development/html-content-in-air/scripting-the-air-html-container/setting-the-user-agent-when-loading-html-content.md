# Setting the user agent used when loading HTML content

The HTMLLoader class has a `userAgent` property, which lets you set the user
agent string used by the HTMLLoader. Set the `userAgent` property of the
HTMLLoader object before calling the `load()` method. If you set this property
on the HTMLLoader instance, then the `userAgent` property of the URLRequest
passed to the `load()` method is _not_ used.

You can set the default user agent string used by all HTMLLoader objects in an
application domain by setting the `URLRequestDefaults.userAgent` property. The
static
[URLRequestDefaults](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/URLRequestDefaults.html)
properties apply as defaults for all
[URLRequest](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/URLRequest.html)
objects, not only URLRequests used with the `load()` method of HTMLLoader
objects. Setting the `userAgent` property of an HTMLLoader overrides the default
`URLRequestDefaults.userAgent` setting.

If you do not set a user agent value for either the `userAgent` property of the
HTMLLoader object or for `URLRequestDefaults.userAgent`, then the default AIR
user agent value is used. This default value varies depending on the runtime
operating system (such as Mac OS or Windows), the runtime language, and the
runtime version, as in the following two examples:

- `"Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) AdobeAIR/1.0"`

- `"Mozilla/5.0 (Windows; U; en) AppleWebKit/420+ (KHTML, like Gecko) AdobeAIR/1.0"`
