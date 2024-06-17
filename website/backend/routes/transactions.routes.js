const router = require('express').Router();
const Transactions = require('../controllers/transactions.controllers');
const bodyParser = require('body-parser');

router.post('/create-checkout-session', Transactions.CreateTransaction);
router.post('/stripe-event-listening', bodyParser.raw({ type: 'application/json' }), Transactions.HandleTransactionEvent);

module.exports = router;