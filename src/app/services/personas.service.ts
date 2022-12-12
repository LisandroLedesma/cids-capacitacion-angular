import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  registrarPersona(persona: Persona): Observable<any> {
    return this.http.post<number>(`${this.config.apiUrl}/crearPersona`, persona)
  }

}
