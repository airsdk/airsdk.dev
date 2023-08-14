---
sidebar_position: 1
---

# AGAL bytecode format

AGAL bytecode must use Endian.LITTLE_ENDIAN format.

#### Bytecode Header

AGAL bytecode must begin with a 7-byte header:

    A0 01000000 A1 00 -- for a vertex program
    A0 01000000 A1 01 -- for a fragment program

| Offset (bytes) | Size (bytes) | Name           | Description                                      |
| -------------- | ------------ | -------------- | ------------------------------------------------ |
| 0              | 1            | magic          | must be 0xa0                                     |
| 1              | 4            | version        | must be 1                                        |
| 5              | 1            | shader type ID | must be 0xa1                                     |
| 6              | 1            | shader type    | 0 for a vertex program; 1 for a fragment program |

#### Tokens

The header is immediately followed by any number of tokens. Every token is 192
bits (24 bytes) in size and always has the format:

`[opcode][destination][source1][source2 or sampler]`

Not every opcode uses all of these fields. Unused fields must be set to 0.

#### Operation codes

The \[opcode\] field is 32 bits in size and can take one of these values:

<table>
<thead>
    <tr>
        <th><p>Name</p></th>
        <th><p>Opcode</p></th>
        <th><p>Operation</p></th>
        <th><p>Description</p></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><p>mov</p></td>
        <td><p>0x00</p></td>
        <td><p>move</p></td>
        <td><p>move data from source1 to destination, component-wise</p></td>
    </tr>
    <tr>
        <td><p>add</p></td>
        <td><p>0x01</p></td>
        <td><p>add</p></td>
        <td><p>destination = source1 + source2, component-wise</p></td>
    </tr>
    <tr>
        <td><p>sub</p></td>
        <td><p>0x02</p></td>
        <td><p>subtract</p></td>
        <td><p>destination = source1 - source2, component-wise</p></td>
    </tr>
    <tr>
        <td><p>mul</p></td>
        <td><p>0x03</p></td>
        <td><p>multiply</p></td>
        <td><p>destination = source1 * source2, component-wise</p></td>
    </tr>
    <tr>
        <td><p>div</p></td>
        <td><p>0x04</p></td>
        <td><p>divide</p></td>
        <td><p>destination = source1 / source2, component-wise</p></td>
    </tr>
    <tr>
        <td><p>rcp</p></td>
        <td><p>0x05</p></td>
        <td><p>reciprocal</p></td>
        <td><p>destination = 1/source1, component-wise</p></td>
    </tr>
    <tr>
        <td><p>min</p></td>
        <td><p>0x06</p></td>
        <td><p>minimum</p></td>
        <td><p>destination = minimum(source1,source2), component-wise</p></td>
    </tr>
    <tr>
        <td><p>max</p></td>
        <td><p>0x07</p></td>
        <td><p>maximum</p></td>
        <td><p>destination = maximum(source1,source2), component-wise</p></td>
    </tr>
    <tr>
        <td><p>frc</p></td>
        <td><p>0x08</p></td>
        <td><p>fractional</p></td>
        <td><p>destination = source1 - (float)floor(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>sqt</p></td>
        <td><p>0x09</p></td>
        <td><p>square root</p></td>
        <td><p>destination = sqrt(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>rsq</p></td>
        <td><p>0x0a</p></td>
        <td><p>reciprocal root</p></td>
        <td><p>destination = 1/sqrt(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>pow</p></td>
        <td><p>0x0b</p></td>
        <td><p>power</p></td>
        <td><p>destination = pow(source1,source2), component-wise</p></td>
    </tr>
    <tr>
        <td><p>log</p></td>
        <td><p>0x0c</p></td>
        <td><p>logarithm</p></td>
        <td><p>destination = log_2(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>exp</p></td>
        <td><p>0x0d</p></td>
        <td><p>exponential</p></td>
        <td><p>destination = 2^source1, component-wise</p></td>
    </tr>
    <tr>
        <td><p>nrm</p></td>
        <td><p>0x0e</p></td>
        <td><p>normalize</p></td>
        <td><p>destination = normalize(source1), component-wise (produces only a 3 component result, destination must be masked to .xyz or less)</p></td>
    </tr>
    <tr>
        <td><p>sin</p></td>
        <td><p>0x0f</p></td>
        <td><p>sine</p></td>
        <td><p>destination = sin(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>cos</p></td>
        <td><p>0x10</p></td>
        <td><p>cosine</p></td>
        <td><p>destination = cos(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>crs</p></td>
        <td><p>0x11</p></td>
        <td><p>cross product</p></td>
        <td>
            <p>destination.x = source1.y * source2.z - source1.z * source2.y</p>
            <p>destination.y = source1.z * source2.x - source1.x * source2.z</p>
            <p>destination.z = source1.x * source2.y - source1.y * source2.x</p>
            <p>(produces only a 3 component result, destination must be masked to .xyz or less)</p>
        </td>
    </tr>
    <tr>
        <td><p>dp3</p></td>
        <td><p>0x12</p></td>
        <td><p>dot product</p></td>
        <td><p>destination = source1.x*source2.x + source1.y*source2.y + source1.z*source2.z</p></td>
    </tr>
    <tr>
        <td><p>dp4</p></td>
        <td><p>0x13</p></td>
        <td><p>dot product</p></td>
        <td><p>destination = source1.x*source2.x + source1.y*source2.y + source1.z*source2.z + source1.w*source2.w</p></td>
    </tr>
    <tr>
        <td><p>abs</p></td>
        <td><p>0x14</p></td>
        <td><p>absolute</p></td>
        <td><p>destination = abs(source1), component-wise</p></td>
    </tr>
    <tr>
        <td><p>neg</p></td>
        <td><p>0x15</p></td>
        <td><p>negate</p></td>
        <td><p>destination = -source1, component-wise</p></td>
    </tr>
    <tr>
        <td><p>sat</p></td>
        <td><p>0x16</p></td>
        <td><p>saturate</p></td>
        <td><p>destination = maximum(minimum(source1,1),0), component-wise</p></td>
    </tr>
    <tr>
        <td><p>m33</p></td>
        <td><p>0x17</p></td>
        <td><p>multiply matrix 3x3</p></td>
        <td>
            <p>destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z)</p>
            <p>destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z)</p>
            <p>destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z)</p>
            <p>(produces only a 3 component result, destination must be masked to .xyz or less)</p>
        </td>
    </tr>
    <tr>
        <td><p>m44</p></td>
        <td><p>0x18</p></td>
        <td><p>multiply matrix 4x4</p></td>
        <td>
            <p>destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z) + (source1.w * source2[0].w)</p>
            <p>destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z) + (source1.w * source2[1].w)</p>
            <p>destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z) + (source1.w * source2[2].w)</p>
            <p>destination.w = (source1.x * source2[3].x) + (source1.y * ource2[3].y) + (source1.z * source2[3].z) + (source1.w * source2[3].w)</p>
        </td>
    </tr>
    <tr>
        <td><p>m34</p></td>
        <td><p>0x19</p></td>
        <td><p>multiply matrix 3x4</p></td>
        <td>
            <p>destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z) + (source1.w * source2[0].w)</p>
            <p>destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z) + (source1.w * source2[1].w)</p>
            <p>destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z) + (source1.w *
        source2[2].w)</p>
            <p>(produces only a 3 component result, destination must be masked to .xyz or less)</p>
        </td>
    </tr>
    <tr>
        <td><p>kil</p></td>
        <td><p>0x27</p></td>
        <td><p>kill/discard (fragment shader only)</p></td>
        <td><p>If single scalar source component is less than zero, fragment is discarded and not drawn to the frame buffer. (Destination register must be set to all 0)</p></td>
    </tr>
    <tr>
        <td><p>tex</p></td>
        <td><p>0x28</p></td>
        <td><p>texture sample (fragment shader only)</p></td>
        <td><p>destination equals load from texture source2 at coordinates source1. In this case, source2 must be in sampler format.</p></td>
    </tr>
    <tr>
        <td><p>sge</p></td>
        <td><p>0x29</p></td>
        <td><p>set-if-greater-equal</p></td>
        <td><p>destination = source1 &gt;= source2 ? 1 : 0, component-wise</p></td>
    </tr>
    <tr>
        <td><p>slt</p></td>
        <td><p>0x2a</p></td>
        <td><p>set-if-less-than</p></td>
        <td><p>destination = source1 &lt; source2 ? 1 : 0, component-wise</p></td>
    </tr>
    <tr>
        <td><p>seq</p></td>
        <td><p>0x2c</p></td>
        <td><p>set-if-equal</p></td>
        <td><p>destination = source1 == source2 ? 1 : 0, component-wise</p></td>
    </tr>
    <tr>
        <td><p>sne</p></td>
        <td><p>0x2d</p></td>
        <td><p>set-if-not-equal</p></td>
        <td><p>destination = source1 != source2 ? 1 : 0, component-wise</p></td>
    </tr>
