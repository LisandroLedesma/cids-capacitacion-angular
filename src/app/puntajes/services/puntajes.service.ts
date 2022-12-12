import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Puntaje } from '../../models/puntaje';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  obtenerPuntajes(): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(`${this.config.apiUrl}/obtenerPuntajesCompleto`).pipe(map((response) => {
        return response;
      }));
  }

  obtenerPuntajeId(id: number): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/obtenerPuntajesCompletoId/${id}`);
  }

  nuevoPuntaje(body: any): Observable<any> {
    return this.http.post<boolean>(`${this.config.apiUrl}/crearPuntaje`, body);
  }

  actualizarPuntaje(body: any): Observable<any> {
    return this.http.put<boolean>(`${this.config.apiUrl}/modificarPuntaje`, body);
  }

  eliminarPuntaje(body: any): Observable<any> {

    return this.http.delete<any>(`${this.config.apiUrl}/eliminarPuntaje`, body);
  }

}
