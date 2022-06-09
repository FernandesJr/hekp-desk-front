import { Router } from '@angular/router';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Credenciais } from './../models/Credenciais';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService(); //npm i @auth0/angular-jwt

  constructor(private http: HttpClient, private router: Router) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(token: string){
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    if(token != null){
      return !this.jwtService.isTokenExpired(token); //Validando se Não está expirado
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

}
