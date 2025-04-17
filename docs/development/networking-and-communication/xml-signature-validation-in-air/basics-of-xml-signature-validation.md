---
sidebar_position: 1
---

# Basics of XML signature validation

Adobe® AIR® provides the XMLSignatureValidator class and IURIDereferencer
interface for validating XML signatures. The XML syntax accepted by the
XMLSignatureValidator class is a subset of the W3C recommendation for XML
Signature Syntax and Processing. (Because only a subset of the recommendation is
supported, not all legal signatures can be validated.) AIR does not provide an
API for creating XML signatures.

## XML signature validation classes

The XML signature validation API includes the following classes:

<table>
    <thead>
        <tr>
            <th>
                <p>Package</p>
            </th>
            <th>
                <p>Classes</p>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>flash.security</p>
            </td>
            <td>
                <div>
                    <ul class="incremental">
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/XMLSignatureValidator.html">XMLSignatureValidator</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/IURIDereferencer.html">IURIDereferencer</a>
                                (interface)
                            </p>
                        </li>
                    </ul>
                    <p>
                        XMLSignatureValidator string constants are defined in the following
                        classes:
                    </p>
                    <ul class="incremental">
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/ReferencesValidationSetting.html">ReferencesValidationSetting</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/RevocationCheckSettings.html">RevocationCheckSettings</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/SignatureStatus.html">SignatureStatus</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/security/SignerTrustSettings.html">SignerTrustSettings</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <p>flash.events</p>
            </td>
            <td>
                <div>
                    <ul class="incremental">
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/events/Event.html">Event</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="https://airsdk.dev/reference/actionscript/3.0/flash/events/ErrorEvent.html">ErrorEvent</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    </tbody>
</table>

## Using the XML signature validation classes

To use the XMLSignatureValidator class to validate an XML signature, you must:

- Create an XMLSignatureValidator object

- Provide an implementation of the IURIDereferencer interface. The
  XMLSignatureValidator object calls the IURIDereferencer `dereference()`
  method, passing in the URI for each reference in a signature. The
  `dereference()` method must resolve the URI and return the referenced data
  (which could be in the same document as the signature, or could be in an
  external resource).

- Set the certificate trust, revocation checking, and reference validation
  settings of the XMLSignatureValidator object as appropriate for your
  application.

- Add event listeners for the `complete` and `error` events.

- Call the `verify()` method, passing in the signature to validate.

- Handle the `complete` and `error` events and interpret the results.

The following example implements a `validate()` function that verifies the
validity of an XML signature. The XMLSignatureValidator properties are set such
that the signing certificate must be in the system trust store, or chain to a
certificate in the trust store. The example also assumes that a suitable
IURIDereferencer class named _XMLDereferencer_ exists.

```
private function validate( xmlSignature:XML ):void
{
	var verifier:XMLSignatureValidator = new XMLSignatureValidator();
	verifier.addEventListener(Event.COMPLETE, verificationComplete);
	verifier.addEventListener(ErrorEvent.ERROR, verificationError);
	try
	{
		verifier.uriDereferencer = new XMLDereferencer();

		verifier.referencesValidationSetting =
			ReferencesValidationSetting.VALID_IDENTITY;
		verifier.revocationCheckSetting = RevocationCheckSettings.BEST_EFFORT;
		verifier.useSystemTrustStore = true;

		//Verify the signature
		verifier.verify( xmlSignature );
	}
	catch (e:Error)
  {
      trace("Verification error.\n" + e);
  }
}

//Trace verification results
private function verificationComplete(event:Event):void
{
	var signature:XMLSignatureValidator = event.target as XMLSignatureValidator;
	trace("Signature status: " + signature.validityStatus + "\n");
	trace("  Digest status: " + signature.digestStatus + "\n");
	trace("  Identity status: " + signature.identityStatus + "\n");
	trace("  Reference status: " + signature.referencesStatus + "\n");
}

private function verificationError(event:ErrorEvent):void
{
	trace("Verification error.\n" + event.text);
}
```

### The XML signature validation process

When you call the XMLSignatureValidator `verify()` method, AIR performs the
following steps:

- The runtime verifies the cryptographic integrity of the signature using the
  public key of the signing certificate.

- The runtime establishes the cryptographic integrity, identity, and
  trustworthiness of the certificate based on the current settings of the
  XMLSignatureValidator object.

  The trust placed in the signing certificate is key to the integrity of the
  validation process. Signature validation is conducted using a well-defined
  cryptographic process, but the trustworthiness of the signing certificate is a
  judgment that cannot be made algorithmically.

  In general, you have three ways to decide whether a certificate is
  trustworthy:

  - By relying on certification authorities and the operating system trust
    store.

  - By obtaining, directly from the signer, a copy of the certificate, another
    certificate that serves as a trust anchor for the certificate, or sufficient
    information to reliably identify the certificate, such as the public key.

  - Asking the end user of your application if they trust the certificate. Such
    a query is invalid with self-signed certificates since the identifying
    information in the certificate is inherently unreliable.

