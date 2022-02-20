import Elliptic from 'elliptic'

export default class Cryptography{

    constructor(){
        this.ec = new Elliptic.ec('secp256k1');
    }

    generateKeyPair (){
        return this.ec.genKeyPair()
    }
}