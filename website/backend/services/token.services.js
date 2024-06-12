const connectToDatabase = require('./db.services');
const getFormattedDate = require('../utils/date');
const { ObjectId } = require('mongodb');

const Create = async ({ userId, amount }) => {
    try {
        const db = await connectToDatabase();
        const latest_recharge_date = getFormattedDate();
        const plan = amount === 150 ? 2 : 1;
        await db.collection('tokens').insertOne({ userId, amount, plan, latest_recharge_date });
        return { success: true, message: 'Tokens created successfully.' }
    } catch(e) {
        return { success: false, message: 'Tokens could not be created successfully.' }
    }
}

const Use = async ({ userId }) => {
    try {
        const db = await connectToDatabase();
        const tokensObject = await db.collection('tokens').findOne({ userId: userId });
        if (tokensObject.amount === 0) {
            return { success: false, message: 'You don\'t have enough tokens, please renew your plan. ' }
        } else {
            await db.collection('tokens').updateOne({ userId: userId }, { amount: amount - 1 });
            return { success: true }
        }
    } catch(e) {
        return { success: false, message: 'Could not use a token.' }
    }
}

const Recharge = async ({ userId, tokensQuantity }) => {
    try {
        const db = await connectToDatabase();
        const latest_recharge_date = getFormattedDate();
        const plan = tokensQuantity === 150 ? 2 : 1;
        await db.collection('tokens').updateOne({ user_id: userId }, { amount: amount + tokensQuantity, plan: plan, latest_recharge_date: latest_recharge_date });
        return { success: true, message: 'Recharged your tokens successfully.' }
    } catch(e) {
        return { success: false, message: 'Could not recharge your tokens.' }
    }
}

const Get = async ({ userId }) => {
    try {
        const db = await connectToDatabase();
        const tokenPlan = await db.collection('tokens').findOne({ user_id: new ObjectId(userId) });
        return { success: true, tokenPlan: tokenPlan }
    } catch(e) {
        return { success: false, message: 'Could net get user plan.' }
    }
}

module.exports = {
    Create,
    Use,
    Recharge,
    Get
}