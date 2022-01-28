import { SHA256 } from 'crypto-js';
import { DIFFICULTY } from '../constants/blocks.constant';

export default class Block {

  constructor(timestamp, previousHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  static get genesis() {
    const timestamp = new Date(2020, 0, 1);
    const previousHash = undefined;
    const data = { init: '0.0.0.0' };
    const hash = Block.generateHash(timestamp, previousHash, data);
    return new this(timestamp, undefined, hash, data);
  }

  static mine(previusBlock, data) {
    let timestamp;
    let nonce = 0;
    let hash;
    const { hash: previousHash } = previusBlock;

    do {
      timestamp = Date.now();
      nonce++;
      hash = Block.generateHash(timestamp, previousHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, previousHash, hash, data, nonce);
  }

  static generateHash(timestamp, previuosHash, data, nonce) {
    return SHA256(`${timestamp}${previuosHash}${data}${nonce}`).toString();
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
        |nonce: ${nonce}                  
         ===============================================
        `;
  }
}
