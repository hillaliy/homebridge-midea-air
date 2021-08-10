import BaseCommand from './BaseCommand';
export default class PacketBuilder {
	_command: number[] = []
	packet: number[] = []
	constructor() {

		// Init the packet with the header data.
		this.packet = [
			90, 90, 						 // Byte 0-1		- Static MSmart header
			1, 16, 							 // Byte 2-3		- mMessageType
			92, 0,							 // Byte 4-5		- Packet length (reversed, lb first)
			32,								 // Byte 6
			0,								 // Byte 7
			1, 0, 0, 0,						 // Byte 8-11		- MessageID	(rollover at 32767)
			189, 179, 57, 14, 12, 5, 20, 20, // Byte 12-19		- Time and Date (ms/ss/mm/HH/DD/MM/YYYY)
			29, 129, 0, 0, 0, 16,			 // Byte 20-25		- DeviceID (reversed, lb first)
			0,								 // Byte 26
			0,								 // Byte 27
			0, 4, 2, 0, 0, 1,				 // Byte 28-33
			0,								 // Byte 34
			0,								 // Byte 35
			0,								 // Byte 36			- sequence number
			0, 0, 0							 // Byte 37-39
		];
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
		return 255 - (data.reduce((a: number, b: number) => a + b) % 256) + 1;
	}
}