const mongoose = require("mongoose");

function DbConnection(){
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL);
  

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", function () {
      console.log("MongoDB connected successfully");
    });
}

module.exports = DbConnection;



