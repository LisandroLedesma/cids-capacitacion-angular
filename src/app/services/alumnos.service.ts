import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable()
export class AlumnosService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.config.apiUrl}/alumnos`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registrarAlumno(data): Observable<any>{
    return this.http.post<number>(`${this.config.apiUrl}/nuevoAlumno`, data);
  }

  obtenerAlumnoPorId(id: number): Observable<any>{
    return this.http.get<number>(`${this.config.apiUrl}/alumnoId/${id}`);
  }

  actualizarAlumnoPorCuil(body:any): Observable<any>{
    return this.http.put<any>(`${this.config.apiUrl}/modificarAlumnoCuil`, body);
  }

  eliminarAlumnoPorCuil(data:any): Observable<any>{
    return this.http.delete<void>(`${this.config.apiUrl}/eliminarAlumno`, data);
  }

}
