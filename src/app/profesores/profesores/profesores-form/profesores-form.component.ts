import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Profesor } from '../../../models/profesor';
import { Cargo } from '../../../models/cargo';
import { Persona } from '../../../models/persona';

import { CargosService } from '../../../services/cargos.service';
import { PersonasService } from '../../../services/personas.service';
import { ProfesoresService } from '../../../services/profesores.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-profesores-form',
  templateUrl: './profesores-form.component.html',
  styleUrls: ['./profesores-form.component.css']
})
export class ProfesoresFormComponent implements OnInit {

  form: FormGroup;
  profesor: Profesor;
  persona: Persona;
  cargos: Cargo[];
  idCargo: number;
  titulo: string = "Nuevo Profesor";

  constructor(private fb: FormBuilder,
              private router: Router,
              private cargoService: CargosService,
              private personaService: PersonasService,
              private profesorService: ProfesoresService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) {
                this.obtenerCargos();
              }

  ngOnInit(): void {
    this.crearForm();
    setTimeout(() => {
      this.cargaEditarProfesor();  
    }, 1000);
  }

  crearForm() {
    this.form = this.fb.group({
      Nombre: [null, [Validators.required]],
      Apellido: [null, [Validators.required] ],
      Edad: [null, [Validators.required] ],
      Cuil: [null, [Validators.required] ],
      Cargo: [null, [Validators.required] ]
    });
  }

  obtenerCargos() {
    this.cargoService.obtenerCargos().subscribe( (data) => {
      this.cargos = data;
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

    this.idCargo = this.form.value.Cargo;

    this.personaService.registrarPersona(this.persona).subscribe({
      next: (res) => {
        const idPersona = res;
        const data = {
          idCargo: this.idCargo,
          idPersona
        }
        this.profesorService.registrarProfesor(data).subscribe({
          next: (res) => {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Profesor Registrado!',
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
              text: 'No se pudo registrar el profesor!',
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
      text: "¿Esta seguro que desea editar este profesor?",
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

    const parseCarg = +this.form.value.Cargo
    //console.log(typeof(parseRep));
    const body = {
      "idProfesor": this.profesor.idProfesor,
      "data": {
        "idCargo2": parseCarg,
        "idPersona2": {
          "nombre": this.form.value.Nombre,
          "apellido": this.form.value.Apellido,
          "edad": this.form.value.Edad,
          "cuil": this.form.value.Cuil
        }
      }
    }

    this.profesorService.actualizarProfesorPorId(body).subscribe({
      next: (res) => {
        this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Profesor modificado con éxito!!',
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
          text: 'No se pudieron modificar los datos del profesor',
          showConfirmButton: true,
          timer: 5000
        })
      }
    })

  }
  
  cargaEditarProfesor() {

    this.activatedRoute.params.subscribe( params => {
      if (params['id'] >= 0) {
        this.validarModificacion()
      }
    });
  }

  validarModificacion() {
    this.titulo = "Editar Profesor";
    this.activatedRoute.params.subscribe( params => {
      this.profesorService.obtenerProfesorPorId(params['id']).subscribe( p => {
        //console.log(p);
        this.profesor = p;
        //console.log(this.alumno);
        let indiceCarg: number;
        //console.log("Antes del map: ", this.reparticiones);
        this.cargos.map( (c, i) => {
          if (c.nombre === String(this.profesor.cargo)) {
            indiceCarg = i;
          }
        })

        this.form.patchValue({
          Nombre: this.profesor.nombre,
          Apellido: this.profesor.apellido,
          Edad: this.profesor.edad,
          Cuil: this.profesor.cuil,
          Cargo: indiceCarg+1
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
      "cuil": this.profesor.cuil
      }
    }
    //console.log(options);
    
    return this.profesorService.eliminarProfesorPorCuil(options).subscribe({
      next: (res) =>{
          this.spinner.hide();
          //console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Profesor eliminado con éxito!!',
            showConfirmButton: true,
            timer: 1500
          });
          setTimeout(() => {
            this.router.navigate(['profesores']); 
          }, 2000);
          
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el profesor',
          showConfirmButton: true,
          timer: 5000
        })
    }
  });
}

}
