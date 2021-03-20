declare class BigInteger {
  constructor(number: number | string, base?: number);
  constructor(number: Buffer);
  constructor(number: unknown);

  toString(base?: number): string;
  toBuffer(trimOrSize?: true | number): Buffer;

  /** @return {number} 1 if this > a, -1 if this < a, 0 if equal */
  compareTo(a: BigInteger): -1 | 0 | 1;

  multiply(b: BigInteger): BigInteger;

  add(b: BigInteger | number): BigInteger;
  subtract(b: BigInteger): BigInteger;

  modPow(b: BigInteger, N: BigInteger): BigInteger;
  mod(b: BigInteger): BigInteger;

  bitLength(): number;
}

export = BigInteger;
