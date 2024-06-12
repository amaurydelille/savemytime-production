const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://amaurysavemytime:5v1KgI6YfrvQkT5u@cluster0.pwqhc89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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


