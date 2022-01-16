import { SHA256 } from 'crypto-js';

export default class Block {
  constructor(timestamp, previousHash, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  static get genesis() {
    const timestamp = new Date(2020, 0, 1);
    const previousHash = undefined;
    const data = { init: '0.0.0.0' };
    const hash = Block.generateHash(timestamp, previousHash, data);
    return new this(timestamp, undefined, hash, data);
  }

  static mine(previusBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previusBlock;
    const hash = Block.generateHash(timestamp, previousHash, data);

    return new this(timestamp, previousHash, hash, data);
  }

  static generateHash(timestamp, previuosHash, data) {
    return SHA256(`${timestamp}${previuosHash}${data}`).toString();
  }

  toString() {
    const {
      timestamp, previousHash, hash, data,
    } = this;
    return `
         ===============================================
        |BLOCK -                        
        |timestamp: ${timestamp}        
        |previousHash: ${previousHash}  
        |hash: ${hash}                  
        |data: ${JSON.stringify(data)}                  
         ===============================================
        `;
  }
}
