export class Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  cuil: string;
  edad: number;

  constructor(
    idPersona?: number,
    nombre?: string,
    apellido?: string,
    cuil?: string,
    edad?: number
  ) {
    this.idPersona = idPersona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cuil = cuil;
    this.edad = edad;
  }
}
