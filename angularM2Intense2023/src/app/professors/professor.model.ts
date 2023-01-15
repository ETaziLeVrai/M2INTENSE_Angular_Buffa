export class Professor {
    _id?:string;
    id!:number;
    nom!: string;
    prenom!: string;
    dateDeNaissance!: Date;
    photo!: Object;

    getNom(): String {
      return this.nom;
    }
  }