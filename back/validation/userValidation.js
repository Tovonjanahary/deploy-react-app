userValidation = (name, firstName, email, birthdate, phone, adresse, password) => {
  if(!name || !firstName || !email || !birthdate || !phone || !adresse || !password) {
    return "Tous les champs du formulaire sont obligatoires";
  }
}

module.exports = userValidation;