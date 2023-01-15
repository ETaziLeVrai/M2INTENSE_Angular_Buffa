import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { dataPourPeuplerBD } from './data';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../professors/professor.model';
import { CourseMaterial } from '../course-materials/course-materials.model';
import { dataPourPeuplerBDProfessors } from './dataProfessors';
import { dataPourPeuplerBDCourseMaterials } from './dataCourseMaterials';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];
  professors:Professor[] = [];
  courseMaterials:CourseMaterial[] = [];
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uriAssignments = "http://localhost:8010/api/assignments";
  uriProfessors = "http://localhost:8010/api/professors";
  uriCourseMaterials = "http://localhost:8010/api/courseMaterials";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uriAssignments);
  }
  getProfessors():Observable<Professor[]> {
    return this.http.get<Professor[]>(this.uriProfessors);
  }
  getCourseMaterials():Observable<CourseMaterial[]> {
    return this.http.get<CourseMaterial[]>(this.uriCourseMaterials);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uriAssignments + "?page=" + page + "&limit=" + limit);
  }

  getProfessorsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Professor[]>(this.uriProfessors + "?page=" + page + "&limit=" + limit);
  }

  getCourseMaterialsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<CourseMaterial[]>(this.uriCourseMaterials + "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.uriAssignments}/${id}`)
  }

  getProfessor(id:number):Observable<Professor|undefined> {
    return this.http.get<Professor>(`${this.uriProfessors}/${id}`)
  }

  getCourseMaterial(id:number):Observable<CourseMaterial|undefined> {
    return this.http.get<CourseMaterial>(`${this.uriCourseMaterials}/${id}`)
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    // ex utilisation du service de log
    this.loggingService.log(assignment.nom, "ajouté");

    //return of("Assignment ajouté");
    return this.http.post(this.uriAssignments, assignment);
  }

  addProfessor(professor:Professor):Observable<any> {
    this.loggingService.log(professor.nom, "ajouté");
    return this.http.post(this.uriProfessors, professor);
  }

  addCourseMaterial(courseMaterial:CourseMaterial):Observable<any> {
    this.loggingService.log(courseMaterial.nom, "ajouté");
    return this.http.post(this.uriCourseMaterials, courseMaterial);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*const position = this.assignments.indexOf(assignment);
    this.assignments.splice(position,1);
  */
      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "supprimé");

    //return of("Assignment supprimé");
    return this.http.delete<string>(`${this.uriAssignments}/${assignment._id}`);

  }

  deleteProfessor(professor:Professor):Observable<any> {
      this.loggingService.log(professor.nom, "supprimé");
      return this.http.delete<string>(`${this.uriProfessors}/${professor._id}`);
  }

  deleteCourseMaterial(courseMaterial:CourseMaterial):Observable<any> {
      this.loggingService.log(courseMaterial.nom, "supprimé");
      return this.http.delete<string>(`${this.uriCourseMaterials}/${courseMaterial._id}`);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // Rien à faire pour le moment, plus tard
    // il faudra faire une requête HTTP PUT
    // sur un web service distant etc.

      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "modifié");

    //return of("Assignment modifié");
    return this.http.put<Assignment>(this.uriAssignments, assignment);
  }

  updateProfessor(professor:Professor):Observable<any> {
    this.loggingService.log(professor.nom, "modifié");
    return this.http.put<Professor>(this.uriProfessors, professor);
  }

  updateCourseMaterial(courseMaterial:CourseMaterial):Observable<any> {
    this.loggingService.log(courseMaterial.nom, "modifié");
    return this.http.put<CourseMaterial>(this.uriCourseMaterials, courseMaterial);
  }


  /*peuplerBD() {
    dataPourPeuplerBD.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(msg => {
        console.log(msg);
      })
    })
  }*/

  peuplerBDAssignmentAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];
 
    dataPourPeuplerBD.forEach((a:any) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.matiere_id = a.matiere_id;
      nouvelAssignment.professeur_id = a.professeur_id;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;
 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  peuplerBDProfessorAvecForkJoin(): Observable<any> {
    const appelsVersAddProfessor:any = [];
 
    dataPourPeuplerBDProfessors.forEach((p:any) => {
      const nouvelProfessor:any = new Professor();

      nouvelProfessor.id = p.id;
      nouvelProfessor.nom = p.nom;
      nouvelProfessor.prenom = p.prenom;
      nouvelProfessor.dateDeNaissance = new Date(p.dateDeNaissance);
      nouvelProfessor.photo = p.photo;
 
      appelsVersAddProfessor.push(this.addProfessor(nouvelProfessor));
    });
    return forkJoin(appelsVersAddProfessor); // renvoie un seul Observable pour dire que c'est fini
  }
 
  peuplerBDCourseMaterialAvecForkJoin(): Observable<any> {
    const appelsVersAddCourseMaterial:any = [];
 
    dataPourPeuplerBDCourseMaterials.forEach((cm:any) => {
      const nouvelCourseMaterial:any = new CourseMaterial();

      nouvelCourseMaterial.id = cm.id;
      nouvelCourseMaterial.nom = cm.nom;
      nouvelCourseMaterial.professeur = cm.professeur;
      nouvelCourseMaterial.photo = cm.photo;
 
      appelsVersAddCourseMaterial.push(this.addCourseMaterial(nouvelCourseMaterial));
    });
    return forkJoin(appelsVersAddCourseMaterial); // renvoie un seul Observable pour dire que c'est fini
  }

  peuplerBDAvecForkJoin() {
    this.peuplerBDAssignmentAvecForkJoin()
    .subscribe(msg => {
      console.log(msg);
    })
  }

}
