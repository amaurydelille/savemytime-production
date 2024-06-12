const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkPassword = async (plainPassword, encryptedPassword) => {
    const result = await bcrypt.compare(plainPassword, encryptedPassword);
    return result;
}

const hashPassword = async (passwordToHash) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(passwordToHash, salt);
    return hash;
}

module.exports = {
    saltRounds,
    checkPassword,
    hashPassword
};
