# About URLs in AIR

In HTML content running in AIR, you can use any of the following URL schemes in
defining `src` attributes for `img`, `frame`, `iframe`, and `script` tags, in
the `href` attribute of a `link` tag, or anywhere else you can provide a URL.

<table>
<thead>
    <tr>
        <th><p>URL scheme</p></th>
        <th><p>Description</p></th>
        <th><p>Example</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>file</p></td>
        <td><p>A path relative to the root of the file system.</p></td>
        <td><div>
        <pre><code>file:///c:/AIR Test/test.txt</code></pre>
        </div></td>
    </tr>
    <tr>
        <td><p>app</p></td>
        <td><p>A path relative to the root directory of the installed
        application.</p></td>
        <td><div>
        <pre><code>app:/images</code></pre>
        </div></td>
    </tr>
    <tr>
        <td><p>app-storage</p></td>
        <td><p>A path relative to the application store directory. For each
        installed application, AIR defines a unique application store directory,
        which is a useful place to store data specific to that
        application.</p></td>
        <td><div>
        <pre><code>app-storage:/settings/prefs.xml</code></pre>
        </div></td>
    </tr>
    <tr>
        <td><p>http</p></td>
        <td><p>A standard HTTP request.</p></td>
        <td><div>
        <pre><code>http://www.adobe.com</code></pre>
        </div></td>
    </tr>
    <tr>
        <td><p>https</p></td>
        <td><p>A standard HTTPS request.</p></td>
        <td><div>
        <pre><code>https://secure.example.com</code></pre>
        </div></td>
    </tr>
</tbody>
</table>

For more information about using URL schemes in AIR, see
[URI schemes](../../networking-and-communication/http-communications/loading-external-data.md#uri-schemes).

Many of AIR APIs, including the File, Loader, URLStream, and Sound classes, use
a URLRequest object rather than a string containing the URL. The URLRequest
object itself is initialized with a string, which can use any of the same url
schemes. For example, the following statement creates a URLRequest object that
can be used to request the Adobe home page:

    var urlReq = new air.URLRequest("https://www.adobe.com/");

For information about URLRequest objects see
[HTTP communications](../../networking-and-communication/http-communications/index.md).
