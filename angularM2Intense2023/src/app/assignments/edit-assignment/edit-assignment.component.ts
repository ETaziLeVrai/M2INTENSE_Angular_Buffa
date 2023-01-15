import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { CourseMaterial } from 'src/app/course-materials/course-materials.model';
import {MatSelectModule} from '@angular/material/select';
import { Professor } from 'src/app/professors/professor.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  public editForm: FormGroup;

  assignment?:Assignment;

  matieres?: CourseMaterial[];
  professeurs?: Professor[];

  matiere?: CourseMaterial;
  professeur?: Professor;

  constructor(public authService:AuthService, public dialogRef: MatDialogRef<EditAssignmentComponent>,
    private assignmentsService:AssignmentsService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { 
                this.editForm = this.fb.group({
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
    console.log("this.data");
    console.log(this.data);

    this.assignmentsService.getAssignment(this.data.assignment.id).subscribe(assignment => {
      this.assignment = assignment;
    })

    this.editForm.controls['rendu'].setValue(this.data.assignment.rendu);
    this.editForm.controls['nom'].setValue(this.data.assignment.nom);
    this.editForm.controls['dateDeRendu'].setValue(this.data.assignment.dateDeRendu);
    this.editForm.controls['remarque'].setValue(this.data.assignment.remarque);

    this.assignmentsService.getCourseMaterial(this.data.assignment.matiere_id).subscribe(matiere => {
      this.matiere = matiere;
    })

    this.editForm.controls['matiere'].setValue(this.matiere);

    this.assignmentsService.getProfessor(this.data.assignment.professeur_id).subscribe(professeur => {
      this.professeur = professeur;
    })

    this.editForm.controls['professeur'].setValue(this.professeur);
    this.editForm.controls['auteur'].setValue(this.data.assignment.auteur);
    this.editForm.controls['note'].setValue(this.data.assignment.note);

    this.assignmentsService.getCourseMaterials().subscribe(courseMaterials => {
      this.matieres = courseMaterials;
    })
    this.assignmentsService.getProfessors().subscribe(professors => {
      this.professeurs = professors;
    })
  }

  onSaveAssignment() {
    if(!this.assignment) return;

    this.assignment.nom = this.editForm.value.nom;
    this.assignment.rendu = this.editForm.value.rendu;
    this.assignment.dateDeRendu = this.editForm.value.dateDeRendu;
    this.assignment.remarque = this.editForm.value.remarque;
    this.assignment.matiere_id = this.editForm.value.matiere.id;
    this.assignment.professeur_id = this.editForm.value.professeur.id;
    this.assignment.auteur = this.editForm.value.auteur;
    this.assignment.note = this.editForm.value.note;
    

    this.assignmentsService.updateAssignment(this.assignment)
    .subscribe(reponse => {
      console.log("Réponse du serveur : " + reponse.message);

      // on re-affiche la liste
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
