import SetCommand from '../SetCommand'
import { MideaSwingMode } from '../enums/MideaSwingMode'
import { MideaDeviceType } from '../enums/MideaDeviceType';

export default class ACSetCommand extends SetCommand {

    constructor(device_type: MideaDeviceType = MideaDeviceType.AirConditioner) {
        super(device_type);
    }
    // Byte 0x0c
    get targetTemperature() {
        return this.data[0x0c] & 0x1f;
    }

    set targetTemperature(temperatureCelsius: number) {
        this.data[0x0c] &= ~0x0f; // Clear the temperature bits
        this.data[0x0c] |= (temperatureCelsius & 0xf) | ((temperatureCelsius << 4) & 0x10);
    }
    // Byte 0x14
    get useFahrenheit() {
        return (this.data[0x14] & 0x04) > 0;
    }

    set useFahrenheit(useFahrenheitEnabled: boolean) {
        // set the unit to fahrenheit from celcius
        this.data[0x14] = useFahrenheitEnabled ? 0x04 : 0;
    }
}