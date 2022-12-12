import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  obtenerCargos(): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/obtenerCargos`);
  }

}
