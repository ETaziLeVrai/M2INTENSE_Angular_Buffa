export class Assignment {
  _id?:string;
  id!:number;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  remarque!: String;
  matiere_id!: Number;
  professeur_id!: Number;
  auteur!: String;
  note!: Number;
}
