---
sidebar_position: 5
---

# Using encryption with SQL databases

All Adobe AIR applications share the same local database engine. Consequently,
any AIR application can connect to, read from, and write to an unencrypted
database file. Starting with Adobe AIR 1.5, AIR includes the capability of
creating and connecting to encrypted database files. When you use an encrypted
database, in order to connect to the database an application must provide the
correct encryption key. If the incorrect encryption key (or no key) is provided,
the application is not able to connect to the database. Consequently, the
application can't read data from the database or write to or change data in the
database.

To use an encrypted database, you must create the database as an encrypted
database. With an existing encrypted database, you can open a connection to the
database. You can also change the encryption key of an encrypted database. Other
than creating and connecting to encrypted databases, the techniques for working
with an encrypted database are the same as for working with an unencrypted one.
In particular, executing SQL statements is the same regardless of whether a
database is encrypted or not.

## Uses for an encrypted database

Encryption is useful any time you want to restrict access to the information
stored in a database. The database encryption functionality of Adobe AIR can be
used for several purposes. The following are some examples of cases where you
would want to use an encrypted database:

- A read-only cache of private application data downloaded from a server

- A local application store for private data that is synchronized with a server
  (data is sent to and loaded from the server)

- Encrypted files used as the file format for documents created and edited by
  the application. The files could be private to one user, or could be designed
  to be shared among all users of the application.

