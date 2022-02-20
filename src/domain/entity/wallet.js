import Cryptography from "../business/helpers/cryptography.helper"
import { INITIAL_BALANCE } from "../constants/wallet.constant"


export default class Wallet {

    constructor() {
        this.balance = INITIAL_BALANCE
        this.keyPair = new Cryptography().generateKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    toString() {
        return`
        Balance     :   ${this.balance}
        Public KEY  :   ${this.publicKey.toString()}
        `
    }


}