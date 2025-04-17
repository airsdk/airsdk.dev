---
sidebar_position: 3
---

# Implementing the IURIDereferencer interface

To validate an XML signature, you must provide an implementation of the
IURIDereferencer interface. The implementation is responsible for resolving the
URIs within the Reference elements of an XML signature document and returning
the data so that the digest can be computed. The computed digest is compared
with the digest in the signature to determine if the referenced data has been
altered since the signature was created.

Note: HTML-based AIR applications must import a SWF library containing an
ActionScript implementation in order to validate XML signatures. The
IURIDereferencer interface cannot be implemented in JavaScript.

The IURIDerefencer interface has a single method, `dereference(uri:String)`,
that must be implemented. The XMLSignatureValidator object calls this method for
each reference in the signature. The method must return the data in a ByteArray
object.

In most cases, you will also need to add properties or methods that allow your
dereferencer object to locate the referenced data. For example, if the signed
data is located in the same document as the signature, you could add a member
variable that provides a reference to the XML document. The `dereference()`
method can then use this variable, along with the URI, to locate the referenced
data. Likewise, if the signed data is located in a directory of the local file
system, the `dereference()` method might need a property providing the path to
that directory in order to resolve the referenced files.

The XMLSignatureValidator relies entirely on the dereferencer for interpreting
URI strings. The standard rules for dereferencing URIs are given in the section
4.3.3 of the W3C Recommendation for XML Signature Syntax and Processing.

## Dereferencing URIs in enveloped signatures

When an enveloped XML signature is generated, the signature elements are
inserted into the signed data. For example, if you signed the following message
using an enveloped signature structure:

```
<message>
	<data>...</data>
</message>
```

The resulting signed document will look like this:

```
<message>
	<data>...</data>
	<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
		<SignedInfo>
			<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
			<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
			<Reference URI="">
				<Transforms>
					<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
				</Transforms>
				<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
				<DigestValue>yv6...Z0Y=</DigestValue>
			</Reference>
		</SignedInfo>
		<SignatureValue>cCY...LQ==</SignatureValue>
		<KeyInfo>
			<X509Data>
				<X509Certificate>MII...4e</X509Certificate>
			</X509Data>
		</KeyInfo>
	</Signature>
</message>
```

Notice that the signature contains a single Reference element with an empty
string as its URI. An empty string in this context refers to the root of the
document.

Also notice that the transform algorithm specifies that an enveloped signature
transform has been applied. When an enveloped signature transform has been
applied, the XMLSignatureValidator automatically removes the signature from the
document before computing the digest. This means that the dereferencer does not
need to remove the Signature element when returning the data.

The following example illustrates a dereferencer for enveloped signatures:

```
package
{
	import flash.events.ErrorEvent;
	import flash.events.EventDispatcher;
	import flash.security.IURIDereferencer;
	import flash.utils.ByteArray;
	import flash.utils.IDataInput;

	public class EnvelopedDereferencer
		extends EventDispatcher implements IURIDereferencer
	{
		private var signedMessage:XML;

		public function EnvelopedDereferencer( signedMessage:XML )
		{
			this.signedMessage = signedMessage;
		}

		public function dereference( uri:String ):IDataInput
		{
			try
			{
				if( uri.length != 0 )
				{
					throw( new Error("Unsupported signature type.") );
				}
				var data:ByteArray = new ByteArray();
				data.writeUTFBytes( signedMessage.toXMLString() );
				data.position = 0;
			}
			catch (e:Error)
				{
				var error:ErrorEvent =
					new ErrorEvent("Ref error " + uri + " ", false, false, e.message);
				this.dispatchEvent(error);
				data = null;
				throw new Error("Reference not resolvable: " + uri + ", " + e.message);
			}
			finally
			{
				return data;
			}
		}
	}
}
```

This dereferencer class uses a constructor function with a parameter,
`signedMessage`, to make the enveloped signature document available to the
`dereference()` method. Since the reference in an enveloped signature always
refers to the root of the signed data, the `dereferencer()` method writes the
document into a byte array and returns it.

## Dereferencing URIs in enveloping and detached signatures

