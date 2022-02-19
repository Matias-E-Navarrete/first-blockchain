import Block from '../entity/block'

export default (blockchain) => {
    const [genesisBlock, ...blocks] = blockchain;
    const genesis = Block.genesis;

    if (JSON.stringify(genesisBlock) !== JSON.stringify(genesis))
        throw new Error('Genesis Block is corrupt')

    for (let i = 0; i < blocks.length; i++) {
        const { previousHash, hash, timestamp, data, nonce, difficulty } = blocks[i];
        const previousBlock = blockchain[i]

        if (previousHash !== previousBlock.hash)
            throw new Error('Previous hash is corrupt');

        if (hash !== Block.generateHash(timestamp, previousHash, data, nonce, difficulty))
            throw new Error('Hash is not valid')
    }

    return true;
}