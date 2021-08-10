"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PacketBuilder {
    constructor() {
        this._command = [];
        this.packet = [];
        // Init the packet with the header data.
        this.packet = [
            90, 90,
            1, 16,
            92, 0,
            32,
            0,
            1, 0, 0, 0,
            189, 179, 57, 14, 12, 5, 20, 20,
            29, 129, 0, 0, 0, 16,
            0,
            0,
            0, 4, 2, 0, 0, 1,
            0,
            0,
            0,
            0, 0, 0 // Byte 37-39
        ];
    }
    set command(command) {
        this._command = command.finalize();
    }
    finalize() {
        // Append the command data to the packet
        this.packet = this.packet.concat(this._command);
        // Append a basic checksum of the command to the packet (This is apart from the CRC8 that was added in the command)
        this.packet = this.packet.concat([this.checksum(this._command.slice(1))]);
        // Ehh... I dunno, but this seems to make things work. Padding with 0's
        this.packet = this.packet.concat(new Array(49 - this._command.length).fill(0));
        // Set the packet length in the packet!
        this.packet[0x04] = this.packet.length;
        return this.packet;
    }
    checksum(data) {
        return 255 - (data.reduce((a, b) => a + b) % 256) + 1;
    }
}
exports.default = PacketBuilder;
