import Constants from './Constants'
export default class crc8 {
    static calculate(data: any) {
        let crc_value = 0;
        for (const m of data) {
            let k = crc_value ^ m;
            if (k > 256) k -= 256;
            if (k < 0) k += 256;
            crc_value = Constants.crc8_854_table[k];
        }
        return crc_value;
    }
}