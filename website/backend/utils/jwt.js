const jwt = require('jsonwebtoken');

const createJSONWebToken = async (userEmail) => {
    const token = await jwt.sign(
        { email: userEmail },
        process.env.PRIVATE_KEY_JWT
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
