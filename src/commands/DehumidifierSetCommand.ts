import SetCommand from '../SetCommand';
import { MideaDeviceType } from '../enums/MideaDeviceType';

export default class DehumidifierSetCommand extends SetCommand {

	constructor(device_type: MideaDeviceType = MideaDeviceType.Dehumidifier) {
		super(device_type);
	}
	// Byte 0x11
	get targetHumidity() {
		return this.data[0x11] & 127
	}

	set targetHumidity(value: number) {
		this.data[0x11] = value & 127
		this.data[0x12] = 0 & 15
	}

	// TODO Idea:
	// I can use the various Home App modes (Auto, Humi, Dehumi) to control the fan speed. 
	// Or to switch between SMART/DRY/CONTINUOS/MANUAL?

	// get operationalMode() {
	// }
	// set operationalMode(value: number) {
	// }
}