- Any other use of a local data store, such as the ones described in
  [Uses for local SQL databases](./about-local-sql-databases.md#uses-for-local-sql-databases),
  where the data must be kept private from people who have access to the machine
  or the database files.

Understanding the reason why you want to use an encrypted database helps you
decide how to architect your application. In particular, it can affect how your
application creates, obtains, and stores the encryption key for the database.
For more information about these considerations, see
[Considerations for using encryption with a database](./using-encryption-with-sql-databases.md#considerations-for-using-encryption-with-a-database).

Other than an encrypted database, an alternative mechanism for keeping sensitive
data private is the
[encrypted local store](https://airsdk.dev/reference/actionscript/3.0/flash/data/EncryptedLocalStore.html).
With the encrypted local store, you store a single
[ByteArray](https://airsdk.dev/reference/actionscript/3.0/flash/utils/ByteArray.html)
value using a String key. Only the AIR application that stores the value can
access it, and only on the computer on which it is stored. With the encrypted
local store, it isn't necessary to create your own encryption key. For these
reasons, the encrypted local store is most suitable for easily storing a single
value or set of values that can easily be encoded in a ByteArray. An encrypted
database is most suitable for larger data sets where structured data storage and
querying are desirable. For more information about using the encrypted local
store, see
[Encrypted local storage](../storing-local-data/encrypted-local-storage.md).

## Creating an encrypted database

To use an encrypted database, the database file must be encrypted when it is
created. Once a database is created as unencrypted, it can't be encrypted later.
Likewise, an encrypted database can't be unencrypted later. If needed you can
change the encryption key of an encrypted database. For details, see
[Changing the encryption key of a database](#changing-the-encryption-key-of-a-database).
If you have an existing database that's not encrypted and you want to use
database encryption, you can create a new encrypted database and copy the
existing table structure and data to the new database.

Creating an encrypted database is nearly identical to creating an unencrypted
database, as described in
[Creating a database](./creating-and-modifying-a-database.md#creating-a-database).
You first create a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance that represents the connection to the database. You create the database
by calling the SQLConnection object's `open()` method or `openAsync()` method,
specifying for the database location a file that doesn't exist yet. The only
difference when creating an encrypted database is that you provide a value for
the `encryptionKey` parameter (the `open()` method's fifth parameter and the
`openAsync()` method's sixth parameter).

A valid `encryptionKey` parameter value is a
[ByteArray](https://airsdk.dev/reference/actionscript/3.0/flash/utils/ByteArray.html)
object containing exactly 16 bytes.

The following examples demonstrate creating an encrypted database. For
simplicity, in these examples the encryption key is hard-coded in the
application code. However, this technique is strongly discouraged because it is
not secure.

```
var conn:SQLConnection = new SQLConnection();

var encryptionKey:ByteArray = new ByteArray();
encryptionKey.writeUTFBytes("Some16ByteString"); // This technique is not secure!

// Create an encrypted database in asynchronous mode
conn.openAsync(dbFile, SQLMode.CREATE, null, false, 1024, encryptionKey);

// Create an encrypted database in synchronous mode
conn.open(dbFile, SQLMode.CREATE, false, 1024, encryptionKey);
```

For an example demonstrating a recommended way to generate an encryption key,
see
[Example: Generating and using an encryption key](#example-generating-and-using-an-encryption-key).

## Connecting to an encrypted database

Like creating an encrypted database, the procedure for opening a connection to
an encrypted database is like connecting to an unencrypted database. That
procedure is described in greater detail in
[Connecting to a database](./connecting-to-a-database.md). You use the `open()`
method to
[open a connection in synchronous execution mode](<https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html#open()>),
or the `openAsync()` method to
[open a connection in asynchronous execution mode](<https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html#openAsync()>).
The only difference is that to open an encrypted database, you specify the
correct value for the `encryptionKey` parameter (the `open()` method's fifth
parameter and the `openAsync()` method's sixth parameter).

If the encryption key that's provided is not correct, an error occurs. For the
`open()` method, a
[SQLError](https://airsdk.dev/reference/actionscript/3.0/flash/errors/SQLError.html)
exception is thrown. For the `openAsync()` method, the
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
object dispatches a
[SQLErrorEvent](https://airsdk.dev/reference/actionscript/3.0/flash/events/SQLErrorEvent.html),
whose `error` property contains a
[SQLError](https://airsdk.dev/reference/actionscript/3.0/flash/errors/SQLError.html)
object. In either case, the SQLError object generated by the exception has the
`errorID` property value 3138. That error ID corresponds to the error message
"File opened is not a database file."

The following example demonstrates opening an encrypted database in asynchronous
execution mode. For simplicity, in this example the encryption key is hard-coded
in the application code. However, this technique is strongly discouraged because
it is not secure.

```
import flash.data.SQLConnection;
import flash.data.SQLMode;
import flash.events.SQLErrorEvent;
import flash.events.SQLEvent;
import flash.filesystem.File;

var conn:SQLConnection = new SQLConnection();
conn.addEventListener(SQLEvent.OPEN, openHandler);
conn.addEventListener(SQLErrorEvent.ERROR, errorHandler);
var dbFile:File = File.applicationStorageDirectory.resolvePath("DBSample.db");

var encryptionKey:ByteArray = new ByteArray();
encryptionKey.writeUTFBytes("Some16ByteString"); // This technique is not secure!

conn.openAsync(dbFile, SQLMode.UPDATE, null, false, 1024, encryptionKey);

function openHandler(event:SQLEvent):void
{
	trace("the database opened successfully");
}

function errorHandler(event:SQLErrorEvent):void
{
	if (event.error.errorID == 3138)
	{
		trace("Incorrect encryption key");
	}
	else
	{
		trace("Error message:", event.error.message);
		trace("Details:", event.error.details);
	}
}
```

The following example demonstrates opening an encrypted database in synchronous
execution mode. For simplicity, in this example the encryption key is hard-coded
in the application code. However, this technique is strongly discouraged because
it is not secure.

```
import flash.data.SQLConnection;
import flash.data.SQLMode;
import flash.filesystem.File;

var conn:SQLConnection = new SQLConnection();
var dbFile:File = File.applicationStorageDirectory.resolvePath("DBSample.db");

var encryptionKey:ByteArray = new ByteArray();
encryptionKey.writeUTFBytes("Some16ByteString"); // This technique is not secure!

try
{
	conn.open(dbFile, SQLMode.UPDATE, false, 1024, encryptionKey);
	trace("the database was created successfully");
}
catch (error:SQLError)
{
	if (error.errorID == 3138)
	{
		trace("Incorrect encryption key");
	}
	else
	{
		trace("Error message:", error.message);
		trace("Details:", error.details);
	}
}
```

For an example demonstrating a recommended way to generate an encryption key,
see
[Example: Generating and using an encryption key](#example-generating-and-using-an-encryption-key).

## Changing the encryption key of a database

When a database is encrypted, you can change the encryption key for the database
at a later time. To change a database's encryption key, first open a connection
to the database by creating a
[SQLConnection](https://airsdk.dev/reference/actionscript/3.0/flash/data/SQLConnection.html)
instance and calling its `open()` or `openAsync()` method. Once the database is
connected, call the `reencrypt()` method, passing the new encryption key as an
argument.

Like most database operations, the `reencrypt()` method's behavior varies
depending on whether the database connection uses synchronous or asynchronous
execution mode. If you use the `open()` method to connect to the database, the
`reencrypt()` operation runs synchronously. When the operation finishes,
execution continues with the next line of code:

```
var newKey:ByteArray = new ByteArray();
// ... generate the new key and store it in newKey
conn.reencrypt(newKey);
```

On the other hand, if the database connection is opened using the `openAsync()`
method, the `reencrypt()` operation is asynchronous. Calling `reencrypt()`
begins the reencryption process. When the operation completes, the SQLConnection
object dispatches a `reencrypt` event. You use an event listener to determine
when the reencryption finishes:

```
var newKey:ByteArray = new ByteArray();
// ... generate the new key and store it in newKey

conn.addEventListener(SQLEvent.REENCRYPT, reencryptHandler);

conn.reencrypt(newKey);

function reencryptHandler(event:SQLEvent):void
{
	// save the fact that the key changed
}
```

The `reencrypt()` operation runs in its own transaction. If the operation is
interrupted or fails (for example, if the application is closed before the
operation finishes) the transaction is rolled back. In that case, the original
encryption key is still the encryption key for the database.

The `reencrypt()` method can't be used to remove encryption from a database.
Passing a `null` value or encryption key that's not a 16-byte ByteArray to the
`reencrypt()` method results in an error.

## Considerations for using encryption with a database

The section [Uses for an encrypted database](#uses-for-an-encrypted-database)
presents several cases in which you would want to use an encrypted database.
It's obvious that the usage scenarios of different applications (including these
and other scenarios) have different privacy requirements. The way you architect
the use of encryption in your application plays an important part in controlling
how private a database's data is. For example, if you are using an encrypted
database to keep personal data private, even from other users of the same
machine, then each user's database needs its own encryption key. For the
greatest security, your application can generate the key from a user-entered
password. Basing the encryption key on a password ensures that even if another
person is able to impersonate the user's account on the machine, the data still
can't be accessed. On the other end of the privacy spectrum, suppose you want a
database file to be readable by any user of your application but not to other
applications. In that case every installed copy of the application needs access
to a shared encryption key.

You can design your application, and in particular the technique used to
generate the encryption key, according to the level of privacy that you want for
your application data. The following list provides design suggestions for
various levels of data privacy:

- To make a database accessible to any user who has access to the application on
  any machine, use a single key that's available to all instances of the
  application. For example, the first time an application runs it can download
  the shared encryption key from a server using a secure protocol such as SSL.
  It can then save the key in the encrypted local store for future use. As an
  alternative, encrypt the data per-user on the machine, and synchronize the
  data with a remote data store such as a server to make the data portable.

- To make a database accessible to a single user on any machine, generate the
  encryption key from a user secret (such as a password). In particular, do not
  use any value that's tied to a particular computer (such as a value stored in
  the encrypted local store) to generate the key. As an alternative, encrypt the
  data per-user on the machine, and synchronize the data with a remote data
  store such as a server to make the data portable.

- To make a database accessible only to a single individual on a single machine,
  generate the key from a password and a generated salt. For an example of this
  technique, see
  [Example: Generating and using an encryption key](#example-generating-and-using-an-encryption-key).

The following are additional security considerations that are important to keep
in mind when designing an application to use an encrypted database:

- A system is only as secure as its weakest link. If you are using a
  user-entered password to generate an encryption key, consider imposing minimum
  length and complexity restrictions on passwords. A short password that uses
  only basic characters can be guessed quickly.

- The source code of an AIR application is stored on a user's machine in plain
  text (for HTML content) or an easily decompilable binary format (for SWF
  content). Because the source code is accessible, two points to remember are:

  - Never hard-code an encryption key in your source code

  - Always assume that the technique used to generate an encryption key (such as
```
random character generator or a particular hashing algorithm) can be easily
worked out by an attacker
```

- AIR database encryption uses the Advanced Encryption Standard (AES) with
  Counter with CBC-MAC (CCM) mode. This encryption cipher requires a
  user-entered key to be combined with a salt value to be secure. For an example
  of this, see
  [Example: Generating and using an encryption key](#example-generating-and-using-an-encryption-key).

- When you elect to encrypt a database, all disk files used by the database
  engine in conjunction with that database are encrypted. However, the database
  engine holds some data temporarily in an in-memory cache to improve read- and
  write-time performance in transactions. Any memory-resident data is
  unencrypted. If an attacker is able to access the memory used by an AIR
  application, for example by using a debugger, the data in a database that is
  currently open and unencrypted would be available.

## Example: Generating and using an encryption key

This example application demonstrates one technique for generating an encryption
key. This application is designed to provide the highest level of privacy and
security for users' data. One important aspect of securing private data is to
require the user to enter a password each time the application connects to the
database. Consequently, as shown in this example, an application that requires
this level of privacy should never directly store the database encryption key.

The application consists of two parts: an ActionScript class that generates an
encryption key (the EncryptionKeyGenerator class), and a basic user interface
that demonstrates how to use that class. For the complete source code, see
[Complete example code for generating and using an encryption key](#example-generating-and-using-an-encryption-key).

### Using the EncryptionKeyGenerator class to obtain a secure encryption key

It isn't necessary to understand the details of how the EncryptionKeyGenerator
class works to use it in your application. If you are interested in the details
of how the class generates an encryption key for a database, see
[Understanding the EncryptionKeyGenerator class](#understanding-the-encryptionkeygenerator-class).

Follow these steps to use the EncryptionKeyGenerator class in your application:

1.  Download the EncryptionKeyGenerator class as source code or a compiled SWC.
	The EncryptionKeyGenerator class is included in the open-source ActionScript
	3.0 core library (as3corelib) project. You can download
	[the as3corelib package including source code and documentation](https://github.com/mikechambers/as3corelib).
	You can also download the SWC or source code files from the project page.

2.  Place the source code for the EncryptionKeyGenerator class (or the
	as3corelib SWC) in a location where your application source code can find
	it.

3.  In your application source code, add an `import` statement for the
	EncryptionKeyGenerator class.

```
import com.adobe.air.crypto.EncryptionKeyGenerator;
```

4.  Before the point where the code creates the database or opens a connection
	to it, add code to create an EncryptionKeyGenerator instance by calling the
	`EncryptionKeyGenerator()` constructor.

```
var keyGenerator:EncryptionKeyGenerator = new EncryptionKeyGenerator();
```

5.  Obtain a password from the user:

```
var password:String = passwordInput.text;

if (!keyGenerator.validateStrongPassword(password))
{
	// display an error message
	return;
}
```

	The EncryptionKeyGenerator instance uses this password as the basis for the
	encryption key (shown in the next step). The EncryptionKeyGenerator instance
	tests the password against certain strong password validation requirements.
	If the validation fails, an error occurs. As the example code shows, you can
	check the password ahead of time by calling the EncryptionKeyGenerator
	object's `validateStrongPassword()` method. That way you can determine
	whether the password meets the minimum requirements for a strong password
	and avoid an error.

6.  Generate the encryption key from the password:

```
var encryptionKey:ByteArray = keyGenerator.getEncryptionKey(password);
```

	The `getEncryptionKey()` method generates and returns the encryption key (a
	16-byte ByteArray). You can then use the encryption key to create your new
	encrypted database or open your existing one.

	The `getEncryptionKey()` method has one required parameter, which is the
	password obtained in step 5.

	Note: To maintain the highest level of security and privacy for data, an
	application must require the user to enter a password each time the
	application connects to the database. Do not store the user's password or
	the database encryption key directly. Doing so exposes security risks.
	Instead, as demonstrated in this example, an application should use the same
	technique to derive the encryption key from the password both when creating
	the encrypted database and when connecting to it later.

	The `getEncryptionKey()` method also accepts a second (optional) parameter,
	the `overrideSaltELSKey` parameter. The EncryptionKeyGenerator creates a
	random value (known as a _salt_ ) that is used as part of the encryption
	key. In order to be able to re-create the encryption key, the salt value is
	stored in the Encrypted Local Store (ELS) of your AIR application. By
	default, the EncryptionKeyGenerator class uses a particular String as the
	ELS key. Although unlikely, it's possible that the key can conflict with
	another key your application uses. Instead of using the default key, you
	might want to specify your own ELS key. In that case, specify a custom key
	by passing it as the second `getEncryptionKey()` parameter, as shown here:

```
var customKey:String = "My custom ELS salt key";
var encryptionKey:ByteArray = keyGenerator.getEncryptionKey(password, customKey);
```

7.  Create or open the database

	With an encryption key returned by the `getEncryptionKey()` method, your
	code can create a new encrypted database or attempt to open the existing
	encrypted database. In either case you use the SQLConnection class's
	`open()` or `openAsync()` method, as described in
	[Creating an encrypted database](#creating-an-encrypted-database) and
	[Connecting to an encrypted database](#connecting-to-an-encrypted-database).

	In this example, the application is designed to open the database in
	asynchronous execution mode. The code sets up the appropriate event
	listeners and calls the `openAsync()` method, passing the encryption key as
	the final argument:

```
conn.addEventListener(SQLEvent.OPEN, openHandler);
conn.addEventListener(SQLErrorEvent.ERROR, openError);

conn.openAsync(dbFile, SQLMode.CREATE, null, false, 1024, encryptionKey);
```

	In the listener methods, the code removes the event listener registrations.
	It then displays a status message indicating whether the database was
	created, opened, or whether an error occurred. The most noteworthy part of
	these event handlers is in the `openError()` method. In that method an `if`
	statement checks if the database exists (meaning that the code is attempting
	to connect to an existing database) and if the error ID matches the constant
	`EncryptionKeyGenerator.ENCRYPTED_DB_PASSWORD_ERROR_ID`. If both of these
	conditions are true, it probably means that the password the user entered is
	incorrect. (It could also mean that the specified file isn't a database file
	at all.) The following is the code that checks the error ID:

```
if (!createNewDB && event.error.errorID == EncryptionKeyGenerator.ENCRYPTED_DB_PASSWORD_ERROR_ID)
{
	statusMsg.text = "Incorrect password!";
}
else
{
	statusMsg.text = "Error creating or opening database.";
}
```

	For the complete code for the example event listeners, see
	[Complete example code for generating and using an encryption key](#complete-example-code-for-generating-and-using-an-encryption-key).

### Complete example code for generating and using an encryption key

The following is the complete code for the example application "Generating and
using an encryption key." The code consists of two parts.

The example uses the EncryptionKeyGenerator class to create an encryption key
from a password. The EncryptionKeyGenerator class is included in the open-source
ActionScript 3.0 core library (as3corelib) project. You can download
[the as3corelib package including source code and documentation](https://github.com/mikechambers/as3corelib).
You can also download the SWC or source code files from the project page.

#### Flex example

The application MXML file contains the source code for a simple application that
creates or opens a connection to an encrypted database:

```
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="https://www.adobe.com/2006/mxml" layout="vertical" creationComplete="init();">
	<mx:Script>
	<![CDATA[
		import com.adobe.air.crypto.EncryptionKeyGenerator;

		private const dbFileName:String = "encryptedDatabase.db";

		private var dbFile:File;
		private var createNewDB:Boolean = true;
		private var conn:SQLConnection;

		// ------- Event handling -------

		private function init():void
		{
			conn = new SQLConnection();
			dbFile = File.applicationStorageDirectory.resolvePath(dbFileName);
			if (dbFile.exists)
			{
				createNewDB = false;
				instructions.text = "Enter your database password to open the encrypted database.";
				openButton.label = "Open Database";
			}
		}

		private function openConnection():void
		{
			var password:String = passwordInput.text;

			var keyGenerator:EncryptionKeyGenerator = new EncryptionKeyGenerator();

			if (password == null || password.length <= 0)
			{
				statusMsg.text = "Please specify a password.";
				return;
			}

			if (!keyGenerator.validateStrongPassword(password))
			{
				statusMsg.text = "The password must be 8-32 characters long. It must contain at least one lowercase letter, at least one uppercase letter, and at least one number or symbol.";
				return;
			}

			passwordInput.text = "";
			passwordInput.enabled = false;
			openButton.enabled = false;

			var encryptionKey:ByteArray = keyGenerator.getEncryptionKey(password);

			conn.addEventListener(SQLEvent.OPEN, openHandler);
			conn.addEventListener(SQLErrorEvent.ERROR, openError);

			conn.openAsync(dbFile, SQLMode.CREATE, null, false, 1024, encryptionKey);
		}

		private function openHandler(event:SQLEvent):void
		{
			conn.removeEventListener(SQLEvent.OPEN, openHandler);
			conn.removeEventListener(SQLErrorEvent.ERROR, openError);

			statusMsg.setStyle("color", 0x009900);
			if (createNewDB)
			{
				statusMsg.text = "The encrypted database was created successfully.";
			}
			else
			{
				statusMsg.text = "The encrypted database was opened successfully.";
			}
		}

		private function openError(event:SQLErrorEvent):void
		{
			conn.removeEventListener(SQLEvent.OPEN, openHandler);
			conn.removeEventListener(SQLErrorEvent.ERROR, openError);

			if (!createNewDB && event.error.errorID == EncryptionKeyGenerator.ENCRYPTED_DB_PASSWORD_ERROR_ID)
			{
				statusMsg.text = "Incorrect password!";
			}
			else
			{
				statusMsg.text = "Error creating or opening database.";
			}
		}
	]]>
	</mx:Script>
	<mx:Text id="instructions" text="Enter a password to create an encrypted database. The next time you open the application, you will need to re-enter the password to open the database again." width="75%" height="65"/>
	<mx:HBox>
		<mx:TextInput id="passwordInput" displayAsPassword="true"/>
		<mx:Button id="openButton" label="Create Database" click="openConnection();"/>
	</mx:HBox>
	<mx:Text id="statusMsg" color="#990000" width="75%"/>
</mx:WindowedApplication>
```

#### Flash Professional example

The application FLA file contains the source code for a simple application that
creates or opens a connection to an encrypted database. The FLA file has four
components placed on the stage:

| Instance name   | Component type | Description                                        |
| --------------- | -------------- | -------------------------------------------------- |
| `instructions`  | Label          | Contains the instructions given to the user        |
| `passwordInput` | TextInput      | Input field where the user enters the password     |
| `openButton`    | Button         | Button the user clicks after entering the password |
| `statusMsg`     | Label          | Displays status (success or failure) messages      |

The code for the application is defined on a keyframe on frame 1 of the main
timeline. The following is the code for the application:

```
import com.adobe.air.crypto.EncryptionKeyGenerator;

const dbFileName:String = "encryptedDatabase.db";

var dbFile:File;
var createNewDB:Boolean = true;
var conn:SQLConnection;

init();

// ------- Event handling -------

function init():void
{
	passwordInput.displayAsPassword = true;
	openButton.addEventListener(MouseEvent.CLICK, openConnection);
	statusMsg.setStyle("textFormat", new TextFormat(null, null, 0x990000));

	conn = new SQLConnection();
	dbFile = File.applicationStorageDirectory.resolvePath(dbFileName);

	if (dbFile.exists)
	{
		createNewDB = false;
		instructions.text = "Enter your database password to open the encrypted database.";
		openButton.label = "Open Database";
	}
	else
	{
		instructions.text = "Enter a password to create an encrypted database. The next time you open the application, you will need to re-enter the password to open the database again.";
		openButton.label = "Create Database";
	}
}

function openConnection(event:MouseEvent):void
{
	var keyGenerator:EncryptionKeyGenerator = new EncryptionKeyGenerator();

	var password:String = passwordInput.text;

	if (password == null || password.length <= 0)
	{
		statusMsg.text = "Please specify a password.";
		return;
	}

	if (!keyGenerator.validateStrongPassword(password))
	{
		statusMsg.text = "The password must be 8-32 characters long. It must contain at least one lowercase letter, at least one uppercase letter, and at least one number or symbol.";
		return;
	}

	passwordInput.text = "";
	passwordInput.enabled = false;
	openButton.enabled = false;

	var encryptionKey:ByteArray = keyGenerator.getEncryptionKey(password);

	conn.addEventListener(SQLEvent.OPEN, openHandler);
	conn.addEventListener(SQLErrorEvent.ERROR, openError);

	conn.openAsync(dbFile, SQLMode.CREATE, null, false, 1024, encryptionKey);
}

function openHandler(event:SQLEvent):void
{
	conn.removeEventListener(SQLEvent.OPEN, openHandler);
	conn.removeEventListener(SQLErrorEvent.ERROR, openError);

	statusMsg.setStyle("textFormat", new TextFormat(null, null, 0x009900));
	if (createNewDB)
	{
		statusMsg.text = "The encrypted database was created successfully.";
	}
	else
	{
		statusMsg.text = "The encrypted database was opened successfully.";
	}
}

function openError(event:SQLErrorEvent):void
{
	conn.removeEventListener(SQLEvent.OPEN, openHandler);
	conn.removeEventListener(SQLErrorEvent.ERROR, openError);

	if (!createNewDB && event.error.errorID == EncryptionKeyGenerator.ENCRYPTED_DB_PASSWORD_ERROR_ID)
	{
		statusMsg.text = "Incorrect password!";
	}
	else
	{
		statusMsg.text = "Error creating or opening database.";
	}
}
```

### Understanding the EncryptionKeyGenerator class

It isn't necessary to understand the inner workings of the
EncryptionKeyGenerator class to use it to create a secure encryption key for
your application database. The process for using the class is explained in
[Using the EncryptionKeyGenerator class to obtain a secure encryption key](#using-the-encryptionkeygenerator-class-to-obtain-a-secure-encryption-key).
However, you might find it valuable to understand the techniques that the class
uses. For example, you might want to adapt the class or incorporate some of its
techniques for situations where a different level of data privacy is desired.

The EncryptionKeyGenerator class is included in the open-source ActionScript 3.0
core library (as3corelib) project. You can download
[the as3corelib package including source code and documentation](https://github.com/mikechambers/as3corelib).You
can also view the source code on the project site or download it to follow along
with the explanations.

When code creates an EncryptionKeyGenerator instance and calls its
`getEncryptionKey()` method, several steps are taken to ensure that only the
rightful user can access the data. The process is the same to generate an
encryption key from a user-entered password before the database is created as
well as to re-create the encryption key to open the database.

#### Obtain and validate a strong password

When code calls the `getEncryptionKey()` method, it passes in a password as a
parameter. The password is used as the basis for the encryption key. By using a
piece of information that only the user knows, this design ensures that only the
user who knows the password can access the data in the database. Even if an
attacker accesses the user's account on the computer, the attacker can't get
into the database without knowing the password. For maximum security, the
application never stores the password.

An application's code creates an EncryptionKeyGenerator instance and calls its
`getEncryptionKey()` method, passing a user-entered password as an argument (the
variable `password` in this example):

```
var keyGenerator:EncryptionKeyGenerator = new EncryptionKeyGenerator();
var encryptionKey:ByteArray = keyGenerator.getEncryptionKey(password);
```

The first step the EncryptionKeyGenerator class takes when the
`getEncryptionKey()` method is called is to check the user-entered password to
ensure that it meets the password strength requirements. The
EncryptionKeyGenerator class requires a password to be 8 - 32 characters long.
The password must contain a mix of uppercase and lowercase letters and at least
one number or symbol character.

The regular expression that checks this pattern is defined as a constant named
`STRONG_PASSWORD_PATTERN`:

```
private static const STRONG_PASSWORD_PATTERN:RegExp = /(?=^.{8,32}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
```

The code that checks the password is in the EncryptionKeyGenerator class's
`validateStrongPassword()` method. The code is as follows:

```
public function vaidateStrongPassword(password:String):Boolean
{
	if (password == null || password.length <= 0)
	{
		return false;
	}

	return STRONG_PASSWORD_PATTERN.test(password))
}
```

Internally the `getEncryptionKey()` method calls the EncryptionKeyGenerator
class's `validateStrongPassword()` method and, if the password isn't valid,
throws an exception. The `validateStrongPassword()` method is a public method so
that application code can check a password without calling the
`getEncryptionKey()` method to avoid causing an error.

#### Expand the password to 256 bits

Later in the process, the password is required to be 256 bits long. Rather than
require each user to enter a password that's exactly 256 bits (32 characters)
long, the code creates a longer password by repeating the password characters.

The `getEncryptionKey()` method calls the `concatenatePassword()` method to
perform the task of creating the long password.

```
var concatenatedPassword:String = concatenatePassword(password);
```

The following is the code for the `concatenatePassword()` method:

```
private function concatenatePassword(pwd:String):String
{
	var len:int = pwd.length;
	var targetLength:int = 32;

	if (len == targetLength)
	{
		return pwd;
	}

	var repetitions:int = Math.floor(targetLength / len);
	var excess:int = targetLength % len;

	var result:String = "";

	for (var i:uint = 0; i < repetitions; i++)
	{
		result += pwd;
	}

	result += pwd.substr(0, excess);

	return result;
}
```

If the password is less than 256 bits, the code concatenates the password with
itself to make it 256 bits. If the length doesn't work out exactly, the last
repetition is shortened to get exactly 256 bits.

#### Generate or retrieve a 256-bit salt value

The next step is to get a 256-bit salt value that in a later step is combined
with the password. A _salt_ is a random value that is added to or combined with
a user-entered value to form a password. Using a salt with a password ensures
that even if a user chooses a real word or common term as a password, the
password-plus-salt combination that the system uses is a random value. This
randomness helps guard against a dictionary attack, where an attacker uses a
list of words to attempt to guess a password. In addition, by generating the
salt value and storing it in the encrypted local store, it is tied to the user's
account on the machine on which the database file is located.

If the application is calling the `getEncryptionKey()` method for the first
time, the code creates a random 256-bit salt value. Otherwise, the code loads
the salt value from the encrypted local store.

The salt is stored in a variable named `salt`. The code determines if it has
already created a salt by attempting to load the salt from the encrypted local
store:

```
var salt:ByteArray = EncryptedLocalStore.getItem(saltKey);
if (salt == null)
{
	salt = makeSalt();
	EncryptedLocalStore.setItem(saltKey, salt);
}
```

If the code is creating a new salt value, the `makeSalt()` method generates a
256-bit random value. Because the value is eventually stored in the encrypted
local store, it is generated as a ByteArray object. The `makeSalt()` method uses
the `Math.random()` method to randomly generate the value. The `Math.random()`
method can't generate 256 bits at one time. Instead, the code uses a loop to
call `Math.random()` eight times. Each time, a random uint value between 0 and
4294967295 (the maximum uint value) is generated. A uint value is used for
convenience, because a uint uses exactly 32 bits. By writing eight uint values
into the ByteArray, a 256-bit value is generated. The following is the code for
the `makeSalt()` method:

```
private function makeSalt():ByteArray
{
	var result:ByteArray = new ByteArray;

	for (var i:uint = 0; i < 8; i++)
	{
		result.writeUnsignedInt(Math.round(Math.random() * uint.MAX_VALUE));
	}

	return result;
}
```

When the code is saving the salt to the Encrypted Local Store (ELS) or
retrieving the salt from the ELS, it needs a String key under which the salt is
saved. Without knowing the key, the salt value can't be retrieved. In that case,
the encryption key can't be re-created each time to reopen the database. By
default, the EncryptionKeyGenerator uses a predefined ELS key that is defined in
the constant `SALT_ELS_KEY`. Instead of using the default key, application code
can also specify an ELS key to use in the call to the `getEncryptionKey()`
method. Either the default or the application-specified salt ELS key is stored
in a variable named `saltKey`. That variable is used in the calls to
`EncryptedLocalStore.setItem()` and `EncryptedLocalStore.getItem()`, as shown
previously.

#### Combine the 256-bit password and salt using the XOR operator

The code now has a 256-bit password and a 256-bit salt value. It next uses a
bitwise XOR operation to combine the salt and the concatenated password into a
single value. In effect, this technique creates a 256-bit password consisting of
characters from the entire range of possible characters. This principle is true
even though most likely the actual password input consists of primarily
alphanumeric characters. This increased randomness provides the benefit of
making the set of possible passwords large without requiring the user to enter a
long complex password.

The result of the XOR operation is stored in the variable `unhashedKey`. The
actual process of performing a bitwise XOR on the two values happens in the
`xorBytes()` method:

```
var unhashedKey:ByteArray = xorBytes(concatenatedPassword, salt);
```

The bitwise XOR operator ( `^`) takes two uint values and returns a uint value.
(A uint value contains 32 bits.) The input values passed as arguments to the
`xorBytes()` method are a String (the password) and a ByteArray (the salt).
Consequently, the code uses a loop to extract 32 bits at a time from each input
to combine using the XOR operator.

```
private function xorBytes(passwordString:String, salt:ByteArray):ByteArray
{
	var result:ByteArray = new ByteArray();

	for (var i:uint = 0; i < 32; i += 4)
	{
		// ...
	}

	return result;
}
```

Within the loop, first 32 bits (4 bytes) are extracted from the `passwordString`
parameter. Those bits are extracted and converted into a uint ( `o1`) in a
two-part process. First, the `charCodeAt()` method gets each character's numeric
value. Next, that value is shifted to the appropriate position in the uint using
the bitwise left shift operator ( `<<`) and the shifted value is added to `o1`.
For example, the first character ( `i`) becomes the first 8 bits by using the
bitwise left shift operator ( `<<`) to shift the bits left by 24 bits and
assigning that value to `o1`. The second character `(i + 1`) becomes the second
8 bits by shifting its value left 16 bits and adding the result to `o1`. The
third and fourth characters' values are added the same way.

```
	// ...

	// Extract 4 bytes from the password string and convert to a uint
	var o1:uint = passwordString.charCodeAt(i) << 24;
	o1 += passwordString.charCodeAt(i + 1) << 16;
	o1 += passwordString.charCodeAt(i + 2) << 8;
	o1 += passwordString.charCodeAt(i + 3);

	// ...
```

The variable `o1` now contains 32 bits from the `passwordString` parameter.
Next, 32 bits are extracted from the `salt` parameter by calling its
`readUnsignedInt()` method. The 32 bits are stored in the uint variable `o2`.

```
	// ...

	salt.position = i;
	var o2:uint = salt.readUnsignedInt();

	// ...
```

Finally, the two 32-bit (uint) values are combined using the XOR operator and
the result is written into a ByteArray named `result`.

```
	// ...

	var xor:uint = o1 ^ o2;
	result.writeUnsignedInt(xor);
	// ...
```

Once the loop completes, the ByteArray containing the XOR result is returned.

```
			// ...
	}

	return result;
}
```

#### Hash the key

Once the concatenated password and the salt have been combined, the next step is
to further secure this value by hashing it using the SHA-256 hashing algorithm.
Hashing the value makes it more difficult for an attacker to reverse-engineer
it.

At this point the code has a ByteArray named `unhashedKey` containing the
concatenated password combined with the salt. The ActionScript 3.0 core library
(as3corelib) project includes a SHA256 class in the com.adobe.crypto package.
The `SHA256.hashBytes()` method that performs a SHA-256 hash on a ByteArray and
returns a String containing the 256-bit hash result as a hexadecimal number. The
EncryptionKeyGenerator class uses the SHA256 class to hash the key:

```
var hashedKey:String = SHA256.hashBytes(unhashedKey);
```

#### Extract the encryption key from the hash

The encryption key must be a ByteArray that is exactly 16 bytes (128 bits) long.
The result of the SHA-256 hashing algorithm is always 256 bits long.
Consequently, the final step is to select 128 bits from the hashed result to use
as the actual encryption key.

In the EncryptionKeyGenerator class, the code reduces the key to 128 bits by
calling the `generateEncryptionKey()` method. It then returns that method's
result as the result of the `getEncryptionKey()` method:

```
var encryptionKey:ByteArray = generateEncryptionKey(hashedKey);
return encryptionKey;
```

It isn't necessary to use the first 128 bits as the encryption key. You could
select a range of bits starting at some arbitrary point, you could select every
other bit, or use some other way of selecting bits. The important thing is that
the code selects 128 distinct bits, and that the same 128 bits are used each
time.

In this case, the `generateEncryptionKey()` method uses the range of bits
starting at the 18th byte as the encryption key. As mentioned previously, the
SHA256 class returns a String containing a 256-bit hash as a hexadecimal number.
A single block of 128 bits has too many bytes to add to a ByteArray at one time.
Consequently, the code uses a `for` loop to extract characters from the
hexadecimal String, convert them to actual numeric values, and add them to the
ByteArray. The SHA-256 result String is 64 characters long. A range of 128 bits
equals 32 characters in the String, and each character represents 4 bits. The
smallest increment of data you can add to a ByteArray is one byte (8 bits),
which is equivalent to two characters in the `hash` String. Consequently, the
loop counts from 0 to 31 (32 characters) in increments of 2 characters.

Within the loop, the code first determines the starting position for the current
pair of characters. Since the desired range starts at the character at index
position 17 (the 18th byte), the `position` variable is assigned the current
iterator value ( `i`) plus 17. The code uses the String object's `substr()`
method to extract the two characters at the current position. Those characters
are stored in the variable `hex`. Next, the code uses the `parseInt()` method to
convert the `hex` String to a decimal integer value. It stores that value in the
int variable `byte`. Finally, the code adds the value in `byte` to the `result`
ByteArray using its `writeByte()` method. When the loop finishes, the `result`
ByteArray contains 16 bytes and is ready to use as a database encryption key.

```
private function generateEncryptionKey(hash:String):ByteArray
{
	var result:ByteArray = new ByteArray();

	for (var i:uint = 0; i < 32; i += 2)
	{
		var position:uint = i + 17;
		var hex:String = hash.substr(position, 2);
		var byte:int = parseInt(hex, 16);
		result.writeByte(byte);
	}

	return result;
}
```
