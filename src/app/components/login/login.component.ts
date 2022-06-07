import { Credenciais } from './../../models/Credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  logar(): void {
    this.toastr.error("Email e/ou senha inválidos.", "Login");
  }

  validarCampos(){
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

}
