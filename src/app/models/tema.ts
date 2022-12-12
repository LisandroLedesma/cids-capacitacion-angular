export class Temas {

    id: number;
    nombre: string;
    descripcion: string;
    duracion: string;

    constructor(id: number,
        nombre: string,
        descripcion: string,
        duracion: string) {
        
            this.id = id;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.duracion = duracion;
        
    }

}