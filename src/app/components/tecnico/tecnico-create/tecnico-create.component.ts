import { Router } from '@angular/router';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  //senha2 = new UntypedFormControl(null, Validators.minLength(3));

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email:  '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.service.create(this.tecnico).subscribe(() => {
      this.toastr.success("Usuário cadastrado com sucesso.", "Cadastro");
      this.router.navigate(["tecnicos"]);
    }, ex => {
      if(ex.error.error) {
        this.toastr.error(ex.error.message);
        console.log(ex.error.message);
      }else {
        this.toastr.error(ex.error.errors[0].message);
        console.log(ex.error.message);
      }
    });
  }

  addPerfil(perfil: any) {
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validar(): boolean {
    return this.nome.valid && this.cpf.valid && 
      this.email.valid && this.senha.valid ;
  }

}
