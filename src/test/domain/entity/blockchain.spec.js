import Block from '../../../domain/entity/block'
import Blockchain from '../../../domain/entity/blockchain'


describe('Test suite Blockchain', () => {
    let blockchain;
    beforeEach(() => {
        blockchain = new Blockchain()
    })

    it('Create a blockchain with genesis block', () => {
        const [genesisBlock] = blockchain.blocks

        expect(genesisBlock).toEqual(Block.genesis);
        expect(genesisBlock.length).toEqual(Block.genesis.length);

    })

    it('Add Blocks to blockchain', () => {
        const data = '_d4Ta_'
        blockchain.addBlock(data)

        const [, lastBlock] = blockchain.blocks

        expect(lastBlock.data).toEqual(data)
        expect(blockchain.data).toEqual(2)
    })
});