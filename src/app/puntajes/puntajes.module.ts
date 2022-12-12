// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { PuntajesComponent } from './puntajes/puntajes.component';
import { PuntajeFormComponent } from './puntajes/puntaje-form/puntaje-form.component';

// Services
import { PuntajesService } from './services/puntajes.service';


@NgModule({
  declarations: [PuntajesComponent, PuntajeFormComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PuntajesComponent,
    PuntajeFormComponent
  ],
  providers: [
    PuntajesService
  ]
})
export class PuntajesModule { }
