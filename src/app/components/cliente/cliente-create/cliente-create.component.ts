import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  //senha2 = new UntypedFormControl(null, Validators.minLength(3));

  cliente: Cliente = {
    nome: '',
    cpf: '',
    email:  '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private toastr: ToastrService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.service.create(this.cliente).subscribe(() => {
      this.toastr.success("Usuário cadastrado com sucesso.", "Cadastro");
      this.router.navigate(["clientes"]);
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
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }else {
      this.cliente.perfis.push(perfil);
    }
  }

  validar(): boolean {
    return this.nome.valid && this.cpf.valid && 
      this.email.valid && this.senha.valid ;
  }

}
