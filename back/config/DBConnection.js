const mongoose = require('mongoose');

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    console.log('MongoDB connection etablished successfully');
  } catch (error) {
    console.log(error.message);
    process.exit();
    }
}

module.exports = DBConnection;