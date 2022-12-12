import { Persona } from "./persona";
import { Cargo } from './cargo';

export class Profesor extends Persona {
    idProfesor: number;
    cargo: Cargo;
  
    constructor(idProfesor: number, cargo: Cargo) {
      super();
      this.idProfesor = idProfesor;
      this.cargo = cargo;
    }
  }