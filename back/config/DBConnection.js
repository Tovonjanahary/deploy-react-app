const mongoose = require('mongoose');

const DBConnection = () => {
  try {
    const conn = mongoose.connect("mongodb+srv://Tovonjanahary:Tovo06njanahary@cluster0.eaa36ov.mongodb.net/?retryWrites=true&w=majority", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    console.log('MongoDB connection etablished successfullyy');
  } catch (error) {
    console.log({error: "verifiez que vous avez une bonne connexion internet"});
    process.exit();
    }
}

module.exports = DBConnection;