- The runtime verifies the cryptographic integrity of the signed data.

  The signed data is verified with the help of your IURIDereferencer
  implementation. For each reference in the signature document, the
  IURIDereferencer implementation `dereference()` method is called. The data
  returned by the `dereference()` method is used to compute the reference
  digest. This digest value is compared to the digest recorded in the signature
  document. If the digests match, then the data has not been altered since it
  was signed.

  One important consideration when relying on the results of validating an XML
  signature is that only what is signed is secure. For example, consider a
  signed manifest listing the files in a package. When the XMLSignatureValidator
  verifies the signature, it only checks whether the manifest itself is
  unaltered. The data in the files is not signed, so the signature will still
  validate when files referenced in the manifest are changed or deleted.

  Note: To verify files in such a manifest, you can compute the digest of the
  file data (using the same hashing algorithm used in the manifest) and compare
  the result to the digest stored in the signed manifest. In some cases, you
  should also check for the presence of additional files.

### Interpreting validation results

The validation results are reported by the status properties of the
XMLSignatureValidator object. These properties can be read after the validator
object dispatches the _complete_ event. The four status properties include:
`validityStatus`, `digestStatus`, `identityStatus`, and `referencesStatus`.

#### The validityStatus property

The `validityStatus` property reports the overall validity of the signature. The
`validityStatus` depends on the state of the other three status properties and
can have one of the following values:

- `valid` — If `digestStatus`, `identityStatus`, and `referencesStatus` are all
  `valid`.

- `invalid` — If one or more of the individual status properties is `invalid`.

- `unknown` — If one or more of the individual status properties is `unknown`
  and no individual status is `invalid`.

#### The digestStatus property

The `digestStatus` property reports the results of the cryptographic
verification of the message digest. The `digestStatus` property can have one of
the following values:

- `valid` — If the signature document itself is unaltered since signing.

- `invalid` — If the signature document has been altered or is malformed.

- `unknown` — If the `verify()` method has not completed without error.

#### The identityStatus property

The `identityStatus` property reports the status of the signing certificate. The
value of this property depends on several factors including:

- the cryptographic integrity of the certificate

- whether the certificate is expired or revoked

- whether the certificate is trusted on the current machine

- the state of the XMLSignatureValidator object (such as whether additional
  certificates have been added for building the trust chain, whether those
  certificates are trusted, and the values of the `useSystemTrustStore` and
  `revocationCheckSettings` properties)

The `identityStatus` property can have the following values:

- `valid` — To be considered valid, the signing certificate must meet the
  following conditions:

  - The signing certificate must be unaltered.

  - The signing certificate must not be expired or revoked—except when a valid
    timestamp is present in the signature. If the signature is timestamped, the
    certificate will be considered valid as long as it was valid at the time the
    document was signed. (The certificate used by the timestamp service to sign
    the timestamp must chain to a trusted root certificate on the user's
    computer.)

  - The signing certificate is trusted. A certificate is trusted if the
    certificate is in the system trust store or chains to another certificate in
    the system trust store and you set the `useSystemTrustStore` property to
    true. You can also designate a certificate as trusted using the
    `addCertificate()` method of the XMLSignatureValidator object.

  - The certificate is, in fact, the signing certificate.

- `invalid` — The certificate is expired or revoked—and no timestamp proving
  validity at the time of signing is present—or the certificate has been
  altered.

- `unknown` — If the certificate is not invalid, but is not trusted either.
  Self-signed certificates, for example, will be reported as `unknown` (unless
  explicitly trusted). The `identityStatus` is also reported as `unknown` if the
  `verify()` method has not completed without error or if the identity has not
  been checked because the signature digest is invalid.

#### The referencesStatus property

The `referencesStatus` property reports the cryptographic integrity of the
references in the SignedData element of the signature.

- `valid` — If the computed digest of every reference in the signature matches
  the corresponding digest recorded in the XML signature. A `valid` status
  indicates that the signed data has not been altered.

- `invalid` — If any computed digest does not match the corresponding digest in
  the signature.

- `unknown` — If the reference digests have not been checked. The references are
  not checked if the overall signature digest is `invalid` or the signing
  certificate is invalid. If the `identityStatus` is `unknown`, then the
  references are only checked when the `referencesValidationSetting` is
  `validOrUnknown`.
