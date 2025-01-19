// netlify/functions/addMovie.js

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  // Parse the incoming request body
  const movie = JSON.parse(event.body);

  // MongoDB connection URI (use your own MongoDB connection string)
  const uri = 'mongodb+srv://abidshahriar135:zZH7JAIw6qVxf3Wk@cluster0.u9udy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('movieDB');
    const collection = db.collection('movies');

    // Insert the movie into the database
    await collection.insertOne(movie);

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Movie added successfully' })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error adding movie' })
    };
  }
};
