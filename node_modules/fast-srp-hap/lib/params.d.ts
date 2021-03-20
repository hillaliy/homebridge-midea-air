/**
 * SRP Group Parameters
 * http://tools.ietf.org/html/rfc5054#appendix-A
 *
 * The 1024-, 1536-, and 2048-bit groups are taken from software
 * developed by Tom Wu and Eugene Jhong for the Stanford SRP
 * distribution, and subsequently proven to be prime.  The larger primes
 * are taken from [MODP], but generators have been calculated that are
 * primitive roots of N, unlike the generators in [MODP].
 *
 * The 1024-bit and 1536-bit groups MUST be supported.
 */
import BigInteger = require("../jsbn/jsbn");
export declare function hex(s: string): BigInteger;
export interface SrpParams {
    N_length_bits: number;
    N: BigInteger;
    g: BigInteger;
    hash: string;
}
export declare const params: {
    1024: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    1536: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    2048: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    3072: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    hap: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    4096: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    6244: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
    8192: {
        N_length_bits: number;
        N: BigInteger;
        g: BigInteger;
        hash: string;
    };
};
export default params;
//# sourceMappingURL=params.d.ts.map