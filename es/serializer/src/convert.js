import ByteBuffer from "bytebuffer";
var Buffer = require("safe-buffer").Buffer;

export default function (type) {
    return {
        fromHex: function fromHex(hex) {
            var b = ByteBuffer.fromHex(hex, ByteBuffer.LITTLE_ENDIAN);
            return type.fromByteBuffer(b);
        },
        toHex: function toHex(object) {
            var b = toByteBuffer(type, object);
            return b.toHex();
        },
        fromBuffer: function fromBuffer(buffer) {
            var b = ByteBuffer.fromBinary(buffer.toString(), ByteBuffer.LITTLE_ENDIAN);
            return type.fromByteBuffer(b);
        },
        toBuffer: function toBuffer(object) {
            return Buffer.from(toByteBuffer(type, object).toBinary(), "binary");
        },
        fromBinary: function fromBinary(string) {
            var b = ByteBuffer.fromBinary(string, ByteBuffer.LITTLE_ENDIAN);
            return type.fromByteBuffer(b);
        },
        toBinary: function toBinary(object) {
            return toByteBuffer(type, object).toBinary();
        }
    };
}

var toByteBuffer = function toByteBuffer(type, object) {
    var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    type.appendByteBuffer(b, object);
    return b.copy(0, b.offset);
};