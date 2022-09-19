---
title: Creating macOS PKG installers
---

:::info
This tutorial guides you through creating, signing and notarizing a PKG file that can be used to distribute and install your application for macOS, outside of the App Store.
Put together by [Ender22](https://github.com/Ender22) (see the [original thread on github](https://github.com/airsdk/Adobe-Runtime-Support/discussions/2088#discussioncomment-3622583))
:::

:::note
Important: For distributing application on macOS, you now have just two options:
  * Deployment on the App Store - for which you need an App Store certificate
  * Manual deployment outside of this - for which you need a Developer ID certificate

You'll need an Apple developer account in order to obtain these certificates and to complete this process.

It also assumes you already have a working publishing process for iOS and that you use IntelliJ on your Mac PC (although the steps can likely help anyone looking to take their air app to the Mac audience)
:::

### Prepare your Mac for code signing

#### Create and install your 'Developer ID Application' certificate

Start by logging into your developer.apple.com account. Proceed to the certificate section and create a new 'Developer ID Application' certificate. Choose the G2 Sub-CA (Xcode 11.4.1 or later) option. If you don't have a 'Certificate Signing Request' follow [this apple guide](https://help.apple.com/developer-account/#/devbfa00fef7) to create one.

Save your new 'Developer ID Application' certificate to your machine.

I found it best to install all my certificates on both my 'System' and 'login' parts of the keychain. To do this open keychain and click the System tab, then double-click your certificate to install it. You'll see the new certificate appear in the list. Next, do the same thing but from the login tab.

#### Prepare the other certificates in the chain
In Keychain, right-click on your new 'Developer ID Application' certificate and press 'Get Info'. Look at the Common Name in the Issuer Name section for me it's "Developer ID Certificate Authority" with the "G2" organizational unit. Proceed to https://www.apple.com/certificateauthority/ and under "Apple Intermediate Certificates" find the matching certificate i.e. "Developer ID - G2 (Expiring 09/17/2031 00:00:00 UTC)". Download and install this certificate again to the System and Login parts of your keychain.

Repeat the process again this time clicking on your new "Developer ID Certificate Authority" certificate. For this one, my Issuer name is "Apple Root CA" So I went back to the certificate authority and then downloaded and installed that certificate: "Apple Root CA - G2 Root"

That is likely enough, but I also downloaded and installed the "Apple Inc. Root" certificate just in case.

#### Test if you now have a complete certificate signing chain

Click on each of your new certificates in Keychain and ensure they all say "This certificate is valid". Next, we will try to sign a file to see if it works.

First, copy your adl application into a folder so we have something to sign with the following:
```
cp /path/to/AIR/SDK/bin/adl .
```
Next, try signing it. I recommend using your full certificate name, in my case, I'll pretend my company's name is ECorp:
```
codesign -f -s "Developer ID Application: ECorp (XXXXXXXX)" adl
```
You should see a message: `replacing existing signature`
You can see the result with the following:
```
codesign -dvvv adl
```

If the signing doesn't work then there is something wrong with the chain of certificates installed and you should ensure you installed all of the correct ones. Reinstalling them can help and make sure you don't edit them and press 'Always Allow' as apparently, that causes issues.


### Figure out your app bundle command

#### Start with your iOS command.

We will need to create our bundle using the command line rather than IntelliJ.
If you are like me and find the subtleties of the command line difficult it can help to start from your existing working command line that you use for iOS packaging.
You can find the command line IntelliJ uses by setting up the `DebugOut` configuration value in the AIR SDK `adt.cfg` file.
Then build your app like normal and look in the newly created `~/adt.log` file to see what command line had been passed to ADT.

#### Update the command to build a bundle

Next, update the command so that it creates a macOS application bundle (`.app` folder). My final command looked like:
```
/path/to/adt -package -storetype KeychainStore -alias "Developer ID Application: ECorp(XXXXXXXXX)" -target bundle /path/to/bundle/you/want/to/create /path/to/your/application.xml -extdir /path/to/anes/if/you/use/them -C /path/to/your/swf ECorp.swf -C /path/to/your/assets . -C /path/to/your/icons . -C /path/to/your/launch/images
```

Run the command and if all goes well you'll have a new bundle.app file. This file won't work yet as it is only partially signed.

#### Create an entitlements file

In order to fully sign this, we'll need to sign it with an entitlements file. Create a file called `app.entitlements` in the same directory as your swf with the following contents:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>com.apple.security.cs.allow-dyld-environment-variables</key>
        <true/>
        <key>com.apple.security.cs.allow-jit</key>
        <true/>
        <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
        <true/>
        <key>com.apple.security.cs.disable-library-validation</key>
        <true/>
</dict>
</plist>
```

#### Sign your bundle

Now sign your bundle again with the entitlements and these specific options.
codesign --entitlements /path/to/app.entitlements -s "Developer ID Application: ECorp (XXXXXXX)" -f -o runtime --strict --timestamp -v /path/to/your/bundle.app

#### Sign your ANEs

Any ANEs will need to be signed. For now, you could skip this step until Apple rejects your notarization process and then come back to it once you know which ANEs aren't yet signed. Once you know which ones, you'll sign their framework folder as follows:
```
codesign -f --options runtime -s "Developer ID Application: ECorp (XXXXXXXXX)" "/path/to/bundle.app/Contents/Resources/META-INF/AIR/extensions/extension-name/META-INF/ANE/MacOS-x86-64/ExtName.framework"
```
Repeat for each ANE that needs to be signed. Note you may also need to sign other components (`.dylib` files if present) - notarization reports will give this information.

#### Sign the main binary file

After signing the ANEs you'll need to sign the main application bundle files (which gives a final signature to the executable located in the Contents/MacOS folder of your bundle). Here's my command for this:
```
codesign --entitlements /path/to/app.entitlements -f --options runtime --strict --timestamp -v -s "Developer ID Application: ECorp (XXXXXXXXX)" "/path/to/bundle.app"
```

:::note
It should be possible to request the ADL tool to do "native signing" of the bundle, which eliminates the need for the entitlements and these manual signing steps.
To do this you need to repeat the signing options after the `-target bundle` command.
Note that the certificate alias you're using must be present and valid in your Keychain tool with the exact same name, and you will likely get a request to authorise ADL to access your keychain for this process.
```
/path/to/adt -package -storetype KeychainStore -alias "Developer ID Application: ECorp(XXXXXXXXX)" -target bundle -storetype KeychainStore -alias "Developer ID Application: ECorp(XXXXXXXXX)" /path/to/bundle/you/want/to/create /path/to/your/application.xml -extdir /path/to/anes/if/you/use/them -C /path/to/your/swf ECorp.swf -C /path/to/your/assets . -C /path/to/your/icons . -C /path/to/your/launch/images
```
This option will also incorporate any entitlements that are listed in the application descriptor file under the `<macOS><Entitlements>` block.
:::

The output of this stage should be a suitably signed application bundle folder. It is worth checking that this will run properly at this stage: if something has gone wrong with signing and/or entitlements, this is the time to put this right.


### Create your .pkg file

Assuming you want to distribute via a .pkg file you can create one as follows. Apparently, you can also create .dmg files that can contain your application, or just zip your bundle, but this results in a file that your users
can launch and results in a wizard-style installer.

#### Get a Developer ID Installer certificate.

Head back to developer.apple.com and create a new certificate. This time it will be of the 'Developer ID Installer' type. Make sure you install it into your System and Login keychains again.

#### Pkg command

Now run the following command taking note that we are using the installer certificate this time:
```
productbuild --sign "Developer ID Installer: ECorp (XXXXXXX)" --component "/path/to/bundle.app" /Applications "/path/to/pkg/to/create/eCorp.pkg" 
```


### Notarize your .pkg file

If you don't notarize your app users may be unable to install it. As a first step, you'll need to have (or create) an app-specific password for your apple account. This can be done at https://appleid.apple.com a quick google should help if you need it.

Now we'll upload our pkg file to Apple's notarization service with the following:
```
xcrun altool -type osx --notarize-app --primary-bundle-id "com.your.bundle.identifier" --username "your.apple.id@gmail.com" --password "your-app-specific-password" --file "/path/to/pkg/eCorp.pkg"
```

Nothing will happen for a while as the file is uploaded, eventually, you should get an upload success message. You'll be given a reference string, copy this.
Wait 5-10 minutes then check your email for your rejection email. Apple will say your app wasn't notarized. To find out why we'll need to run the following:
```
xcrun altool --notarization-info your-ref-string -u "your.apple.id@gmail.com" --password "your-app-specific-password"
```
You'll get a response back with a URL for a log file. Throw that into your web browser and you'll see a file explaining your rejection reason. i.e. one of your ANEs wasn't signed. Go back to step 2.5, sign the ANEs and then repeat all subsequent steps and try again.

Hopefully, on your next try, you'll get a notarization success email instead.

#### Staple your notarization to your pkg file

In order for your app not to require an internet connection to check its notarization status, you should staple the notarization to it. This can be done with:
```
xcrun stapler staple -v "/path/to/your/pkg/ECorp.pkg"
```
You should get a success message and congrats your pkg is ready for distribution.


### Useful links

The following 2 guides helped me when I got stuck. They have a lot of details but don't quite follow the process that worked for me. Hopefully, they can help if you run into issues.

https://www.molleindustria.org/blog/notarizing-your-flashair-applications-for-macos/

https://lessons.livecode.com/m/4071/l/1122100-codesigning-and-notarizing-your-lc-standalone-for-distribution-outside-the-mac-appstore#addendum-2-the-asc-provider

