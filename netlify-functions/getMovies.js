// netlify/functions/getMovies.js

const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  // MongoDB connection URI (use your own MongoDB connection string)
  const uri = 'mongodb+srv://abidshahriar135:zZH7JAIw6qVxf3Wk@cluster0.u9udy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('movieDB');
    const collection = db.collection('movies');

    // Fetch all movies
    const movies = await collection.find().toArray();

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(movies)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching movies' })
    };
  }
};
