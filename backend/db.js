const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const password = process.env.DBPASS

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://mehedi:${password}@mehedi.qadx9f9.mongodb.net/rnaProtDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
