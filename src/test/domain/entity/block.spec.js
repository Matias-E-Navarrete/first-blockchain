import Block from '../../../domain/entity/block';
import { SHA256 } from 'crypto-js';

describe('Class Block', () => {

	let timestamp;
	let previousBlock;
	let data;
	let hash;

	beforeEach(() => {
		timestamp = new Date(2010, 0, 1).getTime();
		previousBlock = Block.genesis;
		data = { init: '0.0.0.0' };
		hash = '_h4sH_'
	});

	it('Create instance with parameters', () => {
		const block = new Block(timestamp, previousBlock.hash, hash, data)

		expect(block.timestamp).toEqual(timestamp);
		expect(block.previousHash).toEqual(previousBlock.hash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);

	});

	it('Mine block', () => {
		const block = Block.mine(previousBlock, data);

		expect(block.hash.length).toEqual(64);
		expect(block.previousHash).toEqual(previousBlock.hash);
	});

	it('use static generateHash', () => {
		hash = Block.generateHash(timestamp, previousBlock.hash, data);
		const hash256 = '37ac1e59a7bb563a8a893d537a6e3c24d900bc937b81ca33e43c4c6e521b6f83'

		expect(hash.length).toEqual(hash256.length);
	});

	it('typeof toString() return should be an string ', () => {
		const block = Block.mine(previousBlock, data);

		expect(typeof block.toString()).toEqual('string')
	});
});
