import { Component, OnInit } from '@angular/core';

import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../models/profesor';

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesores: Profesor[];
  profesoresVista: Profesor[];
  pagina: number;
  max: number;
  filtro: string;

  constructor(private profesoresService: ProfesoresService,
              private spinner: NgxSpinnerService) {
                this.buscarProfesores();
              }

  ngOnInit(): void {
    setTimeout(() => {
      this.iniciarPaginador();
    }, 1000);
  }

  buscarProfesores(): void {
    this.spinner.show();
    this.profesoresService.obtenerProfesores().subscribe(
      (data) => {
        this.profesores = data;
        //console.log(this.profesores);
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  ver(p) {
    const id = p.idProfesor
    const cuil = p.cuil
    const edad = p.edad
    const cargo = p.cargo
    Swal.fire({
      icon: 'info',
      title: `${p.nombre} ${p.apellido}`,
      html: '<strong><b>ID</b></strong>: '+ id +'<br>' + 
      '<strong><b>CUIL</b></strong>: ' + cuil + '<br>' +
      '<strong><b>Edad</b></strong>: ' + edad + '<br>' +
      '<strong><b>Cargo</b></strong>: ' + cargo + '<br>'
    });
  }

  iniciarPaginador(){
    if (this.profesores.length <= 10) {
      this.pagina = 0
    } else {
      this.pagina = + (String(this.profesores.length)).split('')[0];
    }

  
    this.pagMax();

    // console.log(this.pagina);
    // console.log(this.max);

    this.profesoresVista = this.profesores.slice(this.pagina, this.max);
  }

  pagMax() {
    if ((this.pagina + 10) > this.profesores.length) {
      this.max = this.profesores.length
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
      this.profesoresVista = this.profesores.slice(this.pagina, this.max);
    }
  }

  pagSiguiente(){
    if ((this.pagina+10) > this.profesores.length) {
      // nada
    } else {
      this.pagina = this.pagina + 10
      this.pagMax();
      this.profesoresVista = this.profesores.slice(this.pagina, this.max);
    }
  }

  filtrarProfesores() {
    this.profesoresVista = []
    // console.log(this.filtro);
    // console.log(this.alumnos);
    
    let res = [];
    for (let i = 0; i < this.profesores.length; i++) {
      const nombre = String(this.profesores[i].nombre.toUpperCase());
      const apellido = String(this.profesores[i].apellido.toUpperCase());
      if (nombre.includes(String(this.filtro.toUpperCase())) ||
        apellido.includes(String(this.filtro.toUpperCase()))) {

        res.push(this.profesores[i]);
        
        // console.log(this.alumnos[i]);
      }
    }
    this.profesoresVista = res;
    
    // console.log(this.alumnosVista);
  }

  mostrarTodo() {
    this.filtro = "";
    this.profesoresVista = this.profesores;
  }

}
