const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected to host: ${conn.connection.host}`.blue.bold +
        '\n' +
        `Connected to Database: ${conn.connection.db.databaseName}`.yellow.bold
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