</tbody>
</table>

In AGAL2, the following opcodes have been introduced:

| Name | Opcode | Operation               | Description                                               |
| ---- | ------ | ----------------------- | --------------------------------------------------------- |
| ddx  | 0x1a   | partial derivative in X | Load partial derivative in X of source1 into destination. |
| ddy  | 0x1b   | partial derivative in Y | Load partial derivative in Y of source1 into destination. |
| ife  | 0x1c   | if equal to             | Jump if source1 is equal to source2.                      |
| ine  | 0x1d   | if not equal to         | Jump if source1 is not equal to source2.                  |
| ifg  | 0x1e   | if greater than         | Jump if source1 is greater than or equal to source2.      |
| ifl  | 0x1f   | if less than            | Jump if source1 is less than source2.                     |
| els  | 0x20   | else                    | Else block                                                |
| eif  | 0x21   | Endif                   | Close if or else block.                                   |

#### Destination field format

The \[destination\] field is 32 bits in size:

    31.............................0
    ----TTTT----MMMMNNNNNNNNNNNNNNNN

T = Register type (4 bits)

M = Write mask (4 bits)

N = Register number (16 bits)

\- = undefined, must be 0

#### Source field format

The \[source\] field is 64 bits in size:

    63.............................................................0
    D-------------QQ----IIII----TTTTSSSSSSSSOOOOOOOONNNNNNNNNNNNNNNN

