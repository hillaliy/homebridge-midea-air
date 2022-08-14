import crc8 from './crc8';

import { MideaDeviceType } from './enums/MideaDeviceType';

export default class BaseCommand {
    data: any[]
    device_type: MideaDeviceType

    constructor(device_type: MideaDeviceType) {

        this.device_type = device_type

        if (device_type == MideaDeviceType.AirConditioner) {
            // More magic numbers. I'm sure each of these have a purpose, but none of it is documented in english. I might make an effort to google translate the SDK
            // full = [170, 35, 172, 0, 0, 0, 0, 0, 3, 2, 64, 67, 70, 102, 127, 127, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 14, 187, 137, 169, 223, 88, 121, 170, 108, 162, 36, 170, 80, 242, 143, null];
            this.data = [
                170,            // 0         - Sync header
                35,             // 1         - Message length setting
                172,            // 2         - Device type (172 for Air Conditioner)
                0,              // 3         - Frame sync check (not used, 0x00)
                0,              // 4         - Reserved 0x00
                0,              // 4    	 - Reserved 0x00
                0,              // 6		 - Message Id
                0,              // 7    	 - Framework protocol version
                3,              // 8         - Home appliance protocol
                2,              // 9         - Message type setting identification
                // Command Header End
                // Data Start
                64,             // 10       - Data request/response: Set up
                65,             // 11       - power state: 0/1 + audible feedback: 64 
                70,             // 12       - Operational mode
                102,            // 13       - Fan speed 20/40/60/80/102
                127,            // 14       - On timer
                127,            // 15       - Off timer
                0,              // 16       - Common timer
                48,             // 17       - Swing mode
                0,              // 18       - Turbo fan
                0,              // 19       - Eco mode / Dryer / Purifier
                0,              // 20       - TurboMode / Screen display / Fahrenheit
                // Padding
                0, 0, 0, 0, 0, 0, 0, 0, 0 //, 0, 0, 0, 0, 0, 0
                // Data End
            ];
            this.data[0x02] = device_type;
        } else if (device_type == MideaDeviceType.Dehumidifier) {
            this.data = [
                // Command Header
                170,            // 0         - Sync header setting
                34,             // 1         - Message length
                161,            // 2         - Device type (161 for Dehumidifier)
                0,              // 3		 - Frame sync check (not used, 0x00)
                0,              // 4         - Reserved 0x00
                0,              // 5    	 - Reserved 0x00
                0,              // 6		 - Message Id
                0,              // 7    	 - Framework protocol version
                3,              // 8         - Device Agreement Version
                2,              // 9         - Command (2) or Query (3)
                // Command Header End
                // Data Start
                72,             // 10        - Command type: Set (72), Query (65)
                65,             // 11        - power state: 0/1 + audible feedback: 64
                1,              // 12        - Operational mode (1: target, 2: continuous, 3: smart, 4: dry)
                208,            // 13        - Timing + wind speed 40/60/80
                127,            // 14        - On timer
                127,            // 15        - Off timer
                0,              // 16        - Common timer
                50,             // 17        - Target humidity
                0,              // 18        - Target humidity (float)?
                0,              // 19        - Display and other settings
                1,              // 20        - Swing and other settings. In dehumidifier, matches mode
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