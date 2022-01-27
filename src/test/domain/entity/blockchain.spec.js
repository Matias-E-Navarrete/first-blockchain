import Block from '../../../domain/entity/block'
import Blockchain from '../../../domain/entity/blockchain'


describe('Test suite Blockchain', () => {
    let blockchain;
    let blockchain2;
    beforeEach(() => {
        blockchain = new Blockchain()
        blockchain2 = new Blockchain()
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
        expect(blockchain.blocks.length).toEqual(2)
    })

    it('Replace function works', () => {        
        blockchain2.addBlock('D4T4_')
        blockchain.replace(blockchain2.blocks)

        expect(blockchain.blocks).toEqual(blockchain2.blocks)
    })

    it('Invlaid Length chain', () => {
        const messageLengthError = 'Received chain is not longer';
        blockchain.addBlock('D4T4_')
        blockchain.addBlock('D4T4_2')
        expect(() => {
            blockchain.replace(blockchain2.blocks)
        }).toThrowError(messageLengthError);

    });

    it('Invlaid received chain', () => {
        const messageChainError = 'Received chain is invalid';
        blockchain.addBlock('D4T4_')
        blockchain2.addBlock('D4T4_')
        blockchain2.blocks[1].data = 'H4cKe3d'
        expect(() => {
            blockchain.replace(blockchain2)
        }).toThrowError(messageChainError);
    })

    it('Replace return new block', () => {      
        blockchain.addBlock('D4T4_')
        blockchain2.addBlock('D4T4_')
  
        expect(blockchain.replace(blockchain2.blocks)).toBe(blockchain.blocks)
        expect(blockchain.replace(blockchain2.blocks)).toEqual(blockchain.blocks)
    })
})