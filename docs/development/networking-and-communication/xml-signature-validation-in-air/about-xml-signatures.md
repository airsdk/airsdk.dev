---
sidebar_position: 2
---

# About XML signatures

An XML signature is a digital signature represented in XML syntax. The data in
an XML signature can be used to validate that the signed information has not
been altered since signing. In addition, when a signing certificate has been
issued by a trusted certification authority, the identity of the signer can be
verified through the public key infrastructure.

An XML signature can be applied to any type of digital data (in binary or XML
format). XML signatures are typically used for such purposes as:

- checking whether external or downloaded resources have been modified

- verifying that messages come from a known source

- validating application license or subscription privileges

## Supported XML signature syntax

AIR supports the following elements from the W3C recommendation for XML
Signature Syntax and Processing:

- All core signature syntax elements (section 4 of the W3C recommendation
  document)—except the KeyInfo element is not fully supported

- The KeyInfo element must only contain an X509Data element

- An X509Data element must only contain an X509Certificate element

- The SHA256 digest method

- The RSA-SHA1 (PKCS1) signing algorithm

- The "Canonical XML without comments" canonicalization method and transform

- The enveloped signature transform

- timestamps

The following document illustrates a typical XML signature (most of the
cryptographic data has been removed to simplify the example):

    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    	<SignedInfo>
    		<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
    		<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
    		<Reference URI="URI_to_signed_data">
    			<Transforms>
    				<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>            </Transforms>
    			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
    			<DigestValue>uoo...vY=</DigestValue>
    		</Reference>
    	</SignedInfo>
    	<SignatureValue>Ked...w==</SignatureValue>
    	<KeyInfo>
    		<X509Data>
    			<X509Certificate>i7d...w==</X509Certificate>
    		</X509Data>
    	</KeyInfo>
    </Signature>

The key elements of a signature are:

- SignedInfo — Contains references to the signed data and the computed digest
  values at the time of signing. The signed data itself may be included in the
  same document as the XML signature or may be external.

- SignatureValue — Contains a digest of the SignedInfo element encrypted with
  the signer's private key.

- KeyInfo — Contains the signing certificate, as well as any additional
  certificates needed to establish the chain of trust. Note that although the
  KeyInfo element is technically optional, AIR cannot validate the signature if
  it is not included.

There are three general types of XML signatures:

- Enveloped — the signature is inserted inside the XML data that it is signing.

- Enveloping — the signed XML data is contained within an Object element within
  the Signature element.

- Detached — the signed data is external to the XML signature. The signed data
  might be in an external file. Alternately, it might be in the same XML
  document as the signature, just not a parent or child element of the Signature
  element.

XML signatures use URIs to reference the signed data. The signing and the
validating applications must use the same conventions for resolving these URIs.
When using the XMLSignatureValidator class, you must provide an implementation
of the IURIDereferencer interface. This implementation is responsible for
resolving the URI and returning the signed data as a ByteArray object. The
returned ByteArray object is digested using the same algorithm that produced the
digest in the signature.

### Certificates and trust

A certificate consists of a public key, identifying information, and possibly
one or more certificates belonging to the issuing certification authority.

There are two ways to establish trust in a certificate. You can establish trust
by obtaining a copy of the certificate directly from the signer, for example on
physical media, or through a secure digital transmission such as an SSL
transaction. You can also rely on a certification authority to determine whether
the signing certificate is trustworthy.

To rely on a certification authority, the signing certificate must be issued by
an authority that is trusted on the computer upon which the signature is
validated. Most operating system manufacturers place the root certificates of a
number of certification authorities into the operating system trust store. Users
can also add and remove certificates from the store.

Even if a certificate is issued by a trusted certification authority, you must
still decide whether the certificate belongs to someone you trust. In many use
cases, this decision is passed along to the end-user. For example, when an AIR
application is installed, the AIR installer displays the identifying information
from the publisher's certificate when asking the user to verify whether they
want to install the application. In other cases, you might have to compare the
public key or other certificate information to a list of acceptable keys. (This
list must be secured, perhaps by its own signature, or by storing in the AIR
encrypted local store, so that the list itself cannot be tampered with.)

Note: While you can elect to trust the signing certificate without independent
verification—such as when a signature is "self-signed"—you do not thereby gain
much assurance of anything by verifying the signature. Without knowing who
created a signature, the assurance that the signature has not been tampered
with, is of little, if any, value. The signature could be a validly signed
forgery.

#### Certificate expiration and revocation

All certificates expire. Certificates can also be revoked by the issuing
certification authority if, for example, the private key related to the
certificate is compromised or stolen. If a signature is signed with an expired
or revoked certificate, then the signature will be reported as invalid unless a
timestamp has been included as part of the signature. If a timestamp is present,
then the XMLSignatureValidator class will validate the signature as long as the
certificate was valid at the time of signing.

A timestamp is a signed digital message from a timestamp service that certifies
that the data was signed at a particular time and date. Timestamps are issued by
timestamp authorities and signed by the timestamp authority's own certificate.
The timestamp authority certificate embedded in the timestamp must be trusted on
the current machine for the timestamp to be considered valid. The
XMLSignatureValidator does not provide an API for designating a different
certificate to use in validating the timestamp.
