import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Credenciais } from './../../models/Credenciais';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds : Credenciais = {
    email : "",
    senha : ""
  };

  email = new UntypedFormControl(null, Validators.email);
  senha = new UntypedFormControl(null, Validators.minLength(3));

  constructor(
    private toastr: ToastrService, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
  }

  logar(): void {
    this.authService.authenticate(this.creds).subscribe(resposta => {
      this.authService.successfulLogin(resposta.headers.get("authorization").substring(7));
      this.router.navigate(["home"]);
    }, () => this.toastr.error("Usuário ou senha inválidos", "Erro"));
  }

  validarCampos(){
    return this.email.valid && this.senha.valid;
  }

}
