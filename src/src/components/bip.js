// import bip39 from 'bip39'

// const bip39 = require('bip39')

const uuidv4 = require('uuid/v4');

export default function generateKey() {
    console.log("generating a new key for userr")

    return uuidv4()
    // const mnemonic = bip39.generateMnemonic()
    // bip39.mnemonicToSeed('basket actual').then(console.log)
    // return mnemonic
}



