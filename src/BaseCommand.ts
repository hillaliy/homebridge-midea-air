import crc8 from './crc8';

import { MideaDeviceType } from './enums/MideaDeviceType';

export default class BaseCommand {
    data : any[]
    device_type: MideaDeviceType
    
    constructor(device_type: MideaDeviceType) {

        this.device_type = device_type

        if (device_type == MideaDeviceType.AirConditioner) {
           this.data = [170, 35, 172, 0, 0, 0, 0, 0, 3, 2, 64, 67, 70, 102, 127, 127, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
           
        } else if (device_type == MideaDeviceType.Dehumidifier) {
            this.data = [
                // Command Header
                170,            // 0         - ?
                34,             // 1         - Lenght
                161,            // 2         - Device Type (161 for Dehumidifier)
                0, 0, 0, 0, 0,  // 3 to 7    - ?
                3,              // 8         - ?
                2,              // 9         - Command (2) or Query (3)
                // Command Header End
                // Data Start
                72,             // 10 (0x0a) - Command type: Set (72), Query (65)
                67,             // 11 (0x0b) - Settings (last bit likely turn on and off)
                1,              // 12 (0x0c) - Mode (1: target, 2: continuous, 3: smart, 4: dry)
                208,            // 13 (0x0d) - Timing + wind speed
                127,            // 14 (0x0e) - Timer related?
                127,            // 15 (0x0f) - Timer related?
                0,              // 16 (0x10) - Timer related?
                50,             // 17 (0x11) - Target humidity
                0,              // 18 (0x12) - Target humidity (float)?
                0,              // 19 (0x13) - Display and other settings
                1,              // 20 (0x14) - Swing and other settings. In dehumidifier, matches mode
                // Padding
                0, 0, 0, 0, 0, 0, 0, 0, 0
                // Data End
            ];
            
        } else {
            // Unknown/Unsupported: default to AirCon
            this.data = [170, 35, 172, 0, 0, 0, 0, 0, 3, 2, 64, 67, 70, 102, 127, 127, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }

    finalize() {
        // Add the CRC8
        this.data[this.data.length - 1] = crc8.calculate(this.data.slice(16));
        
        // Set the length of the command data
        this.data[0x01] = this.data.length;

        return this.data;
    }
}
