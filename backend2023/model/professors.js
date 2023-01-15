let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfessorSchema = Schema({
    id: Number,
    nom: String,
    prenom: String,
    dateDeNaissance: Date,
    photo: Object
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Professor', ProfessorSchema);
