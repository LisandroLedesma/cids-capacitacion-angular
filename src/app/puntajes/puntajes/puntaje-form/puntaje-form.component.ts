import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlumnosService } from '../../../services/alumnos.service';
import { ProfesoresService } from '../../../services/profesores.service';
import { TemasService } from '../../../services/temas.service';

import { Alumno } from '../../../models/alumno';
import { Temas } from '../../../models/tema';
import { Profesor } from '../../../models/profesor';
import { Puntaje } from '../../../models/puntaje';

import Swal from 'sweetalert2'
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-puntaje-form',
  templateUrl: './puntaje-form.component.html',
  styleUrls: ['./puntaje-form.component.css']
})
export class PuntajeFormComponent implements OnInit {

  form: FormGroup;
  titulo: string = "Nuevo Puntaje";
  alumnos: Alumno[];
  profesores: Profesor[]
  temas: Temas[];
  puntaje: Puntaje;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alumnosService: AlumnosService,
              private profesoresService: ProfesoresService,
              private temasService: TemasService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private puntajesService: PuntajesService) {
                this.spinner.show();
                this.obtenerAlumnos();
                this.obtenerProfesores();
                this.obtenerTemas();
                this.spinner.hide();
              }

  ngOnInit(): void {
    this.crearForm();
    setTimeout(() => {
      this.cargaEditarPuntaje();  
    }, 1000);
  }

  crearForm() {
    this.form = this.fb.group({
      Alumno: [null, [Validators.required]],
      Profesor: [null, [Validators.required] ],
      Tema: [null, [Validators.required] ],
      Interes: [null, [Validators.required] ],
      Complejidad: [null, [Validators.required] ],
      Entendimiento: [null, [Validators.required] ],
      Valoracion: [null, [Validators.required] ],
      Observaciones: [null, [Validators.required] ],
    });
  }

  obtenerAlumnos(){
    this.alumnosService.obtenerAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
      }, (err) => {
        console.log(err);
      }
    )
  }

  obtenerProfesores(){
    this.profesoresService.obtenerProfesores().subscribe(
      (data) => {
        this.profesores = data;
      }, (err) => {
        console.log(err);
      }
    )
  }

  obtenerTemas() {
    this.temasService.obtenerTemas().subscribe(
      (data) => {
        this.temas = data;
      }, (err) => {
        console.log(err);
      }
    )
  }

  guardar(){
    this.spinner.show();
    //console.log(this.form.value);
    const body = {
      "idAlumno": +this.form.value.Alumno,
      "idProfesor": +this.form.value.Profesor,
      "idTema": +this.form.value.Tema,
      "data": {
          "interes": +this.form.value.Interes,
          "complejidad": +this.form.value.Complejidad,
          "entendimiento": +this.form.value.Entendimiento,
          "valoracion": +this.form.value.Valoracion,
          "observaciones": this.form.value.Observaciones
    }
  }
  this.puntajesService.nuevoPuntaje(body).subscribe(
    (res) => {
      //console.log(res);
      //console.log("Alumno creado");
      this.spinner.hide();
      Swal.fire({
        icon: 'success',
        title: 'Puntaje Registrado!',
        showConfirmButton: true,
        timer: 5000
      })
    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el puntaje!',
        showConfirmButton: true,
        timer: 5000
      })
    }
  )
}

  validarModificacion() {
    this.titulo = "Editar Puntaje";
    this.activatedRoute.params.subscribe( params => {
      this.puntajesService.obtenerPuntajeId(params['id']).subscribe( p => {
        
        //console.log(p);
        this.puntaje = p;
        //console.log(this.puntaje);

        this.form.patchValue({
          Alumno: this.puntaje.idAlumno,
          Profesor: this.puntaje.idProfesor,
          Tema: this.puntaje.idTema,
          Interes: String(this.puntaje.interes),
          Complejidad: String(this.puntaje.complejidad),
          Entendimiento: String(this.puntaje.entendimiento),
          Valoracion: String(this.puntaje.valoracion),
          Observaciones: this.puntaje.observaciones,
        })
      });
    });
}

  cargaEditarPuntaje() {

  this.activatedRoute.params.subscribe( params => {
    if (params['id'] >= 0) {
      this.validarModificacion()
    }
  });
}

  abrirModalEditar(){
  Swal.fire({
    title: 'Confirmacion',
    text: "¿Esta seguro que desea editar este puntaje?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      return this.editar();
    }
  })
}

  editar(){
    this.spinner.show();

    //console.log(this.form.value);
    const body = {
      "idAlumno": +this.puntaje.idAlumno,
      "idProfesor": +this.puntaje.idProfesor,
      "idTema": +this.puntaje.idTema,
      "idPuntaje": +this.puntaje.idPuntaje,
      "data": {
        "idAlumno": +this.form.value.Alumno,
        "idProfesor": +this.form.value.Profesor,
        "idTema": +this.form.value.Tema,
        "interes": +this.form.value.Interes,
        "complejidad": +this.form.value.Complejidad,
        "entendimiento": +this.form.value.Entendimiento,
        "valoracion": +this.form.value.Valoracion,
        "observaciones": String(this.form.value.Observaciones) 
      }
    }

    this.puntajesService.actualizarPuntaje(body).subscribe({
      next: (res) => {
        this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Puntaje modificado con éxito!!',
              showConfirmButton: true,
              timer: 5000
            })
      },
      error: (err) =>{
        console.log(err);
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron modificar los datos del puntaje',
          showConfirmButton: true,
          timer: 5000
        })
      }
    })
  }

  abrirModalEliminar() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        return this.eliminar();
      }
    })
  }

  eliminar() {
    
    this.spinner.show();

    const options = {
      body: {
      "id": this.puntaje.idPuntaje
      }
    }
    //console.log(options);
    
    return this.puntajesService.eliminarPuntaje(options).subscribe({
      next: (res) =>{
          this.spinner.hide();
          //console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Puntaje eliminado con éxito!!',
            showConfirmButton: true,
            timer: 1500
          });
          setTimeout(() => {
            this.router.navigate(['puntajes']); 
          }, 2000);
          
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el puntaje',
          showConfirmButton: true,
          timer: 5000
        })
    }
  });
}
  

}
