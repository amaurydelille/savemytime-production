const Transaction = require('../services/transaction.services');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const CreateTransaction = async (req, res) => {
    try {
        const { user_id, amount } = req.body;
        const plan = amount === 150 ? 'Premium' : 'Classic';
        await Transaction.Create({ userId: user_id, amount: amount });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan,
                        },
                        unit_amount: Math.round(amount * 100), 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://savemytime-production-client.vercel.app/success',
            cancel_url: 'https://savemytime-production-client.vercel.app/cancel',
        });

        res.status(200).json({ id: session.id });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

module.exports = {
    CreateTransaction
};
