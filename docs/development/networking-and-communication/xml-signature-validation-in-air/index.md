# XML signature validation in AIR

Use the classes in the Adobe® AIR® XMLSignatureValidator API to validate digital
signatures conforming to a subset of the W3C recommendation for XML-Signature
Syntax and Processing ([http://http://www.w3.org/TR/xmldsig-core/](http://www.w3.org/TR/xmldsig-core/)).
XML signatures can be used to help verify the integrity and signer identity of
data or information.

XML signatures can be used to validate messages or resources downloaded by your
application. For example, if your application provides services on a
subscription basis, you could encapsulate the subscription terms in a signed XML
document. If someone attempted to alter the subscription document, validation
would fail.

You could also use an XML signature to help validate downloaded resources used
by your application by including a signed manifest containing digests of those
resources. Your application could verify that the resources have not been
altered by comparing the digest in the signed file with a digest computed from
the loaded bytes. This is particularly valuable when the downloaded resource is
a SWF file or other active content that you want to run in the application
security sandbox.

- [Basics of XML signature validation](./basics-of-xml-signature-validation.md)
- [About XML signatures](./about-xml-signatures.md)
- [Implementing the IURIDereferencer interface](./implementing-the-iuridereferencer-interface.md)
