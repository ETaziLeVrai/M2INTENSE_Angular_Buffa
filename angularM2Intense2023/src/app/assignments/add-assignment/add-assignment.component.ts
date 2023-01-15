import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseMaterial } from 'src/app/course-materials/course-materials.model';
import { Professor } from 'src/app/professors/professor.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  public addForm: FormGroup;

  assignment?:Assignment;

  matieres?: CourseMaterial[];
  professeurs?: Professor[];

  matiere?: CourseMaterial;
  professeur?: Professor;

  constructor(public authService:AuthService, private assignmentsService:AssignmentsService, public dialogRef: MatDialogRef<AddAssignmentComponent>,
              private router:ActivatedRoute, private fb: FormBuilder) {
                this.addForm = this.fb.group({
                  rendu: [null, Validators.required],
                  nom: [null, Validators.required],
                  dateDeRendu: [null, Validators.required],
                  remarque: [null, Validators.required],
                  matiere: [null, Validators.required],
                  professeur: [null, Validators.required],
                  auteur: [null, Validators.required],
                  note: [null, Validators.required]
                });
               }

  ngOnInit(): void {
    this.assignmentsService.getCourseMaterials().subscribe(courseMaterials => {
      this.matieres = courseMaterials;
    })
    this.assignmentsService.getProfessors().subscribe(professors => {
      this.professeurs = professors;
    })
  }

  onSubmit(){

    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.addForm.value.nom;
    nouvelAssignment.rendu = this.addForm.value.rendu;
    nouvelAssignment.dateDeRendu = this.addForm.value.dateDeRendu;
    nouvelAssignment.remarque = this.addForm.value.remarque;
    nouvelAssignment.matiere_id = this.addForm.value.matiere.id;
    nouvelAssignment.professeur_id = this.addForm.value.professeur.id;
    nouvelAssignment.auteur = this.addForm.value.auteur;
    nouvelAssignment.note = this.addForm.value.note;
    nouvelAssignment.id = Math.floor(Math.random()*100000000000000000);
    // le tableau est chez le papa comment faire ?
    //this.assignments.push(nouvelAssignment);

    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponse) => {
      console.log(reponse.message);
      // ON VA DEVOIR NAVIGUER AVEC LE ROUTER
      // VERS LE COMPOSANT QUI AFFICHE LA LISTE
      //this.router.navigate(['/home']);
    });

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
