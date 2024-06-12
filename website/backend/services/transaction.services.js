const connectToDatabase = require('./db.services');
const getFormattedDate = require('../utils/date');
const { TRANSACTIONS } = require('../constants/collections');
const { ObjectId } = require('mongodb');

const Create = async ({ userId, amount }) => {
    try {
        const db = await connectToDatabase();
        const date = getFormattedDate();
        await db.collection(TRANSACTIONS).insertOne({
            user_id: userId,
            amount: amount,
            creation_date: date
        });
        return { success: true, message: 'Transaction made successfully.' }
    } catch(e) {
        return { success: false, message: 'Could not make the transaction.' }
    }
} 

const Get = async ({ userId }) => {
    try {
        const db = await connectToDatabase();
        const transactions = await db.collection(TRANSACTIONS).find({
            user_id: new ObjectId(userId)
        });
        return { success: true, transactions: transactions }
    } catch(e) {
        return { success: false, message: 'Could not get the transactions.' }
    }
}

module.exports = {
    Create,
    Get
}