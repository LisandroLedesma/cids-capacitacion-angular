//Modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PuntajesModule } from './puntajes/puntajes.module';

//Directivas
import { DestacarDirective } from './directives/destacar.directive';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { FormAlumnoComponent } from './components/alumnos/form-alumno/form-alumno.component';
import { TemasComponent } from './components/temas/temas.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

//Services
import { AlumnosService } from './services/alumnos.service';
import { ReparticionesService } from './services/reparticiones.service';
import { PersonasService } from './services/personas.service';
import { TemasService } from './services/temas.service';
import { ProfesoresService } from './services/profesores.service';
import { CargosService } from './services/cargos.service';

import { AppConfig } from './app.config';
import { ProfesoresModule } from './profesores/profesores.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TemasComponent,
    AlumnosComponent,
    DestacarDirective,
    FormAlumnoComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PuntajesModule,
    ProfesoresModule
  ],
  providers: [AlumnosService,
              AppConfig,
              ReparticionesService,
              PersonasService,
              TemasService,
              ProfesoresService,
              CargosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
