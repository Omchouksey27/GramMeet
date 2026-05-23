const mongoose = require('mongoose');
// const MongoURL = "mongodb+srv://<db_username>:<db_password>@ams.suwr2vf.mongodb.net/?appName=AMS"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;