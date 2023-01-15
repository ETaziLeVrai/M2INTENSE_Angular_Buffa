let Assignment = require('../model/assignment');
let Professor = require('../model/professors');
let CourseMaterial = require('../model/courseMaterials');

// Récupérer tous les assignments (GET)
/*function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}*/

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }
   

function getProfessors(req, res) {
    Professor.find((err, professors) => {
        if(err){
            res.send(err)
        }

        res.send(professors);
    });
}

function getCourseMaterials(req, res) {
    CourseMaterial.find((err, courseMaterials) => {
        if(err){
            res.send(err)
        }

        res.send(courseMaterials);
    });
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

function getProfessor(req, res){
    let professorId = req.params.id;

    Professor.findOne({ id: professorId }, (err, professor) => {
        if (err) { res.send(err) }
        res.json(professor);
    })
}

function getCourseMaterial(req, res) {
    let courseMaterialId = req.params.id;

    CourseMaterial.findOne({ id: courseMaterialId }, (err, courseMaterial) => {
        if (err) { res.send(err) }
        res.json(courseMaterial);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.remarque = req.body.remarque;
    assignment.matiere_id = req.body.matiere_id;
    assignment.professeur_id = req.body.professeur_id;
    assignment.auteur = req.body.auteur;
    assignment.note = req.body.note;
    
    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

function postProfessor(req, res) {
    let professor = new Professor();
    professor.id = req.body.id;
    professor.nom = req.body.nom;
    professor.prenom = req.body.prenom;
    professor.dateDeNaissance = req.body.dateDeNaissance;
    professor.photo = req.body.photo;

    console.log("POST professor reçu :");
    console.log(professor)

    professor.save((err) => {
        if (err) {
            res.send('cant post professor ', err);
        }
        res.json({ message: `${professor.nom} saved!` })
    })
}

function postCourseMaterial(req, res) {
    let courseMaterial = new CourseMaterial();
    courseMaterial.id = req.body.id;
    courseMaterial.nom = req.body.nom;
    courseMaterial.professeur = req.body.professeur;
    courseMaterial.photo = req.body.photo;

    console.log("POST courseMaterial reçu :");
    console.log(courseMaterial)

    courseMaterial.save((err) => {
        if (err) {
            res.send('cant post courseMaterial ', err);
        }
        res.json({ message: `${courseMaterial.nom} saved!` })
    })
}


// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

function updateProfessor(req, res) {
    console.log("UPDATE recu professor : ");
    console.log(req.body);
    Professor.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, professor) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }

        // console.log('updated ', professor)

    });

}

function updateCourseMaterial(req, res) {
    console.log("UPDATE recu courseMaterial : ");
    console.log(req.body);
    CourseMaterial.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, courseMaterial) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }

        // console.log('updated ', courseMaterial)

    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

function deleteProfessor(req, res) {

    Professor.findByIdAndRemove(req.params.id, (err, professor) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${professor.nom} deleted` });
    })
}

function deleteCourseMaterial(req, res) {

    CourseMaterial.findByIdAndRemove(req.params.id, (err, courseMaterial) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${courseMaterial.nom} deleted` });
    })
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getProfessors, postProfessor, getProfessor, updateProfessor, deleteProfessor, getCourseMaterials, postCourseMaterial, getCourseMaterial, updateCourseMaterial, deleteCourseMaterial};
