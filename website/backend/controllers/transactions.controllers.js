const { ObjectId } = require('mongodb');
const Transaction = require('../services/transaction.services');
const Tokens = require('../services/token.services');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const User = require('../services/user.services');

const tokensDict = {
    999: 50,
    2499: 150,
    7999: 300
};

const planDict = {
    999: 'Classic',
    2499: 'Expert',
    7999: 'Premium'
};

const CreateTransaction = async (req, res) => {
    try {
        const { user_id, amount } = req.body;
        const plan = planDict[Math.round(amount * 100)];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            payment_intent_data: {
                metadata: {
                    user_id: user_id.toString(),
                    amount: amount.toString()
                }
            } ,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan,
                        },
                        unit_amount: 55,//Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://savemytime-production-client.vercel.app/success',
            cancel_url: 'https://savemytime-production-client.vercel.app/cancel',
        });
        session.payment_intent_data.metadata = { 
            user_id: user_id.toString(),
            amount: amount.toString()
        }
        res.status(200).json({ id: session.id });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

const HandleTransactionEvent = (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            handlePaymentIntentSucceeded(paymentIntentSucceeded);
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            handlePaymentIntentFailed(paymentIntentFailed);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

const handlePaymentIntentSucceeded = async (paymentIntent) => {
    console.log(paymentIntent)
    const userId = paymentIntent.metadata.user_id;
    const amount = parseInt(paymentIntent.metadata.amount);
    const tokensNumber = tokensDict[amount * 100];
    const plan = planDict[amount * 100];
    const user = { id: userId, plan: plan };
    console.log(userId, amount, tokensNumber, plan, user)

    await Transaction.Create({ userId: new ObjectId(userId), amount: amount * 100 });
    await User.UpdatePlan(user)
    await Tokens.Create({ userId: new ObjectId(userId), amount: tokensNumber });
};


const handlePaymentIntentFailed = (paymentIntent) => {
    // Handle payment failure
};

module.exports = {
    CreateTransaction,
    HandleTransactionEvent
};
