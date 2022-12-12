import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Reparticion } from '../models/reparticion';

@Injectable({
  providedIn: 'root'
})
export class ReparticionesService {
  constructor(private http: HttpClient, private config: AppConfig) { }

  obtenerReparticiones(): Observable<Reparticion[]> {

    return this.http.get<Reparticion[]>(`${this.config.apiUrl}/obtenerReparticiones`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
