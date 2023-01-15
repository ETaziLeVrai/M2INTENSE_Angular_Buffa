import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { Professor } from '../professors/professor.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;

  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  // pour l'affichage en table
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'remarque', 'matiere_id', 'professeur_id', 'auteur', 'note', 'action'];

  assignments:Assignment[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  public dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  constructor(public assignmentsService:AssignmentsService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

   ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.getAssignments();
    console.log("this.dataSource");
    console.log(this.dataSource);

    console.log("le professeur 1")
    this.assignmentsService.getProfessor(1).subscribe((val:any) => console.log(val.nom));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAssignments() {
  this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.dataSource = new MatTableDataSource(data.docs);
      this.dataSource.sort = this.sort;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;


      console.log("données reçues");
    });
  }

  // LES METHODE POUR RECUPERER LES NOMS DES PROF ET DES MATIERES
  // Non utilisées car l'application crash après
  getProfessorNom(id: number): String {
    let nom: String = "";
    this.assignmentsService.getProfessor(id).subscribe((val:any) => 
    nom = val.nom + " " + val.prenom);
    return nom;
  }

  getMatiereNom(id: number): String {
    let nom: String = "";
    this.assignmentsService.getCourseMaterial(id).subscribe((val:any) =>
    nom = val.nom);
    return nom;
  }

  assignmentClique(assignment:Assignment){
    console.log("assignmentClique : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  pageSuivante() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.getAssignments();
    }
  }

  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.getAssignments();
    }
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }
  

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAssignments();
    });
  }

  openUpdateDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(EditAssignmentComponent, {
      width: '50%',
      data: { assignment: assignment },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAssignments();
    });
  }

  deleteAssignment(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(() => {
      this.getAssignments();
    });
  }
  
}
