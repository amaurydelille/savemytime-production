const router = require('express').Router();
const Tokens = require('../controllers/tokens.controllers');

router.post('/tokens', Tokens.CreateTokens);
router.put('/tokens', Tokens.UseToken);
router.post('/tokens/recharge', Tokens.RechargeTokens);
router.get('/tokens/:id', Tokens.GetTokens);

module.exports = router;