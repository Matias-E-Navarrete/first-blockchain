import { INITIAL_BALANCE } from "../../../domain/constants/wallet.constant";
import Wallet from "../../../domain/entity/wallet"

describe('Wallet', () => {

    let wallet

    beforeEach(() => {
        wallet = new Wallet
    })

    it('it is a healthy wallet', () => {
        expect(wallet.balance).toEqual(INITIAL_BALANCE)
        expect(typeof wallet.keyPair).toEqual('object')
        expect(typeof wallet.publicKey).toEqual('string')
        expect(wallet.publicKey.length).toEqual(130)
    });

});