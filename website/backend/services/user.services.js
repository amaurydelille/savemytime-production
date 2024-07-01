const connectToDatabase = require('./db.services');
const bcrypt = require('bcrypt');
const { checkPassword, hashPassword } = require('../utils/hash');
const getFormattedDate = require('../utils/date');
const { ObjectId } = require('mongodb');
const { USERS } = require('../constants/collections');

const Create = async (user) => {
    try {
        const db = await connectToDatabase();
        const hash = await hashPassword(user.password);
        const date = getFormattedDate();
        const existingUser = await db.collection(USERS).findOne({ email: user.email });
        if (existingUser) {
            return { success: false, message: 'Account already registered.' }
        }
        const newUser = { email: user.email, password: hash, plan: 0, creation_date: date };
        const result = await db.collection('users').insertOne(newUser);
        const userId = result.insertedId;
        return { success: true, message: 'Account created successfully.', id: userId };
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Account could not be created.' };
    }
}

const Auth = async (credentials) => {
    try {
        const db = await connectToDatabase();
        const user = await db.collection(USERS).findOne({ email: credentials.email });

        if (user) {
            const passwordMatch = await checkPassword(credentials.password, user.password);
            if (passwordMatch) {
                return { success: true, message: 'Account authenticated successfully.', id: user._id };
            } else {
                return { success: false, message: 'Invalid email or password.' };
            }
        } else {
            return { success: false, message: 'User not found.' };
        }
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Account could not be authenticated.' };
    }
}

const Get = async (id) => {
    try {
        const db = await connectToDatabase();
        const user = await db.collection(USERS).findOne({ _id: new ObjectId(id) });
        if (user) {
            return { success: true, message: 'User could get founded.', user: user }
        } else {
            return { success: false, message: 'User could not get founded.' }
        }
    } catch(e) {
        console.log(e);
        return { success: false, message: 'User could not be founded.' };
    }
}

const UpdatePlan = async (user) => {
    try {
        const { id, plan } = user;
        const db = await connectToDatabase();
        const result = await db.collection(USERS).updateOne(
            { _id: new ObjectId(id) },
            { $set: { plan: plan } } 
        );
        console.log(result);
        if (result.modifiedCount === 1) {
            return { success: true };
        } else {
            return { success: false, message: "No document matched the query. Updated 0 documents." };
        }
    } catch(e) {
        console.error(e); 
        return { success: false, message: e.message };
    }
};

module.exports = {
    Auth,
    Create,
    Get,
    UpdatePlan
}
