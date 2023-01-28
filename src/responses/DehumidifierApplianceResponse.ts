import ApplianceResponse from './ApplianceResponse';

export default class DehumidifierApplianceResponse extends ApplianceResponse {
    // Byte 0x02
    get operationalMode() {
        return (this.data[0x02] & 0xf)
    }

    get operationalModeFc() {
        return (this.data[0x02] & 0xf0) >> 4
    }
    // Byte 0x07
    get targetHumidity() {
        if (this.data[0x07] > 100) {
            return 100
        } else {
            return this.data[0x07];
        }

    }
    // Byte 0x08
    get targetHumidityDecimal() {
        const humidityDecimal = (this.data[0x08] & 0xf) * 0.0625;
        return this.targetHumidity + humidityDecimal;
    }
    // Byte 0x09
    get filterIndicator() {
        return (this.data[0x09] & 0x80) !== 0;
    }

    get ionMode() {
        return (this.data[0x09] & 0x40) !== 0;
    }

    get speepSwitch() {
        return (this.data[0x09] & 0x20) !== 0;
    }

    get pumpSwitchFlag() {
        return (this.data[0x09] & 0x10) !== 0;
    }

    get pumpSwitch() {
        return (this.data[0x09] & 0x8) !== 0;
    }

    get displayClass() {
        return this.data[0x09] & 0x7;
    }

    // Byte 0x0a
    get defrosting() {
        return (this.data[0x0a] & 0x80) !== 0;
    }

    get waterLevel() {
        return this.data[0x0a] & 0x7f;
    }

    get waterLevelFull() {
        return this.waterLevel >= 100;
    }
    // Byte 0x0b
    get dustTime() {
        return this.data[0x0b] * 2;
    }
    // Byte 0x0c
    get rareShow() {
        return (this.data[0x0c] & 0x38) >> 3;
    }

    get dust() {
        return this.data[0x0c] & 0x7;
    }
    // Byte 0x0d
    get pm25() {
        return this.data[0x0d] + (this.data[0x0e] * 256)
    }
    // Byte 0x0f
    get waterLevelWarningLevel() {
        return this.data[0xf];
    }
    // Byte 0x10
    get currentHumidity() {
        return this.data[0x10];
    }
    // Byte 0x11
    get indoorTemperature() {
        return (this.data[0x11] - 50) / 2
        // if (this.indoorTemperature < -19) {
        //     this.indoorTemperature = -20;
        // } else if (this.indoorTemperature > 50) {
        //     this.indoorTemperature = 50
        // }
    }
    // Byte 0x12
    get indoorTemperatureDecimal() {
        return (this.data[0x12] & 0xf) * 0.1
    }
    // Byte 0x13
    get verticalSwing() {
        return (this.data[0x12] & 0x20) !== 0;
    }

    get horizontalSwing() {
        return (this.data[0x12] & 0x10) !== 0;
    }
}