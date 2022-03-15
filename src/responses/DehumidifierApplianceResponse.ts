import ApplianceResponse from '../ApplianceResponse';

export default class DehumidifierApplianceResponse extends ApplianceResponse {
    // Byte 0x07
    get targetHumidity() {
        return this.data[0x07];
    }
    // Byte 0x0a
    get waterLevel() {
        return this.data[0x0a] & 127;
    }
    // Byte 0x10
    get currentHumidity() {
        return this.data[0x10];
    }
}