D = Direct=0/Indirect=1 for direct Q and I are ignored, 1bit

Q = Index register component select (2 bits)

I = Index register type (4 bits)

T = Register type (4 bits)

S = Swizzle (8 bits, 2 bits per component)

O = Indirect offset (8 bits)

N = Register number (16 bits)

\- = undefined, must be 0

#### Sampler field format

The second source field for the tex opcode must be in \[sampler\] format, which
is 64 bits in size:

    63.............................................................0
    FFFFMMMMWWWWSSSSDDDD--------TTTT--------BBBBBBBBNNNNNNNNNNNNNNNN

N = Sampler register number (16 bits)

B = Texture level-of-detail (LOD) bias, signed integer, scale by 8. The floating
point value used is b/8.0 (8 bits)

T = Register type, must be 5, Sampler (4 bits)

F = Filter (0=nearest,1=linear) (4 bits)

M = Mipmap (0=disable,1=nearest, 2=linear)

W = Wrapping (0=clamp,1=repeat)

S = Special flag bits (must be 0)

D = Dimension (0=2D, 1=Cube)

#### Program Registers

The number of registers used depend upon the Context3D profile used. The number
of registers along with their usage are defined in the following table:

| Name                        | Value | AGAL                        |                           | AGAL2                       |                           | AGAL3                       |                           | Usage                                                                                                                                                                                                                                     |
| --------------------------- | ----- | --------------------------- | ------------------------- | --------------------------- | ------------------------- | --------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                             |       | Number per fragment program | Number per vertex program | Number per fragment program | Number per vertex program | Number per fragment program | Number per vertex program |                                                                                                                                                                                                                                           |
| Context 3D Profiles Support |       | Below Standard              |                           | Standard                    |                           | Standard Extended           |                           |                                                                                                                                                                                                                                           |
| SWF version                 |       | Below 25                    |                           | 25                          |                           | 28 and above                |                           |                                                                                                                                                                                                                                           |
| Attribute                   | 0     | NA                          | 8                         | NA                          | 8                         | NA                          | 16                        | Vertex shader input; read from a vertex buffer specified using Context3D.setVertexBufferAt().                                                                                                                                             |
| Constant                    | 1     | 28                          | 128                       | 64                          | 250                       | 200                         | 250                       | Shader input; set using the Context3D.setProgramConstants() family of functions.                                                                                                                                                          |
| Temporary                   | 2     | 8                           | 8                         | 26                          | 26                        | 26                          | 26                        | Temporary register for computation; not accessible outside program.                                                                                                                                                                       |
| Output                      | 3     | 1                           | 1                         | 1                           | 1                         | 1                           | 1                         | Shader output: in a vertex program, the output is the clip space position; in a fragment program, the output is a color.                                                                                                                  |
| Varying                     | 4     | 8                           | 8                         | 10                          | 10                        | 10                          | 10                        | Transfer interpolated data between vertex and fragment shaders. The varying registers from the vertex program are applied as input to the fragment program. Values are interpolated according to the distance from the triangle vertices. |
| Sampler                     | 5     | 8                           | NA                        | 16                          | NA                        | 16                          | NA                        | Fragment shader input; read from a texture specified using Context3D.setTextureAt().                                                                                                                                                      |
| Fragment register           | 6     | NA                          | NA                        | 1                           | NA                        | 1                           | NA                        | It is write-only and used to re-write z-value (or depth value) written in vertex shader.                                                                                                                                                  |
| Tokens                      |       | 200                         |                           | 1024                        |                           | 2048                        |                           |                                                                                                                                                                                                                                           |

The latest AGAL Mini Assembler can be found
[here](https://github.com/adobe-flash/graphicscorelib/tree/master/src/com/adobe/utils/v3).
