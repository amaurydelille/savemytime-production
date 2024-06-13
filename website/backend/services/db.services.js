const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
      await client.connect();
      return client.db('SaveMyTime');
  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
  }
}

module.exports = connectToDatabase;
