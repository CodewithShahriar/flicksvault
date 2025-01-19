// server.js
const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// A sample route to test the server
app.get("/", (req, res) => {
    res.send("Hello from Node.js Backend!");
});

// Add movie to database (this is just a dummy for now)
app.post("/add-movie", (req, res) => {
    const movie = req.body;
    console.log("Movie added: ", movie);
    res.status(200).json({ message: "Movie added successfully!" });
});

// Expose the app via a serverless function
module.exports.handler = serverless(app);
