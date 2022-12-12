export class Puntaje {

    idPuntaje: number;
    idAlumno: number;
    nombreAlumno: string;
    apellidoAlumno: string;
    idProfesor: number;
    nombreProfesor: string;
    apellidoProfesor: string;
    idTema: number;
    tema: string;
    interes: number;
    complejidad: number;
    entendimiento: number;
    valoracion: number;
    observaciones: string;

    constructor(
        idPuntaje: number,
        idAlumno: number,
        nombreAlumno: string,
        apellidoAlumno: string,
        idProfesor: number,
        nombreProfesor: string,
        apellidoProfesor: string,    
        idTema: number,
        tema: string,
        interes: number,
        complejidad: number,
        entendimiento: number,
        valoracion: number,
        observaciones: string) {
        
        this.idPuntaje = idPuntaje;
        this.idAlumno = idAlumno;
        this.nombreAlumno = nombreAlumno;
        this.apellidoAlumno = apellidoAlumno;
        this.idProfesor = idProfesor;
        this.nombreProfesor = nombreProfesor;
        this.apellidoProfesor = apellidoProfesor;
        this.idTema = idTema;
        this.tema = tema;
        this.interes = interes;
        this.complejidad = complejidad;
        this.entendimiento = entendimiento;
        this.valoracion = valoracion;
        this.observaciones = observaciones;
        
    }

}