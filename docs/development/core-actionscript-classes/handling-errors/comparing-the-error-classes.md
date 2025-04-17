---
sidebar_position: 8
---

# Comparing the Error classes

ActionScript provides a number of predefined Error classes. But, you can also
use the same Error classes in your own code. There are two main types of Error
classes in ActionScript 3.0: ActionScript core Error classes and flash.error
package Error classes. The flash.error package contains additional classes to
aid ActionScript 3.0 application development and debugging.

## Core Error classes

The core error classes include the Error, ArgumentError, EvalError, RangeError,
ReferenceError, SecurityError, SyntaxError, TypeError, URIError, and VerifyError
classes. Each of these classes are located in the top-level namespace.

<table>
  <thead>
    <tr>
      <th><p>Class name</p></th>
      <th><p>Description</p></th>
      <th><p>Notes</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>Error</p></td>
      <td>
        <p>
          The Error class is for throwing exceptions, and is the base class for
          the other exception classes defined in ECMAScript: EvalError,
          RangeError, ReferenceError, SyntaxError, TypeError, and URIError.
        </p>
      </td>
      <td>
        <p>
          The Error class serves as the base class for all run-time errors, and
          is the recommended base class for any custom error classes.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>ArgumentError</p></td>
      <td>
        <p>
          The ArgumentError class represents an error that occurs when the
          parameter values supplied during a function call do not match the
          parameters defined for that function.
        </p>
      </td>
      <td>
        <p>Some examples of argument errors include the following:</p>
        <ul class="incremental">
          <li>
            <p>Too few or too many arguments are supplied to a method.</p>
          </li>
          <li>
            <p>
              An argument was expected to be a member of an enumeration and was
              not.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>EvalError</p></td>
      <td>
        <p>
          An EvalError exception is thrown if any parameters are passed to the
          Function class's constructor or if user code calls the
          <samp>eval()</samp> function.
        </p>
      </td>
      <td>
        <p>
          In ActionScript 3.0, support for the <samp>eval()</samp> function has
          been removed and attempts to use the function result in an error.
        </p>
        <p>
          Earlier versions of Flash Player used the <samp>eval()</samp> function
          to access variables, properties, objects, or movie clips by name.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>RangeError</p></td>
      <td>
        <p>
          A RangeError exception is thrown if a numeric value falls outside an
          acceptable range.
        </p>
      </td>
      <td>
        <p>
          For example, a RangeError is thrown by the Timer class if a delay was
          either negative or was not finite. A RangeError could also be thrown
          if you attempted to add a display object at an invalid depth.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>ReferenceError</p></td>
      <td>
        <p>
          A ReferenceError exception is thrown when a reference to an undefined
          property is attempted on a sealed (nondynamic) object. Versions of the
          ActionScript compiler before ActionScript 3.0 did not throw an error
          when access was attempted to a property that was
          <samp>undefined</samp>. However ActionScript 3.0 throws the
          ReferenceError exception in this condition.
        </p>
      </td>
      <td>
        <p>
          Exceptions for undefined variables point to potential bugs, helping
          you improve software quality. However, if you are not used to having
          to initialize your variables, this new ActionScript behavior requires
          some changes in your coding habits.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>SecurityError</p></td>
      <td>
        <p>
          The SecurityError exception is thrown when a security violation takes
          place and access is denied.
        </p>
      </td>
      <td>
        <p>Some examples of security errors include the following:</p>
        <ul class="incremental">
          <li>
            <p>
              An unauthorized property access or method call is made across a
              security sandbox boundary.
            </p>
          </li>
          <li>
            <p>
              An attempt was made to access a URL not permitted by the security
              sandbox.
            </p>
          </li>
          <li>
            <p>
              A socket connection was attempted to a port but the necessary
              socket policy file wasn't present.
            </p>
          </li>
          <li>
            <p>
              An attempt was made to access the user's camera or microphone, and
              the user denide the access to the device.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>SyntaxError</p></td>
      <td>
        <p>
          A SyntaxError exception is thrown when a parsing error occurs in your
          ActionScript code.
        </p>
      </td>
      <td>
        <p>A SyntaxError can be thrown under the following circumstances:</p>
        <ul class="incremental">
          <li>
            <p>
              ActionScript throws SyntaxError exceptions when the RegExp class
              parses an invalid regular expression.
            </p>
          </li>
          <li>
            <p>
              ActionScript throws SyntaxError exceptions when the XMLDocument
              class parses invalid XML.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>TypeError</p></td>
      <td>
        <p>
          The TypeError exception is thrown when the actual type of an operand
          is different from the expected type.
        </p>
      </td>
      <td>
        <p>A TypeError can be thrown under the following circumstances:</p>
        <ul class="incremental">
          <li>
            <p>
              An actual parameter of a function or method could not be coerced
              to the formal parameter type.
            </p>
          </li>
          <li>
            <p>
              A value is assigned to a variable and cannot be coerced to the
              variable's type.
            </p>
          </li>
          <li>
            <p>
              The right side of the <samp>is</samp> or
              <samp>instanceof</samp> operator is not a valid type.
            </p>
          </li>
          <li>
            <p>The <samp>super</samp> keyword is used illegally.</p>
          </li>
          <li>
            <p>
              A property lookup results in more than one binding, and is
              therefore ambiguous.
            </p>
          </li>
          <li>
            <p>
              A method is called on an incompatible object. For example, a
              TypeError exception is thrown if a method in the RegExp class is
              "grafted" onto a generic object and then called.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>URIError</p></td>
      <td>
        <p>
          The URIError exception is thrown when one of the global URI handling
          functions is used in a way that is incompatible with its definition.
        </p>
      </td>
      <td>
        <p>A URIError can be thrown under the following circumstances:</p>
        <p>
          An invalid URI is specified for a Flash Player API function that
          expects a valid URI, such as <samp>Socket.connect()</samp>.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>VerifyError</p></td>
      <td>
        <p>
          A VerifyError exception is thrown when a malformed or corrupted SWF
          file is encountered.
        </p>
      </td>
      <td>
        <p>
          When a SWF file loads another SWF file, the parent SWF file can catch
          a VerifyError generated by the loaded SWF file.
        </p>
      </td>
    </tr>
  </tbody>
