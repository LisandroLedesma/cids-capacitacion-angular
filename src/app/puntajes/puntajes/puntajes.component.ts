import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { Puntaje } from '../../models/puntaje';

import { PuntajesService } from '../services/puntajes.service';
import { TemasService } from '../../services/temas.service';
import { AlumnosService } from '../../services/alumnos.service';
import { ProfesoresService } from '../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {

  puntajes: Puntaje[];
  puntajesVista: Puntaje[];
  pagina: number;
  max: number;
  filtro: string;

  constructor(private spinner: NgxSpinnerService,
              private puntajeService: PuntajesService,
              private temaService: TemasService,
              private alumnoService: AlumnosService,
              private profesorService: ProfesoresService) {
                this.obtenerPuntajes();
              }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.iniciarPaginador();
    }, 1000);
  }

  obtenerPuntajes() {
    this.spinner.show();

    this.puntajeService.obtenerPuntajes().subscribe(
      (data) => {
        this.puntajes = data;
        this.spinner.hide();
      }, (err) => {
        console.log(err);
      }
    );
  }

  ver(p) {
    const idPuntaje = p.idPuntaje;
    const idAlumno = p.idAlumno;
    const nombreAlumno = p.nombreAlumno;
    const apellidoAlumno = p.apellidoAlumno;
    const idProfesor = p.idProfesor;
    const nombreProfesor = p.nombreProfesor;
    const apellidoProfesor = p.apellidoProfesor;
    const idTema = p.idTema;
    const tema = p.tema;
    const interes = p.interes;
    const complejidad = p.complejidad;
    const entendimiento = p.entendimiento;
    const valoracion = p.valoracion;
    const observaciones = p.observaciones;
    
    Swal.fire({
      icon: 'info',
      title: `Puntaje`,
      html: 
      '<strong><b> Profesor </b></strong>' + '<br>' +
      '<strong><b> ID</b></strong>: '+ idProfesor +'<br>' + 
      '<strong><b> Nombre</b></strong>: '+ nombreProfesor +'<br>' + 
      '<strong><b> Apellido</b></strong>: '+ apellidoProfesor +'<br>' + 
      '<strong><b> Alumno </b></strong>' + '<br>' +
      '<strong><b> ID</b></strong>: ' + idAlumno + '<br>' +
      '<strong><b> Nombre</b></strong>: ' + nombreAlumno + '<br>' +
      '<strong><b> Apellido</b></strong>: ' + apellidoAlumno + '<br>' + '<strong><b> Tema </b></strong>' + '<br>' +
      '<strong><b> ID</b></strong>: ' + idTema + '<br>' +
      '<strong><b> nombre</b></strong>: ' + tema + '<br>' +
      '<strong><b> Puntaje </b></strong>' + '<br>' +
      '<strong><b> ID</b></strong>: '+ idPuntaje +'<br>' +
      '<strong><b> Interes</b></strong>: '+ interes +'<br>' +
      '<strong><b> Complejidad</b></strong>: '+ complejidad +'<br>' +
      '<strong><b> Entendimiento</b></strong>: '+ entendimiento +'<br>' +
      '<strong><b> Valoracion</b></strong>: '+ valoracion +'<br>' +
      '<strong><b> Observaciones</b></strong>: '+ observaciones +'<br>' 
    });
  }

  iniciarPaginador(){
    if (this.puntajes.length <= 10) {
      this.pagina = 0
    } else {
      this.pagina = + (String(this.puntajes.length)).split('')[0];
    }

  
    this.pagMax();

    // console.log(this.pagina);
    // console.log(this.max);

    this.puntajesVista = this.puntajes.slice(this.pagina, this.max);
  }

  pagMax() {
    if ((this.pagina + 10) > this.puntajes.length) {
      this.max = this.puntajes.length
    } else {
      this.max = this.pagina + 10
    }
  }

  pagPrevia(){
    if ((this.pagina-10) < 0) {
      // nada
    } else {
      this.pagina = this.pagina - 10
      this.pagMax();
      this.puntajesVista = this.puntajes.slice(this.pagina, this.max);
    }
  }

  pagSiguiente(){
    if ((this.pagina+10) > this.puntajes.length) {
      // nada
    } else {
      this.pagina = this.pagina + 10
      this.pagMax();
      this.puntajesVista = this.puntajes.slice(this.pagina, this.max);
    }
  }

  filtrarPuntajes() {
    this.puntajesVista = []
    // console.log(this.filtro);
    // console.log(this.alumnos);
    
    let res = [];
    for (let i = 0; i < this.puntajes.length; i++) {
      const nombreP = String(this.puntajes[i].nombreProfesor.toUpperCase());
      const apellidoP = String(this.puntajes[i].apellidoProfesor.toUpperCase());
      const nombreA = String(this.puntajes[i].nombreAlumno.toUpperCase());
      const apellidoA = String(this.puntajes[i].apellidoAlumno.toUpperCase());
      if ((nombreP.includes(String(this.filtro.toUpperCase())) ||
        apellidoP.includes(String(this.filtro.toUpperCase()))) ||
        (nombreA.includes(String(this.filtro.toUpperCase())) ||
        apellidoA.includes(String(this.filtro.toUpperCase())))) {

        res.push(this.puntajes[i]);
        
        // console.log(this.alumnos[i]);
      }
    }
    this.puntajesVista = res;
    
    // console.log(this.alumnosVista);
  }

  mostrarTodo() {
    this.filtro = "";
    this.puntajesVista = this.puntajes;
  }

}
