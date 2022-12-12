import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  obtenerProfesorPorId(id: number): Observable<any>{
    return this.http.get<number>(`${this.config.apiUrl}/profesorId/${id}`);
  }

  obtenerProfesores(): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/profesores`);
  }

  registrarProfesor(data): Observable<any>{
    return this.http.post<number>(`${this.config.apiUrl}/crearProfesor`, data);
  }

  actualizarProfesorPorId(body:any): Observable<any>{
    return this.http.put<any>(`${this.config.apiUrl}/modificarProfesor`, body);
  }

  eliminarProfesorPorCuil(data:any): Observable<any>{
    return this.http.delete<void>(`${this.config.apiUrl}/eliminarProfesor`, data);
  }

}
