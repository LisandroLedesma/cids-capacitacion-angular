import { Component, OnInit } from '@angular/core';

import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
  
  alumnos: Alumno[] = [];
  alumnosVista: Alumno[];
  pagina: number;
  max: number;
  filtro: string;

  constructor(private alumnosService: AlumnosService,
              private spinner: NgxSpinnerService) {
                this.buscarAlumnos();
              }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.iniciarPaginador();
    }, 1000);
    
  }

  buscarAlumnos(): void {
    this.spinner.show();
    this.alumnosService.obtenerAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  ver(a){
    const id = a.idAlumno
    const cuil = a.cuil
    const edad = a.edad
    const rep = a.reparticion
    Swal.fire({
      icon: 'info',
      title: `${a.nombre} ${a.apellido}`,
      html: '<strong><b>ID</b></strong>: '+ id +'<br>' + 
      '<strong><b>CUIL</b></strong>: ' + cuil + '<br>' +
      '<strong><b>Edad</b></strong>: ' + edad + '<br>' +
      '<strong><b>Reparticion</b></strong>: ' + rep + '<br>'
    });
  }

  iniciarPaginador(){
    if (this.alumnos.length <= 10) {
      this.pagina = 0
    } else {
      this.pagina = + (String(this.alumnos.length)).split('')[0];
    }

  
    this.pagMax();

    // console.log(this.pagina);
    // console.log(this.max);

    this.alumnosVista = this.alumnos.slice(this.pagina, this.max);
  }

  pagMax() {
    if ((this.pagina + 10) > this.alumnos.length) {
      this.max = this.alumnos.length
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
      this.alumnosVista = this.alumnos.slice(this.pagina, this.max);
    }
  }

  pagSiguiente(){
    if ((this.pagina+10) > this.alumnos.length) {
      // nada
    } else {
      this.pagina = this.pagina + 10
      this.pagMax();
      this.alumnosVista = this.alumnos.slice(this.pagina, this.max);
    }
  }

  filtrarAlumnos() {
    this.alumnosVista = []
    // console.log(this.filtro);
    // console.log(this.alumnos);
    
    let res = [];
    for (let i = 0; i < this.alumnos.length; i++) {
      const nombre = String(this.alumnos[i].nombre.toUpperCase());
      const apellido = String(this.alumnos[i].apellido.toUpperCase());
      if (nombre.includes(String(this.filtro.toUpperCase())) ||
        apellido.includes(String(this.filtro.toUpperCase()))) {

        res.push(this.alumnos[i]);
        
        // console.log(this.alumnos[i]);
      }
    }
    this.alumnosVista = res;
    
    // console.log(this.alumnosVista);
  }

  mostrarTodo() {
    this.filtro = "";
    this.alumnosVista = this.alumnos;
  }
  
}
