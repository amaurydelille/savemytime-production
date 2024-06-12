const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

const createJSONWebToken = async (userEmail) => {
    const token = await jwt.sign(
        { email: userEmail },
        privateKey,
        { algorithm: 'RS256', expiresIn: '24h' }
    );
    return token;
}

const verifyJSONWebToken = async (token) => {
    if (token) {
        try {
            const authorized = await jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            return authorized;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = {
    createJSONWebToken,
    verifyJSONWebToken
};
