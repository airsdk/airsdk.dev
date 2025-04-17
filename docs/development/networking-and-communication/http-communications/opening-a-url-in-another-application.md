---
sidebar_position: 3
---

# Opening a URL in another application

You can use the `navigateToURL()` function to open a URL in a web browser or
other application. For content running in AIR, the `navigateToURL()` function
opens the page in the default system web browser.

For the URLRequest object you pass as the `request` parameter of this function,
only the `url` property is used.

The first parameter of the `navigateToURL()` function, the `navigate` parameter,
is a URLRequest object (see
[Using the URLRequest class](./loading-external-data.md#using-the-urlrequest-class)).
The second is an optional `window` parameter, in which you can specify the
window name. For example, the following code opens the www.adobe.com web page:

```
var url:String = "http://www.adobe.com";
var urlReq:URLRequest = new URLRequest(url);
navigateToURL(urlReq);
```

Note: When using the `navigateToURL()` function, the runtime treats a URLRequest
object that uses the POST method (one that has its `method` property set to
`URLRequestMethod.POST`) as using the GET method.

When using the `navigateToURL()` function, URI schemes are permitted based on
the security sandbox of the code calling the `navigateToURL()` function.

Some APIs allow you to launch content in a web browser. For security reasons,
some URI schemes are prohibited when using these APIs in AIR. The list of
prohibited schemes depends on the security sandbox of the code using the API.
(For details on security sandboxes, see
[AIR security](../../security/air-security/index.md).)

#### Application sandbox (AIR only)

Any URI scheme can be used in URL launched by content running in the AIR
application sandbox. An application must be registered to handle the URI scheme
or the request does nothing. The following schemes are supported on many
computers and devices:

- `http:`

- `https:`

- `file:`

- `mailto:` — AIR directs these requests to the registered system mail
  application

- `sms:` — AIR directs `sms:` requests to the default text message app. The URL
  format must conform to the system conventions under which the app is running.
  For example, on Android, the URI scheme must be lowercase.

      navigateToURL( new URLRequest( "sms:+15555550101") );

- `tel:` — AIR directs `tel:` requests to the default telephone dialing app. The
  URL format must conform to the system conventions under which the app is
  running. For example, on Android, the URI scheme must be lowercase.

      navigateToURL( new URLRequest( "tel:5555555555") );

- `market:` — AIR directs `market:` requests to the Market app typically
  supported on Android devices.

      navigateToURL( new URLRequest( "market://search?q=Adobe Flash") );
      navigateToURL( new URLRequest( "market://search?q=pname:com.adobe.flashplayer") );

Where allowed by the operating system, applications can define and register
custom URI schemes. You can create a URL using the scheme to launch the
application from AIR.

#### Remote sandboxes

The following schemes are allowed. Use these schemes as you would use them in a
web browser.

- `http:`

- `https:`

- `mailto:` — AIR directs these requests to the registered system mail
  application

All other URI schemes are prohibited.

#### Local-with-file sandbox

The following schemes are allowed. Use these schemes as you would use them in a
web browser.

- `file:`

- `mailto:` — AIR directs these requests to the registered system mail
  application

All other URI schemes are prohibited.

#### Local-with-networking sandbox

The following schemes are allowed. Use these schemes as you would use them in a
web browser.

- `http:`

- `https:`

- `mailto:` — AIR directs these requests to the registered system mail
  application

All other URI schemes are prohibited.

#### Local-trusted sandbox

The following schemes are allowed. Use these schemes as you would use them in a
web browser.

- `file:`

- `http:`

- https:

- `mailto:` — AIR directs these requests to the registered system mail
  application

All other URI schemes are prohibited.