</table>


## flash.error package Error classes

The flash.error package contains Error classes that are considered part of the
Flash runtime API. In contrast to the Error classes described, the flash.error
package communicates errors events that are specific to Flash runtimes (such as
Flash Player and Adobe AIR).

<table>
  <thead>
    <tr>
      <th><p>Class name</p></th>
      <th><p>Description</p></th>
      <th><p>Notes</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>EOFError</p></td>
      <td>
        <p>
          An EOFError exception is thrown when you attempt to read past the end
          of the available data.
        </p>
      </td>
      <td>
        <p>
          For example, an EOFError is thrown when one of the read methods in the
          IDataInput interface is called and there is insufficient data to
          satisfy the read request.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>IllegalOperationError</p></td>
      <td>
        <p>
          An IllegalOperationError exception is thrown when a method is not
          implemented or the implementation doesn't cover the current usage.
        </p>
      </td>
      <td>
        <p>
          Examples of illegal operation error exceptions include the following:
        </p>
        <ul class="incremental">
          <li>
            <p>
              A base class, such as DisplayObjectContainer, provides more
              functionality than the Stage can support. For example, if you
              attempt to get or set a mask on the Stage (using
              <samp>stage.mask</samp>), the Flash runtime throws an
              IllegalOperationError with the message "The Stage class does not
              implement this property or method."
            </p>
          </li>
          <li>
            <p>
              A subclass inherits a method it does not require and does not want
              to support.
            </p>
          </li>
          <li>
            <p>
              Certain accessibility methods are called when Flash Player is
              compiled without accessibility support.
            </p>
          </li>
          <li>
            <p>
              Authoring-only features are called from a run-time version of
              Flash Player.
            </p>
          </li>
          <li>
            <p>
              You attempt to set the name of an object placed on the timeline.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>IOError</p></td>
      <td>
        <p>
          An IOError exception is thrown when some type of I/O exception occurs.
        </p>
      </td>
      <td>
        <p>
          You get this error, for example, when a read-write operation is
          attempted on a socket that is not connected or that has become
          disconnected.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>MemoryError</p></td>
      <td>
        <p>
          A MemoryError exception is thrown when a memory allocation request
          fails.
        </p>
      </td>
      <td>
        <p>
          By default, ActionScript Virtual Machine 2 does not impose a limit on
          how much memory an ActionScript program allocates. On a desktop
          system, memory allocation failures are infrequent. You see an error
          thrown when the system is unable to allocate the memory required for
          an operation. So, on a desktop system, this exception is rare unless
          an allocation request is extremely large; for example, a request for 3
          billion bytes is impossible because a 32-bit Microsoft® Windows®
          program can access only 2 GB of address space.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>ScriptTimeoutError</p></td>
      <td>
        <p>
          A ScriptTimeoutError exception is thrown when a script timeout
          interval of 15 seconds is reached. By catching a ScriptTimeoutError
          exception, you can handle the script timeout more gracefully. If there
          is no exception handler, the uncaught exception handler displays a
          dialog box with an error message.
        </p>
      </td>
      <td>
        <p>
          To prevent a malicious developer from catching the exception and
          staying in an infinite loop, only the first ScriptTimeoutError
          exception thrown in the course of a particular script can be caught. A
          subsequent ScriptTimeoutError exception cannot be caught by your code
          and immediately goes to the uncaught exception handler.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>StackOverflowError</p></td>
      <td>
        <p>
          The StackOverflowError exception is thrown when the stack available to
          the script has been exhausted.
        </p>
      </td>
      <td>
        <p>
          A StackOverflowError exception might indicate that infinite recursion
          has occurred.
        </p>
      </td>
    </tr>
  </tbody>
</table>
