import { v1 as uuidv1 } from 'uuid';

export default class Transaction {

    constructor() {
        this.id = uuidv1();
        this.input = null;
        this.outputs = []
    }

    static create(senderWallet, amount, recipientAddress) {

        const { balance, publicKey } = senderWallet;

        if (amount > balance) throw Error(`Amount: ${amount} exceeds your balance`)

        const transaction = new Transaction()

        transaction.outputs.push(...[
            { amount: balance - amount, address: publicKey },
            {amount, address: recipientAddress}
        ])

        return transaction
    }
}