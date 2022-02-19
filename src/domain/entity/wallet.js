

export default class Wallet {

    constructor() {
        this.balance = null
        this.keyPair = null
        this.publicKey = null
    }

    toString() {
        return`
        Balance     :   ${this.balance}
        Public KEY  :   ${this.publicKey.toString()}
        `
    }
}