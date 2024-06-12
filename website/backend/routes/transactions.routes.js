const router = require('express').Router();
const Transactions = require('../controllers/transactions.controllers');

router.post('/create-checkout-session', Transactions.CreateTransaction);

module.exports = router;