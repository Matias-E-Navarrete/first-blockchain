import Transaction from "../../../domain/entity/transaction";
import Wallet from "../../../domain/entity/wallet"


describe('Transaction', () => {
    let wallet;
    let transaction;
    let amount;
    let recipientAddress;

    beforeEach(() => {
        wallet = new Wallet()
        recipientAddress = 'Recipi3nt'
        amount = 10
        transaction = Transaction.create(wallet, amount, recipientAddress);
    })

    it('Transaction Output: the amount substracted from the wallet balance', () => {
        const output = transaction.outputs.find(({ address }) => address === wallet.publicKey)
        expect(output.amount).toEqual(wallet.balance - amount)
    });

    it('Transaction Output: the recipient has amount sent', () => {
        const output = transaction.outputs.find(({ address }) => address === recipientAddress)
        expect(output.amount).toEqual(amount)
    });

    describe('Throw error when balance is minor than amount', () => {
        beforeEach(() => {
            amount = 600;
            transaction = undefined
        })

        it('Throw error when balance is minor than amount', () => {
            expect(() => {
                transaction = Transaction.create(wallet, amount, recipientAddress)
            }).toThrowError(`Amount: ${amount} exceeds your balance`)
        });
    });

});