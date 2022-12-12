// Modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { CargosService } from '../services/cargos.service';
import { ProfesoresService } from '../services/profesores.service';

// Components
import { ProfesoresComponent } from './profesores/profesores.component';
import { ProfesoresFormComponent } from './profesores/profesores-form/profesores-form.component';


@NgModule({
  declarations: [ProfesoresComponent, ProfesoresFormComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfesoresComponent,
    ProfesoresFormComponent
  ],
  providers: [
    CargosService,
    ProfesoresService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfesoresModule { }
