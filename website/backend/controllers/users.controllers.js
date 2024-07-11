const UserControllers = require("../services/user.services");
const { createJSONWebToken } = require('../utils/jwt');

const CreateUser = async (req, res) => {
    try {
        const user = req.body.user;
        const token = await createJSONWebToken(user.email);
        const result = await UserControllers.Create(user);
        if (result.success) {
            res.status(201).json({ message: result.message, token, id: result.id });
            console.log(result)
        } else {
            console.log("401")
            res.status(400).json({ message: result.message });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: `Could not create account: ${e.message}` });
    }
}

const AuthUser = async (req, res) => {
    try {
        const credentials = req.body.credentials;
        const result = await UserControllers.Auth(credentials);
        if (result.success) {
            const token = await createJSONWebToken(credentials.email, result.id);
            console.log(token)
            res.status(200).json({ message: result.message, token: token, id: result.id });
        } else {
            res.status(401).json({ message: result.message });
        }
    } catch (e) {
        res.status(500).json({ message: `Could not authenticate account: ${e.message}` });
    }
}

const GetUser = async (req, res) => {
    try {
        const id = await req.params.id;
        const result = await UserControllers.Get(id);
        if (result.success) {
            res.status(200).json({ message: result.message, user: result.user });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({ message: `Could not get user: ${e}` });
    }
}

module.exports = {
    AuthUser,
    CreateUser,
    GetUser
}
