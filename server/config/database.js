// Importing required modules
const mongoose = require("mongoose");
require("dotenv").config(); // Loading environment variables from .env file

// Extracting MongoDB connection URL from environment variables
const { MONGODB_URL } = process.env;
// console.log("MongoDB URL:", MONGODB_URL);

// Exporting a function to establish MongoDB connection
exports.connect = () => {
    // Connecting to MongoDB using Mongoose
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true, // Parse connection string using the new parser
        useUnifiedTopology: true // Use new Server Discovery and Monitoring engine
    })
    .then(() => { // Connection successful
        console.log("DB Connection Success");
    })
    .catch((err) => { // Connection failed
        console.log("DB Connection Failed");
        console.error(err); // Logging the error
        process.exit(1); // Exiting the process with exit code 1
    });
};
