import ApplianceResponse from '../ApplianceResponse'

export default class ACApplianceResponse extends ApplianceResponse {
    // Byte 0x02
    get targetTemperature() {
        return (this.data[0x02] & 0xf) + 16;
    }

    get auxHeat() {
        return (this.data[0x09] & 0x08) > 0;
    }

    // Byte 0x0b
    get indoorTemperature() {
        return (this.data[0x0b] - 50) / 2.0;
    }

    // Byte 0x0c
    get outdoorTemperature() {
        return (this.data[0x0c] - 50) / 2.0;
    }
    get catchCold() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x08) > 0;
    }
    get tempUnit() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x09] & 0x80) > 0;
    }
}