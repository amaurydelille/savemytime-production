const jwt = require('jsonwebtoken');

const createJSONWebToken = async (userEmail, userId) => {
    const token = await jwt.sign(
        { 
            id: userId,
            email: userEmail 
        },
        process.env.PRIVATE_KEY_JWT,
        { expiresIn: '24h' }
    );
    return token;
}

const verifyJSONWebToken = async (token) => {
    return jwt.verify(token, process.env.PRIVATE_KEY_JWT);
}

module.exports = {
    createJSONWebToken,
    verifyJSONWebToken
};



