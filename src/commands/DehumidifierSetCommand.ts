import SetCommand from '../SetCommand';
import { MideaDeviceType } from '../enums/MideaDeviceType';

export default class DehumidifierSetCommand extends SetCommand {

	constructor(device_type: MideaDeviceType = MideaDeviceType.Dehumidifier) {
		super(device_type);
	}
	// Byte 0x0c
	// TODO Idea:
	// I can use the various Home App modes (Auto, Humi, Dehumi) to control the fan speed. 
	// Or to switch between SMART/DRY/CONTINUOS/MANUAL?
	get operationalMode() {
		return this.data[0x0c] & 0x0f;
	}

	set operationalMode(mode: any) {
		this.data[0x0c] &= ~0x0f; // Clear the mode bits
		this.data[0x0c] |= mode;
	}
	// Byte 0x11
	get targetHumidity() {
		return this.data[0x11] & 0x7f;
	}

	set targetHumidity(humidity: number) {
		this.data[0x11] &= ~0x7f // Clear the humidity part
		this.data[0x12] |= humidity
	}
	// Byte 0x13
	get ionMode() {
		return (this.data[0x13] & 0x40) !== 0;
	}

	set ionMode(ionModeEnabled: boolean) {
		this.data[0x13] &= ~0x40; // Clear the ion switch bit
		this.data[0x13] |= ionModeEnabled ? 0x40 : 0;
	}

	get pumpSwitch() {
		return (this.data[0x13] & 0x08) !== 0;
	}

	set pumpSwitch(pumpSwitchEnabled: boolean) {
		this.data[0x13] &= ~0x08; // Clear the pump switch bit
		this.data[0x13] |= pumpSwitchEnabled ? 0x08 : 0;
	}

	get pumpSwitchFlag() {
		return (this.data[0x13] & 0x10) !== 0;
	}

	set pumpSwitchFlag(mode: boolean) {
		this.data[0x13] &= ~0x10 // Clear the pump switch bit
		this.data[0x13] |= mode ? 0x10 : 0;
	}

	get sleepSwitch() {
		return (this.data[0x13] & 0x20) !== 0;
	}

	set sleepSwitch(sleepSwitchEnabled: boolean) {
		this.data[0x13] &= ~0x20 // Clear the sleep switch bit
		this.data[0x13] |= sleepSwitchEnabled ? 0x20 : 0;
	}
	// Byte 0x14
	get verticalSwing() {
		return (this.data[0x14] & 0x14) !== 0;
	}

	set verticalSwing(verticalSwingEnabled: boolean) {
		this.data[0x14] &= ~0x14; // Clear the sleep switch bit
		this.data[0x14] |= verticalSwingEnabled ? 0x14 : 0;
	}
	// Byte 0x17
	get tankWarningLevel() {
		return this.data[0x17];
	}

	set tankWarningLevel(level: any) {
		this.data[0x17] = level;
	}
}