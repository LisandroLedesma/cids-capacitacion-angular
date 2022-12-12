import { HomeComponent } from './components/home/home.component';
import { TemasComponent } from './components/temas/temas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { FormAlumnoComponent } from './components/alumnos/form-alumno/form-alumno.component';
import { PuntajesComponent } from './puntajes/puntajes/puntajes.component';
import { PuntajeFormComponent } from './puntajes/puntajes/puntaje-form/puntaje-form.component';

import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ProfesoresComponent } from './profesores/profesores/profesores.component';
import { ProfesoresFormComponent } from './profesores/profesores/profesores-form/profesores-form.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'temas', component: TemasComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumnos/registrar-alumno', component: FormAlumnoComponent },
  { path: 'alumnos/alumno/:id', component: FormAlumnoComponent },
  { path: 'puntajes', component: PuntajesComponent },
  { path: 'puntajes/registrar-puntaje', component: PuntajeFormComponent },
  { path: 'puntajes/puntaje/:id', component: PuntajeFormComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'profesores/registrar-profesor', component: ProfesoresFormComponent },
  { path: 'profesores/profesor/:id', component: ProfesoresFormComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
