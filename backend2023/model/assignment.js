let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var aggregateQuery = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    remarque: String,
    matiere_id: Number,
    professeur_id: Number,
    auteur: String,
    note: Number
});

AssignmentSchema.plugin(aggregateQuery);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
