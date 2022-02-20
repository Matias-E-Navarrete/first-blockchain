import dinamicDifficultyHelper from '../../../domain/business/helpers/dinamicDifficulty.helper';
import { DIFFICULTY } from '../../../domain/constants/blocks.constant';
import Block from '../../../domain/entity/block';

describe('Class Block', () => {

	let timestamp;
	let previousBlock;
	let data;
	let hash;
	let nonce;
	let difficulty;

	beforeEach(() => {
		timestamp = new Date(2010, 0, 1).getTime();
		previousBlock = Block.genesis;
		data = { init: '0.0.0.0' };
		hash = '_h4sH_';
		nonce = 128;
		difficulty = DIFFICULTY;
	});

	it('Create instance with parameters', () => {
		const block = new Block(timestamp, previousBlock.hash, hash, data, nonce, difficulty)

		expect(block.timestamp).toEqual(timestamp);
		expect(block.previousHash).toEqual(previousBlock.hash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
		expect(block.nonce).toEqual(nonce);
		expect(block.difficulty).toEqual(difficulty);

	});

	it('Mine block', () => {
		const block = Block.mine(previousBlock, data);
		const {difficulty} = block;

		expect(block.hash.length).toEqual(64);
		expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
		expect(block.previousHash).toEqual(previousBlock.hash);
		expect(data).toEqual(data);
		expect(block.nonce).not.toEqual(0);
	});

	it('use static generateHash', () => {
		hash = Block.generateHash(timestamp, previousBlock.hash, data, difficulty);
		const hash256 = 'd99e68060da723d192fdc0394df2636754c499c3ba7b21a8bb4121a6884d0d58'

		expect(hash).toEqual(hash256);
	});

	it('typeof toString() return should be an string ', () => {
		const block = Block.mine(previousBlock, data);

		expect(typeof block.toString()).toEqual('string')
	});
});
