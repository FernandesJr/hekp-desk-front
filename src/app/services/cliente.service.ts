import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  delete(id: any) : Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  update(cliente: Cliente) : Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  findById(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }
}