When the signed data is located in the same document as the signature itself,
the URIs in the references typically use XPath or XPointer syntax to address the
elements that are signed. The W3C Recommendation for XML Signature Syntax and
Processing only recommends this syntax, so you should base your implementation
on the signatures you expect to encounter (and add sufficient error checking to
gracefully handle unsupported syntax).

The signature of an AIR application is an example of an enveloping signature.
The files in the application are listed in a Manifest element. The Manifest
element is addressed in the Reference URI attribute using the string,
"#PackageContents", which refers to the Id of the Manifest element:

```
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="PackageSignature">
	<SignedInfo>
		<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
		<SignatureMethod Algorithm="http://www.w3.org/TR/xmldsig-core#rsa-sha1"/>
		<Reference URI="#PackageContents">
			<Transforms>
				<Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
			</Transforms>
			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
			<DigestValue>ZMGqQdaRKQc1HirIRsDpeBDlaElS+pPotdziIAyAYDk=</DigestValue>
		</Reference>
	</SignedInfo>
	<SignatureValue Id="PackageSignatureValue">cQK...7Zg==</SignatureValue>
	<KeyInfo>
		<X509Data>
			<X509Certificate>MII...T4e</X509Certificate>
		</X509Data>
	</KeyInfo>
	<Object>
	<Manifest Id="PackageContents">
		<Reference URI="mimetype">
			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256">
			</DigestMethod>
			<DigestValue>0/oCb84THKMagtI0Dy0KogEu92TegdesqRr/clXct1c=</DigestValue>
		</Reference>
		<Reference URI="META-INF/AIR/application.xml">
			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256">
			</DigestMethod>
			<DigestValue>P9MqtqSdqcqnFgeoHCJysLQu4PmbUW2JdAnc1WLq8h4=</DigestValue>
		</Reference>
		<Reference URI="XMLSignatureValidation.swf">
			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256">
			</DigestMethod>
			<DigestValue>OliRHRAgc9qt3Dk0m0Bi53Ur5ur3fAweIFwju74rFgE=</DigestValue>
		</Reference>
	</Manifest>
	</Object>
</Signature>
```

A dereferencer for validating this signature must take the URI string
containing, `"#PackageContents"` from the Reference element, and return the
Manifest element in a ByteArray object. The "#" symbol refers to the value of an
element Id attribute.

The following example implements a dereferencer for validating AIR application
signatures. The implementation is kept simple by relying on the known structure
of an AIR signature. A general-purpose dereferencer could be significantly more
complex.

```
package
{
	import flash.events.ErrorEvent;
	import flash.security.IURIDereferencer;
	import flash.utils.ByteArray;
	import flash.utils.IDataInput;

	public class AIRSignatureDereferencer implements IURIDereferencer {
		private const XML_SIG_NS:Namespace =
			new Namespace( "http://www.w3.org/2000/09/xmldsig#" );
		private var airSignature:XML;

		public function AIRSignatureDereferencer( airSignature:XML ) {
			this.airSignature = airSignature;
		}

		public function dereference( uri:String ):IDataInput {
			var data:ByteArray = null;
			try
			{
				if( uri != "#PackageContents" )
				{
					throw( new Error("Unsupported signature type.") );
				}
				var manifest:XMLList =
					airSignature.XML_SIG_NS::Object.XML_SIG_NS::Manifest;
				data = new ByteArray();
				data.writeUTFBytes( manifest.toXMLString());
				data.position = 0;
			}
			catch (e:Error)
			{
				data = null;
				throw new Error("Reference not resolvable: " + uri + ", " + e.message);
			}
			finally
			{
				return data;
			}

		}
	}
}
```

When you verify this type of signature, only the data in the Manifest element is
validated. The actual files in the package are not checked at all. To check the
package files for tampering, you must read the files, compute the SHA256 digest
and compare the result to digest recorded in the manifest. The
XMLSignatureValidator does not automatically check such secondary references.

Note: This example is provided only to illustrate the signature validation
process. There is little use in an AIR application validating its own signature.
If the application has already been tampered with, the tampering agent could
simply remove the validation check.

### Computing digest values for external resources

AIR does not include built-in functions for computing SHA256 digests, but the
Flex SDK does include a SHA256 utility class. The SDK also includes the Base64
encoder utility class that is helpful for comparing the computed digest to the
digest stored in a signature.

