const Token = require('../services/token.services');

const CreateTokens = async (req, res) => {
    try {
        const { userId, plan } = req.body;
        const amount = plan === 0 ? 50 : 150;
        const result = await Token.Create({ userId, amount });
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(400).json(result.message);
        }
    } catch(e) {
        res.status(500).json(e);
    }
}

const UseToken = async (req, res) => {
    try {
        const userId = req.body;
        const result = await Token.Use({ userId });
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(400).json(result.message);
        }
    } catch(e) {
        res.status(500).json(e);
    }
}

const RechargeTokens = async (req, res) => {
    try {
        const { userId, plan } = req.body;
        const amount = plan === 0 ? 50 : 150;
        const result = await Token.Create({ userId, amount });
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(400).json(result.message);
        }
    } catch(e) {
        res.status(500).json(e);
    }
}

const GetTokens = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Token.Get({ userId: id });
        if (result.success) {
            res.status(200).json(result.tokenPlan);
        } else {
            res.status(400).json(result.message);
        }
    } catch(e) {
        res.status(500).jdon(e);
    }
}

module.exports = {
    CreateTokens,
    UseToken,
    RechargeTokens,
    GetTokens
}