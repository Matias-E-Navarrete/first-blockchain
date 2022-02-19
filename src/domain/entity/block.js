import { SHA256 } from 'crypto-js';
import dinamicDifficultyHelper from '../business/helpers/dinamicDifficulty.helper';
import { DIFFICULTY } from '../constants/blocks.constant';
export default class Block {

  constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = new Date(2020, 0, 1);
    const previousHash = undefined;
    const data = { init: '0.0.0.0' };
    const hash = Block.generateHash(timestamp, previousHash, data, DIFFICULTY);

    return new this(timestamp, undefined, hash, data, 0, DIFFICULTY);
  }

  static mine(previusBlock, data) {
    let timestamp;
    let nonce = 0;
    let hash;
    let { difficulty } = previusBlock;
    const { hash: previousHash } = previusBlock;

    do {
      timestamp = Date.now();
      nonce++;
      difficulty = dinamicDifficultyHelper(previusBlock, timestamp);
      hash = Block.generateHash(timestamp, previousHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, previousHash, hash, data, nonce, difficulty);
  }

  static generateHash(timestamp, previuosHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${previuosHash}${data}${nonce}${difficulty}`).toString();
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce, difficulty
    } = this;
    return `
         ===============================================
        |BLOCK -                        
        |timestamp: ${timestamp}        
        |previousHash: ${previousHash}  
        |hash: ${hash}                  
        |data: ${JSON.stringify(data)}                  
        |nonce: ${nonce}                  
        |difficulty: ${difficulty}                  
         ===============================================
        `;
  }
}
