const jwt = require('jsonwebtoken');

const createJSONWebToken = async (userEmail) => {
    const token = await jwt.sign(
        { email: userEmail },
        process.env.PRIVATE_KEY_JWT,
        { expiresIn: '72h' }
    );
    return token;
}

const verifyJSONWebToken = async (token) => {
    if (token) {
        try {
            const authorized = await jwt.verify(token, process.env.PRIVATE_KEY_JWT);
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
