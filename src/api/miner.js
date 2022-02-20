import Blockchain from '../domain/entity/blockchain';

const blockchain = new Blockchain();

console.time('Starting to add blocks');
for (let index = 0; index < 10; index++) {
    const block = blockchain.addBlock({ to: "MEN", from: "RSMZ", currency: (0.12 + index) })
    console.log(block.toString());
}
console.timeEnd('Add blocks to blockchain have been ended')