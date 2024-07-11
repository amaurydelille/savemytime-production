const { generateKeyPairSync } = require("crypto");

const generatePrivateKey = () => {
    const { privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
      })
      return privateKey.export({
        format: 'pem',
        type: 'pkcs1',
      }).toString();
}

const privateKey = generatePrivateKey();

module.exports = privateKey;

