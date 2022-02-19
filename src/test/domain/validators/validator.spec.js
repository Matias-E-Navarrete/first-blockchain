import Blockchain from '../../../domain/entity/blockchain';
import validator from '../../../domain/validators/validator'

describe('Test Suite: validateBlockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();  
    });

    it('Validate a valid chain', () => {
        blockchain.addBlock('Bl0cK1');
        blockchain.addBlock('Bl0cK2');

        expect(validator(blockchain.blocks)).toBe(true)
    })

    it('Invalid blockchain with a corrupt genesis block', () => {
        blockchain.blocks[0].data = 'it has been Hacked';
        const errorMessage = 'Genesis Block is corrupt';
        expect(() => {
            validator(blockchain.blocks)
        }).toThrowError(errorMessage)
    });

    it('Privous Hash is corrupt', () => {
        blockchain.addBlock('_n3Wbl0cK_');
        const errorMessage = 'Previous hash is corrupt';
        blockchain.blocks[1].previousHash = '_NiC4r4Gu4_';

        expect(() => {
            validator(blockchain.blocks);
        }).toThrowError(errorMessage)

    });

    it('Hash is not valid', ()=>{
        blockchain.addBlock('_h4Ck3d_');
        blockchain.blocks[1].hash='_H4Sh-h4cK3d_'
        const errorMessage = 'Hash is not valid';

        expect(()=>{
            validator(blockchain.blocks)
        }).toThrowError(errorMessage)
    })

});