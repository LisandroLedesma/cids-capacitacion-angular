import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Alumno } from '../../../models/alumno';
import { Reparticion } from '../../../models/reparticion';
import { Persona } from '../../../models/persona';

import { ReparticionesService } from '../../../services/reparticiones.service';
import { PersonasService } from '../../../services/personas.service';
import { AlumnosService } from '../../../services/alumnos.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css']
})
export class FormAlumnoComponent implements OnInit {

  form: FormGroup;
  alumno: Alumno;
  persona: Persona;
  reparticiones: Reparticion[];
  idReparticion: number;
  titulo: string = "Nuevo Alumno";

  constructor(private fb: FormBuilder,
              private router: Router,
              private repService: ReparticionesService,
              private personaService: PersonasService,
              private alumnosService: AlumnosService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) {
                this.obtenerReparticiones();
              }

  ngOnInit() {
    this.crearForm();
    setTimeout(() => {
      this.cargaEditarAlumno();  
    }, 1000);
    
  }

  crearForm() {
    this.form = this.fb.group({
      Nombre: [null, [Validators.required]],
      Apellido: [null, [Validators.required] ],
      Edad: [null, [Validators.required] ],
      Cuil: [null, [Validators.required] ],
      Reparticion: [null, [Validators.required] ]
    });
  }

  obtenerReparticiones() {
    this.repService.obtenerReparticiones().subscribe( (data) => {
      //console.log("Data: ", data);
      this.reparticiones = data;
    },
    (error) =>{
      console.log(error);
    })
  }

  guardar() {

    this.spinner.show();

    this.persona = {
      idPersona: null,
      nombre: this.form.value.Nombre,
      apellido: this.form.value.Apellido,
      edad: this.form.value.Edad,
      cuil: this.form.value.Cuil,
    }

    this.idReparticion = this.form.value.Reparticion;

    this.personaService.registrarPersona(this.persona).subscribe({
      next: (res) => {
        const idPersona = res;
        const data = {
          idReparticion: this.idReparticion,
          idPersona
        }
        this.alumnosService.registrarAlumno(data).subscribe({
          next: (res) => {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Alumno Registrado!',
              showConfirmButton: true,
              timer: 5000
            })
          },
          error: (err) => {
            console.log(err);
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el alumno!',
              showConfirmButton: true,
              timer: 5000
            })
          }
        })
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron registrar los datos de la persona',
          showConfirmButton: true,
          timer: 5000
        })
      }
    });
  }

  abrirModalEditar() {
    Swal.fire({
      title: 'Confirmacion',
      text: "¿Esta seguro que desea editar este alumno?",
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

  editar() {

    this.spinner.show();

    const parseRep = +this.form.value.Reparticion
    //console.log(typeof(parseRep));
    const body = {
      "cuil": this.alumno.cuil,
      "data": {
        "idReparticion2": parseRep,
        "idPersona2": {
          "nombre": this.form.value.Nombre,
          "apellido": this.form.value.Apellido,
          "edad": this.form.value.Edad,
          "cuil": this.form.value.Cuil
        }
      }
    }

    this.alumnosService.actualizarAlumnoPorCuil(body).subscribe({
      next: (res) => {
        this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Alumno modificado con éxito!!',
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
          text: 'No se pudieron modificar los datos del alumno',
          showConfirmButton: true,
          timer: 5000
        })
      }
    })

  }
  
  cargaEditarAlumno() {

    this.activatedRoute.params.subscribe( params => {
      if (params['id'] >= 0) {
        this.validarModificacion()
      }
    });
  }

  validarModificacion() {
    this.titulo = "Editar Alumno";
    this.activatedRoute.params.subscribe( params => {
      this.alumnosService.obtenerAlumnoPorId(params['id']).subscribe( a => {
        //console.log(a);
        this.alumno = a;
        //console.log(this.alumno);
        let indiceRep: number;
        //console.log("Antes del map: ", this.reparticiones);
        this.reparticiones.map( (r, i) => {
          if (r.nombre === String(this.alumno.reparticion)) {
            indiceRep = i;
          }
        })

        this.form.patchValue({
          Nombre: this.alumno.nombre,
          Apellido: this.alumno.apellido,
          Edad: this.alumno.edad,
          Cuil: this.alumno.cuil,
          Reparticion: indiceRep+1
        })
      });
    });
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
      "cuil": this.alumno.cuil
      }
    }
    //console.log(options);
    
    return this.alumnosService.eliminarAlumnoPorCuil(options).subscribe({
      next: (res) =>{
          this.spinner.hide();
          //console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Alumno eliminado con éxito!!',
            showConfirmButton: true,
            timer: 1500
          });
          setTimeout(() => {
            this.router.navigate(['alumnos']); 
          }, 2000);
          
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el alumno',
          showConfirmButton: true,
          timer: 5000
        })
    }
  });
}

}