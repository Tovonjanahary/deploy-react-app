const User = require('../models/userModel');

const userJobController = {
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { jobTitle, categorie, sous_categorie, description, site_web, ville } = req.body;
      if(!jobTitle || !categorie || !sous_categorie || !description || !site_web) {
        return res.status(406).json({error: "les champs du formulaire ne peuvent pas etre vide"});
      }
      const user = await User.findByIdAndUpdate(id, { jobTitle, categorie, sous_categorie, description, site_web, ville }, {
        new: true,
        runValidators:true
      });
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = userJobController;