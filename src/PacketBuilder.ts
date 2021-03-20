import BaseCommand from './BaseCommand';
export default class PacketBuilder {
	_command: number[] = []
	packet: number[] = []
	constructor() {

		// // Init the packet with the header data.
		// this.packet = [
		// // Static MSmart header
		// 90, 90,
		// // mMessageType
		// 1, 16,
		// // Packet length
		// 92,
		// // Unknown
		// 0, 32, 0,
		// // MessageID
		// 1, 0, 0, 0,
		// // Date and time
		// 189, 179, 57, 14, 12, 5, 20, 20,
		// // DeviceID
		// 29, 129, 0, 0, 0, 16,
		// // Payload?
		// 0, 0, 0, 4, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0];

		// From python Lib
		// Non status commands
		this.packet = [
			90, 90,
			1, 0,
			91,
			0, 32, 0,
			10, 0, 0, 0, 
			10, 10, 10, 3, 2, 11, 18, 20, 
			218, 73, 0, 0, 0, 16, 
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	}

	set command(command: BaseCommand) {
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

	checksum(data: number[]) {
		return 255 - (data.reduce((a: number, b : number) => a + b) % 256) + 1;
	}
}
