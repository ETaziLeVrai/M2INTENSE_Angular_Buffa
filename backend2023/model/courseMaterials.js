let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CourseMaterialSchema = Schema({
    id: Number,
    nom: String,
    professeur: Number,
    photo: Object
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('CourseMaterial', CourseMaterialSchema);
