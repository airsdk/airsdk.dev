# Detecting player domain

The URL and domain of the web page on which a user is viewing media content is
not always readily available. If allowed by the hosting web site, you can use
the ExternalInterface class to get the exact URL. However, some web sites that
allow third-party video players do not allow the ExternalInterface to be used.
In such cases, you can get the domain of the current web page from the
`pageDomain` property of the Security class. The full URL is not divulged for
user security and privacy reasons.

The page domain is available from the static `pageDomain` property of the
Security class:

```
var domain:String = Security.pageDomain;
```