The following example function reads and validates the files in an AIR package
manifest:

```
import mx.utils.Base64Encoder;
import mx.utils.SHA256;

private function verifyManifest( sigFile:File, manifest:XML ):Boolean
{
	var result:Boolean = true;
	var message:String = '';
	var nameSpace:Namespace = manifest.namespace();

	if( manifest.nameSpace::Reference.length() <= 0 )
	{
		result = false;
		message = "Nothing to validate.";
	}
	for each (var reference:XML in manifest.nameSpace::Reference)
	{
		var file:File = sigFile.parent.parent.resolvePath( reference.@URI );
		var stream:FileStream = new FileStream();
		stream.open(file, FileMode.READ);
		var fileData:ByteArray = new ByteArray();
		stream.readBytes( fileData, 0, stream.bytesAvailable );

		var digestHex:String = SHA256.computeDigest( fileData );
		//Convert hexidecimal string to byte array
		var digest:ByteArray = new ByteArray();
		for( var c:int = 0; c < digestHex.length; c += 2 ){
			var byteChar:String = digestHex.charAt(c) + digestHex.charAt(c+1);
			digest.writeByte( parseInt( byteChar, 16 ));
		}
		digest.position = 0;

		var base64Encoder:Base64Encoder = new Base64Encoder();
		base64Encoder.insertNewLines = false;
		base64Encoder.encodeBytes( digest, 0, digest.bytesAvailable );
		var digestBase64:String = base64Encoder.toString();
		if( digestBase64 == reference.nameSpace::DigestValue )
		{
			result = result && true;
			message += "   " + reference.@URI + " verified.\n";
		}
		else
		{
			result = false;
			message += " ---- " + reference.@URI + " has been modified!\n";
		}
		base64Encoder.reset();
	}
	trace( message );
	return result;
}
```

The function loops through all the references in the Manifest element. For each
reference, the SHA256 digest is computed, encoded in base64 format, and compared
to the digest in the manifest. The URIs in an AIR package refer to paths
relative to the application directory. The paths are resolved based on the
location of the signature file, which is always in the META-INF subdirectory
within the application directory. Note that the Flex SHA256 class returns the
digest as a string of hexadecimal characters. This string must be converted into
a ByteArray containing the bytes represented by the hexadecimal string.

To use the mx.utils.SHA256 and Base64Encoder classes in Flash CS4, you can
either locate and copy these classes into your application development directory
or compile a library SWF containing the classes using the Flex SDK.

## Dereferencing URIs in detached signatures referencing external data

When a URI refers to an external resource, the data must be accessed and loaded
into a ByteArray object. If the URI contains an absolute URL, then it is simply
a matter of reading a file or requesting a URL. If, as is probably the more
common case, the URI contains to a relative path, then your IURIDereferencer
implementation must include a way to resolve the paths to the signed files.

The following example uses a File object initialized when the dereferencer
instance is constructed as the base for resolving signed files.

```
package
{
	import flash.events.ErrorEvent;
	import flash.events.EventDispatcher;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.security.IURIDereferencer;
	import flash.utils.ByteArray;
	import flash.utils.IDataInput;
	public class RelativeFileDereferencer
		extends EventDispatcher implements IURIDereferencer
	{
		private var base:File;

		public function RelativeFileDereferencer( base:File )
		{
			this.base = base;
		}

		public function dereference( uri:String ):IDataInput
		{
			var data:ByteArray = null;
			try{
				var referent:File = this.base.resolvePath( uri );
				var refStream:FileStream = new FileStream();
				data = new ByteArray();
				refStream.open( referent, FileMode.READ );

				refStream.readBytes( data, 0, data.bytesAvailable );

			} catch ( e:Error ) {
				data = null;
				throw new Error("Reference not resolvable: " + referent.nativePath + ", " + e.message );
			} finally {
				return data;
			}
		}
	}
}
```

The `dereference()` function simply locates the file addressed by the reference
URI, loads the file contents into a byte array, and returns the ByteArray
object.

Note: Before validating remote external references, consider whether your
application could be vulnerable to a "phone home" or similar type of attack by a
maliciously constructed signature document.
