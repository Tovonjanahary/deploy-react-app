const mongoose = require('mongoose');

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Tovonjanahary:Tovo06njanahary@cluster0.eaa36ov.mongodb.net/?retryWrites=true&w=majority", { 
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