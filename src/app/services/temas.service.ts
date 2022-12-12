import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  obtenerTemaPorId(id: number): Observable<any>{
    return this.http.get<number>(`${this.config.apiUrl}/tema/${id}`);
  }

  obtenerTemas(): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/temas`);
  }

}
