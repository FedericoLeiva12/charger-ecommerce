const { RSA, Crypt} = require('hybrid-crypto-js');

const entropy = 'Este es el mejor ecommerce de todos carajo';
const crypt = new Crypt({ entropy: entropy });
const rsa = new RSA({ entropy: entropy, keySize: 1024 });

function encrypt(key, message) {
    return crypt.encrypt(key, message);
}

function decrypt(key, message) {
    return crypt.decrypt(key, message);
}

function generatePair() {
    return rsa.generateKeyPairAsync()
}

module.exports = {
    encrypt,
    decrypt,
    generatePair
}