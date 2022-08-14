import SetCommand from '../SetCommand'
import { MideaSwingMode } from '../enums/MideaSwingMode'
import { MideaDeviceType } from '../enums/MideaDeviceType';

export default class ACSetCommand extends SetCommand {

    constructor(device_type: MideaDeviceType = MideaDeviceType.AirConditioner) {
        super(device_type);
    };
    // Byte 0x0c
    get operationalMode() {
        return (this.data[0x0c] & 0xe0) >> 5;
    };

    set operationalMode(mode: number) {
        this.data[0x0c] &= ~0xe0; // Clear the mode bit
        this.data[0x0c] |= (mode & 0x7) << 5;
    };

    get targetTemperature() {
        return this.data[0x0c] & 0x0f;
        // return (this.data[0x0c] & 0x0f) + 16 + this.temperatureDot5;
    };

    set targetTemperature(temperatureCelsius: any) {
        this.data[0x0c] &= ~0x0f; // Clear the temperature bits
        this.data[0x0c] |= (temperatureCelsius & 0x0f) // | ((temperatureCelsius << 4) & 0x10);
        // this.temperatureDot5 = (Math.round(temperatureCelsius * 2) % 2 != 0);

        // let temperatureDecimal;
        // let temperatureInteger;
        // if (temperatureCelsius < 16 || temperatureCelsius > 31) {
        //     this.data[0x0c] &= ~0x0f  // Clear the temperature bits
        //     temperatureDecimal = 0;
        // } else {
        //     temperatureInteger = Math.trunc(temperatureCelsius)
        //     temperatureDecimal = temperatureCelsius - temperatureInteger;
        //     this.data[0x0c] |= Math.trunc(temperatureInteger) & 0x0f;
        // }
    };

    get temperatureDot5() {
        return 0.5 ? (this.data[0x0c] & 0x10) !== 0 : 0;
    };

    set temperatureDot5(temperatureDot5Enabled: any) {
        // add 0.5C to the temperature value. not intended to be called directly. targetTemperature set calls this if needed
        this.data[0x0c] &= ~0x10;  // Clear the mode bits
        if (temperatureDot5Enabled === 0.5) {
            this.data[0x0c] |= 0x10;
        }
    };
    // Byte 0x11
    get horizontalSwing() {
        return (this.data[0x11] & 0x3) >> 2
    }

    set horizontalSwing(mode: any) {
        this.data[0x11] &= ~0x3  // Clear the mode bit
        this.data[0x11] |= mode ? 0x73 : 0;
    }

    get verticalSwing() {
        return (this.data[0x11] & 0xc) >> 2
    }

    set verticalSwing(mode: any) {
        this.data[0x11] &= 0xc; // Clear the mode bit
        this.data[0x11] |= mode ? 0x3c : 0;
    };
    // Byte 0x12
    get turboFan() {
        return (this.data[0x12] & 0x20) !== 0;
    };

    set turboFan(turboFanEnabled: boolean) {
        this.data[0x12] &= ~0x40; // Clear the mode bit
        this.data[0x12] |= turboFanEnabled ? 0x20 : 0;
    };
    // Byte 0x13
    get dryer() {
        return (this.data[0x13] & 0x4) !== 0;
    }

    set dryer(dryerEnabled: boolean) {
        this.data[0x13] &= ~0x4; // Clear the mode bit
        this.data[0x13] |= dryerEnabled ? 0x4 : 0;
    }

    get purifier() {
        return (this.data[0x13] & 0x20) !== 0;
    }

    set purifier(purifierEnabled: boolean) {
        this.data[0x13] &= ~0x20; // Clear the mode bit
        this.data[0x13] |= purifierEnabled ? 0x20 : 0;
    }

    get ecoMode() {
        return (this.data[0x13] & 0x80) !== 0;
    };

    set ecoMode(ecoModeEnabled: boolean) {
        this.data[0x13] &= ~0x80 // Clear the mode bit
        this.data[0x13] |= ecoModeEnabled ? 0x80 : 0;
    };
    // Byte 0x14
    get useFahrenheit() {
        return (this.data[0x14] & 0x04) !== 0;
    };

    set useFahrenheit(useFahrenheitEnabled: boolean) {
        // set the unit to fahrenheit from celcius
        this.data[0x14] &= ~0x04; // Clear the mode bits
        this.data[0x14] |= useFahrenheitEnabled ? 0x04 : 0;
    };

    get comfortSleep() {
        // Activates sleep mode
        return (this.data[0x14] & 0x80) !== 0;
    }

    set comfortSleep(comfortSleepEnabled: boolean) {
        this.data[0x14] &= ~0x80;  // Clear the comfort sleep switch
        this.data[0x14] |= comfortSleepEnabled ? 0x80 : 0;
        this.data[0x12] &= ~0x03; // Clear the comfort value
        this.data[0x12] |= comfortSleepEnabled ? 0x03 : 0;
    }

    get turboMode() {
        return (this.data[0x14] & 0x02) !== 0;
    }

    set turboMode(turboModeEnabled: boolean) {
        this.data[0x14] &= (~0x02); // Clear the mode bit
        this.data[0x14] |= turboModeEnabled ? 0x02 : 0;
    }

    get screenDisplay() {
        return (this.data[0x14] & 0x10) !== 0;
    };

    set screenDisplay(screenDisplayEnabled: boolean) {
        // the LED lights on the AC. these display temperature and are often too bright during nights
        this.data[0x14] &= ~0x10; // Clear the mode bit
        this.data[0x14] |= screenDisplayEnabled ? 0x10 : 0;
    };
};