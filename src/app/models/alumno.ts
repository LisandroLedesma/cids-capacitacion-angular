import { Persona } from './persona';
import { Reparticion } from './reparticion';

export class Alumno extends Persona {
  idAlumno: number;
  reparticion: Reparticion;

  constructor(idAlumno: number, reparticion: Reparticion) {
    super();
    this.idAlumno = idAlumno;
    this.reparticion = reparticion;
  }
}
