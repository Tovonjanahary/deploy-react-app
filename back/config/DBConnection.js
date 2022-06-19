const mongoose = require('mongoose');

const DBConnection = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    console.log('MongoDB connection etablished successfully');
  } catch (error) {
    console.log({error: "verifiez que vous avez une bonne connexion internet"});
    process.exit();
    }
}

module.exports = DBConnection;