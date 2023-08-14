# Setting the character encoding to use for HTML content

An HTML page can specify the character encoding it uses by including `meta` tag,
such as the following:

    meta http-equiv="content-type" content="text/html" charset="ISO-8859-1";

Override the page setting to ensure that a specific character encoding is used
by setting the `textEncodingOverride` property of the HTMLLoader object:

    var html:HTMLLoader = new HTMLLoader();
    html.textEncodingOverride = "ISO-8859-1";

Specify the character encoding for the HTMLLoader content to use when an HTML
page does not specify a setting with the `textEncodingFallback` property of the
HTMLLoader object:

    var html:HTMLLoader = new HTMLLoader();
    html.textEncodingFallback = "ISO-8859-1";

The `textEncodingOverride` property overrides the setting in the HTML page. And
the `textEncodingOverride` property and the setting in the HTML page override
the `textEncodingFallback` property.

Set the `textEncodingOverride` property or the `textEncodingFallback` property
before loading the HTML content.
