import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  delete(id: any) : Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

  update(tecnico: Tecnico) : Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  findById(id: any): Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }
}
